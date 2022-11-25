---
title: "cross-codec fixtures"
weight: 34
description: "Cross-codec fixtures for dag-json."
---

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

#### Bytes

```shell
5b325d
```

#### String form

```json
[2]
```

#### dag-json CID

```shell
baguqeeraaoewnxu7nonjagzawtdmvczkiyaj73v6amn2xscc2q3jbqf4eivq
```

#### dag-cbor CID

```shell
bafyreihdb57fdysx5h35urvxz64ros7zvywshber7id6t6c6fek37jgyfe
```

### array-255

#### Bytes

```shell
5b3235355d
```

#### String form

```json
[255]
```

#### dag-json CID

```shell
baguqeeraqu2ktsh23n37sd632fp4cmexypune5zki6s23wfygkoemrumjmra
```

#### dag-cbor CID

```shell
bafyreick3uapgoe63rizj6rptbqwl7pagin26fos32n37fu7uktzcadcdu
```

### array-3,4,5,6

#### Bytes

```shell
5b332c342c352c365d
```

#### String form

```json
[3,4,5,6]
```

#### dag-json CID

```shell
baguqeerazwaj2gukf64chujcb3lhbnndbpx4kssdjcfp4f7pbkkmlrd5ohtq
```

#### dag-cbor CID

```shell
bafyreid7y3kwce6omkwi4ziyisf5v2niknzjwab2ofigddwm3bq4xlnovy
```

### array-5-nested

#### Bytes

```shell
5b226172726179222c5b226f66222c5b352c5b226e6573746564222c5b22617272617973222c2221225d5d5d5d5d
```

#### String form

```json
["array",["of",[5,["nested",["arrays","!"]]]]]
```

#### dag-json CID

```shell
baguqeera7mqnrv3sxsqeaxf23poe2lyztcxjomr7alr2oapf7slfdrr5ai7q
```

#### dag-cbor CID

```shell
bafyreihmxfmn5wcpzpiqa6zfefgabxmd2jzr2bd4y2v7c2ss4plkgkabgq
```

### array-500

#### Bytes

```shell
5b3530305d
```

#### String form

```json
[500]
```

#### dag-json CID

```shell
baguqeeraqjtyxb73lijycba3pidm5fwai4arowgebxo6yd7rdmmdqqwjzqha
```

#### dag-cbor CID

```shell
bafyreidasbkb6vj3obxxqqgiz2ahvw7iaxmj446bbnrroj3jt6vzpo5fhm
```

### array-6433713753386423

#### Bytes

```shell
5b363433333731333735333338363432335d
```

#### String form

```json
[6433713753386423]
```

#### dag-json CID

```shell
baguqeerartozez7h34sfzszo3gpcu6mjql5zd57mh6qhmcwf4enmgtukce7q
```

#### dag-cbor CID

```shell
bafyreifflym5ibfezh3vwegpsh6hngjeczrjw35a7fsgsfqui4vgy2eawu
```

### array-65536

#### Bytes

```shell
5b36353533365d
```

#### String form

```json
[65536]
```

#### dag-json CID

```shell
baguqeeradd2npofdzz4gl4stit2bkixizy3dlvmqrfbjif3dwc6beh556mbq
```

#### dag-cbor CID

```shell
bafyreiarke72vvg3sfs2nrpzpgnxs7dqcdu2e4ytixgo7snkyoq5w7oddu
```

### array-9007199254740991

#### Bytes

```shell
5b393030373139393235343734303939315d
```

#### String form

```json
[9007199254740991]
```

#### dag-json CID

```shell
baguqeeraz4galcrwm4zgvo744npzhwyv3xvbvsaw6ewbtjsun56dragozqoa
```

#### dag-cbor CID

```shell
bafyreifjs6kz3aq24pywi7mdrizazmzdsvu3jtd7uut64lvj3mblk2byaa
```

### array-empty

#### Bytes

```shell
5b5d
```

#### String form

```json
[]
```

#### dag-json CID

```shell
baguqeeraj5j43immfovaya2uxnpzupwl4xwrfk2nryi3vbz4f4irmeqcxfcq
```

#### dag-cbor CID

```shell
bafyreidwx2fvfdiaox32v2mnn6sxu3j4qoxeqcuenhtgrv5qv6litfnmoe
```

### array-mixed

#### Bytes

```shell
5b363433333731333735333338363432332c36353533362c3530302c322c302c2d312c2d332c2d3235362c2d323738343432383732342c2d36343333
3731333735333338363432342c7b222f223a7b226279746573223a22595445227d7d2c22c48c6175657320c39f76c49b746521225d
```

#### String form

```json
[6433713753386423,65536,500,2,0,-1,-3,-256,-2784428724,-6433713753386424,{"/":{"bytes":"YTE"}},"Čaues ßvěte!"]
```

#### dag-json CID

```shell
baguqeera4iuxsgqusw3ctry362niptivjyio6dxnsn5afctijsahacub2eza
```

#### dag-cbor CID

```shell
bafyreidufmzzejc3p7gmh6ivp4fjvca5jfazk57nu6vdkvki4c4vpja724
```

### bytes-a1

#### Bytes

```shell
7b222f223a7b226279746573223a226f51227d7d
```

#### String form

```json
{"/":{"bytes":"oQ"}}
```

#### dag-json CID

```shell
baguqeera2te22lsmu3vdcg54oi6srd7wkuo3h6tmyvswwakaccayyv6m4tza
```

#### dag-cbor CID

```shell
bafyreidfn5bivgcww7slkgp7f5iiukoggxr542m4pzl3zn3oia7ozt7ffe
```

### bytes-empty

#### Bytes

```shell
7b222f223a7b226279746573223a22227d7d
```

#### String form

```json
{"/":{"bytes":""}}
```

#### dag-json CID

```shell
baguqeerackat3qjvp3wd4jnmm7afadwt2ahpjxqbj7pzxocc4kges5lkkqgq
```

#### dag-cbor CID

```shell
bafyreigdmqpykrgxyaxtlafqpqhzrb7qy2rh75nldvfd4kok6gl47quzvy
```

### bytes-long-8bit

#### Bytes

```shell
7b222f223a7b226279746573223a2241414543417751464267634943516f4c4441304f4478415245684d554652595847426b61477877644868386749
53496a4a43556d4a7967704b6973734c5334764d4445794d7a51314e6a63344f546f375044302b50304242516b4e4552555a4853456c4b5330784e54
6b395155564a54564656575631685a576c746358563566594746695932526c5a6d646f615770726247317562334278636e4e3064585a3365486c3665
337839666e2b4167594b44684957476834694a696f754d6a5936506b4a47536b3553566c7065596d5a71626e4a32656e3643686f714f6b7061616e71
4b6d717136797472712b7773624b7a744c573274376935757275387662362f774d484377385446787366497963724c7a4d334f7a3944523074505531
646258324e6e6132397a6433742f6734654c6a354f586d352b6a70367576733765377638504879382f5431397666342b6672372f50332b227d7d
```

#### String form

```json
{"/":{"bytes":"AAECAwQFBgcICQoLDA0ODxAREhMUFRYXGBkaGxwdHh8gISIjJCUmJygpKissLS4vMDEyMzQ1Njc4OTo7PD0+P0BBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWltcXV5fYGFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6e3x9fn+AgYKDhIWGh4iJiouMjY6PkJGSk5SVlpeYmZqbnJ2en6ChoqOkpaanqKmqq6ytrq+wsbKztLW2t7i5uru8vb6/wMHCw8TFxsfIycrLzM3Oz9DR0tPU1dbX2Nna29zd3t/g4eLj5OXm5+jp6uvs7e7v8PHy8/T19vf4+fr7/P3+"}}
```

#### dag-json CID

```shell
baguqeerabiuwx2krvxgwuufpkbrus3q7afzmqjofkqbfytqbnsgghzclwvwa
```

#### dag-cbor CID

```shell
bafyreiaalc4ruy26q4qdrdbjijh2vrecn5c6auefvoz5iyyxgsh7kcjsue
```

### cid-QmQg1v4o9xdT3Q14wh4S7dxZkDjyZ9ssFzFzyep1YrVJBY

#### Bytes

```shell
7b222f223a22516d51673176346f3978645433513134776834533764785a6b446a795a397373467a467a796570315972564a4259227d
```

#### String form

```json
{"/":"QmQg1v4o9xdT3Q14wh4S7dxZkDjyZ9ssFzFzyep1YrVJBY"}
```

#### dag-json CID

```shell
baguqeera6yza2lamkvlohaytwwccgqrswciqhuglte7qta4vfjuwia5xkxvq
```

#### dag-cbor CID

```shell
bafyreidsrf4agofvag5iiksjc7jjehhdcjqggra7cxe3m2movopc7pomr4
```

### cid-QmRgutAxd8t7oGkSm4wmeuByG6M51wcTso6cubDdQtuEfL

#### Bytes

```shell
7b222f223a22516d526775744178643874376f476b536d34776d6575427947364d3531776354736f36637562446451747545664c227d
```

#### String form

```json
{"/":"QmRgutAxd8t7oGkSm4wmeuByG6M51wcTso6cubDdQtuEfL"}
```

#### dag-json CID

```shell
baguqeerahpjisfiuqb5vifrkdpz4yzvhfsdt2agktamof2lvg55zssdclq7a
```

#### dag-cbor CID

```shell
bafyreidfkreyekhbpfbbau3o4aakvxk6ninfo7baileo7ezgjiunk66er4
```

### cid-QmXg9Pp2ytZ14xgmQjYEiHjVjMFXzCVVEcRTWJBmLgR39V

#### Bytes

```shell
7b222f223a22516d58673950703279745a313478676d516a594569486a566a4d46587a43565645635254574a426d4c6752333956227d
```

#### String form

```json
{"/":"QmXg9Pp2ytZ14xgmQjYEiHjVjMFXzCVVEcRTWJBmLgR39V"}
```

#### dag-json CID

```shell
baguqeeragkmsqdjvsmershik24tc5kwcgmh6wyahxdzlqi7vrblz4jjsjnfq
```

#### dag-cbor CID

```shell
bafyreidqpmseqxbqp3fwb256fmqg4glepd4wfn5ubei7jlcvxpfy7bshge
```

### cid-arrayof

#### Bytes

```shell
5b7b222f223a226261667972656964796b676c7366686f69786d6976666663357577686367736878346a3436357877716e74626d7534336e6232647a
717766766165227d2c7b222f223a226261667962656964736b6a6a64347a6d72376f68366b75367770373276766278796962636c693272366966336f
63646379376a6a6a7573766c3275227d2c7b222f223a226261663462636667696f33686f766b6674616572337978366a736e6d366e61766867347969
6d7769227d2c7b222f223a22516d58673950703279745a313478676d516a594569486a566a4d46587a43565645635254574a426d4c6752333956227d
2c7b222f223a22516d51673176346f3978645433513134776834533764785a6b446a795a397373467a467a796570315972564a4259227d2c7b222f22
3a22516d526775744178643874376f476b536d34776d6575427947364d3531776354736f36637562446451747545664c227d2c7b222f223a22626166
6b72656965627a726e726f616d676f733261646e627067773561706f337a3469697368686264783737676c646e626b353764347a64696f34227d2c7b
222f223a226261676371636572613733727570796c61366261757365796b373572736c667973337374323573706d3735796b6876677573717676327a
667174756371227d2c7b222f223a226261666b726569667737706c686c366d6f666b36736676686e66683634716d6b7137336f6571776c36736c6f72
7536726568616f756a6974756b65227d2c7b222f223a2262616679726569646a3569647562366d61706975706a776a73797978687968656478796376
34766968667369636d32767434366f376d6f72776c6d227d2c7b222f223a2262616679726569656a6b767376647134736d7a34347975776866796d63
7576717a617676656f6a326174337574756a77716c6c6c73707371723671227d2c7b222f223a226261686161637672616264686433667a727761616d
62617a7969766f697573746c32626f326333726777656f32756734726f67636f7a32617061716161227d2c7b222f223a226261686161637672617379
61756837726d6c79726d796337717a766b746a7637783671326836747476656936716f6e3433746c33726961616161616161227d2c7b222f223a2262
616779716376726179707a6369747033687362747979786866796333703769333232366c756c6c6d32726b7a717371716c686e7875733774716e6561
227d2c7b222f223a22626167796163767261646e366473676c367377326a776f6837733364333768713577737537673232777464776e6d6161616161
61616161616161616161227d2c7b222f223a226261666b716162696161656261676261227d5d
```

#### String form

```json
[{"/":"bafyreidykglsfhoixmivffc5uwhcgshx4j465xwqntbmu43nb2dzqwfvae"},{"/":"bafybeidskjjd4zmr7oh6ku6wp72vvbxyibcli2r6if3ocdcy7jjjusvl2u"},{"/":"baf4bcfgio3hovkftaer3yx6jsnm6navhg4yimwi"},{"/":"QmXg9Pp2ytZ14xgmQjYEiHjVjMFXzCVVEcRTWJBmLgR39V"},{"/":"QmQg1v4o9xdT3Q14wh4S7dxZkDjyZ9ssFzFzyep1YrVJBY"},{"/":"QmRgutAxd8t7oGkSm4wmeuByG6M51wcTso6cubDdQtuEfL"},{"/":"bafkreiebzrnroamgos2adnbpgw5apo3z4iishhbdx77gldnbk57d4zdio4"},{"/":"bagcqcera73rupyla6bauseyk75rslfys3st25spm75ykhvgusqvv2zfqtucq"},{"/":"bafkreifw7plhl6mofk6sfvhnfh64qmkq73oeqwl6sloru6rehaoujituke"},{"/":"bafyreidj5idub6mapiupjwjsyyxhyhedxycv4vihfsicm2vt46o7morwlm"},{"/":"bafyreiejkvsvdq4smz44yuwhfymcuvqzavveoj2at3utujwqlllspsqr6q"},{"/":"bahaacvrabdhd3fzrwaambazyivoiustl2bo2c3rgweo2ug4rogcoz2apaqaa"},{"/":"bahaacvrasyauh7rmlyrmyc7qzvktjv7x6q2h6ttvei6qon43tl3riaaaaaaa"},{"/":"bagyqcvraypzcitp3hsbtyyxhfyc3p7i3226lullm2rkzqsqqlhnxus7tqnea"},{"/":"bagyacvradn6dsgl6sw2jwoh7s3d37hq5wsu7g22wtdwnmaaaaaaaaaaaaaaa"},{"/":"bafkqabiaaebagba"}]
```

#### dag-json CID

```shell
baguqeeraqcw26pvoc6mesw7zrnz7bpqmfe7m4agdarke2nytwbqn7kuszdcq
```

#### dag-cbor CID

```shell
bafyreidhjbzws7yyooefukqt4xvbrctkz5pj5c7dnhdea6nepemymhkccm
```

### cid-bafkqabiaaebagba

#### Bytes

```shell
7b222f223a226261666b716162696161656261676261227d
```

#### String form

```json
{"/":"bafkqabiaaebagba"}
```

#### dag-json CID

```shell
baguqeerarlku7yrcztgkqfowmc5lzvjnavntg2xuwkr6j5lpczxipwxizmma
```

#### dag-cbor CID

```shell
bafyreihm764rs4lirtozq4d5d4pqext5b5akh6val7cyphu4aglvpha3xm
```

### cid-bafkreiebzrnroamgos2adnbpgw5apo3z4iishhbdx77gldnbk57d4zdio4

#### Bytes

```shell
7b222f223a226261666b72656965627a726e726f616d676f733261646e627067773561706f337a3469697368686264783737676c646e626b35376434
7a64696f34227d
```

#### String form

```json
{"/":"bafkreiebzrnroamgos2adnbpgw5apo3z4iishhbdx77gldnbk57d4zdio4"}
```

#### dag-json CID

```shell
baguqeera5c374arbqlbujh5m6goc3fnxmi6y7ksn6mdnbonnakmwvqszxqia
```

#### dag-cbor CID

```shell
bafyreic3yrxqeqgoi24fo3h43nfkfs4cntcx243g3lzv3n2hnmcm5ksnzu
```

### cid-bafkreifw7plhl6mofk6sfvhnfh64qmkq73oeqwl6sloru6rehaoujituke

#### Bytes

```shell
7b222f223a226261666b726569667737706c686c366d6f666b36736676686e66683634716d6b7137336f6571776c36736c6f727536726568616f756a
6974756b65227d
```

#### String form

```json
{"/":"bafkreifw7plhl6mofk6sfvhnfh64qmkq73oeqwl6sloru6rehaoujituke"}
```

#### dag-json CID

```shell
baguqeeraidhbr47r5gvx64lz5rzpi5wcnqavzgeqoycpag2binbbq2htyl7a
```

#### dag-cbor CID

```shell
bafyreicsrmbdimdekusleiafgsuwpsvijhmqtecucyxysgcftnptepbb2m
```

### cid-bafyreidj5idub6mapiupjwjsyyxhyhedxycv4vihfsicm2vt46o7morwlm

#### Bytes

```shell
7b222f223a2262616679726569646a3569647562366d61706975706a776a7379797868796865647879637634766968667369636d32767434366f376d
6f72776c6d227d
```

#### String form

```json
{"/":"bafyreidj5idub6mapiupjwjsyyxhyhedxycv4vihfsicm2vt46o7morwlm"}
```

#### dag-json CID

```shell
baguqeera7sbeilm63szrewp5opgwrnjrae4wzsrnom67vpugro7dgsi2iana
```

#### dag-cbor CID

```shell
bafyreihfnilmqbnwzcmqrspmmyik5qdocjdrf3rnkuxb2aanrh2qycf6wy
```

### cid-bafyreiejkvsvdq4smz44yuwhfymcuvqzavveoj2at3utujwqlllspsqr6q

#### Bytes

```shell
7b222f223a2262616679726569656a6b767376647134736d7a34347975776866796d637576717a617676656f6a326174337574756a77716c6c6c7370
7371723671227d
```

#### String form

```json
{"/":"bafyreiejkvsvdq4smz44yuwhfymcuvqzavveoj2at3utujwqlllspsqr6q"}
```

#### dag-json CID

```shell
baguqeeradow3qosni2sx336td3elm77dozktr3rsuemz5mio5s55zmvjk2ia
```

#### dag-cbor CID

```shell
bafyreif4kmuaiu3fuqmdkb6e7vfdz7x6c2sqjybc5bz3l6b2vnj5e5xjl4
```

### cid-bagcqcera73rupyla6bauseyk75rslfys3st25spm75ykhvgusqvv2zfqtucq

#### Bytes

```shell
7b222f223a226261676371636572613733727570796c61366261757365796b373572736c667973337374323573706d3735796b687667757371767632
7a667174756371227d
```

#### String form

```json
{"/":"bagcqcera73rupyla6bauseyk75rslfys3st25spm75ykhvgusqvv2zfqtucq"}
```

#### dag-json CID

```shell
baguqeeraf3abbztiyzwvxvrxz273hx3yo36kifwgiyty5ox4f2zoezvhpz2a
```

#### dag-cbor CID

```shell
bafyreidvvetydwcmpvymr34rqmz6cu4yhi7jluds6n5yyyqdllssa4jcom
```

### cid-bagyacvradn6dsgl6sw2jwoh7s3d37hq5wsu7g22wtdwnmaaaaaaaaaaaaaaa

#### Bytes

```shell
7b222f223a22626167796163767261646e366473676c367377326a776f6837733364333768713577737537673232777464776e6d6161616161616161
61616161616161227d
```

#### String form

```json
{"/":"bagyacvradn6dsgl6sw2jwoh7s3d37hq5wsu7g22wtdwnmaaaaaaaaaaaaaaa"}
```

#### dag-json CID

```shell
baguqeera5jiw3keif37pw2bta4s5ayrgn73qt3cyn5l7c7h3p6lvaiifhmea
```

#### dag-cbor CID

```shell
bafyreicwwufftyxxvvbolsj2svwvc3zzo7u23j2hz27edffxzazlhistjy
```

### cid-bagyqcvraypzcitp3hsbtyyxhfyc3p7i3226lullm2rkzqsqqlhnxus7tqnea

#### Bytes

```shell
7b222f223a2262616779716376726179707a6369747033687362747979786866796333703769333232366c756c6c6d32726b7a717371716c686e7875
733774716e6561227d
```

#### String form

```json
{"/":"bagyqcvraypzcitp3hsbtyyxhfyc3p7i3226lullm2rkzqsqqlhnxus7tqnea"}
```

#### dag-json CID

```shell
baguqeeram352tvlwv6ysybxyemcxnnbmcnmp5n5w6xkba5kzssew2ocnhc4a
```

#### dag-cbor CID

```shell
bafyreigyego6qj7uxt5dtmpznwi3mtwz7l5hf7m3udmsvkd2ps2gbmjzs4
```

### cid-bahaacvrabdhd3fzrwaambazyivoiustl2bo2c3rgweo2ug4rogcoz2apaqaa

#### Bytes

```shell
7b222f223a226261686161637672616264686433667a727761616d62617a7969766f697573746c32626f326333726777656f32756734726f67636f7a
32617061716161227d
```

#### String form

```json
{"/":"bahaacvrabdhd3fzrwaambazyivoiustl2bo2c3rgweo2ug4rogcoz2apaqaa"}
```

#### dag-json CID

```shell
baguqeera5iayx6m23rrlvkigcbzjy22mx7uqb6femvf45disg4jszkmehwmq
```

#### dag-cbor CID

```shell
bafyreias54gwjsb5z4v3amftdd5h6ufcpuk3zci7klphqoyyjmv52g4uie
```

### cid-bahaacvrasyauh7rmlyrmyc7qzvktjv7x6q2h6ttvei6qon43tl3riaaaaaaa

#### Bytes

```shell
7b222f223a22626168616163767261737961756837726d6c79726d796337717a766b746a7637783671326836747476656936716f6e3433746c337269
61616161616161227d
```

#### String form

```json
{"/":"bahaacvrasyauh7rmlyrmyc7qzvktjv7x6q2h6ttvei6qon43tl3riaaaaaaa"}
```

#### dag-json CID

```shell
baguqeeraqvq6hotrzxlpgarx5am6klvbnzglzu37dzcjenms7megi5ydxlca
```

#### dag-cbor CID

```shell
bafyreiboefkuukdnjhy5sy2ekybhp73yheoy3uj5n36hal6tckhflmp2ye
```

### cid-mapof

#### Bytes

```shell
7b22516d51673176346f3978645433513134776834533764785a6b446a795a397373467a467a796570315972564a4259223a7b222f223a22516d5167
3176346f3978645433513134776834533764785a6b446a795a397373467a467a796570315972564a4259227d2c22516d526775744178643874376f47
6b536d34776d6575427947364d3531776354736f36637562446451747545664c223a7b222f223a22516d526775744178643874376f476b536d34776d
6575427947364d3531776354736f36637562446451747545664c227d2c22516d58673950703279745a313478676d516a594569486a566a4d46587a43
565645635254574a426d4c6752333956223a7b222f223a22516d58673950703279745a313478676d516a594569486a566a4d46587a43565645635254
574a426d4c6752333956227d2c226261666b716162696161656261676261223a7b222f223a226261666b716162696161656261676261227d2c226261
666b72656965627a726e726f616d676f733261646e627067773561706f337a3469697368686264783737676c646e626b353764347a64696f34223a7b
222f223a226261666b72656965627a726e726f616d676f733261646e627067773561706f337a3469697368686264783737676c646e626b353764347a
64696f34227d2c226261666b726569667737706c686c366d6f666b36736676686e66683634716d6b7137336f6571776c36736c6f727536726568616f
756a6974756b65223a7b222f223a226261666b726569667737706c686c366d6f666b36736676686e66683634716d6b7137336f6571776c36736c6f72
7536726568616f756a6974756b65227d2c2262616679726569646a3569647562366d61706975706a776a737979786879686564787963763476696866
7369636d32767434366f376d6f72776c6d223a7b222f223a2262616679726569646a3569647562366d61706975706a776a7379797868796865647879
637634766968667369636d32767434366f376d6f72776c6d227d2c2262616679726569656a6b767376647134736d7a34347975776866796d63757671
7a617676656f6a326174337574756a77716c6c6c73707371723671223a7b222f223a2262616679726569656a6b767376647134736d7a343479757768
66796d637576717a617676656f6a326174337574756a77716c6c6c73707371723671227d2c226261676371636572613733727570796c613662617573
65796b373572736c667973337374323573706d3735796b6876677573717676327a667174756371223a7b222f223a2262616763716365726137337275
70796c61366261757365796b373572736c667973337374323573706d3735796b6876677573717676327a667174756371227d2c226261677961637672
61646e366473676c367377326a776f6837733364333768713577737537673232777464776e6d616161616161616161616161616161223a7b222f223a
22626167796163767261646e366473676c367377326a776f6837733364333768713577737537673232777464776e6d61616161616161616161616161
6161227d2c2262616779716376726179707a6369747033687362747979786866796333703769333232366c756c6c6d32726b7a717371716c686e7875
733774716e6561223a7b222f223a2262616779716376726179707a6369747033687362747979786866796333703769333232366c756c6c6d32726b7a
717371716c686e7875733774716e6561227d2c226261686161637672616264686433667a727761616d62617a7969766f697573746c32626f32633372
6777656f32756734726f67636f7a32617061716161223a7b222f223a226261686161637672616264686433667a727761616d62617a7969766f697573
746c32626f326333726777656f32756734726f67636f7a32617061716161227d2c22626168616163767261737961756837726d6c79726d796337717a
766b746a7637783671326836747476656936716f6e3433746c33726961616161616161223a7b222f223a22626168616163767261737961756837726d
6c79726d796337717a766b746a7637783671326836747476656936716f6e3433746c33726961616161616161227d2c227a386d57614a31645a396648
35456574507552736a386a6a323670587367707372223a7b222f223a226261663462636667696f33686f766b6674616572337978366a736e6d366e61
7668673479696d7769227d2c227a646a37576438414d77716e684a47514362467842566f64475342473834544d3748733172634a75514d7754796645
4453223a7b222f223a226261667962656964736b6a6a64347a6d72376f68366b75367770373276766278796962636c693272366966336f6364637937
6a6a6a7573766c3275227d2c227a647075417458375a6962635764534b51776944436b506a5777527674634b43506b753948374c68674134714a5734
576b223a7b222f223a226261667972656964796b676c7366686f69786d6976666663357577686367736878346a3436357877716e74626d7534336e62
32647a717766766165227d7d
```

#### String form

```json
{"QmQg1v4o9xdT3Q14wh4S7dxZkDjyZ9ssFzFzyep1YrVJBY":{"/":"QmQg1v4o9xdT3Q14wh4S7dxZkDjyZ9ssFzFzyep1YrVJBY"},"QmRgutAxd8t7oGkSm4wmeuByG6M51wcTso6cubDdQtuEfL":{"/":"QmRgutAxd8t7oGkSm4wmeuByG6M51wcTso6cubDdQtuEfL"},"QmXg9Pp2ytZ14xgmQjYEiHjVjMFXzCVVEcRTWJBmLgR39V":{"/":"QmXg9Pp2ytZ14xgmQjYEiHjVjMFXzCVVEcRTWJBmLgR39V"},"bafkqabiaaebagba":{"/":"bafkqabiaaebagba"},"bafkreiebzrnroamgos2adnbpgw5apo3z4iishhbdx77gldnbk57d4zdio4":{"/":"bafkreiebzrnroamgos2adnbpgw5apo3z4iishhbdx77gldnbk57d4zdio4"},"bafkreifw7plhl6mofk6sfvhnfh64qmkq73oeqwl6sloru6rehaoujituke":{"/":"bafkreifw7plhl6mofk6sfvhnfh64qmkq73oeqwl6sloru6rehaoujituke"},"bafyreidj5idub6mapiupjwjsyyxhyhedxycv4vihfsicm2vt46o7morwlm":{"/":"bafyreidj5idub6mapiupjwjsyyxhyhedxycv4vihfsicm2vt46o7morwlm"},"bafyreiejkvsvdq4smz44yuwhfymcuvqzavveoj2at3utujwqlllspsqr6q":{"/":"bafyreiejkvsvdq4smz44yuwhfymcuvqzavveoj2at3utujwqlllspsqr6q"},"bagcqcera73rupyla6bauseyk75rslfys3st25spm75ykhvgusqvv2zfqtucq":{"/":"bagcqcera73rupyla6bauseyk75rslfys3st25spm75ykhvgusqvv2zfqtucq"},"bagyacvradn6dsgl6sw2jwoh7s3d37hq5wsu7g22wtdwnmaaaaaaaaaaaaaaa":{"/":"bagyacvradn6dsgl6sw2jwoh7s3d37hq5wsu7g22wtdwnmaaaaaaaaaaaaaaa"},"bagyqcvraypzcitp3hsbtyyxhfyc3p7i3226lullm2rkzqsqqlhnxus7tqnea":{"/":"bagyqcvraypzcitp3hsbtyyxhfyc3p7i3226lullm2rkzqsqqlhnxus7tqnea"},"bahaacvrabdhd3fzrwaambazyivoiustl2bo2c3rgweo2ug4rogcoz2apaqaa":{"/":"bahaacvrabdhd3fzrwaambazyivoiustl2bo2c3rgweo2ug4rogcoz2apaqaa"},"bahaacvrasyauh7rmlyrmyc7qzvktjv7x6q2h6ttvei6qon43tl3riaaaaaaa":{"/":"bahaacvrasyauh7rmlyrmyc7qzvktjv7x6q2h6ttvei6qon43tl3riaaaaaaa"},"z8mWaJ1dZ9fH5EetPuRsj8jj26pXsgpsr":{"/":"baf4bcfgio3hovkftaer3yx6jsnm6navhg4yimwi"},"zdj7Wd8AMwqnhJGQCbFxBVodGSBG84TM7Hs1rcJuQMwTyfEDS":{"/":"bafybeidskjjd4zmr7oh6ku6wp72vvbxyibcli2r6if3ocdcy7jjjusvl2u"},"zdpuAtX7ZibcWdSKQwiDCkPjWwRvtcKCPku9H7LhgA4qJW4Wk":{"/":"bafyreidykglsfhoixmivffc5uwhcgshx4j465xwqntbmu43nb2dzqwfvae"}}
```

#### dag-json CID

```shell
baguqeerascicdb4rnbbuu42mlf72eio3ofwpwert74daullms4pabnsdzufa
```

#### dag-cbor CID

```shell
bafyreig3vhfwxvxnfj77kzmwqkxm7uncmbhjkuqmfhfdnq4p4ikvoen6pm
```

### cid-z8mWaJ1dZ9fH5EetPuRsj8jj26pXsgpsr

#### Bytes

```shell
7b222f223a226261663462636667696f33686f766b6674616572337978366a736e6d366e617668673479696d7769227d
```

#### String form

```json
{"/":"baf4bcfgio3hovkftaer3yx6jsnm6navhg4yimwi"}
```

#### dag-json CID

```shell
baguqeeralmwcgg3knsdtmks5jrpsnbkpzzhourbfcwgpxkxs37syppsw54tq
```

#### dag-cbor CID

```shell
bafyreiemoe3mh3uanvjypqyrousnwapnluxnmt5lorlhzguj5nvmgjdthi
```

### cid-zdj7Wd8AMwqnhJGQCbFxBVodGSBG84TM7Hs1rcJuQMwTyfEDS

#### Bytes

```shell
7b222f223a226261667962656964736b6a6a64347a6d72376f68366b75367770373276766278796962636c693272366966336f63646379376a6a6a75
73766c3275227d
```

#### String form

```json
{"/":"bafybeidskjjd4zmr7oh6ku6wp72vvbxyibcli2r6if3ocdcy7jjjusvl2u"}
```

#### dag-json CID

```shell
baguqeera5oa5xf5w42rgmvkavdpbnt6lhkgmpudiqur6ucwyy7jmfe3fykta
```

#### dag-cbor CID

```shell
bafyreicrcxd4oefvax3uw7gshyen7bbj2vno3drylsnp3int5p6wdesoqq
```

### cid-zdpuAtX7ZibcWdSKQwiDCkPjWwRvtcKCPku9H7LhgA4qJW4Wk

#### Bytes

```shell
7b222f223a226261667972656964796b676c7366686f69786d6976666663357577686367736878346a3436357877716e74626d7534336e6232647a71
7766766165227d
```

#### String form

```json
{"/":"bafyreidykglsfhoixmivffc5uwhcgshx4j465xwqntbmu43nb2dzqwfvae"}
```

#### dag-json CID

```shell
baguqeera7kdvvxhvje4nflfnecqaxur2qd6hghlkxfhgaz4bbmig5r4itgwq
```

#### dag-cbor CID

```shell
bafyreib6okxebjb65dd5i7nu2johcro6wpxxxvt5ykuusyky7763w2ypnq
```

### dagpb_11unnamedlinks+data

#### Bytes

```shell
7b2244617461223a7b222f223a7b226279746573223a22633239745a53426b59585268227d7d2c224c696e6b73223a5b7b2248617368223a7b222f22
3a22516d55476850325838786f3964736a34357671783148366935577150714c716d4c51734854547864336b65386d70227d2c224e616d65223a2222
2c225473697a65223a3236323135387d2c7b2248617368223a7b222f223a22516d503753725237364b484b3941393136526248473175667932547a4e
41425a6769453233506a5a444d7a5a5879227d2c224e616d65223a22222c225473697a65223a3236323135387d2c7b2248617368223a7b222f223a22
516d51673176346f3978645433513134776834533764785a6b446a795a397373467a467a796570315972564a4259227d2c224e616d65223a22222c22
5473697a65223a3236323135387d2c7b2248617368223a7b222f223a22516d6450366661727457527279645a43556a4867724a345870785345345341
6f5273574a5a317a4a344d57697566227d2c224e616d65223a22222c225473697a65223a3236323135387d2c7b2248617368223a7b222f223a22516d
4e4e6a55537478744d43315761535a5969445736436d4155727664355132653137716e785067566477727757227d2c224e616d65223a22222c225473
697a65223a3236323135387d2c7b2248617368223a7b222f223a22516d574a77715a424a57657248734e3162376734705244596d7a474e6e614d5975
44334b53626e70617873423268227d2c224e616d65223a22222c225473697a65223a3236323135387d2c7b2248617368223a7b222f223a22516d5258
505364797342533364625558653677386f5865765a57486450515761523264336667674e736a7669654c227d2c224e616d65223a22222c225473697a
65223a3236323135387d2c7b2248617368223a7b222f223a22516d54555a4158667773367a7268456b736e4d714c78736268585a42517334464e6961
726a585359517156726a43227d2c224e616d65223a22222c225473697a65223a3236323135387d2c7b2248617368223a7b222f223a22516d4e4e6b37
6454646838556f667767714c4e617571364e3738445063364c4b4b32794273314d466478374d6267227d2c224e616d65223a22222c225473697a6522
3a3236323135387d2c7b2248617368223a7b222f223a22516d57356d724a667971683742347977537672615a676e576a53337139434c69595552694a
7043583361726f3569227d2c224e616d65223a22222c225473697a65223a3236323135387d2c7b2248617368223a7b222f223a22516d5446485a4c35
436b674e7a31394d64506e5375794c4169364156713966467038317a6d5070614c32616d4544227d2c224e616d65223a22222c225473697a65223a32
36323135387d5d7d
```

#### String form

```json
{"Data":{"/":{"bytes":"c29tZSBkYXRh"}},"Links":[{"Hash":{"/":"QmUGhP2X8xo9dsj45vqx1H6i5WqPqLqmLQsHTTxd3ke8mp"},"Name":"","Tsize":262158},{"Hash":{"/":"QmP7SrR76KHK9A916RbHG1ufy2TzNABZgiE23PjZDMzZXy"},"Name":"","Tsize":262158},{"Hash":{"/":"QmQg1v4o9xdT3Q14wh4S7dxZkDjyZ9ssFzFzyep1YrVJBY"},"Name":"","Tsize":262158},{"Hash":{"/":"QmdP6fartWRrydZCUjHgrJ4XpxSE4SAoRsWJZ1zJ4MWiuf"},"Name":"","Tsize":262158},{"Hash":{"/":"QmNNjUStxtMC1WaSZYiDW6CmAUrvd5Q2e17qnxPgVdwrwW"},"Name":"","Tsize":262158},{"Hash":{"/":"QmWJwqZBJWerHsN1b7g4pRDYmzGNnaMYuD3KSbnpaxsB2h"},"Name":"","Tsize":262158},{"Hash":{"/":"QmRXPSdysBS3dbUXe6w8oXevZWHdPQWaR2d3fggNsjvieL"},"Name":"","Tsize":262158},{"Hash":{"/":"QmTUZAXfws6zrhEksnMqLxsbhXZBQs4FNiarjXSYQqVrjC"},"Name":"","Tsize":262158},{"Hash":{"/":"QmNNk7dTdh8UofwgqLNauq6N78DPc6LKK2yBs1MFdx7Mbg"},"Name":"","Tsize":262158},{"Hash":{"/":"QmW5mrJfyqh7B4ywSvraZgnWjS3q9CLiYURiJpCX3aro5i"},"Name":"","Tsize":262158},{"Hash":{"/":"QmTFHZL5CkgNz19MdPnSuyLAi6AVq9fFp81zmPpaL2amED"},"Name":"","Tsize":262158}]}
```

#### dag-json CID

```shell
baguqeerap7w3wnisyfaoyn6vdjbvhgvzfhqxlmnkpfo2cza3kol3sgiou7zq
```

#### dag-pb CID

```shell
bafybeie7xh3zqqmeedkotykfsnj2pi4sacvvsjq6zddvcff4pq7dvyenhu
```

#### dag-cbor CID

```shell
bafyreidjm3xk7rz2d2jap2dvgs54ifj473viuro5q5mfcpjm3rjf73s76y
```

### dagpb_1link

#### Bytes

```shell
7b224c696e6b73223a5b7b2248617368223a7b222f223a22516d57447455516a3338594c57387633713441364c77506e3476594b4562754b57706753
6d36626a4b5736586665227d7d5d7d
```

#### String form

```json
{"Links":[{"Hash":{"/":"QmWDtUQj38YLW8v3q4A6LwPn4vYKEbuKWpgSm6bjKW6Xfe"}}]}
```

#### dag-json CID

```shell
baguqeerao7xjffeobbqa2zv43ltxadt6pa4f3c2eh4ufsfudbazsmgb55dza
```

#### dag-pb CID

```shell
bafybeihyivpglm6o6wrafbe36fp5l67abmewk7i2eob5wacdbhz7as5obe
```

#### dag-cbor CID

```shell
bafyreib4mhhkmom5wxnp2hmcjeabbcmzybdiewehujwu73ndvns42zdt4i
```

### dagpb_2link+data

#### Bytes

```shell
7b2244617461223a7b222f223a7b226279746573223a22633239745a53426b59585268227d7d2c224c696e6b73223a5b7b2248617368223a7b222f22
3a22516d58673950703279745a313478676d516a594569486a566a4d46587a43565645635254574a426d4c6752333955227d2c224e616d65223a2273
6f6d65206c696e6b222c225473697a65223a3130303030303030307d2c7b2248617368223a7b222f223a22516d58673950703279745a313478676d51
6a594569486a566a4d46587a43565645635254574a426d4c6752333956227d2c224e616d65223a22736f6d65206f74686572206c696e6b222c225473
697a65223a387d5d7d
```

#### String form

```json
{"Data":{"/":{"bytes":"c29tZSBkYXRh"}},"Links":[{"Hash":{"/":"QmXg9Pp2ytZ14xgmQjYEiHjVjMFXzCVVEcRTWJBmLgR39U"},"Name":"some link","Tsize":100000000},{"Hash":{"/":"QmXg9Pp2ytZ14xgmQjYEiHjVjMFXzCVVEcRTWJBmLgR39V"},"Name":"some other link","Tsize":8}]}
```

#### dag-json CID

```shell
baguqeerasu2dlp3l3b6xswyh45iegkn3qamarjdygorldhucn3x4kfeafmpa
```

#### dag-pb CID

```shell
bafybeibh647pmxyksmdm24uad6b5f7tx4dhvilzbg2fiqgzll4yek7g7y4
```

#### dag-cbor CID

```shell
bafyreia4kjmr364wv7snvuffjjfx6e3ssyhcaxcv3mmewrm6lkg426ycpu
```

### dagpb_4namedlinks+data

#### Bytes

```shell
7b2244617461223a7b222f223a7b226279746573223a22434145227d7d2c224c696e6b73223a5b7b2248617368223a7b222f223a22516d6155417741
514a4e747655644a423432714e6254546744707a505944317164734b4e7463744d356937444742227d2c224e616d65223a22617564696f5f6f6e6c79
2e6d3461222c225473697a65223a32333331393632397d2c7b2248617368223a7b222f223a22516d4e56727862423235634b5452754b673244756855
6d4256454b394e6d43775745487473485056365975744877227d2c224e616d65223a22636861742e747874222c225473697a65223a3939367d2c7b22
48617368223a7b222f223a22516d55636a4b7a444c5842506d4236424b48654b5368365a6f465a6a7373345844684d52644c5952567576566675227d
2c224e616d65223a22706c61796261636b2e6d3375222c225473697a65223a3131367d2c7b2248617368223a7b222f223a22516d517179325369456b
4b677232637735556251393354744c4b454d734438546463576767523871394a61626a58227d2c224e616d65223a227a6f6f6d5f302e6d7034222c22
5473697a65223a3330363238313837397d5d7d
```

#### String form

```json
{"Data":{"/":{"bytes":"CAE"}},"Links":[{"Hash":{"/":"QmaUAwAQJNtvUdJB42qNbTTgDpzPYD1qdsKNtctM5i7DGB"},"Name":"audio_only.m4a","Tsize":23319629},{"Hash":{"/":"QmNVrxbB25cKTRuKg2DuhUmBVEK9NmCwWEHtsHPV6YutHw"},"Name":"chat.txt","Tsize":996},{"Hash":{"/":"QmUcjKzDLXBPmB6BKHeKSh6ZoFZjss4XDhMRdLYRVuvVfu"},"Name":"playback.m3u","Tsize":116},{"Hash":{"/":"QmQqy2SiEkKgr2cw5UbQ93TtLKEMsD8TdcWggR8q9JabjX"},"Name":"zoom_0.mp4","Tsize":306281879}]}
```

#### dag-json CID

```shell
baguqeerapvtwnk5agczlqn7dgiyci5ku54llg32dmn3zvynn3dglte6y3s6q
```

#### dag-pb CID

```shell
bafybeigcsevw74ssldzfwhiijzmg7a35lssfmjkuoj2t5qs5u5aztj47tq
```

#### dag-cbor CID

```shell
bafyreiagdu5zh6jtk3vnkyltyfpw6tyxtlp24bortutx6dggmmydno3gti
```

### dagpb_7unnamedlinks+data

#### Bytes

```shell
7b2244617461223a7b222f223a7b226279746573223a2243414959793847426b6745676749446746534341674f415649494341344255676749446746
534341674f41564949434134425567793848424477227d7d2c224c696e6b73223a5b7b2248617368223a7b222f223a22516d53624367647358313243
344b44773350446d70424e3969437a5338376135446a6753436f57396573717a586b227d2c224e616d65223a22222c225473697a65223a3435363233
3835347d2c7b2248617368223a7b222f223a22516d61344778574e687977537657467a504b74457377504771655a396d4c73324b7437364a75427139
6733666932227d2c224e616d65223a22222c225473697a65223a34353632333835347d2c7b2248617368223a7b222f223a22516d5166797879797337
613165336d707a3958736e745373544763385667706a506a354246316131434764474e63227d2c224e616d65223a22222c225473697a65223a343536
32333835347d2c7b2248617368223a7b222f223a22516d5368327754545a54344e386675536543467737777465727a6471624539336a31584468664e
337651487a4456227d2c224e616d65223a22222c225473697a65223a34353632333835347d2c7b2248617368223a7b222f223a22516d56587353566a
77784d7343774b52435578456b4762346634423938675856793369683376346f74766355524b227d2c224e616d65223a22222c225473697a65223a34
353632333835347d2c7b2248617368223a7b222f223a22516d5a6a684839374d45597751587a4371535162646a4744685857757757345279696b5232
34704e717974574c6a227d2c224e616d65223a22222c225473697a65223a34353632333835347d2c7b2248617368223a7b222f223a22516d52733655
3559697243714337746154796e7a337832474e61484a5a336a44764d56417a6169587070776d4e4a227d2c224e616d65223a22222c225473697a6522
3a33323533383339357d5d7d
```

#### String form

```json
{"Data":{"/":{"bytes":"CAIYy8GBkgEggIDgFSCAgOAVIICA4BUggIDgFSCAgOAVIICA4BUgy8HBDw"}},"Links":[{"Hash":{"/":"QmSbCgdsX12C4KDw3PDmpBN9iCzS87a5DjgSCoW9esqzXk"},"Name":"","Tsize":45623854},{"Hash":{"/":"Qma4GxWNhywSvWFzPKtEswPGqeZ9mLs2Kt76JuBq9g3fi2"},"Name":"","Tsize":45623854},{"Hash":{"/":"QmQfyxyys7a1e3mpz9XsntSsTGc8VgpjPj5BF1a1CGdGNc"},"Name":"","Tsize":45623854},{"Hash":{"/":"QmSh2wTTZT4N8fuSeCFw7wterzdqbE93j1XDhfN3vQHzDV"},"Name":"","Tsize":45623854},{"Hash":{"/":"QmVXsSVjwxMsCwKRCUxEkGb4f4B98gXVy3ih3v4otvcURK"},"Name":"","Tsize":45623854},{"Hash":{"/":"QmZjhH97MEYwQXzCqSQbdjGDhXWuwW4RyikR24pNqytWLj"},"Name":"","Tsize":45623854},{"Hash":{"/":"QmRs6U5YirCqC7taTynz3x2GNaHJZ3jDvMVAzaiXppwmNJ"},"Name":"","Tsize":32538395}]}
```

#### dag-json CID

```shell
baguqeerab53i2tx2ktr3nbztcguof3pwadl6264yh5pt6h5ygxavlxghkkba
```

#### dag-pb CID

```shell
bafybeibfhhww5bpsu34qs7nz25wp7ve36mcc5mxd5du26sr45bbnjhpkei
```

#### dag-cbor CID

```shell
bafyreidz4mncr25kzd3lakhmm56twyeauqpmrczheq4husqlfu4ificjy4
```

### dagpb_Data_some

#### Bytes

```shell
7b2244617461223a7b222f223a7b226279746573223a2241414543417751227d7d2c224c696e6b73223a5b5d7d
```

#### String form

```json
{"Data":{"/":{"bytes":"AAECAwQ"}},"Links":[]}
```

#### dag-json CID

```shell
baguqeerajwksxu3lxpomdwxvosl542zl3xknhjgxtq3277gafrhl6vdw5tcq
```

#### dag-pb CID

```shell
bafybeibazl2z4vqp2tmwcfag6wirmtpnomxknqcgrauj7m2yisrz3qjbom
```

#### dag-cbor CID

```shell
bafyreieculsmrexh3ty5jentbvuku452o27mst4h2tq2rb2zntqhgcstji
```

### dagpb_Data_zero

#### Bytes

```shell
7b2244617461223a7b222f223a7b226279746573223a22227d7d2c224c696e6b73223a5b5d7d
```

#### String form

```json
{"Data":{"/":{"bytes":""}},"Links":[]}
```

#### dag-json CID

```shell
baguqeera7gxsmhbdmzwv3fgp4naa5idang7hm6hupkxshvm34taqiakw4zvq
```

#### dag-pb CID

```shell
bafybeiaqfni3s5s2k2r6rgpxz4hohdsskh44ka5tk6ztbjerqpvxwfkwaq
```

#### dag-cbor CID

```shell
bafyreih7w5oijm4kksxrkuvpspuobxpfn5a6l2uerxyfpdfdjzrirlwaiq
```

### dagpb_Links_Hash_some

#### Bytes

```shell
7b224c696e6b73223a5b7b2248617368223a7b222f223a226261666b716162696161656261676261227d7d5d7d
```

#### String form

```json
{"Links":[{"Hash":{"/":"bafkqabiaaebagba"}}]}
```

#### dag-json CID

```shell
baguqeeraumofom6evitwofvbunn2ocdqw5vxl7wnfxdjyqr5m6h2zgtnselq
```

#### dag-pb CID

```shell
bafybeia53f5n75ituvc3yupuf7tdnxf6fqetrmo2alc6g6iljkmk7ys5mm
```

#### dag-cbor CID

```shell
bafyreico7im6nfzt2euwvdrs62ylgx2w6fmjdrxl2zaz5up5uhqwgwsnhe
```

### dagpb_Links_Hash_some_Name_some

#### Bytes

```shell
7b224c696e6b73223a5b7b2248617368223a7b222f223a226261666b716162696161656261676261227d2c224e616d65223a22736f6d65206e616d65
227d5d7d
```

#### String form

```json
{"Links":[{"Hash":{"/":"bafkqabiaaebagba"},"Name":"some name"}]}
```

#### dag-json CID

```shell
baguqeeras44ncqauojywh67izb3d5j7rjbgdscdfsglzaex3envlwzq3lvxa
```

#### dag-pb CID

```shell
bafybeifq4hcxma3kjljrpxtunnljtc6tvbkgsy3vldyfpfbx2lij76niyu
```

#### dag-cbor CID

```shell
bafyreigi3x5lx7auupkm3z27b5emluvkrv3mwpq35244zy4cnqjplyr2fi
```

### dagpb_Links_Hash_some_Name_zero

#### Bytes

```shell
7b224c696e6b73223a5b7b2248617368223a7b222f223a226261666b716162696161656261676261227d2c224e616d65223a22227d5d7d
```

#### String form

```json
{"Links":[{"Hash":{"/":"bafkqabiaaebagba"},"Name":""}]}
```

#### dag-json CID

```shell
baguqeeraodk4mmutpv6bqhjd3kx5oicgnxq365lxu7h3orewh54avtttmzca
```

#### dag-pb CID

```shell
bafybeie7fstnkm4yshfwnmpp7d3mlh4f4okmk7a54d6c3ffr755q7qzk44
```

#### dag-cbor CID

```shell
bafyreigtcfxx5v7f4gdcbnouvhpwgfjmhh4pqgeu3sznfm6y4ql62g4urq
```

### dagpb_Links_Hash_some_Tsize_some

#### Bytes

```shell
7b224c696e6b73223a5b7b2248617368223a7b222f223a226261666b716162696161656261676261227d2c225473697a65223a393030373139393235
343734303939317d5d7d
```

#### String form

```json
{"Links":[{"Hash":{"/":"bafkqabiaaebagba"},"Tsize":9007199254740991}]}
```

#### dag-json CID

```shell
baguqeera5drb4r7jf33wkkhs4dvxqsyacnxvv7djbzylt4ib2t42qk4qqkxa
```

#### dag-pb CID

```shell
bafybeiezymjvhwfuharanxmzxwuomzjjuzqjewjolr4phaiyp6l7qfwo64
```

#### dag-cbor CID

```shell
bafyreidfgtcksdb5gn4jn2eggnqkktnahqzmvprrv7pakqmiwz25aej62y
```

### dagpb_Links_Hash_some_Tsize_zero

#### Bytes

```shell
7b224c696e6b73223a5b7b2248617368223a7b222f223a226261666b716162696161656261676261227d2c225473697a65223a307d5d7d
```

#### String form

```json
{"Links":[{"Hash":{"/":"bafkqabiaaebagba"},"Tsize":0}]}
```

#### dag-json CID

```shell
baguqeerac5ccyh6acqr3kdi5djstwzlu36uprk2dbi4f36ntlafquwthxm7a
```

#### dag-pb CID

```shell
bafybeichjs5otecmbvwh5azdr4jc45mp2qcofh2fr54wjdxhz4znahod2i
```

#### dag-cbor CID

```shell
bafyreia2x5mgcqwslci2apn3d5t6ptnknbw4jmnedjkynp6jxjdxb7bvcq
```

### dagpb_empty

#### Bytes

```shell
7b224c696e6b73223a5b5d7d
```

#### String form

```json
{"Links":[]}
```

#### dag-json CID

```shell
baguqeera6mfu3g6n722vx7dbitpnbiyqnwah4ddy4b5c3rwzxc5pntqcupta
```

#### dag-pb CID

```shell
bafybeihdwdcefgh4dqkjv67uzcmw7ojee6xedzdetojuzjevtenxquvyku
```

#### dag-cbor CID

```shell
bafyreihjsq5okmwdasf4hoiauwxv3vxjuwh2kuh4k5pgzzi3hanepxusjm
```

### dagpb_simple_forms_1

#### Bytes

```shell
7b2244617461223a7b222f223a7b226279746573223a2241514944227d7d2c224c696e6b73223a5b5d7d
```

#### String form

```json
{"Data":{"/":{"bytes":"AQID"}},"Links":[]}
```

#### dag-json CID

```shell
baguqeerabji5n2rfqif4kflih4r2tyl2jz3n3met5nys2wawsfihvc3guqta
```

#### dag-pb CID

```shell
bafybeia2qk4u55f2qj7zimmtpulejgz7urp7rzs44cvledcaj42gltkk3u
```

#### dag-cbor CID

```shell
bafyreiahe732takf4lhvcjrpeycxs2sccncd7zd5frj5w2hmmyhnokfwsy
```

### dagpb_simple_forms_2

#### Bytes

```shell
7b224c696e6b73223a5b7b2248617368223a7b222f223a226261666b716162696161656261676261227d7d2c7b2248617368223a7b222f223a226261
666b716162696161656261676261227d2c224e616d65223a22626172227d2c7b2248617368223a7b222f223a226261666b7161626961616562616762
61227d2c224e616d65223a22666f6f227d5d7d
```

#### String form

```json
{"Links":[{"Hash":{"/":"bafkqabiaaebagba"}},{"Hash":{"/":"bafkqabiaaebagba"},"Name":"bar"},{"Hash":{"/":"bafkqabiaaebagba"},"Name":"foo"}]}
```

#### dag-json CID

```shell
baguqeeraibdu3hqnftoo7zlwqzcsk3pw4sf6epneqziyf7oehsde7ykbxula
```

#### dag-pb CID

```shell
bafybeiahfgovhod2uvww72vwdgatl5r6qkoeegg7at2bghiokupfphqcku
```

#### dag-cbor CID

```shell
bafyreibpoilwc75tlwglfzlziunq65l6arvzwwrhikal5kwlens6ql53ky
```

### dagpb_simple_forms_3

#### Bytes

```shell
7b224c696e6b73223a5b7b2248617368223a7b222f223a226261666b716162696161656261676261227d7d2c7b2248617368223a7b222f223a226261
666b716162696161656261676261227d2c224e616d65223a2261227d2c7b2248617368223a7b222f223a226261666b71616269616165626167626122
7d2c224e616d65223a2261227d5d7d
```

#### String form

```json
{"Links":[{"Hash":{"/":"bafkqabiaaebagba"}},{"Hash":{"/":"bafkqabiaaebagba"},"Name":"a"},{"Hash":{"/":"bafkqabiaaebagba"},"Name":"a"}]}
```

#### dag-json CID

```shell
baguqeeraas77sl6e3odguo3gfdarftcqqnarlh7kae7vnleh7zzmswnztzpq
```

#### dag-pb CID

```shell
bafybeidrg2f6slbv4yzydqtgmsi2vzojajnt7iufcreynfpxndca4z5twm
```

#### dag-cbor CID

```shell
bafyreibeevwwdfmicvdswiaetz62wtlj5nqe7idei2tn2irhco5k37js3y
```

### dagpb_simple_forms_4

#### Bytes

```shell
7b224c696e6b73223a5b7b2248617368223a7b222f223a226261666b716162696161656261676261227d2c224e616d65223a2261227d2c7b22486173
68223a7b222f223a226261666b716162696161656261676261227d2c224e616d65223a2261227d5d7d
```

#### String form

```json
{"Links":[{"Hash":{"/":"bafkqabiaaebagba"},"Name":"a"},{"Hash":{"/":"bafkqabiaaebagba"},"Name":"a"}]}
```

#### dag-json CID

```shell
baguqeera3rnjnzebgxuygpqphmofp75upufi7linvrthm2r4cyiibafftqrq
```

#### dag-pb CID

```shell
bafybeieube7zxmzoc5bgttub2aqofi6xdzimv5munkjseeqccn36a6v6j4
```

#### dag-cbor CID

```shell
bafyreifw5gwkcd4ck7o7xhxoff33kqpbs6uwznmxbxb6ez6h77zz6gj5ca
```

### false

#### Bytes

```shell
66616c7365
```

#### String form

```json
false
```

#### dag-json CID

```shell
baguqeera7s6pczmqrxiyvhsj677spaibo3ny5h3dwq2see3uczsciure7cva
```

#### dag-cbor CID

```shell
bafyreibac77tiyjzkzzkucve6zejj7jpswslcihcnehisulfnv423qxo2i
```

### float--0.5

#### Bytes

```shell
2d302e35
```

#### String form

```json
-0.5
```

#### dag-json CID

```shell
baguqeeradmd3bt72bm7vs226asfqcfiwrcdmyumd3viymvnvkfpolxo2y3iq
```

#### dag-cbor CID

```shell
bafyreidgf3tgrdkimspjianeb4i2ilrhwrd72drroivhom32cegkxisoay
```

### float--0.9999999999999999

#### Bytes

```shell
2d302e39393939393939393939393939393939
```

#### String form

```json
-0.9999999999999999
```

#### dag-json CID

```shell
baguqeera7g7rcxbk5fadm5g4ecmvllvetuuzrmogxmrmkf32b3wboxlqfpkq
```

#### dag-cbor CID

```shell
bafyreibmiakyxlz24yia56ipz27movs5zv6js456jvqhpyjluhycsitl34
```

### float--1.1

#### Bytes

```shell
2d312e31
```

#### String form

```json
-1.1
```

#### dag-json CID

```shell
baguqeeraop2zowbt65hyvdvn2t4xje3i7b2gkbtydsckfhhjj5ixrtpq5oma
```

#### dag-cbor CID

```shell
bafyreibn43uo5yygsnzbdj6eey2mrcrmavhxgkzvgnmarkt3mo2efr4cfy
```

### float--1e-323

#### Bytes

```shell
2d31652d333233
```

#### String form

```json
-1e-323
```

#### dag-json CID

```shell
baguqeeracte7heowtgtjzivjekic4rkwan2kii6fmz3enl5i33oafvnwfwyq
```

#### dag-cbor CID

```shell
bafyreibg2jfpbjanaowwfpoamj2tjpo2ifhy5fbkln55b5mlhfiy747egq
```

### float--8.940696716308594e-8

#### Bytes

```shell
2d382e393430363936373136333038353934652d38
```

#### String form

```json
-8.940696716308594e-8
```

#### dag-json CID

```shell
baguqeerabhb35s3mtnhsye24f6322jzfiyogcxg5ouxfulwrkrkkvdpwbdqq
```

#### dag-cbor CID

```shell
bafyreideyqdtlnfu53gvyrlg7fsqrx5bk4v2lxmgwzfnfxi23wlyxm43ta
```

### float-0.5

#### Bytes

```shell
302e35
```

#### String form

```json
0.5
```

#### dag-json CID

```shell
baguqeera2lf224p7gm66m7ih5rtw4njkw7zyeshlnheuffibk4ramb6fl2ca
```

#### dag-cbor CID

```shell
bafyreifwqkffcpzsyfigri7xm2kaf6bz7si5stsnf46jep5w5we7ngmgma
```

### float-0.9999999999999999

#### Bytes

```shell
302e39393939393939393939393939393939
```

#### String form

```json
0.9999999999999999
```

#### dag-json CID

```shell
baguqeeraclkrsheftxvmt7xg73fooogsiwf5bbmvd3auq37l3aqmd5qy6fza
```

#### dag-cbor CID

```shell
bafyreigjp6bt6yhk2nxlvxhvy3mfoxs4sxslnnzzgbbxc2tailmnuic37i
```

### float-1.1

#### Bytes

```shell
312e31
```

#### String form

```json
1.1
```

#### dag-json CID

```shell
baguqeerawbpcir3cwhshfpujve4abtb64mthiphmwvmyjpysqe5n3og6m3ia
```

#### dag-cbor CID

```shell
bafyreifeekgttrbqlvjqmvey2r7damal3kiqn5a6r7a2pijrx4jgdv5odi
```

### float-1.1111111111111112

#### Bytes

```shell
312e31313131313131313131313131313132
```

#### String form

```json
1.1111111111111112
```

#### dag-json CID

```shell
baguqeeratkqazgwpbo5npzbafr6wmdgowpy4g633gb5gudyuo3y465bzyqtq
```

#### dag-cbor CID

```shell
bafyreifj6tfoswmsty24t4ittpwdnzaj6tka7637gdjrrly6q5msu6eooq
```

### float-1e-323

#### Bytes

```shell
31652d333233
```

#### String form

```json
1e-323
```

#### dag-json CID

```shell
baguqeeralkvxfq2l7znrayirso72iwqx4hi6fq5dmzxvswdeto5n2a55ej5q
```

#### dag-cbor CID

```shell
bafyreib6bigeneyagim45hjjzzn3ggyuthejspqqccplri2pmmek5bz2uq
```

### float-8.940696716308594e-8

#### Bytes

```shell
382e393430363936373136333038353934652d38
```

#### String form

```json
8.940696716308594e-8
```

#### dag-json CID

```shell
baguqeerahgvoivj35tc6ejtkj5jxnbwfe2nwmdhdtdxqqg2qmurlh3qsco5q
```

#### dag-cbor CID

```shell
bafyreie6fuw4lkhwfiljun5k4y5srv6io7rcf4r766amlxtmx3it2hwg2e
```

### float-82497.63712086187

#### Bytes

```shell
38323439372e3633373132303836313837
```

#### String form

```json
82497.63712086187
```

#### dag-json CID

```shell
baguqeeraf22bm57rmsotbj67zc7x6jx3czxuelemhtjvbpsjmibxjyavbw3q
```

#### dag-cbor CID

```shell
bafyreibybbnywxrykhqdulrhywkofxds5tw5fye6geudy2us3pgw2ptgnm
```

### float-array_of_specials

#### Bytes

```shell
5b312c747275652c66616c73652c6e756c6c2c2d315d
```

#### String form

```json
[1,true,false,null,-1]
```

#### dag-json CID

```shell
baguqeeranbypiyrspgq3dw6steqf64bal5xbwfmvjvmzydkumusemokp44bq
```

#### dag-cbor CID

```shell
bafyreibqkv642umtthvkk4siz2x27eqwugyitsjsgbc65ffmtajiag4b64
```

### garbage-00

#### Bytes

```shell
5b22593b44722664215c5c2961322b625c222ee298ba5c7455235125776c6c7d2140265c22493834676426343b2c33425f2e674274356d6c5c6e6d6f
6d642c292e4a3b386b45425d4e627b5935744834455c2278787a6b793c747b7c243a553b656b5a74704a6f2d6f6c4d606a79494a35574e6e7d4c3d40
5c22464b4c772f617c72385d2a496c39585c5c787b4e395c6e7a4f5b4028755969214e30525c744d2327346f5d6b6f63647659282f41624c322d5e3d
2d3d25723f5c747d2f243c7c4f56652572267a766f586a2d746d6e534042466e795d296f2b5c6e246c20354f7371774474537a4048335a7e493d514c
6f332a78332c4b52245c7421567e753d4a5b4c29295f7b48685c7476574c49712b4d563c75315c6e5c6e2d5d406a54477d235e50495d2e71536c7d6a
5d486d4f397c4b622b6f24503d7d7c2d7977e298ba34527e5c7467295c5c566a23253c5c22457d63557de298ba2b21502f58627a3472683928484c20
7441396c525a5444785640432956445d2e6d4de298ba784f2d3f5c223e325d46595e4f6d4c30584a5b4d4c60467d5372665e5c224d30463a464f7824
372f545d3d5a3953745343295b5c5c7b2e5a60463445473a2f493e6f387d3958315c2247e298ba5d4f676d5c5c3d5c6e616174382347446e78752054
28202f45396654624d664179767a26253934205328376a622779234a257c4c24353054762e294f717a594866654f3b6b465c2274327856732d63617c
41204577264e534246345a45494e345a4041354c3c4370792b357b267c2b3a4b4b4c57777a654f71464b44345f356545603c6e48363f5463243e3440
43286c7d65465b7c6c242c47595a5c5c7974674f4f2c7c5c7469715c5c772a5b525376372a2e213657555e572b5c744861625b52407b23325c743659
245c2257554b3331285877642638566f643b4b4f753d6f3524e298ba3c2856374b39726424625c5c627844202d2c2f6c7b5c5c5f396c7e7849616b57
347c39422050e298ba307a6b466a5669763423455a24407e5358354d6f5d20355626e298ba704a4b29552b707a3270282337763a2144412f52694b55
5870352f3d6a6f305c5c5546635f7c315b703073626e60253f2e756c3b573f415159313d344769287735567665424464217947696e664c234d294949
6a6f5c227a676c742b5d5b2638424947586f6546522a647e3c546058283a3e7263725c5c5e564b653d623369446542246b5c5c272b6d5d3b31715c74
7d292d554c51482b445f2b5c6e627a5a6c446b3449787736605050695223645552472c27703d636d4e41723d6f3d397a623e275361793e595e7a6276
3c485c745b6850515e7d6c4c6a596c273e785f216b447c7d3a4d3a585520704f2f43713f52755d4d326235794769265245412e2e404b3f627b6e2e75
4a584e4c7572746d677973604228655c6e2b3f3450785c6e575c5c7533442e2d4b544561332d6ce298ba3741716c5c5c38794f44497631666c403260
7b3f2c576d3a544b657d555978444e775a7a53484367524629704d476f374c5d4552382b53e298ba7466472f2b445a6b366c5e4b2c5c7427486b5c22
4a7c6d7b515e452a29773a6d732c3c425f53356e295d704d483f2c4048553b416a4b20635b2e2164762e6d547a5c743d687d374534306e583a5e645f
e298ba65276e2f5d637577756d6923754e355d6450437c23677b6f78355d73725c2230395c6e5474466443642b7c442576632b4046325277404c6c5c
225b794e607b21615c22712e2b6166766c63542456233f28322777444f6d433063292b216841542a52425a6f783a714f472626442e5c22482b2c6e73
6a2546663e5a6f32292968557a70467b5556323f634d7e345c6e3b5c6e2b5c222d6735746a4c6951397b2c237934396b3d45737d7e2b4d525524735a
77777d38216566683e7026794e4534402131644235375c22455a67364d3731665631394e7e52745534452f2a787477295658377155704e642b5c5c46
59285b3c7e5c22666e68443e24576e644e4c287b51245450455c2267384e3b425b725d36364f623b68267c5c6e3a28596d467b3e344a6b2b612a7b7d
20662e535a233a456a3d415338486f76656159422549743f345c6e20442d2b4674455c5c3d2a5c225c227b76232a21435957202f2b6d3a43724e6c5f
3d74232d6e6b2c48425f552f5359454e6f55295c5c7a7a783c3268313e72785f716d786c42693e77286b5c2262705c745f4d6f6f7120714559263b5d
3c2f402b486f372e4c2c2d2e296a43354171795b3f6e2f707452236149704c7b5c5c56482e6b3d293557535851e298ba5968717d266646656c50596b
673f3f4b2d3452353b736770312b2f334c46e298ba263b6242422862293a2a6043775a572e4f753f7230234a533164674557433e757e446578262d74
24735a3276594c48574f265c744e5966782a724f77622441317b5f265d38425c7470672e245e496f3de298ba6b704c435c6e5c22376c495c6e5a4f66
3b265e742d56605a6b2d5423527a3e7423602f5c74377d5f64482b7d3c6377297a3e5d7b436a624e55776c6c7a2724212c2048613356487e735a7776
5f5c5c6a58383f35595e357849687e735c226556256f2624466c6c4d6c5c5c5c6e5745e298ba7a6c5679276e6d7d7d606a7968596f3d59315d4e552d
427c2f4f6176e298ba4f5d683f575c6e64466a29247e29443e6d37436647303d2f786a754143525c22684a52545b4f743834222c7b22223a7b222f22
3a7b226279746573223a226548712f79613255434b625351746f4b4978635045534d54463659336d2f3150594f324f663471474d727863644c70504c
4a4e6c39422f6f54666d6b6545546d784b654b7a45542b3335565338775a2b464f322b37577a50326a42447a387a7951567a69415931475949673832
774c733331395670303863652f626a3141596c31646b4936665937797a49386a6f577932623439345151772b456e6b6a506b48503339306645325055
644b3856683859453941336c456f3858634f6d4958436265376a4a414649586c31304f32563368494a504f7a72665a5545484a6e6742503142387476
44345974696a68796c435578495270716964342f3751433773656a6d746270365a72306f6c4e37696932414c74414749545041395842655177463837
3730445a3367446e672f6c786d346f72426b66303655717462674b7751726f424e71634c384c42445369335a2b6b73784d6f317745314d704d337a50
5349434342327047474b6a515878416872394e55394f7a6f526c4e776b69517a4276462f517450516c4644583530574171676f7141383167414e3865
484a6f344f6b3865554773544b7451564d376f42335a785632305466466579615034354647426458346d6a463157706857556f775738733642357165
6a635470716952684c61763070592f535633415834444871704451675652372b614861766b3634426339352f75616f3655354447666b787157626463
3075534e6c3763526a6d36415851356253564b6d31736b6236484657363679702f546f714256565977674469655645334b726748697758756f69774b
704956774559227d7d2c2221235c225f3e2437333677434e7a2541416a306d423c5c74617d76307c4b2320784440554e6e793c513d475e403b5a3760
656c5e6b223a353232353337353038383230353839372c22432e6d34223a313336323634343035343135363639332c225c5c7d406b353d7b223a7b22
2f223a7b226279746573223a224f554d4538754a3964694359563868764c6a616864615a347371456e46574837614a35723171376a4a707341465931
7a3436427a654354474b2f3171746e53366d4c5136714b39746e6a49637337696d366c5658502f5458446a327273626a6c5435622b746a516b503330
5931635a53525263343570365770356c32476f7148396d6474416878334446736b367244343744414974637559696c7245334a4c734976587053584c
4133796c786e7675563178457a4c514539456f466472543979422b4f714c48414e354a7a566c56576b614971792f7a4d444d562f314676694c2f7364
714f594e704b74344372304c6b304c4e51614e4b67766d35336e507842595568574a46356a54776a7068386245465377777652396154593247386f4b
466d522f6a2f436a7667756d706b4c5049734a483841396f41352b6546596366676d565857446f3446334b3254576432554670633647466b6a633642
3534536a68376867415656344b6e44634363466f366e596262313239695730716932514368724c32706c55746f71336b577639596f49644141336574
595442447a5a6c516a46745a7a6b50696e657a7957464a2f5572376254503048682f344d43363545496d4d3330333132766a7949574732634b6d5950
7575514548633238303666797354514e6d42417541325754304b7763424c6f58454534454d39632b337441476c6c657a5553397277564a626a51682b
3148452f6c50374376464a5865465055704e73686f515966587737423678456f783837394d54354e7a46524e7749555754485749624a44734b785834
663151434548356f6b6355723835564e31317471657a796a44423665744e7144355a376d446f44644b4f34536d4d79714f614e567931366537376555
73636946656444414f7750397675636177574b45696e694965774f5170357a6f6a683470495141446e6b3269546f4930395545346139794b31365676
786f68437135565a673834744c343232694f414e33767464474f672f346143634a6779316946783152784c5432414258796e4430702f2b6f444a5369
486954306f6e70724d734d5a68664868774d7834532f2b6c4b4d69704f516674615a652f766a45354d48343437717062792b6569584d585352306c69
4139766e32576265744c32725657357643434c61386c6d6f31786d2b315a646f5378503866324164653631646f3258594770353736456f4c42327132
7741564f45582f666c426e447a44597233764831322b6d4b4f32632f474751367a73526d464842685856626c362b716661617136554456574e706b36
4d424c474473695472796268413037696e674f54576e6b717274757252774f4e697178366b79564c6d49627a2b61794b2f6474454875562b72344f47
5863514a72645848635253685830554b5374634f7562624275516b4e553141393356766a4472354b39554b716c526c7a4f34447a75754e524362674a
634733635630367557537a486165446b6a4f354464756f6d50754a6c344c774c346b4b692b4755697873756d5069415a633765566d514d6a58703531
6e4b465132704747746e7353796773766251576f4c46637653664872386c67397972763047705548773650594e543469594462432f42495345665275
35534e4163444b6c706235707a7659774a70467266524d7938633839426b584b4157485555684f7548433575373944437a35566648496b3450447068
6a7967506e7537306454523758322b4b703849534359577574346a416835562b663339325655486f41696138453259334c4f756d696f656c6e645357
3457574e31526735346c5834616b3771554b354a2f4257616770696368787773537676566b7047546447773130375046615141447344583868503246
4d4b5355386f6e5a2b6c31635a3269442f336948467a4a316d627a686d777a59584d373364395255774474415a36366569656b387179693968743234
59594b4a31445848334d4e41424538507942466f555751454c74514e49344651453366665263572f5a695874335a73544556647557462b3657385976
576265356d414e61706c5031794a6677536255574f73577175797548417731527269314e73526838674d324a382f6c542f7238554b6959733579636c
4878476762586a7a2b2b75504e4a6e344e3251682b41537731474c4e31784c33304c444170734843435450484d456347574374477947676949723875
697477525a2b426b594f61584b716c6e775363676e54362f5a6561306d74386e5474635a5a43476665636f6e6172476e69227d7d2c22617921223a74
7275652c226d223a22643e3e2f71622d63682f464264633c5a4c43382d2953616c375c5c55263d302d6c5e26737954673938505d5e393a6b6a5e2c7d
294f7730592979397357732a2546607d5e785c6e713d667c3f5642704f577c3d7c6b29273e3a4b747a7e746f7e744576566d7038783a7e4e3149435c
74296b762026435874756523572e793320784759744977666264785c5c282d393f3b42274e65365524663b505443746f4a523d525c5c3533575b4f5e
704b3b6e72314c4b503a5a4d7c796774476540613055436a5048343f7d56204b4d614b4a4c39246f7a726161467a43237642573d784e5a335a553925
5e206277513e2e305c226029e298ba4a68557a7425275c5c256f5c6e484140344963622f435c743c3c373531715a386628796525747c3b3246216253
424b51302a675c6e5c227b4a4d3a292f613a634d692a5d7a2421292f64595f7a743958666851797c79e298ba3b286478675c746a367e25625572232c
5523256543355c222e743f2a5a5f2c51363a3e2c74666d3c5348552b41317a6b722c712a45305c745c22596234683a5c6e2d5833522a655e623c4842
247d2f723e6e677357324632605a506b3f605e7e432f6176603267e298ba7372507a66552f275c6e5f2848373876212c39693328304774626b5d5937
5a673d575c222374746670743e7c437d6b53265d4d2064e298ba2564306e363e67255662254f5c6e3f545573443c694c353e4f52685457443d49253b
7b2d56622a61456d7035617477547869777a5c7475734630586b5c6e6e39756f4e482f643a3d4c3378302f5c747127297c7020786f5867453f3f753a
5d66365325384a427d2456353f5d2f5d40683f506d284132497b46704069592e587d2928435e4d245c5c4532562643515e6a355a4b6e605272213924
422d66775f5e5f306144535c22366e48336251e298ba324a3e3b40663f35344c4f617d79747d294b743548682838266e7c75777d403955242b652e38
5c223254233e553c3a693f3b3c465a245c6e724474772d673b3133257e46243d374a5c2265442d69464265775c745729774730737034485c7426566c
7332724e5be298ba31533940585c5c4d64695f6966475f515654653f2a5154383f58496632252b5d6537655b2d5e722740632b445c5c55307e3d3b52
28366954737b2055363869573c5e73583a7b375c5c5860444d533328387c6778607d794f484d44685c6e2d31792f312c51755b7e60527a325850626a
2e5c6e4b4f3b3e372474792f7a4c32703a6043347a5c5c3a683c3c346a5431336746766e5c744c415c6e717d5ee298ba7b2c44575b775c6e75212975
6f7461537e3a362c267528627246397a434a5343434c3a2f4844235c74673137345c223c2b475a2c5779e298ba527e7071333827637d586c424b5970
5753285c5c6c34555331614525547c6c523e725f293c41215e2c77597b3958776f756679763c5a332f5a416449714837505d727b4c3e77555c74394b
5d7629302b302c4356655c6e42557b276e334028335e492a5c74263256396d7573314e5c22364d5a264a457b5a31486e26474446535e233f73503064
785f3d6a297c7be298ba212b3b4d2c2ae298ba756864493f2829795c74673e4f50765d6e21372a38683341627a27285b617d77684128693c5f276c24
6e71292b5862394767412d20777130732146306933293d686e6c21204e266a593a7d492f52386c3b7c233242766632756d3d4225767a68585f626b3a
77363f4253463778425d3b2d235c6e2d3d27494a6341762d7b472975556f6b795c74684e3a7a3436697d40643c7c4e62282e744331703d5c6e342d73
5f695a50544c576f637d3b773d285e4c3a4232455d59474a285a58762a622d45255c5c3b5c222938774b6a554d663531525e3e663a67643f44622043
7c596d6958482d6d227d2c7b222f223a22626166796b627a6163656470337a656c3233706d7337726c327232776e616b6b6b33736f666c6533376532
32706335357269616168327a71777371617873227d2c2d383635313532323632383138303735392c6e756c6c2c5b7b222f223a7b226279746573223a
2235686647566e70446a4566726c595663517058577762612b4a432b78227d7d2c747275652c7b222f223a2262616679726971656a757579326e666f
666a633372636a726d62716a636b686370356d6e65706372766a326433687661767a3775796f626177706f366f616679626265783576643469627361
776b6d33733767376f63636875706663356c70796a67616b66736976643568697375227d5d5d
```

#### String form

```json
["Y;Dr&d!\\)a2+b\".☺\tU#Q%wll}!@&\"I84gd&4;,3B_.gBt5ml\nmomd,).J;8kEB]Nb{Y5tH4E\"xxzky<t{|$:U;ekZtpJo-olM`jyIJ5WNn}L=@\"FKLw/a|r8]*Il9X\\x{N9\nzO[@(uYi!N0R\tM#'4o]kocdvY(/AbL2-^=-=%r?\t}/$<|OVe%r&zvoXj-tmnS@BFny])o+\n$l 5OsqwDtSz@H3Z~I=QLo3*x3,KR$\t!V~u=J[L))_{Hh\tvWLIq+MV<u1\n\n-]@jTG}#^PI].qSl}j]HmO9|Kb+o$P=}|-yw☺4R~\tg)\\Vj#%<\"E}cU}☺+!P/Xbz4rh9(HL tA9lRZTDxV@C)VD].mM☺xO-?\">2]FY^OmL0XJ[ML`F}Srf^\"M0F:FOx$7/T]=Z9StSC)[\\{.Z`F4EG:/I>o8}9X1\"G☺]Ogm\\=\naat8#GDnxu T( /E9fTbMfAyvz&%94 S(7jb'y#J%|L$50Tv.)OqzYHfeO;kF\"t2xVs-ca|A Ew&NSBF4ZEIN4Z@A5L<Cpy+5{&|+:KKLWwzeOqFKD4_5eE`<nH6?Tc$>4@C(l}eF[|l$,GYZ\\ytgOO,|\tiq\\w*[RSv7*.!6WU^W+\tHab[R@{#2\t6Y$\"WUK31(Xwd&8Vod;KOu=o5$☺<(V7K9rd$b\\bxD -,/l{\\_9l~xIakW4|9B P☺0zkFjViv4#EZ$@~SX5Mo] 5V&☺pJK)U+pz2p(#7v:!DA/RiKUXp5/=jo0\\UFc_|1[p0sbn`%?.ul;W?AQY1=4Gi(w5VveBDd!yGinfL#M)IIjo\"zglt+][&8BIGXoeFR*d~<T`X(:>rcr\\^VKe=b3iDeB$k\\'+m];1q\t})-ULQH+D_+\nbzZlDk4Ixw6`PPiR#dURG,'p=cmNAr=o=9zb>'Say>Y^zbv<H\t[hPQ^}lLjYl'>x_!kD|}:M:XU pO/Cq?Ru]M2b5yGi&REA..@K?b{n.uJXNLurtmgys`B(e\n+?4Px\nW\\u3D.-KTEa3-l☺7Aql\\8yODIv1fl@2`{?,Wm:TKe}UYxDNwZzSHCgRF)pMGo7L]ER8+S☺tfG/+DZk6l^K,\t'Hk\"J|m{Q^E*)w:ms,<B_S5n)]pMH?,@HU;AjK c[.!dv.mTz\t=h}7E40nX:^d_☺e'n/]cuwumi#uN5]dPC|#g{ox5]sr\"09\nTtFdCd+|D%vc+@F2Rw@Ll\"[yN`{!a\"q.+afvlcT$V#?(2'wDOmC0c)+!hAT*RBZox:qOG&&D.\"H+,nsj%Ff>Zo2))hUzpF{UV2?cM~4\n;\n+\"-g5tjLiQ9{,#y49k=Es}~+MRU$sZww}8!efh>p&yNE4@!1dB57\"EZg6M71fV19N~RtU4E/*xtw)VX7qUpNd+\\FY([<~\"fnhD>$WndNL({Q$TPE\"g8N;B[r]66Ob;h&|\n:(YmF{>4Jk+a*{} f.SZ#:Ej=AS8HoveaYB%It?4\n D-+FtE\\=*\"\"{v#*!CYW /+m:CrNl_=t#-nk,HB_U/SYENoU)\\zzx<2h1>rx_qmxlBi>w(k\"bp\t_Mooq qEY&;]</@+Ho7.L,-.)jC5Aqy[?n/ptR#aIpL{\\VH.k=)5WSXQ☺Yhq}&fFelPYkg??K-4R5;sgp1+/3LF☺&;bBB(b):*`CwZW.Ou?r0#JS1dgEWC>u~Dex&-t$sZ2vYLHWO&\tNYfx*rOwb$A1{_&]8B\tpg.$^Io=☺kpLC\n\"7lI\nZOf;&^t-V`Zk-T#Rz>t#`/\t7}_dH+}<cw)z>]{CjbNUwllz'$!, Ha3VH~sZwv_\\jX8?5Y^5xIh~s\"eV%o&$FllMl\\\nWE☺zlVy'nm}}`jyhYo=Y1]NU-B|/Oav☺O]h?W\ndFj)$~)D>m7CfG0=/xjuACR\"hJRT[Ot84",{"":{"/":{"bytes":"eHq/ya2UCKbSQtoKIxcPESMTF6Y3m/1PYO2Of4qGMrxcdLpPLJNl9B/oTfmkeETmxKeKzET+35VS8wZ+FO2+7WzP2jBDz8zyQVziAY1GYIg82wLs319Vp08ce/bj1AYl1dkI6fY7yzI8joWy2b494QQw+EnkjPkHP390fE2PUdK8Vh8YE9A3lEo8XcOmIXCbe7jJAFIXl10O2V3hIJPOzrfZUEHJngBP1B8tvD4YtijhylCUxIRpqid4/7QC7sejmtbp6Zr0olN7ii2ALtAGITPA9XBeQwF8770DZ3gDng/lxm4orBkf06UqtbgKwQroBNqcL8LBDSi3Z+ksxMo1wE1MpM3zPSICCB2pGGKjQXxAhr9NU9OzoRlNwkiQzBvF/QtPQlFDX50WAqgoqA81gAN8eHJo4Ok8eUGsTKtQVM7oB3ZxV20TfFeyaP45FGBdX4mjF1WphWUowW8s6B5qejcTpqiRhLav0pY/SV3AX4DHqpDQgVR7+aHavk64Bc95/uao6U5DGfkxqWbdc0uSNl7cRjm6AXQ5bSVKm1skb6HFW66yp/ToqBVVYwgDieVE3KrgHiwXuoiwKpIVwEY"}},"!#\"_>$736wCNz%AAj0mB<\ta}v0|K# xD@UNny<Q=G^@;Z7`el^k":5225375088205897,"C.m4":1362644054156693,"\\}@k5={":{"/":{"bytes":"OUME8uJ9diCYV8hvLjahdaZ4sqEnFWH7aJ5r1q7jJpsAFY1z46BzeCTGK/1qtnS6mLQ6qK9tnjIcs7im6lVXP/TXDj2rsbjlT5b+tjQkP30Y1cZSRRc45p6Wp5l2GoqH9mdtAhx3DFsk6rD47DAItcuYilrE3JLsIvXpSXLA3ylxnvuV1xEzLQE9EoFdrT9yB+OqLHAN5JzVlVWkaIqy/zMDMV/1FviL/sdqOYNpKt4Cr0Lk0LNQaNKgvm53nPxBYUhWJF5jTwjph8bEFSwwvR9aTY2G8oKFmR/j/CjvgumpkLPIsJH8A9oA5+eFYcfgmVXWDo4F3K2TWd2UFpc6GFkjc6B54Sjh7hgAVV4KnDcCcFo6nYbb129iW0qi2QChrL2plUtoq3kWv9YoIdAA3etYTBDzZlQjFtZzkPinezyWFJ/Ur7bTP0Hh/4MC65EImM30312vjyIWG2cKmYPuuQEHc2806fysTQNmBAuA2WT0KwcBLoXEE4EM9c+3tAGllezUS9rwVJbjQh+1HE/lP7CvFJXeFPUpNshoQYfXw7B6xEox879MT5NzFRNwIUWTHWIbJDsKxX4f1QCEH5okcUr85VN11tqezyjDB6etNqD5Z7mDoDdKO4SmMyqOaNVy16e77eUsciFedDAOwP9vucawWKEiniIewOQp5zojh4pIQADnk2iToI09UE4a9yK16VvxohCq5VZg84tL422iOAN3vtdGOg/4aCcJgy1iFx1RxLT2ABXynD0p/+oDJSiHiT0onprMsMZhfHhwMx4S/+lKMipOQftaZe/vjE5MH447qpby+eiXMXSR0liA9vn2WbetL2rVW5vCCLa8lmo1xm+1ZdoSxP8f2Ade61do2XYGp576EoLB2q2wAVOEX/flBnDzDYr3vH12+mKO2c/GGQ6zsRmFHBhXVbl6+qfaaq6UDVWNpk6MBLGDsiTrybhA07ingOTWnkqrturRwONiqx6kyVLmIbz+ayK/dtEHuV+r4OGXcQJrdXHcRShX0UKStcOubbBuQkNU1A93VvjDr5K9UKqlRlzO4DzuuNRCbgJcG3cV06uWSzHaeDkjO5DduomPuJl4LwL4kKi+GUixsumPiAZc7eVmQMjXp51nKFQ2pGGtnsSygsvbQWoLFcvSfHr8lg9yrv0GpUHw6PYNT4iYDbC/BISEfRu5SNAcDKlpb5pzvYwJpFrfRMy8c89BkXKAWHUUhOuHC5u79DCz5VfHIk4PDphjygPnu70dTR7X2+Kp8ISCYWut4jAh5V+f392VUHoAia8E2Y3LOumioelndSW4WWN1Rg54lX4ak7qUK5J/BWagpichxwsSvvVkpGTdGw107PFaQADsDX8hP2FMKSU8onZ+l1cZ2iD/3iHFzJ1mbzhmwzYXM73d9RUwDtAZ66eiek8qyi9ht24YYKJ1DXH3MNABE8PyBFoUWQELtQNI4FQE3ffRcW/ZiXt3ZsTEVduWF+6W8YvWbe5mANaplP1yJfwSbUWOsWquyuHAw1Rri1NsRh8gM2J8/lT/r8UKiYs5yclHxGgbXjz++uPNJn4N2Qh+ASw1GLN1xL30LDApsHCCTPHMEcGWCtGyGgiIr8uitwRZ+BkYOaXKqlnwScgnT6/Zea0mt8nTtcZZCGfeconarGni"}},"ay!":true,"m":"d>>/qb-ch/FBdc<ZLC8-)Sal7\\U&=0-l^&syTg98P]^9:kj^,})Ow0Y)y9sWs*%F`}^x\nq=f|?VBpOW|=|k)'>:Ktz~to~tEvVmp8x:~N1IC\t)kv &CXtue#W.y3 xGYtIwfbdx\\(-9?;B'Ne6U$f;PTCtoJR=R\\53W[O^pK;nr1LKP:ZM|ygtGe@a0UCjPH4?}V KMaKJL9$ozraaFzC#vBW=xNZ3ZU9%^ bwQ>.0\"`)☺JhUzt%'\\%o\nHA@4Icb/C\t<<751qZ8f(ye%t|;2F!bSBKQ0*g\n\"{JM:)/a:cMi*]z$!)/dY_zt9XfhQy|y☺;(dxg\tj6~%bUr#,U#%eC5\".t?*Z_,Q6:>,tfm<SHU+A1zkr,q*E0\t\"Yb4h:\n-X3R*e^b<HB$}/r>ngsW2F2`ZPk?`^~C/av`2g☺srPzfU/'\n_(H78v!,9i3(0Gtbk]Y7Zg=W\"#ttfpt>|C}kS&]M d☺%d0n6>g%Vb%O\n?TUsD<iL5>ORhTWD=I%;{-Vb*aEmp5atwTxiwz\tusF0Xk\nn9uoNH/d:=L3x0/\tq')|p xoXgE??u:]f6S%8JB}$V5?]/]@h?Pm(A2I{Fp@iY.X})(C^M$\\E2V&CQ^j5ZKn`Rr!9$B-fw_^_0aDS\"6nH3bQ☺2J>;@f?54LOa}yt})Kt5Hh(8&n|uw}@9U$+e.8\"2T#>U<:i?;<FZ$\nrDtw-g;13%~F$=7J\"eD-iFBew\tW)wG0sp4H\t&Vls2rN[☺1S9@X\\Mdi_ifG_QVTe?*QT8?XIf2%+]e7e[-^r'@c+D\\U0~=;R(6iTs{ U68iW<^sX:{7\\X`DMS3(8|gx`}yOHMDh\n-1y/1,Qu[~`Rz2XPbj.\nKO;>7$ty/zL2p:`C4z\\:h<<4jT13gFvn\tLA\nq}^☺{,DW[w\nu!)uotaS~:6,&u(brF9zCJSCCL:/HD#\tg174\"<+GZ,Wy☺R~pq38'c}XlBKYpWS(\\l4US1aE%T|lR>r_)<A!^,wY{9Xwoufyv<Z3/ZAdIqH7P]r{L>wU\t9K]v)0+0,CVe\nBU{'n3@(3^I*\t&2V9mus1N\"6MZ&JE{Z1Hn&GDFS^#?sP0dx_=j)|{☺!+;M,*☺uhdI?()y\tg>OPv]n!7*8h3Abz'([a}whA(i<_'l$nq)+Xb9GgA- wq0s!F0i3)=hnl! N&jY:}I/R8l;|#2Bvf2um=B%vzhX_bk:w6?BSF7xB];-#\n-='IJcAv-{G)uUoky\thN:z46i}@d<|Nb(.tC1p=\n4-s_iZPTLWoc};w=(^L:B2E]YGJ(ZXv*b-E%\\;\")8wKjUMf51R^>f:gd?Db C|YmiXH-m"},{"/":"bafykbzacedp3zel23pms7rl2r2wnakkk3sofle37e22pc55riaah2zqwsqaxs"},-8651522628180759,null,[{"/":{"bytes":"5hfGVnpDjEfrlYVcQpXWwba+JC+x"}},true,{"/":"bafyriqejuuy2nfofjc3rcjrmbqjckhcp5mnepcrvj2d3hvavz7uyobawpo6oafybbex5vd4ibsawkm3s7g7occhupfc5lpyjgakfsivd5hisu"}]]
```

#### dag-json CID

```shell
baguqeerablaqfj5o7hwvg3lfof67zknschxmjvyliym3jpb3w5tk3hd3mm6q
```

#### dag-cbor CID

```shell
bafyreidhegn4opkma565fyy5nod2omdq66m3px7yl4y7vjmk5mwve47riu
```

### garbage-01

#### Bytes

```shell
5b6e756c6c2c6e756c6c2c7b222f223a7b226279746573223a222b6466526653396f7a697932753472726437446d7156797377675071585757443136
3179356b3944667659384d6a4b424553513954444f4331516630535a78454374576c3431345148566f7a68416e6a4d4c69336c6c6a5057522b6f6673
4e31335479716c48433043536d4a665a534b4c4633326d59664c51484e644b58644f61724c685a572f7651494e4233777a627972524850704449792f
485a442b45724a6a5355387a744c6f3456434130332b6c55647675754e63393073414c79654b6f2b336a4e314935587035463758462b634e43317674
7a527257395050576c577455467a626642703657654f65454b4336564b4b49533373713431493234366a364244503871434d655646626137656f682b
36354d4e347a546658715779644574546c766f446f6c61765177676846474978534452556f4c5a3535372f6c6b3346357a4633752f48524d542f6852
424d37376361674d2b4f586f6866326f6b3154516f6b326279744d4a53684473516c44456843317738755949632f49756f347878396c4c564b354157
5652354f51674d5276667933762b5550574b4c754e5a6a625477744c457a4e3971503768574c426964692b704c4b5742497a306d68345843716b3966
6b74657853674b4b774955304e7637762b73644d5749307156434a364f2b564f713846776e6d7673785261636b76614166305a354c4e525742394d42
6d4139502b744f2b4a77516f2b495339697a74494635717959576b527a317951776533395551634b496165444348374c467a704c73517944754c624b
30494f6e67676d594d4c5a72396c7a4b497a566a30354135734b73394745355134587759433862703459445830582f39706a6971773646473975677a
494d7351627432786b635439444c616961697a6755583261756f5632716f482b4c4a52506a445875595051437055776173427676635a356639675055
4b326d7479715a554e5979324861736766644a796a5454334834324b476a4153682b30757354416355437947692f4d5a65314d453935537758466751
7048556d3151366f55766b7a69486964564b505151442b6961774167626470454349316a6d37576c76543530586367466a47742b2f62475636724744
716e622f3855505256536f6b74444d6642794e7042776a53677155544f564561514c5254496e64696273546c4c476d6a6e66527578593653754d5138
517a754a704c4b6272542f59724e4152534e3532586a43593856684c696e5763706d5966775043317641694c597a384e354b6e435635585338795656
72693332413947664d71435230496361654c6734615a33535438617444674a4353627655543169677976316869506542727178414b55483276416a64
6670686d696e4f306a6632585030596b336a6744725878706979597a5055396447502b336c41665373557a717532444c37353265664d444d384d316e
69474a79335869766776753433426d4350306f4978675933485147576d4952336932717665587852586e6a4561635a6c6c5063794744364669714e4d
694b43315331703333706b52492f77675775587157366e425632704b614a3455614f374c6e646e67744e774d4e434c4456784e7173513747714d6547
5069556c773867525649664c39426442596f6d784c424a2f696d6664414c76746873334733374765792f36423743626331754d56346e6d6668453942
456f796e5556652f6a304a5831657543315a4153707637644e63497379617037327a33396d7056664a624f726f5158513855636956683555676e5668
51525636724a512b4766656a6a393730615a36737667624439646a4c2f43776a6b4c69504c54574536786f6a4a374e443738473565694e7053564e47
2f4476304e7954542f4f45396c6d4b2b446f346d4f57357454415a58374972465877714a534a4f6e53356337573767305055425070466c4a3949776b
5a44426871654c5a7578347577444f4e425472626e304b45724150646d4339735641584c4e464747344c4c524e636863596a6272625863496f534258
42542f615a5657355767542b4146365950556741796b30334e3457756a5572394e4c507259735a5346684378764536394231524e74734c554b796155
62466d31517545633178776c6a4e4779774742754d6a4355454b6c5a79687663443061314b4a537876744744726a3138496b6d2b77742b4267315574
686a43696834466c315066616645423951324e632b7358694c4a67794c636563476d4c735774426c4737594a35427a4e2b77597173696e474357634b
4f5a3865563478326e6d546863755930746e2f5947675167545168646c77366471395467365157744e48637579524d41694d65754756774b6431752b
4c5a5437694c62414532537a50526343396c6a5833666167684a314731516e5147737361627a79463966456f42644b47775470383669586858544476
546278674857315a6973637256735938454a543461667670752f412f662b445938714355776f3039324d61567432712f4876704a7766774850454335
425937766d504a5371454778364553436439626a644d746763734c436b676367484f4a6e437a363843764755706e724558714f664242624f3973304a
2b4438546132305347776a7152747978636b522b2f57695353717936645836465462646e7249736a766a79665770705a74437672645a45442f41456c
6b372f665148687678684261686568496d316933776a45473158394e62585a42496a656b373844343179306b4374494d63586f723632337a5454686e
4c754f64764c4352562b2f716949444a48506c446a523841344e6167716b797934416f38315a7471447132707164475238743830345a3467704f4a72
74746935643655727a6d716b323447672b4f572b5073505a42633150506d6843554944444a484e496c52502b423949774679746463636d5a78466d6d
6148327561367867456d30546777364857624a4d5347706b3544663950715672385a46656d476f4144367376426f3867336a7150664f58452f766d77
6438504d4b67586864372f36612b796c536d7a714632615372683447444a4d3574656c4c6649354d69302f4c43496e505871664b30764c4b39547770
526543324732396d373451754162784748534b737134496a32374d33417070616b6c34756c45696c716151554f59697269396a58527a2f75764d3539
434c7242415a66504f54767a6b2f6a342f78655a5246364254775259583774346a4b7a354334645944586a6b52515a6830576969314e6c7369617154
384c35753469713869673442574f3451577a7a4d376f45504d452f714f6969746c4e6135684e6a4c54664a7142754758374b6b4969317357647a6734
612f532f7a556545784c49592b764b434a396278584274497938704349684b5848376646714a314f71436559394d79573962557a7a73386d774d3259
685937473268456d583264507a6f6349787577526d642f557947396a7373567550594b7764436c5362734b3371776569486d67753469525a72654f4e
77654d54614439336f354f7a7a3166482b32625471753342307949703034516475546a566b7678573572543364554a754f76464c594c4a416a563370
53445746727651376e7743506854566732583738352b4a647850383862466e736932445338383374712b656f6174506f4537624b573041624b4b3642
62676b6b5a37796944384b584f5849525a533335653535537972647a306879743069433234566467612b564c764b42366e6d4a59745a323770522b38
30486f44664d4d495061656f77674c664835484a4b53484b6e4f667650714a7a365a6c6c6232726a6673686a6f55554c6f5649787878582b62574d34
6a355751454f507a45457363623877696c323554547a5046467042377530674a34727a2b4e3462677a3636542b544c4257393345442f3079786e742b
65504f73646a5344564a53426f51767a66614652506e62736d4c366e495a53647a473668575a5834674d6a746158736c57495861446a3556464c516f
6842447344644b484139534173456967466b6476347656707a6436372f6d705042364646595878644a4f2b4f665270356b6d4730696e587075637336
6b765a6e33305457465830423673544c53396566386275483877617363784e38594932615976696d4454464c33417854516678466c5a32644c526c4d
632f36326a767762583163524c6637576a317a47492b756b2f387447652f54493165563571544858574778336f6d4a4f50654a4a436431697a2b7a38
64304167455056496a676c3058416a537662372b52636c3962573947685765617935722b385654767a3956666e41584247727556384c452b496d6139
712f5147394e4144587469664a4552556f426d44454773396433766d2b37384d4c7a4a30796357436e724d777855587a6670576f646d577433773334
4d7548617671392b46474666574b4552307573527136686e2b33632b535368554b474576332f773675432b3049377a3839634d30765a744d51374877
6e66334e59516f763673614370504a66547378724a36307531524346356238636a676c586a6b39676e34584d6f575453392f77454331486756454a76
7262656b323768486f436f6a39376b465764493431494e4b7152646c724a4d6d7845364e514e7279626557453175756673396d447870724a4f753453
342b394f56716e354b316572464d33686c7131757a4a33786f5757673630686d566d486e6d346e4a436437596c2b434e74375263415157356e504176
587a537948456b57576e417075647543795478764938724858763031336e6c596656544554383837594a675572596b792f6f73544767704137337351
34464b74694731377a71785157687a51493838734f413569576c7a694c486b556a32424f47793541503878443263656c6b4e3633304b327448496b62
5648382f7941443642324c36624b6c747744484368777753376159452f3567386b32542b5878304d50684b53713254676b434a36646c486e6d647467
426259674c53646d50384d2f4a79696e77374247556a334b576c546d616746396e686b327672594c61446e6e72664762535a4b4a794f57525a456b32
5667492f5165696c715561436741623879476959386b59543773416f683647666532744a39626b4f7050754573717054454646506561315832693030
3136632f6576467948366e317445532b3767726968426c51646843482b384a6b433272625938495254656c4948526c36766b6f75436c685877315467
53714a336444786466666d637630586663394c77312f6c4f6375484f453362435147437848694d68517731352b43362f3161554943784d6953624b33
656f712b797866683950537a7348506651377747356c522f51787a3736454f47336c656b7634535a4c6f72426e566b5a6846726f444d67645a385544
697631344f4c6d724d55696c4d7551787a4c357249493669395a42684b3632597a586139744235473652616c3154674630693879496d5268564b5a77
5a37576b7a64704752377a2f343579634248355a764b337452322b4f536b626a483949694276744842706347305a337535433676674b724278714a65
766b2b45647a414d336770476f376654496c474f4a6a5345654559595a4b4d4f59454c777474384d745362544c42474f6e666e47454e44366d592b46
76522b79787554506a6c2b4447597570344b364a47424f3676326c446a625633355a526561633333367756417a756854614a5642686f453051377459
35422f6b3055412f524343684172446263344a41227d7d2c7b222f223a7b226279746573223a2267795a59396677325662366f5477502f5779737679
57487473567344424941524b2b44522b396d6246486879734a6e43306858663868537558774c6432452f424b456b4447754c6c4b4e5739514d54466e
4472577152664f58777334336e4b4243754751386b7879746d6f7750573854685730314c72335a544f6858734546434e46644c7a512f3657412b7849
71472f503558744f3474547171454f456867582f4a39536c4f58434a6566344f62496d6b3036384f4d314a56374943646d5364424e2f4a66577a4452
52784a314248537a493545482b64385a516a4a58704c65515262643777623438664b494a2f646676507246364f7a586b70377853424a7a6157456542
3555522f2f3234567a7761636d346d355341346e645665657335597a506f5a4e526c4e782f74536176524b2f724b4b227d7d2c7b222f223a22626167
75716565326162626c7965777963686c7135367068756b6e786364716578657a667867656c7a71646f616137706f7436726435346b6e727577356f6b
766d7577627364753570356a786979766234356b6b357375686976796f79346f7169356468786f6f6c616277797a707761227d2c747275655d
```

#### String form

```json
[null,null,{"/":{"bytes":"+dfRfS9oziy2u4rrd7DmqVyswgPqXWWD161y5k9DfvY8MjKBESQ9TDOC1Qf0SZxECtWl414QHVozhAnjMLi3lljPWR+ofsN13TyqlHC0CSmJfZSKLF32mYfLQHNdKXdOarLhZW/vQINB3wzbyrRHPpDIy/HZD+ErJjSU8ztLo4VCA03+lUdvuuNc90sALyeKo+3jN1I5Xp5F7XF+cNC1vtzRrW9PPWlWtUFzbfBp6WeOeEKC6VKKIS3sq41I246j6BDP8qCMeVFba7eoh+65MN4zTfXqWydEtTlvoDolavQwghFGIxSDRUoLZ557/lk3F5zF3u/HRMT/hRBM77cagM+OXohf2ok1TQok2bytMJShDsQlDEhC1w8uYIc/Iuo4xx9lLVK5AWVR5OQgMRvfy3v+UPWKLuNZjbTwtLEzN9qP7hWLBidi+pLKWBIz0mh4XCqk9fktexSgKKwIU0Nv7v+sdMWI0qVCJ6O+VOq8FwnmvsxRackvaAf0Z5LNRWB9MBmA9P+tO+JwQo+IS9iztIF5qyYWkRz1yQwe39UQcKIaeDCH7LFzpLsQyDuLbK0IOnggmYMLZr9lzKIzVj05A5sKs9GE5Q4XwYC8bp4YDX0X/9pjiqw6FG9ugzIMsQbt2xkcT9DLaiaizgUX2auoV2qoH+LJRPjDXuYPQCpUwasBvvcZ5f9gPUK2mtyqZUNYy2HasgfdJyjTT3H42KGjASh+0usTAcUCyGi/MZe1ME95SwXFgQpHUm1Q6oUvkziHidVKPQQD+iawAgbdpECI1jm7WlvT50XcgFjGt+/bGV6rGDqnb/8UPRVSoktDMfByNpBwjSgqUTOVEaQLRTIndibsTlLGmjnfRuxY6SuMQ8QzuJpLKbrT/YrNARSN52XjCY8VhLinWcpmYfwPC1vAiLYz8N5KnCV5XS8yVVri32A9GfMqCR0IcaeLg4aZ3ST8atDgJCSbvUT1igyv1hiPeBrqxAKUH2vAjdfphminO0jf2XP0Yk3jgDrXxpiyYzPU9dGP+3lAfSsUzqu2DL752efMDM8M1niGJy3Xivgvu43BmCP0oIxgY3HQGWmIR3i2qveXxRXnjEacZllPcyGD6FiqNMiKC1S1p33pkRI/wgWuXqW6nBV2pKaJ4UaO7LndngtNwMNCLDVxNqsQ7GqMeGPiUlw8gRVIfL9BdBYomxLBJ/imfdALvths3G37Gey/6B7Cbc1uMV4nmfhE9BEoynUVe/j0JX1euC1ZASpv7dNcIsyap72z39mpVfJbOroQXQ8UciVh5UgnVhQRV6rJQ+Gfejj970aZ6svgbD9djL/CwjkLiPLTWE6xojJ7ND78G5eiNpSVNG/Dv0NyTT/OE9lmK+Do4mOW5tTAZX7IrFXwqJSJOnS5c7W7g0PUBPpFlJ9IwkZDBhqeLZux4uwDONBTrbn0KErAPdmC9sVAXLNFGG4LLRNchcYjbrbXcIoSBXBT/aZVW5WgT+AF6YPUgAyk03N4WujUr9NLPrYsZSFhCxvE69B1RNtsLUKyaUbFm1QuEc1xwljNGywGBuMjCUEKlZyhvcD0a1KJSxvtGDrj18Ikm+wt+Bg1UthjCih4Fl1PfafEB9Q2Nc+sXiLJgyLcecGmLsWtBlG7YJ5BzN+wYqsinGCWcKOZ8eV4x2nmThcuY0tn/YGgQgTQhdlw6dq9Tg6QWtNHcuyRMAiMeuGVwKd1u+LZT7iLbAE2SzPRcC9ljX3faghJ1G1QnQGssabzyF9fEoBdKGwTp86iXhXTDvTbxgHW1ZiscrVsY8EJT4afvpu/A/f+DY8qCUwo092MaVt2q/HvpJwfwHPEC5BY7vmPJSqEGx6ESCd9bjdMtgcsLCkgcgHOJnCz68CvGUpnrEXqOfBBbO9s0J+D8Ta20SGwjqRtyxckR+/WiSSqy6dX6FTbdnrIsjvjyfWppZtCvrdZED/AElk7/fQHhvxhBahehIm1i3wjEG1X9NbXZBIjek78D41y0kCtIMcXor623zTThnLuOdvLCRV+/qiIDJHPlDjR8A4Nagqkyy4Ao81ZtqDq2pqdGR8t804Z4gpOJrtti5d6Urzmqk24Gg+OW+PsPZBc1PPmhCUIDDJHNIlRP+B9IwFytdccmZxFmmaH2ua6xgEm0Tgw6HWbJMSGpk5Df9PqVr8ZFemGoAD6svBo8g3jqPfOXE/vmwd8PMKgXhd7/6a+ylSmzqF2aSrh4GDJM5telLfI5Mi0/LCInPXqfK0vLK9TwpReC2G29m74QuAbxGHSKsq4Ij27M3Appakl4ulEilqaQUOYiri9jXRz/uvM59CLrBAZfPOTvzk/j4/xeZRF6BTwRYX7t4jKz5C4dYDXjkRQZh0Wii1NlsiaqT8L5u4iq8ig4BWO4QWzzM7oEPME/qOiitlNa5hNjLTfJqBuGX7KkIi1sWdzg4a/S/zUeExLIY+vKCJ9bxXBtIy8pCIhKXH7fFqJ1OqCeY9MyW9bUzzs8mwM2YhY7G2hEmX2dPzocIxuwRmd/UyG9jssVuPYKwdClSbsK3qweiHmgu4iRZreONweMTaD93o5Ozz1fH+2bTqu3B0yIp04QduTjVkvxW5rT3dUJuOvFLYLJAjV3pSDWFrvQ7nwCPhTVg2X785+JdxP88bFnsi2DS883tq+eoatPoE7bKW0AbKK6BbgkkZ7yiD8KXOXIRZS35e55Syrdz0hyt0iC24Vdga+VLvKB6nmJYtZ27pR+80HoDfMMIPaeowgLfH5HJKSHKnOfvPqJz6Zllb2rjfshjoUULoVIxxxX+bWM4j5WQEOPzEEscb8wil25TTzPFFpB7u0gJ4rz+N4bgz66T+TLBW93ED/0yxnt+ePOsdjSDVJSBoQvzfaFRPnbsmL6nIZSdzG6hWZX4gMjtaXslWIXaDj5VFLQohBDsDdKHA9SAsEigFkdv4vVpzd67/mpPB6FFYXxdJO+OfRp5kmG0inXpucs6kvZn30TWFX0B6sTLS9ef8buH8wascxN8YI2aYvimDTFL3AxTQfxFlZ2dLRlMc/62jvwbX1cRLf7Wj1zGI+uk/8tGe/TI1eV5qTHXWGx3omJOPeJJCd1iz+z8d0AgEPVIjgl0XAjSvb7+Rcl9bW9GhWeay5r+8VTvz9VfnAXBGruV8LE+Ima9q/QG9NADXtifJERUoBmDEGs9d3vm+78MLzJ0ycWCnrMwxUXzfpWodmWt3w34MuHavq9+FGFfWKER0usRq6hn+3c+SShUKGEv3/w6uC+0I7z89cM0vZtMQ7Hwnf3NYQov6saCpPJfTsxrJ60u1RCF5b8cjglXjk9gn4XMoWTS9/wEC1HgVEJvrbek27hHoCoj97kFWdI41INKqRdlrJMmxE6NQNrybeWE1uufs9mDxprJOu4S4+9OVqn5K1erFM3hlq1uzJ3xoWWg60hmVmHnm4nJCd7Yl+CNt7RcAQW5nPAvXzSyHEkWWnApuduCyTxvI8rHXv013nlYfVTET887YJgUrYky/osTGgpA73sQ4FKtiG17zqxQWhzQI88sOA5iWlziLHkUj2BOGy5AP8xD2celkN630K2tHIkbVH8/yAD6B2L6bKltwDHChwwS7aYE/5g8k2T+Xx0MPhKSq2TgkCJ6dlHnmdtgBbYgLSdmP8M/Jyinw7BGUj3KWlTmagF9nhk2vrYLaDnnrfGbSZKJyOWRZEk2VgI/QeilqUaCgAb8yGiY8kYT7sAoh6Gfe2tJ9bkOpPuEsqpTEFFPea1X2i0016c/evFyH6n1tES+7grihBlQdhCH+8JkC2rbY8IRTelIHRl6vkouClhXw1TgSqJ3dDxdffmcv0Xfc9Lw1/lOcuHOE3bCQGCxHiMhQw15+C6/1aUICxMiSbK3eoq+yxfh9PSzsHPfQ7wG5lR/Qxz76EOG3lekv4SZLorBnVkZhFroDMgdZ8UDiv14OLmrMUilMuQxzL5rII6i9ZBhK62YzXa9tB5G6Ral1TgF0i8yImRhVKZwZ7WkzdpGR7z/45ycBH5ZvK3tR2+OSkbjH9IiBvtHBpcG0Z3u5C6vgKrBxqJevk+EdzAM3gpGo7fTIlGOJjSEeEYYZKMOYELwtt8MtSbTLBGOnfnGEND6mY+FvR+yxuTPjl+DGYup4K6JGBO6v2lDjbV35ZReac336wVAzuhTaJVBhoE0Q7tY5B/k0UA/RCChArDbc4JA"}},{"/":{"bytes":"gyZY9fw2Vb6oTwP/WysvyWHtsVsDBIARK+DR+9mbFHhysJnC0hXf8hSuXwLd2E/BKEkDGuLlKNW9QMTFnDrWqRfOXws43nKBCuGQ8kxytmowPW8ThW01Lr3ZTOhXsEFCNFdLzQ/6WA+xIqG/P5XtO4tTqqEOEhgX/J9SlOXCJef4ObImk068OM1JV7ICdmSdBN/JfWzDRRxJ1BHSzI5EH+d8ZQjJXpLeQRbd7wb48fKIJ/dfvPrF6OzXkp7xSBJzaWEeB5UR//24Vzwacm4m5SA4ndVees5YzPoZNRlNx/tSavRK/rKK"}},{"/":"baguqee2abblyewychlq56phuknxcdqexezfxgelzqdoaa7pot6rd54knruw5okvmuwbsdu5p5jxiyvb45kk5suhivyoy4oqi5dhxoolabwyzpwa"},true]
```

#### dag-json CID

```shell
baguqeerathd2vkpzctg7undspq6glqkwvjkbu5djlaa7mwphztm2vc6budaa
```

#### dag-cbor CID

```shell
bafyreigq7pmxw36l6hjw35bign4l5slwf7qvf5hfnhv2gizst73g5b25jy
```

### garbage-02

#### Bytes

```shell
5b6e756c6c2c7b22223a5b5b7b22284a5171223a3530373334383336333334303534372c22417270592e223a5b5b747275652c7b222f223a22626166
6b72776963717675713761376d3662747733613267376b6f6378326a68346968797a74326a3335786d326e6461356f686d6a776264336634227d2c5b
2d302e373235313538393831363132373239372c2d312e323738373631313932313138393538332c747275652c224d60213e5b6767535c5c4939492a
45716c27205e362a425c74463133533f476527314b36535e55643b32755c745037787b593f513c502d284a3032707e2f573e5c5c28445c5c76296d2c
53237b5a697536694c2a5d77e298ba2c6030274d786f42405c222f513b3f6a6661463e3a5b2c5f40404f5f2f54345c746f732b3e4d557e315d4b6c79
446874692a37643e323a3678716a514a797e403e2741607b6a517c283b27432b77622d6453314c4d534857334f4f2b32585d6f7566404de298ba2033
7d303f3279365c22285f32574250462b684e467e212f747e4e7b55324a41655c22785d48423877743767333c7d25346c517d2d6e2f3669407d5d5224
233f56724e6846e298ba3e2c3d26696132613d307868e298ba417a3b497e415e6139774b5677357e282a664f2636543d4d2059433d5d653b6c493371
5c6e514e476223544c59615e35363f572a24402e69575935314d3c65372c34257a23466939397b5428483a3647343b75766e5a3f3c4179635c224d4c
5e2748694a6c74712a664b5620412e5a6d25525c747875673a79346a263e563371424d25495e72582b2c43695e5858662d2e474473574425e298ba2d
315c7472365f31555772705c5c504ce298ba627c796726383f50325a7e566236214e38607b71726564707e35592341457e3a5f2d6d6372506a2e4d48
473a375c22403f70432860686555274b70575f2a5c5c5c223346e298ba724f2d3a2677734e5c5c4f2b5969747d5d2b5d2833413e562d722e69255f61
38492c4546584b55532a68447c4a3666384c2f7a485c6e5b5c5c645423554e3e704c36e298ba35715c7425395572734a6237452c3a693359567a405c
6e3d50656d5c224647515f3b326161783c5c6e76662f35795053434c20e298ba2676272d312562e298ba34622f6b77406c6d3c704c3f57634c6c3a40
587e5b757b54565c2246407c3b5c2228212c3c3a606c3e5b7b79643d3e3a5f4d5e706162524e547a72375c5c405d3e5e40297d5c6e51347b4d57216d
347b356c6c784d506a5c6ee298ba3c563b265452257862e298ba6c24204e79307921696f2e2c656b5c22454a536a2d4a5c2248637a2c374c635d2f4d
435740724e5537e298ba312f60783b264756327c5c5c6b3f59605f23277a266f4324556d3d7c34417e7a4363654c486a38683f3e3932762b39285c22
6a4e316e2d464b7346682448445653326a7b774a52273e2c3829573f545d2f3f60306232764c6c675c6e497a317e36795c6e762f7b785b4a5f397241
44487558306941406a41276a432b773b5c74644046335c6e5f443668427462325479455c2271573c70212f4761656945286664617b7b5e5e3b467973
2d276368462c4374335f616070294f342055305277567041472835252e2a472f5d5c22735c6e7338636141675757335a28347a773c396f5e757a3e5a
40397671794b7c70266b284b41255647444b32657b47306d3f41283146596235e298ba28204b45625c6e7a4a5d476c484b713d4f4f3248612a235856
7c3e53563c5331754c3d782e795034553272296e6e3f716a40745325797525765337523c79786f3f52483e7e26723a2963392a613f766c56632c4c5c
6e2a2e5f443b216e457571363e2b6d2f5e6b36575b583c7b476e20e298ba25264c4c534861652d4c745c5c6073575c6e65785c6e645b3c5e5c5c4f66
7e455c5c75386625482440756e5d26e298ba5354394c4c65476f3845735c5c24617e7129532a6458693d6950284d5b765d21206d493f7324763d2d62
552a334f532556582f7c5c6e293a274c4e2b2f33482b2835637958774d754b2523315a7a657d5c743551e298ba256e273f492a5d663349346d312332
586d28527c2a417c51332a347a51524665635c744d757832763836707e746277527721563a2e297c40242854693a7a39e298ba2f4140697a465c5c35
71e298ba4d587168602853777b5c5c58712651775e3e6d38434c3f4263605c22443945405c6e544930292366386d28215b297e282b4c6d2455244f29
37547c64425472365b6d43525b503b74766b395c2275725d727b646f2927556d5b705227784765412d2d555c2271634a645421237c2c2761595c6e5e
2e5b60775272615a7b6d314c244a5c5c556f235f7a527b506c49e298ba212e555b342d56e298ba306b7052497539595c743d67483d2e516f3b424476
655f7b5a77744128682f62237c29532472376572264d322074664f3d775a5e46492c254351516d28e298ba785e257e31662f3b467643655c5c34345d
396758787c61535530366c6d43464c754d5c6e32395f41774f5a605c22407b742d55306e6f37755b77697062746f653c783844743f6563232328615c
747d4e383552304047654d70624a7956405c6e5c222d5065782a283f712c3823253b722b4249493d2b72357d2e5343646873e298bae298ba6566502b
5d4d56625c6e47695a5c225b73362e3e516247322e555d3e5c5c713f685d65277c447a5e7c28412d6b4755e298ba7063305c5c643b38477b562b467a
7b55522652762b78524a5639754f45486b302f796058553c457e7d275a2565217177725554385c22415e6e42672f26685a5f437d702b6856337c5c5c
244a2f6c7b7b5c6e412b6e4826526225414726574e3a2e3f68495f525a6c2f50384b42657b20296b7959392b326032486e7e545c5c6b215f7059782e
3925515c22482721637843364774543429513779606d303621715026517ce298ba393157255b2b405c5c324744334e5c5c3a4c6c47715c5c682a456e
2c4578447d7725594b614c2f2a3a5a5c5c7b685c74766d575b47595e6f4d2454376b464761732329e298ba254d58215d4e5b5f23504e3f764e687928
37596b4b3421444f6d2e5f5876e298ba424f4763207929535979e298ba753e7049365139203e4b33312ce298ba3129697737582a4937327d487a5956
683942517364356e64407662522d254636702826215c227429315a6e3d252047452360395a2e30642b544b6c51436a6c765b7b64762960643d663c3c
3d552128546445515c744857605c6e443e766b592030613d7c3f7a77596d5034535c6e336470333132413f3670682060726c73504a71466e3d457946
693a37655c7472784f65512b5625594579442e3a74474ee298ba4e72384374764d4b293c593d2f6657583a26533f3e20255352617060587a63416535
6e6250693140e298ba7a6d732f5c5ce298ba3d414c767431317e5d70623b5c6e28357554353f68367078e298ba6148485020783e5431555870556024
75575c74435c5c4a7a54253f66492a27605a7649e298ba495f654d5972206d77717043635c22233729536c6168417b7c303f484e6b5e524c4e26253c
3d7261765063465c74585c6e566d2c504776677b764e467d747573786b476e5c226b2f61653531416d302f657e2b4d692037433146745d3959535c22
5e395174246d2d7a2d27212f79676031593d6b5f376d542e667e525e572542262f325f203178795e5762313a405c5c5d2e2a544768273f54503d2c20
212c732f593562413970564a265c5c344d627d2f6941476f4b4856383775355c226d447e3b2539746973757544526935506c2e59252c376270506744
63247a60795367745c742f3c5021396c4f366f29492c243c67214525433b38625927603626727c5d4770533e50235a315b782a745c6e316f57624a36
552a2921e298ba63675833355037382a363f595176696552755e2c5c74375c227149203b51672a3c7375302e577b453a6a6444455c227e55704be298
ba276176534f4e53684f39244b5c6e3c54253b544f7d30355977217b2f49366b637a246668746b72753534694129475d5c2276606d2b5877364c3f27
5c6e554b2c6d5d326d2a6e245c5c203a654c3d3a666048315421712074453c44624d7a7de298ba682832547b752c292e31377a372a4d5c742d202574
3029547478422e515c22765275666f4a2c7143763828212b5e3772326a4b6a67324526464d665944493e5d3b5676616a597e544c6a4771666f563125
776c3b77585153267e793c282c4a5c5c375e7c5c5c5a61784c555f7a6b4b4c454a4e3ae298ba216d66362570474d725c5c7b4142295c225836325c22
79405c743a5f3b695a5d604864e298ba5c5c735c7468585f25245c6e296a4066532d3b536b4f702c435c5c2e523d3c3a303f4472515242646f68736c
697e6453776d672d7a692655377729637a7a436143492039315c74526f234025666e316f2528552c6b6c5d3679477532376371e298ba235a6f52672e
7679796368266c353c493f54443e602c6a5266236a6f26764070474334462e3d26633d504b2a472f7c7c6128655a7b71354e5e67747c2c502b543677
7a5c6e5c6e6f312c5c745e3f355b6a512021675c745261645c6e7342303c39323321464f6f50702666374848492d5e61445b507921237d5c2279436b
2e5e602c3d522847775c5c35774c2c66463c4355547d6d25785d3a69592823674a68534d28684e623a33327be298ba594f7b5c5c375c5c42423f3e40
2c76596c73392421773979313e4d3b5b7a3f3e313f72786267305c7458243b567e642b412f6a3b527e4f24205d533f3a507e55242d7d5c6ee298ba47
3f28412161657a2c5c74454853633f62723f6b3c6a5e7745217b2e3f604b315a2641434c333e38652831525c74745c6e2d4e7b7b4f44567a424b5973
56514d735d7646e298ba4a202f3a5750713f4670667d39287d3b682c72547a453156755c746c23675c227d543b68776f2e6d37793b363558306f3044
467026423f53645a283b5b7a574b6f324f40715c5c332140476a2c25735d6027734c675655454d4854562f7b404b793c4a514d3c7175214268453023
4c2647264b366b416a3b495c7453444066562c4b3b592c2b48345654474c547b612b4a735c5c4f612a4c5d442c6f635e7a3a3e296654715d676b524e
385b307b7b675c6e4837256b4072632567585b236c217944697e4d403a3b207c217e2539315e4a742850576c573a507a704c3b5d5b38656446777b47
3a5c74254f432327714a3d3744696839636a395e357c275c6e7e275c22374e492b262d77425c6e6e73675c226b4e4b2c4b6b5c6e6b4c57792131225d
2c6e756c6c2c7b222f223a226261666b727769676d73687365636f6d6436717070666c6673336b70796969706261756a73346a6b627835677a62716e
666f776672373571377a79227d2c6e756c6c5d2c7b222f223a7b226279746573223a22564f52346f4c56685a6d637942724168555571485751436e46
7033737935714b442b4c31694b4451626b6e486355786579314b514e5637474d637a793455492b347179544367712b434c32652f726c696137667175
2b51395569423478685753366b3254433138413170714f4e4759353452725250567732615a76592f702b6475707075617778744e736d64356d2b3970
4232685436335a6c497a42774263506a495a717065736e2b41724837502b5854534e58627435513466715073696341496731753266516a3759336164
2f47586c393871786f465a494455664e52654f5950596a426c6b4b78737467485835327253566a546e667639395066445675385953654e4e576b7556
5452643054734735315755683230512b4d72536c7a34472f383074796e414f433236392f31556858336b3646756f692b5963486c65577278354f3558
4b5774617355706b552b644f465442755175644f346142477a5a52306d7649426f585867626c306436716d533830456b6d56396c3052366834415744
6732744c53435a61564f31703776396c765674516f5549717a57455a2f704d424d32366c5a4f625369714a6656326a7a4b33316b30464c5338646f4e
4e51573446706e34674266694d674443434a632f2b7133437232456e2b56346c747273784f4976397a526730715641657738762b4d67676d74523862
6c32464f4236386d574d4c2f346e6f506a31354a486c4c70306851517259746b6754685a4a424742315542436a6e493361716c5441614a646a57734f
53765a353145624334306a76756156452b436a6b7467434a2f5571373054446830703963786c44774c636e5837365a654b5a586c4e61462f4565306c
3448667244537a51383342376557666e726b576b43412b334a49544e30347571735a767a46767a59516746414876375035765152557543374454426b
73586c4e7750702b72786e346841397967477679486a5934684a5637396f6c41724b5a795279554c6a514b58575a634d68793950622f59624c515949
32377974694c6d2f76426c63426e56587541684d397a622f6e6c42733030472f4a4661504e7849736f4d39384f35627975666a56534e483448382f54
4b437a475841754e797452764d3146554c5467447a6f516a777a4a48687462683072314a666a707664344661737535524847736f722b503752696865
5a566c5338366653552f767275542b4c6d2f78704a5456575530745a61653542446b4f2f636d7845703558463562554a6a3578615230523177756554
75386d4d38426a54694e39634234546b77746975466634623950684a57454c7679304c45634f6e36464932355552734a555353574d51744a42485576
674e62354d6345474c3338355065343475546a2b435a5332466f56306a53596a30536a71365759422f454635575943686a677a6b683768587557364d
343844715437534745737a6e507967396a784c634c476d6a47694f4d427a574e35554a55553945704e7863466c366564712b6e7a6159525651445376
66683939573343622b7234684d31353464746157594133496f2f4d49584957577a756161596f61765666315272684a6255556d73416b314e762f724b
5166366f6463566f446e3339373548426c755a666c4d71426a514f625372687a317a4667356173544e597371494f2f356b4f384e30692f6231477545
4468437031474e304e56612b6c374e2f6b446d305432454d585843304c77772b355a5851576747563463662f464164377053444c73654a7a58682f6f
376959337856546e5773706d4f73615a424453624d47324c5344742b507051576e2f736b724e6f5632326a31706247775a747a4a2f72546b71776850
76412b304767774a696f76777155372f756b5345623862786d573344646f3961475a6f724d4f762f4d4d396b37545355455632557130354770737176
586a373933424453775269306862702f4347787049637030796b6c2f68794d2b7459796c6e456345454d2f547135356c6542564b6139766b65517642
673871386366324c644b304b2b592f43726454696a344f6735563838745a4442317a705a3042474341227d7d2c66616c73652c225f63225d2c22665a
7a55635047392c6435465a70223a5b7b222f223a226261667932627a61636562656437766d70343462666f66706a6b72373537747a7678646c6e6768
323432776a746d3533617272626f61346b6c6d77347269227d5d2c2271445638223a747275657d5d5d2c225c74286f2068223a7b222f223a22626166
79626b6d67727267747a6976366e3277646568697a75666c336c6a6e6d6e6e747a337a7368797a3462776c677a78686e787934366478706164783361
62717062787a6f67636f6e666f726273676c6e673671227d2c224059223a5b7b7d5d2c224e2f3f27576c33453a7d546f7a4d74766b307763456e534d
64467d3a6f313a646b66587e37614b223a747275652c225e4d795c5c604748373f7b336576642d3d5a6e4b71223a7b222f223a226261667972677166
69766f6e7663696f706c6c696261617335686b683465623375376b7571616a757161647878643367743673636b62797575747a76706b32327a726163
6832363361656a6f3535653578677a78683236346875786e65366f776c6271737132336b7a626a353361227d2c22666e5e565b2341433e5757355d2f
383a6b55442a3f75423c3e3620616e554163446be298ba223a6e756c6c2c226c585a223a7b222f223a226261666b726b6d6436327a74666832766b6e
62706732796d3234783778787172686e3635366b7863376f6578626e346434346f737576707a686866376d32786f71706e7765327a6534717a666f64
6b6d6664327771227d2c2271217c5b6148484d4f70685e223a2d3535363436373934313033303735332c227e7d627c30666147683a3a7b5637666744
2d52592438223a2d343033323034333836373330303039397d5d
```

#### String form

```json
[null,{"":[[{"(JQq":507348363340547,"ArpY.":[[true,{"/":"bafkrwicqvuq7a7m6btw3a2g7kocx2jh4ihyzt2j35xm2nda5ohmjwbd3f4"},[-0.7251589816127297,-1.2787611921189583,true,"M`!>[ggS\\I9I*Eql' ^6*B\tF13S?Ge'1K6S^Ud;2u\tP7x{Y?Q<P-(J02p~/W>\\(D\\v)m,S#{Ziu6iL*]w☺,`0'MxoB@\"/Q;?jfaF>:[,_@@O_/T4\tos+>MU~1]KlyDhti*7d>2:6xqjQJy~@>'A`{jQ|(;'C+wb-dS1LMSHW3OO+2X]ouf@M☺ 3}0?2y6\"(_2WBPF+hNF~!/t~N{U2JAe\"x]HB8wt7g3<}%4lQ}-n/6i@}]R$#?VrNhF☺>,=&ia2a=0xh☺Az;I~A^a9wKVw5~(*fO&6T=M YC=]e;lI3q\nQNGb#TLYa^56?W*$@.iWY51M<e7,4%z#Fi99{T(H:6G4;uvnZ?<Ayc\"ML^'HiJltq*fKV A.Zm%R\txug:y4j&>V3qBM%I^rX+,Ci^XXf-.GDsWD%☺-1\tr6_1UWrp\\PL☺b|yg&8?P2Z~Vb6!N8`{qredp~5Y#AE~:_-mcrPj.MHG:7\"@?pC(`heU'KpW_*\\\"3F☺rO-:&wsN\\O+Yit}]+](3A>V-r.i%_a8I,EFXKUS*hD|J6f8L/zH\n[\\dT#UN>pL6☺5q\t%9UrsJb7E,:i3YVz@\n=Pem\"FGQ_;2aax<\nvf/5yPSCL ☺&v'-1%b☺4b/kw@lm<pL?WcLl:@X~[u{TV\"F@|;\"(!,<:`l>[{yd=>:_M^pabRNTzr7\\@]>^@)}\nQ4{MW!m4{5llxMPj\n☺<V;&TR%xb☺l$ Ny0y!io.,ek\"EJSj-J\"Hcz,7Lc]/MCW@rNU7☺1/`x;&GV2|\\k?Y`_#'z&oC$Um=|4A~zCceLHj8h?>92v+9(\"jN1n-FKsFh$HDVS2j{wJR'>,8)W?T]/?`0b2vLlg\nIz1~6y\nv/{x[J_9rADHuX0iA@jA'jC+w;\td@F3\n_D6hBtb2TyE\"qW<p!/GaeiE(fda{{^^;Fys-'chF,Ct3_a`p)O4 U0RwVpAG(5%.*G/]\"s\ns8caAgWW3Z(4zw<9o^uz>Z@9vqyK|p&k(KA%VGDK2e{G0m?A(1FYb5☺( KEb\nzJ]GlHKq=OO2Ha*#XV|>SV<S1uL=x.yP4U2r)nn?qj@tS%yu%vS7R<yxo?RH>~&r:)c9*a?vlVc,L\n*._D;!nEuq6>+m/^k6W[X<{Gn ☺%&LLSHae-Lt\\`sW\nex\nd[<^\\Of~E\\u8f%H$@un]&☺ST9LLeGo8Es\\$a~q)S*dXi=iP(M[v]! mI?s$v=-bU*3OS%VX/|\n):'LN+/3H+(5cyXwMuK%#1Zze}\t5Q☺%n'?I*]f3I4m1#2Xm(R|*A|Q3*4zQRFec\tMux2v86p~tbwRw!V:.)|@$(Ti:z9☺/A@izF\\5q☺MXqh`(Sw{\\Xq&Qw^>m8CL?Bc`\"D9E@\nTI0)#f8m(![)~(+Lm$U$O)7T|dBTr6[mCR[P;tvk9\"ur]r{do)'Um[pR'xGeA--U\"qcJdT!#|,'aY\n^.[`wRraZ{m1L$J\\Uo#_zR{PlI☺!.U[4-V☺0kpRIu9Y\t=gH=.Qo;BDve_{ZwtA(h/b#|)S$r7er&M2 tfO=wZ^FI,%CQQm(☺x^%~1f/;FvCe\\44]9gXx|aSU06lmCFLuM\n29_AwOZ`\"@{t-U0no7u[wipbtoe<x8Dt?ec##(a\t}N85R0@GeMpbJyV@\n\"-Pex*(?q,8#%;r+BII=+r5}.SCdhs☺☺efP+]MVb\nGiZ\"[s6.>QbG2.U]>\\q?h]e'|Dz^|(A-kGU☺pc0\\d;8G{V+Fz{UR&Rv+xRJV9uOEHk0/y`XU<E~}'Z%e!qwrUT8\"A^nBg/&hZ_C}p+hV3|\\$J/l{{\nA+nH&Rb%AG&WN:.?hI_RZl/P8KBe{ )kyY9+2`2Hn~T\\k!_pYx.9%Q\"H'!cxC6GtT4)Q7y`m06!qP&Q|☺91W%[+@\\2GD3N\\:LlGq\\h*En,ExD}w%YKaL/*:Z\\{h\tvmW[GY^oM$T7kFGas#)☺%MX!]N[_#PN?vNhy(7YkK4!DOm._Xv☺BOGc y)SYy☺u>pI6Q9 >K31,☺1)iw7X*I72}HzYVh9BQsd5nd@vbR-%F6p(&!\"t)1Zn=% GE#`9Z.0d+TKlQCjlv[{dv)`d=f<<=U!(TdEQ\tHW`\nD>vkY 0a=|?zwYmP4S\n3dp312A?6ph `rlsPJqFn=EyFi:7e\trxOeQ+V%YEyD.:tGN☺Nr8CtvMK)<Y=/fWX:&S?> %SRap`XzcAe5nbPi1@☺zms/\\☺=ALvt11~]pb;\n(5uT5?h6px☺aHHP x>T1UXpU`$uW\tC\\JzT%?fI*'`ZvI☺I_eMYr mwqpCc\"#7)SlahA{|0?HNk^RLN&%<=ravPcF\tX\nVm,PGvg{vNF}tusxkGn\"k/ae51Am0/e~+Mi 7C1Ft]9YS\"^9Qt$m-z-'!/yg`1Y=k_7mT.f~R^W%B&/2_ 1xy^Wb1:@\\].*TGh'?TP=, !,s/Y5bA9pVJ&\\4Mb}/iAGoKHV87u5\"mD~;%9tisuuDRi5Pl.Y%,7bpPgDc$z`ySgt\t/<P!9lO6o)I,$<g!E%C;8bY'`6&r|]GpS>P#Z1[x*t\n1oWbJ6U*)!☺cgX35P78*6?YQvieRu^,\t7\"qI ;Qg*<su0.W{E:jdDE\"~UpK☺'avSONShO9$K\n<T%;TO}05Yw!{/I6kcz$fhtkru54iA)G]\"v`m+Xw6L?'\nUK,m]2m*n$\\ :eL=:f`H1T!q tE<DbMz}☺h(2T{u,).17z7*M\t- %t0)TtxB.Q\"vRufoJ,qCv8(!+^7r2jKjg2E&FMfYDI>];VvajY~TLjGqfoV1%wl;wXQS&~y<(,J\\7^|\\ZaxLU_zkKLEJN:☺!mf6%pGMr\\{AB)\"X62\"y@\t:_;iZ]`Hd☺\\s\thX_%$\n)j@fS-;SkOp,C\\.R=<:0?DrQRBdohsli~dSwmg-zi&U7w)czzCaCI 91\tRo#@%fn1o%(U,kl]6yGu27cq☺#ZoRg.vyych&l5<I?TD>`,jRf#jo&v@pGC4F.=&c=PK*G/||a(eZ{q5N^gt|,P+T6wz\n\no1,\t^?5[jQ !g\tRad\nsB0<923!FOoPp&f7HHI-^aD[Py!#}\"yCk.^`,=R(Gw\\5wL,fF<CUT}m%x]:iY(#gJhSM(hNb:32{☺YO{\\7\\BB?>@,vYls9$!w9y1>M;[z?>1?rxbg0\tX$;V~d+A/j;R~O$ ]S?:P~U$-}\n☺G?(A!aez,\tEHSc?br?k<j^wE!{.?`K1Z&ACL3>8e(1R\tt\n-N{{ODVzBKYsVQMs]vF☺J /:WPq?Fpf}9(};h,rTzE1Vu\tl#g\"}T;hwo.m7y;65X0o0DFp&B?SdZ(;[zWKo2O@q\\3!@Gj,%s]`'sLgVUEMHTV/{@Ky<JQM<qu!BhE0#L&G&K6kAj;I\tSD@fV,K;Y,+H4VTGLT{a+Js\\Oa*L]D,oc^z:>)fTq]gkRN8[0{{g\nH7%k@rc%gX[#l!yDi~M@:; |!~%91^Jt(PWlW:PzpL;][8edFw{G:\t%OC#'qJ=7Dih9cj9^5|'\n~'\"7NI+&-wB\nnsg\"kNK,Kk\nkLWy!1"],null,{"/":"bafkrwigmshsecomd6qppflfs3kpyiipbaujs4jkbx5gzbqnfowfr75q7zy"},null],{"/":{"bytes":"VOR4oLVhZmcyBrAhUUqHWQCnFp3sy5qKD+L1iKDQbknHcUxey1KQNV7GMczy4UI+4qyTCgq+CL2e/rlia7fqu+Q9UiB4xhWS6k2TC18A1pqONGY54RrRPVw2aZvY/p+duppuawxtNsmd5m+9pB2hT63ZlIzBwBcPjIZqpesn+ArH7P+XTSNXbt5Q4fqPsicAIg1u2fQj7Y3ad/GXl98qxoFZIDUfNReOYPYjBlkKxstgHX52rSVjTnfv99PfDVu8YSeNNWkuVTRd0TsG51WUh20Q+MrSlz4G/80tynAOC269/1UhX3k6Fuoi+YcHleWrx5O5XKWtasUpkU+dOFTBuQudO4aBGzZR0mvIBoXXgbl0d6qmS80EkmV9l0R6h4AWDg2tLSCZaVO1p7v9lvVtQoUIqzWEZ/pMBM26lZObSiqJfV2jzK31k0FLS8doNNQW4Fpn4gBfiMgDCCJc/+q3Cr2En+V4ltrsxOIv9zRg0qVAew8v+MggmtR8bl2FOB68mWML/4noPj15JHlLp0hQQrYtkgThZJBGB1UBCjnI3aqlTAaJdjWsOSvZ51EbC40jvuaVE+CjktgCJ/Uq70TDh0p9cxlDwLcnX76ZeKZXlNaF/Ee0l4HfrDSzQ83B7eWfnrkWkCA+3JITN04uqsZvzFvzYQgFAHv7P5vQRUuC7DTBksXlNwPp+rxn4hA9ygGvyHjY4hJV79olArKZyRyULjQKXWZcMhy9Pb/YbLQYI27ytiLm/vBlcBnVXuAhM9zb/nlBs00G/JFaPNxIsoM98O5byufjVSNH4H8/TKCzGXAuNytRvM1FULTgDzoQjwzJHhtbh0r1Jfjpvd4Fasu5RHGsor+P7RiheZVlS86fSU/vruT+Lm/xpJTVWU0tZae5BDkO/cmxEp5XF5bUJj5xaR0R1wueTu8mM8BjTiN9cB4TkwtiuFf4b9PhJWELvy0LEcOn6FI25URsJUSSWMQtJBHUvgNb5McEGL385Pe44uTj+CZS2FoV0jSYj0Sjq6WYB/EF5WYChjgzkh7hXuW6M48DqT7SGEsznPyg9jxLcLGmjGiOMBzWN5UJUU9EpNxcFl6edq+nzaYRVQDSvfh99W3Cb+r4hM154dtaWYA3Io/MIXIWWzuaaYoavVf1RrhJbUUmsAk1Nv/rKQf6odcVoDn3975HBluZflMqBjQObSrhz1zFg5asTNYsqIO/5kO8N0i/b1GuEDhCp1GN0NVa+l7N/kDm0T2EMXXC0Lww+5ZXQWgGV4cf/FAd7pSDLseJzXh/o7iY3xVTnWspmOsaZBDSbMG2LSDt+PpQWn/skrNoV22j1pbGwZtzJ/rTkqwhPvA+0GgwJiovwqU7/ukSEb8bxmW3Ddo9aGZorMOv/MM9k7TSUEV2Uq05GpsqvXj793BDSwRi0hbp/CGxpIcp0ykl/hyM+tYylnEcEEM/Tq55leBVKa9vkeQvBg8q8cf2LdK0K+Y/CrdTij4Og5V88tZDB1zpZ0BGCA"}},false,"_c"],"fZzUcPG9,d5FZp":[{"/":"bafy2bzacebed7vmp44bfofpjkr757tzvxdlngh242wjtm53arrboa4klmw4ri"}],"qDV8":true}]],"\t(o h":{"/":"bafybkmgrrgtziv6n2wdehizufl3ljnmnntz3zshyz4bwlgzxhnxy46dxpadx3abqpbxzogconforbsglng6q"},"@Y":[{}],"N/?'Wl3E:}TozMtvk0wcEnSMdF}:o1:dkfX~7aK":true,"^My\\`GH7?{3evd-=ZnKq":{"/":"bafyrgqfivonvciopllibaas5hkh4eb3u7kuqajuqadxxd3gt6sckbyuutzvpk22zrach263aejo55e5xgzxh264huxne6owlbqsq23kzbj53a"},"fn^V[#AC>WW5]/8:kUD*?uB<>6 anUAcDk☺":null,"lXZ":{"/":"bafkrkmd62ztfh2vknbpg2ym24x7xxqrhn656kxc7oexbn4d44osuvpzhhf7m2xoqpnwe2ze4qzfodkmfd2wq"},"q!|[aHHMOph^":-556467941030753,"~}b|0faGh::{V7fgD-RY$8":-4032043867300099}]
```

#### dag-json CID

```shell
baguqeerany7g4t4n4uhluzo5cmp6q5njzp3oenom5hxo3tmryymx5ukm6rzq
```

#### dag-cbor CID

```shell
bafyreigv2qjdrwbwfrqaamyjgka7c5htkb6vzb5y4h4k7u4aeslnjzqy6m
```

### garbage-03

#### Bytes

```shell
5b66616c73652c66616c73652c312e333139333632363133343730303538352c7b223d5e6c3a67223a5b383530323032343830383739333331312c7b
222f223a226261666b726569657a7a6977786963727773746166366469326f766a67653479327a336d70693670696a706a656c73356c74776e65686c
63617369227d2c66616c73655d2c2253344c2d7a3c3f223a7b222f223a226261667972656967636335717563687861663370326b77376f6a6a643761
7736366c7636766c6b36756c776670796c616775776d613764336a3471227d2c2253546e207b79745d595427287e5c5c71425d3a2f2668223a5b7b22
3a20753f75223a7b222e35645c22223a5b5b747275652c747275652c2d312e313731363035323434363334333231332c7b222f223a22626166793262
7a61636561646c766a35756c677772777661323732717775376d6232326d716335676276366f6a6d6370676a7777646b6d63786e6d37326b227d2c34
2e3530343832343933303339383736312c6e756c6c2c7b222f223a7b226279746573223a22396465655a474d324b447a464a4b444b574d4979686f52
54504750413379506f316f374d6244326d496c36752f79355376544f746f6952433065534a354a356655705942746a30366a4d4e30544a63312f6d32
536331534d7831646243424f3669347833643648354964304f6d72423862332b7a336e2f5643716c44376449355455336a51586b7353516244564c6c
384134325a43526b724356504c616d4d4563576248754563716a635371487441414766517270546a506e6532433156736f485232495a38514c527836
2b554364783138616830783837575854462b4335713034656e6a312f357a39524e2b4b56666d624676477a306a7463556261473069655074414a506d
6a434e645a4657756a376452746361707863397354746957386572466549587a764c7a6559666a39646f662f2b3358536f46544f4236347255394e42
757137686b382f766e496575464d4c30737a2b667252342f4c6d473551344a33423574724970643235634c7848386f4e75705743704e4a382b30734e
756f6f4b514c7470385261766f56787354724a4433354a675961726d62746b764f5178696853316b673641365772334c453332544e313532716e7458
324938486432547979557546476e3767663637574c494c57675975394e50745269794c64417547775755426831424c556f724765713853316b6a3657
436d555937787036546b6a65536368756d75515630534b55486c747646374a37546547374d4a78354d4e6a684a6a597330427250374a623038425448
6c416b7a6a3976756d666358645a4c6978736d74494437634b6334556d4d4944554853374863314849344f387845484b592f33725a3438505a337a6d
5775307535797a6d70465875724873482b36704a726c674742532f50595153713549326d746c474866584d5a73746931623462365877355976534c6d
566d50314554776750756567734c72324e774c4132322f634b557232386163524d53523463346552454d74367a7261526c597258544c48356b30586c
7374673063676638445579664f31714f66676e394f366c4479616e305133624565536c6356472b554653336748616e70383355464e52682f54504a41
72684b6d2b73365273767a4656655442596c3666306d4d6a77727370615a6876506d466665586a48392b67514452496f484f35567561425874673850
375979724a7a4c306f76737369376933764f674b542f545143446c4a5932504b4f32434d2b4175316c4a3579777934522f51704736656f6251677858
4745734d4e6d74596a34492f77364e7042527335364c333653524c3269443965486f39697853766f6775427638434e583254742b5776555574324950
38356164356f3457397a75684e7859633536474f446e564f6475553342327730715436646a4433464e664b2b585862504d6a30615241315453683449
36734155636170626f49423838777364793777524b6a3178304a4954386b7369337a576d34585676322b64676a5975626b4d6f524f324c62394a4747
4b636933594d58343956663949554478347238464d59774667394d634844624971433573385147714c313172633756345852315531744f625438426c
305a33314f6f6243595157734c4c68453777316e7866373341566470696473676e56766f464e5a77797046724574504a76397a59563132386a37354c
344e7563586772615a2f7a52653878537a79384c51535743704b72434779664f41685067446c357a732f695a514630557437673744487a7878356d4a
56326564766241356f527379507454476130714b4d3678476273455944362f757a41734651354b3634446c2b746c336b6c567a48642b6f6a2b6c676d
49795a314f3041725a5046555668447676756648744431546a656348595a493361534a517136466c4d4b7574613278682b3372396b664f655a735a68
617530315374513070796b4438595a716c363944416d4b30377863396c785a5166546b48622b7765764c417175303867757576774f6f6b4b62753257
65434e585a78752b53436c564f79776b70696847664956504e4c563863744a39336c5037376446302f66736b6d2f50686f736d6b4a362b6361726565
4846314947444e6c454934355a677169454c4c5a584f765977364f53346837446c4d4c416f562b3469786668783031586f52576f387a324157375771
54396c7649486459704e383361616c31493753355251456168514579526e51697a764f746d6a4546453368736176564e3656314f3430484d4155344c
665a59317345504e4d635330686a69306549454d2b474d6950557a49636968594576723931495055304a435875764b46334d537974527463766d2f76
4e726947344b736b73555238515137523663376b37634e662b51317879514f393054635850336368484865463272625972617a7468304a6969656262
5145497277522f3934433250367761486473614e4731474757556443414d77726f576a69726f44633046596a37512b466157352b7a65615932496739
6a334d707867762b782b71794b665a672f5a56314d3479304d78586f316f4656724534597562694961366b54432b786d5937543775435738756c4964
767352677677466756333935526b3649694e444a42396c4e66784d764b716e495165787743336f50393746495250314754555642444e335978345539
5479676e62425930683554335268736b417248474f58516b4d3434463741304e7255306961535458366f3346324b4d652f2f574d4576554576514456
52325941686f5442384d4c534e316138514d757a50715138725557494a41584e505a796d61497a68712b696c717459487a353630336c766150536667
7243727a486b5631475836384670626378676f72415a66733372706c39326f627a59427765792f516435786a506d3979775945654f66575834495755
5754357561487a39567877616c4937516567532f48477074697a5873414666786c725073326e546e52366541414f74576a77396b73586c4659416257
79733363663770686f6737624f6c6c2f54346a786c51516669767961413837744f72586466704a744b50476e67554e5a74347a6d5732645450597137
396e41394d4170374b42484270624b2f486369676c7239467374734f664e76313874304d747538332f523431715571754a5472504e725a71786a6e79
765948542b4d462b6750356c4c6456766a69536453574e3268453937566a7957734a333247526a625442386e3850446f354171634c575362596b4d64
5630537a304d586b54767230686d482f2f7159747579696957585546365041574231734b625a34644e77754632415234504d6b376247774561432f69
4b796c6b425157756b3864656a78493034726f3045333257544f6778415a654564725531574e49707a584e545a792f496a4c63593261496c4b467745
74552f63586745352f33657055767250397a536e7a79453269467266374345445471624c6545687369322b355a516f627849696b4c584b4f76346d49
51592b444b5a3647707670796a6b5147564438392f797a4837784146472f315a414e6248537367614858506e4c4637684b397a514c4e6d6762742b47
6d57384a436e45535145495462594f6e5246323738396f64676a6a516c6256345a466f74614c35734b554c6f6c68763941584552776e36364f786a38
4633794a654a39487864546b375a6e587736647747324a644859715a4870626c4f7a624655694547555137364b4963515279625559594648674a795a
7a776b774a4b726a787237376b616e713476794e7457523671324e71367778574d6549624763703946727572344d426a7873476154534b7852765239
39564444753042595542306839586a7362443468724a714b3038636a372f4a5754697662307045333674543374664c6a755a387864726c6b61374266
64734a627a5654694c4c6c61394c78704f785761785130464735616663427678524143522b4e5231664765304665483568394336497a664a72777544
386373475262327165376e492f55524c4d6b3235727a4a617932466568394e516946706b74465946724659334d782b523970346335444b517442736d
48626f704f57364d315539586d49506a50767a6d39716d454a756139625857445339617470677038452f6f452f6e6e5a31596a7253577a4159475a6e
57706d7a36374d542b736b6c755465366d314d74632b6b4c7a6a596f5277392b73696c6e6a5971453067734641614d67714574507a5a49734b363751
366b445147524658356565494659466931614a484832353073774a6151656a6d4f597036552b4c78436f55534845506755466a627975696d32633361
557156374b7451526653504b473854623137756661734538335449554c4c42652f54632f64645a726c744a426d496c6d2f6257634c336b4a4f48476f
7972592b68625558364432304a70484f5767624c336a5550665a35732b73695961415934724958463252637454336e6744464e6e756d6b6e58545939
2b5747695361772f462f42694a6a635068683852656b6947796a7335342b366a3976583444386e6741626d567a30582b7270326f664151465a664771
57624e586d2b54576e356e6a4852456b4b766d6c462b4c554f657158715a306b65485252746570707165346f69466268517958646b393936566b746e
754c4e386a32304c496d6d4874694235706454666b45426b34426e385834474a75682f6b55466a446749725968756f3776584b573661615354412f47
4e3468722f534d3953463143416e7a447542704c336d61504c632f682b48756e444c756f6f5a527a6d426449714f674145305062656d4e4633666a38
706943676a7543504b72656533416a4d45634738364b4b44495471743531702b5544652f4861586e47623858574a5043636973435433575941627633
515a56573648586358474d714a774c466b553653786b504c467865364c3262714d42722b62724c506b446871303936632b78673632684a5559617966
6a776c727957766e2b4a48597a3759714e35344d7663456a6879576d51414c6f5a516262456b4a4a356c6a5043577a6e67503643455561356f757a30
4d6d58725251433344346f525a55385a79434a78514f69646f2f6e544a564e4c62674a736e58324e6273786b71474736416932747077463037477236
7833637a79684333396f687a4f7437686c50656e715767436c4337593662714f59586c335654504c6d314e357935662b4a6b747270535379467a6b65
334371497278452b5268366d6537794f6f3077354e4c6e58587133474166795a38316841475575484d4a395237565a7062343851352f6d56382b746c
66574262385868426a6673546f307a55424645354c77725469514c5365437672452b425978346c3568306e304950683173583946524e4f427533584b
76724e532f4c72444676474b6e4932474e6678486971326c4e7579353646764464646e6935716a2f6a47414e434348596b73524377484b63766f632b
4e35446562623446476f4d69715a3751724c6373495061742b47743276674f426f4f3678546269322b57426741413254722f50706d444d615964442f
67456b344e57462b61553373554d4b30356b6a596b665037534254436967446c70472f37436f784b2f752f49585458304e4a784a59552f6839466170
54484335776c4b536a442f665867516c6f66337450313547466e6b626238694d76537973447758706b314452315a48586535487473464d5855627145
686857615772745a4b702b53535a6c333431585437546b5770384966413968336e6f355572542f65446c6b766d38666a56304a37714c737839706c38
43716e4c314a624b306b5158783059644731576d5765496b3345397968456d74443856336d2b7369616755596a3459684c4a364969564c7a32447477
4c414e673657665a5a6b5653486d352f4a6b317558733766543049574e62497559634d5447564b4873667570473568574f78687a4b6e33617567642b
7765746b6d3873486b4250624f6e6b3968393765467654377465546b767158724f636b565a684d5034725a722b504e444f6a4e4a74496e4c36655563
46737557726833456e31374f693545584650694e584a4b666f41374c662f6c2f657634644c2b5a7131227d7d2c5b5b6e756c6c2c7b222f223a7b2262
79746573223a22623447426b717045584f6d6a6e513966414f4c48433634535155665543734177734b66314b562f635155753230377974336a646b68
523534502f6f76326c32414c722b726148396743466b624e44326d57736a6f724356626974584e4b423039744c394e6936764e4b35735a4331424873
715a5a4e5136416945387a7149447a38442b53353079797039386d756f584f4d66616248767a4934465437326667646d5033396b4662642b666f676e
424b532f4f446c48794a6358585343354345657241784f4455363655377452494745433653784234684b48385a48444542746f4e34497777484c5048
63446b5132354d7275734650685a4e41565976417a7433723361326e7a464868504854496b726e586562766f772b376d35415a6856646d346f6b227d
7d2c66616c73652c7b222f223a7b226279746573223a2237456d35656c5434626f684a7949373332344c7a4e656b46336852437255332b78344f6642
4a47793939776f736d4d687a6650544676684844326e556d483353493036507455452b496e422f514b636c4a633930566a6d72327253484471702f56
76756634557a7161614a6a4a6b4c495a384a45382b72366579536e485073356b634d5a542f5a724c426f484e6766634e65546d594870355558553476
6c6f69564343326e376542696d536334785869327a4d2b3379472b3668544a796b2b474c5331733449347a76435145713172476c425551475372556a
4166437630534136335a36474575714f3565564f6d43474345416e7278316a70596c545855642b776832324b655252305757686e33517246715a476e
426c5058674f4c6d6f547a3549736a4849564f7a59546f67494a4b524b703075456a303734515a477157416363355364687431616e655869756d4a67
4767552f5a4c617345716445633545502f4b626359673731564f447567393938612b6d546e445a77744f724752447a7663666a4e5376366474673931
73715842765a676c6d707765794e31433836706151393473784d446e63676867327575666a7950733667513047484f4c49506249393877714261346e
7374367266483538667a5276467654314b787344795571364357797366584437374c6a516671345142795357784b46582f384b6d634c61325a2f3574
3143456878544949497a73354e34305a49704a6375327045752f73584f534e302b514e634c62505759486c6c39794357644d72763074505875465676
52452b32445379444c7179544d3853693365673141342f5a646c54445335713943366d76584f5a32676d4c663532527a576275536e464b4573636b37
4d7a79485a6f335074546d693439375948656b5a755955374230437630696d65436a634c3653584b3153472f45596a6a6e4b71354c51664c5a72336c
7a426975306f643055483642494c50524d4e4f667555776f627147366644346478575a356f6330502b776e52364b524b30466e4672454b4a46763237
4e66766e576135515a36784c4d5578376d78326b686d4832755552594742592b686b79485377314d4557335a436531526b4165453957674639463745
496336703138697467754b324e794f637245344e47562f71366f30716875666661594d3872596235454372434d504a2b41717534664a52733551454f
5138704f427a4d7854526847384d3979432b7966734a747a754855493867744964612b62774d41722b3662374a61676b523232545a576d7838397452
61714735503250505269534c4130596e3374416e583032304136466370564f4a67514578567044434b436b566b6f306941227d7d5d2c5b6e756c6c2c
5b7b222f223a7b226279746573223a22356458495165787078327a753077447a2f51426d6f55382f4f305075306270674d6458457a4f6159456d4b64
69654a70715865362b797a5975547667374f4851746f4d4d76526636575a525572634a62452b38447351313543474836757176396c444e4442324a51
477039597a5961383067694b3050784675354e7834646837496638656651676674455957424c774a43447446536c685976544e6e436f6c304b517970
447a4b36487430643951487577423141686c456b59614332595433564d6b3653416a446c4472796f355030516536496657544438755a6b5242476c6d
65624154335a684b58614d37695a6d69726e42344c34616f4b6c6a6f70556c595a4d6b736644566f6362344943436936227d7d2c3631373830383838
34313539383437392c7b222f223a2262616679726b6d62776f356d3464647a72336c726b667636353532756a7a726c7a643770776266717370617a7a
36696e79677670656d6a366f75696c64376e7275773732743270783467626d3778706b7765726f71227d2c7b225361255a223a7b222f223a7b226279
746573223a224e4763683439347775537a337a554b4f723561414730456266574a6444784a6a4961524e706b7355675251433739474b684f344b5972
766a686e765536745431426b7a3248644e3031434d49636f4675412b5437474f4550676a4f4b496367616c42396e477a45734b744332596849575479
4275637843554d395851645245556b756d696977497443392b4f4a32585378574b334a785143582f55426b764f6e50673235344452785939436c6e49
794756752f51727479335642796c37306a762f3536646c7645567579415a67465254313857724e6f5773726a397264516e74316d50685a72672b6358
32532b5878454a70475471594e364d4879366547756c6e6a312b2b784f304e4b4739467638616a534e712f496544634e6c7067482f336c444544336a
464c6a684e7558385a717866393866447141594c5456434e4f4b693337474246786b5350496a452f474b7a696d4b33704c6c553734376f49784b6774
41384a4d3775556178623364445932556e6243576f514e77227d7d7d2c7b2255427166726c3841677168606025263f566c3f297e622352223a747275
652c227561223a2d353934333833353539383834323138317d2c7b225925e298ba5631725e31572b605341645b287624775727707759793f213f5477
243f78566c275759234a422e4f395c5c223a2239317242227d5d5d5d5d5d7d2c2243223a2d343235363037323936323336323633337d5d2c225c5c58
4f303f244a5f485c5c7652223a7b7d7d5d
```

#### String form

```json
[false,false,1.3193626134700585,{"=^l:g":[8502024808793311,{"/":"bafkreiezziwxicrwstaf6di2ovjge4y2z3mpi6pijpjels5ltwnehlcasi"},false],"S4L-z<?":{"/":"bafyreigcc5quchxaf3p2kw7ojjd7aw66lv6vlk6ulwfpylaguwma7d3j4q"},"STn {yt]YT'(~\\qB]:/&h":[{": u?u":{".5d\"":[[true,true,-1.1716052446343213,{"/":"bafy2bzaceadlvj5ulgwrwva272qwu7mb22mqc5gbv6ojmcpgjwwdkmcxnm72k"},4.504824930398761,null,{"/":{"bytes":"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"}},[[null,{"/":{"bytes":"b4GBkqpEXOmjnQ9fAOLHC64SQUfUCsAwsKf1KV/cQUu207yt3jdkhR54P/ov2l2ALr+raH9gCFkbND2mWsjorCVbitXNKB09tL9Ni6vNK5sZC1BHsqZZNQ6AiE8zqIDz8D+S50yyp98muoXOMfabHvzI4FT72fgdmP39kFbd+fognBKS/ODlHyJcXXSC5CEerAxODU66U7tRIGEC6SxB4hKH8ZHDEBtoN4IwwHLPHcDkQ25MrusFPhZNAVYvAzt3r3a2nzFHhPHTIkrnXebvow+7m5AZhVdm4ok"}},false,{"/":{"bytes":"7Em5elT4bohJyI7324LzNekF3hRCrU3+x4OfBJGy99wosmMhzfPTFvhHD2nUmH3SI06PtUE+InB/QKclJc90Vjmr2rSHDqp/Vvuf4UzqaaJjJkLIZ8JE8+r6eySnHPs5kcMZT/ZrLBoHNgfcNeTmYHp5UXU4vloiVCC2n7eBimSc4xXi2zM+3yG+6hTJyk+GLS1s4I4zvCQEq1rGlBUQGSrUjAfCv0SA63Z6GEuqO5eVOmCGCEAnrx1jpYlTXUd+wh22KeRR0WWhn3QrFqZGnBlPXgOLmoTz5IsjHIVOzYTogIJKRKp0uEj074QZGqWAcc5Sdht1aneXiumJgGgU/ZLasEqdEc5EP/KbcYg71VODug998a+mTnDZwtOrGRDzvcfjNSv6dtg91sqXBvZglmpweyN1C86paQ94sxMDncghg2uufjyPs6gQ0GHOLIPbI98wqBa4nst6rfH58fzRvFvT1KxsDyUq6CWysfXD77LjQfq4QBySWxKFX/8KmcLa2Z/5t1CEhxTIIIzs5N40ZIpJcu2pEu/sXOSN0+QNcLbPWYHll9yCWdMrv0tPXuFVvRE+2DSyDLqyTM8Si3eg1A4/ZdlTDS5q9C6mvXOZ2gmLf52RzWbuSnFKEsck7MzyHZo3PtTmi497YHekZuYU7B0Cv0imeCjcL6SXK1SG/EYjjnKq5LQfLZr3lzBiu0od0UH6BILPRMNOfuUwobqG6fD4dxWZ5oc0P+wnR6KRK0FnFrEKJFv27NfvnWa5QZ6xLMUx7mx2khmH2uURYGBY+hkyHSw1MEW3ZCe1RkAeE9WgF9F7EIc6p18itguK2NyOcrE4NGV/q6o0qhuffaYM8rYb5ECrCMPJ+Aqu4fJRs5QEOQ8pOBzMxTRhG8M9yC+yfsJtzuHUI8gtIda+bwMAr+6b7JagkR22TZWmx89tRaqG5P2PPRiSLA0Yn3tAnX020A6FcpVOJgQExVpDCKCkVko0iA"}}],[null,[{"/":{"bytes":"5dXIQexpx2zu0wDz/QBmoU8/O0Pu0bpgMdXEzOaYEmKdieJpqXe6+yzYuTvg7OHQtoMMvRf6WZRUrcJbE+8DsQ15CGH6uqv9lDNDB2JQGp9YzYa80giK0PxFu5Nx4dh7If8efQgftEYWBLwJCDtFSlhYvTNnCol0KQypDzK6Ht0d9QHuwB1AhlEkYaC2YT3VMk6SAjDlDryo5P0Qe6IfWTD8uZkRBGlmebAT3ZhKXaM7iZmirnB4L4aoKljopUlYZMksfDVocb4ICCi6"}},6178088841598479,{"/":"bafyrkmbwo5m4ddzr3lrkfv6552ujzrlzd7pwbfqspazz6inygvpemj6ouild7nruw72t2px4gbm7xpkweroq"},{"Sa%Z":{"/":{"bytes":"NGch494wuSz3zUKOr5aAG0EbfWJdDxJjIaRNpksUgRQC79GKhO4KYrvjhnvU6tT1Bkz2HdN01CMIcoFuA+T7GOEPgjOKIcgalB9nGzEsKtC2YhIWTyBucxCUM9XQdREUkumiiwItC9+OJ2XSxWK3JxQCX/UBkvOnPg254DRxY9ClnIyGVu/Qrty3VByl70jv/56dlvEVuyAZgFRT18WrNoWsrj9rdQnt1mPhZrg+cX2S+XxEJpGTqYN6MHy6eGulnj1++xO0NKG9Fv8ajSNq/IeDcNlpgH/3lDED3jFLjhNuX8Zqxf98fDqAYLTVCNOKi37GBFxkSPIjE/GKzimK3pLlU747oIxKgtA8JM7uUaxb3dDY2UnbCWoQNw"}}},{"UBqfrl8Agqh``%&?Vl?)~b#R":true,"ua":-5943835598842181},{"Y%☺V1r^1W+`SAd[(v$wW'pwYy?!?Tw$?xVl'WY#JB.O9\\":"91rB"}]]]]]},"C":-4256072962362633}],"\\XO0?$J_H\\vR":{}}]
```

#### dag-json CID

```shell
baguqeerajtfjtow4egqas4ip7qhtc7bg6dpxfadcj3airosfxo3qx2immtfa
```

#### dag-cbor CID

```shell
bafyreifklmnun4gpoen7qyzofv7fwwx5hb55lmrnzwg5mrofh63sllk74u
```

### garbage-04

#### Bytes

```shell
7b22367b475b546d59427a213d3d6f67545a3673413e234d2f347d6a23525c5c556a3c674b5d667d3c4c223a7b222f223a7b226279746573223a2267
374a3769734f716f533241474169323175596f477257766a56727a33756d6a3364367a463148576d7244554a4e6f7570362b6e4c756362303574396e
3249343672413942304f45654876574970547363544a4456615767786f632b7338674a7853712f667241653431524e4a6e73454663497a4b50723954
4979643361657368547654564c6c5964737155776d58364d646336555755496d323056377a3661354c6c6469385951454276712f5a4367744e763875
435467756630727a4f45455546473476646f4453514161593541365251595578663259586c62454c3967444e564147596968714b6a344b4f56344e55
4835516b7743326a6b737846613343465846746e617647443538453244624d5551614944496d456d50436645552b54727849784d46344565435a4831
46336d7955374b6f4f6731624c7361376d596759387176317a5949414878657a45427a4f6f59426f71546e613073574b48586c4f49637a6f4e707262
507a4c38357149424f31696e31634e644a63792b4656664a71787570662b3246614e67766850727a4d37453376363341364162323737565378755763
39676159354b534a4b4b41714d76484f304f427a574d33755448702b2b47724a3778642b535a7556414c364c64644951426c4c4c6b783132794b786a
686e766948355a6e4b754a68346a384e7267565153644642504657583573515a734438394b66714c756e6d326e6a6f2b5a684241367a426c495a3043
574361356c782f7264502f7073386e626d666f6279416d444941656c433575636b42544573324a67304375553757795273556d35582f4b52324c4f71
3137526e5647494f573953537433344838362b724776614c5847782b324f595670594f32653746786330303564617a712f716f5a6934794b4d647872
75525673574f6a33362f4f446d74725a69427648596c784b344a6f38713971507a4a70504966584578553537724e525a6f4f6d49542b773675384151
414a59494e645a5354373550546d4843515a317479437176765335324630704d47444f54614372506846705453614568544538715549477172734b4b
723238696937456e5450475a3137623951742b4f3454487169373835546f6558762b685a4d4a51473745514233734367396c4334704876612b727641
425043476134454c4c6a726e584b6f414554724f59575a3335584f786277773647546a6e3142766d583966735361434f536b35712b336f7077785650
6c34596f77795842626f4e64454258622f50627969426d322f795657587255654e446d764e2f5166357254694c48684c564e4455556a317a6a674474
5630374a57627865302b6f674c6d675a536c674871727339766a73693378444532616c393134396d5270544637643350507276444b6f667536572f74
4333796968564465714572317651586f6277444b53506638514936374e68624772703567595765617343304c6849533676444a6659324f4a64787453
70792b63435a6c4d7179645638642b6f6747414f786637344e794a6b4c32754557597952346e504b4258696e4770424e77365646544b6f75414c4b54
5061313367716c5a41717a4e346867444d54624c4b684b4e5a342f4363507132477669656c66424a6f772f554d5a576450372b333579704747303561
4a304155677a4443323349774b5143552b47377336365a372f34724f4f392b4f386f3146306745504f55322f685178454d685178504e537663456738
554b756d4f5470423747302b414958746d656f3978332b5268743764536965586d57546f73443631473133437433767456416f376163626a456a336f
45654171634e564d726377626a77436b76644a54723562517544745863774e427732305a386f626c3570546e326e6f554659466f76664e483964742f
364d494e7138396c4a37645043796e46776e4939367a326a4c666e7a6357485547766d494c774962715477736233762f492f5354343564305a666164
5375482f306536354a6c7672796b43532b77756747665a636835486f5534762f516d4c6a4365413475703656436a4f487257414c506d576676343869
38432f485072365035624b6c775862424e546a736f79433148652b496c37717157517130434c753438632f747041733532643177564e66744879314c
4c6d4d4e705972716673766b47344d762b2b42467232484c776a552b575138356a544e595a5a4857647778765277572b4c4c435364576d6f786d7179
4c5365306f70516f4e3676316c67344b754d49544d4344302f7065524e685a59334f5478384e6a68365a4e664e65534e303344374c6a30726f2f6e59
6d41313171312b632b6f6830433035467035674276696c7676317655496b456f444c5562316a4b444256445434673538635046634a306d437155784d
51435865793541757a3934312f394b44366b465834482f31457a7956634c4433473377686a31616348524f41766945484c6336354c77526f324e6271
704e7968314f68775a696b596e313559394848327633676c4253455235705547775965524a78417346485043472b59674a6d7a356348356470375a52
47764f53546e425853787571306f4d45546d447873384d33564c523979347a5a3758736b4e41387474396c334c36654c444e4d7a706e48683150582b
614f502b45344347634a75693333664d566d75454449644161666449613151616b46654b2f484a506a2b6f3439357254466936306a396b624a573467
726d594675537a4d6c534f334d6a774d413244694676353533626452744d5038385734306a6256386f5a49387251376f61684f6243484271356c5956
5164336f4a5563733533716963503850745576646d475157502b347a526e3867615167503979367a77584f4e514f6a6b68414956393670464f416661
547a76784d4c7a584e687856672b665933706c4c58385464316e43726477724668327564784a62373973737154785968797a53646743585937506156
72324e61794a706b674f6c4b32386635374844562f5649454e7743735858314e48576643736474714c44705436322f63564b77386761615957396c66
4b4232374975304d496a68696f4666457a71564a75485455624a74614c7a7361646e79764d5a72614b55684237586a7671764b377277592b59487238
583036655651742f5a50346c4f78786a4a37504565527a7652463334784b35555547654a30544c6d667939456c307a3057764635665551686377447a
33626f684a6334536c375055464e5268566c62666d7446765535344267433771327472704661376b2f5467482f69394439366e72682f6d4c6976314c
6874464c506945702f4f366b774a78673441486b3568584f643336354958794739687871396e74696b684637484e3554356c75704d37317262697667
7149416c566277385155324253586f357a784459366a333577354161644b467834704f7179775a6d637071555630705351416e38387970634b46322f
6e7730544b75497375535643334c46386d6d6d4e393856384a566d6b62585545542b3572417a64555a42702f784f59744f4c55646f4e31356e756d42
303063762f57622f3468483552554874776c57454f3648534e76776342546466544d785950505434534f39466672763854554c597833774f41724150
764c36427a633079394f573657765676566447375134593873516b4446582f59572b627a415265596e70714a3843624f4e34584b6165355862555a44
6b3136683079785555304531507a33704c426e624c70564261697364334b4968434b777a4d62573076723463375435774b612f71376435794261366f
346e664b6a745a5337445548723777574b502f336d78784632545a315a6f723045336d4b792b657843795842437859446d6439317533463539537939
35726866552b514b74314e54546773456c66564b6b713871353735392b30394a4857336f56597141736164617770324c356439374c656d6f35496c46
6c4d754e6150582f456f37437774656f62362f5a366b70597349714e494d66705943565169477a45306238734d674e764137625855354b477a374259
4b5a3371616c384734546a4763794e2b766d494a684469366e487a5843587a64424b45736f38694d506d66572b4549687a55746a46446a4f74436575
48665478745867526c4c344d457a36514f6544334b68714950656e3271506b68685a636a62564d414971316d4c7468726e413648384870767a564e7a
39634b6678574c784d72676d307661316a6d3268444e70542f78747459494e2b50794d702f61786a473263785556724a2b6a625a734573594f543573
6d366555497a6567354a654f3662366d36783931587a45652f78654e49385a324b776e69453359424e503347416a50414648746b734f6c6839755436
5543596534796a53397a784b6f5765447474474a6a482f6c327a6d7a35386d4348526c31466c4c79696c6a6d316e664c6d6c3349645a576a45336c6e
386d726557636a5476396f41747a575066644830716f5a757233624e57685762445a686763597a7a354f54477155416976695a517645467746734851
795879326a3271756a7a337857452f4c33454145572f426d5666774e2f4a71344c3766744148415a39556475364e5535323259427334652f4767776b
456c4b51656c757942465a71623343796c4569756c7a2f3969714f582b42492f377957554e38384568426f636a474b345477487857796c522b576777
6c454f5747622b2f52732f4e635a6d6e68557166527a524e74574e616b66574f74773671457a794834456d47675144374e4931696d2f754430435371
6647494365337439586a334e6f454a55787478316d6178454d757a6964374475614d4476774f434f61536e693049444279684664746d677970476745
72784b502b6642752b4959564c68575969343044316373627165583553465a514f77455a6469423868794f74667858492f464956396145707268546e
384956357450344564324b4e465668676b376b556a5679615976345235626147396461434159442b492b6f4163332f5169546b4153534b5248592b38
6b435a3063677069706f304d746161364b654e2f3070705156393031514c6a2b484e4747627a346b4b5337526543324e6776344d6e68627761722f55
7375685a6b716f38595a652b2b4f52446e344d4b734f3168574e684b4947304d525352725376656730414c5958347838654341574d76646e61342b68
41795859797a46386e51666e2b61696579446a6f764c2f71357935577543334476727a39786f594578775a3773527a52744170573344314f71753645
746974794a47696d36654b6e2f5230622f37597062554f6f53364a6b30364f58687463697948646a354e4e52525a6d6e4d57644e7836796f546e6236
445559356c4b4a4648517466324b434e68366f4e45656669615841584a63314a737472714b34657771684a6c6d3864504f58764b66464273746c6f54
65574b37507a61434a4c6151734e59375377474379444457384f5141316e514d5661376733465162517445425446736f6957597042476f6b76425766
564d5057363577616661697256666d596f37494e6a5a503153766266745944336c684e394f66766372456d6a5958355476427a634b6550432b55764a
4a67555568364c714f4b494a4d44676a344241464e3132476831375247594772644975727545696b686171534f686f5474366433756a624839637867
732f695942684f7354476252384f61504c636635577165545032546d73434a512b5246584d4d657a5946557454656963347351373632443375434c68
75534e3072327057593134317433334c314b666a44306d464d6a72332f6e476f306f6d796d727862384e364938314c666e513355706f677375496c37
474657786c696271627766474561336c355741544969416f57585a76496e4e545a51526f454b2f5879354e37766869784746676c452f4c7648596870
513439697a3458354d6538396f6f797463444b3850642b767348476b787271387651764f6a676d376b5757675530642b3857785135366c5965697952
5843477a524c736e3158574769427771512f665a514234366f44762b6f56704469715839614447386a49774838754c4850684665436b4a504f65577a
76504a45486f555a703739696570333579485a7035634a333448372f56467578304937767664453931747778617a4c6d4f756e6778354a6e7237372b
4269427375326c2b704b4f6d504b4a382b42316f4e2b4c3267682f6b696856426e6a587466342f567539626837515053314a424435343130484f6a6d
325867536c5966502b79373937634a6b4d2f62524370394a683961507339436b673436385567624d4830412b49644d354830636171532f4a69365843
416f4e6c7138754d6a69516b45736c2f67374d712b2f765448554a6b794f462b70476c536631616b6c5530636b6c6172483877365246646251437542
733561566d67464a52634b636b6d6a64554971323579546a485877726e505a4c514f435a4d57794b522b4355524d46323162493250554f62552f5562
6f3331723449636c7859612b4b54696f524459393053706b36682b6e36776d775a31555a4e544c6d56644e302f4337436c387a4a54666e414c73492f
7966494c484c3146634459527a467a57536f6c33374250554454567851467673767356555053507767774b6963435963465457794d64346d79526561
6f66733278326868762b576772684f356a6a594767464e7133783269576f70534f44614746585138696a474646536a507a6371352f7a65326c304771
62787a6a79306a556953735a2f356e2f654239676e4a384438394d5377732f59656b733979574275427869326a537a6145324a6f7357655a4172462f
4355552b30365a5a4a646e4d6637564a38476f336c685a48527754616d72666e53493061545a724f637a386a354568527242736c6e495342506e5355
39635561796873614470623339457568336767323479353459396a6a704d6b31525a4f3142364638757a64636c415572505755334f494b64536b4755
4a466d4164684b514254395146544d6c6e4955345a5848753849784a36564d4b4e4b46597a3535465874456d4e315034545332644557353044647635
7838793736454b684943796e74557a335a7571722f4776436a3868356a7670695145696b7a59493837514d58586d4a64497933316e43632b4c56586d
4f414e486f6156775543773536414374586f52664b426f6e6c72736d6f36736f6d4a59376e6753646a49517966704a764d50456f6d5673742b4d3379
4776467476426a616e507551542f5255375947576e57754a717854716951706368497779494a68584155302b676270704c4b5a725977754158545830
4678636a78466a41516f7950636e455a486d6177594239416b3377347a5339696c46774d466b506f73304b646d664c7131503768765236444b675079
6876515078714254622b34413979774953485350715654364575427a4d466c6f39616e6c7a4b4e684b45685a586f693247334d786a6265574c645962
336b6337736b752b4259774477486e4d6948704d312f423553366e69344a3470303955752f2b2f5041716c5355616b4c37576f6459727a747353684d
795638427830652b5469364139636e3964786b71634c496b79634b59764b4977725645785a42426f4756454b557176584c325234557363554c4a5070
32735544616968467a57626e6d70386c7348776f484a436b3832704a44784a3171624f7239487566346a53637552685967556655797667764d68504b
2b6f4e39524e44596b7678636f5870397979754d61426b4931746956794d695639544d4d2f384149346338313937302f75397931784176474a355448
426a682b4a7042776f574a555256316a574b686f63674b782b417275527a6f706d353242794b6d6d2b3746572f7a62334c362f5a2f6d796242563972
386e6d68304c5047626a2b6c49667737517a5850362f3033676a5a3450774679396c7461475461625351454a614269475649727658544f7a374e352f
69552b314e4145552b61517353376c395a48746e714a4b4a5a326c71754270337656394a4a56334f42442f336a4b2f57644d736f6f5738734c4b3472
694b554656735232654a6738684979527a4d384657706c624a6e5635352f3754382b49444f6f55353642766933645662596e556e51304c6b65665146
4c71714d527272414e545657792f363662353278355a4a4462314438794a6861322f685632495879467245726c6465554c4731555079424a4961482b
4a3678776e674e6d557873776554794c794f54396e57783841694b387272446d6b55622f6d36595743484a6b35315359505379612f6e736548466d49
734c6667624d6334644157662b304b4a6e386c6e452b6a364f646f47705a7768524a696f334751716d597a576a764e4a696f656933634368756e6942
5363796c6438334a3851693951336145666169796574444c6b416f66647235703665774a3876516770762f37672b506f3647624e574d716d36544454
566b492b6b32556b636b4236436c4177415132534b334856426f62592f30767943636f3739496f5272514a71444379316e2b6a316a37794673395964
79785a4d33797071387038507832394157556c3337784a71517a392b593231774270743458642f653862676f5676736e30485466322f6c4235643843
4a7a6a774e6a6171385058792b556e72694f433031664562666d7471755764522b4948756b793931654b5432427838736c6531732b53454963584c67
6973355546735247676c48505a762b53347477615758384a6631686b48787a4776416b6431526c3866625a424d774a42574259783077356676726468
6d4b6d36754f413453627658767030745753423879537944535a6e70737934744f5646384e4c76557556365467556763556e6e4d4a39377a64463831
6b73434c6352417a74786332686a493269797364752b646d4b76584a2f305630705375516f37495357687651713862694d6a695852724c7453544132
6f4e33396559516f67227d7d2c2239753c795c5c223a66616c73652c224d7e317b61302064223a7b223f3b2a482863223a7b22767c5c6e356240223a
5b2220392443775e225d7d2c225b48223a7b222f223a7b226279746573223a22446255456358412b535072644c5a49476b7a61315a79544e5a6f6530
43753051443533526770716a452b2f386f7977227d7d2c225fe298ba5b56223a6e756c6c7d7d
```

#### String form

```json
{"6{G[TmYBz!==ogTZ6sA>#M/4}j#R\\Uj<gK]f}<L":{"/":{"bytes":"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"}},"9u<y\\":false,"M~1{a0 d":{"?;*H(c":{"v|\n5b@":[" 9$Cw^"]},"[H":{"/":{"bytes":"DbUEcXA+SPrdLZIGkza1ZyTNZoe0Cu0QD53RgpqjE+/8oyw"}},"_☺[V":null}}
```

#### dag-json CID

```shell
baguqeerayyrcgnnmrao6sqolv3whdhywyukct4lxn64p6lzdijrxkkl44yta
```

#### dag-cbor CID

```shell
bafyreiahi3k3wxsujcee3zlwwltjussu7gkqpm6iqevie2nciqsbr4etmy
```

### garbage-05

#### Bytes

```shell
5b7b2223297875465277452356786a2e56526e36256a2e6b6b5c745b6521302c6a7d407d52246740396d3a325b2959753d634f70223a7b222f223a22
626166796b627a61636563736f6a657a6962746375736d366535766968743776346b33636170326469626f6c6e78367776656d6271353478716a6461
7863227d2c2223455c225b602c223a7b22454e7b7b223a7b22203338704e69362e54452d396057735a3c4e276c3b687b5c5c4d61285c742438673c53
695c7468755a6079262a53604a7d72262555223a5b7b222f223a2262616775716565326134686769357834363433716e7162697a767861787679716b
65653269727832616b706365666a773372723762663262716e7a746e6d62336635756463626a77727279776d6a6c3368786b34736d34727266786b71
656162793762777637667932366d346a703279227d2c2d372e3031343830363434343736333634362c312e323737333934303333343032353730342c
5b6e756c6c5d5d2c222d4a73223a5b5d2c224066777548613e263f50325b28625d3c4255355c742c465354542d786c2e6f29662c7958592c474d324d
5c745637763158716751237e396c7d4e4c223a6e756c6c2c225542223a7b22e298ba543b376e4832236c51255949307767297934326a2c6052425149
3929682d223a2d373231393932393638363533363237357d2c22607d20223a22445f495d31657c2f455652665273535a68247673274d26396d2e705a
534f5468247e244b466e26435a7e41786a4a5b3a3f314a68365c225c5c205c6e6e487a47505b5e4f28736c755875536f3f527a503b412b422d765836
5f7479445c6e4b75655a6a2c7721345c6e63754a44213e374a2d5b2927752045702d445b562f543a2d6663232a60234d636128555570676a48273d30
7266703f3e3549702f533a5d30287925362e403ae298ba32523d79585954634e477a532150765971736e5c6e38664e335a5c5c63485e41233a6e4f6a
363c3d486f62525c6e7e76323e37782457652d3962313a466a272028513f4e345e51642f2e5a5c74242c2f6b5c747a745c5c204762345c2253216b63
30713038416d652130474f3c4c4c483e2072603d3d3c48335965715c7479537663315a606228602f47586331283c7d5c224b5c7439784f645a41276e
3f3e7a72443f5d5230722e7b5c743c2b73256c4a23295e387d2b2954406569656d39735c223c2d7c2149384c3437e298ba5f52782d312d497e58484c
63e298ba776f56275c747e5b387e3674505f4a305c6e337a243b4f234d313f246f2e4771745a5f4b5e2e527e345963443e2f6d7945795e7c275b7325
5a79715b34326d67355c74263e2061676f6e393364473f3458243e7537e298ba655c22634f686c5c6e785f75254a783b406f49532d235c5c3e434928
73442e63222c22707941697335223a7b222f223a7b226279746573223a22376b66536c30635164494d5042387464766644494e2b517a5752356d5544
71396f3964526e6765722f344f7730436232554c5674425368584a38703164726a31317457496472746e466971634b72473070626e6a4b43786f4a4c
7143643677446266725443343178535a766b73784462456f424a6e774c6c5a4e4b55476e624145644d324a776e4d586a69356a7a4348323365736e51
78424a6d342b354449636f30694e4d707646715a77615359424b66774d43653034556d42503750474167687278732f66344e414352415477227d7d7d
2c224d49223a222b6a71387767494b612c216c3d2c2935586154293f44282f5c74435c6e475c6e6a372c78253e4839464b456577603478582871415c
74577d66743443612c713c3b323d763b654c32427d5c5c49e298ba5853287c28376b50765c7475313e777b585e61505371334159306d712e6a536228
386854646f5b2d775f7736e298ba5534e298bae298ba59595b65795e40587b2b2145516c763973685b53205b313627277970435d216375605a5a7672
2e7a725427275d234e765c7450775f4a5f236f3e4d4e31406d7823277950422a516f5e2a7c2e6c31684a6e2e30203b397b7a3d295d626c3a6f456c32
7d476f276b243f332f2357345e2f423b3a655c5c3c2738724d7d463178765432275a4a5421735271e298ba52713a7b6265686a4b43696b3f4850357b
734144765c6e3d5176532d56752d5858286b7c444c2e7b4a6f5a3b2433317e2f7258644d395c5c207950492e5c744f3e5e4b64746c275c227e605457
5d3f337a427b4d327d3d252a295d304c44655f38556129653b3f6734253b3a6953315c6ee298ba585c6e4f6f592d6a5029415c743e63553f4b2f3d5a
494b73496d2167745c223c462360326736416b5056383e2068202b5d7c345f4266227d2c224e3a4b45223a747275652c225135223a7b222f223a7b22
6279746573223a22656245524d496a3169707046763654544e6148695577386b327a3443705147366b356d5662316f51643344335833766a44426b2b
524d6f7532336d5731756b79516271776e6d4c455961786157666c5830564f6966466e6b6377592f4843686764526a6933644d414e6d746435497271
4d42306d526f733954473036396b635043477a6450434441736c392f5973596e7333686b4c646853534d4639364265586e7238373033307679716954
4a73452f4241434a4e59583367356d6667494c61507852417448754a6c6b5233635a31692b57534a7a746b4a4f4a5a74382f4a325a44737439316d4d
474a6a372b4e335a6d2f4f74747857426e69625753564a5a753132744c734967354c7036506c7a696d7171526d735679417876674d37455a31544362
654f346a4158374f52556437306979545150446576745a2f7876376a5132352f76426465614a4c69557a594a42593948744e386961772f5058546546
734132696c2f6d654c4179315964495a573034304e6d7253666873304a657971456f68453675796c643673686c364251666e517039335a5256507547
5536325041486d61392f644d474b6a4d363650485077634836514b74706835436159522f4677664b7a3170436b6e706b376345654c774b63796c7a38
6c32636f7271515458766468644f7a45726461733034375135457a4335364b473648484b54494b4e305730742b542f6d6f78456c6953416d39795434
2f386b4a7a636f34527a4f5a664e4f61715359724979314a395a6e704c33554f344149582f7a6345637631667a6b6f3859586f4a2b514e5a56583845
396d644d572f42666e32346164704763705866415369445775484e63464234395233542f594c7a62684e3666516f63612f6c637542577059366d7071
3636396a4f39344e7242766d2f67315044346d47494244413631486c786c77744343565131666a6856694f584a354e2b7a4175766d4432503374774f
4b2b776d56754b326451566a78686f4372514a723269725762762f51686e53482f68527851386d71456f447571592b565443565962744d42374c5248
545535682f75705441625944314a4a635930547164536b714e62626d666f6f654d5931517764762b7445636447322b537843526c3142487355715166
6c6454333161645737566d6647636b4d4f617572366f7242426e6336576e387a73354b5441485442744675646f30476e2b4f74375737346b33346855
544169717141674431317a4f754b6c7270304d36535532665058707876326d6f49534154584d672f732f506b54314f4e792b3648682b684c514a3475
56417a2f5662796d6d3978434435356a484c5452546e64796c6d396b4a4c786a46492b644c3336556d454e377a466557617670364944586f59656473
32624b476d4a596c65614f4858666b68667876514563674a514d49455878397a4a3842684a727274764334737547766b316a6e6b4b6e454138443561
4a664b72374930543368326f4d43335341386e4e2b56475473706942427a6e715a654f722f506b6e7a46756354503635476b3534736b322f4f764774
7148645a47705a6863574a7749714f46437467376d444f53397648414c6a7652667130774c3874525a70394f7363304838356f74655a456f2b32544d
67544a735744446445774c6c4d6a4a4f38515258316f676f426957663935544e5137394b7a2b324b6c68576463503031483273417a78335a4d366477
312f494569344c426b4d48594545336a4f6e56776354446c6c3032547148332f707943484c383535784c73357161384544704d4f546d374850416d35
3543317a59784d52464a4b66356e65464e662f72466b4f356534543761335a783951625a4565576d445a644d42722b4b6f30637a30366f3975714658
314b55304f3744734b7854504a48736979306143616951763450793139623349637963625339436f68396748395343322b445956695536454a572f43
62526450686959772b4c697545307a6178354931584e304b46346858544d342b386f396b65456b474b414374766d37565637315a5030643738554e51
5441472b76714832615269495a7931706f2b7063523839442b47363873676e6f6c6249774b58643759394a48343941546c36705637786b6144694331
734d61696469437238644d48453272346634476171473835457363644e48447246462f7747514863543043797952386d78554f6b70486352394e6c52
57796f393669347a2f3756794c50384463546e547056674648417955364f557931325732566652792b2b384867356530426d69316947776161303061
696279496d6655694d6879544c39777a4862653048387833746d47494d384c616964507a4945414f356a51556b6953475864484f7a4f6a6d4f617043
366e7165675344762b5041596338686965456c4834707978306e4566462b4b794d7874535777754b354e686a454f486f7941426464394f577034586d
425a45755577714e706370424f66536b665164324e3158313462396b75776d31306a7a4d564842364b53446f484346444133566d4e7872377173544a
682b395432484a776f717a45444158634572374350614767796157577a73426b7944316a6f6477646467316159336842675044354f6a766335492f62
6977726d7857456f7458592b43375a45475045494d4f564e706563567556555269393855567a46545a316b794d4975335149676f5847337574675177
2f505249773145717142745543457657356267394b55465857456e514849547547625a767a56714b2b482f364d31657748555679545a416d6441496c
4e6c7149632b4f6542344b645873454674764a312b4675503538464a7153784137724c7856714b432b785335742f506135644b7255664d427874347a
3742546a624d70666539766b34377a34457446343755343750444a32575573734c546f4639546f5a2f484c386c6e637353416e666d6d317357556f2b
6e4354567961592b41494b576467627234786c712f3333444e745266596d68306b48394a774d76704667756175356c5443493849614e56386e707545
6c434f5a64366a464e544d486b624947366f333869506335654d385a7970746f69626855393135694d6e325a57624e31664d675a6557696c54565570
466b6142734f444f4d75776b6c6a5356424c33514762696947366b4e7633316461387a36554e57314e34616d37384c6d543550703569736137487677
6775344c71554c41576f6b744f5161785074744f526b352b5176656a46564f507833416a41747576304c7873516256397175324f56594b383734494e
6d5263374b7150397437414b4f497447677939534e4543377631327250727a5656417758662f693345387553484866334c6645494b6d517551457a41
63414a62722b79526b31314f62386279572b71394b446b4d337936676f31656b49417576377543686a4145676c6a747665335761325a4c642f4c6f63
486c616a6c776537376247756f364b5a345572334a712b667035456a586a7744355252325a78586a31766d542b493132587779626d386636484d7639
706948766a6b63766f36763455776148744a6b33366b53547867506258485342345657715235584d62443969777754324833473769792b5043524b70
37543672706d4b6e306a303149524e6b5162716156394a4d694c326b3372567a357247647679656e3151347146702b544e3072527851723774333673
4577532b7055696666704f43756e305675726472366f6a4c316d426e716c33507a5647666e717571394e3267684831776b734c3358644f6f67666549
5162635934363932587a553454453732614b5334424d4d5957696f47516e48432f686e6945502b2f5946587856473948504161564158623037542b72
6d304a615a6769657a2b6a314e4d48715177757a55724d7277444d57632b516f696b67356b3437547251462f4b49706b48554434776a38616f364b4b
794d527254625a2b6945556d5a464334564f4b4e4e575350582f5537626d59584553484767332f437437756634666f336a522b2b35785257434d774a
794e666b765473625135554d2f61742f514f35476443583948732b493634364b706c6f7a456459572b696e3436652b39432b72733833644339412b59
4157636533757853744571475234596d61306149694570574e7a53666e627a6e385943575446675944356a6d4e685a496268775855776d6c7044414f
656e6b4c6742734b3977754832634d724f417271325152754c355374763678587143314139736e573071544a78686676774f59595a35387345487635
7a41417a79774464733752394b76766c49305144577a32574943436d39794c4b68742f393244437a705264746e77416f67536e4d36686d7845377462
7050522b5165504737446d38617a4141524d67434a4f4b68326a2f434952357633776352744d79635a48643275334a3046625249732f433672346134
523672433979622f457867533232574d5861576e7657302f6e693265492b74424e725977522b6f374731494a2f72482f4463615532786f7a4c736e51
6f716752324c64594a6a323054526446447663716464386673412b39382f42557833754a454451784836634d6b4c386936303467356457776b45434a
7878685a685654414d523247744e6277366849756b6f467a4577564777615970536a56725731724e574866484f347554474659304c7a4f49332f616c
612b79306d6c387837786d512b5862563379344c383837495472676669435943564d724269712b686b3235552f6f736f4e5a7650614d7a4853613731
38323165356f736a624854326a4e783872306f4e374c4c4554774f766175457253496e46652f38384e5a79496751457055784836794575443571664a
7a5650336f514a6b324779786d5a52724b724e44323175667633563841574a5354544e4b4f77424646446632574b5273736570736b634f6465322f4b
446c6978316b5965676b3131752f75534e4a5878396e6e614b5335672f764864476137683931524f5638794e6f6e6166534b456b6a65376e452f5461
4c426f666e4278344c554257334d355270687657547948494f716f386673555165684450422b756948362f526871757638644b676871756a31754577
2b47544772622f2b7243396c436138676c7135565a6149595761652f37474c7850795338313035324a53617952325a574a43484c3675532b4b364459
6d646462557754724a7a53725535694357504d722f746159712f5361705a7a512f2f56506445495844755465523331624d2f6c5842437832502b326e
38774a316476474332503851437a6951336e5a65484455304232766b636f6b746e4d64775457645a687434432f703874575237564a7333476a693757
73466b57694f71784d726d6d67743879523668414d69536c6a2f69374f4d503343553268634133534e46783342416e7633525942596c4365455a5478
7961624f4932507250373461394c4e70314b4b366c634445744d416a64305479713170614752484d6a484e7050532b55685238634b64734e38395932
76694c7232667359464768343162466e4f645930356b364d797971302b4a726e724c4d6f5963784437654164354a4e6963592f34396a4f312b77434c
5634367a56766552357977734649545569424d4565486e44454669555961624965377771524951733844626e472f37657a30653648516335564a4252
53717939445654436751617559396c51366c6870387971692f38395251786757796431462b48716c712f492b4b614b73702b756c414d4e554d344e47
59584349564b706d46716b5a6a5030562f596343626a5772535458707971554b397344427257574d4b2f723751786d55743047394c70333971706e51
416d31656b694655534e3972645846384a78395278627a4e663370334b452f7144324d6b4b2f44546f734939337766445959306a563073334c72447a
50367250684173797542416c5a4e51706439593065414459484b5075787a4a3273666b78303242442f65484a547a617247482b6b7463305950546a32
7851384b7a5563432f4a782f3061715645775473354e6f7a2f687961674a2f46495549416738583067325a67654d5574614c6b326477506e5a306965
3441764142737165643154796c4d46636b6277632b656f3163757a4e62754a3572636577617977335959456a69346b324b64556c594a4e2f416e3870
524b41426a336a515056764b355377387842416f2b726f665a78546f4377695a32544b4b455175654557472b6d536a736d337469657a726d31766d6e
4d78476d693767753248346b2b4f5970414277384777326e497555356b394a597a536c4e7837643967363267364a386c5738594f5464342f506a3247
6632432b5a4e5157376d336774652f57424642466b7a6c44646865745332507a717a665647685855312b3742724a4764454f34577159425665543358
544561476843494146516a3648453969314d454976544c6e7067652b72424e3443474d734b39693568452b7832666d6f755061486d486f396b555658
6864346d4732676571614b4b79373079457244357667656562735459616545646c50565551345145496d4867354d474547705768426f41796d6c354c
597255535a35517630392f78676455696a796b4d6d39473831383865353879723439716c3631796a524c4a7a4c396759494f593130494f4d227d7d2c
225d5d4334223a37373939303230323539393233372c22675b4b58223a2d333737383236353331313533303832337d5d
```

#### String form

```json
[{"#)xuFRwE#Vxj.VRn6%j.kk\t[e!0,j}@}R$g@9m:2[)Yu=cOp":{"/":"bafykbzacecsojezibtcusm6e5viht7v4k3cap2dibolnx6wvembq54xqjdaxc"},"#E\"[`,":{"EN{{":{" 38pNi6.TE-9`WsZ<N'l;h{\\Ma(\t$8g<Si\thuZ`y&*S`J}r&%U":[{"/":"baguqee2a4hgi5x4643qnqbizvxaxvyqkee2irx2akpcefjw3rr7bf2bqnztnmb3f5udcbjwrrywmjl3hxk4sm4rrfxkqeaby7bwv7fy26m4jp2y"},-7.014806444763646,1.2773940334025704,[null]],"-Js":[],"@fwuHa>&?P2[(b]<BU5\t,FSTT-xl.o)f,yXY,GM2M\tV7v1XqgQ#~9l}NL":null,"UB":{"☺T;7nH2#lQ%YI0wg)y42j,`RBQI9)h-":-7219929686536275},"`} ":"D_I]1e|/EVRfRsSZh$vs'M&9m.pZSOTh$~$KFn&CZ~AxjJ[:?1Jh6\"\\ \nnHzGP[^O(sluXuSo?RzP;A+B-vX6_tyD\nKueZj,w!4\ncuJD!>7J-[)'u Ep-D[V/T:-fc#*`#Mca(UUpgjH'=0rfp?>5Ip/S:]0(y%6.@:☺2R=yXYTcNGzS!PvYqsn\n8fN3Z\\cH^A#:nOj6<=HobR\n~v2>7x$We-9b1:Fj' (Q?N4^Qd/.Z\t$,/k\tzt\\ Gb4\"S!kc0q08Ame!0GO<LLH> r`==<H3Yeq\tySvc1Z`b(`/GXc1(<}\"K\t9xOdZA'n?>zrD?]R0r.{\t<+s%lJ#)^8}+)T@eiem9s\"<-|!I8L47☺_Rx-1-I~XHLc☺woV'\t~[8~6tP_J0\n3z$;O#M1?$o.GqtZ_K^.R~4YcD>/myEy^|'[s%Zyq[42mg5\t&> agon93dG?4X$>u7☺e\"cOhl\nx_u%Jx;@oIS-#\\>CI(sD.c","pyAis5":{"/":{"bytes":"7kfSl0cQdIMPB8tdvfDIN+QzWR5mUDq9o9dRnger/4Ow0Cb2ULVtBShXJ8p1drj11tWIdrtnFiqcKrG0pbnjKCxoJLqCd6wDbfrTC41xSZvksxDbEoBJnwLlZNKUGnbAEdM2JwnMXji5jzCH23esnQxBJm4+5DIco0iNMpvFqZwaSYBKfwMCe04UmBP7PGAghrxs/f4NACRATw"}}},"MI":"+jq8wgIKa,!l=,)5XaT)?D(/\tC\nG\nj7,x%>H9FKEew`4xX(qA\tW}ft4Ca,q<;2=v;eL2B}\\I☺XS(|(7kPv\tu1>w{X^aPSq3AY0mq.jSb(8hTdo[-w_w6☺U4☺☺YY[ey^@X{+!EQlv9sh[S [16''ypC]!cu`ZZvr.zrT'']#Nv\tPw_J_#o>MN1@mx#'yPB*Qo^*|.l1hJn.0 ;9{z=)]bl:oEl2}Go'k$?3/#W4^/B;:e\\<'8rM}F1xvT2'ZJT!sRq☺Rq:{behjKCik?HP5{sADv\n=QvS-Vu-XX(k|DL.{JoZ;$31~/rXdM9\\ yPI.\tO>^Kdtl'\"~`TW]?3zB{M2}=%*)]0LDe_8Ua)e;?g4%;:iS1\n☺X\nOoY-jP)A\t>cU?K/=ZIKsIm!gt\"<F#`2g6AkPV8> h +]|4_Bf"},"N:KE":true,"Q5":{"/":{"bytes":"ebERMIj1ippFv6TTNaHiUw8k2z4CpQG6k5mVb1oQd3D3X3vjDBk+RMou23mW1ukyQbqwnmLEYaxaWflX0VOifFnkcwY/HChgdRji3dMANmtd5IrqMB0mRos9TG069kcPCGzdPCDAsl9/YsYns3hkLdhSSMF96BeXnr87030vyqiTJsE/BACJNYX3g5mfgILaPxRAtHuJlkR3cZ1i+WSJztkJOJZt8/J2ZDst91mMGJj7+N3Zm/OttxWBnibWSVJZu12tLsIg5Lp6PlzimqqRmsVyAxvgM7EZ1TCbeO4jAX7ORUd70iyTQPDevtZ/xv7jQ25/vBdeaJLiUzYJBY9HtN8iaw/PXTeFsA2il/meLAy1YdIZW040NmrSfhs0JeyqEohE6uyld6shl6BQfnQp93ZRVPuGU62PAHma9/dMGKjM66PHPwcH6QKtph5CaYR/FwfKz1pCknpk7cEeLwKcylz8l2corqQTXvdhdOzErdas047Q5EzC56KG6HHKTIKN0W0t+T/moxEliSAm9yT4/8kJzco4RzOZfNOaqSYrIy1J9ZnpL3UO4AIX/zcEcv1fzko8YXoJ+QNZVX8E9mdMW/Bfn24adpGcpXfASiDWuHNcFB49R3T/YLzbhN6fQoca/lcuBWpY6mpq669jO94NrBvm/g1PD4mGIBDA61HlxlwtCCVQ1fjhViOXJ5N+zAuvmD2P3twOK+wmVuK2dQVjxhoCrQJr2irWbv/QhnSH/hRxQ8mqEoDuqY+VTCVYbtMB7LRHTU5h/upTAbYD1JJcY0TqdSkqNbbmfooeMY1Qwdv+tEcdG2+SxCRl1BHsUqQfldT31adW7VmfGckMOaur6orBBnc6Wn8zs5KTAHTBtFudo0Gn+Ot7W74k34hUTAiqqAgD11zOuKlrp0M6SU2fPXpxv2moISATXMg/s/PkT1ONy+6Hh+hLQJ4uVAz/Vbymm9xCD55jHLTRTndylm9kJLxjFI+dL36UmEN7zFeWavp6IDXoYeds2bKGmJYleaOHXfkhfxvQEcgJQMIEXx9zJ8BhJrrtvC4suGvk1jnkKnEA8D5aJfKr7I0T3h2oMC3SA8nN+VGTspiBBznqZeOr/PknzFucTP65Gk54sk2/OvGtqHdZGpZhcWJwIqOFCtg7mDOS9vHALjvRfq0wL8tRZp9Osc0H85oteZEo+2TMgTJsWDDdEwLlMjJO8QRX1ogoBiWf95TNQ79Kz+2KlhWdcP01H2sAzx3ZM6dw1/IEi4LBkMHYEE3jOnVwcTDll02TqH3/pyCHL855xLs5qa8EDpMOTm7HPAm55C1zYxMRFJKf5neFNf/rFkO5e4T7a3Zx9QbZEeWmDZdMBr+Ko0cz06o9uqFX1KU0O7DsKxTPJHsiy0aCaiQv4Py19b3IcycbS9Coh9gH9SC2+DYViU6EJW/CbRdPhiYw+LiuE0zax5I1XN0KF4hXTM4+8o9keEkGKACtvm7VV71ZP0d78UNQTAG+vqH2aRiIZy1po+pcR89D+G68sgnolbIwKXd7Y9JH49ATl6pV7xkaDiC1sMaidiCr8dMHE2r4f4GaqG85EscdNHDrFF/wGQHcT0CyyR8mxUOkpHcR9NlRWyo96i4z/7VyLP8DcTnTpVgFHAyU6OUy12W2VfRy++8Hg5e0Bmi1iGwaa00aibyImfUiMhyTL9wzHbe0H8x3tmGIM8LaidPzIEAO5jQUkiSGXdHOzOjmOapC6nqegSDv+PAYc8hieElH4pyx0nEfF+KyMxtSWwuK5NhjEOHoyABdd9OWp4XmBZEuUwqNpcpBOfSkfQd2N1X14b9kuwm10jzMVHB6KSDoHCFDA3VmNxr7qsTJh+9T2HJwoqzEDAXcEr7CPaGgyaWWzsBkyD1jodwddg1aY3hBgPD5Ojvc5I/biwrmxWEotXY+C7ZEGPEIMOVNpecVuVURi98UVzFTZ1kyMIu3QIgoXG3utgQw/PRIw1EqqBtUCEvW5bg9KUFXWEnQHITuGbZvzVqK+H/6M1ewHUVyTZAmdAIlNlqIc+OeB4KdXsEFtvJ1+FuP58FJqSxA7rLxVqKC+xS5t/Pa5dKrUfMBxt4z7BTjbMpfe9vk47z4EtF47U47PDJ2WUssLToF9ToZ/HL8lncsSAnfmm1sWUo+nCTVyaY+AIKWdgbr4xlq/33DNtRfYmh0kH9JwMvpFguau5lTCI8IaNV8npuElCOZd6jFNTMHkbIG6o38iPc5eM8ZyptoibhU915iMn2ZWbN1fMgZeWilTVUpFkaBsODOMuwkljSVBL3QGbiiG6kNv31da8z6UNW1N4am78LmT5Pp5isa7Hvwgu4LqULAWoktOQaxPttORk5+QvejFVOPx3AjAtuv0LxsQbV9qu2OVYK874INmRc7KqP9t7AKOItGgy9SNEC7v12rPrzVVAwXf/i3E8uSHHf3LfEIKmQuQEzAcAJbr+yRk11Ob8byW+q9KDkM3y6go1ekIAuv7uChjAEgljtve3Wa2ZLd/LocHlajlwe77bGuo6KZ4Ur3Jq+fp5EjXjwD5RR2ZxXj1vmT+I12Xwybm8f6HMv9piHvjkcvo6v4UwaHtJk36kSTxgPbXHSB4VWqR5XMbD9iwwT2H3G7iy+PCRKp7T6rpmKn0j01IRNkQbqaV9JMiL2k3rVz5rGdvyen1Q4qFp+TN0rRxQr7t36sEwS+pUiffpOCun0Vurdr6ojL1mBnql3PzVGfnquq9N2ghH1wksL3XdOogfeIQbcY4692XzU4TE72aKS4BMMYWioGQnHC/hniEP+/YFXxVG9HPAaVAXb07T+rm0JaZgiez+j1NMHqQwuzUrMrwDMWc+Qoikg5k47TrQF/KIpkHUD4wj8ao6KKyMRrTbZ+iEUmZFC4VOKNNWSPX/U7bmYXESHGg3/Ct7uf4fo3jR++5xRWCMwJyNfkvTsbQ5UM/at/QO5GdCX9Hs+I646KplozEdYW+in46e+9C+rs83dC9A+YAWce3uxStEqGR4Yma0aIiEpWNzSfnbzn8YCWTFgYD5jmNhZIbhwXUwmlpDAOenkLgBsK9wuH2cMrOArq2QRuL5Stv6xXqC1A9snW0qTJxhfvwOYYZ58sEHv5zAAzywDds7R9KvvlI0QDWz2WICCm9yLKht/92DCzpRdtnwAogSnM6hmxE7tbpPR+QePG7Dm8azAARMgCJOKh2j/CIR5v3wcRtMycZHd2u3J0FbRIs/C6r4a4R6rC9yb/ExgS22WMXaWnvW0/ni2eI+tBNrYwR+o7G1IJ/rH/DcaU2xozLsnQoqgR2LdYJj20TRdFDvcqdd8fsA+98/BUx3uJEDQxH6cMkL8i604g5dWwkECJxxhZhVTAMR2GtNbw6hIukoFzEwVGwaYpSjVrW1rNWHfHO4uTGFY0LzOI3/ala+y0ml8x7xmQ+XbV3y4L887ITrgfiCYCVMrBiq+hk25U/osoNZvPaMzHSa71821e5osjbHT2jNx8r0oN7LLETwOvauErSInFe/88NZyIgQEpUxH6yEuD5qfJzVP3oQJk2GyxmZRrKrND21ufv3V8AWJSTTNKOwBFFDf2WKRssepskcOde2/KDlix1kYegk11u/uSNJXx9nnaKS5g/vHdGa7h91ROV8yNonafSKEkje7nE/TaLBofnBx4LUBW3M5RphvWTyHIOqo8fsUQehDPB+uiH6/Rhquv8dKghquj1uEw+GTGrb/+rC9lCa8glq5VZaIYWae/7GLxPyS81052JSayR2ZWJCHL6uS+K6DYmddbUwTrJzSrU5iCWPMr/taYq/SapZzQ//VPdEIXDuTeR31bM/lXBCx2P+2n8wJ1dvGC2P8QCziQ3nZeHDU0B2vkcoktnMdwTWdZht4C/p8tWR7VJs3Gji7WsFkWiOqxMrmmgt8yR6hAMiSlj/i7OMP3CU2hcA3SNFx3BAnv3RYBYlCeEZTxyabOI2PrP74a9LNp1KK6lcDEtMAjd0Tyq1paGRHMjHNpPS+UhR8cKdsN89Y2viLr2fsYFGh41bFnOdY05k6Myyq0+JrnrLMoYcxD7eAd5JNicY/49jO1+wCLV46zVveR5ywsFITUiBMEeHnDEFiUYabIe7wqRIQs8DbnG/7ez0e6HQc5VJBRSqy9DVTCgQauY9lQ6lhp8yqi/89RQxgWyd1F+Hqlq/I+KaKsp+ulAMNUM4NGYXCIVKpmFqkZjP0V/YcCbjWrSTXpyqUK9sDBrWWMK/r7QxmUt0G9Lp39qpnQAm1ekiFUSN9rdXF8Jx9RxbzNf3p3KE/qD2MkK/DTosI93wfDYY0jV0s3LrDzP6rPhAsyuBAlZNQpd9Y0eADYHKPuxzJ2sfkx02BD/eHJTzarGH+ktc0YPTj2xQ8KzUcC/Jx/0aqVEwTs5Noz/hyagJ/FIUIAg8X0g2ZgeMUtaLk2dwPnZ0ie4AvABsqed1TylMFckbwc+eo1cuzNbuJ5rcewayw3YYEji4k2KdUlYJN/An8pRKABj3jQPVvK5Sw8xBAo+rofZxToCwiZ2TKKEQueEWG+mSjsm3tiezrm1vmnMxGmi7gu2H4k+OYpABw8Gw2nIuU5k9JYzSlNx7d9g62g6J8lW8YOTd4/Pj2Gf2C+ZNQW7m3gte/WBFBFkzlDdhetS2PzqzfVGhXU1+7BrJGdEO4WqYBVeT3XTEaGhCIAFQj6HE9i1MEIvTLnpge+rBN4CGMsK9i5hE+x2fmouPaHmHo9kUVXhd4mG2geqaKKy70yErD5vgeebsTYaeEdlPVUQ4QEImHg5MGEGpWhBoAyml5LYrUSZ5Qv09/xgdUijykMm9G8188e58yr49ql61yjRLJzL9gYIOY10IOM"}},"]]C4":77990202599237,"g[KX":-3778265311530823}]
```

#### dag-json CID

```shell
baguqeera5zopt4schs3rycbuvccqv5m7bppckzjnwfomrrr3wcilhol7qmva
```

#### dag-cbor CID

```shell
bafyreihyzj6xni5ywr67oc5hepbnjapfu4xl5jk27afsn34dl3povgfgum
```

### garbage-06

#### Bytes

```shell
5b7b222f223a226261666b32627a6163656232666764776a64796d33736875767a6d75737436616d723766356a6e763378687462366f3277696e6c32
62667278367966756d227d2c7b222f223a22626167757165666a716b376233627233716565366978786973756f76366d727a333774667671326f7271
6a7971366473726b797964787762747333646e7277353669726c3768633737786966376c74636d6663616334227d2c224a66356e40393c2a33406b2c
283b5c6e2f61517c49547c522a73622d60644136374941652040407c3c5d4e20692a2879653664717d463b5965203a64304f2d46246f52792d23782b
457842573e247557235c746d6a495c22324f725152345e604554742c37492632335e452a3c5b7e694b307d62596577603e5d496a7e3e437032303c35
475c747121597e543b2e38356c607a52515525434b77566d37496b5669633d7d6752355c6e643337574d26295c2275713726284b335d3356517d4864
64792c43253d613863523c3b794f6c6741382a55713e232a382e4b212a4e5e7c31675c227d3e3a7c4d672f33296563476b755b455c745730443a5c22
3c493349406c482a68463b5d6a63707975433de298ba35313f7b3b612c2e2b5b464c4b412c48657359482e29262349773d213a30242624676c36435f
206642422646525c74733d49776337256b70736c457472543e455c5c615e756d55686370263449577c445633794172375750547353375f2c266a314a
6f71505c6e5c6e6e56753371705a36367b5223616e4a4b5521463d5630586f5c6e3f4c4267747e564e295c5c29565c6e62482b79455e39374f595c6e
45755b5f30305967334e3f57742378617165755c5c63214747566549442b7d29537b5d71525f543b6f3b3570695c6e6d45243771386864766d742b77
6e617d4c5c227a39213f677735645769593178513f3770252671266740685e685877272645567e3937702e6b674ce298ba693d287e624e60342a5857
654e6c744a27502c6234484064317a2c72505a574a21732c353c5b4553432c3c6659367c6b46426d48707d676e2968426c26777b794465426c362956
3b416537523e5c22754b53707e5b437858e298ba552c3833247e76513a523e564c3e792b2e29382b78283ae298ba2d4625616b72445f377253232764
5274693926535964755c222b5b7d3a7742504861246c2c772952705c2260213c62367b61436f245d4d28624d625b57744f5a5b785c6e3f3a2b51436a
3641362b7b4e305b7a43762e34376be298ba7a343a50495c2268552a64783f49716b774242386b774a452579245f7055775d5b482d692c3e52783732
4e4c50594c2855712e7c547b4523723b483260233d2e20575a255c6e3c6ae298ba2762473558715443425573555b21575c222b477b2b6f57357d5c5c
6831424d277c235846763d38542f56246b606e40e298ba433b563d6e7d5b36792e73584f235e6f283f6b2945417e4c7347646e5a3c24737027472647
752e7c5c6e3238434f4b5a702c3129506a2f79742c5c6e6b24484a637b2078453d3d445c6e4370404054752f5c74357c395de298ba66786d507a7141
7d6155764746677a46534c54732c305932633b56703e7d4e5744702130742f59264d7876415c22536656297c283d3f6747586155774e42455962405d
2e7e4b673d4e2078742e6935503762323e6c6769384a3558477c662372495c5c5d4377446858526836384b413878592e645b325c5c5c225c742a3828
2b254620593d4e402e346d732a345c6ee298ba606f787a622738672b723b5f7925374932496044295776617276655330e298ba2f52734873546a2b72
6e315c745c742d5f5736584b70407e234c462a673a36243d306b5c2243582f694c5e713f2c5c74597d332651612772317c79404c5a56786825756a63
28792f2c50312946294a6c457e48795a202942466c6a6c6f2c2b722f203a5c746535642f7c7e444b5c74743f283a5c5c7751565e416e6c6f727e6875
41672a20542e65483d24414923326f6a7e3035534c7036e298ba375c6e726e5f722168587b4b5949365c745e652462784921624f3b3a2a2c2f5c5c78
6a3154545b432e3239586979797074796c2f20545c5c547d52795d6371713c4e2775602e3b5c6e203c35716b2e475c7441317b2862465376482b2564
2a5d5b306a39284be298ba3b2f3b314e594058314e77385a557337277b423f796a5057695c743673614e59455c6e5b2656295f47594f30767e473674
4d3d33297369615c227d39495a2f2e4a5e35396e3338555b656c705a7945305265236f7134352678643c522e36785e692d243f506535526f696b753e
584b5c7426734d6f5d2f3676515f72785c2250545b2d5c22267b4241446575572a676a2b41357d4f785b5c6e752be298ba5854e298ba255f335a7829
595d272961725a2e622a5457596b285c6e30424478353a5e563b335c5c6b6674517d27375e642b327e7b3f7655317a31327a7370415d6d4d597ce298
ba493144716c7e542c607e5d6d3b37713b2d5c5c4f4d28786c5d6624644b336c3665366844674d292d7d6f5c5c6f6161724b7e5c224c2b5e4237686c
754c6043652a443469515e29373e2d4f32407be298ba7d5e257d69407132365c2267217e2421525a236c4f2c6c5f362c5767573e427c4952646d6a46
21252b563e5a476d4d5c6e7b68e298ba2b5c7465232b26432e26245b3c762b382b646d4070244567504425712c7e48555d3f463329452a3a427c7752
2d6f3b5c6e50465a414c40773b7054252337606d62346b5c74752b554244445b6b6f397c4777623d6569435976702d3752e298ba325e504a47446c6d
3f5e3120e298ba295c2232313a422e3b5d5375215f393a20436b3868762c5e447c255c7435393f554c53644a3c4a442a3d595d4d6a265a3b6c725925
5720506738336d324878525c5c79702f382b3545626149467321615b2140663965332c297961442947324b7756537031575a6f784d236757285c2265
516e46703e655e31267e636c584844607b477a4b4a297c2c2179594b717a2a592b3c4a4d66484660706f5c225e27293f3e7e7d44507b2e2c3e746468
395c2230584330513851333f5c6e5c6e56695d545de298ba423d52775c6e6b2ae298ba53452b7a3242424354647b72704b41563a5258734f6f2e2d43
4d2668613b73434836454833456473405d4f5c6e76675f2c4b63644f395c5c513e2735574b3e503f387323562532645847333646505a204263647d25
2f6e714f253c47375e7249407d5554786a2b4f4e2c53425745234f24664a28647e5c744f4b4874284e6475664d426172782654e298ba2c64735c6e45
4d2a37575e505e7174395c5c214729463538232f54655c5c6a69432e6571603643792559254a6a2f313b2d714831522d502c5572255d3f435c6e5765
547847793ae298ba56593c6e7b67762d462a7e4c7e685c6e5d3a6c3b705b3e6760494534753268336557394b7e367b24585d5a2a69353b24467d425c
74706d5f436d3d2c703e766151704b4e2f42633b79253d21413524543766444e755c743925285b46315a54294e476b2d306e6f64282e67572d786d60
5d64402e3e27e298ba655c74774b256e6a75243f695378703d2b516b402f2043235e2e236a353469387a3b547d60415c5c416b233a635c6e32362a21
2874505c22734b456564595f5d203233537d3c2659503d3f5e4e4f45684c65716e265a66655a445c5c447a307e303b7266335c6e5e2769563726615b
6e5a4c205029297c2e3949325c5c7be298ba207c253e3025735278425c5c25506a39643e7d2b293c634a66793b4e2030256b662d7b283e26523f627e
4738424b4d5c6e6b5c2248355959397036625c224644567d7e50756d2c2f3d412433653970243e3351575b6350682e6c26525d52312c704b5c5c2b2e
443360513243716569733e26586a6970217e58266f773d254d6e7d3a222c333636343930373530353239343631352c302e3235313433323338363032
3530303636375d
```

#### String form

```json
[{"/":"bafk2bzaceb2fgdwjdym3shuvzmust6amr7f5jnv3xhtb6o2winl2bfrx6yfum"},{"/":"baguqefjqk7b3br3qee6ixxisuov6mrz37tfvq2orqjyq6dsrkyydxwbts3dnrw56irl7hc77xif7ltcmfcac4"},"Jf5n@9<*3@k,(;\n/aQ|IT|R*sb-`dA67IAe @@|<]N i*(ye6dq}F;Ye :d0O-F$oRy-#x+ExBW>$uW#\tmjI\"2OrQR4^`ETt,7I&23^E*<[~iK0}bYew`>]Ij~>Cp20<5G\tq!Y~T;.85l`zRQU%CKwVm7IkVic=}gR5\nd37WM&)\"uq7&(K3]3VQ}Hddy,C%=a8cR<;yOlgA8*Uq>#*8.K!*N^|1g\"}>:|Mg/3)ecGku[E\tW0D:\"<I3I@lH*hF;]jcpyuC=☺51?{;a,.+[FLKA,HesYH.)&#Iw=!:0$&$gl6C_ fBB&FR\ts=Iwc7%kpslEtrT>E\\a^umUhcp&4IW|DV3yAr7WPTsS7_,&j1JoqP\n\nnVu3qpZ66{R#anJKU!F=V0Xo\n?LBgt~VN)\\)V\nbH+yE^97OY\nEu[_00Yg3N?Wt#xaqeu\\c!GGVeID+})S{]qR_T;o;5pi\nmE$7q8hdvmt+wna}L\"z9!?gw5dWiY1xQ?7p%&q&g@h^hXw'&EV~97p.kgL☺i=(~bN`4*XWeNltJ'P,b4H@d1z,rPZWJ!s,5<[ESC,<fY6|kFBmHp}gn)hBl&w{yDeBl6)V;Ae7R>\"uKSp~[CxX☺U,83$~vQ:R>VL>y+.)8+x(:☺-F%akrD_7rS#'dRti9&SYdu\"+[}:wBPHa$l,w)Rp\"`!<b6{aCo$]M(bMb[WtOZ[x\n?:+QCj6A6+{N0[zCv.47k☺z4:PI\"hU*dx?IqkwBB8kwJE%y$_pUw][H-i,>Rx72NLPYL(Uq.|T{E#r;H2`#=. WZ%\n<j☺'bG5XqTCBUsU[!W\"+G{+oW5}\\h1BM'|#XFv=8T/V$k`n@☺C;V=n}[6y.sXO#^o(?k)EA~LsGdnZ<$sp'G&Gu.|\n28COKZp,1)Pj/yt,\nk$HJc{ xE==D\nCp@@Tu/\t5|9]☺fxmPzqA}aUvGFgzFSLTs,0Y2c;Vp>}NWDp!0t/Y&MxvA\"SfV)|(=?gGXaUwNBEYb@].~Kg=N xt.i5P7b2>lgi8J5XG|f#rI\\]CwDhXRh68KA8xY.d[2\\\"\t*8(+%F Y=N@.4ms*4\n☺`oxzb'8g+r;_y%7I2I`D)WvarveS0☺/RsHsTj+rn1\t\t-_W6XKp@~#LF*g:6$=0k\"CX/iL^q?,\tY}3&Qa'r1|y@LZVxh%ujc(y/,P1)F)JlE~HyZ )BFljlo,+r/ :\te5d/|~DK\tt?(:\\wQV^Anlor~huAg* T.eH=$AI#2oj~05SLp6☺7\nrn_r!hX{KYI6\t^e$bxI!bO;:*,/\\xj1TT[C.29Xiyyptyl/ T\\T}Ry]cqq<N'u`.;\n <5qk.G\tA1{(bFSvH+%d*][0j9(K☺;/;1NY@X1Nw8ZUs7'{B?yjPWi\t6saNYE\n[&V)_GYO0v~G6tM=3)sia\"}9IZ/.J^59n38U[elpZyE0Re#oq45&xd<R.6x^i-$?Pe5Roiku>XK\t&sMo]/6vQ_rx\"PT[-\"&{BADeuW*gj+A5}Ox[\nu+☺XT☺%_3Zx)Y]')arZ.b*TWYk(\n0BDx5:^V;3\\kftQ}'7^d+2~{?vU1z12zspA]mMY|☺I1Dql~T,`~]m;7q;-\\OM(xl]f$dK3l6e6hDgM)-}o\\oaarK~\"L+^B7hluL`Ce*D4iQ^)7>-O2@{☺}^%}i@q26\"g!~$!RZ#lO,l_6,WgW>B|IRdmjF!%+V>ZGmM\n{h☺+\te#+&C.&$[<v+8+dm@p$EgPD%q,~HU]?F3)E*:B|wR-o;\nPFZAL@w;pT%#7`mb4k\tu+UBDD[ko9|Gwb=eiCYvp-7R☺2^PJGDlm?^1 ☺)\"21:B.;]Su!_9: Ck8hv,^D|%\t59?ULSdJ<JD*=Y]Mj&Z;lrY%W Pg83m2HxR\\yp/8+5EbaIFs!a[!@f9e3,)yaD)G2KwVSp1WZoxM#gW(\"eQnFp>e^1&~clXHD`{GzKJ)|,!yYKqz*Y+<JMfHF`po\"^')?>~}DP{.,>tdh9\"0XC0Q8Q3?\n\nVi]T]☺B=Rw\nk*☺SE+z2BBCTd{rpKAV:RXsOo.-CM&ha;sCH6EH3Eds@]O\nvg_,KcdO9\\Q>'5WK>P?8s#V%2dXG36FPZ Bcd}%/nqO%<G7^rI@}UTxj+ON,SBWE#O$fJ(d~\tOKHt(NdufMBarx&T☺,ds\nEM*7W^P^qt9\\!G)F58#/Te\\jiC.eq`6Cy%Y%Jj/1;-qH1R-P,Ur%]?C\nWeTxGy:☺VY<n{gv-F*~L~h\n]:l;p[>g`IE4u2h3eW9K~6{$X]Z*i5;$F}B\tpm_Cm=,p>vaQpKN/Bc;y%=!A5$T7fDNu\t9%([F1ZT)NGk-0nod(.gW-xm`]d@.>'☺e\twK%nju$?iSxp=+Qk@/ C#^.#j54i8z;T}`A\\Ak#:c\n26*!(tP\"sKEedY_] 23S}<&YP=?^NOEhLeqn&ZfeZD\\Dz0~0;rf3\n^'iV7&a[nZL P))|.9I2\\{☺ |%>0%sRxB\\%Pj9d>}+)<cJfy;N 0%kf-{(>&R?b~G8BKM\nk\"H5YY9p6b\"FDV}~Pum,/=A$3e9p$>3QW[cPh.l&R]R1,pK\\+.D3`Q2Cqeis>&Xjip!~X&ow=%Mn}:",3664907505294615,0.25143238602500667]
```

#### dag-json CID

```shell
baguqeera7ifa6iw5re6bbawuvrditz6ptjkrco6gindvicfza4pd757halna
```

#### dag-cbor CID

```shell
bafyreiacig7uemck5umaiv4uje4yzig3wlarenlvch4qya7s43vodjngdm
```

### garbage-07

#### Bytes

```shell
5b7b222f7752575f454c223a2d3235313334343139343439393530372c22384662223a2d302e30333438343037373633373739363431362c22432a5f
32223a7b222f223a22626166796b627a616365626133736e786d77346b3271737479667169673433343461626778373673327a353778766366783533
3732767771377270763575227d2c2245775526223a2d313633333030333531303735313532352c2255495071235a554d59297b775f76243e307c7856
7e323f474738572472223a747275652c225c5c55223a747275652c22625c5c322748413b6f5f25223a5b7b222f223a7b226279746573223a2249522f
5353724b7454374a6346574772444973337a71514358522b47616865746872476f6c36564f79784c4b38744a57786862727153496d4e59755175745a
646c3752364d496768576731566f47684246716e695044703572577837396249564c7663354762716562467a483748626744446459386b5675493546
6f63576c396f583678462f73475447335a476b3238386778363478776d6a3064466970492f424f626871573556715a7765643270417a5a3166784977
2b714f7737732b774d5a4b3577492b555530674a34496a42454f454c7453712f49667044594c2f7a483853386343342f4d7071632f4d47755557536d
59444148396e2b6f522f4a6c3476473430496330436f353261636a7a5167566a6e63645832645938652b763837786e423679782b4a365265654d394d
61416466465842587169584942666455634c62757a7a433453566e6f6e58525566436a414e646d3659365438446230305a4870374b2b6e4b4b325939
5538466f34466a46554f6a73454e54354e526c6b577648794b4368636f576933486c733062774c69336d6361524d4f566c736b565338355064435152
646f74626b586b62586857714b6b64427456324f524f69694a31653962796c564850634e2f3838694c67566d614831522b486365324b714e5853336e
6d716354674d326a74416335344233576c426d56536456666958646161386a73517a4463495974756b624e3146716b4632724c324c2f766168627a67
4d534154396732324f5464656567694b794772476f6d6d304f3953634245694f616f5752627242527733727362366f4e78644e747656357341413850
3553366173434845447a6c6d3772766e7a6930744b4266344b6546464b70673859536444347161506b747733537363556259375048574a34704b374f
385879734968764874754a7656505755693835535932355667474b4a7037434341582b3161647874364a78596f6875734943535235474d396d46315a
616a4941734768726e6449594630306d6950724e39464b66527666656875627a6e54687559716c616b395761434f706e39372f643869435674586267
6f50576b30533178464d477a2b416753535a4458512b37545546385754636f3039716e76494a46714c6d6d63616f4c4749765551626c77396d6e4c62
316161786c59346d4e3267374a61556b4e316d7978796241507a31716d5467655648766d74564a4f546e307469584c4f557a71352b2f4a7a484e4143
316c37386d7269446d6d7277737031324a52614358356268667442474d48354f6736456e4959767555726c372b764b5166754f5070436e706e576361
653770646d6e613268625575372b594d322f6a45464a3263506849324a71646961786a34376e436937624f5a6134572f665371572b6d50797877354d
5662724c334b3038615262444b467457662f5056332f654970776a45424f3233625556425132495868554543335043466e44457474555265307a6e33
51623151634b50644a355933364835476845334837417678466b43414342492f6c7537724a5a646b3433463964554266657145755a5a315241526a2b
454e6c725274726e4e7631437958394453724b56723943687454796b374d346f6656554761303741426d46326361324638616e543761767764635369
54756b517368724f552f2b53674c595978584146324a614b7631544a6958665653545158624b5475507957684e6b325373414e6f344b327461686a44
4c614431774465384133386a6e31437862386a637354786f64504e79464c7437494f6b71533570742f6a316a6157534665376a504a625034506e2b7a
52486554374c4154426b4c644f666a5138466f453142576f54445979376b436662546c757a53332b434f4a616b2b3839484571486d4c356b61626167
304d534b465a7a724d56774b6e325a467245503966487667314478546a4f35396e45395943783739734a6c374b5a4730586c5133644c4a7a685a6f4d
4d50374f44626f49636e4561544d734a5a784d39685653304a2b356b4f53466c343344396339343863794b342f2f7850434943737146637974323369
6a76616f3279716f6732797034635648596c4976756241764878687a702b2b726477636261792f517466493366475658462f6443364c666177707956
6a6a54786c7a714e6579787a5453544370737a6467674a68756262423647734b50555a4f73415631725a457237486e54596c6369374d50394a73736c
376d70474b6864414a6659315541337a6f3152714c7735517a6a6b6b4277546d557759464e4a584f6f706d6932515366664d4369756154547337436e
754f4c59766932547a683166697770736d416a4d52534c574657495851676f4e72386c41316e596d56566551722b364e34444755505139535a683068
7065366558796f34736f70694f757a4a5a5146622f43506d445646747753392b356f4649503277442f3652354a4e64744e78474f496b4432304b5057
78512b755032776f34676b412f564c415141395a6f515559487846306265303070763865304544554e6a45342b543078436a4a32493752714c716673
457830766e5544385753467a6d2b7a635655414a5336534e3135377a5477553350375952634e4f5130485338516d57695559796f43575a5838665678
5451305a49386a7253546e6a557748597a34496f334645483361305635474d413566734554724d6e4a7045756747513658533442504a787236667974
4a6558596c54464c706755426a69336f666b636e4c6c6c34503934346f4870764274457a497169335445723471516c397639542f36453572552b3874
7446626f33434c6d58684e375076743269553552385a634e6d65384e42545268493555466256584c727539616e363969355166717963506a35386264
4d4b4c424579375631326e49342f305638694c6243586d6864556c4b6d4b2f6d57746e6d6d4467227d7d5d2c226c2f223a7b222f223a7b2262797465
73223a224849363063467a66434537544d797a56536b646c6770524b69793159417261396d624532746d5a72664f68675431324b6943566755584f74
51475466495561344b4d6d6d423659633956334b2f4e307a5a514f6c38327548786d374265663778636933757677564d5773374b3872464a71576c6b
47514b4b6a356f6c38573139576f744c775467754930786c50477a4a2b3373355142574d6f415753496c582b6d6e737562556d38386f417777656342
4c553563396c79764c67313535457a414556315a6a4c4c59535135353574555a50785a416f67594a7754524a7374343061654d344842395766316c36
4a6e7631475769393271314a38364e6c336b66542f39327657544f35507352755a767a526a425a5647334847675546307471706d4f3265592b2b365a
4430742b34527375636f6637314d654f61767251383171386c632f7837356c706839683646774d5479483546703379377a79674e764d396b71713470
713268454364586f5536384b717a617352723330386f42732b6277645a324e6c71427a6b516d48306e474a42696f386c3637386e72786b3877775058
5951487a623653684e75744a765758326542727a63514e776b4e6334704c6f4c744e436765516b49454f62783757706c53624a506538414968775636
496a576b53354c627939375a49514c586364544f5765626f6b5677314e6438576370332f446c4d73307a4351357930383163557a4a3773364f356378
484c7461374d6c423742536232495a4c544e745a4f4d714838506368667a446155617647376f6835597247334b7855597946554847597a684b624567
7678614f7459426568375a4d4535496d51464765714f4f4a367254356e4737716761643455494c7645386853304b366b7772592f386263416f326d74
7864627735706274767679675a7037546139787062777753322f4f7143446e694c372b453837714b463736374a4a696e62362f47344d7a36384c6753
6a714a506b30486e7a5532526e2b65336742576c7439584f78524d7878772f34766251663678696569726b534c2b2f77663852747763477a6d325a4a
4271703633596d34714a4147675245626238766b6a5a7359524c4174353746354f716f6d6b74686861457a54796b65734e614d526e31326a79634947
49676c6e35424c3239444545465a552b64346263716d4a4d453550447a76383359476955446776384a4b7472324c746e59786d5257732b526b75666c
375839394e4a636c4b7068747943446e49312f5061334e556372694e386c2f6673646269626e704752326c37444f50385666506d49627664665a4931
4258704d4b566e546d573942355547514b744663425251647a642b58486973455857507642796f487164695747373567714b544d7659596d68385844
334e5a50566d4877355048695376647443325676332f454d2f522f46476b6a6d66373977375253625a625753324a415a784b486936727145724e5354
55306e742f774f467253766f694e347356662f554e5775376963504b615062414b786d4e476950625536526b6c45646f54564431522f456742546f6c
617357676d71556d75635a6a54524a425149735a42396e5a504357706f596977327246324764536e304c6f5553696443634443634669333449517735
2f692f5152464a42504c347a452f68765171796433626e4879626c505952534136644c5258436567796c54584b4f32427a5a4f5a617444472f363733
75453247384d61525158437648494d49504e70513833784c4371374a753330785a583744455365596f6c70636c6779667130556455314d624970716c
4a694a6650535a676b644c4f4f496871797362536354497137684871516871724b31496a6e482f5036626f334c71306d477a4a655a796939364f4463
623839714d6f796c7479733347654e73335253706573574e506351674436717746565a4151674678305358556137706258536b55686b6c74432b576e
463831776c7a524c546352573831507379376f4b47794b2b754b334d423962573274656a464d437a5966675a6c415042506d5144546955694961754f
494f4a4846784b49736d4b344666366d4d6b43665334336a695378546774454a6573364d366c786d6641726c777a6761654e36797355436a444c302f
395235394f456b48546a686134342b574e707347576e37385431442b3756353036417873636d765846584c7973684d4464684c6f702f4e37586b426a
37526135514d354b6574636b6f365368793259524633414b31334d30397335704e6b7537794c6d6a757847332f467672687443536d41436c4f594155
38306c2b476577314e45544f6f4c7161325846736d7873474b4346304233414b337a5334517776354174674b73664c4d2b336b355a78426551755877
594845715739382f446f5a44795169354a557161596c706b754e52624c47437a447578594e354b5a343775412f6a356b6f78746c62754f6d4d31586d
6c6c67396c523042665346457532442b704373782b69516b513641394a38584972636469544d6665632b6133444e72455579322f4879475936346542
4d77443466467539427169315434366678456552415035452b6e6473653855773234735a2f567333544e6d2b71674169356b744c3936724d35574e45
7748504c6d6945633649436d4451547232613168356f3352495265567664504169766a497064335a786c38795249674853544d345574366479752b4e
5a6a506f31633151486c622f6b38677336594b7038644b36423142697873684431496b52316e626c3837597a34786d73682f5063555a473554666231
67626e364f41734c6c4141494e663531476d35572b4a34446d585157374f586e5544474f50626d722f44307a30583531426b61374d39565279385130
6266437469696b4e586e484771463172765948637263677a7676622f396f36735178306d354b762b76657367725a762b572f4c2b38514a5552566963
5953676661437864354b69714c436a6f6b417a745265564e79547565666a62364c394c3046355849457556597a48316f5153596147695066674a4353
6c4e4571447a4c63715a30636c474d3239646a5242667857655a346a7a396441724d373044463371695261797255317466336b48703644534c657a49
6973446f6d79754e713139464146516e33454e612f436e7462512f3831644c66346c6f692f627a31616f354c4c70585362506a436d754b4d584e4b37
45542f776561452f3967452b68385a645a79342f69354e7967596635547053746c4f6e7755716e5253624a49386b6c6d77572b6b6e34616177375359
4d6645797357717430625733784b526131394451776f456c38744c355a556d623953506565796b5a65756a4e50446346666d6467655766594b6a7758
524e54716c6f4841746679344c4e494e795656417631554b384c654142472b6f616f3674552b695965514872526e494258392b394573474d35525568
372f64696b434b4f765650456b3451557754597532437a446d534c3652316e4d45463265746551342b4b31577a66306c67714239643430794d59554e
517657516c53554e48656b332b6b682b567a326f5354694367615639526c37754b676d514668364165774b2f55525838387835627938354b4b416233
4f753862623943457551317762684c586b782f59654950535255425748582f72686532517873636a415754706876345944484d6c54317a6e2b437464
6e54344c76485333667a657143592f2b7a674c65523569506d4c414f64716138394c79707a63414275454570706f6b3232314632555141754d336a61
6e58304a3932584e7172306e44394651494456313452643252357a6f643337786d537642482b684f713736495a6f5a564d6b6a4e3142524a6842386d
62334c73352f77674a59464432567674562f63464c674c4e524738536d736a3565487858572f67484561525a7663496651726e4f744d4a7575764242
44794b684230544c794530646436385a4f6e3472726c6876664b444f5858454a72317339512b34414c39317058386d54663839625372562b5a386245
4f656a364e58646549726f33735057627456376b726c5a6441566e53567355527a56475444514b744670665432586968483156485442474978743443
474c646a4c4d55784c4272314d5331525a32685a3643354f41482f3550694344344c543172774d746f4b69523138304e7861543433502f7641524235
3649356d706f636b5763315569356c493268333751766b505a6166457870305a504737643539414368522f6366745448413844386552795257574438
4246794234566e63653376624864566b6356417172316e5a46364e3730796f34616b58504574565342536d4d42725856666b567978555a7a51786253
506f34636374527a39646371534a636e555774362f7435347749794c4154396754696b706b4a625352695161716d612b5046776365384b456c384245
46797a496136786b69546e734d3175754358796f376135726c4752415064667944456478504772586c683338714349423062707a4b556c7230742b73
6f4759765135444d6e77386b326e52366847644a6c475150726965355663463054697a5a634b413174774d71324e4b52474f6a4b4f4879686977532b
76316b7068514c367964454f6f50737661747579306f36596744797a3679495661674a6e5338575971744b374b6e78514e636d4e5231315459557878
555463416b6b2f322f306434394138747154535156512f6f354e344a724b4451394b58314474532f544f324267762b394d553972426678426c5a475a
6e3273527737784a4558626b386d39635052586e4261324475512f6f686e552b3530544b6c317a685269635732466a7a4b445a516e4467746d653046
4d6f5a6c746d4e306b322f436b76304352736c4f74566c726348534242785a34775a526435376d374b73356a5030503951677943454c7a2f69447271
6f4b3447596a4c3175654b4f545a6f3472334768364373543873736c4c3553613865785a742f6f5276696f5064367556527a77694477654353616a64
462f345a2b656e534a5632714653375a7a427354334163396f5666676d6451454d34593556376c30627433385346564378546a464d426e556572534a
6f41695434706434785a43517346357630776d3468445468716f76704d56474b73524845765153704e396c746e70776452723741324f7957674d6b30
49635658556f564452726b5263614648443855694275636269456547514a48355553755867565537487379576a51634f312f4a326e3546694c762f4c
707568593832596d524d376f4c6f55635752743038576335644d75627639484432696164445568554831735248372b66422b4a313245367143445876
774c583873485a316e704f336176647664626256722b483169546e6345545a6e6e64344449644339765061776e6c34442f323046556732756379515a
6745527648337a795877574a74534364354742516e314473427170643541227d7d7d2c6e756c6c2c7b222f223a2262616679626b6d65336435797761
337569656d35326d6d727836336d666579647736787a376c6535687363726d73767a73336177646e757a6a68353566756e63687364713270796e6473
65726f69326c65746b3561227d5d
```

#### String form

```json
[{"/wRW_EL":-251344194499507,"8Fb":-0.03484077637796416,"C*_2":{"/":"bafykbzaceba3snxmw4k2qstyfqig4344abgx76s2z57xvcfx5372vwq7rpv5u"},"EwU&":-1633003510751525,"UIPq#ZUMY){w_v$>0|xV~2?GG8W$r":true,"\\U":true,"b\\2'HA;o_%":[{"/":{"bytes":"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"}}],"l/":{"/":{"bytes":"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"}}},null,{"/":"bafybkme3d5ywa3uiem52mmrx63mfeydw6xz7le5hscrmsvzs3awdnuzjh55funchsdq2pyndseroi2letk5a"}]
```

#### dag-json CID

```shell
baguqeera46oi626a75opm7oddpgbiiruhmm5zajatdqboucrwgi2vorhy7aq
```

#### dag-cbor CID

```shell
bafyreifllkpkf6fo3t64ktpxhr2jrq4zwsspo6iqdwr77yqfalyiflhu7y
```

### garbage-08

#### Bytes

```shell
7b225c7472223a2d383431303534323636353435363335312c223e414b5c2279223a2d373436303138323932303839393032392c22532858577c2d23
6d223a7b222f223a7b226279746573223a226248664b66476b5473737234636d79676145343673496e386961583146737670314b356873516e66412f
53614e474348644e4d79764a383643684d5a686538446a333963434d59696b71374d6f325156376f313063765343734d585a58584b7152314a753867
61736a4e473731416c306264694c592f44365074326a4c665a6d50544f316659622b4d347831453033745657742b5959684f37754d6533744c58324a
6774447939436f702f4f34766753636d5576316c357a344661417762345a543737567374393432536d4d4a6c35537076516d524c78715a2b68656943
6c2b71675161464765654951626a655761384766644d46517930317157504c483970793249533153524137336f344f3168526153466e675a48556b75
4c4e7362417439494d3358705079334849424565445477732b5163375a697467574464757433614b495a586a7a453871697a6468377861344b485433
39676b30586e767069706c763266466a5935776b50612b6e6e6456777a68456a30423838464f7648677778324b674d674670493152524934674c4e30
6d656749414244423264677846484d4774614d633332456c7667556f372b6a5157434a38764d49514b594c59627942566c3531364a62635057666831
574b6c634479774c354a32526a676c546667344c414f6c756166425a426830447837636f5a4d344774584536484146735a5876423066424437693572
7630745a63785166646c7565446e43444f58624d2f6d344e79494b4f796862496446392b7254795a77356237374d5544396c3462634e423934697347
6643733533706b346344634849344f6f3834684c487a332b2f65397664716a456872354a5877436d583147666c7437647161744a542f54455a536461
5554414f6335302b4c367755672f4b55444b4d59654748376563413765666f346d4b6a6a69594e56616954744c6671756964504963552b6277374d52
7171492f64596e633162725a442f646f394437624271712b6d38786143555267324333507156742b3078412f706f754544484a79694a6d4235596a65
6a383578735667773246483077324742766e7479682b5a5a70516355726e4869716835633554566d4c583966467858776d2f662b766755654352624d
4977782f7a4741656b43583776326c576d646457747a736d747a4f39463766316d476f623871503147573646396b496e6178734b4a536b4d3856756c
586e686d6c397a6332324179526572786630656f383973732f2f6b4e377479415438416931556d544150356d6b6e544d413254644e67627a65684a64
515659454e4757546d314968756b6167654331456972532b6238626b3363746c6e484f51736d506f59644b36616b7632304876325863797148457445
786c37576e39783062517248536a48624875566d48395878306537544b4c614450592f72716e672f4957524e586b4d62427439394e64473355707337
364437366d6234435268426673346d747a786e6175583551396333576f51786e6d3576714342624c67646b305278507a6e656e7a6e51334a37525963
722b66314164454664726878697752544f45643431626676722f3144486f67366a4d34792b6c336d4c4d4c4e374164447968536647343039304b5646
433731664a497a6950686a306e7577633853716a4144496143545344775a426933656332663362574e694a39676e6e736a6c44436661736d52556f6f
4b5769324c5869564233356f5356676c79676d736b5831544c38543549575a4b6251546137544a42513846623867635467304947715476656d6c324c
707552462f396a412f744f3175694d42704a5134344b2b77546e5969644b696432525433432b4e557673634143792b7245526c7a2f6d3034472b614a
70377450344d627a364d633344626a7244483861476151434b636f7a4d2b3942355834376e4f67566433587849664f54384a54754f564d336b714457
4c4d68495675777a536a50446542425653686754354f587768494875764c2b726a6a35696a36446d58705a776b66396c7668696c6356667668727036
58694c4e42594237757236513363384a4e69795664394434634d634b53334f61656530686775516343524f78425245546b2b4c51357732306644464a
2b376932682b43425663706c51644235484d6956784341775a30422b6f4a426d6e33376e4965764a4f345a6d7430614f69754954656f346d775a6577
674a4739464c666954445753395356563852775a5577444a76374a59474e35425a336c38384f57375657376d2f7459633257393152716f68542f3434
646b38765253677150755954436c4c306c4d385837693745697a4a5038536b593947356856546e336c5568776c625333304757417479334a70497a75
2f4d62596f6678685342423636316331596741337878486864674c476b66306c30544247666c7956704c5a444b77303058324c334c5a642f42777866
2b66776f545a2b42626b6d72534f42756d6c33515a79615657486974767a7a483439722b64526170484a675a534d497663786b6b4c47685061437347
674f69616742704b756776566f41542b7661394c4351503544393079676471456a454e45497249444953563368597833482b2f555563714142564871
4d3331623159795272426e49664c366c5033397a574c424f344c42736a697a53495034734362562f4a725034754877704e7064427a654a64396d4668
304a68536543574b6b353458796a2b395a35634f4b7a4b45483930723348707a7a4a317075303976483539664939524f7a48446d3661787a66617774
79455161444f52576b5659747066646967755142736c6165464e537a544e46304a4579617a6137786a3579456b7363494953354e6846762f46326741
7479646759394547546d2f69437a77437273464b6f76592b6e7945387155474152683941644d6f43516d6c4b4b4c6371504d356651754b484f542b59
6d58535a715576742b48524a6b383743615658457138627176776d634e384f30567470597539737049584f394179436163456442312b36753574537a
597338765844344e314d7473514450556f59372f746e2b396e625a6b3272334168464b5336474f7a6451714977363871385544485679686b75675256
6447574b3442562f3536787356784e767a324959496b75696e7259337564536c6d6e4249636c59527470423767444535564f4f5352586c446f376a64
497a31384c302b68774f5a71634c386675693657736b4750774c69644c4f615951426d45644a7a457a74435052424d5a70753441344b646873735568
303877527245574f58314f4c3567464c697a524b69336569586d4d4c314e6d5737556c454e492b54334d6969483064756e4a474d4c332f716e655438
59582f6943436745764e344c7459334b49704a36586f696c4d6d553655726545374d4954635736624338624b706d67516271626f78445a7a7a2f5530
642f5076524e43357a78445639426a54464675434f7476447839344e676f4c447863794151746d6b7675344434314a416f3036523556302f30363666
316a74656970464b644c755a364c646d306f4f38786c44516d7235726c782f56424f444f48682b4b56594a30684867426d4867737459413854716c70
306d694936693959766a7a464e51755737465073624e4b4373373269374c656936536b487852416b64535354426c65735a514a73706a6774464d764b
2f453241457275305a79377254724f475276375a68704933513270764766675a6a765274746e48384850695a447259555933647a4e772f6d724c467a
55587266505671797055533976345167456d582f6c4b70416b4a306b7768784b6c706e526538435351534a523750566d55317445777836374e6a2f39
377331566449495152754c7279554136507958572b4a4e4d3236475a6262444132792b765648507230445349373764527178765332566c3156764937
2b627357325a534d6f566a2f36454b544d796c6a466436594b796b37615241576c687166736f6f5270306f6765305567564f476773515339726b4731
384a78655a6b306f67553242324c7267416232566767362b6c362f523639632f4c4339716a7154795575785553544a48546153586a4b6c666d4f684f
316a3254446350324267576f537444302b2f725734524150424d68472f3275526b6d556b315a46436a677a4238792b65376a7a432f412b7461676157
7856676552486c69332b37534163334b7268455063566170576f7964387333704f596e356d59316e386a4f6966556963523448724b7062764a4a5546
7468595030736c392f514f34685941686c4c672b55726d43455a6c365863666176334d787466786642624d52346676754e3266314434446f31324b30
79394152415348617333624766756c6932317670473666436c59542b4f5a63432f4c2b314b62376e42494f777532384535485152794a4f596c685830
685850676a5a674a3272414766516252345a334c376e7654522f7832562f6f614646396136714a615768594141344b4e736c7a314150547866677378
66524b39476652646b6d484a572f713844794175417962305a31335968776a74384d763778784b7a4b725054734a4a7a314e63414446645a364d362b
585a51495537524d6551484531454f6c6773786a4833684e6a6c5343683939497363624d6947306b6b673934765434514f736c61654a646c48386549
4747424b2b36354b3562454b384d3158415232442b6c6c5a4b6f6937476532712b4a4855456a6e6a2f374378543866416770456e4d796438426f5a59
47466d386c58624c32456d33316171786361434e6b6d3668497a54365056323877534866487a4b6c6765304731783768743350724433685652777038
35394f7474724b6e4843682f676f326c306132632f4c55636a3235546257757039345144664b35344b4955646a72527449794d545a574f3361533832
76763633536d7037674b6448657a505338716937507032764171507a56304c515637386b4d78735258674d4464546b4c4e6c4f594839423562387657
7a69466b78554f4d6e57375848613147374e5075314b7732704c745249665467426d5047665367534a6f6768784c582f533979366d32674c5a45454e
324763727a54723070316a734e4b782f46796579486f673769724d676841744f2f793931793869576c686f79467934712b574242656332492f775249
6e357a7a6445554c32647a484f7855744b6e366659646d46376466416b654b486748434e65466b637166654531374637454e6d466b6635697672734c
56644e4e773375567545372f2f3255397341326a576f6851424232344742654b7154486a6a694171304350505644326a38366b515a54476f4b664d39
763459536433733966744346486435374c4d48716b35576447784e62422f547058417a313879332b69684e547441724a61434651644a634f634d3579
567075617a5151533970544d5837796b54304766476f74716136612b55565a66363645734474612f794575634b6c48536c4862786148375764765232
3736505366732f2b645a35664163425749326e6957767651795469413043612b7668566f6f417468516c78747a765848347250635a4371644d626b37
43772f75705678554e34796843316f756a536566656a39336a79486538564f614b307a586151386b42317342343039775a61636a4f39566d4c383852
2f4669687831762f6141676769464234316d5a74755a39357568436c705346472f365663584432394b3149314f6e675a774c705970554d6979436d57
6b77587955684a2b7755446744354138386e75612f4f624147633078715a6c4c66313161327659483054766339373970443739717363756e7849617a
6e4132735a64524e7246766e597257303874536e7237446b5a33742f4734626543696939384a547265686d67332b4e35666478774378552f4b42566e
4575513367763634326f4953354a31474543306b725371527672684676554b304a4e63764d3271684442694551504a4443774251323032743946545a
553859383144793378442f5a6c4456376c47457a555147644b457036626d6743535955644d6a714e65727a365449522b4e6e444f5753652b42703241
6b57342f6758542b36324757694b6c696d2f4d77776e793736485936734d4764372b2b4d534472577441584c636a394242584a735a70696b71506c6d
5463333137653844696247596d4f305367452f6f51576b5766712b4d47487a572b673561454d4552315a416f2f4255355349516e4e504a36634b4467
2f65786b2b346d35767168496c7241757859314c3639753351564272775377424446585237453071796e714e57476b6e43633833637236675050776f
68762b63672f67777930586c6877416f2f37432b664532764f552b4263324f324b62436f4f3366646367505a4e5548626161342b50345a77556a4965
5868756e444f6f79414b366e46725a2f356b5644456642436e7353496f747a626b685943717a3731434957634e5775632b4d6479654a7152456c6f6b
3336695241687a396d7a67515079535967627a55774653365535676c436a2b725746674833706e7a717632754f35674c783645522f42306443423968
6653592f53396476502f7952345661614261385548335645314448316b6c67626c46664a4f505669394b52646c6270565767794e64374c4a4f59776d
6236554744696a5963382b544f71694246314c6a487a2f315769436231472f5541622f624d63564e684e624f6665612f66416d69415a594949426635
76536278316c747547566c675642524f30754b7148364d32472f3862757149775436502f65647041444d447a54396a535539526948446b364e396e4d
68324c6c48704b6c445a456b4a776b4a653269714c46776f34317144614f6c3068616436624d3678703262354231594c5431754e63474e6143497038
6b70344d71536a6a456d61674c6b777267706b50374a4e767542347a6a52664267446c5367457a36334b706679462b726c4241505130666b4c566876
3269687242637355586a2f4554374e44656f74632f794430737638384b3976597353486e37795a4e43386c534e434d794e54444139615a7951704d65
6778616859555a5361783344757650762f576a7433536f5357376265656e4a63696a7142696f6a5133466d7147683764384179664d37436b31654e56
506d7973425755574e45742f714c6a74644e55594277716b4959736a7648346a51792f566947754c35536a4163345a59425747717a3267437a316d58
484a6a4365594e2b3646547a43514e2b656a4f672b7952647349466842436f36346b755a353033657244484c4975636a55546b78792b303966532b72
58772f6a4c5165772b767249713048782b5746452f726b4a64516870376d77635734703368503772484531417469572f636f2b3576567346566c726f
546e4b5a50522f6479495637463462624f4d4833544b6e3864433473314156634f6a747456656e76507a42796d4863354c73445a4e744d444b6f4871
745656416243516e6b33314b4b697454594353512b4e69547a37353535794b6c333253626c784f57374d614e36315a79393548343151515863794351
4e4b506f79495161505447705a75654b334a6e6e504d72554f73615a6d7879563975417973513333766c45546a4a566d35614b433275614c5534322b
696658754950664d757634374c34493355454d4661724c63542b36713274586e4c3433474b3442576a443138386150585254737444676d7033492b36
59366f4b37493836736c39616d432b725041587233392f7653645365743565724c6f3858766c2f445741594f5a4f55317a366e764635526b43726b79
313576774d525a42443036444c31573135784a7a624f4349623055664c4d2b48764b756845575446306b2b372f6738393949725733634d3056463650
757a635341556c3839505a48756f3133794a6970323669664534393236337a38775458667150763961567143596245514454386144666f59664f7562
7a54617475563833316b2b714d4a565a686c5278666f7358693564585a4868444f455043674f6e6e454f7545776d332f392b686c7238476165365947
3262547a5a71637865477677687143706c4c646a675167777579354a4f6653517951346f523945496d796d44706d626450754b55656632755a355749
2b37384f33455546586f344636464f4a664d6c2b597a585758794342553871394849334a34626d687a59444756362b7a49227d7d2c226c7748465c5c
67223a7b222f223a7b226279746573223a2237484c6c31533048584f766d416766666d4d593955456e6378706c526279426a4847397a7969756f4459
63356a726e52456e6d4c666d6f464448757875386f73594233467757426c413448487237716f2f6e396c49444d384259426e314b6149453147596c35
7659707331534d6d327941727076325334594e6a58695842552f38554a557568392f414a5a522b59646e77495745754a7363342f733679534f37474f
6d53655775444f7649623679586f5558334136486657356777392f624f69445573694e7833317172435a674f79592f5a6c726a76316e64516f633634
54633439623536354c7435384a664f38562f5576724c714a33586743534d67773453575934546169424972326d6c582f4d6a5073436f776a44424b51
494170464c544862525573446b42774b48746b5147486d35587a73316646536e6b5879572b5a323352773868346b666670342b566e506c4f77793139
473973714e5343694c356d633838377941794e3749385a51627a7165343552586c765a6366646a6d6159364251384b694848687746776a7264786d69
356d44487035722f6c6b4736746d327143344f417753623679637a496d4261425731755565696b624b52506f69737464776f49482f5562495347784e
4969384d3144584364426e2f6d4a6930426e4976596a795042434c6f41496b693844706541413570572f2f37704a6d43617977464a45336e45623578
4f5271326d536b762b6a432f6c327565474b4b496b704f4c6f36645731636951417a2f567735323553766e2b3068697a706f65685a6c42766d506851
575977446e6f57684b323867375046513267612f4e71734462627378327149704e4449533941472b4b787273732f6a52356a73474e50674c54424637
61617a7779533677547063644a6376715138757956674a62536762514d227d7d2c2277304d223a6e756c6c7d
```

#### String form

```json
{"\tr":-8410542665456351,">AK\"y":-7460182920899029,"S(XW|-#m":{"/":{"bytes":"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"}},"lwHF\\g":{"/":{"bytes":"7HLl1S0HXOvmAgffmMY9UEncxplRbyBjHG9zyiuoDYc5jrnREnmLfmoFDHuxu8osYB3FwWBlA4HHr7qo/n9lIDM8BYBn1KaIE1GYl5vYps1SMm2yArpv2S4YNjXiXBU/8UJUuh9/AJZR+YdnwIWEuJsc4/s6ySO7GOmSeWuDOvIb6yXoUX3A6HfW5gw9/bOiDUsiNx31qrCZgOyY/Zlrjv1ndQoc64Tc49b565Lt58JfO8V/UvrLqJ3XgCSMgw4SWY4TaiBIr2mlX/MjPsCowjDBKQIApFLTHbRUsDkBwKHtkQGHm5Xzs1fFSnkXyW+Z23Rw8h4kffp4+VnPlOwy19G9sqNSCiL5mc887yAyN7I8ZQbzqe45RXlvZcfdjmaY6BQ8KiHHhwFwjrdxmi5mDHp5r/lkG6tm2qC4OAwSb6yczImBaBW1uUeikbKRPoistdwoIH/UbISGxNIi8M1DXCdBn/mJi0BnIvYjyPBCLoAIki8DpeAA5pW//7pJmCaywFJE3nEb5xORq2mSkv+jC/l2ueGKKIkpOLo6dW1ciQAz/Vw525Svn+0hizpoehZlBvmPhQWYwDnoWhK28g7PFQ2ga/NqsDbbsx2qIpNDIS9AG+Kxrss/jR5jsGNPgLTBF7aazwyS6wTpcdJcvqQ8uyVgJbSgbQM"}},"w0M":null}
```

#### dag-json CID

```shell
baguqeeraiqycvxdgp4vyynyuv7jiixdzytc5p6azlpcgwtv6lodttugfn2aa
```

#### dag-cbor CID

```shell
bafyreig76mgs7l5gktz3fbghjrxckoqjdousfpcuq5za7desm3pm56kkda
```

### garbage-09

#### Bytes

```shell
5b2251423c6a6b5f6e6c466a7237e298ba5b6d62722e735d6857535343613d722c3f552a334a2f7d397c61625f3657442c6b6a68492e573145714a21
5c5c4e674729462a36623b56e298ba444b3b644575672f734c3a205a764a296139283171427c744d4c7d35215055342b2c255a326b604a61304d5f79
4e7a3b7c5769387a235a69257a3c78766638505c225b27724a3c496944662d755c6e2c3726403d5c226a56786a665d7b3d626674412d53625e2b4e4c
732828345a4e4a535b2a402c63772a3552575761e298ba575e654034647a7864684938552636514c7c75546864793269764a6d38602e6173642a7a2c
465b4533453e3e6634755244376a5c5c547a73255067255d7270252f363845437c6e474454395c6e534259483a365b59515c225547445b7c5e49476e
427e717be298ba644c775c5c32615256606c7c502f6574423b4974357b3831705660387b2133692648483a24522a73795c5c6d69484e5c5c5e4b4a69
625a645c5c515a6c5c6e5679257250297a5f5c6e40516c3e7d6b7460514237645c744c60563539714c2e5c6e38394c2430464e3b5c224344434c7875
3f6b277c533a797746404a6e3a5c5c7c5c7434574b5c746d5c5c517d205a2d3b6c7c4873546b40237a6b4a7b337b2678697e5c5c6c666d3159702579
787a2d566645364f3e7d25507474574f2c705c22e298ba23527d7d5a33697b7d577e4f5c6e4e57317c287e623b5976256f7d406037653c7e6378725c
5c5f6e6074246d76423e716c6a69773c68777d3352434e6f674e4b264a4b272a2d2e2e5b276a2f5c5c462d6a425521334f744f4f34514163793ae298
ba29664c54517d443d25612e377e62736929645c6e5f3e7446597e4e2f33723b5c6e5f207179676f702e3268685c2278442853236a42366150625a47
4f5f25775644387036436d2651712f2e3d6f4d532f6c34385424724272445c5c6e5b33427d6de298ba4d79782c6144745c224d56325c5c756c727236
6c653a6f7be298ba3f25632f216b76323f58655251294350253a517a3e6460375c5c235c5c715d52343269244a6a3e447c6a2a21575d2d4d51404528
48564a687c5c222f666a292b425975252b277d7054334d294a29677633732c3a58276174493c356d3232604f45672874345a3575374c7c7b4d216f29
41646270254243693360384d28615f3a3f6d503d464b716d436e2365466634373547215c222ce298ba643f38345c7470486e6c6b6a3a286f52e298ba
3d3a4c265e406d2c5d3a2d435b3f2e29212d777e6661552e2358274734675a2046466b277643677c3b7a7c3041433629273974477257636d345b6853
4b5c5c75783f4350576c4b47406e437e762857694855264d5b63693a3437402638525c742c693c327c2773532f5c223c557a33416d3d4d734750266c
4b3e293a33242d4a73455f51545c5c75605c6e65782136797079433c5c6e4b394539742874705c742a425c22266e55313952207968354334446b6d3b
48495c5c2f4560726024654e7d403621516170574d306c635b6e56653c60344f2057262f772f5c22283d33262e386e7c2c2d36557d2163425c746f6d
6535497632565c6e61346d773c3c486c606756302d722f2b7c5f6b2f616167374f45e298ba74722067715a33674f7b3759284a7c4a2a6b462c7b2f2b
39285c5c3e404a2d287b57744f70715329533e6f287c5e5c747e6d3655662b44724d783f3d6c3241415f55625a5939502d76535c22357b5b58376b31
78216d25404b486f495a602b23e298ba5c744936682b492f667325575c5c2860452f4b323741597d41634b4f5f6c4260376178482f375c6e3d462339
5570333636366d312c5f336362606471312d45642e6d772672655c5c6527244fe298ba3b28722d765c5c3e744d2f4566683f7e27755c222a2f4a4033
294b5333765f3b4135555e5a546b336c7d7e413b247c55275444235e596d5e35426c21697277675c746d297a5d5fe298bae298ba4472594b7c2e3c5f
466a6b4c633a383b7067794f265c223a686569797b536a764d287b5f376338622d4865666a5f59614d30625d74342051545575603640672956735475
6129e298ba6c553a3c69667e245848235c5c436467445c6e464e61535833475e306e202a765c6e483a423e562f2a5e732b375a493c5b42222c312e36
3732323337323833393438333432362c7b222f223a226261666b72677165667a6c61697879356a6b6369637263756f683762686173757972696f6f76
757a3536786863766d6461686c76326d687a6172333271666778746a79716374746e346c616c6137616a7a636b7166696e6a6972706c326d61343370
776c7a79356f75756c6c7634227d2c343237323933383935303337363736392c7b222f223a2262616679726771647579737a6279737675356e726171
797a72366564336272357934707465706c6c786834646674716f697364797378646f627165666c3635357178656b36366d337364623473797273336c
6e64716569656661716d6c6b76777a7035357934716866677433656f227d2c2254796158443f28613738335957786d5c746e513e3e694c3276734950
623c3164782742216b516538696973612f495c5c5c227ae298ba4b52595c5c4f4b257261327a742e35454b7a26697c6a214f7939e298ba733f396255
5a5e5a7a627034707d615c5c3d6a58405261e298ba7a3f5c226a6b5c22415c74273e6c5f6278272a514764615a31596b284b5c5c69766c3941294e27
65767166644a606de298ba74295a745a4b2e6c41437b4247724c38594f2d7155256e2041382f377b74693268493b5c22685c6e5543236d3a683d557b
505c22593945566e374b23575f286560276137503e53596f425243332a206d6244555c6e7156677934342d626777325b2f5924776f28402b7c5e704e
2c735c22334a5c226642505b427d5f42585d735d7c2e733c5c5c4d50374f42615a7d60435954744936253e665d5b6a7a7b7b393b5be298ba7e36723b
752d786c4536e298ba5e64214577545c5c695a2f6877657725474d3d41363d6c467439367237697553384478424a3b4c6825335c6e692c4c68784e52
6f5d742651482d444745537539707b746b5c745a513c4723234a6a665038525e2c795053435c5c4b3f7661212a4657e298ba3b5c6e24207874364d64
416c272a7b675c6e362626797737762d713f793d395860275c746d5f4363557c453f5a2051275c745c6e38584b6b2e4e766128675f373ae298ba7570
6d6124265c22705c746d2849607ce298ba29505f665c745050475c22215146275b77325f52e298ba2b293960507a65303148e298ba21275d606f7256
695e7e6658382c6f687b7b6b5c6e694e545c6e28337149364b43502e532f7b555f376b6a2821645754736a6f68343741752c237c72524d532b2be298
ba6e4f725c5c6637212b5f3e287b77495230502f73747a70523a505d504b623823443e4a3a275140502e7d33327b4f406a5b49684b6c616865762369
5e6e4225585c5c7e7b43545f6c3a375929354830282449364b582d246f2c37353a45333c51585a3944363d5c22603a79777a6e3c7de298ba212b3560
36654a3e4d767a675f4e413a5f637b32336541614f744b4577663e4c207b30585b3b6e722f35322c583d6a6031415d6d58345c224c726c4f5d25597b
733240534f72724a682a4f2b563e5f2c2b7a575c222a7b5c742766742f6839712429322a6a427e7c6c4b24532e4226545c74555c6e5c5c442c515339
7360436c29703f533c72492d515760477957736d20735d2d274642277875725e3e3d6771454172293a27417053286b2136665650683f6d38742b6b39
6531796932707b4c6439675b597c655a4454405d5a7e28334871646b6756616e5a45617167417c3023643829402d775c5c60594e5c5c327868447734
5a396c237227642a677e5c6e797367586c362c4d323e5c5c327e303667566a64545c6e5c744c3f495d4c683228642026602b53484543294e41515f3b
72404c4c66642b4d206e602b75656d6930564f3b6d4235525a557c3872392e596734635f566c6a37514e34647959566e5c6e6c725c7467615a383974
765c226f4d23297d79212934316525293f357567483d793c6f4d5c5c472a5c7426513d23232c593a745b4562406e247c3a2c3d2b43445c74252b753f
32555c743b324b32675b3c746e3b46445c5c315259247d492572713a46347a3071765e60556b585932776a64365a527949416a78752556496b606e28
3c6a284a736f4d4d79562c475d726b673238e298ba3d21583a462133732f71706660756c595c6e512770514a49347852313f5b5938765e545e77467c
3978603c4f646b365d54367b694559495c6e6c233c284166252a6f45457d4a3f6361607d40384e3d466e7566367e543c452177687d66677e5a2d5956
4e2d4b574c3f60756ae298ba5767774de298ba71733b4739686059456851324e4f3c687a545a73717e33367056592e232c263c546f6a562f3f44635a
547c7d273e306f413b642d78536a247b344924543f572c4b365c6e606e5c6e626d36395765713ee298ba2d4567775771e298ba3823424e754545516b
217834e298ba2576785c745c22382d3e5c74746246325755626c7d484e512423394270665c5c605936726b7a43716929503929357478634736452725
7120365c745c6e5646676a38696a5c74414c3f545c745445356c4d49246e4448695c5c52243369535f33242a7a784040776e577c32532e6942577139
6a5c5c5d59642c51644d2a437964586c345c6e6b68256c2d393f5a656a55307a36703f5c6e5549e298ba243e4867287830355c744262415c7421353e
38694157753f744330214e6e2f362d57737b593d3973402c2b347c566176463a44623729546c23644249457b624e5723745258373c2b322b5234596b
21353b4739357a674c5b7e5f65526f68412939467b2f4e3c786c39783d736132215c5c675e48285a683c3f262a636f36395f764a6a5450373475766c
294c5d77453d4455746f69505274754a722b5b2e5d3a5c223f3e7d3d287c35447959727250397c50327d575b787823726c764f4b283c4854325c7443
79562b2b255f64482f3fe298ba7a7d3437665c22565c227120215c2252592f2035597565e298ba606e594f536961454a34653d4651777e6c5c5c6c27
2566525f72483058296c5c5c335e35215a37525666507c594a3b397556434535276f532178304e415741216d264c266f3d2f783f6f7b6f5c22354c5a
222c302e34303537343539313638313438373332365d
```

#### String form

```json
["QB<jk_nlFjr7☺[mbr.s]hWSSCa=r,?U*3J/}9|ab_6WD,kjhI.W1EqJ!\\NgG)F*6b;V☺DK;dEug/sL: ZvJ)a9(1qB|tML}5!PU4+,%Z2k`Ja0M_yNz;|Wi8z#Zi%z<xvf8P\"['rJ<IiDf-u\n,7&@=\"jVxjf]{=bftA-Sb^+NLs((4ZNJS[*@,cw*5RWWa☺W^e@4dzxdhI8U&6QL|uThdy2ivJm8`.asd*z,F[E3E>>f4uRD7j\\Tzs%Pg%]rp%/68EC|nGDT9\nSBYH:6[YQ\"UGD[|^IGnB~q{☺dLw\\2aRV`l|P/etB;It5{81pV`8{!3i&HH:$R*sy\\miHN\\^KJibZd\\QZl\nVy%rP)z_\n@Ql>}kt`QB7d\tL`V59qL.\n89L$0FN;\"CDCLxu?k'|S:ywF@Jn:\\|\t4WK\tm\\Q} Z-;l|HsTk@#zkJ{3{&xi~\\lfm1Yp%yxz-VfE6O>}%PttWO,p\"☺#R}}Z3i{}W~O\nNW1|(~b;Yv%o}@`7e<~cxr\\_n`t$mvB>qljiw<hw}3RCNogNK&JK'*-..['j/\\F-jBU!3OtOO4QAcy:☺)fLTQ}D=%a.7~bsi)d\n_>tFY~N/3r;\n_ qygop.2hh\"xD(S#jB6aPbZGO_%wVD8p6Cm&Qq/.=oMS/l48T$rBrD\\n[3B}m☺Myx,aDt\"MV2\\ulrr6le:o{☺?%c/!kv2?XeRQ)CP%:Qz>d`7\\#\\q]R42i$Jj>D|j*!W]-MQ@E(HVJh|\"/fj)+BYu%+'}pT3M)J)gv3s,:X'atI<5m22`OEg(t4Z5u7L|{M!o)Adbp%BCi3`8M(a_:?mP=FKqmCn#eFf475G!\",☺d?84\tpHnlkj:(oR☺=:L&^@m,]:-C[?.)!-w~faU.#X'G4gZ FFk'vCg|;z|0AC6)'9tGrWcm4[hSK\\ux?CPWlKG@nC~v(WiHU&M[ci:47@&8R\t,i<2|'sS/\"<Uz3Am=MsGP&lK>):3$-JsE_QT\\u`\nex!6ypyC<\nK9E9t(tp\t*B\"&nU19R yh5C4Dkm;HI\\/E`r`$eN}@6!QapWM0lc[nVe<`4O W&/w/\"(=3&.8n|,-6U}!cB\tome5Iv2V\na4mw<<Hl`gV0-r/+|_k/aag7OE☺tr gqZ3gO{7Y(J|J*kF,{/+9(\\>@J-({WtOpqS)S>o(|^\t~m6Uf+DrMx?=l2AA_UbZY9P-vS\"5{[X7k1x!m%@KHoIZ`+#☺\tI6h+I/fs%W\\(`E/K27AY}AcKO_lB`7axH/7\n=F#9Up3666m1,_3cb`dq1-Ed.mw&re\\e'$O☺;(r-v\\>tM/Efh?~'u\"*/J@3)KS3v_;A5U^ZTk3l}~A;$|U'TD#^Ym^5Bl!irwg\tm)z]_☺☺DrYK|.<_FjkLc:8;pgyO&\":heiy{SjvM({_7c8b-Hefj_YaM0b]t4 QTUu`6@g)VsTua)☺lU:<if~$XH#\\CdgD\nFNaSX3G^0n *v\nH:B>V/*^s+7ZI<[B",1.6722372839483426,{"/":"bafkrgqefzlaixy5jkcicrcuoh7bhasuyrioovuz56xhcvmdahlv2mhzar32qfgxtjyqcttn4lala7ajzckqfinjirpl2ma43pwlzy5ouullv4"},4272938950376769,{"/":"bafyrgqduyszbysvu5nraqyzr6ed3br5y4ptepllxh4dftqoisdysxdobqefl655qxek66m3sdb4syrs3lndqeiefaqmlkvwzp55y4qhfgt3eo"},"TyaXD?(a783YWxm\tnQ>>iL2vsIPb<1dx'B!kQe8iisa/I\\\"z☺KRY\\OK%ra2zt.5EKz&i|j!Oy9☺s?9bUZ^Zzbp4p}a\\=jX@Ra☺z?\"jk\"A\t'>l_bx'*QGdaZ1Yk(K\\ivl9A)N'evqfdJ`m☺t)ZtZK.lAC{BGrL8YO-qU%n A8/7{ti2hI;\"h\nUC#m:h=U{P\"Y9EVn7K#W_(e`'a7P>SYoBRC3* mbDU\nqVgy44-bgw2[/Y$wo(@+|^pN,s\"3J\"fBP[B}_BX]s]|.s<\\MP7OBaZ}`CYTtI6%>f][jz{{9;[☺~6r;u-xlE6☺^d!EwT\\iZ/hwew%GM=A6=lFt96r7iuS8DxBJ;Lh%3\ni,LhxNRo]t&QH-DGESu9p{tk\tZQ<G##JjfP8R^,yPSC\\K?va!*FW☺;\n$ xt6MdAl'*{g\n6&&yw7v-q?y=9X`'\tm_CcU|E?Z Q'\t\n8XKk.Nva(g_7:☺upma$&\"p\tm(I`|☺)P_f\tPPG\"!QF'[w2_R☺+)9`Pze01H☺!']`orVi^~fX8,oh{{k\niNT\n(3qI6KCP.S/{U_7kj(!dWTsjoh47Au,#|rRMS++☺nOr\\f7!+_>({wIR0P/stzpR:P]PKb8#D>J:'Q@P.}32{O@j[IhKlahev#i^nB%X\\~{CT_l:7Y)5H0($I6KX-$o,75:E3<QXZ9D6=\"`:ywzn<}☺!+5`6eJ>Mvzg_NA:_c{23eAaOtKEwf>L {0X[;nr/52,X=j`1A]mX4\"LrlO]%Y{s2@SOrrJh*O+V>_,+zW\"*{\t'ft/h9q$)2*jB~|lK$S.B&T\tU\n\\D,QS9s`Cl)p?S<rI-QW`GyWsm s]-'FB'xur^>=gqEAr):'ApS(k!6fVPh?m8t+k9e1yi2p{Ld9g[Y|eZDT@]Z~(3HqdkgVanZEaqgA|0#d8)@-w\\`YN\\2xhDw4Z9l#r'd*g~\nysgXl6,M2>\\2~06gVjdT\n\tL?I]Lh2(d &`+SHEC)NAQ_;r@LLfd+M n`+uemi0VO;mB5RZU|8r9.Yg4c_Vlj7QN4dyYVn\nlr\tgaZ89tv\"oM#)}y!)41e%)?5ugH=y<oM\\G*\t&Q=##,Y:t[Eb@n$|:,=+CD\t%+u?2U\t;2K2g[<tn;FD\\1RY$}I%rq:F4z0qv^`UkXY2wjd6ZRyIAjxu%VIk`n(<j(JsoMMyV,G]rkg28☺=!X:F!3s/qpf`ulY\nQ'pQJI4xR1?[Y8v^T^wF|9x`<Odk6]T6{iEYI\nl#<(Af%*oEE}J?ca`}@8N=Fnuf6~T<E!wh}fg~Z-YVN-KWL?`uj☺WgwM☺qs;G9h`YEhQ2NO<hzTZsq~36pVY.#,&<TojV/?DcZT|}'>0oA;d-xSj${4I$T?W,K6\n`n\nbm69Weq>☺-EgwWq☺8#BNuEEQk!x4☺%vx\t\"8->\ttbF2WUbl}HNQ$#9Bpf\\`Y6rkzCqi)P9)5txcG6E'%q 6\t\nVFgj8ij\tAL?T\tTE5lMI$nDHi\\R$3iS_3$*zx@@wnW|2S.iBWq9j\\]Yd,QdM*CydXl4\nkh%l-9?ZejU0z6p?\nUI☺$>Hg(x05\tBbA\t!5>8iAWu?tC0!Nn/6-Ws{Y=9s@,+4|VavF:Db7)Tl#dBIE{bNW#tRX7<+2+R4Yk!5;G95zgL[~_eRohA)9F{/N<xl9x=sa2!\\g^H(Zh<?&*co69_vJjTP74uvl)L]wE=DUtoiPRtuJr+[.]:\"?>}=(|5DyYrrP9|P2}W[xx#rlvOK(<HT2\tCyV++%_dH/?☺z}47f\"V\"q !\"RY/ 5Yue☺`nYOSiaEJ4e=FQw~l\\l'%fR_rH0X)l\\3^5!Z7RVfP|YJ;9uVCE5'oS!x0NAWA!m&L&o=/x?o{o\"5LZ",0.40574591681487326]
```

#### dag-json CID

```shell
baguqeeran7koa4w73vwtwmwcoz2x5cfvyiqmu56du5gth3gvncq7jdcxpafq
```

#### dag-cbor CID

```shell
bafyreiczllyuhjfui5taiik35z743nflfa3owxgwcrpmknycsbfbd6tp2u
```

### garbage-10

#### Bytes

```shell
7b225c22223a7b222f223a7b226279746573223a223751597371637a4f6b743171516934677352492b6a2b496858307530334658394142515279434f
5763307a575a722b54684567454972555974586850566273613269314c7539384a69437a6b4373594f68356878696b4d592f7743654b544d50702b54
54566361785632594563675044723533496141386f66765553307a4c6538357a4862375a6e674450622f4c79686d54553545724d6235753579613353
64782b766f63576246715971526d694d6e757a39705658634d49352b3266784b6f586177744c4c2f66315133674b3349506850423479345571326b7a
7a4436336f707036314842494f3951746e4e2f56427938684b75763648396d6868376448776f584a6b444d3761513859667678577a64486c30302f6d
6e5261697053526f2f2f4969525769482b752b443242776e44787633496a4e777674447848586d4a7335625531785652777671496344515873745037
614358504b49723970662f534143703668714a3555504b43344f56622b6e435a4d56737257726f2b586251637068727a6a434c487945566366624e62
574e596b4a704f686f656c463768694167593062536b565a425a503364344d557959476d41686465645569647859677947394a78373277666a395532
34366a3465477665735037507244613549552f59416a525849355054646865695244544a676e654279315263677a49585a66763547515445502b4262
535772576c7744694e5655536b5a31666976434e332f30647368596b682f3272585a68476b3878344f50646a66514d707054686b544742374a42412f
356b453937564457516a6d742f667a39425a42353377667439632f6f33634c486a5745506a426e6a2f4c62474b4936634b7272684a31495238523953
744e5373654e6276485642733767634a56703650652b684c704e7176765767626c324c61344d7466636152476e792b3738444d79455a32526e572f56
784a5a7454486e6d4d594b61315768446653785a334651334465756b6c5a4f5462487766476c66515855524e6569546f69513978572b355152303142
54477751585441475548786942524d37495437744f76472b725457365530544f326433753672303256427877714f744a3673336b6a6775507174776d
6451736a714858754874484a4b384b68312b464a7971384e516d4f6251636c795632344c31317476584a686c4c736e5a307a4166656c38584f445658
3032664d436a386f756171494f7730534f76425559473232336f5641744a3845784d50587274674d4f334766324c796e3159645a6b31553264436977
417466557155657474355354537369475658386e56303241766f452f696c583075782f616e4478667446516c68535a46592f35764842574344414e66
64442b674a76506255335436447075306c79383862594e307961783867594771416b722f6a7078364e5250526e4c6e4b6d6a48325534545671337a73
6e526f33577848537277496c6f7779592b744446454c354d794954546c6f4d34634131376f61387577426643434d45586973535973635739664d792f
74553052366d336a2b6d3456554b423770395372566761785668334a4d6d697566343949466e6c416c536d61744358616f76526352626f55424e5932
77737933314a38587353664a46696c6655516e49582b785a4b4471653576694b3647776a485233456f354952737447536d79323078536752627a4877
6e5568302b33624c50505556586b7a7673445631385a316d4c414630484b52434a4834313457774b4a41486f3046704b6d3370436130766569397943
57476454635978784d5a4c32736f554869596134372b6c66754a5365457a4676626631584c4f6162753732754279354243776f56556c6d676d46614b
2f4a4248654b663852653277613935483056396a6e6a384873424a494a5137354a6f764b73447a4b47395974623941667634676542594f6e59656844
5458344f3048454468634a4444614d54583061414f374832765746325a665445506d31566d77337844687a4359724773435a6e6e3372663371774652
6c683373674b547734374568756a684556515268506c76354231336634766e436c745a3959344a38334c30554a506a6f4941676f546959574f664878
754178694b734d63716a4c674d59585363534a48516554655054335371667a6a7345656e4376522f77395436506f39617a4f77753255656f39495670
4e79597467702b6a363968753746743366744858384e6f53414e5875617a395769496a66584b38774c6c63646275375935465a412b75462b36454533
3064516d384e6f4f69452b46484a65415754343343694c383165764774642b7838594375335844345572484b354f44724e7a4836524c38527a563872
33737533684d6c7569746d6977524450676f47455765586f7441534f59596479585556767362586942637548654257324f58424437536479376a7644
5730305675786a53717a75395475536a2f43645566494c7364342f39794e756947556f59356563347035596535667667543875352b5a616f4f69377a
4d4551227d7d2c227b78382d223a225b475c2267743a4d393e5c5c464a54407d305274405d6954607e65323f516a7a5f684243205561602c755c5c5c
5c2d4a70382427343c537e27476e5c5c5b3741355f354d335f6e76775e587e4f4c7e6651566f634535683d5d6a377a5c742760342c5a61505c745a35
415d6d4458656b4c464f78393864373a32472b77585b5f7e20e298ba2a31705b284f682c352a6f425c5c60633230613f563974485c6e623241624a2a
7b2824617e377e634f505568243a2a4e7c254d5c742c2a393b42587737712d7778494c255f2e626f5b7b7144345c226b735d276b796c604a3d67634a
48444f7d4f72654b4820575952244025563020747c7a583e35664e5d754a5853645e53206d78734145736a68787d7d7a2a307877545935676d68387a
726e5240795c5c454f2f747453763d5c22622e2d443553794544363f55762735254476765c225d325125415c5c304378e298ba3732343d5e572b4859
683d613b785c2263717d75572a4a263a344147286e50515d5b6f377c647d3e6933502e5725257c5a323f3433643d513f3e593a554865316b74265e67
5c7459717563347b715c6e7e515f5244346b29292b2e6d654f3f7749693669593e272b73382d277b2c202462643125725d342a58314078447b637532
3d523a2531497762385429646e6d6b45597c7e3b5e212d38e298ba64745f2a5c7436257453763a6c5041735c226f3e5e266e5f6a403b574a295e2a49
6a272e795c6e514f363a645b255f274721353a5c22715551466f4d3764e298ba6b2665313b2d5c226a753e5c2244614374275649333a76742837677e
48474a625c5c732e4a76424f677a7c523e697662453c572a3773315461206b3e416c715f7c253950395c746d5c6e7b77743d7d5b2d2c63292e607b57
742c65385223642e6e6b77413a20785c5c3955242327527c3572514b49414e2558355c74e298ba5c7421653664455b3a603859406a786821544c4f65
5575292c667569576e5b2d60317d645c743a2e615e21656e4b7a7363456a72344e6b5b3b345c5c435f4940313a607a3e5c6e6f7d544b5c5c2835542c
7e676724272a4e703d26525f65595d3f392d244c20e298ba49424b777458626b6629355c6e4d59354c7561686e552e4e4f2323654a7524383a372c78
2b30735c5c677934427335244020212758e298ba6e60342432523330247b72335f2446e298ba76335e355b5a2c5f3b5d325959e298ba236850493841
59763041526a36637d626072415c74507739744c7b3c46644665303d315b74374a21294a6f2a25683d762d672c532f422a37e298ba5d5c6e5d5f492a
422469616c7677577178504f59642c2669316c4e665c22437b68243648426b3277245a2551443e5f6a4c2b5376647b49526025e298ba65596e5d795c
5c69505c74757a4e7d7e7a66682d3e667642257925455435216f702d6d79762f374329403a5c22334d2023283c3c5a4b3e7e3f435b6158672c6c492c
5d2d334e206c605a3f4d40366f6131706b3c61637370714d44396c3742727863522c28565a2e5c6e6c6c7051262f674825463c20316b62595c225677
4220637e39245d3028705c6e756e5c7438357e263046673e62502f5e2d33572947262c3b53677c3843572f7737604c34355c5c2e70305a437a612a5f
20617e264b3c785c6e26254a535d2a43406b635d6c442b757b5c6e5c6e426a36796e675c5c7778436d4e2631777363787c617966524d425d4d2f533a
645c7449236550764575663a4f492f713847523a736d7c4f5c5c3d252d623c6d32417751302e562d753d41455d366e7258452ae298ba21663527204c
756d77285e5961313d687043675c5c5977682467275c74705a6e494a6c6b21603973566f524652595a28725f4b25507259784f275234517471385834
24625c6e6f617e614f64347e78402c30246f564c696e367d306e56796e5c6e5b20253d454e3e7b4c77482e204258545e57756f725a24486f387b6a23
3e2b664b437b4e44645230476b6368642f71423a265852595079783c4c623f48282836584a602935704a2a4c7d762c584021285478257a4a603c4e23
343c642b484c356a674f2a4a63673735285c6e7d7c6e28374b46785578683b347e76437b744a6a5154407338443941e298ba7525312c5c5c696b4d6c
765c747a717b3ce298ba6c5a2359782c207020722f754d4333656c5c6e6d36247a3e6d6d263c344e4a35242d245f583a2731592a58635633265c7471
6a7b5d7277636968413e5d6e5f2468205c747d7e55776438412f60454e3b6d2d39534b2a35772023732663535123582f5e3332202934423e31334364
2b23212b4a2d257d655c2227214b6278263c7d495a532956377d6f2933215e3b754a69366e6143e298ba205e7c735c6e36e298ba5c223d302c763a74
2f58646a694b52633c4c747024545c5c605676267b67414b53672f2355784c48797962303f3663463c515a605159734f666a626448203b3521557d72
75447458434326533174543c433a5f466237675672217e725c224955656453493040402c322f3a3d51397627554f555742463d4b7c4f364f41425f77
2d5871466c6c64256d652f2630233c7761485c6e48252f2e704b73523864476d287c5e694a613e3a506c362b394e7c2e7b7861413072793d34242332
435367745c6e6f47203e202c5c225c2223374a4d742e77227d
```

#### String form

```json
{"\"":{"/":{"bytes":"7QYsqczOkt1qQi4gsRI+j+IhX0u03FX9ABQRyCOWc0zWZr+ThEgEIrUYtXhPVbsa2i1Lu98JiCzkCsYOh5hxikMY/wCeKTMPp+TTVcaxV2YEcgPDr53IaA8ofvUS0zLe85zHb7ZngDPb/LyhmTU5ErMb5u5ya3Sdx+vocWbFqYqRmiMnuz9pVXcMI5+2fxKoXawtLL/f1Q3gK3IPhPB4y4Uq2kzzD63opp61HBIO9QtnN/VBy8hKuv6H9mhh7dHwoXJkDM7aQ8YfvxWzdHl00/mnRaipSRo//IiRWiH+u+D2BwnDxv3IjNwvtDxHXmJs5bU1xVRwvqIcDQXstP7aCXPKIr9pf/SACp6hqJ5UPKC4OVb+nCZMVsrWro+XbQcphrzjCLHyEVcfbNbWNYkJpOhoelF7hiAgY0bSkVZBZP3d4MUyYGmAhdedUidxYgyG9Jx72wfj9U246j4eGvesP7PrDa5IU/YAjRXI5PTdheiRDTJgneBy1RcgzIXZfv5GQTEP+BbSWrWlwDiNVUSkZ1fivCN3/0dshYkh/2rXZhGk8x4OPdjfQMppThkTGB7JBA/5kE97VDWQjmt/fz9BZB53wft9c/o3cLHjWEPjBnj/LbGKI6cKrrhJ1IR8R9StNSseNbvHVBs7gcJVp6Pe+hLpNqvvWgbl2La4MtfcaRGny+78DMyEZ2RnW/VxJZtTHnmMYKa1WhDfSxZ3FQ3DeuklZOTbHwfGlfQXURNeiToiQ9xW+5QR01BTGwQXTAGUHxiBRM7IT7tOvG+rTW6U0TO2d3u6r02VBxwqOtJ6s3kjguPqtwmdQsjqHXuHtHJK8Kh1+FJyq8NQmObQclyV24L11tvXJhlLsnZ0zAfel8XODVX02fMCj8ouaqIOw0SOvBUYG223oVAtJ8ExMPXrtgMO3Gf2Lyn1YdZk1U2dCiwAtfUqUett5STSsiGVX8nV02AvoE/ilX0ux/anDxftFQlhSZFY/5vHBWCDANfdD+gJvPbU3T6Dpu0ly88bYN0yax8gYGqAkr/jpx6NRPRnLnKmjH2U4TVq3zsnRo3WxHSrwIlowyY+tDFEL5MyITTloM4cA17oa8uwBfCCMEXisSYscW9fMy/tU0R6m3j+m4VUKB7p9SrVgaxVh3JMmiuf49IFnlAlSmatCXaovRcRboUBNY2wsy31J8XsSfJFilfUQnIX+xZKDqe5viK6GwjHR3Eo5IRstGSmy20xSgRbzHwnUh0+3bLPPUVXkzvsDV18Z1mLAF0HKRCJH414WwKJAHo0FpKm3pCa0vei9yCWGdTcYxxMZL2soUHiYa47+lfuJSeEzFvbf1XLOabu72uBy5BCwoVUlmgmFaK/JBHeKf8Re2wa95H0V9jnj8HsBJIJQ75JovKsDzKG9Ytb9Afv4geBYOnYehDTX4O0HEDhcJDDaMTX0aAO7H2vWF2ZfTEPm1Vmw3xDhzCYrGsCZnn3rf3qwFRlh3sgKTw47EhujhEVQRhPlv5B13f4vnCltZ9Y4J83L0UJPjoIAgoTiYWOfHxuAxiKsMcqjLgMYXScSJHQeTePT3SqfzjsEenCvR/w9T6Po9azOwu2Ueo9IVpNyYtgp+j69hu7Ft3ftHX8NoSANXuaz9WiIjfXK8wLlcdbu7Y5FZA+uF+6EE30dQm8NoOiE+FHJeAWT43CiL81evGtd+x8YCu3XD4UrHK5ODrNzH6RL8RzV8r3su3hMluitmiwRDPgoGEWeXotASOYYdyXUVvsbXiBcuHeBW2OXBD7Sdy7jvDW00VuxjSqzu9TuSj/CdUfILsd4/9yNuiGUoY5ec4p5Ye5fvgT8u5+ZaoOi7zMEQ"}},"{x8-":"[G\"gt:M9>\\FJT@}0Rt@]iT`~e2?Qjz_hBC Ua`,u\\\\-Jp8$'4<S~'Gn\\[7A5_5M3_nvw^X~OL~fQVocE5h=]j7z\t'`4,ZaP\tZ5A]mDXekLFOx98d7:2G+wX[_~ ☺*1p[(Oh,5*oB\\`c20a?V9tH\nb2AbJ*{($a~7~cOPUh$:*N|%M\t,*9;BXw7q-wxIL%_.bo[{qD4\"ks]'kyl`J=gcJHDO}OreKH WYR$@%V0 t|zX>5fN]uJXSd^S mxsAEsjhx}}z*0xwTY5gmh8zrnR@y\\EO/ttSv=\"b.-D5SyED6?Uv'5%Dvv\"]2Q%A\\0Cx☺724=^W+HYh=a;x\"cq}uW*J&:4AG(nPQ][o7|d}>i3P.W%%|Z2?43d=Q?>Y:UHe1kt&^g\tYquc4{q\n~Q_RD4k))+.meO?wIi6iY>'+s8-'{, $bd1%r]4*X1@xD{cu2=R:%1Iwb8T)dnmkEY|~;^!-8☺dt_*\t6%tSv:lPAs\"o>^&n_j@;WJ)^*Ij'.y\nQO6:d[%_'G!5:\"qUQFoM7d☺k&e1;-\"ju>\"DaCt'VI3:vt(7g~HGJb\\s.JvBOgz|R>ivbE<W*7s1Ta k>Alq_|%9P9\tm\n{wt=}[-,c).`{Wt,e8R#d.nkwA: x\\9U$#'R|5rQKIAN%X5\t☺\t!e6dE[:`8Y@jxh!TLOeUu),fuiWn[-`1}d\t:.a^!enKzscEjr4Nk[;4\\C_I@1:`z>\no}TK\\(5T,~gg$'*Np=&R_eY]?9-$L ☺IBKwtXbkf)5\nMY5LuahnU.NO##eJu$8:7,x+0s\\gy4Bs5$@ !'X☺n`4$2R30${r3_$F☺v3^5[Z,_;]2YY☺#hPI8AYv0ARj6c}b`rA\tPw9tL{<FdFe0=1[t7J!)Jo*%h=v-g,S/B*7☺]\n]_I*B$ialvwWqxPOYd,&i1lNf\"C{h$6HBk2w$Z%QD>_jL+Svd{IR`%☺eYn]y\\iP\tuzN}~zfh->fvB%y%ET5!op-myv/7C)@:\"3M #(<<ZK>~?C[aXg,lI,]-3N l`Z?M@6oa1pk<acspqMD9l7BrxcR,(VZ.\nllpQ&/gH%F< 1kbY\"VwB c~9$]0(p\nun\t85~&0Fg>bP/^-3W)G&,;Sg|8CW/w7`L45\\.p0ZCza*_ a~&K<x\n&%JS]*C@kc]lD+u{\n\nBj6yng\\wxCmN&1wscx|ayfRMB]M/S:d\tI#ePvEuf:OI/q8GR:sm|O\\=%-b<m2AwQ0.V-u=AE]6nrXE*☺!f5' Lumw(^Ya1=hpCg\\Ywh$g'\tpZnIJlk!`9sVoRFRYZ(r_K%PrYxO'R4Qtq8X4$b\noa~aOd4~x@,0$oVLin6}0nVyn\n[ %=EN>{LwH. BXT^WuorZ$Ho8{j#>+fKC{NDdR0Gkchd/qB:&XRYPyx<Lb?H((6XJ`)5pJ*L}v,X@!(Tx%zJ`<N#4<d+HL5jgO*Jcg75(\n}|n(7KFxUxh;4~vC{tJjQT@s8D9A☺u%1,\\ikMlv\tzq{<☺lZ#Yx, p r/uMC3el\nm6$z>mm&<4NJ5$-$_X:'1Y*XcV3&\tqj{]rwcihA>]n_$h \t}~Uwd8A/`EN;m-9SK*5w #s&cSQ#X/^32 )4B>13Cd+#!+J-%}e\"'!Kbx&<}IZS)V7}o)3!^;uJi6naC☺ ^|s\n6☺\"=0,v:t/XdjiKRc<Ltp$T\\`Vv&{gAKSg/#UxLHyyb0?6cF<QZ`QYsOfjbdH ;5!U}ruDtXCC&S1tT<C:_Fb7gVr!~r\"IUedSI0@@,2/:=Q9v'UOUWBF=K|O6OAB_w-XqFlld%me/&0#<waH\nH%/.pKsR8dGm(|^iJa>:Pl6+9N|.{xaA0ry=4$#2CSgt\noG > ,\"\"#7JMt.w"}
```

#### dag-json CID

```shell
baguqeeraai6cp2lkcf3hyp565g6z4d7u7kqt2ma46pi6uv2bsvsbh4kzdbea
```

#### dag-cbor CID

```shell
bafyreigv3itfdn26cz7rfndmedrfrtk3dpn27hncdhsk6fv2dq5awwvhzu
```

### garbage-11

#### Bytes

```shell
5b6e756c6c2c7b2231223a7b223551223a323636373431313935343934373436312c2235677c223a7b222f223a7b226279746573223a226669414d31
367452727a50674962796a536338704555345a4d39376854466b49632b507463594e6273587848624b3944477a58384e786f547063536d66696d3530
445a487a755151476f68316e68657757595670474e566e533654392b59336a674b375a6e314f784a77385936616f6f3972417667386f32335171536b
494e5848576567715069476c6274487770702f595649416d4a68426a4f48444e55567a5675394d49796b7375466e4543564b70554d745259314c3469
2b51586450617946446364534b6a2f6e39663633532b472f5a7153342f42442b5a536d617556354f55767a7358447374744b4839554d6744684d7a4d
4648556c3977625347343637644e785237693157554663507033555a2f58694e7a6d54446573454b2b4e764c4362793532432b42655839517842784d
7442344e6871375239766c42417a364c4d44442b597a2f795931706f5269464f726c743456506a2f536f7435524a4e464d4c6f694b7245426b384c76
6c366d574255444878484b6574734c5948325975554d5a63744b546b6f646c4f39742f636f7a51416f5931544275684456354c53646d557a372f6d56
7a41433333796e2b32595234644f4f637574794e6338644663566f4a7161696e563937346766366574394349463036423375422b3231445665743267
4831535a776e664e4c585a736751746c736a4f516e554f39684c6a542b387549504f2b7565583165614366587a63384c305165764a2b7259527a4861
736870772f73776447565a4771422b5a6455557a566a523679722b516b456653507a41676e74454f47735a382b364b54637567435a5663434b753731
4f545a7235347963653335386d57435366362b4b4e504e444245687070717875634466593730413464614c64562b5a544a58565637524b5038746536
427a566d435434716f4773496a756654353373674b42432b7a32592b522f63684b6f4435616b47536850555346624351624c65684d7177345577776f
41366661514356694f575474704d774f6a2f73796c4270693564314763764e775a754a66324f53445567477633304737384b65527a5274654d644454
31462f466a66684d4c6a5573334b6a43534b3741475935334547524b3930716a537a7377546f6b777435722f63715136344a61793935487067584e62
627a51363873433569582f49643056476b456465445341727a425177514759484a2f6e59796a77773468516246336549644b3064744d30644c515a6b
4b59227d7d2c2246223a66616c73652c2259572f223a7b224a7d7e2b223a302e31313133383132393435393533393734327d7d2c2244517e2b5a7968
663d467d387d5b7a5c6e223a7b2259277d55586a3a397d2775523f60696f454946602e5576506c653c476853205c6e4548576f384435726460703771
5b4950294b7b2a577c2a7568393c4a3e585b5c226632792c5540324838364a7e472b2e3e487a4263255160645b245155777a5c2276e298ba474b5d7a
7e3e775e454026755430296160783268685c2242637654774e73277e742d406f66263a45622e75405240592c5f392b3a5c744d7e674f502e42306658
6c6b7c5231603b6a795f5c74567b5354472f4c2639426f5c22237471376e68377c312a382e5330697b3e5c6e3b5c74756c6b6d6476583e5c5c564031
387e6c456950276f50275c224f286e4159635e6572647e35243c4a4c773f70794d707c70746440695c223c2a7229733c66772d4c742670207368614f
2e532a206d334f6c7855464d2a207925785c22594c31706f2d533e5d214234772a5556677c7b4d3b68666c6c30402c21424e237256782960492f2f6e
2b773e736c7e2e3d5b28464b726377257d274e39276b6f7277467832654b39565c5c29505c74775c225c6e52544e2b2b3463545c5c3064443a772370
752c73726a5c74602d77766171223a5b7b223e55256f3423324f2d33626f505e706a36502b5c5c6d27223a747275652c226521223a7b222f223a7b22
6279746573223a226e49534946675149366875727237796b7064424c51452b437978744c464378754151414d7a4c586d7356573670446151346e4b51
6578366a7147745639506771664f424e65342b56424d65494b6d755533734e49307137747472347432307164444a6a4239356c684676693373705566
2f486b63734e536e61522f736d704b66433056394e56497041706d6f4c4d572b51635869497a4849706c344f424a5a4d74515058703368764f66377a
593375483332495543706972695237484c4235626f6f73442b4f71524e41516c4e6e494a4d6c414136704f705565787474706574493946483968765a
5541366b45533062464e6a7247353031506d6c6e6d7963326c3339775966667a3175636f526c364a4a714376337549666c666458227d7d2c22676577
2555625b206270223a7b22223a2d323634383435353636333631373931332c222e7e4e313b5a283a734277296a3b4e4a655c742ae298ba7b6d633861
3d6a5c6e385c5c6e764c29537d6f724d527833453b6449502c564e325a6b217e2d4f5d3d7d2660223a7b222f223a7b226279746573223a22227d7d2c
224669223a5b7b222f223a7b226279746573223a225952494c446f664a31724756624c4b544b624b4d653050654d626e674c3346346a332f37673972
2f7a37776b534f415066707943313051666d503347576437436d48314e792f4f56505a337777576c697370536e4d552f4e724279444b64784346645a
574b2f4946453358567a49436c326d662b6253786634327031656d6a63354465733061713157324254434a48343147362f536959565549714334515a
70364a444677617038386248742f54696661334c36532b77363651326b525a316a724c496e316f58637246322f4e38357039356a6669316252784474
73425a67302b7946757a4461614f7a38314f454642484b7466526e79596a6a796243767777512b54774f6a69647a4659494851546d33595a69304d7a
686b73703250634155444138484c6a704162344d786e5735745159496b355171394872546e374373587a6f564f33725645346c3745704f7633446747
6c492f71477354675667306277522b6b76717046466f574a4271474e70754e774559427475345357745565426e5536676834622b77454d2f4266302f
774f705252364968586a5552474a6b4371636e392f4533454b44704338384c5a46772b79694c512b694d5259684a6c355a4f66743753616e6e666152
48477a514a6f69502b312b484b474e484c6b334a436d6b78797a55467059504c614741786e77344a4b514a444e6e796a73662b32364a6b74382b4f38
6a4c344274617a74684a72512b5174352b4967227d7d5d2c224d5c6e547b4044343c347a223a7b7d2c22506647223a2d353531343634343638383934
393133372c227159223a226430485b6a314c54742d25425b5978333e745c6e6c647b233a565c22637e79262c512d577a42714579447d257e657b6959
3a53217459627067793e524e43e298ba4c475c74342b5e41285d5c5c5164343e21653a513f405e2055485f63545c5c222c227a36264d7342285b2461
715e5c5c656b6d5f3c76354d3d2620214034347b5c226d2b745c7452576a20476430436f643a482f6f596b223a7b2232565c5c25223a7b222f223a7b
226279746573223a224157384854326859776d4475384e366775544b6f30636f227d7d2c223c395a3f245957223a6e756c6c2c224453676329362e4c
203b4e2461282c2742686f5277793d31237d303b6845223a7b7d2c22563b223a224e592c3e254d283e382c73317e3e3c5f7541376a4270706c3c6035
4339755b5c5c7038552d3c204a6845322b3e5e54235c225939442d36314d2d616c5e23266259526b575e227d7d7d5d7d2c2248342475466d223a5b6e
756c6c2c223453332d6b346f25456a46605160295b2b6c70745e284167494c5824383b6f44524c6c6e5c746c3c43202b4b3a373c5a34383c4d56373b
74464c6e2a2f206038386a65693b61643a2f55496b2943202765465421714146475c5c6d5c7460205d67273d636529203b453b71682b2a6e2138254e
543a527125564d7a4d4f704062392b6d4e283255254e75436f493a43582d3e7d38483c642c7347635c5c775a26253f2c284f2e5c5c702e622c2a597c
744a6645e298ba4f45736a765171603575667e492d237837415c6e595a657468357e352d7d5b2b6e5c6e50564c3c336f3e204b704d5b32626b27335d
31346b246062552f4e743779677e6d316c2635285929637c424a46747e57483a33577c365d25525b5b41413e6a58324f69335972282436262a484231
2f7e2e276d42677c657e3552743d6f2d6a6c754f61574f6a72214b6f473f4f3c78262b524e28596f3c2351326e71392c5e393d3543372e417e4a7c29
e298ba24663e3a58657b395c6e7875267070494149395a355c6e7d797a2e596856783b2f5d602430443e5b3f2b6647642077284c51326e2e6f344937
5c5c476f4c367641273471683774292c31496660e298ba6b62495562447275725c5c5a465c22724770407657482e60234a7974637820415049785c6e
25547330e298ba407b6c673d4f5961757d777d4a5f495c5c7521402b404e6d5d2b67232f547e2a38367e7449515625e298ba5c226f5c2245325c2257
286a506e4e4252715d2771374a6d77247d485e513b37602a355575614a46502c486f443b2c654f6d2a2f2658232a4a435a5c6e265c22675c226c6458
7d37606c614e7739755a5854466e3e6c202162697e475b6d7963384961776b2569645c5c32763977414c2d7e782a713c2c6d59324c2e6c70454c5c6e
2824364074336a48473637312a3d3273324328647735542d72626e577c5d637c51445a3b2b27722b4f755878493b265c223f5a4c3b3f455e495d5831
52583025257a7b26732c797d3a52232c624b3c565e367c623f7b7c47372a67463a345c744e5b5d2630714535266b2a76633d57496d5820585e446c73
602a63406465547558e298ba7d255c6e265d4c263e6e697a66696e5d4e2e5c6e216955795c743f2423546b20762645373c78562d4c723d6d293c315d
71655d622e5a557d5c22305a627de298ba744a386e424a5d69406d3e75232b6a6c2b41507c43382c624d564c5e5177367b4b5b507e46745548494c52
5c2253612859715c6e5e7c736e55412531724857285153245b676b635c5c783a57277c263c6f543f26634b7c692f5d20502371543f6329304e6d376b
7c645c5c353a596d3368614b65335c747d43774228282f736635326230796c6d4862655a34757e3b622a543b764b36793e34653924436349515257e2
98ba507364587e2c384f4876594a51e298ba2f72204f6a5c222d72797828393f666f2d7474337e5d506b5c5c503a6a323359486f3273364c535c6e73
3e2a5c74316947543335367d5c6e32713a327c6a5a495e2f68535c745c6e40537329612c5e654523277d24273a4d787c705c22585b4f3e316b797c4e
7b743f287a6b746824775c5c5d3b6d7d3b306552454342486c2a45345c22515b31502d406a523b2a7e733e7d6e296036277d52533a4950632f5e5e58
7039545d76e298ba2a594b4b5859216c60644f6d5c224140305b27423e5b545b42466b426826755c6e29422d55296f3b6b7d36586a482e2d4d626557
5e4973562c2a346c2e402a2a422c562347702b5677203a7b3b4d306e7331495f4e2049625c5c457d685c5c3e6661244f43386567686a505c6e3a2030
407a727331255c5c2b4b7477563a393a405c5c5c7439652b48486225625d6c7243442d6b792852706a76473b5e5f4f2a5d7853743d406d53665d5d2e
674a56785546382a326f727743632e5d2f4466277a70243a5d7b5257385f752a517d3640273f5c74267a6c2d254e6b51346d277650214b4c715f436d
7545535c223a3f74513d583638e298ba775c5c366c6f373f6c662f2864287e596f5a78356f7d3524756f5c22677a707c23327364e298ba546636466e
427a6520377a3d3f73616ae298ba6e5c5c5473687c7063563e462e5d5c6e58544f2b39273a7d7d48773c382e46525e493b7b4c72432a202875794939
775c6e4b4a232c7159634d6c604e3f3d39563a6e49787e55506c3942354b2e396c3a2e6b3c5b6362207d72562356543e5b4f4d782a594e5451653d51
3a2e754a767c213760385ee298ba512c6b2a3370673e766f2b23524861696de298ba44706e3a6a283e537c2f615c225130446a38415c746f6c2a3e66
6b776b403734395a5e312827565e35354c4a5a73394d244d777e42766b405c5c3a523b3961322d5c5c347d7d685d4e625436432358695b386f5c6e6b
33705c744a3e4136242d35665e2e694a3a35383821426820504c4f2c2b4f373555606a405c744970406833772f595e2a4f282f483b392a62513b6d70
724831782a2139473fe298ba6552324e4b6d372668537e5e52633770263f2a44254448264724542e2d74404b2d514b493e4778276053493748377a3a
413c2331682c5231242a5421207353707c3d3c69427461433f3e525856263253464b526c29443e5d596c744a272b7521372a7133595b4a4b7575716f
6d6940333e6f4e6e4f394e3b746647545c5c5d2a6a46693a326d722c5c742d686357465c744c594e4b37344945434d2357427e78283f5964655c5c4d
535a7063364b466c2e5d46685a2448696464424e71376c665c5c3f5c5c50404059765c5c3f5e597e594c55274528346d6c3a7e7b5d6d67642c5c225c
74395043574f5c224723695c742f6d7e3660273434275e273c335f4c6123504159785c74663d66366b753f5b456d5a5c22483728543d62452079654f
5c22743e236a2c4b512939295c5c2d354b7a5a2a203a336732537e6252265648675c6e6c6b372827216b7d5167702b503c506974783d33635c6e6f34
275c74e298ba5e545733642b7b3f6c53355c5c7c3c20247a6856352e736a2a7c702b457c56766b33652a255c5c20212a78422c42463c6358525c6e2e
5f4942596d3767327d507e283e51527531396a6e59787a532642202e7364753b7d71773752575424466068774f7e6c7e734c35754d6c5c227c3a4640
5c5c322a23603f3151494c7526e298ba3854725e25495529404d6a7c3e667a2350344a57482b4c25674b3b4d55692b75516c2b265750656f33553925
6c212743275c5c752f323a6e335c747e4c6f7d64393c272539284b457141603358295a4e59332a2b7a583768695c74484129442679556b4727395533
342e5c5c205672456d6b577d443f3f73293d5d46734c614e34253138284b746b2e5c747e35355140482c6c56672b623d29392e32406b793374735f70
664d582d7b5e543b656620725c6e467c5273234f6e79764c445d612b7d6b26367b5a3d25207b5b5c6e544a2e54792774467c6e5877e298ba58294566
47647d6663385c6e51724a7a5f24666a516473773a642d58424b6075e298ba2d3a7050246e57492a4c657c564a62e298ba295136584d53383269643a
6a3b3653232073244a4d50545c224a5460556e415e2c662b27315c7432254c79402745436d5c22277334206e525a495c22245b387742515546395d30
3033236f3d356a60574646304e654f7b2435373a395863584a514d5a4129205c5c3a20376075485c74793b3f6455275333454a25517026305d3e543b
7a2c5147564c7b43607d2c3158657c5c22794c49685c6e45255e4be298ba7042502f24202c656757774f2320493f6f694d6e2e5b6155354931362e4d
674b355c6e7778435c22714871487625352c6e3fe298ba235c2270305130235e7035503b715029412e312466503d7b2657532c3d796e295933416f78
5f50323269383f5139795c7449613d2d76315f6f5762385c744f2a7848636b4a703c482438623a2367416d475a7c756938457b4f452456216b366958
4c576d5c6e726a7e7e615d4f6e4965436d4161e298ba774b75633f51685e294b6261262b2e2778337e207b61777c6a2173637a29696870725e554c39
6b534d5a5b4f61616828496a6b61335f4e3454264662754d7a652160345c74545a697c5a63534749702f5c744e4d335c6e5a502851705a324a713d34
776655383e3639573c683529312f6b2f5c74347a2e4164584f49613e4172362c3e7453625a61636c4246733e4b7e424435313f6e277e4823255a263c
4043776d4f646e41636e7e3d645c6e44382b603c7246685c22555c5c473d6f442c5a7674493f315361266033685f4b70307e292b6e3a7b732d5b5068
7a4d5d783f5e5676676b674a6d35576b6a7a606e503a3b4d737021665c7450693c3c5c22267d635c5c6f2f612c343c7175547c606642623a37745c74
774f4565316e69674a75237749534e216162363d7449657a55757c6c583a655c6e603d4e5f243f4b5a373f4f3d783b7469276d792849643c4f5c2259
2535545c745c2226e298ba4156505a4a465b41325d454d2f2d6843465e4e486a45376f584e79686057716e336576444355596662372a6f556a286f5c
227077656d797ee298ba3244524d5427215c2263574037752d73674a3e49576145706771775f2574296540554e725e4e36434e58482d24216047625b
355f5f69236f312a5c22215a404a7a516524505c2272395a4e5c5c6f7874673a4f396c5c6e5a4c465c5c345e38282d572b33317963647c5a416a603f
345c5c325b264737334d373e5a202f615b605a74526d4443304c51794f60767e4d72794b59252b216a2177327d4c595c22e298ba4c645d7350416f78
2a2457402b5f416b755c7454617e225d2c22495338223a747275652c225348223a747275652c22615e413836662c3a71202370525020223a7b222f22
3a2262616679626d6965707975683665687968797a73666461726579786f646a776c6d71356268367763666e6977713236676f616a37636e7a67736d
61227d2c2266316a223a66616c73652c22757a653558223a2d302e353930383132353231383237333931342c2276223a302e30343230303835333733
373632313935357d5d
```

#### String form

```json
[null,{"1":{"5Q":2667411954947461,"5g|":{"/":{"bytes":"fiAM16tRrzPgIbyjSc8pEU4ZM97hTFkIc+PtcYNbsXxHbK9DGzX8NxoTpcSmfim50DZHzuQQGoh1nhewWYVpGNVnS6T9+Y3jgK7Zn1OxJw8Y6aoo9rAvg8o23QqSkINXHWegqPiGlbtHwpp/YVIAmJhBjOHDNUVzVu9MIyksuFnECVKpUMtRY1L4i+QXdPayFDcdSKj/n9f63S+G/ZqS4/BD+ZSmauV5OUvzsXDsttKH9UMgDhMzMFHUl9wbSG467dNxR7i1WUFcPp3UZ/XiNzmTDesEK+NvLCby52C+BeX9QxBxMtB4Nhq7R9vlBAz6LMDD+Yz/yY1poRiFOrlt4VPj/Sot5RJNFMLoiKrEBk8Lvl6mWBUDHxHKetsLYH2YuUMZctKTkodlO9t/cozQAoY1TBuhDV5LSdmUz7/mVzAC33yn+2YR4dOOcutyNc8dFcVoJqainV974gf6et9CIF06B3uB+21DVet2gH1SZwnfNLXZsgQtlsjOQnUO9hLjT+8uIPO+ueX1eaCfXzc8L0QevJ+rYRzHashpw/swdGVZGqB+ZdUUzVjR6yr+QkEfSPzAgntEOGsZ8+6KTcugCZVcCKu71OTZr54yce358mWCSf6+KNPNDBEhppqxucDfY70A4daLdV+ZTJXVV7RKP8te6BzVmCT4qoGsIjufT53sgKBC+z2Y+R/chKoD5akGShPUSFbCQbLehMqw4UwwoA6faQCViOWTtpMwOj/sylBpi5d1GcvNwZuJf2OSDUgGv30G78KeRzRteMdDT1F/FjfhMLjUs3KjCSK7AGY53EGRK90qjSzswTokwt5r/cqQ64Jay95HpgXNbbzQ68sC5iX/Id0VGkEdeDSArzBQwQGYHJ/nYyjww4hQbF3eIdK0dtM0dLQZkKY"}},"F":false,"YW/":{"J}~+":0.11138129459539742}},"DQ~+Zyhf=F}8}[z\n":{"Y'}UXj:9}'uR?`ioEIF`.UvPle<GhS \nEHWo8D5rd`p7q[IP)K{*W|*uh9<J>X[\"f2y,U@2H86J~G+.>HzBc%Q`d[$QUwz\"v☺GK]z~>w^E@&uT0)a`x2hh\"BcvTwNs'~t-@of&:Eb.u@R@Y,_9+:\tM~gOP.B0fXlk|R1`;jy_\tV{STG/L&9Bo\"#tq7nh7|1*8.S0i{>\n;\tulkmdvX>\\V@18~lEiP'oP'\"O(nAYc^erd~5$<JLw?pyMp|ptd@i\"<*r)s<fw-Lt&p shaO.S* m3OlxUFM* y%x\"YL1po-S>]!B4w*UVg|{M;hfll0@,!BN#rVx)`I//n+w>sl~.=[(FKrcw%}'N9'korwFx2eK9V\\)P\tw\"\nRTN++4cT\\0dD:w#pu,srj\t`-wvaq":[{">U%o4#2O-3boP^pj6P+\\m'":true,"e!":{"/":{"bytes":"nISIFgQI6hurr7ykpdBLQE+CyxtLFCxuAQAMzLXmsVW6pDaQ4nKQex6jqGtV9PgqfOBNe4+VBMeIKmuU3sNI0q7ttr4t20qdDJjB95lhFvi3spUf/HkcsNSnaR/smpKfC0V9NVIpApmoLMW+QcXiIzHIpl4OBJZMtQPXp3hvOf7zY3uH32IUCpiriR7HLB5boosD+OqRNAQlNnIJMlAA6pOpUexttpetI9FH9hvZUA6kES0bFNjrG501Pmlnmyc2l39wYffz1ucoRl6JJqCv3uIflfdX"}},"gew%Ub[ bp":{"":-2648455663617913,".~N1;Z(:sBw)j;NJe\t*☺{mc8a=j\n8\\nvL)S}orMRx3E;dIP,VN2Zk!~-O]=}&`":{"/":{"bytes":""}},"Fi":[{"/":{"bytes":"YRILDofJ1rGVbLKTKbKMe0PeMbngL3F4j3/7g9r/z7wkSOAPfpyC10QfmP3GWd7CmH1Ny/OVPZ3wwWlispSnMU/NrByDKdxCFdZWK/IFE3XVzICl2mf+bSxf42p1emjc5Des0aq1W2BTCJH41G6/SiYVUIqC4QZp6JDFwap88bHt/Tifa3L6S+w66Q2kRZ1jrLIn1oXcrF2/N85p95jfi1bRxDtsBZg0+yFuzDaaOz81OEFBHKtfRnyYjjybCvwwQ+TwOjidzFYIHQTm3YZi0Mzhksp2PcAUDA8HLjpAb4MxnW5tQYIk5Qq9HrTn7CsXzoVO3rVE4l7EpOv3DgGlI/qGsTgVg0bwR+kvqpFFoWJBqGNpuNwEYBtu4SWtUeBnU6gh4b+wEM/Bf0/wOpRR6IhXjURGJkCqcn9/E3EKDpC88LZFw+yiLQ+iMRYhJl5ZOft7SannfaRHGzQJoiP+1+HKGNHLk3JCmkxyzUFpYPLaGAxnw4JKQJDNnyjsf+26Jkt8+O8jL4BtazthJrQ+Qt5+Ig"}}],"M\nT{@D4<4z":{},"PfG":-5514644688949137,"qY":"d0H[j1LTt-%B[Yx3>t\nld{#:V\"c~y&,Q-WzBqEyD}%~e{iY:S!tYbpgy>RNC☺LG\t4+^A(]\\Qd4>!e:Q?@^ UH_cT\\","z6&MsB([$aq^\\ekm_<v5M=& !@44{\"m+t\tRWj Gd0Cod:H/oYk":{"2V\\%":{"/":{"bytes":"AW8HT2hYwmDu8N6guTKo0co"}},"<9Z?$YW":null,"DSgc)6.L ;N$a(,'BhoRwy=1#}0;hE":{},"V;":"NY,>%M(>8,s1~><_uA7jBppl<`5C9u[\\p8U-< JhE2+>^T#\"Y9D-61M-al^#&bYRkW^"}}}]},"H4$uFm":[null,"4S3-k4o%EjF`Q`)[+lpt^(AgILX$8;oDRLln\tl<C +K:7<Z48<MV7;tFLn*/ `88jei;ad:/UIk)C 'eFT!qAFG\\m\t` ]g'=ce) ;E;qh+*n!8%NT:Rq%VMzMOp@b9+mN(2U%NuCoI:CX->}8H<d,sGc\\wZ&%?,(O.\\p.b,*Y|tJfE☺OEsjvQq`5uf~I-#x7A\nYZeth5~5-}[+n\nPVL<3o> KpM[2bk'3]14k$`bU/Nt7yg~m1l&5(Y)c|BJFt~WH:3W|6]%R[[AA>jX2Oi3Yr($6&*HB1/~.'mBg|e~5Rt=o-jluOaWOjr!KoG?O<x&+RN(Yo<#Q2nq9,^9=5C7.A~J|)☺$f>:Xe{9\nxu&ppIAI9Z5\n}yz.YhVx;/]`$0D>[?+fGd w(LQ2n.o4I7\\GoL6vA'4qh7t),1If`☺kbIUbDrur\\ZF\"rGp@vWH.`#Jytcx APIx\n%Ts0☺@{lg=OYau}w}J_I\\u!@+@Nm]+g#/T~*86~tIQV%☺\"o\"E2\"W(jPnNBRq]'q7Jmw$}H^Q;7`*5UuaJFP,HoD;,eOm*/&X#*JCZ\n&\"g\"ldX}7`laNw9uZXTFn>l !bi~G[myc8Iawk%id\\2v9wAL-~x*q<,mY2L.lpEL\n($6@t3jHG671*=2s2C(dw5T-rbnW|]c|QDZ;+'r+OuXxI;&\"?ZL;?E^I]X1RX0%%z{&s,y}:R#,bK<V^6|b?{|G7*gF:4\tN[]&0qE5&k*vc=WImX X^Dls`*c@deTuX☺}%\n&]L&>nizfin]N.\n!iUy\t?$#Tk v&E7<xV-Lr=m)<1]qe]b.ZU}\"0Zb}☺tJ8nBJ]i@m>u#+jl+AP|C8,bMVL^Qw6{K[P~FtUHILR\"Sa(Yq\n^|snUA%1rHW(QS$[gkc\\x:W'|&<oT?&cK|i/] P#qT?c)0Nm7k|d\\5:Ym3haKe3\t}CwB((/sf52b0ylmHbeZ4u~;b*T;vK6y>4e9$CcIQRW☺PsdX~,8OHvYJQ☺/r Oj\"-ryx(9?fo-tt3~]Pk\\P:j23YHo2s6LS\ns>*\t1iGT356}\n2q:2|jZI^/hS\t\n@Ss)a,^eE#'}$':Mx|p\"X[O>1ky|N{t?(zkth$w\\];m};0eRECBHl*E4\"Q[1P-@jR;*~s>}n)`6'}RS:IPc/^^Xp9T]v☺*YKKXY!l`dOm\"A@0['B>[T[BFkBh&u\n)B-U)o;k}6XjH.-MbeW^IsV,*4l.@**B,V#Gp+Vw :{;M0ns1I_N Ib\\E}h\\>fa$OC8eghjP\n: 0@zrs1%\\+KtwV:9:@\\\t9e+HHb%b]lrCD-ky(RpjvG;^_O*]xSt=@mSf]].gJVxUF8*2orwCc.]/Df'zp$:]{RW8_u*Q}6@'?\t&zl-%NkQ4m'vP!KLq_CmuES\":?tQ=X68☺w\\6lo7?lf/(d(~YoZx5o}5$uo\"gzp|#2sd☺Tf6FnBze 7z=?saj☺n\\Tsh|pcV>F.]\nXTO+9':}}Hw<8.FR^I;{LrC* (uyI9w\nKJ#,qYcMl`N?=9V:nIx~UPl9B5K.9l:.k<[cb }rV#VT>[OMx*YNTQe=Q:.uJv|!7`8^☺Q,k*3pg>vo+#RHaim☺Dpn:j(>S|/a\"Q0Dj8A\tol*>fkwk@749Z^1('V^55LJZs9M$Mw~Bvk@\\:R;9a2-\\4}}h]NbT6C#Xi[8o\nk3p\tJ>A6$-5f^.iJ:588!Bh PLO,+O75U`j@\tIp@h3w/Y^*O(/H;9*bQ;mprH1x*!9G?☺eR2NKm7&hS~^Rc7p&?*D%DH&G$T.-t@K-QKI>Gx'`SI7H7z:A<#1h,R1$*T! sSp|=<iBtaC?>RXV&2SFKRl)D>]YltJ'+u!7*q3Y[JKuuqomi@3>oNnO9N;tfGT\\]*jFi:2mr,\t-hcWF\tLYNK74IECM#WB~x(?Yde\\MSZpc6KFl.]FhZ$HiddBNq7lf\\?\\P@@Yv\\?^Y~YLU'E(4ml:~{]mgd,\"\t9PCWO\"G#i\t/m~6`'44'^'<3_La#PAYx\tf=f6ku?[EmZ\"H7(T=bE yeO\"t>#j,KQ)9)\\-5KzZ* :3g2S~bR&VHg\nlk7('!k}Qgp+P<Pitx=3c\no4'\t☺^TW3d+{?lS5\\|< $zhV5.sj*|p+E|Vvk3e*%\\ !*xB,BF<cXR\n._IBYm7g2}P~(>QRu19jnYxzS&B .sdu;}qw7RWT$F`hwO~l~sL5uMl\"|:F@\\2*#`?1QILu&☺8Tr^%IU)@Mj|>fz#P4JWH+L%gK;MUi+uQl+&WPeo3U9%l!'C'\\u/2:n3\t~Lo}d9<'%9(KEqA`3X)ZNY3*+zX7hi\tHA)D&yUkG'9U34.\\ VrEmkW}D??s)=]FsLaN4%18(Ktk.\t~55Q@H,lVg+b=)9.2@ky3ts_pfMX-{^T;ef r\nF|Rs#OnyvLD]a+}k&6{Z=% {[\nTJ.Ty'tF|nXw☺X)EfGd}fc8\nQrJz_$fjQdsw:d-XBK`u☺-:pP$nWI*Le|VJb☺)Q6XMS82id:j;6S# s$JMPT\"JT`UnA^,f+'1\t2%Ly@'ECm\"'s4 nRZI\"$[8wBQUF9]003#o=5j`WFF0NeO{$57:9XcXJQMZA) \\: 7`uH\ty;?dU'S3EJ%Qp&0]>T;z,QGVL{C`},1Xe|\"yLIh\nE%^K☺pBP/$ ,egWwO# I?oiMn.[aU5I16.MgK5\nwxC\"qHqHv%5,n?☺#\"p0Q0#^p5P;qP)A.1$fP={&WS,=yn)Y3Aox_P22i8?Q9y\tIa=-v1_oWb8\tO*xHckJp<H$8b:#gAmGZ|ui8E{OE$V!k6iXLWm\nrj~~a]OnIeCmAa☺wKuc?Qh^)Kba&+.'x3~ {aw|j!scz)ihpr^UL9kSMZ[Oaah(Ijka3_N4T&FbuMze!`4\tTZi|ZcSGIp/\tNM3\nZP(QpZ2Jq=4wfU8>69W<h5)1/k/\t4z.AdXOIa>Ar6,>tSbZaclBFs>K~BD51?n'~H#%Z&<@CwmOdnAcn~=d\nD8+`<rFh\"U\\G=oD,ZvtI?1Sa&`3h_Kp0~)+n:{s-[PhzM]x?^VvgkgJm5Wkjz`nP:;Msp!f\tPi<<\"&}c\\o/a,4<quT|`fBb:7t\twOEe1nigJu#wISN!ab6=tIezUu|lX:e\n`=N_$?KZ7?O=x;ti'my(Id<O\"Y%5T\t\"&☺AVPZJF[A2]EM/-hCF^NHjE7oXNyh`Wqn3evDCUYfb7*oUj(o\"pwemy~☺2DRMT'!\"cW@7u-sgJ>IWaEpgqw_%t)e@UNr^N6CNXH-$!`Gb[5__i#o1*\"!Z@JzQe$P\"r9ZN\\oxtg:O9l\nZLF\\4^8(-W+31ycd|ZAj`?4\\2[&G73M7>Z /a[`ZtRmDC0LQyO`v~MryKY%+!j!w2}LY\"☺Ld]sPAox*$W@+_Aku\tTa~"],"IS8":true,"SH":true,"a^A86f,:q #pRP ":{"/":"bafybmiepyuh6ehyhyzsfdareyxodjwlmq5bh6wcfniwq26goaj7cnzgsma"},"f1j":false,"uze5X":-0.5908125218273914,"v":0.04200853737621955}]
```

#### dag-json CID

```shell
baguqeera7ysla3cvb5j4znemisd4nj7aucaamc3k7bgahptsoxe73kwen46q
```

#### dag-cbor CID

```shell
bafyreiejnkxl7w7b6lki2xkle6kej277tqp4nbjzi2f5wbc3yntd23a52q
```

### garbage-12

#### Bytes

```shell
5b7b222f223a7b226279746573223a223061572f7563766c4b735174586634534c4c764f416c2f464747536342527645484f49346a43313341373655
6963795366472b6b4a35704a55782f526157704b4e7552516167585765346d72636b344a78507a4b565072367878474544706f5678764e5577692b31
394c576d77616f41756a416e707739727442514e4c6c496e7339786351384258476b69777564765350412f337975624c6c6f74387472796d4e5a7a56
484d523234685a78726643692f51702b64496b704b6d6e4a43777433306575436c48674175656f6e472f2b334b686173526f34307139796d71635242
585136312f6537784c2b7765565365366a676478394c4a634c753776306f4a6868494c6647556d5a4e744a3673706b6f32574f614f79767747733673
67614d514c5a6a7267396733367059504d746856774f6a78305931482f373436354a67744a53386a4d2b612f703244554b4a664f6b454c5674736a4d
782b79724336647a37643267476548584e2f3261375551385970302f473446414d4e7a527334326436626434596a4e53793655797247736351377870
44565a3747736156784153645133456c315a655447454f7542542b7a492f3350445a716650766c444d48484d5764664c53487643307a586a5842362b
456252584266476b38703170764957584b4e78724f4d5066724b6c7965434c757774356b4142624f67634a7568785643726173674467465342715356
34616a4352556f75786b43707859536a7a4f517938305a4e756b726d31494176315346774f654f6635644c46372b6257556f677936675853452f5952
43346e576e516241446e693338653278593261524d2f6e6836667242344c36776e38646f734339636d4b4b6f4e4f5966764a5169366a434d464c2f48
735062344a455864433643592b624c2f637a41424745336a4e537936337a796a68544e495079774e4833784e56694f365943716b52547434314e7659
654d67717a682b324a6b2b64544855553149672b58453975357069746c77316d4467512b48396739384d677742566d3134624f3645665539726f7462
37314777496970774a615a7767672b565338694e57326b38484b36677050412f6e35376b42724979396e2b48426237727377696b6447567831427436
6467464a476c77516970764362425569434c4c5174356c2f4c524e653436344c5936417156754258356462734b634a4f4c782b785a7249474e7a785a
2f5247746b324a766b4d586271774b704b747143794d6159597256546f57723268544c55472b325934566f5746327864556f7a464479366f4f756b62
566f58642f4148466d6e77656256362f6751445a535851664730446c66694f7171694c655a56316c4a376f5947524a7332376c6b6f30374f58754236
39784c544d4342354f7976446c544e354a5a6c46536a624474544a633762446a4d31445931586b3161467352776c774c38612b44664a2b6f55355365
48726a44314c6153414c415176676c6b5468724175496878397266366659433362347273544b754f43776758712b4f4e6e62412b7551396e37304d6c
6f6b745147372f64596b4c33786c795175464546634762616a6476754b355155746f682f784c7554634239766d766f6569426a505236414946536665
4a36784341706443364f6e4d396b427a4d434a34596f304f395677745236574958554a497135487871593958333332726d56383574512b2b4766582f
61516b53775256492b45547935596243534157427a53516d736773526e2f6b6844696d724663696d7a64366b39554f767859724c537173474c74794a
6549706b52756353535650684654397362396b48496f625434714c667a4b435032654b464f397754394b47657a597a3150644b52572f364f59796571
6772357531363773634453382b3151733451695136557159476773712f716c65512f617249724753524553707332506a59634b4d61424932374e2b7a
4e777571656d706b6279336a486a745155526836464d304134415a5151576b545931444963595a565930634d72556f53474b65707a7a39507479574b
744b546d774d2f436b594a446f426e523437545343486e5133736957475762563177695a65635a7a42755851466f7671324f497831756b5556762f2b
4d6c5454334132434f693567655331386573315273574c4a3637473530616675484f442f37625a4b32483844476f5963686155725967756c75396d55
796352673730545a4439512f7935507048322b306a69664b68465065454e745247424b6f7530694f504d397a4c395a7279656e33355147676438307a
3551424c6f6d742b6d4f714752756a684a666d4a36543238764146436d725a725267552b375143344277454e73376f344d5a724a396a655957614b31
325565496f2f713246377a4b30764f724233646e51433753415a39776b6e4577517449563533727437367743776745525350672b3071774f4a344d6b
612b686e667a4c6336384b68447544724b6b33646854776e464b4d694d7a487734502b646e51306737656b2f466e634731412b734b5a6e446f4f7472
692f7a4e704a437a37654753557744354c74773735336145614b4e785933795374466374554e6d6b754f52486e397558466759494b46675463626256
77516b583033766875676e6e5730476b6f7270573562596e464b7559587850714a51765732343439664d444234374365427673466855615746726331
44574d2b492b6f4654572b44554645335a43374277514c2b6b72695677683045336d4f666833374c715345425867583833364d6a6376305872617735
47786439414638354a4969444f2b6d7a34566f6335346e6f2b70467930383738433869374c6562586e363843596f336c594e4d6b692b436334775066
6c4e4f424c41572f2f633737465339435534354337755757376f3468796f5279437a58525777774452336d5078705376724a45656d6d2f3652784932
6b495631717a2f4e4c4d652f766351663248494a766e396d596f2f4d5a734b477231713279644a5850456658475a7a716c6c564f4f4e57425a626438
4b554a41376b43415175495579643841455367376c76686134795871745a463055675342466d5461363339574f6c49465777642f4268654575586268
705437452b646c69432f7a2b335873466966452f68347a344a345067396576686252366d425a455536686e3959475a7464514a336561326450454b4a
58307a4762723563514b49376e332b56792b726c66584a647645483747535a5978585749446d62554c325958435439562f664d474b4b7a6871736559
446331627259754c597438576876684b584878516569414f4b4944784d77366d6c7831626342763367687931544d4d6b6c6f37513578727370796a6f
6c744b6c71462b2f346d786c4379337832474c346c7659694b5866554a664c37632b6a54766f64724947674336627a6431414a617667503937774f34
6443796d42632f356c39756b644653756c514735654c533353675a4c414b6c56347174375161755a526638396e7244756e7366764936365049524338
465a644b692f467955797069574167316978596d792f4748565139467050424b31584e7854656977546834554e376a347071647158716b5236775774
654d797045325a712f444862496a677247595352636d662f6b75357071747672505774527964564c34446c5a52335439316b7049666752494553464a
494374524559684e53582f59347179573975534235597954484a7a536f41476c524f354e6c504c6f4f5952692f7261416c503362627034524e5a4233
6f5057644b3148536d32633243514e677a4b6562494c30654c46316667414e7556766e2f77566e46326a4174316e5836444e42766d2b616337713952
4b3177536262594c3643575932415570793451416742656765634b582f47753443446d6e4b544162714678394161344d71596f582f74463736746b4e
5a43765a727539326665586f6e546c65674743356f4f53535a4932486e4552414b55544d3341357a4a7652685636306e63626332396a5631452f4575
4c537a4c705971537176566a592b3673446e6a2f49596a36393149312f644a7237703446714c4542385670466c736677623364424431466378706673
4847506453646f514f377041414f644f6f75473134362b4d425165592f434377394363466a694a78657242774c7875626775786d495338227d7d2c22
2729435c5c58296b52693e414427364b6354445720617025382e77623c606d782864496c262a542a5355203a4b5129787b4e462b2747545d5d6f5a59
6c4d506c7b754950475c6e784432595d406169263e3b5745374e2e4b624371e298ba403245727b2847365c5c7428466e5b3e3d4d405b2b5121596330
5b64705b3523276f575949245e6546446852635943232b6951626c24385b79385c5c3e4a68622d5c227a365e26282b6b2576706c2c745b3a72744f41
703676417e2e5a5c6e7a6d61705c5c6e2951727b3741502b7e5c6e4339292768525472612e4e6c612a716f7655575570675c5c292e7e57337a59683f
735e35474b2b2135595c7469292e277c4f3c7c6f597a33295e7353416d696e2e4b5564544973525b5d603a5e635e2e5e5c2235375f55e298ba432135
23664f2433515f387138495c6e48725f4b73415c22486e5e5457237a65743653365c6e365c226f724b205b5e5e4f21582c792a6e653f747b74307d33
3e514f7b4e564539634e53682321443b45266e4a547e3a5e6a5e6b79494366255b522e536f4878343b7577355c6e71565831382f61484b2c23714021
3329682d5f5d3d533e74645a6c3d602973756b46324e66334d545631607e7c5a4c33434b5f3f3a252d7a556b5f2364e298ba7b2a62217d462671613b
465c22443e33755e435a2a577c46685b7579304c442a603f3d4b6763546c344175656e2549682125485e5a663a69696e623e4553553b73235171482b
2048447b6453544064253875537778314661397555332c302d483c4b31326d3d5f7275415c6e73734f64556236377c6072395e35355c5c465b6b463e
4f492374627d6c354f5324282b2146263c7a7b7d3e66636c553c5e5c227b24497c2f772c6c754c4a51725c226b413f6127525c6e5f75705b2d6f437e
79275b2d6c215071452d256e5f632e6421386424343e712e2a24316c4e42594a556037667558475c746f6d5c22682c643848332062483e7837646749
6a2f23342c2163425777617a225d
```

#### String form

```json
[{"/":{"bytes":"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"}},"')C\\X)kRi>AD'6KcTDW ap%8.wb<`mx(dIl&*T*SU :KQ)x{NF+'GT]]oZYlMPl{uIPG\nxD2Y]@ai&>;WE7N.KbCq☺@2Er{(G6\\t(Fn[>=M@[+Q!Yc0[dp[5#'oWYI$^eFDhRcYC#+iQbl$8[y8\\>Jhb-\"z6^&(+k%vpl,t[:rtOAp6vA~.Z\nzmap\\n)Qr{7AP+~\nC9)'hRTra.Nla*qovUWUpg\\).~W3zYh?s^5GK+!5Y\ti).'|O<|oYz3)^sSAmin.KUdTIsR[]`:^c^.^\"57_U☺C!5#fO$3Q_8q8I\nHr_KsA\"Hn^TW#zet6S6\n6\"orK [^^O!X,y*ne?t{t0}3>QO{NVE9cNSh#!D;E&nJT~:^j^kyICf%[R.SoHx4;uw5\nqVX18/aHK,#q@!3)h-_]=S>tdZl=`)sukF2Nf3MTV1`~|ZL3CK_?:%-zUk_#d☺{*b!}F&qa;F\"D>3u^CZ*W|Fh[uy0LD*`?=KgcTl4Auen%Ih!%H^Zf:iinb>ESU;s#QqH+ HD{dST@d%8uSwx1Fa9uU3,0-H<K12m=_ruA\nssOdUb67|`r9^55\\F[kF>OI#tb}l5OS$(+!F&<z{}>fclU<^\"{$I|/w,luLJQr\"kA?a'R\n_up[-oC~y'[-l!PqE-%n_c.d!8d$4>q.*$1lNBYJU`7fuXG\tom\"h,d8H3 bH>x7dgIj/#4,!cBWwaz"]
```

#### dag-json CID

```shell
baguqeerabppcmbx4xz5addmuf4r6223r2cgoxpapg4ogds4sdokms5xqxpmq
```

#### dag-cbor CID

```shell
bafyreicv35bhaqcpzhnggxg7va7sgfg7t4ddzlx2pj5c57lxyrtv3zhcdm
```

### garbage-13

#### Bytes

```shell
7b222f223a7b226279746573223a22584249556f7774433479774e5733793143646c56712b7378732b414e7a735a6b59614255434379684873785377
4170687553656f4d415335395965686a557938766f6756342f39394a4479447a5265354943487756356377344e316e4857526b4562647a537648726a
6a765549507135657733754b55782f2f6952714f4657743542532b2b584b2b4254324f41585674684f714a31754b39362f7775657655772b6a757762
62676a4f75454b73672f6b2b75654f4a4862354e51336f2b6945796f75487643704634304d6d63623634656a614c7872316571467a71736f41775654
54586274704f737a4f6e4d6a334270337a47495674622b68315170766a494647336b4e744e4f5a747253636c4f315146445168763049466e6a686545
366a4642776e563342664b493755505955365236706f547837755461326e4b416368424b4d722b6177576f6d727966372f3079634547306e7a74496e
6f696c685871466b356a6d656e4b6c576767666943395a6243306978626f73446b665938545a3744456952674b584e415454787146644e6c52494b35
58332b32456e4941556e3539304f766b3277597a6c7843434f4d49464b6661664c4e353553345a7763545a655a5666634e733936696f595035417265
4d4958653055447152314151682f594172345a364243553554547650782f725a55366d3353316369666634644f49656e493132744e7168365a686131
59667375506f6c683272383364486538794d472f35724b52453564484e7453684c6c305566616e4c454b72317a4f6d646671683834736e72737a674e
715856375a5261343056384a6244537a457975524e59477a6f4947392b30574b586e776f46636a4b3750556e4e6a564f33772b3651524d514d673959
4833594f304a484c3152466977714a362b58624f7645674a42503449695a4d4a67663832756731674233324f7a5a6a6d4551585a47732f352f436434
2f7366774968784946322b642b794f6e2b2b794a6e514f6e47714d624635514a794a553754386764445271482f594374387335596a6f7939707a4650
42367541796c676c2f6769487037326e5741575973384859646641416471637343594f4a4b414b3275354a4e4d3661364578464d38556c784c6b536e
775a712b65427732324671506f377841444a30505a4248566e4d684b706e745964304b544c724d5751334b6f364f466a446751524b44594f5a533770
64646c504747454c3778745a414571426f44333638734359424b392b695135346c743359654e6d332b494d67424d797257745a57587666594e334d6e
32466d47686b4c4e506d7541394741505a707a6358624437424f6b386437654a6b31355633626b5776457559445653567a6842753533386b6630592f
33692f44756656796c506843487543565357754261535850337767527378796b3858456249415a576550472b4141746349343075464d75626439766c
746864746f774e38464f436355724c522f7438337358476b4765724845614a344452642b614439383169426d687768646d314655724443494e4b6149
5156677a692b2b4942577034416f3568785475704859754331466f6236574e686859676f4f73686730674f6847755a4f36715661467075516c637741
6b706268564c7878436454362b52775176375033594f4e69624659776b575871734b435164667261376635355a6c574e495963427046773479746d6c
6a536e59644a424954697a7a3666776153454b754b7248385454627774346433357043484d6b2f68376b346537766641454452506954565748584643
52445a7762686241466f464d56716c4f3237454241507a48454c3075624433656a344650537478316c75387247472b53453062794c46514576414f65
7843695a305568504f32656d4b4a6738744d6b486d305441684e4b36414c375763335a6930366e503566693651314737537438302f686a57396e4656
4a75534838754e56652b353038684575524b6746426151674d75634138456e6245516f55686a4e4e65342f6b4e6c6a75774158386a2f7066376f302b
4f76665638525368687438302f5656567a4d656c662b706f7565454e6a41712f39385551642b7846656737784b416337486f4a64586230425a5a3776
6c796f374d39333558464d2b6c3441542b71786b4a524c755871626c7254674c4a74635564434f364e61524e69524b44694d7735745534706d724f48
4e6f4154745a4d5258692b5161612b77763044645437527659337849455633375a7a4c35797434764d584262727466702b615543685465754d32674e
43475a354b59634270497a62586e4134754e31537a6f576733637041446178356e6e61454a6e576f324e6a506932543166566d727161595949376874
4542674a5769695a35474c53496c564e6931772f4541333132736f314356775466676d4e587359456155477532716e4c6e2b3854775a3934354b6e35
3954577349394d6e4e536d633164394c47317234535a775869634c4a5843312f554349494a6e57555978667962716542675976566534666874783677
67767053546b724e677851395a4b4155447a4f343744454570664d6339376a716b3076414e6c732b57636b54326261484e6a43686e57576854734c2f
63557a4e2f305a6c5773793279577430314639616e42573052756578612f7a4e695a673176564b4b79596f4b7579337a61685351574d684f4f302f69
3879694b6f41704442583469556172483867746d33454d78754a3832676f68796a6571546457497a6e356d673952703375707a596c682f756e2f5832
424144642b4b396173544e463034624e6743634e5361676d704d58466b4546564d6649425146504a6430704732373675454432674c55757362374b61
413962594f43335735732b6953766157705a494d61566d5362586352727a486639422b32362f6f41624e34336a497a4c687a7243485a477031366143
534a42674a504c7a2b396c6f77694a704b45435133373843774841686374716b66756974756e39424a6d4738725a6e49565268434d6c5465527a6b57
72332f66357064725a4a46546546544c4a5466725a426f77614e534c32435a61776134325566495736505575385a7250755643696e7a75337a304276
672f335674427454514c625271366f45536a65624a7269352f46457a567154626c2f42427468463948355a354466302f6b484242693963386e7a7363
6f776b2f6f7a344a496c4a4e34323635523038612b314f2f685a6c5177576968576c73665a4646796c766a44623437382b6a56337747596246562b4f
4431595a746762646148704d6137396138674b7a39756432587147624a45717168623247473358382b62737a664d5354497451564f7761756b31455a
4a3335443570717567727136586d446d336237724d6a3446565630446a474156304d75485a6369567857445142696731514372426c7553424b665975
382b2f736f6f326638336e46594c586f68646255303559353833654e7968566c3747796a6f7050486366366d4c7174772f545369687365722f415373
72566f7a4f43774747654434484e722b657647466844546e2f71303658564c6f554d6b7574652f5a3154676a72774d2f43375a4e743670442f527263
62676d594879476e636e437070695a74545961584858794b47546c67344674434f34326336553734694c4d6d534b5347677239786b387239352b4a74
766e684c3148474d766b63395034566257705737724b514a577a64416b57346369305654566a33514147684b5467357a4549796351666e5a714c4338
70774d6742394446424a673437585566352f58433543535a7a41677842464944317766416b55504c314b33583673594b2f6e443162374c4432617444
6839767344763975516c6d64466c346f5851636b41693653446968794479784771523754445a43723758303133704f376c51794e7a50442f53585144
553348414d4947586e6e6678576c4b44376e306443706456764d326b656c74697972614b49652b566c6e627566565641775438664e622b3538524354
344a67653255474935414d6b5242385730557150375375782f446d685a7a536e7a526b6f7a52673061706a3851227d7d
```

#### String form

```json
{"/":{"bytes":"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"}}
```

#### dag-json CID

```shell
baguqeeranltzith34nf3wnxgq6f3wlefmz5vbarepvwvt7qskgvqs6u6ddia
```

#### dag-cbor CID

```shell
bafyreiftf4wf2vmynw7lxwnqhimv34fmcdpohdotjluhi7u52uqyr3tguu
```

### garbage-14

#### Bytes

```shell
5b7b222a58613b223a66616c73652c22495d223a5b7b222f223a2262616679626771637435377469686967766f367634357876787170687868647174
6872707474703561627168636d673469666e7772676a676464373679746675673369777261766b727a73676c796c6169336334373466346c73756762
6d76766a356f76776b6174656d6b746c73227d2c225c6e7d4c61313d73677c767554687c752f2e332c3d2f366e71393f6b49306c79647a2a2d7c2e49
343a43655e25583d79437d6959333969493544713939474b7979326f6b4d62694c7035697945427824503d4a3d4843725b4349574645395c22746762
45387c38307c5475483d3a64266e7a565c5c653762346c3c644144524c696947207a5b673f3f4230786c3842767c4e5c6e474c77652e4431486a7567
64434070672f5746262a29766451662d3d382b6e5337672052622e5d7a2778665c745b5a555425264c342171453b3565692f3c233857582b5a5a4765
3c385c5c3741592947376240463d253b68355c6e554e7727703e35406f565656634a73666c7e45353e62696a644358415b475842732b4f3d36426b75
5a396d357951686c26663f53754a7e425c22567e21352c323e2d23545a2751252338782b566228e298ba534f21592450293a5c2242423f584c6d7a45
32255f215d507a48774f384152524c7c39605220734b43242843275f424e6d3d567e24346f235c5c2946775f41776b526726493a2a525d2d355d2968
637a3224487c5f33425f385a2e633c7e346d7b7c5b6a3a7c54792e723b6e68e298ba6440637e69374f4b577be298ba4b432a783a56392a422c636c74
5f4a43366a54555a7642642d716b4c50596d603d455c6e2f7b41416f4c61537b7140573e383d27615d7567366e305c6e5e405b2d7d3d60627a4c432c
64396a2e4c5a3d59384878643d59222c5b302e3632363434323233343530393636392c7b22223a2d322e303134383638363136393935333637362c22
2a252a5a7c333c554041295c6e3e3b2d304033202a5a61526d556b436e59427d2959693d557b3b776b56775f7a312b4a5c227e75296d2136605a4931
655153414a744a4d3067674953753c414425672b3572795c5c5d56e298ba6e5d755a2e4c5c227c786670282f735c6e2f6a35702c274d7c37433f4e25
392c55624a643b584068775c6e4b73735e582b58406a32774a3e42695b3158656959617649582d4c58202f5b5e495c745863704929565c224a59726c
603245396d68662a33576e644735533b4e694649543d7a5c5c392f363f27745976752d6f5349773d7e6e7a7b5c744140642621314a77574e2c384e3c
7d5433625e3e473a2f6627715d2f5e3d426429544c43684e4661702e4542652a45654e6a36525c746f3a522e5c224f3d5c5c4653546d4e375a694b24
45665f506a3f2a6b27284a383d2a345c224a4b2a537a5c7466564a4238333e3121223a2d373537353038353239343030373230312c222a406539567b
223a2d363936323431323033383831373835372c223442223a66616c73652c22346c5772482b5f2927512d41456863477e7260577b7e2b3a26223a7b
222f223a226261667962656962796f67623634336464643337656a747437666e7476656b70756462757a7768716334766b786d61377036327735676c
34633471227d2c223f30235a7e223a226e45705c5c2f73512a4a63e298ba37697648262849583d72307162646626287a534e6e5341644534655c5c7a
6c244e563f7e2138412c454736717133785c5c482d464e50414c59692f575838447936427a4e6b237178764c5c6ee298ba3e5a35326561573464465e
4e275c744854796f6f7e70776228e298ba785c6e327877485224445c6e2e3e6931514e4b394c27523d2d5c5c796d325749735844613d606061294a5a
765c74307e232e70e298ba2825492a49e298ba416b5465714a3045633128424847553f354c676f5c2271662c417a5863e298ba6b67205d7d58572454
5c22364169457c284d6f6a623a4c26503a21206ce298ba584371e298ba2d3842344c44363d6560325d2d454d2642546c6c2c2c4d51466f712f285b5c
22485773746d4250442763696c2756535f29373046604d236c73604c78436c2a533f2166797b722931343e4e74627221584b7b76706a5c225d533742
4f473d436f455c224a255f5b6451376e61775c5c486c307a784d734057386c465c6e7e21235928382931217a71747b2d4f5c227c562e6d5938417672
407c2f544246796560392a4079563e703d5c6e413d21347b3d2c5243646c5e30797d705c5c6a3c633a782d5e587a7a4e4a262c37772532403a486e30
497a4d234d43794b727263205b6d3f746d3d5b3f2c27556e6c2c30524358626e24293f7773705c6e40315f5a54305e5b5c74764c345b7564757e6979
57276f25637245702547642a62382b56275c5c237823412d413e7651556167795d51563b775c6e24272328306437455b64573564e298ba4c253a672b
4d6c5c6e6850526b725b3545715c747944796e52324b686b7456765d4b774c625c6e29733971246c603b503d5865485a744f60706c2c6c6b4d2f6c27
24755b373946305f2d442d535b435f49643975316f4625782b3e266e3d78426760423b5120774c783b2e2773672b57502e73205c6e345d2a203e2e54
2ce298ba7d2d606e214c59706f2936483e533d7b3c49646c21332a79467641632b65274670613f4f675b5653782a61252a523b54687b525044334a23
6834783a2a6e7e6728417923415e7e2670567d25236a7d2135454a7b2a486c5e565b615f2c4f3c305f36773d3f48414b793f40335a52257b795c5c3e
74217a50435a3b585c22635c5c30203878785b59787642535b52206e7348295c747e727965353e5725342e4162342e4635e298ba5c2234592b657e4c
59612c2c55343178253d5c6e5e64772c5f26343f7d64716560652a5c222c6d2b7d6871563d755f213f2438624644355c5c664b6a383f3e4660686e47
7c712f25794e536d302e2b6e3f5b74315c6e72e298ba49437a5c6e7877346520715f5d7c40724b77704c322b4d5d3166235c2268575c5c2e6d664a20
6a743f6f6e62586f5c6e75707a5f3f48345c5c3951602728536e433d6b737d545358512f3027296d2e2d78332b6c5e66263e56477d2c794a74546757
306d69537430555c224f5e615c745f267c4c275c742e5a7367345676535c6e587a40615c226d6c33386c56476d615975586f3c24564c4d283d73665b
2d6743754e5a4a745c5c7b6b40e298ba263b327d44415f5a38384c20785a404d6e695f282158202e5a6b2b704c7e69546e3151793a204a5c6e435763
49336a312a2f6f693f3d736f435f39784c2f443c6044552e4d705e45522e79305a57e298ba56424c2d6162343336752b41645e2b5c22684141346267
6d5e38216955566d315b5e66355c6e50204e5b6b20205c225771312c672f2e75e298ba5c6ee298ba723f3b45662e6c5c22322b725c6ee298ba5d264b
3c5c6e2a2f657834263230312c7b5e795c74635c6e427177495448277b33e298ba2f383b473d756a7437274a6e70466a63605f45524743747728304c
374a2b2c3a54447a5a422c495c74e298ba27404d215373714e65267d2a32654c384e203a49533e736e265b707b3241507b5c7459537431e298ba3e2d
222c223f57446031616c625e5c5c623a4c65664f46552b2b6f23376d5a495e6a65536669777e317e747a662a4e5c22426a562661645d3f38287d7d5c
6e5f6d6f3a33797a5c5c3a3f6b7e646f5b737e30333b682b6265333e6d316d754e4a66522c7d394e44372b2f6e4de298ba396a74532359203e6e792d
7d3943753226504435594e676a38323050406b2c48262328744a3a555a4f775b4b65e298ba5c5c265c5c58e298ba6e616b5c7464325437766a705c22
517d7e6438274f3b78525772254a584f465a3a7e782e515f626c3f3b79554864234643576b357062616e6b5f40715e255338305153504f234f57365c
74705678724b74285b2a29417174653126573a3724383f3f7836482e522f285b37666b69674870317d6632605c5c60642d69e298ba362e7b20572c23
764d654e6569527b2b6d4b515c74595b3e3f25733a4f433d4f6b24462c35565c6e42334c662a2c582e6e416f5844203e783a3e266640743f50643741
5c74632a202a4b5d613b4e54525b24223a7b222f223a7b226279746573223a22394d745a4a2f67654f5665345a3451647847532f6e6e704e626d7173
6f39667265484d336b37704c44354864616d3939786a6a79616477572f384f796e66703939686645586146476d657464375a754a76696e33765a2b56
2f30465859495341474f577031416f73322b6d77393273526852434a704a64566e66326d65352b70332b4d42576176376c4335506551496b79554a77
4e2b6b657675447766684d502f322b637445466f2b394f3845455a4b394a7a634a697332554f6639474a585976396c4342432b353371437075377132
4e304b4b644e716d435a3169614851584a55615639354d546466302b39772b45735769644d674a437467696d45673047537a7a706a656d564e2b6357
364158754e44633564585a705677715571675572747358786f504e3137426f772b4c5345424d6948325779737470504f62546774394e5a5a4b2f6d42
344a73453648464d306b4f6c4369695544616d327765307770715370714c4b4c7a7a686c76676b53546b7536666c546d7447516c696b52345a754479
4c366e6e56346d5868584753383064513670662f387346457153614f2b6c4d472b5659734f715a4445683534326d5059304d394d612b666e486f7639
44693956505858797037412b4a573452564345724b6a45727552675955395867682f52435773456842723835466154766d41614e647a43734d496850
2b4d4333512b326439685a646c35725a7a58412f573453682f4c5a445468326d7a5030646a4431644c43536e613339586e596e6364557670496d6371
2b6d536532547a6e4e644273364f3850582f4d433043634e685577556e64774441786e4e39434a346257544b7865425344514769424e593765473836
61354e48346d2b366b2b6773347678742f6655733265436f6e307a634f30316c4c73432b3456412f6146656453447563643473384c4f66474852516a
50633359575330704239594d5771423069646556524d6376753874396e305244794239412f74457072654c477a4f7a2b3435756a714d6c4a52562f76
6563384d664e474359685234373378444a787459734f576435476659796b5a6c7a3850554f2b66314b5261476a34794b674545354d794e6254654161
57442b732f41552f3339736e6c6b41334d36676e59666f424b76354a71573163576d64733253397370417a527133624b4c394d72616f73666d4b3844
626f35684e51794a592f3944536c6d3974725a2b6f63513543504b7678694175482f556474436465347878715638504964356a572f2f703276593158
376a37436d50412f7a2b487244655a464c464c62434f4352663551514a344a535032367149694a70506258456d6779546d4173714c6a626964674248
5a6739705736662b7374354a61665141337a6764666452455a635a47496b514867574c642f68534d67742f4c44462b434645377a7532576977715366
696e75656143673732444746486d5630354d76304157496b775a77344135566a68456a736766496f77563353395a734d6d626e30502b396b6b39332f
6e736f6d5a323571524f64324e6b737349715745315754634d417250787274737a7a4431745642656e62444647583033365354353155693673694474
3441735336475136585831794969563252456c476d495a637a30526c68472f4b65443167307a42385734716a5243765933334235595a7a724c474c32
64304978514f574f2b7643327654624f422f5878372b74646f4c4d34506a75334b4b666b50773165566d5544612b424638506865476b474b61574879
50396a4c59335538484261577a6a3170645a5650376c2b43576a462f626c61704a7a4a6b734c474c6a586d374b6c5234464d4a364341796635514939
2b523055694c3849474d4a39725a6333457437562f73444e7844594d364b36616c4f366c5a434851513737397a79306b4f63303845333749346d4d48
67334143377a33613546334c4b7335456b6e456d7372755138647a6247476641644d7353466d4f62664d2f3135425461497a2f336c53703662727835
366739313930572b712b3764582f437750336a33686b6d63383438514367356a657430725555675969334a53344c75456b7449774759784e4d6c4938
6a765653527857493139615377742f4e61306f63694f436c75394d6f524b6b6b544933746e64754142793958443652304c334c7852612f3163485446
645578704e36516e49474139465342425563344e686f4863682b735449376667454d633437703036667631784a68486b78314a77642f51532b5a5a52
49414f6d2b716d3937774f46596349565a6c54326279616d58684c4235636e74676463724d536f445266787142334a364d6573676e78766f475a5458
7a5372304a522f6e65554c764a6d426571514f786832343166353530546c4e744c504b7450354f6353585a695543344d44332b6e33654c4d62517144
776f76432f6844522b63302b456a324a5974356d5370564c6c584f7263376548724f4d76447a36323833544464783059572b4c346c64467138586f47
6d494f36535437525679304a6a37623972712b413550706273577961363751474e57452b336f7949316f57525a4b5953752b6f38434c794676534333
50366b39673364522b5a67486d5a744b555a444b4f2f4c2b57463457304d37534a784c53356a67514f654d3265316c6b524c75354176304837687a55
69364b6d79465566414e4e415657354644666470304e42484d495653714d6563544d306354394438754d50714c647072794d2f723342737338493574
46734a4c7279425332564862735653317657684d5a732b445130694a75615346773445574f5679674971316f755166524a63424e52704c6831453737
7266386d734a4e6931784c4f45536b7a6d5544373537536b556d32324f77326c42546458414d342b456e666e684b5a74614d6e58565169506a413835
754d614b724c50783958692b4a4f4162754e4b6c364441346d74566e673537685a6c382f6663524e6858734d46617a64733258766c7977443848334d
463452766d34343270365136785738462f6e65636d6155476632704752513971356a4f5a486b616a724437386434424f7a4e38356d3964594f6d4d62
4c72736354696551305750653848654b46674a6132765674707a4c4343756e513145785235554f554a7a6b456f6e694e4b72787247304e33304a652f
49755263336f4f30535761773933376a76456c6a38375979414a724d4577787a395a41323842392f41514c6f2b614f4a672b36757135464f75786d63
6b71496d474e76524546526d324d515637514d5a666c474b525a72366a6d5234303132426c554a68476d434e4d76666670336351552b377471346168
43552b776a5832764c2b444f705375335a39452f66546c6767666e566c69767a334f684e7062516f64694b2b7a424d6e73394539714b384f5676594c
4f72785662304734634d2b4365762b6949384b666d6a74734c72627a3679625a6b47696c72664a4d554f6d714f33546635394a4d38394d4339307445
567472394d53396f4361386563372f494b58664e787a67494878744f45594858624a2b3335436e4344464c38782b612f6a434141624648474653412f
346c38503478466c33486a30594c6f4456414c71384747754d2b70526e4e4b7951486f69786371376d59646d424c34753471394a6d57743944434147
7335696274615758412f4574694c7273307777764e41776e4a31426735486f49314f4876455477336f317052456a2b51345051307949336c364b722f
7446684e436566627a456245576357325673365035586474334e3650367259702f615430743470423545774266355a70516f6a4b6c3176326b314245
646a4e7858685954436d686e624e4d436677333877544c6b4a3266624b2b75685479765657557478525631556753463874316b365735797170394152
632b584d756349535a475179766144795365557673455468594262717645754a706861393275555659546975686e7663774c325975663541672f6252
71704970763964776358796963483666327a6a526432673361634a37366a6c412f315a4a4c573161646d7a5546676574514f594d784a356c54306761
2b6c534d327067652f723655344d41536d76735077505634684831525959464d68636f7762634a55347a4b4f77587130486b4f4c7662654965623036
523346525446457254385666527948482b4838654a2b634f35567a4c626e41584963322f662f504f6d7031474a676f68755376667a49394d5878476e
616d4869794b4f386e416b59586a6e4e3979767a5351693331683954616c724a377530227d7d2c22627c5660223a7b222f223a226261666b72776961
75797a7765366263687079786b7869656664687a336c756f78787777716161686c776b353774326136657667736b6932647369227d2c22707e4d5022
3a302e323132323039323137313539353933322c227d535e67223a2d302e33323734353036373533333731343833337d5d5d7d5d
```

#### String form

```json
[{"*Xa;":false,"I]":[{"/":"bafybgqct57tihigvo6v45xvxqphxhdqthrpttp5abqhcmg4ifnwrgjgdd76ytfug3iwravkrzsglylai3c474f4lsugbmvvj5ovwkatemktls"},"\n}La1=sg|vuTh|u/.3,=/6nq9?kI0lydz*-|.I4:Ce^%X=yC}iY39iI5Dq99GKyy2okMbiLp5iyEBx$P=J=HCr[CIWFE9\"tgbE8|80|TuH=:d&nzV\\e7b4l<dADRLiiG z[g??B0xl8Bv|N\nGLwe.D1HjugdC@pg/WF&*)vdQf-=8+nS7g Rb.]z'xf\t[ZUT%&L4!qE;5ei/<#8WX+ZZGe<8\\7AY)G7b@F=%;h5\nUNw'p>5@oVVVcJsfl~E5>bijdCXA[GXBs+O=6BkuZ9m5yQhl&f?SuJ~B\"V~!5,2>-#TZ'Q%#8x+Vb(☺SO!Y$P):\"BB?XLmzE2%_!]PzHwO8ARRL|9`R sKC$(C'_BNm=V~$4o#\\)Fw_AwkRg&I:*R]-5])hcz2$H|_3B_8Z.c<~4m{|[j:|Ty.r;nh☺d@c~i7OKW{☺KC*x:V9*B,clt_JC6jTUZvBd-qkLPYm`=E\n/{AAoLaS{q@W>8='a]ug6n0\n^@[-}=`bzLC,d9j.LZ=Y8Hxd=Y",[0.626442234509669,{"":-2.0148686169953676,"*%*Z|3<U@A)\n>;-0@3 *ZaRmUkCnYB})Yi=U{;wkVw_z1+J\"~u)m!6`ZI1eQSAJtJM0ggISu<AD%g+5ry\\]V☺n]uZ.L\"|xfp(/s\n/j5p,'M|7C?N%9,UbJd;X@hw\nKss^X+X@j2wJ>Bi[1XeiYavIX-LX /[^I\tXcpI)V\"JYrl`2E9mhf*3WndG5S;NiFIT=z\\9/6?'tYvu-oSIw=~nz{\tA@d&!1JwWN,8N<}T3b^>G:/f'q]/^=Bd)TLChNFap.EBe*EeNj6R\to:R.\"O=\\FSTmN7ZiK$Ef_Pj?*k'(J8=*4\"JK*Sz\tfVJB83>1!":-7575085294007201,"*@e9V{":-6962412038817857,"4B":false,"4lWrH+_)'Q-AEhcG~r`W{~+:&":{"/":"bafybeibyogb643ddd37ejtt7fntvekpudbuzwhqc4vkxma7p62w5gl4c4q"},"?0#Z~":"nEp\\/sQ*Jc☺7ivH&(IX=r0qbdf&(zSNnSAdE4e\\zl$NV?~!8A,EG6qq3x\\H-FNPALYi/WX8Dy6BzNk#qxvL\n☺>Z52eaW4dF^N'\tHTyoo~pwb(☺x\n2xwHR$D\n.>i1QNK9L'R=-\\ym2WIsXDa=``a)JZv\t0~#.p☺(%I*I☺AkTeqJ0Ec1(BHGU?5Lgo\"qf,AzXc☺kg ]}XW$T\"6AiE|(Mojb:L&P:! l☺XCq☺-8B4LD6=e`2]-EM&BTll,,MQFoq/([\"HWstmBPD'cil'VS_)70F`M#ls`LxCl*S?!fy{r)14>Ntbr!XK{vpj\"]S7BOG=CoE\"J%_[dQ7naw\\Hl0zxMs@W8lF\n~!#Y(8)1!zqt{-O\"|V.mY8Avr@|/TBFye`9*@yV>p=\nA=!4{=,RCdl^0y}p\\j<c:x-^XzzNJ&,7w%2@:Hn0IzM#MCyKrrc [m?tm=[?,'Unl,0RCXbn$)?wsp\n@1_ZT0^[\tvL4[udu~iyW'o%crEp%Gd*b8+V'\\#x#A-A>vQUagy]QV;w\n$'#(0d7E[dW5d☺L%:g+Ml\nhPRkr[5Eq\tyDynR2KhktVv]KwLb\n)s9q$l`;P=XeHZtO`pl,lkM/l'$u[79F0_-D-S[C_Id9u1oF%x+>&n=xBg`B;Q wLx;.'sg+WP.s \n4]* >.T,☺}-`n!LYpo)6H>S={<Idl!3*yFvAc+e'Fpa?Og[VSx*a%*R;Th{RPD3J#h4x:*n~g(Ay#A^~&pV}%#j}!5EJ{*Hl^V[a_,O<0_6w=?HAKy?@3ZR%{y\\>t!zPCZ;X\"c\\0 8xx[YxvBS[R nsH)\t~rye5>W%4.Ab4.F5☺\"4Y+e~LYa,,U41x%=\n^dw,_&4?}dqe`e*\",m+}hqV=u_!?$8bFD5\\fKj8?>F`hnG|q/%yNSm0.+n?[t1\nr☺ICz\nxw4e q_]|@rKwpL2+M]1f#\"hW\\.mfJ jt?onbXo\nupz_?H4\\9Q`'(SnC=ks}TSXQ/0')m.-x3+l^f&>VG},yJtTgW0miSt0U\"O^a\t_&|L'\t.Zsg4VvS\nXz@a\"ml38lVGmaYuXo<$VLM(=sf[-gCuNZJt\\{k@☺&;2}DA_Z88L xZ@Mni_(!X .Zk+pL~iTn1Qy: J\nCWcI3j1*/oi?=soC_9xL/D<`DU.Mp^ER.y0ZW☺VBL-ab436u+Ad^+\"hAA4bgm^8!iUVm1[^f5\nP N[k  \"Wq1,g/.u☺\n☺r?;Ef.l\"2+r\n☺]&K<\n*/ex4&201,{^y\tc\nBqwITH'{3☺/8;G=ujt7'JnpFjc`_ERGCtw(0L7J+,:TDzZB,I\t☺'@M!SsqNe&}*2eL8N :IS>sn&[p{2AP{\tYSt1☺>-","?WD`1alb^\\b:LefOFU++o#7mZI^jeSfiw~1~tzf*N\"BjV&ad]?8(}}\n_mo:3yz\\:?k~do[s~03;h+be3>m1muNJfR,}9ND7+/nM☺9jtS#Y >ny-}9Cu2&PD5YNgj820P@k,H&#(tJ:UZOw[Ke☺\\&\\X☺nak\td2T7vjp\"Q}~d8'O;xRWr%JXOFZ:~x.Q_bl?;yUHd#FCWk5pbank_@q^%S80QSPO#OW6\tpVxrKt([*)Aqte1&W:7$8??x6H.R/([7fkigHp1}f2`\\`d-i☺6.{ W,#vMeNeiR{+mKQ\tY[>?%s:OC=Ok$F,5V\nB3Lf*,X.nAoXD >x:>&f@t?Pd7A\tc* *K]a;NTR[$":{"/":{"bytes":"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"}},"b|V`":{"/":"bafkrwiauyzwe6bchpyxkxiefdhz3luoxxwwqaahlwk57t2a6evgski2dsi"},"p~MP":0.2122092171595932,"}S^g":-0.32745067533714833}]]}]
```

#### dag-json CID

```shell
baguqeeragzij6achvalac4fmb2oplhyhvqnfdglqtesgrwd7zilyqupe3fwq
```

#### dag-cbor CID

```shell
bafyreic5d2sckqoqooj4j4pyh7asiascg5kv3thmt3kwalj6zqqvv3tbj4
```

### garbage-15

#### Bytes

```shell
5b302e333230333835333330363634363538332c6e756c6c2c7b222f223a7b226279746573223a2276576a38504b2b5878674e494c4d502b7147305a
54656f346147716650457a7932623163434868594a5245783247376b3353787357362f41364f383042792b4f7374533178536f2f735853767a5a6974
65776657454474437133566278486c33457942754a6479565a457969694b486c2b484b3155574e71717136534f63786251315956533064717a644532
6671514d7a2f36375665366770682b6463456e47785a4e7466494762654f796d2b502f4161552b54366563704b36466959513734474e6d5053717753
4d332b5a617058614f796356662b676c542f67484a2b61514134356e6946516b2f34496254307a704749394d725074393536573543482f45634f5164
315058673172756b333450335054473673736b315072623253395275597848435277484d4f396d4c4d6d794c37594c78727a5145777379526d344f4b
69366761397a5737597871554e6c6c592f6f326b6137325869677177382b512f37323674387633614e735350757330563556326161447479744a4e52
622f64774e56674d566c6356346737717256446c354d722f6c3632584b42536e695842337a66437371755462584559434a7659665850506537563276
4864787831345a5265777a65787863306a78514a4a4b5867344f4469336f4d53326161524c622b42697a616a437a6c78732b456e4b514b4141423737
57776d357169574c4e6f516e75384c32595a67344f6b784a6443476f6469313237374f7a592b566672697a52484a344545644b5776666c7167387554
636d5a2f365a4e4533765a4f4d6956366150537950796977454a59346b744769507a2b6f447a47677679305031616d584539412f73547a4155487877
6a616b6372684c446569324a7061495638384a527968572f535a326e702b53674878337478444e437a78793935584548662f66327032613852665a67
2b36596b37426f727668516f4b467979426d30325a6c2f6637704f337562667a424a4c52576477486b534b77622b46764a6877663058646c624e596b
447530546e426a374b34684d50754f4d567434766b62665a6457653839715276553765306f344b38413168326f376947505a6b316769416e384e7a32
303455383673446a306b6e4d35744f6c726849552f4f64387845594c34446251794d6b4748304f6250546a593563727749496b4b4e6d3531706b4d31
79546a46356a6f4e35476c4772746e64465a594c546d59774c5363636e4535454463796a363062414d516c4558366377634a306d4d69533353675672
43762f536c4563333858375877726a636e5634626875674a504a442b33706d306d534a6f53796767502f32573977682f766b31314e56623350687461
6b3870783751304f3549543636692b6e5a7562745a5167645953514158544b4a695759736e696258336e695a4d7466532b416a762f4751724e4a3341
6e4f2f75504e5371387a31667753382b495058412b506e564a76344b5876706448744679705338474f327076554e792f58414f783134497238683155
6f64765a3873466d552f58773272576141396b62696f3859673566713530627a516a79635a526c554b6e6663417a324a2f486c47327a684a64762f50
444d7038746f2b61344c635038504b6e6632734e79504c732b5541534a516171763171475341456c624334797530447272784f394444724141683034
3755455a784e4d6a7437726d5066515a4c626c3473624f31396647497445444572564633465344567a4453615576354a67365a2b345a4b4f61723948
6d6d5457594f6142434643632b572b726e594a476a364c5236322f4f524f3139366179674756376b6a58332b616f4f4b704e2b62574a5a3464353534
506b37616c746c565a336233737a6c7776564157724a704878522f746c66647374565958614f6b7a7a56676f4c6238586544623235416b4330733264
5449755063676f46592f64393656566b313870393261616e623244724c325257674a5251446f7a304a666955747372727370303879552f5979743246
5674485a7650636d423753452b7a6872467371466f5748752f30316b7a5164632b44654e7148487641374550715753366e4d726b6236562f696e716f
6e743245654139755031684431376664446c34334178756b3446544a45727672334c4c484966784c4339654a464b3257353264546c66497747416b79
386539314e466e6f79666b7a534e6f473337613071526f782f333158454b7032666f6571764d4c35436b6f64704472584e58454a76646e704d72316f
6b376d644441534a7333486c684e70344b73766357714c5a784563516f6b4f6e5a33374a36494751774267306a4654724d4e5a6c6171784c356b654b
796e42773353704b3755495241686644516a3079525a4465726d52494e4969754a316e67764e526b645164504870324c49633635494c584b4b4f4e54
772f567479573132776e4d2f6a42444f455247784e673174486f6e342b637945536f496b3069365849384b443130737877774f474a745051536d7377
7a54304d4c596776455675504b514139517a506e38517672625a73715a7a31304a7877502f694d4e4364346b6c706a4547797736752b467764775043
33626d7067455338707875302f464851644676764b5a6331394b5756646a685249716841437a4d6f313749587535464d4d3778665a38746f6c496c7a
51536b4b435341573144543247464f7532362b563946334f5867366f5a7972772b487244376f52644978624e58474e70726532736e582b5746666a51
464d6e376b666c3131367137474a5336624436387556634c3570556d34516269547855626a4e62676535544354426e67527049396d4d76446c515179
33374279434539636f46774b51325677307465676a2b384147554535705a5861374f702f57584746667a72575231484330676264344e6c7577757067
4c4a4c7644694b34586b30756f44653130784a426649616869346a4b48454c6a732f2b4263702f344647344a724f48777868714c73784748584b4345
51584a4972496c534d5279655356396c755158723444383663505564596c305361467450524e4641304872784b65796e54424635344f6e6a32636a45
6a67386f436648495249625875444d58774e6849424b693642514c48426b4c46774f683338547359326346674e504b4652626a72426d476b6575614e
6e6c7558326e627232734e78384134493067492f5541476f6736636361344e5a5a4a316e6d43663654556b7864436e74524b73796379625a70453932
58396c426a5847514274646145616771596b44327875774d3038763744632f7a4666512f6b363279637336413862505a6d667753324e376f36584a58
78652f7670726b557a65452f792b4f6979363146626367556e5a454e53744d556876466c376748663472596c464d4a6e4c4c375350366c557a413854
6a643130537070704f794f344c58704d354f347162716d2f3547434850316a5571366a787872764b31326d784d644c514e73423477514e68775a4731
42303251517975425a66656b4174724d635364674968372b656d3757485964487a504849536e746e30702b69503732674b63724b6f46326b346a6475
767039326d563236335162616f4e327632306e6863436649424a38614c2f3249745351776f794c716a57626e4a79707767483265524442304d727048
34474c357966397a227d7d2c747275652c5b6e756c6c2c2d302e373531343936373835383034373736322c7b222f223a7b226279746573223a226165
30315a4b72545077514b6452566d4744645743722b665754576a546f6a7431644b3264737079575132374f4c6b54787769387374324b455a706c7236
75456a41376f4d686c7376762b6f44574531706b4e722b39316b4e30586c75486165643371774a63484a6e77777741335631674978434a6f395a4576
2b717445643339714a7a524a556545526c4730656139527452555974395531745462314556624f386f6b4435666a3243374d5153725a6c6744464734
6d2f5a5a755765304d4852672b6e4a6633786971622f39464a6b32784b464845776e5973796c5333756f5a2b4d546e766e7a7177567a64335051356f
484e76727962514a573567516d55786c6a2b49416a7574444e6b4e45614e2b736d434b79776c6861557063314a63426f6d4c6a433878514e77613651
513233516f3144444361757167577a3837305453774a74666a3579476c51385a346a2b50376f5a372f4e42747973756a423738417a507a4a45586242
566b64363856634b354a6c683152624c74636b786c374863427577424e34666b495142435673544e746951613071496b483553664a6f3634334a5639
354764716a5746654876523848504d4e64526448556c765a39366533316e4d33597475687449784c655431664d367a54396964773855306c4d6e7137
627478426c786347526754504f73574e494a617032486c646f53674269533636556f4a506159502b394d324869794c6a787a4d42563372754c46746b
5456512f41754b77697a7237527847786d4b34394547675a4977707655454c6b695666684e6877582f7274315a63722b77304a674a3475706a446767
6c304f34555754376a6d67334e2f514a454d4f627056457a564c597443676e593542737a37327a736f3051684e5a5a5235436148526c72652b744e6f
6579434d5932576668365a3078572f527163674c5263636743615a71484e50586c79414e7a49574d704f56577a7549637557425a6b64525276794d50
597a65744857524e6b75655331343068486c744955666575765549376d314632344269776e4d3162627379696276376434317a4c2f4457652f53714f
6d477975524c777930327258626f6a7243354831654d5348586e4a2b754d6e7676456d7364756e38624639454a34675976576951564f447669672b58
454a654170746d43424d626b72574f4b6272755366635a6543466933312f30684a306d77464f386a684a6d505a644656553556784a6549732b34416c
444f6f3232714252416d704d613164516f6247314567756b724954724f644476302f5167334c30627a744b56347561346331443762334d7a35655564
4f6a4173747a59516d4b3455484647386c4d327746366a4f6c566e676e345543334d416d445246414c656e37506376515a4e375356627645667a3475
746965786d647676712b507034684f61524b7854614959326834522b77676673494679594c72566f2f4e596a6f6f417833562f5a6b75366143624b39
7657424752625479784a4636494658507963677252614c592f2b5a497932724958627a4b77334a4a7837366e433858644d4854542f57565832347243
49683663687a765351594b717745415836655356784550446f357630324d5667492f3056724375415231467376704271697738302b6d78594b7a3631
32374a784e5a4b453277566d70464e4f6768746556574371543746743366634f655a4a7a5535703449302f3036427a5269593150316b7947732b6b31
4564704f514b6552595967495a652f542b354b6352373577526c3171487348394f476234567561664b396b4954537674785a55304149574a2f2f7068
49367842494472393262494e392b6943483270664e68422f6b70337662577162736d676f43777176345364726a77544875674241784a557958547875
5a4e4d70384a386e52334f7974383938466e512f78546a63554147477671733164444d324b61357a4441486f534931352b6235373876652b675a314a
5469766c47304a6f75544258683279594559784238635671722b644a7269367531456141567a796e784b6e4e593864754849626836424d5254794e71
6e30616f756667614e30486a706c543454316f327647397965474e56514d56305977647a4e426f73517876714c41543163396b69786f493879786541
3430783065774e2b6553764230785a725735796a6d446d666e31564c32707a504567357153706c37703433734b346b387770335750424a57726d4434
4e48747a77566f2b62592f507073686f374e545677323174394e546b7034792f4b734b753462446f4543694936495657476939325a34312f324b474c
77723275426861627274776f78567547537262314450736975364355676e35773254726f746c78774e4c57647458612f586d35313371357276576957
33427139306f55376e4c675255375741455a2b734f4a752f4c7839616a62484968545466362f2b5133777a666a4344625855364d727745513555374c
59506b46424b6e744451764a424144665259757a654f3875462b55684e6a6654363576524d506633564f377171434739346b416861584651435a5075
3148586b4f31504537466c3033756659544849484e6c3757465438524339643067396248496e7a427158765a394d45536c5a387a576b783462307941
4f565839713552526f62455836684e64486a594f656464446356462f6c4d773055474b3555494261325a61516c7250793434536432776f743767314b
4857456834572b2f644a4b5437706d41437a6267516f4e78486346376e7838537778524b69647742676e6a7856464347303037456648584a33686733
2b486e68744f30346d71704b724455437a62587a6670505354722b70336841586a48426d454d684b48657a3358646951747958535645587648775356
3131654a76504445596c336a4e413950737a69372b2f437074394459547751757a4a61627742754c3033417943475837592f5763566c434c2b58446a
4a31787535374469555a416342774979527646495859327870536e53554f714a78415a72354c7456366d54796e584e4570323258744b487761463761
396a3564336c7279534973524f45397a376f5547386a4e627178787337652f387363706f45307557727932676d687968374837664844766d30437051
48493461472b4e367061684a45342b6f456466343973493576583732796c50684e4636575a65654d6f53502b65626361714f676d6c476a6b61593577
7a646652794377304f475857453651716a71762b35574b42556f61327947364b5246344e38522f464f74364b346d4174484758514d376561426b6f66
45745a31504f4d782b44533757555675763979482b7a6763754e756f625267767858545749534b4e6c302f39413777764f4830436162563269674345
32524f6d7241554c655048333742613649434348314d4a7345726453373341654158793145435a635452366d6e35427543794d57725058357963736d
77772b6b4967316850386e587569354e546f334a55704f633962625a4b7141573169475363425a4669666543616455364561343041474d687162664d
424a4c6b2b73395330455536734e41424e736c453835497a4a3148477931422b556d396e784b4c717948757a45455a6b3947574548314e7074454379
4b5762392f537a6c5066594532737342624830336746564d776631645578716d707939524b3369484d3278534f4a6168646c434e79566736454a6565
4e2f68594661716d6e484e47376e374d6a504e4c2b41727468503145327a6246487267355142566465374d704177527572426e5543684a527a34586c
724a3048396142796a424866363057346363376e6f613078506b6b57443937503745373876324259436d4370584f6d5071594e322f62573434697047
68736e7654494b4932537a564c75483371493063564a4b755a34767a74436a4d6544666d44723653737850415346445249596d6546456d5456796967
227d7d2c7b222f223a226261667932627a616365617a6a373678657a7874766a746872776a786465626a337477763565746b626d6d6b66327975646d
6c32366e646f783371356a32227d2c747275655d2c7b222f223a7b226279746573223a225773727061614454672f6546433839546953704c76476d49
57385149576661362f4136514338774754475631684573424a314249664b634d787252497a6c5a73496d6b714b4449342b2f345555494f532f586465
4c7a582b474b3256574337546663744d4765367255622b526278396359572b7465784d684f5157616a6739334269592f53747873486e7a46424e6b44
66524b454d4b65534f4d7746534e5a5a66437437582f4f6d7a79306d4d35776d465257634456324c506f48697a686f594e7246515a38712b584b3266
754262305361314e2b304372594f776741727156784c366130557756464146396667475068577048555a724164564c71395150695950597774583877
672f46327470413947375262227d7d2c7b222f223a7b226279746573223a22515161394a343165796d4a43375a57426234374d6b3575644861596a71
434c6849316d6a71692b5374306742416c4670526b4d766859705032666376363674626b706f5848504335773163694f64353564635332616d4e427a
393253636f3443366e38364a6a47707754666344744e5a334e3931716b70536c416d484b4634424c596a4d693467324630504e6862376e7a37484b6d
6f354f624c35537a47444f69592b6566686b45644f71516c653866434a68486d76646b4c4f70536e67752b544a666a3972414b7a4357545646507241
6f4830306244562b4b4251544e597132384564344663434e796e657146694f304f6b41452b796638373934454952527262466a4f594851554e514d4c
442f6a4d396f476e6f2f536c4c6472436e62626c7a4653746b6a78542b47304c6f593765342f4a2f304159614171367546675468566132374c755850
6a51304b34685949592b2b636c44484f315530597066714c7a58663670774c4b6574727a586a32743339596c47415363487771562f2b50642b553637
6142693241764645437430635064744a7958356e72564c58674f33594b37795053624c5464722b6c2b58506d645a7843424465317054477758617450
6d7075463058707a55345174496b7a654d467559703269735a39714e58773358334371323668516f5a313147724b3271313771474b65455132426579
4c3041314570686f35647173614e664f493367736a55334c68586b466c593543544454706c316a2b504451364a686a6b36445645304d31766a395368
6f3649474f667555523948746e49372b6877734f4d545337706d34435051357452735450697a675279592b6b7a66504a59376a35333239706c68614c
3030344e3762347767227d7d2c2d332e323334323932333232343934333636335d
```

#### String form

```json
[0.3203853306646583,null,{"/":{"bytes":"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"}},true,[null,-0.7514967858047762,{"/":{"bytes":"ae01ZKrTPwQKdRVmGDdWCr+fWTWjTojt1dK2dspyWQ27OLkTxwi8st2KEZplr6uEjA7oMhlsvv+oDWE1pkNr+91kN0XluHaed3qwJcHJnwwwA3V1gIxCJo9ZEv+qtEd39qJzRJUeERlG0ea9RtRUYt9U1tTb1EVbO8okD5fj2C7MQSrZlgDFG4m/ZZuWe0MHRg+nJf3xiqb/9FJk2xKFHEwnYsylS3uoZ+MTnvnzqwVzd3PQ5oHNvrybQJW5gQmUxlj+IAjutDNkNEaN+smCKywlhaUpc1JcBomLjC8xQNwa6QQ23Qo1DDCauqgWz870TSwJtfj5yGlQ8Z4j+P7oZ7/NBtysujB78AzPzJEXbBVkd68VcK5Jlh1RbLtckxl7HcBuwBN4fkIQBCVsTNtiQa0qIkH5SfJo643JV95GdqjWFeHvR8HPMNdRdHUlvZ96e31nM3YtuhtIxLeT1fM6zT9idw8U0lMnq7btxBlxcGRgTPOsWNIJap2HldoSgBiS66UoJPaYP+9M2HiyLjxzMBV3ruLFtkTVQ/AuKwizr7RxGxmK49EGgZIwpvUELkiVfhNhwX/rt1Zcr+w0JgJ4upjDggl0O4UWT7jmg3N/QJEMObpVEzVLYtCgnY5Bsz72zso0QhNZZR5CaHRlre+tNoeyCMY2Wfh6Z0xW/RqcgLRccgCaZqHNPXlyANzIWMpOVWzuIcuWBZkdRRvyMPYzetHWRNkueS140hHltIUfeuvUI7m1F24BiwnM1bbsyibv7d41zL/DWe/SqOmGyuRLwy02rXbojrC5H1eMSHXnJ+uMnvvEmsdun8bF9EJ4gYvWiQVODvig+XEJeAptmCBMbkrWOKbruSfcZeCFi31/0hJ0mwFO8jhJmPZdFVU5VxJeIs+4AlDOo22qBRAmpMa1dQobG1EgukrITrOdDv0/Qg3L0bztKV4ua4c1D7b3Mz5eUdOjAstzYQmK4UHFG8lM2wF6jOlVngn4UC3MAmDRFALen7PcvQZN7SVbvEfz4utiexmdvvq+Pp4hOaRKxTaIY2h4R+wgfsIFyYLrVo/NYjooAx3V/Zku6aCbK9vWBGRbTyxJF6IFXPycgrRaLY/+ZIy2rIXbzKw3JJx76nC8XdMHTT/WVX24rCIh6chzvSQYKqwEAX6eSVxEPDo5v02MVgI/0VrCuAR1FsvpBqiw80+mxYKz6127JxNZKE2wVmpFNOghteVWCqT7Ft3fcOeZJzU5p4I0/06BzRiY1P1kyGs+k1EdpOQKeRYYgIZe/T+5KcR75wRl1qHsH9OGb4VuafK9kITSvtxZU0AIWJ//phI6xBIDr92bIN9+iCH2pfNhB/kp3vbWqbsmgoCwqv4SdrjwTHugBAxJUyXTxuZNMp8J8nR3Oyt898FnQ/xTjcUAGGvqs1dDM2Ka5zDAHoSI15+b578ve+gZ1JTivlG0JouTBXh2yYEYxB8cVqr+dJri6u1EaAVzynxKnNY8duHIbh6BMRTyNqn0aoufgaN0HjplT4T1o2vG9yeGNVQMV0YwdzNBosQxvqLAT1c9kixoI8yxeA40x0ewN+eSvB0xZrW5yjmDmfn1VL2pzPEg5qSpl7p43sK4k8wp3WPBJWrmD4NHtzwVo+bY/Ppsho7NTVw21t9NTkp4y/KsKu4bDoECiI6IVWGi92Z41/2KGLwr2uBhabrtwoxVuGSrb1DPsiu6CUgn5w2TrotlxwNLWdtXa/Xm513q5rvWiW3Bq90oU7nLgRU7WAEZ+sOJu/Lx9ajbHIhTTf6/+Q3wzfjCDbXU6MrwEQ5U7LYPkFBKntDQvJBADfRYuzeO8uF+UhNjfT65vRMPf3VO7qqCG94kAhaXFQCZPu1HXkO1PE7Fl03ufYTHIHNl7WFT8RC9d0g9bHInzBqXvZ9MESlZ8zWkx4b0yAOVX9q5RRobEX6hNdHjYOeddDcVF/lMw0UGK5UIBa2ZaQlrPy44Sd2wot7g1KHWEh4W+/dJKT7pmACzbgQoNxHcF7nx8SwxRKidwBgnjxVFCG007EfHXJ3hg3+HnhtO04mqpKrDUCzbXzfpPSTr+p3hAXjHBmEMhKHez3XdiQtyXSVEXvHwSV11eJvPDEYl3jNA9Pszi7+/Cpt9DYTwQuzJabwBuL03AyCGX7Y/WcVlCL+XDjJ1xu57DiUZAcBwIyRvFIXY2xpSnSUOqJxAZr5LtV6mTynXNEp22XtKHwaF7a9j5d3lrySIsROE9z7oUG8jNbqxxs7e/8scpoE0uWry2gmhyh7H7fHDvm0CpQHI4aG+N6pahJE4+oEdf49sI5vX72ylPhNF6WZeeMoSP+ebcaqOgmlGjkaY5wzdfRyCw0OGXWE6Qqjqv+5WKBUoa2yG6KRF4N8R/FOt6K4mAtHGXQM7eaBkofEtZ1POMx+DS7WUVuv9yH+zgcuNuobRgvxXTWISKNl0/9A7wvOH0CabV2igCE2ROmrAULePH37Ba6ICCH1MJsErdS73AeAXy1ECZcTR6mn5BuCyMWrPX5ycsmww+kIg1hP8nXui5NTo3JUpOc9bbZKqAW1iGScBZFifeCadU6Ea40AGMhqbfMBJLk+s9S0EU6sNABNslE85IzJ1HGy1B+Um9nxKLqyHuzEEZk9GWEH1NptECyKWb9/SzlPfYE2ssBbH03gFVMwf1dUxqmpy9RK3iHM2xSOJahdlCNyVg6EJeeN/hYFaqmnHNG7n7MjPNL+ArthP1E2zbFHrg5QBVde7MpAwRurBnUChJRz4XlrJ0H9aByjBHf60W4cc7noa0xPkkWD97P7E78v2BYCmCpXOmPqYN2/bW44ipGhsnvTIKI2SzVLuH3qI0cVJKuZ4vztCjMeDfmDr6SsxPASFDRIYmeFEmTVyig"}},{"/":"bafy2bzaceazj76xezxtvjthrwjxdebj3twv5etkbmmkf2yudml26ndox3q5j2"},true],{"/":{"bytes":"WsrpaaDTg/eFC89TiSpLvGmIW8QIWfa6/A6QC8wGTGV1hEsBJ1BIfKcMxrRIzlZsImkqKDI4+/4UUIOS/XdeLzX+GK2VWC7TfctMGe6rUb+Rbx9cYW+texMhOQWajg93BiY/StxsHnzFBNkDfRKEMKeSOMwFSNZZfCt7X/Omzy0mM5wmFRWcDV2LPoHizhoYNrFQZ8q+XK2fuBb0Sa1N+0CrYOwgArqVxL6a0UwVFAF9fgGPhWpHUZrAdVLq9QPiYPYwtX8wg/F2tpA9G7Rb"}},{"/":{"bytes":"QQa9J41eymJC7ZWBb47Mk5udHaYjqCLhI1mjqi+St0gBAlFpRkMvhYpP2fcv66tbkpoXHPC5w1ciOd55dcS2amNBz92Sco4C6n86JjGpwTfcDtNZ3N91qkpSlAmHKF4BLYjMi4g2F0PNhb7nz7HKmo5ObL5SzGDOiY+efhkEdOqQle8fCJhHmvdkLOpSngu+TJfj9rAKzCWTVFPrAoH00bDV+KBQTNYq28Ed4FcCNyneqFiO0OkAE+yf8794EIRRrbFjOYHQUNQMLD/jM9oGno/SlLdrCnbblzFStkjxT+G0LoY7e4/J/0AYaAq6uFgThVa27LuXPjQ0K4hYIY++clDHO1U0YpfqLzXf6pwLKetrzXj2t39YlGAScHwqV/+Pd+U67aBi2AvFECt0cPdtJyX5nrVLXgO3YK7yPSbLTdr+l+XPmdZxCBDe1pTGwXatPmpuF0XpzU4QtIkzeMFuYp2isZ9qNXw3X3Cq26hQoZ11GrK2q17qGKeEQ2BeyL0A1Epho5dqsaNfOI3gsjU3LhXkFlY5CTDTpl1j+PDQ6Jhjk6DVE0M1vj9Sho6IGOfuUR9HtnI7+hwsOMTS7pm4CPQ5tRsTPizgRyY+kzfPJY7j5329plhaL004N7b4wg"}},-3.2342923224943663]
```

#### dag-json CID

```shell
baguqeeraco4uqcqqhr3miz5ncuzrkzmno3egnhxxslpfwlok7exyrfzuty7a
```

#### dag-cbor CID

```shell
bafyreiakca7phdccv7qymkxlezjvhnbthemfiz5s7ii3zrrmqfxggzspma
```

### garbage-16

#### Bytes

```shell
5b6e756c6c2c223f7a7136343e2d41422c39487e45795c744042434d237e294b3b2a435b51352b7330592c32475a56667b514d3e7b6a3627e298ba23
62205725744a592b604944376625335b41207b3c4d3b457e2650456a565a20287b50375c5c6a2d7941247521246f60412c4a5435675c222d682b607a
67284363705434315e42294b2c373d5c5c415b345c6e74e298ba6f4f7c3d6f3646215b4b64617b6b35314e25453f51377e362a4b714e615c5c4f4c70
5678504e5e76273e4a52765b7e60393276552c663a6123484a665c6e50495578725f6f6a5d2d3c3b4864212639576860585c74653052206f462f5f28
32685a684f45455e4f782d2e4d5153282b75402e75613f6e7a3c64773378407b2a4a59575c6e684d652e6c404c2f5349595566516b49324352726d64
55365d7653703254216f34383659553e2e46685c2262302e427e395c6e5c22537c707b606c772f4c374d4a5c5c604a742c58322365493c6e6e572331
63605223414c512f275d28452d757a2f57662f3f50412d432b2ee298ba6e5430545927254825215d296b685c6e39445b232e7870762c6b2b546b3f62
72753f724a753e2c58597de298ba476c3b39435c745c5c407a3e344a2372452c2d4f3e637e2a5942416133645c6e6f657c2e55506d3b653470653142
2d5e38385c222f68352f7e7e31516f2d4c5c2271375f26472a21417a2a422a6858732c284d687a5b2c505c6e403d4c2e3526504c734b5c746c4e4540
6b5b712e70492a785b296e31564e3a685e48715459697d2a2d3e5e763b5d5b497929503867617b5372455d75566b31713559646064485c7466262372
4166285337304d2356277c5143262024663b506e6d615e7d75716c5c222c4045295c6e2a4754394f204d523d5234442a60542d25767c606551443b35
612543773573442375314130566f38434e2953354b77696244707e2b29672f25382c48253c7350246b555a743b6f71797e57644b71627c5126444851
534e5d21442b47476241525c5c7c462f6f275423373424537b5c2260256d26303b7956705a5c743f3d5c6e5c6e45455c227c645c22276c3038534d3b
584e50447772e298ba443f4a5c223a3b3446565832603032605c743b7e565c2252613367457d274669493f51767e4c25622a313466585c74e298ba6a
4e4b3d4d783d4a5c5c6f564c75693c5c225c6e32544342286b36427e5c5c4c4f446640753134566d375c5c29322d28785b616c6d636025275c22416b
6c61643a4429417044793446606e757e45447c772d3d2b27785f4a76755f31753a7a3c7d594159256d5b4c565c222e4727e298ba48576624767d277e
5c5c30524c245c6e5c5c62654972663f3e6d6d266a5f6c5c5c3338415c5c7b50404530345077214f3a5f76662729782a6c6c6b50e298ba2663402d4e
504d4355284e5c74297e29746c505c225f5471595025675c6e535e6f2b5b6927655c5c5b5c744e2069697753354325405c5c255733522a545d245c74
67743c4d642d3079382320425e527d292f393b5a575b5c5c3b484737705c745154703b645d552420795c225c742b3f68732847765f772b3044277578
412652463b6e5b674b2e55664c23774532254b696671673d4b3c675c743f5070432b6979372460792c457a27473e3244462b593b20294b237d2d4240
552e26316763462376294061767e70445a3f65514e5f71783d3357327d7e4b71372b4c73423672496140444148555c222c246279496f786649676c23
686f79734e653645522446207740215a2a284f75364928722c387d2d32384767463566584b314a5335727c60503f676a4e233269216a7950516f3240
263565634f573d353973347b7d7c6e7d2a202d35604657702d7d252c37265f627c645c226c637c5c5c292d3e2c514c715d373b58277a3b6223292d72
47742c7ee298ba30207e3820485b55375877406e64245050317e6d475c6e352c217363435f5f656e6b5434326c7c70795c5c4b7d656f752949374a36
46662f3b235554653f7a405d5b78302f557e5357505d38753e6b7e563c337e293a393e4b2a7c3b4c6d295c6e355c5c6b5d503c7a58426675295f5a55
4e6f63385f27484b475c22497a647d6f5c6e5c6e3d6b44547a5f2a3f667b21734d592a7221547d3537592a222c7b224b652734264b587e3778214125
284856366a5236445c5c31655a2c684038276c5f35412c762c4860356d5163223a7b222a48223a747275652c2239223a2d312e353733323434303433
303837333039342c22454f3d73494e223a313531333534323834333335363832312c224a4d223a22317d78744159675c5c4d766f2349633420324a6d
5c74437353594e506d363a4e665f25554d56246f7e393a397641737b75334b415e4120295c5c776a3f7a6b23356961747a59336b4c4a2853696c2f58
384b3c7b622c5a6f615c6e653f42406975252e6f3d2a2c4e7a4c6e6a617564685c224d5c5c634d214369e298ba545631222c22556d212f415c5c223a
5b6e756c6c2c7b222f223a2262616679626b6d6169706a3566357078677679726d656a35666a656570647270326e65676e6d6c697a33787563726d6c
35706c6e366667676c73776871716a6f687461666b6a73646b6b6c77636f76346f61673671227d2c225432273e7a37792c58283b6748445d5b6c455a
392f275f556c5c22545c5c2754267d5245262c55452d2642553a39782f68207a6775407431275c6e386b50673e447e5e753c63373e486a796f2e5b51
7962555923437e6d252f325e415c74476b585f433d342a5c6e5d7e51483be298ba6832537b7d3e20303e64462c2c37772e4e635d2e314b702b7b4a53
646d254c2c5f41613475285e7c766933296d7c7778396e3056606c6b307b24612f742d2b676763556c507c5561286d5921424933467b2d4a72472f56
3e703d686365423d494a4e3c2664795c5c394361377b48615265642f315c6e326e6033286a4f2d436260494f29577550335c6e5c74744a792b4f283f
7e57436f415c6e2b353c593e3e43733a732a215c743b5c6e60382c514c425c6e3c7a257d54663770704d5237215c5c31673757646a4c6c37385d465c
5c59493a5c22606f2a543e49794464697673573b4f6147285e71292a496e6d28602562627e21585e4549653f3a566f7d73205f534d7b383536503331
4e4f3055787070684e7457434d45354b722a2f2f415c5c5a7529494433244d6562435a3a63624376255f7d51304a3c264e6367393a442e7c65676175
5035553431646d5c746467745b5c6e4e712150523a6a2b6c75627e6f205c74242d256f50335736274f4d3a4a6460304a39785c5c7b28465075395a4c
2558613c46403d7d3142535a252c52245c745e302f4625634c684e4f77785124317a544c70316a7d38692b7e6c425d746e47647543563b60203b2e31
5575292e7879567b7c5f66296a44513e5c6e5d537631526223215a5d30632755e298ba472a755c5c2d2445205c74385b757d6e5c7470475c745d625c
22646f742a743162203e745c74663f487171537c5041723c2f41665124474a3d47692d26435a4d69532667435b69496228713666615c74405c742441
6363633a7d54423a33712731455c5c48285534724c4c2b526c4d726d7e5677486b6f682f3b5159263c6a267328595c5c4e3a376b6354706c784d5545
3d53614a3e573d5664685b6f5d7139304b3b4275695c744f31e298ba78355b76593372607b767142714370347d267d68737d2c617174375f377c7471
6d3d2a4d266d605c6e485c222347324656397d616441383c482b5e5d74434f5e4c5c6e39242362203e37323a49206f65534f61676724665c5c585c74
5b71554e32455a265c6e266a5c6e345c5c462c3b523c653f64666b592d532a49323b6e543465317d72504b382c66517a7665762be298ba3734417833
26642654753120612b5752287b32705023297a415433442f7651266f344a405921256a72555b3b4e4878594f7443347d2d62317c5c5c273757393857
593940605973545a54e298ba72375c225c6e3b5f3b5538685455407978485c6e5b554c714b46487b29626e7e63354c66202155252936477b5a703879
315d5f2874294f425c74582873486635426f475a5e475c6e464a4b5c6e3634754b3674724328744d34495253376726447e283d362d7640482a757639
2e2e722a696b3126362e41353669407e51494e64382077772c5c5c5957576a7a4041397b626c454a45632a633e6a4c417c3f6755482f4b2a522e6c6e
52614b643f3d497935273c656545355c5c5c6e52202438504b47312a4e7758447b487c4929632d44392b5a7e4b4c432c39522b29646b4b312b5c7436
526c3d4f3e742f45446f3c203275792e5b5d2f6a345e36727429504a6a453346357b443854746778236d3a2a703d5c74653a414a3171265124283171
582d235069383123505d75482c4660447b3f4147717360364377455c6e7d204144734b4e725973532c414f54396824415c6e77595f3d334b42563148
555d5d2e58567d46663de298ba55404e3220285a5562537ee298ba763b3a487221215e445e4443345c744f4262453f5d36392f3d6e4454563d243e60
74255e5c2256446654425f4724244d3c5f322f4145233124476c205f6c6f4045405240325d725d466a5661684a59705a7b605452342b6756665d5b5c
7446515a3a6e524a55452b485e456e2f4e7b562c5e6b6e564c574a567b2643255b3e5e696834306d584f5735362721652e692d715a7c5a673c527777
67297b545f403120232f6d59342b3b634e715c743e552b5c5c4273375c6e53e298ba6f532744577064217c7d3a494f246c5d6f564b796d693b587c66
51745c742544372747334a633e7434774945493868202b293b204b52727e6b486539594375562636766c765970532448417e39235641535d7d296529
6a514d7d3166e298ba485d473354443b455c5c735c74414c476d58455633585f7a375a3f792a232a3b532f725f5e2571302463656d3248754a392160
374e6b363425653b3c4a4e732d5c746b755e7a60404d342852583e3930314c27417b3e21664524497974265728503e65427a4576473c7049552a6575
6e722a523070327669273b5b55412b5f6a644732384d466755476224507a505a394c266e4e70e298ba4a7b667c5d6c3e2526347478296f4e665b5b28
343830645154515d425c6e7d245c7431524f3375735a50415f7277533c5b382e555c74e298ba2a7e365c22762a2c64643021714034613e536e596350
6b6c3a5335494f777d647632273156544931522d4d24672e44505e743c4849746f3c292634655663545b30777a4e3d484f455d7a3a5c5c374f6f5764
7c3f547e2d7042322f325262237d6758332e4453577038687227382a4c4725485e6a2858495c6e784e293f6f2e4c6e68293a277c3433413470726073
48273b35747076535d667e2f24455f687e50502358264f4a55725335727132663c573a3f647e3c5373256a5c6e266d645f393c78583f535633416321
2f496d7c3c347a40503c45402472756836465e5c6e7b77665a4e2b596257245e54435b314f5b6523693b402c23582c7d2c694b793125726c635c6e69
5fe298ba565c6e266049705c6e33767c25382c29455a2d3d2f4f3a3e77273974213e6224406348727b3f652031276f642336685c6e2e2a282e4d6226
2b7278503a7262313643455b7366476463655c223c216f584f5a587e4c632c6277e298ba6d604643295d59405c7426293425542a4e5c742d437a7136
793a7250723d7c5e336a44256d303b56575b5d6338393b47207c612b7c37667563646e26623a715d25254d62624c36623e2d49715e6073773d257135
6d7d406a4b695f6637264349352569486d5c6e64347763573a252f7d3f5e6c70424e6035636327762f20765229457960276b747b2339416b3b7d5449
5e3335727540774b4c3a653a6345484f254e7852435c6e257324765240313e752868786d4e63514e3158707a616e32246423683c2c5c223e5340654d
53275a647e2e2f683f7846455f2f6f7e616e287d70606e6026643f5b28372b3f67524c665f21325b7c5c5c217d534c53485c225c74433f27492a2957
733e6733442b553e5c2238e298ba685c5c514431593f676f27215a34595f2e5e593a2d295d29614077517d2761295968725c74303537647a62202b58
5845555c6e794e24605b62357a46607159383b61795c743862384272435b3879734c31213c5c746c633c64447a6253466e6629312a2459445c22544e
746d2d202e6e33433168443de298ba2a6a6d29627a7d686a37615961325b725c5c625b302b5720297528747050357036582d38215d6d41462e28633c
303d63566b7de298ba5b6b524c4f2b275c6e2f693a2a5323337a7c3b37423e34542545255c5c385e5c6e2c4c6e2d5d39314b664773535f663f466f69
632d34733d7e41762879207c553d7861766c7b5d6b2f4b2d605c744e456d5737623d3a2c2f7d3d5e374a6f5a59254b312d6b4b3723772431576a7130
2a20702f24736657273d5b342b4d5c224c273737267d4e492955557e6231327c487e395c225c223d775165284f5c6e5c5c31657b61552b4d5c742e5c
7472696f5b257a2f485523476163673b7a705577784635e298ba2a6b212f7c38536b33284a64534024745f2f2329305c5c6d5e7030247d4e5a3f3463
69346d5621435f6f3d466c4d6a607651294f735153625f215c6e536c7c54546f7d634133692b3b4c4252365c745f785955435d3a4b7b58763b4e7a2c
5a5d7753665c5c335d57286f492f36512c5a735c6e715e692c5260776d426e6d42583943345a255d7d3e69566b2770402a765a2b5657672c59405562
323c564e4b48275742354b376f2e26267c567779315c745c743f5c7459747d4b766b3b6e5e2c444073365776332e58456955555c6e4932352d60642b
2a2439484b5c227c4857343f55204d5859253b613d495f743f4449466a4d745929377755702d48632d4262794d68266a6c746045484260695c225b3e
322a407553672e2c4e712a665e2b265b4126493a3c43325d783446615c6ee298ba3c7a256a74322552766b607ee298ba263a633e3771495c6e602d47
58592b6f2a6b7351545451504c7225243c5c6e4634755172602c4b3b3021316e687c354a4a2c4969207ce298ba30575c74466825442d52472c737671
4f78583c2724382a5054564e405f454a6b3e6a5358776d5b51613f3b547b5d52585e403f7a6b6b375c74686d514737472c222c312e35343334383933
3434343036323631382c7b22e298ba7842223a7b2276416c223a7b2257223a5b747275652c7b222f223a7b226279746573223a224b6c4942324d6a70
3356347a7578366a55726f34457843446e444b6d786e64644830544859592b2f742f4f4e616a6d58784c4e616a562f63724850456859614141766d4f
6b697a55415a556c386e6e662f2f33674d2f555558536647312f516837784b5746702f38302b2f47724a6868586936416b4950666f383134227d7d2c
7b222f223a7b226279746573223a22664b68324f73574c795971746c6e34504c41227d7d2c7b222f223a7b226279746573223a224e6d756a6d343134
227d7d5d7d7d7d5d2c22595c6ee298ba4d7c223a5b7b22414932312d79705f4a4c346160522478202e72223a66616c73652c2243455e6a4f6164223a
2d312e3539343535323539353233363830397d5d2c225b223a2d302e3531333633353635343134373332382c22685951223a6e756c6c2c226e223a35
3233373131343438313135313836357d2c226e2b3123664d223a7b222f223a2262616679626971676d357270666a67666e6561366a79656d6e336668
34356e656f6e65707378686b79346d7a363278636237746a706c74346a73693663737472327a7669627a7676786b7778773637733436677a78363769
377178777777747a6d6c68346371756c7a6c63727236227d7d5d
```

#### String form

```json
[null,"?zq64>-AB,9H~Ey\t@BCM#~)K;*C[Q5+s0Y,2GZVf{QM>{j6'☺#b W%tJY+`ID7f%3[A {<M;E~&PEjVZ ({P7\\j-yA$u!$o`A,JT5g\"-h+`zg(CcpT41^B)K,7=\\A[4\nt☺oO|=o6F![Kda{k51N%E?Q7~6*KqNa\\OLpVxPN^v'>JRv[~`92vU,f:a#HJf\nPIUxr_oj]-<;Hd!&9Wh`X\te0R oF/_(2hZhOEE^Ox-.MQS(+u@.ua?nz<dw3x@{*JYW\nhMe.l@L/SIYUfQkI2CRrmdU6]vSp2T!o486YU>.Fh\"b0.B~9\n\"S|p{`lw/L7MJ\\`Jt,X2#eI<nnW#1c`R#ALQ/'](E-uz/Wf/?PA-C+.☺nT0TY'%H%!])kh\n9D[#.xpv,k+Tk?bru?rJu>,XY}☺Gl;9C\t\\@z>4J#rE,-O>c~*YBAa3d\noe|.UPm;e4pe1B-^88\"/h5/~~1Qo-L\"q7_&G*!Az*B*hXs,(Mhz[,P\n@=L.5&PLsK\tlNE@k[q.pI*x[)n1VN:h^HqTYi}*->^v;][Iy)P8ga{SrE]uVk1q5Yd`dH\tf&#rAf(S70M#V'|QC& $f;Pnma^}uql\",@E)\n*GT9O MR=R4D*`T-%v|`eQD;5a%Cw5sD#u1A0Vo8CN)S5KwibDp~+)g/%8,H%<sP$kUZt;oqy~WdKqb|Q&DHQSN]!D+GGbAR\\|F/o'T#74$S{\"`%m&0;yVpZ\t?=\n\nEE\"|d\"'l08SM;XNPDwr☺D?J\":;4FVX2`02`\t;~V\"Ra3gE}'FiI?Qv~L%b*14fX\t☺jNK=Mx=J\\oVLui<\"\n2TCB(k6B~\\LODf@u14Vm7\\)2-(x[almc`%'\"Aklad:D)ApDy4F`nu~ED|w-=+'x_Jvu_1u:z<}YAY%m[LV\".G'☺HWf$v}'~\\0RL$\n\\beIrf?>mm&j_l\\38A\\{P@E04Pw!O:_vf')x*llkP☺&c@-NPMCU(N\t)~)tlP\"_TqYP%g\nS^o+[i'e\\[\tN iiwS5C%@\\%W3R*T]$\tgt<Md-0y8# B^R})/9;ZW[\\;HG7p\tQTp;d]U$ y\"\t+?hs(Gv_w+0D'uxA&RF;n[gK.UfL#wE2%Kifqg=K<g\t?PpC+iy7$`y,Ez'G>2DF+Y; )K#}-B@U.&1gcF#v)@av~pDZ?eQN_qx=3W2}~Kq7+LsB6rIa@DAHU\",$byIoxfIgl#hoysNe6ER$F w@!Z*(Ou6I(r,8}-28GgF5fXK1JS5r|`P?gjN#2i!jyPQo2@&5ecOW=59s4{}|n}* -5`FWp-}%,7&_b|d\"lc|\\)->,QLq]7;X'z;b#)-rGt,~☺0 ~8 H[U7Xw@nd$PP1~mG\n5,!scC__enkT42l|py\\K}eou)I7J6Ff/;#UTe?z@][x0/U~SWP]8u>k~V<3~):9>K*|;Lm)\n5\\k]P<zXBfu)_ZUNoc8_'HKG\"Izd}o\n\n=kDTz_*?f{!sMY*r!T}57Y*",{"Ke'4&KX~7x!A%(HV6jR6D\\1eZ,h@8'l_5A,v,H`5mQc":{"*H":true,"9":-1.5732440430873094,"EO=sIN":1513542843356821,"JM":"1}xtAYg\\Mvo#Ic4 2Jm\tCsSYNPm6:Nf_%UMV$o~9:9vAs{u3KA^A )\\wj?zk#5iatzY3kLJ(Sil/X8K<{b,Zoa\ne?B@iu%.o=*,NzLnjaudh\"M\\cM!Ci☺TV1","Um!/A\\":[null,{"/":"bafybkmaipj5f5pxgvyrmej5fjeepdrp2negnmliz3xucrml5pln6fgglswhqqjohtafkjsdkklwcov4oag6q"},"T2'>z7y,X(;gHD][lEZ9/'_Ul\"T\\'T&}RE&,UE-&BU:9x/h zgu@t1'\n8kPg>D~^u<c7>Hjyo.[QybUY#C~m%/2^A\tGkX_C=4*\n]~QH;☺h2S{}> 0>dF,,7w.Nc].1Kp+{JSdm%L,_Aa4u(^|vi3)m|wx9n0V`lk0{$a/t-+ggcUlP|Ua(mY!BI3F{-JrG/V>p=hceB=IJN<&dy\\9Ca7{HaRed/1\n2n`3(jO-Cb`IO)WuP3\n\ttJy+O(?~WCoA\n+5<Y>>Cs:s*!\t;\n`8,QLB\n<z%}Tf7ppMR7!\\1g7WdjLl78]F\\YI:\"`o*T>IyDdivsW;OaG(^q)*Inm(`%bb~!X^EIe?:Vo}s _SM{856P31NO0UxpphNtWCME5Kr*//A\\Zu)ID3$MebCZ:cbCv%_}Q0J<&Ncg9:D.|egauP5U41dm\tdgt[\nNq!PR:j+lub~o \t$-%oP3W6'OM:Jd`0J9x\\{(FPu9ZL%Xa<F@=}1BSZ%,R$\t^0/F%cLhNOwxQ$1zTLp1j}8i+~lB]tnGduCV;` ;.1Uu).xyV{|_f)jDQ>\n]Sv1Rb#!Z]0c'U☺G*u\\-$E \t8[u}n\tpG\t]b\"dot*t1b >t\tf?HqqS|PAr</AfQ$GJ=Gi-&CZMiS&gC[iIb(q6fa\t@\t$Accc:}TB:3q'1E\\H(U4rLL+RlMrm~VwHkoh/;QY&<j&s(Y\\N:7kcTplxMUE=SaJ>W=Vdh[o]q90K;Bui\tO1☺x5[vY3r`{vqBqCp4}&}hs},aqt7_7|tqm=*M&m`\nH\"#G2FV9}adA8<H+^]tCO^L\n9$#b >72:I oeSOagg$f\\X\t[qUN2EZ&\n&j\n4\\F,;R<e?dfkY-S*I2;nT4e1}rPK8,fQzvev+☺74Ax3&d&Tu1 a+WR({2pP#)zAT3D/vQ&o4J@Y!%jrU[;NHxYOtC4}-b1|\\'7W98WY9@`YsTZT☺r7\"\n;_;U8hTU@yxH\n[ULqKFH{)bn~c5Lf !U%)6G{Zp8y1]_(t)OB\tX(sHf5BoGZ^G\nFJK\n64uK6trC(tM4IRS7g&D~(=6-v@H*uv9..r*ik1&6.A56i@~QINd8 ww,\\YWWjz@A9{blEJEc*c>jLA|?gUH/K*R.lnRaKd?=Iy5'<eeE5\\\nR $8PKG1*NwXD{H|I)c-D9+Z~KLC,9R+)dkK1+\t6Rl=O>t/EDo< 2uy.[]/j4^6rt)PJjE3F5{D8Ttgx#m:*p=\te:AJ1q&Q$(1qX-#Pi81#P]uH,F`D{?AGqs`6CwE\n} ADsKNrYsS,AOT9h$A\nwY_=3KBV1HU]].XV}Ff=☺U@N2 (ZUbS~☺v;:Hr!!^D^DC4\tOBbE?]69/=nDTV=$>`t%^\"VDfTB_G$$M<_2/AE#1$Gl _lo@E@R@2]r]FjVahJYpZ{`TR4+gVf][\tFQZ:nRJUE+H^En/N{V,^knVLWJV{&C%[>^ih40mXOW56'!e.i-qZ|Zg<Rwwg){T_@1 #/mY4+;cNq\t>U+\\Bs7\nS☺oS'DWpd!|}:IO$l]oVKymi;X|fQt\t%D7'G3Jc>t4wIEI8h +); KRr~kHe9YCuV&6vlvYpS$HA~9#VAS]})e)jQM}1f☺H]G3TD;E\\s\tALGmXEV3X_z7Z?y*#*;S/r_^%q0$cem2HuJ9!`7Nk64%e;<JNs-\tku^z`@M4(RX>901L'A{>!fE$Iyt&W(P>eBzEvG<pIU*eunr*R0p2vi';[UA+_jdG28MFgUGb$PzPZ9L&nNp☺J{f|]l>%&4tx)oNf[[(480dQTQ]B\n}$\t1RO3usZPA_rwS<[8.U\t☺*~6\"v*,dd0!q@4a>SnYcPkl:S5IOw}dv2'1VTI1R-M$g.DP^t<HIto<)&4eVcT[0wzN=HOE]z:\\7OoWd|?T~-pB2/2Rb#}gX3.DSWp8hr'8*LG%H^j(XI\nxN)?o.Lnh):'|43A4pr`sH';5tpvS]f~/$E_h~PP#X&OJUrS5rq2f<W:?d~<Ss%j\n&md_9<xX?SV3Ac!/Im|<4z@P<E@$ruh6F^\n{wfZN+YbW$^TC[1O[e#i;@,#X,},iKy1%rlc\ni_☺V\n&`Ip\n3v|%8,)EZ-=/O:>w'9t!>b$@cHr{?e 1'od#6h\n.*(.Mb&+rxP:rb16CE[sfGdce\"<!oXOZX~Lc,bw☺m`FC)]Y@\t&)4%T*N\t-Czq6y:rPr=|^3jD%m0;VW[]c89;G |a+|7fucdn&b:q]%%MbbL6b>-Iq^`sw=%q5m}@jKi_f7&CI5%iHm\nd4wcW:%/}?^lpBN`5cc'v/ vR)Ey`'kt{#9Ak;}TI^35ru@wKL:e:cEHO%NxRC\n%s$vR@1>u(hxmNcQN1Xpzan2$d#h<,\">S@eMS'Zd~./h?xFE_/o~an(}p`n`&d?[(7+?gRLf_!2[|\\!}SLSH\"\tC?'I*)Ws>g3D+U>\"8☺h\\QD1Y?go'!Z4Y_.^Y:-)])a@wQ}'a)Yhr\t057dzb +XXEU\nyN$`[b5zF`qY8;ay\t8b8BrC[8ysL1!<\tlc<dDzbSFnf)1*$YD\"TNtm- .n3C1hD=☺*jm)bz}hj7aYa2[r\\b[0+W )u(tpP5p6X-8!]mAF.(c<0=cVk}☺[kRLO+'\n/i:*S#3z|;7B>4T%E%\\8^\n,Ln-]91KfGsS_f?Foic-4s=~Av(y |U=xavl{]k/K-`\tNEmW7b=:,/}=^7JoZY%K1-kK7#w$1Wjq0* p/$sfW'=[4+M\"L'77&}NI)UU~b12|H~9\"\"=wQe(O\n\\1e{aU+M\t.\trio[%z/HU#Gacg;zpUwxF5☺*k!/|8Sk3(JdS@$t_/#)0\\m^p0$}NZ?4ci4mV!C_o=FlMj`vQ)OsQSb_!\nSl|TTo}cA3i+;LBR6\t_xYUC]:K{Xv;Nz,Z]wSf\\3]W(oI/6Q,Zs\nq^i,R`wmBnmBX9C4Z%]}>iVk'p@*vZ+VWg,Y@Ub2<VNKH'WB5K7o.&&|Vwy1\t\t?\tYt}Kvk;n^,D@s6Wv3.XEiUU\nI25-`d+*$9HK\"|HW4?U MXY%;a=I_t?DIFjMtY)7wUp-Hc-BbyMh&jlt`EHB`i\"[>2*@uSg.,Nq*f^+&[A&I:<C2]x4Fa\n☺<z%jt2%Rvk`~☺&:c>7qI\n`-GXY+o*ksQTTQPLr%$<\nF4uQr`,K;0!1nh|5JJ,Ii |☺0W\tFh%D-RG,svqOxX<'$8*PTVN@_EJk>jSXwm[Qa?;T{]RX^@?zkk7\thmQG7G,",1.5434893444062618,{"☺xB":{"vAl":{"W":[true,{"/":{"bytes":"KlIB2Mjp3V4zux6jUro4ExCDnDKmxnddH0THYY+/t/ONajmXxLNajV/crHPEhYaAAvmOkizUAZUl8nnf//3gM/UUXSfG1/Qh7xKWFp/80+/GrJhhXi6AkIPfo814"}},{"/":{"bytes":"fKh2OsWLyYqtln4PLA"}},{"/":{"bytes":"Nmujm414"}}]}}}],"Y\n☺M|":[{"AI21-yp_JL4a`R$x .r":false,"CE^jOad":-1.594552595236809}],"[":-0.513635654147328,"hYQ":null,"n":5237114481151865},"n+1#fM":{"/":"bafybiqgm5rpfjgfnea6jyemn3fh45neonepsxhky4mz62xcb7tjplt4jsi6cstr2zvibzvvxkwxw67s46gzx67i7qxwwwtzmlh4cqulzlcrr6"}}]
```

#### dag-json CID

```shell
baguqeeraxjur4srzwvoznmk6j67r7b7xfasxmat3lgt7rbxljfisd5ffxwva
```

#### dag-cbor CID

```shell
bafyreifezesrhv2arou5xyxhst25w62heatiwrdedxlrauaempvbjludtq
```

### garbage-17

#### Bytes

```shell
7b22223a747275652c223126402834724f223a2d363337323937343438373634313631372c224b7425223a7b222f223a7b226279746573223a226570
7445344a67507a495339716757686337557a7355635068447332474f374c6c6a68393731376a644c6144346955547373643234757355307875344450
39516d526a34635434636a6549527576416a524e7a6a614f42797a4f58566d423643316f6b45654f4b7378575a316346726f4f61664a4b776c66596c
51753376766b33516e477233696d786c75744c74322b756e31306b7a4569392b45735677366f414d39376d6471635552332b49777149716443395670
6a57506968484f61796a7a63367433396151484e37414c364545334a32666b555147716a374e79426c6f336e4e5a76384232546b506e47627670664e
335253646b343132306e58617a7351374375664d7349745866663177227d7d2c226b3373223a7b222f223a22626167757165666a716a346933683236
6a6e7774616b777134326668716c3269346776726966676c37716b776d7061657366787978626e6935796f6b697073336a75357967656d6575327533
6f796479696a6c356565227d2c227b223a7b222f223a7b226279746573223a22577a4d4b74416b7458534667625245653634756b684a62386662626e
62674f4848616b6e4d75396467564a477338756331375a474d354d75417732686b7938482f344d70775136597232797945715552672b2f312f765078
72486143665562496541645a43557a34785076646664644479724c2b5370374d6951612b3647444c6a313465796635747970764a722b766f7735364b
7171365542555944387264464b5a637771444e49507a52626475686c312b6d6b36573261674e68566136596c53794c6d53512f516c65325463795359
6862584675642f6f5a622f745567414d61646149596755363856333246566979456c59774c45544e2f4d38687a4a574277444e794475734d6b574375
41486b504b453542703054414c7a346a3050556b44777935366b5938766c32724559324a666d765873654677796834383049797866355050695a4372
4869464558326433766a594d4536566556472f73646b5068326f5058626c6472636264537450327762793779617a51696a2b33643771354d5a757769
6c537836543349664b467547474856505757527837365247697546676b5176495a4e67747133554a585a5a75642f374a67586f62684c4f647059646d
39597955725545524f656f616d30565863502b32365a614f794c7746496a75485774504f39534c70495a67717571724b6b476141426f7057574c6566
5030475a2f436a756b487638467830506736672f674b2b523959666c55506c50684a474d377a4756477a2f73715a4c392b4d76474b4e387354784f6e
6e4b68762b4d51677545672f6c2b3748366a6b7767374a676b665650382f716d4f77706c783566686d30766934774e697167716e5176396671414b69
4558565552423851356448685a32664230335339384c3077412f646c344d35786335527a686e483863496f3854727076786874536e335461624b2f50
4a2b6c4859766f4a2b50796667586355416e416672694930514241664c4c47672f7564685a64556b73306568525831463667336e3056684c42453668
342b72613359412b3969507763627a7349326f4c587039386345564645676e3246563948352f56435739597068494439596e35642b4a376676754f42
4a45666747394950454a6d4361377a65442f622b55555565734b71512f61714731477843315a7675457141623577347130436239435a2b6568593258
4f74412f4a66795552496d566d4966375a5273446c31664947554e54527a56626743487365784565745a49376a5551725031455435647a414d416571
4b72793351314f44622f7544596569524669527941682f414a5770456b6e37564759475956585a54765a46485864704945354c36624a664441454d78
7a6737542b554b343336514965564a366757344a555574413471715772336f2f7253707758677170713033776c6444356d4d6a34542b665675562b6a
4554482b794c735a6c2f66794e3450754d5a3465595367424d79346d6b31615756662f656f3474627847613749494c686b35575a4b6358592f577677
4e6d386b6673636b654a774f475658454a546f6c6b7241396645546333376d7946455479384e5130386250476e4f325346583076344a637a30636e61
6a3053587959486c675676504e6d437779446974694664674c7459464e3648534a31436c6c4667715947424b436b38652b6e462b35376c4b326f4a38
7731613435577a576e5a52474e7432565071584e66346d73556c6350316d567447597762576c773635664d684e474e4f466e4a47363958573070637a
72674c66716b456b673744456954636a6f317541556173746e635a6c6d78624946516d586e327662586350384a746f304f4f516f367664756d41664a
7039327446466251433130764f6376325a764955596e33424454722f714f5067654a48584d464e544230396f342f75544b6c2b46534f335832656364
75702b703872636174573072502b636731707955354e494f62666d62683845757946506850774858525431372b3534514956693079542b5877682f49
74507173787467494d7470686155464e33475371394262596a785435342b79372b6463716e4669746d4e7476314a39566b4d6c79587a7965792b4537
365a2b633277554c683977713463626e2f3538735a2f5859483070324d4d6536584c7976576174755759494152735853726f4276323376336f614561
796a6343564a6e76414f2f314755615361344a327032517875374a5373557832756f7871754637514e72527069633967326a76734c4b716361397639
64304d3672566564706d7135524266564e4a356e6a44343963356a4a67623067683739396c61535757714a39662b3641466d6a61426e434669456939
467445374b6f63396d6570515847323663387947646661567836794b2f327a304245314d366842774a7546527532336d3376344e755065792b71752b
304d6a2b516e7755616b51527172383736674c48517a31466b49317247307a4b776c674a68494e476b6f433365326c77732b4a765a6f4b62657a414b
616632544f753974742b33326c7236485a384d69357a4953415a7573527a484f4d30416338494536676a3667637675466a6751594a6b50325a684250
6f67384e2f4c5349366a783532397442345a6e6a7a4334587a6d724c3172446c776c305a6861506b6439642b75476f43436b59443970456847527149
73536850336d50785646655768335a796165644b45512b462f78437a797a6f43506f456179564268323468306c733878315751743338393034537a39
6a54754e76443865445a6c386d4751485a7868417a646b35594e52424c617754576b77524f647034746a61517a664237723347625664613959676370
4e6a355841504542356a306c6a754e58365259777a544347414e6f455a574b77537741794c536d6d364c46566e586e4c314379396d566c4e6854786e
4b5549486c6d4474646a334f6e4130384643455034744d587537674636454142503665537061786f51336f4b485643702f5a46347141455639724e64
4f566d6f694a474758726366757554554a4767792b65684478354c51412f73636377794a70534b79774b447739417938424f5a582f77457850356331
6f754231373078654f43736e785145347456653666467369596f745878516168416a776f6f415a644b4e6952476e2b63774d37756c6d365648594a44
6772554c2f32717657495242744b6e45505769466e6d4a4944582f66475a515953324869437a4963396b38432f55682f434f4364704372717464446c
55466e4e423258664c55365172677a57487a782b3055644c772b717978787065446f37554a56626a397a4d75614a2b776339777858522f7357514d76
4342777461516d73614f516e76546f71556d64392b756c517535476432786b7a4967616c306b6f73594f4b625565446a725245326532636b74543156
6b695a7a37414f68347661704673557243316968376d44794367767255556f6d6161396f515632616d6478366f485a38594e564f3148524570344b2f
472f66477a6a6f646a426b71354362364133357761584f5a35684d416432444c6f6258614c42576f5379396470545643424b546e303642506c357335
6c4a6e6850537a426c6369525157447a31696556386e6243552b657233424e6a374e51376a7a596e4953683977456a536a66707762334d565339504e
70764d73554a4f52514436647466713138583667535963347365617a4675386d4a4d42493646415667476d6543562f584b50773956787a796d744237
4437727649516a77306f754565664a456c347530597541694a4e526757474d7649613547652b4144574c3279793159564d66456d7a4a313846493953
757474654673396372335151504355486d39466759524270344e7076585a62544a67784e6971693456797a7a5775664b4945367774734d635a662f53
78397454386d35724132537244655857707a32743655734f6e72507548723475794448635a36444874316b6752573544707a565730462b654e745a42
622b32684747454e4f37394d6f416966786a6b4d34783946727670724e4e4c4d5a57506f474c7158743933313972707a6f576556323476736f714f44
3979396d5878557130577039304e5770415461694237666f6f537877573236413034455969784d47394b766f4d3069715a734465446b4e4964587151
5a346e624c63383348787a677169493550583572574c694a514f6436433147547453394c3848526e4c4b36694857437179794142726a31772f696b48
67376d484b47675a6a465a634c316d464d474679574e5a5751617063707a5157324d50584470613761765a6e5432703065367966537330642b4e6939
47787932754370474745316f49444f52754e7445374e566e72426369374535425858636f6a326e746e7132455a306f42434634582b6b5845447a2b59
366c314938654d6b616e58786941554c4d547771626a44356a62653035422f3762747142696d4d63365768376e5572656a5071576a30732b77332f58
34315a564c694c77447769784f79593859427537664649545332746c75756a62544a7830646662587763377046413734344a7547686e725871373530
5743482b54476570376f75372f73545673517437582f30774f435439564c4742526f4c49746c4957794c5a6c305a4f4a53574a6337696a592b693571
506a3842613743456d3636477a394c697479364171634931537042354437415641776c696c6e553171774c3052574f4564736f503453654f7563785a
4143695243575679747957754e57486454694943666a35486d33394c50306f784d70505230375639437a6c306b59646543657268684a5978565a3264
3658457379554d324b4c4c61777a56507359685132447565734a5071622f315641355a4977777773794b43335559775336732b774569616d59764874
7044714158585468705863316c494266707a49637630535759386649425a504c61315477634b7849634974664b4c76366a7a4a796a6b584c31796d70
6b2b575262495644517441684278714831577a464645743674347a64344133346636714d4d6d466548326e62654f61744e7832716148337a6f775765
316f6532644f5a767a4134746d345943514d663669786d6a426735444a4a78664536655575765945614f746669645044717879364477677973565a37
49527841354c5a75524d576d3662426447316552746f33544e746f46744445646a576a36353457752b6e6449436c6b6f5543397578374e5a7650486f
555963356f7863554656734d766e69544538682f6f4c336478685941766364634261584e484c705545493576744e7433634436576c386c776e624372
4c445639476a4d3950454c514e58556d564a584d4a2b76536854485278416a50476734746a586576345244674e365839577258634f594d4f58534c63
56632f535964623452656f4e73523872676d4368326f5a537875374f3078684654787163744c63547375494b6276724e6b3631644c45655768362f64
435833437a6b6d75574d324b71413876612b624537514f38343033414176544d782f7a7356444d597a4d697330326f6f434a566d2f63484b75447345
56525a71676f654d662b674f6175796e755a516f47743662334b4a4a43334173695550704e494865347872426d753778715732696461324c4b4b356c
66336f4f4a6c68544c776e77416c4d6c742f76432b6b6265366f724a366c4c66356862724c757056796d6751353879414a504956364f623476463037
796451534133482b525468416e47506c706376554a4c6d657642796b703954546459337057513037522f2f56336e76366761554f6d587933517a3069
4b694143506778583134707342546b5347524f3663686468755541454644454c454a696643487556564c42424c67722f565045786d476c70636b6773
77453047375772746c4a706666436f6c344878774d33512f50343769734a4a4936376950756252446b77655969376165796574417a575957336f6868
573338416b704e6f595a4f68344b566f63627338694f6e656a6336756366644c6346574d7a6948586c6f2f47427774786d534c583644797073716964
426241494c59534f3858723462594f7933383036473667747273762b6b76326a354f5164734e526a7352316b7033513531694c505346744731575861
787863435073387239305455575262586e4c704f4e564a56474c434c513448793362767739556e4d6266394f517035372f78737338724d62432f316f
556450777775705361334d424d4b514446647143554c725353304b6679395854743263465a664f76504b306a6639313573554e467a4955697544614b
6f3972502f654331624d58796b7a4d456e794b684770506f775a3039465a6345446e5a59672f7943384e3239693633704b7267476b6f706d2f697141
705952635a3941546d2f5069666e585449592b4d773257586e534a6a6d6a723847377472367456487075717755432f4c7a3747387a4258524b2f4362
6d6e4c7469454d766d4a6c3058754e577758764a337067515430657169686e6c7446376176582f454153454b7a476154795268666a5a4f5331775452
2b4e3055486e572f62776e4f6372313136585072526d4556436b48654b2f3875426e4d426249536b362b6431556c4d3873544633384552742b667675
70664a51324532424434756b36544f766e48573550456a516f70474c6c794776745244584e2b632b6a4b5370764d736e61582b504d77384d6a37356f
4b7754425a782b3462736c6c544a4532334758654c47512f35477353455a344765644178414959765956514c50415964727a544e6a336c5379477a36
554b4263503838754631307335434c414432566d59766c31797350695664506a424e5866387077486770515a737974535932653843494d36516f6a36
77566b614f4f46397065795943412b4e4672563430304c324f45702f6e57765a306839574f4f356b6d6c45396d32476276586932746a334349725567
37587a54414b61484a4173376b525a3850414a66583554304f4656372b5439786b436e6a4c534631754b6f386f3034744855416464566b55506a4d31
7a5245562b394c4643445853506578536f49304b793645572f63703736556d56497557767375523578566c444e2f486930726947347a384a79746577
74476738465377534e78517a3551524b33757334305a642b66724f6377366f797266586d50534f6a32697630717454705730554a3358424d59344f31
6c6959424b4d783264564e6830455566545a42777a3068396f7a3757666a5776536664626135575568656551334a63304154706b464d454a65536a6f
6d32336663334e72334c6a6e514430794c596a31584c566c5530544e626955775861527546764a537a417247314170442b436f497851777068684473
47796438624b7238484a4c684e6838784a47775155612b366a5032506a506e326a5a3237636c5344504e47686d737078576741753874597775544461
47506b6e447551615432557469344e65474f474c7570694c5a5848486b65537979534942464d58644759564f4a4e70307a584c4a2f714f624f4b6d6c
3958495a38444a474e502b576355496845366142584b4c42766b545967345879474155395a59696d6d366238352b7042506a68372b625330374a5457
4b6f3831572f66446d676c58756b4a7a64577a69685456464c2f322b4b472b6935324171746e6d335a485443304c456a6e36777579574a75347a5744
4e64516361657858507632764e4264426a52433239357a57723749425439336c72314574394479547338786a4951794731534361513441526e644d6b
53574a4577736f4343346a574538546b7a7835784a32543030697143533376303553635a47464a753046666977522b38506659667461413945455362
4c714d32742b726b4b412f66645246554d5054777a6753675837317a6246454875774c386d583670517841756f586864462f75557a4f37536879746c
68487a6c654a67346579363874475a686b696e704a5666365967514e7a6c676f42304d774842713553554177363759554b77324f46386c6f57533855
492b6d43433368474354366f7058514c3057744452414543694930426d6332384449574573384668484d4c514c317954465a32616a674e5633675a78
416a6d4e704b5434425672647a333262577571574c4e784a684354375755624965632f684770564e6951384b2b307652475277365962504659324e51
41693867787763635a44544f6f3075354163455030716f6c635a62544d76317765762f6d4e754f554c337656526b34512b37693038617a596230386f
316f4d36567049673579303237394361447972796c33494c35496f59447534227d7d2c227c306e72223a7b223c7754497c4f615a6f235f4f377a5259
5e76324637515932223a7b222f223a7b226279746573223a2232674b6e4e43636e6e316570762b4f4a64564d37486a636b653945444a324d68364362
36766f695771784a65746475796a475757437951564555367147366b655077227d7d2c224e2f485e4f737b595458223a2d3232363934383431373338
30333930372c225376566c555c22223a225c5c7a7b7e306440322a4be298ba7a616b496177253e5c746f76232c3e355a3e4a58284a407479757b293b
45367b2a42324a6c4d7d3f722d4966786c5c6e367c415d67306c57424f7c213355323558592fe298ba6e3c61285273222c226677245b223a7b22334f
247d62642b223a66616c73657d2c227123223a302e353832303538393031363635343438332c227639642a39223a3535393333363132373231343836
35357d7d
```

#### String form

```json
{"":true,"1&@(4rO":-6372974487641617,"Kt%":{"/":{"bytes":"eptE4JgPzIS9qgWhc7UzsUcPhDs2GO7Lljh9717jdLaD4iUTssd24usU0xu4DP9QmRj4cT4cjeIRuvAjRNzjaOByzOXVmB6C1okEeOKsxWZ1cFroOafJKwlfYlQu3vvk3QnGr3imxlutLt2+un10kzEi9+EsVw6oAM97mdqcUR3+IwqIqdC9VpjWPihHOayjzc6t39aQHN7AL6EE3J2fkUQGqj7NyBlo3nNZv8B2TkPnGbvpfN3RSdk4120nXazsQ7CufMsItXff1w"}},"k3s":{"/":"baguqefjqj4i3h26jnwtakwq42fhql2i4gvrifgl7qkwmpaesfxyxbni5yokips3ju5ygemeu2u3oydyijl5ee"},"{":{"/":{"bytes":"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"}},"|0nr":{"<wTI|OaZo#_O7zRY^v2F7QY2":{"/":{"bytes":"2gKnNCcnn1epv+OJdVM7Hjcke9EDJ2Mh6Cb6voiWqxJetduyjGWWCyQVEU6qG6kePw"}},"N/H^Os{YTX":-2269484173803907,"SvVlU\"":"\\z{~0d@2*K☺zakIaw%>\tov#,>5Z>JX(J@tyu{);E6{*B2JlM}?r-Ifxl\n6|A]g0lWBO|!3U25XY/☺n<a(Rs","fw$[":{"3O$}bd+":false},"q#":0.5820589016654483,"v9d*9":5593361272148655}}
```

#### dag-json CID

```shell
baguqeeraybfqgviqwr3kft6v5imyqsulbdim7bs4joxaaezhgj62lyk7yqcq
```

#### dag-cbor CID

```shell
bafyreic7q3tnctze3nmouhal375cmsq76eayfsqp62srlxjb5d2j3ym5ze
```

### garbage-18

#### Bytes

```shell
5b5b7b222f223a7b226279746573223a2234745044485944573379774955396d5658643434684b64416c6772383771305a4d326f334541505a715663
4c424c5850586e4243705637384f6e4a5a5959593738374a45746271746b775a4f4a6d796835394b6b6c456e4d414b5447596847616f6f513246596c
52384c4d512b3536687164524653624279325932753038453858356c4a57557a535678355662786f51624f79623843714143352b3461645138475657
5376615458366e6c3335655774565344796f45506637532f6752686d6c626e52504b775449734b4e424237556b4a52793641414241735253714a6148
3078775958494736736e394a7a547859353366722b4f4f7374597a733441657156755a4b6f52534f72436e322b795a6c653854363542576a384b4170
48686a3834316b6d356c46583458566c4d6d7650774f4e4456554c78457931633364585849373076583865576753616475774837473668364f70314a
6e6f5a3572454630494e5242736c43792f717358546f61704d70346f5846324c425867704e4e5974784e757a7a492b776d79667a594a6f645264564c
652f53505a64754b4274756d6758666b6e31436d4d4d4d763164446a374f684b4d696a7557645656627358722f35627a5a3231587167546571767536
647943524335326f3150704233676b466133547678434c4576364a4653735730774373755a6571564b6e76436a447565667233775159456f4d766146
304c73552f625334757a39497a52774a6d2b7763704c3535374f55453655744b4c3673774c5a44414468625132334f2b7931696a4534655730453330
726c4c4f5349656c647647682f514378476c78585774434968435844574a63626c666f72663046474b63575a664d6a6c58647636354255436b524472
6e554e7345306d4c3549343078675334686e734f64667272756b62524b4a5354756543556b58774372787279566a586158526438674d565364557770
526f516a426e334272657956425934754e6773535a74306e66616d575077776536366b59344e3264353259466a364f53694457723946696459666331
784332506c46525642784336612f554c397a61516c6332365638304c5942503266353839687264774d6d523731324f54526936673634583642794933
56734746373643497374304e6e523779585074554f5a6d79775a6f6277367869494256514258424e45552b6c4638464d4b484f354250776747674b49
335351436a2b3874376e773143596c7a503074515067687133394d62726a532b522f516e4d66667062586b794e5068384c32462b5a33747647597834
46227d7d2c5b7b222f223a7b226279746573223a2258336f544953745436624666586d42743372754c58497a63566f4a6351544f56367742472f662b
79532b702b635030707759515a65376f4b7a4c4c6275574734484170725244626c324a714530653731426c6a367278506d7065562b6f485979384443
366d726845586b51496d743176586f6f6f2b6e4d516445524136472b6348657a58736771486f484449597662632b5946546170515362544465723053
66434e42527451675230554261674f714176416f51565135686554446f344277784a716d7343417541737a456b5046307558694d7062742f564d4a57
446f703766324f325665506f34427261415a4b4b42474f64396f42736a46496e346274573365684b3934747031794e33746e6f746a3363366f49764d
734168677768626a44544644362b6e7272436e4c7346647352656f457a79474b5074555261775a796f7968364a30555778422f3153694b7a57757576
537332355562624b6442514f4e44697138304c3430734e7a664b4e4e6e443954576a57493935766f33356b2f2f387237393330565272623551572b79
675866364967534c366c365a2b6c4d315266737943434c6231616e6d6f45777256673637327a30447548544277426e742b4c626a6a43396573356d4e
6a396443496746765658344567644f346f6f715261304752656e6c7070782b5846315666464e49564536682b4f65495a616e4d693346333141363157
71617a2b42667a30307048456e53752b353232366b6546485a457372586d366853314e36346b6b2b4f782f41575a464b354b784d354f43695943326d
2b746533596f526e3763496a78315369762f4865714c36574f337447442b3076636a6a492b6876717a6b45454566497255365942764b7946522f344f
545a366d7a78634257474e51686b3562574433497854645932687463373843486b562b4b6a7832697752564161647a55356f45344965482b666b2f36
7a3161785771556e33736a4c52716d79416e4c484979464a3172356f437a535135594544312b3333574535734d6e3842486b5763374f613052705179
513348745876756430736e4e6f7262516d4849595135347a325a575256746c6549474131687956784f2f4432316d612b51746e4d78345557344d5641
47573847727546754f566733412b504c75654a637534557a6641332b664c2f6d3269634e38364672735a57474d45542f57705556695579656145392f
674330772f76583446664a62517879724c447844596464327a5167426e4450526b4a68416c41774c447141574a686f414973575958794b4869734b49
754f4442756438644a657065564271494336454c514e6c554b7369336e433237793944575447744c6e306f443855413762545579362f764f3530364c
3676637a736e6358662f4c68795441417a4b6568794c46496b776a44377a75596d373046564d7233502b3855362b62413873425432624339486e7661
69464e5154462f634f69756a6d662b45333563644b316c43383067656e4f414d6847614236307a4c5041746b4673422f72654e626a63784f47534a51
7857674550362b446434764e3563557171314b6d4b59646f584b69476b706737326c726a7035685070614e44644f51666d2f41502f454f35315a6775
4e68714331663575596b585078587878494368655068306c33437059744f59554b5958536b6d665161744152376d2f6b53582f633159667838614f37
373448396459534a7949536643414c333557474d426b6d712b7465614f4f3435504a412f6d627a63794a75754145423035534e4c3036696c6b576a77
56526b66482b396e476c6667423135486a6f574d3746474d6c4e61507742746c747767706c3348707134472f533437794f41335a496d5a7873436752
6c5676594a332f6443364d656c7073666c2b61524d4f6c673930745030616a54445058505841493353776258366d6a4764526c74534f6c4c716c5065
314f4c52414c5035727755766c7862737a35445970796f304a3371553945492b33394c74384a4b445476506e526433686a735067376c37474c794373
55523353703550574b6937783978754d7351483451624f66794a58675042624849597a6637353859372f417a336a51615869384432377a6c79704d41
64496d61576f2b7431576a793953314666592f664f306b5671373562763838624f4d5351655234746e7a76652f457a446e61554931412f4a6c4b6e63
79526551534975497243596c584a76576e4e3957364c4f6675666350676745426a632f3269424f7951356736636b6e6564367a38527065417664335a
7a314854686373514e3462454a53596576396f5850656263793251657a6b4e556550724a65786c78786b49594936697330304e6a46374a50414b4944
4278757a4b6f2f522f5763547165527553693265493347784b6e376636426532796f4e554b435739783968616e716f617048766d715654544c462f30
4f34536274624648303445655577706e5658655a4f4461334d2b564643386b527159334d51744c75676a6d596a594241637634483049786337314c79
756f4a4d7037694434656d6a784c4e4e4969525731375246454279594e727679557248796e43504a624c346e69544b566e36707258454b48424e5070
4f6c3647744d373863627448547642352f797468784836626c346c744a72596c36364a573165795655702f42646f6d6264526e6771496e5430416d31
585677715670755a66365474732b634b4978556d3737306763596a4461345a4a42324c6b593344396869617454796a2b43474c713369434364367167
49446b535747474531596c5a6449643049532b7844375332526d7450446167355a463347384d364134615647677157574e6a665a3357666741736a78
7879464f543131424f3037553330456c64466b467061723735737867627353394a6e556c6c396f71776d69576c59674c703961693366504845427053
6b754f515273457275377a6533384e535238664456575877756a4e74303765354537706b777755445148435a506243364b5331345562724f385a2f64
566e75696d2f5a4d53315645555249636e443066734e67364e4b542b7058737a444f6a7432534548482b654171635957383232546739696431375a7a
77574769324d734c30326236586d43776e512f62516758514876614f74546e316c6c466a7a315a6c306e785041706132386a4d4f46397a5555353735
4c2b332b753557664374706856666b474746375178656c54674f714171646f4759497236326d584d55782f57575a322b765137704e6a3969626a5672
6d6f6d5464414965725173334b2b38376b776e506656557a594b6b32306a38614546486769774947626d53774b5a715433707359752f56486e305477
466a69695166584938706836734a704f3752776b797659702b3366752f3255505a5452753657656c4c506d42545a4d523432412b6a724c5869704957
6a67314e654b556178547970706b667a2f4b77596b705239396d4f2b5643745569626f6d337353506133674d38344c31584a4e78444641314d4b3967
42324e4d4b776c486d45416a6c38672b55726e5a47644a77394e687a493779362b7847414b63366e6d576639364e495a70383547634b7a474e727a4b
664f655935673132644249704d6e4e5072342b4f37765a576f76513573626c35724971324d4e6e7951426275742b79476c4e526b64653933316c7251
7036746f4d6b46636579572b5432474c7a7838713556674f476a7045554a75476f6f4a556a30316d55646648797757374441486179496e656e645672
4c6b304c67766d5739584e4f6763474d78362f7a65654f7576484f7678456c6c416b3050507068574554544168564b3349756f4739354c7a2f494138
495563327969675650325656676f5a584336505973626869536d4d4f45566f39587056416b70644b556c58795233423863576b476b5a4d3859336f39
4f61427334416c4b386d636b59716852414a4533726571747072713042434f756b326a495933686f71344a7146352b6d554146796959364e4a427175
69514f486b37543438666e7971686343676d4f362f6f6450385361657a4378537062677941374546635a5278437451526b6c50736767306d6c46752f
52765074627755586a4b4c7263374f474b4d734b744d3442654b76704a334a464b655839316667444d486c2f7a757276663677584e70536a3764456d
302b79435347666e576b50782f35412b732b796f33456b61316d65784c573931766b4872594b726d3373686471427472387677317347536e54794578
6e6e61704d2f4241516b4671784f6c397073314669692f556c4e36737a736b70373966536c71466948665a7a6335454a6355423445626a7033593566
544f516e3238522b686c4e4471322f6675434b744257744d307271707176364e682f5774625150374f494e785a2b76393261476a4539506f70324265
5a412f7a387865386f776b6e485a322b7a2b516b376e7364426d392f5053745759684f44724a5877364973456d7244333044644e4f55413231734c70
784a3941663277395778787a38396b4b49764d667931724d2f74455661584164714f4b644d364954774d636469304337414c4e5946445a3946755236
782f56445375333474334b316155674d5172346d3575476c3071524e4742754c796f5346354c31634f576d6f786556594c3669305a46376d764c7a43
742f2f735a79454453512b4b68705879686c4d33423058546b6f5a794a3358304f325a37355a76784633435676715874426d717968732b4c72756e62
2b4b3675557266394a2f704443546832494c314345516f71627a356f766d4a2b456370695a784a6c796349727a6a48485439753158666b372b42384b
6659335830484b3561396f4d3678576d6436383636494b2f432b6b4b732f434d2b4a50556b585258495a774f6b6c3744656639767a424a4154626134
6163785a555a78644150387957326c716d45384e786e645a6c65424c2f6f7146715031414b58557937375a3350657464524a7769545550744c513651
6a364f30314b735277632b4b7643513665642b45422f6537755a717668534c4456683674786d714857396a4e2f304b384f4b554a6c666c6f4c79634d
3375303277626f56556c445a30317374312f7563714a6f4572707149304e4348754366636f6e72764742315155754d784570474a487463755a6c5149
33634656686936305059463239634b35777541376e65684c522f666f2f4b753251312f57713954436273476a436e6433497a6f7554545073444c3834
4249697a65354c4f65414e326275384763464250582f3661782f745358394a66426d65636d485652597845612b313943695375594f72675749506854
4a726b5754626a2f6c63356239616d7a586650337a426c385a4f574a38734e424a38436c2f43735055686a4849385a4744782b636f4e50396d6a4832
4c7550594a744c413266583579677376416e4f417a2b464639622f694f4b30496f6e2b4671675a704773364b79744836616a3045596b4a6243566e61
2f423342453841426668695654717354317464743669656f514c64635730724967524d6d626d534c705a4b4d5575384e664865446f50673648643254
766a39366d76535a4d583745795934676e49747978576e3057456f6d4b43527a6947584379374e4b41434e74354333506838584b4f663147546e6f31
2f57503236575841767835514b683130796f7848583038374f65555168696f4d327a4f433167324a62747047426d7459466b55593772526c6a58626c
57427431556a5546713779334d4f61704661386264426648722f6331452f6735527646745177626d4e716954306a706f42475a47614c415070473050
374c396e7a2f7a756569374a794e49555937466c7a31556142774d3544622b374f79484954466c6b7334424a334c48684f3238775a58612b74567944
48524d4246314f706d6371525142656c32526864324e6b3547713768572b5032696d5850344d62484d73455242644b79757842504450656935563077
7739415537775249616645456e5a72775a41334b3438416c503973652b33487954346c67754a6559617259714b657a68766a4b563067637369564768
41616f70346842304d6b65366c6567445748732f6b54416379356b514b3672793856524131714638586d6b61714b447652775930335a616b77554b78
4e2b39635a4a453637366d555778436768584d797a5542304f5075495842307078533663636278677a383763664c76623170566167484b4276455675
635270574a7336524a576434516f57464a6d5948595257615233644e6f3348746b6a72674c4c692b71527439696c44494574626f696773416c772b6b
59464a506d6c61423130386131326154734a6e58733859346263426d2f673165565a314c757a646c33534c6b5a513970556d626e6636586c52353053
6242384d4d356f5a524b37347573756e4d312b45734b51625042666b62664d77384d517978763957392f4834437965414d4f706b4d6d6e6245564333
43366b795a6579706442496f597638624669546973337a694f74756f516e6a3731316f53745a78775a756d556f35693062596d41416149564558426d
70536d41734938666145337a794d7052302f77793630665a6a68697078305456514b4b2b73554a4e626665434b69316946345135724b664a6146316c
32565475597446686a41647a3778355848376e5a7a68397574646359793379714c36746d3269526241506b4b526341645455757271312b465947544a
4c42766e76432f4355497436336c41466d38436d6c57514d393964576f3978466470447975616f38692b74366a504945454b777154436e3156317731
7751522f65556a322f4d30674e6177695a6b5857384c767962352f38466c4330774135333152716a683434596f53736f4763467234654d4757423669
76374b516641614a4950587152786e3541413131496b7572464f51227d7d2c7b222f223a226261666b726971636571626236716f6a686a733774677a
703535786f707663703775666836647667636f6f6d706d74337a33326276363563756c737665756465746578746635726a346532756b763473703633
726a7563736b6a72686c6b3573786d72757932646a616b6e777534227d2c7b22465d73e298ba692e2e785034332b31755c5c3d2e44e298ba655c745b
5c5c4d79735534745f302d7b232d30694c247b616c68223a7b222f223a7b226279746573223a224d742b4e3751306f4d6b754848464d38584572614b
5442795a336c486f73354e42486c48762f2b536e5a676d61566a6e626c4f5143475a4252764b2f49553067514148633871795844767a6564694b4555
43796e7435634f3133324e7a31696d696d37344b6b54684b306d31364b4e4f6148584674522f6978746b384d6141686753555079734265713376636c
33534935545443472b2f58636d6663737539426e335669356e42457a46736e66713374504b37735944644a436b6f3342546c71624468532f334a6932
31655a42337668576576756d346968466e4752515053727470384332587046556c66646c48535052385547765177783277227d7d2c22476228244c2e
79472c6c223a5b333938373537353735303632393435332c7b222f223a226261666b726b6d623437763264777663367465366c656b32796e67323669
736b6a6a327a706f62647773776b71666a61757971696e6566346f6765787a32346b6e6962337772756f6a6b66746e6e616e7164657271227d2c5b74
7275655d2c6e756c6c2c7b22223a22522125716a4f46413134222c225c74362d223a6e756c6c2c223c586170223a7b222f223a7b226279746573223a
2248667536586c49793749533753336c703741643863693656753347615967577169655248505a7452616c414f537451635644384731487267494f4d
227d7d2c224a454063223a2d353338373636323132353932323236312c225f263f592f522d7b5c6e7a223a7b222f223a7b226279746573223a223339
334443727556636371344a666444746e6e7679592b6851684751503149227d7d2c227434223a6e756c6c2c22767a5e40487c223a747275657d2c5b37
3638363636313737313134303436352c224030503e513720725b222c7b222f223a7b226279746573223a22227d7d2c5b747275655d5d5d2c22657c34
397a6972722f375c746665394e223a7b22223a6e756c6c2c226f253e5c6e223a302e373130333734363939303534333335347d2c2267274a2e223a7b
2234223a66616c73652c225c5c2350223a7b7d7d2c22723949662425356877223a6e756c6c2c22e298ba223a6e756c6c7d5d5d5d
```

#### String form

```json
[[{"/":{"bytes":"4tPDHYDW3ywIU9mVXd44hKdAlgr87q0ZM2o3EAPZqVcLBLXPXnBCpV78OnJZYYY787JEtbqtkwZOJmyh59KklEnMAKTGYhGaooQ2FYlR8LMQ+56hqdRFSbBy2Y2u08E8X5lJWUzSVx5VbxoQbOyb8CqAC5+4adQ8GVWSvaTX6nl35eWtVSDyoEPf7S/gRhmlbnRPKwTIsKNBB7UkJRy6AABAsRSqJaH0xwYXIG6sn9JzTxY53fr+OOstYzs4AeqVuZKoRSOrCn2+yZle8T65BWj8KApHhj841km5lFX4XVlMmvPwONDVULxEy1c3dXXI70vX8eWgSaduwH7G6h6Op1JnoZ5rEF0INRBslCy/qsXToapMp4oXF2LBXgpNNYtxNuzzI+wmyfzYJodRdVLe/SPZduKBtumgXfkn1CmMMMv1dDj7OhKMijuWdVVbsXr/5bzZ21XqgTeqvu6dyCRC52o1PpB3gkFa3TvxCLEv6JFSsW0wCsuZeqVKnvCjDuefr3wQYEoMvaF0LsU/bS4uz9IzRwJm+wcpL557OUE6UtKL6swLZDADhbQ23O+y1ijE4eW0E30rlLOSIeldvGh/QCxGlxXWtCIhCXDWJcblforf0FGKcWZfMjlXdv65BUCkRDrnUNsE0mL5I40xgS4hnsOdfrrukbRKJSTueCUkXwCrxryVjXaXRd8gMVSdUwpRoQjBn3BreyVBY4uNgsSZt0nfamWPwwe66kY4N2d52YFj6OSiDWr9FidYfc1xC2PlFRVBxC6a/UL9zaQlc26V80LYBP2f589hrdwMmR712OTRi6g64X6ByI3VsGF76CIst0NnR7yXPtUOZmywZobw6xiIBVQBXBNEU+lF8FMKHO5BPwgGgKI3SQCj+8t7nw1CYlzP0tQPghq39MbrjS+R/QnMffpbXkyNPh8L2F+Z3tvGYx4F"}},[{"/":{"bytes":"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"}},{"/":"bafkriqceqbb6qojhjs7tgzp55xopvcp7ufh6dvgcoompmt3z32bv65culsveudetextf5rj4e2ukv4sp63rjucskjrhlk5sxmruy2djaknwu4"},{"F]s☺i..xP43+1u\\=.D☺e\t[\\MysU4t_0-{#-0iL${alh":{"/":{"bytes":"Mt+N7Q0oMkuHHFM8XEraKTByZ3lHos5NBHlHv/+SnZgmaVjnblOQCGZBRvK/IU0gQAHc8qyXDvzediKEUCynt5cO132Nz1imim74KkThK0m16KNOaHXFtR/ixtk8MaAhgSUPysBeq3vcl3SI5TTCG+/Xcmfcsu9Bn3Vi5nBEzFsnfq3tPK7sYDdJCko3BTlqbDhS/3Ji21eZB3vhWevum4ihFnGRQPSrtp8C2XpFUlfdlHSPR8UGvQwx2w"}},"Gb($L.yG,l":[3987575750629453,{"/":"bafkrkmb47v2dwvc6te6lek2yng26iskjj2zpobdwswkqfjauyqinef4ogexz24knib3wruojkftnnanqderq"},[true],null,{"":"R!%qjOFA14","\t6-":null,"<Xap":{"/":{"bytes":"Hfu6XlIy7IS7S3lp7Ad8ci6Vu3GaYgWqieRHPZtRalAOStQcVD8G1HrgIOM"}},"JE@c":-5387662125922261,"_&?Y/R-{\nz":{"/":{"bytes":"393DCruVccq4JfdDtnnvyY+hQhGQP1I"}},"t4":null,"vz^@H|":true},[7686661771140465,"@0P>Q7 r[",{"/":{"bytes":""}},[true]]],"e|49zirr/7\tfe9N":{"":null,"o%>\n":0.7103746990543354},"g'J.":{"4":false,"\\#P":{}},"r9If$%5hw":null,"☺":null}]]]
```

#### dag-json CID

```shell
baguqeeraekpmrlnfyhqxjyd63kr7izrvn5233kdz7rmowoyf4gnpoegj74fa
```

#### dag-cbor CID

```shell
bafyreibpbcrbcqof2v2jvjmjkmbc5y2n66xarj6wniro3acgphnwwypu3m
```

### garbage-19

#### Bytes

```shell
5b6e756c6c2c6e756c6c2c7b22262d3f3962223a7b222f223a7b226279746573223a224a6f384a71584f4e4134516e466d794c354c5a4a69324c536e
5175445359627556396343595157384946576265724a434236304d547868667869503635427339712f454d7a52756b75756d64313174346b30673147
497757434f53365268717054484153636649335a47617044587a5774394f4630707176537133534c35567366414a43536357622b456a533347373069
5038694c43694c7459652f314f494148482b696e7249524f524c65424d2f716967506753636d6a343661697a3048617a55794d437055714a52384158
4e354a457278784443793666476a32793643776166387177486565733049514246366c4769556a646e5933416964556766586648584664394f475074
37514b4f2f707a6c4846314d686d6b374e4936446b6d4e65466c505a30553754496a595a46474973474561697877654c682b61766e796f6d57667939
32397563507731416e305170725179427574522f30502b546c57722b476d4c417562397767556b4f3568424d7a3231307930446c4a46703039366245
454e526f383232744f62365a445139514b692f5a4c6e52304c58364869467a65676b6c637454674e4c45422f784e3931346375544b55513031685157
345543654f5478794e637a58457743704937334e657258705664715354797355534946762f67412f736733504b2f6b7846434e6a6676384353693254
4c494330533750747361386e4968554d71454e344e3179774362354a6a384a7a38682b706e674e654d794d77707473712f32726f544b317a77416247
5378497662684a5568392f7a65734b57686c706a626e3664435250594f7a6b536d6e664d39687966595032385034754a542b466362484f347962626c
6a4635432f6a306f704634373963717468465059556a4b4c54692f6c497a50756d706651684a54754c385a73514f395277416658696e427654537772
756e527a4c694a634e303155464d4a356473496b69316b6557342f2b505175726a624e556d744b67617a6f683478656262585833472b657a6e6e3772
555a4144696d6a4b4c77647472714851495974412b2f645a4b6155476e7a447778527a455155334d4732496738784a7a51506937474f6e306744554a
532f394d583731492b4f4c7944754737474d424b636353696d4a734a32794d7863646458485564646e464c4b4f4a6e436d5777594a647a776a677231
2f6d5a43456870525162624c2b583569353831776e324c5a716f36652b5a3371354378396b57597a4d4a69486d4b46744967464f4e68726d2b4d4849
2b62574446362f70686a3976564a3768684d634e69763749414442356f6a4b4b51785572722f46626f684e464c6452494e48446e5448664f61755a46
39623054624151756252796e4970586e4662464a4e37664f747a4e44682b796f34346c5848764441536b4d63787a666871503832526b624a636a564b
6667525361776b5642787338454e616466745247414d646c554847744735744e2b6f632f73336a536668574b65514a374d476361346469626864342b
41656a6973706e4453714275707573315758694273475a594d634f5a44343136436e63776f31386b31563065544c3178646f3830366c626f47786b6a
6b5874666b30644638676f512b727a6e754f65447a307936312f713158732b6176734c324a35546a533133424e595743537748793978776951554250
6c4765527350646a54776d4279456363556246796c626137564742635a5547757a2f515066794237657759514c466f4252436c787a6771564449765a
734a3537547273776959466b2f2f6c376f66795736387a4f444b70757a574f6f5746714b75507648786b4831386d4f397631424b3733794e36514e30
4e5732592f73366e72436639724d5a6d4a6d53495944374c7a6333543250684675482b32795433397054305666434d6d37697570386e48306a35696e
787a31526b3479584f6377544456467a6447684e7373723267714538414c74692b6d2f6547574b7061632b5241444b79504d33534b484f456e757964
304977624445664d414f774f624b3042384b3347703031455a5931556e766d58737163306841324b436f6f41485159306e3751314343355559394859
69706a524c486a74724264336c3250366470533670686730342b6d763054797a6376594372654178536b69612f5145757a3855533663442f5a734544
6e75363276637775707837546d326733704435725a3647584b6872446c327a686e4f464e435473492b54536d41474933426668503842452f555a4775
416a697277794d6270504e59416a58627751475450426742596e6b71376847665238534c6e6f666b62707253704875506c354e736b4965384b6e3756
43693251544e35484473423979655a616566417638642f336b69755a77566f3453684269503267624f51742f777478542f4a5a534f6a736637793376
50554c67686933747a614f797939577a75537378457436796179597474524665703731622b3037734f42794b48714262744e662b6a726b7061326572
78434962666d30305535556747366269655071496f6e59784e522b4d68655567343442696a68696d516f4247754d574a576951482f72616d31374c6e
3564526858696356766269756d2f527777576b566d4b6f4862556363725a446e4446426531716a567264442f336e51572b30574b684f522f6a2f6430
556b615a487139654839717a635a66575335454d57356859376974466d41317661592b7a493159474d58646d7357696d626d723748414e6676315659
52646f362b6a336d5a53754d6f2b644c59646a6a38467563413031306a7564782b7471444852684f65376a36447952366f2f36797a5643494a714437
4d384636704f37776167657a6c422f77314d48753378503469566d5a626c736d664855556b344161567865313539394346315472376a7749574a4f48
586a3162524567306a712b4730596c733764764430454f51664b4845746463676170527652444f6137464c386d796e32324575425377496f77227d7d
2c2235586a676f6566223a7b22223a7b2246223a352e32323038393032333035393731347d2c223f223a7b222f223a7b226279746573223a22775635
362b45767157434547766d6e7568464a75362f774635745372646334644b6836306269373643326a50633967436c6e63674f675969357450706b4972
617a706254696d525a575455303456302f4f4f48387877612b7976666178506b7237747a30356579776232695842363433665049494d33786a724c31
4a47474745397a52454d3443576f5a2b75456d744f30696e50496a41656e4b6b385272775a79613272386f305465306c58556d446472666f2f4c7847
7133593046454274664370416f714e6541594f374c424b5a712f56396e3944574d35357643707a3870586b70454e7a55467154422b6a367246393274
754367506f6b5069426f614c70314f3867794d5539324d324350756f5171455a647546746963357551374445675a5a62675353494e6573434178325a
77776b4f33736d477675716f446d30474c3266614a514b334271564e6651613754667a6a493551445262494468366a5a4d4437333631466b342f4b51
744d4f52394d49394858564933496b7a78756a4138464f4653794a34597059333361306c676b7a7633317a2f59624975576676596d58627932434571
534a4f42726a3179372f4d6c6b506147766d7056554f4541354c746a42726c506242553736537663733378464f62445642726f5a44526a6477347358
5a484e5a447033396b474c6e7a7a5378695370716c32774255426e697a506a43625875634d5450494f626d657857522b537252763361644c44433533
7333693463682b4463527267522b7164716b7a6f754a33677055536c38474a4971676f7367344d5562326b642b517835473255326f4e6e432b306373
5476777055716655377376526870645a703868737077596a3354533746387a664952794e766c4e504e716431366f5a3557686a67357975416b49624a
61663536436d466d56315a6849414758594139716a64713677764b66474b475a556a716e7665573236354a316e66326364706d4b545179486c63376f
4a7272503339497278444969784b742f77556f473661654b78556c6273655671452b4e586a636475614d47474f356d31434237384f4d756a612b4932
6e46424c754e576568335669724c6666786337613450534231584c376a754f335342597a337a6b4e34713730356b6b756f4d796848684a787748744b
756b3679646964524f3973483257764a33327946322f585235694b4c53566d54324c6767592b4442314c6e324c764d4d5a726e397763704d3652764c
356e626976433879744f69514d6f434a376f6d45507a694935583176583651335544316b6f39456e44706e7863563743556f35504a48456666556c41
4f4a49423531756a6a6b64746749325a783863304a4d336f645473476d765175326b34467a30727151695a71494d79386f78596d6f736f734b2f4e46
4733723368344570797a5449536838365174576f4870735a52627869586472784d3138474f495248576172432f537345417169444641326630627a64
7036737a53325655565333717444474344774735693859703041432f43656541352f796d516e5948506e3738463068474d776361574a533446442b2f
46795679314948424553433239657262797365314f6c39737a5447694a42394c424d682f574a49744c41673676774b346f654352416655444e504d6d
6f394b574f4458786657744b3869714d722f54343035436d387056324632626c783674326b6c4b554e4846555a45724f794d546852415172417a6a6b
32326e495a48387267544d4c794e347043694d57476f483953724c544454536278657032545339494d477038656e5958376e77425a48746c632f5a5a
753674386e314731304e33586e6350365759414953453576306a4c594e707441614b415367542b482b33535133446e6f496c6b72344556724931416d
4b4a423841635a6d6634447162417a593465656c4834434b716f3334496341327842674763704e3979702b65375657555258455753424b304d325443
32453647696c6c4b73306671657242524974706c754e6361437158454b57416c61455a67367a58524c612f7179506d596c4a367370334c6358566a4b
7a3266573954584670594f4d2f4f50367249755350436e2b6c51786258704c5565587a6a4b75386a303934536d6a476148336e627865783541773768
563831656747524e6d68714a6332436962686351502f446a75302f3354783662774d4c5341537048436f43656d6549727443516f6c486b454f446a71
476741705845303549325373424e2b70396935794b455651346752326747454671375a583469786a3268335a5a31307550595a59684f666e382f7664
48367639502b67506547514835356a443278625251576455465472624d55684c48716e6370504e6b4e6c63652f726d6c686e764e38452b5a3573416e
73343071544847505539516457504330706f35356635466d7144356473546e53626738376176796a4f584c447757337468436939746e4364306e664a
4b416c6633754f6c4436575a355157626675665148536f77797755666e744632456a4a49514f33356e4c684555754971722b67362b53695058353668
2b5148652b4c56462b6244596673585949655650733950483770596535536f413237475836712f364c784e6c6a684b6f327941425874703050565156
46324d514e50476e6c6a30536264345a62394e554850414f71344f4f3453574e63534730634f753063696d7351703270534e5432497877787147746a
50717975477866794d6578426b4a75556d6c4342465576423142456a38756756436d547656366a2b6147396f6e445059557a724d6f42326742696835
4b5479654e65654d6576517453336d474f48632b675a6b4657474a30674c75564d5a63732b6d4142766e56624a7a6d62426d2f65644d6256744f3250
36447a44426c4f455052676e5a715749573743305a4342412b52766f4a48474e5061387a434a73485946476b3368786e517449634d4f32454730416d
546b3341517a4f68586b7356526f344c304e7a476d3455744d5a35537a4246574a71446f65534778366a324d424e6f7665626259394a423450673848
526d613639497359535936502b6851395857366c5553434e3757632b4d354b436a3444764545582b356a72366f687134676272556f78304d696e4135
4d66593778354463414b67637a4e696d58586a75495651695378384877624e4d6b616c64365436723777522f793857656f5a794956344b3171755158
697133537a6e68552f65566543647a37494b61415a52747958705654322f63636e6a773639656e3863425239437551426d627a4d5870624753443236
485243574f474249724b7534785873456f627832355052714c2b54443272475a6332496153466d55644a584b446c514b6f7a7849796c33797a6a7567
697273574c4a3350674252377a567537416d74446673382f6262676d3549434471494e3350344364756644636c516d3157614b6f636d54305964794f
63522b70356e71506b6e586e7453687342586e6b34416e43394564425a61797836774b5658684f345962372b667a376168553349476b35326f614537
4e44513758767766694944766754325230794c3641304943446d2f764878443857644e4b565270347a3961456e493750774a5257536e674d6f785971
416661626935647741354432774436594a352b4f7471706237385463794e366e494e7747724578422f6e67485465796432395056764f453050597262
377957737775372f555948545a724b664d4e415765444152422b2b417737744b6f33396472725951715658775942704b4d445447375a674c4d736130
5156522b2b7643526a6f4433567536685a7062684e73394761416b356a4b747947466b765964553255524a46444d4f6b4c5a534874662b785338516e
3458554f3031356359764e54484a49676f306d377a452f787a2b745361646c7a4b67754469524a6c6e4e4b556d61533373557535664265717a496f36
594573672f506a4559342f65793735767058356e6e3542364d345835434d7175374b6b43793569794876354a63556b66684a63533038617363586654
67636c3077647539716f66492b67446737537a4c486d4f784c74476e633952497234685a5a6f4c7368596a365a54715a466376544c554f6e64427063
564f767475716244716b2b505945576b564a4c3252436f553954546857785a754f656c4e443436774e624764413056385774316755616f51556f6d69
4655494170654573725a5838372b35504d694f41474679425067327231527067504a48695476344465673258537348344d6e4657443953352b317868
3273666b37546171596c4e7a54633751425138464c363230752b4241516477594d4c594c6b6c3166754f5869724350724b736a4f78454b38434d4a63
583733526c77663571496c52754e3765614c495472524f5045354f3939326a6974785771396e74763958646a7667506935575048554a61584e4c6768
313947614b704854316f5874594f6c6166426e506c4b4f6d42475530617276374c78506c4d453836634f62566c366d44656b3468676a6f375a6a4962
30475a68566252354f38506d6e46463956537436532b62653178324261327a7a67365a50417a7a457a2f434e4f7738676d42737a484d726769514768
356a6c354b794b5556544c31637a58534a614f45642b307a73685a77745633504a6671324b63667166397131582f706a69684d6d775862683639676c
5165514a34562f4b78554564756843516b5555435a4a504e53366f5a6239724858485a5868362f52776a31303078595473326e526f65514a56696235
756e3949357576764344716848414b7a2f6569664d5138727a3974532b6c69693544616751594e565a3046613078776e70474a4d6b2b374258624d52
443872314b576f71626b69384b45556d7333514d2b727a422b596f63682f77437a3958543557594d516855624e383749373742337653534c4d324e48
77616b66383558786c4d6b2b3067427a614a3571533756693855732f7645384539466652736e646a5643386148756a686d327236557463764756542f
6c76734a4a6866476957642b4655552b6362566f6e65676d35794c46377a4a794f376673542f796b7651684d686a794573664f456a393562762f4369
486b6366656e7745334d49544375696b5a6864545856636c663251413177737a56387a3579584b6f327542376b78365033434938556e6b303963374b
626659797a476a4a4a677232465552355a66526e756e2f787363586f46432b496339384c556468585a4858774a474b6f6c79434c7a6773783959315a
6169633830614b564b61315846354354346369336d5937466b3954697a424149383842503878584e6b6243446c317273475041487436726950413751
416736596c496a6f62416d4e7261616e51754c42615549686f766a706865434d35384c522f73517162746e59373342314c4c31704f686d764752384c
2b34733470706d7039614850796372774951696a4f463344594c4b4e72554337545768564d564a79353967465a7161614f6d546869413832594c4472
4d705133684e7063624e6a735355495431447a7a47432f4c477547623075362b61424c6c4d4672357a6673446e576c53494643347a3949616166532b
62746f4d62447677334d6f3951465661457452627774672f384e6861747175394c584255466c3669467733544373486e497063485a453649334e5441
65737548345473587734574b514258584c55355a5244574c55637371466b66544457724830616431714e4a3976694e366e306f336c376f4335796f35
50694e7969756656364664697133736c4b6b68434f5a54664346574f4a6e7a35724a69553245724f4f5a762b4f483334434e69635a507a77515a2b44
516a727459434e465067734a6f6b504332436a5a30754258494e346f47496237795379312f6365614b64435a52553049583076303265417364384c30
72794a52344c416549722b6d5a55787a447a625478456e777042614646316f4548546e6a7868424262324d397a362b4565584e473672596a45425771
6b44346d744f68443837466b394232594f486c6844734a6d376f7a4f574475616e734d6c5147753968434668416979696d7659473259314f75475a4d
43502f45784154767a642f5756486a646d57366b68334f6f694e7753722f707463534f7a754430316877343277227d7d7d2c223e2573223a74727565
2c22583d223a66616c73652c226d5c7454313d4b382b223a747275657d5d
```

#### String form

```json
[null,null,{"&-?9b":{"/":{"bytes":"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"}},"5Xjgoef":{"":{"F":5.22089023059714},"?":{"/":{"bytes":"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"}}},">%s":true,"X=":false,"m\tT1=K8+":true}]
```

#### dag-json CID

```shell
baguqeerab5d4mscalkosch5klhb3nwuojztqlvcurwavyydb37nskwhnb3yq
```

#### dag-cbor CID

```shell
bafyreidvxzs4nhx4cahig7rkn5z2vq4p3amlpaj7asqpxueshesonkrvza
```

### garbage-20

#### Bytes

```shell
7b22223a2d302e353035363031313033353038323538332c2228223a7b222f223a7b226279746573223a22754563696c76657046696a53644c52596b
4e754a564d58595342526135484255617451324d625364746834375639535a7a434d5a6a444e35554f6f797a65455a336b6a2f7737554e5a6b495844
566c326a6e64482b7161374c56594e61736f4b7933784c38564e43427249454e4a46616b3164674f7a5947556e6a697167376e41644d5a5561584b76
786933664b2b68654542706e4c30754b773455454669486b572f3066506d2b305756685a5373694847527168766f58495a3670666e64466a4e67765a
4b743955424330636d4d5477427958586e344a6d6c6e466454534c6c4c75446879616f50773945715a4d33694b734b455a783053703775636c374938
375335557041634d453555484856312f537a674469736448776a4c6c416d4b3043347136302f76326d49713677353671544b50796743714b32654b6a
376663357271516a4c526950514635585a793833557452394c63737164482b6d78725235577a6f6563774a5365666a4a696d75485a4f343273664457
774662306555227d7d2c22292436223a2d343537363334333231303538333035372c222d2764223a22632a5c6e76502d5c6e372c5354396f6e345474
43483024382870567d5c227c505c22666e5d74676c6c57787e5b52487e3e5c5c33765a47695b4f53712d54666f267a61443543245f64297648284d61
4a3f5a6a66542b37293f34526e5d2762216a45292c78382f7e5f7e6f5251253c6759475666645b51375c7447e298ba397a3557332a55375876652b24
5a305b692143616e4b516473486c423f594971766f60285a5d733f5c22616a6b6279576034727349402f625c5c48512b6c675a6c614b4527435c2272
575c744825757e29416a7b5c5c6c6d6c4776523d6a61754b23294a5f3f5f346d24375c5c5c6e564d216f475e5e5d2e3958585059793a23447b54455b
7565485e445c22544f5e59574f2b5c7450217950505858272f77555972542e7574433a5930412934633c2c6044723c734a6c3b725f3f2c2ae298ba76
3a5e3d332f3c39284f737d5b4d7a5a3a38e298ba536b5f23376075435c6e683655635c223b345c742660e298ba6a4a36523c646e495c6e4f5e5c6e58
28597e5c5c696c46755649735a5c7444606f2a5c6e7a42443b66795c22685c224343684b2f53274f584a69522525283858202f5c6e24487e286b6ae2
98ba5030324b265d59625f7e7059642130456f6426277423255657712f53707666613462445275635227373e4b7c727c6973e298ba254346e298ba7b
5d617a38704e5c22753e5f31345026776d565e5c6e567674466e30755a212e574c21243b285e5646e298ba54624e28655c22235c6e286c3f45245c6e
5f64595a544e4776663a4a7a205d283261753f292f69582b74704c643d2ce298ba7976356f71363573556e384948552625595d636f4f78382c746d53
4a615e2d445c7431696e497671384223432978345d736271215c22652520607b2563765c22786e5c6e3863642a715d6233335c5c7032334d646f3d58
5f60566b4633396c7e574c642f6d3b37587d2f324d6732765d555c5c40704878515867555c6e5834505d7649416324704f28455d6e612b466c354537
304c3d545d444a626249595561535f582d65745b287c213d2558675445735b732e5176397b7a585c22756e5d5a712b244d217930272154274d31736a
6de298ba787a7a5c746a2371672a3c6e413c6320e298ba74e298ba615c7425617d4be298ba6be298ba304e354334443c605e79715f334be298ba602f
6257384f6652647075286f2a2d5c6e2b344c7721752f59794a7377496678385e4759376d757323633c3e4c68797262483b6f327523295f565e787b5c
746b7479637325675c5c282f4b5c6e553b7e63393d7e5030575332364f45425045634a5c22786d343523572b687a643f2827683620667a75334d6924
4e25404f24414f5c226d5c6e463e51666c6b7e5d4e2f243c76295427654c6236405947342a703f62442b42775f47532a2b5c22677a7c425f57617a35
756b6d6d565c5c393c727964787064433de298ba6a6763684d5f715f7979724d4962673d26417040485f575b3e49213c70222c222d5078223a6e756c
6c2c223c7d223a7b222f223a22626167757165677a6132757379636c337670746c746a75376868697234346336727964766d6e617a7278737678326c
6a697a646f6f7a78613572376b61227d2c22467b503157627759612e626d605b69342871223a6e756c6c2c22517875625b5f5c2224373d223a7b222f
223a7b226279746573223a226d684c53354b72304f6949464d706f2b4b7a6a6d59494b59675864694e7853454b6c4f703367567152666b505150374f
727667422f766c5a7346576278646c38544f5363465659303878763367594456336265395a5a3175494f726944632b6a44305371796f66307045576c
426c495a437173316e6d76514b496c6d615a4f4f552b336b48765743715473384c4e7573627a7658556a744b4e6b65386732776b726c4c4d676d4a70
5a6356394f634149642f566b76597375545a64384f726b4b78644a49572b70577a7277793676554c41784c59724177673671686f6648476a2f623478
2f69425932772b4c4b354a4c485065586371487959714f567a593636415659375059666573364a4f41496e5638712b51753634754e664c5766624841
647530396c4f2f44454f4f4d5859502f76337266697a4c5a51774650516961516a4f5a464447426f37736969732f4c6b5730564b443669506e512f59
754e2f6d4148475533596e3930624177364b5362705a36674d687752487078446b2b634858586c5963646a37626f484c65446b354d6a38516f77366c
4647475158364b434a6e2b374f315a307a3630555766785931507773784650434e46315a384f50676837786365314c36227d7d2c2262595556223a5b
226b2d5c745d686f5174406855684e39795a2b603e352a645b6e5c742f622e2d4d2b346374594a627642423658276c425c6e5529393356796d2e5c22
39213a4c2443426a2a703e652b38437531535069485c223c3f4e20472d745c227e765a5b252a3f4a297b4e40543c38755653754352316b616e707d46
7c7978364a204e76303b6e6836326a5a75505e2c37783e4952647c215d2e27742b584720302a524e365a5d2d5c743f6c7c5f5c6e32753a514f626f49
4f2d4c312b34e298ba6d5779427e2f205f606c2a4e60493a75493a456f206231465f44505c5c7d482d4f6f522750666660532a7d37736b662e3e7430
5c5c50453d385e483e655f3f31542f2e6f3162455475522f6a383f387c7a5c6e6d687145786226496274235c2256705a32717e33674c4c564c47546f
6f72667d65614c2a4a7863507e65594879577e357c34555c5c575f7a44654e43353b2c335c6e312f403b46256b474d6f585c5c71624f636f5954424b
573a293a205769354f76653d4c282f2c5d2d513136366c5835242d2e2d496e3736362c3857373b34672a2130763c7867324b215c6e572b454175364d
6e7d67642425203f36565c6e697d4c643926584535466c487e2c767858673d77456e5c227c2f303e63745a267e55796427616871253d4a7c4067442c
46392a736538794f4d634b74577153636241574a6b4e42422156605878774f29302b494629656130466863335c743a63724463635d302c6e622f572c
7339335f26645d70645c5c3641283c4650286b3d5f2a555723325d7b20434c7473354279722c746d2b37e298ba362541253a206466795f406b4c5d70
5f2938524d5c223169344d4c43657d3d6a39623a4971294b5b4d5c5c356a4f7276382b206a43702455604f445c5c3556797d24674529755c22657134
4b3547206a4a336f2b3156715d242449674a5e7b65667e4d5c742c30343f66525a4e3f515e475f3f654354212764774245517320262f2b34692c5c5c
6740653d6d73276f6b4544305c22482863732771745f4d54575c5c5b426b6d6c7c415126492a242b4c33644d2f6d645f627851722843394059657d5c
7435464d376743393931325f4c3a676225592b65582e372e506d512d33374e4a455a6b7e6a5931597c2d3b41495038235f2a516c607e7b326b3c6121
50275f53657c3e7b335c225572e298ba795d2661452e40413e2b644c7e674d5c74413c3f77385c74745d7d646b7d74625c742f686b476625773d2721
2c422d272b4a707e41254e7e7a7068305b243b47496e27274e5a2a6d4150296431782d695b3e3075474e2e60317d695c6e63752d39335d4758503055
58397b5a4a47297e373827353a4e59443b502c443433406b27e298ba66555c5c42e298ba746944704f2f2f292e6d5c6e6c7a3f2328572a514355337b
413e29486f3845783b693c43475a58636b44424727222c2d353132393239323531383735303135312c5b7b222f223a7b226279746573223a22764162
782b6370547a6d52763668507451734b534e745672336158547864615054355071527a584c694766473479543357706849435a5668494841616d4e36
36597a7639726e742f626d6848733769565a666d3166354b383848514c37725042307579714834584f79596b63626236537434736937515661442b33
764b77665238664d30522f4755504c2f6b57376d4d502f684b64617153315353354c4a363847776162362b41716c7072726f555a7537673145455677
546279386f497337386b2b775645463372757a496c5859744d466256345a6b6e39662f444c2f7764337133415065614e7a6c3879555462436f4f5565
48564c67693234346b346c4372526678494e4d4631433268755837636a4857387a75696533366c2f5a45516f336c4b35766a616771694c334155446b
525577306871445a79434f6a72526744446e495331672f7a454e694a542f317738303134475a5273767a526f71656e77535059477635674a4255464b
7175414662793768612f77486a59672f3577545936584d7154686b753748335571346a6967674a7652307644436776436751675148716853494f4768
52444b424c323741496474666c684f556f356d2f2b395279636c6e36704d53764936667537784153436b2b35306b62524849716b354c47594653744b
4c34744b64506f7955463732326e515350336c5a576b434b685446386d76766c78755362444f354b52746a2f76327776314f38774430412f47722f72
7255762b4a667937572b39456351626e5855383465385434797273517647676e6f2b572f677734756e776f684c4459677653346c48736165727a336b
5232723173785469796a2b6241426361364a456a6239554b744777733069744f4f4a4d544a4b4c4b7a636c5a692f73457a506f6c556d324c4d374c77
347469324f4248305777424a4847486d5453564630766648744230324e6a6d5456356b415462394f4449306672657372712f4a456669396153636579
6a384c4b50624f2b6e686e4d4d306e4745474c4848715a586f7a4b5548553756373244614a73496d614a624e68554534423572727466507238796445
416731527846376d7351495a6c6a42756d4a4877426a5065316a77572f6f4e4f75646541336862454866666647514a78616c4e5552427a652f396441
33334c4f664857433330596e6c416448306b2f2f63556c4773516b32556a525364774c686843614a704c664952554752333771516a6d6776674f7863
4a6d446a573365466e4276566676574e706e386c6f316a3141716c475762723936485930445250534272336956513366475a5067543472705a713867
6e4f6e4633337044434a7931486c4241646f59587853415362545a55702f3331567039332f4c7974727646312b5278753863415644302f5662442b6c
626f3353556d396d626963617256422f555648326278724736556c3438694b3542474f3530792b6c5a4c6639592b2b7356476555526173517a4c764b
6b36516e484e746b6e356f6738636676614e4b706b4954354d3679316e355a6d654370767950443056794a744479767a51304c5148344e2f44704767
7073675a485263747a307a6b4c39552f4958302b464e42353853434159483839357559706e72386c544e4d4b30726a4f6e433064425968564a77755a
5434566241684b6a3338483236626c706578485243435a5a366f43786f585374346661625364574d4574722f6f525442463050516762332b384e5965
3164654b39664a7378626168736b62713057367a6c4e6347713672466a666d684664776a31537568646445476532435438477a34356e5a724f6b6349
4879567048653456626d6f353439366e7142626736786f5732625858533849796a396c2b56596541372f504138704e77434a334b33436d6f5a364b69
55543166374e305057724465374c6b565846774f6f6f474b544269575a53695064347a41647a4177547454524270307758496b49625478524b563272
30574453647478794b6d475342333677544571496a72775462776f4743747439502f634e576155646b596f78797135354478533571673958734d2b6f
5a485773597a716c5a6638766a754e6e334d4a76507269497178536539727851706872376d486c4b78397138337946477456356336777a33496d4e34
4a547765394741326a4d754b666562663633614332572b6e4c327754516b37317a6451624e4a317851502f7a547376467a364475773956354d385230
35364e525154557a4b3479436646757249597954395a42524867484f736d7535516e5443567058746d3259797a613052394d7945794532384a346346
64714d453239446d5273586a4a4c4769482f37376655716d696177695772436b6a67386d384d4f303954355659694668614b64623030312f59562b57
4c4b3552483136616f71674c37393833617a49696c38756c7473702f4353633779764a536b474d734a6674524f666d6d5361307a39326657475a6546
586a384541482f35616a37302f592f4c2b7473734a3372303231786c444e323931502b37363570545863594c44794e41706859596b434d6c7151466c
4c59694e4279667778786c7477436a393151557037796f684e677157565a2b59316457786868537a764c344c47572b555573346e63536458616b656b
326c6b3271372f35503447465566687448426545625042417866574e6250362b6d4d786164345a4b62732f535237322f354672704b58574b4e383344
75785a436e4a6f314742566f355933645632755a43546c45655071556848554a6e452b446477396f4d42464a366a4272614767686478577a6c4d3463
6f524143497354734d6566305a666d656a31312f49314f643854514d4c6373723255744a454b4e6643417262492b7657366d54516a6d316563377479
5378497030374f5a68626462324d3074446c796c45754e425336755554433733683956457668472b7969464e32227d7d2c7b222f223a7b2262797465
73223a2262705448412b483974673073764b6a33515739654c642b6f6669775350463432564d57657a30674e68447473775a4568652b3871597a6168
2b456a37654465484b50612f5574344455615171426f4f4b2f6a53307a304e524134306c676f746c4b474c516944326f6a516c486c4e332f67414c32
4948304e4c63544535676d2b47313335665049314f6938347a6a5a4967306d394b536a464a4b6b2f72466546774e454b582b5741344a4c3955737351
586177482f794b75453461644f777374516859305a6c4c6c344979496231345074484e47544279794b573151634274467632524e5443337854356e54
44687868712b3950475034582f552b78386b336e35434f76474e37326c786a686d75544a5778324d72326b423758485138475478644b535153574448
467a514752635571384f5a416851616248625a4f664955446c52306b5545486c566a7165365651483965476a79584b725775416f69333144346a4855
51434e426b78585838665344416555724469552f6a6c4c524e4a7a7a464f676e7238514651517a744b4a7866336e4e516f434f4a4370694766706e39
74654f6f66506466486d4d522b352f506c7238577048325a786a384c634836434d4374445a786438492b43563732664178444645424e466e4a4b7646
4f792b7945666963576c424638356c79735636547756397a66526a6e7a31334d6c41636a563537434e6d4362434f30706d4b544c75572b7578623568
4c7a325a2f58327154693348674f5a6843684e67374953394e693941334469534152343364423348684867757a435a51376138556268444931367a4a
6e2f4b6d4556695232715638394f69412b43626447747958334a7056754a304a77544779353577325533504a53623163585241703874736c3338566f
30495861574d4d4e774649584f4342376c5051227d7d5d2c5b6e756c6c2c7b222f223a7b226279746573223a2262766937735367566b4b565459594d
336730374a663478536a6f6e48513963594453596651594764436a315878522b63326c77227d7d2c2d322e3231353537373937383932333730355d5d
2c227b223a224a32715b3a583f67664b7b4520583948774836482d62646e447b20772f5b222c227e5a2a223a6e756c6c7d
```

#### String form

```json
{"":-0.5056011035082583,"(":{"/":{"bytes":"uEcilvepFijSdLRYkNuJVMXYSBRa5HBUatQ2MbSdth47V9SZzCMZjDN5UOoyzeEZ3kj/w7UNZkIXDVl2jndH+qa7LVYNasoKy3xL8VNCBrIENJFak1dgOzYGUnjiqg7nAdMZUaXKvxi3fK+heEBpnL0uKw4UEFiHkW/0fPm+0WVhZSsiHGRqhvoXIZ6pfndFjNgvZKt9UBC0cmMTwByXXn4JmlnFdTSLlLuDhyaoPw9EqZM3iKsKEZx0Sp7ucl7I87S5UpAcME5UHHV1/SzgDisdHwjLlAmK0C4q60/v2mIq6w56qTKPygCqK2eKj7fc5rqQjLRiPQF5XZy83UtR9LcsqdH+mxrR5WzoecwJSefjJimuHZO42sfDWwFb0eU"}},")$6":-4576343210583057,"-'d":"c*\nvP-\n7,ST9on4TtCH0$8(pV}\"|P\"fn]tgllWx~[RH~>\\3vZGi[OSq-Tfo&zaD5C$_d)vH(MaJ?ZjfT+7)?4Rn]'b!jE),x8/~_~oRQ%<gYGVfd[Q7\tG☺9z5W3*U7Xve+$Z0[i!CanKQdsHlB?YIqvo`(Z]s?\"ajkbyW`4rsI@/b\\HQ+lgZlaKE'C\"rW\tH%u~)Aj{\\lmlGvR=jauK#)J_?_4m$7\\\nVM!oG^^].9XXPYy:#D{TE[ueH^D\"TO^YWO+\tP!yPPXX'/wUYrT.utC:Y0A)4c<,`Dr<sJl;r_?,*☺v:^=3/<9(Os}[MzZ:8☺Sk_#7`uC\nh6Uc\";4\t&`☺jJ6R<dnI\nO^\nX(Y~\\ilFuVIsZ\tD`o*\nzBD;fy\"h\"CChK/S'OXJiR%%(8X /\n$H~(kj☺P02K&]Yb_~pYd!0Eod&'t#%VWq/Spvfa4bDRucR'7>K|r|is☺%CF☺{]az8pN\"u>_14P&wmV^\nVvtFn0uZ!.WL!$;(^VF☺TbN(e\"#\n(l?E$\n_dYZTNGvf:Jz ](2au?)/iX+tpLd=,☺yv5oq65sUn8IHU&%Y]coOx8,tmSJa^-D\t1inIvq8B#C)x4]sbq!\"e% `{%cv\"xn\n8cd*q]b33\\p23Mdo=X_`VkF39l~WLd/m;7X}/2Mg2v]U\\@pHxQXgU\nX4P]vIAc$pO(E]na+Fl5E70L=T]DJbbIYUaS_X-et[(|!=%XgTEs[s.Qv9{zX\"un]Zq+$M!y0'!T'M1sjm☺xzz\tj#qg*<nA<c ☺t☺a\t%a}K☺k☺0N5C4D<`^yq_3K☺`/bW8OfRdpu(o*-\n+4Lw!u/YyJswIfx8^GY7mus#c<>LhyrbH;o2u#)_V^x{\tktycs%g\\(/K\nU;~c9=~P0WS26OEBPEcJ\"xm45#W+hzd?('h6 fzu3Mi$N%@O$AO\"m\nF>Qflk~]N/$<v)T'eLb6@YG4*p?bD+Bw_GS*+\"gz|B_Waz5ukmmV\\9<rydxpdC=☺jgchM_q_yyrMIbg=&Ap@H_W[>I!<p","-Px":null,"<}":{"/":"baguqegza2usycl3vptltju7hhir44c6rydvmnazrxsvx2ljizdoozxa5r7ka"},"F{P1WbwYa.bm`[i4(q":null,"Qxub[_\"$7=":{"/":{"bytes":"mhLS5Kr0OiIFMpo+KzjmYIKYgXdiNxSEKlOp3gVqRfkPQP7OrvgB/vlZsFWbxdl8TOScFVY08xv3gYDV3be9ZZ1uIOriDc+jD0Sqyof0pEWlBlIZCqs1nmvQKIlmaZOOU+3kHvWCqTs8LNusbzvXUjtKNke8g2wkrlLMgmJpZcV9OcAId/VkvYsuTZd8OrkKxdJIW+pWzrwy6vULAxLYrAwg6qhofHGj/b4x/iBY2w+LK5JLHPeXcqHyYqOVzY66AVY7PYfes6JOAInV8q+Qu64uNfLWfbHAdu09lO/DEOOMXYP/v3rfizLZQwFPQiaQjOZFDGBo7siis/LkW0VKD6iPnQ/YuN/mAHGU3Yn90bAw6KSbpZ6gMhwRHpxDk+cHXXlYcdj7boHLeDk5Mj8Qow6lFGGQX6KCJn+7O1Z0z60UWfxY1PwsxFPCNF1Z8OPgh7xce1L6"}},"bYUV":["k-\t]hoQt@hUhN9yZ+`>5*d[n\t/b.-M+4ctYJbvBB6X'lB\nU)93Vym.\"9!:L$CBj*p>e+8Cu1SPiH\"<?N G-t\"~vZ[%*?J){N@T<8uVSuCR1kanp}F|yx6J Nv0;nh62jZuP^,7x>IRd|!].'t+XG 0*RN6Z]-\t?l|_\n2u:QOboIO-L1+4☺mWyB~/ _`l*N`I:uI:Eo b1F_DP\\}H-OoR'Pff`S*}7skf.>t0\\PE=8^H>e_?1T/.o1bETuR/j8?8|z\nmhqExb&Ibt#\"VpZ2q~3gLLVLGToorf}eaL*JxcP~eYHyW~5|4U\\W_zDeNC5;,3\n1/@;F%kGMoX\\qbOcoYTBKW:): Wi5Ove=L(/,]-Q166lX5$-.-In766,8W7;4g*!0v<xg2K!\nW+EAu6Mn}gd$% ?6V\ni}Ld9&XE5FlH~,vxXg=wEn\"|/0>ctZ&~Uyd'ahq%=J|@gD,F9*se8yOMcKtWqScbAWJkNBB!V`XxwO)0+IF)ea0Fhc3\t:crDcc]0,nb/W,s93_&d]pd\\6A(<FP(k=_*UW#2]{ CLts5Byr,tm+7☺6%A%: dfy_@kL]p_)8RM\"1i4MLCe}=j9b:Iq)K[M\\5jOrv8+ jCp$U`OD\\5Vy}$gE)u\"eq4K5G jJ3o+1Vq]$$IgJ^{ef~M\t,04?fRZN?Q^G_?eCT!'dwBEQs &/+4i,\\g@e=ms'okED0\"H(cs'qt_MTW\\[Bkml|AQ&I*$+L3dM/md_bxQr(C9@Ye}\t5FM7gC9912_L:gb%Y+eX.7.PmQ-37NJEZk~jY1Y|-;AIP8#_*Ql`~{2k<a!P'_Se|>{3\"Ur☺y]&aE.@A>+dL~gM\tA<?w8\tt]}dk}tb\t/hkGf%w='!,B-'+Jp~A%N~zph0[$;GIn''NZ*mAP)d1x-i[>0uGN.`1}i\ncu-93]GXP0UX9{ZJG)~78'5:NYD;P,D43@k'☺fU\\B☺tiDpO//).m\nlz?#(W*QCU3{A>)Ho8Ex;i<CGZXckDBG'",-5129292518750151,[{"/":{"bytes":"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"}},{"/":{"bytes":"bpTHA+H9tg0svKj3QW9eLd+ofiwSPF42VMWez0gNhDtswZEhe+8qYzah+Ej7eDeHKPa/Ut4DUaQqBoOK/jS0z0NRA40lgotlKGLQiD2ojQlHlN3/gAL2IH0NLcTE5gm+G135fPI1Oi84zjZIg0m9KSjFJKk/rFeFwNEKX+WA4JL9UssQXawH/yKuE4adOwstQhY0ZlLl4IyIb14PtHNGTByyKW1QcBtFv2RNTC3xT5nTDhxhq+9PGP4X/U+x8k3n5COvGN72lxjhmuTJWx2Mr2kB7XHQ8GTxdKSQSWDHFzQGRcUq8OZAhQabHbZOfIUDlR0kUEHlVjqe6VQH9eGjyXKrWuAoi31D4jHUQCNBkxXX8fSDAeUrDiU/jlLRNJzzFOgnr8QFQQztKJxf3nNQoCOJCpiGfpn9teOofPdfHmMR+5/Plr8WpH2Zxj8LcH6CMCtDZxd8I+CV72fAxDFEBNFnJKvFOy+yEficWlBF85lysV6TwV9zfRjnz13MlAcjV57CNmCbCO0pmKTLuW+uxb5hLz2Z/X2qTi3HgOZhChNg7IS9Ni9A3DiSAR43dB3HhHguzCZQ7a8UbhDI16zJn/KmEViR2qV89OiA+CbdGtyX3JpVuJ0JwTGy55w2U3PJSb1cXRAp8tsl38Vo0IXaWMMNwFIXOCB7lPQ"}}],[null,{"/":{"bytes":"bvi7sSgVkKVTYYM3g07Jf4xSjonHQ9cYDSYfQYGdCj1XxR+c2lw"}},-2.215577978923705]],"{":"J2q[:X?gfK{E X9HwH6H-bdnD{ w/[","~Z*":null}
```

#### dag-json CID

```shell
baguqeera4qspnpinuasdl3mssik3vrplbjmphf6qucpjslbevuae6hmprulq
```

#### dag-cbor CID

```shell
bafyreidqudcqpkeqgylnqpzug75jah3lbk3rqu45cezvvncyfhrg4aodae
```

### garbage-21

#### Bytes

```shell
226155357c376a3e625d7271295533634b354d4b614b236a41796b6d70572d50745c6e436b6b5929282d7947542e2634776d5d3072585b427b342b34
315d3774274558573f5b305c74696627542f313a3948546e7952607263503052293b5037212524323d436225765c746e4351432129575e6251546e74
63332453403459677e29383275606b485a214d2e627240365c6e2846255c6e723a5c22625e4f5c22352d58524c5c746a434c393d323473795c6e5c74
616e73433f427535402f36612432265d6366533a6b2d295b4039636a416d2d775c5c5b5b2a784d2f555c6e703f2f3e574c722a25305921452be298ba
676a6c2c5b683b6f73762e5d32676e40412f3448595c74797b5e20293b6377534565606c29302a4a5033443246797a36286d487c2826372c385c2260
2761477136723b7a71686e6878723f4f3857384655712c6665794c205f697c3864263136465b5223474c434f51533e376e24293f6f6d46766d744f29
34246b7e4f50665c2237483d6a7250645c74e298ba43556668494267512c45425f385a7075383756476f6e355a606756412f405c5c4a773a494d5231
525235783e7c695c7467456323715c22653179735f2d5921395c5c316356e298ba25405c5c353e41282d67793f4d6f78385e66645776355c5c736a3a
56277b2757534b3b6d3d632564496161404e6c7d4e6c636a536b7727435a602a2f76507139306452646731325338586f5625422534326731312a4337
43642b294d592c7b587b36315c6e505e595c6e5c5c586d56634c4d612b272f6845305c5c617c474b596b4c286e477233232e6f372c4a437a65214c54
585c6e28644f56625a73256e3b3a36576573764a3a4f3b584e374e774158406e59266c3754797d5c5c573a3040303851544163782a2a6333455c7458
276a486677355c74202c286566394925493b2959615067772b657b6f754d436f5e305c225536597c382a7a3f7873513d5b515e5d7e3445415d55335b
4d3e6f3d544258415d69364064532a332c3a3d525d25515d56477ce298ba3c3033375e2632356e694d50306c487c492f45792b23475c223357523553
266b555c5c4f78585a60596b2146236a6f6c257a6c20703f6a2738475f5f4138653d674b6e73565c6e617e6e775b4d58254f582d7472445568383d51
6047237d7a5c22556a45337e5375596b5653482b6d632b423a3e5c2259525b264d6c754c4a39626f56366576765b59e298ba406b602c336a3f706652
4976724e52797165696947456c3b43454772646b2b5c223a51634f475c5c2a63254e215c746d245b2d7c46662a7e2f413c60573a243568595d33392f
5f702b2d205c2236207c573f546457663d4c3a23643e5f6b482b324063335c6e2732e298ba62326d5b50523b4e3b7e543d304a4d2b5c743f41565c74
746b216e66474732255a3a4552582638594f26676d2b753465532845492e5a285f215c222f3c796b5c5c6b2c27627c6b5e2d39592635772b6550265c
5c4e684261265c225d2466516321647d2c6a513a32784a6d454f6747403e653148375a5a7947575a343658645b7e4e397358286a2a6d533a59503d75
7b746c516d2c652d266c273363423c5755794e49272f665b7a607e7d61572523677e516234537d313357696c5e7a78213e3c2f323a6f395d7a36514f
67372d504d767a4843727d59533d575234793f344f5c6e487e413726527a346d6a697b7c58385d2955776d437038366e71586b686e32276a7c39346d
605b363150603d3e2d654a3d5f2859425a725c5c573e43504978424c78294c5c6e4b3375585c2271334c73455b6b31295c5c665f5771255164644c42
60694b4e77315f524d724b3a5c6e316b6b5c6e443a5c6e632c3a633f566b654f2a377625762f5233786c725723316674502465497744462d3f714632
702d5c5c5f572c2023365f417c684ce298ba6f262429e298ba563778452f40704e6a392335373f3d32686274345335317558293b57285d2051505d33
735868605745632a5665592c2c48e298ba556b6b30313f712a63724e4e735e633a783a5d6a6b2b627e6f3e45344f5b25665e2c693c3832756a314626
604a415677516d6a7549215c5c7a4c506c2e306d73535028623fe298ba53645c6e2c5e6f3c5b5051215459343e4e6a36337e5f6d205f6d4b776c6a72
383a5f5c226c69603574277a5c6e6f6b60502d46764b685f756f275e43343c50795a3b2923675c5c5c224b69757c2f44276d544e7a376d3e33233949
74303b4260e298ba376b33415f603050282b2d5c746c2c3062533b743b5f485c74565b3a56602b557b5c6e5c225c225e6064523a453e56646c532871
696d2b2b6c4d45644748333a2c4f736b5b57265244482e27765c5c50563a5a33636e3a31523a433e4a5f405b784d316c5f557d212f4062406650272e
71663748642d333de298ba7a5c5c5a2c752358306268543165767627627c3d42796b74665339765c5c747446426d6362354a256c3b3c24292547205c
2246425622
```

#### String form

```json
"aU5|7j>b]rq)U3cK5MKaK#jAykmpW-Pt\nCkkY)(-yGT.&4wm]0rX[B{4+41]7t'EXW?[0\tif'T/1:9HTnyR`rcP0R);P7!%$2=Cb%v\tnCQC!)W^bQTntc3$S@4Yg~)82u`kHZ!M.br@6\n(F%\nr:\"b^O\"5-XRL\tjCL9=24sy\n\tansC?Bu5@/6a$2&]cfS:k-)[@9cjAm-w\\[[*xM/U\np?/>WLr*%0Y!E+☺gjl,[h;osv.]2gn@A/4HY\ty{^ );cwSEe`l)0*JP3D2Fyz6(mH|(&7,8\"`'aGq6r;zqhnhxr?O8W8FUq,feyL _i|8d&16F[R#GLCOQS>7n$)?omFvmtO)4$k~OPf\"7H=jrPd\t☺CUfhIBgQ,EB_8Zpu87VGon5Z`gVA/@\\Jw:IMR1RR5x>|i\tgEc#q\"e1ys_-Y!9\\1cV☺%@\\5>A(-gy?Mox8^fdWv5\\sj:V'{'WSK;m=c%dIaa@Nl}NlcjSkw'CZ`*/vPq90dRdg12S8XoV%B%42g11*C7Cd+)MY,{X{61\nP^Y\n\\XmVcLMa+'/hE0\\a|GKYkL(nGr3#.o7,JCze!LTX\n(dOVbZs%n;:6WesvJ:O;XN7NwAX@nY&l7Ty}\\W:0@08QTAcx**c3E\tX'jHfw5\t ,(ef9I%I;)YaPgw+e{ouMCo^0\"U6Y|8*z?xsQ=[Q^]~4EA]U3[M>o=TBXA]i6@dS*3,:=R]%Q]VG|☺<037^&25niMP0lH|I/Ey+#G\"3WR5S&kU\\OxXZ`Yk!F#jol%zl p?j'8G__A8e=gKnsV\na~nw[MX%OX-trDUh8=Q`G#}z\"UjE3~SuYkVSH+mc+B:>\"YR[&MluLJ9boV6evv[Y☺@k`,3j?pfRIvrNRyqeiiGEl;CEGrdk+\":QcOG\\*c%N!\tm$[-|Ff*~/A<`W:$5hY]39/_p+- \"6 |W?TdWf=L:#d>_kH+2@c3\n'2☺b2m[PR;N;~T=0JM+\t?AV\ttk!nfGG2%Z:ERX&8YO&gm+u4eS(EI.Z(_!\"/<yk\\k,'b|k^-9Y&5w+eP&\\NhBa&\"]$fQc!d},jQ:2xJmEOgG@>e1H7ZZyGWZ46Xd[~N9sX(j*mS:YP=u{tlQm,e-&l'3cB<WUyNI'/f[z`~}aW%#g~Qb4S}13Wil^zx!></2:o9]z6QOg7-PMvzHCr}YS=WR4y?4O\nH~A7&Rz4mji{|X8])UwmCp86nqXkhn2'j|94m`[61P`=>-eJ=_(YBZr\\W>CPIxBLx)L\nK3uX\"q3LsE[k1)\\f_Wq%QddLB`iKNw1_RMrK:\n1kk\nD:\nc,:c?VkeO*7v%v/R3xlrW#1ftP$eIwDF-?qF2p-\\_W, #6_A|hL☺o&$)☺V7xE/@pNj9#57?=2hbt4S51uX);W(] QP]3sXh`WEc*VeY,,H☺Ukk01?q*crNNs^c:x:]jk+b~o>E4O[%f^,i<82uj1F&`JAVwQmjuI!\\zLPl.0msSP(b?☺Sd\n,^o<[PQ!TY4>Nj63~_m _mKwljr8:_\"li`5t'z\nok`P-FvKh_uo'^C4<PyZ;)#g\\\"Kiu|/D'mTNz7m>3#9It0;B`☺7k3A_`0P(+-\tl,0bS;t;_H\tV[:V`+U{\n\"\"^`dR:E>VdlS(qim++lMEdGH3:,Osk[W&RDH.'v\\PV:Z3cn:1R:C>J_@[xM1l_U}!/@b@fP'.qf7Hd-3=☺z\\Z,u#X0bhT1evv'b|=ByktfS9v\\ttFBmcb5J%l;<$)%G \"FBV"
```

#### dag-json CID

```shell
baguqeeraja5vezxmb3ekptrp3glfwtgaqvju4plhsicqitdg6etc4wlw6amq
```

#### dag-cbor CID

```shell
bafyreidmfepyo74jzm562xvcgdzhexzdq7tracmtetx6ojyuo4gtnz27j4
```

### garbage-22

#### Bytes

```shell
5b7b222f223a7b226279746573223a224474725379673471323875506e4332774e6f674538575256664b65305151766d6f78644849695176304c744a
53707331776f50634a364a5275327742305071524b64616576774c544146536847416a426346765471317731316b6c702f745562446451576b5a7a50
776b373056646a2f6d477a524355635871624a4a6c4a76366e5568752f5778616534774e5735695149344d7161384e424545394c6e4b794357693165
77575052465252655165614e4538696d2b566c674b31683665445446635a3774384b6534532b6d4b6c6f324d4534377a4b537450746a456b4f517738
425078314f5238642b56322b565a464475526662322b63467554704161385331664c617a6253795144614348744274766533326e464b475276534e75
556c494a6c45653862623768545230454c544430722f2f5738696e4979544d645546627239637a565567655843524c744d416e374539474e344a4135
4f6c784368524b396b3034576d354a4f4b3632774e7a6b474f3258325a33667a6443303139377561384c4d753772623878707271416647696e514748
73657a79534935726a4175434f493833673179376c50686d32486b4762786555714f3734665644724874452f54537778535a2b376d394f5344734b50
783873656c7a757067462f34687a5432782b79555930536f344655334c395874784643306b5069644b68554761384e3072712f466261682f684d3442
44485277324e4d69422b6b3741436c7136754830442b797a73377a48665a354f4a34566e32704b314f56344d5931416f4f53492b456e352f6d485166
4b523056544d737a387377576649334965637745595843574f722b6c4739446e5a7334734250635964314744552b724f39724c3348716b4e78643637
6567527a6354354c6651414c4e4a5265372b6f647449764430556c653177227d7d2c5b66616c73652c2d312e32393131303331313135373835353433
2c2d332e3534393632383137323738393337352c747275655d2c225c5c4978392440617d533f6a632e6e6d2838612c29325c6e3d416c484d69557325
2131712652493b3f5c6e3f60e298ba336a3a3a485d4c78546461702152544a60703d404f576f496125336a3c2f67554c234359547e705c746c5c746e
207e3be298ba63412d2a5f683053705e4b3e7b5f51305362667652315c6e526d40624d3f24383a452f777b445969286f792e426d7d4736265959633e
603057365d4f633e6658292b6d745e2b6f4a5d3937735d54423a5e465a633137712b4e3a5066602b717e5c5c296d26476275204d323c657c71412345
5f4c2d5f5e2063495d207e233f337677212e402e7d403f2061453670476d4ae298ba7058575c74627b7271405b6e735f21683266673c476c726e3c23
2b4c294334664a5f42536143633075627c3e487e77272b5c22306e2a4c2b496b6e286848704c615a505c6e475f7a705c222c585d5f5b363d56205b4a
566432415046515c22792e20693859516b2b374635532374495c745a6d595d697a2a2d796c79733d6b752b682c31444c565965773d725c6e4d4a2f3c
336d6f7b335a4e584c664172686763633b4671335f535c226d38e298ba7b2a62482b38637e30745d58607e2869573f6578294f5b6933683a7a6b7d2c
7d5271425b7a386c6937537428297d4f70727928266a4c775c222b615b504e5e393e202944306b2e5c742963583e2a2823564b24743e215b5e2f6666
2c21365f475d62582c752454356d7c2c5a7a373168325f542a5b743b494a54422c3d7b455a53523349e298ba4f3e21764f35794641625c22522e4e47
7b3e462e535b6d413a555c223041486d46512154472e2b445c6e5c6e2b7a7778647e696a5d24682a572968524c5b3b7c35e298ba38212a322e2d6f61
33343a777c4b6e566c6d55493044595657594f332949425479762c7435366452475a433a3632583778793061443d3f6863e298ba49764a23415ee298
ba4569496649245f4e3e63675936253f644f353a2135716b5b7d3458354e3f4f7e7e75717e504050493773317a3b4d446454566b526d5a5943626176
3432595f4b63762156365c223c21562b4a715e3555774d64746f274428305c5c734c5c744b485b4e693d216c676c2960506f3c266028584578653e5b
2735262a3d5c6e61782c4a6d5c5c6465742178752f6f695f5d3e5ae298ba396a3127235640495c742b44635d5c22312625322737725c6e282e495de2
98ba7e522b2a5c5c344e615b3242703943304a326a6934405c6e56542f254f2c2871244f392d5e694f573575605c2225222c6e756c6c2c747275652c
7b22234c444d223a7b222f223a7b226279746573223a22325568714e4631746566614e4c574e4c4d765041773131475359774b5050576f6864425142
645a6b4a446a794a7444514e656f62684e3238634269656e4757614762795576502b742b792b4f58454f6353684b704f50475776747437635a4b5077
6250526973306f752b797575713257784e756244567778724b2f545a466b6e4d54434c6d7063633234413646426c385a7a2b4375534a6138726e6b35
5044475a36783678363568306565652f6d4f33714d586667426b455638506e4441762f774d6b736d7163736849423349617031434a324a342f756748
703175502f36543674716369646c2f355637574936772b3635362f335a4c66596361425278415246595171336c4b64332f66424842642f6642767848
2b4d66304b4d4a6b7665706a664355695176326d4c645a472b4362765037544c624274716441496d4b4251705859427a3541614c32756a496a4d4a51
52725177464b6a616a687933672f4a437139686736394d5679644743566964545a4972694c443877784477524767556b412b7455526c5a3173414c75
68584b376754315968336c646e396b7274475a6377323873507973776a387337566159705651684c6777464756324b6a7a53674336614c757a797830
6c614a3067704d785a566f524f784a597050526f3175357449382b414f633352357455666d564e632b654449705a493138695544507a444f72556861
504441786e50764c574b4b52412f7349713066792b76323761334f2b336c72543071413844684b692f5a31432b616e46394e484530585141656e4767
434e393079524a64314968397241375867685837745672707856476666447a7042487052637678337a326d524230393757724352342f46745757675a
797347514a3535724c746b4a514b4b553669366d6d6164685265697934566b7a7748414149475241564f2f565955355a316b76703150526378624873
44646c56546c45763474616b317658796a4e4d413375516c5345646f456a36616741514149475873426c65434733326e54417149384231522f733635
50624466674e52327670537a4d446c397964796f675147542f6946704c57426e466b73336b6e5446786f4f534e75567933767073426278424e58422b
32753759563468786a6a457442694162515376384633764f666b734f67767577706130727348416f7062694b6530503243685957444e445259773566
4a68534a6177467558766253772b793642795a6c736c55797234314e4f546a314a2b77307551663064744e6e6a54426842782b43544e4c644b414466
33685749445545366b343279454973305555656f6d305451474f5375793475544c5a3274384c6c716d4f6a6e5a476c3047784d756746505645382b46
4d446961336d506b76424d327434796a3643586d6d7a50355353455557436b39443336357766717a426f66686a544c7449614f4132652b676c425830
365233573146626e66383072675a30777435634f6150717447546c504a326e36316f653845686d4c644b6736567770497a572b4678626277755a2f78
64322f47536c617372656b4d4a4862714e726b504b624d536d6145616754684e7565714a4552314f434c32387566355a54474c512b467936554b4e32
4b6e4672635675494c494d305353655041753579397366446a336650706d7a78573941725161774d53443878536b7174424e69305a4976456f7a4e7a
5356786e54756a5a6853535a55476759664948796d5a4147645275594a47786934663476744f4a4567536f69385053434e65446e704c4e6d41746456
2f4e7338384979437873786d77487673323476526262786a356b5374684f376b78772b68503561307552506c6343464c4a6834466e4f514a3337444a
6a6845636d355a325070514733304a5332716c6e374333706c734751615650527831763639754e6b6132646257727452307a667030526d6a3237596f
7261684e2b4c33743574546e68663244437155346f4478436c6f584454632b3131424e55672b4835533665784247766a6b4d43474c44433644386277
33722b5043396b455047467859477542613242784c5130794e734d733879657732393957354e2b4b396e7070646d665431794b6b476153696c62326e
366b6143472b38566d6942767768764f4d4b6c30505a6446335043483051755855654b7946575337456542502f7665534c4450422b6c554f64587469
687962596f69726c3431424938694c646d73574b46502f4a6c624f4d6158794a6e4651736a4f486c304e6541636769336974666f627851707148702b
64392b385734445238734a474e5772755a504e524767784572553536536b534d7654436d71656c724d597062726861425a46324f6a5a2b4177736b41
715a4746397979462b594a754f4661434a53637243394a42684750523433536a3533742b4c486c6d3946474f716e785645317a7056655533734e4e4e
305652737479386f4472356d6f723251775378672b7459504b5a4637633259484a50592b4253413671775237384b626e4a47323831745643594d6276
7166577a356e49505a336b657834726e747a75516952387361534d47674e576c46634f6269646373544f7a435953315a7173786d494e63437773664f
444965763254557138767449656276764839355a465651514d554f53306f43466641754a4e674d793331794571456f35474168756a305a6a4239514a
582f543358593058713663413874464b656a735366505a666a44694b5356514338756c457361336b664454362f45306e474869587868646c4337664d
656e5642706e342f46704f787459393669376e624a7a6e48672b3868547830374270326c484e714d6f526852394b66644448386473642b3262696245
725777736f6754346d3932554279394463493749525973466b5175566449554538445668684a744c65526c674f5274384f707a49705a6a5a56413453
4249722b596f715a716f4f46316578627371596b564456596e707049593873556569536f6c54637163586969326d575662676972633957443136374d
63454e7a4d3452584d7163716a636f2b594666436e306b674d7474376a476175686c304c62634a69634846527368366430467a785457654c53513762
3332317167546c4b4b774877535643656e3377466d4270662b65646c416f652f6c4d4a58543370516f37396a49643457454a4155662b6e4438454864
77674c3271676e4a5463327a6d316268533456354d4552633236515239524e444a7a4e48332f6331726458417337504254736b617a2b517478663556
6f794e7768695233646839775735315a6135694f77324d56614d6e6653446e7263544a61776b6558356f494871523158486e493158526137494d4746
4777784562545a4a736c36464a6f41682b61634a55437964695637344f6b557938344358524c49565234333953726c52616a4c3832356c463965724d
72796a7072707a495646512b736e463730796d5a7a6354546b2b4d41643177676d4b2f79626845566e65486549356373625632567a7975763262546a
4e2b6b676a6d49674a39704c2b77474f4b5545743053634779486c36354552754845737532794c536d39486448574a6255502f6c7053716f41676c52
6457436147756a2b4d6b4d546764697962384c533171515353344c71352f37726b4d675a6273466541457a713345324437652f3148774f4c45397833
565875324a4a6a596b48584654624669594b2b322f366b734b3661476b704a654861643867615955486f4a6f47593379534365325874503572655176
36515334463578386c464c4379556878394a674c673550634a2b5447416e6533566c4e313832773861716349582f4761703567677445634232765255
4547795a4d4c7169786e35684e6b646e53384e6f702b2b4d396c6e4f6f41596c385a515855744b6f524b36327770335769627046467542375a525968
6d6d6e682b6534346f4d4b53346a752b4d4661517566574a4931784f70424778497a2f4252495831567a723954354d444158794561615a5930675a50
6a684f67326e42526b2b447a62396e64456257416a4958386a6164714e667a36574c504e436d2f77494b78334450766a583538496e464b2b312f5879
43376e38374a7243467861624a557042384e514937545364324c4130714b797978556730674b36423535394d6964426670523641567a6c556f4d5838
6b7a506f585636574b6a673441446f3152476b6d734d653334336c57695453654e73764341493757344671515757507242586b777276476e512b5161
794856496939583953357a49662b4c574c4c4f31737a7355536f4b31454f7150656e4937353732694f3358466a61626575392b6c47497255452b532f
43774a39594c524c6431526c3939784a664c46493771575432566a30646642315879524d2f374f4c764b776c696c544d54334f506f5170393457624c
56634a71735375376e4c716d496f2f613244614776764147584c324e326247464964634e6f4b4a73304f556445786949313078466241735775776654
6c5a2f43637a3863594c7036464c517363485a6152316a6775794d306f466f36444d525a6f4e31485574516d693351742b6156317370525a5a7a4c53
4b5048523846646365346b6d65564158695268314f59316641746b514c786e5546533554756e306e64645441796e437930566d4a395368635864414d
3752637049794f422b337a59316f74797a5561394158346b6144696a6e3758386a74685a4478385974754b6d5a5439486b7043577844516f53507179
3566797164534243462b34623649415575434c54714f697073794a6d453939414361566a34704d48554d2b34632b795179745932306e754e52512f37
4b6d42344f52396836357346506b555a514e64684a4d5a494f7779486b744f467352416e724550356d315357355546495666494f3959316830624773
3773437370327445776b44435869496163734e743637544b4b6f2f7968554b734c36706f6e32343251653475354b39714772467a675456346e2f3144
514964642f44776e4b35322f59546369614d5445555765372b335777666f414753444445756f4741625465797455636e4c737757705338734d45546c
36714655696a6464517638352b577a6f55556a65554b385a7a4b33424c6a62666f493771686e624346462f4f5566794f32305851754e596e4e305669
352f4f496a65696b6d385867664765695439416f3847516d774a7375623344616c59576732434c4c445a7368643845786a4b6c696a302b6673425033
4a4746514139374e536a55444d7639413064464342442b79534e625742535973357046784c395a766542346b69506d2f447763465443644d4f694159
57614f4b6c6961672f7146386e7a70716e5656366859487354314a52642b35522f6f77526a34524e64397734507959445372324e5961437950537566
3659484a654c31416c4a4e37752f7a776d6f43506e6a574e5931733848475569652f6a766b3031627a7234312f4e6f43444553364b3976774f34316e
4c334b4962556757474f574176396d4d6d495674436f53394b72687a45776c68455367517546554939334642744e63772b32324e5173356676316872
75794f7a667574526c7179393755473764566939427a736d486b5457356e327a32786e32315454542f4355444a2f5650367331424273766c55434255
6845727a2f497575394469474e627a46627579344c586c61507649387855665453797a375755447663344c76586769436635664d67634632582f5866
43346469423231313846644d386b723941367749385855572b4c794955313467574e564154626c335775623032506b636133714c4e6a6d6e516b5265
34517874354b6c64735131417150594139677769654f6261776f30343079512b417549547037536132384573746d6f6e486137767365383932567a32
436b46586d7641746356387a772b493431773969315555563841793457696c4936496f7a534b39344941556b496a4c6669734d5844564f5865796f65
6961396e4e57764d56466b753952537848542f527a2f6575397830513841774d526f4136595142524c7050374d6d517a33784e677959645466764c49
34366e57347a5235526f697752732f2b4d336c692b5763766f2f596a4578746e743868736d65443161574468323855336e5948227d7d2c222a223a6e
756c6c2c223b43586b67223a7b222f223a2262616679627769617837776f796861646f6961686e7876746769756e723679376f33346d6e6a63767071
6d6f3567756e6f6d79616473357367346d227d2c22506f3d357d39404b7c32223a7b222f223a226261667972697164336f6977337465777369796768
75363336767033676c766c67696767366970356b336d6f33656765777661666862736d6867756972706d69363436746e646261696c6b6c6473656f61
6a736b656b3435326e6e34756979757762756363746e6a657062626165227d2c2257492e223a5b66616c73652c6e756c6c2c6e756c6c2c7b222f223a
226261666b726569686c6378326668676f61327a67786f6766716b616d79716c376b66796a7273736a6a62747663726f366b753663687a6976627734
227d2c5b66616c73652c5b7b222f223a7b226279746573223a224c54412f6b7653397645777645306d707a386f48227d7d2c7b222f223a226261666b
72776961786a7574346d33376d786767327577686e747163717076337a6c336b626f6d61746669776a64776c666a773261733736777875227d2c6661
6c73652c2d373437383731313838303738333132352c22682e3e21685c2271502a5a5c22776e6b21672661577d4c3c23763e4f5f523d78722d373b5e
36255321555663446775204347222c747275652c5b226b7a615e59315d316e27413a225d5d5d5d2c22766a786a43573e2a223a333530363336343333
343239303735317d5d
```

#### String form

```json
[{"/":{"bytes":"DtrSyg4q28uPnC2wNogE8WRVfKe0QQvmoxdHIiQv0LtJSps1woPcJ6JRu2wB0PqRKdaevwLTAFShGAjBcFvTq1w11klp/tUbDdQWkZzPwk70Vdj/mGzRCUcXqbJJlJv6nUhu/Wxae4wNW5iQI4Mqa8NBEE9LnKyCWi1ewWPRFRReQeaNE8im+VlgK1h6eDTFcZ7t8Ke4S+mKlo2ME47zKStPtjEkOQw8BPx1OR8d+V2+VZFDuRfb2+cFuTpAa8S1fLazbSyQDaCHtBtve32nFKGRvSNuUlIJlEe8bb7hTR0ELTD0r//W8inIyTMdUFbr9czVUgeXCRLtMAn7E9GN4JA5OlxChRK9k04Wm5JOK62wNzkGO2X2Z3fzdC0197ua8LMu7rb8xprqAfGinQGHsezySI5rjAuCOI83g1y7lPhm2HkGbxeUqO74fVDrHtE/TSwxSZ+7m9OSDsKPx8selzupgF/4hzT2x+yUY0So4FU3L9XtxFC0kPidKhUGa8N0rq/Fbah/hM4BDHRw2NMiB+k7AClq6uH0D+yzs7zHfZ5OJ4Vn2pK1OV4MY1AoOSI+En5/mHQfKR0VTMsz8swWfI3IecwEYXCWOr+lG9DnZs4sBPcYd1GDU+rO9rL3HqkNxd67egRzcT5LfQALNJRe7+odtIvD0Ule1w"}},[false,-1.2911031115785543,-3.549628172789375,true],"\\Ix9$@a}S?jc.nm(8a,)2\n=AlHMiUs%!1q&RI;?\n?`☺3j::H]LxTdap!RTJ`p=@OWoIa%3j</gUL#CYT~p\tl\tn ~;☺cA-*_h0Sp^K>{_Q0SbfvR1\nRm@bM?$8:E/w{DYi(oy.Bm}G6&YYc>`0W6]Oc>fX)+mt^+oJ]97s]TB:^FZc17q+N:Pf`+q~\\)m&Gbu M2<e|qA#E_L-_^ cI] ~#?3vw!.@.}@? aE6pGmJ☺pXW\tb{rq@[ns_!h2fg<Glrn<#+L)C4fJ_BSaCc0ub|>H~w'+\"0n*L+Ikn(hHpLaZP\nG_zp\",X]_[6=V [JVd2APFQ\"y. i8YQk+7F5S#tI\tZmY]iz*-ylys=ku+h,1DLVYew=r\nMJ/<3mo{3ZNXLfArhgcc;Fq3_S\"m8☺{*bH+8c~0t]X`~(iW?ex)O[i3h:zk},}RqB[z8li7St()}Opry(&jLw\"+a[PN^9> )D0k.\t)cX>*(#VK$t>![^/ff,!6_G]bX,u$T5m|,Zz71h2_T*[t;IJTB,={EZSR3I☺O>!vO5yFAb\"R.NG{>F.S[mA:U\"0AHmFQ!TG.+D\n\n+zwxd~ij]$h*W)hRL[;|5☺8!*2.-oa34:w|KnVlmUI0DYVWYO3)IBTyv,t56dRGZC:62X7xy0aD=?hc☺IvJ#A^☺EiIfI$_N>cgY6%?dO5:!5qk[}4X5N?O~~uq~P@PI7s1z;MDdTVkRmZYCbav42Y_Kcv!V6\"<!V+Jq^5UwMdto'D(0\\sL\tKH[Ni=!lgl)`Po<&`(XExe>['5&*=\nax,Jm\\det!xu/oi_]>Z☺9j1'#V@I\t+Dc]\"1&%2'7r\n(.I]☺~R+*\\4Na[2Bp9C0J2ji4@\nVT/%O,(q$O9-^iOW5u`\"%",null,true,{"#LDM":{"/":{"bytes":"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"}},"*":null,";CXkg":{"/":"bafybwiax7woyhadoiahnxvtgiunr6y7o34mnjcvpqmo5gunomyads5sg4m"},"Po=5}9@K|2":{"/":"bafyriqd3oiw3tewsiyghu636vp3glvlgigg6ip5k3mo3egewvafhbsmhguirpmi646tndbailkldseoajskek452nn4uiyuwbucctnjepbbae"},"WI.":[false,null,null,{"/":"bafkreihlcx2fhgoa2zgxogfqkamyql7kfyjrssjjbtvcro6ku6chzivbw4"},[false,[{"/":{"bytes":"LTA/kvS9vEwvE0mpz8oH"}},{"/":"bafkrwiaxjut4m37mxgg2uwhntqcqpv3zl3kbomatfiwjdwlfjw2as76wxu"},false,-7478711880783125,"h.>!h\"qP*Z\"wnk!g&aW}L<#v>O_R=xr-7;^6%S!UVcDgu CG",true,["kza^Y1]1n'A:"]]]],"vjxjCW>*":3506364334290751}]
```

#### dag-json CID

```shell
baguqeerahwdk4qndsyfxiidt7ymfw2hnizsmksugm36r2sksm3i3feg3435q
```

#### dag-cbor CID

```shell
bafyreibjeqkkrupx67ngfmcjfv3qg5sa2zroqlokhg4bhmymgrcpzbjw7q
```

### garbage-23

#### Bytes

```shell
224124565638487d726f4244574b52473b572c5a2e713543435d6f4e3d3d703762354a7a3e3d4f743d67337c26447e65586f5c5c5a677a2e30386e44
52523c553b752d44364c4652574a3c21547d3f5c5c4b476177546c5b444c614f736f584c2b5c5c4c6344703b77604467364f6c4b7c78756274726649
635c745a2a7a517654382830536b353c764f773743757a6275353a7c68235b513a48417a533b3e21294e2b6f425c6e5b2a5a39353b203467694c4a3b
2173542c783e5a465d635d497674643866307229377666714575772b615e3c3b437d383741674770705b5b4829565a6e365434453d3b7166444f6a78
735c745c6e2e666124497240494ee298ba4c3a3b6c77766a274537773c535d6c6f3374762b4e4075346464317a53787d3e5b20783252736c40634c31
70522b3e5d494a2c3523412929466540514434544661344e53297d7e3c4a242ae298ba544e4a732c5d345c743437364c3c606b655e442f766421715c
74296e312d6e7a6b762b726459712673374c4b23767568613d747176784b5f343e2c255b414c254c4e415c6e77206d544f4d4f3443202a35683b7637
50543c362d522c414b3d77454a464b6f335a442b4d5c6e62533458755b686e4a525b2b577c792a5d613d64737e574c5b542157472028254f555a3536
61297d3a573d2948702f3d36423f5a654e374925364d70484a76294b307b5b6c4b6d29425a3e652d69272053286255733f3d5b434b2028583b374b3f
2665532f5e4775775f75767b5664266038425530616b775a5b506d7174325c223c634e284f7b512c445c744c712d2c20335c745e58565c5c796b5523
4d7d2f5e5a7c3f4a464e28565f5f7b4e4a5c742e645a46622848244c70706a4252256163764a2179555c22595d743c3d2e3e706c4a604d4f565a325f
4d215c744e2323245c74476d533d2143646f543e245b4f2e28634ae298ba30694c4d685e4163477d4d6f62613439715e457c2e535d213f5a7d686e5b
6233377a4d555b425078407c7c5c6e52617e357a767b5b586fe298ba676c217a6d75247747474b6547474c7d792941236c69215f36626d56313f773c
3c613c5e2d743b2b2652417549435d347974732d6f522451604e362f765b6f7d357973742e6970287e6f4541397260575c5c5b3d2d3023456973442f
4a3d40244e4275712b254f5c5c50523a7e63604d7b5c6e687e287d6c31444d7150463d7a5e573d5e2d7d5c5c682623613d3578685c6e597a3a483739
2552203a54565c5c42424f7951552d792b5c22623c6a65583f7760633e5253646f302b294b32435d6630566829517d442a5c74564e5e363c4b522f58
325a3e563871e298ba5e794047262f5c6e7323513430252d3b357d545c6e2769662d6841375f57256be298ba58445d604a3465783166464f673b3131
387d54322d233c213b755f5673434649722b6f3f5c74395c746052306551293332646e27533a256be298ba3152314c5d74637766586d5875344d2b4c
4f582b2526385b277a5c225b292732697062264a27267c5f2167352f79306c3d5c5c4379372b51783b614b65242e43236121382f487340752f3c355d
2375502a263f6a777032287c5e6926667d33672c5c74414f646c4b5360457452312469436b2e7a7a587c5c5c337943345d2455687754743d5d412574
4b257b6a712051283b444429663b382f50715c743b64266a643062457074484773266f2e7d453f346024445c6e7452515b68253e2655694f5a457143
7633797d2f26397120467142333036244d332d2f48553738474b365d7a247a703137633b6e377862445a302f6f5b6c424f49436c4b426e313d34482d
523b242a273a38705c5c58272c606e51765c74774c7be298ba3858634a4a4b59496e242b405d3d3771335b397231362e5e7e75716e2d3760266f7d76
593f255c5c5168572436e298ba2b405f7b7b315c5c794c3475535c22384b436b315758646c6226692c23547957212052533d6974204542742054455c
6e5f265c742b5c226e444159235b4469356132642334573676477a2c2d3b2f465526534c2d7e3e653c625372755c222f21455642322e212d33577343
5534345736497b59795273636e552869632476425c22675b7e7065426c7c752978583f562a254f5c5c5137512c50724e6a2c4e344f3226275c226156
412851654c5c2220405c222b536c6f4652326b337670204c7b7a4b412a7e2e204847294855534262656649633426766a38434a5a35625ee298ba635d
2b6c2563765c7420375b4936762146455349655c743c48547e403824516b5445314475462174347d4947544b3f374e217a3a4c2f45625528513d6323
785d3b757631256d665c5c256341645c745e2b797c2d52684d3e5f5950727a735c6e5f547a5c74277829385d3f5c742878475f61552d717b72254324
36317a5d764d28645e40272359602d2023587e6b3244616c49e298ba4b3b6d773959733c637168297b3e72293047674945216e57252f4f5d2c766b5c
22265f7b3e452b24682a30462b596d67462b5848483c6de298ba2c3a7e495173252559563450303c5e26395d2a3e3630234b3e515f285459e298ba3c
654b7c24747541525058796d7134675a3fe298ba3347337d555c5c366f79715e3146354d5f72776c5e4842356633662ce298ba595c6e71356a4f327c
326e5b7755734f5c223b634f6f306b4b543b5d374f47696538453832425c6e767b44324652293b7872543f60733d2d5c6e637277676a357839572c36
4639756a285643255c5c6630252637255b443c293a5c747c412d2f6961373d424b5b5c224660496834516a7e797d387b6442236042536b626a2c2461
5661424f542d21632e5e284376505c22744337733250307661615d39654a3a5a334d38254a412c6b532b4054307e28e298ba36704f7648e298ba2a26
742752767233556f6d334251645652397a5c2230603948315747496c7129757d21485c2258505e5858446d234f5a27495c743e3c7a37657829403c47
293c455d5d24752d317127685d41362b5c22292128285976342f3033242753455c746e7e4751385a4167584a4a5c5c5d3b62466b54572d23594048e2
98ba5d213c3c6d2a782066377a58485442575d7a3a62506038526037422959623073375d61512f4920645527305e6b235c5c343471685e2c7e4a383c
2e57742a684033413c487e4d4f65773d5e56506c23413643525e684845407b30385e6c5c2244256f4e2f235149e298ba57725a6c5727265934406137
4e64237e233e56425b495e353d2a645a315d564b3a57552d35464067595455594e3b355c6e3f2b7236245c7432253147202a5f385c5c4463415c6e7d
47434d385c2246673c2964674e317c2b7b373c58414a41332a6d4f78676e265c5c4944673f4f24664b537a663a5545435266482339796478444b3f39
3430473a6e795c5c7e655a33414d3d616c61206f4c3b37435276444d42464b74644977647b6b6e60257628637b3f6f5a2b5d2c5f3f6c79576a713b68
7c2f5c74535c74444e406a275d556c3e6c5123376652306525303f4a20315957746b5c74424f4b6548433e5e546c40685c2230415c223837314b386c
2a5f79442a4e272c287c565830532942535931743824515f667c655054203e71283c505c74566f69393476727d7554785d262668353e2a5334474723
4b4c32526b54495539467c57485336515b33644e363e67417c772a672c7b624d4321722f5ee298ba5c744854384929435875683c7550514d55273e76
466a4635363f575c746051794d5e545d3e703e6f7e6b3c34282052482b3d4f7745625f3b5a7c3d4a482e7a64255d4d375372764a4e2b463b385e3156
662c286c48345d4a50676a3738485d3642e298ba4ae298ba4a424d3769205c747870565c225b53287e2666772e5558795c5c23636a347b3959796221
5b6947512153727c4a522176483e5c5c50e298ba3b574b2c5f4759615876284f244e3225594a3b773b3c7d287c3c742761783047695950255a5b3834
5872636e4ce298ba7348242f2624322f3527764949423322
```

#### String form

```json
"A$VV8H}roBDWKRG;W,Z.q5CC]oN==p7b5Jz>=Ot=g3|&D~eXo\\Zgz.08nDRR<U;u-D6LFRWJ<!T}?\\KGawTl[DLaOsoXL+\\LcDp;w`Dg6OlK|xubtrfIc\tZ*zQvT8(0Sk5<vOw7Cuzbu5:|h#[Q:HAzS;>!)N+oB\n[*Z95; 4giLJ;!sT,x>ZF]c]Ivtd8f0r)7vfqEuw+a^<;C}87AgGpp[[H)VZn6T4E=;qfDOjxs\t\n.fa$Ir@IN☺L:;lwvj'E7w<S]lo3tv+N@u4dd1zSx}>[ x2Rsl@cL1pR+>]IJ,5#A))Fe@QD4TFa4NS)}~<J$*☺TNJs,]4\t476L<`ke^D/vd!q\t)n1-nzkv+rdYq&s7LK#vuha=tqvxK_4>,%[AL%LNA\nw mTOMO4C *5h;v7PT<6-R,AK=wEJFKo3ZD+M\nbS4Xu[hnJR[+W|y*]a=ds~WL[T!WG (%OUZ56a)}:W=)Hp/=6B?ZeN7I%6MpHJv)K0{[lKm)BZ>e-i' S(bUs?=[CK (X;7K?&eS/^Guw_uv{Vd&`8BU0akwZ[Pmqt2\"<cN(O{Q,D\tLq-, 3\t^XV\\ykU#M}/^Z|?JFN(V__{NJ\t.dZFb(H$LppjBR%acvJ!yU\"Y]t<=.>plJ`MOVZ2_M!\tN##$\tGmS=!CdoT>$[O.(cJ☺0iLMh^AcG}Moba49q^E|.S]!?Z}hn[b37zMU[BPx@||\nRa~5zv{[Xo☺gl!zmu$wGGKeGGL}y)A#li!_6bmV1?w<<a<^-t;+&RAuIC]4yts-oR$Q`N6/v[o}5yst.ip(~oEA9r`W\\[=-0#EisD/J=@$NBuq+%O\\PR:~c`M{\nh~(}l1DMqPF=z^W=^-}\\h&#a=5xh\nYz:H79%R :TV\\BBOyQU-y+\"b<jeX?w`c>RSdo0+)K2C]f0Vh)Q}D*\tVN^6<KR/X2Z>V8q☺^y@G&/\ns#Q40%-;5}T\n'if-hA7_W%k☺XD]`J4ex1fFOg;118}T2-#<!;u_VsCFIr+o?\t9\t`R0eQ)32dn'S:%k☺1R1L]tcwfXmXu4M+LOX+%&8['z\"[)'2ipb&J'&|_!g5/y0l=\\Cy7+Qx;aKe$.C#a!8/Hs@u/<5]#uP*&?jwp2(|^i&f}3g,\tAOdlKS`EtR1$iCk.zzX|\\3yC4]$UhwTt=]A%tK%{jq Q(;DD)f;8/Pq\t;d&jd0bEptHGs&o.}E?4`$D\ntRQ[h%>&UiOZEqCv3y}/&9q FqB306$M3-/HU78GK6]z$zp17c;n7xbDZ0/o[lBOIClKBn1=4H-R;$*':8p\\X',`nQv\twL{☺8XcJJKYIn$+@]=7q3[9r16.^~uqn-7`&o}vY?%\\QhW$6☺+@_{{1\\yL4uS\"8KCk1WXdlb&i,#TyW! RS=it EBt TE\n_&\t+\"nDAY#[Di5a2d#4W6vGz,-;/FU&SL-~>e<bSru\"/!EVB2.!-3WsCU44W6I{YyRscnU(ic$vB\"g[~peBl|u)xX?V*%O\\Q7Q,PrNj,N4O2&'\"aVA(QeL\" @\"+SloFR2k3vp L{zKA*~. HG)HUSBbefIc4&vj8CJZ5b^☺c]+l%cv\t 7[I6v!FESIe\t<HT~@8$QkTE1DuF!t4}IGTK?7N!z:L/EbU(Q=c#x];uv1%mf\\%cAd\t^+y|-RhM>_YPrzs\n_Tz\t'x)8]?\t(xG_aU-q{r%C$61z]vM(d^@'#Y`- #X~k2DalI☺K;mw9Ys<cqh){>r)0GgIE!nW%/O],vk\"&_{>E+$h*0F+YmgF+XHH<m☺,:~IQs%%YV4P0<^&9]*>60#K>Q_(TY☺<eK|$tuARPXymq4gZ?☺3G3}U\\6oyq^1F5M_rwl^HB5f3f,☺Y\nq5jO2|2n[wUsO\";cOo0kKT;]7OGie8E82B\nv{D2FR);xrT?`s=-\ncrwgj5x9W,6F9uj(VC%\\f0%&7%[D<):\t|A-/ia7=BK[\"F`Ih4Qj~y}8{dB#`BSkbj,$aVaBOT-!c.^(CvP\"tC7s2P0vaa]9eJ:Z3M8%JA,kS+@T0~(☺6pOvH☺*&t'Rvr3Uom3BQdVR9z\"0`9H1WGIlq)u}!H\"XP^XXDm#OZ'I\t><z7ex)@<G)<E]]$u-1q'h]A6+\")!((Yv4/03$'SE\tn~GQ8ZAgXJJ\\];bFkTW-#Y@H☺]!<<m*x f7zXHTBW]z:bP`8R`7B)Yb0s7]aQ/I dU'0^k#\\44qh^,~J8<.Wt*h@3A<H~MOew=^VPl#A6CR^hHE@{08^l\"D%oN/#QI☺WrZlW'&Y4@a7Nd#~#>VB[I^5=*dZ1]VK:WU-5F@gYTUYN;5\n?+r6$\t2%1G *_8\\DcA\n}GCM8\"Fg<)dgN1|+{7<XAJA3*mOxgn&\\IDg?O$fKSzf:UECRfH#9ydxDK?940G:ny\\~eZ3AM=ala oL;7CRvDMBFKtdIwd{kn`%v(c{?oZ+],_?lyWjq;h|/\tS\tDN@j']Ul>lQ#7fR0e%0?J 1YWtk\tBOKeHC>^Tl@h\"0A\"871K8l*_yD*N',(|VX0S)BSY1t8$Q_f|ePT >q(<P\tVoi94vr}uTx]&&h5>*S4GG#KL2RkTIU9F|WHS6Q[3dN6>gA|w*g,{bMC!r/^☺\tHT8I)CXuh<uPQMU'>vFjF56?W\t`QyM^T]>p>o~k<4( RH+=OwEb_;Z|=JH.zd%]M7SrvJN+F;8^1Vf,(lH4]JPgj78H]6B☺J☺JBM7i \txpV\"[S(~&fw.UXy\\#cj4{9Yyb![iGQ!Sr|JR!vH>\\P☺;WK,_GYaXv(O$N2%YJ;w;<}(|<t'ax0GiYP%Z[84XrcnL☺sH$/&$2/5'vIIB3"
```

#### dag-json CID

```shell
baguqeerarpl3bcpwvhudy5hnalwa53zw3wyovftg6kejysegw4hhuxde27na
```

#### dag-cbor CID

```shell
bafyreig2hp5sjw4zyach3pvb7juq6rgsy6iwvuessve3xoaa7a3wfhmuum
```

### garbage-24

#### Bytes

```shell
5b7b2246363d3b5f3b55223a2d3230323736333332363630363137332c227350745d315b223a312e313330313739393839323930373233367d2c7b22
2f223a226261667962656965346164656477753736796437377a6669666975767234776b6864777a6133666773706c687774747a6a6f327270726573
786f61227d2c7b223f7c223a6e756c6c2c22414923747a2f646e223a7b222f223a7b226279746573223a2273393663575756342f783262594b446533
65314730444b657571627a6c52774d416a3848676841726b764d354b345443522b4c3949534c4d5a4c7163397857764c396b66543938516d476f4972
337234616e3937437178382f6a48676c77492b324d614a56445963735041714e36716e6b617971444d67456d416139574c58584666366d6b4f2f7a58
436e707177516f4e3773706e4e6b4a7372546f4b6c69464c476d5a46516a6d567a52734e4353756d67664b4d33342f6c45536378676f316a33344a58
4f58376a3971446a3739786f6c316b7755466a4c79766c544b4d4b41494662363039486979385651554159686c326a705871663352734d677256456a
4c775234485832505a683634364f7472464f336f474d322f6d7a61466450746438454337374e314d6b4866584d39396e64715336474741752f456c39
426e6945397366537245504e37565643612b47506b2b777236416f4d704c61347a4d7a792f684e622b6f54394d4b716e45625567756d4d354e6c4662
415a3972567970477643616f5855664969696c422b416539303742307843535a523375785564324e5345305659567a5479763146304332374379355a
6a6f54493154594c4b617551672b3058723736687844786371664d41433061696a6e36477367506d343352495a4969344f59654a752b444661523872
664a584f486d356e6e383265594a745357304e687734782f522b3876655630304b47377a333346704c566f35496f565041556d595931794a4b564d6f
574e647564312b4b44665258354674695679715375597159314263786d343476707251576e426573373944727765317952696968335a6e3335334641
3679444a503556363439614a384e56696e57726a65613046445458767334686f523578724175674f437564685a456e384f364a6f7656664e386d4862
2b7434575173717879305472736f493030357453657a42534342644f723555695731654569646a486b6d4172522b48304c497266714264382f616279
5236465a4f695a51735977385161424c6f38416d52684b384144595145305230444e44754847357951486b4c5356784b3478355277623074414d7555
704f78734f30565437453773427a61626a41596b6d796c37414e344243306a48377938317453776144384e666571785278316a5a66705849556b4243
31726b766346716a54316a4a657a426746713730474f4b3250645437676d424938644f426f4468554c37704b68533741656548684f796d6e4b353748
73514b6b666b4e4f69645776373869466330334268647258334453545a656c77546d774561394b316a2f7577653643474c65466c5466676d41522f36
6c4768424946556848623859797a4d4c484967526f2b7056772f422b5533677538697635736c3239357339316d77426c6b553877434d4f4238624138
6367645745715657346c755932525a4755736a397053584249692f476334396275623768744a42595439593262664b67782f57717866634e53733355
52446a55496f51767a713634356f72324d2b4b75716851454133596d42626738387a6c2f3871322f7541395070486b7775495a67324c333052687834
39437a416d655a596371526b43516e526f6b796e39487549627062397864766641487a37524865536679697954444b64356a71624d306a5766797676
6e4c79536a7355663479454a6c6d7542534c6438777659473452665771526d6173376c4466436d4d514364614e73322f6d444475584b57434d756138
4f64747363376c716f30314a6a572f54523657304c6a4b6f6954426170796c534d4751534b6851395a54575852676b4639366c7470707666374a6558
635a6f4e767578636935436144664f676d2f6243586f62436f4b6135445a49796b4c6a366e7045417834515367326a4b675a436572567645664c5973
4863534f706d57773064572b444130395761487570366b6d6e65615a617665486578436e546d5051646335444455717a324f75506d57697744614975
646a4345452b6a7831757057666f4b6a31773559315148613461626f5862686f79512f4b62765a5a6b642b31666851307a4d7977497038785245704d
3030596e675068656b4d503961625235583354577261414e6a68794633484b4a7745597962334a7736692b74774874614d584752574f757975692b67
536a5471325a612f50363053784e55474f6a4b6e6d593131376e77576e474c315441746435586e4c48686f71492b31635377656659324f4542456236
5876525567475666514862316c2b302b3363637751506b437338794a3152724a59467a6964484d3249695664443239315a344350546f6966465a444a
687455324572584533365a715435716836396a486b456243785444357532637670697167474d4e68552b38332b317450306c45744656797a4e7a6678
35594c74686a4c364e5978393667504964763278447a7556674f496630632b41654a3044513655474133366d756e4b2f4b385255465149413949596b
4737317030486a48665451623533453768446f492b4641343466496d2b702f32366d5259694e624b4d6b566854304666494365733978306159735144
556762344745515077737a452f553463742f59526864477a79674d41312f38305578744a6847444c48577a344d4b2f764f454b647436617a536d4c39
5054574e576f514e6d51722f437334527455376f6a704f3231476159627a6b58487a616b424f513879534456394e3069704a66714830576868463934
7a5143656d34624f5065756c58517448414e624a7542486574314f4a2b4f55747863365a70765754307a516675353545334f454d414e30584776716b
69366266424d4d347854613978676334574539466b504e584a325745756356333474567570364974416768504b7a77515875334b31693043665a5137
7346376e643742415a516259376653664965717348624d366166396b41784f42646a626c41736b4c56447352706d324b54564258364d353251364741
6843764b6e5a6b6252732b7563586457746a41732b5a7350586b386a352f7245725466515a6942596661574e6233324d734242564f7a6753456d6249
6a365571532f4834636e456e6656414c4f4f757953386876614168504953326c654c6d4278742f68512b4965774f532b516c50664b6d7058314a3463
4436384554736e5958464b39434d4135734d7075686875374a583250574d754e74666672326b7a334d2f502f43734764314a68473072434b31676d45
5533694a68394d4f65565761526f465a706274553464454135565a45774e68747063364961715a3955496b62697a7735485539615478796764682f6c
56346b384a736d454d2b4234686e79377734346f3441707644545634395854642b516163716279777a6b6a5a7a323262416458354c4d5a546f464831
62627366597243674a7964763674764557545036516257426452306d486c6d6b647559307544546761356e7644547a44474449424679724d384b5a4c
767847636679484570516e56454d5a484931344656634553696b7a61366b49384663625557576e4c616d665a44326257774770714f2b42344b556266
3053306c44556c5250512f52594378784c62664d7563645557456358536b6139352f6e6e725a465a4b4d6e77454b487177472f4b3175797733624d71
7a4e6e666b706d3559596b6c52524f4a494150714343552f613763544b384a75303334416c4b6d4c367a31625a5242466e6e7548526d727943717554
775a4674777937676d704d376e4f627179424c334b676b48756c4361374a6e3744586c726737584b653865786b2b4437704854583734384d7879562f
6544786a4367576a697a782b5442727652325758354c2b2f3156587a564458486379706a456b474d516f6e50716c5259435846614d7258536e635352
7258662f6a49627459512b44342f344e565a69396f4c5557494c2f5370335a6634746b776a455355624b35496c6936464374336c66793458566e5152
396f6434526949555139736f6d7755743170316d52636f58594a6b3232364f3472676d736c514552615a4e574f5242747844386b586d52314733744a
514f4259386969445655634962757a76524a4346594e31534432336a526c436c433354306a5134475a543539465a7136616f63764c4e75666e594150
45326f656f613537675733597561384f6d79445272766e7450355844554c6c50384371376f305352477938394368596950646a625652637559547839
6b4b534c4247324f6361554876766f526e48382f63504345655545787a68496474516c7551682b5465795a5a68383971496b2f6d53316d6a70786564
7a567a786b54356b5a4b5674597a7a6e34507671437a7275547059503343453750655a6d31434645544472323337494b30497a4d76376b6866356545
5a54654b32376e6446415873626b3945657a6a324f6835414b4e6d47484131526a4967506f725a6d6f464d616b79476650634d764b6d786a55595772
36374e66434a3036736942766875625a7a39734d776b67776b2b704a4a6f485a356252446e497634374748723444676976684b674a63694b53524431
4d68333039497443384e446d6f706e6c757368516b72474637374f74473658624a3051564352544375677068674c4a5177456d704f787463786d736c
4f6f4b42787847526956467775726f5169723255307a5056644c37416e516b764f65685052464358447134765575514f5a6e58747248474135787649
5a7843374f2b5443536931677434764976704c4c306a386b5750356c414444304e5552785a56693656655a47345a6b6b5a37684e4261726355495346
5638524174495a7279324d32324c51456e6a41634b5a2f3731734b4b364e65314b336271574e4f4c31646a755a733762706c6b3337574c584d2f424b
644669336454586c655358733054514c42594b677a74726e4c7332334d6279436d62694d6235466268316b397230312f4f497837576b6b4e6c575453
356c31707146422b474e4772636c4d597474566258724a646349344a646643697467486e2b486d37766d4731675652355874375971416f396e7a4264
4e4466427a356a44346d714a636a4f744c542b673869664459367033714a68774e36746c4e72777774425954557769544164416f586641362f364a56
5937344c506278415a434f7a397a4966454948623457716735775869346b384935476d715154306f6f70627031757767446b5535747849356b466b59
6c305434776554352b4f4f36597862777532382f583163396c356e526147614b4672637567546234686c487a4c336768306b39324b71597a34493434
4a316e373970544763476f65766a74694a484547485a6f674b7141716237644b736e3171354a3032787a6f6d6e315432426966306a6f533678687075
416259763130513956596c30396c364e7638732b582f62746a6f4c62574474314f5a7369414f652b59733930627538794a4d2f633772734263442b66
4f535262693234424c37743072696763677551567036337164756568687439796e38587a784f6677714d777773504b50753930744c77446b42586d42
497257447a6f524679472b504857737062464c5270666768453867414b4e77776e4b7744664a77537a514e643072774d345848493267354e2f484554
6b70326462625535636f34497961744c6e754f5337696f744662514d527242786877595a3034634664397a787635327875587252477256753641302f
4842785634717a6d63374877524545515556757942394a69327071596545504a6c684373484d48794c724b6e613955654b78686431345a5049483244
684b3839304f62397a364373426e7568454975537676654e417736546844733671556262585363576f4f5649556f68357a4278374346426277576272
3239793142707641375a73384f5a667931783455336b58654d4f736d776152797a3259334477516733483033356e4245475964726c734253654f5a7a
49676d70744f73726672493278397868507033544b45787a32682b50793846765a63795166467874373749344c33736c387a6c516737757766787a53
414b4351742b7872437865437248417a736c73336f376364464154632f41747166652f6d717a545769745167626c30303761582f6161582f47526a41
42307a63482b433862484f6e5168634e5a70306855417936724562554b736f492b54566d392f2b635a326556755646316467616768434b572f676b62
6c6175726f4b5a62453369365267504c445a476a6949534355766d4167733464506b4344696d5a46706f366738306d487556366572664c7865456831
564661306b4576363637796e555769755657356c797377446e4464637563504a4a6b4648534a68654a38746d7066385a706f6835395a367873505656
64396a2f3364485a3359614d4832646878774f694c66322f766e79492b643545326e6959536b6e67736a6a5452496a76344a4f3776785a5736362b65
4f6b486f6a45327879664b684f6961726456307277444d2f4d73786d6a4f4a6b4f7855344b2f43544a54596951474b306c7144435065674a48546350
5061744e4731756f724249536765626b3671674c6b7a5a552b6c386d323363674f583348397148414d5a49536d4f3562503343445970353636473661
4c462b425768684e59726c7631416c78533337656d4555426a6b6665694e6f734954786956762f374344676a2b4347636161344c77494e3933416857
302f353876366762504e4f79464f592f796a4c533368466837683574704b6d776952726b4e654c5237485178587a3457664f4e4f76424f7646394552
4a544272564839464a536b5446466a69494d616e33644c2f79656d4d4156717978374566796c4b79576844695462617345354f576d704b5032577058
2b4d75624d38746876437647504169774a74776947694878554e2f36444d656933434a306d704147564b303953715a4b57372b6d4c4c676258454874
654d494943315361502b6d7361366f473341592b386e457254702b4e4d66486639435a51384666557a626b6a525972595a6d63656942666b31384571
464a52514c694d315846684347764e73306b31455669546161664e503133315a4b58346a3637367334457662496e3333414733674368492f592f334f
6e705038796769387667416f7541414e6b6f4c58476d344d6249464758577541484662424859724e412b736f4a32752b426e7a41776c6a6d4e644a5a
314f4f4c5548307156676c79517259335a7876584634467a2b737833574c334b3137467a564e534b686748483349596f4c2b4674482b2b3975523547
464a426e59786e394468397165307a70432f53227d7d2c2275443d3b507a436375577a76445932716f223a7b222f223a22626167757165666a717378
7934767863756b6f366e7667656172757774656c687167366a69346237646566737a746872756c626b34336d78356b7a757136626e7a7934786f3773
68746571687762696c716e7768696d227d7d5d
```

#### String form

```json
[{"F6=;_;U":-202763326606173,"sPt]1[":1.1301799892907236},{"/":"bafybeie4adedwu76yd77zfifiuvr4wkhdwza3fgsplhwttzjo2rpresxoa"},{"?|":null,"AI#tz/dn":{"/":{"bytes":"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"}},"uD=;PzCcuWzvDY2qo":{"/":"baguqefjqsxy4vxcuko6nvgearuwtelhqg6ji4b7defszthrulbk43mx5kzuq6bnzy4xo7shteqhwbilqnwhim"}}]
```

#### dag-json CID

```shell
baguqeeravnry564cs43i4lg35ig23fwqu6vwgn6kyyd7ruaaztvufacjlooq
```

#### dag-cbor CID

```shell
bafyreig3fe66o7torlsuaphj7qzyouh3fb27attx5cbdxce77rhhajibmu
```

### int--1

#### Bytes

```shell
2d31
```

#### String form

```json
-1
```

#### dag-json CID

```shell
baguqeeradowwxdhzoey7z2vykq7id53vogk7xmotnm3w52muvuopc5uzyrsa
```

#### dag-cbor CID

```shell
bafyreibwvht7dsk3ql73tf2d4dc4jtuv3a6juqykvrm7qtxtzp5lmfcqna
```

### int--100

#### Bytes

```shell
2d313030
```

#### String form

```json
-100
```

#### dag-json CID

```shell
baguqeeraxfvtantde5ytjeyi7o7f26r7h53czhuph3w5k6c3cp7telqf7woq
```

#### dag-cbor CID

```shell
bafyreiek7xrdy2ej7xqapz2iofeuwo4yl43xrklokxd3k5jwpkcmos4os4
```

### int--11959030306112471732

#### Bytes

```shell
2d3131393539303330333036313132343731373332
```

#### String form

```json
-11959030306112471732
```

#### dag-json CID

```shell
baguqeera7wvij7ilupcksz2iuprb3wbcipr5vqzvvzj26psnj2oky6j7spva
```

#### dag-cbor CID

```shell
bafyreieir43khjzemsmgahaozab2vjvtdxavszixhhurvdqg2xkhrwinyi
```

### int--256

#### Bytes

```shell
2d323536
```

#### String form

```json
-256
```

#### dag-json CID

```shell
baguqeeral3yqlgtwwsyi4myxu7jqc2w23c2vmpesejnjca73w3beym4f6d5a
```

#### dag-cbor CID

```shell
bafyreigdjo5suzljxlmtuj4eoohou6vadwznc4kkdfd4xsarc5sycz76oy
```

### int--2784428724

#### Bytes

```shell
2d32373834343238373234
```

#### String form

```json
-2784428724
```

#### dag-json CID

```shell
baguqeera3kxfhk4svgchnaltrgtr6zhqheybpxsptkvf43byc5nht5wgxu2q
```

#### dag-cbor CID

```shell
bafyreiegsmviy5gqtupkwtz7d4driei2jzbf4tg3yldpc6ralqjukiywru
```

### int--3

#### Bytes

```shell
2d33
```

#### String form

```json
-3
```

#### dag-json CID

```shell
baguqeeramfn52f6ckvxyf44ehexkqvl7rteiwa2qdr2z4iyjhkylfknvzvea
```

#### dag-cbor CID

```shell
bafyreiekgmp53zydf4z2ohq3fysx3aawny2i4ah4wf4rj5el3nl2drrqa4
```

### int--501

#### Bytes

```shell
2d353031
```

#### String form

```json
-501
```

#### dag-json CID

```shell
baguqeerauj7u5hvh53p5gieuicpcltpkspublw37bztjmmtvsjwta5wso53a
```

#### dag-cbor CID

```shell
bafyreigwygio7woulumjyyylkawalinrei75k3ejc47mcnbnh2voqfikoy
```

### int--6433713753386424

#### Bytes

```shell
2d36343333373133373533333836343234
```

#### String form

```json
-6433713753386424
```

#### dag-json CID

```shell
baguqeeran4ulgjno74x4h6ltzdg5g4yq7rgc4wnhmqhrs4ae76yibbtdjktq
```

#### dag-cbor CID

```shell
bafyreickfy6hbb7xz6eiervs4n3jkmnzc2ndbh4flg2jmbz4whoflbdbnm
```

### int--9007199254740991

#### Bytes

```shell
2d39303037313939323534373430393931
```

#### String form

```json
-9007199254740991
```

#### dag-json CID

```shell
baguqeerajsjturllxdzotcklfufsmsaehhgxfvjpxcrhzp4p27zsh4rmpakq
```

#### dag-cbor CID

```shell
bafyreifyx757rmvmwx42wig6lkhgpe2hikvsfu5d7ru55fyhugqoq2leii
```

### int--9007199254740992

#### Bytes

```shell
2d39303037313939323534373430393932
```

#### String form

```json
-9007199254740992
```

#### dag-json CID

```shell
baguqeeraqpqqtp6x7neyjnd2i3zwgyt4ddn327sx4nvqlicm2frngbg7oluq
```

#### dag-cbor CID

```shell
bafyreictwassa7oj2p67275p5xztivqa3zcspn3zrilgohy3jwrv43klkm
```

### int--9007199254740993

#### Bytes

```shell
2d39303037313939323534373430393933
```

#### String form

```json
-9007199254740993
```

#### dag-json CID

```shell
baguqeerapv5k6hghxidzpxmfnypub7e7hxia24fus7rs7nsjh6vklb5zaq2q
```

#### dag-cbor CID

```shell
bafyreicb5jhmhsjiazef7gbina6ozd2er7jugqaapmhvbhvubjc6ech2ie
```

### int--9223372036854776000

#### Bytes

```shell
2d39323233333732303336383534373735383038
```

#### String form

```json
-9223372036854775808
```

#### dag-json CID

```shell
baguqeeraqu4gi57tv5d6jiftbdxdwotirxyw5czcfaif3v6u3tkcvgahzn4a
```

#### dag-cbor CID

```shell
bafyreidh4mvwi7pnv62beigtnibakkxpsgjzua5g7kdvu2deltah6kigay
```

### int-0

#### Bytes

```shell
30
```

#### String form

```json
0
```

#### dag-json CID

```shell
baguqeeral7wowzx7zbxtrwkspbwg22lmphbnxqrz3vhjdndhfhltuj73k7uq
```

#### dag-cbor CID

```shell
bafyreidogqfzz75tpkmjzjke425xqcrmpcib2p5tg44hnbirumdbpl5adu
```

### int-1000000

#### Bytes

```shell
31303030303030
```

#### String form

```json
1000000
```

#### dag-json CID

```shell
baguqeeranthdnwpyvhqvdmiaenfpoxgkrhkvxs4uyfj7kgch3267d444vzcq
```

#### dag-cbor CID

```shell
bafyreiglx3aucayuplysf7vp6jazvwef2nznas75tufpc4kn2ig76jfw4m
```

### int-11959030306112471731

#### Bytes

```shell
3131393539303330333036313132343731373331
```

#### String form

```json
11959030306112471731
```

#### dag-json CID

```shell
baguqeerajogb5uql6gilrcfykgsqh6yjdj65vptw7woitskev6dli6bxohga
```

#### dag-cbor CID

```shell
bafyreifystp4hw2d3psdtqoairwnsl4mmb2hyupopdp7wxvrxul2cdadbe
```

### int-18446744073709551615

#### Bytes

```shell
3138343436373434303733373039353531363135
```

#### String form

```json
18446744073709551615
```

#### dag-json CID

```shell
baguqeeraftnsmjs3jxdf4o2e22kpcip5nxuzxhslrlt7bdmex6uvg5rvvzbq
```

#### dag-cbor CID

```shell
bafyreibnpsyje7iwfx3smzlnofkxqdyeqz3a4qzhwu33ktibq7sxeckrpq
```

### int-2

#### Bytes

```shell
32
```

#### String form

```json
2
```

#### dag-json CID

```shell
baguqeera2rzv4orglylo5yb7lfyyxg25amazyb6yw3cr7eg2hjtg53atvm2q
```

#### dag-cbor CID

```shell
bafyreig3yg2msah74sgvow25uxddqbabex3f3mh6hysess3w5kmgiv6zqy
```

### int-255

#### Bytes

```shell
323535
```

#### String form

```json
255
```

#### dag-json CID

```shell
baguqeerasvllqjezzqfk7bvo47yneu7bprq3p33t2sfcsxzx3ghqrmcp7j7q
```

#### dag-cbor CID

```shell
bafyreih4vluto2froiw457akazzjhcfm7y22juemxx6jsyyjufp227tcv4
```

### int-2784428723

#### Bytes

```shell
32373834343238373233
```

#### String form

```json
2784428723
```

#### dag-json CID

```shell
baguqeeraqd7q5jz4bytomeikdvakzzt3qbjkcrczafx3gu6s6t2c244goziq
```

#### dag-cbor CID

```shell
bafyreiga5hy6mxnej7eankwq2zi7echorwp7wfkoeto6l3262rxn24r65m
```

### int-500

#### Bytes

```shell
353030
```

#### String form

```json
500
```

#### dag-json CID

```shell
baguqeeraaycm2mjy73wsalxsspqgfwrpi4qpo6qf2jpoanvhuaojz7g5d4fa
```

#### dag-cbor CID

```shell
bafyreifvxhnllfzufgihevzlj62j34nmzrlzfdjb5pwyqe5675meqi6o7q
```

### int-6433713753386423

#### Bytes

```shell
36343333373133373533333836343233
```

#### String form

```json
6433713753386423
```

#### dag-json CID

```shell
baguqeerahcqj2m4gchiq7ldwio6lw2js2b5o73th43sw2ulioqxsrlmf5voq
```

#### dag-cbor CID

```shell
bafyreie2fdkdrtj4mmdpcryivf4uuvirpz6ehzgmt2w2ks6s6qsrlj4k3a
```

### int-65535

#### Bytes

```shell
3635353335
```

#### String form

```json
65535
```

#### dag-json CID

```shell
baguqeera6l4j5xuopvft2isd32q4vfvy5tsw66jychmxbc2kaga37anfaaiq
```

#### dag-cbor CID

```shell
bafyreicft66te6utk6chakwkgyqxirmsh6dzjyi34c4kf2pzwpvjxaaose
```

### int-65536

#### Bytes

```shell
3635353336
```

#### String form

```json
65536
```

#### dag-json CID

```shell
baguqeerab4sv5qleqlbuh7ijtouwncddo6f6idobm2tik2y5i4haxsl4y36q
```

#### dag-cbor CID

```shell
bafyreibjfaasdb7qgrdnd2pmg7noltevqzswyif5nyup6sktdanzgpft6a
```

### int-9007199254740991

#### Bytes

```shell
39303037313939323534373430393931
```

#### String form

```json
9007199254740991
```

#### dag-json CID

```shell
baguqeera6qfuepbn3fp7fmxqe7rcechuhdhxequgfzphi2da42ltbde23uta
```

#### dag-cbor CID

```shell
bafyreiau6uboriydiauixhnjr3kv3hzdbsfjf3uggnqzrx3ndnhcpdz5dy
```

### int-9223372036854775807

#### Bytes

```shell
39323233333732303336383534373735383037
```

#### String form

```json
9223372036854775807
```

#### dag-json CID

```shell
baguqeerawnfbymfhcx3l7c3siox2p6vyqphdmevxemlrnpolxxazqlq25uuq
```

#### dag-cbor CID

```shell
bafyreih2npqkh2altk6fydcmxj4kibc6qj5p44r7jnktdw22txixdi2qli
```

### jwe-asymmetric

#### Bytes

```shell
7b2263697068657274657874223a22575461773657657168615a44446865647a47596e73747934534d522d527a4f77222c226976223a225138787050
745f7a5a7266764867522d222c2270726f746563746564223a2265794a68624763694f694a535530457454304646554330794e5459694c434a6c626d
4d694f694a424d6a553252304e4e496e30222c22726563697069656e7473223a5b7b22656e637279707465645f6b6579223a22457159614e34644645
48307658346a55336437363868774f5953675a68456c7656447a7164494b4136504648734c345050774a3745497565624c72787741424a715857424e
47306b5542526a487543763531566c78765839576f4839696b375165773079524f4347426a5f414a6566313550695a7a555655517774654856447553
5173344f63734d666a31387a635f4f62736b4876554d614e3050644342412d475f5f3772475232746359534a4f7977627678717154454e73435a4e76
61734b7848534f75415f626a5673526d576c6f554d774c4a6b726251785041735663776f506a415946326167513844343041474656457a476d685144
4c492d4f7058492d41665a594275724537665f66555f4e735974716d466a35765a396c765643563151735a615f485268516c424248786a544b794342
7566592d3047346f6d74326e7a5968794f2d5461483434655568383148467a7777227d5d2c22746167223a226a78486a63567573753079724f427a77
2d4578357a41227d
```

#### String form

```json
{"ciphertext":"WTaw6WeqhaZDDhedzGYnsty4SMR-RzOw","iv":"Q8xpPt_zZrfvHgR-","protected":"eyJhbGciOiJSU0EtT0FFUC0yNTYiLCJlbmMiOiJBMjU2R0NNIn0","recipients":[{"encrypted_key":"EqYaN4dFEH0vX4jU3d768hwOYSgZhElvVDzqdIKA6PFHsL4PPwJ7EIuebLrxwABJqXWBNG0kUBRjHuCv51VlxvX9WoH9ik7Qew0yROCGBj_AJef15PiZzUVUQwteHVDuSQs4OcsMfj18zc_ObskHvUMaN0PdCBA-G__7rGR2tcYSJOywbvxqqTENsCZNvasKxHSOuA_bjVsRmWloUMwLJkrbQxPAsVcwoPjAYF2agQ8D40AGFVEzGmhQDLI-OpXI-AfZYBurE7f_fU_NsYtqmFj5vZ9lvVCV1QsZa_HRhQlBBHxjTKyCBufY-0G4omt2nzYhyO-TaH44eUh81HFzww"}],"tag":"jxHjcVusu0yrOBzw-Ex5zA"}
```

#### dag-json CID

```shell
baguqeeraloya3qpa25kl5l4y3bzgl7rhyta2p7lwaocyxx4vpvdligb7mt2q
```

#### dag-cbor CID

```shell
bafyreihkt4u6euddfhofkutfzxwet7w7zm5qrjpop655yhnb5dnzqw26lm
```

#### dag-jose CID

```shell
bagcqceraqfknq7xaemcihmq2albau32ttrutxnco7xeoik6mlejismmvw5zq
```

### jwe-symmetric

#### Bytes

```shell
7b2263697068657274657874223a223358714c5732384e48502d7261715738764d6649484f7a6b6f344e3349526152222c226976223a225053574975
41794f38437065767a434c222c2270726f746563746564223a2265794a68624763694f694a6b615849694c434a6c626d4d694f694a424d5449345230
4e4e496e30222c22746167223a22575a414d42626c687a44437351574f414b646c6b5341227d
```

#### String form

```json
{"ciphertext":"3XqLW28NHP-raqW8vMfIHOzko4N3IRaR","iv":"PSWIuAyO8CpevzCL","protected":"eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4R0NNIn0","tag":"WZAMBblhzDCsQWOAKdlkSA"}
```

#### dag-json CID

```shell
baguqeeraovfm3rr3pvmxm27zgvxp5wycbfih35xih2uznminpnds5esm4jlq
```

#### dag-cbor CID

```shell
bafyreicxyzuqbx5yb7ytkgkuofwksbal3ygtswxuri25crxdxms55m5fki
```

#### dag-jose CID

```shell
bagcqceraxazmu67crshzqdeg3kwnfschs25epy5sbtqtjre2qw3d62kzplva
```

### jws

#### Bytes

```shell
7b226c696e6b223a7b222f223a2262616679726569656a6b767376647134736d7a34347975776866796d637576717a617676656f6a32617433757475
6a77716c6c6c73707371723671227d2c227061796c6f6164223a224158455349496c565a5648446b6d5a357a464c484c68677156686b46616b636e51
4a37704f6962515774636e79684830222c227369676e617475726573223a5b7b2270726f746563746564223a2265794a68624763694f694a465a4552
5451534a39222c227369676e6174757265223a222d5f394a354f5a636c356c5675526c6749314e4a457a633046714562365f327956736b5561515064
75635251346f652d4e35796e436c353777446d345350746d314c31626c74727068705165424f65576a5657314251227d5d7d
```

#### String form

```json
{"link":{"/":"bafyreiejkvsvdq4smz44yuwhfymcuvqzavveoj2at3utujwqlllspsqr6q"},"payload":"AXESIIlVZVHDkmZ5zFLHLhgqVhkFakcnQJ7pOibQWtcnyhH0","signatures":[{"protected":"eyJhbGciOiJFZERTQSJ9","signature":"-_9J5OZcl5lVuRlgI1NJEzc0FqEb6_2yVskUaQPducRQ4oe-N5ynCl57wDm4SPtm1L1bltrphpQeBOeWjVW1BQ"}]}
```

#### dag-json CID

```shell
baguqeeravexfd6qijjtnzxfqq6kgknnkncztgmvhjhxm6ih352qskolt2gxa
```

#### dag-cbor CID

```shell
bafyreihdfxoshbhowufyvjk7kq46dt6h7u6byejmlnifz34z7ocoq7ugk4
```

#### dag-jose CID

```shell
bagcqceraxvt5izt4sz7kjfrm42dxrutp6ijywgsacllkznzekmfojypkvfea
```

### map-1_pair

#### Bytes

```shell
7b2261223a317d
```

#### String form

```json
{"a":1}
```

#### dag-json CID

```shell
baguqeeraafnl2724yv5c3wklowipaswybbbhhec64m7mltv6vzrco2ux7bra
```

#### dag-cbor CID

```shell
bafyreihltcnuuyqp2jm24aqydpnlj7b6w3ogwrplomrjtg5rifv44mmjey
```

### map-1_pair_rev

#### Bytes

```shell
7b2231223a2261227d
```

#### String form

```json
{"1":"a"}
```

#### dag-json CID

```shell
baguqeeracp3z5isr4gpufnhd7pf7kj3g3ye5zqjoaw2w4vziudcg4jkziikq
```

#### dag-cbor CID

```shell
bafyreierz7t5y4xa635mndfb2i7wu2zxzfnpl6xvg5wr2kxeambtrgvsuy
```

### map-empty

#### Bytes

```shell
7b7d
```

#### String form

```json
{}
```

#### dag-json CID

```shell
baguqeeraiqjw7i2vwntyuekgvulpp2det2kpwt6cd7tx5ayqybqpmhfk76fa
```

#### dag-cbor CID

```shell
bafyreigbtj4x7ip5legnfznufuopl4sg4knzc2cof6duas4b3q2fy6swua
```

### map-keysort

#### Bytes

```shell
7b22616161616161223a362c22616161616162223a372c22616161616163223a382c22616161616262223a392c226262626262223a352c2263636363
223a342c22646464223a332c226565223a322c2266223a317d
```

#### String form

```json
{"aaaaaa":6,"aaaaab":7,"aaaaac":8,"aaaabb":9,"bbbbb":5,"cccc":4,"ddd":3,"ee":2,"f":1}
```

#### dag-json CID

```shell
baguqeeraiqj4qsbirp34qohua5y4veoy7idxot4yh6r2qghoxisadibfwbgq
```

#### dag-cbor CID

```shell
bafyreifzcy56s5jog3scrc7c3rlaohrwu3recxgf5c7fddfjlnlhh6p6p4
```

### map-nested

#### Bytes

```shell
7b226f626a656374223a7b2277697468223a7b2234223a226e6573746564222c226f626a65637473223a7b2221223a2221227d7d7d7d
```

#### String form

```json
{"object":{"with":{"4":"nested","objects":{"!":"!"}}}}
```

#### dag-json CID

```shell
baguqeeraf5gk7lfzh2l2hgbsqiv5z4oj5kxhnv6keki7zvcsont3ejnou4bq
```

#### dag-cbor CID

```shell
bafyreib7zq4mhl7fwtmftjn7d7mmlwf6gi32vimlsjkn25w2e5xlhz2deu
```

### map-with_complex_entries

#### Bytes

```shell
7b226569676874223a2d3235362c22656c6576656e223a7b222f223a7b226279746573223a22595445227d7d2c2266697665223a302c22666f757222
3a322c22666f75727465656e223a7b2266223a22666f7572222c226f223a312c2274223a322c227468223a337d2c226e696e65223a2d323738343432
383732342c226f6e65223a363433333731333735333338363432332c22736576656e223a2d332c22736978223a2d312c2274656e223a2d3634333337
31333735333338363432342c22746869727465656e223a5b322c332c342c2266697665225d2c227468726565223a3530302c227477656c7665223a22
c48c6175657320c39f76c49b746521222c2274776f223a36353533367d
```

#### String form

```json
{"eight":-256,"eleven":{"/":{"bytes":"YTE"}},"five":0,"four":2,"fourteen":{"f":"four","o":1,"t":2,"th":3},"nine":-2784428724,"one":6433713753386423,"seven":-3,"six":-1,"ten":-6433713753386424,"thirteen":[2,3,4,"five"],"three":500,"twelve":"Čaues ßvěte!","two":65536}
```

#### dag-json CID

```shell
baguqeerayn5yb7xbzn7uohi4mji43ukajlmigatpoqskccsb6inxjkay44xq
```

#### dag-cbor CID

```shell
bafyreia3jgnpn6w3wpvdc7qlyv7rkqjmxrrdaqohtgmwwje5mbpcef6hkq
```

### null

#### Bytes

```shell
6e756c6c
```

#### String form

```json
null
```

#### dag-json CID

```shell
baguqeeraoqru5gfp45ey7no26hzwvqwxrlgdhfde7fihao4magmjf6mcxefq
```

#### dag-cbor CID

```shell
bafyreifqwkmiw256ojf2zws6tzjeonw6bpd5vza4i22ccpcq4hjv2ts7cm
```

### string-Hello__world!

#### Bytes

```shell
2248656c6c6f20776f726c642122
```

#### String form

```json
"Hello world!"
```

#### dag-json CID

```shell
baguqeeratz333n5xwz564v76cckgvqbhly4fqxdirlhehhmw3axl64ocmsla
```

#### dag-cbor CID

```shell
bafyreigmgu7icw3p3lf3prtti7x3o7vsc6e5peltjinsa7zni2axvlz5cm
```

### string-a

#### Bytes

```shell
226122
```

#### String form

```json
"a"
```

#### dag-json CID

```shell
baguqeeravsgygqv3wi3c2e7quvm2gyq3wqdqce3irfiwjnriuvhx7qz7yq6a
```

#### dag-cbor CID

```shell
bafyreiewdnw5h3pdzohmxkwl22g6aqgnpdvs5vmiseymz22mjeti5jgvay
```

### string-empty

#### Bytes

```shell
2222
```

#### String form

```json
""
```

#### dag-json CID

```shell
baguqeerackxdfsy6yawqd3ndlanre7a75y5q3rjvolwwxlzds4q2apmc4eta
```

#### dag-cbor CID

```shell
bafyreiengp2sbi6ez34a2jctv34bwyjl7yoliteleaswgcwtqzrhmpyt2m
```

### string-long-8bit

#### Bytes

```shell
224c6f72656d20697073756d20646f6c6f722073697420616d65742c20636f6e73656374657475722061646970697363696e6720656c69742e20446f
6e6563206d692074656c6c75732c20696163756c6973206e656320766573746962756c756d20717569732c206665726d656e74756d206e6f6e206665
6c69732e204d616563656e6173207574206a7573746f20706f73756572652e22
```

#### String form

```json
"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec mi tellus, iaculis nec vestibulum quis, fermentum non felis. Maecenas ut justo posuere."
```

#### dag-json CID

```shell
baguqeera2lqzjgcpgqpn7ofg2fnbdovui73p3lqbcrd4kc7uywzxose55yoa
```

#### dag-cbor CID

```shell
bafyreihqv76sm2eewjedoh2pdhefkvii4mkebleegrc5lu3rmdu4hbjli4
```

### string-Čaues__ßvěte!

#### Bytes

```shell
22c48c6175657320c39f76c49b74652122
```

#### String form

```json
"Čaues ßvěte!"
```

#### dag-json CID

```shell
baguqeeradlrdqvxqd3cbbbtsmn7n4mpadvtqvcvj2ggkcf6mx76jzsrxzboa
```

#### dag-cbor CID

```shell
bafyreigxqkzjak6m4vnenitdpwfryihbvy3wotdle2ldsfgkebeh56ruda
```

### string-水

#### Bytes

```shell
22e6b0b422
```

#### String form

```json
"水"
```

#### dag-json CID

```shell
baguqeeramndlngq22zwtjgdxrye2qsdo7k3dltx7clrq566p6jxb5zhgaywq
```

#### dag-cbor CID

```shell
bafyreib4565nbj4j6mklcrwjqgdv3uw4i6fr5dqb4dpqcqtsgrzeyg7hmm
```

### string-𐅑

#### Bytes

```shell
22f090859122
```

#### String form

```json
"𐅑"
```

#### dag-json CID

```shell
baguqeerakloumxm3cyyspmsadsj7edgbvpgttahpjgcfpqxpliq4hryzrxgq
```

#### dag-cbor CID

```shell
bafyreihgpl6u5kyypvntwaijdv7wxeiuugo6ruujt652eigmp27zarclam
```

### true

#### Bytes

```shell
74727565
```

### String form

```json
true
```

#### dag-json CID

```shell
baguqeeraww7kig3mmi7xycprx4snzlsy5ovtydg5scwzm26ehjc3isdh4evq
```

#### dag-cbor CID

```shell
bafyreibhvppn37ufanewvxvwendgzksh3jpwhk6sxrx2dh3m7s3t5t7noa
```
