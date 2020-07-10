# Thinking in data structures

You're already using many data structures in your programs. Here's
and example.

```js
const person = {
  name: 'Mikeal Rogers',
  github: 'mikeal',
  twitter: '@mikeal'
}
```

Let's think about what this really is.

We've taken some strings and we've assigned them to properties.
If we didn't assign them to properties, how would we know what they mean?
We only know what the values mean because we've assigned them to
properties that mean something.

What would it mean if we were to assign a value of `null` to the "twitter"
property? It would mean that person isn't on twitter! The types we use
for the values have meaning too.

If you pass this object to another function, it can tell who this person is
because it contains references to the information about that person. In IPLD,
we would call `person` a **node**, and the properties that person contains references
to would also be **nodes**. If we're talking about everything this person references,
and everything those references might reference, we would call that the person's **graph**.

Now let's build a data structure that captures some relationships between
nodes.

```js
const earth = []
const pluto = []

const index = (person, planet) => {
  planet.push(person)
}

index({ name: 'Mikeal Rogers' }, earth)
index({ name: 'Eric Myhre' }, earth)
index({ name: 'Volker Mische' }, earth)
index({ name: 'Emory' }, pluto)
index({ name: 'Oglethorpe'}, pluto)

const galaxy = { earth, pluto }
```

Let's explore our graph of the galaxy. It has two properties, one for each planet
we've decided to index. If I want to see who is on planet earth, I check that property.

I know that Mikeal, Eric, and Volker are all on the same planet not because of a property
*inside* their graph but because of the **structure** of the graph that linked to them.

There's a huge world of data structures out there, some of which you may be familiar with
and some that you may not be familiar with yet. But something you need to keep in mind
as you learn IPLD is that how you *arrive* at information is often as important, if not more
important, than the information you arrive at.

## Linking

Depending on what language you program in, you may be familiar with the concept of a pointer.
If you aren't, it's just a way to reference data in one place while it lives in another place.
URLs are like pointers for The Web, they let you put a reference on one web page to a web page
that could be on the other side of the world.

In IPLD we use a standard called [CID]() for linking data together. CID's act like pointers **and**
they act like URLs. They let us safely reference data that might be on the other side of the
internet, or locally in memory, or anywhere else. This is how we decentralize data structures.

```js
import Block from '@ipld/block/defaults.js'

const example = async () => {
  const person = {
    name: 'Mikeal Rogers',
    github: 'mikeal',
    twitter: '@mikeal'
  }
  const block = Block.encoder(person, 'json')
  const cid = await block.cid()
  console.log(cid.toString())
}
example()
```
Prints
```
bagaaierakbgholyvqnp2kjpr5ep6yh6u4uhop7cv7wvabydbctksletsilkq
```


