# Graphsync: Known Extensions

### Excluded CIDs

Extension Name: `graphsync/exclude-cids`

What it does:

Often a node may know ahead of time that it has some of the blocks needed to match a selector query in its local store already. Some reasons this might occur include:

- a previous request was interrupted
- a previous request for a subset of the requested selector was already completed

How it works:

When a requestor sends a request, it should send a CBOR encoded IPLD Node that is a list of CIDs it already has as the value for this extension.

The IPLD schema is as follows:

```ipldsch
type ExcludedCids [Cid]
```

The responder node, if it supports the extension, will not send those blocks back in the response. It does not send a value back in the response for this extension.

### Response Metadata

Extension Name: `graphsync/response-metadata`

What it does:

Response metadata provides information about the response to help the requestor more efficiently verify the blocks sent back from the responder are valid for the requested IPLD selector. It contains information about the CIDs the responder traversed, in order, during the course of performing the selector query and whether or not the corresponding block was present in its local block store.

How it works:

When a requestor node sends a request, it should include the "graphsync/response-metadata" key with an CBOR-encoded IPLD encoded boolean value of true to request metadata.

When the responder sends responses, it should include the key with a CBOR-encoded IPLD node of the format:

```json
[
  {
    "link": "cidabcdef",
    "blockPresent": true
  },
  {
    "link": "abcdedf443",
    "blockPresent": false
  },
  ...
]
```

or in IPLD Schema:

```ipldsch
type LinkMetadata struct {
  link Cid
  blockPresent Bool
}

type ResponseMetadata [LinkMetadata]
```