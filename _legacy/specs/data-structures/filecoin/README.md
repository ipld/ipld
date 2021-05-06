# Filecoin as an IPLD Data Structure

Within these documents, schemas are grouped by their serialized blocks. Other than those types listed in "Basic Types" and "Crypto Types", each grouping of schema types in a code block represents a data structure that is serialized into a single IPLD block with its own Link (CID).

Advanced Data Layouts (ADLs) are shown in their expanded form here, as the data appears on-block. Their logical forms for programmatic purposes are `Map` for the HAMT and `List` for the AMT.

There are some data structures that are repeats of the same forms, primarily the AMT and HAMTs that share the same data types. They are not de-duplicated here for clarity to demonstrate the different purposes of those data structures.

For more information about the IPLD Schema language, see the [specificaiton](https://specs.ipld.io/schemas/).

## Data Structure Descriptions

 * [Filecoin Data Structures **Basic Types**](basic_types.md)
 * [Filecoin **Main Chain** Data Structures](chain.md)
 * [Filecoin **Messages** Data Structures](messages.md)
 * [Filecoin **Actor State** Data Structures](state.md)
