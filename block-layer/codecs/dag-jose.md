# Specification: DAG-JOSE

**Status: Descriptive - Draft**

JOSE is a stanard for signing and encrypting JSON objects. The various specifications for JOSE can be found in the [IETF datatracker](https://datatracker.ietf.org/wg/jose/documents/). 

DAG JOSE supports the full [IPLD Data Model](../data-model-layer/data-model.md) (within the payload).

## Format

The are two main ways to represent a JOSE object. As a JWS ([json web signature](https://datatracker.ietf.org/doc/rfc7515/?include_text=1)) and JWE ([json web encryption](https://datatracker.ietf.org/doc/rfc7516/?include_text=1)). These two formats  acts as the primitives in JOSE and can be used to create JWT and JWM objects etc. This specification describes how to encode JWS and JWE as an IPLD format.

### Representation

The layout of a decoded JOSE object is described by the IPLD schema defined below. We will refer to this layout as the `Decoded Representation`. 

```ipldsch
type Signature struct {
  header optional {String:Any}
  protected optional {String:Any}
  signature Bytes
}

type JWS struct {
  payload Any
  signatures [Signature]
}

type Recipient struct {
  encrypted_key optional Bytes
  header optional {String:Any}
}

type JWE struct {
  aad optional Bytes
  ciphertext Bytes
  iv optional Bytes
  protected optional {String:Any}
  recipients [Recipient]
  tag optional Bytes
  unprotected optional {String:Any}
}

type JOSE union {
  | JWS jws
  | JWE jwe
} representation kinded
```

### Serialization

Both JWS and JWE supports three different serialization formats: `Compact Serialization`, `Flattened JSON Serialization`, and `General JSON Serialization`. The first two are more concise, but they only allow for one recipient. Therefore DAG JOSE always uses the `General Serialization` which ensures maximum compatibility with minimum ambiguity. 

The implementation of the serialization function should accept all JOSE formats including the `Decoded Representation` and convert them if necessary. 

#### General JSON Serialization

Below the  `General JSON Serialization` can be observed. Note that all data represented as `String` here is data that has been encoded using `base64url`. Converting `Compact Serialization` and `Flattened JSON Serialization` to the general serialization is trivial.

```ipldsch
type GeneralSignature struct {
  header optional {String:Any}
  protected optional String
  signature String
}

type GeneralJWS struct {
  payload String
  signatures [GeneralSignature]
}

type GeneralRecipient struct {
  encrypted_key optional String
  header optional {String:Any}
}

type GeneralJWE struct {
  aad optional String
  ciphertext String
  iv optional String
  protected optional String
  recipients [GeneralRecipient]
  tag optional String
  unprotected optional {String:Any}
}

type GeneralJOSE union {
  | GeneralJWS jws
  | GeneralJWE jwe
} representation kinded
```

##### Serializing the Decoded Representation

When serializing a JOSE object from the `Decoded Representation` special care needs to be taken with the `payload` property as well as the `protected` properties. 

###### Protected

The `protected` property in JWE and JWS have the type `{String:Any}`. This means that it may include data with *Link Kind* and *Bytes Kind*. These should be converted into pure JSON in the same way as it's done in [DAG-JSON](./dag-json.md). However, the properties should **not** be sorted since that would cause any integrity check on the JOSE data to fail. Once in JSON format the `protected` property should be converted into `base64url` using the method described in the JOSE spec  (`BASE64URL(UTF8(data))`). 

###### Payload

The payload property of JWS can be of either `Bytes` or  `{String:Any}` types. If the former it's simply just encoded as `base64url`. If the latter, it should be encoded in the same manner as the `protected` property.

Note that any change in the ordering of the properties of the payload at this point would cause potential validation of the JOSE object to fail. Good signature libraries will sort the payload before the signature is applied.

#### Ordering

Once the data has been converted to the `General Serialization`, codec implementors **MUST** use the same sorting algorithm as [DAG-JSON](./dag-json.md) to sort the data to ensure hashes consistently match for the same block data.

## Additional information

### Reccomended JOSE creation strategy

When creating a JOSE object there are some suggested approaches of how to format the data that is being signed / encrypted / authenticated that will keep you out of trouble. The main thing to keep in mind is that signatures / data authentication could be invalidated if the order of the properties in the JOSE object changes. It's therefore a good idea to sort the properties before any signature / authentication is added. The best way to do this is simply to use the same strategy employed by [DAG-JSON](./dag-json.md), which will also convert `Link` and `Bytes` to JSON representation. 
For JWS the relevant properties to do this for is `protected` and `payload` since the signature is done over  `ASCII(BASE64URL(UTF8(JWS Protected Header)) || '.' || BASE64URL(JWS Payload))` according to the [JWS specification](https://datatracker.ietf.org/doc/rfc7515/?include_text=1).

For JWE it is `protected` and the cleartext before it is encrypted into `ciphertext`.

### Decryption of JWEs

Similar to the `payload` of JWS, the decrypted data of a JWE may be encoded as [DAG-JSON](./dag-json.md) as described above. The implementation of the decryption function should account for this if neccessary to allow the data be interpreted as an IPLD dag node. In the future the decryption itself could be described using an [Advanced IPLD schema layout](../../schemas/advanced-layouts.md). 

### Implementations

* [Javascript](https://github.com/oed/js-dag-jose)