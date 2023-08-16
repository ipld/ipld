package trustless_pathing

import (
	"errors"
	"fmt"
	"net/url"
	"strconv"
	"strings"

	"github.com/ipfs/go-cid"
)

type TestCase struct {
	Name         string
	Root         cid.Cid
	Path         string
	Scope        string
	Duplicates   bool
	ByteRange    string
	ExpectedCids []cid.Cid
}

func (tc TestCase) AsQuery() string {
	pp := strings.Join(strings.FieldsFunc(tc.Path, func(r rune) bool { return r == '/' }), "/")
	if pp != "" {
		pp = "/" + pp
	}
	br := ""
	if tc.ByteRange != "" {
		br = fmt.Sprintf("&entity-bytes=%s", tc.ByteRange)
	}
	dup := ""
	if tc.Duplicates {
		dup = "&dups=y"
	}
	return fmt.Sprintf("/ipfs/%s%s?dag-scope=%s%s%s", tc.Root, pp, tc.Scope, br, dup)
}

func ParseCase(name, spec, exec string) (TestCase, error) {
	lines := strings.Split(exec, "\n")
	for len(lines) > 0 && strings.TrimSpace(lines[0]) == "" {
		lines = lines[1:]
	}
	for len(lines) > 0 && strings.TrimSpace(lines[len(lines)-1]) == "" {
		lines = lines[:len(lines)-1]
	}
	specParts := strings.Split(strings.TrimSpace(spec), "?")
	if len(specParts) != 2 {
		return TestCase{}, errors.New("invalid spec")
	}
	spec = specParts[0]
	query, err := url.ParseQuery(specParts[1])
	if err != nil {
		return TestCase{}, err
	}
	if spec[0] != '/' {
		return TestCase{}, errors.New("invalid spec")
	}
	specParts = strings.FieldsFunc(spec, func(r rune) bool { return r == '/' })
	if specParts[0] != "ipfs" {
		return TestCase{}, errors.New("invalid spec")
	}
	root, err := cid.Parse(specParts[1])
	if err != nil {
		return TestCase{}, err
	}
	path := "/" + strings.Join(specParts[2:], "/")
	scope := query.Get("dag-scope")
	switch scope {
	case "all":
	case "entity":
	case "block":
	default:
		return TestCase{}, fmt.Errorf("invalid dag-scope in test case: %s", scope)
	}
	duplicates := query.Get("dups") == "y"
	byteRange := query.Get("entity-bytes")
	if byteRange != "" {
		parts := strings.Split(byteRange, ":")
		if len(parts) != 2 {
			return TestCase{}, fmt.Errorf("invalid entity-bytes: %s", byteRange)
		}
		var err error
		_, err = strconv.ParseInt(parts[0], 10, 64)
		if err != nil {
			return TestCase{}, fmt.Errorf("invalid entity-bytes: %s (%w)", byteRange, err)
		}
		if parts[1] != "*" {
			_, err = strconv.ParseInt(parts[1], 10, 64)
			if err != nil {
				return TestCase{}, fmt.Errorf("invalid entity-bytes: %s (%w)", byteRange, err)
			}
		}
	}
	expectedCids := make([]cid.Cid, 0, len(lines))
	for _, line := range lines {
		la := strings.Split(line, "|")
		c := cid.MustParse(strings.TrimSpace(la[0]))
		expectedCids = append(expectedCids, c)
	}
	return TestCase{
		Name:         name,
		Root:         root,
		Path:         path,
		Scope:        scope,
		Duplicates:   duplicates,
		ByteRange:    byteRange,
		ExpectedCids: expectedCids,
	}, nil
}
