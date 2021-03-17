import { Client } from "rpc-websockets";

type WalletOptions = {
  url: string;
  autoconnect: boolean;
  reconnect: boolean;
  reconnect_interval: number;
  max_reconnects: number;
};

const defaultOptions: WalletOptions = {
  url: "ws://localhost:11212",
  autoconnect: true,
  reconnect: true,
  reconnect_interval: 1000,
  max_reconnects: 0,
};

export class WebsocketsClient {
  listeners: any;
  options: any;
  ws: any;

  constructor(options?: WalletOptions) {
    this.listeners = {};
    this.options = { ...defaultOptions, ...options };
    this.ws = new Client(this.options.url, { ...this.options });
  }

  request(method: any, params: any) {
    return this.ws.call(method, params);
  }

  on(event: any, handler: any) {
    // Prevents from subscribing to the same event more than once
    if (event in this.listeners) {
      return this.listeners[event];
    } else {
      const listener = this.ws.on([event], (...args: any) => {
        handler(...args);
      });
      this.listeners[event] = listener;

      return listener;
    }
  }
}
