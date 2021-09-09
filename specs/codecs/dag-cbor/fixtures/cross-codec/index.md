---
templateEngineOverride: md
---

# Cross-codec fixtures for dag-cbor

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

### array-2

**Bytes**

[testmark]:# (array-2/dag-cbor/bytes)
```
8102
```

**dag-cbor CID**

[testmark]:# (array-2/dag-cbor/cid)
```
bafyreihdb57fdysx5h35urvxz64ros7zvywshber7id6t6c6fek37jgyfe
```

**dag-json CID**

[testmark]:# (array-2/dag-json/cid)
```
baguqeeraaoewnxu7nonjagzawtdmvczkiyaj73v6amn2xscc2q3jbqf4eivq
```

### array-255

**Bytes**

[testmark]:# (array-255/dag-cbor/bytes)
```
8118ff
```

**dag-cbor CID**

[testmark]:# (array-255/dag-cbor/cid)
```
bafyreick3uapgoe63rizj6rptbqwl7pagin26fos32n37fu7uktzcadcdu
```

**dag-json CID**

[testmark]:# (array-255/dag-json/cid)
```
baguqeeraqu2ktsh23n37sd632fp4cmexypune5zki6s23wfygkoemrumjmra
```

### array-3,4,5,6

**Bytes**

[testmark]:# (array-3,4,5,6/dag-cbor/bytes)
```
8403040506
```

**dag-cbor CID**

[testmark]:# (array-3,4,5,6/dag-cbor/cid)
```
bafyreid7y3kwce6omkwi4ziyisf5v2niknzjwab2ofigddwm3bq4xlnovy
```

**dag-json CID**

[testmark]:# (array-3,4,5,6/dag-json/cid)
```
baguqeerazwaj2gukf64chujcb3lhbnndbpx4kssdjcfp4f7pbkkmlrd5ohtq
```

### array-5-nested

**Bytes**

[testmark]:# (array-5-nested/dag-cbor/bytes)
```
8265617272617982626f66820582666e657374656482666172726179736121
```

**dag-cbor CID**

[testmark]:# (array-5-nested/dag-cbor/cid)
```
bafyreihmxfmn5wcpzpiqa6zfefgabxmd2jzr2bd4y2v7c2ss4plkgkabgq
```

**dag-json CID**

[testmark]:# (array-5-nested/dag-json/cid)
```
baguqeera7mqnrv3sxsqeaxf23poe2lyztcxjomr7alr2oapf7slfdrr5ai7q
```

### array-500

**Bytes**

[testmark]:# (array-500/dag-cbor/bytes)
```
811901f4
```

**dag-cbor CID**

[testmark]:# (array-500/dag-cbor/cid)
```
bafyreidasbkb6vj3obxxqqgiz2ahvw7iaxmj446bbnrroj3jt6vzpo5fhm
```

**dag-json CID**

[testmark]:# (array-500/dag-json/cid)
```
baguqeeraqjtyxb73lijycba3pidm5fwai4arowgebxo6yd7rdmmdqqwjzqha
```

### array-6433713753386423

**Bytes**

[testmark]:# (array-6433713753386423/dag-cbor/bytes)
```
811b0016db6db6db6db7
```

**dag-cbor CID**

[testmark]:# (array-6433713753386423/dag-cbor/cid)
```
bafyreifflym5ibfezh3vwegpsh6hngjeczrjw35a7fsgsfqui4vgy2eawu
```

**dag-json CID**

[testmark]:# (array-6433713753386423/dag-json/cid)
```
baguqeerartozez7h34sfzszo3gpcu6mjql5zd57mh6qhmcwf4enmgtukce7q
```

### array-65536

**Bytes**

[testmark]:# (array-65536/dag-cbor/bytes)
```
811a00010000
```

**dag-cbor CID**

[testmark]:# (array-65536/dag-cbor/cid)
```
bafyreiarke72vvg3sfs2nrpzpgnxs7dqcdu2e4ytixgo7snkyoq5w7oddu
```

**dag-json CID**

[testmark]:# (array-65536/dag-json/cid)
```
baguqeeradd2npofdzz4gl4stit2bkixizy3dlvmqrfbjif3dwc6beh556mbq
```

### array-9007199254740991

**Bytes**

[testmark]:# (array-9007199254740991/dag-cbor/bytes)
```
811b001fffffffffffff
```

**dag-cbor CID**

[testmark]:# (array-9007199254740991/dag-cbor/cid)
```
bafyreifjs6kz3aq24pywi7mdrizazmzdsvu3jtd7uut64lvj3mblk2byaa
```

**dag-json CID**

[testmark]:# (array-9007199254740991/dag-json/cid)
```
baguqeeraz4galcrwm4zgvo744npzhwyv3xvbvsaw6ewbtjsun56dragozqoa
```

### array-empty

**Bytes**

[testmark]:# (array-empty/dag-cbor/bytes)
```
80
```

**dag-cbor CID**

[testmark]:# (array-empty/dag-cbor/cid)
```
bafyreidwx2fvfdiaox32v2mnn6sxu3j4qoxeqcuenhtgrv5qv6litfnmoe
```

**dag-json CID**

[testmark]:# (array-empty/dag-json/cid)
```
baguqeeraj5j43immfovaya2uxnpzupwl4xwrfk2nryi3vbz4f4irmeqcxfcq
```

### array-mixed

**Bytes**

[testmark]:# (array-mixed/dag-cbor/bytes)
```
8c1b0016db6db6db6db71a000100001901f40200202238ff3aa5f702b33b0016db6db6db6db74261316fc48c6175657320c39f76c49b746521
```

**dag-cbor CID**

[testmark]:# (array-mixed/dag-cbor/cid)
```
bafyreidufmzzejc3p7gmh6ivp4fjvca5jfazk57nu6vdkvki4c4vpja724
```

**dag-json CID**

[testmark]:# (array-mixed/dag-json/cid)
```
baguqeera4iuxsgqusw3ctry362niptivjyio6dxnsn5afctijsahacub2eza
```

### bytes-a1

**Bytes**

[testmark]:# (bytes-a1/dag-cbor/bytes)
```
41a1
```

**dag-cbor CID**

[testmark]:# (bytes-a1/dag-cbor/cid)
```
bafyreidfn5bivgcww7slkgp7f5iiukoggxr542m4pzl3zn3oia7ozt7ffe
```

**dag-json CID**

[testmark]:# (bytes-a1/dag-json/cid)
```
baguqeera2te22lsmu3vdcg54oi6srd7wkuo3h6tmyvswwakaccayyv6m4tza
```

### bytes-empty

**Bytes**

[testmark]:# (bytes-empty/dag-cbor/bytes)
```
40
```

**dag-cbor CID**

[testmark]:# (bytes-empty/dag-cbor/cid)
```
bafyreigdmqpykrgxyaxtlafqpqhzrb7qy2rh75nldvfd4kok6gl47quzvy
```

**dag-json CID**

[testmark]:# (bytes-empty/dag-json/cid)
```
baguqeerackat3qjvp3wd4jnmm7afadwt2ahpjxqbj7pzxocc4kges5lkkqgq
```

### bytes-long-8bit

**Bytes**

[testmark]:# (bytes-long-8bit/dag-cbor/bytes)
```
58ff000102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f202122232425262728292a2b2c2d2e2f30313233343536373839
3a3b3c3d3e3f404142434445464748494a4b4c4d4e4f505152535455565758595a5b5c5d5e5f606162636465666768696a6b6c6d6e6f707172737475
767778797a7b7c7d7e7f808182838485868788898a8b8c8d8e8f909192939495969798999a9b9c9d9e9fa0a1a2a3a4a5a6a7a8a9aaabacadaeafb0b1
b2b3b4b5b6b7b8b9babbbcbdbebfc0c1c2c3c4c5c6c7c8c9cacbcccdcecfd0d1d2d3d4d5d6d7d8d9dadbdcdddedfe0e1e2e3e4e5e6e7e8e9eaebeced
eeeff0f1f2f3f4f5f6f7f8f9fafbfcfdfe
```

**dag-cbor CID**

[testmark]:# (bytes-long-8bit/dag-cbor/cid)
```
bafyreiaalc4ruy26q4qdrdbjijh2vrecn5c6auefvoz5iyyxgsh7kcjsue
```

**dag-json CID**

[testmark]:# (bytes-long-8bit/dag-json/cid)
```
baguqeerabiuwx2krvxgwuufpkbrus3q7afzmqjofkqbfytqbnsgghzclwvwa
```

### cid-QmQg1v4o9xdT3Q14wh4S7dxZkDjyZ9ssFzFzyep1YrVJBY

**Bytes**

[testmark]:# (cid-QmQg1v4o9xdT3Q14wh4S7dxZkDjyZ9ssFzFzyep1YrVJBY/dag-cbor/bytes)
```
d82a582300122022ad631c69ee983095b5b8acd029ff94aff1dc6c48837878589a92b90dfea317
```

**dag-cbor CID**

[testmark]:# (cid-QmQg1v4o9xdT3Q14wh4S7dxZkDjyZ9ssFzFzyep1YrVJBY/dag-cbor/cid)
```
bafyreidsrf4agofvag5iiksjc7jjehhdcjqggra7cxe3m2movopc7pomr4
```

**dag-json CID**

[testmark]:# (cid-QmQg1v4o9xdT3Q14wh4S7dxZkDjyZ9ssFzFzyep1YrVJBY/dag-json/cid)
```
baguqeera6yza2lamkvlohaytwwccgqrswciqhuglte7qta4vfjuwia5xkxvq
```

### cid-QmRgutAxd8t7oGkSm4wmeuByG6M51wcTso6cubDdQtuEfL

**Bytes**

[testmark]:# (cid-QmRgutAxd8t7oGkSm4wmeuByG6M51wcTso6cubDdQtuEfL/dag-cbor/bytes)
```
d82a582300122031c3d57080d8463a3c63b2923df5a1d40ad7a73eae5a14af584213e5f504ac33
```

**dag-cbor CID**

[testmark]:# (cid-QmRgutAxd8t7oGkSm4wmeuByG6M51wcTso6cubDdQtuEfL/dag-cbor/cid)
```
bafyreidfkreyekhbpfbbau3o4aakvxk6ninfo7baileo7ezgjiunk66er4
```

**dag-json CID**

[testmark]:# (cid-QmRgutAxd8t7oGkSm4wmeuByG6M51wcTso6cubDdQtuEfL/dag-json/cid)
```
baguqeerahpjisfiuqb5vifrkdpz4yzvhfsdt2agktamof2lvg55zssdclq7a
```

### cid-QmXg9Pp2ytZ14xgmQjYEiHjVjMFXzCVVEcRTWJBmLgR39V

**Bytes**

[testmark]:# (cid-QmXg9Pp2ytZ14xgmQjYEiHjVjMFXzCVVEcRTWJBmLgR39V/dag-cbor/bytes)
```
d82a58230012208ab7a6c5e74737878ac73863cb76739d15d4666de44e5756bf55a2f9e9ab5f44
```

**dag-cbor CID**

[testmark]:# (cid-QmXg9Pp2ytZ14xgmQjYEiHjVjMFXzCVVEcRTWJBmLgR39V/dag-cbor/cid)
```
bafyreidqpmseqxbqp3fwb256fmqg4glepd4wfn5ubei7jlcvxpfy7bshge
```

**dag-json CID**

[testmark]:# (cid-QmXg9Pp2ytZ14xgmQjYEiHjVjMFXzCVVEcRTWJBmLgR39V/dag-json/cid)
```
baguqeeragkmsqdjvsmershik24tc5kwcgmh6wyahxdzlqi7vrblz4jjsjnfq
```

### cid-arrayof

**Bytes**

[testmark]:# (cid-arrayof/dag-cbor/bytes)
```
90d82a58250001711220785197229dc8bb1152945da58e2348f7e279eeded06cc2ca736d0e879858b501d82a582500017012207252523e6591fb8fe5
53d67ff55a86f84044b46a3e4176e10c58fa529a4aabd5d82a58190001781114c876ceeaa8b30123bc5fc99359e682a737308659d82a58230012208a
b7a6c5e74737878ac73863cb76739d15d4666de44e5756bf55a2f9e9ab5f44d82a582300122022ad631c69ee983095b5b8acd029ff94aff1dc6c4883
7878589a92b90dfea317d82a582300122031c3d57080d8463a3c63b2923df5a1d40ad7a73eae5a14af584213e5f504ac33d82a5825000155122081cc
5b17018674b401b42f35ba07bb79e211239c23bffe658da1577e3e646877d82a5826000185011220fee347e160f04149130aff63259712dca7aec9ec
ff70a3d4d4942b5d64b09d05d82a58250001551220b6fbd675f98e2abd22d4ed29fdc83150fedc48597e92dd1a7a24381d44a27451d82a5825000171
122069ea0740f9807a28f4d932c62e7c1c83be055e55072c90266ab3e79df63a365bd82a5825000171122089556551c3926679cc52c72e182a561905
6a4727409ee93a26d05ad727ca11f4d82a58260001c001562008ce3d9731b000c08338455c8a4a6bd05da16e26b11daa1b917184ece80f0400d82a58
260001c0015620960143fe2c5e22cc0bf0cd5534d7f7f4347f4e75223d07379b9af71400000000d82a58260001b1015620c3f2244dfb3c833c62e72e
05b7fd1bd6bcba2d6cd455984a1059db7a4bf38348d82a58260001b00156201b7c39197e95b49b38ff96c7bf9e1db4a9f36b5698ecd6000000000000
000000d82a4a00015500050001020304
```

**dag-cbor CID**

[testmark]:# (cid-arrayof/dag-cbor/cid)
```
bafyreidhjbzws7yyooefukqt4xvbrctkz5pj5c7dnhdea6nepemymhkccm
```

**dag-json CID**

[testmark]:# (cid-arrayof/dag-json/cid)
```
baguqeeraqcw26pvoc6mesw7zrnz7bpqmfe7m4agdarke2nytwbqn7kuszdcq
```

### cid-bafkqabiaaebagba

**Bytes**

[testmark]:# (cid-bafkqabiaaebagba/dag-cbor/bytes)
```
d82a4a00015500050001020304
```

**dag-cbor CID**

[testmark]:# (cid-bafkqabiaaebagba/dag-cbor/cid)
```
bafyreihm764rs4lirtozq4d5d4pqext5b5akh6val7cyphu4aglvpha3xm
```

**dag-json CID**

[testmark]:# (cid-bafkqabiaaebagba/dag-json/cid)
```
baguqeerarlku7yrcztgkqfowmc5lzvjnavntg2xuwkr6j5lpczxipwxizmma
```

### cid-bafkreiebzrnroamgos2adnbpgw5apo3z4iishhbdx77gldnbk57d4zdio4

**Bytes**

[testmark]:# (cid-bafkreiebzrnroamgos2adnbpgw5apo3z4iishhbdx77gldnbk57d4zdio4/dag-cbor/bytes)
```
d82a5825000155122081cc5b17018674b401b42f35ba07bb79e211239c23bffe658da1577e3e646877
```

**dag-cbor CID**

[testmark]:# (cid-bafkreiebzrnroamgos2adnbpgw5apo3z4iishhbdx77gldnbk57d4zdio4/dag-cbor/cid)
```
bafyreic3yrxqeqgoi24fo3h43nfkfs4cntcx243g3lzv3n2hnmcm5ksnzu
```

**dag-json CID**

[testmark]:# (cid-bafkreiebzrnroamgos2adnbpgw5apo3z4iishhbdx77gldnbk57d4zdio4/dag-json/cid)
```
baguqeera5c374arbqlbujh5m6goc3fnxmi6y7ksn6mdnbonnakmwvqszxqia
```

### cid-bafkreifw7plhl6mofk6sfvhnfh64qmkq73oeqwl6sloru6rehaoujituke

**Bytes**

[testmark]:# (cid-bafkreifw7plhl6mofk6sfvhnfh64qmkq73oeqwl6sloru6rehaoujituke/dag-cbor/bytes)
```
d82a58250001551220b6fbd675f98e2abd22d4ed29fdc83150fedc48597e92dd1a7a24381d44a27451
```

**dag-cbor CID**

[testmark]:# (cid-bafkreifw7plhl6mofk6sfvhnfh64qmkq73oeqwl6sloru6rehaoujituke/dag-cbor/cid)
```
bafyreicsrmbdimdekusleiafgsuwpsvijhmqtecucyxysgcftnptepbb2m
```

**dag-json CID**

[testmark]:# (cid-bafkreifw7plhl6mofk6sfvhnfh64qmkq73oeqwl6sloru6rehaoujituke/dag-json/cid)
```
baguqeeraidhbr47r5gvx64lz5rzpi5wcnqavzgeqoycpag2binbbq2htyl7a
```

### cid-bafyreidj5idub6mapiupjwjsyyxhyhedxycv4vihfsicm2vt46o7morwlm

**Bytes**

[testmark]:# (cid-bafyreidj5idub6mapiupjwjsyyxhyhedxycv4vihfsicm2vt46o7morwlm/dag-cbor/bytes)
```
d82a5825000171122069ea0740f9807a28f4d932c62e7c1c83be055e55072c90266ab3e79df63a365b
```

**dag-cbor CID**

[testmark]:# (cid-bafyreidj5idub6mapiupjwjsyyxhyhedxycv4vihfsicm2vt46o7morwlm/dag-cbor/cid)
```
bafyreihfnilmqbnwzcmqrspmmyik5qdocjdrf3rnkuxb2aanrh2qycf6wy
```

**dag-json CID**

[testmark]:# (cid-bafyreidj5idub6mapiupjwjsyyxhyhedxycv4vihfsicm2vt46o7morwlm/dag-json/cid)
```
baguqeera7sbeilm63szrewp5opgwrnjrae4wzsrnom67vpugro7dgsi2iana
```

### cid-bafyreiejkvsvdq4smz44yuwhfymcuvqzavveoj2at3utujwqlllspsqr6q

**Bytes**

[testmark]:# (cid-bafyreiejkvsvdq4smz44yuwhfymcuvqzavveoj2at3utujwqlllspsqr6q/dag-cbor/bytes)
```
d82a5825000171122089556551c3926679cc52c72e182a5619056a4727409ee93a26d05ad727ca11f4
```

**dag-cbor CID**

[testmark]:# (cid-bafyreiejkvsvdq4smz44yuwhfymcuvqzavveoj2at3utujwqlllspsqr6q/dag-cbor/cid)
```
bafyreif4kmuaiu3fuqmdkb6e7vfdz7x6c2sqjybc5bz3l6b2vnj5e5xjl4
```

**dag-json CID**

[testmark]:# (cid-bafyreiejkvsvdq4smz44yuwhfymcuvqzavveoj2at3utujwqlllspsqr6q/dag-json/cid)
```
baguqeeradow3qosni2sx336td3elm77dozktr3rsuemz5mio5s55zmvjk2ia
```

### cid-bagcqcera73rupyla6bauseyk75rslfys3st25spm75ykhvgusqvv2zfqtucq

**Bytes**

[testmark]:# (cid-bagcqcera73rupyla6bauseyk75rslfys3st25spm75ykhvgusqvv2zfqtucq/dag-cbor/bytes)
```
d82a5826000185011220fee347e160f04149130aff63259712dca7aec9ecff70a3d4d4942b5d64b09d05
```

**dag-cbor CID**

[testmark]:# (cid-bagcqcera73rupyla6bauseyk75rslfys3st25spm75ykhvgusqvv2zfqtucq/dag-cbor/cid)
```
bafyreidvvetydwcmpvymr34rqmz6cu4yhi7jluds6n5yyyqdllssa4jcom
```

**dag-json CID**

[testmark]:# (cid-bagcqcera73rupyla6bauseyk75rslfys3st25spm75ykhvgusqvv2zfqtucq/dag-json/cid)
```
baguqeeraf3abbztiyzwvxvrxz273hx3yo36kifwgiyty5ox4f2zoezvhpz2a
```

### cid-bagyacvradn6dsgl6sw2jwoh7s3d37hq5wsu7g22wtdwnmaaaaaaaaaaaaaaa

**Bytes**

[testmark]:# (cid-bagyacvradn6dsgl6sw2jwoh7s3d37hq5wsu7g22wtdwnmaaaaaaaaaaaaaaa/dag-cbor/bytes)
```
d82a58260001b00156201b7c39197e95b49b38ff96c7bf9e1db4a9f36b5698ecd6000000000000000000
```

**dag-cbor CID**

[testmark]:# (cid-bagyacvradn6dsgl6sw2jwoh7s3d37hq5wsu7g22wtdwnmaaaaaaaaaaaaaaa/dag-cbor/cid)
```
bafyreicwwufftyxxvvbolsj2svwvc3zzo7u23j2hz27edffxzazlhistjy
```

**dag-json CID**

[testmark]:# (cid-bagyacvradn6dsgl6sw2jwoh7s3d37hq5wsu7g22wtdwnmaaaaaaaaaaaaaaa/dag-json/cid)
```
baguqeera5jiw3keif37pw2bta4s5ayrgn73qt3cyn5l7c7h3p6lvaiifhmea
```

### cid-bagyqcvraypzcitp3hsbtyyxhfyc3p7i3226lullm2rkzqsqqlhnxus7tqnea

**Bytes**

[testmark]:# (cid-bagyqcvraypzcitp3hsbtyyxhfyc3p7i3226lullm2rkzqsqqlhnxus7tqnea/dag-cbor/bytes)
```
d82a58260001b1015620c3f2244dfb3c833c62e72e05b7fd1bd6bcba2d6cd455984a1059db7a4bf38348
```

**dag-cbor CID**

[testmark]:# (cid-bagyqcvraypzcitp3hsbtyyxhfyc3p7i3226lullm2rkzqsqqlhnxus7tqnea/dag-cbor/cid)
```
bafyreigyego6qj7uxt5dtmpznwi3mtwz7l5hf7m3udmsvkd2ps2gbmjzs4
```

**dag-json CID**

[testmark]:# (cid-bagyqcvraypzcitp3hsbtyyxhfyc3p7i3226lullm2rkzqsqqlhnxus7tqnea/dag-json/cid)
```
baguqeeram352tvlwv6ysybxyemcxnnbmcnmp5n5w6xkba5kzssew2ocnhc4a
```

### cid-bahaacvrabdhd3fzrwaambazyivoiustl2bo2c3rgweo2ug4rogcoz2apaqaa

**Bytes**

[testmark]:# (cid-bahaacvrabdhd3fzrwaambazyivoiustl2bo2c3rgweo2ug4rogcoz2apaqaa/dag-cbor/bytes)
```
d82a58260001c001562008ce3d9731b000c08338455c8a4a6bd05da16e26b11daa1b917184ece80f0400
```

**dag-cbor CID**

[testmark]:# (cid-bahaacvrabdhd3fzrwaambazyivoiustl2bo2c3rgweo2ug4rogcoz2apaqaa/dag-cbor/cid)
```
bafyreias54gwjsb5z4v3amftdd5h6ufcpuk3zci7klphqoyyjmv52g4uie
```

**dag-json CID**

[testmark]:# (cid-bahaacvrabdhd3fzrwaambazyivoiustl2bo2c3rgweo2ug4rogcoz2apaqaa/dag-json/cid)
```
baguqeera5iayx6m23rrlvkigcbzjy22mx7uqb6femvf45disg4jszkmehwmq
```

### cid-bahaacvrasyauh7rmlyrmyc7qzvktjv7x6q2h6ttvei6qon43tl3riaaaaaaa

**Bytes**

[testmark]:# (cid-bahaacvrasyauh7rmlyrmyc7qzvktjv7x6q2h6ttvei6qon43tl3riaaaaaaa/dag-cbor/bytes)
```
d82a58260001c0015620960143fe2c5e22cc0bf0cd5534d7f7f4347f4e75223d07379b9af71400000000
```

**dag-cbor CID**

[testmark]:# (cid-bahaacvrasyauh7rmlyrmyc7qzvktjv7x6q2h6ttvei6qon43tl3riaaaaaaa/dag-cbor/cid)
```
bafyreiboefkuukdnjhy5sy2ekybhp73yheoy3uj5n36hal6tckhflmp2ye
```

**dag-json CID**

[testmark]:# (cid-bahaacvrasyauh7rmlyrmyc7qzvktjv7x6q2h6ttvei6qon43tl3riaaaaaaa/dag-json/cid)
```
baguqeeraqvq6hotrzxlpgarx5am6klvbnzglzu37dzcjenms7megi5ydxlca
```

### cid-mapof

**Bytes**

[testmark]:# (cid-mapof/dag-cbor/bytes)
```
b0706261666b716162696161656261676261d82a4a0001550005000102030478217a386d57614a31645a39664835456574507552736a386a6a323670
587367707372d82a58190001781114c876ceeaa8b30123bc5fc99359e682a737308659782e516d51673176346f397864543351313477683453376478
5a6b446a795a397373467a467a796570315972564a4259d82a582300122022ad631c69ee983095b5b8acd029ff94aff1dc6c48837878589a92b90dfe
a317782e516d526775744178643874376f476b536d34776d6575427947364d3531776354736f36637562446451747545664cd82a582300122031c3d5
7080d8463a3c63b2923df5a1d40ad7a73eae5a14af584213e5f504ac33782e516d58673950703279745a313478676d516a594569486a566a4d46587a
43565645635254574a426d4c6752333956d82a58230012208ab7a6c5e74737878ac73863cb76739d15d4666de44e5756bf55a2f9e9ab5f4478317a64
6a37576438414d77716e684a47514362467842566f64475342473834544d3748733172634a75514d77547966454453d82a582500017012207252523e
6591fb8fe553d67ff55a86f84044b46a3e4176e10c58fa529a4aabd578317a647075417458375a6962635764534b51776944436b506a577752767463
4b43506b753948374c68674134714a5734576bd82a58250001711220785197229dc8bb1152945da58e2348f7e279eeded06cc2ca736d0e879858b501
783b6261666b72656965627a726e726f616d676f733261646e627067773561706f337a3469697368686264783737676c646e626b353764347a64696f
34d82a5825000155122081cc5b17018674b401b42f35ba07bb79e211239c23bffe658da1577e3e646877783b6261666b726569667737706c686c366d
6f666b36736676686e66683634716d6b7137336f6571776c36736c6f727536726568616f756a6974756b65d82a58250001551220b6fbd675f98e2abd
22d4ed29fdc83150fedc48597e92dd1a7a24381d44a27451783b62616679726569646a3569647562366d61706975706a776a73797978687968656478
79637634766968667369636d32767434366f376d6f72776c6dd82a5825000171122069ea0740f9807a28f4d932c62e7c1c83be055e55072c90266ab3
e79df63a365b783b62616679726569656a6b767376647134736d7a34347975776866796d637576717a617676656f6a326174337574756a77716c6c6c
73707371723671d82a5825000171122089556551c3926679cc52c72e182a5619056a4727409ee93a26d05ad727ca11f4783d62616763716365726137
33727570796c61366261757365796b373572736c667973337374323573706d3735796b6876677573717676327a667174756371d82a58260001850112
20fee347e160f04149130aff63259712dca7aec9ecff70a3d4d4942b5d64b09d05783d626167796163767261646e366473676c367377326a776f6837
733364333768713577737537673232777464776e6d616161616161616161616161616161d82a58260001b00156201b7c39197e95b49b38ff96c7bf9e
1db4a9f36b5698ecd6000000000000000000783d62616779716376726179707a6369747033687362747979786866796333703769333232366c756c6c
6d32726b7a717371716c686e7875733774716e6561d82a58260001b1015620c3f2244dfb3c833c62e72e05b7fd1bd6bcba2d6cd455984a1059db7a4b
f38348783d6261686161637672616264686433667a727761616d62617a7969766f697573746c32626f326333726777656f32756734726f67636f7a32
617061716161d82a58260001c001562008ce3d9731b000c08338455c8a4a6bd05da16e26b11daa1b917184ece80f0400783d62616861616376726173
7961756837726d6c79726d796337717a766b746a7637783671326836747476656936716f6e3433746c33726961616161616161d82a58260001c00156
20960143fe2c5e22cc0bf0cd5534d7f7f4347f4e75223d07379b9af71400000000
```

**dag-cbor CID**

[testmark]:# (cid-mapof/dag-cbor/cid)
```
bafyreig3vhfwxvxnfj77kzmwqkxm7uncmbhjkuqmfhfdnq4p4ikvoen6pm
```

**dag-json CID**

[testmark]:# (cid-mapof/dag-json/cid)
```
baguqeerascicdb4rnbbuu42mlf72eio3ofwpwert74daullms4pabnsdzufa
```

### cid-z8mWaJ1dZ9fH5EetPuRsj8jj26pXsgpsr

**Bytes**

[testmark]:# (cid-z8mWaJ1dZ9fH5EetPuRsj8jj26pXsgpsr/dag-cbor/bytes)
```
d82a58190001781114c876ceeaa8b30123bc5fc99359e682a737308659
```

**dag-cbor CID**

[testmark]:# (cid-z8mWaJ1dZ9fH5EetPuRsj8jj26pXsgpsr/dag-cbor/cid)
```
bafyreiemoe3mh3uanvjypqyrousnwapnluxnmt5lorlhzguj5nvmgjdthi
```

**dag-json CID**

[testmark]:# (cid-z8mWaJ1dZ9fH5EetPuRsj8jj26pXsgpsr/dag-json/cid)
```
baguqeeralmwcgg3knsdtmks5jrpsnbkpzzhourbfcwgpxkxs37syppsw54tq
```

### cid-zdj7Wd8AMwqnhJGQCbFxBVodGSBG84TM7Hs1rcJuQMwTyfEDS

**Bytes**

[testmark]:# (cid-zdj7Wd8AMwqnhJGQCbFxBVodGSBG84TM7Hs1rcJuQMwTyfEDS/dag-cbor/bytes)
```
d82a582500017012207252523e6591fb8fe553d67ff55a86f84044b46a3e4176e10c58fa529a4aabd5
```

**dag-cbor CID**

[testmark]:# (cid-zdj7Wd8AMwqnhJGQCbFxBVodGSBG84TM7Hs1rcJuQMwTyfEDS/dag-cbor/cid)
```
bafyreicrcxd4oefvax3uw7gshyen7bbj2vno3drylsnp3int5p6wdesoqq
```

**dag-json CID**

[testmark]:# (cid-zdj7Wd8AMwqnhJGQCbFxBVodGSBG84TM7Hs1rcJuQMwTyfEDS/dag-json/cid)
```
baguqeera5oa5xf5w42rgmvkavdpbnt6lhkgmpudiqur6ucwyy7jmfe3fykta
```

### cid-zdpuAtX7ZibcWdSKQwiDCkPjWwRvtcKCPku9H7LhgA4qJW4Wk

**Bytes**

[testmark]:# (cid-zdpuAtX7ZibcWdSKQwiDCkPjWwRvtcKCPku9H7LhgA4qJW4Wk/dag-cbor/bytes)
```
d82a58250001711220785197229dc8bb1152945da58e2348f7e279eeded06cc2ca736d0e879858b501
```

**dag-cbor CID**

[testmark]:# (cid-zdpuAtX7ZibcWdSKQwiDCkPjWwRvtcKCPku9H7LhgA4qJW4Wk/dag-cbor/cid)
```
bafyreib6okxebjb65dd5i7nu2johcro6wpxxxvt5ykuusyky7763w2ypnq
```

**dag-json CID**

[testmark]:# (cid-zdpuAtX7ZibcWdSKQwiDCkPjWwRvtcKCPku9H7LhgA4qJW4Wk/dag-json/cid)
```
baguqeera7kdvvxhvje4nflfnecqaxur2qd6hghlkxfhgaz4bbmig5r4itgwq
```

### dagpb_11unnamedlinks+data

**Bytes**

[testmark]:# (dagpb_11unnamedlinks+data/dag-cbor/bytes)
```
a2644461746149736f6d652064617461654c696e6b738ba36448617368d82a58230012205822d187bd40b04cc8ae7437888ebf844efac1729e098c88
16d585d0fcc42b5b644e616d6560655473697a651a0004000ea36448617368d82a58230012200b79badee10dc3f7781a7a9d0f020cc0f710b328c497
5c2dbc30a170cd188e2c644e616d6560655473697a651a0004000ea36448617368d82a582300122022ad631c69ee983095b5b8acd029ff94aff1dc6c
48837878589a92b90dfea317644e616d6560655473697a651a0004000ea36448617368d82a5823001220df7fd08c4784fe6938c640df473646e4f16c
7d0c6567ab79ec6981767fc3f01a644e616d6560655473697a651a0004000ea36448617368d82a582300122000888c815ad7d055377bdb7b7779fc97
40e548cb5dac90c71b9af9f51a879c2d644e616d6560655473697a651a0004000ea36448617368d82a5823001220766db372d015c5c700f538336556
370165c889334791487a5e48d6080f1c99ea644e616d6560655473697a651a0004000ea36448617368d82a58230012202f533004ceed74279b32c58e
b0e3d2a23bc27ba14ab07298406c42bab8d54321644e616d6560655473697a651a0004000ea36448617368d82a58230012204c50cfdefa0209766f88
5919ac8ffc258e9253c3001ac23814f875d414d39473644e616d6560655473697a651a0004000ea36448617368d82a582300122000894611dfa19285
3020cbbade1a9a0a3f359d26e0d38caf4d72b9b306ff5a0b644e616d6560655473697a651a0004000ea36448617368d82a5823001220730ddba83e31
47bbe10780b97ff0718c74c36037b97b3b79b45c451180654581644e616d6560655473697a651a0004000ea36448617368d82a582300122048ea9d5d
423f678d83d559d2349be8325527290b070c90fc1acd968f0bf70a06644e616d6560655473697a651a0004000e
```

**dag-cbor CID**

[testmark]:# (dagpb_11unnamedlinks+data/dag-cbor/cid)
```
bafyreidjm3xk7rz2d2jap2dvgs54ifj473viuro5q5mfcpjm3rjf73s76y
```

**dag-pb CID**

[testmark]:# (dagpb_11unnamedlinks+data/dag-pb/cid)
```
bafybeie7xh3zqqmeedkotykfsnj2pi4sacvvsjq6zddvcff4pq7dvyenhu
```

**dag-json CID**

[testmark]:# (dagpb_11unnamedlinks+data/dag-json/cid)
```
baguqeerap7w3wnisyfaoyn6vdjbvhgvzfhqxlmnkpfo2cza3kol3sgiou7zq
```

### dagpb_1link

**Bytes**

[testmark]:# (dagpb_1link/dag-cbor/bytes)
```
a1654c696e6b7381a16448617368d82a58230012207521fe19c374a97759226dc5c0c8e674e73950e81b211f7dd3b6b30883a08a51
```

**dag-cbor CID**

[testmark]:# (dagpb_1link/dag-cbor/cid)
```
bafyreib4mhhkmom5wxnp2hmcjeabbcmzybdiewehujwu73ndvns42zdt4i
```

**dag-pb CID**

[testmark]:# (dagpb_1link/dag-pb/cid)
```
bafybeihyivpglm6o6wrafbe36fp5l67abmewk7i2eob5wacdbhz7as5obe
```

**dag-json CID**

[testmark]:# (dagpb_1link/dag-json/cid)
```
baguqeerao7xjffeobbqa2zv43ltxadt6pa4f3c2eh4ufsfudbazsmgb55dza
```

### dagpb_2link+data

**Bytes**

[testmark]:# (dagpb_2link+data/dag-cbor/bytes)
```
a2644461746149736f6d652064617461654c696e6b7382a36448617368d82a58230012208ab7a6c5e74737878ac73863cb76739d15d4666de44e5756
bf55a2f9e9ab5f43644e616d6569736f6d65206c696e6b655473697a651a05f5e100a36448617368d82a58230012208ab7a6c5e74737878ac73863cb
76739d15d4666de44e5756bf55a2f9e9ab5f44644e616d656f736f6d65206f74686572206c696e6b655473697a6508
```

**dag-cbor CID**

[testmark]:# (dagpb_2link+data/dag-cbor/cid)
```
bafyreia4kjmr364wv7snvuffjjfx6e3ssyhcaxcv3mmewrm6lkg426ycpu
```

**dag-pb CID**

[testmark]:# (dagpb_2link+data/dag-pb/cid)
```
bafybeibh647pmxyksmdm24uad6b5f7tx4dhvilzbg2fiqgzll4yek7g7y4
```

**dag-json CID**

[testmark]:# (dagpb_2link+data/dag-json/cid)
```
baguqeerasu2dlp3l3b6xswyh45iegkn3qamarjdygorldhucn3x4kfeafmpa
```

### dagpb_4namedlinks+data

**Bytes**

[testmark]:# (dagpb_4namedlinks+data/dag-cbor/bytes)
```
a26444617461420801654c696e6b7384a36448617368d82a5823001220b4397c02da5513563d33eef894bf68f2ccdf1bdfc14a976956ab3d1c72f735
a0644e616d656e617564696f5f6f6e6c792e6d3461655473697a651a0163d44da36448617368d82a5823001220025c13fcd1a885df444f64a4a82a26
aea867b1148c68cb671e83589f97114932644e616d6568636861742e747874655473697a651903e4a36448617368d82a58230012205d44a305b9b328
ab80451d0daa72a12a7bf2763c5f8bbe327597a31ee40d1e48644e616d656c706c61796261636b2e6d3375655473697a651874a36448617368d82a58
230012202539ed6e85f2a6f9097db9d76cffd49bf3042eb2e3e8e9af4a3ce842d49dea22644e616d656a7a6f6f6d5f302e6d7034655473697a651a12
417d97
```

**dag-cbor CID**

[testmark]:# (dagpb_4namedlinks+data/dag-cbor/cid)
```
bafyreiagdu5zh6jtk3vnkyltyfpw6tyxtlp24bortutx6dggmmydno3gti
```

**dag-pb CID**

[testmark]:# (dagpb_4namedlinks+data/dag-pb/cid)
```
bafybeigcsevw74ssldzfwhiijzmg7a35lssfmjkuoj2t5qs5u5aztj47tq
```

**dag-json CID**

[testmark]:# (dagpb_4namedlinks+data/dag-json/cid)
```
baguqeerapvtwnk5agczlqn7dgiyci5ku54llg32dmn3zvynn3dglte6y3s6q
```

### dagpb_7unnamedlinks+data

**Bytes**

[testmark]:# (dagpb_7unnamedlinks+data/dag-cbor/bytes)
```
a26444617461582b080218cbc1819201208080e015208080e015208080e015208080e015208080e015208080e01520cbc1c10f654c696e6b7387a364
48617368d82a58230012203f29086b59b9e046b362b4b19c9371e834a9f5a80597af83be6d8b7d1a5ad33b644e616d6560655473697a651a02b82a2e
a36448617368d82a5823001220ae1a5afd7c770507dddf17f92bba7a326974af8ae5277c198cf13206373f7263644e616d6560655473697a651a02b8
2a2ea36448617368d82a582300122022ab2ebf9c3523077bd6a171d516ea0e1be1beb132d853778bcc62cd208e77f1644e616d6560655473697a651a
02b82a2ea36448617368d82a582300122040a77fe7bc69bbef2491f7633b7c462d0bce968868f88e2cbcaae9d0996997e8644e616d6560655473697a
651a02b82a2ea36448617368d82a58230012206ae1979b14dd43966b0241ebe80ac2a04ad48959078dc5affa12860648356ef6644e616d6560655473
697a651a02b82a2ea36448617368d82a5823001220a957d1f89eb9a861593bfcd19e0637b5c957699417e2b7f23c88653a240836c4644e616d656065
5473697a651a02b82a2ea36448617368d82a5823001220345f9c2137a2cd76d7b876af4bfecd01f80b7dd125f375cb0d56f8a2f96de2c3644e616d65
60655473697a651a01f07f1b
```

**dag-cbor CID**

[testmark]:# (dagpb_7unnamedlinks+data/dag-cbor/cid)
```
bafyreidz4mncr25kzd3lakhmm56twyeauqpmrczheq4husqlfu4ificjy4
```

**dag-pb CID**

[testmark]:# (dagpb_7unnamedlinks+data/dag-pb/cid)
```
bafybeibfhhww5bpsu34qs7nz25wp7ve36mcc5mxd5du26sr45bbnjhpkei
```

**dag-json CID**

[testmark]:# (dagpb_7unnamedlinks+data/dag-json/cid)
```
baguqeerab53i2tx2ktr3nbztcguof3pwadl6264yh5pt6h5ygxavlxghkkba
```

### dagpb_Data_some

**Bytes**

[testmark]:# (dagpb_Data_some/dag-cbor/bytes)
```
a26444617461450001020304654c696e6b7380
```

**dag-cbor CID**

[testmark]:# (dagpb_Data_some/dag-cbor/cid)
```
bafyreieculsmrexh3ty5jentbvuku452o27mst4h2tq2rb2zntqhgcstji
```

**dag-pb CID**

[testmark]:# (dagpb_Data_some/dag-pb/cid)
```
bafybeibazl2z4vqp2tmwcfag6wirmtpnomxknqcgrauj7m2yisrz3qjbom
```

**dag-json CID**

[testmark]:# (dagpb_Data_some/dag-json/cid)
```
baguqeerajwksxu3lxpomdwxvosl542zl3xknhjgxtq3277gafrhl6vdw5tcq
```

### dagpb_Data_zero

**Bytes**

[testmark]:# (dagpb_Data_zero/dag-cbor/bytes)
```
a2644461746140654c696e6b7380
```

**dag-cbor CID**

[testmark]:# (dagpb_Data_zero/dag-cbor/cid)
```
bafyreih7w5oijm4kksxrkuvpspuobxpfn5a6l2uerxyfpdfdjzrirlwaiq
```

**dag-pb CID**

[testmark]:# (dagpb_Data_zero/dag-pb/cid)
```
bafybeiaqfni3s5s2k2r6rgpxz4hohdsskh44ka5tk6ztbjerqpvxwfkwaq
```

**dag-json CID**

[testmark]:# (dagpb_Data_zero/dag-json/cid)
```
baguqeera7gxsmhbdmzwv3fgp4naa5idang7hm6hupkxshvm34taqiakw4zvq
```

### dagpb_Links_Hash_some

**Bytes**

[testmark]:# (dagpb_Links_Hash_some/dag-cbor/bytes)
```
a1654c696e6b7381a16448617368d82a4a00015500050001020304
```

**dag-cbor CID**

[testmark]:# (dagpb_Links_Hash_some/dag-cbor/cid)
```
bafyreico7im6nfzt2euwvdrs62ylgx2w6fmjdrxl2zaz5up5uhqwgwsnhe
```

**dag-pb CID**

[testmark]:# (dagpb_Links_Hash_some/dag-pb/cid)
```
bafybeia53f5n75ituvc3yupuf7tdnxf6fqetrmo2alc6g6iljkmk7ys5mm
```

**dag-json CID**

[testmark]:# (dagpb_Links_Hash_some/dag-json/cid)
```
baguqeeraumofom6evitwofvbunn2ocdqw5vxl7wnfxdjyqr5m6h2zgtnselq
```

### dagpb_Links_Hash_some_Name_some

**Bytes**

[testmark]:# (dagpb_Links_Hash_some_Name_some/dag-cbor/bytes)
```
a1654c696e6b7381a26448617368d82a4a00015500050001020304644e616d6569736f6d65206e616d65
```

**dag-cbor CID**

[testmark]:# (dagpb_Links_Hash_some_Name_some/dag-cbor/cid)
```
bafyreigi3x5lx7auupkm3z27b5emluvkrv3mwpq35244zy4cnqjplyr2fi
```

**dag-pb CID**

[testmark]:# (dagpb_Links_Hash_some_Name_some/dag-pb/cid)
```
bafybeifq4hcxma3kjljrpxtunnljtc6tvbkgsy3vldyfpfbx2lij76niyu
```

**dag-json CID**

[testmark]:# (dagpb_Links_Hash_some_Name_some/dag-json/cid)
```
baguqeeras44ncqauojywh67izb3d5j7rjbgdscdfsglzaex3envlwzq3lvxa
```

### dagpb_Links_Hash_some_Name_zero

**Bytes**

[testmark]:# (dagpb_Links_Hash_some_Name_zero/dag-cbor/bytes)
```
a1654c696e6b7381a26448617368d82a4a00015500050001020304644e616d6560
```

**dag-cbor CID**

[testmark]:# (dagpb_Links_Hash_some_Name_zero/dag-cbor/cid)
```
bafyreigtcfxx5v7f4gdcbnouvhpwgfjmhh4pqgeu3sznfm6y4ql62g4urq
```

**dag-pb CID**

[testmark]:# (dagpb_Links_Hash_some_Name_zero/dag-pb/cid)
```
bafybeie7fstnkm4yshfwnmpp7d3mlh4f4okmk7a54d6c3ffr755q7qzk44
```

**dag-json CID**

[testmark]:# (dagpb_Links_Hash_some_Name_zero/dag-json/cid)
```
baguqeeraodk4mmutpv6bqhjd3kx5oicgnxq365lxu7h3orewh54avtttmzca
```

### dagpb_Links_Hash_some_Tsize_some

**Bytes**

[testmark]:# (dagpb_Links_Hash_some_Tsize_some/dag-cbor/bytes)
```
a1654c696e6b7381a26448617368d82a4a00015500050001020304655473697a651b001fffffffffffff
```

**dag-cbor CID**

[testmark]:# (dagpb_Links_Hash_some_Tsize_some/dag-cbor/cid)
```
bafyreidfgtcksdb5gn4jn2eggnqkktnahqzmvprrv7pakqmiwz25aej62y
```

**dag-pb CID**

[testmark]:# (dagpb_Links_Hash_some_Tsize_some/dag-pb/cid)
```
bafybeiezymjvhwfuharanxmzxwuomzjjuzqjewjolr4phaiyp6l7qfwo64
```

**dag-json CID**

[testmark]:# (dagpb_Links_Hash_some_Tsize_some/dag-json/cid)
```
baguqeera5drb4r7jf33wkkhs4dvxqsyacnxvv7djbzylt4ib2t42qk4qqkxa
```

### dagpb_Links_Hash_some_Tsize_zero

**Bytes**

[testmark]:# (dagpb_Links_Hash_some_Tsize_zero/dag-cbor/bytes)
```
a1654c696e6b7381a26448617368d82a4a00015500050001020304655473697a6500
```

**dag-cbor CID**

[testmark]:# (dagpb_Links_Hash_some_Tsize_zero/dag-cbor/cid)
```
bafyreia2x5mgcqwslci2apn3d5t6ptnknbw4jmnedjkynp6jxjdxb7bvcq
```

**dag-pb CID**

[testmark]:# (dagpb_Links_Hash_some_Tsize_zero/dag-pb/cid)
```
bafybeichjs5otecmbvwh5azdr4jc45mp2qcofh2fr54wjdxhz4znahod2i
```

**dag-json CID**

[testmark]:# (dagpb_Links_Hash_some_Tsize_zero/dag-json/cid)
```
baguqeerac5ccyh6acqr3kdi5djstwzlu36uprk2dbi4f36ntlafquwthxm7a
```

### dagpb_empty

**Bytes**

[testmark]:# (dagpb_empty/dag-cbor/bytes)
```
a1654c696e6b7380
```

**dag-cbor CID**

[testmark]:# (dagpb_empty/dag-cbor/cid)
```
bafyreihjsq5okmwdasf4hoiauwxv3vxjuwh2kuh4k5pgzzi3hanepxusjm
```

**dag-pb CID**

[testmark]:# (dagpb_empty/dag-pb/cid)
```
bafybeihdwdcefgh4dqkjv67uzcmw7ojee6xedzdetojuzjevtenxquvyku
```

**dag-json CID**

[testmark]:# (dagpb_empty/dag-json/cid)
```
baguqeera6mfu3g6n722vx7dbitpnbiyqnwah4ddy4b5c3rwzxc5pntqcupta
```

### dagpb_simple_forms_1

**Bytes**

[testmark]:# (dagpb_simple_forms_1/dag-cbor/bytes)
```
a2644461746143010203654c696e6b7380
```

**dag-cbor CID**

[testmark]:# (dagpb_simple_forms_1/dag-cbor/cid)
```
bafyreiahe732takf4lhvcjrpeycxs2sccncd7zd5frj5w2hmmyhnokfwsy
```

**dag-pb CID**

[testmark]:# (dagpb_simple_forms_1/dag-pb/cid)
```
bafybeia2qk4u55f2qj7zimmtpulejgz7urp7rzs44cvledcaj42gltkk3u
```

**dag-json CID**

[testmark]:# (dagpb_simple_forms_1/dag-json/cid)
```
baguqeerabji5n2rfqif4kflih4r2tyl2jz3n3met5nys2wawsfihvc3guqta
```

### dagpb_simple_forms_2

**Bytes**

[testmark]:# (dagpb_simple_forms_2/dag-cbor/bytes)
```
a1654c696e6b7383a16448617368d82a4a00015500050001020304a26448617368d82a4a00015500050001020304644e616d6563626172a264486173
68d82a4a00015500050001020304644e616d6563666f6f
```

**dag-cbor CID**

[testmark]:# (dagpb_simple_forms_2/dag-cbor/cid)
```
bafyreibpoilwc75tlwglfzlziunq65l6arvzwwrhikal5kwlens6ql53ky
```

**dag-pb CID**

[testmark]:# (dagpb_simple_forms_2/dag-pb/cid)
```
bafybeiahfgovhod2uvww72vwdgatl5r6qkoeegg7at2bghiokupfphqcku
```

**dag-json CID**

[testmark]:# (dagpb_simple_forms_2/dag-json/cid)
```
baguqeeraibdu3hqnftoo7zlwqzcsk3pw4sf6epneqziyf7oehsde7ykbxula
```

### dagpb_simple_forms_3

**Bytes**

[testmark]:# (dagpb_simple_forms_3/dag-cbor/bytes)
```
a1654c696e6b7383a16448617368d82a4a00015500050001020304a26448617368d82a4a00015500050001020304644e616d656161a26448617368d8
2a4a00015500050001020304644e616d656161
```

**dag-cbor CID**

[testmark]:# (dagpb_simple_forms_3/dag-cbor/cid)
```
bafyreibeevwwdfmicvdswiaetz62wtlj5nqe7idei2tn2irhco5k37js3y
```

**dag-pb CID**

[testmark]:# (dagpb_simple_forms_3/dag-pb/cid)
```
bafybeidrg2f6slbv4yzydqtgmsi2vzojajnt7iufcreynfpxndca4z5twm
```

**dag-json CID**

[testmark]:# (dagpb_simple_forms_3/dag-json/cid)
```
baguqeeraas77sl6e3odguo3gfdarftcqqnarlh7kae7vnleh7zzmswnztzpq
```

### dagpb_simple_forms_4

**Bytes**

[testmark]:# (dagpb_simple_forms_4/dag-cbor/bytes)
```
a1654c696e6b7382a26448617368d82a4a00015500050001020304644e616d656161a26448617368d82a4a00015500050001020304644e616d656161

```

**dag-cbor CID**

[testmark]:# (dagpb_simple_forms_4/dag-cbor/cid)
```
bafyreifw5gwkcd4ck7o7xhxoff33kqpbs6uwznmxbxb6ez6h77zz6gj5ca
```

**dag-pb CID**

[testmark]:# (dagpb_simple_forms_4/dag-pb/cid)
```
bafybeieube7zxmzoc5bgttub2aqofi6xdzimv5munkjseeqccn36a6v6j4
```

**dag-json CID**

[testmark]:# (dagpb_simple_forms_4/dag-json/cid)
```
baguqeera3rnjnzebgxuygpqphmofp75upufi7linvrthm2r4cyiibafftqrq
```

### false

**Bytes**

[testmark]:# (false/dag-cbor/bytes)
```
f4
```

**dag-cbor CID**

[testmark]:# (false/dag-cbor/cid)
```
bafyreibac77tiyjzkzzkucve6zejj7jpswslcihcnehisulfnv423qxo2i
```

**dag-json CID**

[testmark]:# (false/dag-json/cid)
```
baguqeera7s6pczmqrxiyvhsj677spaibo3ny5h3dwq2see3uczsciure7cva
```

### float--0.5

**Bytes**

[testmark]:# (float--0.5/dag-cbor/bytes)
```
fbbfe0000000000000
```

**dag-cbor CID**

[testmark]:# (float--0.5/dag-cbor/cid)
```
bafyreidgf3tgrdkimspjianeb4i2ilrhwrd72drroivhom32cegkxisoay
```

**dag-json CID**

[testmark]:# (float--0.5/dag-json/cid)
```
baguqeeradmd3bt72bm7vs226asfqcfiwrcdmyumd3viymvnvkfpolxo2y3iq
```

### float--0.9999999999999999

**Bytes**

[testmark]:# (float--0.9999999999999999/dag-cbor/bytes)
```
fbbfefffffffffffff
```

**dag-cbor CID**

[testmark]:# (float--0.9999999999999999/dag-cbor/cid)
```
bafyreibmiakyxlz24yia56ipz27movs5zv6js456jvqhpyjluhycsitl34
```

**dag-json CID**

[testmark]:# (float--0.9999999999999999/dag-json/cid)
```
baguqeera7g7rcxbk5fadm5g4ecmvllvetuuzrmogxmrmkf32b3wboxlqfpkq
```

### float--1.1

**Bytes**

[testmark]:# (float--1.1/dag-cbor/bytes)
```
fbbff199999999999a
```

**dag-cbor CID**

[testmark]:# (float--1.1/dag-cbor/cid)
```
bafyreibn43uo5yygsnzbdj6eey2mrcrmavhxgkzvgnmarkt3mo2efr4cfy
```

**dag-json CID**

[testmark]:# (float--1.1/dag-json/cid)
```
baguqeeraop2zowbt65hyvdvn2t4xje3i7b2gkbtydsckfhhjj5ixrtpq5oma
```

### float--1e-323

**Bytes**

[testmark]:# (float--1e-323/dag-cbor/bytes)
```
fb8000000000000002
```

**dag-cbor CID**

[testmark]:# (float--1e-323/dag-cbor/cid)
```
bafyreibg2jfpbjanaowwfpoamj2tjpo2ifhy5fbkln55b5mlhfiy747egq
```

**dag-json CID**

[testmark]:# (float--1e-323/dag-json/cid)
```
baguqeeracte7heowtgtjzivjekic4rkwan2kii6fmz3enl5i33oafvnwfwyq
```

### float--8.940696716308594e-8

**Bytes**

[testmark]:# (float--8.940696716308594e-8/dag-cbor/bytes)
```
fbbe78000000000000
```

**dag-cbor CID**

[testmark]:# (float--8.940696716308594e-8/dag-cbor/cid)
```
bafyreideyqdtlnfu53gvyrlg7fsqrx5bk4v2lxmgwzfnfxi23wlyxm43ta
```

**dag-json CID**

[testmark]:# (float--8.940696716308594e-8/dag-json/cid)
```
baguqeerabhb35s3mtnhsye24f6322jzfiyogcxg5ouxfulwrkrkkvdpwbdqq
```

### float-0.5

**Bytes**

[testmark]:# (float-0.5/dag-cbor/bytes)
```
fb3fe0000000000000
```

**dag-cbor CID**

[testmark]:# (float-0.5/dag-cbor/cid)
```
bafyreifwqkffcpzsyfigri7xm2kaf6bz7si5stsnf46jep5w5we7ngmgma
```

**dag-json CID**

[testmark]:# (float-0.5/dag-json/cid)
```
baguqeera2lf224p7gm66m7ih5rtw4njkw7zyeshlnheuffibk4ramb6fl2ca
```

### float-0.9999999999999999

**Bytes**

[testmark]:# (float-0.9999999999999999/dag-cbor/bytes)
```
fb3fefffffffffffff
```

**dag-cbor CID**

[testmark]:# (float-0.9999999999999999/dag-cbor/cid)
```
bafyreigjp6bt6yhk2nxlvxhvy3mfoxs4sxslnnzzgbbxc2tailmnuic37i
```

**dag-json CID**

[testmark]:# (float-0.9999999999999999/dag-json/cid)
```
baguqeeraclkrsheftxvmt7xg73fooogsiwf5bbmvd3auq37l3aqmd5qy6fza
```

### float-1.1

**Bytes**

[testmark]:# (float-1.1/dag-cbor/bytes)
```
fb3ff199999999999a
```

**dag-cbor CID**

[testmark]:# (float-1.1/dag-cbor/cid)
```
bafyreifeekgttrbqlvjqmvey2r7damal3kiqn5a6r7a2pijrx4jgdv5odi
```

**dag-json CID**

[testmark]:# (float-1.1/dag-json/cid)
```
baguqeerawbpcir3cwhshfpujve4abtb64mthiphmwvmyjpysqe5n3og6m3ia
```

### float-1.1111111111111112

**Bytes**

[testmark]:# (float-1.1111111111111112/dag-cbor/bytes)
```
fb3ff1c71c71c71c72
```

**dag-cbor CID**

[testmark]:# (float-1.1111111111111112/dag-cbor/cid)
```
bafyreifj6tfoswmsty24t4ittpwdnzaj6tka7637gdjrrly6q5msu6eooq
```

**dag-json CID**

[testmark]:# (float-1.1111111111111112/dag-json/cid)
```
baguqeeratkqazgwpbo5npzbafr6wmdgowpy4g633gb5gudyuo3y465bzyqtq
```

### float-1e-323

**Bytes**

[testmark]:# (float-1e-323/dag-cbor/bytes)
```
fb0000000000000002
```

**dag-cbor CID**

[testmark]:# (float-1e-323/dag-cbor/cid)
```
bafyreib6bigeneyagim45hjjzzn3ggyuthejspqqccplri2pmmek5bz2uq
```

**dag-json CID**

[testmark]:# (float-1e-323/dag-json/cid)
```
baguqeeralkvxfq2l7znrayirso72iwqx4hi6fq5dmzxvswdeto5n2a55ej5q
```

### float-8.940696716308594e-8

**Bytes**

[testmark]:# (float-8.940696716308594e-8/dag-cbor/bytes)
```
fb3e78000000000000
```

**dag-cbor CID**

[testmark]:# (float-8.940696716308594e-8/dag-cbor/cid)
```
bafyreie6fuw4lkhwfiljun5k4y5srv6io7rcf4r766amlxtmx3it2hwg2e
```

**dag-json CID**

[testmark]:# (float-8.940696716308594e-8/dag-json/cid)
```
baguqeerahgvoivj35tc6ejtkj5jxnbwfe2nwmdhdtdxqqg2qmurlh3qsco5q
```

### float-82497.63712086187

**Bytes**

[testmark]:# (float-82497.63712086187/dag-cbor/bytes)
```
fb40f4241a31a5a515
```

**dag-cbor CID**

[testmark]:# (float-82497.63712086187/dag-cbor/cid)
```
bafyreibybbnywxrykhqdulrhywkofxds5tw5fye6geudy2us3pgw2ptgnm
```

**dag-json CID**

[testmark]:# (float-82497.63712086187/dag-json/cid)
```
baguqeeraf22bm57rmsotbj67zc7x6jx3czxuelemhtjvbpsjmibxjyavbw3q
```

### float-array_of_specials

**Bytes**

[testmark]:# (float-array_of_specials/dag-cbor/bytes)
```
8501f5f4f620
```

**dag-cbor CID**

[testmark]:# (float-array_of_specials/dag-cbor/cid)
```
bafyreibqkv642umtthvkk4siz2x27eqwugyitsjsgbc65ffmtajiag4b64
```

**dag-json CID**

[testmark]:# (float-array_of_specials/dag-json/cid)
```
baguqeeranbypiyrspgq3dw6steqf64bal5xbwfmvjvmzydkumusemokp44bq
```

### garbage-00

**Bytes**

[testmark]:# (garbage-00/dag-cbor/bytes)
```
8679075f593b44722664215c2961322b62222ee298ba0955235125776c6c7d21402622493834676426343b2c33425f2e674274356d6c0a6d6f6d642c
292e4a3b386b45425d4e627b5935744834452278787a6b793c747b7c243a553b656b5a74704a6f2d6f6c4d606a79494a35574e6e7d4c3d4022464b4c
772f617c72385d2a496c39585c787b4e390a7a4f5b4028755969214e3052094d2327346f5d6b6f63647659282f41624c322d5e3d2d3d25723f097d2f
243c7c4f56652572267a766f586a2d746d6e534042466e795d296f2b0a246c20354f7371774474537a4048335a7e493d514c6f332a78332c4b522409
21567e753d4a5b4c29295f7b48680976574c49712b4d563c75310a0a2d5d406a54477d235e50495d2e71536c7d6a5d486d4f397c4b622b6f24503d7d
7c2d7977e298ba34527e0967295c566a23253c22457d63557de298ba2b21502f58627a3472683928484c207441396c525a5444785640432956445d2e
6d4de298ba784f2d3f223e325d46595e4f6d4c30584a5b4d4c60467d5372665e224d30463a464f7824372f545d3d5a3953745343295b5c7b2e5a6046
3445473a2f493e6f387d3958312247e298ba5d4f676d5c3d0a616174382347446e7875205428202f45396654624d664179767a26253934205328376a
622779234a257c4c24353054762e294f717a594866654f3b6b462274327856732d63617c41204577264e534246345a45494e345a4041354c3c437079
2b357b267c2b3a4b4b4c57777a654f71464b44345f356545603c6e48363f5463243e344043286c7d65465b7c6c242c47595a5c7974674f4f2c7c0969
715c772a5b525376372a2e213657555e572b094861625b52407b2332093659242257554b3331285877642638566f643b4b4f753d6f3524e298ba3c28
56374b39726424625c627844202d2c2f6c7b5c5f396c7e7849616b57347c39422050e298ba307a6b466a5669763423455a24407e5358354d6f5d2035
5626e298ba704a4b29552b707a3270282337763a2144412f52694b555870352f3d6a6f305c5546635f7c315b703073626e60253f2e756c3b573f4151
59313d344769287735567665424464217947696e664c234d2949496a6f227a676c742b5d5b2638424947586f6546522a647e3c546058283a3e726372
5c5e564b653d623369446542246b5c272b6d5d3b3171097d292d554c51482b445f2b0a627a5a6c446b3449787736605050695223645552472c27703d
636d4e41723d6f3d397a623e275361793e595e7a62763c48095b6850515e7d6c4c6a596c273e785f216b447c7d3a4d3a585520704f2f43713f52755d
4d326235794769265245412e2e404b3f627b6e2e754a584e4c7572746d677973604228650a2b3f3450780a575c7533442e2d4b544561332d6ce298ba
3741716c5c38794f44497631666c4032607b3f2c576d3a544b657d555978444e775a7a53484367524629704d476f374c5d4552382b53e298ba746647
2f2b445a6b366c5e4b2c0927486b224a7c6d7b515e452a29773a6d732c3c425f53356e295d704d483f2c4048553b416a4b20635b2e2164762e6d547a
093d687d374534306e583a5e645fe298ba65276e2f5d637577756d6923754e355d6450437c23677b6f78355d73722230390a5474466443642b7c4425
76632b4046325277404c6c225b794e607b216122712e2b6166766c63542456233f28322777444f6d433063292b216841542a52425a6f783a714f4726
26442e22482b2c6e736a2546663e5a6f32292968557a70467b5556323f634d7e340a3b0a2b222d6735746a4c6951397b2c237934396b3d45737d7e2b
4d525524735a77777d38216566683e7026794e45344021316442353722455a67364d3731665631394e7e52745534452f2a787477295658377155704e
642b5c4659285b3c7e22666e68443e24576e644e4c287b51245450452267384e3b425b725d36364f623b68267c0a3a28596d467b3e344a6b2b612a7b
7d20662e535a233a456a3d415338486f76656159422549743f340a20442d2b4674455c3d2a22227b76232a21435957202f2b6d3a43724e6c5f3d7423
2d6e6b2c48425f552f5359454e6f55295c7a7a783c3268313e72785f716d786c42693e77286b226270095f4d6f6f7120714559263b5d3c2f402b486f
372e4c2c2d2e296a43354171795b3f6e2f707452236149704c7b5c56482e6b3d293557535851e298ba5968717d266646656c50596b673f3f4b2d3452
353b736770312b2f334c46e298ba263b6242422862293a2a6043775a572e4f753f7230234a533164674557433e757e446578262d7424735a3276594c
48574f26094e5966782a724f77622441317b5f265d38420970672e245e496f3de298ba6b704c430a22376c490a5a4f663b265e742d56605a6b2d5423
527a3e7423602f09377d5f64482b7d3c6377297a3e5d7b436a624e55776c6c7a2724212c2048613356487e735a77765f5c6a58383f35595e35784968
7e73226556256f2624466c6c4d6c5c0a5745e298ba7a6c5679276e6d7d7d606a7968596f3d59315d4e552d427c2f4f6176e298ba4f5d683f570a6446
6a29247e29443e6d37436647303d2f786a7541435222684a52545b4f743834a6605901be787abfc9ad9408a6d242da0a23170f11231317a6379bfd4f
60ed8e7f8a8632bc5c74ba4f2c9365f41fe84df9a47844e6c4a78acc44fedf9552f3067e14edbeed6ccfda3043cfccf2415ce2018d4660883cdb02ec
df5f55a74f1c7bf6e3d40625d5d908e9f63bcb323c8e85b2d9be3de10430f849e48cf9073f7f747c4d8f51d2bc561f1813d037944a3c5dc3a621709b
7bb8c9005217975d0ed95de12093ceceb7d95041c99e004fd41f2dbc3e18b628e1ca5094c48469aa2778ffb402eec7a39ad6e9e99af4a2537b8a2d80
2ed0062133c0f5705e43017cefbd036778039e0fe5c66e28ac191fd3a52ab5b80ac10ae804da9c2fc2c10d28b767e92cc4ca35c04d4ca4cdf33d2202
081da91862a3417c4086bf4d53d3b3a1194dc24890cc1bc5fd0b4f4251435f9d1602a828a80f3580037c787268e0e93c7941ac4cab5054cee8077671
576d137c57b268fe3914605d5f89a31755a9856528c16f2ce81e6a7a3713a6a89184b6afd2963f495dc05f80c7aa90d081547bf9a1dabe4eb805cf79
fee6a8e94e4319f931a966dd734b92365edc4639ba0174396d254a9b5b246fa1c55baeb2a7f4e8a8155563080389e544dcaae01e2c17ba88b02a9215
c046616d790530643e3e2f71622d63682f464264633c5a4c43382d2953616c375c55263d302d6c5e26737954673938505d5e393a6b6a5e2c7d294f77
30592979397357732a2546607d5e780a713d667c3f5642704f577c3d7c6b29273e3a4b747a7e746f7e744576566d7038783a7e4e31494309296b7620
26435874756523572e793320784759744977666264785c282d393f3b42274e65365524663b505443746f4a523d525c3533575b4f5e704b3b6e72314c
4b503a5a4d7c796774476540613055436a5048343f7d56204b4d614b4a4c39246f7a726161467a43237642573d784e5a335a5539255e206277513e2e
30226029e298ba4a68557a7425275c256f0a484140344963622f43093c3c373531715a386628796525747c3b3246216253424b51302a670a227b4a4d
3a292f613a634d692a5d7a2421292f64595f7a743958666851797c79e298ba3b28647867096a367e25625572232c552325654335222e743f2a5a5f2c
51363a3e2c74666d3c5348552b41317a6b722c712a45300922596234683a0a2d5833522a655e623c4842247d2f723e6e677357324632605a506b3f60
5e7e432f6176603267e298ba7372507a66552f270a5f2848373876212c39693328304774626b5d59375a673d57222374746670743e7c437d6b53265d
4d2064e298ba2564306e363e67255662254f0a3f545573443c694c353e4f52685457443d49253b7b2d56622a61456d7035617477547869777a097573
4630586b0a6e39756f4e482f643a3d4c3378302f097127297c7020786f5867453f3f753a5d66365325384a427d2456353f5d2f5d40683f506d284132
497b46704069592e587d2928435e4d245c4532562643515e6a355a4b6e605272213924422d66775f5e5f3061445322366e48336251e298ba324a3e3b
40663f35344c4f617d79747d294b743548682838266e7c75777d403955242b652e38223254233e553c3a693f3b3c465a240a724474772d673b313325
7e46243d374a2265442d6946426577095729774730737034480926566c7332724e5be298ba31533940585c4d64695f6966475f515654653f2a515438
3f58496632252b5d6537655b2d5e722740632b445c55307e3d3b5228366954737b2055363869573c5e73583a7b375c5860444d533328387c6778607d
794f484d44680a2d31792f312c51755b7e60527a325850626a2e0a4b4f3b3e372474792f7a4c32703a6043347a5c3a683c3c346a5431336746766e09
4c410a717d5ee298ba7b2c44575b770a752129756f7461537e3a362c267528627246397a434a5343434c3a2f4844230967313734223c2b475a2c5779
e298ba527e7071333827637d586c424b59705753285c6c34555331614525547c6c523e725f293c41215e2c77597b3958776f756679763c5a332f5a41
6449714837505d727b4c3e775509394b5d7629302b302c4356650a42557b276e334028335e492a09263256396d7573314e22364d5a264a457b5a3148
6e26474446535e233f73503064785f3d6a297c7be298ba212b3b4d2c2ae298ba756864493f28297909673e4f50765d6e21372a38683341627a27285b
617d77684128693c5f276c246e71292b5862394767412d20777130732146306933293d686e6c21204e266a593a7d492f52386c3b7c23324276663275
6d3d4225767a68585f626b3a77363f4253463778425d3b2d230a2d3d27494a6341762d7b472975556f6b7909684e3a7a3436697d40643c7c4e62282e
744331703d0a342d735f695a50544c576f637d3b773d285e4c3a4232455d59474a285a58762a622d45255c3b222938774b6a554d663531525e3e663a
67643f446220437c596d6958482d6d63617921f564432e6d341b0004d7514acda595675c7d406b353d7b5904da394304f2e27d76209857c86f2e36a1
75a678b2a1271561fb689e6bd6aee3269b00158d73e3a0737824c62bfd6ab674ba98b43aa8af6d9e321cb3b8a6ea55573ff4d70e3dabb1b8e54f96fe
b634243f7d18d5c652451738e69e96a799761a8a87f6676d021c770c5b24eab0f8ec3008b5cb988a5ac4dc92ec22f5e94972c0df29719efb95d71133
2d013d12815dad3f7207e3aa2c700de49cd59555a4688ab2ff3303315ff516f88bfec76a3983692ade02af42e4d0b35068d2a0be6e779cfc41614856
245e634f08e987c6c4152c30bd1f5a4d8d86f28285991fe3fc28ef82e9a990b3c8b091fc03da00e7e78561c7e09955d60e8e05dcad9359dd9416973a
18592373a079e128e1ee1800555e0a9c3702705a3a9d86dbd76f625b4aa2d900a1acbda9954b68ab7916bfd62821d000ddeb584c10f366542316d673
90f8a77b3c96149fd4afb6d33f41e1ff8302eb910898cdf4df5daf8f22161b670a9983eeb90107736f34e9fcac4d0366040b80d964f42b07012e85c4
13810cf5cfb7b401a595ecd44bdaf05496e3421fb51c4fe53fb0af1495de14f52936c8684187d7c3b07ac44a31f3bf4c4f93731513702145931d621b
243b0ac57e1fd500841f9a24714afce55375d6da9ecf28c307a7ad36a0f967b983a0374a3b84a6332a8e68d572d7a7bbede52c72215e74300ec0ff6f
b9c6b058a1229e221ec0e429e73a23878a484000e7936893a08d3d504e1af722b5e95bf1a210aae55660f38b4be36da2380377bed7463a0ff8682709
832d62171d51c4b4f60015f29c3d29ffea03252887893d289e9accb0c6617c7870331e12ffe94a322a4e41fb5a65efef8c4e4c1f8e3baa96f2f9e897
317491d25880f6f9f659b7ad2f6ad55b9bc208b6bc966a35c66fb565da12c4ff1fd8075eeb5768d97606a79efa1282c1daadb00153845ff7e50670f3
0d8af7bc7d76fa628ed9cfc6190eb3b119851c185755b97afaa7da6aae940d558da64e8c04b183b224ebc9b840d3b8a780e4d69e4aabb6ead1c0e362
ab1ea4c952e621bcfe6b22bf76d107b95fabe0e19771026b7571dc452857d14292b5c3ae6db06e424354d40f7756f8c3af92bd50aaa5465ccee03cee
b8d4426e025c1b7715d3ab964b31da7839233b90ddba898fb899782f02f890a8be1948b1b2e98f88065cede56640c8d7a79d67285436a461ad9ec4b2
82cbdb416a0b15cbd27c7afc960f72aefd06a541f0e8f60d4f88980db0bf0484847d1bb948d01c0ca9696f9a73bd8c09a45adf44ccbc73cf41917280
58751484eb870b9bbbf430b3e557c7224e0f0e9863ca03e7bbbd1d4d1ed7dbe2a9f08482616bade23021e55f9fdfdd95507a0089af04d98dcb3ae9a2
a1e9677525b8596375460e78957e1a93ba942b927f0566a0a62721c70b12bef564a464dd1b0d74ecf15a4000ec0d7f213f614c29253ca2767e975719
da20ffde21c5cc9d666f3866c3361733bdddf515300ed019eba7a27a4f2aca2f61b76e1860a2750d71f730d00113c3f2045a1459010bb50348e05404
ddf7d1716fd9897b7766c4c455db9617ee96f18bd66dee6600d6a994fd7225fc126d458eb16aaecae1c0c3546b8b536c461f2033627cfe54ffafc50a
898b39c9c947c4681b5e3cfefae3cd267e0dd9087e012c3518b375c4bdf42c3029b070824cf1cc11c1960ad1b21a0888afcba2b70459f8191839a5ca
aa59f049c8274fafd979ad26b7c9d3b5c6590867de7289daac69e278332123225f3e2437333677434e7a2541416a306d423c09617d76307c4b232078
4440554e6e793c513d475e403b5a3760656c5e6b1b0012907371f36049d82a5827000170a0e40220dfbc917adbd92fc57a8eacd0294adc9c55937f26
b4f177b140007d66169401793b001ebc839504db16f68355e617c6567a438c47eb95855c4295d6c1b6be242fb1f5d82a5845000171144089a531a695
c548b711262c0c12251c4feb1a478a354e87b3d415cfe98704167bbce01701092fda8f880c81653372f9bee108f47945d5bf0930145922a3e9d12a
```

**dag-cbor CID**

[testmark]:# (garbage-00/dag-cbor/cid)
```
bafyreidhegn4opkma565fyy5nod2omdq66m3px7yl4y7vjmk5mwve47riu
```

**dag-json CID**

[testmark]:# (garbage-00/dag-json/cid)
```
baguqeerablaqfj5o7hwvg3lfof67zknschxmjvyliym3jpb3w5tk3hd3mm6q
```

### garbage-01

**Bytes**

[testmark]:# (garbage-01/dag-cbor/bytes)
```
86f6f6590c49f9d7d17d2f68ce2cb6bb8aeb77b0e6a95cacc203ea5d6583d7ad72e64f437ef63c32328111243d4c3382d507f4499c440ad5a5e35e10
1d5a338409e330b8b79658cf591fa87ec375dd3caa9470b40929897d948a2c5df69987cb40735d29774e6ab2e1656fef408341df0cdbcab4473e90c8
cbf1d90fe12b263494f33b4ba38542034dfe95476fbae35cf74b002f278aa3ede33752395e9e45ed717e70d0b5bedcd1ad6f4f3d6956b541736df069
e9678e784282e9528a212decab8d48db8ea3e810cff2a08c79515b6bb7a887eeb930de334df5ea5b2744b5396fa03a256af430821146231483454a0b
679e7bfe5937179cc5deefc744c4ff85104cefb71a80cf8e5e885fda89354d0a24d9bcad3094a10ec4250c4842d70f2e60873f22ea38c71f652d52b9
016551e4e420311bdfcb7bfe50f58a2ee3598db4f0b4b13337da8fee158b062762fa92ca581233d268785c2aa4f5f92d7b14a028ac0853436feeffac
74c588d2a54227a3be54eabc1709e6becc5169c92f6807f46792cd45607d301980f4ffad3be270428f884bd8b3b48179ab2616911cf5c90c1edfd510
70a21a783087ecb173a4bb10c83b8b6cad083a782099830b66bf65cca233563d39039b0ab3d184e50e17c180bc6e9e180d7d17ffda638aac3a146f6e
83320cb106eddb191c4fd0cb6a26a2ce0517d9aba8576aa81fe2c944f8c35ee60f402a54c1ab01bef719e5ff603d42b69adcaa654358cb61dab207dd
2728d34f71f8d8a1a301287ed2eb1301c502c868bf3197b5304f794b05c5810a47526d50ea852f93388789d54a3d0403fa26b00206dda44088d639bb
5a5bd3e745dc8058c6b7efdb195eab183aa76fff143d1552a24b4331f0723690708d282a51339511a40b4532277626ec4e52c69a39df46ec58e92b8c
43c433b89a4b29bad3fd8acd01148de765e3098f1584b8a759ca6661fc0f0b5bc088b633f0de4a9c25795d2f32555ae2df603d19f32a091d0871a78b
838699dd24fc6ad0e024249bbd44f58a0cafd6188f781aeac402941f6bc08dd7e98668a73b48dfd973f4624de3803ad7c698b26333d4f5d18ffb7940
7d2b14ceabb60cbef9d9e7cc0ccf0cd67886272dd78af82fbb8dc19823f4a08c606371d01969884778b6aaf797c515e78c469c66594f732183e858aa
34c88a0b54b5a77de991123fc205ae5ea5ba9c1576a4a689e1468eecb9dd9e0b4dc0c3422c357136ab10ec6a8c7863e2525c3c8115487cbf41741628
9b12c127f8a67dd00bbed86cdc6dfb19ecbfe81ec26dcd6e315e2799f844f41128ca75157bf8f4257d5eb82d59012a6fedd35c22cc9aa7bdb3dfd9a9
55f25b3aba105d0f14722561e5482756141157aac943e19f7a38fdef4699eacbe06c3f5d8cbfc2c2390b88f2d3584eb1a2327b343efc1b97a2369495
346fc3bf43724d3fce13d9662be0e8e26396e6d4c0657ec8ac55f0a894893a74b973b5bb8343d404fa45949f48c24643061a9e2d9bb1e2ec0338d053
adb9f4284ac03dd982f6c5405cb345186e0b2d135c85c6236eb6d7708a12057053fda6555b95a04fe005e983d4800ca4d373785ae8d4afd34b3eb62c
6521610b1bc4ebd07544db6c2d42b26946c59b542e11cd71c258cd1b2c0606e32309410a959ca1bdc0f46b52894b1bed183ae3d7c2249bec2df81835
52d8630a2878165d4f7da7c407d43635cfac5e22c98322dc79c1a62ec5ad0651bb609e41ccdfb062ab229c609670a399f1e578c769e64e172e634b67
fd81a04204d085d970e9dabd4e0e905ad34772ec9130088c7ae195c0a775bbe2d94fb88b6c01364b33d1702f658d7ddf6a0849d46d509d01acb1a6f3
c85f5f12805d286c13a7cea25e15d30ef4dbc601d6d598ac72b56c63c1094f869fbe9bbf03f7fe0d8f2a094c28d3dd8c695b76abf1efa49c1fc073c4
0b9058eef98f252a841b1e8448277d6e374cb6072c2c29207201ce2670b3ebc0af194a67ac45ea39f0416cef6cd09f83f136b6d121b08ea46dcb1724
47efd68924aacba757e854db767ac8b23be3c9f5a9a59b42beb759103fc012593bfdf40786fc6105a85e8489b58b7c23106d57f4d6d76412237a4efc
0f8d72d240ad20c717a2beb6df34d38672ee39dbcb09157efea8880c91cf9438d1f00e0d6a0aa4cb2e00a3cd59b6a0eada9a9d191f2df34e19e20a4e
26bb6d8b977a52bce6aa4db81a0f8e5be3ec3d905cd4f3e68425080c32473489513fe07d230172b5d71c999c459a6687dae6bac60126d13830e8759b
24c486a64e437fd3ea56bf1915e986a000fab2f068f20de3a8f7ce5c4fef9b077c3cc2a05e177bffa6beca54a6cea176692ae1e060c9339b5e94b7c8
e4c8b4fcb0889cf5ea7cad2f2caf53c2945e0b61b6f66ef842e01bc461d22acab8223dbb337029a5a925e2e9448a5a9a4143988ab8bd8d7473feebcc
e7d08bac10197cf393bf393f8f8ff1799445e814f04585fbb788cacf90b87580d78e4450661d168a2d4d96c89aa93f0be6ee22abc8a0e0158ee105b3
cccee810f304fea3a28ad94d6b984d8cb4df26a06e197eca9088b5b167738386bf4bfcd4784c4b218faf28227d6f15c1b48cbca422212971fb7c5a89
d4ea82798f4cc96f5b533cecf26c0cd98858ec6da11265f674fce8708c6ec1199dfd4c86f63b2c56e3d82b07429526ec2b7ab07a21e682ee22459ade
38dc1e313683f77a393b3cf57c7fb66d3aaedc1d32229d3841db938d592fc56e6b4f775426e3af14b60b2408d5de9483585aef43b9f008f853560d97
efce7e25dc4ff3c6c59ec8b60d2f3cdedabe7a86ad3e813b6ca5b401b28ae816e092467bca20fc297397211652df97b9e52cab773d21cadd220b6e15
7606be54bbca07a9e6258b59dbba51fbcd07a037cc3083da7a8c202df1f91c92921ca9ce7ef3ea273e999656f6ae37ec863a1450ba15231c715fe6d6
3388f959010e3f3104b1c6fcc22976e534f33c516907bbb4809e2bcfe3786e0cfae93f932c15bddc40ffd32c67b7e78f3ac763483549481a10bf37da
1513e76ec98bea721949dcc6ea15995f880c8ed697b255885da0e3e5514b4288410ec0dd28703d480b048a016476fe2f569cddebbfe6a4f07a145617
c5d24ef8e7d1a799261b48a75e9b9cb3a92f667df44d6157d01eac4cb4bd79ff1bb87f306ac73137c608d9a62f8a60d314bdc0c5341fc45959d9d2d1
94c73feb68efc1b5f57112dfed68f5cc623eba4ffcb467bf4c8d5e579a931d7586c77a2624e3de24909dd62cfecfc77402010f5488e09745c08d2bdb
efe45c97d6d6f4685679acb9afef154efcfd55f9c05c11abb95f0b13e2266bdabf406f4d0035ed89f244454a01983106b3d777be6fbbf0c2f3274c9c
5829eb330c545f37e95a87665addf0df832e1dabeaf7e14615f58a111d2eb11aba867fb773e49285428612fdffc3ab82fb423bcfcf5c334bd9b4c43b
1f09dfdcd610a2feac682a4f25f4ecc6b27ad2ed51085e5bf1c8e09578e4f609f85cca164d2f7fc040b51e054426fadb7a4dbb847a02a23f7b90559d
238d4834aa91765ac9326c44e8d40daf26de584d6eb9fb3d983c69ac93aee12e3ef4e56a9f92b57ab14cde196ad6ecc9df1a165a0eb48665661e79b8
9c909ded897e08db7b45c0105b99cf02f5f34b21c49165a7029b9db82c93c6f23cac75efd35de79587d54c44fcf3b609814ad8932fe8b131a0a40ef7
b10e052ad886d7bceac505a1cd023cf2c380e625a5ce22c79148f604e1b2e403fcc43d9c7a590deb7d0adad1c891b547f3fc800fa0762fa6ca96dc03
1c2870c12eda604ff983c9364fe5f1d0c3e1292ab64e090227a7651e799db6005b6202d27663fc33f2728a7c3b046523dca5a54e66a017d9e1936beb
60b6839e7adf19b499289c8e59164493656023f41e8a5a946828006fcc86898f24613eec02887a19f7b6b49f5b90ea4fb84b2aa5310514f79ad57da2
d34d7a73f7af1721fa9f5b444beee0ae2841950761087fbc2640b6adb63c2114de9481d197abe4a2e0a5857c354e04aa277743c5d7df99cbf45df73d
2f0d7f94e72e1ce1376c24060b11e2321430d79f82ebfd5a5080b132249b2b77a8abecb17e1f4f4b3b073df43bc06e6547f431cfbe84386de57a4bf8
4992e8ac19d5919845ae80cc81d67c5038afd7838b9ab3148a532e431ccbe6b208ea2f590612bad98cd76bdb41e46e916a5d53805d22f3222646154a
67067b5a4cdda4647bcffe39c9c047e59bcaded476f8e4a46e31fd22206fb47069706d19deee42eaf80aac1c6a25ebe4f8477300cde0a46a3b7d3225
18e26348478461864a30e6042f0b6df0cb526d32c118e9df9c610d0fa998f85bd1fb2c6e4cf8e5f83198ba9e0ae891813babf69438db577e5945e69c
df7eb0540cee85368954186813443bb58e41fe4d1403f4420a102b0db7382458e7832658f5fc3655bea84f03ff5b2b2fc961edb15b030480112be0d1
fbd99b147872b099c2d215dff214ae5f02ddd84fc12849031ae2e528d5bd40c4c59c3ad6a917ce5f0b38de72810ae190f24c72b66a303d6f13856d35
2ebdd94ce857b0414234574bcd0ffa580fb122a1bf3f95ed3b8b53aaa10e121817fc9f5294e5c225e7f839b226934ebc38cd4957b20276649d04dfc9
7d6cc3451c49d411d2cc8e441fe77c6508c95e92de4116ddef06f8f1f28827f75fbcfac5e8ecd7929ef148127369611e079511fffdb8573c1a726e26
e520389dd55e7ace58ccfa1935194dc7fb526af44afeb28ad82a58460001a90213400857825b023ae1df3cf4536e21c097264b73117980dc007dee9f
a23ef14d8d2dd72aaca58321d3afea6e8c543cea95d950e8ae1d8e3a08e8cf7739600db197d8f5
```

**dag-cbor CID**

[testmark]:# (garbage-01/dag-cbor/cid)
```
bafyreigq7pmxw36l6hjw35bign4l5slwf7qvf5hfnhv2gizst73g5b25jy
```

**dag-json CID**

[testmark]:# (garbage-01/dag-json/cid)
```
baguqeerathd2vkpzctg7undspq6glqkwvjkbu5djlaa7mwphztm2vc6budaa
```

### garbage-02

**Bytes**

[testmark]:# (garbage-02/dag-cbor/bytes)
```
82f6a9608181a464284a51711b0001cd6e3ef96b036471445638f565417270592e8486f5d82a58250001551b2050ad21f07d9e0cedb068df53857d24
fc41f199e93bedd9a68c1d71d89b047b2f84fbbfe734809bcdacc4fbbff475ce4bb8b7e8f5790dc74d60213e5b6767535c4939492a45716c27205e36
2a4209463133533f476527314b36535e55643b3275095037787b593f513c502d284a3032707e2f573e5c28445c76296d2c53237b5a697536694c2a5d
77e298ba2c6030274d786f4240222f513b3f6a6661463e3a5b2c5f40404f5f2f5434096f732b3e4d557e315d4b6c79446874692a37643e323a367871
6a514a797e403e2741607b6a517c283b27432b77622d6453314c4d534857334f4f2b32585d6f7566404de298ba20337d303f32793622285f32574250
462b684e467e212f747e4e7b55324a416522785d48423877743767333c7d25346c517d2d6e2f3669407d5d5224233f56724e6846e298ba3e2c3d2669
6132613d307868e298ba417a3b497e415e6139774b5677357e282a664f2636543d4d2059433d5d653b6c4933710a514e476223544c59615e35363f57
2a24402e69575935314d3c65372c34257a23466939397b5428483a3647343b75766e5a3f3c417963224d4c5e2748694a6c74712a664b5620412e5a6d
2552097875673a79346a263e563371424d25495e72582b2c43695e5858662d2e474473574425e298ba2d310972365f31555772705c504ce298ba627c
796726383f50325a7e566236214e38607b71726564707e35592341457e3a5f2d6d6372506a2e4d48473a3722403f70432860686555274b70575f2a5c
223346e298ba724f2d3a2677734e5c4f2b5969747d5d2b5d2833413e562d722e69255f6138492c4546584b55532a68447c4a3666384c2f7a480a5b5c
645423554e3e704c36e298ba35710925395572734a6237452c3a693359567a400a3d50656d224647515f3b326161783c0a76662f35795053434c20e2
98ba2676272d312562e298ba34622f6b77406c6d3c704c3f57634c6c3a40587e5b757b54562246407c3b2228212c3c3a606c3e5b7b79643d3e3a5f4d
5e706162524e547a72375c405d3e5e40297d0a51347b4d57216d347b356c6c784d506a0ae298ba3c563b265452257862e298ba6c24204e7930792169
6f2e2c656b22454a536a2d4a2248637a2c374c635d2f4d435740724e5537e298ba312f60783b264756327c5c6b3f59605f23277a266f4324556d3d7c
34417e7a4363654c486a38683f3e3932762b3928226a4e316e2d464b7346682448445653326a7b774a52273e2c3829573f545d2f3f60306232764c6c
670a497a317e36790a762f7b785b4a5f39724144487558306941406a41276a432b773b09644046330a5f443668427462325479452271573c70212f47
61656945286664617b7b5e5e3b4679732d276368462c4374335f616070294f342055305277567041472835252e2a472f5d22730a7338636141675757
335a28347a773c396f5e757a3e5a40397671794b7c70266b284b41255647444b32657b47306d3f41283146596235e298ba28204b45620a7a4a5d476c
484b713d4f4f3248612a2358567c3e53563c5331754c3d782e795034553272296e6e3f716a40745325797525765337523c79786f3f52483e7e26723a
2963392a613f766c56632c4c0a2a2e5f443b216e457571363e2b6d2f5e6b36575b583c7b476e20e298ba25264c4c534861652d4c745c6073570a6578
0a645b3c5e5c4f667e455c75386625482440756e5d26e298ba5354394c4c65476f3845735c24617e7129532a6458693d6950284d5b765d21206d493f
7324763d2d62552a334f532556582f7c0a293a274c4e2b2f33482b2835637958774d754b2523315a7a657d093551e298ba256e273f492a5d66334934
6d312332586d28527c2a417c51332a347a5152466563094d757832763836707e746277527721563a2e297c40242854693a7a39e298ba2f4140697a46
5c3571e298ba4d587168602853777b5c58712651775e3e6d38434c3f42636022443945400a544930292366386d28215b297e282b4c6d2455244f2937
547c64425472365b6d43525b503b74766b392275725d727b646f2927556d5b705227784765412d2d552271634a645421237c2c2761590a5e2e5b6077
5272615a7b6d314c244a5c556f235f7a527b506c49e298ba212e555b342d56e298ba306b705249753959093d67483d2e516f3b424476655f7b5a7774
4128682f62237c29532472376572264d322074664f3d775a5e46492c254351516d28e298ba785e257e31662f3b467643655c34345d396758787c6153
5530366c6d43464c754d0a32395f41774f5a6022407b742d55306e6f37755b77697062746f653c783844743f656323232861097d4e38355230404765
4d70624a7956400a222d5065782a283f712c3823253b722b4249493d2b72357d2e5343646873e298bae298ba6566502b5d4d56620a47695a225b7336
2e3e516247322e555d3e5c713f685d65277c447a5e7c28412d6b4755e298ba7063305c643b38477b562b467a7b55522652762b78524a5639754f4548
6b302f796058553c457e7d275a25652171777255543822415e6e42672f26685a5f437d702b6856337c5c244a2f6c7b7b0a412b6e4826526225414726
574e3a2e3f68495f525a6c2f50384b42657b20296b7959392b326032486e7e545c6b215f7059782e3925512248272163784336477454342951377960
6d303621715026517ce298ba393157255b2b405c324744334e5c3a4c6c47715c682a456e2c4578447d7725594b614c2f2a3a5a5c7b6809766d575b47
595e6f4d2454376b464761732329e298ba254d58215d4e5b5f23504e3f764e68792837596b4b3421444f6d2e5f5876e298ba424f4763207929535979
e298ba753e7049365139203e4b33312ce298ba3129697737582a4937327d487a5956683942517364356e64407662522d25463670282621227429315a
6e3d252047452360395a2e30642b544b6c51436a6c765b7b64762960643d663c3c3d55212854644551094857600a443e766b592030613d7c3f7a7759
6d5034530a336470333132413f3670682060726c73504a71466e3d457946693a37650972784f65512b5625594579442e3a74474ee298ba4e72384374
764d4b293c593d2f6657583a26533f3e20255352617060587a634165356e6250693140e298ba7a6d732f5ce298ba3d414c767431317e5d70623b0a28
357554353f68367078e298ba6148485020783e5431555870556024755709435c4a7a54253f66492a27605a7649e298ba495f654d5972206d77717043
6322233729536c6168417b7c303f484e6b5e524c4e26253c3d72617650634609580a566d2c504776677b764e467d747573786b476e226b2f61653531
416d302f657e2b4d692037433146745d395953225e395174246d2d7a2d27212f79676031593d6b5f376d542e667e525e572542262f325f203178795e
5762313a405c5d2e2a544768273f54503d2c20212c732f593562413970564a265c344d627d2f6941476f4b485638377535226d447e3b253974697375
7544526935506c2e59252c37627050674463247a6079536774092f3c5021396c4f366f29492c243c67214525433b38625927603626727c5d4770533e
50235a315b782a740a316f57624a36552a2921e298ba63675833355037382a363f595176696552755e2c0937227149203b51672a3c7375302e577b45
3a6a644445227e55704be298ba276176534f4e53684f39244b0a3c54253b544f7d30355977217b2f49366b637a246668746b72753534694129475d22
76606d2b5877364c3f270a554b2c6d5d326d2a6e245c203a654c3d3a666048315421712074453c44624d7a7de298ba682832547b752c292e31377a37
2a4d092d2025743029547478422e5122765275666f4a2c7143763828212b5e3772326a4b6a67324526464d665944493e5d3b5676616a597e544c6a47
71666f563125776c3b77585153267e793c282c4a5c375e7c5c5a61784c555f7a6b4b4c454a4e3ae298ba216d66362570474d725c7b41422922583632
227940093a5f3b695a5d604864e298ba5c730968585f25240a296a4066532d3b536b4f702c435c2e523d3c3a303f4472515242646f68736c697e6453
776d672d7a692655377729637a7a4361434920393109526f234025666e316f2528552c6b6c5d3679477532376371e298ba235a6f52672e7679796368
266c353c493f54443e602c6a5266236a6f26764070474334462e3d26633d504b2a472f7c7c6128655a7b71354e5e67747c2c502b5436777a0a0a6f31
2c095e3f355b6a51202167095261640a7342303c39323321464f6f50702666374848492d5e61445b507921237d2279436b2e5e602c3d522847775c35
774c2c66463c4355547d6d25785d3a69592823674a68534d28684e623a33327be298ba594f7b5c375c42423f3e402c76596c73392421773979313e4d
3b5b7a3f3e313f72786267300958243b567e642b412f6a3b527e4f24205d533f3a507e55242d7d0ae298ba473f28412161657a2c09454853633f6272
3f6b3c6a5e7745217b2e3f604b315a2641434c333e386528315209740a2d4e7b7b4f44567a424b597356514d735d7646e298ba4a202f3a5750713f46
70667d39287d3b682c72547a45315675096c2367227d543b68776f2e6d37793b363558306f3044467026423f53645a283b5b7a574b6f324f40715c33
2140476a2c25735d6027734c675655454d4854562f7b404b793c4a514d3c71752142684530234c2647264b366b416a3b490953444066562c4b3b592c
2b48345654474c547b612b4a735c4f612a4c5d442c6f635e7a3a3e296654715d676b524e385b307b7b670a4837256b4072632567585b236c21794469
7e4d403a3b207c217e2539315e4a742850576c573a507a704c3b5d5b38656446777b473a09254f432327714a3d3744696839636a395e357c270a7e27
22374e492b262d77420a6e7367226b4e4b2c4b6b0a6b4c57792131f6d82a58250001551b20cc91e4413983f41ef2acb2da9f8421e105132e2541bf4d
90c1a5758b1ff61fcef659046954e478a0b56166673206b021514a875900a7169deccb9a8a0fe2f588a0d06e49c7714c5ecb5290355ec631ccf2e142
3ee2ac930a0abe08bd9efeb9626bb7eabbe43d522078c61592ea4d930b5f00d69a8e346639e11ad13d5c36699bd8fe9f9dba9a6e6b0c6d36c99de66f
bda41da14fadd9948cc1c0170f8c866aa5eb27f80ac7ecff974d23576ede50e1fa8fb22700220d6ed9f423ed8dda77f19797df2ac6815920351f3517
8e60f62306590ac6cb601d7e76ad25634e77eff7d3df0d5bbc61278d35692e55345dd13b06e75594876d10f8cad2973e06ffcd2dca700e0b6ebdff55
215f793a16ea22f9870795e5abc793b95ca5ad6ac529914f9d3854c1b90b9d3b86811b3651d26bc80685d781b97477aaa64bcd0492657d97447a8780
160e0dad2d20996953b5a7bbfd96f56d428508ab358467fa4c04cdba95939b4a2a897d5da3ccadf593414b4bc76834d416e05a67e2005f88c8030822
5cffeab70abd849fe57896daecc4e22ff73460d2a5407b0f2ff8c8209ad47c6e5d85381ebc99630bff89e83e3d7924794ba7485042b62d9204e16490
460755010a39c8ddaaa54c06897635ac392bd9e7511b0b8d23bee69513e0a392d80227f52aef44c3874a7d731943c0b7275fbe9978a65794d685fc47
b49781dfac34b343cdc1ede59f9eb91690203edc9213374e2eaac66fcc5bf3610805007bfb3f9bd0454b82ec34c192c5e53703e9fabc67e2103dca01
afc878d8e21255efda2502b299c91c942e340a5d665c321cbd3dbfd86cb418236ef2b622e6fef0657019d55ee02133dcdbfe7941b34d06fc915a3cdc
48b2833df0ee5bcae7e3552347e07f3f4ca0b319702e372b51bccd4550b4e00f3a108f0cc91e1b5b874af525f8e9bdde056acbb94471aca2bf8fed18
a17995654bce9f494fefaee4fe2e6ff1a494d5594d2d65a7b904390efdc9b1129e571796d4263e71691d11d70b9e4eef2633c0634e237d701e13930b
62b857f86fd3e125610bbf2d0b11c3a7e85236e5446c25449258c42d2411d4be035be4c70418bdfce4f7b8e2e4e3f82652d85a15d234988f44a3aba5
9807f105e56602863833921ee15ee5ba338f03a93ed2184b339cfca0f63c4b70b1a68c688e301cd6379509514f44a4dc5c165e9e76afa7cda6115500
d2bdf87df56dc26feaf884cd79e1db5a598037228fcc2172165b3b9a698a1abd57f546b8496d4526b0093536ffeb2907faa1d715a039f7f7be47065b
997e532a06340e6d2ae1cf5cc58396ac4cd62ca883bfe643bc3748bf6f51ae103842a7518dd0d55afa5ecdfe40e6d13d843175c2d0bc30fb96574168
0657871ffc501dee94832ec789cd787fa3b898df15539d6b2998eb1a6410d26cc1b62d20edf8fa505a7fec92b368576da3d696c6c19b7327fad392ac
213ef03ed06830262a2fc2a53bfee91211bf1bc665b70dda3d686668acc3affcc33d93b4d250457652ad391a9b2abd78fbf770434b0462d216e9fc21
b1a48729d32925fe1c8cfad63296711c10433f4eae7995e05529af6f91e42f060f2af1c7f62dd2b42be63f0ab7538a3e0e83957cf2d643075ce96740
4608f4625f636e665a7a55635047392c6435465a7081d82a5827000171a0e40220483fd58fe7025715e9547fdfcf35b8d6d31f5cd5933677608c42e0
714b65b91462405981a0636c585ad82a583500015515307ed66653eaaa685e6d619ae5ff7bc2276fbbe55c5f712e16f07ce3a54abf27397ecd5dd07b
6c4d649c864ae1a9851ead6509286f2068d82a58350001701530d189a79457cdd58643a3342af6b4b58d6cf3bcc8f8cf03659b373b6f8e787778077d
8030786f97184e695d10c8cb69bd6c71217c5b6148484d4f70685e3b0001fa1ac9f43b60745e4d795c604748373f7b336576642d3d5a6e4b71d82a58
450001711340a8ab9b5121cf5ad010025d3a8fc20774faa900269000ef71ecd3f484a0e2949e6af56b5988047d7b60225dde93b7366e7d7b87a5da4f
3acb0c250d6d590a7bb0767e7d627c30666147683a3a7b56376667442d525924383b000e531f5e6de1027825666e5e565b2341433e5757355d2f383a
6b55442a3f75423c3e3620616e554163446be298baf678274e2f3f27576c33453a7d546f7a4d74766b307763456e534d64467d3a6f313a646b66587e
37614bf5
```

**dag-cbor CID**

[testmark]:# (garbage-02/dag-cbor/cid)
```
bafyreigv2qjdrwbwfrqaamyjgka7c5htkb6vzb5y4h4k7u4aeslnjzqy6m
```

**dag-json CID**

[testmark]:# (garbage-02/dag-json/cid)
```
baguqeerany7g4t4n4uhluzo5cmp6q5njzp3oenom5hxo3tmryymx5ukm6rzq
```

### garbage-03

**Bytes**

[testmark]:# (garbage-03/dag-cbor/bytes)
```
84f4f4fb3ff51c1bf8c6b42fa4653d5e6c3a67831b001e348be89984dfd82a5825000155122099ca2d740a3694c05f0d1a755262731aced8f479e84b
d245cbab9d9a43ac4092f46753344c2d7a3c3fd82a58250001711220c21761411ee02edfa55bee4a47f05bde5d7d55abd45d8afc2c06a5980f8f69e4
6c5c584f303f244a5f485c7652a07553546e207b79745d595427287e5c71425d3a2f266881a261433b000f1ee0350f4d08653a20753f75a1642e3564
228188f5f5fbbff2bee524186c80d82a5827000171a0e4022006baa7b459ad1b541afea16a7d81d6990174c1af9c9609e64dac3530576b3fa5fb4012
04f0d3991297f6590d05f5d79e646336283cc524a0ca58c2328684533c63c0df23e8d68ecc6c3da6225eaeff2e52bd33ada22442d1e489e49e5f5296
01b63d3a8cc3744c9735fe6d9273548cc7575b0813ba8b8c7777a1f921dd0e9ab07c6f7fb3de7fd50aa943edd2394d4de341792c4906c354b97c038d
9909192b0953cb6a63047166c7b8472a8dc4aa1ed00019f42ba538cf9ded82d55b281d1d8867c40b471ebe502771d7c6a1d31f3b5974c5f82e6ad387
a78f5ff9cfd44df8a55f99b16f1b3d23b5c51b686d2278fb4024f9a308d759156ba3edd46d71aa7173db13b625bc7ab15e217cef2f37987e3f5da1ff
fedd74a8153381eb8ad4f4d06eabb864f3fbe721eb8530bd2ccfe7eb478fcb986e50e09dc1e6dac8a5ddb970bc47f2836ea560a9349f3ed2c36ea282
902eda7c45abe8571b13ac90f7e498186ab99bb64bce4318a14b5920e80e96af72c4df64cdd79daa9ed5f623c1ddd93cb252e1469fb81febb58b20b5
a062ef4d3ed462c8b740b86c1650187504b528ac67aaf12d648fa58299463bc69e93923792721ba6b9057448a50796dbc5ec9ed3786ecc271e4c3638
498d8b3406b3fb25bd3c0531e5024ce3f6fba67dc5dd64b8b1b26b480fb70a7385263080d41d2ec77351c8e0ef31107298ff7ad9e3c3d9df3996bb4b
b9cb39a9157bab1ec1feea926b9601814bf3d8412ab92369ad9461df5cc66cb62d5be1be97c3962f48b99598fd444f080fb9e82c2ebd8dc0b036dbf7
0a52bdbc69c44c491e1ce1e44432deb3ada46562b5d32c7e64d1796cb60d1c81ff035327ced6a39f827f4eea50f26a7d10ddb11e4a57151be5054b78
076a7a7cdd414d461fd33c902b84a9beb3a46cbf315579305897a7f498c8f0aeca5a661bcf9857de5e31fdfa0403448a073b956e6815ed83c3fb632a
c9ccbd28becb22ee2def3a0293fd34020e5258d8f28ed8233e02ed65279cb0cb847f4291ba7a86d08315c612c30d9ad623e08ff0e8da4146ce7a2f7e
9244bda20fd787a3d8b14afa20b81bfc08d5f64edf96bd452dd883fce5a779a385bdcee84dc58739e863839d539db94dc1db0d2a4fa7630f714d7caf
975db3cc8f46910354d287823ab0051c6a96e8201f3cc2c772ef044a8f5c742484fc92c8b7cd69b85d5bf6f9d82362e6e432844ed8b6fd24618a722d
d8317e3d55ff48503c78afc14c630160f4c7070db22a0b9b3c406a8bd75adced5e17475535b4e6d3f01974677d4ea1b098416b0b2e113bc359f17fbd
c055da6276c82756fa05359c32a45ac4b4f26ff73615d76f23ef92f836e71782b699ff345ef314b3cbc2d04960a92ab086c9f38084f803979cecfe26
5017452dee0ec31f3c71e66255d9e76f6c0e6846cc8fb5319ad2a28ceb119bb04603ebfbb302c150e4aeb80e5fad9779255731ddfa88fe960988c99d
4ed00ad93c5515843befb9f1ed0f54e379c1d8648dda48942ae8594c2aeb5adb187edebf647ce799b1985abb4d52b50d29ca40fc619aa5ebd0c098ad
3bc5cf65c5941f4e41dbfb07af2c0aaed3c82ebafc0ea2429bbb659e08d5d9c6ef920a554ecb09298a119f2153cd2d5f1cb49f7794fefb745d3f7ec9
26fcf868b26909ebe71aade7871752060cd944238e5982a8842cb6573af630e8e4b887b0e530b02857ee22c5f871d355e8456a3ccf6016ed6a93f65b
c81dd62937cdda6a5d48ed2e514046a1404c919d08b3bceb668c4144de1b1abd537a5753b8d073005382df658d6c10f34c712d218e2d1e20433e18c8
8f53321c8a1604bebf7520f5342425eebca177312cad46d72f9bfbcdae21b82ac92c511f1043b47a73b93b70d7fe435c7240ef744dc5cfddc8471de1
76adb62b6b3b61d098a279b6d0108af047ff780b63fac1a1ddb1a346d4619651d080330ae85a38aba037341588fb43e15a5b9fb379a636220f63dcca
7182ffb1faac8a7d983f655d4ce32d0cc57a35a0556b13862e6e221aea44c2fb1998ed3eee096f2e94876fb1182fc05815dfde5193a222343241f653
5fc4cbcaaa72107b1c02de83fdec52113f5193515043377631e14f53ca09db058d21e53dd186c900ac718e5d090ce3817b03436b53489a4935faa371
7628c7bffd6304bd412f403551d98021a1307c30b48dd5af1032eccfa90f2b51620901734f67299a23386afa296ab581f3e7ad3796f68f49f82b0abc
c7915d465faf05a5b731828ac065fb37ae997dda86f3601c1ecbf41de718cf9bdcb060478e7d65f82165164f9b9a1f3f55c706a523b41e812fc71a9b
62cd7b0015fc65acfb369d39d1e9e0003ad5a3c3d92c5e515801b5b2b3771fee986883b6ce965fd3e23c654107e2bf2680f3bb4ead775fa49b4a3c69
e050d66de33996d9d4cf62aefd9c0f4c029eca0470696cafc7722825afd16cb6c39f36fd7cb7432dbbcdff478d6a52ab894eb3cdad9ab18e7caf6074
fe305fa03f994b755be389275258dda113ded58f25ac277d864636d307c9fc3c3a3902a70b5926d890c755d12cf4317913bebd21987fffa98b6eca28
965d417a3c0581d6c29b67874dc2e176011e0f324edb1b011a0bf88aca5901416ba4f1d7a3c48d38ae8d04df65933a0c4065e11dad4d56348a735cd4
d9cbf2232dc63668894a17012d53f717804e7fddea54beb3fdcd29f3c84da216b7fb0840d3a9b2de121b22dbee594286f122290b5ca3afe2621063e0
ca67a1a9be9ca39101950fcf7fcb31fbc40146ff564035b1d2b206875cf9cb17b84af7340b36681bb7e1a65bc2429c44901084db60e9d1176efcf687
608e34256d5e19168b5a2f9b0a50ba2586ff405c44709fae8ec63f05df225e27d1f175393b6675f0e9dc06d8974762a647a5b94ecdb15488419443be
8a21c411c9b5186051e0272673c24c092ab8f1afbee46a7ab8bf236d591eaad8dabac3158c7886c6729f45aeeaf83018f1b0669348ac51bd1f7d5430
eed0161407487d5e3b1b0f886b26a2b4f1c8fbfc95938af6f4a44dfab53ded7cb8ee67cc5dae591aec17ddb096f355388b2e56bd2f1a4ec566b14341
46e5a7dc06fc5100247e351d5f19ed05787e61f42e88cdf26bc2e0fc72c1916f6a9eee723f5112cc936e6bcc96b2d857a1f4d42216992d15816b158d
ccc7e47da787390ca42d06c9876e8a4e5ba33553d5e620f8cfbf39bdaa6109b9af5b5d60d2f5ab69829f04fe813f9e7675623ad25b30181999d6a66c
faecc4feb2496e4deea6d4cb5cfa42f38d8a11c3dfac8a59e362a13482c14068c82a12d3f3648b0aebb43a9034064455f979e2056058b56891c7db9d
2cc096907a398e629e94f8bc42a1448710f8141636f2ba29b6737694a95ecab5045f48f286f136f5eee7dab04f374c850b2c17bf4dcfdd759ae5b490
662259bf6d670bde424e1c6a32ad8fa16d45fa0f6d09a4739681b2f78d43df679b3eb2261a018e2b21717645cb53de780314d9ee9a49d74d8f7e5868
926b0fc5fc18898dc3e187c45e9221b28ece78fba8fdbd7e03f278006e6573d17faba76a1f0101597c6a966cd5e6f935a7e678c744490abe6945f8b5
0e7aa5ea67491e1d146d7a9a6a7b8a2215b850c97764f7de9592d9ee2cdf23db42c89a61ed881e697537e4101938067f17e0626e87f9141630e022b6
21ba8eef5ca5ba69a49303f18de21aff48cf521750809f30ee0692f799a3cb73f87e1ee9c32eea28651ce605d22a3a0004d0f6de98d1777e3f298828
23b823caade7b7023304706f3a28a0c84eab79d69f940defc76979c66fc5d624f09c8ac093dd66006efdd06555ba1d771718ca89c0b16453a4b190f2
c5c5ee8bd9ba8c06bf9bacb3e40e1ab4f7a73ec60eb68495186b27e3c25af25af9fe247633ed8a8de7832f7048e1c9699000ba1941b6c49092799633
c25b39e03fa08451ae68bb3d0c997ad1402dc3e2845953c672089c503a2768fe74c954d2db809b275f635bb3192a186e808b6b69c05d3b1abeb1ddcc
f2842dfda21cceb7b8653de9ea5a00a50bb63a6ea3985e5dd54cf2e6d4de72e5ff8992dae9492c85ce47b70aa22bc44f9187a99eef23a8d30e4d2e75
d7ab71807f267cd6100652e1cc27d47b559a5be3c439fe657cfad95f5816fc5e10637ec4e8d33501144e4bc2b4e240b49e0afac4f81631e25e61d27d
083e1d6c5fd15134e06edd72afacd4bf2eb0c5bc62a723618d7f11e2ab694dbb2e7a16f0dd7678b9aa3fe3180342087624b110b01ca72fa1cf8de437
9b6f8146a0c8aa67b42b2dcb083dab7e1addaf80e0683bac536e2dbe5818000364ebfcfa660cc698743fe0124e0d585f9a537b1430ad399236247cfe
d20530a28039691bfec2a312bfbbf2174d7d0d27125853f87d15aa531c2e7094a4a30ff7d78109687f7b4fd791859e46dbf2232f4b2b03c17a64d434
756475dee47b6c14c5d46ea121856696aed64aa7e492665df8d574fb4e45a9f087c0f61de7a3952b4ff783964be6f1f8d5d09eea2ecc7da65f02aa72
f525b2b49105f1d18746d5699678893713dca1126b43f15de6fac89a814623e1884b27a22254bcf60edc0b00d83a59f6599154879b9fc9935b97b3b7
d3d0858d6c8b9870c4c654a1ec7eea46e6158ec61cca9f76ae81dfb07ad926f2c1e404f6ce9e4f61f7b785bd3eed79392fa97ace72455984c3f8ad9a
fe3cd0ce8cd26d2272fa794705b2e5ab877127d7b3a2e445c53e235724a7e803b2dffe5fdebf874bf99ab58284f658da6f818192aa445ce9a39d0f5f
00e2c70bae124147d40ac030b0a7f5295fdc414bb6d3bcadde3764851e783ffa2fda5d802ebfab687f6008591b343da65ac8e8ac255b8ad5cd281d3d
b4bf4d8babcd2b9b190b5047b2a659350e80884f33a880f3f03f92e74cb2a7df26ba85ce31f69b1efcc8e054fbd9f81d98fdfd9056ddf9fa209c1292
fce0e51f225c5d7482e4211eac0c4e0d4eba53bb51206102e92c41e21287f191c3101b68378230c072cf1dc0e4436e4caeeb053e164d01562f033b77
af76b69f314784f1d3224ae75de6efa30fbb9b9019855766e289f45902e3ec49b97a54f86e8849c88ef7db82f335e905de1442ad4dfec7839f0491b2
f7dc28b26321cdf3d316f8470f69d4987dd2234e8fb5413e22707f40a72525cf745639abdab4870eaa7f56fb9fe14cea69a2632642c867c244f3eafa
7b24a71cfb3991c3194ff66b2c1a073607dc35e4e6607a79517538be5a225420b69fb7818a649ce315e2db333edf21beea14c9ca4f862d2d6ce08e33
bc2404ab5ac6941510192ad48c07c2bf4480eb767a184baa3b97953a6086084027af1d63a589535d477ec21db629e451d165a19f742b16a6469c194f
5e038b9a84f3e48b231c854ecd84e880824a44aa74b848f4ef84191aa58071ce52761b756a77978ae989806814fd92dab04a9d11ce443ff29b71883b
d55383ba0f7df1afa64e70d9c2d3ab1910f3bdc7e3352bfa76d83dd6ca9706f660966a707b23750bcea9690f78b313039dc821836bae7e3c8fb3a810
d061ce2c83db23df30a816b89ecb7aadf1f9f1fcd1bc5bd3d4ac6c0f252ae825b2b1f5c3efb2e341fab8401c925b12855fff0a99c2dad99ff9b75084
8714c8208cece4de34648a4972eda912efec5ce48dd3e40d70b6cf5981e597dc8259d32bbf4b4f5ee155bd113ed834b20cbab24ccf128b77a0d40e3f
65d9530d2e6af42ea6bd7399da098b7f9d91cd66ee4a714a12c724ecccf21d9a373ed4e68b8f7b6077a466e614ec1d02bf48a67828dc2fa4972b5486
fc46238e72aae4b41f2d9af7973062bb4a1dd141fa0482cf44c34e7ee530a1ba86e9f0f8771599e687343fec2747a2912b416716b10a245bf6ecd7ef
9d66b9419eb12cc531ee6c76921987dae511606058fa19321d2c353045b76427b546401e13d5a017d17b10873aa75f22b60b8ad8dc8e72b13834657f
abaa34aa1b9f7da60cf2b61be440ab08c3c9f80aaee1f251b39404390f29381cccc534611bc33dc82fb27ec26dcee1d423c82d21d6be6f0300afee9b
ec96a0911db64d95a6c7cf6d45aa86e4fd8f3d18922c0d189f7b409d7d36d00e8572954e260404c55a4308a0a4564a348882f68658cce5d5c841ec69
c76ceed300f3fd0066a14f3f3b43eed1ba6031d5c4cce69812629d89e269a977bafb2cd8b93be0ece1d0b6830cbd17fa599454adc25b13ef03b10d79
0861fabaabfd9433430762501a9f58cd86bcd2088ad0fc45bb9371e1d87b21ff1e7d081fb4461604bc09083b454a5858bd33670a8974290ca90f32ba
1edd1df501eec01d4086512461a0b6613dd5324e920230e50ebca8e4fd107ba21f5930fcb9991104696679b013dd984a5da33b8999a2ae70782f86a8
2a58e8a5495864c92c7c356871be080828ba1b0015f2f066cb560fd82a58350001711530367759c18f31dae2a2d7ddeea89cc5791fdf60961278339f
21b8355e4627cea2163fb634b7f53d3efc3059fbbd56245da1645361255a59011b346721e3de30b92cf7cd428eaf96801b411b7d625d0f126321a44d
a64b14811402efd18a84ee0a62bbe3867bd4ead4f5064cf61dd374d4230872816e03e4fb18e10f82338a21c81a941f671b312c2ad0b66212164f206e
73109433d5d075111492e9a28b022d0bdf8e2765d2c562b72714025ff50192f3a73e0db9e0347163d0a59c8c8656efd0aedcb7541ca5ef48efff9e9d
96f115bb2019805453d7c5ab3685acae3f6b7509edd663e166b83e717d92f97c44269193a9837a307cba786ba59e3d7efb13b434a1bd16ff1a8d236a
fc878370d969807ff7943103de314b8e136e5fc66ac5ff7c7c3a8060b4d508d38a8b7ec6045c6448f22313f18ace298ade92e553be3ba08c4a82d03c
24ceee51ac5bddd0d8d949db096a1037a26275613b00151de31178e944781855427166726c3841677168606025263f566c3f297e622352f5a1782f59
25e298ba5631725e31572b605341645b287624775727707759793f213f5477243f78566c275759234a422e4f395c6439317242
```

**dag-cbor CID**

[testmark]:# (garbage-03/dag-cbor/cid)
```
bafyreifklmnun4gpoen7qyzofv7fwwx5hb55lmrnzwg5mrofh63sllk74u
```

**dag-json CID**

[testmark]:# (garbage-03/dag-json/cid)
```
baguqeerajtfjtow4egqas4ip7qhtc7bg6dpxfadcj3airosfxo3qx2immtfa
```

### garbage-04

**Bytes**

[testmark]:# (garbage-04/dag-cbor/bytes)
```
a36539753c795cf4684d7e317b61302064a3625b4858230db50471703e48fadd2d92069336b56724cd6687b40aed100f9dd1829aa313effca32c663f
3b2a482863a166767c0a356240816620392443775e665fe298ba5b56f67827367b475b546d59427a213d3d6f67545a3673413e234d2f347d6a23525c
556a3c674b5d667d3c4c59133083b27b8ac3aaa12d801808b6d6e6281ab5af8d5af3dee9a3dddeb31751d69ab0d424da2ea7afa72ee71bd39b7d9f62
38eab03d074384787bd62294ec71324355a5a0c6873eb3c809c52abf7eb01ee3544d267b0415c23328fafd4c8c9ddda7ac853bd354b95876ca94c265
fa31d73a5165089b6d15ef3e9ae4b95d8bc610101beafd90a0b4dbfcb824e0b9fd2bcce1045051b8bdda0349001a63903a450614c5fd985e56c42fd8
0335500662286a2a3e0a395e0d507e509300b68e4b3115adc215716d9dabc60f9f04d836cc5106880c898498f09f114f93af1231305e04782647d45d
e6c94ecaa0e8356cbb1aee662063caafd73608007c5ecc40733a8601a2a4e76b4b162875e5388733a0da6b6cfccbf39a8804ed629f570d749732f855
5f26ac6ea5ffb615a360be13ebcccec4defeb703a01bdbbed54b1b9673d81a63929224a280a8cbc73b4381cd6337b931e9fbe1ab27bc5df9266e5402
fa2dd74840194b2e4c75db22b18e19ef887e599cab898788fc36b81541274504f1565f9b1066c0fcf4a7ea2ee9e6da78e8f9984103acc19486740960
9ae65c7fadd3ffa6cf276e67e86f20260c801e942e6e72405312cd898340ae53b5b246c526e57fca4762ceab5ed19d5188396f524addf81fcebeac6b
da2d71b1fb639856960ed9eec5c5cd34e5d6b3abfaa8662e3228c771aee455b163a3dfafce0e6b6b66206f1d89712b8268f2af6a3f32693c87d71315
39eeb3516683a6213fb0eaef0040025820d759493ef93d3987090675b720aabef4b9d85d293060ce4da0ab3e11694d268485313ca94206aabb0a2abd
bc8a2ec49d33c6675edbf50b7e3b84c7aa2efce53a1e5effa164c2501bb110077b0283d942e291ef6beaef0013c219ae042cb8eb9d72a80044eb3985
99df95cec5bc30e864e39f506f997f5fb12682392939abede8a70c553e5e18a30c9705ba0d7440576ff3dbca2066dbfc95597ad478d0e6bcdfd07f9a
d388b1e12d53435148f5ce3803b55d3b2566f17b4fa880b9a06529601eaaecf6f8ec8b7c431366a5f75e3d991a5317b7773cfaef0caa1fbba5bfb42d
f28a15437aa12bd6f417a1bc032923dff1023aecd85b1aba7981859e6ac0b42e1212eaf0c97d8d8e25dc6d4a9cbe70266532ac9d57c77ea201803b17
fbe0dc8990bdae1166324789cf2815e29c6a41370e951532a8b802ca4cf6b5de0aa5640ab33788600cc4db2ca84a359e3f09c3ead86be27a57c1268c
3f50c65674fefedf9ca9186d39689d00520cc30b6dc8c0a40253e1bbb3ae99effe2b38ef7e3bca351748043ce536fe143110c850c4f352bdc120f142
ae98e4e907b1b4f80217b667a8f71dfe461b7b75289e5e6593a2c0fad46d770addefb55028eda71b8c48f7a04780a9c35532b7306e3c0292f7494ebe
5b42e0ed5dcc0d070db467ca1b979a539f69e8505605a2f7cd1fd76dffa30836af3d949edd3c2ca71709c8f7acf68cb7e7cdc587506be620bc086ea4
f0b1bdeffc8fd24f8e5dd197da752b87ff47bae4996faf29024bec2e8067d9721e47a14e2ffd098b8c2780e2ea7a5428ce1eb5802cf9967efe3c8bc0
bf1cfafa3f96ca9705db04d4e3b28c82d477be225eeaa9642ad022eee3c73fb6902ce76775c1535fb47cb52cb98c36962ba9fb2f906e0cbfef8116bd
872f08d4f9643ce634cd61964759dc31bd1c16f8b2c249d5a6a319aac8b49ed28a50a0deafd658382ae3084cc083d3fa5e44d859637393c7c36387a6
4d7cd792374dc3ecb8f4ae8fe7626035d6ad7e73ea21d02d39169e6006f8a5befd6f508904a032d46f58ca0c15434f8839f1c3c5709d260aa5313100
977b2e40bb3f78d7ff4a0fa9055f81ffd44cf255c2c3dc6df0863d5a70744e02f8841cb73ae4bc11a3635baa93728753a1c198a4627d7963d1c7dafd
e0941484479a541b061e449c40b051cf086f988099b3e5c1f9769ed9446bce4939c15d2c6eab4a0c113983c6cf0cdd52d1f72e3367b5ec90d03cb6df
65dcbe9e2c334cce99c78753d7f9a38ff84e0219c26e8b7ddf3159ae10321d01a7dd21ad506a415e2bf1c93e3fa8e3de6b4c58bad23f646c95b882b9
9816e4b332548edcc8f0300d83885bf9e776dd46d30ff3c5b8d236d5f28648f2b43ba1a84e6c21c1ab9958550777a0951cb39dea89c3fc3ed52f7661
9058ffb8cd19fc81a4203fdcbacf05ce3503a392100857dea914e01f693cefc4c2f35cd871560f9f637a652d7f137759c2addc2b161dae77125befdb
2ca93c58872cd276009763b3da56bd8d6b22699203a52b6f1fe7b1c357f54810dc02b175f534759f0ac76da8b0e94fadbf7152b0f2069a616f657ca0
76ec8bb43088e18a815f133a9526e1d351b26d68bcec69d9f2bcc66b68a52107b5e3beabcaeebc18f981ebf17d3a79542dfd93f894ec718c9ecf11e4
73bd1177e312b951419e2744cb99fcbd125d33d16bc5e5f51085cc03cf76e88497384a5ecf50535185595b7e6b45bd4e780600bbab6b6ba456bb93f4
e01ff8bd0fdea7ae1fe62e2bf52e1b452cf884a7f3ba93027183800793985739ddfae485f21bd871abd9ed8a4845ec73794f996ea4cef5adb8af82a2
009556f0f105360525e8e73c4363a8f7e70e4069d285c78a4eab2c1999ca6a515d29490027f3cca970a176fe7c344cab88b2e4950b72c5f269a637df
15f0956691b5d4113fb9ac0cdd519069ff1398b4e2d4768375e67ba6074d1cbff59bff8847e51507b7095610ee8748dbf07014dd7d333160f3d3e123
bd15faeff1350b631df0380ac03ef2fa073734cbd396e96bd5bd5746ed0e18f2c4240c55ff616f9bcc045e627a6a27c09b38de1729a7b95db5190e4d
7a874cb1514d04d4fcf7a4b0676cba5505a8ac7772888422b0ccc6d6d2faf873b4f9c0a6bfabb779c816baa389df2a3b594bb0d41ebef058a3ffde6c
711764d9d59a2bd04de62b2f9ec42c97042c580e677dd6edc5e7d4b2f79ae17d4f902add4d4d382c1257d52a4abcab9ef9f7ed3d2475b7a1562a02c6
9d6b0a762f977decb7a6a3922516532e35a3d7fc4a3b0b0b5ea1bebf67a92962c22a34831fa580954221b31346fcb0c80dbc0edb5d4e4a1b3ec160a6
77a9a97c1b84e319cc8dfaf9882610e2ea71f35c25f3741284b28f2230f99f5be10887352d8c50e33ad09eb877d3c6d5e04652f8304cfa40e783dca8
6a20f7a7daa3e486165c8db54c008ab598bb61ae703a1fc1e9bf354dcfd70a7f158bc4cae09b4bdad639b68433694ffc6db5820df8fc8ca7f6b18c6d
9cc5456b27e8db66c12c60e4f9b26e9e508cde83925e3ba6fa9bac7dd57cc47bfc5e348f19d8ac27884dd804d3f71808cf0051ed92c3a587db93e940
987b8ca34bdcf12a859e0edb462631ff976ce6cf9f26087465d4594bca29639b59df2e697721d6568c4de59fc9ab7967234eff6802dcd63df747d2aa
19babddb3568566c366181c633cf93931aa5008af89942f105c05b074325f2da3daaba3cf7c5613f2f7100116fc19957f037f26ae0bedfb401c067d5
1dbba354e76d9806ce1efc683090494a41e96ec81159a9bdc2ca5122ba5cfff62a8e5fe048ffbc9650df3c12106872318ae13c07c56ca547e5a0c251
0e5866fefd1b3f35c6669e152a7d1cd136d58d6a47d63adc3aa84cf21f81261a0403ecd2358a6fee0f4092a9f18809ededf578f7368109531b71d666
b110cbb389dec3b9a303bf038239a4a78b420307284576d9a0ca91a012bc4a3fe7c1bbe21854b856622e340f572c6ea797e5215940ec0465d881f21c
8eb5fc5723f14857d684a6b8539fc215e6d3f811dd8a345561824ee4523572698bf84796da1bd75a080603f88fa801cdff4224e401248a44763ef240
99d1c8298a9a3432d69ae8a78dff4a69415f74d502e3f8734619bcf890a4bb45e0b6360bf832785bc1aaff52cba1664aa8f1865efbe3910e7e0c2ac3
b58563612881b4311491ad2bde83400b617e31f1e08058cbdd9dae3e840c97632cc5f2741f9fe6a27b20e3a2f2ffab9cb95ae0b70efaf3f71a18131c
19eec47346d0295b70f53aabba12d8adc891a29ba78a9ff4746ffed8a5b50ea12e89934e8e5e1b5c8b21dd8f934d4516669cc59d371eb2a139dbe835
18e6528914742d7f6282361ea834479f89a5c05c973526cb6ba8ae1ec2a849966f1d3ce5ef29f141b2d9684de58aecfcda0892da42c358ed2c060b20
c35bc3900359d03156bb8371506d0b4405316ca22598a411a892f0567d530f5bae7069f6a2ad57e6628ec836364fd52bdb7ed603de584df4e7ef72b1
268d85f94ef07370a78f0be52f249814521e8ba8e28824c0e08f804014dd761a1d7b446606add22eaee1229216aa48e8684ede9ddee8db1fd73182cf
e260184eb1319b47c39a3cb71fe56a9e4cfd939ac08943e4455cc31ecd8154b537a2738b10efad83dee08b86e48dd2bda9598d78d6ddf72f529f8c3d
2614c8ebdff9c6a34a26ca6af16fc37a23cd4b7e7437529a20b2e225ec6156c6589ba9bc1f1846b79795804c8880a165d9bc89cd4d9411a042bf5f2e
4deef862c46160944fcbbc7621a50e3d8b3e17e4c7bcf68a32b5c0caf0f77ebec1c6931aeaf2f42f3a3826ee4596814d1dfbc5b1439ea561e8b24570
86cd12ec9f55d61a2070a90fdf650078ea80effa85690e2a97f5a0c6f232301fcb8b1cf8457829093ce796cef3c9107a14669efd89ea77e721d9a797
09df81fbfd516ec7423bbef744f75b70c5accb98eba7831e499ebefbf81881b2eda5fa928e98f289f3e075a0df8bda087f9228550678d7b5fe3f56ef
5b87b40f4b52410f9e35d073a39b65e04a561f3fecbbf7b70990cfdb442a7d261f5a3ecf42920e3af1481b307d00f8874ce47d1c6aa4bf262e97080a
0d96af2e323890904b25fe0eccabefef4c7509932385fa91a549fd5a92553472495aac7f30e9115d6d00ae06ce5a56680525170a7249a375422adb9c
938c75f0ae73d92d038264c5b2291f82511305db56c8d8f50e6d4fd46e8df5af821c97161af8a4e2a110d8f744a993a87e9fac26c19d5464d4cb9957
4dd3f0bb0a5f332537e700bb08ff27c82c72f515c0d8473173592a25dfb04f5034d5c5016fb2fb1550f48fc20c0a89c0987054d6c8c7789b245e6a87
ecdb1da186ff9682b84ee638d81a014dab7c76896a2948e0da1855d0f228c61454a33f372ae7fcdeda5d06a9bc738f2d235224ac67fe67fde07d8272
7c0fcf4c4b0b3f61e92cf72581b81c62da34b3684d89a2c59e640ac5fc2514fb4e9964976731fed527c1a8de58591d1c136a6adf9d223469366b39cc
fc8f912146b06c96721204f9d253d7146b286c683a5bdfd12e877820db8cb9e18f638e9324d5164ed41e85f2ecdd725014acf594dce20a7529065091
6601d84a4014fd4054cc967214e195c7bbc23127a54c28d285633e79157b4498dd4fe134b67445b9d0376fe71f32efa10a8480b29ed533dd9baaaff1
af0a3f21e63be9890122933608f3b40c5d7989748cb7d6709cf8b55798e00d1e8695c140b0e7a002b57a117ca0689e5aec9a8eaca26258ee78127632
10c9fa49bcc3c4a2656cb7e337c86bc5b6f0636a73ee413fd153b6065a75ae26ac53aa2429721230c882615c0534fa06e9a4b299ad8c2e0174d7d05c
5c8f1163010a323dc9c464799ac1807d024df0e334bd8a517030590fa2cd0a7667cbab53fb86f47a0ca80fca1bd03f1a814dbfb803dcb02121d23ea5
53e84b81ccc165a3d6a797328d84a121657a22d86dccc636de58b7586f791ceec92ef816300f01e73221e9335fc1e52ea78b8278a74f54bbffbf3c0a
a54946a42fb5a8758af3b6c4a133257c071d1ef938ba03d727f5dc64a9c2c893270a62f288c2b544c59041a06544294aaf5cbd91e14b1c50b24fa76b
140da8a117359b9e6a7c96c1f0a0724293cda9243c49d6a6ceafd1ee7f88d272e46162051f532be0bcc84f2bea0df51343624bf17285e9f72cae31a0
64235b6257232257d4cc33ff0023873cd7def4feef72d7102f189e531c18e1f89a41c285895115758d62a1a1c80ac7e02bb91ce8a66e760722a69bee
c55bfcdbdcbebf67f9b26c157dafc9e68742cf19b8fe9487f0ed0cd73faff4de08d9e0fc05cbd96d6864da6d240425a06219522bbd74cecfb379fe25
3ed4d00453e690b12ee5f591ed9ea24a259da5aae069def57d2495773810ffde32bf59d32ca285bcb0b2b8ae2294155b11d9e260f2123247333c156a
656c99d5e79ffb4fcf880cea14e7a06f8b77556d89d49d0d0b91e7d014baaa311aeb00d4d55b2ffae9be76c796490dbd43f322616b6fe1576217c85a
c4ae575e50b1b550fc81248687f89eb1c2780d994c6cc1e4f22f2393f675b1f0088af2bac39a451bfe6e985821c9939d5260f4b26bf9ec78716622c2
df81b31ce1d0167fed0a267f259c4fa3e8e7681a9670851262a37190aa66335a3bcd262a1e8b770286e9e205273295df3727c422f50dda11f6a2c9eb
432e40287ddaf9a7a7b027cbd0829bffee0f8fa3a19b35632a9ba4c34d5908fa4d9491c901e82940c0043648adc7541a1b63fd2fc82728efd22846b4
09a830b2d67fa3d63ef216cf58772c59337ca9abca7c3f1dbd016525dfbc49a90cfdf98db5c01a6de1777f7bc6e0a15bec9f41d37f6fe507977c089c
e3c0d8daabc3d7cbe527ae2382d357c46df9adaae59d47e207ba4cbdd5e293d81c7cb257b5b3e48421c5cb822b39505b111a09473d9bfe4b8b706965
fc25fd61907c731af024775465f1f6d904cc09056058c74c397efadd8662a6eae380e126ef5efa74b56481f324b20d2667a6ccb8b4e545f0d2ef52e5
7a4e05207149e7309f7bcdd17cd64b022dc440cedc5cda18c8da2cac76ef9d98abd727fd15d294ae428ec849686f42af1b88c8e25d1acbb524c0da83
77f5e610a2
```

**dag-cbor CID**

[testmark]:# (garbage-04/dag-cbor/cid)
```
bafyreiahi3k3wxsujcee3zlwwltjussu7gkqpm6iqevie2nciqsbr4etmy
```

**dag-json CID**

[testmark]:# (garbage-04/dag-json/cid)
```
baguqeerayyrcgnnmrao6sqolv3whdhywyukct4lxn64p6lzdijrxkkl44yta
```

### garbage-05

**Bytes**

[testmark]:# (garbage-05/dag-cbor/bytes)
```
81a6625135590e3479b1113088f58a9a45bfa4d335a1e2530f24db3e02a501ba9399956f5a107770f75f7be30c193e44ca2edb7996d6e93241bab09e
62c461ac5a59f957d153a27c59e473063f1c28607518e2ddd300366b5de48aea301d26468b3d4c6d3af6470f086cdd3c20c0b25f7f62c627b378642d
d85248c17de817979ebf3bd37d2fcaa89326c13f0400893585f783999f8082da3f1440b47b89964477719d62f96489ced90938966df3f276643b2df7
598c1898fbf8ddd99bf3adb715819e26d6495259bb5dad2ec220e4ba7a3e5ce29aaa919ac572031be033b119d5309b78ee23017ece45477bd22c9340
f0debed67fc6fee3436e7fbc175e6892e2533609058f47b4df226b0fcf5d3785b00da297f99e2c0cb561d2195b4e34366ad27e1b3425ecaa128844ea
eca577ab2197a0507e7429f7765154fb8653ad8f00799af7f74c18a8cceba3c73f0707e902ada61e4269847f1707cacf5a42927a64edc11e2f029cca
5cfc976728aea4135ef76174ecc4add6acd38ed0e44cc2e7a286e871ca4c828dd16d2df93fe6a31125892026f724f8ffc909cdca384733997cd39aa9
262b232d49f599e92f750ee00217ff370472fd5fce4a3c617a09f90359557f04f6674c5bf05f9f6e1a76919ca577c04a20d6b8735c141e3d4774ff60
bcdb84de9f42871afe572e056a58ea6a6aebaf633bde0dac1be6fe0d4f0f89862010c0eb51e5c65c2d082550d5f8e156239727937ecc0baf983d8fde
dc0e2bec2656e2b6750563c61a02ad026bda2ad66effd0867487fe147143c9aa1280eea98f954c25586ed301ecb4474d4e61feea5301b603d4925c63
44ea75292a35b6e67e8a1e318d50c1dbfeb4471d1b6f92c42465d411ec52a41f95d4f7d5a756ed599f19c90c39ababea8ac106773a5a7f33b3929300
74c1b45b9da341a7f8eb7b5bbe24df88544c08aaa80803d75cceb8a96ba7433a494d9f3d7a71bf69a82120135cc83fb3f3e44f538dcbee8787e84b40
9e2e540cff55bca69bdc420f9e631cb4d14e7772966f6424bc63148f9d2f7e9498437bcc57966afa7a2035e861e76cd9b28698962579a3875df9217f
1bd011c80940c2045f1f7327c06126baedbc2e2cb86be4d639e42a7100f03e5a25f2abec8d13de1da8302dd203c9cdf95193b298810739ea65e3abfc
f927cc5b9c4cfeb91a4e78b24dbf3af1ada877591a966171627022a3850ad83b983392f6f1c02e3bd17ead302fcb51669f4eb1cd07f39a2d799128fb
64cc81326c5830dd1302e532324ef10457d6882806259ff794cd43bf4acfed8a96159d70fd351f6b00cf1dd933a770d7f2048b82c190c1d8104de33a
75707130e5974d93a87dffa720872fce79c4bb39a9af040e930e4e6ec73c09b9e42d7363131114929fe6778535ffeb1643b97b84fb6b7671f506d911
e5a60d974c06bf8aa34733d3aa3dbaa157d4a5343bb0ec2b14cf247b22cb46826a242fe0fcb5f5bdc873271b4bd0a887d807f520b6f83615894e8425
6fc26d174f862630f8b8ae134cdac792355cdd0a1788574cce3ef28f647849062800adbe6ed557bd593f477bf143504c01bebea1f6691888672d69a3
ea5c47cf43f86ebcb209e895b23029777b63d247e3d01397aa55ef191a0e20b5b0c6a27620abf1d307136af87f819aa86f3912c71d3470eb145ff019
01dc4f40b2c91f26c543a4a47711f4d9515b2a3dea2e33ffb5722cff037139d3a558051c0c94e8e532d765b655f472fbef078397b40668b5886c1a6b
4d1a89bc8899f522321c932fdc331db7b41fcc77b6618833c2da89d3f320400ee634149224865dd1cecce8e639aa42ea7a9e8120eff8f01873c86278
4947e29cb1d2711f17e2b2331b525b0b8ae4d86310e1e8c8005d77d396a785e605912e530a8da5ca4139f4a47d07763755f5e1bf64bb09b5d23ccc54
707a2920e81c2143037566371afbaac4c987ef53d87270a2acc40c05dc12bec23da1a0c9a596cec064c83d63a1dc1d760d5a63784180f0f93a3bdce4
8fdb8b0ae6c56128b5763e0bb64418f10830e54da5e715b955118bdf14573153675932308bb74088285c6deeb60430fcf448c3512aa81b54084bd6e5
b83d2941575849d01c84ee19b66fcd5a8af87ffa3357b01d45724d9026740225365a8873e39e07829d5ec105b6f275f85b8fe7c149a92c40eeb2f156
a282fb14b9b7f3dae5d2ab51f301c6de33ec14e36cca5f7bdbe4e3bcf812d178ed4e3b3c3276594b2c2d3a05f53a19fc72fc96772c4809df9a6d6c59
4a3e9c24d5c9a63e0082967606ebe3196aff7dc336d45f626874907f49c0cbe9160b9abb9953088f0868d57c9e9b8494239977a8c535330791b206ea
8dfc88f73978cf19ca9b6889b854f75e62327d9959b3757cc8197968a54d5529164681b0e0ce32ec2496349504bdd019b8a21ba90dbf7d5d6bccfa50
d5b53786a6efc2e64f93e9e62b1aec7bf082ee0ba942c05a892d3906b13edb4e464e7e42f7a315538fc7702302dbafd0bc6c41b57daaed8e5582bcef
820d99173b2aa3fdb7b00a388b46832f523440bbbf5dab3ebcd5540c177ff8b713cb921c77f72df1082a642e404cc070025bafec91935d4e6fc6f25b
eabd28390cdf2ea0a357a4200bafeee0a18c0120963b6f7b759ad992ddfcba1c1e56a39707bbedb1aea3a299e14af726af9fa791235e3c03e5147667
15e3d6f993f88d765f0c9b9bc7fa1ccbfda621ef8e472fa3abf8530687b49937ea4493c603db5c7481e155aa4795cc6c3f62c304f61f71bb8b2f8f09
12a9ed3eaba662a7d23d3521136441ba9a57d24c88bda4deb573e6b19dbf27a7d50e2a169f93374ad1c50afbb77eac1304bea5489f7e9382ba7d15ba
b76bea88cbd66067aa5dcfcd519f9eabaaf4dda0847d7092c2f75dd3a881f78841b718e3af765f35384c4ef668a4b804c3185a2a064271c2fe19e210
ffbf6055f1546f473c06950176f4ed3fab9b425a66089ecfe8f534c1ea430bb352b32bc0331673e4288a4839938ed3ad017f288a641d40f8c23f1aa3
a28ac8c46b4db67e8845266450b854e28d35648f5ff53b6e66171121c6837fc2b7bb9fe1fa378d1fbee7145608cc09c8d7e4bd3b1b43950cfdab7f40
ee467425fd1ecf88eb8e8aa65a3311d616fa29f8e9efbd0beaecf37742f40f9801671edeec52b44a864786266b4688884a5637349f9dbce7f180964c
58180f98e63616486e1c175309a5a4300e7a790b801b0af70b87d9c32b380aead9046e2f94adbfac57a82d40f6c9d6d2a4c9c617efc0e618679f2c10
7bf9cc0033cb00ddb3b47d2afbe52344035b3d962020a6f722ca86dffdd830b3a5176d9f00288129ccea19b113bb5ba4f47e41e3c6ec39bc6b300044
c80224e2a1da3fc2211e6fdf0711b4cc9c647776bb727415b448b3f0baaf86b847aac2f726ff131812db658c5da5a7bd6d3f9e2d9e23eb4136b63047
ea3b1b5209feb1ff0dc694db1a332ec9d0a2a811d8b758263db44d17450ef72a75df1fb00fbdf3f054c77b891034311fa70c90bf22eb4e20e5d5b090
4089c718598554c0311d86b4d6f0ea122e928173130546c1a6294a356b5b5acd5877c73b8b931856342f3388dff6a56becb49a5f31ef1990f976d5df
2e0bf3cec84eb81f88260254cac18aafa1936e54fe8b28359bcf68ccc749aef5f36d5ee68b236c74f68cdc7caf4a0decb2c44f03af6ae12b4889c57b
ff3c359c888101295311fac84b83e6a7c9cd53f7a10264d86cb199946b2ab343db5b9fbf757c0162524d334a3b00451437f658a46cb1ea6c91c39d7b
6fca0e58b1d6461e824d75bbfb923495f1f679da292e60fef1dd19aee1f7544e57cc8da2769f48a1248deee713f4da2c1a1f9c1c782d4056dcce51a6
1bd64f21c83aaa3c7ec5107a10cf07eba21fafd186abaff1d2a086aba3d6e130f864c6adbffeac2f6509af2096ae5565a21859a7bfec62f13f24bcd7
4e762526b24766562421cbeae4be2ba0d899d75b5304eb2734ab53988258f32bfed698abf49aa59cd0fff54f7442170ee4de477d5b33f957042c763f
eda7f3027576f182d8ff100b3890de765e1c3534076be472892d9cc7704d675986de02fe9f2d591ed526cdc68e2ed6b0591688eab132b9a682df3247
a8403224a58ff8bb38c3f7094da1700dd2345c770409efdd160162509e1194f1c9a6ce2363eb3fbe1af4b369d4a2ba95c0c4b4c0237744f2ab5a5a19
11cc8c73693d2f94851f1c29db0df3d636be22ebd9fb18146878d5b16739d634e64e8ccb2ab4f89ae7acb32861cc43ede01de49362718ff8f633b5fb
008b578eb356f791e72c2c1484d48813047879c310589461a6c87bbc2a44842cf036e71bfedecf47ba1d07395490514aacbd0d54c28106ae63d950ea
5869f32aa2ffcf51431816c9dd45f87aa5abf23e29a2aca7eba500c35433834661708854aa6616a9198cfd15fd87026e35ab4935e9caa50af6c0c1ad
658c2bfafb431994b741bd2e9dfdaa99d0026d5e92215448df6b75717c271f51c5bccd7f7a77284fea0f63242bf0d3a2c23ddf07c3618d23574b372e
b0f33faacf840b32b8102564d42977d6347800d81ca3eec73276b1f931d36043fde1c94f36ab187fa4b5cd183d38f6c50f0acd4702fc9c7fd1aa9513
04ece4da33fe1c9a809fc521420083c5f483666078c52d68b9367703e767489ee00bc006ca9e7754f294c15c91bc1cf9ea3572eccd6ee279adc7b06b
2c376181238b893629d52560937f027f2944a0018f78d03d5bcae52c3cc41028faba1f6714e80b0899d9328a110b9e1161be9928ec9b7b627b3ae6d6
f9a73311a68bb82ed87e24f8e629001c3c1b0da722e53993d258cd294dc7b77d83ada0e89f255bc60e4dde3f3e3d867f60be64d416ee6de0b5efd604
50459339437617ad4b63f3ab37d51a15d4d7eec1ac919d10ee16a98055793dd74c46868422001508fa1c4f62d4c108bd32e7a607beac137808632c2b
d8b9844fb1d9f9a8b8f687987a3d91455785de261b681ea9a28acbbd3212b0f9be079e6ec4d869e11d94f5544384042261e0e4c1841a95a10680329a
5e4b62b51267942fd3dff181d5228f290c9bd1bcd7cf1ee7ccabe3daa5eb5ca344b2732fd81820e635d0838c644e3a4b45f5645d5d43341b000046ee
8252674564675b4b583b000d6c4ff1c2cf46662345225b602ca2624d497901ae2b6a71387767494b612c216c3d2c2935586154293f44282f09430a47
0a6a372c78253e4839464b4565776034785828714109577d66743443612c713c3b323d763b654c32427d5c49e298ba5853287c28376b50760975313e
777b585e61505371334159306d712e6a536228386854646f5b2d775f7736e298ba5534e298bae298ba59595b65795e40587b2b2145516c763973685b
53205b313627277970435d216375605a5a76722e7a725427275d234e760950775f4a5f236f3e4d4e31406d7823277950422a516f5e2a7c2e6c31684a
6e2e30203b397b7a3d295d626c3a6f456c327d476f276b243f332f2357345e2f423b3a655c3c2738724d7d463178765432275a4a5421735271e298ba
52713a7b6265686a4b43696b3f4850357b734144760a3d5176532d56752d5858286b7c444c2e7b4a6f5a3b2433317e2f7258644d395c207950492e09
4f3e5e4b64746c27227e6054575d3f337a427b4d327d3d252a295d304c44655f38556129653b3f6734253b3a6953310ae298ba580a4f6f592d6a5029
41093e63553f4b2f3d5a494b73496d216774223c462360326736416b5056383e2068202b5d7c345f426664454e7b7ba6625542a17821e298ba543b37
6e4832236c51255949307767297934326a2c60524251493929682d3b0019a67ce044f052632d4a738063607d207901e9445f495d31657c2f45565266
5273535a68247673274d26396d2e705a534f5468247e244b466e26435a7e41786a4a5b3a3f314a6836225c200a6e487a47505b5e4f28736c75587553
6f3f527a503b412b422d7658365f7479440a4b75655a6a2c7721340a63754a44213e374a2d5b2927752045702d445b562f543a2d6663232a60234d63
6128555570676a48273d307266703f3e3549702f533a5d30287925362e403ae298ba32523d79585954634e477a532150765971736e0a38664e335a5c
63485e41233a6e4f6a363c3d486f62520a7e76323e37782457652d3962313a466a272028513f4e345e51642f2e5a09242c2f6b097a745c2047623422
53216b6330713038416d652130474f3c4c4c483e2072603d3d3c48335965710979537663315a606228602f47586331283c7d224b0939784f645a4127
6e3f3e7a72443f5d5230722e7b093c2b73256c4a23295e387d2b2954406569656d3973223c2d7c2149384c3437e298ba5f52782d312d497e58484c63
e298ba776f5627097e5b387e3674505f4a300a337a243b4f234d313f246f2e4771745a5f4b5e2e527e345963443e2f6d7945795e7c275b73255a7971
5b34326d673509263e2061676f6e393364473f3458243e7537e298ba6522634f686c0a785f75254a783b406f49532d235c3e43492873442e63667079
41697335589aee47d297471074830f07cb5dbdf0c837e433591e66503abda3d7519e07abff83b0d026f650b56d05285727ca7576b8f5d6d58876bb67
162a9c2ab1b4a5b9e3282c6824ba8277ac036dfad30b8d71499be4b310db1280499f02e564d2941a76c011d3362709cc5e38b98f3087db77ac9d0c41
266e3ee4321ca3488d329bc5a99c1a49804a7f03027b4e149813fb3c602086bc6cfdfe0d0024404f7832203338704e69362e54452d396057735a3c4e
276c3b687b5c4d6128092438673c53690968755a6079262a53604a7d7226255584d82a58460001a9021340e1cc8edf9ee6e0d80519adc17ae20a2134
88df4053c442a6db8c7e12e8306e66d60765ed0620a6d18e2cc4af67bab92672312dd5020038f86d5f971af33897ebfbc01c0f296bb01e9bfb3ff470
34b9d91cf781f678394066777548613e263f50325b28625d3c425535092c465354542d786c2e6f29662c7958592c474d324d09563776315871675123
7e396c7d4e4cf6783023297875465277452356786a2e56526e36256a2e6b6b095b6521302c6a7d407d52246740396d3a325b2959753d634f70d82a58
27000170a0e40220a4e493280cc54933c4ed5079febc56c407e8680b96dbfad523030ef2f048c171
```

**dag-cbor CID**

[testmark]:# (garbage-05/dag-cbor/cid)
```
bafyreihyzj6xni5ywr67oc5hepbnjapfu4xl5jk27afsn34dl3povgfgum
```

**dag-json CID**

[testmark]:# (garbage-05/dag-json/cid)
```
baguqeera5zopt4schs3rycbuvccqv5m7bppckzjnwfomrrr3wcilhol7qmva
```

### garbage-06

**Bytes**

[testmark]:# (garbage-06/dag-cbor/bytes)
```
85d82a5827000155a0e4022074530ec91e19b91e95cb2929f80c8fcbd4b6bbb9e61f3b564357a09637f60b46d82a58360001a902153057c3b0c77021
3c8bdd12a3abe6473bfccb5869d182710f0e5156303bd83396c6d8dbbe4457f38bffba0bf5cc4c28802e790a154a66356e40393c2a33406b2c283b0a
2f61517c49547c522a73622d60644136374941652040407c3c5d4e20692a2879653664717d463b5965203a64304f2d46246f52792d23782b45784257
3e24755723096d6a4922324f725152345e604554742c37492632335e452a3c5b7e694b307d62596577603e5d496a7e3e437032303c3547097121597e
543b2e38356c607a52515525434b77566d37496b5669633d7d6752350a643337574d26292275713726284b335d3356517d486464792c43253d613863
523c3b794f6c6741382a55713e232a382e4b212a4e5e7c3167227d3e3a7c4d672f33296563476b755b45095730443a223c493349406c482a68463b5d
6a63707975433de298ba35313f7b3b612c2e2b5b464c4b412c48657359482e29262349773d213a30242624676c36435f2066424226465209733d4977
6337256b70736c457472543e455c615e756d55686370263449577c445633794172375750547353375f2c266a314a6f71500a0a6e56753371705a3636
7b5223616e4a4b5521463d5630586f0a3f4c4267747e564e295c29560a62482b79455e39374f590a45755b5f30305967334e3f57742378617165755c
63214747566549442b7d29537b5d71525f543b6f3b3570690a6d45243771386864766d742b776e617d4c227a39213f677735645769593178513f3770
252671266740685e685877272645567e3937702e6b674ce298ba693d287e624e60342a5857654e6c744a27502c6234484064317a2c72505a574a2173
2c353c5b4553432c3c6659367c6b46426d48707d676e2968426c26777b794465426c3629563b416537523e22754b53707e5b437858e298ba552c3833
247e76513a523e564c3e792b2e29382b78283ae298ba2d4625616b72445f377253232764527469392653596475222b5b7d3a7742504861246c2c7729
52702260213c62367b61436f245d4d28624d625b57744f5a5b780a3f3a2b51436a3641362b7b4e305b7a43762e34376be298ba7a343a50492268552a
64783f49716b774242386b774a452579245f7055775d5b482d692c3e527837324e4c50594c2855712e7c547b4523723b483260233d2e20575a250a3c
6ae298ba2762473558715443425573555b2157222b477b2b6f57357d5c6831424d277c235846763d38542f56246b606e40e298ba433b563d6e7d5b36
792e73584f235e6f283f6b2945417e4c7347646e5a3c24737027472647752e7c0a3238434f4b5a702c3129506a2f79742c0a6b24484a637b2078453d
3d440a4370404054752f09357c395de298ba66786d507a71417d6155764746677a46534c54732c305932633b56703e7d4e5744702130742f59264d78
764122536656297c283d3f6747586155774e42455962405d2e7e4b673d4e2078742e6935503762323e6c6769384a3558477c662372495c5d43774468
58526836384b413878592e645b325c22092a38282b254620593d4e402e346d732a340ae298ba606f787a622738672b723b5f79253749324960442957
76617276655330e298ba2f52734873546a2b726e3109092d5f5736584b70407e234c462a673a36243d306b2243582f694c5e713f2c09597d33265161
2772317c79404c5a56786825756a6328792f2c50312946294a6c457e48795a202942466c6a6c6f2c2b722f203a096535642f7c7e444b09743f283a5c
7751565e416e6c6f727e687541672a20542e65483d24414923326f6a7e3035534c7036e298ba370a726e5f722168587b4b594936095e652462784921
624f3b3a2a2c2f5c786a3154545b432e3239586979797074796c2f20545c547d52795d6371713c4e2775602e3b0a203c35716b2e470941317b286246
5376482b25642a5d5b306a39284be298ba3b2f3b314e594058314e77385a557337277b423f796a505769093673614e59450a5b2656295f47594f3076
7e4736744d3d3329736961227d39495a2f2e4a5e35396e3338555b656c705a7945305265236f7134352678643c522e36785e692d243f506535526f69
6b753e584b0926734d6f5d2f3676515f72782250545b2d22267b4241446575572a676a2b41357d4f785b0a752be298ba5854e298ba255f335a782959
5d272961725a2e622a5457596b280a30424478353a5e563b335c6b6674517d27375e642b327e7b3f7655317a31327a7370415d6d4d597ce298ba4931
44716c7e542c607e5d6d3b37713b2d5c4f4d28786c5d6624644b336c3665366844674d292d7d6f5c6f6161724b7e224c2b5e4237686c754c6043652a
443469515e29373e2d4f32407be298ba7d5e257d69407132362267217e2421525a236c4f2c6c5f362c5767573e427c4952646d6a4621252b563e5a47
6d4d0a7b68e298ba2b0965232b26432e26245b3c762b382b646d4070244567504425712c7e48555d3f463329452a3a427c77522d6f3b0a50465a414c
40773b7054252337606d62346b09752b554244445b6b6f397c4777623d6569435976702d3752e298ba325e504a47446c6d3f5e3120e298ba29223231
3a422e3b5d5375215f393a20436b3868762c5e447c250935393f554c53644a3c4a442a3d595d4d6a265a3b6c7259255720506738336d324878525c79
702f382b3545626149467321615b2140663965332c297961442947324b7756537031575a6f784d236757282265516e46703e655e31267e636c584844
607b477a4b4a297c2c2179594b717a2a592b3c4a4d66484660706f225e27293f3e7e7d44507b2e2c3e746468392230584330513851333f0a0a56695d
545de298ba423d52770a6b2ae298ba53452b7a3242424354647b72704b41563a5258734f6f2e2d434d2668613b73434836454833456473405d4f0a76
675f2c4b63644f395c513e2735574b3e503f387323562532645847333646505a204263647d252f6e714f253c47375e7249407d5554786a2b4f4e2c53
425745234f24664a28647e094f4b4874284e6475664d426172782654e298ba2c64730a454d2a37575e505e7174395c214729463538232f54655c6a69
432e6571603643792559254a6a2f313b2d714831522d502c5572255d3f430a5765547847793ae298ba56593c6e7b67762d462a7e4c7e680a5d3a6c3b
705b3e6760494534753268336557394b7e367b24585d5a2a69353b24467d4209706d5f436d3d2c703e766151704b4e2f42633b79253d214135245437
66444e75093925285b46315a54294e476b2d306e6f64282e67572d786d605d64402e3e27e298ba6509774b256e6a75243f695378703d2b516b402f20
43235e2e236a353469387a3b547d60415c416b233a630a32362a2128745022734b456564595f5d203233537d3c2659503d3f5e4e4f45684c65716e26
5a66655a445c447a307e303b7266330a5e2769563726615b6e5a4c205029297c2e3949325c7be298ba207c253e3025735278425c25506a39643e7d2b
293c634a66793b4e2030256b662d7b283e26523f627e4738424b4d0a6b224835595939703662224644567d7e50756d2c2f3d412433653970243e3351
575b6350682e6c26525d52312c704b5c2b2e443360513243716569733e26586a6970217e58266f773d254d6e7d3a1b000d0536c5fcdd17fb3fd01777
dcc87d5b
```

**dag-cbor CID**

[testmark]:# (garbage-06/dag-cbor/cid)
```
bafyreiacig7uemck5umaiv4uje4yzig3wlarenlvch4qya7s43vodjngdm
```

**dag-json CID**

[testmark]:# (garbage-06/dag-json/cid)
```
baguqeera7ifa6iw5re6bbawuvrditz6ptjkrco6gindvicfza4pd757halna
```

### garbage-07

**Bytes**

[testmark]:# (garbage-07/dag-cbor/bytes)
```
83a8625c55f5626c2f590bad1c8eb4705cdf084ed3332cd54a476582944a8b2d5802b6bd99b136b6666b7ce8604f5d8a8825605173ad4064df2146b8
28c9a607a61cf55dcafcdd336503a5f36b87c66ec179fef1722deebf054c5acecaf2b149a9696419028a8f9a25f16d7d5a8b4bc1382e234c653c6cc9
fb7b3940158ca005922255fe9a7b2e6d49bcf28030c1e7012d4e5cf65caf2e0d79e44cc0115d598cb2d8490e79e6d5193f1640a20609c13449b2de34
69e3381c1f567f597a267bf51968bddaad49f3a365de47d3ffddaf5933b93ec46e66fcd18c16551b71c6814174b6aa663b6798fbee990f4b7ee11b2e
7287fbd4c78e6afad0f35abc95cff1ef996987d87a170313c87e45a77cbbcf280dbccf64aaae29ab684409d5e853af0aab36ac46bdf4f2806cf9bc1d
676365a81ce44261f49c62418a8f25ebbf27af193cc303d76101f36fa4a136eb49bd65f6781af371037090d738a4ba0bb4d0a079090810e6f1ed6a65
49b24f7bc00887057a2235a44b92dbcbded92102d771d4ce59e6e8915c3535df16729dff0e532cd33090e72d3cd5c53327bb3a3b97311cbb5aecc941
ec149bd8864b4cdb5938ca87f0f7217f30da51abc6ee887962b1b72b1518c85507198ce129b120bf168eb5805e87b64c13922640519ea8e389eab4f9
9c6eea81a7785082ef13c852d0aea4c2b63ff1b700a369adc5d6f0e696edbefca0669ed36bdc696f0c12dbf3aa0839e22fbf84f3ba8a17bebb2498a7
6fafc6e0ccfaf0b8128ea24f9341e7cd4d919fe7b78015a5b7d5cec51331c70ff8bdb41feb189e8ab9122feff07fc46dc1c1b39b664906aa7add89b8
a8900681111b6fcbe48d9b1844b02de7b1793aaa2692d861684cd3ca47ac35a3119f5da3c9c206220967e412f6f4310415953e7786dcaa624c1393c3
ceff376068940e0bfc24ab6bd8bb676319915acf9192e7e5ed7f7d3497252a986dc820e7235fcf6b735472b88df25fdfb1d6e26e7a4647697b0ce3fc
55f3e621bbdd7d9235057a4c2959d3996f41e541902ad15c05141dcddf971e2b045d63ef072a07a9d8961bbe60a8a4ccbd862687c5c3dcd64f5661f0
e4f1e24af76d0b656fdff10cfd1fc51a48e67fbf70ed149b65b592d89019c4a1e2eaba84acd4935349edff0385ad2be888de2c55ffd4356bbb89c3ca
68f6c02b198d1a23db53a4649447684d50f547f120053a256ac5a09aa526b9c6634d1241408b1907d9d93c25a9a188b0dab17619d4a7d0ba144a2742
70309c162df8210c39fe2fd04452413cbe3313f86f42ac9dddb9c7c9b94f611480e9d2d15c27a0ca54d728ed81cd93996ad0c6ffaef7b84d86f0c691
4170af1c83083cda50f37c4b0aaec9bb7d31657ec3112798a25a5c960c9fab451d53531b229aa526225f3d266091d2ce38886acac6d271322aee11ea
421aab2b52239c7fcfe9ba372ead261b325e6728bde8e0dc6fcf6a328ca5b72b3719e36cdd14a97ac58d3dc4200faab0155640420171d125d46bba5b
5d291486496d0be5a717cd7097344b4dc456f353eccbba0a1b22beb8adcc07d6d6dad7a314c0b361f8199403c13e64034e252221ab8e20e247171288
b262b815fea632409f4b8de3892c5382d1097ace8cea5c667c0ae5c3381a78deb2b140a30cbd3ff51e7d3849074e385ae38f96369b065a7efc4f50fe
ed5e74e80c6c726bd71572f2b213037612e8a7f37b5e4063ed16b940ce4a7ad724a3a4a1cb661117700ad77334f6ce69364bbbc8b9a3bb11b7fc5beb
86d0929800a5398014f3497e19ec353444cea0ba9ad9716c9b1b0628217407700adf34b8430bf902d80ab1f2ccfb793967105e42e5f060712a5bdf3f
0e8643c908b9254a9a625a64b8d45b2c60b30eec58379299e3bb80fe3e64a31b656ee3a63355e696583d951d017d2144bb60fea42b31fa242443a03d
27c5c8adc7624cc7de73e6b70cdac4532dbf1f2198eb87813300f87c5bbd06a8b54f8e9fc4479100fe44fa776c7bc530db8b19fd5b374cd9beaa0022
e64b4bf7aacce56344c073cb9a211ce880a60d04ebd9ad61e68dd1211795bdd3c08af8c8a5ddd9c65f3244880749333852de9dcaef8d6633e8d5cd50
1e56ff93c82ce982a9f1d2ba075062c6c843d48911d676e5f3b633e319ac87f3dc5191b94df6f581b9fa380b0b94000835fe751a6e56f89e03997416
ece5e750318e3db9abfc3d33d17e750646bb33d551cbc4346df0ad8a290d5e71c6a85d6bbd81dcadc833bef6fff68eac431d26e4abfebdeb20ad9bfe
5bf2fef1025445589c61281f682c5de4a8aa2c28e8900ced45e54dc93b9e7e36fa2fd2f41795c812e558cc7d6841261a1a23df80909294d12a0f32dc
a99d1c946336f5d8d105fc56799e23cfd740accef40c5dea8916b2ad4d6d7f7907a7a0d22decc88ac0e89b2b8dab5f45005427dc435afc29ed6d0ffc
d5d2dfe25a22fdbcf56a8e4b2e95d26cf8c29ae28c5cd2bb113ff079a13ff6013e87c65d672e3f8b93728187f94e94ad94e9f052a9d149b248f24966
c16fa49f869ac3b49831f132b16aadd1b5b7c4a45ad7d0d0c28125f2d2f965499bf523de7b29197ae8cd3c37057e67607967d82a3c1744d4ea9681c0
b5fcb82cd20dc95540bf550af0b780046fa86a8ead53e8987901eb4672015fdfbd12c18ce51521eff76290228ebd53c4938414c1362ed82cc39922fa
4759cc105d9eb5e438f8ad56cdfd2582a07d778d3231850d42f59095250d1de937fa487e573da849388281a57d465eee2a0990161e807b02bf5115fc
f31e5bcbce4a2806f73aef1b6fd084b90d706e12d7931fd87883d24540561d7feb85ed90c6c7230164e986fe180c73254f5ce7f82b5d9d3e0bbc74b7
7f37aa098ffece02de47988f98b00e76a6bcf4bca9cdc001b84129a68936db517651002e3378da9d7d09f765cdaabd270fd150203575e11776479ce8
777ef1992bc11fe84eabbe886686553248cdd41449841f266f72ece7fc20258143d95bed57f7052e02cd446f129ac8f9787c575bf80711a459bdc21f
42b9ceb4c26ebaf0410f22a10744cbc84d1d77af193a7e2bae586f7ca0ce5d7109af5b3d43ee002fdd695fc9937fcf5b4ab57e67c6c439e8fa35775e
22ba37b0f59bb55ee4ae565d0159d256c511cd51930d02ad1697d3d978a11f55474c1188c6de0218b7632cc5312c1af5312d51676859e82e4e007ff9
3e2083e0b4f5af032da0a891d7cd0dc5a4f8dcffef011079e88e66a6872459cd548b9948da1dfb42f90f65a7c4c69d193c6edde7d002851fdc7ed4c7
03c0fc791c915960fc045c81e159dc7b7bdb1dd56471502aaf59d917a37bd32a386a45cf12d55205298c06b5d57e4572c546734316d23e8e1c72d473
f5d72a489727516b7afede78c08c8b013f604e29299096d246241aaa66be3c5c1c7bc28497c044172cc86bac648939ec335bae097ca8edae6b946440
3dd7f20c47713c6ad7961dfca82201d1ba7329496bd2dfaca0662f4390cc9f0f24da747a84674994640fae27b955c1744e2cd970a035b7032ad8d291
18e8ca387ca18b04bebf59298502fac9d10ea0fb2f6adbb2d28e98803cb3eb22156a02674bc598aad2bb2a7c5035c98d475d53614c71513700924ff6
ff4778f40f2da93490550fe8e4de09aca0d0f4a5f50ed4bf4ced8182ffbd314f6b05fc419591999f6b11c3bc491176e4f26f5c3d15e705ad83b90fe8
86753ee744ca975ce1462716d858f32836509c382d99ed05328665b66374936fc292fd0246c94eb5596b707481071678c1945de7b9bb2ace633f43fd
420c8210bcff883aeaa0ae066232f5b9e28e4d9a38af71a1e82b13f2cb252f949af1ec59b7fa11be2a0f77ab95473c220f078249a8dd17fe19f9e9d2
255daa152ed9cc1b13dc073da157e099d40433863957b9746eddfc485542c538c53019d47ab489a00893e29778c59090b05e6fd309b88434e1aa8be9
31518ab111c4bd04a937d96d9e9c1d46bec0d8ec9680c93421c55752854346b91171a1470fc52206e71b8847864091f9512b9781553b1ecc968d070e
d7f2769f91622effcba6e858f3662644cee82e851c591b74f1673974cb9bbfd1c3da269d0d48541f5b111fbf9f07e275d84eaa0835efc0b5fcb07675
9e93b76af76f75b6d5afe1f58939dc1136679dde0321d0bdbcf6b09e5e03ff6d05520dae73241980446f1f7cf25f0589b5209de460509f50ec06aa5d
e463384662fbbfa1d6a67638a14564432a5f32d82a5827000170a0e4022041b936ecb715a84a782c106e6f9c004d7ffa5acf7f7a88b7eeffaada1f8b
ebda64457755263b0005cd35422ce124672f7752575f454c3b0000e498a16df3b26a625c322748413b6f5f2581590646211fd24ab2ad4fb25c1561ab
0c8b37cea4025d1f866a17ad86b1a897a54ecb12caf2d256c616eba92226358b90bad65d97b47a3088215a0d55a0684116a9e23c3a79ad6c7bf5b215
2ef73919ba9e6c5cc7ec76e00c3758f2456e23916871697da17eb117fb064c6dd91a4dbcf20c7ae31c268f47458a923f04e6e1a96e55a99c1e776a40
cd9d5fc48c3ea8ec3bb3ec0c64ae7023e514d202782230443842ed4aafc87e90d82ffcc7f12f1c0b8fcca6a73f306b945929980c01fd9fea11fc9978
bc6e3421cd02a39d9a723cd08158e771d5f6758f1efaff3bc6707acb1f89e9179e33d31a01d7c55c15ea8972017dd51c2dbbb3cc2e12567a275d151f
0a300d766e98e93f036f4d191e9ecafa728ad98f54f05a381631543a3b04353e4d465916bc7c8a0a17285a2dc796cd1bc0b8b799c69130e565b24552
f393dd09045da2d6e45e46d7856a8a91d06d5763913a2889d5ef5bca55473dc37ff3c88b81599a1f547e1dc7b62aa3574b79e6a9c4e03368ed01ce78
0775a50665527557e25dd69af23b10cc370862dba46cdd45aa4176acbd8bfef6a16f380c4804fd836d8e4dd79e8222b21ab1a89a6d0ef5270112239a
a1645bac1470debb1bea837174db6f579b0003c3f94ba6ac087103ce59bbaef9f38b4b4a05fe0a78514aa60f1849d0f8a9a3e4b70dd2b1c51b63b3c7
589e292bb3bc5f2b0886f1edb89bd53d6522f39498db956018a269ec20805fed5a771b7a27162886eb0809247918cf6617565a8c802c1a1ae7748605
d349a23eb37d14a7d1bdf7a1b9bce74e1b98aa56a4f566823a99fdeff77c88256d5db8283d69344b5c45306cfe0204926435d0fbb4d417c593728d3d
aa7bc8245a8b9a671aa0b188bd441b970f669cb6f569ac6563898dda0ec969490dd66cb1c9b00fcf5aa64e07951ef9ad5493939f4b625cb394ceae7e
fc9cc73400b597bf26ae20e69abc2ca75d8945a097e5b85fb4118c1f93a0e849c862fb94ae5efebca41fb8e3e90a7a6759c69eee97669dada16d4bbb
f98336fe310527670f848d89a9d89ac63e3b9c28bb6ce65ae16fdf4aa5be98fcb1c393156eb2f72b4f1a45b0ca16d59ffcf577fde229c231013b6ddb
515050d885e15040b73c21670c4b6d5117b4ce7dd06f541c28f749e58dfa1f91a11371fb02fc45902002048fe5bbbac965d938dc5f5d5017dea84b99
675440463f84365ad1b6b9cdbf50b25fd0d2aca56bf4286d4f293b338a1f55419ad3b001985d9c6b617c6a74fb6afc1d712893ba442c86b394ffe4a0
2d86315c017625a2afd532625df5524d05db293b8fc9684d9364ac00da382b6b5a8630cb683d700def00dfc8e7d42c5bf2372c4f1a1d3cdc852edec8
3a4a92e69b7f8f58da59215eee33c96cfe0f9fecd11de4fb2c04c190b74e7e343c168135056a130d8cbb9027db4e5bb34b7f823896a4fbcf4712a1e6
2f991a6da834312285673acc5702a7d9916b10ff5f1ef8350f14e33b9f6713d602c7bf6c265eca646d17950ddd2c9ce166830c3fb3836e821c9c4693
32c259c4cf61552d09fb990e485978dc3f5cf78f1cc8ae3fff13c2202b2a15ccaddb78a3bdaa36caaa20db2a787151d8948bee6c0bc7c61ce9fbeadd
c1c6dacbf42d7c8ddf1955c5fdd0ba2df6b0a725638d3c65cea35ecb1cd34930a9b3376080986e6db07a1ac28f5193ac015d6b644afb1e74d895c8bb
30ff49b2c97b9a918a85d0097d8d54037ce8d51a8bc394338e4901c13994c1814d2573a8a668b64127df3028ae6934ecec29ee38b62f8b64f38757e2
c29b2602331148b5855885d082836bf250359d899555e42bfba3780c650f43d4998748697ba797ca8e2ca2988ebb32594056ff08f983545b704bdfb9
a0520fdb00ffe91e4935db4dc46388903db428f5b143eb8fdb0a3882403f54b01003d668414607c45d1b7b4d29bfc7b410350d8c4e3e4f4c428c9d88
ed1a8ba9fb04c74be7503f16485ce6fb3715500252e92375e7bcd3c14dcfed845c34e4341d2f10996894632a025995fc7d5c53434648f23ad24e78d4
c07633e08a371441f76b457918c0397ec113acc9c9a44ba0190e974b804f271afa7f2b497976254c52e98140638b7a1f91c9cb965e0ff78e281e9bc1
b44cc8aa2dd312be2a425f6ff53ffa139ad4fbcb6d15ba3708b99784decfbedda253947c65c3667bc3414d1848e5415b5572ebbbd6a7ebd8b941fab2
70f8f9f1b74c28b044cbb575da7238ff457c88b6c25e685d5252a62bf996b679a60e781d55495071235a554d59297b775f76243e307c78567e323f47
4738572472f5f6d82a583500017015309b1f71606e88233ba63237f6d8526076f5f3f593a790a2c95732d82c36d3293f7a5a344790e1a7e1a39122e4
69649aba
```

**dag-cbor CID**

[testmark]:# (garbage-07/dag-cbor/cid)
```
bafyreifllkpkf6fo3t64ktpxhr2jrq4zwsspo6iqdwr77yqfalyiflhu7y
```

**dag-json CID**

[testmark]:# (garbage-07/dag-json/cid)
```
baguqeera46oi626a75opm7oddpgbiiruhmm5zajatdqboucrwgi2vorhy7aq
```

### garbage-08

**Bytes**

[testmark]:# (garbage-08/dag-cbor/bytes)
```
a56209723b001de1580ff15ade6377304df6653e414b22793b001a80ff30f5a9d4666c7748465c675901f7ec72e5d52d075cebe60207df98c63d5049
dcc699516f20631c6f73ca2ba80d87398eb9d112798b7e6a050c7bb1bbca2c601dc5c160650381c7afbaa8fe7f6520333c058067d4a688135198979b
d8a6cd52326db202ba6fd92e183635e25c153ff14254ba1f7f009651f98767c08584b89b1ce3fb3ac923bb18e992796b833af21beb25e8517dc0e877
d6e60c3dfdb3a20d4b22371df5aab09980ec98fd996b8efd67750a1ceb84dce3d6f9eb92ede7c25f3bc57f52facba89dd780248c830e12598e136a20
48af69a55ff3233ec0a8c230c1290200a452d31db454b03901c0a1ed9101879b95f3b357c54a7917c96f99db7470f21e247dfa78f959cf94ec32d7d1
bdb2a3520a22f999cf3cef203237b23c6506f3a9ee3945796f65c7dd8e6698e8143c2a21c78701708eb7719a2e660c7a79aff9641bab66daa0b8380c
126fac9ccc89816815b5b947a291b2913e88acb5dc28207fd46c8486c4d222f0cd435c27419ff9898b406722f623c8f0422e8008922f03a5e000e695
bfffba499826b2c05244de711be71391ab699292ffa30bf976b9e18a28892938ba3a756d5c890033fd5c39db94af9fed218b3a687a166506f98f8505
98c039e85a12b6f20ecf150da06bf36ab036dbb31daa229343212f401be2b1aecb3f8d1e63b0634f80b4c117b69acf0c92eb04e971d25cbea43cbb25
6025b4a06d0368532858577c2d236d59117e6c77ca7c6913b2caf8726ca0684e3ab089fc89a5f516cbe9d4ae61b109df03f49a34608774d332bc9f3a
0a131985ef038f7f5c08c62292aecca36415ee8d7472f482b0c5d95d72aa47526ef206ac8cd1bbd409746dd88b63f0fa3edda32df6663d33b57d86fe
338c75134ded556b7e61884eeee31eded2d7d8982d0f2f42a29fcee2f81272652fd65e73e05680c1be194fbed5b2df78d9298c265e52a6f42644bc6a
67e85e88297eaa041a14679e2106e37966bc19f74c150cb4d6a58f2c7f69cb6212d52440ef7a383b58516921678191d492e2cdb1b02df483375e93f2
dc720111e0d3c2cf9073b662b6058376eb7768a2195e3cc4f2a8b3761ef16b82874f7f609345e7be98a996fd9f163639c243dafa79dd570ce1123d01
f3c14ebc7830c762a032016923545123880b37499e8080010c1d9d831147306b5a31cdf6125be0528efe8d058227cbcc2102982d86f2055979d7a25b
70f59f87558a95c0f2c0be49d918e09537e0e0b00e96e69f059061d03c7b72864ce06b5713a1c016c657bc1d1f043ee2e6bbf4b5973141f765b9e0e7
0833976ccfe6e0dc8828eca16c8745f7ead3c99c396fbecc503f65e1b70d07de22b067c2b39de99387037072383a8f3884b1f3dfefdef6f76a8c486b
e495f00a65f519f96dedda9ab494ff4c465275a51300e739d3e2fac1483f2940ca3187861fb79c03b79fa3898a8e38983556a24ed2dfaae89d3c8714
f9bc3b311aaa23f7589dcd5bad90ff768f43edb06aabe9bcc5a094460d82dcfa95b7ed3103fa68b840c7272889981e588de8fce71b15830d851f4c36
181be7b7287e659a50714ae71e2aa1e5ce535662d7f5f1715f09bf7febe051e0916cc230c7fcc601e9025fbbf695699d756b73b26b733bd17b7f5986
a1bf2a3f5196e85f642276b1b0a25290cf15ba55e786697dcdcdb603245eaf17f47a8f3db2cfff90deedc804fc022d5499300fe669274cc0364dd360
6f37a125d4156043465939b5221ba46a0782d448ab4be6fc6e4ddcb659c7390b263e861d2ba6a4bf6d07bf65dccaa1c4b44c65ed69fdc746d0ac74a3
1db1ee5661fd5f1d1eed328b6833d8febaa783f21644d5e431b06df7d35d1b7529b3be83efa99be0246105fb389adcf19dab97e50f5cdd6a10c679b9
bea0816cb81d9344713f39de9f39d0dc9ed161cafe7f501d10576b8718b0453384778d5b7efaffd431e883a8cce32fa5de62cc2cdec0743ca149f1b8
d3dd0a5450bbd5f248ce23e18f49eec1cf12aa300321a093483c19062dde7367f76d636227d8279ec8e50c27dab26454a282968b62d7895077e68495
825ca09ac917d532fc4f921664a6d04daed324143c15bf20713834206a93bde9a5d8ba6e445ffd8c0fed3b5ba2301a49438e0afb04e762274a89dd91
4f70be354bec7000b2fab111973fe6d381be689a7bb4fe0c6f3e8c7370db8eb0c7f1a19a40229ca3333ef41e57e3b9ce8157775f121f393f094ee395
33792a0d62cc84856ec334a33c37810554a1813e4e5f08481eebcbfab8e3e628fa0e65e967091ff65be18a57157ef86ba7a5e22cd05807bbabe90ddc
f09362c9577d0f870c70a4b739a79ed2182e41c0913b105111393e2d0e70db47c3149fbb8b687e08155ca6541d0791cc895c4203067407ea090669f7
ee721ebc93b8666b7468e8ae2137a8e26c197b08091bd14b7e24c3592f52555f11c195300c9bfb25818de4167797cf0e5bb556ee6fed61cd96f7546a
a214ffe38764f2f45282a3ee6130a52f494cf17ee2ec48b324ff12918f46e615539f795487095b4b7d06580b72dc9a48ceefcc6d8a1fc6148107aeb5
735620037c711e17602c691fd25d130467e5c95a4b6432b0d345f62f72d977f070c5ff9fc284d9f816e49ab48e06e9a5dd06726955878adbf3cc7e3d
afe7516a91c981948c22f7319242c684f682b0680e89a801a4aba0bd5a004febdaf4b0903f90fdd3281da848c434422b203212577858c771fefd451c
a800551ea337d5bd58c91ac19c87cbea53f7f7358b04ee0b06c8e2cd220fe2c09b57f26b3f8b87c29369741cde25df66161d0985278258a939e17ca3
fbd67970e2b32841fdd2bdc7a73cc9d69bb4f6f1f9f5f23d44ecc70e6e9ac737dac2dc8441a0ce45691562da5f76282e401b2569e14d4b34cd174244
c9acdaef18f9c8492c708212e4d845bff176800b7276063d1064e6fe20b3c02aec14aa2f63e9f213ca94180461f4074ca0242694a28b72a3cce5f42e
287393f98997499a94bedf8744993cec26955c4abc6eabf099c37c3b456da58bbdb292173bd03209a704741d7eeaee6d4b362cf2f5c3e0dd4cb6c403
3d4a18effb67fbd9db664dabdc0845292e863b3750a88c3af2af140c7572864ba045574658ae0157fe7ac6c57136fcf6218224ba29eb637b9d4a59a7
048725611b6907b80313954e392457943a3b8dd233d7c2f4fa1c0e66a70bf1fba2e96b2418fc0b89d2ce698401984749cc4ced08f441319a6ee00e0a
761b2c521d3cc11ac458e5f538be6014b8b344a8b77a25e630bd4d996ed4944348f93dcc8a21f476e9c918c2f7fea9de4fc617fe2082804bcde0bb58
dca22927a5e88a532653a52b784ecc213716e9b0bc6caa668106ea6e8c43673cff53477f3ef44d0b9cf10d5f418d3145b823adbc3c7de0d8282c3c5c
c8042d9a4beee03e35240a34e91e55d3fd3ae9fd63b5e8a914a74bb99e8b766d283bcc650d09abe6b971fd504e0ce1e1f8a55827484780198782cb58
03c4ea969d26888ea2f58be3cc5350b96ec53ec6cd282b3bda2ecb7a2e92907c510247524930657ac65026ca6382d14cbcafc4d8012bbb4672eeb4eb
38646fed9869237436a6f19f8198ef46db671fc1cf8990eb614637773370fe6acb173517adf3d5ab2a544bdbf84201265ff94aa40909d24c21c4a969
9d17bc092412251ecf566535b44c31ebb363ffdeecd5574821046e2ebc9403a3f25d6f8934cdba1996db0c0db2faf5473ebd03488efb751ab1bd2d95
97556f23bf9bb16d9948ca158ffe8429333296315de982b293b691016961a9fb28a11a74a207b452054e1a0b104bdae41b5f09c5e664d28814d81d8b
ae001bd95820ebe97afd1ebd73f2c2f6a8ea4f252ec544932474da4978ca95f98e84ed63d930dc3f60605a84ad0f4fbfad6e1100f04c846ff6b91926
524d591428e0cc1f32f9eee3cc2fc0fad6a0696c5581e447962dfeed201cdcaae110f7156a95a8c9df2cde93989f9998d67f233a27d489c4781eb2a9
6ef249505b6160fd2c97dfd03b885802194b83e52b98211997a5dc7dabf7331b5fc5f05b311e1fbee3767f50f80e8d762b4cbd0110121dab376c67ee
962db5be91ba7c29584fe399702fcbfb529bee70483b0bb6f04e47411c893989615f48573e08d9809dab0067d06d1e19dcbee7bd347fc7657fa1a145
f5aeaa25a5a160003828db25cf500f4f17e0b317d12bd19f45d9261c95bfabc0f202e0326f4675dd88708edf0cbfbc712b32ab3d3b09273d4d7000c5
759e8cebe5d940853b44c7901c4d443a582cc631f784d8e548287df48b1c6cc886d24920f78bd3e103ac95a7897651fc78818604afbae4ae5b10af0c
d57011d83fa59592a88bb19edaaf891d41239e3ffb0b14fc7c082912733277c0686581859bc9576cbd849b7d5aab171a08d926ea12334fa3d5dbcc12
1df1f32a581ed06d71ee1b773eb0f7855470a7ce7d3adb6b2a71c287f828da5d1ad9cfcb51c8f6e536d6ba9f784037cae7828851d8eb46d232313656
3b7692f36befeb74a6a7b80a7477b33d2f2a8bb3e9daf02a3f35742d057bf24331b115e030375390b3653981fd0796fcbd6ce2164c5438c9d6ed71da
d46ecd3eed4ac36a4bb5121f4e00663c67d2812268821c4b5ff4bdcba9b680b64410dd8672bcd3af4a758ec34ac7f1727b21e883b8ab320840b4eff2
f75cbc896961a32172e2af9604179cd88ff04489f9cf374450bd9dcc73b152d2a7e9f61d985edd7c091e28780708d78591ca9f784d7b17b10d98591f
e62bebb0b55d34dc37b95b84effff653db00da35a8850041db818178aa931e38e202ad023cf543da3f3a9106531a829f33dbf8612777b3d7ed0851dd
e7b2cc1ea93959d1b135b07f4e95c0cf5f32dfe8a1353b40ac968215074970e70ce72569b9acd0412f694cc5fbca44f419f1a8b6a6ba6be51565feba
12c0ed6bfc84b9c2a51d29476f1687ed676f476efa3d27ecffe759e5f01c0562369e25afbd0c93880d026bebe1568a00b61425c6dcef5c7e2b3dc642
a9d31b93b0b0feea55c54378ca10b5a2e8d279f7a3f778f21def1539a2b4cd7690f24075b01e34f7065a7233bd5662fcf11fc58a1c75bff680820885
078d6666db99f79ba10a5a52146ffa55c5c3dbd2b52353a7819c0ba58a54322c829969305f252127ec140e00f903cf27b9afce6c019cd31a9994b7f5
d5adaf607d13bdcf7bf690fbf6ab1cba7c486b39c0dac65d44dac5be762b5b4f2d4a7afb0e4677b7f1b86de0a28bdf094eb7a19a0dfe3797ddc700b1
53f28156712e43782feb8da8212e49d46102d24ad2a91beb845bd42b424d72f336aa10c188440f2430b0050db4dadf454d953c63cd43cb7c43fd9943
57b94613351019d284a7a6e680249851d323a8d7abcfa4c847e3670ce5927be069d80916e3f8174feeb619688a9629bf330c27cbbe8763ab0c19defe
f8c483ad6b405cb723f4105726c6698a4a8f9664dcdf5edef0389b19898ed12804fe84169167eaf8c187cd6fa0e5a10c111d59028fc153948842734f
27a70a0e0fdec64fb89b9bea84896b02ec58d4bebdbb741506bc12c010c55d1ec4d2aca7a8d58692709cf3772bea03cfc2886ff9c83f830cb45e5870
028ffb0be7c4daf394f817363b629b0a83b77dd7203d93541db69ae3e3f867052321e5e1ba70cea3200aea716b67fe6454311f0429ec488a2dcdb921
602ab3ef508859c356b9cf8c772789a91125a24dfa891021cfd9b38103f249881bcd4c054ba5398250a3fab585807de99f3aafdae3b980bc7a111fc1
d1d081f617d263f4bd76f3ffc91e1569a05af141f7544d431f592581b9457c938f562f4a45d95ba555a0c8d77b2c9398c266fa5060e28d873cf933aa
8811752e31f3ff55a209bd46fd401bfdb31c54d84d6ce7de6bf7c09a20196082017f9bd26f1d65b6e19596054144ed2e2aa1fa3361bff1bbaa2304fa
3ff79da400cc0f34fd8d253d4621c393a37d9cc8762e51e92a50d91242709097b68aa2c5c28e35a8368e97485a77a6cceb1a766f907560b4f5b8d706
35a088a7c929e0ca928e31266a02e4c2b82990fec936fb81e338d17c1803952804cfadcaa5fc85fab94100f4347e42d586fda286b05cb145e3fc44fb
3437a8b5cff20f4b2ff3c2bdbd8b121e7ef264d0bc9523423323530c0f5a67242931e8316a16146526b1dc3baf3effd68eddd2a125bb6de7a725c8a3
a818a88d0dc59aa1a1eddf00c9f33b0a4d5e3553e6cac056516344b7fa8b8ed74d518070aa4218b23bc7e23432fd5886b8be528c07386580561aacf6
802cf59971c98c279837ee854f309037e7a33a0fb245db08161042a3ae24b99e74ddeac31cb22e723513931cbed3d7d2fab5f0fe32d07b0fafac8ab4
1f1f96144feb909750869ee6c1c5b8a7784feeb1c4d40b625bf728fb9bd5b05565ae84e72993d1fddc8857b1786db38c1f74ca9fc742e2cd4055c3a3
b6d55e9ef3f30729877392ec0d936d3032a81eab555406c2427937d4a2a2b53602490f8d893cfbe79e722a5df649b971396ecc68deb5672f791f8d50
41773209034a3e8c8841a3d31a966e78adc99e73ccad43ac6999b1c95f6e032b10df7be51138c9566e5a282dae68b538dbe89f5ee20f7ccbafe3b2f8
2375043056ab2dc4feeaadad5e72f8dc62b80568c3d7cf1a3d7453b2d0e09a9dc8fba63aa0aec8f3ab25f5a982fab3c05ebdfdfef49d49eb797ab2e8
f17be5fc358060e64e535cfa9ef1794640ab932d79bf03116410f4e832f55b5e712736ce0886f451f2ccf87bcaba11164c5d24fbbfe0f3df48ad6ddc
334545e8fbb371201497cf4f647ba8d77c898a9dba89f138f76eb7cfcc135dfa8fbfd695a8261b1100d3f1a0dfa187ceb9bcd36adb95f37d64faa309
5598654717e8b178b97576478433843c280e9e710eb84c26dfff7e865afc19a7ba606d9b4f366a731786bf086a0a994b763810830bb2e4939f490c90
e2847d1089b2983a666dd3ee29479fdae679588fbbf0edc45055e8e05e853897cc97e6335d65f208153cabd1c8dc9e1b9a1cd80c657afb32
```

**dag-cbor CID**

[testmark]:# (garbage-08/dag-cbor/cid)
```
bafyreig76mgs7l5gktz3fbghjrxckoqjdousfpcuq5za7desm3pm56kkda
```

**dag-json CID**

[testmark]:# (garbage-08/dag-json/cid)
```
baguqeeraiqycvxdgp4vyynyuv7jiixdzytc5p6azlpcgwtv6lodttugfn2aa
```

### garbage-09

**Bytes**

[testmark]:# (garbage-09/dag-cbor/bytes)
```
877905d351423c6a6b5f6e6c466a7237e298ba5b6d62722e735d6857535343613d722c3f552a334a2f7d397c61625f3657442c6b6a68492e57314571
4a215c4e674729462a36623b56e298ba444b3b644575672f734c3a205a764a296139283171427c744d4c7d35215055342b2c255a326b604a61304d5f
794e7a3b7c5769387a235a69257a3c7876663850225b27724a3c496944662d750a2c3726403d226a56786a665d7b3d626674412d53625e2b4e4c7328
28345a4e4a535b2a402c63772a3552575761e298ba575e654034647a7864684938552636514c7c75546864793269764a6d38602e6173642a7a2c465b
4533453e3e6634755244376a5c547a73255067255d7270252f363845437c6e474454390a534259483a365b5951225547445b7c5e49476e427e717be2
98ba644c775c32615256606c7c502f6574423b4974357b3831705660387b2133692648483a24522a73795c6d69484e5c5e4b4a69625a645c515a6c0a
5679257250297a5f0a40516c3e7d6b746051423764094c60563539714c2e0a38394c2430464e3b224344434c78753f6b277c533a797746404a6e3a5c
7c0934574b096d5c517d205a2d3b6c7c4873546b40237a6b4a7b337b2678697e5c6c666d3159702579787a2d566645364f3e7d25507474574f2c7022
e298ba23527d7d5a33697b7d577e4f0a4e57317c287e623b5976256f7d406037653c7e6378725c5f6e6074246d76423e716c6a69773c68777d335243
4e6f674e4b264a4b272a2d2e2e5b276a2f5c462d6a425521334f744f4f34514163793ae298ba29664c54517d443d25612e377e62736929640a5f3e74
46597e4e2f33723b0a5f207179676f702e3268682278442853236a42366150625a474f5f25775644387036436d2651712f2e3d6f4d532f6c34385424
724272445c6e5b33427d6de298ba4d79782c614474224d56325c756c7272366c653a6f7be298ba3f25632f216b76323f58655251294350253a517a3e
6460375c235c715d52343269244a6a3e447c6a2a21575d2d4d5140452848564a687c222f666a292b425975252b277d7054334d294a29677633732c3a
58276174493c356d3232604f45672874345a3575374c7c7b4d216f2941646270254243693360384d28615f3a3f6d503d464b716d436e236546663437
354721222ce298ba643f38340970486e6c6b6a3a286f52e298ba3d3a4c265e406d2c5d3a2d435b3f2e29212d777e6661552e2358274734675a204646
6b277643677c3b7a7c3041433629273974477257636d345b68534b5c75783f4350576c4b47406e437e762857694855264d5b63693a34374026385209
2c693c327c2773532f223c557a33416d3d4d734750266c4b3e293a33242d4a73455f51545c75600a65782136797079433c0a4b39453974287470092a
4222266e55313952207968354334446b6d3b48495c2f4560726024654e7d403621516170574d306c635b6e56653c60344f2057262f772f22283d3326
2e386e7c2c2d36557d216342096f6d6535497632560a61346d773c3c486c606756302d722f2b7c5f6b2f616167374f45e298ba74722067715a33674f
7b3759284a7c4a2a6b462c7b2f2b39285c3e404a2d287b57744f70715329533e6f287c5e097e6d3655662b44724d783f3d6c3241415f55625a593950
2d765322357b5b58376b3178216d25404b486f495a602b23e298ba094936682b492f667325575c2860452f4b323741597d41634b4f5f6c4260376178
482f370a3d4623395570333636366d312c5f336362606471312d45642e6d772672655c6527244fe298ba3b28722d765c3e744d2f4566683f7e277522
2a2f4a4033294b5333765f3b4135555e5a546b336c7d7e413b247c55275444235e596d5e35426c2169727767096d297a5d5fe298bae298ba4472594b
7c2e3c5f466a6b4c633a383b7067794f26223a686569797b536a764d287b5f376338622d4865666a5f59614d30625d74342051545575603640672956
7354756129e298ba6c553a3c69667e245848235c436467440a464e61535833475e306e202a760a483a423e562f2a5e732b375a493c5b42fb3ffac17b
e1db5c26d82a5845000155134085cac08be3a95090288a8e3fc2704a988a1cead33df5ce2ab0603aeba61f208ef5029af34e2029cdbc58160f813912
a05435288bd7a6039b7d979c75d4a2d75e1b000f2e372048bd41d82a5845000171134074c4b21c4ab4eb62086331f107b0c7b8e3e647ad773f0659c1
c890f12b8dc1810abf77b0b915ef337218792c465b5b470220850418b556d97f7b8e40e534f64779074b54796158443f28613738335957786d096e51
3e3e694c3276734950623c3164782742216b516538696973612f495c227ae298ba4b52595c4f4b257261327a742e35454b7a26697c6a214f7939e298
ba733f3962555a5e5a7a627034707d615c3d6a58405261e298ba7a3f226a6b224109273e6c5f6278272a514764615a31596b284b5c69766c3941294e
2765767166644a606de298ba74295a745a4b2e6c41437b4247724c38594f2d7155256e2041382f377b74693268493b22680a5543236d3a683d557b50
22593945566e374b23575f286560276137503e53596f425243332a206d6244550a7156677934342d626777325b2f5924776f28402b7c5e704e2c7322
334a226642505b427d5f42585d735d7c2e733c5c4d50374f42615a7d60435954744936253e665d5b6a7a7b7b393b5be298ba7e36723b752d786c4536
e298ba5e64214577545c695a2f6877657725474d3d41363d6c467439367237697553384478424a3b4c6825330a692c4c68784e526f5d742651482d44
4745537539707b746b095a513c4723234a6a665038525e2c795053435c4b3f7661212a4657e298ba3b0a24207874364d64416c272a7b670a36262679
7737762d713f793d39586027096d5f4363557c453f5a205127090a38584b6b2e4e766128675f373ae298ba75706d6124262270096d2849607ce298ba
29505f660950504722215146275b77325f52e298ba2b293960507a65303148e298ba21275d606f7256695e7e6658382c6f687b7b6b0a694e540a2833
7149364b43502e532f7b555f376b6a2821645754736a6f68343741752c237c72524d532b2be298ba6e4f725c6637212b5f3e287b77495230502f7374
7a70523a505d504b623823443e4a3a275140502e7d33327b4f406a5b49684b6c6168657623695e6e4225585c7e7b43545f6c3a375929354830282449
364b582d246f2c37353a45333c51585a3944363d22603a79777a6e3c7de298ba212b356036654a3e4d767a675f4e413a5f637b32336541614f744b45
77663e4c207b30585b3b6e722f35322c583d6a6031415d6d5834224c726c4f5d25597b733240534f72724a682a4f2b563e5f2c2b7a57222a7b092766
742f6839712429322a6a427e7c6c4b24532e42265409550a5c442c5153397360436c29703f533c72492d515760477957736d20735d2d274642277875
725e3e3d6771454172293a27417053286b2136665650683f6d38742b6b396531796932707b4c6439675b597c655a4454405d5a7e28334871646b6756
616e5a45617167417c3023643829402d775c60594e5c3278684477345a396c237227642a677e0a797367586c362c4d323e5c327e303667566a64540a
094c3f495d4c683228642026602b53484543294e41515f3b72404c4c66642b4d206e602b75656d6930564f3b6d4235525a557c3872392e596734635f
566c6a37514e34647959566e0a6c720967615a38397476226f4d23297d79212934316525293f357567483d793c6f4d5c472a0926513d23232c593a74
5b4562406e247c3a2c3d2b434409252b753f3255093b324b32675b3c746e3b46445c315259247d492572713a46347a3071765e60556b585932776a64
365a527949416a78752556496b606e283c6a284a736f4d4d79562c475d726b673238e298ba3d21583a462133732f71706660756c590a512770514a49
347852313f5b5938765e545e77467c3978603c4f646b365d54367b694559490a6c233c284166252a6f45457d4a3f6361607d40384e3d466e7566367e
543c452177687d66677e5a2d59564e2d4b574c3f60756ae298ba5767774de298ba71733b4739686059456851324e4f3c687a545a73717e3336705659
2e232c263c546f6a562f3f44635a547c7d273e306f413b642d78536a247b344924543f572c4b360a606e0a626d36395765713ee298ba2d4567775771
e298ba3823424e754545516b217834e298ba2576780922382d3e09746246325755626c7d484e512423394270665c605936726b7a4371692950392935
7478634736452725712036090a5646676a38696a09414c3f54095445356c4d49246e4448695c52243369535f33242a7a784040776e577c32532e6942
5771396a5c5d59642c51644d2a437964586c340a6b68256c2d393f5a656a55307a36703f0a5549e298ba243e486728783035094262410921353e3869
4157753f744330214e6e2f362d57737b593d3973402c2b347c566176463a44623729546c23644249457b624e5723745258373c2b322b5234596b2135
3b4739357a674c5b7e5f65526f68412939467b2f4e3c786c39783d736132215c675e48285a683c3f262a636f36395f764a6a5450373475766c294c5d
77453d4455746f69505274754a722b5b2e5d3a223f3e7d3d287c35447959727250397c50327d575b787823726c764f4b283c485432094379562b2b25
5f64482f3fe298ba7a7d3437662256227120212252592f2035597565e298ba606e594f536961454a34653d4651777e6c5c6c272566525f7248305829
6c5c335e35215a37525666507c594a3b397556434535276f532178304e415741216d264c266f3d2f783f6f7b6f22354c5afb3fd9f7bdb8cd258e
```

**dag-cbor CID**

[testmark]:# (garbage-09/dag-cbor/cid)
```
bafyreiczllyuhjfui5taiik35z743nflfa3owxgwcrpmknycsbfbd6tp2u
```

**dag-json CID**

[testmark]:# (garbage-09/dag-json/cid)
```
baguqeeran7koa4w73vwtwmwcoz2x5cfvyiqmu56du5gth3gvncq7jdcxpafq
```

### garbage-10

**Bytes**

[testmark]:# (garbage-10/dag-cbor/bytes)
```
a26122590565ed062ca9ccce92dd6a422e20b1123e8fe2215f4bb4dc55fd001411c82396734cd666bf9384480422b518b5784f55bb1ada2d4bbbdf09
882ce40ac60e8798718a4318ff009e29330fa7e4d355c6b15766047203c3af9dc8680f287ef512d332def39cc76fb6678033dbfcbca199353912b31b
e6ee726b749dc7ebe87166c5a98a919a2327bb3f6955770c239fb67f12a85dac2d2cbfdfd50de02b720f84f078cb852ada4cf30fade8a69eb51c120e
f50b6737f541cbc84abafe87f66861edd1f0a172640cceda43c61fbf15b3747974d3f9a745a8a9491a3ffc88915a21febbe0f60709c3c6fdc88cdc2f
b43c475e626ce5b535c55470bea21c0d05ecb4feda0973ca22bf697ff4800a9ea1a89e543ca0b83956fe9c264c56cad6ae8f976d072986bce308b1f2
11571f6cd6d6358909a4e8687a517b8620206346d291564164fddde0c53260698085d79d522771620c86f49c7bdb07e3f54db8ea3e1e1af7ac3fb3eb
0dae4853f6008d15c8e4f4dd85e8910d32609de072d51720cc85d97efe4641310ff816d25ab5a5c0388d5544a46757e2bc2377ff476c858921ff6ad7
6611a4f31e0e3dd8df40ca694e1913181ec9040ff9904f7b5435908e6b7f7f3f41641e77c1fb7d73fa3770b1e35843e30678ff2db18a23a70aaeb849
d4847c47d4ad352b1e35bbc7541b3b81c255a7a3defa12e936abef5a06e5d8b6b832d7dc6911a7cbeefc0ccc846764675bf571259b531e798c60a6b5
5a10df4b1677150dc37ae92564e4db1f07c695f41751135e893a2243dc56fb9411d350531b04174c01941f188144cec84fbb4ebc6fab4d6e94d133b6
777bbaaf4d95071c2a3ad27ab3792382e3eab7099d42c8ea1d7b87b4724af0a875f85272abc35098e6d0725c95db82f5d6dbd726194bb27674cc07de
97c5ce0d55f4d9f3028fca2e6aa20ec3448ebc15181b6db7a1502d27c13130f5ebb6030edc67f62f29f561d664d54d9d0a2c00b5f52a51eb6de524d2
b221955fc9d5d3602fa04fe2957d2ec7f6a70f17ed150961499158ff9bc705608300d7dd0fe809bcf6d4dd3e83a6ed25cbcf1b60dd326b1f20606a80
92bfe3a71e8d44f4672e72a68c7d94e1356adf3b27468dd6c474abc08968c3263eb431442f93322134e5a0ce1c035ee86bcbb005f0823045e2b1262c
716f5f332fed53447a9b78fe9b8554281ee9f52ad581ac5587724c9a2b9fe3d2059e50254a66ad0976a8bd17116e8501358db0b32df527c5ec49f245
8a57d4427217fb164a0ea7b9be22ba1b08c7477128e4846cb464a6cb6d314a045bcc7c27521d3eddb2cf3d4557933bec0d5d7c67598b005d07291089
1f8d785b0289007a341692a6de909ad2f7a2f7209619d4dc631c4c64bdaca141e261ae3bfa57ee252784cc5bdb7f55cb39a6eeef6b81cb9042c28554
96682615a2bf2411de29ff117b6c1af791f457d8e78fc1ec04920943be49a2f2ac0f3286f58b5bf407efe2078160e9d87a10d35f83b41c40e17090c3
68c4d7d1a00eec7daf585d997d310f9b5566c37c43873098ac6b026679f7adfdeac05465877b20293c38ec486e8e111541184f96fe41d777f8be70a5
b59f58e09f372f45093e3a08020a1389858e7c7c6e03188ab0c72a8cb80c61749c4891d079378f4f74aa7f38ec11e9c2bd1ff0f53e8fa3d6b33b0bb6
51ea3d215a4dc98b60a7e8faf61bbb16dddfb475fc368480357b9acfd5a22237d72bcc0b95c75bbbb63915903eb85fba104df47509bc3683a213e147
25e0164f8dc288bf357af1ad77ec7c602bb75c3e14ac72b9383acdcc7e912fc47357caf7b2ede1325ba2b668b04433e0a06116797a2d01239861dc97
515bec6d788172e1de056d8e5c10fb49dcbb8ef0d6d3456ec634aaceef53b928ff09d51f20bb1de3ff7236e88652863979ce29e587b97ef813f2ee7e
65aa0e8bbccc11647b78382d7907405b472267743a4d393e5c464a54407d305274405d6954607e65323f516a7a5f684243205561602c755c5c2d4a70
382427343c537e27476e5c5b3741355f354d335f6e76775e587e4f4c7e6651566f634535683d5d6a377a092760342c5a6150095a35415d6d4458656b
4c464f78393864373a32472b77585b5f7e20e298ba2a31705b284f682c352a6f425c60633230613f563974480a623241624a2a7b2824617e377e634f
505568243a2a4e7c254d092c2a393b42587737712d7778494c255f2e626f5b7b714434226b735d276b796c604a3d67634a48444f7d4f72654b482057
5952244025563020747c7a583e35664e5d754a5853645e53206d78734145736a68787d7d7a2a307877545935676d68387a726e5240795c454f2f7474
53763d22622e2d443553794544363f5576273525447676225d325125415c304378e298ba3732343d5e572b4859683d613b782263717d75572a4a263a
344147286e50515d5b6f377c647d3e6933502e5725257c5a323f3433643d513f3e593a554865316b74265e670959717563347b710a7e515f5244346b
29292b2e6d654f3f7749693669593e272b73382d277b2c202462643125725d342a58314078447b6375323d523a2531497762385429646e6d6b45597c
7e3b5e212d38e298ba64745f2a0936257453763a6c504173226f3e5e266e5f6a403b574a295e2a496a272e790a514f363a645b255f274721353a2271
5551466f4d3764e298ba6b2665313b2d226a753e2244614374275649333a76742837677e48474a625c732e4a76424f677a7c523e697662453c572a37
73315461206b3e416c715f7c25395039096d0a7b77743d7d5b2d2c63292e607b57742c65385223642e6e6b77413a20785c3955242327527c3572514b
49414e25583509e298ba0921653664455b3a603859406a786821544c4f655575292c667569576e5b2d60317d64093a2e615e21656e4b7a7363456a72
344e6b5b3b345c435f4940313a607a3e0a6f7d544b5c2835542c7e676724272a4e703d26525f65595d3f392d244c20e298ba49424b777458626b6629
350a4d59354c7561686e552e4e4f2323654a7524383a372c782b30735c677934427335244020212758e298ba6e60342432523330247b72335f2446e2
98ba76335e355b5a2c5f3b5d325959e298ba23685049384159763041526a36637d6260724109507739744c7b3c46644665303d315b74374a21294a6f
2a25683d762d672c532f422a37e298ba5d0a5d5f492a422469616c7677577178504f59642c2669316c4e6622437b68243648426b3277245a2551443e
5f6a4c2b5376647b49526025e298ba65596e5d795c695009757a4e7d7e7a66682d3e667642257925455435216f702d6d79762f374329403a22334d20
23283c3c5a4b3e7e3f435b6158672c6c492c5d2d334e206c605a3f4d40366f6131706b3c61637370714d44396c3742727863522c28565a2e0a6c6c70
51262f674825463c20316b62592256774220637e39245d3028700a756e0938357e263046673e62502f5e2d33572947262c3b53677c3843572f773760
4c34355c2e70305a437a612a5f20617e264b3c780a26254a535d2a43406b635d6c442b757b0a0a426a36796e675c7778436d4e2631777363787c6179
66524d425d4d2f533a640949236550764575663a4f492f713847523a736d7c4f5c3d252d623c6d32417751302e562d753d41455d366e7258452ae298
ba21663527204c756d77285e5961313d687043675c59776824672709705a6e494a6c6b21603973566f524652595a28725f4b25507259784f27523451
747138583424620a6f617e614f64347e78402c30246f564c696e367d306e56796e0a5b20253d454e3e7b4c77482e204258545e57756f725a24486f38
7b6a233e2b664b437b4e44645230476b6368642f71423a265852595079783c4c623f48282836584a602935704a2a4c7d762c584021285478257a4a60
3c4e23343c642b484c356a674f2a4a63673735280a7d7c6e28374b46785578683b347e76437b744a6a5154407338443941e298ba7525312c5c696b4d
6c76097a717b3ce298ba6c5a2359782c207020722f754d4333656c0a6d36247a3e6d6d263c344e4a35242d245f583a2731592a586356332609716a7b
5d7277636968413e5d6e5f246820097d7e55776438412f60454e3b6d2d39534b2a35772023732663535123582f5e3332202934423e313343642b2321
2b4a2d257d652227214b6278263c7d495a532956377d6f2933215e3b754a69366e6143e298ba205e7c730a36e298ba223d302c763a742f58646a694b
52633c4c747024545c605676267b67414b53672f2355784c48797962303f3663463c515a605159734f666a626448203b3521557d7275447458434326
533174543c433a5f466237675672217e72224955656453493040402c322f3a3d51397627554f555742463d4b7c4f364f41425f772d5871466c6c6425
6d652f2630233c7761480a48252f2e704b73523864476d287c5e694a613e3a506c362b394e7c2e7b7861413072793d34242332435367740a6f47203e
202c222223374a4d742e77
```

**dag-cbor CID**

[testmark]:# (garbage-10/dag-cbor/cid)
```
bafyreigv3itfdn26cz7rfndmedrfrtk3dpn27hncdhsk6fv2dq5awwvhzu
```

**dag-json CID**

[testmark]:# (garbage-10/dag-json/cid)
```
baguqeeraai6cp2lkcf3hyp565g6z4d7u7kqt2ma46pi6uv2bsvsbh4kzdbea
```

### garbage-11

**Bytes**

[testmark]:# (garbage-11/dag-cbor/bytes)
```
82f6a96131a46146f46235511b000979ff3e0b55856335677c5902a87e200cd7ab51af33e021bca349cf29114e1933dee14c590873e3ed71835bb17c
476caf431b35fc371a13a5c4a67e29b9d03647cee4101a88759e17b059856918d5674ba4fdf98de380aed99f53b1270f18e9aa28f6b02f83ca36dd0a
929083571d67a0a8f88695bb47c29a7f6152009898418ce1c335457356ef4c23292cb859c40952a950cb516352f88be41774f6b214371d48a8ff9fd7
fadd2f86fd9a92e3f043f994a66ae579394bf3b170ecb6d287f543200e13333051d497dc1b486e3aedd37147b8b559415c3e9dd467f5e23739930deb
042be36f2c26f2e760be05e5fd43107132d078361abb47dbe5040cfa2cc0c3f98cffc98d69a118853ab96de153e3fd2a2de5124d14c2e888aac4064f
0bbe5ea65815031f11ca7adb0b607d98b9431972d2939287653bdb7f728cd00286354c1ba10d5e4b49d994cfbfe6573002df7ca7fb6611e1d38e72eb
7235cf1d15c56826a6a29d5f7be207fa7adf42205d3a077b81fb6d4355eb76807d526709df34b5d9b2042d96c8ce42750ef612e34fef2e20f3beb9e5
f579a09f5f373c2f441ebc9fab611cc76ac869c3fb307465591aa07e65d514cd58d1eb2afe42411f48fcc0827b44386b19f3ee8a4dcba009955c08ab
bbd4e4d9af9e3271edf9f2658249febe28d3cd0c1121a69ab1b9c0df63bd00e1d68b755f994c95d557b44a3fcb5ee81cd59824f8aa81ac223b9f4f9d
ec80a042fb3d98f91fdc84aa03e5a9064a13d44856c241b2de84cab0e14c30a00e9f69009588e593b693303a3fecca50698b977519cbcdc19b897f63
920d4806bf7d06efc29e47346d78c7434f517f1637e130b8d4b372a30922bb006639dc41912bdd2a8d2cecc13a24c2de6bfdca90eb825acbde47a605
cd6dbcd0ebcb02e625ff21dd151a411d783480af3050c101981c9fe76328f0c388506c5dde21d2b476d33474b41990a66359572fa1644a7d7e2bfb3f
bc837c09ac62346176fb3fa582249c5e083d625348f563495338f56366316af465757a653558fbbfe2e7efa96a1c1e6648342475466d82f6790d1a34
53332d6b346f25456a46605160295b2b6c70745e284167494c5824383b6f44524c6c6e096c3c43202b4b3a373c5a34383c4d56373b74464c6e2a2f20
6038386a65693b61643a2f55496b2943202765465421714146475c6d0960205d67273d636529203b453b71682b2a6e2138254e543a527125564d7a4d
4f704062392b6d4e283255254e75436f493a43582d3e7d38483c642c7347635c775a26253f2c284f2e5c702e622c2a597c744a6645e298ba4f45736a
765171603575667e492d237837410a595a657468357e352d7d5b2b6e0a50564c3c336f3e204b704d5b32626b27335d31346b246062552f4e74377967
7e6d316c2635285929637c424a46747e57483a33577c365d25525b5b41413e6a58324f69335972282436262a4842312f7e2e276d42677c657e355274
3d6f2d6a6c754f61574f6a72214b6f473f4f3c78262b524e28596f3c2351326e71392c5e393d3543372e417e4a7c29e298ba24663e3a58657b390a78
75267070494149395a350a7d797a2e596856783b2f5d602430443e5b3f2b6647642077284c51326e2e6f3449375c476f4c367641273471683774292c
31496660e298ba6b62495562447275725c5a4622724770407657482e60234a7974637820415049780a25547330e298ba407b6c673d4f5961757d777d
4a5f495c7521402b404e6d5d2b67232f547e2a38367e7449515625e298ba226f2245322257286a506e4e4252715d2771374a6d77247d485e513b3760
2a355575614a46502c486f443b2c654f6d2a2f2658232a4a435a0a262267226c64587d37606c614e7739755a5854466e3e6c202162697e475b6d7963
384961776b2569645c32763977414c2d7e782a713c2c6d59324c2e6c70454c0a2824364074336a48473637312a3d3273324328647735542d72626e57
7c5d637c51445a3b2b27722b4f755878493b26223f5a4c3b3f455e495d583152583025257a7b26732c797d3a52232c624b3c565e367c623f7b7c4737
2a67463a34094e5b5d2630714535266b2a76633d57496d5820585e446c73602a63406465547558e298ba7d250a265d4c263e6e697a66696e5d4e2e0a
21695579093f2423546b20762645373c78562d4c723d6d293c315d71655d622e5a557d22305a627de298ba744a386e424a5d69406d3e75232b6a6c2b
41507c43382c624d564c5e5177367b4b5b507e46745548494c522253612859710a5e7c736e55412531724857285153245b676b635c783a57277c263c
6f543f26634b7c692f5d20502371543f6329304e6d376b7c645c353a596d3368614b6533097d43774228282f736635326230796c6d4862655a34757e
3b622a543b764b36793e34653924436349515257e298ba507364587e2c384f4876594a51e298ba2f72204f6a222d72797828393f666f2d7474337e5d
506b5c503a6a323359486f3273364c530a733e2a09316947543335367d0a32713a327c6a5a495e2f6853090a40537329612c5e654523277d24273a4d
787c7022585b4f3e316b797c4e7b743f287a6b746824775c5d3b6d7d3b306552454342486c2a453422515b31502d406a523b2a7e733e7d6e29603627
7d52533a4950632f5e5e587039545d76e298ba2a594b4b5859216c60644f6d224140305b27423e5b545b42466b426826750a29422d55296f3b6b7d36
586a482e2d4d6265575e4973562c2a346c2e402a2a422c562347702b5677203a7b3b4d306e7331495f4e2049625c457d685c3e6661244f4338656768
6a500a3a2030407a727331255c2b4b7477563a393a405c0939652b48486225625d6c7243442d6b792852706a76473b5e5f4f2a5d7853743d406d5366
5d5d2e674a56785546382a326f727743632e5d2f4466277a70243a5d7b5257385f752a517d3640273f09267a6c2d254e6b51346d277650214b4c715f
436d754553223a3f74513d583638e298ba775c366c6f373f6c662f2864287e596f5a78356f7d3524756f22677a707c23327364e298ba546636466e42
7a6520377a3d3f73616ae298ba6e5c5473687c7063563e462e5d0a58544f2b39273a7d7d48773c382e46525e493b7b4c72432a202875794939770a4b
4a232c7159634d6c604e3f3d39563a6e49787e55506c3942354b2e396c3a2e6b3c5b6362207d72562356543e5b4f4d782a594e5451653d513a2e754a
767c213760385ee298ba512c6b2a3370673e766f2b23524861696de298ba44706e3a6a283e537c2f61225130446a3841096f6c2a3e666b776b403734
395a5e312827565e35354c4a5a73394d244d777e42766b405c3a523b3961322d5c347d7d685d4e625436432358695b386f0a6b3370094a3e4136242d
35665e2e694a3a35383821426820504c4f2c2b4f373555606a40094970406833772f595e2a4f282f483b392a62513b6d70724831782a2139473fe298
ba6552324e4b6d372668537e5e52633770263f2a44254448264724542e2d74404b2d514b493e4778276053493748377a3a413c2331682c5231242a54
21207353707c3d3c69427461433f3e525856263253464b526c29443e5d596c744a272b7521372a7133595b4a4b7575716f6d6940333e6f4e6e4f394e
3b746647545c5d2a6a46693a326d722c092d68635746094c594e4b37344945434d2357427e78283f5964655c4d535a7063364b466c2e5d46685a2448
696464424e71376c665c3f5c50404059765c3f5e597e594c55274528346d6c3a7e7b5d6d67642c2209395043574f22472369092f6d7e366027343427
5e273c335f4c61235041597809663d66366b753f5b456d5a22483728543d62452079654f22743e236a2c4b512939295c2d354b7a5a2a203a33673253
7e6252265648670a6c6b372827216b7d5167702b503c506974783d33630a6f342709e298ba5e545733642b7b3f6c53355c7c3c20247a6856352e736a
2a7c702b457c56766b33652a255c20212a78422c42463c6358520a2e5f4942596d3767327d507e283e51527531396a6e59787a532642202e7364753b
7d71773752575424466068774f7e6c7e734c35754d6c227c3a46405c322a23603f3151494c7526e298ba3854725e25495529404d6a7c3e667a235034
4a57482b4c25674b3b4d55692b75516c2b265750656f335539256c212743275c752f323a6e33097e4c6f7d64393c272539284b457141603358295a4e
59332a2b7a5837686909484129442679556b4727395533342e5c205672456d6b577d443f3f73293d5d46734c614e34253138284b746b2e097e353551
40482c6c56672b623d29392e32406b793374735f70664d582d7b5e543b656620720a467c5273234f6e79764c445d612b7d6b26367b5a3d25207b5b0a
544a2e54792774467c6e5877e298ba5829456647647d6663380a51724a7a5f24666a516473773a642d58424b6075e298ba2d3a7050246e57492a4c65
7c564a62e298ba295136584d53383269643a6a3b3653232073244a4d5054224a5460556e415e2c662b27310932254c79402745436d22277334206e52
5a4922245b387742515546395d303033236f3d356a60574646304e654f7b2435373a395863584a514d5a4129205c3a203760754809793b3f64552753
33454a25517026305d3e543b7a2c5147564c7b43607d2c3158657c22794c49680a45255e4be298ba7042502f24202c656757774f2320493f6f694d6e
2e5b6155354931362e4d674b350a77784322714871487625352c6e3fe298ba232270305130235e7035503b715029412e312466503d7b2657532c3d79
6e295933416f785f50323269383f5139790949613d2d76315f6f576238094f2a7848636b4a703c482438623a2367416d475a7c756938457b4f452456
216b3669584c576d0a726a7e7e615d4f6e4965436d4161e298ba774b75633f51685e294b6261262b2e2778337e207b61777c6a2173637a2969687072
5e554c396b534d5a5b4f61616828496a6b61335f4e3454264662754d7a6521603409545a697c5a63534749702f094e4d330a5a502851705a324a713d
34776655383e3639573c683529312f6b2f09347a2e4164584f49613e4172362c3e7453625a61636c4246733e4b7e424435313f6e277e4823255a263c
4043776d4f646e41636e7e3d640a44382b603c72466822555c473d6f442c5a7674493f315361266033685f4b70307e292b6e3a7b732d5b50687a4d5d
783f5e5676676b674a6d35576b6a7a606e503a3b4d737021660950693c3c22267d635c6f2f612c343c7175547c606642623a377409774f4565316e69
674a75237749534e216162363d7449657a55757c6c583a650a603d4e5f243f4b5a373f4f3d783b7469276d792849643c4f2259253554092226e298ba
4156505a4a465b41325d454d2f2d6843465e4e486a45376f584e79686057716e336576444355596662372a6f556a286f227077656d797ee298ba3244
524d5427212263574037752d73674a3e49576145706771775f2574296540554e725e4e36434e58482d24216047625b355f5f69236f312a22215a404a
7a516524502272395a4e5c6f7874673a4f396c0a5a4c465c345e38282d572b33317963647c5a416a603f345c325b264737334d373e5a202f615b605a
74526d4443304c51794f60767e4d72794b59252b216a2177327d4c5922e298ba4c645d7350416f782a2457402b5f416b750954617e6f615e41383666
2c3a71202370525020d82a582500017016208fc50fe21f07c664518224c5dc34d96c87427f58456a2d0d78ce027e26e4d2607044517e2b5a7968663d
467d387d5b7a0aa179019059277d55586a3a397d2775523f60696f454946602e5576506c653c476853200a4548576f3844357264607037715b495029
4b7b2a577c2a7568393c4a3e585b226632792c5540324838364a7e472b2e3e487a4263255160645b245155777a2276e298ba474b5d7a7e3e775e4540
26755430296160783268682242637654774e73277e742d406f66263a45622e75405240592c5f392b3a094d7e674f502e423066586c6b7c5231603b6a
795f09567b5354472f4c2639426f22237471376e68377c312a382e5330697b3e0a3b09756c6b6d6476583e5c564031387e6c456950276f5027224f28
6e4159635e6572647e35243c4a4c773f70794d707c7074644069223c2a7229733c66772d4c742670207368614f2e532a206d334f6c7855464d2a2079
257822594c31706f2d533e5d214234772a5556677c7b4d3b68666c6c30402c21424e237256782960492f2f6e2b773e736c7e2e3d5b28464b72637725
7d274e39276b6f7277467832654b39565c29500977220a52544e2b2b3463545c3064443a772370752c73726a09602d7776617181a362652158d59c84
88160408ea1babafbca4a5d04b404f82cb1b4b142c6e01000cccb5e6b155baa43690e272907b1ea3a86b55f4f82a7ce04d7b8f9504c7882a6b94dec3
48d2aeedb6be2ddb4a9d0c98c1f7996116f8b7b2951ffc791cb0d4a7691fec9a929f0b457d3552290299a82cc5be41c5e22331c8a65e0e04964cb503
d7a7786f39fef3637b87df62140a98ab891ec72c1e5ba28b03f8ea91340425367209325000ea93a951ec6db697ad23d147f61bd9500ea4112d1b14d8
eb1b9d353e69679b2736977f7061f7f3d6e728465e8926a0afdee21f95f7576a6765772555625b206270a7603b000968c1a308877862466981590193
61120b0e87c9d6b1956cb29329b28c7b43de31b9e02f71788f7ffb83daffcfbc2448e00f7e9c82d7441f98fdc659dec2987d4dcbf3953d9df0c16962
b294a7314fcdac1c8329dc4215d6562bf2051375d5cc80a5da67fe6d2c5fe36a757a68dce437acd1aab55b60530891f8d46ebf4a2615508a82e10669
e890c5c1aa7cf1b1edfd389f6b72fa4bec3ae90da4459d63acb227d685dcac5dbf37ce69f798df8b56d1c43b6c059834fb216ecc369a3b3f35384141
1cab5f467c988e3c9b0afc3043e4f03a389dcc56081d04e6dd8662d0cce192ca763dc0140c0f072e3a406f83319d6e6d418224e50abd1eb4e7ec2b17
ce854edeb544e25ec4a4ebf70e01a523fa86b138158346f047e92faa9145a16241a86369b8dc04601b6ee125ad51e06753a821e1bfb010cfc17f4ff0
3a9451e888578d44462640aa727f7f13710a0e90bcf0b645c3eca22d0fa2311621265e5939fb7b49a9e77da4471b3409a223fed7e1ca18d1cb937242
9a4c72cd416960f2da180c67c3824a4090cd9f28ec7fedba264b7cf8ef232f806d6b3b6126b43e42de7e22627159785b6430485b6a314c54742d2542
5b5978333e740a6c647b233a5622637e79262c512d577a42714579447d257e657b69593a53217459627067793e524e43e298ba4c4709342b5e41285d
5c5164343e21653a513f405e2055485f63545c635066473b0013978a45bf4f906a4d0a547b4044343c347aa078327a36264d7342285b2461715e5c65
6b6d5f3c76354d3d2620214034347b226d2b740952576a20476430436f643a482f6f596ba462563b78434e592c3e254d283e382c73317e3e3c5f7541
376a4270706c3c60354339755b5c7038552d3c204a6845322b3e5e5423225939442d36314d2d616c5e23266259526b575e6432565c2551016f074f68
58c260eef0dea0b932a8d1ca673c395a3f245957f6781e4453676329362e4c203b4e2461282c2742686f5277793d31237d303b6845a078402e7e4e31
3b5a283a734277296a3b4e4a65092ae298ba7b6d6338613d6a0a385c6e764c29537d6f724d527833453b6449502c564e325a6b217e2d4f5d3d7d2660
40763e55256f3423324f2d33626f505e706a36502b5c6d27f5
```

**dag-cbor CID**

[testmark]:# (garbage-11/dag-cbor/cid)
```
bafyreiejnkxl7w7b6lki2xkle6kej277tqp4nbjzi2f5wbc3yntd23a52q
```

**dag-json CID**

[testmark]:# (garbage-11/dag-json/cid)
```
baguqeera7ysla3cvb5j4znemisd4nj7aucaamc3k7bgahptsoxe73kwen46q
```

### garbage-12

**Bytes**

[testmark]:# (garbage-12/dag-cbor/bytes)
```
825908e7d1a5bfb9cbe52ac42d5dfe122cbbce025fc518649c051bc41ce2388c2d7703be9489cc927c6fa4279a49531fd1696a4a36e4506a05d67b89
ab724e09c4fcca54fafac711840e9a15c6f354c22fb5f4b5a6c1aa00ba3027a70f6bb4140d2e5227b3dc5c43c0571a48b0b9dbd23c0ff7cae6cb968b
7cb6bca6359cd51cc476e21671adf0a2fd0a7e7489292a69c90b0b77d1eb82947800b9ea271bffb72a16ac468e34abdca6a9c4415d0eb5fdeef12fec
1e5527ba8e0771f4b25c2eeeefd282618482df19499936d27ab29928d9639a3b2bf01aceac81a3102d98eb83d837ea960f32d855c0e8f1d18d47ffbe
3ae4982d252f2333e6bfa760d42897ce9042d5b6c8ccc7ecab0ba773eddda019e1d737fd9aed443c629d3f1b814030dcd1b38d9de9b778623352cba5
32ac6b1c43bc690d567b1ac695c4049d437125d597931843ae053fb323fdcf0d9a9f3ef9433071cc59d7cb487bc2d335e35c1ebe11b45705f1a4f29d
69bc859728dc6b38c3dfaca9727822eec2de640016ce81c26e871542adab200e015206a495e1a8c2454a2ec640a9c584a3cce432f3464dba4ae6d480
2fd5217039e39fe5d2c5efe6d6528832ea05d213f6110b89d69d06c00e78b7f1edb163669133f9e1e9fac1e0beb09fc768b02f5c98a2a834e61fbc94
22ea308c14bfc7b0f6f82445dd0ba098f9b2ff733001184de3352cbadf3ca38533483f2c0d1f7c4d5623ba602aa4453b78d4dbd878c82ace1fb6264f
9d4c7514d4883e5c4f6ee698ad970d660e043e1fd83df0c8300559b5e1b3ba11f53dae8b5bef51b0222a7025a670820f954bc88d5b693c1caea0a4f0
3f9f9ee406b232f67f8705beebb308a4746571d41b7a7601491a5c108a9bc26c152208b2d0b7997f2d135ee3ae0b63a02a56e057e5d6ec29c24e2f1f
b166b206373c59fd11ad93626f90c5dbab02a92ada82c8c69862b553a16af68532d41bed98e15a16176c5d528cc50f2ea83ae91b5685ddfc01c59a7c
1e6d5ebf8100d949741f1b40e57e23aaaa22de655d6527ba1819126cdbb964a34ece5ee07af712d33020793b2bc39533792599454a36c3b5325cedb0
e33350d8d57935685b11c25c0bf1af837c9fa853949e1eb8c3d4b69200b010be09644e1ac0b88871f6b7fa7d80b76f8aec4cab8e0b0817abe38d9db0
3eb90f67ef4325a24b501bbfdd6242f7c65c90b851057066da8ddbee2b9414b6887fc4bb93701f6f9afa1e8818cf47a0081527de27ac42029742e8e9
ccf64073302278628d0ef55c2d47a5885d4248ab91f1a98f57df7dab995f39b50fbe19f5ff690912c11548f844f2e586c2480581cd2426b20b119ff9
210e29ab15c8a6cddea4f543afc58acb4aab062edc89788a6446e7124953e1153f6c6fd9072286d3e2a2dfcca08fd9e2853bdc13f4a19ecd8cf53dd2
915bfe8e6327aa82be6ed7aeec7034bcfb542ce10890e94a981a0b2afea95e43f6ab22b1924444a9b363e361c28c681236ecdfb3370baa7a6a646f2d
e31e3b5051187a14cd00e006504169136350c871865563470cad4a1218a7a9cf3f4fb7258ab4a4e6c0cfc2918243a019d1e3b4d20879d0dec8961966
d5d7089979c67306e5d0168bead8e231d6e91456fffe3254d3dc0d823a2e60792d7c7acd51b162c9ebb1b9d1a7ee1ce0ffedb64ad87f031a861c85a5
2b620ba5bbd994c9c460ef44d90fd43fcb93e91f6fb48e27ca8453de10db511812a8bb488e3ccf732fd66bc9e9f7e501a077cd33e5004ba26b7e98ea
8646e8e125f989e93dbcbc01429ab66b46053eed00b807010db3ba38319ac9f6379859a2b5d94788a3fab617bccad2f3ab077767402ed2019f709271
3042d215e77aedefac02c2011148f83ed2ac0e2783246be8677f32dcebc2a10ee0eb2a4ddd853c2714a3223331f0e0ff9d9d0d20ede93f167706d40f
ac2999c3a0eb6b8bfccda490b3ede1925300f92edc3be7768468a371637c92b4572d50d9a4b8e4479fdb9716060828581371b6d5c10917d37be1ba09
e75b41a4a2ba56e5b62714ab985f13ea250bd6db8e3d7cc0c1e3b09e06fb0585469616b7350d633e23ea054d6f83505137642ec1c102fe92b895c21d
04de639f877ecba921015e05fcdfa32372fd17adac391b177d005f392488833be9b3e15a1ce789e8fa9172d3cefc0bc8bb2de6d79faf02628de560d3
248be09ce303df94d3812c05bffdcefb152f42538e42eee596ee8e21ca84720b35d15b0c0347798fc694afac911e9a6ffa471236908575ab3fcd2cc7
bfbdc41fd87209be7f66628fcc66c286af5ab6c9d2573c47d7199cea96554e38d58165b77c294240ee408042e214c9df0011283b96f85ae325eab591
745204811664daeb7f563a52055b077f061784b976e1a53ec4f9d9620bfcfedd7b0589f13f878cf82783e0f5ebe16d1ea6059114ea19fd60666d7502
7779ad9d3c42895f4cc66ebe5c40a23b9f7f95cbeae57d725dbc41fb192658c575880e66d42f6617093f55fdf30628ace1aac7980dcd5bad8b8b62df
1686f84a5c7c507a200e2880f1330ea6971d5b701bf7821cb54cc324968ed0e71aeca728e896d2a5a85fbfe26c650b2df1d862f896f6222977d425f2
fb73e8d3be876b206802e9bcddd4025abe03fdef03b8742ca605cff997dba47454ae9501b978b4b74a064b00a955e2ab7b41ab9945ff3d9eb0ee9ec7
ef23ae8f2110bc15974a8bf172532a625808358b1626cbf187550f45a4f04ad573714de8b04e1e1437b8f8a6a76a5ea911eb05ad78cca913666afc31
db22382b1984917267ff92ee69aadbeb3d6b51c9d54be039594774fdd64a487e0448112149202b5111884d497fd8e2ac96f6e481e58c931c9cd2a001
a544ee4d94f2e8398462feb68094fddb6e9e11359077a0f59d2b51d29b6736090360cca79b20bd1e2c5d5f80036e56f9ffc159c5da302dd675fa0cd0
6f9be69ceeaf512b5c126db60be82598d80529cb84008017a079c297fc6bb80839a729301ba85c7d01ae0ca98a17fed17bead90d642bd9aeef767de5
e89d395e8060b9a0e492648d879c44402944ccdc0e7326f46157ad2771b736f6357513f12e2d2ccba58a92aaf56363eeac0e78ff2188faf75235fdd2
6bee9e05a8b101f15a4596c7f06f77410f515cc697ec1c63dd49da103bba4000e74ea2e1b5e3af8c050798fc20b0f427058e22717ab0702f1b9b82ec
66212f7902c42729435c58296b52693e414427364b6354445720617025382e77623c606d782864496c262a542a5355203a4b5129787b4e462b274754
5d5d6f5a596c4d506c7b754950470a784432595d406169263e3b5745374e2e4b624371e298ba403245727b2847365c7428466e5b3e3d4d405b2b5121
5963305b64705b3523276f575949245e6546446852635943232b6951626c24385b79385c3e4a68622d227a365e26282b6b2576706c2c745b3a72744f
41703676417e2e5a0a7a6d61705c6e2951727b3741502b7e0a4339292768525472612e4e6c612a716f7655575570675c292e7e57337a59683f735e35
474b2b2135590969292e277c4f3c7c6f597a33295e7353416d696e2e4b5564544973525b5d603a5e635e2e5e2235375f55e298ba43213523664f2433
515f387138490a48725f4b734122486e5e5457237a65743653360a36226f724b205b5e5e4f21582c792a6e653f747b74307d333e514f7b4e56453963
4e53682321443b45266e4a547e3a5e6a5e6b79494366255b522e536f4878343b7577350a71565831382f61484b2c237140213329682d5f5d3d533e74
645a6c3d602973756b46324e66334d545631607e7c5a4c33434b5f3f3a252d7a556b5f2364e298ba7b2a62217d462671613b4622443e33755e435a2a
577c46685b7579304c442a603f3d4b6763546c344175656e2549682125485e5a663a69696e623e4553553b73235171482b2048447b64535440642538
75537778314661397555332c302d483c4b31326d3d5f7275410a73734f64556236377c6072395e35355c465b6b463e4f492374627d6c354f5324282b
2146263c7a7b7d3e66636c553c5e227b24497c2f772c6c754c4a5172226b413f6127520a5f75705b2d6f437e79275b2d6c215071452d256e5f632e64
21386424343e712e2a24316c4e42594a55603766755847096f6d22682c643848332062483e78376467496a2f23342c2163425777617a
```

**dag-cbor CID**

[testmark]:# (garbage-12/dag-cbor/cid)
```
bafyreicv35bhaqcpzhnggxg7va7sgfg7t4ddzlx2pj5c57lxyrtv3zhcdm
```

**dag-json CID**

[testmark]:# (garbage-12/dag-json/cid)
```
baguqeerabppcmbx4xz5addmuf4r6223r2cgoxpapg4ogds4sdokms5xqxpmq
```

### garbage-13

**Bytes**

[testmark]:# (garbage-13/dag-cbor/bytes)
```
5908b35c1214a30b42e32c0d5b7cb509d955abeb31b3e00dcec66461a054082ca11ecc52c00a61b927a83004b9f587a18d4cbcbe8815e3ff7d243c83
cd17b92021f0579730e0dd671d646411b7734af1eb8e3bd420fab97b0dee294c7ffe246a3855ade414bef972be053d8e01756d84ea89d6e2bdebfc2e
7af530fa3bb06db8233ae10ab20fe4fae78e2476f9350de8fa2132a2e1ef0a9178d0c99c6fae1e8da2f1af57aa173aaca00c154d35dbb693accce9cc
8f7069df318856d6fe875429be32051b790db4d399b6b49c94ed50143421bf42059e385e13a8c50709d5dc17ca23b50f614e91ea9a13c7bb936b69ca
01c84128cafe6b05a89abc9feffd327041b49f3b489e88a5857a859398e67a72a55a081f882f596c2d22c5ba2c0e47d8f1367b0c489180a5cd0134f1
a8574d95120ae57dfed849c80149f9f743af936c18ce5c4208e30814a7da7cb379e52e19c1c4d979955f70db3dea2a183f902b78c2177b4503a91d40
421fd802be19e81094e534ef3f1feb654ea6dd2d5c89f7f874e21e9c8d76b4daa1e9985ad587ecb8fa25876afcddd1def32306ff9aca444e5d1cdb52
84b97451f6a72c42abd733a675faa1f38b27aecce036a5d5ed945ae3457c25b0d2cc4cae44d606ce8206f7ed162979f0a057232bb3d49cd8d53b7c3e
e9044c40c83d607dd83b42472f54458b0a89ebe5db3af1202413f822264c2607fcdae835801df63b3663984417646b3fe7f09de3fb1fc08871205dbe
77ec8e9fefb226740e9c6a8c6c5e50272254ed3f2074346a1ff602b7cb39623a32f69cc53c1eae03296097f8221e9ef69d601662cf0761d7c001da9c
b0260e24a00adaee4934ce9ae84c4533c525c4b9129f066af9e070db616a3e8ef10032743d90475673212a99ed61dd0a4cbacc590dcaa3a3858c3810
44a0d83994bba5d7653c61842fbc6d64012a0680f7ebcb026012bdfa2439e25b7761e366dfe20c801332ad6b59597bdf60ddcc9f61661a190b34f9ae
03d1803d9a737176c3ec13a4f1dede264d795776e45af12e603552573841bb9dfc91fd18ff78bf0ee7d5ca53e1087b825525ae05a4973f7c2046cc72
93c5c46c801959e3c6f8002d708e34b8532e6ddf6f96d85db68c0df05382714acb47fb7cdec5c69067ab1c4689e0345df9a0fdf358819a1c21766d45
52b0c220d29a210560ce2fbe2015a9e00a398714eea4762e0b51686fa58d861620a0eb2183480e846b993baa95685a6e425730024a5b8552f1c42753
ebe47042fecfdd838d89b158c24597aac28241d7eb6bb7f9e5995634861c069170e32b669634a761d2412138b3cfa7f069210ab8aac7f134dbc2de1d
df9a421cc93f87b9387bbbdf0040d13e24d55875c50910d9c1b85b005a05315aa53b6ec40403f31c42f4b9b0f77a3e053d2b71d65bbcac61be484d1b
c8b15012f00e7b10a26745213ced9e98a260f2d3241e6d1302134ae802fb59cdd98b4ea73f97e2e90d46ed2b7cd3f8635bd9c5549b921fcb8d55efb9
d3c844b912a014169080cb9c03c1276c44285218cd35ee3f90d963bb0017f23fe97fba34f8ebdf57c452861b7cd3f55557331e95ffa9a2e78436302a
ffdf1441dfb115e83bc4a01cec7a097576f405967bbe5ca8eccf77e5714cfa5e004feab190944bb97a9b96b4e02c9b5c51d08ee8d69136244a0e2330
e6d538a66ace1cda004ed64c4578be41a6bec2fd03753ed1bd8df1204577ed9ccbe72b78bcc5c16ebb5fa7e6940a14deb8cda0342199e4a61c069233
6d79c0e2e3754b3a168377290036b1e679da1099d6a363633e2d93d5f566aea698608ee1b440602568a267918b488955362d70fc4037d76b28d42570
4df826357b1811a506bb6aa72e7fbc4f067de392a7e7d4d6b08f4c9cd4a673577d2c6d6be126705e270b2570b5fd40882099d6518c5fc9ba9e06062f
55ee1f86dc7ac20be949392b360c50f59280503ccee3b0c41297cc73dee3aa4d2f00d96cf967244f66da1cd8c2867596853b0bfdc53337fd19956b32
db25add3517d6a7056d11b9ec5aff3362660d6f54a2b26282aecb7cda85241632138ed3f8bcca22a80290c15f88946ab1fc82d9b710cc6e27cda0a21
ca37aa4dd588ce7e6683d469deea7362587fba7fd7d8100377e2bd6ac4cd174e1b36009c3526a09a931716410554c7c805014f25dd291b6efab840f6
80b52eb1beca680f5b60e0b75b9b3e892bda5a964831a56649b5dc46bcc77fd07edbafe801b378de32332e1ceb087646a75e9a0922418093cbcfef65
a30889a4a102437efc0b01c085cb6a91fba2b6e9fd049986f2b66721546108c953791ce45abdff7f9a5dad92454de1532c94dfad9068c1a3522f6099
6b06b8d947c85ba3d4bbc66b3ee5428a7ceedf3d01be0ff756d06d4d02db46aea81128de6c9ae2e7f144cd5a936e5fc106d845f47e59e437f4fe41c1
062f5cf27cec728c24fe8cf8248949378dbae51d3c6bed4efe16654305a285696c7d9145ca5be30dbe3bf3e8d5df01986c557e383d5866d81b75a1e9
31aefd6bc80acfdb9dd97a866c912aaa16f6186dd7f3e6eccdf3124c8b5054ec1aba4d44649df90f9a6aba0aeae979839b76fbacc8f81555740e3180
57432e1d97225715834018a0d500ab065b9204a7d8bbcfbfb28a367fcde71582d7a2175b534e58e7cdde37285597b1b28e8a4f1dc7fa98baadc3f4d2
8a1b1eaff012b2b568cce0b0186783e0736bf9ebc61610d39ffab4e9754ba14324bad7bf6754e08ebc0cfc2ed936dea90ff46b71b826607c869dc9c2
a69899b5361a5c75f22864e583816d08ee3673a53be222cc9922921a0afdc64f2bf79f89b6f9e12f51c632f91cf4fe156d6a56eeb290256cdd0245b8
722d154d58f74001a1293839cc42327107e766a2c2f29c0c801f43141260e3b5d47f9fd70b9092673020c411480f5c1f02450f2f52b75fab182bf9c3
d5becb0f66ad0e1f6fb03bfdb90966745978a1741c9008ba4838a1c83cb11aa47b4c3642afb5f4d77a4eee54323733c3fd25d00d4dc700c2065e79df
c5694a0fb9f4742a5d56f33691e96d8b2ada2887be5659dbb9f5550304fc7cd6fee7c4424f82607b650623900c91107c5b452a3fb4aec7f0e6859cd2
9f3464a33460d1aa63f1
```

**dag-cbor CID**

[testmark]:# (garbage-13/dag-cbor/cid)
```
bafyreiftf4wf2vmynw7lxwnqhimv34fmcdpohdotjluhi7u52uqyr3tguu
```

**dag-json CID**

[testmark]:# (garbage-13/dag-json/cid)
```
baguqeeranltzith34nf3wnxgq6f3wlefmz5vbarepvwvt7qskgvqs6u6ddia
```

### garbage-14

**Bytes**

[testmark]:# (garbage-14/dag-cbor/bytes)
```
81a262495d83d82a5845000170134053efe683a0d577abcedeb783cf738e133c5f39bfa00c0e261b882b6d1324c31ffd899686da2d105551cc8cbc2c
08d8b9fe178b950c1656a9ebab65026462a6b97902090a7d4c61313d73677c767554687c752f2e332c3d2f366e71393f6b49306c79647a2a2d7c2e49
343a43655e25583d79437d6959333969493544713939474b7979326f6b4d62694c7035697945427824503d4a3d4843725b4349574645392274676245
387c38307c5475483d3a64266e7a565c653762346c3c644144524c696947207a5b673f3f4230786c3842767c4e0a474c77652e4431486a7567644340
70672f5746262a29766451662d3d382b6e5337672052622e5d7a277866095b5a555425264c342171453b3565692f3c233857582b5a5a47653c385c37
41592947376240463d253b68350a554e7727703e35406f565656634a73666c7e45353e62696a644358415b475842732b4f3d36426b755a396d357951
686c26663f53754a7e4222567e21352c323e2d23545a2751252338782b566228e298ba534f21592450293a2242423f584c6d7a4532255f215d507a48
774f384152524c7c39605220734b43242843275f424e6d3d567e24346f235c2946775f41776b526726493a2a525d2d355d2968637a3224487c5f3342
5f385a2e633c7e346d7b7c5b6a3a7c54792e723b6e68e298ba6440637e69374f4b577be298ba4b432a783a56392a422c636c745f4a43366a54555a76
42642d716b4c50596d603d450a2f7b41416f4c61537b7140573e383d27615d7567366e300a5e405b2d7d3d60627a4c432c64396a2e4c5a3d59384878
643d5982fb3fe40bd095c1ab8caa60fbc0001e736ffddad6623442f464627c5660d82a58250001551b2014c66c4f04477e2eaba08519f3b5d1d7bdad
0000ebb2bbf9e81e254d2523439264707e4d50fb3fcb29abefce1b85647d535e67fbbfd4f4f3ad68131a653f30235a7e7905556e45705c2f73512a4a
63e298ba37697648262849583d72307162646626287a534e6e5341644534655c7a6c244e563f7e2138412c454736717133785c482d464e50414c5969
2f575838447936427a4e6b237178764c0ae298ba3e5a35326561573464465e4e27094854796f6f7e70776228e298ba780a327877485224440a2e3e69
31514e4b394c27523d2d5c796d325749735844613d606061294a5a7609307e232e70e298ba2825492a49e298ba416b5465714a304563312842484755
3f354c676f2271662c417a5863e298ba6b67205d7d5857245422364169457c284d6f6a623a4c26503a21206ce298ba584371e298ba2d3842344c4436
3d6560325d2d454d2642546c6c2c2c4d51466f712f285b22485773746d4250442763696c2756535f29373046604d236c73604c78436c2a533f216679
7b722931343e4e74627221584b7b76706a225d5337424f473d436f45224a255f5b6451376e61775c486c307a784d734057386c460a7e212359283829
31217a71747b2d4f227c562e6d5938417672407c2f544246796560392a4079563e703d0a413d21347b3d2c5243646c5e30797d705c6a3c633a782d5e
587a7a4e4a262c37772532403a486e30497a4d234d43794b727263205b6d3f746d3d5b3f2c27556e6c2c30524358626e24293f7773700a40315f5a54
305e5b09764c345b7564757e697957276f25637245702547642a62382b56275c237823412d413e7651556167795d51563b770a24272328306437455b
64573564e298ba4c253a672b4d6c0a6850526b725b354571097944796e52324b686b7456765d4b774c620a29733971246c603b503d5865485a744f60
706c2c6c6b4d2f6c2724755b373946305f2d442d535b435f49643975316f4625782b3e266e3d78426760423b5120774c783b2e2773672b57502e7320
0a345d2a203e2e542ce298ba7d2d606e214c59706f2936483e533d7b3c49646c21332a79467641632b65274670613f4f675b5653782a61252a523b54
687b525044334a236834783a2a6e7e6728417923415e7e2670567d25236a7d2135454a7b2a486c5e565b615f2c4f3c305f36773d3f48414b793f4033
5a52257b795c3e74217a50435a3b5822635c30203878785b59787642535b52206e734829097e727965353e5725342e4162342e4635e298ba2234592b
657e4c59612c2c55343178253d0a5e64772c5f26343f7d64716560652a222c6d2b7d6871563d755f213f2438624644355c664b6a383f3e4660686e47
7c712f25794e536d302e2b6e3f5b74310a72e298ba49437a0a7877346520715f5d7c40724b77704c322b4d5d3166232268575c2e6d664a206a743f6f
6e62586f0a75707a5f3f48345c3951602728536e433d6b737d545358512f3027296d2e2d78332b6c5e66263e56477d2c794a74546757306d69537430
55224f5e61095f267c4c27092e5a7367345676530a587a4061226d6c33386c56476d615975586f3c24564c4d283d73665b2d6743754e5a4a745c7b6b
40e298ba263b327d44415f5a38384c20785a404d6e695f282158202e5a6b2b704c7e69546e3151793a204a0a43576349336a312a2f6f693f3d736f43
5f39784c2f443c6044552e4d705e45522e79305a57e298ba56424c2d6162343336752b41645e2b226841413462676d5e38216955566d315b5e66350a
50204e5b6b2020225771312c672f2e75e298ba0ae298ba723f3b45662e6c22322b720ae298ba5d264b3c0a2a2f657834263230312c7b5e7909630a42
7177495448277b33e298ba2f383b473d756a7437274a6e70466a63605f45524743747728304c374a2b2c3a54447a5a422c4909e298ba27404d215373
714e65267d2a32654c384e203a49533e736e265b707b3241507b0959537431e298ba3e2d662a406539567b3b0018bc46e05a88407819346c5772482b
5f2927512d41456863477e7260577b7e2b3a26d82a58250001701220387183ee6c631efe44ce7f2b675229f418699b1e02e5557603eff6add32f82e4
79013e2a252a5a7c333c554041290a3e3b2d304033202a5a61526d556b436e59427d2959693d557b3b776b56775f7a312b4a227e75296d2136605a49
31655153414a744a4d3067674953753c414425672b3572795c5d56e298ba6e5d755a2e4c227c786670282f730a2f6a35702c274d7c37433f4e25392c
55624a643b584068770a4b73735e582b58406a32774a3e42695b3158656959617649582d4c58202f5b5e4909586370492956224a59726c603245396d
68662a33576e644735533b4e694649543d7a5c392f363f27745976752d6f5349773d7e6e7a7b094140642621314a77574e2c384e3c7d5433625e3e47
3a2f6627715d2f5e3d426429544c43684e4661702e4542652a45654e6a3652096f3a522e224f3d5c4653546d4e375a694b2445665f506a3f2a6b2728
4a383d2a34224a4b2a537a0966564a4238333e31213b001ae97ffc17b3a07901673f57446031616c625e5c623a4c65664f46552b2b6f23376d5a495e
6a65536669777e317e747a662a4e22426a562661645d3f38287d7d0a5f6d6f3a33797a5c3a3f6b7e646f5b737e30333b682b6265333e6d316d754e4a
66522c7d394e44372b2f6e4de298ba396a74532359203e6e792d7d3943753226504435594e676a38323050406b2c48262328744a3a555a4f775b4b65
e298ba5c265c58e298ba6e616b0964325437766a7022517d7e6438274f3b78525772254a584f465a3a7e782e515f626c3f3b79554864234643576b35
7062616e6b5f40715e255338305153504f234f573609705678724b74285b2a29417174653126573a3724383f3f7836482e522f285b37666b69674870
317d6632605c60642d69e298ba362e7b20572c23764d654e6569527b2b6d4b5109595b3e3f25733a4f433d4f6b24462c35560a42334c662a2c582e6e
416f5844203e783a3e266640743f5064374109632a202a4b5d613b4e54525b24590926f4cb5927f81e3957b867841dc464bf9e7a4d6e6aaca3d7eb78
733793ba4b0f91dd6a6f7dc638f269dc16ffc3b29dfa7df617c45da14699eb5ded9b89be29f7bd9f95ff415760848018e5a9d40a2cdbe9b0f76b1185
1089a497559dfda67b9fa9dfe30159abfb942e4f790224c9427037e91ebee0f07e130fff6f9cb44168fbd3bc10464af49cdc262b3650e7fd1895d8bf
d942042fb9dea0a9bbbab637428a74daa6099d62687417254695f7931375fd3ef70f84b1689d320242b608a6120d064b3ce98de99537e716e805ee34
3739757669570a94aa052bb6c5f1a0f375ec1a30f8b48404c887d96cacb693ce6d382df4d6592bf981e09b04e8714cd243a50a28940da9b6c1ed30a6
a4a9a8b28bcf3865be09124e4bba7e54e6b464258a447866e0f22fa9e7578997857192f34750ea97fff2c144a9268efa5306f9562c3aa643121e78da
63d8d0cf4c6be7e71e8bfd0e2f553d75f2a7b03e256e1154212b2a312bb9181853d5e087f4425ac12106bf3915a4ef98068d7730ac30884ff8c0b743
ed9df6165d979ad9cd703f5b84a1fcb6434e1da6ccfd1d8c3d5d2c24a76b7f579d89dc754be922672afa649ed93ce735d06ce8ef0f5ff302d0270d85
4c149ddc030319cdf422786d64cac5e0520d01a204d63b786f3a6b9347e26fba93e82ce2fc6dfdf52cd9e0a89f4cdc3b4d652ec0bee1503f68579d48
3b9c778b3c2ce7c61d14233dcdd8592d2907d60c5aa07489d79544c72fbbcb7d9f4443c81f40fed129ade2c6ccecfee39ba3a8c949455fef79cf0c7c
d182621478ef7c43271b58b0e59de467d8ca4665cfc3d43be7f52916868f8c8a80413933235b4de01a583facfc053fdfdb2796403733a82761fa012a
fe49a96d5c5a676cd92f6ca40cd1ab76ca2fd32b6a8b1f98af036e8e61350c8963ff434a59bdb6b67ea1c43908f2afc6202e1ff51db4275ee31c6a57
c3c87798d6fffa76bd8d57ee3ec298f03fcfe1eb0de6452c52db08e0917f94102782523f6eaa2222693db5c49a0c93980b2a2e36e2760047660f695b
a7feb2de4969f400df381d7dd44465c6462244078162ddfe148c82dfcb0c5f82144ef3bb65a2c2a49f8a7b9e68283bd831851e6574e4cbf4016224c1
9c380395638448ec81f228c15dd2f59b0c99b9f43fef6493ddff9eca26676e6a44e776364b2c22a584d564dc300acfc6bb6ccf30f5b5505e9db0c519
7d37e924f9d548bab220ede00b12e8643a5d7d7222257644494698865ccf4465846fca783d60d3307c5b8aa3442bd8df7079619ceb2c62f677423140
e58efaf0b6bd36ce07f5f1efeb5da0b3383e3bb728a7e43f0d5e5665036be045f0f85e1a418a6961f23fd8cb63753c1c1696ce3d6975954fee5f825a
317f6e56a9273264b0b18b8d79bb2a547814c27a080c9fe5023df91d1488bf0818c27dad973712ded5fec0cdc4360ce8ae9a94eea56421d043befdcf
2d2439cd3c137ec8e26307837002ef3ddae45dcb2ace44927126b2bb90f1dcdb1867c074cb1216639b7ccff5e414da233ff7952a7a6ebc79ea0f75f7
45beabeedd5ff0b03f78f786499cf38f100a0e637add2b5148188b7252e0bb8492d230198c4d32523c8ef552471588d7d692c2dfcd6b4a1c88e0a5bb
d32844a9244c8ded9ddb80072f570fa4742f72f145aff57074c5754c6937a42720603d15204151ce0d8681dc87eb1323b7e010c738ee9d3a7efd7126
11e4c7527077f412f996512003a6faa9bdef038561c2156654f66f26a65e12c1e5c9ed81d72b312a0345fc6a07727a31eb209f1be81994d7cd2af425
1fe77942ef26605ea903b1876e357f9e744e536d2cf2ad3f939c497662502e0c0f7fa7dde2cc6d0a83c28bc2fe10d1f9cd3e123d8962de664a954b95
73ab73b787ace32f0f3eb6f374c3771d185be2f895d16af17a069883ba493ed1572d098fb6fdaeaf80e4fa5bb16c9aebb40635613ede8c88d6859164
a612bbea3c08bc85bd20b73fa93d837751f99807999b4a5190ca3bf2fe585e16d0ced22712d2e6381039e3367b596444bbb902fd07ee1cd48ba2a6c8
551f00d340556e450df769d0d047308552a8c79c4ccd1c4fd0fcb8c3ea2dda6bc8cfebdc1b2cf08e6d16c24baf2052d951dbb154b5bd684c66cf8343
4889b9a485c38116395ca022ad68b907d125c04d4692e1d44efbadff26b09362d712ce1129339940fbe7b4a4526db63b0da505375700ce3e1277e784
a66d68c9d755088f8c0f39b8c68aacb3f1f578be24e01bb8d2a5e830389ad567839ee1665f3f7dc44d857b0c15acddb365ef972c03f07dcc17846f9b
8e36a7a43ac56f05fe779c99a5067f6a46450f6ae633991e46a3ac3efc77804eccdf399bd7583a631b2ebb1c4e2790d163def0778a16025adaf56da7
32c20ae9d0d44c51e54394273904a2788d2abc6b1b4377d097bf22e45cde83b44966b0f77ee3bc4963f3b632009acc130c73f59036f01f7f0102e8f9
a38983eeaeab914ebb199c92a22618dbd1105466d8c415ed03197e518a459afa8e6478d35d819542611a608d32f7dfa7771053eeedab86a1094fb08d
7daf2fe0cea52bb767d13f7d396081f9d5962bf3dce84da5b4287622becc1327b3d13da8af0e56f60b3abc556f41b870cf827affa223c29f9a3b6c2e
b6f3eb26d99068a5adf24c50e9aa3b74dfe7d24cf3d302f74b4456dafd312f6809af1e73bfc82977cdc738081f1b4e1181d76c9fb7e429c20c52fcc7
e6bf8c20006c51c615203fe25f0fe31165dc78f460ba035402eaf061ae33ea519cd2b2407a22c5cabb99876604be2ee2af49996b7d0c2006b3989bb5
a59703f12d88baecd30c2f340c27275060e47a08d4e1ef113c37a35a51123f90e0f434c88de5e8aaffb4584d09e7dbcc46c459c5b656ce8fe5776ddc
de8feab629fda4f4b78a41e44c017f96694288ca975bf69350447633715e16130a68676cd3027f0dfcc132e42767db2beba14f2bd5594b71455d5481
217cb7593a5b9caaa7d01173e5ccb9c212646432bda0f249e52fb044e16016eabc4b89a616bddae5156138ae867bdcc0bd98b9fe4083f6d1aa9229bf
d770717ca2707e9fdb38d177683769c27bea3940ff56492d6d5a766cd41607ad40e60cc49e654f481afa548cda981efebe94e0c0129afb0fc0f57884
7d5161814c85ca306dc254e3328ec17ab41e438bbdb78879bd3a4771514c512b4fc55f4721c7f87f1e27e70ee55ccb6e701721cdbf7ff3ce9a9d4626
0a21b92bdfcc8f4c5f11a76a61e2c8a3bc9c09185e39cdf72bf34908b7d61f536a5ac9eeed642a58613bf4
```

**dag-cbor CID**

[testmark]:# (garbage-14/dag-cbor/cid)
```
bafyreic5d2sckqoqooj4j4pyh7asiascg5kv3thmt3kwalj6zqqvv3tbj4
```

**dag-json CID**

[testmark]:# (garbage-14/dag-json/cid)
```
baguqeeragzij6achvalac4fmb2oplhyhvqnfdglqtesgrwd7zilyqupe3fwq
```

### garbage-15

**Bytes**

[testmark]:# (garbage-15/dag-cbor/bytes)
```
88fb3fd481317954a9a1f65907d1bd68fc3caf97c603482cc3fea86d194dea38686a9f3c4cf2d9bd5c087858251131d86ee4dd2c6c5bafc0e8ef3407
2f8eb2d4b5c52a3fb174afcd98ad7b07d6103b42ab755bc4797713206e25dc95644ca288a1e5f872b551636aaaae9239cc5b4356154b476acdd1367e
a40ccffebb55eea0a61f9d7049c6c5936d7c819b78eca6f8ffc0694f93e9e7292ba162610ef818d98f4aac12337f996a95da3b27157fe8254ff80727
e690038e67885424ff821b4f4ce9188f4cacfb7de7a5b9087fc470e41dd4f5e0d6bba4df83f73d31bab2c9353eb6f64bd46e6311c24701cc3bd98b32
6c8bed82f1af3404c2cc919b838a8ba81af735bb631a94365958fe8da46bbd978a0ab0f3e43fef6eadf2fdda36c48fbacd15e55d9a683b72b493516f
f77035580c565715e20eeaad50e5e4caff97ad972814a7897077cdf0acaae4db5c460226f61f5cf3deed5daf1ddc71d786517b0cdec717348f140924
a5e0e0e0e2de8312d9a6912dbf818b36a30b3971b3e127290280001efb5b09b9aa258b368427bbc2f66198383a4c497421a8762d76efb3b363e55fae
2cd11c9e0411d296bdf96a83cb9372667fe99344def64e32257a68f4b23f28b010963892d1a23f3fa80f31a0bf2d0fd5a99713d03fb13cc0507c708d
a91cae12c37a2d89a5a215f3c251ca15bf499da7a7e4a01f1dedc43342cf1cbde571077ff7f6a766bc45f660fba624ec1a2bbe1428285cb2066d3666
5fdfee93b7b9b7f30492d159dc079122b06fe16f261c1fd177656cd6240eed139c18fb2b884c3ee38c56de2f91b7d97567bcf6a46f53b7b4a382bc03
5876a3b8863d9935822027f0dcf6d3853ceac0e3d249cce6d3a5ae1214fce77cc4460be036d0c8c9061f439b3d38d8e5caf020890a366e75a64335c9
38c5e63a0de46946aed9dd15960b4e66302d271c9c4e440dcca3eb46c03109445fa730709d263224b74a056b0affd2944737f17ed7c2b8dc9d5e1b86
e8093c90fede99b49922684b28203ffd96f7087fbe4d753556f73e1b5a93ca71ed0d0ee484faea2fa766e6ed65081d6124005d328989662c9e26d7de
789932d7d2f808effc642b349dc09cefee3cd4aaf33d5fc12f3e20f5c0f8f9d526fe0a5efa5d1ed172a52f063b6a6f50dcbf5c03b1d7822bf21d54a1
dbd9f2c16653f5f0dab59a03d91b8a8f188397eae746f3423c9c6519542a77dc033d89fc7946db384976ffcf0cca7cb68f9ae0b70ff0f2a77f6b0dc8
f2ecf940122506aabf5a864801256c2e32bb40ebaf13bd0c3ac0021d38ed4119c4d323b7bae63df4192db978b1b3b5f5f188b440c4ad51771520d5cc
349a52fe4983a67ee1928e6abf479a64d660e68108509cf96fab9d82468fa2d1eb6fce44ed7de9aca0195ee48d7dfe6a838aa4df9b589678779e783e
4eda96d9556776f7b33970bd5016ac9a47c51fed95f76cb5561768e933cd58282dbf177836f6e40902d2cd9d4c8b8f720a0563f77de95564d7ca7dd9
a6a76f60eb2f64568094500e8cf425f894b6caebb29d3cc94fd8cadd8556d1d9bcf72607b484fb386b16ca85a161eeff4d64cd075cf8378da871ef03
b10fa964ba9ccae46fa57f8a7aa89edd84780f6e3f5843d7b7dd0e5e37031ba4e054c912bbebdcb2c721fc4b0bd78914ad96e7675395f230180932f1
ef753459e8c9f93348da06dfb6b4a91a31ff7d5710aa767e87aabcc2f90a4a1da43ad7357109bdd9e932bd6893b99d0c0489b371e584da782acbdc5a
a2d9c44710a243a7677ec9e88190c018348c54eb30d6656aac4be6478aca7070dd2a4aed42110217c3423d324590deae64483488ae2759e0bcd46475
074f1e9d8b21ceb920b5ca28e353c3f56dc96d76c2733f8c10ce1111b1360d6d1e89f8f9cc844a8224d22e9723c283d74b31c3038626d3d04a6b30cd
3d0c2d882f115b8f29003d4333e7f10beb6d9b2a673d74271c0ffe230d09de249698c41b2c3abbe1707703c2ddb9a98044bca71bb4fc51d0745bef29
9735f4a59576385122a8400b3328d7b217bb914c33bc5f67cb6894897341290a092016d434f61853aedbaf95f45dce5e0ea8672af0f87ac3ee845d23
16cd5c6369adedac9d7f9615f8d014c9fb91f975d7aabb1894ba6c3ebcb9570be69526e106e24f151b8cd6e07b94c24c19e046923d98cbc3950432df
b072084f5ca05c0a436570d2d7a08fef00194139a595daecea7f5971857f3ad64751c2d206dde0d96ec2ea602c92ef0e22b85e4d2ea037b5d312417c
86a18b88ca1c42e3b3ff81729ff8146e09ace1f0c61a8bb311875ca084417248ac8952311c9e495f65b905ebe03f3a70f51d625d12685b4f44d140d0
7af129eca74c1179e0e9e3d9c8c48e0f2809f1c84486d7b83317c0d84804a8ba0502c70642c5c0e877f13b18d9c16034f28545b8eb0661a47ae68d9e
5b97da76ebdac371f00e08d2023f5001a883a71c6b8359649d679827fa4d49317429ed44ab327326d9a44f765fd9418d719006d75a11a82a6240f6c6
ec0cd3cbfb0dcff315f43f93adb272ce80f1b3d999fc12d8dee8e97257c5efefa6b914cde13fcbe3a2cbad456dc8149d910d4ad31486f165ee01dfe2
b62514c2672cbed23fa954cc0f138ddd744a9a693b23b82d7a4ce4ee2a6ea9bfe460873f58d4aba8f1c6bbcad769b131d2d036c078c10361c191b507
4d90432b8165f7a402dacc712760221efe7a6ed61d8747ccf1c84a7b67d29fa23fbda029cacaa05da4e2376ebe9f76995dbadd06daa0ddafdb49e170
27c8049f1a2ffd88b52430a322ea8d66e7272a70807d9e44307432ba47e062f9c9ff73f585f6fbbfe80c42fcc2948759087169ed3564aad33f040a75
15661837560abf9f5935a34e88edd5d2b676ca72590dbb38b913c708bcb2dd8a119a65afab848c0ee832196cbeffa80d6135a6436bfbdd643745e5b8
769e777ab025c1c99f0c30037575808c42268f5912ffaab44777f6a27344951e111946d1e6bd46d45462df54d6d4dbd4455b3bca240f97e3d82ecc41
2ad99600c51b89bf659b967b4307460fa725fdf18aa6fff45264db12851c4c2762cca54b7ba867e3139ef9f3ab05737773d0e681cdbebc9b4095b981
0994c658fe2008eeb4336434468dfac9822b2c2585a52973525c06898b8c2f3140dc1ae90436dd0a350c309abaa816cfcef44d2c09b5f8f9c86950f1
9e23f8fee867bfcd06dcacba307bf00ccfcc91176c156477af1570ae49961d516cbb5c93197b1dc06ec013787e421004256c4cdb6241ad2a2241f949
f268eb8dc957de4676a8d615e1ef47c1cf30d751747525bd9f7a7b7d6733762dba1b48c4b793d5f33acd3f62770f14d25327abb6edc419717064604c
f3ac58d2096a9d8795da12801892eba52824f6983fef4cd878b22e3c73301577aee2c5b644d543f02e2b08b3afb4711b198ae3d106819230a6f5042e
48957e1361c17febb7565cafec34260278ba98c38209743b85164fb8e683737f40910c39ba5513354b62d0a09d8e41b33ef6ceca34421359651e4268
7465adefad3687b208c63659f87a674c56fd1a9c80b45c72009a66a1cd3d797200dcc858ca4e556cee21cb9605991d451bf230f6337ad1d644d92e79
2d78d211e5b4851f7aebd423b9b5176e018b09ccd5b6ecca26efedde35ccbfc359efd2a8e986cae44bc32d36ad76e88eb0b91f578c4875e727eb8c9e
fbc49ac76e9fc6c5f44278818bd689054e0ef8a0f97109780a6d98204c6e4ad638a6ebb927dc65e0858b7d7fd212749b014ef2384998f65d15553957
125e22cfb80250cea36daa051026a4c6b5750a1b1b5120ba4ac84eb39d0efd3f420dcbd1bced295e2e6b87350fb6f7333e5e51d3a302cb7361098ae1
41c51bc94cdb017a8ce9559e09f8502dcc0260d11402de9fb3dcbd064ded255bbc47f3e2eb627b199dbefabe3e9e2139a44ac5368863687847ec207e
c205c982eb568fcd623a28031dd5fd992ee9a09b2bdbd604645b4f2c4917a2055cfc9c82b45a2d8ffe648cb6ac85dbccac37249c7bea70bc5dd3074d
3fd6557db8ac2221e9c873bd24182aac04017e9e495c443c3a39bf4d8c56023fd15ac2b8047516cbe906a8b0f34fa6c582b3eb5dbb271359284db056
6a4534e821b5e5560aa4fb16dddf70e799273539a78234ff4e81cd1898d4fd64c86b3e93511da4e40a79161880865efd3fb929c47be70465d6a1ec1f
d3866f856e69f2bd9084d2bedc59534008589fffa6123ac41203afdd9b20df7e8821f6a5f36107f929def6d6a9bb268280b0aafe1276b8f04c7ba004
0c495325d3c6e64d329f09f274773b2b7cf7c16743fc538dc500186beab3574333629ae730c01e8488d79f9be7bf2f7be819d494e2be51b4268b9305
7876c98118c41f1c56aafe749ae2eaed44680573ca7c4a9cd63c76e1c86e1e813114f236a9f46a8b9f81a3741e3a654f84f5a36bc6f7278635540c57
4630773341a2c431bea2c04f573d922c6823ccb1780e34c747b037e792bc1d3166b5b9ca398399f9f554bda9ccf120e6a4a997ba78dec2b893cc29dd
63c1256ae60f8347b73c15a3e6d8fcfa6c868ecd4d5c36d6df4d4e4a78cbf2ac2aee1b0e8102888e885561a2f76678d7fd8a18bc2bdae06169baedc2
8c55b864ab6f50cfb22bba094827e70d93ae8b65c7034b59db576bf5e6e75deae6bbd6896dc1abdd2853b9cb81153b580119fac389bbf2f1f5a8db1c
88534dfebff90df0cdf8c20db5d4e8caf0110e54ecb60f90504a9ed0d0bc90400df458bb378ef2e17e5213637d3eb9bd130f7f754eeeaa821bde2402
16971500993eed475e43b53c4ec5974dee7d84c7207365ed6153f110bd77483d6c7227cc1a97bd9f4c112959f335a4c786f4c803955fdab9451a1b11
7ea135d1e360e79d74371517f94cc345062b950805ad9969096b3f2e3849ddb0a2dee0d4a1d6121e16fbf749293ee99800b36e04283711dc17b9f1f1
2c3144a89dc018278f1545086d34ec47c75c9de1837f879e1b4ed389aaa4aac3502cdb5f37e93d24ebfa9de10178c706610c84a1decf75dd890b725d
25445ef1f0495d75789bcf0c4625de3340f4fb338bbfbf0a9b7d0d84f042ecc969bc01b8bd370320865fb63f59c56508bf970e3275c6ee7b0e251901
c07023246f1485d8db1a529d250ea89c4066be4bb55ea64f29d7344a76d97b4a1f0685edaf63e5dde5af2488b11384f73ee8506f2335bab1c6cedeff
cb1ca68134b96af2da09a1ca1ec7edf1c3be6d02a501c8e1a1be37aa5a849138fa811d7f8f6c239bd7ef6ca53e1345e9665e78ca123fe79b71aa8e82
69468e4698e70cdd7d1c82c343865d613a42a8eabfee562815286b6c86e8a445e0df11fc53ade8ae2602d1c65d033b79a064a1f12d6753ce331f834b
b59456ebfdc87fb381cb8dba86d182fc574d621228d974ffd03bc2f387d0269b5768a0084d913a6ac050b78f1f7ec16ba202087d4c26c12b752ef701
e017cb510265c4d1ea69f906e0b2316acf5f9c9cb26c30fa4220d613fc9d7ba2e4d4e8dc952939cf5b6d92aa016d6219270164589f78269d53a11ae3
4006321a9b7cc0492e4facf52d0453ab0d00136c944f392332751c6cb507e526f67c4a2eac87bb3104664f465841f5369b440b22966fdfd2ce53df60
4dacb016c7d3780554cc1fd5d531aa6a72f512b7887336c523896a176508dc9583a10979e37f85815aaa69c7346ee7ecc8cf34bf80aed84fd44db36c
51eb83940155d7bb32903046eac19d40a1251cf85e5ac9d07f5a0728c11dfeb45b871cee7a1ad313e49160fdecfec4efcbf60580a60a95ce98fa9837
6fdb5b8e22a4686c9ef4c8288d92cd52ee1f7a88d1c5492ae678bf3b428cc7837e60ebe92b313c04850d121899e1449935728ad82a5827000171a0e4
0220329ffae4cde754ccf1b26e32053b9dabd24d4163145d628362f5e68dd7dc3a9df558cf5acae969a0d383f7850bcf53892a4bbc69885bc40859f6
bafc0e900bcc064c6575844b012750487ca70cc6b448ce566c22692a283238fbfe14508392fd775e2f35fe18ad95582ed37dcb4c19eeab51bf916f1f
5c616fad7b132139059a8e0f7706263f4adc6c1e7cc504d9037d128430a79238cc0548d6597c2b7b5ff3a6cf2d26339c2615159c0d5d8b3e81e2ce1a
1836b15067cabe5cad9fb816f449ad4dfb40ab60ec2002ba95c4be9ad14c1514017d7e018f856a47519ac07552eaf503e260f630b57f3083f176b690
3d1bb45b5901de4106bd278d5eca6242ed95816f8ecc939b9d1da623a822e12359a3aa2f92b7480102516946432f858a4fd9f72febab5b929a171cf0
b9c3572239de7975c4b66a6341cfdd92728e02ea7f3a2631a9c137dc0ed359dcdf75aa4a52940987285e012d88cc8b88361743cd85bee7cfb1ca9a8e
4e6cbe52cc60ce898f9e7e190474ea9095ef1f0898479af7642cea529e0bbe4c97e3f6b00acc25935453eb0281f4d1b0d5f8a0504cd62adbc11de057
023729dea8588ed0e90013ec9ff3bf78108451adb1633981d050d40c2c3fe333da069e8fd294b76b0a76db973152b648f14fe1b42e863b7b8fc9ff40
18680abab858138556b6ecbb973e34342b8858218fbe7250c73b55346297ea2f35dfea9c0b29eb6bcd78f6b77f58946012707c2a57ff8f77e53aeda0
62d80bc5102b7470f76d2725f99eb54b5e03b760aef23d26cb4ddafe97e5cf99d6710810ded694c6c176ad3e6a6e1745e9cd4e10b4893378c16e629d
a2b19f6a357c375f70aadba850a19d751ab2b6ab5eea18a78443605ec8bd00d44a61a3976ab1a35f388de0b235372e15e41656390930d3a65d63f8f0
d0e8986393a0d5134335be3f52868e8818e7ee511f47b6723bfa1c2c38c4d2ee99b808f439b51b133e2ce047263e9337cf258ee3e77dbda6585a2f4d
3837b6f8c2fbc009dfd4a736899a
```

**dag-cbor CID**

[testmark]:# (garbage-15/dag-cbor/cid)
```
bafyreiakca7phdccv7qymkxlezjvhnbthemfiz5s7ii3zrrmqfxggzspma
```

**dag-json CID**

[testmark]:# (garbage-15/dag-json/cid)
```
baguqeeraco4uqcqqhr3miz5ncuzrkzmno3egnhxxslpfwlok7exyrfzuty7a
```

### garbage-16

**Bytes**

[testmark]:# (garbage-16/dag-cbor/bytes)
```
83f67905bb3f7a7136343e2d41422c39487e4579094042434d237e294b3b2a435b51352b7330592c32475a56667b514d3e7b6a3627e298ba23622057
25744a592b604944376625335b41207b3c4d3b457e2650456a565a20287b50375c6a2d7941247521246f60412c4a543567222d682b607a6728436370
5434315e42294b2c373d5c415b340a74e298ba6f4f7c3d6f3646215b4b64617b6b35314e25453f51377e362a4b714e615c4f4c705678504e5e76273e
4a52765b7e60393276552c663a6123484a660a50495578725f6f6a5d2d3c3b48642126395768605809653052206f462f5f2832685a684f45455e4f78
2d2e4d5153282b75402e75613f6e7a3c64773378407b2a4a59570a684d652e6c404c2f5349595566516b49324352726d6455365d7653703254216f34
383659553e2e46682262302e427e390a22537c707b606c772f4c374d4a5c604a742c58322365493c6e6e57233163605223414c512f275d28452d757a
2f57662f3f50412d432b2ee298ba6e5430545927254825215d296b680a39445b232e7870762c6b2b546b3f6272753f724a753e2c58597de298ba476c
3b3943095c407a3e344a2372452c2d4f3e637e2a5942416133640a6f657c2e55506d3b6534706531422d5e3838222f68352f7e7e31516f2d4c227137
5f26472a21417a2a422a6858732c284d687a5b2c500a403d4c2e3526504c734b096c4e45406b5b712e70492a785b296e31564e3a685e48715459697d
2a2d3e5e763b5d5b497929503867617b5372455d75566b317135596460644809662623724166285337304d2356277c5143262024663b506e6d615e7d
75716c222c4045290a2a4754394f204d523d5234442a60542d25767c606551443b35612543773573442375314130566f38434e2953354b7769624470
7e2b29672f25382c48253c7350246b555a743b6f71797e57644b71627c5126444851534e5d21442b47476241525c7c462f6f275423373424537b2260
256d26303b7956705a093f3d0a0a4545227c6422276c3038534d3b584e50447772e298ba443f4a223a3b344656583260303260093b7e562252613367
457d274669493f51767e4c25622a3134665809e298ba6a4e4b3d4d783d4a5c6f564c75693c220a32544342286b36427e5c4c4f446640753134566d37
5c29322d28785b616c6d6360252722416b6c61643a4429417044793446606e757e45447c772d3d2b27785f4a76755f31753a7a3c7d594159256d5b4c
56222e4727e298ba48576624767d277e5c30524c240a5c62654972663f3e6d6d266a5f6c5c3338415c7b50404530345077214f3a5f76662729782a6c
6c6b50e298ba2663402d4e504d4355284e09297e29746c50225f5471595025670a535e6f2b5b6927655c5b094e2069697753354325405c255733522a
545d240967743c4d642d3079382320425e527d292f393b5a575b5c3b48473770095154703b645d5524207922092b3f68732847765f772b3044277578
412652463b6e5b674b2e55664c23774532254b696671673d4b3c67093f5070432b6979372460792c457a27473e3244462b593b20294b237d2d424055
2e26316763462376294061767e70445a3f65514e5f71783d3357327d7e4b71372b4c7342367249614044414855222c246279496f786649676c23686f
79734e653645522446207740215a2a284f75364928722c387d2d32384767463566584b314a5335727c60503f676a4e233269216a7950516f32402635
65634f573d353973347b7d7c6e7d2a202d35604657702d7d252c37265f627c64226c637c5c292d3e2c514c715d373b58277a3b6223292d7247742c7e
e298ba30207e3820485b55375877406e64245050317e6d470a352c217363435f5f656e6b5434326c7c70795c4b7d656f752949374a3646662f3b2355
54653f7a405d5b78302f557e5357505d38753e6b7e563c337e293a393e4b2a7c3b4c6d290a355c6b5d503c7a58426675295f5a554e6f63385f27484b
4722497a647d6f0a0a3d6b44547a5f2a3f667b21734d592a7221547d3537592aa2666e2b3123664dd82a58450001701440ccec5e5498ad203c9c118d
d94fceb48e691f2b9d58e333ed5c41fcd2f5cf89923c294e3acd501cd6b755af6f7e5cf1b37f7d1f85ed6b4f2c59f828517958a31f782b4b65273426
4b587e3778214125284856366a5236445c31655a2c684038276c5f35412c762c4860356d5163a96139fbbff92c01f21afd2b615bfbbfe06fb40a13ea
37616e1b00129b20bc4c0f79622a48f5624a4d787a317d78744159675c4d766f2349633420324a6d09437353594e506d363a4e665f25554d56246f7e
393a397641737b75334b415e4120295c776a3f7a6b23356961747a59336b4c4a2853696c2f58384b3c7b622c5a6f610a653f42406975252e6f3d2a2c
4e7a4c6e6a61756468224d5c634d214369e298ba54563163685951f666454f3d73494e1b0005608f2787d69566556d212f415c85f6d82a5835000170
1530087a7a5ebee6ae22c227a54908f1c5fa690cd62d19dde828b17d7adbe298cb958f0825c7980aa4c86a52ec27578e01bd790c725432273e7a3779
2c58283b6748445d5b6c455a392f275f556c22545c2754267d5245262c55452d2642553a39782f68207a6775407431270a386b50673e447e5e753c63
373e486a796f2e5b517962555923437e6d252f325e4109476b585f433d342a0a5d7e51483be298ba6832537b7d3e20303e64462c2c37772e4e635d2e
314b702b7b4a53646d254c2c5f41613475285e7c766933296d7c7778396e3056606c6b307b24612f742d2b676763556c507c5561286d592142493346
7b2d4a72472f563e703d686365423d494a4e3c2664795c394361377b48615265642f310a326e6033286a4f2d436260494f29577550330a09744a792b
4f283f7e57436f410a2b353c593e3e43733a732a21093b0a60382c514c420a3c7a257d54663770704d5237215c31673757646a4c6c37385d465c5949
3a22606f2a543e49794464697673573b4f6147285e71292a496e6d28602562627e21585e4549653f3a566f7d73205f534d7b3835365033314e4f3055
787070684e7457434d45354b722a2f2f415c5a7529494433244d6562435a3a63624376255f7d51304a3c264e6367393a442e7c656761755035553431
646d096467745b0a4e712150523a6a2b6c75627e6f2009242d256f50335736274f4d3a4a6460304a39785c7b28465075395a4c2558613c46403d7d31
42535a252c5224095e302f4625634c684e4f77785124317a544c70316a7d38692b7e6c425d746e47647543563b60203b2e315575292e7879567b7c5f
66296a44513e0a5d537631526223215a5d30632755e298ba472a755c2d24452009385b757d6e097047095d6222646f742a743162203e7409663f4871
71537c5041723c2f41665124474a3d47692d26435a4d69532667435b694962287136666109400924416363633a7d54423a33712731455c4828553472
4c4c2b526c4d726d7e5677486b6f682f3b5159263c6a267328595c4e3a376b6354706c784d55453d53614a3e573d5664685b6f5d7139304b3b427569
094f31e298ba78355b76593372607b767142714370347d267d68737d2c617174375f377c74716d3d2a4d266d600a48222347324656397d616441383c
482b5e5d74434f5e4c0a39242362203e37323a49206f65534f61676724665c58095b71554e32455a260a266a0a345c462c3b523c653f64666b592d53
2a49323b6e543465317d72504b382c66517a7665762be298ba373441783326642654753120612b5752287b32705023297a415433442f7651266f344a
405921256a72555b3b4e4878594f7443347d2d62317c5c273757393857593940605973545a54e298ba7237220a3b5f3b5538685455407978480a5b55
4c714b46487b29626e7e63354c66202155252936477b5a703879315d5f2874294f4209582873486635426f475a5e470a464a4b0a3634754b36747243
28744d34495253376726447e283d362d7640482a7576392e2e722a696b3126362e41353669407e51494e64382077772c5c5957576a7a4041397b626c
454a45632a633e6a4c417c3f6755482f4b2a522e6c6e52614b643f3d497935273c656545355c0a52202438504b47312a4e7758447b487c4929632d44
392b5a7e4b4c432c39522b29646b4b312b0936526c3d4f3e742f45446f3c203275792e5b5d2f6a345e36727429504a6a453346357b44385474677823
6d3a2a703d09653a414a3171265124283171582d235069383123505d75482c4660447b3f4147717360364377450a7d204144734b4e725973532c414f
54396824410a77595f3d334b42563148555d5d2e58567d46663de298ba55404e3220285a5562537ee298ba763b3a487221215e445e444334094f4262
453f5d36392f3d6e4454563d243e6074255e2256446654425f4724244d3c5f322f4145233124476c205f6c6f4045405240325d725d466a5661684a59
705a7b605452342b6756665d5b0946515a3a6e524a55452b485e456e2f4e7b562c5e6b6e564c574a567b2643255b3e5e696834306d584f5735362721
652e692d715a7c5a673c52777767297b545f403120232f6d59342b3b634e71093e552b5c4273370a53e298ba6f532744577064217c7d3a494f246c5d
6f564b796d693b587c665174092544372747334a633e7434774945493868202b293b204b52727e6b486539594375562636766c765970532448417e39
235641535d7d2965296a514d7d3166e298ba485d473354443b455c7309414c476d58455633585f7a375a3f792a232a3b532f725f5e2571302463656d
3248754a392160374e6b363425653b3c4a4e732d096b755e7a60404d342852583e3930314c27417b3e21664524497974265728503e65427a4576473c
7049552a65756e722a523070327669273b5b55412b5f6a644732384d466755476224507a505a394c266e4e70e298ba4a7b667c5d6c3e252634747829
6f4e665b5b28343830645154515d420a7d240931524f3375735a50415f7277533c5b382e5509e298ba2a7e3622762a2c64643021714034613e536e59
63506b6c3a5335494f777d647632273156544931522d4d24672e44505e743c4849746f3c292634655663545b30777a4e3d484f455d7a3a5c374f6f57
647c3f547e2d7042322f325262237d6758332e4453577038687227382a4c4725485e6a2858490a784e293f6f2e4c6e68293a277c3433413470726073
48273b35747076535d667e2f24455f687e50502358264f4a55725335727132663c573a3f647e3c5373256a0a266d645f393c78583f5356334163212f
496d7c3c347a40503c45402472756836465e0a7b77665a4e2b596257245e54435b314f5b6523693b402c23582c7d2c694b793125726c630a695fe298
ba560a266049700a33767c25382c29455a2d3d2f4f3a3e77273974213e6224406348727b3f652031276f642336680a2e2a282e4d62262b7278503a72
62313643455b736647646365223c216f584f5a587e4c632c6277e298ba6d604643295d59400926293425542a4e092d437a7136793a7250723d7c5e33
6a44256d303b56575b5d6338393b47207c612b7c37667563646e26623a715d25254d62624c36623e2d49715e6073773d2571356d7d406a4b695f6637
264349352569486d0a64347763573a252f7d3f5e6c70424e6035636327762f20765229457960276b747b2339416b3b7d54495e3335727540774b4c3a
653a6345484f254e7852430a257324765240313e752868786d4e63514e3158707a616e32246423683c2c223e5340654d53275a647e2e2f683f784645
5f2f6f7e616e287d70606e6026643f5b28372b3f67524c665f21325b7c5c217d534c53482209433f27492a2957733e6733442b553e2238e298ba685c
514431593f676f27215a34595f2e5e593a2d295d29614077517d27612959687209303537647a62202b585845550a794e24605b62357a46607159383b
6179093862384272435b3879734c31213c096c633c64447a6253466e6629312a24594422544e746d2d202e6e33433168443de298ba2a6a6d29627a7d
686a37615961325b725c625b302b5720297528747050357036582d38215d6d41462e28633c303d63566b7de298ba5b6b524c4f2b270a2f693a2a5323
337a7c3b37423e34542545255c385e0a2c4c6e2d5d39314b664773535f663f466f69632d34733d7e41762879207c553d7861766c7b5d6b2f4b2d6009
4e456d5737623d3a2c2f7d3d5e374a6f5a59254b312d6b4b3723772431576a71302a20702f24736657273d5b342b4d224c273737267d4e492955557e
6231327c487e3922223d775165284f0a5c31657b61552b4d092e0972696f5b257a2f485523476163673b7a705577784635e298ba2a6b212f7c38536b
33284a64534024745f2f2329305c6d5e7030247d4e5a3f346369346d5621435f6f3d466c4d6a607651294f735153625f210a536c7c54546f7d634133
692b3b4c425236095f785955435d3a4b7b58763b4e7a2c5a5d7753665c335d57286f492f36512c5a730a715e692c5260776d426e6d42583943345a25
5d7d3e69566b2770402a765a2b5657672c59405562323c564e4b48275742354b376f2e26267c5677793109093f0959747d4b766b3b6e5e2c44407336
5776332e58456955550a4932352d60642b2a2439484b227c4857343f55204d5859253b613d495f743f4449466a4d745929377755702d48632d426279
4d68266a6c74604548426069225b3e322a407553672e2c4e712a665e2b265b4126493a3c43325d783446610ae298ba3c7a256a74322552766b607ee2
98ba263a633e3771490a602d4758592b6f2a6b7351545451504c7225243c0a4634755172602c4b3b3021316e687c354a4a2c4969207ce298ba305709
466825442d52472c7376714f78583c2724382a5054564e405f454a6b3e6a5358776d5b51613f3b547b5d52585e403f7a6b6b3709686d514737472cfb
3ff8b221e1ff30a4a165e298ba7842a16376416ca1615784f5585d2a5201d8c8e9dd5e33bb1ea352ba381310839c32a6c6775d1f44c7618fbfb7f38d
6a3997c4b35a8d5fdcac73c485868002f98e922cd4019525f279dffffde033f5145d27c6d7f421ef1296169ffcd3efc6ac98615e2e809083dfa3cd78
4d7ca8763ac58bc98aad967e0f2c46366ba39b8d7867590ae298ba4d7c81a26743455e6a4f6164fbbff983499504b44e73414932312d79705f4a4c34
6160522478202e72f4
```

**dag-cbor CID**

[testmark]:# (garbage-16/dag-cbor/cid)
```
bafyreifezesrhv2arou5xyxhst25w62heatiwrdedxlrauaempvbjludtq
```

**dag-json CID**

[testmark]:# (garbage-16/dag-json/cid)
```
baguqeeraxjur4srzwvoznmk6j67r7b7xfasxmat3lgt7rbxljfisd5ffxwva
```

### garbage-17

**Bytes**

[testmark]:# (garbage-17/dag-cbor/bytes)
```
a660f5617b5911c05b330ab4092d5d21606d111eeb8ba48496fc7db6e76e03871da92732ef5d815246b3cb9cd7b64633932e030da1932f07ff8329c1
0e98af6cb212a51183eff5fef3f1ac76827d46c8780759094cf8c4fbdd7dd743cab2fe4a9ecc8906bee860cb8f5e1ec9fe6dca9bc9afebe8c39e8aaa
ae94054603f2b745299730a833483f345b76e865d7e9a4e96d9a80d8556ba6254b22e6490fd095ed9373249885b5c5b9dfe865bfed52000c69d68862
053af15df61558b21256302c44cdfccf21cc9581c033720eeb0c9160ae00790f284e41a744c02f3e23d0f5240f0cb9ea463cbe5dab118d897e6bd7b1
e170ca1e3cd08cb17f93cf8990ab1e21445f6777be360c13a55e546fec7643e1da83d76e576b71b752b4fdb06f2ef26b34228fedddeeae4c66ec2295
2c7a4f721f285b8618754f596471efa4468ae160910bc864d82dab75095d966e77fec9817a1b84b39da58766f58c94ad411139ea1a9b455770ffb6e9
968ec8bc05223b875ad3cef522e921982abaaaca906680068a5658b79f3f4199fc28ee907bfc171d0f83a83f80af91f587e550f94f84918cef31951b
3feca992fdf8cbc628df2c4f13a79ca86ff8c420b8483f97eec7ea393083b26091f54ff3faa63b0a65c797e19b4be2e30362aa0aa742ff5fa802a211
7554441f10e5d1e16767c1d374bdf0bd3003f765e0ce717394738671fc708a3c4eba6fc61b529f74da6cafcf27e94762fa09f8fc9f81771402701fae
223440101f2cb1a0fee76165d524b347a1457d45ea0de7d1584b044ea1e3eadadd803ef623f071bcec236a0b5e9f7c7045451209f6155f47e7f5425b
d6298480fd627e5df89edfbee3812447e01bd20f1099826bbcde0ff6fe51451eb0aa90fdaa86d46c42d59bee12a01be70e2ad026fd099f9e858d973a
d03f25fc944489959887fb651b039757c819435347355b8021ec7b111eb5923b8d442b3f5113e5dcc03007aa2abcb74353836ffb8361e89116247202
1fc0256a44927ed5198198557653bd91475dda481392fa6c97c3004331ce0ed3f942b8dfa40879527a816e09514b40e2aa96af7a3fad2a705e0aa9ab
4df095d0f998c8f84fe7d5b95fa31131fec8bb1997f7f23783ee319e1e612801332e2693569655ffdea38b5bc466bb2082e193959929c5d8fd6bf036
6f247ec724789c0e1955c4253a2592b03d7c44dcdfb9b21444f2f0d434f1b3c69ced92157d2fe09733d1c9da8f4497c981e5815bcf3660b0c838ad88
57602ed60537a1d22750a594582a60604a0a4f1efa717ee7b94ada827cc356b8e56cd69d944636dd953ea5cd7f89ac52570fd6656d198c1b5a5c3ae5
f32134634e167246ebd5d6d29733ae02dfaa412483b0c4893723a35b8051ab2d9dc6659b16c81509979f6bdb5dc3fc26da3438e428eaf76e9807c9a7
ddad1456d00b5d2f39cbf666f214627dc10d3affa8e3e07891d7305353074f68e3fb932a5f8548edd7d9e71dba9fa9f2b71ab56d2b3fe720d69c94e4
d20e6df99b87c12ec853e13f01d7453d7bfb9e102158b4c93f97c21fc8b4faacc6d80832da6169414ddc64aaf416d88f14f9e3ecbbf9d72a9c58ad98
db6fd49f5590c9725f3c9ecbe13be99f9cdb050b87dc2ae1c6e7ff9f2c67f5d81f4a7630c7ba5cbcaf59ab6e59820046c5d2ae806fdb7bf7a1a11aca
37025499ef00eff51946926b8276a76431bbb252b14c76ba8c6ab85ed036b46989cf60da3bec2caa9c6bdbfd77433aad579da66ab94417d5349e678c
3e3d7398c981bd2087bf7d95a4965aa27d7fee801668da0670858848bd16d13b2a873d99ea505c6dba73cc8675f695c7ac8aff6cf4044d4cea107026
e151bb6de6defe0db8f7b2faabbed0c8fe427c146a4411aabf3bea02c7433d45908d6b1b4ccac258098483469280b77b6970b3e26f66829b7b300a69
fd933aef6db7edf696be8767c322e73212019bac4731ce33401cf0813a823ea072fb858e04182643f666104fa20f0dfcb488ea3c79dbdb41e199e3cc
2e17ce6acbd6b0e5c25d1985a3e477d77eb86a020a4603f69121191a88b1284fde63f154579687767269e74a110f85ff10b3cb3a023e811ac95061db
887496cf31d5642ddfcf74e12cfd8d3b8dbc3f1e0d997c986407671840cdd93960d4412dac135a4c1139da78b63690cdf07baf719b55d6bd62072936
3e5700f101e63d258ee357e91630cd308600da046562b04b00322d29a6e8b1559d79cbd42cbd99594d853c672942079660ed763dce9c0d3c14210fe2
d317bbb805e840013fa792a5ac68437a0a1d50a9fd9178a80115f6b35d3959a88891865eb71fbae4d4246832f9e843c792d003fb1c730c89a522b2c0
a0f0f40cbc04e657ff01313f9735a2e075ef4c5e382b27c50138b557ba7c5b22628b57c506a1023c28a0065d28d8911a7f9cc0ceee966e951d824382
b50bff6aaf588441b4a9c43d68859e62480d7fdf1994184b61e20b321cf64f02fd487f08e09da42aeab5d0e55059cd0765df2d4e90ae0cd61f3c7ed1
474bc3eab2c71a5e0e8ed42556e3f7332e689fb073dc315d1fec59032f081c2d6909ac68e427bd3a2a52677dfae950bb919ddb19332206a5d24a2c60
e29b51e0e3ad11367b6724b53d55922673ec03a1e2f6a916c52b0b58a1ee60f20a0beb514a2669af68415d9a99dc7aa0767c60d54ed47444a782bf1b
f7c6ce3a1d8c192ae426fa037e70697399e613007760cba1b5da2c15a84b2f5da5354204a4e7d3a04f979b399499e13d2cc195c8914160f3d62795f2
76c253e7abdc1363ecd43b8f362721287dc048d28dfa706f73154bd3cda6f32c509391403e9db5fab5f17ea0498738b1e6b316ef2624c048e8501580
699e095fd728fc3d571cf29ad07b0fbaef2108f0d28b8479f244978bb462e02224d46058632f21ae467be00358bdb2cb561531f126cc9d7c148f52ba
db5e16cf5caf74103c25079bd160611069e0da6f5d96d3260c4d8aa8b8572cf35ae7ca204eb0b6c31c65ffd2c7db53f26e6b0364ab0de5d6a73dade9
4b0e9eb3ee1ebe2ec831dc67a0c7b75920456e43a73556d05f9e36d6416feda118610d3bbf4ca0089fc6390ce31f45aefa6b34d2cc6563e818ba97b7
ddf5f6ba73a16795db8beca2a383f72f665f152ad16a7dd0d5a90136a207b7e8a12c705b6e80d381188b1306f4abe83348aa66c0de0e4348757a9067
89db2dcf371f1ce0aa22393d7e6b58b88940e77a0b5193b52f4bf074672caea21d60aacb2001ae3d70fe290783b9872868198c565c2f598530617258
d65641aa5ca73416d8c3d70e96bb6af6674f6a747bac9f4acd1df8d8bd1b1cb6b82a46184d68203391b8db44ecd567ac1722ec4e415d77288f69ed9e
ad84674a01085e17fa45c40f3f98ea5d48f1e3246a75f188050b313c2a6e30f98db7b4e41ffb6eda818a631ce9687b9d4ade8cfa968f4b3ec37fd7e3
56552e22f00f08b13b263c601bbb7c52134b6b65bae8db4c9c7475f6d7c1cee9140ef8e09b86867ad7abbe745821fe4c67a9ee8bbbfec4d5b10b7b5f
fd303824fd54b1814682c8b65216c8b665d1938949625cee28d8fa2e6a3e3f016bb0849bae86cfd2e2b72e80a9c2354a90790fb015030962967535ab
02f445638476ca0fe1278eb9cc59002891096572b725ae3561dd4e22027e3e479b7f4b3f4a313293d1d3b57d0b397491875e09eae1849631559d9de9
712cc9433628b2dac3354fb18850d83b9eb093ea6ffd55039648c30c2cc8a0b7518c12eacfb01226a662f1eda43a805d74e1a5773594805fa7321cbf
449663c7c80593cb6b54f070ac48708b5f28bbfa8f32728e45cbd729a993e5916c854342d021071a87d56cc5144b7ab78cdde00df87faa8c32615e1f
69db78e6ad371daa687df3a3059ed687b674e66fcc0e2d9b860240c7fa8b19a3060e43249c5f13a794baf60468eb5f89d3c3ab1cba0f0832b1567b21
1c40e4b66e44c5a6e9b05d1b5791b68dd336da05b4311d8d68fae785aefa77480a5928502f6ec7b359bcf1e8518739a31714155b0cbe789313c87fa0
bdddc61600bdc75c05a5cd1cba54108e6fb4db77703e9697c9709db0ab2c357d1a333d3c42d03575265495cc27ebd28531d1c408cf1a0e2d8d77afe1
10e037a5fd5ab5dc39830e5d22dc55cfd261d6f845ea0db11f2b8260a1da8652c6eeced318454f1a9cb4b713b2e20a6efacd93ad5d2c479687afdd09
7dc2ce49ae58cd8aa80f2f6be6c4ed03bce34dc002f4ccc7fcec543318ccc8acd36a28089566fdc1cab83b0455166a82878c7fe80e6aeca7b994281a
de9bdca2490b702c8943e93481dee31ac19aeef1a96da275ad8b28ae657f7a0e2658532f09f0025325b7fbc2fa46deea8ac9ea52dfe616eb2eea55ca
6810e7cc8024f215e8e6f8bc5d3bc9d4120371fe4538409c63e5a5cbd424b99ebc1ca4a7d4d3758de9590d3b47ffd5de7bfa81a50e997cb7433d222a
20023e0c57d78a6c0539121913ba721761b9400414310b10989f087b9554b0412e0aff54f13198696972482cc04d06ed6aed949a5f7c2a25e07c7033
743f3f8ee2b09248ebb88fb9b4439307988bb69ec9eb40cd6616de88615b7f009293686193a1e0a56871bb3c88e9de8dceae71f74b70558cce21d796
8fc6070b719922d7e83ca9b2a89d05b0082d848ef17af86d83b2dfcd3a1ba82daecbfe92fda3e4e41db0d463b11d64a77439d622cf485b46d565dac7
17023ecf2bf744d45916d79cba4e35525518b08b4381f2ddbbf0f549cc6dff4e429e7bff1b2cf2b31b0bfd6851d3f0c2ea526b730130a40315da8250
bad24b429fcbd5d3b7670565f3af3cad237fdd79b14345cc8522b8368aa3dacffde0b56cc5f29333049f22a11a93e8c19d3d1597040e765883fc82f0
ddbd8bade92ab806928a66fe2a80a5845c67d0139bf3e27e75d3218f8cc365979d22639a3afc1bbb6bead547a6eab0502fcbcfb1bccc15d12bf09b9a
72ed88432f9899745ee356c17bc9de98104f47aa8a19e5b45edabd7fc401210acc6693c9185f8d9392d704d1f8dd141e75bf6f09ce72bd75e973eb46
61150a41de2bff2e0673016c84a4ebe77552533cb13177f0446df9fbeea5f250d84d810f8ba4e933af9c75b93c48d0a2918b9721afb510d737e73e8c
a4a9bccb27697f8f330f0c8fbe682b04c1671fb86ec9654c9136dc65de2c643fe46b12119e0679d03100862f61540b3c061daf34cd8f7952c86cfa50
a05c3fcf2e175d2ce422c00f656662f975cac3e255d3e304d5dff29c07829419b32b526367bc08833a4288fac1591a38e17da5ec98080f8d16b578d3
42f6384a7f9d6bd9d21f5638ee649a513d9b619bbd78b6b63dc222b520ed7cd300a687240b3b91167c3c025f5f94f438557bf93f719029e32d2175b8
aa3ca34e2d1d401d7559143e3335cd1115fbd2c50835d23dec52a08d0acba116fdca7be9499522e5afb2e479c5594337f1e2d2b886e33f09cad7b0b4
683c152c12371433e5044adeeb38d1977e7eb39cc3aa32adf5e63d23a3da2bf4aad4e95b4509dd704c6383b596260128cc76755361d0451f4d9070cf
487da33ed67e35af49f75b6b959485e790dc9734013a6414c1097928e89b6ddf73736bdcb8e7403d322d88f55cb5655344cd6e25305da46e16f252cc
0ac6d40a43f82a08c50c298610ec1b277c6caafc1c92e1361f31246c1051afba8cfd8f8cf9f68d9dbb7254833cd1a19aca715a002ef2d630b930da18
f9270ee41a4f652d8b835e18e18bba988b6571c791e4b2c9220114c5dd19854e24da74cd72c9fea39b38a9a5f57219f0324634ff9671422113a6815c
a2c1be44d88385f218053d6588a69ba6fce7ea413e387bf9b4b4ec94d62a8f355bf7c39a0957ba4273756ce28535452ffdbe286fa2e7602ab679b764
74c2d0b1239fac2ec9626ee3358335d41c69ec573efdaf3417418d10b6f79cd6afb2014fdde5af512df43c93b3cc63210c86d5209a4380119dd32449
6244c2ca020b88d613c4e4cf1e712764f4d22a824b7bf4e5271918526ed057e2c11fbc3df61fb5a03d10449b2ea336b7eae4280fdf75115430f4f0ce
04a05fbd736c5107bb02fc997ea943102ea1785d17fb94cceed2872b65847ce57898387b2ebcb466619229e92557fa62040dce58280743301c1ab949
4030ebb6142b0d8e17c968592f1423e9820b7846093ea8a5740bd16b43440102888d0199cdbc0c8584b3c1611cc2d02f5c93159d9a8e0355de067102
398da4a4f8055addcf7d9b5aea962cdc498424fb5946c879cfe11a954d890f0afb4bd1191c3a61b3c5636350022f20c7071c6434cea34bb901c10fd2
aa257196d332fd707affe636e3942f7bd5464e10fbb8b4f1acd86f4f28d6833a569220e72d36efd09a0f2af297720be48a180eee634b742558ca7a9b
44e0980fcc84bdaa05a173b533b1470f843b3618eecb96387def5ee374b683e22513b2c776e2eb14d31bb80cff509918f8713e1c8de211baf02344dc
e368e072cce5d5981e82d6890478e2acc56675705ae839a7c92b095f62542edefbe4dd09c6af78a6c65bad2eddbeba7d74933122f7e12c570ea800cf
7b99da9c511dfe230a88a9d0bd5698d63e284739aca3cdceaddfd6901cdec02fa104dc9d9f914406aa3ecdc81968de7359bfc0764e43e719bbe97cdd
d149d938d76d275dacec43b0ae7ccb08b577dfd7636b3373d82a58360001a90215304f11b3ebc96da6055a1cd14f05e91c356282997f82acc780922d
f170b51dc39487cb69a770623094d536ec0f084afa42647c306e72a6627123fb3fe2a039fd5ff602646677245ba167334f247d62642bf4657639642a
391b0013df21e7ba12af665376566c552278575c7a7b7e306440322a4be298ba7a616b496177253e096f76232c3e355a3e4a58284a407479757b293b
45367b2a42324a6c4d7d3f722d4966786c0a367c415d67306c57424f7c213355323558592fe298ba6e3c612852736a4e2f485e4f737b5954583b0008
10157600c18278183c7754497c4f615a6f235f4f377a52595e763246375159325831da02a73427279f57a9bfe38975533b1e37247bd103276321e826
fabe8896ab125eb5dbb28c65960b2415114eaa1ba91e3f673126402834724f3b0016a42fc07f9e10
```

**dag-cbor CID**

[testmark]:# (garbage-17/dag-cbor/cid)
```
bafyreic7q3tnctze3nmouhal375cmsq76eayfsqp62srlxjb5d2j3ym5ze
```

**dag-json CID**

[testmark]:# (garbage-17/dag-json/cid)
```
baguqeeraybfqgviqwr3kft6v5imyqsulbdim7bs4joxaaezhgj62lyk7yqcq
```

### garbage-18

**Bytes**

[testmark]:# (garbage-18/dag-cbor/bytes)
```
81825902c4e2d3c31d80d6df2c0853d9955dde3884a740960afceead19336a371003d9a9570b04b5cf5e7042a55efc3a725961863bf3b244b5baad93
064e266ca1e7d2a49449cc00a4c662119aa28436158951f0b310fb9ea1a9d44549b072d98daed3c13c5f9949594cd2571e556f1a106cec9bf02a800b
9fb869d43c195592bda4d7ea7977e5e5ad5520f2a043dfed2fe04619a56e744f2b04c8b0a34107b524251cba000040b114aa25a1f4c70617206eac9f
d2734f1639ddfafe38eb2d633b3801ea95b992a84523ab0a7dbec9995ef13eb90568fc280a47863f38d649b99455f85d594c9af3f038d0d550bc44cb
57377575c8ef4bd7f1e5a049a76ec07ec6ea1e8ea75267a19e6b105d0835106c942cbfaac5d3a1aa4ca78a171762c15e0a4d358b7136ecf323ec26c9
fcd82687517552defd23d976e281b6e9a05df927d4298c30cbf57438fb3a128c8a3b9675555bb17affe5bcd9db55ea8137aabeee9dc82442e76a353e
907782415add3bf108b12fe89152b16d300acb997aa54a9ef0a30ee79faf7c10604a0cbda1742ec53f6d2e2ecfd233470266fb07292f9e7b39413a52
d28beacc0b64300385b436dcefb2d628c4e1e5b4137d2b94b39221e95dbc687f402c469715d6b422210970d625c6e57e8adfd0518a71665f32395776
feb90540a4443ae750db04d262f9238d31812e219ec39d7ebaee91b44a2524ee7825245f00abc6bc958d769745df2031549d530a51a108c19f706b7b
2541638b8d82c499b749df6a658fc307baea4638376779d98163e8e4a20d6afd1627587dcd710b63e5151541c42e9afd42fdcda425736e95f342d804
fd9fe7cf61addc0c991ef5d8e4d18ba83ae17e81c88dd5b0617be8222cb7436747bc973ed50e666cb06686f0eb18880554015c134453e945f0530a1c
ee413f080680a2374900a3fbcb7b9f0d42625ccfd2d40f821ab7f4c6eb8d2f91fd09cc7dfa5b5e4c8d3e1f0bd85f99dedbc6631e0583590ec85f7a13
212b53e9b15f5e606ddebb8b5c8cdc56825c413395eb0046fdffb24bea7e70fd29c184197bba0accb2dbb961b81c0a6b4436e5d89a84d1eef50658fa
af13e6a5e57ea07632f030ba9ab8445e44089add6f5e8a28fa7310744440e86f9c1decd7b20a87a070c862f6dcf981536a94126d30deaf449f08d051
b50811d1405a80ea80bc0a10550e617930e8e01c3126a9ac080b80b331243c5d2e5e23296edfd5309583a29edfd8ed9578fa3806b68064a28118e77d
a01b231489f86ed5b77a12bde2da75c8dded9e8b63ddcea822f32c02183085b8c34c50fafa7aeb0a72ec15db117a8133c8628fb5445ac19ca8ca1e89
d145b107fd5288acd6baebd2b36e546db29d05038d0e2abcd0be34b0dcdf28d3670fd4d68d623de6fa37e64ffff2befddf4551adbe505beca05dfe88
8122fa97a67e94cd517ecc8208b6f56a79a8130ad583aef6cf40ee1d3070067b7e2db8e30bd7ace66363f5d088805bd55f812074ee28a2a45ad0645e
9e5a69c7e5c5d557c5348544ea1f8e78865a9cc8b7177d40eb55aa6b3f817f3d34a471274aefb9db6ea47851d912cad79ba852d4deb8924f8ec7f016
6452b92b13393828980b69beb5edd8a119fb7088f1d528affc77aa2fa58eded183fb4bdc8e323e86fab39041047c8ad4e9806f2b2151ff839367a9b3
c5c05618d4219396d60f72314dd63686d73bf021e457e2a3c768b045501a773539a04e08787f9f93feb3d5ac56a949f7b232d1aa6c809cb1c8c85275
af9a02cd24396040f5fb7dd6139b0c9fc04791673b39ad11a50c90dc7b57bee774b27368adb4261c8610e78cf6656455b65788180d61c95c4efc3db5
99af90b67331e145b83150065bc1abb85b8e560dc0f8f2ee78972ee14cdf037f9f2ff9b689c37ce85aec65618c113fd6a5456253279a13dfe00b4c3f
bd7e057c96d0c72acb0f10d875ddb34200670cf4642610250302c3a80589868008b16617c8a1e2b0a22e38306e77c7497a979506a202e842d036550a
b22de70b6ef2f435931ad2e7d280fc500edb4d4cbafef3b9d3a2fabdccec9dc5dffcb8724c003329e8722c5224c230fbcee626ef415532bdcffbc53a
f9b03cb014f66c2f479ef6a214d41317f70e8ae8e67fe137e5c74ad650bcd207a738032119a07ad332cf02d905b01feb78d6e37313864894315a010f
ebe0dde2f379714aaad4a98a61da172a21a4a60ef696b8e9e613e968d0dd3907e6fc03ff10ee75660b8d86a0b57f9b989173f15f1c480a178f874977
0a962d39850a6174a499f41ab4047b9bf9125ff73561fc7c68eefbe07f5d6122722127c200bdf9586301926abeb5e68e3b8e4f240fe66f373226eb80
101d3948d2f4ea29645a3c154647c7fbd9c695f801d791e3a1633b14632535a3f006d96dc20a65dc7a6ae06fd2e3bc8e037648999c6c0a046556f609
dff742e8c7a5a6c7e5f9a44c3a583dd2d3f46a34c33d73d7008dd2c1b5fa9a319d465b523a52ea94f7b538b4402cfe6bc14be5c5bb33e43629ca8d09
dea53d108fb7f4bb7c24a0d3bcf9d1777863b0f83b97b18bc82b144774a9e4f58a8bbc7dc6e32c407e106ce7f225780f05b1c86337fbe7c63bfc0cf7
8d06978bc0f6ef3972a4c01d226696a3eb755a3cbd4b515f63f7ced2456aef96eff3c6ce31241e478b67cef7bf1330e769423503f2652a773245e412
22e22b09895726f5a737d5ba2ce7ee7dc3e080406373fda204ec90e60e9c92779deb3f11a5e02f777673d474e172c40de1b1094987aff685cf79b732
d907b390d51e3eb25ec65c71908608ea2b34d0d8c5ec93c02880c1c6eccaa3f47f59c4ea791b928b6788dc6c4a9fb7fa05edb2a0d50a096f71f616a7
aa86a91ef9aa5534cb17fd0ee126ed6c51f4e04794c299d55de64e0dadccf95142f2446a637310b4bba08e662360101cbf81f423173bd4bcaea09329
ee20f87a68f12cd3488915b5ed114407260daefc94ac7ca708f25b2f89e24ca567ea9ad710a1c134fa4e97a1ad33bf1c6ed1d3bc1e7fcad8711fa6e5
e25b49ad897ae895b57b2554a7f05da266dd46782a2274f4026d57570a95a6e65fe93b6cf9c288c549bbef481c6230dae19241d8b918dc3f6189ab53
ca3f8218bab788209deaa8080e449618613562565d21dd084bec43ed2d919ad3c36a0e591771bc33a0386951a0a9658d8df67759f800b23c71c85393
d7504ed3b537d0495d1641696abef9b3181bb12f499d4965f68ab09a25a56202e9f5a8b77cf1c40694a4b8e411b04aeeef37b7f0d491f1f0d5597c2e
8cdb74edee44ee9930c140d01c264f6c2e8a4b5e146eb3bc67f7559ee8a6fd9312d551144487270f47ec360e8d293fa95eccc33a3b764841c7f9e02a
7185bcdb64e0f62775ed9cf05868b632c2f4d9be97982c2743f6d0817407bda3ad4e7d659458f3d599749f13c0a5adbc8cc385f73514e7be4bfb7fae
e567c2b698557e418617b4317a54e03aa02a76819822beb6997314c7f596676faf43ba4d8fd89b8d5ae6a264dd0087ab42cdcafbcee4c273df554cd8
2a4db48fc684147822c0819b992c0a66a4f7a6c62efd51e7d13c058e28907d723ca61eac2693bb470932bd8a7eddfbbfd943d94d1bba59e94b3e6053
64c478d80fa3acb5e2a485a383535e2946b14f2a6991fcff2b0624a51f7d98ef950ad5226e89b7b123dade033ce0bd5724dc43140d4c2bd801d8d30a
c251e61008e5f20f94ae7646749c3d361cc8ef2ebec4600a73a9e659ff7a348669f3919c2b318daf329f39e639835d9d048a4c9cd3ebe3e3bbbd95a8
bd0e6c6e5e6b22ad8c367c9005bbadfb21a535191d7bddf596b429eada0c90571ec96f93d862f3c7cab95603868e911426e1a8a09523d3599475f1f2
c16ec30076b22277a7755acb9342e0be65bd5cd3a0706331ebfcde78ebaf1cebf11259409343cfa615844d302154adc8ba81bde4bcff200f0851cdb2
8a054fd95560a195c2e8f62c6e189298c384568f57a55024a5d294957c91dc1f1c5a41a464cf18de8f4e681b380252bc99c918aa1440244deb7aab69
aead0108eba4da3218de1a2ae09a85e7e994005ca263a34906aba240e1e4ed3e3c7e7caa85c0a098eebfa1d3fc49a7b30b14a96e0c80ec415c651c42
b5046494fb208349a516efd1bcfb5bc145e328badcece18a32c2ad33805e2afa49dc914a797f757e00cc1e5ff3babbdfeb05cda528fb7449b4fb2092
19f9d690fc7fe40facfb2a371246b599ec4b5bdd6f907ad82ab9b7b2176a06dafcbf0d6c1929d3c84c679daa4cfc1010905ab13a5f69b351628bf525
37ab33b24a7bf5f4a5a858877d9cdce4425c501e046e3a776397d33909f6f11fa194d0eadbf7ee08ab415ad334aeaa6abfa361fd6b5b40fece20dc59
faff766868c4f4fa29d8179903fcfcc5ef28c249c7676fb3f9093b9ec7419bdfcf4ad59884e0eb257c3a22c126ac3df40dd34e500db5b0ba7127d01f
db0f56c71cfcf64288bcc7f2d6b33fb4455a5c076a38a74ce884f031c762d02ec02cd6050d9f45b91eb1fd50d2bb7e2ddcad5a520310af89b9b86974
a9134606e2f2a121792f570e5a6a3179560bea2d1917b9af2f30adfffb19c840d243e2a1a57ca194cdc1d174e4a19c89dd7d0ed99ef966fc45dc256f
a97b419aaca1b3e2ebba76fe2bab94adff49fe90c24e1d882f5084428a9bcf9a2f989f84729899c49972708af38c71d3f6ed577e4efe07c29f6375f4
1cae5af6833ac5699debceba20afc2fa42acfc233e24f5245d15c86703a497b0de7fdbf30490136dae1a7316546717403fcc96da5aa613c3719dd665
7812ffa2a16a3f500a5d4cbbed9dcf7ad75127089350fb4b43a423e8ed352ac47073e2af090e9e77e101fdeeee66abe148b0d587ab719aa1d6f6337f
d0af0e2942657e5a0bc9c337bb4db06e8554943674d6cb75fee72a26812ba6a2343421ee09f7289ebbc6075414b8cc44a46247b5cb99950237705561
8bad0f605dbd70ae70b80ee77a12d1fdfa3f2aed90d7f5aaf5309bb068c29dddc8ce8b934cfb032fce01222cdee4b39e00dd9bbbc19c1413d7ffa6b1
fed497f497c199e7261d5458c446bed7d0a24ae60eae05883e14c9ae45936e3fe57396fd6a6cd77cfdf3065f1939627cb0d049f0297f0ac3d48631c8
f19183c7e72834ff668c7d8bb8f609b4b0367d7e7282cbc09ce033f8517d6ff88e2b42289fe16a819a46b3a2b2b47e9a8f41189096c25676bf077044
f0005f862553aac4f5b5db7a89ea102dd716d2b22044c99b9922e964a314bbc35f1de0e83e0e877764ef8fdea6bd264c5fb13263882722dcb15a7d16
12898a091ce21970b2ecd28008db790b73e1f1728e7f51939e8d7f58fdba59702fc7940a875d32a311d7d3cece7944218a8336cce0b583625bb69181
9ad60591463bad19635db95606dd548d416aef2dcc39aa456bc6dd05f1ebfdcd44fe0e51bc5b50c1b98daa24f48e9a0119919a2c03e91b43fb2fd9f3
ff3b9e8bb272348518ec5973d54681c0ce436feecec8721316592ce012772c784edbcc195dafad5720c744c045d4ea6672a45005e976461776364e46
abb856f8fda29973f831b1ccb0444174acaec413c33de8b9574c30f4053bc1121a7c412766bc190372b8f0094ff6c7bedc7c93e2582e25e61aad8a8a
7b386f8ca57481cb225468406a8a78841d0c91eea57a00d61ecfe44c0732e6440aeabcbc551035a85f179a46aa283bd1c18d3765a93050ac4dfbd719
244ebbea6516c428215cccb3501d0e3ee217074a714ba71c6f1833f3b71f2ef6f5a556a01ca06f115b9c469589b3a44959de10a161499981d8456691
ddd368dc7b648eb80b2e2faa46df62943204b5ba2282c025c3e9181493e695a075d3c6b5d9a4ec2675ecf18e1b7019bf8357956752eecdd97748b919
43da5499b9dfe97951e7449b07c30ce686512bbe2eb2e9ccd7e12c2906cf05f91b7ccc3c310cb1bfd5bdfc7e02c9e00c3a990c9a76c4542dc2ea4c99
7b2a5d048a18bfc6c58938acdf388eb6ea109e3ef5d684ad671c19ba6528e62d1b6260006885445c19a94a602c23c7da137cf2329474ff0cbad1f663
862a71d1355028afac50935b7de08a8b5885e10e6b29f25a175976553b98b4586301dcfbc795c7ee767387dbad75c632df2a8bead9b68916c03e4291
70075352eaead7e15819324b06f9ef0bf09422deb7940166f029a559033df5d5a8f7115da43cae6a8f22fadea33c81042b0a930a7d55d70d70411fde
523dbf33480d6b08999175bc2efc9be7ff05942d30039df546a8e1e386284aca06705af878c19607a8afeca41f01a2483d7a91c67e40035d4892eac5
39d82a58450001551440448043e839274cbf3365fdeddcfa89ffa14fe1d4c27398f64f79de835f74545caa4a0c9325e65ec53c26a8aaf24ff6e29a0a
4a4c4eb5765764698d0d20536d4ea663e298baf66467274a2ea26134f4635c2350a069723949662425356877f66a476228244c2e79472c6c861b000e
2aadd421984dd82a583500015515303cfd743b545e993cb22b5869b5e449494eb2f70476959502a414c410d2178e312f9d714d407768d1c95166d681
b0192381f5f6a7606a522125716a4f46413134627434f66309362df6643c586170582c1dfbba5e5232ec84bb4b7969ec077c722e95bb719a6205aa89
e4473d9b516a500e4ad41c543f06d47ae020e3644a4540633b0013240cd72f77d466767a5e40487cf56a5f263f592f522d7b0a7a57dfddc30abb9571
cab825f743b679efc98fa14211903f52841b001b4efa68609d71694030503e513720725b4081f56f657c34397a6972722f37096665394ea260f6646f
253e0afb3fe6bb63b88b03ca782f465d73e298ba692e2e785034332b31755c3d2e44e298ba65095b5c4d79735534745f302d7b232d30694c247b616c
6858bb32df8ded0d28324b871c533c5c4ada293072677947a2ce4d047947bfff929d98266958e76e539008664146f2bf214d204001dcf2ac970efcde
762284502ca7b7970ed77d8dcf58a68a6ef82a44e12b49b5e8a34e6875c5b51fe2c6d93c31a02181250fcac05eab7bdc977488e534c21befd77267dc
b2ef419f7562e67044cc5b277eaded3caeec6037490a4a3705396a6c3852ff7262db5799077be159ebee9b88a116719140f4abb69f02d97a455257dd
94748f47c506bd0c31db
```

**dag-cbor CID**

[testmark]:# (garbage-18/dag-cbor/cid)
```
bafyreibpbcrbcqof2v2jvjmjkmbc5y2n66xarj6wniro3acgphnwwypu3m
```

**dag-json CID**

[testmark]:# (garbage-18/dag-json/cid)
```
baguqeeraekpmrlnfyhqxjyd63kr7izrvn5233kdz7rmowoyf4gnpoegj74fa
```

### garbage-19

**Bytes**

[testmark]:# (garbage-19/dag-cbor/bytes)
```
83f6f6a562583df4633e2573f565262d3f3962590664268f09a9738d038427166c8be4b6498b62d29d0b834986ee57d7026105bc20559b7ab24207ad
0c4f185fc623fae41b3dabf10ccd1ba4bae99dd75b78934835188c1608e4ba461aa94c701271f2376466a90d7cd6b7d385d29aaf4aadd22f956c7c02
4249c59bf848d2dc6ef488ff222c288bb587bfd4e2001c7fa29eb2113912de04cfea8a03e049c9a3e3a6a2cf41dacd4c8c0a952a251f005cde4912bc
710c2cba7c68f6cba0b069ff2ac0779eb34210045ea51a252376763702275481f5df1d715df4e18fb7b40a3bfa739471753219a4ecd23a0e498d7859
4f67453b4c88d8645188b0611a8b1c1e2e1f9abe7ca89967f2f76f6e70fc35027d10a6b43206eb51ff43fe4e55abf8698b02e6fdc205243b9841333d
b5d32d03949169d3de9b104351a3cdb6b4e6fa64343d40a8bf64b9d1d0b5fa1e21737a092572d4e034b101ff137dd7872e4ca510d358505b850278e4
f1c8d7335c4c02a48ef735ead7a5576a493cac512205bff800fec8373cafe4c4508d8dfbfc0928b64cb202d12ecfb6c6bc9c885432a10de0dd72c026
f9263f09cfc87ea6780d78cc8cc29b6cabfdaba132b5cf001b192c48bdb849521f7fcdeb0a5a19698db9fa74244f60ece44a69df33d8727d83f6f0fe
2e253f8571b1cee326db9631790bf8f4a29178efd72ab6114f6148ca2d38bf948ccfba6a5f421253b8bf19b103bd47001f5e29c1bd34b0aee9d1ccb8
8970dd35505309e5db08922d64796e3ff8f42eae36cd526b4a81ace8878c5e6db5d7dc6f9ece79fbad46400e29a328bc1db6ba8740862d03efdd64a6
941a7cc3c31473110537306d8883cc49cd03e2ec63a7d200d4252ffd317ef523e38bc83b86ec630129c7128a626c276c8cc5c75d5c751d76714b28e2
670a65b0609773c2382bd7f9990848694506db2fe5f98b9f35c27d8b66aa3a7be677ab90b1f64598ccc2621e6285b4880538d86b9be30723e6d60c5e
bfa618fdbd527b86131c362bfb2000c1e688ca290c54aebfc56e884d14b75120d1c39d31df39ab9917d6f44db010b9b4729c8a579c56c524dedf3adc
cd0e1fb2a38e255c7bc301290c731cdf86a3fcd9191b25c8d529f81149ac24541c6cf0435a75fb5118031d9541c6b46e6d37ea1cfecde349f85629e4
09ecc19c6b87626e1778f807a38aca670d2a81ba9bacd565e206c19960c70e643e35e829dcc28d7c9355747932f5c5da3cd3a95ba06c648e45ed7e4d
1d17c82843eaf39ee39e0f3d32eb5fead57b3e6afb0bd89e538d2d7704d616092c07cbdc708905013e519e46c3dd8d3c2607211c7146c5ca56daed51
81719506bb3fd03dfc81edec1840b1680510a5c7382a54322f66c279ed3aecc2260593ffe5ee87f25baf333832a9bb358ea1616a2ae3ef1f1907d7c9
8ef6fd412bbdf237a40dd0d5b663fb3a9eb09ff6b3199899922180fb2f37374f63e116e1fedb24f7f694f455f08c9bb8aea7c9c7d23e629f1cf5464e
325ce7304c3545cdd1a136cb2bda0a84f002ed8be9bf78658aa5a73e4400cac8f33748a1ce127bb27742306c311f3003b039b2b407c2b71a9d351196
35527be65eca9cd21036282a28007418d27ed0d420b9518f47622a6344b1e3b6b05dde5d8fe9da52ea9860d38fa6bf44f2cdcbd80ab780c529226bf4
04bb3f144ba703fd9b040e7bbadaf730ba9c7b4e6da0de90f9ad9e865ca86b0e5db38673853424ec23e4d2980188dc17e13fc044fd4646b808e2af0c
8c6e93cd6008d76f04064cf0600589e4abb8467d1f122e7a1f91ba6b4a91ee3e5e4db2421ef0a9fb5428b64133791c3b01f7279969e7c0bfc77fde48
ae670568e1284188fda06ce42dff0b714ff25948e8ec7fbcb7bcf50b8218b7b7368ecb2f56cee4acc44b7ac9ac98b6d4457a9ef56fed3bb0e072287a
816ed35ffa3ae4a5ad9eaf10886df9b4d14e54806e9b89e3ea2289d8c4d47e321794838e018a3862990a011ae3162568901ffada9b5ecb9f97518578
9c56f6e2ba6fd1c305a45662a81db51c72b6439c31417b5aa356b743ff79d05bed162a1391fe3fddd1491a647abd787f6acdc65f592e44316e6163b8
ad166035bda63ecc8d5818c5dd9ac5a299b9abec700d7efd55611768ebe8f79994ae328f9d2d87638fc16e700d35d23b9dc7eb6a0c746139eee3e83c
91ea8ffacb3542209a83eccf05ea93bbc1a81ece507fc35307bb7c4fe2256665b96c99f1d4524e00695c5ed79f7d085d53afb8f021624e1d78f56d11
20d23abe1b4625b3b76f0f410e41f28712d75c81aa51bd10ce6bb14bf26ca7db612e052c08a36735586a676f6566a260a16146fb4014e2310c71aeb6
613f590d26c15e7af84bea582106be69ee84526eebfc05e6d4ab75ce1d2a1eb46e2efa0b68cf73d8029677203a0622e6d3e9908adace96d38a645959
3534e15d3f38e1fcc706becaf7dac4f92beedcf4e5ecb06f689707ae377cf208337c63acbd49186184f73444338096a19fae126b4ed229cf22301e9c
a93c46bc19c9adabf28d137b49575260ddadfa3f2f11aadd8d05101b5f0a9028a8d78060eecb04a66afd5f67f4358ce79bc2a73f295e4a44373505a9
307e8faac5f76b6e0a03e890f881a1a2e9d4ef20c8c53dd8cd823eea10a8465db85b62739b90ec31206596e049220d7ac080c76670c243b7b261afba
aa039b418bd9f68940adc1a9535f41aed37f38c8e500d16c80e1ea364c0fbdfad45938fca42d30e47d308f475d5237224cf1ba303c14e152c89e18a5
8df76b4960933bf7d73fd86c8b967ef6265dbcb6084a9224e06b8f5cbbfcc9643da1af9a95543840392ed8c1ae53db054efa4af72cdf114e6c3541ae
8643463770e2c5d91cd643a77f6418b9f3cd2c624a9aa5db00540678b33e309b5ee70c4cf20e6e67b1591f92ad1bf769d2c30b9decde2e1c87e0dc46
b811faa76a933a2e27782951297c18922a828b20e0c51bda477e431e46d94da83670bed1cb13bf0a54a9f53bb2f461a5d669f21b29c188f74d2ec5f3
37c847236f94d3cda9dd7aa19e56863839cae02421b25a7f9e82985995d598480065d803daa376aeb0bca7c62866548ea9ef796dbae49d677f671da6
62934321e573ba09aeb3f7f48af10c88b12adff05281ba69e2b15256ec795a84f8d5e371db9a30618ee66d4207bf0e32e8daf88da71412ee3567a1dd
58ab2df7f173b6b83d20755cbee3b8edd2058cf7ce4378abbd39924ba8332847849c701ed2ae93ac9d89d44ef6c1f65af277db2176fd747988a2d256
64f62e0818f830752e7d8bbcc319ae7f7072933a46f2f99db8af0bccad3a240ca0227ba2610fce22395f5bd7e90dd40f5928f449c3a67c5c57b094a3
93c91c47df52500e248079d6e8e391db60236671f1cd09337a1d4ec1a6bd0bb6938173d2ba90899a88332f28c589a8b28b0afcd146debde1e04a72cd
321287ce90b56a07a6c6516f189776bc4cd7c18e2111d66ab0bf4ac100aa20c50367f46f3769eaccd2d955154b7aad0c6083c06e62f18a74002fc279
e039ff29909d81cf9fbf05d2118cc1c696252e050fefc5c95cb5207044482dbd7ab6f2b1ed4e97db334c688907d2c1321fd6248b4b020eafc0ae2878
24407d40cd3cc9a8f4a58e0d7c5f5ad2bc8aa32bfd3e34e429bca55d85d9b971eadda494a50d1c551912b3b2313851010ac0ce3936da72191fcae04c
c2f2378a4288c586a07f52acb4c34d26f17a9d934bd20c1a9f1e9d85fb9f00591ed95cfd966eeadf27d46d743775e770fe96600212139bf48cb60da6
d01a2804a04fe1fedd24370e7a08964af8115ac8d4098a241f0071999fe03a9b03363879e947e022aaa37e08700db106019ca4df72a7e7bb5565115c
459204ad0cd930b613a1a29652acd1fa9eac1448b6996e35c682a9710a58095a11983acd744b6bfab23e662527ab29dcb7175632b3d9f5bd4d716960
e33f38feab22e48f0a7fa54316d7a4b51e5f38cabbc8f4f784a68c6687de76f17b1e40c3b855f357a019136686a25cd8289b85c40ffc38eed3fdd3c7
a6f030b4804a91c2a027a6788aed090a251e410e0e3a86800a57134e48d92b0137ea7d8b9c8a115438811da018416aed95f88b18f6877659d74b8f61
962139f9fcfef747eaff4ffa03de1901f9e630f6c5b45059d5054eb6cc5212c7aa77293cd90d95c7bfae69619ef37c13e679b009ece34a931c63d4f5
07563c2d29a39e5fe459aa0f976c4e749b83cedabf28ce5cb0f05b7b610a2f6d9c27749df24a0257f7b8e943e966794166dfb9f4074a8c32c147e7b4
5d848c92103b7e672e1114b88aabfa0ebe4a23d7e7a87e4077be2d517e6c361fb176087953ecf4f1fba587b94a8036ec65faabfe8bc4d96384aa36c8
0057b69d0f550545d8c40d3c69e58f449b77865bf4d5073c03aae0e3b849635c486d1c3aed1c8a6b10a76a52353d88c70c6a1ad8cfab2b86c5fc8c7b
106426e52694204552f0750448fcba0542993bd5ea3f9a1bda270cf614ceb3280768018a1e4a4f278d79e31ebd0b52de618e1dcfa0664156189d202e
e54c65cb3e98006f9d56c9ce66c19bf79d31b56d3b63fa0f30c194e10f4609d9a96216ec2d1908103e46fa091c634f6bccc226c1d81469378719d0b4
870c3b6106d00993937010cce85792c551a382f43731a6e14b4c6794b3045589a83a1e486c7a8f6301368bde6db63d241e0f83c1d199aebd22c61263
a3fe850f575ba95448237b59cf8ce4a0a3e03bc4117fb98ebea886ae206eb528c743229c0e4c7d8ef1e437002a07333629975e3b88550892c7c1f06c
d3246a577a4faafbc11ff2f167a8672215e0ad6ab905e2ab74b39e153f795782773ec829a01946dc97a554f6fdc7278f0ebd7a7f1c051f42b900666f
3317a5b1920f6e8744258e18122b2aee315ec1286f1db93d1a8bf930f6ac665cd8869216651d2572839502a8cf1232977cb38ee822aec58b2773e005
1ef356eec09ad0dfb3cfdb6e09b92020ea20ddcfe0276e7c3725426d5668aa1c993d1877239c47ea799ea3e49d79ed4a1b015e79380270bd11d0596b
2c7ac0a55784ee186fbf9fcfb6a1537206939da8684ecd0d0ed7bf07e2203be04f6474c8be80d080839bfbc7c43f1674d295469e33f5a12723b3f025
15929e0328c58a807da6e2e5dc00e43db00fa609e7e3adaa96fbf1373237a9c83701ab13107f9e01d37b2776f4f56f384d0f62b6fbc96b30bbbfd460
74d9aca7cc34059e0c0441fbe030eed2a8dfd76bad842a557c1806928c0d31bb6602ccb1ad10551fbebc2463a03dd5bba859a5b84db3d19a024e632a
dc86164bd8754d9444914330e90b6521ed7fec52f109f85d43b4d79718bcd4c7248828d26ef313fc73fad49a765cca82e0e244996734a526692dec52
ee5f05eab3228e9812c83f3e3118e3f7b2ef9be95f99e7e41e8ce17e4232abbb2a40b2e62c87bf925c5247e125c4b4f1ab1c5df4e0725d3076ef6aa1
f23e80383b4b32c798ec4bb469dcf5122be21659a0bb21623e994ea64572f4cb50e9dd0697153afb6ea9b0ea93e3d811691524bd910a853d4d3856c5
9b8e7a5343e3ac0d6c6740d15f16b758146a8414a26885508029784b2b657f3bfb93cc88e00617204f836af546980f247893bf80de8365d2b07e0c9c
5583f52e7ed71876b1f93b4daa9894dcd373b40143c14beb6d2ef8101077060c2d82e49757ee3978ab08facab233b110af02309717ef7465c1fe6a22
546e37b79a2c84eb44e3c4e4ef7dda38adc56abd9edbfd5dd8ef80f8b958f1d425a5cd2e0875f4668aa474f5a17b583a569f0673e528e981194d1aae
fecbc4f94c13ce9c39b565ea60de9388608e8ed98c86f41998556d1e4ef0f9a7145f554ade92f9b7b5c7605adb3ce0e993c0cf3133fc234ec3c82606
ccc732b8224068798e5e4ac8a5154cbd5ccd748968e11dfb4cec859c2d5773c97ead8a71fa9ff6ad57fe98e284c9b05db87af6095079027857f2b150
476e84242451409924f352ea865bf6b1d71d95e1ebf4708f5d34c584ecda746879025589be6e9fd239bafbc20ea84700acff7a27cc43caf3f6d4be96
28b90da81060d559d056b4c709e9189324fbb0576cc443f2bd4a5a8a9b922f0a1149acdd033eaf307e628721ff00b3f574f95983108546cdf3b23bec
1def4922ccd8d1f06a47fce57c65324fb4801cda279a92ed58bc52cfef13c13d15f46c9dd8d50bc687ba3866dabe94b5cbc6553fe5bec24985f1a259
df85514f9c6d5a277a09b9c8b17bcc9c8eedfb13ff292f4213218f212c7ce123f796effc288791c7de9f01373084c2ba291985d4d755c95fd90035c2
ccd5f33e725caa36b81ee4c7a3f7088f149e4d3d73b29b7d8cb31a324982bd85511e597d19ee9ffc6c717a050be21cf7c2d47615d91d7c0918aa25c8
22f382cc7d63565a89cf3468a54a6b55c5e424f8722de663b164f538b304023cf013fcc573646c20e5d6bb063c01edeab88f03b40083a625223a1b02
636b69a9d0b8b05a508868be3a61782339f0b47fb10a9bb6763bdc1d4b2f5a4e866bc647c2fee2ce29a66a7d6873f272bc084228ce1770d82ca36b50
2ed35a154c549cb9f60159a9a68e99386203cd982c3acca50de136971b363b125084f50f3cc60bf2c6b866f4bbaf9a04b94c16be737ec0e75a548814
2e33f4869a7d2f9bb6831b0efc37328f50155684b516f0b60ffc3616adaaef4b5c150597a885c374c2b079c8a5c1d913a23735301eb2e1f84ec5f0e1
62900575cb5396510d62d472ca8591f4c35ab1f469dd6a349f6f88dea7d28de5ee80b9ca8e4f88dca2b9f57a15d8aadec94a92108e6537c21563899f
3e6b26253612b38e66ff8e1f7e023627193f3c1067e0d08ebb5808d14f82c26890f0b60a3674b815c8378a0621bef24b2d7f71e68a742651534217d2
fd36780b1df0bd2bc894782c0788afe999531cc3cdb4f1127c2905a145d681074e78f184105bd8cf73ebe11e5cd1baad88c4056aa40f89ad3a10fcec
593d07660e1e5843b099bba333960ee6a7b0c9501aef610858408b28a6bd81b66353ae1993023ff131013bf377f5951e37665ba921dcea223704abfe
9b5c48ecee0f4d61c38db0686d0954313d4b382bf5
```

**dag-cbor CID**

[testmark]:# (garbage-19/dag-cbor/cid)
```
bafyreidvxzs4nhx4cahig7rkn5z2vq4p3amlpaj7asqpxueshesonkrvza
```

**dag-json CID**

[testmark]:# (garbage-19/dag-json/cid)
```
baguqeerab5d4mscalkosch5klhb3nwuojztqlvcurwavyydb37nskwhnb3yq
```

### garbage-20

**Bytes**

[testmark]:# (garbage-20/dag-cbor/bytes)
```
ab60fbbfe02de25d8c769f612859011fb8472296f7a91628d274b45890db8954c5d848145ae470546ad43631b49db61e3b57d499cc23198c337950ea
32cde119de48ffc3b50d6642170d59768e7747faa6bb2d560d6aca0acb7c4bf1534206b20434915a9357603b36065278e2aa0ee701d31951a5cabf18
b77cafa17840699cbd2e2b0e14105887916ff47cf9bed16561652b221c646a86fa17219ea97e77458cd82f64ab7d5010b4726313c01c975e7e099a59
c575348b94bb838726a83f0f44a9933788ab0a119c744a9eee725ec8f3b4b952901c304e541c7575fd2ce00e2b1d1f08cb94098ad02e2aeb4fefda62
2aeb0e7aa9328fca00aa2b678a8fb7dce6ba908cb4623d01795d9cbcdd4b51f4b72ca9d1fe9b1ad1e56ce879cc0949e7e32629ae1d93b8dac7c35b01
5bd1e5617b781e4a32715b3a583f67664b7b4520583948774836482d62646e447b20772f5b623c7dd82a58260001a9021b20d525812f757cd734d3e7
3a23ce0bd1c0eac68331bcab7d2d28c8dcecdc1d8fd4632924363b00104228ef6fe410632d276479040e632a0a76502d0a372c5354396f6e34547443
483024382870567d227c5022666e5d74676c6c57787e5b52487e3e5c33765a47695b4f53712d54666f267a61443543245f64297648284d614a3f5a6a
66542b37293f34526e5d2762216a45292c78382f7e5f7e6f5251253c6759475666645b51370947e298ba397a3557332a55375876652b245a305b6921
43616e4b516473486c423f594971766f60285a5d733f22616a6b6279576034727349402f625c48512b6c675a6c614b452743227257094825757e2941
6a7b5c6c6d6c4776523d6a61754b23294a5f3f5f346d24375c0a564d216f475e5e5d2e3958585059793a23447b54455b7565485e4422544f5e59574f
2b0950217950505858272f77555972542e7574433a5930412934633c2c6044723c734a6c3b725f3f2c2ae298ba763a5e3d332f3c39284f737d5b4d7a
5a3a38e298ba536b5f23376075430a68365563223b34092660e298ba6a4a36523c646e490a4f5e0a5828597e5c696c46755649735a0944606f2a0a7a
42443b66792268224343684b2f53274f584a69522525283858202f0a24487e286b6ae298ba5030324b265d59625f7e7059642130456f642627742325
5657712f53707666613462445275635227373e4b7c727c6973e298ba254346e298ba7b5d617a38704e22753e5f31345026776d565e0a567674466e30
755a212e574c21243b285e5646e298ba54624e286522230a286c3f45240a5f64595a544e4776663a4a7a205d283261753f292f69582b74704c643d2c
e298ba7976356f71363573556e384948552625595d636f4f78382c746d534a615e2d440931696e497671384223432978345d7362712122652520607b
25637622786e0a3863642a715d6233335c7032334d646f3d585f60566b4633396c7e574c642f6d3b37587d2f324d6732765d555c4070487851586755
0a5834505d7649416324704f28455d6e612b466c354537304c3d545d444a626249595561535f582d65745b287c213d2558675445735b732e5176397b
7a5822756e5d5a712b244d217930272154274d31736a6de298ba787a7a096a2371672a3c6e413c6320e298ba74e298ba610925617d4be298ba6be298
ba304e354334443c605e79715f334be298ba602f6257384f6652647075286f2a2d0a2b344c7721752f59794a7377496678385e4759376d757323633c
3e4c68797262483b6f327523295f565e787b096b7479637325675c282f4b0a553b7e63393d7e5030575332364f45425045634a22786d343523572b68
7a643f2827683620667a75334d69244e25404f24414f226d0a463e51666c6b7e5d4e2f243c76295427654c6236405947342a703f62442b42775f4753
2a2b22677a7c425f57617a35756b6d6d565c393c727964787064433de298ba6a6763684d5f715f7979724d4962673d26417040485f575b3e49213c70
632d5078f6637e5a2af66462595556847903ec6b2d095d686f5174406855684e39795a2b603e352a645b6e092f622e2d4d2b346374594a6276424236
58276c420a5529393356796d2e2239213a4c2443426a2a703e652b3843753153506948223c3f4e20472d74227e765a5b252a3f4a297b4e40543c3875
5653754352316b616e707d467c7978364a204e76303b6e6836326a5a75505e2c37783e4952647c215d2e27742b584720302a524e365a5d2d093f6c7c
5f0a32753a514f626f494f2d4c312b34e298ba6d5779427e2f205f606c2a4e60493a75493a456f206231465f44505c7d482d4f6f522750666660532a
7d37736b662e3e74305c50453d385e483e655f3f31542f2e6f3162455475522f6a383f387c7a0a6d687145786226496274232256705a32717e33674c
4c564c47546f6f72667d65614c2a4a7863507e65594879577e357c34555c575f7a44654e43353b2c330a312f403b46256b474d6f585c71624f636f59
54424b573a293a205769354f76653d4c282f2c5d2d513136366c5835242d2e2d496e3736362c3857373b34672a2130763c7867324b210a572b454175
364d6e7d67642425203f36560a697d4c643926584535466c487e2c767858673d77456e227c2f303e63745a267e55796427616871253d4a7c4067442c
46392a736538794f4d634b74577153636241574a6b4e42422156605878774f29302b49462965613046686333093a63724463635d302c6e622f572c73
39335f26645d70645c3641283c4650286b3d5f2a555723325d7b20434c7473354279722c746d2b37e298ba362541253a206466795f406b4c5d705f29
38524d223169344d4c43657d3d6a39623a4971294b5b4d5c356a4f7276382b206a43702455604f445c3556797d2467452975226571344b3547206a4a
336f2b3156715d242449674a5e7b65667e4d092c30343f66525a4e3f515e475f3f654354212764774245517320262f2b34692c5c6740653d6d73276f
6b45443022482863732771745f4d54575c5b426b6d6c7c415126492a242b4c33644d2f6d645f627851722843394059657d0935464d37674339393132
5f4c3a676225592b65582e372e506d512d33374e4a455a6b7e6a5931597c2d3b41495038235f2a516c607e7b326b3c612150275f53657c3e7b332255
72e298ba795d2661452e40413e2b644c7e674d09413c3f773809745d7d646b7d7462092f686b476625773d27212c422d272b4a707e41254e7e7a7068
305b243b47496e27274e5a2a6d4150296431782d695b3e3075474e2e60317d690a63752d39335d475850305558397b5a4a47297e373827353a4e5944
3b502c443433406b27e298ba66555c42e298ba746944704f2f2f292e6d0a6c7a3f2328572a514355337b413e29486f3845783b693c43475a58636b44
4247273b001239107a8777c68259064bbc06f1f9ca53ce646fea13ed42c29236d56bdda5d3c5d68f4f93ea4735cb8867c6e324f75a98480995612070
1a98deba633bfdae7b7f6e6847b3b89565f9b57f92bcf0740beeb3c1d2ecaa1f85cec9891c6dbe92b78b22ed055a0fedef2b07d1f1f33447f1943cbf
e45bb98c3ff84a75aa92d524b92c9ebc1b069bebe02a969aeba1466eee0d44115c136f2f2822cefc93ec15105debbb32255d8b4c15b5786649fd7ff0
cbff0777ab700f79a37397cc944db0a839478754b822db8e24e250ab45fc4834c1750b686e5fb7231d6f33ba27b7ea5fd9110a3794ae6f8da82a88bd
c0503911530d21a8367208e8eb4600c39c84b583fcc4362253ff5c3cd35e06651b2fcd1a2a7a7c123d81afe602415052aab8015bcbb85aff01e3620f
f9c1363a5cca93864bbb1f752ae238a0809bd1d2f0c282f0a0420407aa14883868510ca04bdbb00876d7e584e528e66ffef51c9c967ea9312bc8e9fb
bbc4048293ee7491b44722a9392c66054ad28be2d29d3e8c9417bdb69d048fde56569022a14c5f26bef971b926c33b9291b63fefdb0bf53bcc03d00f
c6affaeb52ff897f2ed6fbd11c41b9d753ce1ef13e32aec42f1a09e8f96fe0c38ba7c2884b0d882f4b8947b1a7abcf7911dabd6cc538b28fe6c005c6
ba2448dbf542ad1b0b348ad38e24c4c928b2b3725662fec1333e89549b62ccecbc38b62d8e047d16c01247187993495174bdf1ed074d8d8e64d5e640
136fd3832347eb7acaeafc911f8bd69271eca3f0b28f6cefa786730cd2718418b1c7a995e8cca50753b57bd83689b0899a25b361504e01e6baed7cfa
fcc9d10083547117b9ac4086658c1ba6247c018cf7b58f05bfa0d3ae75e03785b1077df7c6409c5a94d5110737bff5d037dcb39f1d60b7d189e501d1
f493ffdc5251ac424d948d149dc0b86109a2692df211506477eea4239a0be03b17099838d6dde16706f55fbd63699fc968d63d40aa51966ebf7a1d8d
0344f481af78954377c664f813e2ba59abc8273a7177de90c2272d4794101da185f148049b4d9529ff7d55a7ddff2f2b6bbc5d7e471bbc700543d3f5
5b0fe95ba374949bd99b89c6ab541fd4547d9bc6b1ba525e3c88ae4118ee74cbe9592dff58fbeb1519e5116ac4332ef2a4e909c736d927e6883c71fb
da34aa64213e4ceb2d67e5999e0a9bf23c3d15c89b43cafcd0d0b407e0dfc3a46829b2064745cb73d3390bf54fc85f4f85341e7c4820181fcf79b98a
67afc95334c2b4ae33a70b4741621549c2e653e156c084a8f7f07dba6e5a5ec4744209967aa02c685d2b787da6d2756304b6bfe8453045d0f4206f7f
bc3587b575e2bd7c9b316da86c91bab45bace535c1aaeab1637e68457708f54ae85d74419ed824fc1b3e399d9ace91c207c95a477b855b9a8e78f7a9
ea05b83ac685b66d75d2f08ca3f65f9561e03bfcf03ca4dc022772b70a6a19e8a8944f57fb3743d6ac37bb2e45571703a8a062930625994a23dde330
1dcc0c13b53441a74c1722421b4f144a576af458349db71c8a986481dfac1312a223af04dbc28182b6df4ffdc356694764628c72ab9e43c52e6a83d5
ec33ea191d6b18cea9597fcbe3b8d9f7309bcfae222ac527bdaf142986bee61e52b1f6af37c851ad57973ac33dc898de094f07bd180da332e29f79b7
fadda0b65be9cbdb04d093bd737506cd275c503ffcd3b2f173e83bb0f55e4cf11d39e8d4504d4ccae3209f16eac86324fd6414478073ac9aee509d30
95a57b66d98cb36b447d332132136f09e1c15da8c136f43991b178c92c6887ffbedf52a9a26b0896ac292383c9bc30ed3d4f955888585a29d6f4d35f
d857e58b2b9447d7a6a8aa02fbf7cddacc88a5f2e96db29fc249cef2bc94a418cb097ed44e7e69926b4cfdd9f58665e1578fc1001ffe5a8fbd3f63f2
feb6cb09debd36d71943376f753feefae694d77182c3c8d02985862408c96a40594b622341c9fc31c65b700a3f75414a7bca884d82a59567e635756c
61852cef2f82c65be514b389dc49d5da91e936964daaeffe4fe061547e1b4705e11b3c10317d635b3fafa633169de1929bb3f491ef6ff916ba4a5d62
8df370eec590a7268d46055a39637755dae6424e511e3ea5211d426713e0ddc3da0c04527a8c1ada1a085dc56ce5338728440088b13b0c79fd197e67
a3d75fc8d4e77c4d030b72caf652d24428d7c202b6c8faf5ba9934239b579ceedc92c48a74ece6616dd6f6334b43972944b8d052eae5130bbde1f551
2f846fb28853765901fa6e94c703e1fdb60d2cbca8f7416f5e2ddfa87e2c123c5e3654c59ecf480d843b6cc191217bef2a6336a1f848fb78378728f6
bf52de0351a42a06838afe34b4cf4351038d25828b652862d0883da88d094794ddff8002f6207d0d2dc4c4e609be1b5df97cf2353a2f38ce36488349
bd2928c524a93fac5785c0d10a5fe580e092fd52cb105dac07ff22ae13869d3b0b2d4216346652e5e08c886f5e0fb473464c1cb2296d50701b45bf64
4d4c2df14f99d30e1c61abef4f18fe17fd4fb1f24de7e423af18def69718e19ae4c95b1d8caf6901ed71d0f064f174a4904960c717340645c52af0e6
4085069b1db64e7c8503951d245041e5563a9ee95407f5e1a3c972ab5ae0288b7d43e231d44023419315d7f1f48301e52b0e253f8e52d1349cf314e8
27afc405410ced289c5fde7350a023890a98867e99fdb5e3a87cf75f1e6311fb9fcf96bf16a47d99c63f0b707e82302b4367177c23e095ef67c0c431
4404d16724abc53b2fb211f89c5a5045f39972b15e93c15f737d18e7cf5dcc940723579ec236609b08ed2998a4cbb96faec5be612f3d99fd7daa4e2d
c780e6610a1360ec84bd362f40dc3892011e37741dc784782ecc2650edaf146e10c8d7acc99ff2a6115891daa57cf4e880f826dd1adc97dc9a55b89d
09c131b2e79c365373c949bd5c5d1029f2db25dfc568d085da58c30dc0521738207b94f483f658266ef8bbb1281590a553618337834ec97f8c528e89
c743d7180d261f41819d0a3d57c51f9cda5cfbc001b980f289b8816a517875625b5f2224373d5901569a12d2e4aaf43a2205329a3e2b38e660829881
77623714842a53a9de056a45f90f40feceaef801fef959b0559bc5d97c4ce49c155634f31bf78180d5ddb7bd659d6e20eae20dcfa30f44aaca87f4a4
45a50652190aab359e6bd028896669938e53ede41ef582a93b3c2cdbac6f3bd7523b4a3647bc836c24ae52cc82626965c57d39c00877f564bd8b2e4d
977c3ab90ac5d2485bea56cebc32eaf50b0312d8ac0c20eaa8687c71a3fdbe31fe2058db0f8b2b924b1cf79772a1f262a395cd8eba01563b3d87deb3
a24e0089d5f2af90bbae2e35f2d67db1c076ed3d94efc310e38c5d83ffbf7adf8b32d943014f4226908ce6450c6068eec8a2b3f2e45b454a0fa88f9d
0fd8b8dfe6007194dd89fdd1b030e8a49ba59ea0321c111e9c4393e7075d795871d8fb6e81cb783939323f10a30ea51461905fa282267fbb3b5674cf
ad1459fc58d4fc2cc453c2345d59f0e3e087bc5c7b52fa72467b503157627759612e626d605b69342871f6
```

**dag-cbor CID**

[testmark]:# (garbage-20/dag-cbor/cid)
```
bafyreidqudcqpkeqgylnqpzug75jah3lbk3rqu45cezvvncyfhrg4aodae
```

**dag-json CID**

[testmark]:# (garbage-20/dag-json/cid)
```
baguqeera4qspnpinuasdl3mssik3vrplbjmphf6qucpjslbevuae6hmprulq
```

### garbage-21

**Bytes**

[testmark]:# (garbage-21/dag-cbor/bytes)
```
7906c46155357c376a3e625d7271295533634b354d4b614b236a41796b6d70572d50740a436b6b5929282d7947542e2634776d5d3072585b427b342b
34315d3774274558573f5b3009696627542f313a3948546e7952607263503052293b5037212524323d43622576096e4351432129575e6251546e7463
332453403459677e29383275606b485a214d2e627240360a2846250a723a22625e4f22352d58524c096a434c393d323473790a09616e73433f427535
402f36612432265d6366533a6b2d295b4039636a416d2d775c5b5b2a784d2f550a703f2f3e574c722a25305921452be298ba676a6c2c5b683b6f7376
2e5d32676e40412f34485909797b5e20293b6377534565606c29302a4a5033443246797a36286d487c2826372c3822602761477136723b7a71686e68
78723f4f3857384655712c6665794c205f697c3864263136465b5223474c434f51533e376e24293f6f6d46766d744f2934246b7e4f50662237483d6a
72506409e298ba43556668494267512c45425f385a7075383756476f6e355a606756412f405c4a773a494d5231525235783e7c690967456323712265
3179735f2d5921395c316356e298ba25405c353e41282d67793f4d6f78385e66645776355c736a3a56277b2757534b3b6d3d632564496161404e6c7d
4e6c636a536b7727435a602a2f76507139306452646731325338586f5625422534326731312a433743642b294d592c7b587b36310a505e590a5c586d
56634c4d612b272f6845305c617c474b596b4c286e477233232e6f372c4a437a65214c54580a28644f56625a73256e3b3a36576573764a3a4f3b584e
374e774158406e59266c3754797d5c573a3040303851544163782a2a6333450958276a4866773509202c286566394925493b2959615067772b657b6f
754d436f5e30225536597c382a7a3f7873513d5b515e5d7e3445415d55335b4d3e6f3d544258415d69364064532a332c3a3d525d25515d56477ce298
ba3c3033375e2632356e694d50306c487c492f45792b2347223357523553266b555c4f78585a60596b2146236a6f6c257a6c20703f6a2738475f5f41
38653d674b6e73560a617e6e775b4d58254f582d7472445568383d516047237d7a22556a45337e5375596b5653482b6d632b423a3e2259525b264d6c
754c4a39626f56366576765b59e298ba406b602c336a3f7066524976724e52797165696947456c3b43454772646b2b223a51634f475c2a63254e2109
6d245b2d7c46662a7e2f413c60573a243568595d33392f5f702b2d202236207c573f546457663d4c3a23643e5f6b482b324063330a2732e298ba6232
6d5b50523b4e3b7e543d304a4d2b093f415609746b216e66474732255a3a4552582638594f26676d2b753465532845492e5a285f21222f3c796b5c6b
2c27627c6b5e2d39592635772b6550265c4e68426126225d2466516321647d2c6a513a32784a6d454f6747403e653148375a5a7947575a343658645b
7e4e397358286a2a6d533a59503d757b746c516d2c652d266c273363423c5755794e49272f665b7a607e7d61572523677e516234537d313357696c5e
7a78213e3c2f323a6f395d7a36514f67372d504d767a4843727d59533d575234793f344f0a487e413726527a346d6a697b7c58385d2955776d437038
366e71586b686e32276a7c39346d605b363150603d3e2d654a3d5f2859425a725c573e43504978424c78294c0a4b3375582271334c73455b6b31295c
665f5771255164644c4260694b4e77315f524d724b3a0a316b6b0a443a0a632c3a633f566b654f2a377625762f5233786c7257233166745024654977
44462d3f714632702d5c5f572c2023365f417c684ce298ba6f262429e298ba563778452f40704e6a392335373f3d32686274345335317558293b5728
5d2051505d33735868605745632a5665592c2c48e298ba556b6b30313f712a63724e4e735e633a783a5d6a6b2b627e6f3e45344f5b25665e2c693c38
32756a314626604a415677516d6a7549215c7a4c506c2e306d73535028623fe298ba53640a2c5e6f3c5b5051215459343e4e6a36337e5f6d205f6d4b
776c6a72383a5f226c69603574277a0a6f6b60502d46764b685f756f275e43343c50795a3b2923675c224b69757c2f44276d544e7a376d3e33233949
74303b4260e298ba376b33415f603050282b2d096c2c3062533b743b5f4809565b3a56602b557b0a22225e6064523a453e56646c532871696d2b2b6c
4d45644748333a2c4f736b5b57265244482e27765c50563a5a33636e3a31523a433e4a5f405b784d316c5f557d212f4062406650272e71663748642d
333de298ba7a5c5a2c752358306268543165767627627c3d42796b74665339765c747446426d6362354a256c3b3c242925472022464256
```

**dag-cbor CID**

[testmark]:# (garbage-21/dag-cbor/cid)
```
bafyreidmfepyo74jzm562xvcgdzhexzdq7tracmtetx6ojyuo4gtnz27j4
```

**dag-json CID**

[testmark]:# (garbage-21/dag-json/cid)
```
baguqeeraja5vezxmb3ekptrp3glfwtgaqvju4plhsicqitdg6etc4wlw6amq
```

### garbage-22

**Bytes**

[testmark]:# (garbage-22/dag-cbor/bytes)
```
865901f90edad2ca0e2adbcb8f9c2db0368804f164557ca7b4410be6a3174722242fd0bb494a9b35c283dc27a251bb6c01d0fa9129d69ebf02d30054
a11808c1705bd3ab5c35d64969fed51b0dd416919ccfc24ef455d8ff986cd1094717a9b249949bfa9d486efd6c5a7b8c0d5b989023832a6bc341104f
4b9cac825a2d5ec163d115145e41e68d13c8a6f959602b587a7834c5719eedf0a7b84be98a968d8c138ef3292b4fb63124390c3c04fc75391f1df95d
be559143b917dbdbe705b93a406bc4b57cb6b36d2c900da087b41b6f7b7da714a191bd236e5252099447bc6dbee14d1d042d30f4afffd6f229c8c933
1d5056ebf5ccd55207970912ed3009fb13d18de090393a5c428512bd934e169b924e2badb03739063b65f66777f3742d35f7bb9af0b32eeeb6fcc69a
ea01f1a29d0187b1ecf2488e6b8c0b82388f37835cbb94f866d879066f1794a8eef87d50eb1ed13f4d2c31499fbb9bd3920ec28fc7cb1e973ba9805f
f88734f6c7ec946344a8e055372fd5edc450b490f89d2a15066bc374aeafc56da87f84ce010c7470d8d32207e93b00296aeae1f40fecb3b3bcc77d9e
4e278567da92b5395e0c63502839223e127e7f98741f291d154ccb33f2cc167c8dc879cc046170963abfa51bd0e766ce2c04f71877518353eacef6b2
f71ea90dc5debb7a0473713e4b7d000b34945eefea1db48bc3d1495ed784f4fbbff4a85bbc7fe651fbc00c65a37498b98ef57903795c497839244061
7d533f6a632e6e6d2838612c29320a3d416c484d695573252131712652493b3f0a3f60e298ba336a3a3a485d4c78546461702152544a60703d404f57
6f496125336a3c2f67554c234359547e70096c096e207e3be298ba63412d2a5f683053705e4b3e7b5f51305362667652310a526d40624d3f24383a45
2f777b445969286f792e426d7d4736265959633e603057365d4f633e6658292b6d745e2b6f4a5d3937735d54423a5e465a633137712b4e3a5066602b
717e5c296d26476275204d323c657c714123455f4c2d5f5e2063495d207e233f337677212e402e7d403f2061453670476d4ae298ba70585709627b72
71405b6e735f21683266673c476c726e3c232b4c294334664a5f42536143633075627c3e487e77272b22306e2a4c2b496b6e286848704c615a500a47
5f7a70222c585d5f5b363d56205b4a5664324150465122792e20693859516b2b37463553237449095a6d595d697a2a2d796c79733d6b752b682c3144
4c565965773d720a4d4a2f3c336d6f7b335a4e584c664172686763633b4671335f53226d38e298ba7b2a62482b38637e30745d58607e2869573f6578
294f5b6933683a7a6b7d2c7d5271425b7a386c6937537428297d4f70727928266a4c77222b615b504e5e393e202944306b2e092963583e2a2823564b
24743e215b5e2f66662c21365f475d62582c752454356d7c2c5a7a373168325f542a5b743b494a54422c3d7b455a53523349e298ba4f3e21764f3579
46416222522e4e477b3e462e535b6d413a55223041486d46512154472e2b440a0a2b7a7778647e696a5d24682a572968524c5b3b7c35e298ba38212a
322e2d6f6133343a777c4b6e566c6d55493044595657594f332949425479762c7435366452475a433a3632583778793061443d3f6863e298ba49764a
23415ee298ba4569496649245f4e3e63675936253f644f353a2135716b5b7d3458354e3f4f7e7e75717e504050493773317a3b4d446454566b526d5a
59436261763432595f4b6376215636223c21562b4a715e3555774d64746f274428305c734c094b485b4e693d216c676c2960506f3c26602858457865
3e5b2735262a3d0a61782c4a6d5c6465742178752f6f695f5d3e5ae298ba396a312723564049092b44635d22312625322737720a282e495de298ba7e
522b2a5c344e615b3242703943304a326a6934400a56542f254f2c2871244f392d5e694f573575602225f6f5a6612af66357492e85f4f6f6d82a5825
0001551220eb15f45399c0d64d7718b05019882fea2e131949290cea28bbcaa7847ca2a1b782f4874f2d303f92f4bdbc4c2f1349a9cfca07d82a5825
0001551b20174d27c66fecb98daa58ed9c0507d7795ed41730132a2c91d9654db4097fd6bdf43b001a91d94d0815147830682e3e21682271502a5a22
776e6b21672661577d4c3c23763e4f5f523d78722d373b5e36255321555663446775204347f5816c6b7a615e59315d316e27413a64234c444d590d17
d9486a345d6d79f68d2d634b32f3c0c35d46498c0a3cf5a885d05005d6642438f226d0d035ea1b84ddbc70189e9c659a19bc94bcffadfb2f8e5c439c
4a12a938f196bedb7b71928fc1b3d18acd28bbecaebaad96c4db9b0d5c31acafd364592731308b9a971cdb803a14197c673f82b9225af2b9e4e4f0c6
67ac7ac7ae61d1e79efe63b7a8c5df80190457c3e70c0bffc0c92c9aa72c84807721aa75089d89e3fba01e9d6e3ffe93eada9c89d97fe55ed623ac3e
eb9ebfdd92df61c68147101115842ade529ddff7c11c177f7c1bf11fe31fd0a30992f7a98df094890bf698b7591be09bbcfed32db06da9d00898a050
a57601cf901a2f6ba3223309411ad0c052a36a3872de0fc90aaf6183af4c57274609589d4d922b88b0fcc310f0446814900fad511959d6c00bba15ca
ee04f5621de5767f64aed199730dbcb0fcacc23f2ced5698a554212e0c05195d8a8f34a00ba68bbb3cb1d25689d20a4cc5956844ec496293d1a35bb9
b48f3e00e737479b547e654d73e783229648d7c8940cfcc33ab52168f0c0c673ef2d628a440fec22ad1fcbebf6edadcefb796b4f4a80f0384a8bf675
0be6a717d3471345d001e9c680237dd32449775221f6b03b5e0857eed56ba715467df0f3a411e945cbf1df3da6441d3ded6ac2478fc5b565a0672b06
409e79acbb6425028a53a8ba9a669d8517a2cb8564cf01c00081910153bf55853967592fa753d17316c7b03765553944bf8b5a935bd7ca334c037b90
95211da048fa6a0010008197b0195e086df69d302a23c07547fb3ae4f6c37e0351dafa52ccc0e5f72772a204064ff885a4b5819c592cde49d3171a0e
48db95cb7be9b016f104d5c1fb6bbb615e21c638c4b418806d04aff05def39f92c3a0beec296b4aec1c0a296e229ed0fd82858583343458c397c9852
25ac05b97bdb4b0fb2e81c9996c954cabe3534e4e3d49fb0d2e41fd1db4d9e34c1841c7e09334b74a0037f7856203504ea4e36c8422cd1451ea26d13
406392bb2e2e4cb676b7c2e5aa63a39d91a5d06c4cba014f544f3e14c0e26b798f92f04cdade328fa0979a6ccfe524845160a4f43dfae707eacc1a1f
8634cbb4868e0367be825057d3a4775b515b9dff34ae0674c2de5c39a3eab464e53c9da7eb5a1ef048662dd2a0e95c292335be1716dbc2e67fc5ddbf
19295ab2b7a43091dba8dae43ca6cc4a66846a04e136e7aa2444753822f6f2e7f965318b43e172e9428dd8a9c5adc56e20b20cd1249e3c0bb9cbdb1f
0e3ddf3e99b3c56f40ad06b03120fcc5292ab41362d1922f128ccdcd25719d3ba36614926541a061f207ca664019d46e6091b18b87f8bed3891204a8
8bc3d208d7839e92cd980b5d57f36cf3c2320b1b319b01efb36e2f45b6f18f9912b613bb931c3e84fe5ad2e44f95c0852c9878167390277ec3263844
726e59d8fa501b7d094b6aa59fb0b7a65b0641a54f471d6febdb8d91ad9d6d6aed474cdfa744668f6ed8a2b6a137e2f7b79b539e17f60c2a94e280f1
0a5a170d373ed7504d520f87e52e9ec411af8e430218b0c2e83f1bc37afe3c2f6410f185c581ae05ad81c4b434c8db0cb3cc9ec36f7d5b937e2bd9e9
a5d99f4f5c8a9066928a56f69fa91a086fbc566881bf086f38c2a5d0f65d1773c21f442e5d478ac85592ec47813ffbde48b0cf07e95439d5ed8a1c9b
6288ab978d4123c88b766b162853ff2656ce31a5f2267150b2338797435e01c822de2b5fa1bc50a6a1e9f9df7ef16e0347cb0918d5abb993cd446831
12b539e9291232f4c29aa7a5acc6296eb85a0591763a367e030b2402a64617dcb217e609b8e15a08949cac2f4906118f478dd28f9dedf8b1e59bd146
3aa9f1544d73a55794dec34d374551b2dcbca03af99a8af64304b183eb583ca645edcd981c93d8f81480eaac11efc29b9c91b6f35b5509831bbea7d6
cf99c83d9de47b1e2b9edcee42247cb1a48c1a035694570e6e275cb133b30984b566ab3198835c0b0b1f38321ebf64d4abcbed21e6efbc7f79645550
40c50e4b4a0215f02e24d80ccb7d7212a128e46021ba3d198c1f50257fd3dd76345eae9c03cb4529e8ec49f3d97e30e22925500bcba512c6b791f0d3
ebf1349c61e25f185d942edf31e9d50699f8fc5a4ec6d63dea2ee76c9ce71e0fbc853c74ec1a7694736a32846147d29f7431fc76c77ed9b89b12b5b0
b28813e26f76501cbd0dc23b21162c16442e55d21413c0d586126d2de46580e46df0ea7322966365503848122bf98a2a66aa0e1757b16eca989150d5
627a69218f2c51e892a254dca9c5e28b699655b822adcf560f5ebb31c10dccce115cca9caa3728f9815f0a7d2480cb6dee319aba19742db70989c1c5
46c87a774173c5359e2d243b6f7db5aa04e528ac07c125427a7df01660697fe79d940a1efe53095d3de9428efd8c877858424051ffa70fc10777080b
daa827253736ce6d5b852e15e4c111736e9047d44d0c9ccd1f7fdcd6b75702cecf053b246b3f90b717f9568c8dc21891ddd87dc16e7565ae623b0d8c
55a3277d20e7adc4c96b091e5f9a081ea4755c79c8d5745aec8306146c3111b4d926c97a149a0087e69c2540b276257be0e914cbce025d12c8551e37
f52ae545a8cbf36e6517d7ab32bca3a6ba73215150fac9c5ef4ca66737134e4f8c01dd708262bfc9b844567787788e5cb1b576573caebf66d38cdfa4
823988809f692fec0638a504b7449c1b21e5eb9111b8712cbb6c8b4a6f477475896d43ff9694aaa0082545d582686ba3f8c90c4e0762c9bf0b4b5a90
492e0bab9ffbae432065bb05780133ab71360fb7bfd47c0e2c4f71dd55eed892636241d71536c58982bedbfea4b0ae9a1a4a4978769df20698507a09
a06637c9209ed97b4fe6b790bfa412e05e71f2514b0b2521c7d2602e0e4f709f931809dedd594dd7cdb0f1aa9c217fc66a9e6082d11c076bd15041b2
64c2ea8b19f984d91d9d2f0da29fbe33d9673a801897c6505d4b4aa112badb0a775a26e9145b81ed94588669a787e7b8e2830a4b88eef8c15a42e7d6
248d713a9046c48cff051217d55cebf53e4c0c05f211a6996348193e384e8369c1464f83cdbf677446d6023217f2369da8d7f3e962cf3429bfc082b1
dc33ef8d7e7c22714afb5fd7c82ee7f3b26b085c5a6c952907c35023b4d27762c0d2a2b2cb1520d202ba079e7d3227417e947a015ce5528317f24ccf
a1757a58a8e0e000e8d511a49ac31edf8de55a24d278db2f08023b5b816a41658fac15e4c2bbc69d0f906b21d5222f57f52e7321ff8b58b2ced6ccec
512a0ad443aa3de9c8ef9ef688edd716369b7aef7e94622b504f92fc2c09f582d12ddd5197df7125f2c523ba964f6563d1d7c1d57c9133fece2ef2b0
962953313dce3e8429f7859b2d5709aac4aeee72ea988a3f6b60da1afbc01972f63766c614875c368289b34394744c62235d3115b02c5aec1f4e567f
09ccfc7182e9e852d0b1c1d9691d6382ec8cd28168e833116683751d4b509a2dd0b7e695d6ca51659ccb48a3c747c15d71ee2499e5405e2461d4e635
7c0b6440bc675054b94ee9f49dd7530329c2cb456627d4a171774033b45ca48c8e07edf3635a2dcb351af405f891a0e28e7ed7f23b61643c7c62db8a
9994fd1e4a425b10d0a123eacb97f2a9d481085fb86fa20052e08b4ea3a2a6cc89984f7d0026958f8a4c1d433ee1cfb2432b58db49ee35143feca981
e0e47d87ae6c14f91465035d84931920ec321e4b4e16c4409eb10fe66d525b95052157c83bd6358746c6b3bb02b29dad13090309788869cb0db7aed3
28aa3fca150ab0bea9a27db8d907b8bb92bda86ac5ce04d5e27ff50d021d77f0f09cae76fd84dc89a31311459eefedd6c1fa001920c312ea0601b4de
cad51c9cbb305a94bcb0c11397aa855228dd750bfce7e5b3a145237942bc6732b704b8db7e823baa19db08517f3947f23b6d1742e3589cdd158b9fce
2237a2926f1781f19e893f40a3c1909b026cb9bdc36a561683608b2c366c85df04c632a58a3d3e7ec04fdc9185400f7b3528d40ccbfd0347450810fe
c9235b581498b39a45c4bf59bde0789223e6fc3c1c15309d30e88061668e2a589a83fa85f27ce9aa7555ea1607b13d4945dfb947fa30463e1135df70
e0fc980d2af6358682c8f4ae7fa60725e2f502524deeeff3c26a023e78d6358d6cf0719489efe3be4d356f3af8d7f368083112e8af6fc0ee359cbdca
21b52058639602ff66326215b42a12f4aae1cc4c258444a042e15423ddc506d35cc3edb6350b397efd61aeec8ecdfbad465ab2f7b506edd562f41cec
9879135b99f6cf6c67db54d34ff0940c9fd53fab35041b2f95408152112bcff22ebbd0e218d6f315bbb2e0b5e568fbc8f3151f4d2cb3ed6503bdce0b
bd782209fe5f320705d97fd77c2e1d881db5d7c15d33c92bf40eb023c5d45be2f2214d788163550136e5dd6b9bd363e471adea2cd8e69d09117b8431
b792a576c43502a3d803d83089e39b6b0a34e34c90f80b884e9ed26b6f04b2d9a89c76bbbec7bcf76573d829055e6bc0b5c57ccf0f88e35c3d8b5514
57c032e168a523a228cd22bde080149088cb7e2b0c5c354e5deca87a26bd9cd5af315164bbd452c474ff473fdebbdc7443c030311a00e9840144ba4f
ecc990cf7c4d83261d4dfbcb238ea75b8cd1e51a22c11b3ff8cde58be59cbe8fd88c4c6d9edf21b26783d5a583876f14de7607653b43586b67d82a58
250001701b2017fd9d83806e400edbd666451b1f63eedf18d48aaf831dd351ae6600397646e368766a786a43573e2a1b000c75051099373f6a506f3d
357d39404b7c32d82a584500017114407b722db992d2460c7a7b7eabf665d566418de43faadb1db21896a80a70c987351117b11ee7a6d184085a9639
11c04c944573ba6b794462960d0429b524784202
```

**dag-cbor CID**

[testmark]:# (garbage-22/dag-cbor/cid)
```
bafyreibjeqkkrupx67ngfmcjfv3qg5sa2zroqlokhg4bhmymgrcpzbjw7q
```

**dag-json CID**

[testmark]:# (garbage-22/dag-json/cid)
```
baguqeerahwdk4qndsyfxiidt7ymfw2hnizsmksugm36r2sksm3i3feg3435q
```

### garbage-23

**Bytes**

[testmark]:# (garbage-23/dag-cbor/bytes)
```
790af64124565638487d726f4244574b52473b572c5a2e713543435d6f4e3d3d703762354a7a3e3d4f743d67337c26447e65586f5c5a677a2e30386e
4452523c553b752d44364c4652574a3c21547d3f5c4b476177546c5b444c614f736f584c2b5c4c6344703b77604467364f6c4b7c7875627472664963
095a2a7a517654382830536b353c764f773743757a6275353a7c68235b513a48417a533b3e21294e2b6f420a5b2a5a39353b203467694c4a3b217354
2c783e5a465d635d497674643866307229377666714575772b615e3c3b437d383741674770705b5b4829565a6e365434453d3b7166444f6a7873090a
2e666124497240494ee298ba4c3a3b6c77766a274537773c535d6c6f3374762b4e4075346464317a53787d3e5b20783252736c40634c3170522b3e5d
494a2c3523412929466540514434544661344e53297d7e3c4a242ae298ba544e4a732c5d34093437364c3c606b655e442f7664217109296e312d6e7a
6b762b726459712673374c4b23767568613d747176784b5f343e2c255b414c254c4e410a77206d544f4d4f3443202a35683b763750543c362d522c41
4b3d77454a464b6f335a442b4d0a62533458755b686e4a525b2b577c792a5d613d64737e574c5b542157472028254f555a353661297d3a573d294870
2f3d36423f5a654e374925364d70484a76294b307b5b6c4b6d29425a3e652d69272053286255733f3d5b434b2028583b374b3f2665532f5e4775775f
75767b5664266038425530616b775a5b506d717432223c634e284f7b512c44094c712d2c2033095e58565c796b55234d7d2f5e5a7c3f4a464e28565f
5f7b4e4a092e645a46622848244c70706a4252256163764a21795522595d743c3d2e3e706c4a604d4f565a325f4d21094e23232409476d533d214364
6f543e245b4f2e28634ae298ba30694c4d685e4163477d4d6f62613439715e457c2e535d213f5a7d686e5b6233377a4d555b425078407c7c0a52617e
357a767b5b586fe298ba676c217a6d75247747474b6547474c7d792941236c69215f36626d56313f773c3c613c5e2d743b2b2652417549435d347974
732d6f522451604e362f765b6f7d357973742e6970287e6f4541397260575c5b3d2d3023456973442f4a3d40244e4275712b254f5c50523a7e63604d
7b0a687e287d6c31444d7150463d7a5e573d5e2d7d5c682623613d3578680a597a3a4837392552203a54565c42424f7951552d792b22623c6a65583f
7760633e5253646f302b294b32435d6630566829517d442a09564e5e363c4b522f58325a3e563871e298ba5e794047262f0a7323513430252d3b357d
540a2769662d6841375f57256be298ba58445d604a3465783166464f673b3131387d54322d233c213b755f5673434649722b6f3f0939096052306551
293332646e27533a256be298ba3152314c5d74637766586d5875344d2b4c4f582b2526385b277a225b292732697062264a27267c5f2167352f79306c
3d5c4379372b51783b614b65242e43236121382f487340752f3c355d2375502a263f6a777032287c5e6926667d33672c09414f646c4b536045745231
2469436b2e7a7a587c5c337943345d2455687754743d5d4125744b257b6a712051283b444429663b382f5071093b64266a643062457074484773266f
2e7d453f346024440a7452515b68253e2655694f5a4571437633797d2f26397120467142333036244d332d2f48553738474b365d7a247a703137633b
6e377862445a302f6f5b6c424f49436c4b426e313d34482d523b242a273a38705c58272c606e517609774c7be298ba3858634a4a4b59496e242b405d
3d3771335b397231362e5e7e75716e2d3760266f7d76593f255c5168572436e298ba2b405f7b7b315c794c34755322384b436b315758646c6226692c
23547957212052533d6974204542742054450a5f26092b226e444159235b4469356132642334573676477a2c2d3b2f465526534c2d7e3e653c625372
75222f21455642322e212d335773435534345736497b59795273636e5528696324764222675b7e7065426c7c752978583f562a254f5c5137512c5072
4e6a2c4e344f322627226156412851654c222040222b536c6f4652326b337670204c7b7a4b412a7e2e204847294855534262656649633426766a3843
4a5a35625ee298ba635d2b6c2563760920375b493676214645534965093c48547e403824516b5445314475462174347d4947544b3f374e217a3a4c2f
45625528513d6323785d3b757631256d665c25634164095e2b797c2d52684d3e5f5950727a730a5f547a09277829385d3f092878475f61552d717b72
25432436317a5d764d28645e40272359602d2023587e6b3244616c49e298ba4b3b6d773959733c637168297b3e72293047674945216e57252f4f5d2c
766b22265f7b3e452b24682a30462b596d67462b5848483c6de298ba2c3a7e495173252559563450303c5e26395d2a3e3630234b3e515f285459e298
ba3c654b7c24747541525058796d7134675a3fe298ba3347337d555c366f79715e3146354d5f72776c5e4842356633662ce298ba590a71356a4f327c
326e5b7755734f223b634f6f306b4b543b5d374f47696538453832420a767b44324652293b7872543f60733d2d0a637277676a357839572c36463975
6a285643255c6630252637255b443c293a097c412d2f6961373d424b5b224660496834516a7e797d387b6442236042536b626a2c24615661424f542d
21632e5e2843765022744337733250307661615d39654a3a5a334d38254a412c6b532b4054307e28e298ba36704f7648e298ba2a2674275276723355
6f6d334251645652397a2230603948315747496c7129757d21482258505e5858446d234f5a2749093e3c7a37657829403c47293c455d5d24752d3171
27685d41362b22292128285976342f303324275345096e7e4751385a4167584a4a5c5d3b62466b54572d23594048e298ba5d213c3c6d2a782066377a
58485442575d7a3a62506038526037422959623073375d61512f4920645527305e6b235c343471685e2c7e4a383c2e57742a684033413c487e4d4f65
773d5e56506c23413643525e684845407b30385e6c2244256f4e2f235149e298ba57725a6c57272659344061374e64237e233e56425b495e353d2a64
5a315d564b3a57552d35464067595455594e3b350a3f2b7236240932253147202a5f385c4463410a7d47434d382246673c2964674e317c2b7b373c58
414a41332a6d4f78676e265c4944673f4f24664b537a663a5545435266482339796478444b3f393430473a6e795c7e655a33414d3d616c61206f4c3b
37435276444d42464b74644977647b6b6e60257628637b3f6f5a2b5d2c5f3f6c79576a713b687c2f095309444e406a275d556c3e6c51233766523065
25303f4a20315957746b09424f4b6548433e5e546c4068223041223837314b386c2a5f79442a4e272c287c565830532942535931743824515f667c65
5054203e71283c5009566f69393476727d7554785d262668353e2a53344747234b4c32526b54495539467c57485336515b33644e363e67417c772a67
2c7b624d4321722f5ee298ba094854384929435875683c7550514d55273e76466a4635363f57096051794d5e545d3e703e6f7e6b3c34282052482b3d
4f7745625f3b5a7c3d4a482e7a64255d4d375372764a4e2b463b385e3156662c286c48345d4a50676a3738485d3642e298ba4ae298ba4a424d376920
09787056225b53287e2666772e5558795c23636a347b39597962215b6947512153727c4a522176483e5c50e298ba3b574b2c5f4759615876284f244e
3225594a3b773b3c7d287c3c742761783047695950255a5b38345872636e4ce298ba7348242f2624322f35277649494233
```

**dag-cbor CID**

[testmark]:# (garbage-23/dag-cbor/cid)
```
bafyreig2hp5sjw4zyach3pvb7juq6rgsy6iwvuessve3xoaa7a3wfhmuum
```

**dag-json CID**

[testmark]:# (garbage-23/dag-json/cid)
```
baguqeerarpl3bcpwvhudy5hnalwa53zw3wyovftg6kejysegw4hhuxde27na
```

### garbage-24

**Bytes**

[testmark]:# (garbage-24/dag-cbor/bytes)
```
83a2667350745d315bfb3ff215379cc98e7e6746363d3b5f3b553b0000b869840e4b5cd82a582500017012209c00c83b53fec0fffc9505452b1e5947
1db20d94d27acf69cf2976a2f8925770a3623f7cf668414923747a2f646e590f93b3de9c596578ff1d9b60a0dedded46d0329ebaa6f3951c0c023f07
82102b92f3392b84c247e2fd2122cc64ba9cf715af2fd91f4fdf10986a08af7af86a7f7b0aac7cfe31e097023ed8c68954361cb0f02a37aaa791acaa
0cc8049806bd58b5d715fea690eff35c29e9ab042837bb299cd909b2b4e82a58852c69991508e657346c3424ae9a07ca337e3f94449cc60a358f7e09
5ce5fb8fda838fbf71a25d64c141632f2be54ca30a00815beb4f478b2f15414018865da3a57a9fdd1b0c82b5448cbc11e075f63d987ae3a3adac53b7
a06336fe6cda15d3ed77c102efb3753241df5ccf7d9dda92e86180bbf125f419e213db1f4ab10f37b55509af863e4fb0afa0283292dae33333cbf84d
6fea13f4c2aa9c46d482e98ce4d9456c067dad5ca91af09aa1751f2228a507e01ef74ec1d31092651deec547763521345585734f2bf51740b6ec2cb9
663a132354d82ca6ae420fb45ebefa8710f172a7cc002d1a8a39fa1ac80f9b8dd1219222e0e61e26ef8315a47cadf2573879b99e7f3679826d496d0d
870e31fd1fbcbde574d0a1bbcf7dc5a4b568e48a153c0526618d7224a54ca1635db9dd7e2837d15f916d895caa4ae62a63505cc66e38be9ad05a705e
b3bf43af07b5c918a2877667df9dc503ac8324fe55eb8f5a27c3558a75ab8de6b41434d7bece21a11e71ac0ba0382b9d859127f0ee89a2f55f37c987
6feb78590b2ac72d13aeca08d34e6d49ecc148205d3abe54896d5e1227631e4980ad1f87d0b22b7ea05df3f69bc91e8564e89942c630f106812e8f00
99184af000d8404d11d03343b871b9c901e42d25712b8c794706f4b4032e5293b1b0ed154fb13bb01cda6e3018926ca5ec0378042d231fbcbcd6d4b0
683f0d7deab1471d6365fa572149010b5ae4bdc16a8d3d6325ecc1805abbd0638ad8f753ee098123c74e0680e150bee92a14bb01e78784eca69cae7b
1ec40a91f90d3a2756bfbf2215cd3706176b5f70d24d97a5c139b011af4ad63feec1ee8218b7859537e098047fea51a10481548476fc632ccc2c7220
468fa9570fc1f94de0bbc8afe6c976f79b3dd66c0196453cc0230e07c6c0f1c81d584a955b896e636459194b23f694970488bf19ce3d6ee6fb86d241
613f58d9b7ca831fd6ab17dc352b375110e3508a10bf3abae39a2bd8cf8abaa850100dd89816e0f3cce5ffcab6fee03d3e91e4c2e2198362f7d11871
e3d0b302679961ca919024274689329fd1ee21ba5bf7176f7c01f3ed11de49fca2c930ca7798ea6ccd2359fcafbe72f24a3b147f8c842659ae0522dd
f30bd81b845f5aa4666acee50df0a631009d68db36fe60c3b9729608cb9af0e76db1cee5aa8d352635bf4d1e96d0b8caa224c16a9ca548c19048a850
f594d65d182417dea5b69a6f7fb25e5dc66836fbb1722e426837ce826fdb097a1b0a829ae43648ca42e3ea7a44031e104a0da32a06427ab56f11f2d8
b077123a9996c34756f83034f56687ba9ea49a779a65abde1dec429d398f41d7390c352acf63ae3e65a2c03688b9d8c2104fa3c75ba959fa0a8f5c39
6354076b869ba176e1a3243f29bbd966477ed5f850d33332c08a7cc51129334d189e03e17a430ff5a6d1e57dd35ab6803638721771ca270118c9bdc9
c3a8beb701ed68c5c64563aecae8be8128d3ab665afcfeb44b135418e8ca9e6635d7b9f05a718bd5302d7795e72c7868a88fb5712c1e7d8d8e10111b
e97bd15201957d01dbd65fb4fb771cc103e40acf3227546b25817389d1ccd88895743dbdd59e023d3a227c5643261b54d84ad7137e99a93e6a87af63
1e411b0b14c3e6ed9cbe98aa80630d854fbcdfed6d3f4944b45572ccdcdfc7960bb618cbe8d631f7a80f21dbf6c43cee5603887f473e01e2740d0e94
180dfa9ae9cafcaf1150540803d218906ef5a741e31df4d06f9dc4ee10e823e140e387c89bea7fdba99162235b28c915853d057c809eb3dc74698b10
0d481be061103f0b3313f53872dfd8461746cf280c035ffcd14c6d2611832c75b3e0c2bfbce10a76de9acd298bf4f4d6356a1036642bfc2b3846d53b
a23a4edb519a61bce45c7cda901390f3248357d3748a925fa87d1686117de334027a6e1b38f7ae95742d1c035b26e0477add4e27e394b7173a669bd6
4f4cd07eee791373843003745c6bea922e9b7c130ce314daf7181ce1613d1643cd5c9d9612e715df8b55ba9e88b408213cacf0417bb72b58b409f650
eec17b9ddec101941b63b7d27c87aab076cce9a7fd900c4e05d8db940b242d50ec4699b62935415fa339d90e860210af2a76646d1b3eb9c5dd5ad8c0
b3e66c3d793c8f9feb12b4df41988161f69635bdf632c04154ece048499b223e94a92fc7e1c9c49df5402ce3aec92f21bda0213c84b695e2e6071b7f
850f887b0392f9094f7ca9a95f5278703ebc113b2761714af42300e6c329ba186eec95f63d632e36d7dfaf6933dccfcffc2b067752611b4ac22b5826
114de2261f4c39e556691a056696ed538744039559130361b6973a21aa99f542246e2cf0e4753d693c7281d87f955e24f09b2610cf81e219f2ef0e38
a38029bc34d5e3d5d377e41a72a6f2c33923673db66c0757e4b3194e8147d5b6ec7d8ac2809c9dbfab6f1164cfe906d605d47498796691db98d2e0d3
81ae67bc34f30c60c8045cab33c2992efc4671fc871294275443191c8d781557044a29336ba908f0571b5165a72da99f643d9b5b01a9a8ef81e0a51b
7f44b494352544f43f4580b1c4b6df32e71d51611c5d291af79fe79eb64564a327c04287ab01bf2b5bb2c376ccab33677e4a66e5862495144e24800f
a82094fdaedc4caf09bb4df80252a62facf56d94411679ee1d19abc82aae4f0645b70cbb826a4cee739bab204bdca8241ee9426bb267ec35e5ae0ed7
29ef1ec64f83ee91d35fbe3c331c95fde0f18c28168e2cf1f9306bbd1d965f92feff5557cd50d71dcca98c4906310a273ea9516025c568cad74a7712
46b5dffe321bb5843e0f8ff8355662f682d45882ff4a9dd97f8b64c2311251b2b92258ba142b7795fcb85d59d047da1de11888510f6ca26c14b75a75
9917285d8264db6e8ee2b826b2540445a64d58e441b710fc917991d46ded25038163c8a20d551c21bbb3bd1242158375483db78d1942942dd3d23438
1994f9f4566ae9aa1cbcb36e7e76003c4da87a86b9ee05b762e6bc3a6c8346bbe7b4fe570d42e53fc0aaee8d12446cbcf4285888f7636d545cb984f1
f642922c11b639c6941efbe84671fcfdc3c211e504c7384876d425b9087e4dec99661f3da8893f992d668e9c5e773573c644f9919295b58cf39f83ef
a82cebb93a583f7084ecf7999b50851130ebdb7ec82b423332fee485fe5e1194de2b6ee7745017b1b93d11ece3d8e87900a3661870354632203e8ad9
9a814c6a4c867cf70cbca9b18d4616afaecd7c2274eac881be1b9b673f6c330920c24fa9249a076796d10e722fe3b187af80e08af84a809722292443
d4c877d3d22d0bc3439a8a6796eb21424ac617beceb46e976c9d105424530ae8298602c9430126a4ec6d7319ac94ea0a071c46462545c2eae8422af6
534ccf55d2fb027424bce7a13d11425c3ab8bd4b903999d7b6b1c6039c6f219c42ecef930928b582de2f22fa4b2f48fc9163f99400c3d0d511c59562
e957991b8664919ee13416ab714212155f1102d219af2d8cdb62d01278c070a67fef5b0a2ba35ed4addba9634e2f5763b99b3b6e9964dfb58b5ccfc1
29d162ddd4d795e497b344d02c160a833b6b9cbb36dcc6f20a66e231be456e1d64f6bd35fce231ed69243655934b9975a6a141f86346adc94c62db55
6d7ac975c23825d7c28ad8079fe1e6eef986d60551e57b7b62a028f67cc174d0df073e630f89aa25c8ceb4b4fe83c89f0d8ea9dea261c0dead94daf0
c2d0584d4c224c0740a177c0ebfe89558ef82cf6f101908ecfdcc87c42076f85aa839c178b893c2391a6a904f4a28a5ba75bb0803914e6dc48e64164
625d13e30793e7e38ee98c5bc2edbcfd7d5cf65e6745a19a285adcba04dbe21947ccbde087493dd8aa98cf8238e09d67efda5319c1a87af8ed8891c4
18766880aa80a9bedd2ac9f5ab9274db1ce89a7d53d8189fd23a12eb1869b806d8bf5d10f55625d3d97a36ff2cf97fdbb63a0b6d60edd4e66c88039e
f98b3dd1bbbcc8933f73baec05c0fe7ce4916e2db804beedd2b8a0720b90569eb7a9db9e861b7dca7f17cf139fc2a330c2c3ca3eef74b4bc039015e6
048ad60f3a111721be3c75aca5b14b4697e0844f2000a370c272b00df2704b340d774af03385c723683937f1c44e4a7675b6d4e5ca382326ad2e7b8e
4bb8a8b456d0311ac1c61c18674e1c15df73c6fe76c6e5eb446ad5bba034fc7071578ab399cec7c1110441456ec81f498b6a6a61e10f265842b07307
c8baca9daf5478ac61775e193c81f60e12bcf7439bf73e82b019ee84422e4afbde340c3a4e10eceaa51b6d749c5a8395214a21e73071ec21416f059b
af6f72d41a6f03b66cf0e65fcb5c7853791778c3ac9b0691cb3d98dc3c108371f4df99c110661dae5b0149e399cc8826a6d3acadfac8db1f7184fa77
4ca131cf687e3f2f05bd973241f171b7bec8e0bdec97cce5420eeec1fc7348028242dfb1ac2c5e0ab1c0cec96cde8edc74501373f02da9f7bf9aacd3
5a2b5081b974d3b697fda697fc6463001d33707f82f1b1ce9d085c359a74854032eab11b50ab2823e4d59bdffe719d9e56e545d5d81a82108a5bf824
6e56aeae82996c4de2e9180f2c36468e2212094be6020b3874f9020e2999169a3a83cd261ee57a7ab7cbc5e121d5515ad2412febaef29d45a2b955b9
972b300e70dd72e70f2499051d2261789f2d9a97fc669a21e7d67ac6c3d555df63ff774767761a307d9d871c0e88b7f6fef9f223e7791369e2612927
82c8e34d1223bf824eeefc595baebe78e907a23136c727ca84e89aadd574af00ccfccb319a338990ec54e0afc24c94d889018ad25a8308f7a02474dc
3cf6ad346d6ea2b0484a079b93aaa02e4cd953e97c9b6ddc80e5f71fda8700c6484a63b96cfdc20d8a79eba1ba68b17e056861358ae5bf5025c52dfb
7a611406391f7a2368b084f1895bffec20e08fe08671a6b82f020df770215b4ff9f2fea06cf34ec85398ff28cb4b784587b879b692a6c2246b90d78b
47b1d0c57cf859f38d3af04ebc5f444494c1ad51fd1494a44c516388831a9f774bff27a630056acb1ec47f294ac968438936dab04e4e5a6a4a3f65a9
5fe32e6ccf2d86f0af18f022c09b70886887c5437fe8331e8b7089d26a401952b4f52a99296efe98b2e06d7107b5e308202d5268ffa6b1aea81b7018
fbc9c4ad3a7e34c7c77fd09943c15f5336e48d162b61999c7a205f935f04a8525140b88cd57161086bcdb3493511589369a7cd3f5df564a5f88faefa
b3812f6c89f7dc01b7802848fd8ff73a7a4ff32822f2f800a2e000364a0b5c69b831b2051975ae00715b04762b340faca09daef819f303096398d749
67538e2d41f4a95825c90ad8dd9c6f5c5e05cfeb31dd62f72b5ec5cd53522a18071f7218a0bf85b47fbef6e4791852419d8c67f4387da9ed33a42fd2
7175443d3b507a436375577a76445932716fd82a58360001a902153095f1cadc5453bcda98808d2d322cf037928e07e32165999e345855cdb2fd5669
0f05b9c72eefc8f3240f60a1706d8e86
```

**dag-cbor CID**

[testmark]:# (garbage-24/dag-cbor/cid)
```
bafyreig3fe66o7torlsuaphj7qzyouh3fb27attx5cbdxce77rhhajibmu
```

**dag-json CID**

[testmark]:# (garbage-24/dag-json/cid)
```
baguqeeravnry564cs43i4lg35ig23fwqu6vwgn6kyyd7ruaaztvufacjlooq
```

### int--1

**Bytes**

[testmark]:# (int--1/dag-cbor/bytes)
```
20
```

**dag-cbor CID**

[testmark]:# (int--1/dag-cbor/cid)
```
bafyreibwvht7dsk3ql73tf2d4dc4jtuv3a6juqykvrm7qtxtzp5lmfcqna
```

**dag-json CID**

[testmark]:# (int--1/dag-json/cid)
```
baguqeeradowwxdhzoey7z2vykq7id53vogk7xmotnm3w52muvuopc5uzyrsa
```

### int--100

**Bytes**

[testmark]:# (int--100/dag-cbor/bytes)
```
3863
```

**dag-cbor CID**

[testmark]:# (int--100/dag-cbor/cid)
```
bafyreiek7xrdy2ej7xqapz2iofeuwo4yl43xrklokxd3k5jwpkcmos4os4
```

**dag-json CID**

[testmark]:# (int--100/dag-json/cid)
```
baguqeeraxfvtantde5ytjeyi7o7f26r7h53czhuph3w5k6c3cp7telqf7woq
```

### int--11959030306112471732

**Bytes**

[testmark]:# (int--11959030306112471732/dag-cbor/bytes)
```
3ba5f702b3a5f702b3
```

**dag-cbor CID**

[testmark]:# (int--11959030306112471732/dag-cbor/cid)
```
bafyreieir43khjzemsmgahaozab2vjvtdxavszixhhurvdqg2xkhrwinyi
```

**dag-json CID**

[testmark]:# (int--11959030306112471732/dag-json/cid)
```
baguqeera7wvij7ilupcksz2iuprb3wbcipr5vqzvvzj26psnj2oky6j7spva
```

### int--256

**Bytes**

[testmark]:# (int--256/dag-cbor/bytes)
```
38ff
```

**dag-cbor CID**

[testmark]:# (int--256/dag-cbor/cid)
```
bafyreigdjo5suzljxlmtuj4eoohou6vadwznc4kkdfd4xsarc5sycz76oy
```

**dag-json CID**

[testmark]:# (int--256/dag-json/cid)
```
baguqeeral3yqlgtwwsyi4myxu7jqc2w23c2vmpesejnjca73w3beym4f6d5a
```

### int--2784428724

**Bytes**

[testmark]:# (int--2784428724/dag-cbor/bytes)
```
3aa5f702b3
```

**dag-cbor CID**

[testmark]:# (int--2784428724/dag-cbor/cid)
```
bafyreiegsmviy5gqtupkwtz7d4driei2jzbf4tg3yldpc6ralqjukiywru
```

**dag-json CID**

[testmark]:# (int--2784428724/dag-json/cid)
```
baguqeera3kxfhk4svgchnaltrgtr6zhqheybpxsptkvf43byc5nht5wgxu2q
```

### int--3

**Bytes**

[testmark]:# (int--3/dag-cbor/bytes)
```
22
```

**dag-cbor CID**

[testmark]:# (int--3/dag-cbor/cid)
```
bafyreiekgmp53zydf4z2ohq3fysx3aawny2i4ah4wf4rj5el3nl2drrqa4
```

**dag-json CID**

[testmark]:# (int--3/dag-json/cid)
```
baguqeeramfn52f6ckvxyf44ehexkqvl7rteiwa2qdr2z4iyjhkylfknvzvea
```

### int--501

**Bytes**

[testmark]:# (int--501/dag-cbor/bytes)
```
3901f4
```

**dag-cbor CID**

[testmark]:# (int--501/dag-cbor/cid)
```
bafyreigwygio7woulumjyyylkawalinrei75k3ejc47mcnbnh2voqfikoy
```

**dag-json CID**

[testmark]:# (int--501/dag-json/cid)
```
baguqeerauj7u5hvh53p5gieuicpcltpkspublw37bztjmmtvsjwta5wso53a
```

### int--6433713753386424

**Bytes**

[testmark]:# (int--6433713753386424/dag-cbor/bytes)
```
3b0016db6db6db6db7
```

**dag-cbor CID**

[testmark]:# (int--6433713753386424/dag-cbor/cid)
```
bafyreickfy6hbb7xz6eiervs4n3jkmnzc2ndbh4flg2jmbz4whoflbdbnm
```

**dag-json CID**

[testmark]:# (int--6433713753386424/dag-json/cid)
```
baguqeeran4ulgjno74x4h6ltzdg5g4yq7rgc4wnhmqhrs4ae76yibbtdjktq
```

### int--9007199254740991

**Bytes**

[testmark]:# (int--9007199254740991/dag-cbor/bytes)
```
3b001ffffffffffffe
```

**dag-cbor CID**

[testmark]:# (int--9007199254740991/dag-cbor/cid)
```
bafyreifyx757rmvmwx42wig6lkhgpe2hikvsfu5d7ru55fyhugqoq2leii
```

**dag-json CID**

[testmark]:# (int--9007199254740991/dag-json/cid)
```
baguqeerajsjturllxdzotcklfufsmsaehhgxfvjpxcrhzp4p27zsh4rmpakq
```

### int--9007199254740992

**Bytes**

[testmark]:# (int--9007199254740992/dag-cbor/bytes)
```
3b001fffffffffffff
```

**dag-cbor CID**

[testmark]:# (int--9007199254740992/dag-cbor/cid)
```
bafyreictwassa7oj2p67275p5xztivqa3zcspn3zrilgohy3jwrv43klkm
```

**dag-json CID**

[testmark]:# (int--9007199254740992/dag-json/cid)
```
baguqeeraqpqqtp6x7neyjnd2i3zwgyt4ddn327sx4nvqlicm2frngbg7oluq
```

### int--9007199254740993

**Bytes**

[testmark]:# (int--9007199254740993/dag-cbor/bytes)
```
3b0020000000000000
```

**dag-cbor CID**

[testmark]:# (int--9007199254740993/dag-cbor/cid)
```
bafyreicb5jhmhsjiazef7gbina6ozd2er7jugqaapmhvbhvubjc6ech2ie
```

**dag-json CID**

[testmark]:# (int--9007199254740993/dag-json/cid)
```
baguqeerapv5k6hghxidzpxmfnypub7e7hxia24fus7rs7nsjh6vklb5zaq2q
```

### int--9223372036854776000

**Bytes**

[testmark]:# (int--9223372036854776000/dag-cbor/bytes)
```
3b7fffffffffffffff
```

**dag-cbor CID**

[testmark]:# (int--9223372036854776000/dag-cbor/cid)
```
bafyreidh4mvwi7pnv62beigtnibakkxpsgjzua5g7kdvu2deltah6kigay
```

**dag-json CID**

[testmark]:# (int--9223372036854776000/dag-json/cid)
```
baguqeeraqu4gi57tv5d6jiftbdxdwotirxyw5czcfaif3v6u3tkcvgahzn4a
```

### int-0

**Bytes**

[testmark]:# (int-0/dag-cbor/bytes)
```
00
```

**dag-cbor CID**

[testmark]:# (int-0/dag-cbor/cid)
```
bafyreidogqfzz75tpkmjzjke425xqcrmpcib2p5tg44hnbirumdbpl5adu
```

**dag-json CID**

[testmark]:# (int-0/dag-json/cid)
```
baguqeeral7wowzx7zbxtrwkspbwg22lmphbnxqrz3vhjdndhfhltuj73k7uq
```

### int-1000000

**Bytes**

[testmark]:# (int-1000000/dag-cbor/bytes)
```
1a000f4240
```

**dag-cbor CID**

[testmark]:# (int-1000000/dag-cbor/cid)
```
bafyreiglx3aucayuplysf7vp6jazvwef2nznas75tufpc4kn2ig76jfw4m
```

**dag-json CID**

[testmark]:# (int-1000000/dag-json/cid)
```
baguqeeranthdnwpyvhqvdmiaenfpoxgkrhkvxs4uyfj7kgch3267d444vzcq
```

### int-11959030306112471731

**Bytes**

[testmark]:# (int-11959030306112471731/dag-cbor/bytes)
```
1ba5f702b3a5f702b3
```

**dag-cbor CID**

[testmark]:# (int-11959030306112471731/dag-cbor/cid)
```
bafyreifystp4hw2d3psdtqoairwnsl4mmb2hyupopdp7wxvrxul2cdadbe
```

**dag-json CID**

[testmark]:# (int-11959030306112471731/dag-json/cid)
```
baguqeerajogb5uql6gilrcfykgsqh6yjdj65vptw7woitskev6dli6bxohga
```

### int-18446744073709551615

**Bytes**

[testmark]:# (int-18446744073709551615/dag-cbor/bytes)
```
1bffffffffffffffff
```

**dag-cbor CID**

[testmark]:# (int-18446744073709551615/dag-cbor/cid)
```
bafyreibnpsyje7iwfx3smzlnofkxqdyeqz3a4qzhwu33ktibq7sxeckrpq
```

**dag-json CID**

[testmark]:# (int-18446744073709551615/dag-json/cid)
```
baguqeeraftnsmjs3jxdf4o2e22kpcip5nxuzxhslrlt7bdmex6uvg5rvvzbq
```

### int-2

**Bytes**

[testmark]:# (int-2/dag-cbor/bytes)
```
02
```

**dag-cbor CID**

[testmark]:# (int-2/dag-cbor/cid)
```
bafyreig3yg2msah74sgvow25uxddqbabex3f3mh6hysess3w5kmgiv6zqy
```

**dag-json CID**

[testmark]:# (int-2/dag-json/cid)
```
baguqeera2rzv4orglylo5yb7lfyyxg25amazyb6yw3cr7eg2hjtg53atvm2q
```

### int-255

**Bytes**

[testmark]:# (int-255/dag-cbor/bytes)
```
18ff
```

**dag-cbor CID**

[testmark]:# (int-255/dag-cbor/cid)
```
bafyreih4vluto2froiw457akazzjhcfm7y22juemxx6jsyyjufp227tcv4
```

**dag-json CID**

[testmark]:# (int-255/dag-json/cid)
```
baguqeerasvllqjezzqfk7bvo47yneu7bprq3p33t2sfcsxzx3ghqrmcp7j7q
```

### int-2784428723

**Bytes**

[testmark]:# (int-2784428723/dag-cbor/bytes)
```
1aa5f702b3
```

**dag-cbor CID**

[testmark]:# (int-2784428723/dag-cbor/cid)
```
bafyreiga5hy6mxnej7eankwq2zi7echorwp7wfkoeto6l3262rxn24r65m
```

**dag-json CID**

[testmark]:# (int-2784428723/dag-json/cid)
```
baguqeeraqd7q5jz4bytomeikdvakzzt3qbjkcrczafx3gu6s6t2c244goziq
```

### int-500

**Bytes**

[testmark]:# (int-500/dag-cbor/bytes)
```
1901f4
```

**dag-cbor CID**

[testmark]:# (int-500/dag-cbor/cid)
```
bafyreifvxhnllfzufgihevzlj62j34nmzrlzfdjb5pwyqe5675meqi6o7q
```

**dag-json CID**

[testmark]:# (int-500/dag-json/cid)
```
baguqeeraaycm2mjy73wsalxsspqgfwrpi4qpo6qf2jpoanvhuaojz7g5d4fa
```

### int-6433713753386423

**Bytes**

[testmark]:# (int-6433713753386423/dag-cbor/bytes)
```
1b0016db6db6db6db7
```

**dag-cbor CID**

[testmark]:# (int-6433713753386423/dag-cbor/cid)
```
bafyreie2fdkdrtj4mmdpcryivf4uuvirpz6ehzgmt2w2ks6s6qsrlj4k3a
```

**dag-json CID**

[testmark]:# (int-6433713753386423/dag-json/cid)
```
baguqeerahcqj2m4gchiq7ldwio6lw2js2b5o73th43sw2ulioqxsrlmf5voq
```

### int-65535

**Bytes**

[testmark]:# (int-65535/dag-cbor/bytes)
```
19ffff
```

**dag-cbor CID**

[testmark]:# (int-65535/dag-cbor/cid)
```
bafyreicft66te6utk6chakwkgyqxirmsh6dzjyi34c4kf2pzwpvjxaaose
```

**dag-json CID**

[testmark]:# (int-65535/dag-json/cid)
```
baguqeera6l4j5xuopvft2isd32q4vfvy5tsw66jychmxbc2kaga37anfaaiq
```

### int-65536

**Bytes**

[testmark]:# (int-65536/dag-cbor/bytes)
```
1a00010000
```

**dag-cbor CID**

[testmark]:# (int-65536/dag-cbor/cid)
```
bafyreibjfaasdb7qgrdnd2pmg7noltevqzswyif5nyup6sktdanzgpft6a
```

**dag-json CID**

[testmark]:# (int-65536/dag-json/cid)
```
baguqeerab4sv5qleqlbuh7ijtouwncddo6f6idobm2tik2y5i4haxsl4y36q
```

### int-9007199254740991

**Bytes**

[testmark]:# (int-9007199254740991/dag-cbor/bytes)
```
1b001fffffffffffff
```

**dag-cbor CID**

[testmark]:# (int-9007199254740991/dag-cbor/cid)
```
bafyreiau6uboriydiauixhnjr3kv3hzdbsfjf3uggnqzrx3ndnhcpdz5dy
```

**dag-json CID**

[testmark]:# (int-9007199254740991/dag-json/cid)
```
baguqeera6qfuepbn3fp7fmxqe7rcechuhdhxequgfzphi2da42ltbde23uta
```

### int-9223372036854775807

**Bytes**

[testmark]:# (int-9223372036854775807/dag-cbor/bytes)
```
1b7fffffffffffffff
```

**dag-cbor CID**

[testmark]:# (int-9223372036854775807/dag-cbor/cid)
```
bafyreih2npqkh2altk6fydcmxj4kibc6qj5p44r7jnktdw22txixdi2qli
```

**dag-json CID**

[testmark]:# (int-9223372036854775807/dag-json/cid)
```
baguqeerawnfbymfhcx3l7c3siox2p6vyqphdmevxemlrnpolxxazqlq25uuq
```

### jwe-asymmetric

**Bytes**

[testmark]:# (jwe-asymmetric/dag-cbor/bytes)
```
a5626976705138787050745f7a5a7266764867522d63746167766a78486a63567573753079724f427a772d4578357a416970726f7465637465647833
65794a68624763694f694a535530457454304646554330794e5459694c434a6c626d4d694f694a424d6a553252304e4e496e306a6369706865727465
78747820575461773657657168615a44446865647a47596e73747934534d522d527a4f776a726563697069656e747381a16d656e637279707465645f
6b6579790156457159614e3464464548307658346a55336437363868774f5953675a68456c7656447a7164494b4136504648734c345050774a374549
7565624c72787741424a715857424e47306b5542526a487543763531566c78765839576f4839696b375165773079524f4347426a5f414a6566313550
695a7a5556555177746548564475535173344f63734d666a31387a635f4f62736b4876554d614e3050644342412d475f5f3772475232746359534a4f
7977627678717154454e73435a4e7661734b7848534f75415f626a5673526d576c6f554d774c4a6b726251785041735663776f506a41594632616751
3844343041474656457a476d6851444c492d4f7058492d41665a594275724537665f66555f4e735974716d466a35765a396c765643563151735a615f
485268516c424248786a544b7943427566592d3047346f6d74326e7a5968794f2d5461483434655568383148467a7777
```

**dag-cbor CID**

[testmark]:# (jwe-asymmetric/dag-cbor/cid)
```
bafyreihkt4u6euddfhofkutfzxwet7w7zm5qrjpop655yhnb5dnzqw26lm
```

**dag-jose CID**

[testmark]:# (jwe-asymmetric/dag-jose/cid)
```
bagcqceraqfknq7xaemcihmq2albau32ttrutxnco7xeoik6mlejismmvw5zq
```

**dag-json CID**

[testmark]:# (jwe-asymmetric/dag-json/cid)
```
baguqeeraloya3qpa25kl5l4y3bzgl7rhyta2p7lwaocyxx4vpvdligb7mt2q
```

### jwe-symmetric

**Bytes**

[testmark]:# (jwe-symmetric/dag-cbor/bytes)
```
a462697670505357497541794f38437065767a434c6374616776575a414d42626c687a44437351574f414b646c6b53416970726f7465637465647827
65794a68624763694f694a6b615849694c434a6c626d4d694f694a424d54493452304e4e496e306a6369706865727465787478203358714c5732384e
48502d7261715738764d6649484f7a6b6f344e3349526152
```

**dag-cbor CID**

[testmark]:# (jwe-symmetric/dag-cbor/cid)
```
bafyreicxyzuqbx5yb7ytkgkuofwksbal3ygtswxuri25crxdxms55m5fki
```

**dag-jose CID**

[testmark]:# (jwe-symmetric/dag-jose/cid)
```
bagcqceraxazmu67crshzqdeg3kwnfschs25epy5sbtqtjre2qw3d62kzplva
```

**dag-json CID**

[testmark]:# (jwe-symmetric/dag-json/cid)
```
baguqeeraovfm3rr3pvmxm27zgvxp5wycbfih35xih2uznminpnds5esm4jlq
```

### jws

**Bytes**

[testmark]:# (jws/dag-cbor/bytes)
```
a3646c696e6bd82a5825000171122089556551c3926679cc52c72e182a5619056a4727409ee93a26d05ad727ca11f4677061796c6f61647830415845
5349496c565a5648446b6d5a357a464c484c68677156686b46616b636e514a37704f6962515774636e796848306a7369676e61747572657381a26970
726f7465637465647465794a68624763694f694a465a45525451534a39697369676e617475726578562d5f394a354f5a636c356c5675526c6749314e
4a457a633046714562365f327956736b556151506475635251346f652d4e35796e436c353777446d345350746d314c31626c74727068705165424f65
576a5657314251
```

**dag-cbor CID**

[testmark]:# (jws/dag-cbor/cid)
```
bafyreihdfxoshbhowufyvjk7kq46dt6h7u6byejmlnifz34z7ocoq7ugk4
```

**dag-jose CID**

[testmark]:# (jws/dag-jose/cid)
```
bagcqceraxvt5izt4sz7kjfrm42dxrutp6ijywgsacllkznzekmfojypkvfea
```

**dag-json CID**

[testmark]:# (jws/dag-json/cid)
```
baguqeeravexfd6qijjtnzxfqq6kgknnkncztgmvhjhxm6ih352qskolt2gxa
```

### map-1_pair

**Bytes**

[testmark]:# (map-1_pair/dag-cbor/bytes)
```
a1616101
```

**dag-cbor CID**

[testmark]:# (map-1_pair/dag-cbor/cid)
```
bafyreihltcnuuyqp2jm24aqydpnlj7b6w3ogwrplomrjtg5rifv44mmjey
```

**dag-json CID**

[testmark]:# (map-1_pair/dag-json/cid)
```
baguqeeraafnl2724yv5c3wklowipaswybbbhhec64m7mltv6vzrco2ux7bra
```

### map-1_pair_rev

**Bytes**

[testmark]:# (map-1_pair_rev/dag-cbor/bytes)
```
a161316161
```

**dag-cbor CID**

[testmark]:# (map-1_pair_rev/dag-cbor/cid)
```
bafyreierz7t5y4xa635mndfb2i7wu2zxzfnpl6xvg5wr2kxeambtrgvsuy
```

**dag-json CID**

[testmark]:# (map-1_pair_rev/dag-json/cid)
```
baguqeeracp3z5isr4gpufnhd7pf7kj3g3ye5zqjoaw2w4vziudcg4jkziikq
```

### map-empty

**Bytes**

[testmark]:# (map-empty/dag-cbor/bytes)
```
a0
```

**dag-cbor CID**

[testmark]:# (map-empty/dag-cbor/cid)
```
bafyreigbtj4x7ip5legnfznufuopl4sg4knzc2cof6duas4b3q2fy6swua
```

**dag-json CID**

[testmark]:# (map-empty/dag-json/cid)
```
baguqeeraiqjw7i2vwntyuekgvulpp2det2kpwt6cd7tx5ayqybqpmhfk76fa
```

### map-keysort

**Bytes**

[testmark]:# (map-keysort/dag-cbor/bytes)
```
a9616601626565026364646403646363636304656262626262056661616161616106666161616161620766616161616163086661616161626209
```

**dag-cbor CID**

[testmark]:# (map-keysort/dag-cbor/cid)
```
bafyreifzcy56s5jog3scrc7c3rlaohrwu3recxgf5c7fddfjlnlhh6p6p4
```

**dag-json CID**

[testmark]:# (map-keysort/dag-json/cid)
```
baguqeeraiqj4qsbirp34qohua5y4veoy7idxot4yh6r2qghoxisadibfwbgq
```

### map-nested

**Bytes**

[testmark]:# (map-nested/dag-cbor/bytes)
```
a1666f626a656374a16477697468a26134666e6573746564676f626a65637473a161216121
```

**dag-cbor CID**

[testmark]:# (map-nested/dag-cbor/cid)
```
bafyreib7zq4mhl7fwtmftjn7d7mmlwf6gi32vimlsjkn25w2e5xlhz2deu
```

**dag-json CID**

[testmark]:# (map-nested/dag-json/cid)
```
baguqeeraf5gk7lfzh2l2hgbsqiv5z4oj5kxhnv6keki7zvcsont3ejnou4bq
```

### map-with_complex_entries

**Bytes**

[testmark]:# (map-with_complex_entries/dag-cbor/bytes)
```
ae636f6e651b0016db6db6db6db763736978206374656e3b0016db6db6db6db76374776f1a0001000064666976650064666f757202646e696e653aa5
f702b365656967687438ff65736576656e226574687265651901f466656c6576656e426131667477656c76656fc48c6175657320c39f76c49b746521
68666f75727465656ea4616664666f7572616f016174026274680368746869727465656e840203046466697665
```

**dag-cbor CID**

[testmark]:# (map-with_complex_entries/dag-cbor/cid)
```
bafyreia3jgnpn6w3wpvdc7qlyv7rkqjmxrrdaqohtgmwwje5mbpcef6hkq
```

**dag-json CID**

[testmark]:# (map-with_complex_entries/dag-json/cid)
```
baguqeerayn5yb7xbzn7uohi4mji43ukajlmigatpoqskccsb6inxjkay44xq
```

### null

**Bytes**

[testmark]:# (null/dag-cbor/bytes)
```
f6
```

**dag-cbor CID**

[testmark]:# (null/dag-cbor/cid)
```
bafyreifqwkmiw256ojf2zws6tzjeonw6bpd5vza4i22ccpcq4hjv2ts7cm
```

**dag-json CID**

[testmark]:# (null/dag-json/cid)
```
baguqeeraoqru5gfp45ey7no26hzwvqwxrlgdhfde7fihao4magmjf6mcxefq
```

### string-Hello__world!

**Bytes**

[testmark]:# (string-Hello__world!/dag-cbor/bytes)
```
6c48656c6c6f20776f726c6421
```

**dag-cbor CID**

[testmark]:# (string-Hello__world!/dag-cbor/cid)
```
bafyreigmgu7icw3p3lf3prtti7x3o7vsc6e5peltjinsa7zni2axvlz5cm
```

**dag-json CID**

[testmark]:# (string-Hello__world!/dag-json/cid)
```
baguqeeratz333n5xwz564v76cckgvqbhly4fqxdirlhehhmw3axl64ocmsla
```

### string-a

**Bytes**

[testmark]:# (string-a/dag-cbor/bytes)
```
6161
```

**dag-cbor CID**

[testmark]:# (string-a/dag-cbor/cid)
```
bafyreiewdnw5h3pdzohmxkwl22g6aqgnpdvs5vmiseymz22mjeti5jgvay
```

**dag-json CID**

[testmark]:# (string-a/dag-json/cid)
```
baguqeeravsgygqv3wi3c2e7quvm2gyq3wqdqce3irfiwjnriuvhx7qz7yq6a
```

### string-empty

**Bytes**

[testmark]:# (string-empty/dag-cbor/bytes)
```
60
```

**dag-cbor CID**

[testmark]:# (string-empty/dag-cbor/cid)
```
bafyreiengp2sbi6ez34a2jctv34bwyjl7yoliteleaswgcwtqzrhmpyt2m
```

**dag-json CID**

[testmark]:# (string-empty/dag-json/cid)
```
baguqeerackxdfsy6yawqd3ndlanre7a75y5q3rjvolwwxlzds4q2apmc4eta
```

### string-long-8bit

**Bytes**

[testmark]:# (string-long-8bit/dag-cbor/bytes)
```
78964c6f72656d20697073756d20646f6c6f722073697420616d65742c20636f6e73656374657475722061646970697363696e6720656c69742e2044
6f6e6563206d692074656c6c75732c20696163756c6973206e656320766573746962756c756d20717569732c206665726d656e74756d206e6f6e2066
656c69732e204d616563656e6173207574206a7573746f20706f73756572652e
```

**dag-cbor CID**

[testmark]:# (string-long-8bit/dag-cbor/cid)
```
bafyreihqv76sm2eewjedoh2pdhefkvii4mkebleegrc5lu3rmdu4hbjli4
```

**dag-json CID**

[testmark]:# (string-long-8bit/dag-json/cid)
```
baguqeera2lqzjgcpgqpn7ofg2fnbdovui73p3lqbcrd4kc7uywzxose55yoa
```

### string-Čaues__ßvěte!

**Bytes**

[testmark]:# (string-Čaues__ßvěte!/dag-cbor/bytes)
```
6fc48c6175657320c39f76c49b746521
```

**dag-cbor CID**

[testmark]:# (string-Čaues__ßvěte!/dag-cbor/cid)
```
bafyreigxqkzjak6m4vnenitdpwfryihbvy3wotdle2ldsfgkebeh56ruda
```

**dag-json CID**

[testmark]:# (string-Čaues__ßvěte!/dag-json/cid)
```
baguqeeradlrdqvxqd3cbbbtsmn7n4mpadvtqvcvj2ggkcf6mx76jzsrxzboa
```

### string-水

**Bytes**

[testmark]:# (string-水/dag-cbor/bytes)
```
63e6b0b4
```

**dag-cbor CID**

[testmark]:# (string-水/dag-cbor/cid)
```
bafyreib4565nbj4j6mklcrwjqgdv3uw4i6fr5dqb4dpqcqtsgrzeyg7hmm
```

**dag-json CID**

[testmark]:# (string-水/dag-json/cid)
```
baguqeeramndlngq22zwtjgdxrye2qsdo7k3dltx7clrq566p6jxb5zhgaywq
```

### string-𐅑

**Bytes**

[testmark]:# (string-𐅑/dag-cbor/bytes)
```
64f0908591
```

**dag-cbor CID**

[testmark]:# (string-𐅑/dag-cbor/cid)
```
bafyreihgpl6u5kyypvntwaijdv7wxeiuugo6ruujt652eigmp27zarclam
```

**dag-json CID**

[testmark]:# (string-𐅑/dag-json/cid)
```
baguqeerakloumxm3cyyspmsadsj7edgbvpgttahpjgcfpqxpliq4hryzrxgq
```

### true

**Bytes**

[testmark]:# (true/dag-cbor/bytes)
```
f5
```

**dag-cbor CID**

[testmark]:# (true/dag-cbor/cid)
```
bafyreibhvppn37ufanewvxvwendgzksh3jpwhk6sxrx2dh3m7s3t5t7noa
```

**dag-json CID**

[testmark]:# (true/dag-json/cid)
```
baguqeeraww7kig3mmi7xycprx4snzlsy5ovtydg5scwzm26ehjc3isdh4evq
```
