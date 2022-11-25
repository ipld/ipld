---
title: "known_extensions"
description: "Graphsync is an advanced interactive transport protocol.  Graphsync uses IPLD Selectors to effeciently transfer graphs (or selections of parts of graphs) with a minimal number of independent requests and thus low overhead for high latency situations."
weight: 57
---

## Do Not Send CIDs

Extension Name: `graphsync/do-not-send-cids`

What it does:

Often a node may know ahead of time that it has some of the blocks needed to match a selector query in its local store already. Some reasons this might occur include:

- a previous request was interrupted
- a previous request for a subset of the requested selector was already completed

How it works:

When a requestor sends a request, it should send a CBOR encoded IPLD Node that is a list of CIDs it already has as the value for this extension.

The IPLD schema is as follows:

```ipldsch
type DoNotSendCids [Cid]
```

The responder node will execute the selector query as it would normally. However, if it supports the extension, when the selector query passes over any blocks that have a cid from the DoNotSend list, the responder will not send that block back, knowing ahead of time the requestor already has it. The responder does not send a value back in the response for this extension.

## Response Metadata

Extension Name: `graphsync/response-metadata`

What it does:

Response metadata provides information about the response to help the requestor more efficiently verify that the blocks sent back from the responder are valid for the requested IPLD selector. It contains information about the CIDs the responder traversed, in order, during the course of performing the selector query, and whether or not the corresponding block was present in its local block store. Telling the requestor immediately that the query passed over a block the responder did not have allows the requestor to advance its local query, and return a separate error for that particular block.

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
