# Specification: DAG-JOSE

**Status: Descriptive - Draft**

JOSE is a stanard for signing and encrypting JSON objects. The various specifications for JOSE can be found in the [IETF datatracker](https://datatracker.ietf.org/wg/jose/documents/). 

DAG JOSE supports the full [IPLD Data Model](../data-model-layer/data-model.md).

## Format

The are two main ways to represent a JOSE node. As a JWS ([json web signature](https://datatracker.ietf.org/doc/rfc7515/?include_text=1)) and JWE ([json web encryption](https://datatracker.ietf.org/doc/rfc7516/?include_text=1)). These two formats  acts as the primitives in JOSE and can be used to create JWT and JWM objects. This specification describes how to encode JWS and JWE as an IPLD format.

### Serialization

Both JWS and JWE supports different serialization formats: `Compact Serialization`, `Flattened JSON Serialization`, and `General JSON Serialization`. The first two are more concise, but they only allow for one recipient. Therefore DAG JOSE always uses the `Compact Serialization` if there is just one recipient, and the `General JSON Serialization` if there are multiple recipients. This ensures maximum compatibility and compactness with minimum ambiguity. 

The implementation of the serialization function should accept all JOSE formats and convert them if necessary.

#### Ordering

Codec implementors **MUST** use the specified order of JOSE properties to ensure hashes consistently match for the same block data. Since JWS and JWE have a strict set of properties this is straight forward.

#### JWS

The top level object has two properties which should have the order: `payload` then `signatures`. The `signatures` property contains an array of signature elements. Within each of these elements there are three properties which should have the order: `protected`, `header`, then `signature`. Important to note here is that `protected` and `header` may be absent.

The content of the `payload`, `signature`, and `protected` properties are `base64url` encoded and therefore does not need any sorting. In contrast, the `header` property contains an unencoded JSON object and should sort object keys by their (UTF-8) encoded representation, i.e. with byte comparisons.

Finally all whitespace should be stripped. This produces the most compact and consistent representation which will ensure that two codecs producing the same data end up with matching block hashes.

##### JWS payload

In it's serialized format a JWS `payload` is encoded using `base64url`. The content of the payload can encode any arbitrary data. To distinguish different data formats a `cty` (Content Type) Header Parameter can be defined. However, it's not required in any way, so it's not something that can be relied upon. It's quite common that the content of the `payload` simply contains JSON. With DAG-JOSE the `payload` is extended to also support [DAG-JSON](./dag-json.md) (with *Bytes Kind* and *Link Kind*). 

This means that the `payload` can be represented in two different ways:

* `base64url` encoded ([DAG-JSON](./dag-json.md), or arbitrary data)
* Deserialized DAG-JSON

The serialization function should accept both of these input formats and convert them if necessary.

Note that the JWS signature happens over `ASCII(BASE64URL(UTF8(JWS Protected Header)) || '.' || BASE64URL(JWS Payload))` according to the [JWS specification](https://datatracker.ietf.org/doc/rfc7515/?include_text=1), so if the `payload` contains JSON it need to be ordered in a determinitic way for the signature to always be correct. The DAG-JOSE format should not prefer any specific ordering as different JWS implementations might have different preferences. If [DAG-JSON](./dag-json.md) is used this is however completely mitigated since it uses strict ordering.

##### Deserializing the payload

When the JWS is deserialized the `payload` should also be decoded using [DAG-JSON](./dag-json.md) if possible. If [DAG-JSON](./dag-json.md) is not detected, the `payload` should not be decoded. By decoding the payload, standard IPLD tools can be used to traverse the content and potential links within the signed data.

#### JWE

With JWE there are a few more properties that needs to be in the correct order: `protected`, `unprotected`, `iv`, `aad`, `ciphertext`, `tag`, then `recipients`. Within the `recipients` array each element should have the property order: `header` then `encrypted_key`. Important to note here is that only the `ciphertext` property is required, all other properties may be absent.

The content of the `protected`, `iv`, `aad`, `ciphertext`, `tag`, and `encrypted_key` properties are `base64url` encoded and therefore does not need any sorting. In contrast, the `unprotected` and `header` property contains unencoded JSON objects and should sort object keys by their (UTF-8) encoded representation, i.e. with byte comparisons.

Finally all whitespace should be stripped. This produces the most compact and consistent representation which will ensure that two codecs producing the same data end up with matching block hashes.

##### Decrypting the JWE

Similar to the `payload` of JWS, the decrypted data of a JWE may be encoded as [DAG-JSON](./dag-json.md). The implementation of the decryption function should account for this if neccessary to allow the data be interpreted as an IPLD dag node. 

