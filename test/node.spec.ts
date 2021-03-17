import { expect, test } from "vitest";

import { WitnetNode } from "../src/node";
import { server } from "./server";
// Those test assume that you are running a Witnet node with the JSON-RPC port 21338

test("getBlockchain", async () => {
  const api = new WitnetNode("localhost", 21338);

  const result = await api.getBlockchain();

  expect(Array.isArray(result)).toBeTruthy();
  expect(result[0][0]).toBe(0);
  expect(result[0][1]).toBeTruthy();
});

// test.skip("getBlock", async () => {
//   server.http().listen(21338);

//   const api = new WitnetNode("localhost", 21338);

//   const result = await api.getBlockchain();
// });

test.todo("getTransaction");

test("syncStatus", async () => {
  const api = new WitnetNode("localhost", 21338);

  const result = await api.syncStatus();

  expect(result.chain_beacon.checkpoint).toBeTruthy();
  expect(result.chain_beacon.hashPrevBlock).toBeTruthy();
  expect(result.current_epoch).toBeTruthy();
  expect(result.current_epoch).toBeTruthy();
  expect(result.node_state).toBeTruthy();
});

test.todo("addPeers");

test("clearPeers", async () => {
  const api = new WitnetNode("localhost", 21338);

  const result = await api.clearPeers();

  expect(result).toBeTruthy();
});

test.todo("createVRF");

test.todo("dataRequestReport");

test.todo("getBalance");

test("getConsensusConstants", async () => {
  const api = new WitnetNode("localhost", 21338);

  const result = await api.getConsensusConstants();

  expect(result.activity_period).toBeTruthy();
  expect(result.bootstrap_hash).toBeTruthy();
  expect(result.bootstrapping_committee).toBeTruthy();
  expect(result.checkpoint_zero_timestamp).toBeTruthy();
  expect(result.checkpoints_period).toBeTruthy();
  expect(result.collateral_age).toBeTruthy();
  expect(result.collateral_minimum).toBeTruthy();
  expect(result.epochs_with_minimum_difficulty).toBeTruthy();
  expect(result.extra_rounds).toBeTruthy();
  expect(result.genesis_hash).toBeTruthy();
  expect(result.halving_period).toBeTruthy();
  expect(result.initial_block_reward).toBeTruthy();
  expect(result.max_dr_weight).toBeTruthy();
  expect(result.max_vt_weight).toBeTruthy();
  expect(result.minimum_difficulty).toBeTruthy();
  expect(result.mining_backup_factor).toBeTruthy();
  expect(result.mining_replication_factor).toBeTruthy();
  expect(result.reputation_expire_alpha_diff).toBeTruthy();
  expect(result.reputation_issuance).toBeTruthy();
  expect(result.reputation_issuance_stop).toBeTruthy();
  expect(result.reputation_penalization_factor).toBeTruthy();
  expect(result.superblock_committee_decreasing_period).toBeTruthy();
  expect(result.superblock_committee_decreasing_step).toBeTruthy();
  expect(result.superblock_period).toBeTruthy();
  expect(result.superblock_signing_committee_size).toBeTruthy();
});

test("getMempool", async () => {
  const api = new WitnetNode("localhost", 21338);

  const result = await api.getMempool();

  expect(Array.isArray(result.data_request)).toBeTruthy();
  expect(Array.isArray(result.value_transfer)).toBeTruthy();
});

test("getPkh", async () => {
  const api = new WitnetNode("localhost", 21338);

  const result = await api.getPkh();

  expect(result.includes("twit")).toBeTruthy();
  expect(result.length).toBe(43);
});

test("getPublicKey", async () => {
  const api = new WitnetNode("localhost", 21338);

  const result = await api.getPublicKey();

  expect(result).toBeTruthy();
});

test.todo("getReputation");

// wait to be synced
test.todo("getReputationAll");

test.todo("getSuperblock");

test("getSupplyInfo", async () => {
  const api = new WitnetNode("localhost", 21338);

  const result = await api.getSupplyInfo();

  expect(result.epoch).toBeTruthy();
  expect(result.current_time).toBeTruthy();
  expect(result.blocks_minted).toBeTruthy();
  expect(result.blocks_minted_reward).toBeTruthy();
  expect(result.blocks_missing).toBeTruthy();
  expect(result.blocks_missing_reward).toBeTruthy();
  expect(typeof result.in_flight_requests).toBe("number");
  expect(typeof result.locked_wits_by_requests).toBeTruthy();
  expect(typeof result.current_unlocked_supply).toBe("number");
  expect(typeof result.current_locked_supply).toBe("number");
  expect(result.maximum_supply).toBeTruthy();
});

test.todo("getUtxoInfo");

// breaks other tests: peers
test.skip("initializePeers", async () => {
  const api = new WitnetNode("localhost", 21338);

  const result = await api.initializePeers();

  expect(result).toBeTruthy();
});

test.todo("inventory");

test("knownPeers", async () => {
  const api = new WitnetNode("localhost", 21338);

  const result = await api.knownPeers();

  expect(Array.isArray(result)).toBeTruthy();
});

test("masterKeyExport", async () => {
  const api = new WitnetNode("localhost", 21338);

  const result = await api.masterKeyExport();

  expect(result.includes("xprv")).toBeTruthy();
  expect(result.length).toBe(117);
});

test("nodeStats", async () => {
  const api = new WitnetNode("localhost", 21338);

  const result = await api.nodeStats();

  expect(typeof result.block_mined_count).toBe("number");
  expect(typeof result.block_proposed_count).toBe("number");
  expect(typeof result.commits_count).toBe("number");
  expect(typeof result.commits_proposed_count).toBe("number");
  expect(typeof result.dr_eligibility_count).toBe("number");
  expect(result.last_block_proposed).toBeTruthy();
  expect(typeof result.slashed_count).toBe("number");
});

test("peers", async () => {
  const api = new WitnetNode("localhost", 21338);

  const result = await api.peers();

  expect(result[0].address).toBeTruthy();
  expect(result[0].type).toBeTruthy();
});

// TODOO: This test currently breaks other tests
test.skip("rewind", async () => {
  const api = new WitnetNode("localhost", 21338);

  const result = await api.rewind(0);

  expect(result).toBeTruthy();
});

test.todo("sendRequest");

test.todo("sendValue");

test.todo("sign");

test("signalingInfo", async () => {
  const api = new WitnetNode("localhost", 21338);

  const result = await api.signalingInfo();

  expect(result.active_upgrades["THIRD_HARD_FORK"]).toBe(0);
  expect(result.active_upgrades["WIP0008"]).toBe(0);
  expect(result.active_upgrades["WIP0009-0011-0012"]).toBe(0);
  expect(result.active_upgrades["WIP0014-0016"]).toBe(0);
  expect(result.active_upgrades["WIP0017-0018-0019"]).toBe(0);
  expect(result.active_upgrades["WIP0020-0021"]).toBe(0);
  expect(result.epoch).toBeTruthy();
});

test.todo("tryRequest");
