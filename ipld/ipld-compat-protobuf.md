# IPLD conversion with Protocol Buffer legacy IPFS node format

IPLD has a known conversion with the legacy Protocol Buffers format in order for new IPLD objects to interact with older protocol buffer objects.

## Detecting the format in use

The format is encapsulated after two multicodec headers. The first have the codec path `/mdagv1` and can be used to detect whether IPLD objects are transmitted or just legacy protocol buffer messages.

The second multicodec header is used to detect the actual format in which the IPLD object is encoded:

- `/protobuf/msgio`: is the encapsulation for protocol buffer message
- `/json`: is the encapsulation for JSON encoding
- `/cbor`: is the encapsulation for CBOR encoding

For example, a protocol buffer object encapsulated in a multicodec header would start with "`\x08/mdagv1\n\x10/protobuf/msgio\n`" corresponding to the bytes :

    08 2f 6d 64 61 67 76 31 0a
    10 2f 70 72 6f 74 6f 62 75 66 2f 6d 73 67 69 6f 0a

A JSON encoded object would start with "`\x08/mdagv1\n\x06/json\n`" and a CBOR encoded object would start with "`\x08/mdagv1\n\x06/cbor\n`".


## Description of the legacy protocol buffers format

This format is defined with the Protocol Buffers syntax as:

    message PBLink {
        optional bytes  Hash = 1;
        optional string Name = 2;
        optional uint64 Tsize = 3;
    }

    message PBNode {
        repeated PBLink Links = 2;
        optional bytes  Data = 1;
    }

## Conversion to IPLD model

The conversion to the IPLD data model MUST be convertible back to protocol buffers, resulting in an identical byte stream (so the hash corresponds). This implies that ordering and duplicate links must be preserved in some way. As such, they are stored in an array and not in a map indexed by their name.

There is a canonical form which is described below:

    {
      "data": "<Data>",
      "links": [
        {
          "link": {"/": "/ipfs/<Links[0].Hash.(base58)>"},
          "name": "<Links[0].Name>",
          "size": <Links[0].Tsize>
        },
        {
          "link": {"/": "/ipfs/<Links[1].Hash.(base58)>"},
          "name": "<Link[1].Name>",
          "size": <Links[1].Tsize>
        },
        {
          "link": {"/": "/ipfs/<Links[2].Hash.(base58)>"},
          "name": "<Links[2].Name>",
          "size": <Links[2].Tsize>
        },
        ...
      ]
    }

The main object contains:

- A `data` key containing the binary data string
- A `links` array containing links in the correct order

Each link consists of:

- A `@link` key containing the path to the destination document (Using the `/ipfs/` prefix)
- A `name` key containing the link name (a text string)
- A `size` unsigned integer containing the link size as stored in the Protocol Buffer object

Implementations are free to add any other top level key they need. In particular it may be interesting to access the links indexed by their name. This is a purely optional feature and additional keys cannot possibly be encoded back to the protonal Protocol Buffer format.
