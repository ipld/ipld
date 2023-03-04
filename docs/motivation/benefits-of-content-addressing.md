---
title: Benefits of Content Addressing
---

Benefits of Content Addressing
------------------------------

IPLD is based on a concept called "Content Addressing" which is described in other articles.
This page goes over some of the benefits that IPLD gains by making use of content addressing as part of its core.

## Immutability

Since data is addressed by its content, it is also immutable by default.
This means that data cannot be changed unless you create a new piece of data from an original, which will also result in a new "address" to it.
For example, if you'd like to keep track of changes, you can build a DAG that links to earlier versions of a piece of data.

## De-Duplication and Cacheability

A given block is only stored once even if it is part of many independent DAGs thanks to the system being able to safely assume its CID will always reference the same data.
This leads to reduced resource consumption (storage, bandwidth, memory).
To make the most use of this functionality, applications should try to model data into chunks that are reusable.

Since data is immutable, in can be cached without worrying about keeping it in sync with anyone else.
Think of git, fetch operations are fast because it only fetches changes.

## Authentication/Validation

A block of data can always be authenticated or validated for correctness by checking its hash.
Even one bit difference in the data will result in a different hash allowing applications to detect bad data.
Of particular interest is a client's ability to validate the data which eliminates the need to trust the server.
Think of git, data is never corrupted because it is validated with hashes.

## Identity

Data is self identifying; no need for externally generated identifiers (like database autoincrement fields).
Think of git; workflows revolve around hashes to underlying commits.
This can be important for fields such as healthcare informatics where it's important that data cannot be tampered with.

## Disconnected / Offline-First

A disconnected or offline first approach to data management is a natural fit for content addressable data by leveraging CRDTs.
Think of git, developers work offline all the time and synchronize back to master when they are ready.

By treating your data store as disconnected/offline first, you can achieve unlimited scalability of data ingestion.
Getting an entire view of the data can be done by merging trees or federated queries.
Think of git - millions of developers are modifying repositories daily and there is no scalability issue.
