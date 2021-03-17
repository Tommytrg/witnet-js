import { TcpClient } from "./tcpClient";
import {
  AddrType,
  Block,
  BuildDrt,
  buildVTT,
  ConsensusConstants,
  DataRequestInfo,
  DataRequestOutput,
  Epoch,
  GetMempoolResult,
  GetReputationAllResult,
  GetSuperblockParam,
  Hash,
  InventoryItem,
  KeyedSignature,
  MethodName,
  NodeBalance,
  NodeStats,
  ReputationStats,
  SignalingInfo,
  SocketAddress,
  SuperBlockNotify,
  SupplyInfo,
  SyncStatus,
  Transaction,
  UtxoInfo,
  Response,
} from "./types";

export class WitnetNode {
  private tcpClient;

  constructor(url: string, port: number) {
    // console.log('url', url)
    // console.log('port', port)
    this.tcpClient = new TcpClient(url, port);
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private async callApiMethod(method: string, args?: Array<any>) {
    return this.tcpClient
      .request(method, args)
      .then((response: Response) => {
        return response.result || response.error;
      })
      .catch((e) => console.log("-e-", e));
  }

  /**
   * Get the list of all the known block hashes.
   * @param  {number=0} epoch - First epoch for which to return block hashes. If negative, return block hashes from the last n epochs.
   * @param  {number=0} limit - Number of block hashes to return. If negative, return the last n block hashes from this epoch range.  //If zero, unlimited.
   */
  public async getBlockchain(
    epoch = 0,
    limit = 1,
  ): Promise<Array<[number, Hash]>> {
    return this.callApiMethod(MethodName.GetBlockChain, [epoch, limit]);
  }

  //Get block by hash
  //
  //- First argument is the hash of the block that we are querying.
  //- Second argument is whether we want the response to contain a list of hashes of the
  //  transactions found in the block.
  /* test
{"jsonrpc":"2.0","id":1,"method":"getBlock","params":["c0002c6b25615c0f71069f159dffddf8a0b3e529efb054402f0649e969715bdb", false]}
*/

  public async getBlock(
    blockHash: Hash,
    showTransactionHash = false,
  ): Promise<Block> {
    return this.callApiMethod(MethodName.GetBlock, [
      blockHash,
      showTransactionHash,
    ]);
  }

  public getTransaction(hash: Hash): Promise<Transaction> {
    return this.callApiMethod(MethodName.GetTransaction, [hash]);
  }

  //Get node status
  public syncStatus(): Promise<SyncStatus> {
    return this.callApiMethod(MethodName.SyncStatus);
  }

  // need test
  //Add peers
  public addPeers(peers: Array<SocketAddress>): Promise<boolean> {
    return this.callApiMethod(MethodName.AddPeers, [peers]);
  }

  //Clear peers
  public clearPeers(): Promise<true> {
    return this.callApiMethod(MethodName.ClearPeers);
  }

  //Create VRF
  public createVRF(data: Uint8Array): Promise<Uint8Array> {
    return this.callApiMethod(MethodName.CreateVRF, [data]);
  }

  //Data request info
  public dataRequestReport(hash: Hash): Promise<DataRequestInfo> {
    return this.callApiMethod(MethodName.DataRequestReport, [hash]);
  }

  //Get balance
  public getBalance(publicKeyHash: Hash, simple = false): Promise<NodeBalance> {
    return this.callApiMethod(MethodName.GetBalance, [publicKeyHash, simple]);
  }

  //Get consensus constants used by the node
  public getConsensusConstants(): Promise<ConsensusConstants> {
    return this.callApiMethod(MethodName.GetConsensusConstants);
  }

  //Get all the pending transactions
  public getMempool(): Promise<GetMempoolResult> {
    return this.callApiMethod(MethodName.GetMempool);
  }

  //Get public key hash
  public getPkh(): Promise<string> {
    return this.callApiMethod(MethodName.GetPkh);
  }

  //Get public key
  public getPublicKey(): Promise<Uint8Array> {
    return this.callApiMethod(MethodName.GetPublicKey).then((pk) =>
      Uint8Array.from(pk),
    );
  }

  //Get Reputation of one pkh
  public getReputation(pkh: Hash): Promise<ReputationStats> {
    return this.callApiMethod(MethodName.GetReputation, [pkh]);
  }

  public getReputationAll(): Promise<GetReputationAllResult> {
    return this.callApiMethod(MethodName.GetReputationAll);
  }

  //Get the blocks that pertain to the superblock index
  public getSuperblock(param: GetSuperblockParam): Promise<SuperBlockNotify> {
    return this.callApiMethod(MethodName.GetSuperblock, [param]);
  }

  //Get supply info
  public getSupplyInfo(): Promise<SupplyInfo> {
    return this.callApiMethod(MethodName.GetSupplyInfo);
  }

  //Get utxos
  public getUtxoInfo(): Promise<UtxoInfo> {
    return this.callApiMethod(MethodName.GetUtxoInfo);
  }

  //Initialize peers
  public initializePeers(): Promise<true> {
    return this.callApiMethod(MethodName.InitializePeers);
  }

  //Make the node process, validate and potentially broadcast a new inventory entry.
  //
  //Input: the JSON serialization of a well-formed inventory entry
  //
  //Returns a boolean indicating success.
  /* Test string:
{"jsonrpc": "2.0","method": "inventory","params": {"block": {"block_header":{"version":1,"beacon":{"checkpoint":2,"hash_prev_block": {"SHA256": [4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4]}},"hash_merkle_root":{"SHA256":[3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3]}},"proof":{"block_sig": null}"txns":[null]}},"id": 1}
*/
  public inventory(inventoryItem: InventoryItem): Promise<boolean> {
    return this.callApiMethod(MethodName.Inventory, [inventoryItem]);
  }

  //Get list of known peers
  public knownPeers(): Promise<Array<AddrType>> {
    return this.callApiMethod(MethodName.KnownPeers);
  }

  //Export private key associated with the node identity
  public masterKeyExport(): Promise<string> {
    return this.callApiMethod(MethodName.MasterKeyExport);
  }

  //Get the node stats
  public nodeStats(): Promise<NodeStats> {
    return this.callApiMethod(MethodName.NodeStats);
  }

  //Get list of consolidated peers
  public peers(): Promise<Array<AddrType>> {
    return this.callApiMethod(MethodName.Peers);
  }

  // Rewind
  public rewind(epoch: Epoch): Promise<boolean> {
    return this.callApiMethod(MethodName.Rewind, [epoch]);
  }

  //Build data request transaction
  public sendRequest(request: BuildDrt): Promise<Hash> {
    return this.callApiMethod(MethodName.SendRequest, [request]);
  }

  //Build value transfer transaction
  public sendValue(value: buildVTT): Promise<Hash> {
    return this.callApiMethod(MethodName.SendValue, [value]);
  }

  //Sign Data
  public sign(data: Uint8Array): Promise<KeyedSignature> {
    return this.callApiMethod(MethodName.Sign, [data]);
  }

  //Get the blocks that pertain to the superblock index
  public signalingInfo(): Promise<SignalingInfo> {
    return this.callApiMethod(MethodName.SignalingInfo);
  }

  //Try a data request locally
  public tryRequest(dataRequest: DataRequestOutput): Promise<string> {
    return this.callApiMethod(MethodName.GetPkh, [dataRequest]);
  }
}
