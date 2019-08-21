IPLD Design History
===================

This folder is for reference material that was part of the design history of IPLD.

Some of this material may represent works-in-progress; others have become historical.
(We do not attempt to differentiate these in advance, because it's only in retrospect
that it becomes clear whether an idea is going somewhere, or not!)

One trait that's unified across files within this directory is that we treat them
as (roughly) *append-only*.  This is because we want to use them as touchpoints
in discussion, and *not as the discussion format itself*.

Therefore, if you encounter a document in the history directory that you think
needs substantial iteration and new content, the way to move forward is:

TODO bulletpoints



Specific forms of History
-------------------------

### Exploration Reports

Exploration Reports are one general kind of document we use in order to
gather thoughts, share early drafts of concepts, and begin to solicit feedback.

Exploration Reports don't have a *strict* format, just general intentions.
Part of the purpose of exploration reports is to *make writing possible*
and lower the barriers to entry to get something written and sharable;
overly strict formats and formalizations would be antithetical to this purpose.

Exploration Reports typically have a *single author*.  The intent behind this
is to encourage writing things down and forming bodies of thought which
we can reference in the future -- without putting any burdens of
consensus-seeking up-front, which we observe can become a barrier that makes
sharing and recording early design processes harder.
Correspondingly, Exploration Reports don't need to reach for full solutions,
which means as long as the report covers reasonably interesting ground,
it should often be possible to merge them with minimal turnaround time.


FAQ
---

### Why not use github issues?

There are several reasons we believe a directory of files to be superior to
github issues for our purposes:

- It's preferable to save github issues for real issues that need active engagement;
- it's possible to link to specific headings in markdown in files in github,
  while it is *not* possible to do this to headings within in issue bodies;
- and it's important and desirable that conversations reach halting states;
  we want to emphasize that "thread necros" are *bad*, and rebooting a
  conversation is better done as a *new* conversation that to has a clear start
  and an active resummarization of why they're present-tense.

Github issues are a form of "inbox".
They represent things that need active response.
If we want the "open" and "closed" states to have any meaning, it's critical
that things move to the closed state.  Putting design history in issues doesn't
necessarily obstruct this -- but observationally, in practice, *it does*:
design discussions in issues almost invariably recieve protest when closed.
Yet closing issues is necessary to prevent them from becoming a graveyard
full of ghastly vuvuzelas.  What to do?  TODO FINISH

Long running design thoughts may necessitate active response in some phases,
but may also undergo long periods of inactivity.

### Why not keep modifying a single file for each topic?

- It would make fresh starts a high-friction process;
- it would forget that enumerating the topics is itself part of the process;
- and it would make it more difficult to incubate more than one parallel
  train of thought without forcing premature reconciliation.

Good design processes necessitate iterations, and occasionally, fresh starts.
While a fresh start may reference prior thoughts, it's important that a
fresh start is not burdened by the need to be phrased as a refactor to
existing content; if it has that burden, it's not much a fresh start!

Another part of the problem is the idea of "file for each topic" itself:
requiring files be named this way would presume that we know -- in advance! --
both _what the topic **is**,_ and that we have consensus on _what to call it_.
Sometimes (or even often times), this simply isn't true: part of the process
of design is _figuring out_ which things are related and which things... aren't.
Similarly, reaching consensus on what names are most suited to communicate a
concept is often a process in and of itself.
Therefore, it's important that we set ourselves up to be able to start writing
and sharing ideas *before* those phases of the design and reconciliation are
complete: and that means writing before having enumerated and named the topic.
(Especially, documents about use case discovery -- and thus many kinds of
"exploration report" document -- tend to have this nature.)

Even further, we want to carry out our design process in such a way that making
one proposal or one presentation of considerations should not create obstructions
to making other proposals or observations in parallel.
Forcing convergence too early means ideas that may not yet be fully formed would
be forced to battle to the death.  That's not always constructive.
Some of the best ideas take time and iteration to reach maturity.

By making our process default to creating a new file (and by making the date
a part of the prefix rather than allowing topic-prefixes to be a temptation),
we drastically reduce the likelihood of these antipatterns affecting us.

(Also remember: all this is talking about our policy towards design documents
and work that's primarily in an "exploratory" phase.
When content moves towards a level of maturity where we begin to consider it
as a full "draft" stage rather than in "exploratory" phases, then the best way
to handle things changes.  At that point, we may start using single files --
moving towards a "draft" level generally means we've figured out the topics and
what to call them, which means most of the above issues are addressed! -- and
may also give such content a new home outside of the design history directory.)

### Is this an archive of github issues?

No.

Not everything that's in a github issue will (nor should) end up here.

Some text from github issues (especially issues that are from before we began
to use this directory and these organizational concepts) may end up copied
into the history directory, for archive and reference and linking.
This does not mean all text in github issues should be pasted into history files.

Github issues are a mechanism for discussion.  To restate a key purpose of the
history directory from earlier: we want to use these documents as touchpoints
in discussion, and *not as the discussion format itself*.  It's fine for
discussion to move through Github issues; it's the documents that are focuses
of discussions that we're most interested in giving a home here.

It's a nice bonus sometimes that text here can be grepped locally after cloning,
but that's not the driving *reason* the history directory was created.
If full archival export of github was what we wanted, we'd write a tool for that,
and the intent and the outcomes would be very different.
