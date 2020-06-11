# Specification: DAG-JOSE

**Status: Descriptive - Draft**

JOSE is a stanard for signing and encrypting JSON objects. The various specifications for JOSE can be found in the [IETF datatracker](https://datatracker.ietf.org/wg/jose/documents/). 

DAG JOSE supports the full [IPLD Data Model](../data-model-layer/data-model.md).

## Format

The are two main ways to represent a JOSE node. As a JWS ([json web signature](https://datatracker.ietf.org/doc/rfc7515/?include_text=1)) and JWE ([json web encryption](https://datatracker.ietf.org/doc/rfc7516/?include_text=1)). These two formats  acts as the primitives in JOSE and can be used to create JWT and JWM objects. This specification describes how to encode JWS and JWE as an IPLD format.

### Serialization

Both JWS and JWE supports different serialization formats: `Compact Serialization`, `Flattened JSON Serialization`, and `General JSON Serialization`. The first two are more concise, but they only allow for one recipient. Therefore DAG JOSE always uses the General Serialization format for maximum compatibility and minimum ambiguity. 

#### Ordering

Codec implementors **MUST** use the specified order of JOSE properties to ensure hashes consistently match for the same block data. Since JWS and JWE have a strict set of properties this is straight forward.

##### JWS

The top level object has two properties which should have the order: `payload` then `signatures`. The `signatures` property contains an array of signature elements. Within each of these elements there are three properties which should have the order: `protected`, `header`, then `signature`. Important to note here is that `protected` and `header` may be absent.

The content of the `payload`, `signature`, and `protected` properties are `base64url` encoded and therefore does not need any sorting. In contrast, the `header` property contains an unencoded JSON object and should sort object keys by their (UTF-8) encoded representation, i.e. with byte comparisons.

Finally all whitespace should be stripped. This produces the most compact and consistent representation which will ensure that two codecs producing the same data end up with matching block hashes.

##### Deserializing JWS

In it's serialized format a JWS `payload` is encoded using `base64url`. However, this payload may contain IPLD links. Therefore the decoded content of `payload` uses the same approach as [DAG-JSON](./dag-json.md) to support *Bytes Kind* and *Link Kind*. When the DAG-JOSE codec decodes a JWS it should also decode the payload.

##### JWE

With JWE there are a few more properties that needs to be in the correct order: `protected`, `unprotected`, `iv`, `aad`, `ciphertext`, `tag`, then `recipients`. Within the `recipients` array each element should have the property order: `header` then `encrypted_key`. Important to note here is that only the `ciphertext` property is required, all other properties may be absent.

The content of the `protected`, `iv`, `aad`, `ciphertext`, `tag`, and `encrypted_key` properties are `base64url` encoded and therefore does not need any sorting. In contrast, the `unprotected` and `header` property contains unencoded JSON objects and should sort object keys by their (UTF-8) encoded representation, i.e. with byte comparisons.

Finally all whitespace should be stripped. This produces the most compact and consistent representation which will ensure that two codecs producing the same data end up with matching block hashes.

##### Decrypting JWE

Decryption is not directly relevant to the IPLD codec. However, as a useful sidenote it's important to consider that the decrypted message, similar to the decoded JWS payload, may contain *Bytes Kind* and *Link Kind* data. Decrypted data can thus be interpreted as an IPLD dag node.