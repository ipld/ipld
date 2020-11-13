# Filecoin Messages Data Structures

* [InitActor](#initactor)
  * [v0](#v0)
    * [Constructor](#constructor)
    * [Exec](#exec)
  * [v2](#v2)
    * [Constructor](#constructor-1)
    * [Exec](#exec-1)
* [RewardActor](#rewardactor)
  * [v0](#v0-1)
    * [Constructor](#constructor-2)
    * [AwardBlockReward](#awardblockreward)
    * [ThisEpochReward](#thisepochreward)
    * [UpdateNetworkKPI](#updatenetworkkpi)
  * [v2](#v2-1)
    * [Constructor](#constructor-3)
    * [AwardBlockReward](#awardblockreward-1)
    * [ThisEpochReward](#thisepochreward-1)
    * [UpdateNetworkKPI](#updatenetworkkpi-1)
* [CronActor](#cronactor)
  * [v0](#v0-2)
    * [Constructor](#constructor-4)
    * [EpochTick](#epochtick)
  * [v2](#v2-2)
    * [Constructor](#constructor-5)
    * [EpochTick](#epochtick-1)
* [AccountActor](#accountactor)
  * [v0](#v0-3)
    * [Constructor](#constructor-6)
    * [PubkeyAddress](#pubkeyaddress)
  * [v2](#v2-3)
    * [Constructor](#constructor-7)
    * [PubkeyAddress](#pubkeyaddress-1)
* [StorageMarketActor](#storagemarketactor)
  * [v0](#v0-4)
    * [Constructor](#constructor-8)
    * [AddBalance](#addbalance)
    * [WithdrawBalance](#withdrawbalance)
    * [PublishStorageDeals](#publishstoragedeals)
    * [VerifyDealsForActivation](#verifydealsforactivation)
    * [ActivateDeals](#activatedeals)
    * [OnMinerSectorsTerminate](#onminersectorsterminate)
    * [ComputeDataCommitment](#computedatacommitment)
    * [CronTick](#crontick)
  * [v2](#v2-4)
    * [Constructor](#constructor-9)
    * [AddBalance](#addbalance-1)
    * [WithdrawBalance](#withdrawbalance-1)
    * [PublishStorageDeals](#publishstoragedeals-1)
    * [VerifyDealsForActivation](#verifydealsforactivation-1)
    * [ActivateDeals](#activatedeals-1)
    * [OnMinerSectorsTerminate](#onminersectorsterminate-1)
    * [ComputeDataCommitment](#computedatacommitment-1)
    * [CronTick](#crontick-1)
* [StorageMinerActor](#storagemineractor)
  * [v0](#v0-5)
    * [Constructor](#constructor-10)
    * [ControlAddresses](#controladdresses)
    * [ChangeWorkerAddress](#changeworkeraddress)
    * [ChangePeerID](#changepeerid)
    * [SubmitWindowedPoSt](#submitwindowedpost)
    * [PreCommitSector](#precommitsector)
    * [ProveCommitSector](#provecommitsector)
    * [ExtendSectorExpiration](#extendsectorexpiration)
    * [TerminateSectors](#terminatesectors)
    * [DeclareFaults](#declarefaults)
    * [DeclareFaultsRecovered](#declarefaultsrecovered)
    * [OnDeferredCronEvent](#ondeferredcronevent)
    * [CheckSectorProven](#checksectorproven)
    * [AddLockedFund](#addlockedfund)
    * [ReportConsensusFault](#reportconsensusfault)
    * [WithdrawBalance](#withdrawbalance-2)
    * [ConfirmSectorProofsValid](#confirmsectorproofsvalid)
    * [ChangeMultiaddrs](#changemultiaddrs)
    * [CompactPartitions](#compactpartitions)
    * [CompactSectorNumbers](#compactsectornumbers)
  * [v2](#v2-5)
    * [Constructor](#constructor-11)
    * [ControlAddresses](#controladdresses-1)
    * [ChangeWorkerAddress](#changeworkeraddress-1)
    * [ChangePeerID](#changepeerid-1)
    * [SubmitWindowedPoSt](#submitwindowedpost-1)
    * [PreCommitSector](#precommitsector-1)
    * [ProveCommitSector](#provecommitsector-1)
    * [ExtendSectorExpiration](#extendsectorexpiration-1)
    * [TerminateSectors](#terminatesectors-1)
    * [DeclareFaults](#declarefaults-1)
    * [DeclareFaultsRecovered](#declarefaultsrecovered-1)
    * [OnDeferredCronEvent](#ondeferredcronevent-1)
    * [CheckSectorProven](#checksectorproven-1)
    * [ApplyRewards](#applyrewards)
    * [ReportConsensusFault](#reportconsensusfault-1)
    * [WithdrawBalance](#withdrawbalance-3)
    * [ConfirmSectorProofsValid](#confirmsectorproofsvalid-1)
    * [ChangeMultiaddrs](#changemultiaddrs-1)
    * [CompactPartitions](#compactpartitions-1)
    * [CompactSectorNumbers](#compactsectornumbers-1)
    * [ConfirmUpdateWorkerKey](#confirmupdateworkerkey)
    * [RepayDebt](#repaydebt)
    * [ChangeOwnerAddress](#changeowneraddress)
* [MultisigActor](#multisigactor)
  * [v0](#v0-6)
    * [Constructor](#constructor-12)
    * [Propose](#propose)
    * [Approve](#approve)
    * [Cancel](#cancel)
    * [AddSigner](#addsigner)
    * [RemoveSigner](#removesigner)
    * [SwapSigner](#swapsigner)
    * [ChangeNumApprovalsThreshold](#changenumapprovalsthreshold)
    * [LockBalance](#lockbalance)
  * [v2](#v2-6)
    * [Constructor](#constructor-13)
    * [Propose](#propose-1)
    * [Approve](#approve-1)
    * [Cancel](#cancel-1)
    * [AddSigner](#addsigner-1)
    * [RemoveSigner](#removesigner-1)
    * [SwapSigner](#swapsigner-1)
    * [ChangeNumApprovalsThreshold](#changenumapprovalsthreshold-1)
    * [LockBalance](#lockbalance-1)
* [PaymentChannelActor](#paymentchannelactor)
  * [v0](#v0-7)
    * [Constructor](#constructor-14)
    * [UpdateChannelState](#updatechannelstate)
    * [Settle](#settle)
    * [Collect](#collect)
  * [v2](#v2-7)
    * [Constructor](#constructor-15)
    * [UpdateChannelState](#updatechannelstate-1)
    * [Settle](#settle-1)
    * [Collect](#collect-1)
* [StoragePowerActor](#storagepoweractor)
  * [v0](#v0-8)
    * [Constructor](#constructor-16)
    * [CreateMiner](#createminer)
    * [UpdateClaimedPower](#updateclaimedpower)
    * [EnrollCronEvent](#enrollcronevent)
    * [OnEpochTickEnd](#onepochtickend)
    * [UpdatePledgeTotal](#updatepledgetotal)
    * [OnConsensusFault](#onconsensusfault)
    * [SubmitPoRepForBulkVerify](#submitporepforbulkverify)
    * [CurrentTotalPower](#currenttotalpower)
  * [v2](#v2-8)
    * [Constructor](#constructor-17)
    * [CreateMiner](#createminer-1)
    * [UpdateClaimedPower](#updateclaimedpower-1)
    * [EnrollCronEvent](#enrollcronevent-1)
    * [OnEpochTickEnd](#onepochtickend-1)
    * [UpdatePledgeTotal](#updatepledgetotal-1)
    * [OnConsensusFault](#onconsensusfault-1)
    * [SubmitPoRepForBulkVerify](#submitporepforbulkverify-1)
    * [CurrentTotalPower](#currenttotalpower-1)
* [VerifiedRegistryActor](#verifiedregistryactor)
  * [v0](#v0-9)
    * [Constructor](#constructor-18)
    * [AddVerifier](#addverifier)
    * [RemoveVerifier](#removeverifier)
    * [AddVerifiedClient](#addverifiedclient)
    * [UseBytes](#usebytes)
    * [RestoreBytes](#restorebytes)
  * [v2](#v2-9)
    * [Constructor](#constructor-19)
    * [AddVerifier](#addverifier-1)
    * [RemoveVerifier](#removeverifier-1)
    * [AddVerifiedClient](#addverifiedclient-1)
    * [UseBytes](#usebytes-1)
    * [RestoreBytes](#restorebytes-1)
* [SystemActor](#systemactor)
  * [v0](#v0-10)
    * [Constructor](#constructor-20)
  * [v2](#v2-10)
    * [Constructor](#constructor-21)

Each actor accepts a number of messages. Each message requires a DAG-CBOR encoded parameters structure and a DAG-CBOR encoded return value.

Below, the message type parameters are named in the following way: `MessageParamsACTORVXTYPE` where `ACTOR` is the actor name, `X` is the version (`0` or `2`) and `TYPE` is the message type. Likewise, the returns are named `MessageReturnACTORVXTYPE`.

Most parameters and returns are identical between v0 and v2. The types are present for v2 in all cases but are aliased to the v0 type where the details haven't changed.

## InitActor

### v0

#### Constructor

```ipldsch
type MessageParamsInitV0Constructor struct {
  NetworkName String
} representation tuple

type MessageReturnInitV0Constructor struct {
} representation tuple
```

#### Exec

```ipldsch
type MessageParamsInitV0Exec struct {
  CodeCID &Any # An inline CID encoded as raw+identity
  ConstructorParams Bytes
} representation tuple

type MessageReturnInitV0Exec struct {
  IDAddress Address # The canonical ID-based address for the actor
  RobustAddress Address # A more expensive but re-org-safe address for the newly created actor
} representation tuple
```

### v2

#### Constructor

```ipldsch
type MessageParamsInitV2Constructor MessageParamsInitV0Constructor
type MessageReturnInitV2Constructor MessageReturnInitV0Constructor
```

#### Exec

```ipldsch
type MessageParamsInitV2Exec MessageParamsInitV0Exec
type MessageReturnInitV2Exec MessageReturnInitV0Exec
```

## RewardActor

### v0

#### Constructor

```ipldsch
type MessageParamsRewardV0Constructor StoragePower

type MessageReturnRewardV0Constructor struct {
} representation tuple
```

#### AwardBlockReward

```ipldsch
type MessageParamsRewardV0AwardBlockReward struct {
  Miner Address
  Penalty TokenAmount # penalty for including bad messages in a block, >= 0
  GasReward TokenAmount # gas reward from all gas fees in a block, >= 0
  WinCount Int # number of reward units won, > 0
} representation tuple

type MessageReturnRewardV0Constructor struct {
} representation tuple
```

#### ThisEpochReward

```ipldsch
type MessageParamsRewardV0ThisEpochReward struct {
} representation tuple

type MessageReturnRewardV0ThisEpochReward struct {
  ThisEpochReward TokenAmount
  ThisEpochRewardSmoothed FilterEstimate
  ThisEpochBaselinePower StoragePower
} representation tuple
```

#### UpdateNetworkKPI

```ipldsch
type MessageParamsRewardV0UpdateNetworkKPI StoragePower

type MessageReturnRewardV0UpdateNetworkKPI struct {
} representation tuple
```

### v2

#### Constructor

```ipldsch
type MessageParamsRewardV2Constructor MessageParamsRewardV0Constructor
type MessageReturnRewardV2Constructor MessageReturnRewardV0Constructor
```

#### AwardBlockReward

```ipldsch
type MessageParamsRewardV2AwardBlockReward MessageParamsRewardV0AwardBlockReward
type MessageReturnRewardV2Constructor MessageReturnRewardV0Constructor
```

#### ThisEpochReward

```ipldsch
type MessageParamsRewardV2ThisEpochReward MessageParamsRewardV0ThisEpochReward

type MessageReturnRewardV2ThisEpochReward struct {
  ThisEpochRewardSmoothed FilterEstimate
  ThisEpochBaselinePower StoragePower
} representation tuple
```

#### UpdateNetworkKPI

```ipldsch
type MessageParamsRewardV2UpdateNetworkKPI MessageParamsRewardV0UpdateNetworkKPI
type MessageReturnRewardV2UpdateNetworkKPI MessageReturnRewardV0UpdateNetworkKPI
```

## CronActor

### v0

#### Constructor

```ipldsch
type MessageParamsCronV0Constructor struct {
  Entries [CronV0Entry]
} representation tuple

type MessageReturnCronV0Constructor struct {
} representation tuple
```

#### EpochTick

```ipldsch
type MessageParamsCronV0EpochTick struct {
} representation tuple

type MessageReturnCronV0EpochTick struct {
} representation tuple
```

### v2

#### Constructor

```ipldsch
type MessageParamsCronV2Constructor MessageParamsCronV0Constructor
type MessageReturnCronV2Constructor MessageReturnCronV0Constructor
```

#### EpochTick

```ipldsch
type MessageParamsCronV2EpochTick MessageParamsCronV0EpochTick
type MessageReturnCronV2EpochTick MessageReturnCronV0EpochTick
```

## AccountActor

### v0

#### Constructor

```ipldsch
type MessageParamsAccountV0Constructor Address

type MessageReturnAccountV0Constructor struct {
} representation tuple
```

#### PubkeyAddress

```ipldsch
type MessageParamsAccountV0PubkeyAddress struct {
} representation tuple

type MessageReturnAccountV0PubkeyAddress Address
```

### v2

#### Constructor

```ipldsch
type MessageParamsAccountV2Constructor MessageParamsAccountV0Constructor
type MessageReturnAccountV2Constructor MessageReturnAccountV0Constructor
```

#### PubkeyAddress

```ipldsch
type MessageParamsAccountV2PubkeyAddress MessageParamsAccountV0PubkeyAddress
type MessageReturnAccountV2PubkeyAddress MessageReturnAccountV0PubkeyAddress
```

## StorageMarketActor

### v0

#### Constructor

```ipldsch
type MessageParamsMarketV0Constructor struct {
} representation tuple

type MessageReturnMarketV0Constructor struct {
} representation tuple
```

#### AddBalance

```ipldsch
type MessageParamsMarketV0AddBalance Address

type MessageReturnMarketV0AddBalance struct {
} representation tuple
```

#### WithdrawBalance

```ipldsch
type MessageParamsMarketV0WithdrawBalance struct {
  ProviderOrClientAmount Address
  Amount TokenAmount
} representation tuple

type MessageReturnMarketV0WithdrawBalance struct {
} representation tuple
```

#### PublishStorageDeals

```ipldsch
type MessageParamsMarketV0PublishStorageDeals struct {
  Deals [MarketClientDealProposal]
} representation tuple

type MarketClientDealProposal struct {
  Proposal MarketV0DealProposal
  ClientSignature Signature
} representation tuple

type MessageReturnMarketV0PublishStorageDeals struct {
  IDs [DealID]
} representation tuple
```

#### VerifyDealsForActivation

```ipldsch
type MessageParamsMarketV0VerifyDealsForActivation struct {
  DealIDs [DealID]
  SectorExpiry ChainEpoch
  SectorStart ChainEpoch
} representation tuple

type MessageReturnMarketV0VerifyDealsForActivation struct {
  DealWeight DealWeight
  VerifiedDealWeight DealWeight
} representation tuple
```

#### ActivateDeals

```ipldsch
type MessageParamsMarketV0ActivateDeals struct {
  DealIDs [DealID]
  SectorExpiry ChainEpoch
} representation tuple

type MessageReturnMarketV0ActivateDeals struct {
} representation tuple
```

#### OnMinerSectorsTerminate

```ipldsch
type MessageParamsMarketV0OnMinerSectorsTerminate struct {
  Epoch ChainEpoch
  DealIDs [DealID]
} representation tuple

type MessageReturnMarketV0OnMinerSectorsTerminate struct {
} representation tuple
```

#### ComputeDataCommitment

```ipldsch
type MessageParamsMarketV0ComputeDataCommitment struct {
  DealIDs [DealID]
  SectorType RegisteredSealProof
} representation tuple

# CommD: A CID with fil-commitment-unsealed + sha2_256-trunc254-padded
type MessageReturnMarketV0ComputeDataCommitment &Any
```

#### CronTick

```ipldsch
type MessageParamsMarketV0CronTick struct {
} representation tuple

type MessageReturnMarketV0CronTick struct {
} representation tuple
```

### v2

#### Constructor

```ipldsch
type MessageParamsMarketV2Constructor MessageParamsMarketV0Constructor
type MessageReturnMarketV2Constructor MessageReturnMarketV0Constructor
```

#### AddBalance

```ipldsch
type MessageParamsMarketV2AddBalance MessageParamsMarketV0AddBalance
type MessageReturnMarketV2AddBalance MessageReturnMarketV0AddBalance
```

#### WithdrawBalance

```ipldsch
type MessageParamsMarketV2WithdrawBalance MessageParamsMarketV0WithdrawBalance
type MessageReturnMarketV2WithdrawBalance MessageReturnMarketV0WithdrawBalance
```

#### PublishStorageDeals

```ipldsch
type MessageParamsMarketV2PublishStorageDeals MessageParamsMarketV0PublishStorageDeals
type MessageReturnMarketV2PublishStorageDeals MessageReturnMarketV0PublishStorageDeals
```

#### VerifyDealsForActivation

```ipldsch
type MessageParamsMarketV2VerifyDealsForActivation MessageParamsMarketV0VerifyDealsForActivation

type MessageReturnMarketV2VerifyDealsForActivation struct {
  DealWeight DealWeight
  VerifiedDealWeight DealWeight
  DealSpace Int
} representation tuple
```

#### ActivateDeals

```ipldsch
type MessageParamsMarketV2ActivateDeals MessageParamsMarketV0ActivateDeals
type MessageReturnMarketV2ActivateDeals MessageReturnMarketV0ActivateDeals
```

#### OnMinerSectorsTerminate

```ipldsch
type MessageParamsMarketV2OnMinerSectorsTerminate MessageParamsMarketV0OnMinerSectorsTerminate
type MessageReturnMarketV2OnMinerSectorsTerminate MessageReturnMarketV0OnMinerSectorsTerminate
```

#### ComputeDataCommitment

```ipldsch
type MessageParamsMarketV2ComputeDataCommitment MessageParamsMarketV0ComputeDataCommitment
type MessageReturnMarketV2ComputeDataCommitment MessageReturnMarketV0ComputeDataCommitment
```

#### CronTick

```ipldsch
type MessageParamsMarketV2CronTick MessageParamsMarketV0CronTick
type MessageReturnMarketV2CronTick MessageReturnMarketV0CronTick
```

## StorageMinerActor

### v0

#### Constructor

```ipldsch
type MessageParamsMinerV0Constructor struct {
  OwnerAddr Address
  WorkerAddr Address
  ControlAddrs [Address]
  SealProofType RegisteredSealProof
  PeerId PeerID
  Multiaddrs [Multiaddrs]
} representation tuple

type MessageReturnMinerV0Constructor struct {
} representation tuple
```

#### ControlAddresses

```ipldsch
type MessageParamsMinerV0ControlAddresses struct {
} representation tuple

type MessageReturnMinerV0ControlAddresses struct {
  Owner Address
  Worker Address
  ControlAddrs [Address]
} representation tuple
```

#### ChangeWorkerAddress

```ipldsch
type MessageParamsMinerV0ChangeWorkerAddress struct {
  NewWorker Address
  NewControlAddrs [Address]
} representation tuple

type MessageReturnMinerV0ChangeWorkerAddress struct {
} representation tuple
```

#### ChangePeerID

```ipldsch
type MessageParamsMinerV0ChangePeerID struct {
  NewID PeerID
} representation tuple

type MessageReturnMinerV0ChangePeerID struct {
} representation tuple
```

#### SubmitWindowedPoSt

```ipldsch
# Information submitted by a miner to provide a Window PoSt.
type MessageParamsMinerV0SubmitWindowedPoSt struct {
  # The deadline index which the submission targets
  Deadline Int
  # The partitions being proven
  Partitions [MinerPostPartition]
  # Array of proofs, one per distinct registered proof type present in the sectors being proven.
  # In the usual case of a single proof type, this array will always have a single element (independent of number of partitions).
  Proofs [PoStProof]
  # The epoch at which these proofs is being committed to a particular chain
  ChainCommitEpoch ChainEpoch
  # The ticket randomness on the chain at the ChainCommitEpoch on the chain this post is committed to
  ChainCommitRand Bytes
} representation tuple

type MinerPostPartition struct {
  Index Int
  Skipped BitField
} representation tuple

type PoStProof struct {
  PoStProof RegisteredPoStProof
  ProofBytes Bytes
} representation tuple

type RegisteredPoStProof int

type MessageReturnMinerV0SubmitWindowedPoSt struct {
} representation tuple
```

#### PreCommitSector

```ipldsch
type MessageParamsMinerV0PreCommitSector MinerV0SectorPreCommitInfo

type MessageReturnMinerV0PreCommitSector struct {
} representation tuple
```

#### ProveCommitSector

```ipldsch
type MessageParamsMinerV0ProveCommitSector struct {
  SectorNumber SectorNumber
  Proof Bytes
} representation tuple

type MessageReturnMinerV0ProveCommitSector struct {
} representation tuple
```

#### ExtendSectorExpiration

```ipldsch
type MessageParamsMinerV0ExtendSectorExpiration struct {
  Extension [MinerExpirationExtend]
} representation tuple

type MinerExpirationExtend struct {
  Deadline Int
  Partition Int
  Sectors BitField
  NewExpiration ChainEpoch
} representation tuple

type MessageReturnMinerV0ExtendSectorExpiration struct {
} representation tuple
```

#### TerminateSectors

```ipldsch
type MessageParamsMinerV0TerminateSectors struct {
  Terminations [MinerTerminationDeclaration]
} representation tuple

type MinerTerminationDeclaration struct {
  Deadline Int
  Partition Int
  Sectors BitField
} representation tuple

type MessageReturnMinerV0TerminateSectors struct {
  # Set to true if all early termination work has been completed. When
  # false, the miner may choose to repeatedly invoke TerminateSectors
  # with no new sectors to process the remainder of the pending
  # terminations. While pending terminations are outstanding, the miner
  # will not be able to withdraw funds.
  Done Bool
} representation tuple
```

#### DeclareFaults

```ipldsch
type MessageParamsMinerV0DeclareFaults struct {
  Faults [MinerFaultDeclaration]
} representation tuple

type MinerFaultDeclaration struct {
  Deadline Int
  Partition Int
  Sectors BitField
} representation tuple

type MessageReturnMinerV0DeclareFaults struct {
} representation tuple
```

#### DeclareFaultsRecovered

```ipldsch
type MessageParamsMinerV0DeclareFaultsRecovered struct {
  Recoveries [MinerRecoveryDeclaration]
} representation tuple

type MinerRecoveryDeclaration struct {
  Deadline Int
  Partition Int
  Sectors BitField
} representation tuple

type MessageReturnMinerV0DeclareFaultsRecovered struct {
} representation tuple
```

#### OnDeferredCronEvent

```ipldsch
type MessageParamsMinerV0OnDeferredCronEvent struct {
  EventType CronEventType
} representation tuple

type CronEventType int

type MessageReturnMinerV0OnDeferredCronEvent struct {
} representation tuple
```

#### CheckSectorProven

```ipldsch
type MessageParamsMinerV0CheckSectorProven struct {
  SectorNumber SectorNumber
} representation tuple

type MessageReturnMinerV0CheckSectorProven struct {
} representation tuple
```

#### AddLockedFund

```ipldsch
type MessageParamsMinerV0AddLockedFund TokenAmount

type MessageReturnMinerV0AddLockedFund struct {
} representation tuple
```

#### ReportConsensusFault

```ipldsch
type MessageParamsMinerV0ReportConsensusFault struct {
  BlockHeader1 Bytes
  BlockHeader2 Bytes
  BlockHeaderExtra Bytes
} representation tuple

type MessageReturnMinerV0ReportConsensusFault struct {
} representation tuple
```

#### WithdrawBalance

```ipldsch
type MessageParamsMinerV0WithdrawBalance struct {
  AmountRequested TokenAmount
} representation tuple

type MessageReturnMinerV0WithdrawBalance struct {
} representation tuple
```

#### ConfirmSectorProofsValid

```ipldsch
type MessageParamsMinerV0ConfirmSectorProofsValid struct {
  Sectors [SectorNumber]
} representation tuple

type MessageReturnMinerV0ConfirmSectorProofsValid struct {
} representation tuple
```

#### ChangeMultiaddrs

```ipldsch
type MessageParamsMinerV0ChangeMultiaddrs struct {
  NewMultiaddrs [Multiaddrs]
} representation tuple

type MessageReturnMinerV0ChangeMultiaddrs struct {
} representation tuple
```

#### CompactPartitions

```ipldsch
type MessageParamsMinerV0CompactPartitions struct {
  Deadline Int
  Partitions BitField
} representation tuple

type MessageReturnMinerV0CompactPartitions struct {
} representation tuple
```

#### CompactSectorNumbers

```ipldsch
type MessageParamsMinerV0CompactSectorNumbers struct {
  MaskSectorNumbers BitField
} representation tuple

type MessageReturnMinerV0CompactSectorNumbers struct {
} representation tuple
```

### v2

#### Constructor

```ipldsch
type MessageParamsMinerV2Constructor MessageParamsMinerV0Constructor
type MessageReturnMinerV2Constructor MessageReturnMinerV0Constructor
```

#### ControlAddresses

```ipldsch
type MessageParamsMinerV2ControlAddresses MessageParamsMinerV0ControlAddresses

type MessageReturnMinerV2ControlAddresses struct {
  Owner Address
  Worker Address
  ControlAddrs [Address]
} representation tuple

```

#### ChangeWorkerAddress

```ipldsch
type MessageParamsMinerV2ChangeWorkerAddress MessageParamsMinerV0ChangeWorkerAddress
type MessageReturnMinerV2ChangeWorkerAddress MessageReturnMinerV0ChangeWorkerAddress
```

#### ChangePeerID

```ipldsch
type MessageParamsMinerV2ChangePeerID MessageParamsMinerV0ChangePeerID
type MessageReturnMinerV2ChangePeerID MessageReturnMinerV0ChangePeerID
```

#### SubmitWindowedPoSt

```ipldsch
type MessageParamsMinerV2SubmitWindowedPoSt MessageParamsMinerV0SubmitWindowedPoSt
type MessageReturnMinerV2SubmitWindowedPoSt MessageReturnMinerV0SubmitWindowedPoSt
```

#### PreCommitSector

```ipldsch
type MessageParamsMinerV2PreCommitSector MessageParamsMinerV0PreCommitSector
type MessageReturnMinerV2PreCommitSector MessageReturnMinerV0PreCommitSector
```

#### ProveCommitSector

```ipldsch
type MessageParamsMinerV2ProveCommitSector MessageParamsMinerV0ProveCommitSector
type MessageReturnMinerV2ProveCommitSector MessageReturnMinerV0ProveCommitSector
```

#### ExtendSectorExpiration

```ipldsch
type MessageParamsMinerV2ExtendSectorExpiration MessageParamsMinerV0ExtendSectorExpiration
type MessageReturnMinerV2ExtendSectorExpiration MessageReturnMinerV0ExtendSectorExpiration
```

#### TerminateSectors

```ipldsch
type MessageParamsMinerV2TerminateSectors MessageParamsMinerV0TerminateSectors
type MessageReturnMinerV2TerminateSectors MessageReturnMinerV0TerminateSectors
```

#### DeclareFaults

```ipldsch
type MessageParamsMinerV2DeclareFaults MessageParamsMinerV0DeclareFaults
type MessageReturnMinerV2DeclareFaults MessageReturnMinerV0DeclareFaults
```

#### DeclareFaultsRecovered

```ipldsch
type MessageParamsMinerV2DeclareFaultsRecovered MessageParamsMinerV0DeclareFaultsRecovered
type MessageReturnMinerV2DeclareFaultsRecovered MessageReturnMinerV0DeclareFaultsRecovered
```

#### OnDeferredCronEvent

```ipldsch
type MessageParamsMinerV2OnDeferredCronEvent MessageParamsMinerV0OnDeferredCronEvent
type MessageReturnMinerV2OnDeferredCronEvent MessageReturnMinerV0OnDeferredCronEvent
```

#### CheckSectorProven

```ipldsch
type MessageParamsMinerV2CheckSectorProven MessageParamsMinerV0CheckSectorProven
type MessageReturnMinerV2CheckSectorProven MessageReturnMinerV0CheckSectorProven
```

#### ApplyRewards

```ipldsch
type MessageParamsMinerV2ApplyRewards struct {
  Reward TokenAmount
  Penalty TokenAmount
} representation tuple

type MessageReturnMinerV2ApplyRewards struct {
} representation tuple
```

#### ReportConsensusFault

```ipldsch
type MessageParamsMinerV2ReportConsensusFault MessageParamsMinerV0ReportConsensusFault
type MessageReturnMinerV2ReportConsensusFault MessageReturnMinerV0ReportConsensusFault
```

#### WithdrawBalance

```ipldsch
type MessageParamsMinerV2WithdrawBalance MessageParamsMinerV0WithdrawBalance
type MessageReturnMinerV2WithdrawBalance MessageReturnMinerV0WithdrawBalance
```

#### ConfirmSectorProofsValid

```ipldsch
type MessageParamsMinerV2ConfirmSectorProofsValid MessageParamsMinerV0ConfirmSectorProofsValid
type MessageReturnMinerV2ConfirmSectorProofsValid MessageReturnMinerV0ConfirmSectorProofsValid
```

#### ChangeMultiaddrs

```ipldsch
type MessageParamsMinerV2ChangeMultiaddrs MessageParamsMinerV0ChangeMultiaddrs
type MessageReturnMinerV2ChangeMultiaddrs MessageReturnMinerV0ChangeMultiaddrs
```

#### CompactPartitions

```ipldsch
type MessageParamsMinerV2CompactPartitions MessageParamsMinerV0CompactPartitions
type MessageReturnMinerV2CompactPartitions MessageReturnMinerV0CompactPartitions
```

#### CompactSectorNumbers

```ipldsch
type MessageParamsMinerV2CompactSectorNumbers MessageParamsMinerV0CompactSectorNumbers
type MessageReturnMinerV2CompactSectorNumbers MessageReturnMinerV0CompactSectorNumbers
```

#### ConfirmUpdateWorkerKey

```ipldsch
type MessageParamsMinerV2ConfirmUpdateWorkerKey struct {
} representation tuple

type MessageReturnMinerV2ConfirmUpdateWorkerKey struct {
} representation tuple
```

#### RepayDebt

```ipldsch
type MessageParamsMinerV2RepayDebt struct {
} representation tuple

type MessageReturnMinerV2RepayDebt struct {
} representation tuple
```

#### ChangeOwnerAddress

```ipldsch
type MessageParamsMinerV2ChangeOwnerAddress Address

type MessageReturnMinerV2ChangeOwnerAddress struct {
} representation tuple
```

## MultisigActor

### v0

#### Constructor

```ipldsch
type MessageParamsMultisigV0Constructor struct {
  Signers [Address]
  NumApprovalsThreshold Int
  UnlockDuration ChainEpoch
  StartEpoch ChainEpoch
} representation tuple

type MessageReturnMultisigV0Constructor struct {
} representation tuple
```

#### Propose

```ipldsch
type MessageParamsMultisigV0Propose struct {
  To Address
  Value BigInt
  Method MethodNum
  Params Bytes
} representation tuple

type MessageReturnMultisigV0Propose struct {
  # TxnID is the ID of the proposed transaction
  TxnID TransactionID
  # Applied indicates if the transaction was applied as opposed to proposed but not applied due to lack of approvals
  Applied Bool
  # Code is the exitcode of the transaction, if Applied is false this field should be ignored.
  Code ExitCode
  # Ret is the return vale of the transaction, if Applied is false this field should be ignored.
  Ret Byte
} representation tuple
```

#### Approve

```ipldsch
type MessageParamsMultisigV0Approve MultisigTransactionID

type MultisigTransactionID struct {
  ID TransactionID
  ProposeHash Bytes
} representation tuple

type MessageReturnMultisigV0Approve struct {
  # Applied indicates if the transaction was applied as opposed to proposed but not applied due to lack of approvals
  Applied Bool
  # Code is the exitcode of the transaction, if Applied is false this field should be ignored.
  Code ExitCode
  # Ret is the return vale of the transaction, if Applied is false this field should be ignored.
  Ret Bytes
} representation tuple
```

#### Cancel

```ipldsch
type MessageParamsMultisigV0Cancel MultisigTransactionID

type MessageReturnMultisigV0Cancel struct {
} representation tuple
```

#### AddSigner

```ipldsch
type MessageParamsMultisigV0AddSigner struct {
  Signer Address
  Increase Bool
} representation tuple

type MessageReturnMultisigV0AddSigner struct {
} representation tuple
```

#### RemoveSigner

```ipldsch
type MessageParamsMultisigV0RemoveSigner struct {
  Signer Address
  Decrease Bool
} representation tuple

type MessageReturnMultisigV0RemoveSigner struct {
} representation tuple
```

#### SwapSigner

```ipldsch
type MessageParamsMultisigV0SwapSigner struct {
  From Address
  To Address
} representation tuple

type MessageReturnMultisigV0SwapSigner struct {
} representation tuple
```

#### ChangeNumApprovalsThreshold

```ipldsch
type MessageParamsMultisigV0ChangeThreshold struct {
  NewThreshold Int
} representation tuple

type MessageReturnMultisigV0ChangeThreshold struct {
} representation tuple
```

#### LockBalance

```ipldsch
type MessageParamsMultisigV0LockBalance struct {
  StartEpoch ChainEpoch
  UnlockDuration ChainEpoch
  Amount TokenAmount
} representation tuple

type MessageReturnMultisigV0LockBalance struct {
} representation tuple
```

### v2

#### Constructor

```ipldsch
type MessageParamsMultisigV2Constructor struct {
   Signers [addr.Address]
  NumApprovalsThreshold Int
  UnlockDuration ChainEpoch
  StartEpoch ChainEpoch
} representation tuple

type MessageReturnMultisigV2Constructor MessageReturnMultisigV0Constructor
```

#### Propose

```ipldsch
type MessageParamsMultisigV2Propose MessageParamsMultisigV0Propose
type MessageReturnMultisigV2Propose MessageReturnMultisigV0Propose
```

#### Approve

```ipldsch
type MessageParamsMultisigV2Approve MessageParamsMultisigV0Approve
type MessageReturnMultisigV2Approve MessageReturnMultisigV0Approve
```

#### Cancel

```ipldsch
type MessageParamsMultisigV2Cancel MessageParamsMultisigV0ancel
type MessageReturnMultisigV2Cancel MessageReturnMultisigV0Cancel
```

#### AddSigner

```ipldsch
type MessageParamsMultisigV2AddSigner MessageParamsMultisigV0AddSigner
type MessageReturnMultisigV2AddSigner MessageReturnMultisigV0AddSigner
```

#### RemoveSigner

```ipldsch
type MessageParamsMultisigV2RemoveSigner MessageParamsMultisigV0RemoveSigner
type MessageReturnMultisigV2RemoveSigner MessageReturnMultisigV0RemoveSigner
```

#### SwapSigner

```ipldsch
type MessageParamsMultisigV2SwapSigner MessageParamsMultisigV0SwapSigner
type MessageReturnMultisigV2SwapSigner MessageReturnMultisigV0SwapSigner
```

#### ChangeNumApprovalsThreshold

```ipldsch
type MessageParamsMultisigV2ChangeThreshold MessageParamsMultisigV0ChangeThreshold
type MessageReturnMultisigV2ChangeThreshold MessageReturnMultisigV0ChangeThreshold
```

#### LockBalance

```ipldsch
type MessageParamsMultisigV2LockBalance MessageParamsMultisigV0LockBalance
type MessageReturnMultisigV2LockBalance MessageReturnMultisigV0LockBalance
```

## PaymentChannelActor

### v0

#### Constructor

```ipldsch
type MessageParamsPaychV0Constructor struct {
  From Address # Payer
  To Address # Payee
} representation tuple

type MessageReturnPaychV0Constructor struct {
} representation tuple
```

#### UpdateChannelState

```ipldsch
type MessageParamsPaychV0UpdateChannelState struct {
  Sv SignedVoucher
  Secret Bytes
  Proof Bytes
} representation tuple

# A voucher is sent by `From` to `To` off-chain in order to enable
# `To` to redeem payments on-chain in the future
type SignedVoucher struct {
  # ChannelAddr is the address of the payment channel this signed voucher is valid for
  ChannelAddr Address
  # TimeLockMin sets a min epoch before which the voucher cannot be redeemed
  TimeLockMin ChainEpoch
  # TimeLockMax sets a max epoch beyond which the voucher cannot be redeemed
  # TimeLockMax set to 0 means no timeout
  TimeLockMax ChainEpoch
  # (optional) The SecretPreImage is used by `To` to validate
  SecretPreimage optional Bytes
  # (optional) Extra can be specified by `From` to add a verification method to the voucher
  Extra optional nullable ModVerifyParams
  # Specifies which lane the Voucher merges into (will be created if does not exist)
  Lane Int
  # Specifies which lane the Voucher merges into (will be created if does not exist)
  Nonce Int
  # Amount voucher can be redeemed for
  Amount BigInt
  # (optional) MinSettleHeight can extend channel MinSettleHeight if needed
  MinSettleHeight optional ChainEpoch
  # (optional) Set of lanes to be merged into `Lane`
  Merges optional [Merge]
  # Sender's signature over the voucher
  Signature nullable Signature
} representation tuple

# Modular Verification method
type ModVerifyParams struct {
  Method MethodNum
  Params Bytes
} representation tuple

type Merge struct {
  Lane Int
  Nonce Int
} representation tuple

type MessageReturnPaychV0UpdateChannelState struct {
} representation tuple
```

#### Settle

```ipldsch
type MessageParamsPaychV0Settle struct {
} representation tuple

type MessageReturnPaychV0Settle struct {
} representation tuple
```

#### Collect

```ipldsch
type MessageParamsPaychV0Collect struct {
} representation tuple

type MessageReturnPaychV0Collect struct {
} representation tuple
```

### v2

#### Constructor

```ipldsch
type MessageParamsPaychV2Constructor MessageParamsPaychV0Constructor
type MessageReturnPaychV2Constructor MessageReturnPaychV0Constructor
```

#### UpdateChannelState

```ipldsch
type MessageParamsPaychV2UpdateChannelState struct {
  Sv SignedVoucher
  Secret Bytes
} representation tuple

type MessageReturnPaychV2UpdateChannelState MessageReturnPaychV0UpdateChannelState
```

#### Settle

```ipldsch
type MessageParamsPaychV2Settle MessageParamsPaychV0Settle
type MessageReturnPaychV2Settle MessageReturnPaychV0Settle
```

#### Collect

```ipldsch
type MessageParamsPaychV2Collect MessageParamsPaychV0Collect
type MessageReturnPaychV2Collect MessageReturnPaychV0Collect
```

## StoragePowerActor

### v0

#### Constructor

```ipldsch
type MessageParamsPowerV0Constructor struct {
} representation tuple

type MessageReturnPowerV0Constructor struct {
} representation tuple
```

#### CreateMiner

```ipldsch
type MessageParamsPowerV0CreateMiner struct {
  Owner Address
  Worker Address
  SealProofType RegisteredSealProof
  Peer PeerID
  Multiaddrs [Multiaddrs]
} representation tuple

type MessageReturnPowerV0CreateMine struct {
  IDAddress Address # The canonical ID-based address for the actor
  RobustAddress Address # A more expensive but re-org-safe address for the newly created actor
} representation tuple
```

#### UpdateClaimedPower

```ipldsch
type MessageParamsPowerV0UpdateClaimedPower struct {
  RawByteDelta StoragePower
  QualityAdjustedDelta StoragePower
} representation tuple

type MessageReturnPowerV0UpdateClaimedPower struct {
} representation tuple
```

#### EnrollCronEvent

```ipldsch
type MessageParamsPowerV0EnrollCronEvent struct {
  EventEpoch ChainEpoch
  Payload Bytes
} representation tuple

type MessageReturnPowerV0EnrollCronEvent struct {
} representation tuple
```

#### OnEpochTickEnd

```ipldsch
type MessageParamsPowerV0OnEpochTickEnd struct {
} representation tuple

type MessageReturnPowerV0OnEpochTickEnd struct {
} representation tuple
```

#### UpdatePledgeTotal

```ipldsch
type MessageParamsPowerV0UpdatePledgeTotal TokenAmount

type MessageReturnPowerV0UpdatePledgeTotal struct {
} representation tuple
```

#### OnConsensusFault

```ipldsch
type MessageParamsPowerV0OnConsensusFault TokenAmount

type MessageReturnPowerV0OnConsensusFault struct {
} representation tuple
```

#### SubmitPoRepForBulkVerify

```ipldsch
type MessageParamsPowerV0SubmitPoRepForBulkVerify SealVerifyInfo

type MessageReturnPowerV0SubmitPoRepForBulkVerify struct {
} representation tuple
```

#### CurrentTotalPower

```ipldsch
type MessageParamsPowerV0SubmitPoRepForBulkVerify struct {
} representation tuple

type MessageReturnPowerV0CurrentTotal struct {
  RawBytePower StoragePower
  QualityAdjPower StoragePower
  PledgeCollateral TokenAmount
  QualityAdjPowerSmoothed nullable FilterEstimate
} representation tuple
```

### v2

#### Constructor

```ipldsch
type MessageParamsPowerV2Constructor struct {
  OwnerAddr Address
  WorkerAddr Address
  ControlAddrs [Address]
  SealProofType RegisteredSealProof
  PeerId PeerID
  Multiaddrs [Multiaddrs]
} representation tuple

type MessageReturnPowerV2Constructor MessageReturnPowerV0Constructor
```

#### CreateMiner

```ipldsch
type MessageParamsPowerV2CreateMiner MessageParamsPowerV0CreateMiner
type MessageReturnPowerV2CreateMine MessageReturnPowerV0CreateMine
```

#### UpdateClaimedPower

```ipldsch
type MessageParamsPowerV2UpdateClaimedPower MessageParamsPowerV0UpdateClaimedPower
type MessageReturnPowerV2UpdateClaimedPower MessageReturnPowerV0UpdateClaimedPower
```

#### EnrollCronEvent

```ipldsch
type MessageParamsPowerV2EnrollCronEvent MessageParamsPowerV0EnrollCronEvent
type MessageReturnPowerV2EnrollCronEvent MessageReturnPowerV0EnrollCronEvent
```

#### OnEpochTickEnd

```ipldsch
type MessageParamsPowerV2OnEpochTickEnd MessageParamsPowerV0OnEpochTickEnd
type MessageReturnPowerV2OnEpochTickEnd MessageReturnPowerV0OnEpochTickEnd
```

#### UpdatePledgeTotal

```ipldsch
type MessageParamsPowerV2UpdatePledgeTotal MessageParamsPowerV0UpdatePledgeTotal
type MessageReturnPowerV2UpdatePledgeTotal MessageReturnPowerV0UpdatePledgeTotal
```

#### OnConsensusFault

```ipldsch
type MessageParamsPowerV2OnConsensusFault MessageParamsPowerV0OnConsensusFault
type MessageReturnPowerV2OnConsensusFault MessageReturnPowerV0OnConsensusFault
```

#### SubmitPoRepForBulkVerify

```ipldsch
type MessageParamsPowerV2SubmitPoRepForBulkVerify MessageParamsPowerV0SubmitPoRepForBulkVerify
type MessageReturnPowerV2SubmitPoRepForBulkVerify MessageReturnPowerV0SubmitPoRepForBulkVerify
```

#### CurrentTotalPower

```ipldsch
type MessageParamsPowerV2SubmitPoRepForBulkVerify MessageParamsPowerV2SubmitPoRepForBulkVerify

type MessageReturnPowerV2CurrentTotal struct {
  RawBytePower StoragePower
  QualityAdjPower StoragePower
  PledgeCollateral TokenAmount
  QualityAdjPowerSmoothed FilterEstimate
} representation tuple
```

## VerifiedRegistryActor

### v0

#### Constructor

```ipldsch
type MessageParamsVerifregV0Constructor Address

type MessageReturnVerifregV0Constructor struct {
} representation tuple
```

#### AddVerifier

```ipldsch
type MessageParamsVerifregV0AddVerifier struct {
  Address Address
  Allowance DataCap
} representation tuple

type MessageReturnVerifregV0AddVerifier struct {
} representation tuple
```

#### RemoveVerifier

```ipldsch
type MessageParamsVerifregV0RemoveVerifier Address

type MessageReturnVerifregV0RemoveVerifier struct {
} representation tuple
```

#### AddVerifiedClient

```ipldsch
type MessageParamsVerifregV0AddVerifiedClient struct {
  Address Address
  Allowance DataCap
} representation tuple

type MessageReturnVerifregV0AddVerifiedClientstruct struct {
} representation tuple
```

#### UseBytes

```ipldsch
type MessageParamsVerifregV0UseBytes struct {
  Address Address # Address of verified client
  DealSize StoragePower # Number of bytes to use
} representation tuple

type MessageReturnVerifregV0UseBytes struct {
} representation tuple
```

#### RestoreBytes

```ipldsch
type MessageParamsVerifregV0RestoreBytes struct {
  Address Address
  DealSize StoragePower
} representation tuple

type MessageReturnVerifregV0RestoreBytes struct {
} representation tuple
```

### v2

#### Constructor

```ipldsch
type MessageParamsVerifregV2Constructor MessageParamsVerifregV0Constructor
type MessageReturnVerifregV2Constructor MessageReturnVerifregV0Constructor
```

#### AddVerifier

```ipldsch
type MessageParamsVerifregV2AddVerifier MessageParamsVerifregV0AddVerifier
type MessageReturnVerifregV2AddVerifier MessageReturnVerifregV0AddVerifier
```

#### RemoveVerifier

```ipldsch
type MessageParamsVerifregV2RemoveVerifier MessageParamsVerifregV0RemoveVerifier
type MessageReturnVerifregV2RemoveVerifier MessageReturnVerifregV0RemoveVerifier
```

#### AddVerifiedClient

```ipldsch
type MessageParamsVerifregV2AddVerifiedClient MessageParamsVerifregV0AddVerifiedClient
type MessageReturnVerifregV2AddVerifiedClientstruct MessageReturnVerifregV0AddVerifiedClientstruct
```

#### UseBytes

```ipldsch
type MessageParamsVerifregV2UseBytes MessageParamsVerifregV0UseBytes
type MessageReturnVerifregV2UseBytes MessageReturnVerifregV0UseBytes
```

#### RestoreBytes

```ipldsch
type MessageParamsVerifregV2RestoreBytes MessageParamsVerifregV0RestoreBytes
type MessageReturnVerifregV2RestoreBytes MessageReturnVerifregV0RestoreBytes
```

## SystemActor

### v0

#### Constructor

```ipldsch
type MessageParamsSystemV0Constructor struct {
} representation tuple

type MessageReturnSystemV0Constructor struct {
} representation tuple
```

### v2

#### Constructor

```ipldsch
type MessageParamsSystemV2Constructor MessageParamsSystemV0Constructor
type MessageReturnSystemV2Constructor MessageReturnSystemV0Constructor
```
