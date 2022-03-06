Selector Fixtures (ADL)
=======================

This file contains a set of selectors that can be used to test the ADL capabilities of selectors (InterpretAs and Slice).


### What's the fixture format?

Same as described in [selector-fixtures-1](../selector-fixtures-1/#whats-the-fixture-format).

---


Fixtures
--------

### A slice of a unixfs file.

#### data
The combination of these five data objects is replicated in `selector-fixtures-adl.car`.

[testmark]:# (adl-interpreted/root)
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
[testmark]:# (adl-interpreted/baguqeera2pkvbqv2slrvh3dswozj6ozoob53idll3rkh3zh5tqsdqjvpzu7q)
```json
{
    "/":{"bytes":"ZmlsZSBjaHVuayBhCgo"}
}
```
[testmark]:# (adl-interpreted/baguqeerasc2dhjjhbg6h3rt7rqbgpzlwzng5to3zwxcxtmdajfqt6tdyxscq)
```json
{
    "/":{"bytes":"ZmlsZSBjaHVuayBiCgo"}
}
```
[testmark]:# (adl-interpreted/baguqeera7d7gvq7y7rugmmzh3u2552ckh6hyqno3tptbceutb5s3c4vixsua)
```json
{
    "/":{"bytes":"ZmlsZSBjaHVuayBjCgo"}
}
```
[testmark]:# (adl-interpreted/baguqeeraxvm7dmqutnagoxxhq2iyghr5qidbjovdi7iqdptw527gifajqlgq)
```json
{
    "/": {"bytes": "ZmlsZSBjaHVuayBkCgo"}
}
```
#### selector

[testmark]:# (adl-interpreted/selector)
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

[testmark]:# (adl-interpreted/expect-visit)
```text
{"path": "", "node": {"bytes": {"/":{"bytes":"ZmlsZSBjaHVuayBiCgpmaWxlIGNodW5rIGMKCg"}}}, "matched": true}
```
