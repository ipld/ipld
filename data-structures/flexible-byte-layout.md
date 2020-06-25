# Specification: Flexible Byte Layout

**Status: Prescriptive - Draft**

`Flexible Byte Layout` is an advanced layout for representing binary data.

It is flexible enough to support very small and very large (multi-block) binary data.

```sh
type FlexibleByteLayout union {
  | Bytes bytes
  | NestedByteList list
} representation kinded

type NestedByteList [ NestedByte ]

type NestedByte struct {
  length Int
  part &FlexibleByteLayout
} representation tuple
```

`FlexibleByteLayout` is the entrypoint/root of the data structure and uses a potentially recursive
union type. This allows you to build very large nested dags via `NestedByteList` that can themselves
contain additional `NestedByteList`s or actual `Bytes` (via Links to `FlexibleByteLayout` in `NestedByte`).  

An implementation must define a custom function for reading ranges of binary
data but once implemented, you can read data regardless of the layout algorithm used.

Since readers only need to concern themselves with implementing the read method, they **do not**
need to understand the algorithms used to generate the layouts. This gives a lot of flexibility
in the future to define new layout algorithms as necessary without needing to worry about
updating prior impelementations.

The `length` property must be encoded with the proper byte length. If not encoded properly, readers
will not be able to read properly. However, the property is **not secure** and a malicious encoder
could write it as whatever they please. As such, it should not be relied upon when calculating usage
against a quota or any similar calculation where there may be an incentive for an encoder to alter the
length.

