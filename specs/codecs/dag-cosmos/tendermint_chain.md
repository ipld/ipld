# Tendermint Chain Data Structures
Tendermint is a generic proof-of-stake consensus layer that provides Byzantine fault tolerant state machine replication
for any state machine that conforms to the Application BlockChain Interface (ABCI) or ABCI++. For more details on Tendermint and
ABCI/ABCI++, see the specification [here](https://github.com/tendermint/tendermint/tree/master/spec).

## Tendermint Merkle Tree Nodes
A Merkle tree node is a single node in a Merkle tree. A Merkle node is referenced by its hash.
The top-level node in the tree is the root node, its hash is the Merkle root. Tendermint uses
the RFC 6962 specification of a merkle tree, with SHA256 as the hash function.
* The hash of an inner node is `SHA256(0x01 || left_hash || right_hash)`.
* The hash of a leaf node is `SHA256(0x00 || value)`.
* The multicodec type used for a Merkle tree will depend on the content it stores
```ipldsch
type MerkleTreeNode union {
    | MerkleTreeRootNode "root"
    | MerkleTreeInnerNode "inner"
    | MerkleTreeLeafNode "leaf"
} representation keyed

# MerkleTreeRootNode is the top-most node in a merkle tree; the root node of the tree.
# It can be a leaf node if there is only one value in the tree
# We explicitly type the root node for the purposes of handling Block and Header marshalling
# since entire sub-dags need to be collapsed down and encoded into the protobuf object we need to be
# able to check that the ipld.Node provided to the marshaller is a root node
type MerkleTreeRootNode MerkleTreeNode

# MerkleTreeInnerNode nodes contain two byte arrays which contain the hashes which link its two child nodes.
type MerkleTreeInnerNode struct {
    Left nullable &MerkleTreeNode
    Right nullable &MerkleTreeNode
}

# Value union type used to handle the different values stored in leaf nodes in the different merkle trees
type Value union {
    | SimpleValidator "validator"
    | Evidence "evidence"
    | TxCID "tx"
    | Part "part"
    | ResponseDeliverTx "result"
    | Bytes "header"
    | CommitSig "commit"
} representation keyed

# MerkleTreeLeafNode is a single byte array containing the value stored at that leaf
# Often times this "value" will be a hash of content rather than the content itself
type MerkleTreeLeafNode struct {
    Value Value
}
```

## Tendermint Block
A block consists of a header, transactions, votes (the commit), and a list of evidence of malfeasance (i.e. signing conflicting votes).
Blocks are indirectly content-hash referenced by the root of a Merkle tree composed of its parts.

In order to support this indirect content referencing, we introduce a new multihash type: SHA256_MERKLE. This multihash type
stipulates that the hash is an SHA256 RFC 6962 specification Merkle tree root hash.
```ipldsch
# BlockCID is a CID link to a Tendermint block, this link is indirect by means of reference to the root node of a Part
# Merkle tree (formed from all of the parts of a complete block) rather than a direct reference by hash of the block itself
# This CID is composed of the SHA256 multihash of the root node in the Block Part Merkle Tree and the TendermintBlock codec (tbd)
# Part merkle tree is a Merkle tree built from the PartSet, each leafs contains Part.Bytes
type BlockCID &Block

# Block defines the atomic unit of a Tendermint blockchain
type Block struct {
	Header Header
	Data Txs
	Evidence EvidenceList
	LastCommit Commit
}

# BlockID contains two distinct Merkle roots of the block.
type BlockID struct {
	HeaderCID     HeaderFieldTreeCID
	PartSetHeader PartSetHeader
}

# PartSetHeader is used for secure gossiping of the block during consensus
# It contains the Merkle root of the complete serialized block cut into parts (ie. MerkleRoot(MakeParts(block))).
type PartSetHeader struct {
	Total Uint
	BlockCID  BlockPartTreeCID
}

# PartSet is the complete set of parts for a header
type PartSet [Part]

# Part is a section of bytes of a complete protobuf serialized block
type Part struct {
	Index Uint
	Bytes HexBytes
	Proof Proof
}
```

## Tendermint Block Part Tree
This is the IPLD schema for Block Part Merkle Tree nodes. This is an alias for a `MerkleTreeNode` where the `Value` union
type stored in a leaf node is of type `Part`.

* The Block Part Merkle Tree is a Merkle tree built from the set of block `Part`s, these are byte segments of the serialized block.
* The block binary is segmented across parts based on a chunk size. In this manner, the fields of the block do not map to
specific leaves but instead the binary for a specific field can be spread across multiple leaves and a single leaf may
contain chunks of different fields.
* CID links to a `BlockPartTreeNode` use an SHA256 multihash of the node binary and the TendermintBlockPartTree codec (tbd).
* The root node of this tree for block `n-1` is referenced in a Tendermint `PartSetHeader` by the `BlockCID` at block `n`.
* The `PartSetHeader` is part of the `BlockID`.
```ipldsch
# BlockPartTreeNode is an IPLD block for a node in a Block Part merkle tree
type BlockPartTreeNode MerkleTreeNode

# BlockPartTreeCID is a CID link to a node of a Block Part merkle tree
type BlockPartTreeCID &BlockPartTreeNode
```

## Tendermint Header
A block header contains metadata about the block and about the consensus, as well as commitments to the data in the current block,
the previous block, and the results returned by the application.
Similar to blocks, headers are indirectly content-hash referenced by the root of a Merkle tree composed of the header's separate fields.
```ipldsch
# HeaderCID is a CID link to a Tendermint header, this link is indirect by means of a reference to the root node of a
# Header merkle tree (formed from all the fields of a header) rather than a direct reference by hash of the header itself
# This CID is composed of the SHA256 multihash of the root node in the Header Merkle Tree and the TendermintHeader codec (tbd)
# Header merkle tree is a Merklization of all of the fields in the header, each leaf stores a single protobuf encoded field
# and the order of these fields in the Merkle Tree corresponds with their order in the header object
type HeaderCID &Header

# Header defines the structure of a Tendermint block header
type Header struct {
	# basic block info
	Version Version
	ChainID String
	Height  Int
	Time    Time

	# prev block info
	# the first block has an empty BlockID struct as LastBlockID
	LastBlockID BlockID

	# hashes of block data
	LastCommitCID CommitTreeCID # CID link to the root node of a Merkle Tree formed from the last block's set of commit signatures
	DataCID       TxTreeCID # CID link to the root node of a Merkle Tree formed from this block's set of transactions

	# hashes from the app output from the prev block
	ValidatorsCID     ValidatorTreeCID # CID link to the root node of a Merkle Tree formed from this block's validator set
	NextValidatorsCID ValidatorTreeCID # CID link to the root node of a Merkle Tree formed from the next validator set
	ConsensusCID      HashedParamsCID # CID link to HashedParams
	AppCID            AppStateTreeCID # State Root from the state machine

	# root hash of all results from the txs from the previous block
	LastResultsCID ResultTreeCID # CID link to the root node of a Merkle Tree formed from the last block's set of results

	# consensus info
	EvidenceCID    EvidenceTreeCID # CID link to the root node of a Merkle Tree formed from this block's set of evidence
	ProposerAddress Address # Address of the original proposer of this block, which must a validator in the current validator set
}
```

## Tendermint Header Field Tree
This is the IPLD schema for header field tree nodes. This is an alias for a `MerkleTreeNode` where the `Value` union
type stored in a leaf node is of type `Bytes`.

* The Header Field merkle tree is a Merkle tree built from the individual fields of a `Header`.
* Each protobuf serialized field is stored in a leaf node, in the order they appear in the `Header` object. As such,
each leaf stores a different type of value.

```
LeafIndex0 = protobuf(Version)
LeafIndex1 = protobuf(ChainID)
LeafIndex2 = protobuf(Height)
LeafIndex3 = protobuf(Time)
LeafIndex4 = protobuf(LastBlockID)
LeafIndex5 = protobuf(LastCommitID)
LeafIndex6 = protobuf(DataCID)
LeafIndex7 = protobuf(ValidatorsCID)
LeafIndex8 = protobuf(NextValidatorsCID)
LeafIndex9 = protobuf(ConsensusCID)
LeafIndex10 = protobuf(AppCID)
LeafIndex11 = protobuf(LastResultsCID)
LeafIndex12 = protobuf(EvidenceCID)
LeafIndex13 = protobuf(ProsperAddress)
```
For a visual representation of the above, see the included [diagram](./tendermint_dag.png)

* CID links to a `HeaderFieldTreeNode` use an SHA256 multihash of the node binary and the TendermintHeaderFieldTree codec (tbd).
* The root node of this tree at block `n-1` is referenced in a Tendermint `BlockID` by the `BlockCID` at block `n`.
```ipldsch
# HeaderFieldTreeNode is an IPLD block for a node in a Header Field merkle tree
type HeaderFieldTreeNode MerkleTreeNode

# HeaderFieldTreeCID is a CID link to a node of a Header Field merkle tree
type HeaderFieldTreeCID &HeaderFieldTreeNode
```

## Tendermint Light Block
LightBlock is the core data structure of the light client.
It combines two data structures needed for verification (SignedHeader & ValidatorSet).
CID links to LightBlock use the SHA256 multihash and the LightBlock codec (tbd).
```ipldsch
# LightBlock is a SignedHeader and a ValidatorSet.
# It is the basis of the light client
type LightBlock struct {
	SignedHeader SignedHeader
	ValidatorSet  ValidatorSet
}

# SignedHeader is a header along with the commits that prove it.
type SignedHeader struct {
	Header Header
	Commit Commit
}
```

## Tendermint Validator and Validator Set
A Validator object is used to uniquely identify a Tendermint validator.
A Validator Set is used to help verify that the validators that committed a infraction were truly in the validator set.
```ipldsch
# ValidatorSet represent a set of Validators at a given height.
#
# The validators can be fetched by address or index.
# The index is in order of .VotingPower, so the indices are fixed for all
# rounds of a given blockchain height - ie. the validators are sorted by their
# voting power (descending). Secondary index - .Address (ascending).
type ValidatorSet struct {
	Validators Validators
	Proposer   Validator
}

# Validators is a list of validators
types Validators [Validator]

# Volatile state for each Validator
# NOTE: The Address and ProposerPriority is not included in Validator.Hash();
# make sure to update that method if changes are made here
type Validator struct {
	Address     Address # Not included in the hash
	PubKey      PubKey
	VotingPower Int
	ProposerPriority Int # Not included in the hash
}

# SimpleValidator contains only the consensus fields of a Validator
type SimpleValidator struct {
	PubKey      PubKey
	VotingPower Int
}
```

## Tendermint Validator Tree
This is the IPLD schema for validator tree nodes. This is an alias for a `MerkleTreeNode` where the `Value` union
type stored in a leaf node is `SimpleValidator`.

* The Validator Merkle Tree is a Merkle Tree built from the set of `SimpleValidator`s for the given block
* The validators are first sorted by voting power (descending), then by address (ascending) to determine their index in the tree.
* Leaves contain a protobuf serialized `SimpleValidator` object, which contains consensus fields for a validator.
* CID links to a `ValidatorTreeNode` use an SHA256 multihash of the node binary and the TendermintValidatorTree codec (tbd).
* The root node of this tree is referenced in a Tendermint `Header` by the `ValidatorsCID` for the current set at the current
block height and the `NextValidatorsCID` for the set at the next block height.
```ipldsch
# ValidatorTreeNode is an IPLD block for a node in a Validator merkle tree
type ValidatorTreeNode MerkleTreeNode

# ValidatorTreeCID is a CID link to a node of a Validator merkle tree
type ValidatorTreeCID &ValidatorTreeNode
```

## Tendermint Evidence List and Evidence
Evidence in Tendermint is used to indicate breaches in the consensus by a validator.
```ipld
# EvidenceList is a simple wrapper for a list of evidence
type EvidenceList [Evidence]

# Evidence in Tendermint is used to indicate breaches in the consensus by a validator
# Currently there are two types of Evidence
type Evidence union {
  | DuplicateVoteEvidence "duplicate"
  | LightClientAttackEvidence "light"
} representation keyed

# DuplicateVoteEvidence represents a validator that has voted for two different blocks in the same round of the same height.
# Votes are lexicographically sorted on BlockID.
type `DuplicateVoteEvidence` struct {
	VoteA Vote
	VoteB Vote

	# abci specific information
	TotalVotingPower Int
	ValidatorPower   Int
	Timestamp        Time
}

# Vote represents a prevote, precommit, or commit vote from validators for
# consensus.
type Vote struct {
	SMType           SignedMsgType
	Height           Int
	Round            Int
	BlockID          BlockID
	Timestamp        Time
	ValidatorAddress Address
	ValidatorIndex   Int
	Signature        Signature
}

# SignedMsgType is the type of signed message in the consensus.
type SignedMsgType enum {
    | UnknownType ("0")
    | PrevoteType ("1")
    | PrecommitType ("2")
    | ProposalType ("32")
} representation int

# LightClientAttackEvidence is a generalized evidence that captures all forms of known attacks on
# a light client such that a full node can verify, propose and commit the evidence on-chain for
# punishment of the malicious validators. There are three forms of attacks: Lunatic, Equivocation and Amnesia.
type LightClientAttackEvidence struct {
	ConflictingBlock LightBlock
	CommonHeight     Int

	# abci specific information
	ByzantineValidators [Validator] # Validators in the validator set that misbehaved in creating the conflicting block
	TotalVotingPower    Int        # Total voting power of the validator set at the common height
	Timestamp           Time         # Timestamp of the block at the common height
}
```

## Tendermint Evidence Tree
This is the IPLD schema for evidence tree nodes. This is an alias for a `MerkleTreeNode` where the `Value` union
type stored in a leaf node is `Evidence`.

* The Evidence Merkle Tree is Merkle Tree built from the list of Evidence of Byzantine behaviour included in this block.
* Leaves contain a protobuf serialized `Evidence` object, either `DuplicateVoteEvidence` or `LightClientAttackEvidence`.
* CID links to a `EvidenceTreeNode` use an SHA256 multihash of the node binary and the TendermintEvidenceTree codec (tbd).
* The root node of this tree is referenced in a Tendermint `Header` by the `EvidenceCID`.
```ipldsch
# EvidenceTreeNode is an IPLD block for a node in an Evidence merkle tree
type EvidenceTreeNode MerkleTreeNode

# EvidenceTreeCID is a CID link to a node of an Evidence merkle tree
type EvidenceTreeCID &EvidenceTreeNode
```

## Tendermint Transaction
Transactions in Tendermint are unstructured byte arrays from the perspective of the Tendermint client. This is necessary
to support any arbitrary ABCI/ABCI++ compliant state machine. The state machine is responsible for decoding and applying
these transactions in a deterministic capacity.
```ipldsch
# Tx is an arbitrary byte array.
# Tx has no types at the Tendermint level, instead it encodes arbitrary length-prefixed data that can be decoded and processed in a state-machine specific manner.
type Tx [Bytes]

#Txs is a list of Tx.
type Txs [Tx]

# TxCID is a link to a Tx
# TxCID uses the SHA256 multihash and the Raw codec (0x55)
type TxCID &Tx
```

## Tendermint Tx Tree
This is the IPLD schema for tx tree nodes. This is an alias for a `MerkleTreeNode` where the `Value` union
type stored in a leaf node is a `TxTreeCID`.

* The Tx Merkle Tree is Merkle Tree built from the list of transactions included in this block, ordered by their index in the block.
* A transaction is an unstructured byte array, it's decoding is dependent on the state machine it is intended for.
* Leaves contain a hash link (`TxCID`) to a transaction rather than the transaction itself.
* CID links to a `TxTreeNode` use an SHA256 multihash of the node binary and the TxTree codec (tbd).
* The root node of this tree is referenced in a Tendermint `Header` by the `DataCID`.

```ipldsch
# TxTreeNode is an IPLD block for a node in a Tx merkle tree
type TxTreeNode MerkleTreeNode

# TxTreeCID is a CID link to a node in a Tx merkle tree
type TxTreeCID &TxTreeNode
```

## Tendermint Result
The result object contains the consensus fields of an ABCI ResponseDeliverTx.

```ipldsch
# ResponseDeliverTx are the consensus fields of an ABCI ResponseDeliverTx, that are included in the ResultTree
type ResponseDeliverTx struct {
    Code      Uint
    Data      Bytes
    GasWanted Int
    GasUsed   Int
}
```

## Tendermint Result Tree
This is the IPLD schema for result tree nodes. This is an alias for a `MerkleTreeNode` where the `Value` union
type stored in a leaf node is a `ResponseDeliverTx`.

* The Result Merkle Tree is Merkle tree built from the list of the consensus results included in the previous block, ordered by their index in the block.
* Leaves contain a protobuf serialized `ResponseDeliverTx`, this object contains only the consensus fields of the ABCI `ResponseDeliverTx`.
* CID links to a `ResultTreeNode` use an SHA256 multihash of the node binary and the TendermintResultTree codec (tbd).
* The root node of this tree is referenced in a Tendermint `Header` by the `LastResultsCID`.
* The first block has an empty Result tree. The `LastResultsCID` will be derived from the hash of an empty input, for RFC-6962 conformance.
```ipldsch
# ResultTreeNode is an IPLD block for a node in a Result merkle tree
type ResultTreeNode MerkleTreeNode

# ResultTreeCID is a CID link to a node in a Result merkle tree
type ResultTreeCID &ResultTreeNode
```

## Tendermint Commit and CommitSig
Commit is a simple wrapper for a list of commit signatures for every validator at a block, as well as the
associated BlockID and corresponding block height and round.

CommitSig represents a signature of a validator, who has voted either for nil, a particular BlockID, or was absent.
It's a part of the Commit and can be used to reconstruct the vote set given the validator set.
```ipldsch
# Commit contains the evidence that a block was committed by a set of validators
# NOTE: Commit is empty for height 1, but never nil.
type Commit struct {
	# NOTE: The signatures are in order of address to preserve the bonded
	# ValidatorSet order.
	# Any peer with a block can gossip signatures by index with a peer without
	# recalculating the active ValidatorSet.
	Height     Int # Height at which this commit was created
	Round      Int # Round that the commit corresponds to
	BlockID    BlockID # The BlockID of the corresponding block
	Signatures Signatures # Array of CommitSigs for the validators at this block
}

# Signatures is a list of CommitSigs
type Signatures [CommitSig]

# CommitSig is a part of the Vote included in a Commit.
type CommitSig struct {
	BlockIDFlag      BlockIDFlag # Represents the validators participation in consensus: Either voted for the block that received the majority, voted for another block, voted nil or did not vote
	ValidatorAddress Address # Address of the validator
	Timestamp        Time
	Signature        Signature # Signature corresponding to the validators participation in consensus.
}
```

## Tendermint Commit Tree
This is the IPLD schema for commit tree nodes. This is an alias for a `MerkleTreeNode` where the `Value` union
type stored in a leaf node is a `CommitSig`.

* The Commit Merkle Tree is Merkle tree built from the list of the previous block's commit signatures.
* The signatures represent the validators that committed to the last block.
* Leaves contain a protobuf serialized `CommitSig` object.
* CID links to a `CommitTreeNode` use an SHA256 multihash of the node binary and the TendermintCommitTree codec (tbd).
* The root node of this tree is referenced in a Tendermint `Header` by the `LastCommitCID`.
* The first block's Commit Merkle Tree is empty, and its root is represented as an empty byte slice.
```ipldsch
# CommitTreeNode is an IPLD block for a node in a Commit Merkle Tree
type CommitTreeNode MerkleTreeNode

# CommitTreeCID is a CID link to a node in a Commit Merkle Tree
type CommitTreeCID &CommitTreeNode
```

## Tendermint Params
HashedParams contains the max bytes and max gas for a block.
```ipldsch
# HashedParamsCID is a CID link to the HashedParams for this Header
# This CID is composed of the SHA256 multihash of the linked protobuf serialized HashedParams object and the TendermintParams codec (tbd)
# HashedParams are referenced in a Tenderint Header by the ConsensusCID
type HashParamsCID &HashedParams

# HashedParams is a subset of ConsensusParams that is included in the consensus encoding
# It is hashed into the Header.ConsensusHash
type HashedParams struct {
	BlockMaxBytes Int
	BlockMaxGas   Int
}
```

## Tendermint Proposal
A CanonicalProposal contains the consensus fields used to propose a new block for validation.
```
# PropsalCID is a CID link to a CanonicalProposal for a block
# This CID is composed of the SHA256 multihash of the linked protobuf serialized CanonicalProposal object and the TendermintProposal codec (tbd)
type ProposalCID &Proposal

# CanonicalProposal defines a block proposal for consensus.
# It refers to the block by BlockID field.
# It must be signed by the correct proposer for the given Height/Round
# to be considered valid. It may depend on votes from a previous round,
# a so-called Proof-of-Lock (POL) round, as noted in the POLRound.
# If POLRound >= 0, then BlockID corresponds to the block that is locked in POLRound.
type CanonicalProposal struct {
	SMType    SignedMsgType
	Height    Int
	Round     Int # There can not be greater than 2_147_483_647 rounds
	POLRound  Int # -1 if null.
	BlockID   BlockID # The block being proposed
	Timestamp Time
	ChainID   String
}
```
