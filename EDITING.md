Editing
=======

Editing specifications is hard!  Here are some partial guidelines and rules-of-thumb.

- [Communicate!](#communicate)
- [Make sure your change fits](#make-sure-your-change-fits)
  - ... especially if it's a [semantic change](#semantic-changes)
- [Use Exploration Reports](#use-exploration-reports)
- Heed the [stylistic preferences](#stylistic-preferences)


Communicate!
------------

There's lots of ways to communicate with the IPLD team and community.

- Chat (all of these are federated; pick any form of client you like):
  - IRC: [#ipld on Freenode](irc://irc.freenode.net/ipld) ([webchat](https://webchat.freenode.net/?channels=ipld))
  - Matrix: https://matrix.to/#/#freenode_#ipld:matrix.org
- All our development is in the open on GitHub:
  - This repo is https://github.com/ipld/specs/
  - Other work exists in other repos the same org: https://github.com/ipld/
  - GitHub issues and Pull Requests work just fine.
- We have a (mostly) weekly meeting on Zoom: https://github.com/ipld/team-mgmt#weekly-call

If you'd like to discuss something before proposing a change,
there's lots of venues that can host a conversation.

Escalating in levels of formality can be a good idea:
e.g., ask questions on IRC/Matrix/Discord or in an issue first;
then work on PRs later if an idea seems worth pursuing.


Make sure your change fits
--------------------------

### Textual changes

Small textual changes can be made by Pull Request easily.  Go for it!

(Since the amount of effort involved in creating and reviewing this kind of
change is minimal for both sides, it's easier to just send it than to ask permission.)

### Semantic changes

_Editing specifications is **really** hard!_

We welcome everyone's effort in refining the specs to be the best they can be.
At the same time, be warned that it's a serious investment of energy!
As shepherds of what we hope is a stable process, we have to be careful and
deliberate when considering what changes to accept.

A lot of decisions in specifications involve looking out for long-range effects
and non-obvious implications.  We try to document these considerations,
but also in many documents try to strike a balance with brevity.
Hitting a perfect stride with this is arguably objectively not possible;
it's pretty much guaranteed that in your reading, you'll encounter a document
that doesn't sufficiently explain all the "why isn't this different" branches.

Specs deserve an extra long think before proposing changes.
[Chesterton's fence](https://en.wikipedia.org/wiki/Wikipedia:Chesterton%27s_fence)
applies in _spades_ to specifications.

Some common reasons things may be less tenable than they first appear:

- Does this feature interact with other features in complex ways?
- Does this presence of this feature with other features make the system overall
  more difficult to reason about?
- Does adding this feature create an undue burden to library implementers?
- Does this feature interact exceptionally poorly with any major programming languages?
- Does this feature interact exceptionally poorly with any common serialization formats?
  (Would it shift any common formats to be more 'incomplete', e.g. unable to
  fully represent data from the Data Model or from other formats?)
- Does this feature introduce potentially unbounded or difficult-to-estimate
  time or memory costs when implemented?
- Does this feature make canonicalization or hashing of data exceptionally
  more difficult, confusing, or error-prone?
- Does this change add too much verbosity to a detail that we don't want to emphasize?
- Does this change remove explicitness and reduce focus from something we _do want_ to draw attention to?

If you've considered all these things, and still think that you've got a good
change in mind, then thank you for the depth of your thoughts so far!
Go ahead and either create an issue on github, or hoist a PR, or move forward
by writing up an [exploration report](#use-exploration-reports) to help
hone further discussion, or, simply find us and start a conversation on
the `#ipld` channel on freenode IRC!


Use Exploration Reports
-----------------------

One way to make progress in designing something or discussing a tricky issue
is to make an "exploration report".

The key point of an "exploration report" is to document some thinking
and collate notes about a complex topic, *without* jumping straight to a
proposed solution.  This is useful because we can readily preserve the notes,
even if the idea in question doesn't pan out or can't be completed in one joust.

We've got a bunch of these -- and more description of what that concept is --
in the [`./design/history/exploration-reports`](./design/history/exploration-reports)
directory.  You can also make exploration reports as gists, or other kinds of
documents, or even issues in github; whatever creates the least burden is best.

Exploration reports are almost guaranteed to be a good idea if proposing
any kind of [semantic change](#semantic-changes).


Stylistic Preferences
---------------------

### Headings

Be careful with headings -- they should look good as links.
Being able to link deeply into a spec document is every bit as important
as being able to read it from top to bottom.

Be very careful not to have headings that are repeated; this makes linking to that heading impossible.
(If you feel that repeated headings are still visually good formating,
consider if a `"**bold text**: subject details"` approach fits.
Because this doesn't try to produce links, it's not a problem to repeat the bold component.
But, by the other side of the same coin, _it can't be linked to_; be mindful of the concession.)

Don't put redundant information or parenthetical remarks in a heading;
it rarely comes out legible in the resulting links.
For example, "#block-layer" is preferable to "#block-layer-layer-0".
Clarifications and secondary terminology variations are better expressed in the body text
than jammed into the heading and adding tongue-twisters to links.

### Linking

The preferred linking format depends on what you're linking to and how far away it is.
In general, the aim is to make editing easier in the long run.

- The preferred link syntax depends on how distant the target is.
  - Links within a document should use bare hashtags -- `[text](#heading)`.
  - Links to documents in the same folder should use relative paths -- `[text](./file.md#heading)`.
  - Links to documents elsewhere in the repo should use rooted paths -- `[text](/full/path.md#heading)`.
    (This makes repo-wide reorganizations and searching easier; a series of "../../.." can be inconvenient to work with, and are difficult to verify by eye.)
  - Links to content outside the repo should of course use the full URL.
- Links should include the file extension for '.md' files.
  (It will be stripped by our site publish tooling, but is necessary for links to work well within github's markdown processing.)
- When linking to source code: use the full commit hash!  (Github has a handy `'y'` shortcut for this; use it!)
  - If linking to specific line numbers, a full commit hash is an absolute requirement.  It is otherwise far too easy to have "working" but semantically invalid links.
  - If aiming to whole packages or high level documents in other repos, it _may_ be viable to link to the master branch.  But be judicious.

### Todos

Some documents have "TODO"s within them.

This isn't necessarily something to emulate when submitting new changes.
Documentation that's done is much better than documentation that's to-do!

Whether or not a "TODO" is acceptable in a PR depends:

- How critical is it?
  - if it's a "TODO" in critical parts of system definition?  No.  (Consider re-writing what you're working on as an [exploration report](#use-exploration-reports) instead!)
  - If it's a "TODO" stating that better description is still wanted?  Maybe.  If it's useful in context to state that, and a legitimate open ask to the community at large when they read the document, we can consider merging it.
- How sure are we it can be addressed?
  - If it's coming from someone with known long-term investment in the project?  Maybe; we can have a reasonable expectation the same person will either come back to finish it, or at least has a good idea about whether or not it will be possible for other contributors to fill the missing piece.
  - If it's coming from someone making their first contributions?  Unfortunately, we have to set a higher bar here.  It's harder to know whether follow-up will come, and so its more risky to bet that it will.

None of these factors have a clear yes-or-no answer (nor are they intended to),
so, ultimately, expect this to be resolved by discussion during review.
By default?  Fewer "TODO"s are better: avoid introducing them if you can.

### Line breaks

Linebreaks are non-semantic in markdown, so where to break lines is up to you.
We don't enforce any strict line-length limit.

As a general rule, edits should aim to match the style in their vicinity,
and where possible avoid cascading re-flows.
Do what makes "git diff" more likely to be readable, in other words.

Some documents use a "break line at end of sentence" heuristic.
You might give that a shot and see how it feels.
(This paragraph in this document is an example!)
