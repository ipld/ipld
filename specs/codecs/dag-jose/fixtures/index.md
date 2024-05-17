DAG-JOSE Fixtures
=================

About this document
-------------------

This document contains test fixtures for the [DAG-JOSE](..) codec, and documentation describing them.

These fixtures are executable by parsing them using the [testmark format](https://github.com/warpfork/go-testmark).
If you're reading this file as markdown, or rendered to the web,
know that all of the codeblocks here are data that can be easily programmatically extracted and used to drive tests in your implementation.

These fixtures offer several different kinds of data:

- DAG-JOSE serial data -- in hexadecimal.  (DAG-JOSE is a binary format, so hexadecimal is easier to work with here than the possibly-unprintable binary raw form.)
	- These should be used as both an decode fixture, and as an encode fixture (the data should round-trip).
- The list of paths that should be seen in that data, when parsed as [data model](/docs/data-model/).  (This is a good fixture because it's very human-readable, very easy to test, and also provides a form of documentation.)
- Prettyprinted [DAG-JSON](/docs/codecs/known/dag-json/) data, which is the DAG-JOSE data, parsed, then re-encoded as DAG-JSON, and pretty-printed.  (This gives deep coverage, because it effectively examines every bit of the [data model](/docs/data-model/) view of the data.)

Fixtures
--------

### JWS

This is the base32-encoded CID for a DAG-JOSE object, when using SHA2-256 (multihash code 0x12):

[testmark]:# (jws/serial.dag-jose.cid)
```
bagcqceraxvt5izt4sz7kjfrm42dxrutp6ijywgsacllkznzekmfojypkvfea
```

This is a DAG-JOSE object, in hexadecimal:

[testmark]:# (jws/serial.dag-jose.hex)
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

[testmark]:# (jws/datamodel.dag-json.pretty)
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

### JWS with one signature

This is the base32-encoded CID for a DAG-JOSE object, when using SHA2-256 (multihash code 0x12):

[testmark]:# (jws-signature-1/serial.dag-jose.cid)
```
bagcqcerauben4l6ee2wjf2fnkj7vaels4p7lnytenk35j3gl2lzcbtbgyoea
```

This is a DAG-JOSE object, in hexadecimal:

[testmark]:# (jws-signature-1/serial.dag-jose.hex)
```
a2677061796c6f6164582401701220debd7adb3ce56544d22a6f6b93396f6980a8067c2cc134f0f7
801b6331092b956a7369676e61747572657381a26970726f746563746564507b22616c67223a2245
533235364b227d697369676e617475726558404a26065d6ed88be2b16e92252cd9aed25121adac95
ef2a5a002e3d180710feaa53b2d656f3d333e82a7c5655045fea95b2062373ef7ed73bcb703625c4
eb2bd6
```

When it is parsed, we should see these paths within the data
when we walk over it at the [data model](/docs/data-model/) level:

[testmark]:# (jws-signature-1/paths)
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

[testmark]:# (jws-signature-1/datamodel.dag-json.pretty)
```json
{
	"link": {
		"/": "bafybeig6xv5nwphfmvcnektpnojts33jqcuam7bmye2pb54adnrtccjlsu"
	},
	"payload": "AXASIN69ets85WVE0ipva5M5b2mAqAZ8LME08PeAG2MxCSuV",
	"signatures": [
		{
			"protected": "eyJhbGciOiJFUzI1NksifQ",
			"signature": "SiYGXW7Yi-KxbpIlLNmu0lEhrayV7ypaAC49GAcQ_qpTstZW89Mz6Cp8VlUEX-qVsgYjc-9-1zvLcDYlxOsr1g"
		}
	]
}
```

### JWS with another signature

This is the base32-encoded CID for a DAG-JOSE object, when using SHA2-256 (multihash code 0x12):

[testmark]:# (jws-signature-2/serial.dag-jose.cid)
```
bagcqceravvw4bx7jgkxxjwfuqo2yoja6w4cmvmu3gkew3s7yu3vt2ce7riwa
```

This is a DAG-JOSE object, in hexadecimal:

[testmark]:# (jws-signature-2/serial.dag-jose.hex)
```
a2677061796c6f6164582401701220debd7adb3ce56544d22a6f6b93396f6980a8067c2cc134f0f7
801b6331092b956a7369676e61747572657381a26970726f746563746564507b22616c67223a2245
533235364b227d697369676e6174757265584043c3dd4c4e40e4dddad24b4edb035d5329ae987952
c4d17d4a2dfc22fcec31a4990badf2430f9b24da4a7fe51e2453c7edc0f363b8cb8361bfbe27a3a7
b36a5e
```

When it is parsed, we should see these paths within the data
when we walk over it at the [data model](/docs/data-model/) level:

[testmark]:# (jws-signature-2/paths)
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

[testmark]:# (jws-signature-2/datamodel.dag-json.pretty)
```json
{
	"link": {
		"/": "bafybeig6xv5nwphfmvcnektpnojts33jqcuam7bmye2pb54adnrtccjlsu"
	},
	"payload": "AXASIN69ets85WVE0ipva5M5b2mAqAZ8LME08PeAG2MxCSuV",
	"signatures": [
		{
			"protected": "eyJhbGciOiJFUzI1NksifQ",
			"signature": "Q8PdTE5A5N3a0ktO2wNdUymumHlSxNF9Si38IvzsMaSZC63yQw-bJNpKf-UeJFPH7cDzY7jLg2G_viejp7NqXg"
		}
	]
}
```

### JWS with multiple signatures

This is the base32-encoded CID for a DAG-JOSE object, when using SHA2-256 (multihash code 0x12):

[testmark]:# (jws-signatures/serial.dag-jose.cid)
```
bagcqcera542h3xc57nudkgjcceexyzyxrkwi4ikbn773ag6dqdcyjt6z6rga
```

This is a DAG-JOSE object, in hexadecimal:

[testmark]:# (jws-signatures/serial.dag-jose.hex)
```
a2677061796c6f6164582401701220debd7adb3ce56544d22a6f6b93396f6980a8067c2cc134f0f7
801b6331092b956a7369676e61747572657382a26970726f746563746564507b22616c67223a2245
533235364b227d697369676e617475726558404a26065d6ed88be2b16e92252cd9aed25121adac95
ef2a5a002e3d180710feaa53b2d656f3d333e82a7c5655045fea95b2062373ef7ed73bcb703625c4
eb2bd6a26970726f746563746564507b22616c67223a2245533235364b227d697369676e61747572
65584043c3dd4c4e40e4dddad24b4edb035d5329ae987952c4d17d4a2dfc22fcec31a4990badf243
0f9b24da4a7fe51e2453c7edc0f363b8cb8361bfbe27a3a7b36a5e
```

When it is parsed, we should see these paths within the data
when we walk over it at the [data model](/docs/data-model/) level:

[testmark]:# (jws-signatures/paths)
```text
link
payload
signatures
signatures/0
signatures/0/protected
signatures/0/signature
signatures/1
signatures/1/protected
signatures/1/signature
```

If we re-encoded this data in [DAG-JSON](/docs/codecs/known/dag-json/)
(and prettyprint it), we should get this result:

[testmark]:# (jws-signatures/datamodel.dag-json.pretty)
```json
{
	"link": {
		"/": "bafybeig6xv5nwphfmvcnektpnojts33jqcuam7bmye2pb54adnrtccjlsu"
	},
	"payload": "AXASIN69ets85WVE0ipva5M5b2mAqAZ8LME08PeAG2MxCSuV",
	"signatures": [
		{
			"protected": "eyJhbGciOiJFUzI1NksifQ",
			"signature": "SiYGXW7Yi-KxbpIlLNmu0lEhrayV7ypaAC49GAcQ_qpTstZW89Mz6Cp8VlUEX-qVsgYjc-9-1zvLcDYlxOsr1g"
		},
		{
			"protected": "eyJhbGciOiJFUzI1NksifQ",
			"signature": "Q8PdTE5A5N3a0ktO2wNdUymumHlSxNF9Si38IvzsMaSZC63yQw-bJNpKf-UeJFPH7cDzY7jLg2G_viejp7NqXg"
		}
	]
}
```

### JWS with payload

This is the base32-encoded JSON payload for a DAG-JOSE object, when using SHA2-256 (multihash code 0x12):

[testmark]:# (jws-signature-pld/serial.dag-jose.cid)
```
bagcqceras6vcqjafsrhwfsgxmzd6g5c2vm3mfolbbubg5rfuhhnobay4m2vq
```

This is a DAG-JOSE object, in hexadecimal:

[testmark]:# (jws-signature-pld/serial.dag-jose.hex)
```
a2677061796c6f61645901717b2274657374223a227061796c6f6164222c22614c696e6b223a2269
7066733a2f2f6261667962656967367876356e777068666d76636e656b74706e6f6a747333336a71
6375616d37626d7965327062353461646e727463636a6c7375222c22617272223a5b22697066733a
2f2f6261667962656967367876356e777068666d76636e656b74706e6f6a747333336a716375616d
37626d7965327062353461646e727463636a6c7375222c226974656d31222c226974656d32225d2c
226e6573746564223a7b22614c696e6b223a22697066733a2f2f6261667962656967367876356e77
7068666d76636e656b74706e6f6a747333336a716375616d37626d7965327062353461646e727463
636a6c7375222c22617272223a5b22697066733a2f2f6261667962656967367876356e777068666d
76636e656b74706e6f6a747333336a716375616d37626d7965327062353461646e727463636a6c73
75222c226974656d31222c226974656d32225d7d7d6a7369676e61747572657381a26970726f7465
63746564507b22616c67223a2245533235364b227d697369676e61747572655840218f001e1401d2
7e50a4ed68a6c7bcddde87ad759fa1f3e35ba89fe6f541ec3932df08f6f9d693f08d711d7e6ce0f6
ee0b7a30668dabafc0be9c642c7ed1c4fb
```

When it is parsed, we should see these paths within the data
when we walk over it at the [data model](/docs/data-model/) level:

[testmark]:# (jws-signature-pld/paths)
```text
payload
pld
pld/aLink
pld/arr
pld/arr/0
pld/arr/1
pld/arr/2
pld/nested/aLink
pld/nested/arr
pld/nested/arr/0
pld/nested/arr/1
pld/nested/arr/2
signatures
signatures/0
signatures/0/protected
signatures/0/signature
```

If we re-encoded this data in [DAG-JSON](/docs/codecs/known/dag-json/)
(and prettyprint it), we should get this result:

[testmark]:# (jws-signature-pld/datamodel.dag-json.pretty)
```json
{
	"payload": "eyJ0ZXN0IjoicGF5bG9hZCIsImFMaW5rIjoiaXBmczovL2JhZnliZWlnNnh2NW53cGhmbXZjbmVrdHBub2p0czMzanFjdWFtN2JteWUycGI1NGFkbnJ0Y2NqbHN1IiwiYXJyIjpbImlwZnM6Ly9iYWZ5YmVpZzZ4djVud3BoZm12Y25la3Rwbm9qdHMzM2pxY3VhbTdibXllMnBiNTRhZG5ydGNjamxzdSIsIml0ZW0xIiwiaXRlbTIiXSwibmVzdGVkIjp7ImFMaW5rIjoiaXBmczovL2JhZnliZWlnNnh2NW53cGhmbXZjbmVrdHBub2p0czMzanFjdWFtN2JteWUycGI1NGFkbnJ0Y2NqbHN1IiwiYXJyIjpbImlwZnM6Ly9iYWZ5YmVpZzZ4djVud3BoZm12Y25la3Rwbm9qdHMzM2pxY3VhbTdibXllMnBiNTRhZG5ydGNjamxzdSIsIml0ZW0xIiwiaXRlbTIiXX19",
	"pld": {
        "test": "payload",
        "aLink": {
			"/": "bafybeig6xv5nwphfmvcnektpnojts33jqcuam7bmye2pb54adnrtccjlsu"
		},
        "arr": [
			{
				"/": "bafybeig6xv5nwphfmvcnektpnojts33jqcuam7bmye2pb54adnrtccjlsu"
			},
			"item1",
			"item2"
		],
        "nested": {
			"aLink": {
				"/": "bafybeig6xv5nwphfmvcnektpnojts33jqcuam7bmye2pb54adnrtccjlsu"
			},
			"arr": [
				{
					"/": "bafybeig6xv5nwphfmvcnektpnojts33jqcuam7bmye2pb54adnrtccjlsu"
				},
				"item1",
				"item2"
			],
        }
      },
	"signatures": [
		{
			"protected": "eyJhbGciOiJFUzI1NksifQ",
			"signature": "IY8AHhQB0n5QpO1opse83d6HrXWfofPjW6if5vVB7Dky3wj2-daT8I1xHX5s4PbuC3owZo2rr8C-nGQsftHE-w"
		}
	]
}
```

### JWE symmetric

This is the base32-encoded CID for a DAG-JOSE object, when using SHA2-256 (multihash code 0x12):

[testmark]:# (jwe-symmetric/serial.dag-jose.cid)
```
bagcqceraxazmu67crshzqdeg3kwnfschs25epy5sbtqtjre2qw3d62kzplva
```

This is a DAG-JOSE object, in hexadecimal:

[testmark]:# (jwe-symmetric/serial.dag-jose.hex)
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

[testmark]:# (jwe-symmetric/datamodel.dag-json.pretty)
```json
{
	"ciphertext": "3XqLW28NHP-raqW8vMfIHOzko4N3IRaR",
	"iv": "PSWIuAyO8CpevzCL",
	"protected": "eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4R0NNIn0",
	"tag": "WZAMBblhzDCsQWOAKdlkSA"
}
```

### JWE asymmetric

This is the base32-encoded CID for a DAG-JOSE object, when using SHA2-256 (multihash code 0x12):

[testmark]:# (jwe-asymmetric/serial.dag-jose.cid)
```
bagcqceraqfknq7xaemcihmq2albau32ttrutxnco7xeoik6mlejismmvw5zq
```

This is a DAG-JOSE object, in hexadecimal:

[testmark]:# (jwe-asymmetric/serial.dag-jose.hex)
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

[testmark]:# (jwe-asymmetric/datamodel.dag-json.pretty)
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

### JWE with no recipients

This is the base32-encoded CID for a DAG-JOSE object, when using SHA2-256 (multihash code 0x12):

[testmark]:# (jwe-no-recipients/serial.dag-jose.cid)
```
bagcqcerakjv2mmdlbai3urym22bw5kaw7nqov73yaxf6xjnp7e56sclsrooa
```

This is a DAG-JOSE object, in hexadecimal:

[testmark]:# (jwe-no-recipients/serial.dag-jose.hex)
```
a4626976581888973bef4a3aa96b35e709599cdac66986339c874ad12aef6374616750127fb33242
5d0e8ed041ef6bab18cb3c6970726f746563746564581b7b22616c67223a22646972222c22656e63
223a225843323050227d6a636970686572746578745824342a13fe20e72eab6a9161d04680bfe356
1f199cb97462d2e894f7a89a18af39c7cf90d6
```

When it is parsed, we should see these paths within the data
when we walk over it at the [data model](/docs/data-model/) level:

[testmark]:# (jwe-no-recipients/paths)
```text
ciphertext
iv
protected
tag
```

If we re-encoded this data in [DAG-JSON](/docs/codecs/known/dag-json/)
(and prettyprint it), we should get this result:

[testmark]:# (jwe-no-recipients/datamodel.dag-json.pretty)
```json
{
	"ciphertext": "NCoT_iDnLqtqkWHQRoC_41YfGZy5dGLS6JT3qJoYrznHz5DW",
	"iv": "iJc770o6qWs15wlZnNrGaYYznIdK0Srv",
	"protected": "eyJhbGciOiJkaXIiLCJlbmMiOiJYQzIwUCJ9",
	"tag": "En-zMkJdDo7QQe9rqxjLPA"
}
```

### JWE with one recipient

This is the base32-encoded CID for a DAG-JOSE object, when using SHA2-256 (multihash code 0x12):

[testmark]:# (jwe-recipient/serial.dag-jose.cid)
```
bagcqcera7azagcqlpu4ivvh4xp4iv6psmb5d7eki6ln3fnfnsnbb2hzv4nxq
```

This is a DAG-JOSE object, in hexadecimal:

[testmark]:# (jwe-recipient/serial.dag-jose.hex)
```
a5626976581851f600419a8d3f70ccaee5aec5ae140800db167d0f28f8ff6374616750961d1d6a0a
53ed277b6f6329a62337bf6970726f7465637465644f7b22656e63223a225843323050227d6a6369
706865727465787458244a12a86f8ea14ae9a91349a877adddc875221b9062c52c175191276aced6
fd0c1f71ecb66a726563697069656e747381a266686561646572a4626976782057587a76414e595f
7466736f3765764861764f66372d627858556b2d786e4f5063616c676f454344482d45532b584332
30504b576365706ba36178782b6b6d614b427478426c4566477056527044305a4d6b316266774e33
5667466359556b505a49396f5544456f6363727666583235353139636b7479634f4b506374616776
3371595348304f374a5a4b5764355f3734436d2d5a676d656e637279707465645f6b65795820c27c
58cc7f55108f13720fd46836fe8d534b91fa5a837c5e63f6b5a7b00c1f67
```

When it is parsed, we should see these paths within the data
when we walk over it at the [data model](/docs/data-model/) level:

[testmark]:# (jwe-recipient/paths)
```text
ciphertext
iv
protected
recipients
recipients/0
recipients/0/header
recipients/0/header/iv
recipients/0/header/alg
recipients/0/header/epk
recipients/0/header/epk/x
recipients/0/header/epk/crv
recipients/0/header/epk/kty
recipients/0/header/tag
recipients/0/encrypted_key
tag
```

If we re-encoded this data in [DAG-JSON](/docs/codecs/known/dag-json/)
(and prettyprint it), we should get this result:

[testmark]:# (jwe-recipient/datamodel.dag-json.pretty)
```json
{
	"ciphertext": "ShKob46hSumpE0mod63dyHUiG5BixSwXUZEnas7W_Qwfcey2",
	"iv": "UfYAQZqNP3DMruWuxa4UCADbFn0PKPj_",
	"protected": "eyJlbmMiOiJYQzIwUCJ9",
	"recipients": [
		{
			"encrypted_key": "wnxYzH9VEI8Tcg_UaDb-jVNLkfpag3xeY_a1p7AMH2c",
			"header": {
				"alg": "ECDH-ES+XC20PKW",
				"epk": {
					"crv": "X25519",
					"kty": "OKP",
					"x": "kmaKBtxBlEfGpVRpD0ZMk1bfwN3VgFcYUkPZI9oUDEo"
				},
				"iv": "WXzvANY_tfso7evHavOf7-bxXUk-xnOP",
				"tag": "3qYSH0O7JZKWd5_74Cm-Zg"
			}
		}
	],
	"tag": "lh0dagpT7Sd7b2MppiM3vw"
}
```

### JWE with multiple recipients

This is the base32-encoded CID for a DAG-JOSE object, when using SHA2-256 (multihash code 0x12):

[testmark]:# (jwe-recipients/serial.dag-jose.cid)
```
bagcqcera5uvz2qai6l4vmqjigwpowluilxngz3dyjnva2s3uwbfb5u4ao4fa
```

This is a DAG-JOSE object, in hexadecimal:

[testmark]:# (jwe-recipients/serial.dag-jose.hex)
```
a56269765818f3f3c92467c191b2a33f703edc72bf09f6538392160737746374616750803e4b5f3e
3f87518fe1776ff52feef96970726f7465637465644f7b22656e63223a225843323050227d6a6369
706865727465787458246dfdc48e4b46a6b77ba5443c9b3538ba47bcff8283c0de99f8f1c15fae56
d0994da891bd6a726563697069656e747382a266686561646572a4626976782041674c795961746c
4a6e4771586f39466159356173794e4d6a694b664d64745a63616c676f454344482d45532b584332
30504b576365706ba36178782b45707255565a424b7a644b575766644a6437724a672d2d5f385a68
6b414e65356e7a686c653056704179676363727666583235353139636b7479634f4b506374616776
365f7532354f747055425756587a76765064707053416d656e637279707465645f6b657958200c5c
d81201eb63af7b2dcecc4f29f3bce66f00fc39646085e5c9b0d69ae414daa266686561646572a462
697678206c7244625738456c63385330675437695f794a52684c4e516b576c41516a4a3363616c67
6f454344482d45532b58433230504b576365706ba36178782b7a426475443459577068372d4f5349
703346674646325656417a55443778684766792d6a327061347a5141636372766658323535313963
6b7479634f4b5063746167764b334b396b593331505137476d50625f4741496f76516d656e637279
707465645f6b65795820987d496475ef5e759153c355d2493edb6a7007b2e8a188a01026fa6636f7
7be0
```

When it is parsed, we should see these paths within the data
when we walk over it at the [data model](/docs/data-model/) level:

[testmark]:# (jwe-recipients/paths)
```text
ciphertext
iv
protected
recipients
recipients/0
recipients/0/header
recipients/0/header/iv
recipients/0/header/alg
recipients/0/header/epk
recipients/0/header/epk/x
recipients/0/header/epk/crv
recipients/0/header/epk/kty
recipients/0/header/tag
recipients/0/encrypted_key
recipients/1
recipients/1/header
recipients/1/header/iv
recipients/1/header/alg
recipients/1/header/epk
recipients/1/header/epk/x
recipients/1/header/epk/crv
recipients/1/header/epk/kty
recipients/1/header/tag
recipients/1/encrypted_key
tag
```

If we re-encoded this data in [DAG-JSON](/docs/codecs/known/dag-json/)
(and prettyprint it), we should get this result:

[testmark]:# (jwe-recipients/datamodel.dag-json.pretty)
```json
{
	"ciphertext": "bf3EjktGprd7pUQ8mzU4uke8_4KDwN6Z-PHBX65W0JlNqJG9",
	"iv": "8_PJJGfBkbKjP3A-3HK_CfZTg5IWBzd0",
	"protected": "eyJlbmMiOiJYQzIwUCJ9",
	"recipients": [
		{
			"encrypted_key": "DFzYEgHrY697Lc7MTynzvOZvAPw5ZGCF5cmw1prkFNo",
			"header": {
				"alg": "ECDH-ES+XC20PKW",
				"epk": {
					"crv": "X25519",
					"kty": "OKP",
					"x": "EprUVZBKzdKWWfdJd7rJg--_8ZhkANe5nzhle0VpAyg"
				},
				"iv": "AgLyYatlJnGqXo9FaY5asyNMjiKfMdtZ",
				"tag": "6_u25OtpUBWVXzvvPdppSA"
			}
		},
		{
			"encrypted_key": "mH1JZHXvXnWRU8NV0kk-22pwB7LooYigECb6Zjb3e-A",
			"header": {
				"alg": "ECDH-ES+XC20PKW",
				"epk": {
					"crv": "X25519",
					"kty": "OKP",
					"x": "zBduD4YWph7-OSIp3FgFF2VVAzUD7xhGfy-j2pa4zQA"
				},
				"iv": "lrDbW8Elc8S0gT7i_yJRhLNQkWlAQjJ3",
				"tag": "K3K9kY31PQ7GmPb_GAIovQ"
			}
		}
	],
	"tag": "gD5LXz4_h1GP4Xdv9S_u-Q"
}
```
