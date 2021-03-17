// import { WebsocketsClient } from "./websocketsClient"
// export class WalletApi {
//   client

//   constructor() {
//     this.client = new WebsocketsClient()
//   }

//   // TODO(#594): Handle errors in a proper way
//   _handleResponse(response: any) {
//     return response && response.error ? response : { result: response || true }
//   }

//   _handleError(error: any) {
//     return { error }
//   }

//   _callApiMethod(methodName: WalletMethodName) {
//     return (params, normalizer = (x) => x) =>
//       this.client
//         .request(methodName, params)
//         .then(this._handleResponse)
//         .then(normalizer)
//         .catch(this._handleError)
//   }

//   closeSession(params: any) {
//     return this._callApiMethod("close_session")(params)
//   }

//   shutdown(params) {
//     return this._callApiMethod("shutdown")(params)
//   }

//   // This is overriding the native `client.subscribe` because it lacks support for `params`
//   subscribeToNotifications(params, cb) {
//     return this._callApiMethod("rpc.on")([params.session_id])
//       .then((_) => {
//         this.client.on("notifications", cb)
//       })
//       .catch(this._handleError)
//   }

//   unsubscribeFromNotifications(params) {
//     return this._callApiMethod("rpc.off")([params.session_id])
//   }

//   createDataRequest(params) {
//     return this._callApiMethod("create_data_request")(params)
//   }

//   createMnemonics(params) {
//     return this._callApiMethod("create_mnemonics")(params)
//   }

//   createVTT(params) {
//     return this._callApiMethod("create_vtt")({ ...params })
//   }

//   createWallet(params) {
//     return this._callApiMethod("create_wallet")(params)
//   }

//   validateMnemonics(params) {
//     return this._callApiMethod("validate_mnemonics")(params)
//   }

//   generateAddress(params) {
//     return this._callApiMethod("generate_address")(params)
//   }

//   getAddresses(params) {
//     return this._callApiMethod("get_addresses")(params, standardizeAddresses)
//   }

//   getBalance(params) {
//     return this._callApiMethod("get_balance")(params, standardizeBalance)
//   }

//   getItem(params) {
//     return this._callApiMethod("get")(params)
//   }

//   deleteWallet(params) {
//     return this._callApiMethod("delete_wallet")(params)
//   }

//   async getTransactions(params) {
//     const totalTransactions = (
//       await this._callApiMethod("get_transactions")(params)
//     ).result.total
//     const computedPagination = computeTransactionsPagination(
//       params.offset,
//       totalTransactions
//     )
//     // call 5 times getTransactions for the current page, the two before, and the two after
//     const getTransactionsCall = Array(computedPagination.numberOfpagesToGet)
//       .fill()
//       .map((x, index) => {
//         return this._callApiMethod("get_transactions")(
//           // change offset to adjust different pages
//           {
//             ...params,
//             offset:
//               params.offset +
//               13 * (index - 2 + computedPagination.computedIndex),
//           },
//           standardizeTransactions
//         )
//       })
//     return Promise.all(getTransactionsCall)
//       .then((values) => {
//         const request = {
//           result: {
//             total: values[0].result.total,
//             transactions: values.flatMap((x) => x.result.transactions),
//           },
//         }
//         request.result.transactions.sort(
//           (t1, t2) =>
//             t2.timestamp - t1.timestamp ||
//             Number(t1.outputs[0].timelock) - Number(t2.outputs[0].timelock)
//         )
//         request.result.transactions = request.result.transactions.splice(
//           computedPagination.pageSection[0],
//           computedPagination.pageSection[1]
//         )
//         return request
//       })
//       .catch((err) => {
//         console.log("ERROR", err)
//       })
//   }

//   getWalletInfos(params) {
//     return this._callApiMethod("get_wallet_infos")(
//       params,
//       standardizeWalletInfos
//     )
//   }

//   exportMasterKey(params) {
//     return this._callApiMethod("export_master_key")(params)
//   }

//   importSeed(params) {
//     return this._callApiMethod("import_seed")(params)
//   }

//   refreshSession(params) {
//     return this._callApiMethod("refresh_session")(params)
//   }

//   lockWallet(params) {
//     return this._callApiMethod("lock_wallet")(params)
//   }

//   runRadRequest(params) {
//     return this._callApiMethod("run_rad_request")(params)
//   }

//   saveItem(params) {
//     return this._callApiMethod("set")(params)
//   }

//   sendTransaction(params) {
//     return this._callApiMethod("send_transaction")(params)
//   }

//   unlockWallet(params) {
//     return this._callApiMethod("unlock_wallet")(params)
//   }

//   resync(params) {
//     return this._callApiMethod("resync_wallet")(params)
//   }

//   updateWallet(params) {
//     return this._callApiMethod("update_wallet")(params)
//   }
// }
