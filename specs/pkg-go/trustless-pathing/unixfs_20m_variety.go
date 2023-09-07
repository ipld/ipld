package trustless_pathing

import (
	"fmt"
	"io"
	"os"
	"path/filepath"
	"runtime"
	"strings"

	"github.com/ipfs/go-cid"
	carstorage "github.com/ipld/go-car/v2/storage"
	"github.com/ipld/go-ipld-prime/storage"
	"github.com/warpfork/go-testmark"

	_ "github.com/ipld/go-codec-dagpb"
	_ "github.com/ipld/go-ipld-prime/codec/raw"
)

const file = "/../../transport/trustless-pathing/fixtures/unixfs_20m_variety."

func pathToFixture(typ string) string {
	_, thisFile, _, _ := runtime.Caller(0)
	pathTo := filepath.Dir(thisFile) + file + typ
	pathTo = filepath.Clean(pathTo)
	// convert wd to absolute path, normalizing to / separators
	pathTo = strings.ReplaceAll(pathTo, "\\", "/")
	return pathTo
}

func Unixfs20mVarietyCARPath() string {
	return pathToFixture("car")
}

func Unixfs20mVarietyReadableStorage() (storage.ReadableStorage, io.Closer, error) {
	file := pathToFixture("car")
	carFile, err := os.Open(file)
	if err != nil {
		return nil, nil, err
	}
	reader, err := carstorage.OpenReadable(carFile)
	if err != nil {
		carFile.Close()
		return nil, nil, err
	}
	return reader, carFile, nil
}

func Unixfs20mVarietyCases() ([]TestCase, cid.Cid, error) {
	file := pathToFixture("md")
	doc, err := testmark.ReadFile(file)
	if err != nil {
		return nil, cid.Undef, fmt.Errorf("failed to read testcases: %w", err)
	}
	doc.BuildDirIndex()
	root, err := cid.Parse(dstr(doc.DirEnt, "root"))
	if err != nil {
		return nil, cid.Undef, err
	}
	testCases := make([]TestCase, 0)
	for _, test := range doc.DirEnt.Children["test"].ChildrenList {
		for _, scope := range test.ChildrenList {
			tc, err := ParseCase(test.Name+"/"+scope.Name, dstr(scope, "query"), dstr(scope, "execution"))
			if err != nil {
				return nil, cid.Undef, fmt.Errorf("failed to parse test case %s: %w", test.Name+"/"+scope.Name, err)
			}
			testCases = append(testCases, tc)
		}
	}
	return testCases, root, nil
}

func dstr(dir *testmark.DirEnt, ch string) string {
	return string(dir.Children[ch].Hunk.Body)
}
