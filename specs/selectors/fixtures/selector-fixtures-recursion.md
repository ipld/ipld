Selector Fixtures for Recursion
===============================

This file contains a bunch of fixtures for selectors.
These are suitable both as mechanical test fixtures, and as examples for humans.

### What's covered?

This file focuses on recursion clauses,
and especially tries to probe areas that are likely to contain interesting edge cases.

### What's the fixture format?

Same as described in [selector-fixtures-1](../selector-fixtures-1/#whats-the-fixture-format).

---


Fixtures
--------

### recursion with an immediate edge

#### data

[testmark]:# (recursion-with-immediate-edge/data)
```json
[0]
```

#### selector

[testmark]:# (recursion-with-immediate-edge/selector)
```json
{
	"R": {
		"l": {
			"none": {}
		},
		":>": {
			"@": {}
		}
	}
}
```

#### expected visit events

This selector is fairly nonsensical, but since it compiles at all, it does begin a walk,
and as a result, it does still cause the root node to be visited.

[testmark]:# (recursion-with-immediate-edge/expect-visit)
```text
{"path": "", "node": {"list": null}, "matched": false}
```
