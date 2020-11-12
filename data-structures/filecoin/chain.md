# Filecoin Main Chain Data Structures

Schemas are grouped by their serialized blocks. Other than those types listed in "Basic Types" and "Crypto Types", each grouping of schema types in a code block represents a data structure that is serialized into a single IPLD block with its own Link (CID).

Advanced Data Layouts (ADLs) are shown in their expanded form here, as the data appears on-block. Their logical forms for programmatic purposes are `Map` for the HAMT and `List` for the AMT.

There are some data structures that are repeats of the same forms, primarily the AMT and HAMTs that share the same data types. They are not de-duplicated here for clarity to demonstrate the different purposes of those data structures.

For more information about the IPLD Schema language, see the [specificaiton](https://specs.ipld.io/schemas/).

## Basic Types

```ipldsch
# Address is a `https://github.com/filecoin-project/go-address` in its binary byte format.
# It may be used as a hamt key, and will be often visualized or presented to users
# in its more readable string form.
type Address bytes

# Go big.Int
# Prefer presenting to users either as a number or a string view of the decimal number
# for readability.
type BigInt bytes

# An indicator of which RPC method on an actor a message should trigger execution of.
type MethodNum int

# The 'f0...' subset of Addresses used for the actual indexes of actors in a state root.
type ActorID int

# the height of a block in the chain. Should fit in an Int64
type ChainEpoch int

# the ChainEpoch as bytes, where the integer is converted to its string form and
# the string's bytes are used
type ChainEpochBytes bytes

type TokenAmount BigInt

type PaddedPieceSize int

type PeerID bytes

type SectorSize int

type SectorNumber int

# the SectorNumber as bytes, where the integer is encoded as a uvarint and the
# resulting bytes are used
type SectorNumberBytes bytes

type PartitionNumber int

type BitField bytes

type StoragePower BigInt

type DataCap StoragePower

type DealID int

# the DealID as bytes, where the integer is encoded as a uvarint and the resulting
# bytes are used
type DealIDBytes bytes

type DealWeight BigInt

type Multiaddr bytes

type RegisteredSealProof int

type TransactionID # TxnID

# the TransactionID as bytes, where the integer is encoded as a varint (not uvarint)
# and the resulting bytes are used
type TransactionIDBytes bytes

# A quantity of space x time (in byte-epochs) representing power committed to the network for some duration.
type Spacetime BigInt

type ExitCode int

# Message parameters are encoded as DAG-CBOR and the resulting bytes are
# embedded as `Params` fields in some structs.
# See the Filecoin Messages Data Structures document for encoded DAG-CBOR message
# params
type CborEncodedParams Bytes

# Message receipt returns are encoded as DAG-CBOR and the resulting bytes are
# embedded as the `Return` field in `MessageReceipt`.
# See the Filecoin Messages Data Structures document for encoded DAG-CBOR message
# returns
type CborEncodedReturn Bytes
```

## Crypto Types

```ipldsch
type Signature union {
  SignatureSecp256k1 1
  SignatureBLS 2
} representation byteprefix
```

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
# final Genesis block, which is a different format entirely. Note there is a
# `BlockHeader` "genesis" but its `Parents` is a single CID pointing to the
# original genesis block which is described by the `Genesis` type.
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

```ipldsch
type TxMeta struct {
  BlsMessages &MessageLinkAMT
  SecpkMessages &SignedMessageLinkAMT
} representation tuple

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

**HAMT**: This is an ADL representing `type ActorsMap {Address:Actors}`.

Actors are identified by a Code which is represented as a CID. The current form
uses a `raw` codec combined with an `identity` multihash to encode a set of
fixed strings uniquely representing the Actor type. Version 0 Actors use the
prefix `fil/1/` while version 2 Actors use the prefix `fil/2/`, followed by the
Actor name.

The `code` field in the `Actor` struct contains this CID and indicates the type
of block to be found when following the `head` link to load the specific Actor
state.

| Code string | CID | CID Bytes |
| --- | --- | --- |
| "fil/1/system" | `bafkqaddgnfwc6mjpon4xg5dfnu` | `0x0155000c66696c2f312f73797374656d` |
| "fil/1/init" | `bafkqactgnfwc6mjpnfxgs5a` | `0x0155000a66696c2f312f696e6974` |
| "fil/1/cron" | `bafkqactgnfwc6mjpmnzg63q` | `0x0155000a66696c2f312f63726f6e` |
| "fil/1/storagepower" | `bafkqaetgnfwc6mjpon2g64tbm5sxa33xmvza` | `0x0155001266696c2f312f73746f72616765706f776572` |
| "fil/1/storageminer" | `bafkqaetgnfwc6mjpon2g64tbm5sw22lomvza` | `0x0155001266696c2f312f73746f726167656d696e6572` |
| "fil/1/storagemarket" | `bafkqae3gnfwc6mjpon2g64tbm5sw2ylsnnsxi` | `0x0155001366696c2f312f73746f726167656d61726b6574` |
| "fil/1/paymentchannel" | `bafkqafdgnfwc6mjpobqxs3lfnz2gg2dbnzxgk3a` | `0x0155001466696c2f312f7061796d656e746368616e6e656c` |
| "fil/1/reward" | `bafkqaddgnfwc6mjpojsxoylsmq` | `0x0155000c66696c2f312f726577617264` |
| "fil/1/verifiedregistry" | `bafkqaftgnfwc6mjpozsxe2lgnfswi4tfm5uxg5dspe` | `0x0155001666696c2f312f76657269666965647265676973747279` |
| "fil/1/account" | `bafkqadlgnfwc6mjpmfrwg33vnz2a` | `0x0155000d66696c2f312f6163636f756e74` |
| "fil/1/multisig" | `bafkqadtgnfwc6mjpnv2wy5djonuwo` | `0x0155000e66696c2f312f6d756c7469736967` |
| "fil/2/system" | `bafkqaddgnfwc6mrpon4xg5dfnu` | `0x0155000c66696c2f322f73797374656d` |
| "fil/2/init" | `bafkqactgnfwc6mrpnfxgs5a` | `0x0155000a66696c2f322f696e6974` |
| "fil/2/cron" | `bafkqactgnfwc6mrpmnzg63q` | `0x0155000a66696c2f322f63726f6e` |
| "fil/2/storagepower" | `bafkqaetgnfwc6mrpon2g64tbm5sxa33xmvza` | `0x0155001266696c2f322f73746f72616765706f776572` |
| "fil/2/storageminer" | `bafkqaetgnfwc6mrpon2g64tbm5sw22lomvza` | `0x0155001266696c2f322f73746f726167656d696e6572` |
| "fil/2/storagemarket" | `bafkqae3gnfwc6mrpon2g64tbm5sw2ylsnnsxi` | `0x0155001366696c2f322f73746f726167656d61726b6574` |
| "fil/2/paymentchannel" | `bafkqafdgnfwc6mrpobqxs3lfnz2gg2dbnzxgk3a` | `0x0155001466696c2f322f7061796d656e746368616e6e656c` |
| "fil/2/reward" | `bafkqaddgnfwc6mrpojsxoylsmq` | `0x0155000c66696c2f322f726577617264` |
| "fil/2/verifiedregistry" | `bafkqaftgnfwc6mrpozsxe2lgnfswi4tfm5uxg5dspe` | `0x0155001666696c2f322f76657269666965647265676973747279` |
| "fil/2/account" | `bafkqadlgnfwc6mrpmfrwg33vnz2a` | `0x0155000d66696c2f322f6163636f756e74` |
| "fil/2/multisig" | `bafkqadtgnfwc6mrpnv2wy5djonuwo` | `0x0155000e66696c2f322f6d756c7469736967` |

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

### InitActor

The InitActor state is the same in v0 and v2.

**v0**

```ipldsch
type InitV0State struct {
  AddressMap &ActorIDHAMT # HAMT[Address]ActorID
  NextID ActorID
  NetworkName String
} representation tuple
```

**v2** _(Same as v0)_

```ipldsch
type InitV2State InitV0State
```

**HAMT**: This is an ADL representing `type ActorIDHAMT {Address:ActorID}`.

```ipldsch
type ActorIDHAMT struct {
  map Bytes
  data [ ActorIDHAMTElement ]
} representation tuple

type ActorIDHAMTElement union {
  | ActorIDHAMTLink "0"
  | ActorIDHAMTBucket "1"
} representation keyed

type ActorIDHAMTLink &ActorIDHAMT

type ActorIDHAMTBucket [ ActorIDHAMTBucketEntry ]

type ActorIDHAMTBucketEntry struct {
  key Address
  value ActorID
} representation tuple
```

### CronActor

The CronActor state is the same in v0 and v2.

**v0**

```ipldsch
type CronV0State struct {
  Entries [CronV0Entry]
} representation tuple

type CronV0Entry struct {
  # The actor to call (must be an ID-address)
  Receiver Address
  # The method number to call (must accept empty parameters)
  MethodNum MethodNum
} representation tuple
```

**v2** _(Same as v0)_

```ipldsch
type CronV2State CronV0State
```

### RewardActor

The RewardActor state differs between v0 and v2.

**v0**

```ipldsch
type RewardV0State struct {
  # CumsumBaseline is a target CumsumRealized needs to reach for EffectiveNetworkTime to increase
  # CumsumBaseline and CumsumRealized are expressed in byte-epochs.
  CumsumBaseline Spacetime
  # CumsumRealized is cumulative sum of network power capped by BalinePower(epoch)
  CumsumRealized Spacetime
  # EffectiveNetworkTime is ceiling of real effective network time `theta` based on
  # CumsumBaselinePower(theta) == CumsumRealizedPower
  # Theta captures the notion of how much the network has progressed in its baseline
  # and in advancing network time.
  EffectiveNetworkTime ChainEpoch
  # EffectiveBaselinePower is the baseline power at the EffectiveNetworkTime epoch
  EffectiveBaselinePower StoragePower
  # The reward to be paid in per WinCount to block producers.
  # The actual reward total paid out depends on the number of winners in any round.
  # This value is recomputed every non-null epoch and used in the next non-null epoch.
  ThisEpochReward TokenAmount
  # Smoothed ThisEpochReward
  ThisEpochRewardSmoothed nullable V0FilterEstimate
  # The baseline power the network is targeting at st.Epoch
  ThisEpochBaselinePower StoragePower
  # Epoch tracks for which epoch the Reward was computed
  Epoch ChainEpoch
  # TotalMined tracks the total FIL awared to block miners
  TotalMined TokenAmount
} representation tuple

# Alpha Beta Filter "position" (value) and "velocity" (rate of change of value) estimates
# Estimates are in Q.128 format
type V0FilterEstimate struct {
  PositionEstimate BigInt # Q.128
  VelocityEstimate BigInt # Q.128
} representation tuple
```

**v2**

```ipldsch
type RewardV2State struct {
  # CumsumBaseline is a target CumsumRealized needs to reach for EffectiveNetworkTime to increase
  # CumsumBaseline and CumsumRealized are expressed in byte-epochs.
  CumsumBaseline Spacetime
  # CumsumRealized is cumulative sum of network power capped by BaselinePower(epoch)
  CumsumRealized Spacetime
  # EffectiveNetworkTime is ceiling of real effective network time `theta` based on
  # CumsumBaselinePower(theta) == CumsumRealizedPower
  # Theta captures the notion of how much the network has progressed in its baseline
  # and in advancing network time.
  EffectiveNetworkTime ChainEpoch
  # EffectiveBaselinePower is the baseline power at the EffectiveNetworkTime epoch
  EffectiveBaselinePower StoragePower
  # The reward to be paid in per WinCount to block producers.
  # The actual reward total paid out depends on the number of winners in any round.
  # This value is recomputed every non-null epoch and used in the next non-null epoch.
  ThisEpochReward TokenAmount
  # Smoothed ThisEpochReward
  ThisEpochRewardSmoothed V0FilterEstimate
  # The baseline power the network is targeting at st.Epoch
  ThisEpochBaselinePower StoragePower
  # Epoch tracks for which epoch the Reward was computed
  Epoch ChainEpoch
  # TotalStoragePowerReward tracks the total FIL awarded to block miners
  TotalStoragePowerReward TokenAmount
  # Simple and Baseline totals are constants used for computing rewards.
  # They are on chain because of a historical fix resetting baseline value
  # in a way that depended on the history leading immediately up to the
  # migration fixing the value.  These values can be moved from state back
  # into a code constant in a subsequent upgrade.
  SimpleTotal BigInt
  BaselineTotal BigInt
} representation tuple
```

### AccountActor

The CronActor state is the same in v0 and v2 and only contains an `Address`.

**v0**

```ipldsch
type AccountV0State struct {
  Address Address
} representation tuple
```

**v2** _(Same as v0)_

```ipldsch
type AccountV2State AccountV0State
```

### StorageMarketActor

The StorageMarketActor state is the same in v0 and v2.

```ipldsch
type MarketV0State struct {
  Proposals &DealProposalAMT # AMT[DealID]DealProposal
  States &DealStateAMT # AMT[DealID]DealState
  # PendingProposals tracks dealProposals that have not yet reached their deal start date.
  # We track them here to ensure that miners can't publish the same deal proposal twice.
  PendingProposals &DealProposalHAMT # HAMT[DealCid]DealProposal
  # Total amount held in escrow, indexed by actor address (including both locked and unlocked amounts).
  EscrowTable &BalanceTableHAMT # HAMT[Address]TokenAmount
  # Amount locked, indexed by actor address.
  # Note: the amounts in this table do not affect the overall amount in escrow:
  # only the _portion_ of the total escrow amount that is locked.
  LockedTable &BalanceTableHAMT # HAMT[Address]TokenAmount
  NextID DealID
  # Metadata cached for efficient iteration over deals.
  DealOpsByEpoch &DealOpsByEpochHAMT # SetMultimap: HAMT[ChainEpoch]Set[DealID]
  LastCron ChainEpoch
  # Total Client Collateral that is locked -> unlocked when deal is terminated
  TotalClientLockedCollateral TokenAmount
  # Total Provider Collateral that is locked -> unlocked when deal is terminated
  TotalProviderLockedCollateral TokenAmount
  # Total storage fee that is locked in escrow -> unlocked when payments are made
  TotalClientStorageFee TokenAmount
} representation tuple
```

**v2** _(Same as v0)_

```ipldsch
type MarketV2State MarketV0State
```

**AMT**: This is an ADL representing `type DealProposalList [DealProposal]`, indexed by `DealID`.

```ipldsch
type DealProposalAMT struct {
  height Int
  count Int
  node DealProposalAMTNode
} representation tuple

type DealProposalAMTNode struct {
  bitmap Bytes
  children [&DealProposalAMTNode]
  values [MarketV0DealProposal] # inline
} representation tuple

type MarketV0DealProposal struct {
  # CommP: A CID with fil-commitment-unsealed + sha2_256-trunc254-padded
  PieceCID &Any
  PieceSize PaddedPieceSize
  VerifiedDeal Bool
  Client Address
  Provider Address
  # An arbitrary client chosen label to apply to the deal
  Label String
  # Nominal start epoch. Deal payment is linear between StartEpoch and EndEpoch,
  # with total amount StoragePricePerEpoch * (EndEpoch - StartEpoch).
  # Storage deal must appear in a sealed (proven) sector no later than StartEpoch,
  # otherwise it is invalid.
  StartEpoch ChainEpoch
  EndEpoch ChainEpoch
  StoragePricePerEpoch TokenAmount
  ProviderCollateral TokenAmount
  ClientCollateral TokenAmount
} representation tuple
```

**AMT**: This is an ADL representing `type DealProposalList [DealState]`, indexed by `DealID`.

```ipldsch
type DealStateAMT struct {
  height Int
  count Int
  node DealStateAMTNode
} representation tuple

type DealStateAMTNode struct {
  bitmap Bytes
  children [&DealStateAMTNode]
  values [MarketV0DealState] # inline
} representation tuple

type MarketV0DealState struct {
  SectorStartEpoch ChainEpoch # -1 if not yet included in proven sector
  LastUpdatedEpoch ChainEpoch # -1 if deal state never updated
  SlashEpoch ChainEpoch # -1 if deal never slashed
} representation tuple
```

**HAMT**: This is an ADL representing `type DealProposalMap {DealCidBytes:DealProposal}`.

```ipldsch
# The bytes form of the the CID of a `MarketV0DealProposal` object as a block
type DealCidBytes bytes

type DealProposalHAMT struct {
  map Bytes
  data [ DealProposalHAMTElement ]
} representation tuple

type DealProposalHAMTElement union {
  | DealProposalHAMTLink "0"
  | Bucket "1"
} representation keyed

type DealProposalHAMTLink &DealProposalHAMT

type DealProposalHAMTBucket [ DealProposalHAMTBucketEntry ]

type DealProposalHAMTBucketEntry struct {
  key DealCidBytes
  value MarketV0DealProposal
} representation tuple
```

**HAMT**: This is an ADL representing `type BalanceTable {Address:TokenAmount}`.

```ipldsch
type BalanceTableHAMT struct {
  map Bytes
  data [ BalanceTableHAMTElement ]
} representation tuple

type BalanceTableHAMTElement union {
  | BalanceTableHAMTLink "0"
  | BalanceTableHAMTBucket "1"
} representation keyed

type BalanceTableHAMTLink &BalanceTableHAMT

type BalanceTableHAMTBucket [ BalanceTableHAMTBucketEntry ]

type BalanceTableHAMTBucketEntry struct {
  key Address
  value TokenAmount
} representation tuple
```

**SetMultimap (HAMT+HAMT)**: This is an ADL representing a Set within a Map `type DealOpsByEpoch {ChainEpochBytes:{DealIDBytes:Null}}`.

```ipldsch
# HAMT/map root structure

type DealOpsByEpochHAMT struct {
  map Bytes
  data [ DealOpsByEpochHAMTElement ]
} representation tuple

type DealOpsByEpochHAMTElement union {
  | DealOpsByEpochHAMTLink "0"
  | DealOpsByEpochHAMTBucket "1"
} representation keyed

type DealOpsByEpochHAMTLink &DealOpsByEpochHAMTLink

type DealOpsByEpochHAMTBucket [ DealOpsByEpochHAMTBucketEntry ]

type DealOpsByEpochHAMTBucketEntry struct {
  key ChainEpochBytes
  value &DealOpsByEpochAMT
} representation tuple

# HAMT/set leaf structure (map of nulls)

type DealOpsByEpochHAMTSet struct {
  map Bytes
  data [ DealOpsByEpochHAMTSetElement ]
} representation tuple

type DealOpsByEpochHAMTSetElement union {
  | DealOpsByEpochHAMTSet_Link "0"
  | DealOpsByEpochHAMTSetBucket "1"
} representation keyed

type DealOpsByEpochHAMTSet_Link &DealOpsByEpochHAMTSet

type DealOpsByEpochHAMTSetBucket [ DealOpsByEpochHAMTSetBucketEntry ]

type DealOpsByEpochHAMTSetBucketEntry struct {
  key DealIDBytes
  value Null
} representation tuple
```

### StorageMinerActor

**v0**

```ipldsch
type MinerV0State struct {
  # Information not related to sectors
  Info  &MinerV0Info
  # Total funds locked as PreCommitDeposits
  PreCommitDeposits TokenAmount
  # Total rewards and added funds locked in vesting table
  LockedFunds TokenAmount
  # VestingFunds (Vesting Funds schedule for the miner)
  VestingFunds &MinerV0VestingFunds
  # Sum of initial pledge requirements of all active sectors
  InitialPledge TokenAmount
  # Sectors that have been pre-committed but not yet proven.
  PreCommittedSectors &MinerV0SectorPreCommitOnChainInfoHAMT # HAMT[SectorNumber]SectorPreCommitOnChainInfo
  # PreCommittedSectorsExpiry maintains the state required to expire PreCommittedSectors
  PreCommittedSectorsExpiry &BitFieldQueueAMT # AMT[ChainEpoch]BitField
  # Allocated sector IDs. Sector IDs can never be reused once allocated
  AllocatedSectors &BitField
  # Information for all proven and not-yet-garbage-collected sectors.
  # Sectors are removed from this AMT when the partition to which the
  # sector belongs is compacted.
  Sectors &MinerV0SectorOnChainInfoAMT # AMT[SectorNumber]SectorOnChainInfo
  # The first epoch in this miner's current proving period. This is the first epoch in which a PoSt for a
  # partition at the miner's first deadline may arrive. Alternatively, it is after the last epoch at which
  # a PoSt for the previous window is valid.
  # Always greater than zero, this may be greater than the current epoch for genesis miners in the first
  # WPoStProvingPeriod epochs of the chain; the epochs before the first proving period starts are exempt from Window
  # PoSt requirements.
  # Updated at the end of every period by a cron callback.
  ProvingPeriodStart ChainEpoch
  # Index of the deadline within the proving period beginning at ProvingPeriodStart that has not yet been
  # finalized.
  # Updated at the end of each deadline window by a cron callback.
  CurrentDeadline Int
  # The sector numbers due for PoSt at each deadline in the current proving period, frozen at period start.
  # New sectors are added and expired ones removed at proving period boundary.
  # Faults are not subtracted from this in state, but on the fly.
  Deadlines &MinerV0Deadlines
  # Deadlines with outstanding fees for early sector termination
  EarlyTerminations BitField
} representation tuple
```

```ipldsch
type MinerV0Info struct {
  Owner Address
  Worker Address
  ControlAddresses nullable [Address]
  PendingWorkerKey nullable MinerV0WorkerChangeKey
  PeerId PeerID
  Multiaddrs nullable [Multiaddr]
  SealProofType Int
  SectorSize SectorSize
  WindowPoStPartitionSectors Int
} representation tuple

type MinerV0WorkerChangeKey struct {
  NewWorker Address
  EffectiveAt ChainEpoch
} representation tuple
```

```ipldsch
type MinerV0VestingFunds struct {
  Funds [MinerV0VestingFund]
} representation tuple

type MinerV0VestingFund struct {
  Epoch ChainEpoch
  Amount TokenAmount
} representation tuple
```

```ipldsch
type MinerV0Deadlines struct {
  Due MinerV0DeadlineLinkList
} representation tuple

# Must be 48 CIDs
type MinerV0DeadlineLinkList [&MinerV0Deadline]
```

```ipldsch
type MinerV0Deadline struct {
  Partitions &MinerV0PartitionAMT # AMT[PartitionNumber]Partition
  ExpirationEpochs &BitFieldQueueAMT # AMT[ChainEpoch]BitField
  PostSubmissions BitField
  EarlyTerminations BitField
  LiveSectors Int
  TotalSectors Int
  FaultyPower MinerV0PowerPair
} representation tuple
```

**v2**

```ipldsch
type MinerV2State struct {
  # Information not related to sectors
  Info  &MinerV2Info
  # Total funds locked as PreCommitDeposits
  PreCommitDeposits TokenAmount
  # Total rewards and added funds locked in vesting table
  LockedFunds TokenAmount
  # VestingFunds (Vesting Funds schedule for the miner)
  VestingFunds &MinerV0VestingFunds
  # Absolute value of debt this miner owes from unpaid fees
  FeeDebt TokenAmount
  # Sum of initial pledge requirements of all active sectors
  InitialPledge TokenAmount
  # Sectors that have been pre-committed but not yet proven
  PreCommittedSectors &MinerV0SectorPreCommitOnChainInfoHAMT # HAMT[SectorNumber]SectorPreCommitOnChainInfo
  # PreCommittedSectorsExpiry maintains the state required to expire PreCommittedSectors
  PreCommittedSectorsExpiry &BitFieldQueueAMT # AMT[ChainEpoch]BitField
  # Allocated sector IDs. Sector IDs can never be reused once allocated
  AllocatedSectors &BitField
  # Information for all proven and not-yet-garbage-collected sectors.
  # Sectors are removed from this AMT when the partition to which the
  # sector belongs is compacted.
  Sectors &MinerV0SectorOnChainInfoAMT # AMT[SectorNumber]SectorOnChainInfo
  # The first epoch in this miner's current proving period. This is the first epoch in which a PoSt for a
  # partition at the miner's first deadline may arrive. Alternatively, it is after the last epoch at which
  # a PoSt for the previous window is valid.
  # Always greater than zero, this may be greater than the current epoch for genesis miners in the first
  # WPoStProvingPeriod epochs of the chain; the epochs before the first proving period starts are exempt from Window
  # PoSt requirements.
  # Updated at the end of every period by a cron callback.
  ProvingPeriodStart ChainEpoch
  # Index of the deadline within the proving period beginning at ProvingPeriodStart that has not yet been
  # finalized.
  # Updated at the end of each deadline window by a cron callback.
  CurrentDeadline Int
  # The sector numbers due for PoSt at each deadline in the current proving period, frozen at period start.
  # New sectors are added and expired ones removed at proving period boundary.
  # Faults are not subtracted from this in state, but on the fly.
  Deadlines &MinerV2Deadlines
  # Deadlines with outstanding fees for early sector termination
  EarlyTerminations BitField
} representation tuple
```

```ipldsch
type MinerV2Info struct {
  Owner Address
  Worker Address
  ControlAddresses nullable [Address]
  PendingWorkerKey nullable MinerV0WorkerChangeKey
  PeerId PeerID
  Multiaddrs nullable [Multiaddr]
  SealProofType Int
  SectorSize SectorSize
  WindowPoStPartitionSectors Int
  ConsensusFaultElapsed ChainEpoch
  PendingOwnerAddress nullable Address
} representation tuple
```

Ssame form as `MinerV0Deadlines` but the eventual link to `MinerV2Partition` is different.

```ipldsch
type MinerV2Deadlines struct {
  Due MinerV2DeadlineLinkList
} representation tuple

# Must be 48 CIDs
type MinerV2DeadlineLinkList [&MinerV2Deadline]
```

```ipldsch
type MinerV2Deadline struct {
  Partitions &MinerV2PartitionAMT # AMT[PartitionNumber]Partition
  ExpirationEpochs &BitFieldQueueAMT # AMT[ChainEpoch]BitField
  PostSubmissions BitField
  EarlyTerminations BitField
  LiveSectors Int
  TotalSectors Int
  FaultyPower MinerV0PowerPair
} representation tuple
```

**HAMT**: This is an ADL representing `type SectorPreCommitOnChainInfoMap {SectorNumberBytes:SectorPreCommitOnChainInfo}`

```ipldsch
type MinerV0SectorPreCommitOnChainInfoHAMT struct {
  map Bytes
  data [ MinerV0SectorPreCommitOnChainInfoHAMTElement ]
} representation tuple

type MinerV0SectorPreCommitOnChainInfoHAMTElement union {
  | MinerV0SectorPreCommitOnChainInfoHAMTLink "0"
  | MinerV0SectorPreCommitOnChainInfoHAMTBucket "1"
} representation keyed

type MinerV0SectorPreCommitOnChainInfoHAMTLink &MinerV0SectorPreCommitOnChainInfoHAMT

type MinerV0SectorPreCommitOnChainInfoHAMTBucket [ MinerV0SectorPreCommitOnChainInfoHAMTBucketEntry ]

type MinerV0SectorPreCommitOnChainInfoHAMTBucketEntry struct {
  key SectorNumberBytes
  value MinerV0SectorPreCommitOnChainInfo # inline
} representation tuple

type MinerV0SectorPreCommitOnChainInfo struct {
  Info MinerV0SectorPreCommitInfo
  PreCommitDeposit TokenAmount
  PreCommitEpoch ChainEpoch
  DealWeight DealWeight
  VerifiedDealWeight DealWeight
} representation tuple

type MinerV0SectorPreCommitInfo struct {
  SealProof RegisteredSealProof
  SectorNumber SectorNumber
  SealedCID &Any # A CID with fil-commitment-sealed + poseidon-bls12_381-ac-fc1
  SealRandEpoch ChainEpoch
  DealIDs [DealID]
  Expiration ChainEpoch
  ReplaceCapacity Bool
  ReplaceSectorDeadline Int
  ReplaceSectorPartition PartitionNumber
  ReplaceSectorNumber SectorNumber
} representation tuple
```

**AMT**: This is an ADL representing `type BitFieldQueue [BitField]` indexed by `ChainEpoch`.

```ipldsch
type BitFieldQueueAMT struct {
  height Int
  count Int
  node BitFieldQueueAMTNode
} representation tuple

type BitFieldQueueAMTNode struct {
  bitmap Bytes
  children [&BitFieldQueueAMTNode]
  values [Bitfield]
} representation tuple
```

**AMT**: This is an ADL representing `type SectorOnChainInfoList [SectorOnChainInfo]` indexed by `SectorNumber`.

```ipldsch
type MinerV0SectorOnChainInfoAMT struct {
  height Int
  count Int
  node MinerV0SectorOnChainInfoAMTNode
} representation tuple

type MinerV0SectorOnChainInfoAMTNode struct {
  bitmap Bytes
  children [&MinerV0SectorOnChainInfoAMTNode]
  values [MinerV0SectorOnChainInfo]
} representation tuple

type MinerV0SectorOnChainInfo struct {
  SectorNumber SectorNumber
  SealProof RegisteredSealProof
  SealedCID &Any # A CID with fil-commitment-sealed + poseidon-bls12_381-ac-fc1
  DealIDs [DealID]
  Activation ChainEpoch
  Expiration ChainEpoch
  DealWeight DealWeight
  VerifiedDealWeight DealWeight
  InitialPledge TokenAmount
  ExpectedDayReward TokenAmount
  ExpectedStorageReward TokenAmount
  ReplacedSectorAge ChainEpoch
  ReplacedDayReward TokenAmount
} representation tuple
```

**AMT**: This is an ADL representing `type MinerV0PartitionList [MinerV0Partition]` indexed by `PartitionNumber`.

```ipldsch
type MinerV0PartitionAMT struct {
  height Int
  count Int
  node MinerV0PartitionAMTNode
} representation tuple

type MinerV0PartitionAMTNode struct {
  bitmap Bytes
  children [&MinerV0PartitionAMTNode]
  values [MinerV0Partition]
} representation tuple

type MinerV0Partition struct {
  Sectors BitField
  Faults BitField
  Recoveries BitField
  Terminated BitField
  ExpirationsEpochs &MinerV0ExpirationSetAMT # AMT[ChainEpoch]ExpirationSet
  EarlyTerminated &BitFieldQueueAMT # AMT[ChainEpoch]BitField
  LivePower MinerV0PowerPair
  FaultyPower MinerV0PowerPair
  RecoveringPower MinerV0PowerPair
} representation tuple

type MinerV0PowerPair struct {
  Raw StoragePower
  QA StoragePower
} representation tuple
```

**v2**

**AMT**: This is an ADL representing `type MinerV2PartitionList [MinerV2Partition]` indexed by `PartitionNumber`.

```ipldsch
type MinerV2PartitionAMT struct {
  height Int
  count Int
  node MinerV2PartitionAMTNode
} representation tuple

type MinerV2PartitionAMTNode struct {
  bitmap Bytes
  children [&MinerV2PartitionAMTNode]
  values [MinerV2Partition]
} representation tuple

type MinerV2Partition struct {
  Sectors BitField
  Unproven BitField
  Faults BitField
  Recoveries BitField
  Terminated BitField
  ExpirationsEpochs &MinerV0ExpirationSetAMT # AMT[ChainEpoch]ExpirationSet
  EarlyTerminated &BitFieldQueueAMT # AMT[ChainEpoch]BitField
  LivePower MinerV0PowerPair
  UnprovenPower MinerV0PowerPair
  FaultyPower MinerV0PowerPair
  RecoveringPower MinerV0PowerPair
} representation tuple
```

**AMT**: This is an ADL representing `type MinerV0ExpirationSetList [MinerV0ExpirationSet]` indexed by `ChainEpoch`.

```ipldsch
type MinerV0ExpirationSetAMT struct {
  height Int
  count Int
  node MinerV0ExpirationSetAMTNode
} representation tuple

type MinerV0ExpirationSetAMTNode struct {
  bitmap Bytes
  children [&MinerV0ExpirationSetAMTNode]
  values [MinerV0ExpirationSet]
} representation tuple

type MinerV0ExpirationSet struct {
  OnTimeSectors BitField
  EarlySectors BitField
  OnTimePledge TokenAmount
  ActivePower MinerV0PowerPair
  FaultyPower MinerV0PowerPair
} representation tuple
```

### MultisigActor

The MultisigActor state is the same in v0 and v2.

**v0**

```ipldsch
type MultisigV0State struct {
  Signers [Address]
  NumApprovalsThreshold Int
  NextTxnID TransactionID
  InitialBalance TokenAmount
  StartEpoch ChainEpoch
  UnlockDuration ChainEpoch
  PendingTxns &MultisigV0TransactionHAMT # HAMT[TransactionID]Multisigv0Transaction
} representation tuple
```

**v2** _(Same as v0)_

```ipldsch
type MultisigV2State MultisigV0State
```

**HAMT**: This is an ADL representing `type MultisigV0TransactionMap {TransactionIDBytes:MultisigV0Transaction}`

```ipldsch
type MultisigV0TransactionHAMT struct {
  map Bytes
  data [ MultisigV0TransactionHAMTElement ]
} representation tuple

type MultisigV0TransactionHAMTElement union {
  | MultisigV0TransactionHAMTLink "0"
  | MultisigV0TransactionHAMTBucket "1"
} representation keyed

type MultisigV0TransactionHAMTLink &MultisigV0TransactionHAMT

type MultisigV0TransactionHAMTBucket [ MultisigV0TransactionHAMTBucketEntry ]

type MultisigV0TransactionHAMTBucketEntry struct {
  key Bytes
  value MultisigV0Transaction # inline
} representation tuple

type MultisigV0Transaction struct {
  To Address
  Value TokenAmount
  Method MethodNum
  Params CborEncodedParams
  Approved [Address]
} representation tuple
```

### PaymentChannelActor

The PaymentChannelActor state is the same in v0 and v2.

**v0**

```ipldsch
type PaychV0State struct {
  From Address
  To Address
  ToSend BigInt
  SettlingAt ChainEpoch
  MinSettleHeight ChainEpoch
  LaneStates &PaychV0LaneStatesAMT # AMT[Int]PaychV0LaneState
} representation tuple
```

**v2** _(Same as v0)_

```ipldsch
type PaychV2State PaychV0State
```

**AMT**: This is an ADL representing `type PaychV0LaneStates [PaychV0LaneState]` indexed by Lane ID.

```ipldsch
type PaychV0LaneStatesAMT struct {
  height Int
  count Int
  node PaychV0LaneStatesAMTNode
} representation tuple

type PaychV0LaneStatesAMTNode struct {
  bitmap Bytes
  children [&PaychV0LaneStatesAMTNode]
  values [PaychV0LaneState]
} representation tuple

type PaychV0LaneState struct {
  Redeemed BigInt
  Nonce Int
} representation tuple
```

### StoragePowerActor

The StoragePowerActor state is the same in v0 and v2.

**v0**

```ipldsch
type PowerV0State struct {
  TotalRawBytePower StoragePower
  TotalBytesCommitted StoragePower
  TotalQualityAdjPower StoragePower
  TotalQABytesCommitted StoragePower
  TotalPledgeCollateral TokenAmount
  ThisEpochRawBytePower StoragePower
  ThisEpochQualityAdjPower StoragePower
  ThisEpochPledgeCollateral TokenAmount
  ThisEpochQAPowerSmoothed nullable V0FilterEstimate
  MinerCount Int
  MinerAboveMinPowerCount Int
  CronEventQueue &PowerV0CronEventHAMT # Multimap: HAMT[ChainEpoch]AMT[PowerV0CronEvent]
  FirstCronEpoch ChainEpoch
  LastProcessedCronEpoch ChainEpoch
  Claims &PowerV0ClaimHAMT # HAMT[address]PowerV0Claim
  ProofValidationBatch nullable &ProofValidationBatchHAMT # Multimap: HAMT[Address]AMT[SealVerifyInfo]
} representation tuple
```

**v2** _(Same as v0)_

```ipldsch
type PowerV2State PowerV0State
```

**Multimap (HAMT+AMT)**: This is an ADL representing a List within a Map `type PowerV0CronEventMap {ChainEpochBytes:[PowerV0CronEvent]}`, where the `CronEvent` list is a queue.

```ipldsch
# HAMT/map root structure

type PowerV0CronEventHAMT struct {
  map Bytes
  data [ PowerV0CronEventHAMTElement ]
} representation tuple

type PowerV0CronEventHAMTElement union {
  | PowerV0CronEventHAMTLink "0"
  | PowerV0CronEventHAMTBucket "1"
} representation keyed

type PowerV0CronEventHAMTLink &PowerV0CronEventHAMTLink

type PowerV0CronEventHAMTBucket [ PowerV0CronEventHAMTBucketEntry ]

type PowerV0CronEventHAMTBucketEntry struct {
  key ChainEpochBytes
  value &PowerV0CronEventAMT
} representation tuple

# AMT/set leaf structure (list of CronEvents)

type PowerV0CronEventAMT struct {
  height Int
  count Int
  node PowerV0CronEventAMTNode
} representation tuple

# This can also be the root of a block
type PowerV0CronEventAMTNode struct {
  bitmap Bytes
  children [&PowerV0CronEventAMTNode]
  values [PowerV0CronEvent]
} representation tuple

type PowerV0CronEvent struct {
  MinerAddr Address
  CallbackPayload Bytes
} representation tuple
```

**HAMT**: This is an ADL representing `type PowerV0ClaimMap {Address:PowerV0Claim}`.

```ipldsch
type PowerV0ClaimMapHAMT struct {
  map Bytes
  data [ PowerV0ClaimMapHAMTElement ]
} representation tuple

type PowerV0ClaimMapHAMTElement union {
  | PowerV0ClaimMapHAMTLink "0"
  | PowerV0ClaimMapHAMTBucket "1"
} representation keyed

type PowerV0ClaimMapHAMTLink &PowerV0ClaimMapHAMT

type PowerV0ClaimMapHAMTBucket [ PowerV0ClaimMapHAMTBucketEntry ]

type PowerV0ClaimMapHAMTBucketEntry struct {
  key Address
  value PowerV0Claim
} representation tuple

type PowerV0Claim struct {
  RawBytePower StoragePower
  QualityAdjPower StoragePower
} representation tuple
```

**Multimap (HAMT+AMT)**: This is an ADL representing a List within a Map `type ProofValidationBatchMap {Address:[SealVerifyInfo]}`, where `SealVerifyInfo` is a queue.

```ipldsch
# HAMT/map root structure

type ProofValidationBatchHAMT struct {
  map Bytes
  data [ ProofValidationBatchHAMTElement ]
} representation tuple

type ProofValidationBatchHAMTElement union {
  | ProofValidationBatchHAMTLink "0"
  | ProofValidationBatchHAMTBucket "1"
} representation keyed

type ProofValidationBatchHAMTLink &ProofValidationBatchHAMTLink

type ProofValidationBatchHAMTBucket [ ProofValidationBatchHAMTBucketEntry ]

type ProofValidationBatchHAMTBucketEntry struct {
  key Address
  value &ProofValidationBatchAMT
} representation tuple

# AMT/set leaf structure (list of CronEvents)

type ProofValidationBatchAMT struct {
  height Int
  count Int
  node ProofValidationBatchAMTNode
} representation tuple

# This can also be the root of a block
type ProofValidationBatchAMTNode struct {
  bitmap Bytes
  children [&ProofValidationBatchAMTNode]
  values [SealVerifyInfo]
} representation tuple

type SealVerifyInfo struct {
  SealProof RegisteredSealProof
  SectorID SectorID
  DealIDs [DealID]
  Randomness Bytes
  InteractiveRandomness Bytes
  Proof Bytes
  SealedCID &Any # CommR: A CID with fil-commitment-sealed + poseidon-bls12_381-ac-fc1
  UnsealedCID &Any # CommD: A CID with fil-commitment-unsealed + sha2_256-trunc254-padded
} representation tuple
```

### VerifiedRegistryActor

The VerifiedRegistryActor state is the same in v0 and v2.

**v0**

```ipldsch
type VerifregV0State struct {
  RootKey Address
  Verifiers &DataCapHAMT
  VerifiedClients &DataCapHAMT
}
```

**v2** _(Same as v0)_

```ipldsch
type VerifregV2State VerifregV0State
```

**HAMT**: This is an ADL representing `type DataCapMap {Address:StoragePower}`.

```ipldsch
type DataCapHAMT struct {
  map Bytes
  data [ DataCapHAMTElement ]
} representation tuple

type DataCapHAMTElement union {
  | DataCapHAMTLink "0"
  | DataCapHAMTBucket "1"
} representation keyed

type DataCapHAMTLink &DataCapHAMT

type DataCapHAMTBucket [ DataCapHAMTBucketEntry ]

type DataCapHAMTBucketEntry struct {
  key Address
  value DataCap # inline
} representation tuple
```

### SystemActor

Note that `SystemV0State` is an empty struct, which encodes as an empty CBOR array (`0x80`).

The SystemActor state is the same in v0 and v2.

**v0**

```ipldsch
type SystemV0State struct {
} representation tuple
```

**v2** _(Same as v0)_

```ipldsch
type SystemV2State SystemV0State
```