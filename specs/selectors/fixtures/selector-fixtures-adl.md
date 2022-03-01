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

[testmark]:# (adl-interpreted/root)
```json
{
    "Links": [
        {
            "Name": "",
            "Hash": "shard-a",
            "Size": 256
        },
        {
            "Name": "",
            "Hash": "shard-b",
            "Size": 256
        },
        {
            "Name": "",
            "Hash": "shard-c",
            "Size": 256
        },
        {
            "Name": "",
            "Hash": "shard-d",
            "Size": 256
        }
    ],
    "Data": {"/": ""}
}
```
[testmark]:# (adl-interpreted/shard-a)
```json
{
    "/": {"Bytes": "..."}
}
```
[testmark]:# (adl-interpreted/shard-b)
```json
{
    "/": {"Bytes": "..."}
}
```
[testmark]:# (adl-interpreted/shard-c)
```json
{
    "/": {"Bytes": "..."}
}
```
[testmark]:# (adl-interpreted/shard-d)
```json
{
    "/": {"Bytes": "..."}
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
                    "[": 256,
                    "]": 768
                }
            }
        }
	}
}
```

#### expected visit events

[testmark]:# (adl-interpreted/expect-visit)
```text
{"path": "shard-b", "node": {"list": null}, "matched": true}
{"path": "shard-c", "node": {"list": null}, "matched": true}
```
