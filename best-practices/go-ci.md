## Best practices for Continuous Integration with Go

First, use [Modules](https://golang.org/ref/mod) even if you don't have any
external dependencies. Beyond ensuring consistency, a module allows using new Go
language features. The instructions below assume you are setting up CI for a
single Go module, and a POSIX-compatible shell like Bash.

It is strongly recommended that the following checks are used:

* `go test ./...` to run all tests
* `go test -race ./...` to catch any data races when running the tests
* `test -z $(gofmt -l .)` to ensure all Go files are well formatted
* `go vet ./...` to ensure there are no vet warnings

The following checks are also recommended, though they might not help in all
situations:

* `go mod tidy && git diff --exit-code` to ensure `go.mod` and `go.sum` are clean
* `go mod verify` to ensure that `go.sum` agrees with what's in the module cache
* `go test -run=- -bench=. -benchtime=1x ./...` to catch stale benchmarks
* `staticcheck ./...` to ensure there are no [Staticcheck](https://staticcheck.io/) warnings

Finally, if your module is a library, it is recommended to support at least the
two latest major Go versions. For example, if Go 1.16.x is the latest major
release, all the checks above should be run on 1.16.x, and `go test ./...`
should also run on 1.15.x. Note that upstream Go supports
[two major releases](https://github.com/golang/go/wiki/Go-Release-Cycle#release-maintenance)
at once as well.

### Using Code Coverage Tools

Code coverage can be determined in CI, but should not be used as an automatic status checks.

When using Codecov, this can be achieved by using the following `codecov.yml`:

```yml
coverage:
  status:
    project:
      default:
        informational: true
    patch:
      default:
        informational: true
```

#### How to use this document at Protocol Labs

Marten Seemann and the IPLD team have set up [a template repository](https://github.com/ipld/.github)
to share YAML workflows between IPLD repositories. The repository itself
uses GitHub Actions to copy specific workflows into lists of repositories. For
example, the "Go" workflows are copied into a number of IPLD Go repositories, in
the form of Pull Requests created by a bot whenever a template changes.

The short-term plan is to fully use this method in the IPLD organization, and
gain experience. We could later apply the same automated method to other
organizations within PL, such as IPFS or Filecoin. This document will serve as
reference for what the YAML workflows for Go should do.

For the time being, if you aren't developing code in the IPLD organization, feel
free to copy our workflows. You should also get in touch with us :)

#### Open questions and TODOs

Should we recommend using `go fmt ./...` instead of `gofmt .`? The main
difference is that the former will ignore any files not part of `./...`, such as
Go files behind `testdata/` or `_ignored`.

Should we mention popular static analysis frameworks like golangci-lint, since
it will be a common question? We likely don't want to encourage their use, given
their huge complexity. Plus, staticcheck gives most of the benefit with fewer
false positives and better defaults.

A good place to draw a line regarding external tools might be what gopls
natively supports. Right now, that is just staticcheck and gofumpt.

We should provide ready-to-copy-paste scripts with the above. We likely don't
want to maintain examples in many popular CI config flavors, though. Perhaps
link to external guides with more platform-specific details once they add a full
script, like https://github.com/mvdan/github-actions-golang.

The `go mod tidy` recommendation is delegated to the second section simply
because it currently requires external help via `git diff`. We should move it to
the first section once https://github.com/golang/go/issues/27005 gets attention.

Move this doc to upstream Go once they have a good place for it that's code
reviewed. See https://github.com/golang/go/issues/42119.
