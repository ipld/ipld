# Filecoin Actor State Data Structures

* [InitActor](#initactor)
  * [v0](#v0)
  * [v2](#v2)
* [CronActor](#cronactor)
  * [v0](#v0-1)
  * [v2](#v2-1)
* [RewardActor](#rewardactor)
  * [v0](#v0-2)
  * [v2](#v2-2)
* [AccountActor](#accountactor)
  * [v0](#v0-3)
  * [v2](#v2-3)
* [StorageMarketActor](#storagemarketactor)
  * [v0](#v0-4)
  * [v2](#v2-4)
* [StorageMinerActor](#storagemineractor)
  * [v0](#v0-5)
  * [v2](#v2-5)
* [MultisigActor](#multisigactor)
  * [v0](#v0-6)
  * [v2](#v2-6)
* [PaymentChannelActor](#paymentchannelactor)
  * [v0](#v0-7)
  * [v2](#v2-7)
* [StoragePowerActor](#storagepoweractor)
  * [v0](#v0-8)
  * [v2](#v2-8)
* [VerifiedRegistryActor](#verifiedregistryactor)
  * [v0](#v0-9)
  * [v2](#v2-9)
* [SystemActor](#systemactor)
  * [v0](#v0-10)
  * [v2](#v2-10)

The Actor State tree attaches to the main chain via the `ParentStateRoot` field of `BlockHeader`. This field either points directly to the `ActorsHAMT` in v0 or via the intermediate `StateRoot` from v2.

See [Actor type linking](chain.md#actor-type-linking) for how each of the Actor State blocks below are attached to and differentiated within the `ActorsHAMT`.

## InitActor

The InitActor state is the same in v0 and v2.

### v0

<a name="initv0state"></a>

```ipldsch
type InitV0State struct {
  AddressMap &ActorIDHAMT # HAMT[Address]ActorID
  NextID ActorID
  NetworkName String
} representation tuple
```

### v2

_(Same as v0)_

<a name="initv2state"></a>

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

## CronActor

The CronActor state is the same in v0 and v2.

### v0

<a name="cronv0state"></a>

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

### v2

_(Same as v0)_

<a name="cronv2state"></a>

```ipldsch
type CronV2State CronV0State
```

## RewardActor

The RewardActor state differs between v0 and v2.

### v0

<a name="rewardv0state"></a>

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
  ThisEpochRewardSmoothed nullable FilterEstimate
  # The baseline power the network is targeting at st.Epoch
  ThisEpochBaselinePower StoragePower
  # Epoch tracks for which epoch the Reward was computed
  Epoch ChainEpoch
  # TotalMined tracks the total FIL awared to block miners
  TotalMined TokenAmount
} representation tuple

# Alpha Beta Filter "position" (value) and "velocity" (rate of change of value) estimates
# Estimates are in Q.128 format
type FilterEstimate struct {
  PositionEstimate BigInt # Q.128
  VelocityEstimate BigInt # Q.128
} representation tuple
```

### v2

<a name="rewardv2state"></a>

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
  ThisEpochRewardSmoothed FilterEstimate
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

## AccountActor

The CronActor state is the same in v0 and v2 and only contains an `Address`.

### v0

<a name="accountv0state"></a>

```ipldsch
type AccountV0State struct {
  Address Address
} representation tuple
```

### v2

_(Same as v0)_

<a name="accountv2state"></a>

```ipldsch
type AccountV2State AccountV0State
```

## StorageMarketActor

The StorageMarketActor state is the same in v0 and v2.

### v0

<a name="marketv0state"></a>

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

### v2

_(Same as v0)_

<a name="marketv2state"></a>

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

## StorageMinerActor

### v0

<a name="minerv0state"></a>

> Balance of Miner Actor should be greater than or equal to
> the sum of PreCommitDeposits and LockedFunds.
> It is possible for balance to fall below the sum of
> PCD, LF and InitialPledgeRequirements, and this is a bad
> state (IP Debt) that limits a miner actor's behavior (i.e. no balance withdrawals)
> Excess balance as computed by st.GetAvailableBalance will be
> withdrawable or usable for pre-commit deposit or pledge lock-up.

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
  # Account that owns this miner.
  # - Income and returned collateral are paid to this address.
  # - This address is also allowed to change the worker address for the miner.
  Owner Address # Must be an ID-address
  # Worker account for this miner.
  # The associated pubkey-type address is used to sign blocks and messages on behalf of this miner.
  Worker Address # Must be an ID-address.
  # Additional addresses that are permitted to submit messages controlling this actor (optional)
  ControlAddresses nullable [Address]
  PendingWorkerKey nullable MinerV0WorkerKeyChange
  # Byte array representing a Libp2p identity that should be used when connecting to this miner
  PeerId PeerID
  # Slice of byte arrays representing Libp2p multi-addresses used for establishing a connection with this miner
  Multiaddrs nullable [Multiaddr]
  # The proof type used by this miner for sealing sectors
  SealProofType Int
  # Amount of space in each sector committed by this miner.
  # This is computed from the proof type and represented here redundantly.
  SectorSize SectorSize
  # The number of sectors in each Window PoSt partition (proof).
  # This is computed from the proof type and represented here redundantly.
  WindowPoStPartitionSectors Int
} representation tuple

type MinerV0WorkerKeyChange struct {
  NewWorker Address # Must be an ID address
  EffectiveAt ChainEpoch
} representation tuple
```

```ipldsch
# VestingFunds represents the vesting table state for the miner.
# It is a slice of (VestingEpoch, VestingAmount).
# The slice will always be sorted by the VestingEpoch.
type MinerV0VestingFunds struct {
  Funds [MinerV0VestingFund]
} representation tuple

# VestingFund represents miner funds that will vest at the given epoch.
type MinerV0VestingFund struct {
  Epoch ChainEpoch
  Amount TokenAmount
} representation tuple
```

```ipldsch
# Deadlines contains Deadline objects, describing the sectors due at the given
# deadline and their state (faulty, terminated, recovering, etc.).
type MinerV0Deadlines struct {
  Due MinerV0DeadlineLinkList
} representation tuple

# Must be 48 CIDs
type MinerV0DeadlineLinkList [&MinerV0Deadline]
```

```ipldsch
# Deadline holds the state for all sectors due at a specific deadline.
type MinerV0Deadline struct {
  # Partitions in this deadline, in order.
  # The keys of this AMT are always sequential integers beginning with zero.
  Partitions &MinerV0PartitionAMT # AMT[PartitionNumber]Partition
  # Maps epochs to partitions that _may_ have sectors that expire in or
  # before that epoch, either on-time or early as faults.
  # Keys are quantized to final epochs in each proving deadline.
  # NOTE: Partitions MUST NOT be removed from this queue (until the
  # associated epoch has passed) even if they no longer have sectors
  # expiring at that epoch. Sectors expiring at this epoch may later be
  # recovered, and this queue will not be updated at that time.
  ExpirationEpochs &BitFieldQueueAMT # AMT[ChainEpoch]BitField
  # Partitions numbers with PoSt submissions since the proving period started.
  PostSubmissions BitField
  # Partitions with sectors that terminated early.
  EarlyTerminations BitField
  # The number of non-terminated sectors in this deadline (incl faulty).
  LiveSectors Int
  # The total number of sectors in this deadline (incl dead).
  TotalSectors Int
  # Memoized sum of faulty power in partitions.
  FaultyPower MinerV0PowerPair
} representation tuple
```

### v2

<a name="minerv2state"></a>

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
  Sectors &MinerV2SectorOnChainInfoAMT # AMT[SectorNumber]SectorOnChainInfo
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
  # Account that owns this miner.
  # - Income and returned collateral are paid to this address.
  # - This address is also allowed to change the worker address for the miner.
  Owner Address # Must be an ID-address
  # Worker account for this miner.
  # The associated pubkey-type address is used to sign blocks and messages on behalf of this miner.
  Worker Address # Must be an ID-address
  # Additional addresses that are permitted to submit messages controlling this actor (optional).
  ControlAddresses nullable [Address] # Must all be ID addresses
  PendingWorkerKey nullable MinerV0WorkerKeyChange
  # Byte array representing a Libp2p identity that should be used when connecting to this miner.
  PeerId PeerID
  # Slice of byte arrays representing Libp2p multi-addresses used for establishing a connection with this miner.
  Multiaddrs nullable [Multiaddr]
  # The proof type used by this miner for sealing sectors.
  SealProofType Int
  # Amount of space in each sector committed by this miner.
  # This is computed from the proof type and represented here redundantly.
  SectorSize SectorSize
  # The number of sectors in each Window PoSt partition (proof).
  # This is computed from the proof type and represented here redundantly.
  WindowPoStPartitionSectors Int
  # The next epoch this miner is eligible for certain permissioned actor methods
  # and winning block elections as a result of being reported for a consensus fault.
  ConsensusFaultElapsed ChainEpoch
  # A proposed new owner account for this miner.
  # Must be confirmed by a message from the pending address itself.
  PendingOwnerAddress nullable Address
} representation tuple
```

Ssame form as `MinerV0Deadlines` but the eventual link to `MinerV2Partition` is different.

```ipldsch
# Deadlines contains Deadline objects, describing the sectors due at the given
# deadline and their state (faulty, terminated, recovering, etc.).
type MinerV2Deadlines struct {
  Due MinerV2DeadlineLinkList
} representation tuple

# Must be 48 CIDs
type MinerV2DeadlineLinkList [&MinerV2Deadline]
```

```ipldsch
# Deadline holds the state for all sectors due at a specific deadline.
type MinerV2Deadline struct {
  # Partitions in this deadline, in order.
  # The keys of this AMT are always sequential integers beginning with zero.
  Partitions &MinerV2PartitionAMT # AMT[PartitionNumber]Partition
  # Maps epochs to partitions that _may_ have sectors that expire in or
  # before that epoch, either on-time or early as faults.
  # Keys are quantized to final epochs in each proving deadline.
  # NOTE: Partitions MUST NOT be removed from this queue (until the
  # associated epoch has passed) even if they no longer have sectors
  # expiring at that epoch. Sectors expiring at this epoch may later be
  # recovered, and this queue will not be updated at that time.
  ExpirationEpochs &BitFieldQueueAMT # AMT[ChainEpoch]BitField
  # Partitions numbers with PoSt submissions since the proving period started.
  PostSubmissions BitField
  # Partitions with sectors that terminated early.
  EarlyTerminations BitField
  # The number of non-terminated sectors in this deadline (incl faulty).
  LiveSectors Int
  # The total number of sectors in this deadline (incl dead).
  TotalSectors Int
  # Memoized sum of faulty power in partitions.
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

# Information stored on-chain for a pre-committed sector
type MinerV0SectorPreCommitOnChainInfo struct {
  Info MinerV0SectorPreCommitInfo
  PreCommitDeposit TokenAmount
  PreCommitEpoch ChainEpoch
  # Integral of active deals over sector lifetime
  DealWeight DealWeight
  # Integral of active verified deals over sector lifetime
  VerifiedDealWeight DealWeight
} representation tuple

# Information provided by a miner when pre-committing a sector
type MinerV0SectorPreCommitInfo struct {
  SealProof RegisteredSealProof
  SectorNumber SectorNumber
  # CommR: A CID with fil-commitment-sealed + poseidon-bls12_381-ac-fc1
  SealedCID &Any
  SealRandEpoch ChainEpoch
  DealIDs [DealID]
  Expiration ChainEpoch
  # Whether to replace a "committed capacity" no-deal sector (requires non-empty DealIDs)
  ReplaceCapacity Bool
  # The committed capacity sector to replace, and it's deadline/partition location
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

**AMT**: This is an ADL representing `type V0SectorOnChainInfoList [V0SectorOnChainInfo]` indexed by `SectorNumber`.

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

# Information stored on-chain for a proven sector
type MinerV0SectorOnChainInfo struct {
  SectorNumber SectorNumber
  # The seal proof type implies the PoSt proof/s
  SealProof RegisteredSealProof
  # CommR: A CID with fil-commitment-sealed + poseidon-bls12_381-ac-fc1
  SealedCID &Any
  DealIDs [DealID]
  # Epoch during which the sector proof was accepted
  Activation ChainEpoch
  # Epoch during which the sector expires
  Expiration ChainEpoch
  # Integral of active deals over sector lifetime
  DealWeight DealWeight
  # Integral of active verified deals over sector lifetime
  VerifiedDealWeight DealWeight
  # Pledge collected to commit this sector
  InitialPledge TokenAmount
  # Expected one day projection of reward for sector computed at activation time
  ExpectedDayReward TokenAmount
  # Expected twenty day projection of reward for sector computed at activation time
  ExpectedStoragePledge TokenAmount
} representation tuple
```

**AMT**: This is an ADL representing `type V2SectorOnChainInfoList [V2SectorOnChainInfo]` indexed by `SectorNumber`.

```ipldsch
type MinerV2SectorOnChainInfoAMT struct {
  height Int
  count Int
  node MinerV2SectorOnChainInfoAMTNode
} representation tuple

type MinerV2SectorOnChainInfoAMTNode struct {
  bitmap Bytes
  children [&MinerV2SectorOnChainInfoAMTNode]
  values [MinerV2SectorOnChainInfo]
} representation tuple

# Information stored on-chain for a proven sector
type MinerV2SectorOnChainInfo struct {
  SectorNumber SectorNumber
  # The seal proof type implies the PoSt proof/s
  SealProof RegisteredSealProof
  # CommR: A CID with fil-commitment-sealed + poseidon-bls12_381-ac-fc1
  SealedCID &Any
  DealIDs [DealID]
  # Epoch during which the sector proof was accepted
  Activation ChainEpoch
  # Epoch during which the sector expires
  Expiration ChainEpoch
  # Integral of active deals over sector lifetime
  DealWeight DealWeight
  # Integral of active verified deals over sector lifetime
  VerifiedDealWeight DealWeight
  # Pledge collected to commit this sector
  InitialPledge TokenAmount
  # Expected one day projection of reward for sector computed at activation time
  ExpectedDayReward TokenAmount
  # Expected twenty day projection of reward for sector computed at activation time
  ExpectedStoragePledge TokenAmount
  # Age of sector this sector replaced or zero
  ReplacedSectorAge ChainEpoch
  # Day reward of sector this sector replace or zero
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
  # Sector numbers in this partition, including faulty and terminated sectors
  Sectors BitField
  # Subset of sectors detected/declared faulty and not yet recovered (excl. from PoSt).
  # Faults ∩ Terminated = ∅
  Faults BitField
  # Subset of faulty sectors expected to recover on next PoSt
  # Recoveries ∩ Terminated = ∅
  Recoveries BitField
  # Subset of sectors terminated but not yet removed from partition (excl. from PoSt)
  Terminated BitField
  # Maps epochs sectors that expire in or before that epoch.
  # An expiration may be an "on-time" scheduled expiration, or early "faulty" expiration.
  # Keys are quantized to last-in-deadline epochs.
  ExpirationsEpochs &MinerV0ExpirationSetAMT # AMT[ChainEpoch]ExpirationSet
  # Subset of terminated that were before their committed expiration epoch, by termination epoch.
  # Termination fees have not yet been calculated or paid and associated deals have not yet been
  # canceled but effective power has already been adjusted.
  # Not quantized.
  EarlyTerminated &BitFieldQueueAMT # AMT[ChainEpoch]BitField
  # Power of not-yet-terminated sectors (incl faulty)
  LivePower MinerV0PowerPair
  # Power of currently-faulty sectors. FaultyPower <= LivePower.
  FaultyPower MinerV0PowerPair
  # Power of expected-to-recover sectors. RecoveringPower <= FaultyPower.
  RecoveringPower MinerV0PowerPair
} representation tuple

# Value type for a pair of raw and QA power
type MinerV0PowerPair struct {
  Raw StoragePower
  QA StoragePower
} representation tuple
```

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
  # Sector numbers in this partition, including faulty, unproven, and terminated sectors
  Sectors BitField
  # Unproven sectors in this partition. This bitfield will be cleared on
  # a successful window post (or at the end of the partition's next
  # deadline). At that time, any still unproven sectors will be added to
  # the faulty sector bitfield.
  Unproven BitField
  # Subset of sectors detected/declared faulty and not yet recovered (excl. from PoSt).
  # Faults ∩ Terminated = ∅
  Faults BitField
  # Subset of faulty sectors expected to recover on next PoSt
  # Recoveries ∩ Terminated = ∅
  Recoveries BitField
  # Subset of sectors terminated but not yet removed from partition (excl. from PoSt)
  Terminated BitField
  # Maps epochs sectors that expire in or before that epoch.
  # An expiration may be an "on-time" scheduled expiration, or early "faulty" expiration.
  # Keys are quantized to last-in-deadline epochs.
  ExpirationsEpochs &MinerV0ExpirationSetAMT # AMT[ChainEpoch]ExpirationSet
  # Subset of terminated that were before their committed expiration epoch, by termination epoch.
  # Termination fees have not yet been calculated or paid and associated deals have not yet been
  # canceled but effective power has already been adjusted.
  # Not quantized.
  EarlyTerminated &BitFieldQueueAMT # AMT[ChainEpoch]BitField
  # Power of not-yet-terminated sectors (incl faulty & unproven)
  LivePower MinerV0PowerPair
  # Power of yet-to-be-proved sectors (never faulty)
  UnprovenPower MinerV0PowerPair
  # Power of currently-faulty sectors. FaultyPower <= LivePower.
  FaultyPower MinerV0PowerPair
  # Power of expected-to-recover sectors. RecoveringPower <= FaultyPower.
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

# ExpirationSet is a collection of sector numbers that are expiring, either due to
# expected "on-time" expiration at the end of their life, or unexpected "early" termination
# due to being faulty for too long consecutively.
# Note that there is not a direct correspondence between on-time sectors and active power;
# a sector may be faulty but expiring on-time if it faults just prior to expected termination.
# Early sectors are always faulty, and active power always represents on-time sectors.
type MinerV0ExpirationSet struct {
  # Sectors expiring "on time" at the end of their committed life
  OnTimeSectors BitField
  # Sectors expiring "early" due to being faulty for too long
  EarlySectors BitField
  # Pledge total for the on-time sectors
  OnTimePledge TokenAmount
  # Power that is currently active (not faulty)
  ActivePower MinerV0PowerPair
  # Power that is currently faulty
  FaultyPower MinerV0PowerPair
} representation tuple
```

## MultisigActor

The MultisigActor state is the same in v0 and v2.

### v0

<a name="multisigv0state"></a>

```ipldsch
type MultisigV0State struct {
   # Signers may be either public-key or actor ID-addresses. The ID address is canonical, but doesn't exist
  # for a public key that has not yet received a message on chain.
  # If any signer address is a public-key address, it will be resolved to an ID address and persisted
  # in this state when the address is used.
  Signers [Address]
  NumApprovalsThreshold Int
  NextTxnID TransactionID
  # Linear unlock
  InitialBalance TokenAmount
  StartEpoch ChainEpoch
  UnlockDuration ChainEpoch
  PendingTxns &MultisigV0TransactionHAMT # HAMT[TransactionID]Multisigv0Transaction
} representation tuple
```

### v2

_(Same as v0)_

<a name="multisigv2state"></a>

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
  # This address at index 0 is the transaction proposer, order of this slice must be preserved.
  Approved [Address]
} representation tuple
```

## PaymentChannelActor

The PaymentChannelActor state is the same in v0 and v2.

### v0

<a name="paychv0state"></a>

> A given payment channel actor is established by From
> to enable off-chain microtransactions to To to be reconciled
> and tallied on chain.

```ipldsch
type PaychV0State struct {
  # Channel owner, who has funded the actor
  From Address
  # Recipient of payouts from channel
  To Address
  # Amount successfully redeemed through the payment channel, paid out on `Collect()`
  ToSend BigInt
  # Height at which the channel can be `Collected`
  SettlingAt ChainEpoch
  # Height before which the channel `ToSend` cannot be collected
  MinSettleHeight ChainEpoch
  # Collections of lane states for the channel, maintained in ID order.
  LaneStates &PaychV0LaneStatesAMT # AMT[Int]PaychV0LaneState
} representation tuple
```

### v2

_(Same as v0)_

<a name="paychv2state"></a>

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

# The Lane state tracks the latest (highest) voucher nonce used to merge the lane
# as well as the amount it has already redeemed.
type PaychV0LaneState struct {
  Redeemed BigInt
  Nonce Int
} representation tuple
```

## StoragePowerActor

The StoragePowerActor state is the same in v0 and v2.

### v0

<a name="powerv0state"></a>

```ipldsch
type PowerV0State struct {
  TotalRawBytePower StoragePower
  # TotalBytesCommitted includes claims from miners below min power threshold
  TotalBytesCommitted StoragePower
  TotalQualityAdjPower StoragePower
  # TotalQABytesCommitted includes claims from miners below min power threshold
  TotalQABytesCommitted StoragePower
  TotalPledgeCollateral TokenAmount
  # These fields are set once per epoch in the previous cron tick and used
  # for consistent values across a single epoch's state transition.
  ThisEpochRawBytePower StoragePower
  ThisEpochQualityAdjPower StoragePower
  ThisEpochPledgeCollateral TokenAmount
  ThisEpochQAPowerSmoothed nullable FilterEstimate
  MinerCount Int
  # Number of miners having proven the minimum consensus power
  MinerAboveMinPowerCount Int
  # A queue of events to be triggered by cron, indexed by epoch
  CronEventQueue &PowerV0CronEventHAMT # Multimap: HAMT[ChainEpoch]AMT[PowerV0CronEvent]
  # First epoch in which a cron task may be stored.
  # Cron will iterate every epoch between this and the current epoch inclusively to find tasks to execute.
  FirstCronEpoch ChainEpoch
  # Last epoch power cron tick has been processed
  LastProcessedCronEpoch ChainEpoch
  # Claimed power for each miner
  Claims &PowerV0ClaimHAMT # HAMT[address]PowerV0Claim
  ProofValidationBatch nullable &ProofValidationBatchHAMT # Multimap: HAMT[Address]AMT[SealVerifyInfo]
} representation tuple
```

### v2

<a name="powerv2state"></a>

```ipldsch
type PowerV2State struct {
  TotalRawBytePower StoragePower
  # TotalBytesCommitted includes claims from miners below min power threshold
  TotalBytesCommitted StoragePower
  TotalQualityAdjPower StoragePower
  # TotalQABytesCommitted includes claims from miners below min power threshold
  TotalQABytesCommitted StoragePower
  TotalPledgeCollateral TokenAmount
  # These fields are set once per epoch in the previous cron tick and used
  # for consistent values across a single epoch's state transition.
  ThisEpochRawBytePower StoragePower
  ThisEpochQualityAdjPower StoragePower
  ThisEpochPledgeCollateral TokenAmount
  ThisEpochQAPowerSmoothed FilterEstimate
  MinerCount Int
  # Number of miners having proven the minimum consensus power
  MinerAboveMinPowerCount Int
  # A queue of events to be triggered by cron, indexed by epoch
  CronEventQueue &PowerV0CronEventHAMT # Multimap: HAMT[ChainEpoch]AMT[PowerV0CronEvent]
  # First epoch in which a cron task may be stored.
  # Cron will iterate every epoch between this and the current epoch inclusively to find tasks to execute.
  FirstCronEpoch ChainEpoch
  # Claimed power for each miner
  Claims &PowerV2ClaimHAMT # HAMT[address]PowerV2Claim
  ProofValidationBatch nullable &ProofValidationBatchHAMT # Multimap: HAMT[Address]AMT[SealVerifyInfo]
} representation tuple
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
  # Sum of raw byte power for a miner's sectors
  RawBytePower StoragePower
  # Sum of quality adjusted power for a miner's sectors
  QualityAdjPower StoragePower
} representation tuple
```

**HAMT**: This is an ADL representing `type PowerV2ClaimMap {Address:PowerV2Claim}`.

```ipldsch
type PowerV2ClaimMapHAMT struct {
  map Bytes
  data [ PowerV2ClaimMapHAMTElement ]
} representation tuple

type PowerV2ClaimMapHAMTElement union {
  | PowerV2ClaimMapHAMTLink "0"
  | PowerV2ClaimMapHAMTBucket "1"
} representation keyed

type PowerV2ClaimMapHAMTLink &PowerV2ClaimMapHAMT

type PowerV2ClaimMapHAMTBucket [ PowerV2ClaimMapHAMTBucketEntry ]

type PowerV2ClaimMapHAMTBucketEntry struct {
  key Address
  value PowerV2Claim
} representation tuple

type PowerV2Claim struct {
  # Miner's proof type used to determine minimum miner size
  SealProofType RegisteredSealProof
  # Sum of raw byte power for a miner's sectors
  RawBytePower StoragePower
  # Sum of quality adjusted power for a miner's sectors
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

# Information needed to verify a seal proof.
type SealVerifyInfo struct {
  SealProof RegisteredSealProof
  SectorID SectorID
  DealIDs [DealID]
  Randomness Bytes
  InteractiveRandomness Bytes
  Proof Bytes
  # Safe because we get those from the miner actor
  SealedCID &Any # CommR: A CID with fil-commitment-sealed + poseidon-bls12_381-ac-fc1
  UnsealedCID &Any # CommD: A CID with fil-commitment-unsealed + sha2_256-trunc254-padded
} representation tuple
```

## VerifiedRegistryActor

The VerifiedRegistryActor state is the same in v0 and v2.

### v0

<a name="verifregv0state"></a>

```ipldsch
type VerifregV0State struct {
  # Root key holder multisig.
  # Authorize and remove verifiers.
  RootKey Address
  # Verifiers authorize VerifiedClients.
  # Verifiers delegate their DataCap.
  Verifiers &DataCapHAMT
  # VerifiedClients can add VerifiedClientData, up to DataCap.
  VerifiedClients &DataCapHAMT
}
```

### v2

_(Same as v0)_

<a name="verifregv2state"></a>

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

## SystemActor

Note that `SystemV0State` is an empty struct, which encodes as an empty CBOR array (`0x80`).

The SystemActor state is the same in v0 and v2.

### v0

<a name="systemv0state"></a>

```ipldsch
type SystemV0State struct {
} representation tuple
```

### v2

_(Same as v0)_

<a name="systemv2state"></a>

```ipldsch
type SystemV2State SystemV0State
```
