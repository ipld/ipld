---
title: ADL Dynamic Loading
navTitle: Dynamic Loading
eleventyNavigation:
  order: 50
  synopsys: Given that ADLs are a form of plugin, and contain code, how do we load them?  This page discusses options.
---

Advanced Data Layout Dynamic Loading
====================================

To make ADLs run, and process your data, there are two problems that need solving:

1. You have to decide whether to use an ADL on that data, and decide which ADL to use!
	- There's a separate page about this: we call it [the Signalling problem](../signalling/).
2. You have to have some code that implements that ADL!
	- That's what this page is about.

:::todo
- if you used the direct "action route" through signalling, this is a gimme
- your library should probably have some sort of registry, otherwise
- language specific "rockets" are common today
- we hope to have wasm implementations and a common plugin API shared across languages someday -- but that day is not today (developers welcome)
:::

### not every application that processes IPLD data will necessarily support your ADLs

:::todo
- "running foreign code on somebody else's budget" is not something that happens at unbounded scale on public services
- availability in many languages/libraries, and authorship/maint effort implied -- it's better to use community-common things if you can
  - similar to codecs in this regard
- reminder that schemas *are* usable on public infra (like e.g. on hosted IPLD Explorer tools), because they have predictable computation cost envelopes -- reminder to prefer doing things with a schema rather than an ADL if you can; don't reach for ADLs just because you want a funky fresh custom format
:::

See [Open Research Problems: ADL autoexecution](/design/open-research/ADL-autoexecution/).
