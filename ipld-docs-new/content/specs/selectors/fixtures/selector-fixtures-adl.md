---
title: "selector-fixture-adl"
weight: 63
---

This file contains a set of selectors that can be used to test the ADL capabilities of selectors (InterpretAs and Slice).

## What's the fixture format?

Same as described in [selector-fixtures-1](../selector-fixtures-1/#whats-the-fixture-format).

## Fixtures

### A slice of a unixfs file.

#### data

The combination of these five data objects is replicated in `selector-fixtures-adl.car`.

```json
{
    "Data":{
        "/":{"bytes":"CAIYgIBAIICAECCAgBAggIAQIICAEA"}
    },
    "Links":[
        {"Hash":{"/":"baguqeera2pkvbqv2slrvh3dswozj6ozoob53idll3rkh3zh5tqsdqjvpzu7q"},"Name":"","Tsize":14},
        {"Hash":{"/":"baguqeerasc2dhjjhbg6h3rt7rqbgpzlwzng5to3zwxcxtmdajfqt6tdyxscq"},"Name":"","Tsize":14},
        {"Hash":{"/":"baguqeera7d7gvq7y7rugmmzh3u2552ckh6hyqno3tptbceutb5s3c4vixsua"},"Name":"","Tsize":14},
        {"Hash":{"/":"baguqeeraxvm7dmqutnagoxxhq2iyghr5qidbjovdi7iqdptw527gifajqlgq"},"Name":"","Tsize":14}
    ]
}
```

the leaves are dag-json encodings of "file chunk a\r\n" through "file chunk d\r\n".

```json
{
    "/":{"bytes":"ZmlsZSBjaHVuayBhCgo"}
}
```

```json
{
    "/":{"bytes":"ZmlsZSBjaHVuayBiCgo"}
}
```

```json
{
    "/":{"bytes":"ZmlsZSBjaHVuayBjCgo"}
}
```

```json
{
    "/":{"bytes":"ZmlsZSBjaHVuayBkCgo"}
}
```

#### selector

```json
{
 "~": {
        "as": "unixfs",
        ">": {
            ".": {
                "subset": {
                    "[": 14,
                    "]": 42
                }
            }
        }
 }
}
```

#### expected visit events

the visit will be to the synthetic node containing the contents: "file chunk b\r\nfile chunk c\r\n"

```text
{"path": "", "node": {"bytes": {"/":{"bytes":"ZmlsZSBjaHVuayBiCgpmaWxlIGNodW5rIGMKCg"}}}, "matched": true}
```
