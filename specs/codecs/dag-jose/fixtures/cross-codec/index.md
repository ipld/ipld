---
templateEngineOverride: md
---

# Cross-codec fixtures for dag-jose

## Introduction

This file contains test fixtures in [testmark](https://github.com/warpfork/go-testmark) format to be used programmatically for testing codec implementations. It is intended to be used in conjunction with matching fixture data from other codecs—you will find a similar file to this in the other codecs' fixtures.

Each fixture listed below comprises the bytes of an encoded IPLD block for this codec in hexadecimal form along with its associated CIDv1 (using a SHA2-256 multihash). In addition, CIDs for each alternative IPLD codec that supports this data model form is listed below it.

By loading each of the codecs' testmark fixture files and matching the fixture names between supported codecs, implementations are expected to be able to:

1. Read and decode the IPLD block from these files
2. Re-encode the IPLD block using the supported codecs
3. Compare the CID of the re-encoded block to the expected CID as per the fixture data for that codec

Since the block is encoded in different forms, by re-encoding each decoded form into the different codecs, we are able to test the correctness of the decoding as well as the encoding process. Where the CIDs do not match, there has been a problem either in decoding or encoding the data. If the same error occurs for the data loaded from differently encoded blocks, the error is likely to be with the encoding process. If the error only occurs when re-encoding from a single encoded form of the block then the error may be with the decoding process.

Fixtures are generated in the <https://github.com/ipld/codec-fixtures> repository. Add additional fixtures there if you would like to expand the test suite for this IPLD's codecs.

## Fixtures

### jwe-asymmetric

**Bytes**

[testmark]:# (jwe-asymmetric/dag-jose/bytes)
```
a56269764c43cc693edff366b7ef1e047e63746167508f11e3715bacbb4cab381cf0f84c79cc6970726f74656374656458267b22616c67223a225253412d4f4145502d323536222c22656e63223a224132353647434d227d6a6369706865727465787458185936b0e967aa85a6430e179dcc6627b2dcb848c47e4733b06a726563697069656e747381a16d656e637279707465645f6b657959010012a61a378745107d2f5f88d4dddefaf21c0e61281984496f543cea748280e8f147b0be0f3f027b108b9e6cbaf1c00049a97581346d245014631ee0afe75565c6f5fd5a81fd8a4ed07b0d3244e086063fc025e7f5e4f899cd4554430b5e1d50ee490b3839cb0c7e3d7ccdcfce6ec907bd431a3743dd08103e1bfffbac6476b5c61224ecb06efc6aa9310db0264dbdab0ac4748eb80fdb8d5b1199696850cc0b264adb4313c0b15730a0f8c0605d9a810f03e340061551331a68500cb23e3a95c8f807d9601bab13b7ff7d4fcdb18b6a9858f9bd9f65bd5095d50b196bf1d1850941047c634cac8206e7d8fb41b8a26b769f3621c8ef93687e3879487cd47173c3
```

**dag-jose CID**

[testmark]:# (jwe-asymmetric/dag-jose/cid)
```
bagcqceraqfknq7xaemcihmq2albau32ttrutxnco7xeoik6mlejismmvw5zq
```

**dag-cbor CID**

[testmark]:# (jwe-asymmetric/dag-cbor/cid)
```
bafyreihkt4u6euddfhofkutfzxwet7w7zm5qrjpop655yhnb5dnzqw26lm
```

**dag-json CID**

[testmark]:# (jwe-asymmetric/dag-json/cid)
```
baguqeeraloya3qpa25kl5l4y3bzgl7rhyta2p7lwaocyxx4vpvdligb7mt2q
```

### jwe-symmetric

**Bytes**

[testmark]:# (jwe-symmetric/dag-jose/bytes)
```
a46269764c3d2588b80c8ef02a5ebf308b637461675059900c05b961cc30ac41638029d964486970726f746563746564581d7b22616c67223a22646972222c22656e63223a224131323847434d227d6a636970686572746578745818dd7a8b5b6f0d1cffab6aa5bcbcc7c81cece4a38377211691
```

**dag-jose CID**

[testmark]:# (jwe-symmetric/dag-jose/cid)
```
bagcqceraxazmu67crshzqdeg3kwnfschs25epy5sbtqtjre2qw3d62kzplva
```

**dag-cbor CID**

[testmark]:# (jwe-symmetric/dag-cbor/cid)
```
bafyreicxyzuqbx5yb7ytkgkuofwksbal3ygtswxuri25crxdxms55m5fki
```

**dag-json CID**

[testmark]:# (jwe-symmetric/dag-json/cid)
```
baguqeeraovfm3rr3pvmxm27zgvxp5wycbfih35xih2uznminpnds5esm4jlq
```

### jws

**Bytes**

[testmark]:# (jws/dag-jose/bytes)
```
a2677061796c6f616458240171122089556551c3926679cc52c72e182a5619056a4727409ee93a26d05ad727ca11f46a7369676e61747572657381a26970726f7465637465644f7b22616c67223a224564445341227d697369676e61747572655840fbff49e4e65c979955b9196023534913373416a11bebfdb256c9146903ddb9c450e287be379ca70a5e7bc039b848fb66d4bd5b96dae986941e04e7968d55b505
```

**dag-jose CID**

[testmark]:# (jws/dag-jose/cid)
```
bagcqceraxvt5izt4sz7kjfrm42dxrutp6ijywgsacllkznzekmfojypkvfea
```

**dag-cbor CID**

[testmark]:# (jws/dag-cbor/cid)
```
bafyreihdfxoshbhowufyvjk7kq46dt6h7u6byejmlnifz34z7ocoq7ugk4
```

**dag-json CID**

[testmark]:# (jws/dag-json/cid)
```
baguqeeravexfd6qijjtnzxfqq6kgknnkncztgmvhjhxm6ih352qskolt2gxa
```
