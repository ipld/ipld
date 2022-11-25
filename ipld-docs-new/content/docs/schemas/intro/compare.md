---
title: "Comparing Schemas"
weight: 27
description: "Comparing IPLD Schemas to other Schema languages."
---

## Overview

### Structural typing

IPLD Schemas are based on _structural_ typing (as distinct from _nominative_ typing).

This means that the schema information isn't embedded in the data itself.
Therefore, IPLD Schemas can describe data even if the data was produced without schemas.
And different schemas could be used to validate and view the same data, in different ways!

### No direct coupling to wire format

### Fine control over serial transformation

## Schemas vs ADLs

IPLD Schemas are designed to be computationally predictable.
They're much more confined than ADLs.
(ADLs have a "plugin"-like structure: there's no real limit on their complexity.)

As a result, IPLD Schemas are relatively safe to use even in constrained computing environments
or other scenarios where predictability matters.
By contrast, with ADLs, the ADL implementation would need auditing -- and each ADL would need its own audit.

Schemas are bi-directional.  You can think of schemas like a "lens" for data.
ADLs are sometimes bi-directional, but this is at the whim of the implementor.
