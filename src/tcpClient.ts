import {
  Client,
  JSONRPCErrorLike,
  JSONRPCResultLike,
  TcpClient as JaysonTcpClient,
} from "jayson";
import { Response } from "./types";

export class TcpClient {
  private client: JaysonTcpClient;

  constructor(host: string, port: number) {
    this.client = Client.tcp({
      host: host,
      port,
    });
  }

  async request(methodName: string, args?: Array<any>): Promise<Response> {
    return new Promise((resolve, reject) => {
      return this.client.request(
        methodName,
        args,
        (err?: JSONRPCErrorLike | null, result?: JSONRPCResultLike) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        },
      );
    });
  }
}
