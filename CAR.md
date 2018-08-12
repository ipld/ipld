# ![](https://img.shields.io/badge/status-wip-orange.svg?style=flat-square) Certified ARchive

CARs (Certified ARchives) are archives for IPLD DAGs.

## Summary

CARs are archives of IPLD DAGs. They are:

1. Certified
2. Seekable
3. Compact
4. Reproducible
5. Simple and Stable

The actual format is just a (mostly) recursively-defined topological sort of the
desired DAG with some metadata for fast traversal.

```
CID
len(ROOT)
ROOT
[
  CHILD-1-OFFSET
  ...
]
[
  len(CHILD-1)
  CHILD-1
  [
    CHILD-1/1-OFFSET
    ...
  ]
  ...
]
```

Offsets are relative, offsets for missing children use a sentinel value.

We only bother including the root CID because all the other CIDs are embedded in
the objects themselves. This saves space and *forces* parsers to actually
traverse the DAG (hopefully validating it).

## Motivation

Use cases:

1. Reliably export/import a DAG to/from an external hard drive (backup, sneakernet).
2. Traverse a large DAG on an external hard drive without parsing the *entire* DAG.
3. Traverse a large DAG streamed over HTTP without downloading the entire thing.

The simple method is to copy the entire repo. However, for performance, we need
to be able to upgrade the repo format so this isn't really a stable format.
Additionally, repos need to support insertions, deletions, and random lookups.
Supporting these efficiently necessarily complicates the formats. We'd like
something simple and portable (backup).

The slightly more complex way is to download every object into a separate file
and then import each file. However, this isn't very convenient and *does not*
scale to large directories well (use case 2).

One could improve this multi-file approach by splitting up the DAG into multiple
directories and providing a set of tools to manage the files. However, we'd
rather not rely on the filesystem for anything, really. Filesystems:

* Don't always deal with names well (e.g., FAT16).
* Don't always handle many small files well.
* Aren't usually as space-efficient as possible (to support updates).
* Are complex (easy to corrupt metadata/structure).

Additionally, it's hard to download a directory structure over HTTP (motivated by
use-case 3). One can just TAR it up but that layers another (complex) file
format into the mix.

So, we'd like a new single-file format that, if necessary, we can just `dd` to a
drive in place of a filesystem.

TODO: Expand.

# Questions

However, there are a few open questions.

## Uint64/Varint

The advantage of using uint64s over varints is that we can leave the "jump
tables" blank and then fill them in on a second pass after we've written
everything. However, if we topologically sort the DAG, we may be able to compute
the jump tables up-front.

The advantages of varints over uint64 are space and flexibility (DAGs larger
than 16 Exbibytes).

Currently, I'm leaning toward varints as this will make storing lots of small
blocks significantly more efficient.

## Inline Blocks

So, we can technically have inline blocks using the identity multihash. How do
we deal with them?

1. We *don't* want to duplicate the data.
2. We need to support inline blocks with children.

## Topological sort

So, a topological sort makes it really easy to traverse the CAR, even when
streaming. However producing a topologically sorted DAG is a bit trickier. Note:
whatever we choose, it won't have any affect on the asymptotic runtime (memory or time).
