# Specification: DAG-JSON

**Status: Descriptive - Final**

DAG-JSON supports the full [IPLD Data Model](../data-model-layer/data-model.md).

## Format

### Serialization

Codec implementors **MUST** do the following in order to ensure hashes consistently match for the same block data.

 - Sort object keys by their (UTF-8) encoded representation, i.e. with byte comparisons
 - Strip whitespace

This produces the most compact and consistent representation which will ensure that two codecs
producing the same data end up with matching block hashes.

### Simple Types

All simple types except binary are supported natively by JSON.

Contrary to popular belief, JSON as a format supports Big Integers. It's only
JavaScript itself that has trouble with them. This means JS implementations
of `dag-json` can't use the native JSON parser and serializer.

#### Binary Type

```javascript
{"/": { "base64": String }}
```

#### Link Type

```javascript
{"/": String /* base encoded CID */}
```
