# Filecoin Messages Data Structures

The following message parameters are encoded as DAG-CBOR and the resulting bytes placed in the `Params` field of the `Message` object.

Each message parameters type is named `MessageParamsActorTypeMessageType`, where `ActorType` is the name of the actor and `MessageType` is the type of message being sent..

## InitActor

```ipldsch
type MessageParamsInitConstructor struct {
  NetworkName String
} representation tuple

type MessageParamsInitExec struct {
  CodeCID &Any # An inline CID encoded as raw+identity
  ConstructorParams Bytes
} representation tuple
```

## RewardActor

```ipldsch
type MessageParamsRewardConstructor StoragePower

type MessageParamsRewardAwardBlockReward struct {
  Miner Address
  Penalty TokenAmount
  GasReward TokenAmount
  WinCount Int
} representation tuple

type MessageParamsRewardThisEpochReward struct {
} representation tuple

type MessageParamsRewardUpdateNetworkKPI StoragePower
```

## CronActor

```ipldsch
type MessageParamsCronConstructor struct {
  Entries [CronV0Entry]
} representation tuple

type MessageParamsCronEpochTick struct {
} representation tuple
```

## AccountActor

```ipldsch
type MessageParamsAccountConstructor Address

type MessageParamsAccountPubkeyAddress struct {
} representation tuple
```

## StorageMarketActor

```ipldsch
type MessageParamsMarketConstructor struct {
} representation tuple

type MessageParamsMarketAddBalance Address

type MessageParamsMarketWithdrawBalance struct {
  ProviderOrClientAmount Address
  Amount TokenAmount
} representation tuple

type MessageParamsMarketPublishStorageDeals struct {
  Deals [MarketClientDealProposal]
} representation tuple

type MarketClientDealProposal struct {
  Proposal MarketV0DealProposal
  ClientSignature Signature
} representation tuple

type MessageParamsMarketVerifyDealsForActivation struct {
  DealIDs [DealID]
  SectorExpiry ChainEpoch
  SectorStart ChainEpoch
} representation tuple

type MessageParamsMarketActivateDeals struct {
  DealIDs [DealID]
  SectorExpiry ChainEpoch
} representation tuple

type MessageParamsMarketOnMinerSectorsTerminate struct {
  Epoch ChainEpoch
  DealIDs [DealID]
} representation tuple

type MessageParamsMarketComputeDataCommitment struct {
  DealIDs [DealID]
  SectorType RegisteredSealProof
} representation tuple

type MessageParamsMarketCronTick struct {
} representation tuple
```

## StorageMinerActor

```ipldsch
type MessageParamsMinerConstructor struct {
  OwnerAddr Address
  WorkerAddr Address
  ControlAddrs [Address]
  SealProofType RegisteredSealProof
  PeerId PeerID
  Multiaddrs [Multiaddrs]
} representation tuple

type MessageParamsMinerControlAddresses struct {
  NewWorker Address
  NewControlAddrs [Address]
} representation tuple

type MessageParamsMinerChangeWorkerAddress struct {
  NewWorker Address
  NewControlAddrs [Address]
} representation tuple

type MessageParamsMinerChangePeerID struct {
  NewID PeerID
} representation tuple

type MessageParamsMinerSubmitWindowedPoSt struct {
  Deadline Int
  Partitions [MinerPostPartition]
  Proofs [PoStProof]
  ChainCommitEpoch ChainEpoch
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

type MessageParamsMinerPreCommitSector MinerV0SectorPreCommitInfo

type MessageParamsMinerProveCommitSector struct {
  SectorNumber SectorNumber
  Proof Bytes
} representation tuple

type MessageParamsMinerExtendSectorExpiration struct {
  Extension [MinerExpirationExtend]
} representation tuple

type MinerExpirationExtend struct {
  Deadline Int
  Partition Int
  Sectors BitField
  NewExpiration ChainEpoch
} representation tuple

type MessageParamsMinerTerminateSectors struct {
  Terminations [MinerTerminationDeclaration]
} representation tuple

type MinerTerminationDeclaration struct {
  Deadline Int
  Partition Int
  Sectors BitField
} representation tuple

type MessageParamsMinerDeclareFaults struct {
  Faults [MinerFaultDeclaration]
} representation tuple

type MinerFaultDeclaration struct {
  Deadline Int
  Partition Int
  Sectors BitField
} representation tuple

type MessageParamsMinerDeclareFaultsRecovered struct {
  Recoveries [MinerRecoveryDeclaration]
} representation tuple

type MinerRecoveryDeclaration struct {
  Deadline Int
  Partition Int
  Sectors BitField
} representation tuple

type MessageParamsMinerOnDeferredCronEvent struct {
  EventType CronEventType
} representation tuple

type CronEventType int

type MessageParamsMinerCheckSectorProven struct {
  SectorNumber SectorNumber
} representation tuple

type MessageParamsMinerV0AddLockedFund TokenAmount

type MessageParamsMinerV2ApplyRewards struct {
  Reward TokenAmount
  Penalty TokenAmount
} representation tuple

type MessageParamsMinerReportConsensusFault struct {
  BlockHeader1 Bytes
  BlockHeader2 Bytes
  BlockHeaderExtra Bytes
} representation tuple

type MessageParamsMinerWithdrawBalance struct {
  AmountRequested TokenAmount
} representation tuple

type MessageParamsMinerConfirmSectorProofsValid struct {
  Sectors [SectorNumber]
} representation tuple

type MessageParamsMinerChangeMultiaddrs struct {
  NewMultiaddrs [Multiaddrs]
} representation tuple

type MessageParamsMinerCompactPartitions struct {
  Deadline Int
  Partitions BitField
} representation tuple

type MessageParamsMinerCompactSectorNumbers struct {
  MaskSectorNumbers BitField
} representation tuple

type MessageParamsMinerV2ConfirmUpdateWorkerKey struct {
} representation tuple

type MessageParamsMinerV2RepayDebt struct {
} representation tuple

type MessageParamsMinerV2OwnerWorkerAddress Address
```

## MultisigActor

```ipldsch
type MessageParamsMultisigConstructor struct {
  Signers [Address]
  NumApprovalsThreshold Int
  UnlockDuration ChainEpoch
  StartEpoch ChainEpoch
} representation tuple

type MessageParamsMultisigPropose struct {
  To Address
  Value BigInt
  Method MethodNum
  Params Bytes
} representation tuple

type MessageParamsMultisigApprove MultisigTransactionID

type MessageParamsMultisigCancel MultisigTransactionID

type MultisigTransactionID struct {
  ID TransactionID
  ProposeHash Bytes
} representation tuple

type MessageParamsMultisigAddSigner struct {
  Signer Address
  Increase Bool
} representation tuple

type MessageParamsMultisigRemoveSigner struct {
  Signer Address
  Decrease Bool
} representation tuple

type MessageParamsMultisigSwapSigner struct {
  From Address
  To Address
} representation tuple

type MessageParamsMultisigChangeThreshold struct {
  NewThreshold Int
} representation tuple

type MessageParamsMultisigLockBalance struct {
  StartEpoch ChainEpoch
  UnlockDuration ChainEpoch
  Amount TokenAmount
} representation tuple
```

## PaymentChannelActor

```ipldsch
type MessageParamsPaychConstructor struct {
  From Address
  To Address
} representation tuple

type MessageParamsPaychUpdateChannelState struct {
  Sv SignedVoucher
  Secret Bytes
} representation tuple

type SignedVoucher struct {
  ChannelAddr Address
  TimeLockMin ChainEpoch
  TimeLockMax ChainEpoch
  SecretPreimage optional Bytes
  Extra optional nullable ModVerifyParams
  Lane Int
  Nonce Int
  Amount BigInt
  MinSettleHeight optional ChainEpoch
  Merges optional [Merge]
  Signature nullable Signature
} representation tuple

type ModVerifyParams struct {
  Method MethodNum
  Params Bytes
} representation tuple

type Merge struct {
  Lane Int
  Nonce Int
} representation tuple

type MessageParamsPaychSettle struct {
} representation tuple

type MessageParamsPaychCollect struct {
} representation tuple
```

## StoragePowerActor

```ipldsch
type MessageParamsPowerConstructor struct {
} representation tuple

type MessageParamsPowerCreateMiner struct {
  Owner Address
  Worker Address
  SealProofType RegisteredSealProof
  Peer PeerID
  Multiaddrs [Multiaddrs]
} representation tuple

type MessageParamsPowerUpdateClaimedPower struct {
  RawByteDelta StoragePower
  QualityAdjustedDelta StoragePower
} representation tuple

type MessageParamsPowerEnrollCronEvent struct {
  EventEpoch ChainEpoch
  Payload Bytes
} representation tuple

type MessageParamsPowerOnEpochTickEnd struct {
} representation tuple

type MessageParamsPowerUpdatePledgeTotal TokenAmount

type MessageParamsPowerOnConsensusFault TokenAmount

type MessageParamsPowerSubmitPoRepForBulkVerify SealVerifyInfo

type MessageParamsPowerCurrentTotal struct {
  RawBytePower StoragePower
  QualityAdjPower StoragePower
  PledgeCollateral TokenAmount
  QualityAdjPowerSmoothed V0FilterEstimate
} representation tuple
```

## VerifiedRegistryActor

```
type MessageParamsVerifregConstructor Address

type MessageParamsVerifregAddVerifier struct {
  Address Address
  Allowance DataCap
} representation tuple

type MessageParamsVerifregRemoveVerifier Address

type MessageParamsVerifregAddVerifiedClient struct {
  Address Address
  Allowance DataCap
} representation tuple

type MessageParamsVerifregUseBytes struct {
  Address Address
  DealSize StoragePower
} representation tuple

type MessageParamsVerifregRestoreBytes struct {
  Address Address
  DealSize StoragePower
} representation tuple
```

## SystemActor

```ipldsch
type MessageParamsSystemConstructor struct {
} representation tuple
```