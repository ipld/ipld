---
title: "Trustless Pathing"
eleventyNavigation:
  synopsys: "IPLD Pathing Semantics of the IPFS Trustless Gateway protocol"
---

Trustless Pathing
=================

The **[IPFS Trustless Gateway](https://specs.ipfs.tech/http-gateways/trustless-gateway/)** specification defines a protocol for sharing IPLD data that avoids the need to delegate trust to a peer serving data according to the specification. The Trustless Gateway protocol is primarily intended for use on top of HTTP and makes use of the [CAR](../car/) format to package IPLD blocks in a well-defined order.

This page is not a replacement for the Trustless Gateway specification and does not override any parts of it. It is dedicated to exploring and detailing edge cases involved in implementing the specification as it relates to pathing through IPLD data, including the interactions with UnixFS as an ADL over IPLD data. Test fixtures are presented as a method of exercising these various cases to ensure that an IPLD pathing / traversal implementation is correct.

---

{% import "listing.njk" as listing %}
{{ listing.childrenTableWithSynopsys(collections.all, page.url) }}
