# Concept: Multihash

Multihash is hash format that is not specific to a single hashing algorithm.

A multihash describes the algorithm used for the hash as well as the hash value.

```
+-----------+----------------------------+
| Hash Type | Hash Value                 |
+-----------+----------------------------+
```

SHA-256 example.

```
+---------+------------------------------------------------------------------+
| SHA-256 | 2413fb3709b05939f04cf2e92f7d0897fc2596f9ad0b8a9ea855c7bfebaae892 |
+---------+------------------------------------------------------------------+
```

Note: these examples are simplifications of the concepts. For a complete description visit the [project and its specs](https://github.com/multiformats/multihash).
