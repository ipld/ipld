# Ethereum as an IPLD Data Structure

Within these documents, schemas are grouped by their serialized blocks.
Other than those types listed in "Basic Types" and "Crypto Types", the top-level schema type in each grouping of schema
types in a code block represents a data structure that is serialized into a single IPLD block with its own Link (CID).

There are some state data structures that are repeats of the same form: a modified merkle patricia trie node.
They are not de-duplicated here for clarity to demonstrate the different purposes and contents of those data structures.

For more information about the IPLD Schema language, see the [specification](https://specs.ipld.io/schemas/).

## Data Structure Descriptions

* [Ethereum Data Structures **Basic Types**](basic_types.md)
* [Ethereum **Crypto Types**](crypto_types.md)
* [Ethereum **Chain** Data Structures](chain.md)
* [Ethereum **State** Data Structures](state.md)


## Questions (remove later)
1) Is there a tool to autogenerate the Go types from these ipld schemas?
   * Cant find go-ipld-prime gengo
2) Is there a tool to verify that our schemas are correct?
