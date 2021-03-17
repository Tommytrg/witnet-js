import { Server } from "jayson";

// create a server
export const server = new Server({
  getBlock: function (args: any, callback: any) {
    callback(null, args);
  },
});
