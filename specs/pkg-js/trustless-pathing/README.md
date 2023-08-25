# Trustless Pathing Fixtures for JS

```js
import {
  unixfs20mVarietyCases,
  unixfs20mVarietyCar
} from '@ipld/specs/trustless-pathing/unixfs_20m_variety'

const testCases = unixfs20mVarietyCases()
const carUrl = unixfs20mVarietyCar()

// load the CAR using @ipld/car streamed from `carUrl` as a file
// use `testCases` to run the tests
```

`unixfs20mVarietyCases()` returns an array of test cases that look like this:

```ts
class TestCase {
    name: string
    root: CID
    path: string
    scope: string
    duplicates: boolean
    byteRange: string
    expectedCids: CID[]
}
```

`TestCase#asQuery()` will print a Trustless Gateway style URL string representing the case, e.g.:

```js
console.log(tc.asQuery())
// -> /ipfs/bafybeifrrglx2issn2had5rtstn3xltla6vxmpjfwfz7o3hapvkynh4zoq/clippet.txt?dag-scope=entity&entity-bytes=0:256144
```
