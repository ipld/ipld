IPLD Design History
===================

This folder is for reference material that was part of the design history of IPLD.

Some of this material may represent works-in-progress; others have become historical.
(We do not attempt to differentiate these in advance, because it's only in retrospect
that it becomes clear whether an idea is going somewhere, or not!)
It's called "history", but it may also be the source of innovation!

We put content here for archival reference; but also, we have defined how we
organize content in this directory in such a way as to make it encourage
writing things down -- even (and especially) new ideas.

One trait that's unified across files within this directory is that we treat them
as (roughly) *append-only*.  This is because we want to use them as touchpoints
in discussion, and *not as the discussion format itself*.

Therefore, if you encounter a document in the history directory that you think
needs substantial iteration and new content, the way to move forward is:

- gather your ideas and start writing
- prepare to create a new file
- commit and share your notes, linking to existing content where you can.

If you don't have push access to this repository, or want to start writing and
sharing even earlier iterations of thoughts, Github Gists are also a great way
to handle this style of editing.
This directory can be thought of roughly like a collection of gists; we've just
gathered the ones especially relevant to the evolution of the design of IPLD.


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

You can find similar patterns used in other communities described here:

- https://github.com/golang/go/wiki/ExperienceReports


FAQ
---

### Why not use github issues?

Github issues are a form of "inbox": they represent things that need active response.

Github issues are a medium for discussion: that's useful, but in many ways they
don't lend themselves to closure, nor do they make it easy to create checkpoints
or periodic resummarizations to keep dicussions on track; and they definitely
are not themselves suitable to being treated as artifacts for reference.

There are several reasons we believe a directory of files to be superior to
github issues for our purposes:

- It's preferable to save github issues for what they're best at:
  being an "inbox" for topics that need active engagement.
- It's important and desirable that conversations reach halting states:
  we want to emphasize that reviving discussions that haven't seen any update
  for a long time is probably an unproductive flow.
  Rebooting a conversation is better done as a *new* conversation that has a
  clear start, an active resummarization of any past discussion, and some
  remarks abut what information is new or why the topic is present-tense.
- Mechanically, it's possible to link to specific headings in markdown in files in github,
  while it is *not* possible to do this to headings within in issue bodies.
  This seems minor, but results in substantial limitations in the ability to
  break things down in a github issue or reference parts later if the topic is large.

Overall: remember: We want to produce artifacts we can use as touchpoints
in discussion, and *not* be the discussion format itself.
That means github issues (and PRs) can still be a discussion funnel; this
does not conflict with the idea of the design history files as useful products.

### Closing github issues by migrating towards design history

We sometimes use the suggestion of moving a github issue towards design history.

If we want the "open" and "closed" states to have any meaning, it's critical
that things move to the closed state.  Attempting to do design processes
entirely in Github issues doesn't necessarily obstruct this -- but
observationally, in practice, *it does*:
design discussions in issues almost invariably receive protest when closed,
even if the issue has been open (sometimes for *years*!) without comment.

Yet closing issues is necessary to prevent the issue list from becoming
distracting or dysfunctional.  The result of long-term failure to close issues
is so disquieting it's often colloquially referred to as an "issue graveyard"!
What to do?

Sometimes, we try to navigate a middle road here by suggesting that key
content from an issue text be captured in a design history document.
This can be constructive in many situations:
Long running design thoughts may necessitate active response in some phases,
but may also undergo long periods of inactivity or a lack of direct focus;
the design history is intended to accurately represent this.

Turning a long github issue into a design history document can actually be
a form of forward progress itself: it's essentially asking for a small
effort in summarization of the discussion so far, and notably, it does
*not* require a final resolution on the subject, which makes it much easier
to simply acknowledge, merge, and move forward.

But see also
["Is this an archive of github issues?"](#is-this-an-archive-of-github-issues)
(spoiler: "no").

### Why not keep modifying a single file for each topic?

- It would make fresh starts a high-friction process;
- it would forget that enumerating, mapping, and then naming topics is
  itself part of the process;
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
Some of the most innovative ideas take time and iteration to reach maturity.

By making our process default to creating a new file (and by making the date
a part of the prefix rather than allowing topic-prefixes to be a temptation),
we drastically reduce the likelihood of these antipatterns affecting us.

(Also remember: we're in the design directory, and thus in this context our
policy is focused on providing a good environment for incubating design
documents and other work that's primarily in an "exploratory" phase.
When content moves towards a level of maturity where we begin to consider it
as a full "draft" stage rather than in "exploratory" phases, then different
sorts of policy become the most suitable way to handle changes.
At that point, we can start to consider using single files with updates --
moving towards a "draft" level generally means we've figured out the topics and
what to call them, which means most of the above issues are addressed! -- and
correspondingly, it's also probably time to give such content a new home
outside of the design history directory!)

### Is this an archive of github issues?

No.

Not everything that's in a github issue will (nor should) end up here.

Some text from github issues (especially issues that are from before we began
to use this directory and these organizational concepts) may end up copied
into the history directory, for archive and reference and linking.
This does not mean all text in github issues should be pasted into history files.

Github issues are a mechanism for discussion.  To restate a key purpose of the
design history directory: we want to use these documents as touchpoints
in discussion, and *not as the discussion format itself*.
It's fine for discussion to move through Github issues; it's the documents that
are focuses of discussions that we're most interested in giving a home here.
Sometimes key quotes of discussions may form a useful part of the artifact;
just as often, it can suffice to link to the discussion in its original context.

It's a nice bonus sometimes that text here can be grepped locally after cloning,
but that's not the driving *reason* the history directory was created.
If full archival export of github was what we wanted, we'd write a tool for that,
and the intent and the outcomes would be very different.

### Do I need to make a new file?

Yes.  (Generally.)

The vibe we're going for with this directory is that of a "lab notebook".
So, imagine how you treat a notebook: when the page is full, you just can't
add anymore; you have to start a new page.  If the old page is from some time
ago, you've probably accumulated a bunch of other pages of notes since then,
so the new page can't assume any reader has recently re-read the older page:
that means the new page has to reference the old page -- and, as much as
necessary, the new page has to make sure it has all the content necessary for
the new page to make sense on its own (even, yes, if that means some statements
end up replicated with only minor rephrasing or repositioning).

All of these are the kind of behaviors we're trying to replicate here, because
they correlate well with creating a good environment for developing ideas.
One of the practical benefits of this metaphorical "lab notebook" is that we can
easily "flip to a new page" and simply start writing notes -- and we can do
this without immediately applying the energy barrier of reconciling the new
note with every other note in the history of the notebook.  This is on purpose,
because it makes it easier to get new ideas written down and shared.
The idea of strongly suggesting re-summarizations for any topic that's gone
without attention for some period of time also naturally emerges from the
framing of creating a new document.  All of these things speak to why
periodically creating new files is a good idea.

### Does a file about a topic here mean it's dead?

Hard to say.  See following heading.

### Does a file about a topic here mean it's active?

The existence of a file in the design history directory signifies:

- we have thought about this subject; and,
- we think we have gathered enough thoughts to write down on this subject; and,
- if there's not a resolution at the end of the file, that's the truth.

Sometimes that means it's settled.  Sometimes it means it's settled "for now",
until time passes and new information becomes available.
Sometimes it means that an idea is good, but no one is currently allocating
time to carry it into a proof-of-concept, or a spec draft, or whatever it is
that would be needed next to advance that idea.
It depends.

The one clear thing: if something is discussed in design history, but hasn't
become part of a spec (or a draft of a spec) yet:
energy needs to be actively added to this situation in order to cause a change.
If you want change, you need to be that energy.
Write!

(Cautionary note: while "be that energy" is meant to read inspirationally,
most topics that have design history but haven't yet moved further can probably
be presumed to be tricky in some way.  "That energy" should probably take the
form of another round of exploration report (or some other kind of writeup
which targets design history) first.  Unless you're *really* sure this topic
has become "easy" now, for some reason!)
