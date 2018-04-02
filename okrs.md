# Quarterly Objectives and Key Results

We try to frame our ongoing work using a process based on quarterly Objectives and Key Results (OKRs). Objectives reflect outcomes that are challenging, but realistic. Results are tangible and measurable.

## 2018 Q2

> Work in Progress

### Implement updated IPLD Format spec

This relates to https://github.com/ipld/interface-ipld-format/pull/22

 - `P0` - @stebalien (?) finish deciding on the primitives: https://github.com/ipld/specs/issues/56
 - `PX` - @vmx - Finish updating the IPLD format spec
 - `PX` - @vmx - Have proper JSON serialization for JavaScript formats (Bitcoin, CBOR, DAG-PB, Ethereum, Git, Zcash)
 - `PX` - OWNER - Have proper JSON serialization for Go formats (Bitcoin, CBOR, DAG-PB, Ethereum, Git, Zcash)
 - `PX` - @vmx - Implement the rest of the missing pieces of the spec in JavaScript
 - `PX` - OWNER - Implement the rest of the missing pieces of the spec in Go

### Search on IPLD

 - `PX` - @vmx - Capturing three use cases and examples in a document
 - `PX` - @vmx - Do a prototype with Noise supporting those use cases

### Design and implement GraphSync, to improve performance of Apps

 - `PX` - @vmx - Have benchmarks that demonstrate GraphSync perf improvement over original Bitswap (in js and go)
 - `PX` - @vmx - The GraphSync protocol has a designdoc that captures all constraints
 - `PX` - @vmx - The GraphSync protocol has a v0 spec
 - `PX` - @vmx - The GraphSync protocol has a v0 implementation in js
 - `PX` - OWNER - The GraphSync protocol has a v0 implementation in go
 - `PX` - OWNER - GraphSync learns to distribute IPLD paths
 - `PX` - OWNER - GraphSync learns to distribute IPLD paths with wildcards (basic wildcard selectors)
 - `PX` - OWNER - GraphSync learns to distribute IPLD Selectors (full)
 
### Work towards IPLD-next

 - `P1` - @stebalien - Design/find an IPLD schema language (possibly use rust?).
 - `P1` - @stebalien - Finish design and implement IPLD schema serialization language.

## 2018 Q1

Find the OKRs for 2018 Q1 at the [IPFS OKRs Spreadsheet](https://docs.google.com/spreadsheets/d/1Lfd91hi3nFlLRS1r-FHvK2ip2Ll6ukraufCgepw43bw)
