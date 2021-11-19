DAG-JOSE Fixtures
=================

About this document
-------------------

This document contains test fixtures for the [DAG-JOSE](..) codec, and documentation describing them.

These fixtures are executable by parsing them using the [testmark format](https://github.com/warpfork/go-testmark).
If you're reading this file as markdown, or rendered to the web,
know that all of the codeblocks here are data that can be easily programmatically extracted and used to drive tests in your implementation.

These fixtures offer several different kinds of data:

- DAG-JOSE serial data -- in hexidemical.  (DAG-JOSE is a binary format, so hexidemical is easier to work with here than the possibly-unprintable binary raw form.)
	- These should be used as both an decode fixture, and as an encode fixture (the data should round-trip).
- The list of paths that should be seen in that data, when parsed as [data model](/docs/data-model/).  (This is a good fixture because it's very human-readable, very easy to test, and also provides a form of documentation.)
- Prettyprinted [DAG-JSON](/docs/codecs/known/dag-json/) data, which is the DAG-JOSE data, parsed, then re-encoded as DAG-JSON, and pretty-printed.  (This gives deep coverage, because it effectively examines every bit of the [data model](/docs/data-model/) view of the data.)

Fixtures
--------

### JWS

This is a DAG-JOSE object, in hexidemical:

[testmark]:# (jws/data.dag-jose.hex)
```
a2677061796c6f616458240171122089556551c3926679cc52c72e182a5619056a4727409ee93a26
d05ad727ca11f46a7369676e61747572657381a26970726f7465637465644f7b22616c67223a2245
64445341227d697369676e61747572655840fbff49e4e65c979955b9196023534913373416a11beb
fdb256c9146903ddb9c450e287be379ca70a5e7bc039b848fb66d4bd5b96dae986941e04e7968d55
b505
```

When it is parsed, we should see these paths within the data
when we walk over it at the [data model](/docs/data-model/) level:

[testmark]:# (jws/paths)
```text
link
payload
signatures
signatures/0
signatures/0/protected
signatures/0/signature
```

If we re-encoded this data in [DAG-JSON](/docs/codecs/known/dag-json/)
(and prettyprint it), we should get this result:

[testmark]:# (jws/data.dag-json-pretty)
```json
{
	"link": {
		"/": "bafyreiejkvsvdq4smz44yuwhfymcuvqzavveoj2at3utujwqlllspsqr6q"
	},
	"payload": "AXESIIlVZVHDkmZ5zFLHLhgqVhkFakcnQJ7pOibQWtcnyhH0",
	"signatures": [
		{
			"protected": "eyJhbGciOiJFZERTQSJ9",
			"signature": "-_9J5OZcl5lVuRlgI1NJEzc0FqEb6_2yVskUaQPducRQ4oe-N5ynCl57wDm4SPtm1L1bltrphpQeBOeWjVW1BQ"
		}
	]
}
```

### JWE symmetric

This is a DAG-JOSE object, in hexidemical:

[testmark]:# (jwe-symmetric/data.dag-jose.hex)
```
a46269764c3d2588b80c8ef02a5ebf308b637461675059900c05b961cc30ac41638029d964486970
726f746563746564581d7b22616c67223a22646972222c22656e63223a224131323847434d227d6a
636970686572746578745818dd7a8b5b6f0d1cffab6aa5bcbcc7c81cece4a38377211691
```

When it is parsed, we should see these paths within the data
when we walk over it at the [data model](/docs/data-model/) level:

[testmark]:# (jwe-symmetric/paths)
```text
ciphertext
iv
protected
tag
```

If we re-encoded this data in [DAG-JSON](/docs/codecs/known/dag-json/)
(and prettyprint it), we should get this result:

[testmark]:# (jwe-symmetric/data.dag-json-pretty)
```json
{
	"ciphertext": "3XqLW28NHP-raqW8vMfIHOzko4N3IRaR",
	"iv": "PSWIuAyO8CpevzCL",
	"protected": "eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4R0NNIn0",
	"tag": "WZAMBblhzDCsQWOAKdlkSA"
}
```

### JWE asymmetric

This is a DAG-JOSE object, in hexidemical:

[testmark]:# (jwe-asymmetric/data.dag-jose.hex)
```
a56269764c43cc693edff366b7ef1e047e63746167508f11e3715bacbb4cab381cf0f84c79cc6970
726f74656374656458267b22616c67223a225253412d4f4145502d323536222c22656e63223a2241
32353647434d227d6a6369706865727465787458185936b0e967aa85a6430e179dcc6627b2dcb848
c47e4733b06a726563697069656e747381a16d656e637279707465645f6b657959010012a61a3787
45107d2f5f88d4dddefaf21c0e61281984496f543cea748280e8f147b0be0f3f027b108b9e6cbaf1
c00049a97581346d245014631ee0afe75565c6f5fd5a81fd8a4ed07b0d3244e086063fc025e7f5e4
f899cd4554430b5e1d50ee490b3839cb0c7e3d7ccdcfce6ec907bd431a3743dd08103e1bfffbac64
76b5c61224ecb06efc6aa9310db0264dbdab0ac4748eb80fdb8d5b1199696850cc0b264adb4313c0
b15730a0f8c0605d9a810f03e340061551331a68500cb23e3a95c8f807d9601bab13b7ff7d4fcdb1
8b6a9858f9bd9f65bd5095d50b196bf1d1850941047c634cac8206e7d8fb41b8a26b769f3621c8ef
93687e3879487cd47173c3
```

When it is parsed, we should see these paths within the data
when we walk over it at the [data model](/docs/data-model/) level:

[testmark]:# (jwe-asymmetric/paths)
```text
ciphertext
iv
protected
recipients
recipients/0
recipients/0/encrypted_key
tag
```

If we re-encoded this data in [DAG-JSON](/docs/codecs/known/dag-json/)
(and prettyprint it), we should get this result:

[testmark]:# (jwe-asymmetric/data.dag-json-pretty)
```json
{
	"ciphertext": "WTaw6WeqhaZDDhedzGYnsty4SMR-RzOw",
	"iv": "Q8xpPt_zZrfvHgR-",
	"protected": "eyJhbGciOiJSU0EtT0FFUC0yNTYiLCJlbmMiOiJBMjU2R0NNIn0",
	"recipients": [
		{
			"encrypted_key": "EqYaN4dFEH0vX4jU3d768hwOYSgZhElvVDzqdIKA6PFHsL4PPwJ7EIuebLrxwABJqXWBNG0kUBRjHuCv51VlxvX9WoH9ik7Qew0yROCGBj_AJef15PiZzUVUQwteHVDuSQs4OcsMfj18zc_ObskHvUMaN0PdCBA-G__7rGR2tcYSJOywbvxqqTENsCZNvasKxHSOuA_bjVsRmWloUMwLJkrbQxPAsVcwoPjAYF2agQ8D40AGFVEzGmhQDLI-OpXI-AfZYBurE7f_fU_NsYtqmFj5vZ9lvVCV1QsZa_HRhQlBBHxjTKyCBufY-0G4omt2nzYhyO-TaH44eUh81HFzww"
		}
	],
	"tag": "jxHjcVusu0yrOBzw-Ex5zA"
}
```





