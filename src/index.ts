import { WitnetNode } from "./node";

export { WitnetNode };

async function main() {
  const ips = [
    // "20.120.248.2",
    // "20.126.70.77",
    // "52.166.178.145",
    // "20.103.108.57",
    "3.133.4.38",
    "3.21.74.162",
  ];

  for (const ip of ips) {
    console.log("trying IP: ", ip);
    try {
      const node = new WitnetNode(ip, 21338);
      console.log(await node.getPkh());
    } catch (e) {
      console.log(`error in ${ip}`, e);
    }
  }
}

main();
