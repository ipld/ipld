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

## Addressing

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

This is the **address** (CID) of this data.

The first thing to notice about this code is that we didn't *assign* a key to this data. We
encoded the data as `'json'` and then we got the data's address.

A CID tells us two things, it tells us how the data was encoded (`json`) and it tells us the
**hash** of the data. With this identifier, I can store this data anywhere on the internet.
I can then retreive this data from anyone on the internet **without trusting them** 😱

Let's look back at a few things we did.

```js
const block = Block.encoder(person, 'json')
```

We encoded this data using JSON, now it has been serialized to a binary representation we
can store and/or send to someone.

```js
const cid = await block.cid()
```

Then we're going to do a cryptographic computation on that serialized binary that will give us
a **globally unique** identifier for that binary. We return a CID that tells us "this is JSON data
that matches this **hash**."

When can now ask any random device on the internet "do you have this CID?"

If they say "yes, here's that data" I can receive the data without needing to trust them
because I'm going to compute the hash of that data after I receive it and if it doesn't
match the CID's hash I know they're lying.

Once I have the binary data that matches the CID, I know that I need to decode this data with JSON
because that's also in the CID. When one person sends another person data this way, the in-memory
representations of these data structures are identical on each machine.

It's worth taking a break and considering what this means.

Hashes let anyone exchange **data** around the internet. CID's let anyone exchange **data structures**
around the internet.

# Linking

Here's where things get **really** interesting.

```js
const createPerson = name => Block.encoder({ name }, 'json')

const createGalaxy = async () => {
  const mikeal = await createPerson('Mikeal Rogers').cid()
  const eric = await createPerson('Eric Myhre').cid()
  const volker = await createPerson('Volker Mische').cid()
  const elon = await createPerson('Elon Musk').cid()

  const galaxy = {
    americans: [ eric, mikeal, elon ],
    inAmerica: [ mikeal ],
    onEarth: [ mikeal, eric, volker ],
    onMars: [ elon ]
  }
  const block = Block.encoder(galaxy, 'dag-cbor')
  const cid = await block.cid()
  console.log(cid.toString())
}
createGalaxy()
```

Now we have a data structure made of **blocks**. We call each hashed piece of data a **block**.
A block could have one, or many nodes. It decode to into all kinds of structures and, most importantly,
it could **link** to other **blocks**.

In the above example, we created a **block** for each person. We then use the CID for each **block**
to reference every person in our index of the galaxy. Note that we can't use JSON to encode the index
of the galaxy and have to use `'dag-cbor'`. JSON has a strictly defined set of types and our Link
data type (CID) isn't in that set, so we use a codec the IPLD team wrote called `dag-cbor` because
it knows how to represent links from any CID.

Let's pause for a moment and talk about what this means. CIDs can be encoded for any existing serialization
or **any future** serialization format. More importantly, a data structure can freely create link
*between* these serializations.

Now, let's ask the internet for this index of the galaxy and pause again.

Before we ask the internet for the the block data of all these people, what can we say with **only**
this index data.

What can we learn from just the hashes of the data?

```js
{ americans: [ Hash(0003), Hash(0001), Hash(0004) ],
  inAmerica: [ Hash(0001)],
  onEarth: [ Hash(0001), Hash(0002), Hash(0003) ],
  onMars: [ Hash(0004) ]
}
```

Wow, quite a lot actually:

* There is 1 person in America and they are an American.
* There are 2 Americans that are not in America.
* The person on Mars is an American.
* I know how many people are in each place.
* There are only 4 unique people in this index.

This is a limited index, with a very limited set, and none of the links have been traversed
but we know quite a lot already.


