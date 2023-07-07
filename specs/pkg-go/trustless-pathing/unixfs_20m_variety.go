package trustless_pathing

import (
	"fmt"
	"io"
	"os"
	"path/filepath"
	"runtime"
	"strings"

	carstorage "github.com/ipld/go-car/v2/storage"
	"github.com/ipld/go-ipld-prime/storage"
	"github.com/warpfork/go-testmark"

	_ "github.com/ipld/go-codec-dagpb"
	_ "github.com/ipld/go-ipld-prime/codec/raw"
)

const file = "/../../transport/trustless-pathing/fixtures/unixfs_20m_variety."

func pathToFixture(typ string) (string, error) {
	_, thisFile, _, _ := runtime.Caller(0)
	pathTo := filepath.Dir(thisFile) + file + typ
	pathTo = filepath.Clean(pathTo)
	// convert wd to absolute path, normalizing to / separators
	pathTo = strings.ReplaceAll(pathTo, "\\", "/")
	return pathTo, nil
}

func Unixfs20mVarietyReadableStorage() (storage.ReadableStorage, io.Closer, error) {
	file, err := pathToFixture("car")
	if err != nil {
		return nil, nil, err
	}
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

func Unixfs20mVarietyCases() ([]TestCase, error) {
	file, err := pathToFixture("md")
	if err != nil {
		return nil, err
	}
	doc, err := testmark.ReadFile(file)
	if err != nil {
		return nil, fmt.Errorf("failed to read testcases: %w", err)
	}
	doc.BuildDirIndex()
	testCases := make([]TestCase, 0)
	for _, test := range doc.DirEnt.Children["test"].ChildrenList {
		for _, scope := range test.ChildrenList {
			tc, err := ParseCase(test.Name+"/"+scope.Name, dstr(scope, "query"), dstr(scope, "execution"))
			if err != nil {
				return nil, fmt.Errorf("failed to parse test case %s: %w", test.Name+"/"+scope.Name, err)
			}
			testCases = append(testCases, tc)
		}
	}
	return testCases, nil
}

func dstr(dir *testmark.DirEnt, ch string) string {
	return string(dir.Children[ch].Hunk.Body)
}
