export type Hash = string;
// export type Block = string
export type Err = string;
export type u8 = number;
export type u16 = number;
export type u32 = number;
export type u64 = number;
export type f64 = number;
export type i64 = number;
export type usize = number;
export type ValueTransferOutput = {
  pkh: Hash;
  value: u64;
  timeLock: u64;
};
export type Epoch = u32;
export type SocketAddress = string;
export enum RADType {
  HttpGet = "HTTP-GET",
}
export enum UTXOSelectionStrategy {
  Random = "Random",
  BigFirst = "BigFirst",
  SmallFirst = "SmallFirst",
}

export type buildVTT = {
  fee: u64;
  utxoStrategy: UTXOSelectionStrategy;
  vto: Array<ValueTransferOutput>;
};
export type RADTally = {
  filters: Array<RADFilter>;
  reducer: u32;
};
export type RADRetrieve = { type: RADType; url: string; script: Array<u8> };
export type RADFilter = { op: u32; args: Array<u8> };
export type RADAggregate = { filters: Array<RADFilter>; reducer: u32 };
export type RADRequest = {
  timeLock: number;
  retrieve: Array<RADRetrieve>;
  aggregate: RADAggregate;
  tally: RADTally;
};
export type DataRequestOutput = {
  dataRequest: RADRequest;
  witness_reward: number;
  witnesses: number;
  commitAndRevealFee: number;
  minConsensusPercentage: number;
  collateral: number;
};

export type StatusResult = {
  chain_beacon: {
    checkpoint: number;
    hashPrevBlock: Hash;
  };
  current_epoch: Epoch;
  node_state: NodeState;
  status: {
    chain_beacon: {
      checkpoint: number;
      hashPrevBlock: Hash;
    };
    current_epoch: number;
    node_state: NodeState;
  };
};

enum NodeState {
  Synced = "Synced",
}

export enum MethodName {
  GetBlockChain = "getBlockChain",
  GetBlock = "getBlock",
  GetTransaction = "getTransaction",
  SyncStatus = "syncStatus",
  AddPeers = "addPeers",
  ClearPeers = "clearPeers",
  CreateVRF = "createVRF",
  DataRequestReport = "dataRequestReport",
  GetBalance = "getBalance",
  GetConsensusConstants = "getConsensusConstants",
  GetMempool = "getMempool",
  GetPkh = "getPkh",

  GetPublicKey = "getPublicKey",
  GetReputation = "getReputation",
  GetReputationAll = "getReputationAll",
  GetSuperblock = "getSuperblock",
  GetSupplyInfo = "getSupplyInfo",
  GetUtxoInfo = "getUtxoInfo",
  InitializePeers = "initializePeers",
  Inventory = "inventory",
  KnownPeers = "knownPeers",
  MasterKeyExport = "masterKeyExport",
  NodeStats = "nodeStats",
  Peers = "peers",
  Rewind = "rewind",
  SendRequest = "sendRequest",
  SendValue = "sendValue",
  Sign = "sign",
  SignalingInfo = "signalingInfo",
  TryRequest = "tryRequest",
  // Witnet_subscribe="witnet_subscribe",
  // Witnet_unsubscribe="witnet_unsubscribe",
}

export enum MethodName {
  closeSession = "close_session",
  shutdown = "shutdown",
  createDataRequest = "create_data_request",
  createMnemonics = "create_mnemonics",
  createVTT = "create_vtt",
  createWallet = "create_wallet",
  validateMnemonics = "validate_mnemonics",
  generateAddress = "generate_address",
  getAddresses = "get_addresses",
  getBalance = "get_balance",
  getItem = "get",
  deleteWallet = "delete_wallet",
  getTransactions = "get_transactions",
  getWalletInfos = "get_wallet_infos",
  exportMasterKey = "export_master_key",
  importSeed = "import_seed",
  refreshSession = "refresh_session",
  lockWallet = "lock_wallet",
  runRadRequest = "run_rad_request",

  saveItem = "set",

  sendTransaction = "send_transaction",

  unlockWallet = "unlock_wallet",

  resync = "resync_wallet",

  updateWallet = "update_wallet",
}

// Block data structure
export type Block = {
  block_header: BlockHeader;
  block_sig: KeyedSignature;
  txns: BlockTransactions;
  // hash: memoHash  // private?
};

// Block header structure
export type BlockHeader = {
  // 32 bits for binary signaling new witnet protocol improvements.
  // See [WIP-0014](https://github.com/witnet/WIPs/blob/master/wip-0014.md) for more info.
  signals: u32;
  // A checkpoint beacon for the epoch that this block is closing
  beacon: CheckpointBeacon;
  // 256-bit hashes of all of the transactions committed to this block, so as to prove their belonging and integrity
  merkle_roots: BlockMerkleRoots;
  // A miner-provided proof of leadership
  proof: BlockEligibilityClaim;
  // The Bn256 public key
  bn256_public_key?: Bn256PublicKey;
};

export type CheckpointBeacon = {
  // The serial number for an epoch
  checkpoint: Epoch;
  // The 256-bit hash of the previous block header
  hashPrevBlock: Hash;
};

export type KeyedSignature = {
  // Signature
  signature: Signature;
  // Public key
  public_key: PublicKey;
};

// Block merkle tree roots
export type BlockMerkleRoots = {
  // A 256-bit hash based on the mint transaction committed to this block
  mint_hash: Hash;
  // A 256-bit hash based on all of the value transfer transactions committed to this block
  vt_hash_merkle_root: Hash;
  // A 256-bit hash based on all of the data request transactions committed to this block
  dr_hash_merkle_root: Hash;
  // A 256-bit hash based on all of the commit transactions committed to this block
  commit_hash_merkle_root: Hash;
  // A 256-bit hash based on all of the reveal transactions committed to this block
  reveal_hash_merkle_root: Hash;
  // A 256-bit hash based on all of the tally transactions committed to this block
  tally_hash_merkle_root: Hash;
};

// Public Key data structure
export type PublicKey = {
  // Byte indicating how to decompress the public key
  compressed: number;
  // Public key bytes
  // TODO: bytes: [u8; 32] -> Array<number>?
  bytes: Uint8Array;
};

// Digital signatures structure (based on supported cryptosystems)
export type Signature =
  // ECDSA over secp256k1
  Secp256k1Signature;

// ECDSA (over secp256k1) signature
export type Secp256k1Signature = {
  // The signature serialized in DER
  der: Array<u8>;
};

// BN256 public key
export type Bn256PublicKey = {
  // Compressed form of a BN256 public key
  public_key: Array<u8>;
  // Cached uncompressed form
  // TODO: uncompressed: Memoized<Vec<u8>>,
  uncompressed: Array<u8>;
};

// Block mining eligibility claim
export type BlockEligibilityClaim = {
  // A Verifiable Random Function proof of the eligibility for a given epoch and public key
  proof: VrfProof;
};

// A VRF Proof is a unique, deterministic way to sign a message with a public key.
// It is used to prevent one identity from creating multiple different proofs of eligibility.
export type VrfProof = {
  proof: Uint8Array;
  public_key: PublicKey;
};

// Block transactions
export type BlockTransactions = {
  // Mint transaction,
  mint: MintTransaction;
  // A list of signed value transfer transactions
  value_transfer_txns: Array<VTTransaction>;
  // A list of signed data request transactions
  data_request_txns: Array<DRTransaction>;
  // A list of signed commit transactions
  commit_txns: Array<CommitTransaction>;
  // A list of signed reveal transactions
  reveal_txns: Array<RevealTransaction>;
  // A list of signed tally transactions
  tally_txns: Array<TallyTransaction>;
};

export type MintTransaction = {
  epoch: Epoch;
  outputs: Array<ValueTransferOutput>;

  // hash: MemoHash,
  // TODO: include this field?
  hash: Hash;
};

export type VTTransaction = {
  body: VTTransactionBody;
  signatures: Array<KeyedSignature>;
};

export type VTTransactionBody = {
  inputs: Array<Input>;
  outputs: Array<ValueTransferOutput>;

  // TODO: include this field?
  // hash: MemoHash,
};

export type DRTransaction = {
  body: DRTransactionBody;
  signatures: Array<KeyedSignature>;
};

export type CommitTransaction = {
  body: CommitTransactionBody;
  signatures: Array<KeyedSignature>;
};

export type RevealTransaction = {
  body: RevealTransactionBody;
  signatures: Array<KeyedSignature>;
};

export type TallyTransaction = {
  // DRTransaction hash
  dr_pointer: Hash;
  // Tally result
  tally: Uint8Array;
  // Witness rewards
  outputs: Array<ValueTransferOutput>;
  // Addresses that are out of consensus (non revealers included)
  out_of_consensus: Array<PublicKeyHash>;
  // Addresses that commit a RadonError (or considered as an Error due to a RadonError consensus)
  error_committers: Array<PublicKeyHash>;

  // TODO
  hash: Hash;
};

export type Input = {
  output_pointer: OutputPointer;
};

// Unspent output data structure (equivalent of Bitcoin's UTXO)
// It is used to locate the output by its transaction identifier and its position
export type OutputPointer = {
  // Transaction identifier
  transaction_id: Hash;
  // Index of output inside transaction
  output_index: u32;
};

export type PublicKeyHash = {
  hash: Uint8Array;
};
export type DRTransactionBody = {
  inputs: Array<Input>;
  outputs: Array<ValueTransferOutput>;
  dr_output: DataRequestOutput;

  // TODO ?
  hash: Hash;
};

export type CommitTransactionBody = {
  // DRTransaction hash
  dr_pointer: Hash;
  // RevealTransaction Signature Hash
  commitment: Hash;
  // Proof of eligibility for this pkh, epoch, and data request
  proof: DataRequestEligibilityClaim;
  // Inputs used as collateral
  collateral: Array<Input>;
  // Change from collateral. The output pkh must be the same as the inputs,
  // and there can only be one output
  outputs: Array<ValueTransferOutput>;
  // BLS public key (curve bn256)
  bn256_public_key?: Bn256PublicKey;

  // TODO
  hash: Hash;
};

export type RevealTransactionBody = {
  // Inputs
  dr_pointer: Hash; // DTTransaction hash
  // Outputs
  reveal: Array<u8>;
  pkh: PublicKeyHash; // where to receive reward

  // TODO
  hash: Hash;
};

// Data request eligibility claim
export type DataRequestEligibilityClaim = {
  // A Verifiable Random Function proof of the eligibility for a given epoch, public key and data request
  proof: VrfProof;
};

export type Transaction =
  | VTTransaction
  | DRTransaction
  | CommitTransaction
  | RevealTransaction
  | TallyTransaction
  | MintTransaction;

export type BlockEpoch = u32;
export type SuperblockIndex = u32;
export type GetSuperblockParam = BlockEpoch | SuperblockIndex;

// Builds a `DataRequestTransaction` from a `DataRequestOutput`
export type BuildDrt = {
  // `DataRequestOutput`
  dro: DataRequestOutput;
  // Fee
  fee: u64;
};

// Node synchronization status
export type SyncStatus = {
  // The hash of the top consolidated block and the epoch of that block
  chain_beacon: CheckpointBeacon;
  // The current epoch, or None if the epoch 0 is in the future
  current_epoch?: u32;
  // Node State
  node_state: StateMachine;
};

// State machine for the synchronization status of a Witnet node
export enum StateMachine {
  // First state, ChainManager is waiting for reaching  consensus between its peers
  WaitingConsensus = "WaitingConsensus",
  // Second state, ChainManager synchronization process
  Synchronizing = "Synchronizing ",
  // Third state, `ChainManager` has all the blocks in the chain and is ready to start
  // consolidating block candidates in real time.
  AlmostSynced = "AlmostSynced",
  // Fourth state, `ChainManager` can consolidate block candidates, propose its own
  // candidates (mining) and participate in resolving data requests (witnessing).
  Synced = "Synced",
}
type PublicKeyHashString = string;
// List of outputs related to a data request
export type DataRequestInfo = {
  // List of commitments to resolve the data request
  commits: Record<PublicKeyHashString, CommitTransaction>;
  //List of reveals to the commitments (contains the data request witnet result)
  reveals: Record<PublicKeyHashString, RevealTransaction>;
  //Tally of data request (contains final result)
  tally?: TallyTransaction;
  //Hash of the block with the DataRequestTransaction
  block_hash_dr_tx?: Hash;
  //Hash of the block with the TallyTransaction
  block_hash_tally_tx?: Hash;
  //Current commit round
  current_commit_round: u16;
  //Current reveal round
  current_reveal_round: u16;
  //Current stage, or None if finished
  current_stage?: DataRequestStage;
};

//Data request current stage
export enum DataRequestStage {
  //Expecting commitments for data request
  COMMIT = "COMMIT",
  //Expecting reveals to previously published commitments
  REVEAL = "REVEAL",
  //Expecting tally to be included in block
  TALLY = "TALLY",
}

// Structure that the includes the confirmed and pending balance of a node
export type NodeBalance = {
  //Total amount of a node's funds after last confirmed superblock
  confirmed?: u64;
  //Total amount of node's funds after last block
  total: u64;
};

//Consensus-critical configuration
export type ConsensusConstants = {
  //Timestamp at checkpoint 0 (the start of epoch 0)
  checkpoint_zero_timestamp: i64;

  //Seconds between the start of an epoch and the start of the next one
  checkpoints_period: u16;

  //Auxiliary bootstrap block hash value
  bootstrap_hash: Hash;

  //Genesis block hash value
  genesis_hash: Hash;

  //Maximum weight a block can have, this affects the number of
  //transactions a block can contain: there will be as many
  //transactions as the sum of _their_ weights is less than, or
  //equal to, this maximum block weight parameter.
  //
  //Maximum aggregated weight of all the value transfer transactions in one block
  max_vt_weight: u32;
  //Maximum aggregated weight of all the data requests transactions in one block
  max_dr_weight: u32;

  //An identity is considered active if it participated in the witnessing protocol at least once in the last `activity_period` epochs
  activity_period: u32;

  //Reputation will expire after N witnessing acts
  reputation_expire_alpha_diff: u32;

  //Reputation issuance
  reputation_issuance: u32;

  //When to stop issuing new reputation
  reputation_issuance_stop: u32;

  //Penalization factor: fraction of reputation lost by liars for out of consensus claims
  // FIXME(#172): Use fixed point arithmetic
  reputation_penalization_factor: f64;

  //Backup factor for mining: valid VRFs under this factor will result in broadcasting a block
  mining_backup_factor: u32;

  //Replication factor for mining: valid VRFs under this factor will have priority
  mining_replication_factor: u32;

  //Minimum value in nanowits for a collateral value
  collateral_minimum: u64;

  //Minimum input age of an UTXO for being a valid collateral
  collateral_age: u32;

  //Build a superblock every `superblock_period` epochs
  superblock_period: u16;

  //Extra rounds for commitments and reveals
  extra_rounds: u16;

  //Minimum difficulty
  minimum_difficulty: u32;

  //Number of epochs with the minimum difficulty active
  //(This number represent the last epoch where the minimum difficulty is active)
  epochs_with_minimum_difficulty: u32;

  //Superblock signing committee for the first superblocks
  bootstrapping_committee: Array<string>;

  //Size of the superblock signing committee
  superblock_signing_committee_size: u32;

  //Period after which the committee size should decrease (in superblock periods)
  superblock_committee_decreasing_period: u32;

  //Step by which the committee should be reduced after superblock_agreement_decreasing_period
  superblock_committee_decreasing_step: u32;

  //Initial block reward
  initial_block_reward: u64;

  //Halving period
  halving_period: u32;
};

// Result of GetMempool message: list of pending transactions categorized by type
export type GetMempoolResult = {
  //Pending value transfer transactions
  value_transfer: Array<Hash>;
  //Pending data request transactions
  data_request: Array<Hash>;
};

//GetReputation result
export type GetReputationAllResult = {
  //Map of identity public key hash to reputation stats
  stats: Record<PublicKeyHashString, ReputationStats>;
  //Total active reputation
  total_reputation: u64;
};

//Reputation info
export type ReputationStats = {
  //Reputation
  reputation: Reputation;
  //Eligibility: Trapezoidal reputation based on ranking
  eligibility: u32;
  //Is active flag
  is_active: boolean;
};

export type Reputation = u32;

//Notification signaling that a superblock has been consolidated.
//
//As per current consensus algorithm, "consolidated blocks" implies that there exists at least one
//superblock in the chain that builds upon the superblock where those blocks were anchored.
export type SuperBlockNotify = {
  //The superblock that we are signaling as consolidated.
  superblock: SuperBlock;
  //The hashes of the blocks that we are signaling as consolidated.
  consolidated_block_hashes: Array<Hash>;
};

//`SuperBlock` abridges the tally and data request information that happened during a
//`superblock_period` number of Witnet epochs as well the ARS members merkle root
//as of the last block in that period.
//This is needed to ensure that the security and trustlessness properties of Witnet will
//be relayed to bridges with other block chains.
export type SuperBlock = {
  //Number of signing committee members,
  signing_committee_length: u32;
  //Merkle root of the Active Reputation Set members included into the previous SuperBlock
  ars_root: Hash;
  //Merkle root of the data requests in the blocks created since the last SuperBlock
  data_request_root: Hash;
  //Superblock index,
  index: u32;
  //Hash of the block that this SuperBlock is attesting as the latest block in the block chain,
  last_block: Hash;
  //Hash of the block that the previous SuperBlock used for its own `last_block` field,
  last_block_in_previous_superblock: Hash;
  //Merkle root of the tallies in the blocks created since the last SuperBlock
  tally_root: Hash;

  // todo: it includes?
  // hash?: MemoHash
};

//Information about the total supply
export type SupplyInfo = {
  //Current epoch
  epoch: u32;
  //Current time
  current_time: u64;
  //Number of blocks minted
  blocks_minted: u32;
  //WIT minted through block creation
  blocks_minted_reward: u64;
  //Number of blocks missing
  blocks_missing: u32;
  //WIT missing because a block was not created
  blocks_missing_reward: u64;
  //Amount of in-flight data requests
  in_flight_requests: u32;
  //Supply currently locked in data requests
  locked_wits_by_requests: u64;
  //Current unlocked supply
  current_unlocked_supply: u64;
  //Current locked supply
  current_locked_supply: u64;
  //Maximum supply: the number of nanowits that will ever exist
  maximum_supply: u64;
};

//Information about our own UTXOs
export type UtxoInfo = {
  //Vector of OutputPointer with their values, time_locks and if it is ready for collateral
  utxos: Array<UtxoMetadata>;
  //Minimum collateral from consensus constants
  collateral_min: u64;
};

export type UtxoMetadata = {
  output_pointer: OutputPointer;
  value: u64;
  timelock: u64;
  utxo_mature: boolean;
};

//Named tuple of `(address, type)`
export type AddrType = {
  //Socket address of the peer
  address: string;
  //"inbound" | "outbound" when asking for connected peers, or
  //"new" | "tried" when asking for all the known peers
  type: string;
};

//Node stats
export type NodeStats = {
  //Number of proposed blocks
  block_proposed_count: u32;
  //Number of blocks included in the block chain
  block_mined_count: u32;
  //Number of times we were eligible to participate in a Data Request
  dr_eligibility_count: u32;
  //Number of proposed commits
  commits_proposed_count: u32;
  //Number of commits included in a data request
  commits_count: u32;
  //Last block proposed
  last_block_proposed: Hash;
  //Number of slashed commits
  slashed_count: u32;
};

//Result of GetSignalingInfo
export type SignalingInfo = {
  //List of protocol upgrades that are already active, and their activation epoch
  active_upgrades: Record<string, Epoch>;
  //List of protocol upgrades that are currently being polled for activation signaling
  pending_upgrades: Array<BitVotesCounter>;
  //Last epoch
  epoch: Epoch;
};

//Struct that count the positives votes of a WIP
export type BitVotesCounter = {
  votes: u32;
  period: Epoch;
  wip: string;
  init: Epoch;
  end: Epoch;
  bit: usize;
};

//Inventory element: block, transaction, etc
export type InventoryItem = Transaction | Block;

export interface Response {
  // TODO: remove any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  result?: any;
  error?: any;
}
