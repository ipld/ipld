# Filecoin Main Chain Data Structures

* [Genesis Block](#genesis-block)
* [Chain](#chain)
* [Messages](#messages)
* [Actors](#actors)
  * [Actor type linking](#actor-type-linking)

## Genesis Block

There is a single block at the base of the entire chain with this layout. It is
the only structure that uses an actual Map at the representation level (other
structs use the `tuple` representation which encodes them as Lists). It is
encoded with DAG-CBOR with a SHA2-256 which gives the CID:
`bafyreiaqpwbbyjo4a42saasj36kkrpv4tsherf2e7bvezkert2a7dhonoi`.

Note that this block does not conform to strict DAG-CBOR in that its Map keys
are not sorted according to canonical rules. Therefore it does not round-trip
cleanly through current DAG-CBOR codecs.

```ipldsch
type Genesis struct {
  Datetime String
  Network String
  Token String
  TokenAmounts TokenAmounts
  Message String
}

type TokenAmounts struct {
  TotalSupply String
  Miners String
  ProtocolLabs {String:String}
}
```

## Chain

```ipldsch
# The `ParentStateRoot` link will point either directly to `ActorsHAMT' for v0
# or `StateRoot` which links to `ActorsHAMT` for v2.
# See Lotus chain/state/LoadStateTree()
type StateRootLink &Any

# The type hint here, `BlockHeader`, holds true **except** for the case of the
# Genesis block, which is a different format entirely. Note there is a
# `BlockHeader` "bootstrap genesis" but its `Parents` is a single CID pointing
# to the actual Genesis block which is described by the `Genesis` type.
type TipSetKey [&BlockHeader]

type BlockHeader struct {
  Miner Address
  Ticket nullable Ticket
  ElectionProof nullable ElectionProof
  BeaconEntries [BeaconEntry]
  WinPoStProof [PoStProof]
  Parents TipSetKey
  ParentWeight Bytes
  Height ChainEpoch
  ParentStateRoot StateRootLink
  ParentMessageReceipts &MessageReceiptAMT
  Messages &TxMeta
  BLSAggregate nullable Signature
  Timestamp Int
  BlockSig nullable Signature
  ForkSignaling Int
  ParentBaseFee TokenAmount
} representation tuple

type Ticket struct {
  VRFProof Bytes
} representation tuple

type ElectionProof struct {
  WinCount Int
  VRFProof Bytes
} representation tuple

type BeaconEntry struct {
  Round Int
  Data Bytes
} representation tuple

type PoStProof struct {
  PoStProof Int
  ProofBytes Bytes
} representation tuple
```

**AMT**: This is an ADL representing `type MessageReceiptList [MessageReceipt]`.

```ipldsch
type MessageReceiptAMT struct {
  height Int
  count Int
  node MessageReceiptAMTNode
} representation tuple

# This can also be the root of a block
type MessageReceiptAMTNode struct {
  bitmap Bytes
  children [&MessageReceiptAMTNode]
  values [&Message]
} representation tuple

type MessageReceipt struct {
  ExitCode ExitCode
  Return   CborEncodedReturn
  GasUsed  Int
} representation tuple
```

```ipldsch
type StateRoot struct {
  Version Int
  Actors &ActorsHAMT
  Info &StateInfo
} representation tuple
```

Note that `StateInfo` is an [empty struct](https://github.com/filecoin-project/lotus/blob/f225b7b928de73e20dd8b8d4d075a56fbf3b8a25/chain/types/state.go#L26), which encodes as an empty CBOR array (`0x80`).

```ipldsch
type StateInfo struct {
} representation tuple
```

## Messages

See **[Filecoin Messages Data Structures](messages.md)** for details on the CBOR encoded message `Params` and message returns.

```ipldsch
type TxMeta struct {
  BlsMessages &MessageLinkAMT
  SecpkMessages &SignedMessageLinkAMT
} representation tuple
```

```ipldsch
type Message struct {
  Version Int
  To Address
  From Address
  Nonce Int
  Value BigInt
  GasLimit Int
  GasFeeCap BigInt
  GasPremium BigInt
  Method MethodNum
  Params CborEncodedParams
} representation tuple

type SignedMessage struct {
  Message Message
  Signature Signature
} representation tuple
```

**AMT**: This is an ADL representing `type MessagesList [&Message]`.

```ipldsch
type MessageLinkAMT struct {
  height Int
  count Int
  node MessageLinkAMTNode
} representation tuple

# This can also be the root of a block
type MessageLinkAMTNode struct {
  bitmap Bytes
  children [&MessageLinkAMTNode]
  values [&Message]
} representation tuple
```

**AMT**: This is an ADL representing `type SignedMessagesList [&SignedMessage]`.

Note this is identical in layout to `MessagesList` and contains links at the leaves, but is listed here for completeness.

```ipldsch
type SignedMessageLinkAMT struct {
  height Int
  count Int
  node SignedMessageLinkAMTNode
} representation tuple

# This can also be the root of a block
type SignedMessageLinkAMTNode struct {
  bitmap Bytes
  children [&SignedMessageLinkAMTNode]
  values [&SignedMessage]
} representation tuple
```

## Actors

See **[Filecoin Actor State Data Structures](state.md)** for details on the Actor State objects that attach to the state tree `ActorsHAMT` as `ActorStateLink` and are differentiated by the type `Code` described below.

### Actor type linking

Actors are identified by a Code which is represented as a CID. The current form
uses a `raw` codec combined with an `identity` multihash to encode a set of
fixed strings uniquely representing the Actor type. Version 0 Actors use the
prefix `fil/1/` while version 2 Actors use the prefix `fil/2/`, followed by the
Actor name.

The `code` field in the `Actor` struct contains this CID and indicates the type
of block to be found when following the `head` link to load the specific Actor
state.

| Code string | Actor state type | CID | CID Bytes |
| --- | --- | --- | --- |
| `"fil/1/init"` | [`InitV0State`](#initv0state) | `bafkqactgnfwc6mjpnfxgs5a` | `0x0155000a66696c2f312f696e6974` |
| `"fil/2/init"` | [`InitV2State`](#initv2state) | `bafkqactgnfwc6mrpnfxgs5a` | `0x0155000a66696c2f322f696e6974` |
| `"fil/1/cron"` | [`CronV0State`](#cronv0state) | `bafkqactgnfwc6mjpmnzg63q` | `0x0155000a66696c2f312f63726f6e` |
| `"fil/2/cron"` | [`CronV2State`](#cronv2state) | `bafkqactgnfwc6mrpmnzg63q` | `0x0155000a66696c2f322f63726f6e` |
| `"fil/1/reward"` | [`RewardV0State`](#rewardv0state) | `bafkqaddgnfwc6mjpojsxoylsmq` | `0x0155000c66696c2f312f726577617264` |
| `"fil/2/reward"` | [`RewardV2State`](#rewardv2state) | `bafkqaddgnfwc6mrpojsxoylsmq` | `0x0155000c66696c2f322f726577617264` |
| `"fil/1/account"` | [`AccountV0State`](#accountv0state) | `bafkqadlgnfwc6mjpmfrwg33vnz2a` | `0x0155000d66696c2f312f6163636f756e74` |
| `"fil/2/account"` | [`AccountV2State`](#accountv2state) | `bafkqadlgnfwc6mrpmfrwg33vnz2a` | `0x0155000d66696c2f322f6163636f756e74` |
| `"fil/1/storagemarket"` | [`MarketV0State`](#marketv0state) | `bafkqae3gnfwc6mjpon2g64tbm5sw2ylsnnsxi` | `0x0155001366696c2f312f73746f726167656d61726b6574` |
| `"fil/2/storagemarket"` | [`MarketV2State`](#marketv2state) | `bafkqae3gnfwc6mrpon2g64tbm5sw2ylsnnsxi` | `0x0155001366696c2f322f73746f726167656d61726b6574` |
| `"fil/1/storageminer"` | [`MinerV0State`](#minerv0state) | `bafkqaetgnfwc6mjpon2g64tbm5sw22lomvza` | `0x0155001266696c2f312f73746f726167656d696e6572` |
| `"fil/2/storageminer"` | [`MinerV2State`](#minerv2state) | `bafkqaetgnfwc6mrpon2g64tbm5sw22lomvza` | `0x0155001266696c2f322f73746f726167656d696e6572` |
| `"fil/1/multisig"` | [`MultisigV0State`](#multisigv0state) | `bafkqadtgnfwc6mjpnv2wy5djonuwo` | `0x0155000e66696c2f312f6d756c7469736967` |
| `"fil/2/multisig"` | [`MultisigV2State`](#multisigv2state) | `bafkqadtgnfwc6mrpnv2wy5djonuwo` | `0x0155000e66696c2f322f6d756c7469736967` |
| `"fil/1/paymentchannel"` | [`PaychV0State`](#paychv0state) | `bafkqafdgnfwc6mjpobqxs3lfnz2gg2dbnzxgk3a` | `0x0155001466696c2f312f7061796d656e746368616e6e656c` |
| `"fil/2/paymentchannel"` | [`PaychV2State`](#paychv2state) | `bafkqafdgnfwc6mrpobqxs3lfnz2gg2dbnzxgk3a` | `0x0155001466696c2f322f7061796d656e746368616e6e656c` |
| `"fil/1/storagepower"` | [`PowerV0State`](#powerv0state) | `bafkqaetgnfwc6mjpon2g64tbm5sxa33xmvza` | `0x0155001266696c2f312f73746f72616765706f776572` |
| `"fil/2/storagepower"` | [`PowerV2State`](#powerv2state) | `bafkqaetgnfwc6mrpon2g64tbm5sxa33xmvza` | `0x0155001266696c2f322f73746f72616765706f776572` |
| `"fil/1/verifiedregistry"` | [`VerifregV0State`](#verifregv0state) | `bafkqaftgnfwc6mjpozsxe2lgnfswi4tfm5uxg5dspe` | `0x0155001666696c2f312f76657269666965647265676973747279` |
| `"fil/2/verifiedregistry"` | [`VerifregV2State`](#verifregv2state) | `bafkqaftgnfwc6mrpozsxe2lgnfswi4tfm5uxg5dspe` | `0x0155001666696c2f322f76657269666965647265676973747279` |
| `"fil/1/system"` | [`SystemV0State`](#systemv0state) | `bafkqaddgnfwc6mjpon4xg5dfnu` | `0x0155000c66696c2f312f73797374656d` |
| `"fil/2/system"` | [`SystemV2State`](#systemv2state) | `bafkqaddgnfwc6mrpon4xg5dfnu` | `0x0155000c66696c2f322f73797374656d` |

**HAMT**: This is an ADL representing `type ActorsMap {Address:Actors}`.

```ipldsch
# An inline CID encoded as raw+identity, see above
type ActorCode &Any

# An implicit union of each actor state types, keyed by the `ActorCode` (`code`)
# field and its variations listed above
type ActorStateLink &Any

type ActorsHAMT struct {
  map Bytes
  data [ ActorsHAMTElement ]
} representation tuple

type ActorsHAMTElement union {
  | ActorsHAMTLink "0"
  | ActorsHAMTBucket "1"
} representation keyed

type ActorsHAMTLink &ActorsHAMT

type ActorsHAMTBucket [ ActorsHAMTBucketEntry ]

type ActorsHAMTBucketEntry struct {
  key Address
  value Actor # inline
} representation tuple

type Actor struct {
  code ActorCode
  head ActorStateLink
  nonce CallSeqNum
  balance BigInt
} representation tuple
```
