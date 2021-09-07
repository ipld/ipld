---
templateEngineOverride: md
---

# Cross-codec fixtures for dag-pb

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

### dagpb_11unnamedlinks+data

**Bytes**

[testmark]:# (dagpb_11unnamedlinks+data/dag-pb/bytes)
```
122a0a2212205822d187bd40b04cc8ae7437888ebf844efac1729e098c8816d585d0fcc42b5b1200188e8010122a0a2212200b79badee10dc3f7781a7a9d0f020cc0f710b328c4975c2dbc30a170cd188e2c1200188e8010122a0a22122022ad631c69ee983095b5b8acd029ff94aff1dc6c48837878589a92b90dfea3171200188e8010122a0a221220df7fd08c4784fe6938c640df473646e4f16c7d0c6567ab79ec6981767fc3f01a1200188e8010122a0a22122000888c815ad7d055377bdb7b7779fc9740e548cb5dac90c71b9af9f51a879c2d1200188e8010122a0a221220766db372d015c5c700f538336556370165c889334791487a5e48d6080f1c99ea1200188e8010122a0a2212202f533004ceed74279b32c58eb0e3d2a23bc27ba14ab07298406c42bab8d543211200188e8010122a0a2212204c50cfdefa0209766f885919ac8ffc258e9253c3001ac23814f875d414d394731200188e8010122a0a22122000894611dfa192853020cbbade1a9a0a3f359d26e0d38caf4d72b9b306ff5a0b1200188e8010122a0a221220730ddba83e3147bbe10780b97ff0718c74c36037b97b3b79b45c4511806545811200188e8010122a0a22122048ea9d5d423f678d83d559d2349be8325527290b070c90fc1acd968f0bf70a061200188e80100a09736f6d652064617461
```

**dag-pb CID**

[testmark]:# (dagpb_11unnamedlinks+data/dag-pb/cid)
```
bafybeie7xh3zqqmeedkotykfsnj2pi4sacvvsjq6zddvcff4pq7dvyenhu
```

**dag-cbor CID**

[testmark]:# (dagpb_11unnamedlinks+data/dag-cbor/cid)
```
bafyreidjm3xk7rz2d2jap2dvgs54ifj473viuro5q5mfcpjm3rjf73s76y
```

**dag-json CID**

[testmark]:# (dagpb_11unnamedlinks+data/dag-json/cid)
```
baguqeerap7w3wnisyfaoyn6vdjbvhgvzfhqxlmnkpfo2cza3kol3sgiou7zq
```

### dagpb_1link

**Bytes**

[testmark]:# (dagpb_1link/dag-pb/bytes)
```
12240a2212207521fe19c374a97759226dc5c0c8e674e73950e81b211f7dd3b6b30883a08a51
```

**dag-pb CID**

[testmark]:# (dagpb_1link/dag-pb/cid)
```
bafybeihyivpglm6o6wrafbe36fp5l67abmewk7i2eob5wacdbhz7as5obe
```

**dag-cbor CID**

[testmark]:# (dagpb_1link/dag-cbor/cid)
```
bafyreib4mhhkmom5wxnp2hmcjeabbcmzybdiewehujwu73ndvns42zdt4i
```

**dag-json CID**

[testmark]:# (dagpb_1link/dag-json/cid)
```
baguqeerao7xjffeobbqa2zv43ltxadt6pa4f3c2eh4ufsfudbazsmgb55dza
```

### dagpb_2link+data

**Bytes**

[testmark]:# (dagpb_2link+data/dag-pb/bytes)
```
12340a2212208ab7a6c5e74737878ac73863cb76739d15d4666de44e5756bf55a2f9e9ab5f431209736f6d65206c696e6b1880c2d72f12370a2212208ab7a6c5e74737878ac73863cb76739d15d4666de44e5756bf55a2f9e9ab5f44120f736f6d65206f74686572206c696e6b18080a09736f6d652064617461
```

**dag-pb CID**

[testmark]:# (dagpb_2link+data/dag-pb/cid)
```
bafybeibh647pmxyksmdm24uad6b5f7tx4dhvilzbg2fiqgzll4yek7g7y4
```

**dag-cbor CID**

[testmark]:# (dagpb_2link+data/dag-cbor/cid)
```
bafyreia4kjmr364wv7snvuffjjfx6e3ssyhcaxcv3mmewrm6lkg426ycpu
```

**dag-json CID**

[testmark]:# (dagpb_2link+data/dag-json/cid)
```
baguqeerasu2dlp3l3b6xswyh45iegkn3qamarjdygorldhucn3x4kfeafmpa
```

### dagpb_4namedlinks+data

**Bytes**

[testmark]:# (dagpb_4namedlinks+data/dag-pb/bytes)
```
12390a221220b4397c02da5513563d33eef894bf68f2ccdf1bdfc14a976956ab3d1c72f735a0120e617564696f5f6f6e6c792e6d346118cda88f0b12310a221220025c13fcd1a885df444f64a4a82a26aea867b1148c68cb671e83589f971149321208636861742e74787418e40712340a2212205d44a305b9b328ab80451d0daa72a12a7bf2763c5f8bbe327597a31ee40d1e48120c706c61796261636b2e6d3375187412360a2212202539ed6e85f2a6f9097db9d76cffd49bf3042eb2e3e8e9af4a3ce842d49dea22120a7a6f6f6d5f302e6d70341897fb8592010a020801
```

**dag-pb CID**

[testmark]:# (dagpb_4namedlinks+data/dag-pb/cid)
```
bafybeigcsevw74ssldzfwhiijzmg7a35lssfmjkuoj2t5qs5u5aztj47tq
```

**dag-cbor CID**

[testmark]:# (dagpb_4namedlinks+data/dag-cbor/cid)
```
bafyreiagdu5zh6jtk3vnkyltyfpw6tyxtlp24bortutx6dggmmydno3gti
```

**dag-json CID**

[testmark]:# (dagpb_4namedlinks+data/dag-json/cid)
```
baguqeerapvtwnk5agczlqn7dgiyci5ku54llg32dmn3zvynn3dglte6y3s6q
```

### dagpb_7unnamedlinks+data

**Bytes**

[testmark]:# (dagpb_7unnamedlinks+data/dag-pb/bytes)
```
122b0a2212203f29086b59b9e046b362b4b19c9371e834a9f5a80597af83be6d8b7d1a5ad33b120018aed4e015122b0a221220ae1a5afd7c770507dddf17f92bba7a326974af8ae5277c198cf13206373f7263120018aed4e015122b0a22122022ab2ebf9c3523077bd6a171d516ea0e1be1beb132d853778bcc62cd208e77f1120018aed4e015122b0a22122040a77fe7bc69bbef2491f7633b7c462d0bce968868f88e2cbcaae9d0996997e8120018aed4e015122b0a2212206ae1979b14dd43966b0241ebe80ac2a04ad48959078dc5affa12860648356ef6120018aed4e015122b0a221220a957d1f89eb9a861593bfcd19e0637b5c957699417e2b7f23c88653a240836c4120018aed4e015122b0a221220345f9c2137a2cd76d7b876af4bfecd01f80b7dd125f375cb0d56f8a2f96de2c31200189bfec10f0a2b080218cbc1819201208080e015208080e015208080e015208080e015208080e015208080e01520cbc1c10f
```

**dag-pb CID**

[testmark]:# (dagpb_7unnamedlinks+data/dag-pb/cid)
```
bafybeibfhhww5bpsu34qs7nz25wp7ve36mcc5mxd5du26sr45bbnjhpkei
```

**dag-cbor CID**

[testmark]:# (dagpb_7unnamedlinks+data/dag-cbor/cid)
```
bafyreidz4mncr25kzd3lakhmm56twyeauqpmrczheq4husqlfu4ificjy4
```

**dag-json CID**

[testmark]:# (dagpb_7unnamedlinks+data/dag-json/cid)
```
baguqeerab53i2tx2ktr3nbztcguof3pwadl6264yh5pt6h5ygxavlxghkkba
```

### dagpb_Data_some

**Bytes**

[testmark]:# (dagpb_Data_some/dag-pb/bytes)
```
0a050001020304
```

**dag-pb CID**

[testmark]:# (dagpb_Data_some/dag-pb/cid)
```
bafybeibazl2z4vqp2tmwcfag6wirmtpnomxknqcgrauj7m2yisrz3qjbom
```

**dag-cbor CID**

[testmark]:# (dagpb_Data_some/dag-cbor/cid)
```
bafyreieculsmrexh3ty5jentbvuku452o27mst4h2tq2rb2zntqhgcstji
```

**dag-json CID**

[testmark]:# (dagpb_Data_some/dag-json/cid)
```
baguqeerajwksxu3lxpomdwxvosl542zl3xknhjgxtq3277gafrhl6vdw5tcq
```

### dagpb_Data_zero

**Bytes**

[testmark]:# (dagpb_Data_zero/dag-pb/bytes)
```
0a00
```

**dag-pb CID**

[testmark]:# (dagpb_Data_zero/dag-pb/cid)
```
bafybeiaqfni3s5s2k2r6rgpxz4hohdsskh44ka5tk6ztbjerqpvxwfkwaq
```

**dag-cbor CID**

[testmark]:# (dagpb_Data_zero/dag-cbor/cid)
```
bafyreih7w5oijm4kksxrkuvpspuobxpfn5a6l2uerxyfpdfdjzrirlwaiq
```

**dag-json CID**

[testmark]:# (dagpb_Data_zero/dag-json/cid)
```
baguqeera7gxsmhbdmzwv3fgp4naa5idang7hm6hupkxshvm34taqiakw4zvq
```

### dagpb_Links_Hash_some

**Bytes**

[testmark]:# (dagpb_Links_Hash_some/dag-pb/bytes)
```
120b0a09015500050001020304
```

**dag-pb CID**

[testmark]:# (dagpb_Links_Hash_some/dag-pb/cid)
```
bafybeia53f5n75ituvc3yupuf7tdnxf6fqetrmo2alc6g6iljkmk7ys5mm
```

**dag-cbor CID**

[testmark]:# (dagpb_Links_Hash_some/dag-cbor/cid)
```
bafyreico7im6nfzt2euwvdrs62ylgx2w6fmjdrxl2zaz5up5uhqwgwsnhe
```

**dag-json CID**

[testmark]:# (dagpb_Links_Hash_some/dag-json/cid)
```
baguqeeraumofom6evitwofvbunn2ocdqw5vxl7wnfxdjyqr5m6h2zgtnselq
```

### dagpb_Links_Hash_some_Name_some

**Bytes**

[testmark]:# (dagpb_Links_Hash_some_Name_some/dag-pb/bytes)
```
12160a090155000500010203041209736f6d65206e616d65
```

**dag-pb CID**

[testmark]:# (dagpb_Links_Hash_some_Name_some/dag-pb/cid)
```
bafybeifq4hcxma3kjljrpxtunnljtc6tvbkgsy3vldyfpfbx2lij76niyu
```

**dag-cbor CID**

[testmark]:# (dagpb_Links_Hash_some_Name_some/dag-cbor/cid)
```
bafyreigi3x5lx7auupkm3z27b5emluvkrv3mwpq35244zy4cnqjplyr2fi
```

**dag-json CID**

[testmark]:# (dagpb_Links_Hash_some_Name_some/dag-json/cid)
```
baguqeeras44ncqauojywh67izb3d5j7rjbgdscdfsglzaex3envlwzq3lvxa
```

### dagpb_Links_Hash_some_Name_zero

**Bytes**

[testmark]:# (dagpb_Links_Hash_some_Name_zero/dag-pb/bytes)
```
120d0a090155000500010203041200
```

**dag-pb CID**

[testmark]:# (dagpb_Links_Hash_some_Name_zero/dag-pb/cid)
```
bafybeie7fstnkm4yshfwnmpp7d3mlh4f4okmk7a54d6c3ffr755q7qzk44
```

**dag-cbor CID**

[testmark]:# (dagpb_Links_Hash_some_Name_zero/dag-cbor/cid)
```
bafyreigtcfxx5v7f4gdcbnouvhpwgfjmhh4pqgeu3sznfm6y4ql62g4urq
```

**dag-json CID**

[testmark]:# (dagpb_Links_Hash_some_Name_zero/dag-json/cid)
```
baguqeeraodk4mmutpv6bqhjd3kx5oicgnxq365lxu7h3orewh54avtttmzca
```

### dagpb_Links_Hash_some_Tsize_some

**Bytes**

[testmark]:# (dagpb_Links_Hash_some_Tsize_some/dag-pb/bytes)
```
12140a0901550005000102030418ffffffffffffff0f
```

**dag-pb CID**

[testmark]:# (dagpb_Links_Hash_some_Tsize_some/dag-pb/cid)
```
bafybeiezymjvhwfuharanxmzxwuomzjjuzqjewjolr4phaiyp6l7qfwo64
```

**dag-cbor CID**

[testmark]:# (dagpb_Links_Hash_some_Tsize_some/dag-cbor/cid)
```
bafyreidfgtcksdb5gn4jn2eggnqkktnahqzmvprrv7pakqmiwz25aej62y
```

**dag-json CID**

[testmark]:# (dagpb_Links_Hash_some_Tsize_some/dag-json/cid)
```
baguqeera5drb4r7jf33wkkhs4dvxqsyacnxvv7djbzylt4ib2t42qk4qqkxa
```

### dagpb_Links_Hash_some_Tsize_zero

**Bytes**

[testmark]:# (dagpb_Links_Hash_some_Tsize_zero/dag-pb/bytes)
```
120d0a090155000500010203041800
```

**dag-pb CID**

[testmark]:# (dagpb_Links_Hash_some_Tsize_zero/dag-pb/cid)
```
bafybeichjs5otecmbvwh5azdr4jc45mp2qcofh2fr54wjdxhz4znahod2i
```

**dag-cbor CID**

[testmark]:# (dagpb_Links_Hash_some_Tsize_zero/dag-cbor/cid)
```
bafyreia2x5mgcqwslci2apn3d5t6ptnknbw4jmnedjkynp6jxjdxb7bvcq
```

**dag-json CID**

[testmark]:# (dagpb_Links_Hash_some_Tsize_zero/dag-json/cid)
```
baguqeerac5ccyh6acqr3kdi5djstwzlu36uprk2dbi4f36ntlafquwthxm7a
```

### dagpb_empty

**Bytes**

[testmark]:# (dagpb_empty/dag-pb/bytes)
```

```

**dag-pb CID**

[testmark]:# (dagpb_empty/dag-pb/cid)
```
bafybeihdwdcefgh4dqkjv67uzcmw7ojee6xedzdetojuzjevtenxquvyku
```

**dag-cbor CID**

[testmark]:# (dagpb_empty/dag-cbor/cid)
```
bafyreihjsq5okmwdasf4hoiauwxv3vxjuwh2kuh4k5pgzzi3hanepxusjm
```

**dag-json CID**

[testmark]:# (dagpb_empty/dag-json/cid)
```
baguqeera6mfu3g6n722vx7dbitpnbiyqnwah4ddy4b5c3rwzxc5pntqcupta
```

### dagpb_simple_forms_1

**Bytes**

[testmark]:# (dagpb_simple_forms_1/dag-pb/bytes)
```
0a03010203
```

**dag-pb CID**

[testmark]:# (dagpb_simple_forms_1/dag-pb/cid)
```
bafybeia2qk4u55f2qj7zimmtpulejgz7urp7rzs44cvledcaj42gltkk3u
```

**dag-cbor CID**

[testmark]:# (dagpb_simple_forms_1/dag-cbor/cid)
```
bafyreiahe732takf4lhvcjrpeycxs2sccncd7zd5frj5w2hmmyhnokfwsy
```

**dag-json CID**

[testmark]:# (dagpb_simple_forms_1/dag-json/cid)
```
baguqeerabji5n2rfqif4kflih4r2tyl2jz3n3met5nys2wawsfihvc3guqta
```

### dagpb_simple_forms_2

**Bytes**

[testmark]:# (dagpb_simple_forms_2/dag-pb/bytes)
```
120b0a0901550005000102030412100a09015500050001020304120362617212100a090155000500010203041203666f6f
```

**dag-pb CID**

[testmark]:# (dagpb_simple_forms_2/dag-pb/cid)
```
bafybeiahfgovhod2uvww72vwdgatl5r6qkoeegg7at2bghiokupfphqcku
```

**dag-cbor CID**

[testmark]:# (dagpb_simple_forms_2/dag-cbor/cid)
```
bafyreibpoilwc75tlwglfzlziunq65l6arvzwwrhikal5kwlens6ql53ky
```

**dag-json CID**

[testmark]:# (dagpb_simple_forms_2/dag-json/cid)
```
baguqeeraibdu3hqnftoo7zlwqzcsk3pw4sf6epneqziyf7oehsde7ykbxula
```

### dagpb_simple_forms_3

**Bytes**

[testmark]:# (dagpb_simple_forms_3/dag-pb/bytes)
```
120b0a09015500050001020304120e0a09015500050001020304120161120e0a09015500050001020304120161
```

**dag-pb CID**

[testmark]:# (dagpb_simple_forms_3/dag-pb/cid)
```
bafybeidrg2f6slbv4yzydqtgmsi2vzojajnt7iufcreynfpxndca4z5twm
```

**dag-cbor CID**

[testmark]:# (dagpb_simple_forms_3/dag-cbor/cid)
```
bafyreibeevwwdfmicvdswiaetz62wtlj5nqe7idei2tn2irhco5k37js3y
```

**dag-json CID**

[testmark]:# (dagpb_simple_forms_3/dag-json/cid)
```
baguqeeraas77sl6e3odguo3gfdarftcqqnarlh7kae7vnleh7zzmswnztzpq
```

### dagpb_simple_forms_4

**Bytes**

[testmark]:# (dagpb_simple_forms_4/dag-pb/bytes)
```
120e0a09015500050001020304120161120e0a09015500050001020304120161
```

**dag-pb CID**

[testmark]:# (dagpb_simple_forms_4/dag-pb/cid)
```
bafybeieube7zxmzoc5bgttub2aqofi6xdzimv5munkjseeqccn36a6v6j4
```

**dag-cbor CID**

[testmark]:# (dagpb_simple_forms_4/dag-cbor/cid)
```
bafyreifw5gwkcd4ck7o7xhxoff33kqpbs6uwznmxbxb6ez6h77zz6gj5ca
```

**dag-json CID**

[testmark]:# (dagpb_simple_forms_4/dag-json/cid)
```
baguqeera3rnjnzebgxuygpqphmofp75upufi7linvrthm2r4cyiibafftqrq
```
