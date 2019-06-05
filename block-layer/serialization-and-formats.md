# Concept: Serialization and Formats

A logical separation exists in any given IPLD codec between the **format** and the **serializer/deserializer**.

```
┌────────────────────┐             ┌────────────────────┐
│                    │             │                    │
│     Serializer     │             │    Deserializer    │
│                    │             │                    │
└─────────┬──────────┘             └──────────^─────────┘
          │                                   │
          │         Sent to another peer      │
          │                                   │
┌─────────v──────────┐             ┌──────────┴─────────┐
│                    │             │                    │
│       Format       ├─────────────>       Format       │
│                    │             │                    │
└────────────────────┘             └────────────────────┘
```

A **format** may represent object types and tree structures any way it wishes.
This includes existing representations (JSON, BSON, CBOR, Protobuf, msgpack, etc) or even new custom serializations.

Therefor, a **format** is the standardized representation of IPLD Links and Paths.
It describes how to translate between structured data and binary.

It is worth noting that **serializers** and **deserializers** differ by programming language while the **format** does not and MUST remain consistent across all codec implementations.
