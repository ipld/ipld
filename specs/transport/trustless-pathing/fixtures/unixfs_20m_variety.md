# unixfs_20m_variety (test fixture)

**unixfs_20m_variety** is a test fixture for testing IPLD pathing and traversal through DAGs that contain UnixFS data with full variety of common UnixFS forms. It does not include some less-used forms, such as symlinks and heavy duplicate block usage. The aim of this fixture is to simulate 90% of the most common UnixFS patterns and the complexity of traversing through them according to the Trustless Gateway protocol.

unixfs_20m_variety.car is a 20 Mb CARv1 in strict dfs order with a single root containing UnixFS data across 1,103 blocks.

This page specifies test fixtures according to the **[Testmark](https://github.com/warpfork/go-testmark)** format, intended for use across implementations in multiple languages. Testmark implementations are available in the primary languages used to interact with IPLD data today.

Each **Test Case** below contains pairs of components in Testmark blocks:

* `test/{name}/{scope}/query` - The Trustless Gateway path query to be executed. This is the full string that would be appended to a gateway URL to retrieve the data.
* `test/{name}/{scope}/execution` - The expected execution of the query against the fixture data. The execution is presented in descriptive format, to demonstrate which blocks are traversed and in what order and for each block, the type of UnixFS data it includes and the segment of the "Trustless Path" it satisfies. **Only the first column of this data** is strictly necessary for testing, the CID in the first column, separated by `|` characters, should be extracted and tested in the order they are presented in the fixture.

The 3 `{scope}` types in the Trustless Gateway specification are `all`, `entity`, and `block`. Not all test cases exercise all 3 scopes.

## Root CID
[testmark]:# (root)
```
bafybeifrrglx2issn2had5rtstn3xltla6vxmpjfwfz7o3hapvkynh4zoq
```

## Test Cases

### Small file in a directory

A single-block file in the root of the UnixFS DAG, which is a single-block directory. As a single-block file, the same execution is expected regardless of scope.

#### all

[testmark]:# (test/small_file_in_directory/all/query)
```
/ipfs/bafybeifrrglx2issn2had5rtstn3xltla6vxmpjfwfz7o3hapvkynh4zoq/pi?dag-scope=all
```

[testmark]:# (test/small_file_in_directory/all/execution)
```
bafybeifrrglx2issn2had5rtstn3xltla6vxmpjfwfz7o3hapvkynh4zoq | Directory | /
bafkreigtkfmisjmiqfp2y73lpqj7uu7mnqg7cjm5br67ek6nwsbyuqgkom | RawLeaf   | ↳ /pi [0:1700] (1,701 B)
```

#### entity

[testmark]:# (test/small_file_in_directory/entity/query)
```
/ipfs/bafybeifrrglx2issn2had5rtstn3xltla6vxmpjfwfz7o3hapvkynh4zoq/pi?dag-scope=entity
```

[testmark]:# (test/small_file_in_directory/entity/execution)
```
bafybeifrrglx2issn2had5rtstn3xltla6vxmpjfwfz7o3hapvkynh4zoq | Directory | /
bafkreigtkfmisjmiqfp2y73lpqj7uu7mnqg7cjm5br67ek6nwsbyuqgkom | RawLeaf   | ↳ /pi [0:1700] (1,701 B)
```

#### block

[testmark]:# (test/small_file_in_directory/block/query)
```
/ipfs/bafybeifrrglx2issn2had5rtstn3xltla6vxmpjfwfz7o3hapvkynh4zoq/pi?dag-scope=block
```

[testmark]:# (test/small_file_in_directory/block/execution)
```
bafybeifrrglx2issn2had5rtstn3xltla6vxmpjfwfz7o3hapvkynh4zoq | Directory | /
bafkreigtkfmisjmiqfp2y73lpqj7uu7mnqg7cjm5br67ek6nwsbyuqgkom | RawLeaf   | ↳ /pi [0:1700] (1,701 B)
```

### Small file in a directory in directory in directory

Same as the above case, but the single-block file is contained within an additional nested single-block directory. As a single-block file, the same execution is expected regardless of scope.

#### all

[testmark]:# (test/small_file_in_directory_in_directory_in_directory/all/query)
```
/ipfs/bafybeifrrglx2issn2had5rtstn3xltla6vxmpjfwfz7o3hapvkynh4zoq/by/ğħōšţ/Whatchamacallit.json?dag-scope=all
```

[testmark]:# (test/small_file_in_directory_in_directory_in_directory/all/execution)
```
bafybeifrrglx2issn2had5rtstn3xltla6vxmpjfwfz7o3hapvkynh4zoq | Directory | /
bafybeigdgcs3nulbgu6vtnyesfgsaau2grbxzbxxdtpgolsfhtrpjx6mw4 | Directory | ↳ /by
bafybeidbjnqmuizharp3piroes43frsqip37qafovv4cjok667hbdy7vhq | Directory |   ↳ /by/ğħōšţ
bafkreicgd36kzadnbwjhat2eyvcbvv63a36l5oufslvryixcymnd342oei | RawLeaf   |     ↳ /by/ğħōšţ/Whatchamacallit.json [0:1204] (1,205 B)
```

#### entity

[testmark]:# (test/small_file_in_directory_in_directory_in_directory/entity/query)
```
/ipfs/bafybeifrrglx2issn2had5rtstn3xltla6vxmpjfwfz7o3hapvkynh4zoq/by/ğħōšţ/Whatchamacallit.json?dag-scope=entity
```

[testmark]:# (test/small_file_in_directory_in_directory_in_directory/entity/execution)
```
bafybeifrrglx2issn2had5rtstn3xltla6vxmpjfwfz7o3hapvkynh4zoq | Directory | /
bafybeigdgcs3nulbgu6vtnyesfgsaau2grbxzbxxdtpgolsfhtrpjx6mw4 | Directory | ↳ /by
bafybeidbjnqmuizharp3piroes43frsqip37qafovv4cjok667hbdy7vhq | Directory |   ↳ /by/ğħōšţ
bafkreicgd36kzadnbwjhat2eyvcbvv63a36l5oufslvryixcymnd342oei | RawLeaf   |     ↳ /by/ğħōšţ/Whatchamacallit.json [0:1204] (1,205 B)
```

#### block

[testmark]:# (test/small_file_in_directory_in_directory_in_directory/block/query)
```
/ipfs/bafybeifrrglx2issn2had5rtstn3xltla6vxmpjfwfz7o3hapvkynh4zoq/by/ğħōšţ/Whatchamacallit.json?dag-scope=entity
```

[testmark]:# (test/small_file_in_directory_in_directory_in_directory/block/execution)
```
bafybeifrrglx2issn2had5rtstn3xltla6vxmpjfwfz7o3hapvkynh4zoq | Directory | /
bafybeigdgcs3nulbgu6vtnyesfgsaau2grbxzbxxdtpgolsfhtrpjx6mw4 | Directory | ↳ /by
bafybeidbjnqmuizharp3piroes43frsqip37qafovv4cjok667hbdy7vhq | Directory |   ↳ /by/ğħōšţ
bafkreicgd36kzadnbwjhat2eyvcbvv63a36l5oufslvryixcymnd342oei | RawLeaf   |     ↳ /by/ğħōšţ/Whatchamacallit.json [0:1204] (1,205 B)
```

### Sharded file in directory

A multi-block file in the root of the UnixFS DAG, which is a single-block directory. As a multi-block file, the same execution will be different with `block` scope.

#### all

[testmark]:# (test/sharded_file_in_directory/all/query)
```
/ipfs/bafybeifrrglx2issn2had5rtstn3xltla6vxmpjfwfz7o3hapvkynh4zoq/želva.xml?dag-scope=all
```

[testmark]:# (test/sharded_file_in_directory/all/execution)
```
bafybeifrrglx2issn2had5rtstn3xltla6vxmpjfwfz7o3hapvkynh4zoq | Directory | /
bafybeidchppfcvpa644xihhbvbfyiqupsgp4efh4mf3pengqufwkdfrvha | File      | ↳ /želva.xml [0:1352049] (1,352,050 B)
bafkreigtwsisgpg6x752y5md2z2r4jhuhohh46y4x3mvxrbkcubo7mqlgi | RawLeaf   |   ↳ /želva.xml [0:256143] (256,144 B)
bafkreigahqispwg55yvqwobavwlheongcyhk63eufsaqutqgjiwfwesfau | RawLeaf   |     /želva.xml [256144:512287] (256,144 B)
bafkreic4kgh44v2ung3wspd7y6wigcxake45ztpfx3c5ibfwmqe2kt7uay | RawLeaf   |     /želva.xml [512288:768431] (256,144 B)
bafkreibdjsvoyftwgcywb3xylnfod2wififs2tj7pww4zkvaba7z5aigtm | RawLeaf   |     /želva.xml [768432:1024575] (256,144 B)
bafkreidtv6frnbb4o4yobyu3xbtd5onzne67dhgngpd3vwrbdcneapy6fa | RawLeaf   |     /želva.xml [1024576:1280719] (256,144 B)
bafkreidy2ntimx4u22b5uy6tjh7du5ex5lhgu7comxwcjfkzfbdsdunbou | RawLeaf   |     /želva.xml [1280720:1352049] (71,330 B)
```

#### entity

[testmark]:# (test/sharded_file_in_directory/entity/query)
```
/ipfs/bafybeifrrglx2issn2had5rtstn3xltla6vxmpjfwfz7o3hapvkynh4zoq/želva.xml?dag-scope=entity
```

[testmark]:# (test/sharded_file_in_directory/entity/execution)
```
bafybeifrrglx2issn2had5rtstn3xltla6vxmpjfwfz7o3hapvkynh4zoq | Directory | /
bafybeidchppfcvpa644xihhbvbfyiqupsgp4efh4mf3pengqufwkdfrvha | File      | ↳ /želva.xml [0:1352049] (1,352,050 B)
bafkreigtwsisgpg6x752y5md2z2r4jhuhohh46y4x3mvxrbkcubo7mqlgi | RawLeaf   |   ↳ /želva.xml [0:256143] (256,144 B)
bafkreigahqispwg55yvqwobavwlheongcyhk63eufsaqutqgjiwfwesfau | RawLeaf   |     /želva.xml [256144:512287] (256,144 B)
bafkreic4kgh44v2ung3wspd7y6wigcxake45ztpfx3c5ibfwmqe2kt7uay | RawLeaf   |     /želva.xml [512288:768431] (256,144 B)
bafkreibdjsvoyftwgcywb3xylnfod2wififs2tj7pww4zkvaba7z5aigtm | RawLeaf   |     /želva.xml [768432:1024575] (256,144 B)
bafkreidtv6frnbb4o4yobyu3xbtd5onzne67dhgngpd3vwrbdcneapy6fa | RawLeaf   |     /želva.xml [1024576:1280719] (256,144 B)
bafkreidy2ntimx4u22b5uy6tjh7du5ex5lhgu7comxwcjfkzfbdsdunbou | RawLeaf   |     /želva.xml [1280720:1352049] (71,330 B)
```

#### block

[testmark]:# (test/sharded_file_in_directory/block/query)
```
/ipfs/bafybeifrrglx2issn2had5rtstn3xltla6vxmpjfwfz7o3hapvkynh4zoq/želva.xml?dag-scope=block
```

[testmark]:# (test/sharded_file_in_directory/block/execution)
```
bafybeifrrglx2issn2had5rtstn3xltla6vxmpjfwfz7o3hapvkynh4zoq | Directory | /
bafybeidchppfcvpa644xihhbvbfyiqupsgp4efh4mf3pengqufwkdfrvha | File      | ↳ /želva.xml [0:1352049] (1,352,050 B)
```

### Sharded file in directory in directory

A multi-block file nested in a single-block directory in root of the UnixFS DAG, which is a single-block directory. As a multi-block file, the same execution will be different with `block` scope.

#### all

[testmark]:# (test/sharded_file_in_directory_in_directory/all/query)
```
/ipfs/bafybeifrrglx2issn2had5rtstn3xltla6vxmpjfwfz7o3hapvkynh4zoq/Flibbertigibbet5/eorþscyld.pdf?dag-scope=all
```

[testmark]:# (test/sharded_file_in_directory_in_directory/all/execution)
```
bafybeifrrglx2issn2had5rtstn3xltla6vxmpjfwfz7o3hapvkynh4zoq | Directory | /
bafybeicqlqnzd2tvs5vlo4c2dz72ryvouwmjwpu2mvxrocuj2u26joxeam | Directory | ↳ /Flibbertigibbet5
bafybeigutoywu5bj3hlcdr4mkm6yepqnwvq5xodulrz2wstwteko2266te | File      |   ↳ /Flibbertigibbet5/eorþscyld.pdf [0:4558477] (4,558,478 B)
bafkreidz265issniggrhdjbwp3c5o4fnmg7xsa6hbn3kmyo7bsafc3jjsy | RawLeaf   |     ↳ /Flibbertigibbet5/eorþscyld.pdf [0:256143] (256,144 B)
bafkreiepissrnjsgcanpe6hzen5kv66glcr5x5vw5vhferkjscxdj2uv3y | RawLeaf   |       /Flibbertigibbet5/eorþscyld.pdf [256144:512287] (256,144 B)
bafkreifohr4rlzjpskbdcntrjzolglq6e5uf7n4mgdiw7wl2yhovhx46ve | RawLeaf   |       /Flibbertigibbet5/eorþscyld.pdf [512288:768431] (256,144 B)
bafkreihiulihaonenbbtrbptmcmzcg2hvk6dypdxvmposz7ansd6h5mkla | RawLeaf   |       /Flibbertigibbet5/eorþscyld.pdf [768432:1024575] (256,144 B)
bafkreidbhmgdt3ajzgoeywwxdbdcquone7buyenwhirl6af2z3gmftiys4 | RawLeaf   |       /Flibbertigibbet5/eorþscyld.pdf [1024576:1280719] (256,144 B)
bafkreib6iawulrjvzet7dxbqdqneqa7kpy2kacvq7fawjvmlgveoakuzzy | RawLeaf   |       /Flibbertigibbet5/eorþscyld.pdf [1280720:1536863] (256,144 B)
bafkreicbbl7whtfqsoz6tu663qicdisdyvzp4pp4ylggcttc44j63bdhxy | RawLeaf   |       /Flibbertigibbet5/eorþscyld.pdf [1536864:1793007] (256,144 B)
bafkreifxe2irzoxtzk3ltpunioehodovu4pwzdtjr2lqtmkg7hyh3o5r2e | RawLeaf   |       /Flibbertigibbet5/eorþscyld.pdf [1793008:2049151] (256,144 B)
bafkreihr2m4zfx4qvpwkp2fnihn7gbjq6gyr2gv5nbibt2nuajnp2k6pvq | RawLeaf   |       /Flibbertigibbet5/eorþscyld.pdf [2049152:2305295] (256,144 B)
bafkreibhyumtv62kh3d4rvwpxkdlr52uur5thgmbtyuyxas3c424od7cta | RawLeaf   |       /Flibbertigibbet5/eorþscyld.pdf [2305296:2561439] (256,144 B)
bafkreiatyvemaol2uxceo4suktpmusl53dqgg5bcqi2rkfhlxnnvpigkci | RawLeaf   |       /Flibbertigibbet5/eorþscyld.pdf [2561440:2817583] (256,144 B)
bafkreias6ygzx2pnowi3hxj5kmed2rm74hgigwijiandz7vamvrohtkpje | RawLeaf   |       /Flibbertigibbet5/eorþscyld.pdf [2817584:3073727] (256,144 B)
bafkreihf5g2wmsblx67664w2k3m7hj2bg2wnpumlnty7ssw4gj46oj3bxa | RawLeaf   |       /Flibbertigibbet5/eorþscyld.pdf [3073728:3329871] (256,144 B)
bafkreib7gr6yi6lhl2p5izuxrxpknf5tc5lhkf5tdhzaxw5g66jxqichra | RawLeaf   |       /Flibbertigibbet5/eorþscyld.pdf [3329872:3586015] (256,144 B)
bafkreigmnnfehab7c4tblwqgydbaoc76y34rkjfetayb6ytql2eywqnq5y | RawLeaf   |       /Flibbertigibbet5/eorþscyld.pdf [3586016:3842159] (256,144 B)
bafkreiax5uhfktinmfo3ovm7geaf2266u5ya2slq4bob6eeginffbewszu | RawLeaf   |       /Flibbertigibbet5/eorþscyld.pdf [3842160:4098303] (256,144 B)
bafkreic5chuwrtofd6ymxawcaxulacfewzfi3zroakmkwjkfmadrxrmln4 | RawLeaf   |       /Flibbertigibbet5/eorþscyld.pdf [4098304:4354447] (256,144 B)
bafkreich7pcb4lnheypmqb4sikk5m6cuqqbxbjzuk767cx47djxac45o64 | RawLeaf   |       /Flibbertigibbet5/eorþscyld.pdf [4354448:4558477] (204,030 B)
```

#### entity

[testmark]:# (test/sharded_file_in_directory_in_directory/entity/query)
```
/ipfs/bafybeifrrglx2issn2had5rtstn3xltla6vxmpjfwfz7o3hapvkynh4zoq/Flibbertigibbet5/eorþscyld.pdf?dag-scope=entity
```

[testmark]:# (test/sharded_file_in_directory_in_directory/entity/execution)
```
bafybeifrrglx2issn2had5rtstn3xltla6vxmpjfwfz7o3hapvkynh4zoq | Directory | /
bafybeicqlqnzd2tvs5vlo4c2dz72ryvouwmjwpu2mvxrocuj2u26joxeam | Directory | ↳ /Flibbertigibbet5
bafybeigutoywu5bj3hlcdr4mkm6yepqnwvq5xodulrz2wstwteko2266te | File      |   ↳ /Flibbertigibbet5/eorþscyld.pdf [0:4558477] (4,558,478 B)
bafkreidz265issniggrhdjbwp3c5o4fnmg7xsa6hbn3kmyo7bsafc3jjsy | RawLeaf   |     ↳ /Flibbertigibbet5/eorþscyld.pdf [0:256143] (256,144 B)
bafkreiepissrnjsgcanpe6hzen5kv66glcr5x5vw5vhferkjscxdj2uv3y | RawLeaf   |       /Flibbertigibbet5/eorþscyld.pdf [256144:512287] (256,144 B)
bafkreifohr4rlzjpskbdcntrjzolglq6e5uf7n4mgdiw7wl2yhovhx46ve | RawLeaf   |       /Flibbertigibbet5/eorþscyld.pdf [512288:768431] (256,144 B)
bafkreihiulihaonenbbtrbptmcmzcg2hvk6dypdxvmposz7ansd6h5mkla | RawLeaf   |       /Flibbertigibbet5/eorþscyld.pdf [768432:1024575] (256,144 B)
bafkreidbhmgdt3ajzgoeywwxdbdcquone7buyenwhirl6af2z3gmftiys4 | RawLeaf   |       /Flibbertigibbet5/eorþscyld.pdf [1024576:1280719] (256,144 B)
bafkreib6iawulrjvzet7dxbqdqneqa7kpy2kacvq7fawjvmlgveoakuzzy | RawLeaf   |       /Flibbertigibbet5/eorþscyld.pdf [1280720:1536863] (256,144 B)
bafkreicbbl7whtfqsoz6tu663qicdisdyvzp4pp4ylggcttc44j63bdhxy | RawLeaf   |       /Flibbertigibbet5/eorþscyld.pdf [1536864:1793007] (256,144 B)
bafkreifxe2irzoxtzk3ltpunioehodovu4pwzdtjr2lqtmkg7hyh3o5r2e | RawLeaf   |       /Flibbertigibbet5/eorþscyld.pdf [1793008:2049151] (256,144 B)
bafkreihr2m4zfx4qvpwkp2fnihn7gbjq6gyr2gv5nbibt2nuajnp2k6pvq | RawLeaf   |       /Flibbertigibbet5/eorþscyld.pdf [2049152:2305295] (256,144 B)
bafkreibhyumtv62kh3d4rvwpxkdlr52uur5thgmbtyuyxas3c424od7cta | RawLeaf   |       /Flibbertigibbet5/eorþscyld.pdf [2305296:2561439] (256,144 B)
bafkreiatyvemaol2uxceo4suktpmusl53dqgg5bcqi2rkfhlxnnvpigkci | RawLeaf   |       /Flibbertigibbet5/eorþscyld.pdf [2561440:2817583] (256,144 B)
bafkreias6ygzx2pnowi3hxj5kmed2rm74hgigwijiandz7vamvrohtkpje | RawLeaf   |       /Flibbertigibbet5/eorþscyld.pdf [2817584:3073727] (256,144 B)
bafkreihf5g2wmsblx67664w2k3m7hj2bg2wnpumlnty7ssw4gj46oj3bxa | RawLeaf   |       /Flibbertigibbet5/eorþscyld.pdf [3073728:3329871] (256,144 B)
bafkreib7gr6yi6lhl2p5izuxrxpknf5tc5lhkf5tdhzaxw5g66jxqichra | RawLeaf   |       /Flibbertigibbet5/eorþscyld.pdf [3329872:3586015] (256,144 B)
bafkreigmnnfehab7c4tblwqgydbaoc76y34rkjfetayb6ytql2eywqnq5y | RawLeaf   |       /Flibbertigibbet5/eorþscyld.pdf [3586016:3842159] (256,144 B)
bafkreiax5uhfktinmfo3ovm7geaf2266u5ya2slq4bob6eeginffbewszu | RawLeaf   |       /Flibbertigibbet5/eorþscyld.pdf [3842160:4098303] (256,144 B)
bafkreic5chuwrtofd6ymxawcaxulacfewzfi3zroakmkwjkfmadrxrmln4 | RawLeaf   |       /Flibbertigibbet5/eorþscyld.pdf [4098304:4354447] (256,144 B)
bafkreich7pcb4lnheypmqb4sikk5m6cuqqbxbjzuk767cx47djxac45o64 | RawLeaf   |       /Flibbertigibbet5/eorþscyld.pdf [4354448:4558477] (204,030 B)
```

#### block

[testmark]:# (test/sharded_file_in_directory_in_directory/block/query)
```
/ipfs/bafybeifrrglx2issn2had5rtstn3xltla6vxmpjfwfz7o3hapvkynh4zoq/Flibbertigibbet5/eorþscyld.pdf?dag-scope=block
```

[testmark]:# (test/sharded_file_in_directory_in_directory/block/execution)
```
bafybeifrrglx2issn2had5rtstn3xltla6vxmpjfwfz7o3hapvkynh4zoq | Directory | /
bafybeicqlqnzd2tvs5vlo4c2dz72ryvouwmjwpu2mvxrocuj2u26joxeam | Directory | ↳ /Flibbertigibbet5
bafybeigutoywu5bj3hlcdr4mkm6yepqnwvq5xodulrz2wstwteko2266te | File      |   ↳ /Flibbertigibbet5/eorþscyld.pdf [0:4558477] (4,558,478 B)
```

### Sharded file in hamt in directory

Same as the previous case, but with the nested directory replaced by a multi-block directory. The execution should be equivalent, but with an additional block for the multi-block directory.

#### all

[testmark]:# (test/sharded_file_in_hamt_in_directory/all/query)
```
/ipfs/bafybeifrrglx2issn2had5rtstn3xltla6vxmpjfwfz7o3hapvkynh4zoq/O/Othello.png?dag-scope=all
```

[testmark]:# (test/sharded_file_in_hamt_in_directory/all/execution)
```
bafybeifrrglx2issn2had5rtstn3xltla6vxmpjfwfz7o3hapvkynh4zoq | Directory | /
bafybeiahh6giyfzxpsp6b4y6j6r34xjgsb2si7n6dszwoevnjxdcuee5yq | HAMTShard | ↳ /O
bafybeics7ohtet4wfuzszfchbttrgotqzpuruq4bencpdtc443vawbcbni | HAMTShard |   ↳ /O [A]
bafybeigqgljdsq72owvi3mtgjwkrfmmjpevzbya6pu52ufj55h5ypznpx4 | File      |     ↳ /O/Othello.png [0:2977730] (2,977,731 B)
bafkreibyblakon7atsv2hwzyzrweeb5uriksuscfxjtlzj3l56xmrouwke | RawLeaf   |       ↳ /O/Othello.png [0:256143] (256,144 B)
bafkreic7nx6e7zezkdz5lp2xcwarmgavr62cyrmtepyagvm2ivuo3jesqe | RawLeaf   |         /O/Othello.png [256144:512287] (256,144 B)
bafkreicylwcsi7ovreggex5yc7jolt5zrwf74ida3sprzsw37oxpzkwvte | RawLeaf   |         /O/Othello.png [512288:768431] (256,144 B)
bafkreiainpsn6gadltlhqzgakxvdbxrz5n2cstizn3afhsr2nwefus7pqm | RawLeaf   |         /O/Othello.png [768432:1024575] (256,144 B)
bafkreihuwjz4av7scz3fdjejtrx3k6ycdjudjusuz6sjzbbsewpgslosxi | RawLeaf   |         /O/Othello.png [1024576:1280719] (256,144 B)
bafkreiexmzld3vi72v665bbqn473mfc5smmtd6nnndl7dzcapzlxdwzhq4 | RawLeaf   |         /O/Othello.png [1280720:1536863] (256,144 B)
bafkreignp6prdhvi4mxoef5ybl4c644eyeikd42w3z2atw5mgbzw5p4374 | RawLeaf   |         /O/Othello.png [1536864:1793007] (256,144 B)
bafkreia6nxplcal74ycukjwfmwmaaraeg6qwclfvb6qja2iaayukzsedoa | RawLeaf   |         /O/Othello.png [1793008:2049151] (256,144 B)
bafkreiae6iay4fqiethqcvva4qazdxb7szb4dh77dsxiskvewhm5sepwfm | RawLeaf   |         /O/Othello.png [2049152:2305295] (256,144 B)
bafkreieprkc6i3qzg47k5y3zxejsoglyl5fwrk3fnslbmdmau7surwiocy | RawLeaf   |         /O/Othello.png [2305296:2561439] (256,144 B)
bafkreidwsenghahefqcfw5ikxd6osi6a35koyki4gibw3sunlmqrroqzc4 | RawLeaf   |         /O/Othello.png [2561440:2817583] (256,144 B)
bafkreicn24jr4rwjcptuzu677u2aeqyirf7weradcafcnkq5hzo7wickkq | RawLeaf   |         /O/Othello.png [2817584:2977730] (160,147 B)
```

#### entity

[testmark]:# (test/sharded_file_in_hamt_in_directory/entity/query)
```
/ipfs/bafybeifrrglx2issn2had5rtstn3xltla6vxmpjfwfz7o3hapvkynh4zoq/O/Othello.png?dag-scope=entity
```

[testmark]:# (test/sharded_file_in_hamt_in_directory/entity/execution)
```
bafybeifrrglx2issn2had5rtstn3xltla6vxmpjfwfz7o3hapvkynh4zoq | Directory | /
bafybeiahh6giyfzxpsp6b4y6j6r34xjgsb2si7n6dszwoevnjxdcuee5yq | HAMTShard | ↳ /O
bafybeics7ohtet4wfuzszfchbttrgotqzpuruq4bencpdtc443vawbcbni | HAMTShard |   ↳ /O [A]
bafybeigqgljdsq72owvi3mtgjwkrfmmjpevzbya6pu52ufj55h5ypznpx4 | File      |     ↳ /O/Othello.png [0:2977730] (2,977,731 B)
bafkreibyblakon7atsv2hwzyzrweeb5uriksuscfxjtlzj3l56xmrouwke | RawLeaf   |       ↳ /O/Othello.png [0:256143] (256,144 B)
bafkreic7nx6e7zezkdz5lp2xcwarmgavr62cyrmtepyagvm2ivuo3jesqe | RawLeaf   |         /O/Othello.png [256144:512287] (256,144 B)
bafkreicylwcsi7ovreggex5yc7jolt5zrwf74ida3sprzsw37oxpzkwvte | RawLeaf   |         /O/Othello.png [512288:768431] (256,144 B)
bafkreiainpsn6gadltlhqzgakxvdbxrz5n2cstizn3afhsr2nwefus7pqm | RawLeaf   |         /O/Othello.png [768432:1024575] (256,144 B)
bafkreihuwjz4av7scz3fdjejtrx3k6ycdjudjusuz6sjzbbsewpgslosxi | RawLeaf   |         /O/Othello.png [1024576:1280719] (256,144 B)
bafkreiexmzld3vi72v665bbqn473mfc5smmtd6nnndl7dzcapzlxdwzhq4 | RawLeaf   |         /O/Othello.png [1280720:1536863] (256,144 B)
bafkreignp6prdhvi4mxoef5ybl4c644eyeikd42w3z2atw5mgbzw5p4374 | RawLeaf   |         /O/Othello.png [1536864:1793007] (256,144 B)
bafkreia6nxplcal74ycukjwfmwmaaraeg6qwclfvb6qja2iaayukzsedoa | RawLeaf   |         /O/Othello.png [1793008:2049151] (256,144 B)
bafkreiae6iay4fqiethqcvva4qazdxb7szb4dh77dsxiskvewhm5sepwfm | RawLeaf   |         /O/Othello.png [2049152:2305295] (256,144 B)
bafkreieprkc6i3qzg47k5y3zxejsoglyl5fwrk3fnslbmdmau7surwiocy | RawLeaf   |         /O/Othello.png [2305296:2561439] (256,144 B)
bafkreidwsenghahefqcfw5ikxd6osi6a35koyki4gibw3sunlmqrroqzc4 | RawLeaf   |         /O/Othello.png [2561440:2817583] (256,144 B)
bafkreicn24jr4rwjcptuzu677u2aeqyirf7weradcafcnkq5hzo7wickkq | RawLeaf   |         /O/Othello.png [2817584:2977730] (160,147 B)
```

#### block

[testmark]:# (test/sharded_file_in_hamt_in_directory/block/query)
```
/ipfs/bafybeifrrglx2issn2had5rtstn3xltla6vxmpjfwfz7o3hapvkynh4zoq/O/Othello.png?dag-scope=block
```

[testmark]:# (test/sharded_file_in_hamt_in_directory/block/execution)
```
bafybeifrrglx2issn2had5rtstn3xltla6vxmpjfwfz7o3hapvkynh4zoq | Directory | /
bafybeiahh6giyfzxpsp6b4y6j6r34xjgsb2si7n6dszwoevnjxdcuee5yq | HAMTShard | ↳ /O
bafybeics7ohtet4wfuzszfchbttrgotqzpuruq4bencpdtc443vawbcbni | HAMTShard |   ↳ /O [A]
bafybeigqgljdsq72owvi3mtgjwkrfmmjpevzbya6pu52ufj55h5ypznpx4 | File      |     ↳ /O/Othello.png [0:2977730] (2,977,731 B)
```

### Sharded file in directory in hamt in directory

Same as the previous case but with an additional single-block directory inside the multi-block directory.

#### all

[testmark]:# (test/sharded_file_in_directory_in_hamt_in_directory/all/query)
```
/ipfs/bafybeifrrglx2issn2had5rtstn3xltla6vxmpjfwfz7o3hapvkynh4zoq/Zigzagumptious/Throttlebottom/supercalifragilisticexpialidocious.txt?dag-scope=all
```

[testmark]:# (test/sharded_file_in_directory_in_hamt_in_directory/all/execution)
```
bafybeifrrglx2issn2had5rtstn3xltla6vxmpjfwfz7o3hapvkynh4zoq | Directory | /
bafybeie3mbyp7k77vrpiduaifyhdeqvusjn7qofzwtsp47yavyyb62z32y | HAMTShard | ↳ /Zigzagumptious
bafybeied5si546vcp6klpngu77kftitzffdlxk5ajaytadc3p3ptr7tvam | HAMTShard |   ↳ /Zigzagumptious [9]
bafybeifjkcls323ddq3t5ov22yl7i6ks36a7jzv33pjy4stqkils6jzvqe | Directory |     ↳ /Zigzagumptious/Throttlebottom
bafybeify427noacqiu6sxaaunk5uw2xhelnkcwktkvh6woi6ahlipsz7em | File      |       ↳ /Zigzagumptious/Throttlebottom/supercalifragilisticexpialidocious.txt [0:568520] (568,521 B)
bafkreicdwgfhxwnzq7i34cuhnqqqxz6d6jtirupjy5kq3uaphopyw5e2ky | RawLeaf   |         ↳ /Zigzagumptious/Throttlebottom/supercalifragilisticexpialidocious.txt [0:256143] (256,144 B)
bafkreifmk6qfl6ucap7btfu35rjd37bh7uuefavq6nsuungxjl3or7bz2e | RawLeaf   |           /Zigzagumptious/Throttlebottom/supercalifragilisticexpialidocious.txt [256144:512287] (256,144 B)
bafkreifk2vcldftxe57ml2cxyfcwb34ukkhaopm46kv3as5vo26ht63fci | RawLeaf   |           /Zigzagumptious/Throttlebottom/supercalifragilisticexpialidocious.txt [512288:568520] (56,233 B)
```

#### entity

[testmark]:# (test/sharded_file_in_directory_in_hamt_in_directory/entity/query)
```
/ipfs/bafybeifrrglx2issn2had5rtstn3xltla6vxmpjfwfz7o3hapvkynh4zoq/Zigzagumptious/Throttlebottom?dag-scope=entity
```

[testmark]:# (test/sharded_file_in_directory_in_hamt_in_directory/entity/execution)
```
bafybeifrrglx2issn2had5rtstn3xltla6vxmpjfwfz7o3hapvkynh4zoq | Directory | /
bafybeie3mbyp7k77vrpiduaifyhdeqvusjn7qofzwtsp47yavyyb62z32y | HAMTShard | ↳ /Zigzagumptious
bafybeied5si546vcp6klpngu77kftitzffdlxk5ajaytadc3p3ptr7tvam | HAMTShard |   ↳ /Zigzagumptious [9]
bafybeifjkcls323ddq3t5ov22yl7i6ks36a7jzv33pjy4stqkils6jzvqe | Directory |     ↳ /Zigzagumptious/Throttlebottom
```

#### block

[testmark]:# (test/sharded_file_in_directory_in_hamt_in_directory/block/query)
```
/ipfs/bafybeifrrglx2issn2had5rtstn3xltla6vxmpjfwfz7o3hapvkynh4zoq/Zigzagumptious/Throttlebottom?dag-scope=block
```

[testmark]:# (test/sharded_file_in_directory_in_hamt_in_directory/block/execution)
```
bafybeifrrglx2issn2had5rtstn3xltla6vxmpjfwfz7o3hapvkynh4zoq | Directory | /
bafybeie3mbyp7k77vrpiduaifyhdeqvusjn7qofzwtsp47yavyyb62z32y | HAMTShard | ↳ /Zigzagumptious
bafybeied5si546vcp6klpngu77kftitzffdlxk5ajaytadc3p3ptr7tvam | HAMTShard |   ↳ /Zigzagumptious [9]
bafybeifjkcls323ddq3t5ov22yl7i6ks36a7jzv33pjy4stqkils6jzvqe | Directory |     ↳ /Zigzagumptious/Throttlebottom
```

### Small file in a directory in a hamt in a directory

Same as "Small file in a directory in directory in directory" but with a multi-block directory in the middle that requires two blocks to represent the path through it.

#### all

[testmark]:# (test/small_file_in_directory_in_hamt_in_directory/all/query)
```
/ipfs/bafybeifrrglx2issn2had5rtstn3xltla6vxmpjfwfz7o3hapvkynh4zoq/Zigzagumptious/fyrd/Cordelia.docx?dag-scope=all
```

[testmark]:# (test/small_file_in_directory_in_hamt_in_directory/all/execution)
```
bafybeifrrglx2issn2had5rtstn3xltla6vxmpjfwfz7o3hapvkynh4zoq | Directory | /
bafybeie3mbyp7k77vrpiduaifyhdeqvusjn7qofzwtsp47yavyyb62z32y | HAMTShard | ↳ /Zigzagumptious
bafybeiggzqpxmfbve7sutrmcwrlwpx4tkno536d7qdgd6hnhxf74t7gzee | HAMTShard |   ↳ /Zigzagumptious [0]
bafybeigfwz54atwgnklb72rfqqn2a3ywoontgf3b3kekxwoxalptx7gc3e | HAMTShard |     ↳ /Zigzagumptious [0]
bafybeid25clhrmlypqcsl4ehgxczbidzu2sqvrtuoeckh32hmzz7qisk6m | Directory |       ↳ /Zigzagumptious/fyrd
bafkreigtatgpa6dpkm2vxaeglfz4t3j2kkcan6jjxdf4ytwehspjbpxe54 | RawLeaf   |         ↳ /Zigzagumptious/fyrd/Cordelia.docx [0:329] (330 B)
```

#### entity

[testmark]:# (test/small_file_in_directory_in_hamt_in_directory/entity/query)
```
/ipfs/bafybeifrrglx2issn2had5rtstn3xltla6vxmpjfwfz7o3hapvkynh4zoq/Zigzagumptious/fyrd/Cordelia.docx?dag-scope=entity
```

[testmark]:# (test/small_file_in_directory_in_hamt_in_directory/entity/execution)
```
bafybeifrrglx2issn2had5rtstn3xltla6vxmpjfwfz7o3hapvkynh4zoq | Directory | /
bafybeie3mbyp7k77vrpiduaifyhdeqvusjn7qofzwtsp47yavyyb62z32y | HAMTShard | ↳ /Zigzagumptious
bafybeiggzqpxmfbve7sutrmcwrlwpx4tkno536d7qdgd6hnhxf74t7gzee | HAMTShard |   ↳ /Zigzagumptious [0]
bafybeigfwz54atwgnklb72rfqqn2a3ywoontgf3b3kekxwoxalptx7gc3e | HAMTShard |     ↳ /Zigzagumptious [0]
bafybeid25clhrmlypqcsl4ehgxczbidzu2sqvrtuoeckh32hmzz7qisk6m | Directory |       ↳ /Zigzagumptious/fyrd
bafkreigtatgpa6dpkm2vxaeglfz4t3j2kkcan6jjxdf4ytwehspjbpxe54 | RawLeaf   |         ↳ /Zigzagumptious/fyrd/Cordelia.docx [0:329] (330 B)
```

#### block

[testmark]:# (test/small_file_in_directory_in_hamt_in_directory/block/query)
```
/ipfs/bafybeifrrglx2issn2had5rtstn3xltla6vxmpjfwfz7o3hapvkynh4zoq/Zigzagumptious/fyrd/Cordelia.docx?dag-scope=block
```

[testmark]:# (test/small_file_in_directory_in_hamt_in_directory/block/execution)
```
bafybeifrrglx2issn2had5rtstn3xltla6vxmpjfwfz7o3hapvkynh4zoq | Directory | /
bafybeie3mbyp7k77vrpiduaifyhdeqvusjn7qofzwtsp47yavyyb62z32y | HAMTShard | ↳ /Zigzagumptious
bafybeiggzqpxmfbve7sutrmcwrlwpx4tkno536d7qdgd6hnhxf74t7gzee | HAMTShard |   ↳ /Zigzagumptious [0]
bafybeigfwz54atwgnklb72rfqqn2a3ywoontgf3b3kekxwoxalptx7gc3e | HAMTShard |     ↳ /Zigzagumptious [0]
bafybeid25clhrmlypqcsl4ehgxczbidzu2sqvrtuoeckh32hmzz7qisk6m | Directory |       ↳ /Zigzagumptious/fyrd
bafkreigtatgpa6dpkm2vxaeglfz4t3j2kkcan6jjxdf4ytwehspjbpxe54 | RawLeaf   |         ↳ /Zigzagumptious/fyrd/Cordelia.docx [0:329] (330 B)
```

### Hamt in directory

A multi-block directory in the root of the UnixFS DAG as the target. The `all` scope is too large to be useful, so we just exercise `entity` and `block`.

#### entity

[testmark]:# (test/hamt_in_directory/entity/query)
```
/ipfs/bafybeifrrglx2issn2had5rtstn3xltla6vxmpjfwfz7o3hapvkynh4zoq/Zigzagumptious?dag-scope=entity
```

[testmark]:# (test/hamt_in_directory/entity/execution)
```
bafybeifrrglx2issn2had5rtstn3xltla6vxmpjfwfz7o3hapvkynh4zoq | Directory | /
bafybeie3mbyp7k77vrpiduaifyhdeqvusjn7qofzwtsp47yavyyb62z32y | HAMTShard | ↳ /Zigzagumptious
bafybeiggzqpxmfbve7sutrmcwrlwpx4tkno536d7qdgd6hnhxf74t7gzee | HAMTShard |   ↳ /Zigzagumptious [0]
bafybeigfwz54atwgnklb72rfqqn2a3ywoontgf3b3kekxwoxalptx7gc3e | HAMTShard |     ↳ /Zigzagumptious [0]
bafybeifr3w3eyq2oi6hxwbfoblor7s5pfvu3m4xyyzovxlk4g5xgslsqui | HAMTShard |     /Zigzagumptious [1]
bafybeigivdbrxmcixaqfap3rrs7ti5ycr7vj4xfbkjougq67k7ac5oz55a | HAMTShard |     /Zigzagumptious [2]
bafybeid3cny2p7fwt4znzm3wjncsesdk2rdze5fm5rzxjpbethy4657j6m | HAMTShard |     /Zigzagumptious [4]
bafybeidivwpxv37o6p4ton3xcpmg64pwk4zqlkuge7isafgsgjsvb6ce2u | HAMTShard |     /Zigzagumptious [6]
bafybeib5ptplpmtmoyif4lxt5erw5diivp6so4s57lvgfigs53d7zpc4uu | HAMTShard |     /Zigzagumptious [7]
bafybeiafmairlfkvgqgticndcs4uomkll4h5xotvnnsw2j7cx3rjwrbh7i | HAMTShard |     ↳ /Zigzagumptious [F]
bafybeifjo6xz3onvav6cnpjjuroa7vbzegoxgg5jn6smfvgfcpzwzdaipa | HAMTShard |     /Zigzagumptious [8]
bafybeied5si546vcp6klpngu77kftitzffdlxk5ajaytadc3p3ptr7tvam | HAMTShard |     /Zigzagumptious [9]
bafybeiar4b5hfriv2pmmbj7npemto6bev7sqkn4jpstwqtaudexpetpg4m | HAMTShard |     /Zigzagumptious [A]
bafybeifcekpohkm7qaczfwrrzcdz6j3ykwntawdnp7b7fjfech75vxpwf4 | HAMTShard |     ↳ /Zigzagumptious [B]
bafybeihnejxifhvlunhcswhghhrbues366h7o4xqp3ziyeicrdt5473za4 | HAMTShard |     /Zigzagumptious [C]
bafybeihlijmc2xyfmomw4fx53mlz3gpt6svgfu3vfokm4wmyd4dagfup24 | HAMTShard |     /Zigzagumptious [D]
bafybeihjbh7kptdfaoanrkzhdpx2jwjacg5ncdlcbbwqlum6vwqfga5fii | HAMTShard |     /Zigzagumptious [E]
bafybeidaz5aob6tdurpnuj2xeqsjkarqudtono6x2kgbzrzv46ugp3g4ju | HAMTShard |     /Zigzagumptious [F]
```

#### block

[testmark]:# (test/hamt_in_directory/block/query)
```
/ipfs/bafybeifrrglx2issn2had5rtstn3xltla6vxmpjfwfz7o3hapvkynh4zoq/Zigzagumptious?dag-scope=block
```

[testmark]:# (test/hamt_in_directory/block/execution)
```
bafybeifrrglx2issn2had5rtstn3xltla6vxmpjfwfz7o3hapvkynh4zoq | Directory | /
bafybeie3mbyp7k77vrpiduaifyhdeqvusjn7qofzwtsp47yavyyb62z32y | HAMTShard | ↳ /Zigzagumptious
```

### Directory in a directory

A single-block directory in the root of the UnixFS DAG as the target. `all` should produce all files within the directory and both `entity` and `block` should be the same.

#### all

[testmark]:# (test/directory_in_directory/all/query)
```
/ipfs/bafybeifrrglx2issn2had5rtstn3xltla6vxmpjfwfz7o3hapvkynh4zoq/by/procrastinatorily?dag-scope=all
```

[testmark]:# (test/directory_in_directory/all/execution)
```
bafybeifrrglx2issn2had5rtstn3xltla6vxmpjfwfz7o3hapvkynh4zoq | Directory | /
bafybeigdgcs3nulbgu6vtnyesfgsaau2grbxzbxxdtpgolsfhtrpjx6mw4 | Directory | ↳ /by
bafybeicsa4ltuq6m3sxzzrkfy6wetemiqvbdgnitkjwlcduswh3cvsccxy | Directory |   ↳ /by/procrastinatorily
bafkreiaquanb6uzch2bkv7iltvwipmawjfihb7jgejqww63vgbqshderxq | RawLeaf   |     ↳ /by/procrastinatorily/F [0:727] (728 B)
bafkreigtze43gghvasxpp3o6mklllhilbyzs63kzdtdlzpyaznk44vxnye | RawLeaf   |       /by/procrastinatorily/Gallivant.png [0:1339] (1,340 B)
bafkreifrkcg75acl2yu4jv65x5u7yzn2cnpezmx432p2v2lryzhwqyp63u | RawLeaf   |       /by/procrastinatorily/Oberon.xml [0:512] (513 B)
bafkreiac4vqpljai2qjxx7mgs2equqcs4oq6lmmie2oiqhrkmwukuez3cm | RawLeaf   |       /by/procrastinatorily/Pandemonium [0:917] (918 B)
bafkreiclovx7khthefexgfku4n7pndbqthj5xuiv6ymbd3cx2bve3qebby | RawLeaf   |       /by/procrastinatorily/gūþweard.docx [0:580] (581 B)
bafkreiaqchjvbofqnpwoxwrtcvelnz5neg4y5buqchwgnxwoigjofmnol4 | RawLeaf   |       /by/procrastinatorily/juxtapositionally.png [0:2426] (2,427 B)
bafkreif3y7x7uailqhjjuketaa2p34gidoj7ynmnmviejtynydov75dkbq | RawLeaf   |       /by/procrastinatorily/sǣlācend [0:430] (431 B)
bafkreias4xj2qbg36tyo4wirl2db2x2emh4lbfpwq7t3dexjos236a5wgu | RawLeaf   |       /by/procrastinatorily/t.png [0:57] (58 B)
bafkreidzryf2cxeo5bfkxulhxlgr6axh5qfrsh4ns6jwfd2yutzpkcoaxu | RawLeaf   |       /by/procrastinatorily/ya.xml [0:417] (418 B)
bafkreihys4i2ow3csfrhefnmwruwte2bv5ik223ocgbvq3ckwj7xdxzc2m | RawLeaf   |       /by/procrastinatorily/ætheling.docx [0:81] (82 B)
```

#### entity

[testmark]:# (test/directory_in_directory/entity/query)
```
/ipfs/bafybeifrrglx2issn2had5rtstn3xltla6vxmpjfwfz7o3hapvkynh4zoq/by/procrastinatorily?dag-scope=entity
```

[testmark]:# (test/directory_in_directory/entity/execution)
```
bafybeifrrglx2issn2had5rtstn3xltla6vxmpjfwfz7o3hapvkynh4zoq | Directory | /
bafybeigdgcs3nulbgu6vtnyesfgsaau2grbxzbxxdtpgolsfhtrpjx6mw4 | Directory | ↳ /by
bafybeicsa4ltuq6m3sxzzrkfy6wetemiqvbdgnitkjwlcduswh3cvsccxy | Directory |   ↳ /by/procrastinatorily
```

#### block

[testmark]:# (test/directory_in_directory/block/query)
```
/ipfs/bafybeifrrglx2issn2had5rtstn3xltla6vxmpjfwfz7o3hapvkynh4zoq/by/procrastinatorily?dag-scope=block
```

[testmark]:# (test/directory_in_directory/block/execution)
```
bafybeifrrglx2issn2had5rtstn3xltla6vxmpjfwfz7o3hapvkynh4zoq | Directory | /
bafybeigdgcs3nulbgu6vtnyesfgsaau2grbxzbxxdtpgolsfhtrpjx6mw4 | Directory | ↳ /by
bafybeicsa4ltuq6m3sxzzrkfy6wetemiqvbdgnitkjwlcduswh3cvsccxy | Directory |   ↳ /by/procrastinatorily
```

### Sharded file in directory, byte ranges

A multi-block file in the root of the UnixFS DAG as the target, using byte range (`entity-bytes`) queries to select specific blocks.

#### 0:*

All blocks of the file.

[testmark]:# (test/sharded_file_in_directory_byte_ranges/0:*/query)
```
/ipfs/bafybeifrrglx2issn2had5rtstn3xltla6vxmpjfwfz7o3hapvkynh4zoq/clippet.txt?dag-scope=entity&entity-bytes=0:*
```

[testmark]:# (test/sharded_file_in_directory_byte_ranges/0:*/execution)
```
bafybeifrrglx2issn2had5rtstn3xltla6vxmpjfwfz7o3hapvkynh4zoq | Directory | /
bafybeiawxstujkmnv2doejkzfydtotgqreycncd7ro4ixxddeoahofwjkm | File      | ↳ /clippet.txt [0:1889755] (1,889,756 B)
bafkreib56a35cuh7mavlzlradaysqqpqx6lr2sn3veahyb2yb3y7dq5aei | RawLeaf   |   ↳ /clippet.txt [0:256143] (256,144 B)
bafkreicjp7lobawh3bob4gjq63fmsz44sbsayf2xkwhf3jhme25y2tyzky | RawLeaf   |     /clippet.txt [256144:512287] (256,144 B)
bafkreigcn244ayqteak6lignqrxdomc456362t4uysw624ccy7yk3ysfey | RawLeaf   |     /clippet.txt [512288:768431] (256,144 B)
bafkreihbp4ur2mdgfqntlyvew7njve5pdjgtphr74ipmbebu7fofcn4fh4 | RawLeaf   |     /clippet.txt [768432:1024575] (256,144 B)
bafkreibggbasrddspulesc5zum23cx3fqdknvzi6dttlrjsiga7qanakdu | RawLeaf   |     /clippet.txt [1024576:1280719] (256,144 B)
bafkreibzp426cl6b3udplywqrmfpdm6witikihya6n5rfh724lwnn53oe4 | RawLeaf   |     /clippet.txt [1280720:1536863] (256,144 B)
bafkreic47cecyo4ko65fdmpfhaonqz2kk73sd6zacnvsdjofee62u7d3oe | RawLeaf   |     /clippet.txt [1536864:1793007] (256,144 B)
bafkreif6cdswphju3fd5onyiuoswxpstlskdydqh4s3rvgwvdjmx7zhpcq | RawLeaf   |     /clippet.txt [1793008:1889755] (96,748 B)
```

#### 0:10

Only needs first block.

[testmark]:# (test/sharded_file_in_directory_byte_ranges/0:10/query)
```
/ipfs/bafybeifrrglx2issn2had5rtstn3xltla6vxmpjfwfz7o3hapvkynh4zoq/clippet.txt?dag-scope=entity&entity-bytes=0:10
```

[testmark]:# (test/sharded_file_in_directory_byte_ranges/0:10/execution)
```
bafybeifrrglx2issn2had5rtstn3xltla6vxmpjfwfz7o3hapvkynh4zoq | Directory | /
bafybeiawxstujkmnv2doejkzfydtotgqreycncd7ro4ixxddeoahofwjkm | File      | ↳ /clippet.txt [0:1889755] (1,889,756 B)
bafkreib56a35cuh7mavlzlradaysqqpqx6lr2sn3veahyb2yb3y7dq5aei | RawLeaf   |   ↳ /clippet.txt [0:256143] (256,144 B)
```

#### 0:256143 first block only

Matches full byte range of first block only.

[testmark]:# (test/sharded_file_in_directory_byte_ranges/0:256143/query)
```
/ipfs/bafybeifrrglx2issn2had5rtstn3xltla6vxmpjfwfz7o3hapvkynh4zoq/clippet.txt?dag-scope=entity&entity-bytes=0:256143
```

[testmark]:# (test/sharded_file_in_directory_byte_ranges/0:256143/execution)
```
bafybeifrrglx2issn2had5rtstn3xltla6vxmpjfwfz7o3hapvkynh4zoq | Directory | /
bafybeiawxstujkmnv2doejkzfydtotgqreycncd7ro4ixxddeoahofwjkm | File      | ↳ /clippet.txt [0:1889755] (1,889,756 B)
bafkreib56a35cuh7mavlzlradaysqqpqx6lr2sn3veahyb2yb3y7dq5aei | RawLeaf   |   ↳ /clippet.txt [0:256143] (256,144 B)
```


#### 0:256144 second block boundary

Needs the first byte of the second block, so matches first two blocks.

[testmark]:# (test/sharded_file_in_directory_byte_ranges/0:256144/query)
```
/ipfs/bafybeifrrglx2issn2had5rtstn3xltla6vxmpjfwfz7o3hapvkynh4zoq/clippet.txt?dag-scope=entity&entity-bytes=0:256144
```

[testmark]:# (test/sharded_file_in_directory_byte_ranges/0:256144/execution)
```
bafybeifrrglx2issn2had5rtstn3xltla6vxmpjfwfz7o3hapvkynh4zoq | Directory | /
bafybeiawxstujkmnv2doejkzfydtotgqreycncd7ro4ixxddeoahofwjkm | File      | ↳ /clippet.txt [0:1889755] (1,889,756 B)
bafkreib56a35cuh7mavlzlradaysqqpqx6lr2sn3veahyb2yb3y7dq5aei | RawLeaf   |   ↳ /clippet.txt [0:256143] (256,144 B)
bafkreicjp7lobawh3bob4gjq63fmsz44sbsayf2xkwhf3jhme25y2tyzky | RawLeaf   |     /clippet.txt [256144:512287] (256,144 B)
```

#### 0:1793007 second last block

Needs all but the last block to match.

[testmark]:# (test/sharded_file_in_directory_byte_ranges/0:1793007/query)
```
/ipfs/bafybeifrrglx2issn2had5rtstn3xltla6vxmpjfwfz7o3hapvkynh4zoq/clippet.txt?dag-scope=entity&entity-bytes=0:1793007
```

[testmark]:# (test/sharded_file_in_directory_byte_ranges/0:1793007/execution)
```
bafybeifrrglx2issn2had5rtstn3xltla6vxmpjfwfz7o3hapvkynh4zoq | Directory | /
bafybeiawxstujkmnv2doejkzfydtotgqreycncd7ro4ixxddeoahofwjkm | File      | ↳ /clippet.txt [0:1889755] (1,889,756 B)
bafkreib56a35cuh7mavlzlradaysqqpqx6lr2sn3veahyb2yb3y7dq5aei | RawLeaf   |   ↳ /clippet.txt [0:256143] (256,144 B)
bafkreicjp7lobawh3bob4gjq63fmsz44sbsayf2xkwhf3jhme25y2tyzky | RawLeaf   |     /clippet.txt [256144:512287] (256,144 B)
bafkreigcn244ayqteak6lignqrxdomc456362t4uysw624ccy7yk3ysfey | RawLeaf   |     /clippet.txt [512288:768431] (256,144 B)
bafkreihbp4ur2mdgfqntlyvew7njve5pdjgtphr74ipmbebu7fofcn4fh4 | RawLeaf   |     /clippet.txt [768432:1024575] (256,144 B)
bafkreibggbasrddspulesc5zum23cx3fqdknvzi6dttlrjsiga7qanakdu | RawLeaf   |     /clippet.txt [1024576:1280719] (256,144 B)
bafkreibzp426cl6b3udplywqrmfpdm6witikihya6n5rfh724lwnn53oe4 | RawLeaf   |     /clippet.txt [1280720:1536863] (256,144 B)
bafkreic47cecyo4ko65fdmpfhaonqz2kk73sd6zacnvsdjofee62u7d3oe | RawLeaf   |     /clippet.txt [1536864:1793007] (256,144 B)
```

#### 0:1793008 last block boundary

Should match all blocks because it includes the first byte of the last block.

[testmark]:# (test/sharded_file_in_directory_byte_ranges/0:1793008/query)
```
/ipfs/bafybeifrrglx2issn2had5rtstn3xltla6vxmpjfwfz7o3hapvkynh4zoq/clippet.txt?dag-scope=entity&entity-bytes=0:1793008
```

[testmark]:# (test/sharded_file_in_directory_byte_ranges/0:1793008/execution)
```
bafybeifrrglx2issn2had5rtstn3xltla6vxmpjfwfz7o3hapvkynh4zoq | Directory | /
bafybeiawxstujkmnv2doejkzfydtotgqreycncd7ro4ixxddeoahofwjkm | File      | ↳ /clippet.txt [0:1889755] (1,889,756 B)
bafkreib56a35cuh7mavlzlradaysqqpqx6lr2sn3veahyb2yb3y7dq5aei | RawLeaf   |   ↳ /clippet.txt [0:256143] (256,144 B)
bafkreicjp7lobawh3bob4gjq63fmsz44sbsayf2xkwhf3jhme25y2tyzky | RawLeaf   |     /clippet.txt [256144:512287] (256,144 B)
bafkreigcn244ayqteak6lignqrxdomc456362t4uysw624ccy7yk3ysfey | RawLeaf   |     /clippet.txt [512288:768431] (256,144 B)
bafkreihbp4ur2mdgfqntlyvew7njve5pdjgtphr74ipmbebu7fofcn4fh4 | RawLeaf   |     /clippet.txt [768432:1024575] (256,144 B)
bafkreibggbasrddspulesc5zum23cx3fqdknvzi6dttlrjsiga7qanakdu | RawLeaf   |     /clippet.txt [1024576:1280719] (256,144 B)
bafkreibzp426cl6b3udplywqrmfpdm6witikihya6n5rfh724lwnn53oe4 | RawLeaf   |     /clippet.txt [1280720:1536863] (256,144 B)
bafkreic47cecyo4ko65fdmpfhaonqz2kk73sd6zacnvsdjofee62u7d3oe | RawLeaf   |     /clippet.txt [1536864:1793007] (256,144 B)
bafkreif6cdswphju3fd5onyiuoswxpstlskdydqh4s3rvgwvdjmx7zhpcq | RawLeaf   |     /clippet.txt [1793008:1889755] (96,748 B)
```

#### 0:1889755 full file

Precise byte boundaries start:finish.

[testmark]:# (test/sharded_file_in_directory_byte_ranges/0:1889755/query)
```
/ipfs/bafybeifrrglx2issn2had5rtstn3xltla6vxmpjfwfz7o3hapvkynh4zoq/clippet.txt?dag-scope=entity&entity-bytes=0:1889755
```

[testmark]:# (test/sharded_file_in_directory_byte_ranges/0:1889755/execution)
```
bafybeifrrglx2issn2had5rtstn3xltla6vxmpjfwfz7o3hapvkynh4zoq | Directory | /
bafybeiawxstujkmnv2doejkzfydtotgqreycncd7ro4ixxddeoahofwjkm | File      | ↳ /clippet.txt [0:1889755] (1,889,756 B)
bafkreib56a35cuh7mavlzlradaysqqpqx6lr2sn3veahyb2yb3y7dq5aei | RawLeaf   |   ↳ /clippet.txt [0:256143] (256,144 B)
bafkreicjp7lobawh3bob4gjq63fmsz44sbsayf2xkwhf3jhme25y2tyzky | RawLeaf   |     /clippet.txt [256144:512287] (256,144 B)
bafkreigcn244ayqteak6lignqrxdomc456362t4uysw624ccy7yk3ysfey | RawLeaf   |     /clippet.txt [512288:768431] (256,144 B)
bafkreihbp4ur2mdgfqntlyvew7njve5pdjgtphr74ipmbebu7fofcn4fh4 | RawLeaf   |     /clippet.txt [768432:1024575] (256,144 B)
bafkreibggbasrddspulesc5zum23cx3fqdknvzi6dttlrjsiga7qanakdu | RawLeaf   |     /clippet.txt [1024576:1280719] (256,144 B)
bafkreibzp426cl6b3udplywqrmfpdm6witikihya6n5rfh724lwnn53oe4 | RawLeaf   |     /clippet.txt [1280720:1536863] (256,144 B)
bafkreic47cecyo4ko65fdmpfhaonqz2kk73sd6zacnvsdjofee62u7d3oe | RawLeaf   |     /clippet.txt [1536864:1793007] (256,144 B)
bafkreif6cdswphju3fd5onyiuoswxpstlskdydqh4s3rvgwvdjmx7zhpcq | RawLeaf   |     /clippet.txt [1793008:1889755] (96,748 B)
```

#### 0:1889756 full file +1

Beyond the end of the file, so should be the same as 0:1889755.

[testmark]:# (test/sharded_file_in_directory_byte_ranges/0:1889756/query)
```
/ipfs/bafybeifrrglx2issn2had5rtstn3xltla6vxmpjfwfz7o3hapvkynh4zoq/clippet.txt?dag-scope=entity&entity-bytes=0:1889756
```

[testmark]:# (test/sharded_file_in_directory_byte_ranges/0:1889756/execution)
```
bafybeifrrglx2issn2had5rtstn3xltla6vxmpjfwfz7o3hapvkynh4zoq | Directory | /
bafybeiawxstujkmnv2doejkzfydtotgqreycncd7ro4ixxddeoahofwjkm | File      | ↳ /clippet.txt [0:1889755] (1,889,756 B)
bafkreib56a35cuh7mavlzlradaysqqpqx6lr2sn3veahyb2yb3y7dq5aei | RawLeaf   |   ↳ /clippet.txt [0:256143] (256,144 B)
bafkreicjp7lobawh3bob4gjq63fmsz44sbsayf2xkwhf3jhme25y2tyzky | RawLeaf   |     /clippet.txt [256144:512287] (256,144 B)
bafkreigcn244ayqteak6lignqrxdomc456362t4uysw624ccy7yk3ysfey | RawLeaf   |     /clippet.txt [512288:768431] (256,144 B)
bafkreihbp4ur2mdgfqntlyvew7njve5pdjgtphr74ipmbebu7fofcn4fh4 | RawLeaf   |     /clippet.txt [768432:1024575] (256,144 B)
bafkreibggbasrddspulesc5zum23cx3fqdknvzi6dttlrjsiga7qanakdu | RawLeaf   |     /clippet.txt [1024576:1280719] (256,144 B)
bafkreibzp426cl6b3udplywqrmfpdm6witikihya6n5rfh724lwnn53oe4 | RawLeaf   |     /clippet.txt [1280720:1536863] (256,144 B)
bafkreic47cecyo4ko65fdmpfhaonqz2kk73sd6zacnvsdjofee62u7d3oe | RawLeaf   |     /clippet.txt [1536864:1793007] (256,144 B)
bafkreif6cdswphju3fd5onyiuoswxpstlskdydqh4s3rvgwvdjmx7zhpcq | RawLeaf   |     /clippet.txt [1793008:1889755] (96,748 B)
```

#### 0:99999999

Beyond last byte, should match all blocks.

[testmark]:# (test/sharded_file_in_directory_byte_ranges/0:99999999/query)
```
/ipfs/bafybeifrrglx2issn2had5rtstn3xltla6vxmpjfwfz7o3hapvkynh4zoq/clippet.txt?dag-scope=entity&entity-bytes=0:99999999
```

[testmark]:# (test/sharded_file_in_directory_byte_ranges/0:99999999/execution)
```
bafybeifrrglx2issn2had5rtstn3xltla6vxmpjfwfz7o3hapvkynh4zoq | Directory | /
bafybeiawxstujkmnv2doejkzfydtotgqreycncd7ro4ixxddeoahofwjkm | File      | ↳ /clippet.txt [0:1889755] (1,889,756 B)
bafkreib56a35cuh7mavlzlradaysqqpqx6lr2sn3veahyb2yb3y7dq5aei | RawLeaf   |   ↳ /clippet.txt [0:256143] (256,144 B)
bafkreicjp7lobawh3bob4gjq63fmsz44sbsayf2xkwhf3jhme25y2tyzky | RawLeaf   |     /clippet.txt [256144:512287] (256,144 B)
bafkreigcn244ayqteak6lignqrxdomc456362t4uysw624ccy7yk3ysfey | RawLeaf   |     /clippet.txt [512288:768431] (256,144 B)
bafkreihbp4ur2mdgfqntlyvew7njve5pdjgtphr74ipmbebu7fofcn4fh4 | RawLeaf   |     /clippet.txt [768432:1024575] (256,144 B)
bafkreibggbasrddspulesc5zum23cx3fqdknvzi6dttlrjsiga7qanakdu | RawLeaf   |     /clippet.txt [1024576:1280719] (256,144 B)
bafkreibzp426cl6b3udplywqrmfpdm6witikihya6n5rfh724lwnn53oe4 | RawLeaf   |     /clippet.txt [1280720:1536863] (256,144 B)
bafkreic47cecyo4ko65fdmpfhaonqz2kk73sd6zacnvsdjofee62u7d3oe | RawLeaf   |     /clippet.txt [1536864:1793007] (256,144 B)
bafkreif6cdswphju3fd5onyiuoswxpstlskdydqh4s3rvgwvdjmx7zhpcq | RawLeaf   |     /clippet.txt [1793008:1889755] (96,748 B)
```

#### 1793008:* last block

Starts at the first byte of the last block.

[testmark]:# (test/sharded_file_in_directory_byte_ranges/1793008:*/query)
```
/ipfs/bafybeifrrglx2issn2had5rtstn3xltla6vxmpjfwfz7o3hapvkynh4zoq/clippet.txt?dag-scope=entity&entity-bytes=1793008:*
```

[testmark]:# (test/sharded_file_in_directory_byte_ranges/1793008:*/execution)
```
bafybeifrrglx2issn2had5rtstn3xltla6vxmpjfwfz7o3hapvkynh4zoq | Directory | /
bafybeiawxstujkmnv2doejkzfydtotgqreycncd7ro4ixxddeoahofwjkm | File      | ↳ /clippet.txt [0:1889755] (1,889,756 B)
bafkreif6cdswphju3fd5onyiuoswxpstlskdydqh4s3rvgwvdjmx7zhpcq | RawLeaf   |   ↳ /clippet.txt [1793008:1889755] (96,748 B)
```

#### 1793007:* second last block boundary

Starts at the last byte of the second last block.

[testmark]:# (test/sharded_file_in_directory_byte_ranges/1793007:*/query)
```
/ipfs/bafybeifrrglx2issn2had5rtstn3xltla6vxmpjfwfz7o3hapvkynh4zoq/clippet.txt?dag-scope=entity&entity-bytes=1793007:*
```

[testmark]:# (test/sharded_file_in_directory_byte_ranges/1793007:*/execution)
```
bafybeifrrglx2issn2had5rtstn3xltla6vxmpjfwfz7o3hapvkynh4zoq | Directory | /
bafybeiawxstujkmnv2doejkzfydtotgqreycncd7ro4ixxddeoahofwjkm | File      | ↳ /clippet.txt [0:1889755] (1,889,756 B)
bafkreic47cecyo4ko65fdmpfhaonqz2kk73sd6zacnvsdjofee62u7d3oe | RawLeaf   |   ↳ /clippet.txt [1536864:1793007] (256,144 B)
bafkreif6cdswphju3fd5onyiuoswxpstlskdydqh4s3rvgwvdjmx7zhpcq | RawLeaf   |     /clippet.txt [1793008:1889755] (96,748 B)
```

#### 256144:* all but first block

Starts at the first byte of the second block.

[testmark]:# (test/sharded_file_in_directory_byte_ranges/256144:*/query)
```
/ipfs/bafybeifrrglx2issn2had5rtstn3xltla6vxmpjfwfz7o3hapvkynh4zoq/clippet.txt?dag-scope=entity&entity-bytes=256144:*
```

[testmark]:# (test/sharded_file_in_directory_byte_ranges/256144:*/execution)
```
bafybeifrrglx2issn2had5rtstn3xltla6vxmpjfwfz7o3hapvkynh4zoq | Directory | /
bafybeiawxstujkmnv2doejkzfydtotgqreycncd7ro4ixxddeoahofwjkm | File      | ↳ /clippet.txt [0:1889755] (1,889,756 B)
bafkreicjp7lobawh3bob4gjq63fmsz44sbsayf2xkwhf3jhme25y2tyzky | RawLeaf   |   ↳ /clippet.txt [256144:512287] (256,144 B)
bafkreigcn244ayqteak6lignqrxdomc456362t4uysw624ccy7yk3ysfey | RawLeaf   |     /clippet.txt [512288:768431] (256,144 B)
bafkreihbp4ur2mdgfqntlyvew7njve5pdjgtphr74ipmbebu7fofcn4fh4 | RawLeaf   |     /clippet.txt [768432:1024575] (256,144 B)
bafkreibggbasrddspulesc5zum23cx3fqdknvzi6dttlrjsiga7qanakdu | RawLeaf   |     /clippet.txt [1024576:1280719] (256,144 B)
bafkreibzp426cl6b3udplywqrmfpdm6witikihya6n5rfh724lwnn53oe4 | RawLeaf   |     /clippet.txt [1280720:1536863] (256,144 B)
bafkreic47cecyo4ko65fdmpfhaonqz2kk73sd6zacnvsdjofee62u7d3oe | RawLeaf   |     /clippet.txt [1536864:1793007] (256,144 B)
bafkreif6cdswphju3fd5onyiuoswxpstlskdydqh4s3rvgwvdjmx7zhpcq | RawLeaf   |     /clippet.txt [1793008:1889755] (96,748 B)
```

#### 256143:* first block boundary

Need all blocks to match this.

[testmark]:# (test/sharded_file_in_directory_byte_ranges/256143:*/query)
```
/ipfs/bafybeifrrglx2issn2had5rtstn3xltla6vxmpjfwfz7o3hapvkynh4zoq/clippet.txt?dag-scope=entity&entity-bytes=256143:*
```

[testmark]:# (test/sharded_file_in_directory_byte_ranges/256143:*/execution)
```
bafybeifrrglx2issn2had5rtstn3xltla6vxmpjfwfz7o3hapvkynh4zoq | Directory | /
bafybeiawxstujkmnv2doejkzfydtotgqreycncd7ro4ixxddeoahofwjkm | File      | ↳ /clippet.txt [0:1889755] (1,889,756 B)
bafkreib56a35cuh7mavlzlradaysqqpqx6lr2sn3veahyb2yb3y7dq5aei | RawLeaf   |   ↳ /clippet.txt [0:256143] (256,144 B)
bafkreicjp7lobawh3bob4gjq63fmsz44sbsayf2xkwhf3jhme25y2tyzky | RawLeaf   |     /clippet.txt [256144:512287] (256,144 B)
bafkreigcn244ayqteak6lignqrxdomc456362t4uysw624ccy7yk3ysfey | RawLeaf   |     /clippet.txt [512288:768431] (256,144 B)
bafkreihbp4ur2mdgfqntlyvew7njve5pdjgtphr74ipmbebu7fofcn4fh4 | RawLeaf   |     /clippet.txt [768432:1024575] (256,144 B)
bafkreibggbasrddspulesc5zum23cx3fqdknvzi6dttlrjsiga7qanakdu | RawLeaf   |     /clippet.txt [1024576:1280719] (256,144 B)
bafkreibzp426cl6b3udplywqrmfpdm6witikihya6n5rfh724lwnn53oe4 | RawLeaf   |     /clippet.txt [1280720:1536863] (256,144 B)
bafkreic47cecyo4ko65fdmpfhaonqz2kk73sd6zacnvsdjofee62u7d3oe | RawLeaf   |     /clippet.txt [1536864:1793007] (256,144 B)
bafkreif6cdswphju3fd5onyiuoswxpstlskdydqh4s3rvgwvdjmx7zhpcq | RawLeaf   |     /clippet.txt [1793008:1889755] (96,748 B)
```

#### 256143:256144 first and second boundary

[testmark]:# (test/sharded_file_in_directory_byte_ranges/256143:256144/query)
```
/ipfs/bafybeifrrglx2issn2had5rtstn3xltla6vxmpjfwfz7o3hapvkynh4zoq/clippet.txt?dag-scope=entity&entity-bytes=256143:256144
```

[testmark]:# (test/sharded_file_in_directory_byte_ranges/256143:256144/execution)
```
bafybeifrrglx2issn2had5rtstn3xltla6vxmpjfwfz7o3hapvkynh4zoq | Directory | /
bafybeiawxstujkmnv2doejkzfydtotgqreycncd7ro4ixxddeoahofwjkm | File      | ↳ /clippet.txt [0:1889755] (1,889,756 B)
bafkreib56a35cuh7mavlzlradaysqqpqx6lr2sn3veahyb2yb3y7dq5aei | RawLeaf   |   ↳ /clippet.txt [0:256143] (256,144 B)
bafkreicjp7lobawh3bob4gjq63fmsz44sbsayf2xkwhf3jhme25y2tyzky | RawLeaf   |     /clippet.txt [256144:512287] (256,144 B)
```

#### 256144:256144 second only

Matching a single byte at the start of the second block

[testmark]:# (test/sharded_file_in_directory_byte_ranges/256144:256144/query)
```
/ipfs/bafybeifrrglx2issn2had5rtstn3xltla6vxmpjfwfz7o3hapvkynh4zoq/clippet.txt?dag-scope=entity&entity-bytes=256144:256144
```

[testmark]:# (test/sharded_file_in_directory_byte_ranges/256144:256144/execution)
```
bafybeifrrglx2issn2had5rtstn3xltla6vxmpjfwfz7o3hapvkynh4zoq | Directory | /
bafybeiawxstujkmnv2doejkzfydtotgqreycncd7ro4ixxddeoahofwjkm | File      | ↳ /clippet.txt [0:1889755] (1,889,756 B)
bafkreicjp7lobawh3bob4gjq63fmsz44sbsayf2xkwhf3jhme25y2tyzky | RawLeaf   |   ↳ /clippet.txt [256144:512287] (256,144 B)
```

#### 512287:512287 second only

Matching a single byte at the end of the second block

[testmark]:# (test/sharded_file_in_directory_byte_ranges/512287:512287/query)
```
/ipfs/bafybeifrrglx2issn2had5rtstn3xltla6vxmpjfwfz7o3hapvkynh4zoq/clippet.txt?dag-scope=entity&entity-bytes=512287:512287
```

[testmark]:# (test/sharded_file_in_directory_byte_ranges/512287:512287/execution)
```
bafybeifrrglx2issn2had5rtstn3xltla6vxmpjfwfz7o3hapvkynh4zoq | Directory | /
bafybeiawxstujkmnv2doejkzfydtotgqreycncd7ro4ixxddeoahofwjkm | File      | ↳ /clippet.txt [0:1889755] (1,889,756 B)
bafkreicjp7lobawh3bob4gjq63fmsz44sbsayf2xkwhf3jhme25y2tyzky | RawLeaf   |   ↳ /clippet.txt [256144:512287] (256,144 B)
```

#### 256143:1793008 full file, boundaries

Matching this needs all blocks, including one byte from first and last

[testmark]:# (test/sharded_file_in_directory_byte_ranges/256143:1793008/query)
```
/ipfs/bafybeifrrglx2issn2had5rtstn3xltla6vxmpjfwfz7o3hapvkynh4zoq/clippet.txt?dag-scope=entity&entity-bytes=256143:1793008
```

[testmark]:# (test/sharded_file_in_directory_byte_ranges/256143:1793008/execution)
```
bafybeifrrglx2issn2had5rtstn3xltla6vxmpjfwfz7o3hapvkynh4zoq | Directory | /
bafybeiawxstujkmnv2doejkzfydtotgqreycncd7ro4ixxddeoahofwjkm | File      | ↳ /clippet.txt [0:1889755] (1,889,756 B)
bafkreib56a35cuh7mavlzlradaysqqpqx6lr2sn3veahyb2yb3y7dq5aei | RawLeaf   |   ↳ /clippet.txt [0:256143] (256,144 B)
bafkreicjp7lobawh3bob4gjq63fmsz44sbsayf2xkwhf3jhme25y2tyzky | RawLeaf   |     /clippet.txt [256144:512287] (256,144 B)
bafkreigcn244ayqteak6lignqrxdomc456362t4uysw624ccy7yk3ysfey | RawLeaf   |     /clippet.txt [512288:768431] (256,144 B)
bafkreihbp4ur2mdgfqntlyvew7njve5pdjgtphr74ipmbebu7fofcn4fh4 | RawLeaf   |     /clippet.txt [768432:1024575] (256,144 B)
bafkreibggbasrddspulesc5zum23cx3fqdknvzi6dttlrjsiga7qanakdu | RawLeaf   |     /clippet.txt [1024576:1280719] (256,144 B)
bafkreibzp426cl6b3udplywqrmfpdm6witikihya6n5rfh724lwnn53oe4 | RawLeaf   |     /clippet.txt [1280720:1536863] (256,144 B)
bafkreic47cecyo4ko65fdmpfhaonqz2kk73sd6zacnvsdjofee62u7d3oe | RawLeaf   |     /clippet.txt [1536864:1793007] (256,144 B)
bafkreif6cdswphju3fd5onyiuoswxpstlskdydqh4s3rvgwvdjmx7zhpcq | RawLeaf   |     /clippet.txt [1793008:1889755] (96,748 B)
```

#### 256144:1793007 inner blocks, boundaries

Matching this only requires the middle blocks, excluding the first and last

[testmark]:# (test/sharded_file_in_directory_byte_ranges/256144:1793007/query)
```
/ipfs/bafybeifrrglx2issn2had5rtstn3xltla6vxmpjfwfz7o3hapvkynh4zoq/clippet.txt?dag-scope=entity&entity-bytes=256144:1793007
```

[testmark]:# (test/sharded_file_in_directory_byte_ranges/256144:1793007/execution)
```
bafybeifrrglx2issn2had5rtstn3xltla6vxmpjfwfz7o3hapvkynh4zoq | Directory | /
bafybeiawxstujkmnv2doejkzfydtotgqreycncd7ro4ixxddeoahofwjkm | File      | ↳ /clippet.txt [0:1889755] (1,889,756 B)
bafkreicjp7lobawh3bob4gjq63fmsz44sbsayf2xkwhf3jhme25y2tyzky | RawLeaf   |   ↳ /clippet.txt [256144:512287] (256,144 B)
bafkreigcn244ayqteak6lignqrxdomc456362t4uysw624ccy7yk3ysfey | RawLeaf   |     /clippet.txt [512288:768431] (256,144 B)
bafkreihbp4ur2mdgfqntlyvew7njve5pdjgtphr74ipmbebu7fofcn4fh4 | RawLeaf   |     /clippet.txt [768432:1024575] (256,144 B)
bafkreibggbasrddspulesc5zum23cx3fqdknvzi6dttlrjsiga7qanakdu | RawLeaf   |     /clippet.txt [1024576:1280719] (256,144 B)
bafkreibzp426cl6b3udplywqrmfpdm6witikihya6n5rfh724lwnn53oe4 | RawLeaf   |     /clippet.txt [1280720:1536863] (256,144 B)
bafkreic47cecyo4ko65fdmpfhaonqz2kk73sd6zacnvsdjofee62u7d3oe | RawLeaf   |     /clippet.txt [1536864:1793007] (256,144 B)
```

#### 0:-1

All blocks of the file.

[testmark]:# (test/sharded_file_in_directory_byte_ranges/0:-1/query)
```
/ipfs/bafybeifrrglx2issn2had5rtstn3xltla6vxmpjfwfz7o3hapvkynh4zoq/clippet.txt?dag-scope=entity&entity-bytes=0:-1
```

[testmark]:# (test/sharded_file_in_directory_byte_ranges/0:-1/execution)
```
bafybeifrrglx2issn2had5rtstn3xltla6vxmpjfwfz7o3hapvkynh4zoq | Directory | /
bafybeiawxstujkmnv2doejkzfydtotgqreycncd7ro4ixxddeoahofwjkm | File      | ↳ /clippet.txt [0:1889755] (1,889,756 B)
bafkreib56a35cuh7mavlzlradaysqqpqx6lr2sn3veahyb2yb3y7dq5aei | RawLeaf   |   ↳ /clippet.txt [0:256143] (256,144 B)
bafkreicjp7lobawh3bob4gjq63fmsz44sbsayf2xkwhf3jhme25y2tyzky | RawLeaf   |     /clippet.txt [256144:512287] (256,144 B)
bafkreigcn244ayqteak6lignqrxdomc456362t4uysw624ccy7yk3ysfey | RawLeaf   |     /clippet.txt [512288:768431] (256,144 B)
bafkreihbp4ur2mdgfqntlyvew7njve5pdjgtphr74ipmbebu7fofcn4fh4 | RawLeaf   |     /clippet.txt [768432:1024575] (256,144 B)
bafkreibggbasrddspulesc5zum23cx3fqdknvzi6dttlrjsiga7qanakdu | RawLeaf   |     /clippet.txt [1024576:1280719] (256,144 B)
bafkreibzp426cl6b3udplywqrmfpdm6witikihya6n5rfh724lwnn53oe4 | RawLeaf   |     /clippet.txt [1280720:1536863] (256,144 B)
bafkreic47cecyo4ko65fdmpfhaonqz2kk73sd6zacnvsdjofee62u7d3oe | RawLeaf   |     /clippet.txt [1536864:1793007] (256,144 B)
bafkreif6cdswphju3fd5onyiuoswxpstlskdydqh4s3rvgwvdjmx7zhpcq | RawLeaf   |     /clippet.txt [1793008:1889755] (96,748 B)
```

#### -10:*

Only needs the last block.

[testmark]:# (test/sharded_file_in_directory_byte_ranges/-10:*/query)
```
/ipfs/bafybeifrrglx2issn2had5rtstn3xltla6vxmpjfwfz7o3hapvkynh4zoq/clippet.txt?dag-scope=entity&entity-bytes=-10:*
```

[testmark]:# (test/sharded_file_in_directory_byte_ranges/-10:*/execution)
```
bafybeifrrglx2issn2had5rtstn3xltla6vxmpjfwfz7o3hapvkynh4zoq | Directory | /
bafybeiawxstujkmnv2doejkzfydtotgqreycncd7ro4ixxddeoahofwjkm | File      | ↳ /clippet.txt [0:1889755] (1,889,756 B)
bafkreif6cdswphju3fd5onyiuoswxpstlskdydqh4s3rvgwvdjmx7zhpcq | RawLeaf   |   ↳ /clippet.txt [1793008:1889755] (96,748 B)
```

#### 0:-1889755

Only needs the first block.

[testmark]:# (test/sharded_file_in_directory_byte_ranges/0:-1889755/query)
```
/ipfs/bafybeifrrglx2issn2had5rtstn3xltla6vxmpjfwfz7o3hapvkynh4zoq/clippet.txt?dag-scope=entity&entity-bytes=0:-1889755
```

[testmark]:# (test/sharded_file_in_directory_byte_ranges/0:-1889755/execution)
```
bafybeifrrglx2issn2had5rtstn3xltla6vxmpjfwfz7o3hapvkynh4zoq | Directory | /
bafybeiawxstujkmnv2doejkzfydtotgqreycncd7ro4ixxddeoahofwjkm | File      | ↳ /clippet.txt [0:1889755] (1,889,756 B)
bafkreib56a35cuh7mavlzlradaysqqpqx6lr2sn3veahyb2yb3y7dq5aei | RawLeaf   |   ↳ /clippet.txt [0:256143] (256,144 B)
```

#### 0:-1889756

Doesn't match any blocks, 0:0.

[testmark]:# (test/sharded_file_in_directory_byte_ranges/0:-1889756/query)
```
/ipfs/bafybeifrrglx2issn2had5rtstn3xltla6vxmpjfwfz7o3hapvkynh4zoq/clippet.txt?dag-scope=entity&entity-bytes=0:-1889756
```

[testmark]:# (test/sharded_file_in_directory_byte_ranges/0:-1889756/execution)
```
bafybeifrrglx2issn2had5rtstn3xltla6vxmpjfwfz7o3hapvkynh4zoq | Directory | /
bafybeiawxstujkmnv2doejkzfydtotgqreycncd7ro4ixxddeoahofwjkm | File      | ↳ /clippet.txt [0:1889755] (1,889,756 B)
```

#### 0:-999999999

Doesn't match any blocks, 0:0.

[testmark]:# (test/sharded_file_in_directory_byte_ranges/0:-999999999/query)
```
/ipfs/bafybeifrrglx2issn2had5rtstn3xltla6vxmpjfwfz7o3hapvkynh4zoq/clippet.txt?dag-scope=entity&entity-bytes=0:-999999999
```

[testmark]:# (test/sharded_file_in_directory_byte_ranges/0:-999999999/execution)
```
bafybeifrrglx2issn2had5rtstn3xltla6vxmpjfwfz7o3hapvkynh4zoq | Directory | /
bafybeiawxstujkmnv2doejkzfydtotgqreycncd7ro4ixxddeoahofwjkm | File      | ↳ /clippet.txt [0:1889755] (1,889,756 B)
```

#### 0:-96747 last block boundary (incl)

Should match all blocks because it includes the first byte of the last block.

[testmark]:# (test/sharded_file_in_directory_byte_ranges/0:-96747/query)
```
/ipfs/bafybeifrrglx2issn2had5rtstn3xltla6vxmpjfwfz7o3hapvkynh4zoq/clippet.txt?dag-scope=entity&entity-bytes=0:-96747
```

[testmark]:# (test/sharded_file_in_directory_byte_ranges/0:-96747/execution)
```
bafybeifrrglx2issn2had5rtstn3xltla6vxmpjfwfz7o3hapvkynh4zoq | Directory | /
bafybeiawxstujkmnv2doejkzfydtotgqreycncd7ro4ixxddeoahofwjkm | File      | ↳ /clippet.txt [0:1889755] (1,889,756 B)
bafkreib56a35cuh7mavlzlradaysqqpqx6lr2sn3veahyb2yb3y7dq5aei | RawLeaf   |   ↳ /clippet.txt [0:256143] (256,144 B)
bafkreicjp7lobawh3bob4gjq63fmsz44sbsayf2xkwhf3jhme25y2tyzky | RawLeaf   |     /clippet.txt [256144:512287] (256,144 B)
bafkreigcn244ayqteak6lignqrxdomc456362t4uysw624ccy7yk3ysfey | RawLeaf   |     /clippet.txt [512288:768431] (256,144 B)
bafkreihbp4ur2mdgfqntlyvew7njve5pdjgtphr74ipmbebu7fofcn4fh4 | RawLeaf   |     /clippet.txt [768432:1024575] (256,144 B)
bafkreibggbasrddspulesc5zum23cx3fqdknvzi6dttlrjsiga7qanakdu | RawLeaf   |     /clippet.txt [1024576:1280719] (256,144 B)
bafkreibzp426cl6b3udplywqrmfpdm6witikihya6n5rfh724lwnn53oe4 | RawLeaf   |     /clippet.txt [1280720:1536863] (256,144 B)
bafkreic47cecyo4ko65fdmpfhaonqz2kk73sd6zacnvsdjofee62u7d3oe | RawLeaf   |     /clippet.txt [1536864:1793007] (256,144 B)
bafkreif6cdswphju3fd5onyiuoswxpstlskdydqh4s3rvgwvdjmx7zhpcq | RawLeaf   |     /clippet.txt [1793008:1889755] (96,748 B)
```

#### 0:-96748 last block boundary (excl)

Should match all blocks but the last.

[testmark]:# (test/sharded_file_in_directory_byte_ranges/0:-96748/query)
```
/ipfs/bafybeifrrglx2issn2had5rtstn3xltla6vxmpjfwfz7o3hapvkynh4zoq/clippet.txt?dag-scope=entity&entity-bytes=0:-96748
```

[testmark]:# (test/sharded_file_in_directory_byte_ranges/0:-96748/execution)
```
bafybeifrrglx2issn2had5rtstn3xltla6vxmpjfwfz7o3hapvkynh4zoq | Directory | /
bafybeiawxstujkmnv2doejkzfydtotgqreycncd7ro4ixxddeoahofwjkm | File      | ↳ /clippet.txt [0:1889755] (1,889,756 B)
bafkreib56a35cuh7mavlzlradaysqqpqx6lr2sn3veahyb2yb3y7dq5aei | RawLeaf   |   ↳ /clippet.txt [0:256143] (256,144 B)
bafkreicjp7lobawh3bob4gjq63fmsz44sbsayf2xkwhf3jhme25y2tyzky | RawLeaf   |     /clippet.txt [256144:512287] (256,144 B)
bafkreigcn244ayqteak6lignqrxdomc456362t4uysw624ccy7yk3ysfey | RawLeaf   |     /clippet.txt [512288:768431] (256,144 B)
bafkreihbp4ur2mdgfqntlyvew7njve5pdjgtphr74ipmbebu7fofcn4fh4 | RawLeaf   |     /clippet.txt [768432:1024575] (256,144 B)
bafkreibggbasrddspulesc5zum23cx3fqdknvzi6dttlrjsiga7qanakdu | RawLeaf   |     /clippet.txt [1024576:1280719] (256,144 B)
bafkreibzp426cl6b3udplywqrmfpdm6witikihya6n5rfh724lwnn53oe4 | RawLeaf   |     /clippet.txt [1280720:1536863] (256,144 B)
bafkreic47cecyo4ko65fdmpfhaonqz2kk73sd6zacnvsdjofee62u7d3oe | RawLeaf   |     /clippet.txt [1536864:1793007] (256,144 B)
```

#### 256143:-96747 middle blocks (incl)

Should match all blocks because it includes a byte on both the first and last blocks.

[testmark]:# (test/sharded_file_in_directory_byte_ranges/256143:-96747/query)
```
/ipfs/bafybeifrrglx2issn2had5rtstn3xltla6vxmpjfwfz7o3hapvkynh4zoq/clippet.txt?dag-scope=entity&entity-bytes=256143:-96747
```

[testmark]:# (test/sharded_file_in_directory_byte_ranges/256143:-96747/execution)
```
bafybeifrrglx2issn2had5rtstn3xltla6vxmpjfwfz7o3hapvkynh4zoq | Directory | /
bafybeiawxstujkmnv2doejkzfydtotgqreycncd7ro4ixxddeoahofwjkm | File      | ↳ /clippet.txt [0:1889755] (1,889,756 B)
bafkreib56a35cuh7mavlzlradaysqqpqx6lr2sn3veahyb2yb3y7dq5aei | RawLeaf   |   ↳ /clippet.txt [0:256143] (256,144 B)
bafkreicjp7lobawh3bob4gjq63fmsz44sbsayf2xkwhf3jhme25y2tyzky | RawLeaf   |     /clippet.txt [256144:512287] (256,144 B)
bafkreigcn244ayqteak6lignqrxdomc456362t4uysw624ccy7yk3ysfey | RawLeaf   |     /clippet.txt [512288:768431] (256,144 B)
bafkreihbp4ur2mdgfqntlyvew7njve5pdjgtphr74ipmbebu7fofcn4fh4 | RawLeaf   |     /clippet.txt [768432:1024575] (256,144 B)
bafkreibggbasrddspulesc5zum23cx3fqdknvzi6dttlrjsiga7qanakdu | RawLeaf   |     /clippet.txt [1024576:1280719] (256,144 B)
bafkreibzp426cl6b3udplywqrmfpdm6witikihya6n5rfh724lwnn53oe4 | RawLeaf   |     /clippet.txt [1280720:1536863] (256,144 B)
bafkreic47cecyo4ko65fdmpfhaonqz2kk73sd6zacnvsdjofee62u7d3oe | RawLeaf   |     /clippet.txt [1536864:1793007] (256,144 B)
bafkreif6cdswphju3fd5onyiuoswxpstlskdydqh4s3rvgwvdjmx7zhpcq | RawLeaf   |     /clippet.txt [1793008:1889755] (96,748 B)
```

#### 256144:-96748 middle blocks (excl)

Should match all middle blocks.

[testmark]:# (test/sharded_file_in_directory_byte_ranges/256144:-96748/query)
```
/ipfs/bafybeifrrglx2issn2had5rtstn3xltla6vxmpjfwfz7o3hapvkynh4zoq/clippet.txt?dag-scope=entity&entity-bytes=256144:-96748
```

[testmark]:# (test/sharded_file_in_directory_byte_ranges/256144:-96748/execution)
```
bafybeifrrglx2issn2had5rtstn3xltla6vxmpjfwfz7o3hapvkynh4zoq | Directory | /
bafybeiawxstujkmnv2doejkzfydtotgqreycncd7ro4ixxddeoahofwjkm | File      | ↳ /clippet.txt [0:1889755] (1,889,756 B)
bafkreicjp7lobawh3bob4gjq63fmsz44sbsayf2xkwhf3jhme25y2tyzky | RawLeaf   |   ↳ /clippet.txt [256144:512287] (256,144 B)
bafkreigcn244ayqteak6lignqrxdomc456362t4uysw624ccy7yk3ysfey | RawLeaf   |     /clippet.txt [512288:768431] (256,144 B)
bafkreihbp4ur2mdgfqntlyvew7njve5pdjgtphr74ipmbebu7fofcn4fh4 | RawLeaf   |     /clippet.txt [768432:1024575] (256,144 B)
bafkreibggbasrddspulesc5zum23cx3fqdknvzi6dttlrjsiga7qanakdu | RawLeaf   |     /clippet.txt [1024576:1280719] (256,144 B)
bafkreibzp426cl6b3udplywqrmfpdm6witikihya6n5rfh724lwnn53oe4 | RawLeaf   |     /clippet.txt [1280720:1536863] (256,144 B)
bafkreic47cecyo4ko65fdmpfhaonqz2kk73sd6zacnvsdjofee62u7d3oe | RawLeaf   |     /clippet.txt [1536864:1793007] (256,144 B)
```

### Small file in directory, byte ranges

A single-block file in the root of the UnixFS DAG as the target, using byte range (`entity-bytes`) queries to test that the same block is returned regardless of the byte range.

#### 0:*

[testmark]:# (test/small_file_in_directory_byte_ranges/0:*/query)
```
/ipfs/bafybeifrrglx2issn2had5rtstn3xltla6vxmpjfwfz7o3hapvkynh4zoq/Zigzagumptious/Lickety-split/velociraptorious.csv?dag-scope=entity&entity-bytes=0:*
```

[testmark]:# (test/small_file_in_directory_byte_ranges/0:*/execution)
```
bafybeifrrglx2issn2had5rtstn3xltla6vxmpjfwfz7o3hapvkynh4zoq | Directory | /
bafybeie3mbyp7k77vrpiduaifyhdeqvusjn7qofzwtsp47yavyyb62z32y | HAMTShard | ↳ /Zigzagumptious
bafybeigivdbrxmcixaqfap3rrs7ti5ycr7vj4xfbkjougq67k7ac5oz55a | HAMTShard |   ↳ /Zigzagumptious [2]
bafybeig2cw3hgc3oo4tpd5cqh7pfgrrzjdlenz3n2fredafr4l3ja7tvgy | Directory |     ↳ /Zigzagumptious/Lickety-split
bafkreifc732vu5ykpdctxxmpdsvdj4mmfrejf47lpq2suzhpdgxwudwohy | RawLeaf   |       ↳ /Zigzagumptious/Lickety-split/velociraptorious.csv [0:1822] (1,823 B)
```

#### 0:0 raw leaf file

[testmark]:# (test/small_file_in_directory_byte_ranges/0:0/query)
```
/ipfs/bafybeifrrglx2issn2had5rtstn3xltla6vxmpjfwfz7o3hapvkynh4zoq/Zigzagumptious/Lickety-split/velociraptorious.csv?dag-scope=entity&entity-bytes=0:0
```

[testmark]:# (test/small_file_in_directory_byte_ranges/0:0/execution)
```
bafybeifrrglx2issn2had5rtstn3xltla6vxmpjfwfz7o3hapvkynh4zoq | Directory | /
bafybeie3mbyp7k77vrpiduaifyhdeqvusjn7qofzwtsp47yavyyb62z32y | HAMTShard | ↳ /Zigzagumptious
bafybeigivdbrxmcixaqfap3rrs7ti5ycr7vj4xfbkjougq67k7ac5oz55a | HAMTShard |   ↳ /Zigzagumptious [2]
bafybeig2cw3hgc3oo4tpd5cqh7pfgrrzjdlenz3n2fredafr4l3ja7tvgy | Directory |     ↳ /Zigzagumptious/Lickety-split
bafkreifc732vu5ykpdctxxmpdsvdj4mmfrejf47lpq2suzhpdgxwudwohy | RawLeaf   |       ↳ /Zigzagumptious/Lickety-split/velociraptorious.csv [0:1822] (1,823 B)
```

#### 0:0 sharded file

[testmark]:# (test/sharded_file_in_directory_byte_ranges/0:0/query)
```
/ipfs/bafybeifrrglx2issn2had5rtstn3xltla6vxmpjfwfz7o3hapvkynh4zoq/clippet.txt?dag-scope=entity&entity-bytes=0:0
```

[testmark]:# (test/sharded_file_in_directory_byte_ranges/0:0/execution)
```
bafybeifrrglx2issn2had5rtstn3xltla6vxmpjfwfz7o3hapvkynh4zoq | Directory | /
bafybeiawxstujkmnv2doejkzfydtotgqreycncd7ro4ixxddeoahofwjkm | File      | ↳ /clippet.txt [0:1889755] (1,889,756 B)
bafkreib56a35cuh7mavlzlradaysqqpqx6lr2sn3veahyb2yb3y7dq5aei | RawLeaf   |   ↳ /clippet.txt [0:256143] (256,144 B)
```

#### 0:10

[testmark]:# (test/small_file_in_directory_byte_ranges/0:10/query)
```
/ipfs/bafybeifrrglx2issn2had5rtstn3xltla6vxmpjfwfz7o3hapvkynh4zoq/Zigzagumptious/Lickety-split/velociraptorious.csv?dag-scope=entity&entity-bytes=0:10
```

[testmark]:# (test/small_file_in_directory_byte_ranges/0:10/execution)
```
bafybeifrrglx2issn2had5rtstn3xltla6vxmpjfwfz7o3hapvkynh4zoq | Directory | /
bafybeie3mbyp7k77vrpiduaifyhdeqvusjn7qofzwtsp47yavyyb62z32y | HAMTShard | ↳ /Zigzagumptious
bafybeigivdbrxmcixaqfap3rrs7ti5ycr7vj4xfbkjougq67k7ac5oz55a | HAMTShard |   ↳ /Zigzagumptious [2]
bafybeig2cw3hgc3oo4tpd5cqh7pfgrrzjdlenz3n2fredafr4l3ja7tvgy | Directory |     ↳ /Zigzagumptious/Lickety-split
bafkreifc732vu5ykpdctxxmpdsvdj4mmfrejf47lpq2suzhpdgxwudwohy | RawLeaf   |       ↳ /Zigzagumptious/Lickety-split/velociraptorious.csv [0:1822] (1,823 B)
```

#### 1822:1823

[testmark]:# (test/small_file_in_directory_byte_ranges/1822:1823/query)
```
/ipfs/bafybeifrrglx2issn2had5rtstn3xltla6vxmpjfwfz7o3hapvkynh4zoq/Zigzagumptious/Lickety-split/velociraptorious.csv?dag-scope=entity&entity-bytes=1822:1823
```

[testmark]:# (test/small_file_in_directory_byte_ranges/1822:1823/execution)
```
bafybeifrrglx2issn2had5rtstn3xltla6vxmpjfwfz7o3hapvkynh4zoq | Directory | /
bafybeie3mbyp7k77vrpiduaifyhdeqvusjn7qofzwtsp47yavyyb62z32y | HAMTShard | ↳ /Zigzagumptious
bafybeigivdbrxmcixaqfap3rrs7ti5ycr7vj4xfbkjougq67k7ac5oz55a | HAMTShard |   ↳ /Zigzagumptious [2]
bafybeig2cw3hgc3oo4tpd5cqh7pfgrrzjdlenz3n2fredafr4l3ja7tvgy | Directory |     ↳ /Zigzagumptious/Lickety-split
bafkreifc732vu5ykpdctxxmpdsvdj4mmfrejf47lpq2suzhpdgxwudwohy | RawLeaf   |       ↳ /Zigzagumptious/Lickety-split/velociraptorious.csv [0:1822] (1,823 B)
```

#### 1823:1823

[testmark]:# (test/small_file_in_directory_byte_ranges/1823:1823/query)
```
/ipfs/bafybeifrrglx2issn2had5rtstn3xltla6vxmpjfwfz7o3hapvkynh4zoq/Zigzagumptious/Lickety-split/velociraptorious.csv?dag-scope=entity&entity-bytes=1823:1823
```

[testmark]:# (test/small_file_in_directory_byte_ranges/1823:1823/execution)
```
bafybeifrrglx2issn2had5rtstn3xltla6vxmpjfwfz7o3hapvkynh4zoq | Directory | /
bafybeie3mbyp7k77vrpiduaifyhdeqvusjn7qofzwtsp47yavyyb62z32y | HAMTShard | ↳ /Zigzagumptious
bafybeigivdbrxmcixaqfap3rrs7ti5ycr7vj4xfbkjougq67k7ac5oz55a | HAMTShard |   ↳ /Zigzagumptious [2]
bafybeig2cw3hgc3oo4tpd5cqh7pfgrrzjdlenz3n2fredafr4l3ja7tvgy | Directory |     ↳ /Zigzagumptious/Lickety-split
bafkreifc732vu5ykpdctxxmpdsvdj4mmfrejf47lpq2suzhpdgxwudwohy | RawLeaf   |       ↳ /Zigzagumptious/Lickety-split/velociraptorious.csv [0:1822] (1,823 B)
```

#### 1823:*

[testmark]:# (test/small_file_in_directory_byte_ranges/1823:*/query)
```
/ipfs/bafybeifrrglx2issn2had5rtstn3xltla6vxmpjfwfz7o3hapvkynh4zoq/Zigzagumptious/Lickety-split/velociraptorious.csv?dag-scope=entity&entity-bytes=1823:*
```

[testmark]:# (test/small_file_in_directory_byte_ranges/1823:*/execution)
```
bafybeifrrglx2issn2had5rtstn3xltla6vxmpjfwfz7o3hapvkynh4zoq | Directory | /
bafybeie3mbyp7k77vrpiduaifyhdeqvusjn7qofzwtsp47yavyyb62z32y | HAMTShard | ↳ /Zigzagumptious
bafybeigivdbrxmcixaqfap3rrs7ti5ycr7vj4xfbkjougq67k7ac5oz55a | HAMTShard |   ↳ /Zigzagumptious [2]
bafybeig2cw3hgc3oo4tpd5cqh7pfgrrzjdlenz3n2fredafr4l3ja7tvgy | Directory |     ↳ /Zigzagumptious/Lickety-split
bafkreifc732vu5ykpdctxxmpdsvdj4mmfrejf47lpq2suzhpdgxwudwohy | RawLeaf   |       ↳ /Zigzagumptious/Lickety-split/velociraptorious.csv [0:1822] (1,823 B)
```


#### 0:-10

[testmark]:# (test/small_file_in_directory_byte_ranges/0:-10/query)
```
/ipfs/bafybeifrrglx2issn2had5rtstn3xltla6vxmpjfwfz7o3hapvkynh4zoq/Zigzagumptious/Lickety-split/velociraptorious.csv?dag-scope=entity&entity-bytes=0:-10
```

[testmark]:# (test/small_file_in_directory_byte_ranges/0:-10/execution)
```
bafybeifrrglx2issn2had5rtstn3xltla6vxmpjfwfz7o3hapvkynh4zoq | Directory | /
bafybeie3mbyp7k77vrpiduaifyhdeqvusjn7qofzwtsp47yavyyb62z32y | HAMTShard | ↳ /Zigzagumptious
bafybeigivdbrxmcixaqfap3rrs7ti5ycr7vj4xfbkjougq67k7ac5oz55a | HAMTShard |   ↳ /Zigzagumptious [2]
bafybeig2cw3hgc3oo4tpd5cqh7pfgrrzjdlenz3n2fredafr4l3ja7tvgy | Directory |     ↳ /Zigzagumptious/Lickety-split
bafkreifc732vu5ykpdctxxmpdsvdj4mmfrejf47lpq2suzhpdgxwudwohy | RawLeaf   |       ↳ /Zigzagumptious/Lickety-split/velociraptorious.csv [0:1822] (1,823 B)
```

#### -1823:*

[testmark]:# (test/small_file_in_directory_byte_ranges/-1823:*/query)
```
/ipfs/bafybeifrrglx2issn2had5rtstn3xltla6vxmpjfwfz7o3hapvkynh4zoq/Zigzagumptious/Lickety-split/velociraptorious.csv?dag-scope=entity&entity-bytes=-1823:*
```

[testmark]:# (test/small_file_in_directory_byte_ranges/-1823:*/execution)
```
bafybeifrrglx2issn2had5rtstn3xltla6vxmpjfwfz7o3hapvkynh4zoq | Directory | /
bafybeie3mbyp7k77vrpiduaifyhdeqvusjn7qofzwtsp47yavyyb62z32y | HAMTShard | ↳ /Zigzagumptious
bafybeigivdbrxmcixaqfap3rrs7ti5ycr7vj4xfbkjougq67k7ac5oz55a | HAMTShard |   ↳ /Zigzagumptious [2]
bafybeig2cw3hgc3oo4tpd5cqh7pfgrrzjdlenz3n2fredafr4l3ja7tvgy | Directory |     ↳ /Zigzagumptious/Lickety-split
bafkreifc732vu5ykpdctxxmpdsvdj4mmfrejf47lpq2suzhpdgxwudwohy | RawLeaf   |       ↳ /Zigzagumptious/Lickety-split/velociraptorious.csv [0:1822] (1,823 B)
```

#### -1823:-1822

[testmark]:# (test/small_file_in_directory_byte_ranges/-1823:-1822/query)
```
/ipfs/bafybeifrrglx2issn2had5rtstn3xltla6vxmpjfwfz7o3hapvkynh4zoq/Zigzagumptious/Lickety-split/velociraptorious.csv?dag-scope=entity&entity-bytes=-1823:-1822
```

[testmark]:# (test/small_file_in_directory_byte_ranges/-1823:-1822/execution)
```
bafybeifrrglx2issn2had5rtstn3xltla6vxmpjfwfz7o3hapvkynh4zoq | Directory | /
bafybeie3mbyp7k77vrpiduaifyhdeqvusjn7qofzwtsp47yavyyb62z32y | HAMTShard | ↳ /Zigzagumptious
bafybeigivdbrxmcixaqfap3rrs7ti5ycr7vj4xfbkjougq67k7ac5oz55a | HAMTShard |   ↳ /Zigzagumptious [2]
bafybeig2cw3hgc3oo4tpd5cqh7pfgrrzjdlenz3n2fredafr4l3ja7tvgy | Directory |     ↳ /Zigzagumptious/Lickety-split
bafkreifc732vu5ykpdctxxmpdsvdj4mmfrejf47lpq2suzhpdgxwudwohy | RawLeaf   |       ↳ /Zigzagumptious/Lickety-split/velociraptorious.csv [0:1822] (1,823 B)
```

### Directory in a directory w/ byte range

Should perform the same as "Directory in a directory" case, as if the byte range wasn't specified.

#### all

[testmark]:# (test/directory_in_directory_with_byte_range/all/query)
```
/ipfs/bafybeifrrglx2issn2had5rtstn3xltla6vxmpjfwfz7o3hapvkynh4zoq/by/procrastinatorily?dag-scope=all&entity-bytes=256144:1793007
```

[testmark]:# (test/directory_in_directory_with_byte_range/all/execution)
```
bafybeifrrglx2issn2had5rtstn3xltla6vxmpjfwfz7o3hapvkynh4zoq | Directory | /
bafybeigdgcs3nulbgu6vtnyesfgsaau2grbxzbxxdtpgolsfhtrpjx6mw4 | Directory | ↳ /by
bafybeicsa4ltuq6m3sxzzrkfy6wetemiqvbdgnitkjwlcduswh3cvsccxy | Directory |   ↳ /by/procrastinatorily
bafkreiaquanb6uzch2bkv7iltvwipmawjfihb7jgejqww63vgbqshderxq | RawLeaf   |     ↳ /by/procrastinatorily/F [0:727] (728 B)
bafkreigtze43gghvasxpp3o6mklllhilbyzs63kzdtdlzpyaznk44vxnye | RawLeaf   |       /by/procrastinatorily/Gallivant.png [0:1339] (1,340 B)
bafkreifrkcg75acl2yu4jv65x5u7yzn2cnpezmx432p2v2lryzhwqyp63u | RawLeaf   |       /by/procrastinatorily/Oberon.xml [0:512] (513 B)
bafkreiac4vqpljai2qjxx7mgs2equqcs4oq6lmmie2oiqhrkmwukuez3cm | RawLeaf   |       /by/procrastinatorily/Pandemonium [0:917] (918 B)
bafkreiclovx7khthefexgfku4n7pndbqthj5xuiv6ymbd3cx2bve3qebby | RawLeaf   |       /by/procrastinatorily/gūþweard.docx [0:580] (581 B)
bafkreiaqchjvbofqnpwoxwrtcvelnz5neg4y5buqchwgnxwoigjofmnol4 | RawLeaf   |       /by/procrastinatorily/juxtapositionally.png [0:2426] (2,427 B)
bafkreif3y7x7uailqhjjuketaa2p34gidoj7ynmnmviejtynydov75dkbq | RawLeaf   |       /by/procrastinatorily/sǣlācend [0:430] (431 B)
bafkreias4xj2qbg36tyo4wirl2db2x2emh4lbfpwq7t3dexjos236a5wgu | RawLeaf   |       /by/procrastinatorily/t.png [0:57] (58 B)
bafkreidzryf2cxeo5bfkxulhxlgr6axh5qfrsh4ns6jwfd2yutzpkcoaxu | RawLeaf   |       /by/procrastinatorily/ya.xml [0:417] (418 B)
bafkreihys4i2ow3csfrhefnmwruwte2bv5ik223ocgbvq3ckwj7xdxzc2m | RawLeaf   |       /by/procrastinatorily/ætheling.docx [0:81] (82 B)
```

#### entity

[testmark]:# (test/directory_in_directory_with_byte_range/entity/query)
```
/ipfs/bafybeifrrglx2issn2had5rtstn3xltla6vxmpjfwfz7o3hapvkynh4zoq/by/procrastinatorily?dag-scope=entity&entity-bytes=256144:1793007
```

[testmark]:# (test/directory_in_directory_with_byte_range/entity/execution)
```
bafybeifrrglx2issn2had5rtstn3xltla6vxmpjfwfz7o3hapvkynh4zoq | Directory | /
bafybeigdgcs3nulbgu6vtnyesfgsaau2grbxzbxxdtpgolsfhtrpjx6mw4 | Directory | ↳ /by
bafybeicsa4ltuq6m3sxzzrkfy6wetemiqvbdgnitkjwlcduswh3cvsccxy | Directory |   ↳ /by/procrastinatorily
```

#### block

[testmark]:# (test/directory_in_directory_with_byte_range/block/query)
```
/ipfs/bafybeifrrglx2issn2had5rtstn3xltla6vxmpjfwfz7o3hapvkynh4zoq/by/procrastinatorily?dag-scope=block&entity-bytes=256144:1793007
```

[testmark]:# (test/directory_in_directory_with_byte_range/block/execution)
```
bafybeifrrglx2issn2had5rtstn3xltla6vxmpjfwfz7o3hapvkynh4zoq | Directory | /
bafybeigdgcs3nulbgu6vtnyesfgsaau2grbxzbxxdtpgolsfhtrpjx6mw4 | Directory | ↳ /by
bafybeicsa4ltuq6m3sxzzrkfy6wetemiqvbdgnitkjwlcduswh3cvsccxy | Directory |   ↳ /by/procrastinatorily
```

### Hamt in directory w/ byte range

Should perform the same as "Hamt in directory" case, as if the byte range wasn't specified.

#### entity

[testmark]:# (test/hamt_in_directory_with_byte_range/entity/query)
```
/ipfs/bafybeifrrglx2issn2had5rtstn3xltla6vxmpjfwfz7o3hapvkynh4zoq/Zigzagumptious?dag-scope=entity&entity-bytes=1793007:*
```

[testmark]:# (test/hamt_in_directory_with_byte_range/entity/execution)
```
bafybeifrrglx2issn2had5rtstn3xltla6vxmpjfwfz7o3hapvkynh4zoq | Directory | /
bafybeie3mbyp7k77vrpiduaifyhdeqvusjn7qofzwtsp47yavyyb62z32y | HAMTShard | ↳ /Zigzagumptious
bafybeiggzqpxmfbve7sutrmcwrlwpx4tkno536d7qdgd6hnhxf74t7gzee | HAMTShard |   ↳ /Zigzagumptious [0]
bafybeigfwz54atwgnklb72rfqqn2a3ywoontgf3b3kekxwoxalptx7gc3e | HAMTShard |     ↳ /Zigzagumptious [0]
bafybeifr3w3eyq2oi6hxwbfoblor7s5pfvu3m4xyyzovxlk4g5xgslsqui | HAMTShard |     /Zigzagumptious [1]
bafybeigivdbrxmcixaqfap3rrs7ti5ycr7vj4xfbkjougq67k7ac5oz55a | HAMTShard |     /Zigzagumptious [2]
bafybeid3cny2p7fwt4znzm3wjncsesdk2rdze5fm5rzxjpbethy4657j6m | HAMTShard |     /Zigzagumptious [4]
bafybeidivwpxv37o6p4ton3xcpmg64pwk4zqlkuge7isafgsgjsvb6ce2u | HAMTShard |     /Zigzagumptious [6]
bafybeib5ptplpmtmoyif4lxt5erw5diivp6so4s57lvgfigs53d7zpc4uu | HAMTShard |     /Zigzagumptious [7]
bafybeiafmairlfkvgqgticndcs4uomkll4h5xotvnnsw2j7cx3rjwrbh7i | HAMTShard |     ↳ /Zigzagumptious [F]
bafybeifjo6xz3onvav6cnpjjuroa7vbzegoxgg5jn6smfvgfcpzwzdaipa | HAMTShard |     /Zigzagumptious [8]
bafybeied5si546vcp6klpngu77kftitzffdlxk5ajaytadc3p3ptr7tvam | HAMTShard |     /Zigzagumptious [9]
bafybeiar4b5hfriv2pmmbj7npemto6bev7sqkn4jpstwqtaudexpetpg4m | HAMTShard |     /Zigzagumptious [A]
bafybeifcekpohkm7qaczfwrrzcdz6j3ykwntawdnp7b7fjfech75vxpwf4 | HAMTShard |     ↳ /Zigzagumptious [B]
bafybeihnejxifhvlunhcswhghhrbues366h7o4xqp3ziyeicrdt5473za4 | HAMTShard |     /Zigzagumptious [C]
bafybeihlijmc2xyfmomw4fx53mlz3gpt6svgfu3vfokm4wmyd4dagfup24 | HAMTShard |     /Zigzagumptious [D]
bafybeihjbh7kptdfaoanrkzhdpx2jwjacg5ncdlcbbwqlum6vwqfga5fii | HAMTShard |     /Zigzagumptious [E]
bafybeidaz5aob6tdurpnuj2xeqsjkarqudtono6x2kgbzrzv46ugp3g4ju | HAMTShard |     /Zigzagumptious [F]
```

#### block

[testmark]:# (test/hamt_in_directory_with_byte_range/block/query)
```
/ipfs/bafybeifrrglx2issn2had5rtstn3xltla6vxmpjfwfz7o3hapvkynh4zoq/Zigzagumptious?dag-scope=block&entity-bytes=1793007:*
```

[testmark]:# (test/hamt_in_directory_with_byte_range/block/execution)
```
bafybeifrrglx2issn2had5rtstn3xltla6vxmpjfwfz7o3hapvkynh4zoq | Directory | /
bafybeie3mbyp7k77vrpiduaifyhdeqvusjn7qofzwtsp47yavyyb62z32y | HAMTShard | ↳ /Zigzagumptious
```
