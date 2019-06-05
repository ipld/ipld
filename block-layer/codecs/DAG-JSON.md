# Specification: DAG-JSON

**Status: Descriptive - Final**

DAG-JSON supports the full [IPLD Data Model](../data-model-layer/data-model.md).

## Format

### Simple Types

All simple types except binary are supported natively by JSON.

Contrary to popular belief, JSON as a format supports Big Integers. It's only
JavaScript itself that has trouble with them. This means JS implementations
of `dag-json` can't use the native JSON parser and serializer.

#### Binary Type

```javascript
{"/": { "base64": String }}
```

### Link Type

```javascript
{"/": String /* base encoded CID */}
```