
{% import "listing.njk" as listing %}
{{ listing.childrenTableWithSynopsys(collections.all, page.url) }}

---

About Reading These Fixtures
----------------------------

The fixtures in this directory are written using
the [`testmark`](https://github.com/warpfork/go-testmark#what-is-the-testmark-format) format.

(That's a fancy way of saying they're markdown, where the code blocks contain the fixture data.)

When viewing these rendered to the web, the content should be reasonably human-readable.
If you view the raw version of the page in its markdown format,
you'll see additional annotations around the code blocks which name each of them.

The names annotated on the code blocks containing the fixture data are machine-readable,
and the name patterns can be used to drive test tables programmatically.

Specifically, these name patterns will be seen:

- `{testname}/schema.ipldsch` -- the DSL form of the a schema for this fixture.
- `{testname}/schema.dmt.json` -- the JSON serialization of the DMT form of the same schema.
- `{testname}/match/{*}` -- data which is expected to match the schema.
- `{testname}/nomatch/{*}` -- data which is expected to *not* match the schema.

When testing whether data matches the schema or not,
if there's more than one type in the schema,
then the first type named in the schema is the one we're trying to start matching the root of the data up with.
