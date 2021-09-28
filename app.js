const Crawler = require("./src/crawler");
const { URL } = require("url");
const { orderBy } = require("lodash/collection");

const crawler = new Crawler();
const args = process.argv.slice(2);

const report = (crawler) => {
  const blockStats = {};
  const versionStats = {};

  const ipNodes = orderBy(Object.keys(crawler.nodes));

  for (const ipNode of ipNodes) {
    const item = crawler.nodes[ipNode];
    if (item.height === undefined || item.id === undefined) {
      continue;
    }

    if (blockStats[item.height]) {
      blockStats[item.height].count += 1;
      blockStats[item.height].ids[item.id].hashCount += 1;
      blockStats[item.height].ids[item.id].ips.push(ipNode);
    } else {
      blockStats[item.height] = {};
      blockStats[item.height].count = 1;
      blockStats[item.height].height = item.height;
      // todo block ids
      blockStats[item.height].ids = {};
      blockStats[item.height].ids[item.id] = {};
      blockStats[item.height].ids[item.id].hashCount = 1;
      blockStats[item.height].ids[item.id].ips = [ipNode];
    }

    if (versionStats[item.version]) {
      versionStats[item.version].count += 1;
      versionStats[item.version].ips.push(ipNode);
    } else {
      versionStats[item.version] = {
        count: 1,
        version: item.version,
        ips: [ipNode],
      };
    }
  }

  const nodes = Object.values(crawler.nodes);

  const allDelays = nodes
    .filter((item) => item.latency)
    .map((item) => item.latency);
  const averageDelay = (
    allDelays.reduce((a, b) => a + b, 0) / allDelays.length
  ).toFixed(2);
  const maxDelay = Math.max(...allDelays);
  const minDelay = Math.min(...allDelays);

  console.log("===========================================");
  console.log(`All nodes: ${Object.keys(crawler.nodes).length}`);
  console.log(`Nodes online: ${crawler.heights.length}`);
  console.log(
    `Nodes offline: ${
      Object.keys(crawler.nodes).length - crawler.heights.length
    }`
  );

  // height/block stats
  console.log("");
  console.log("Height and block stats:");
  for (const stat of orderBy(Object.values(blockStats), ["height"], ["desc"])) {
    console.log(`  ${stat.height} with ${stat.count} nodes. Block hashes:`);
    for (const hash in stat.ids) {
      console.log(
        `    - ${hash} (${stat.ids[hash].hashCount} nodes - ${JSON.stringify(
          stat.ids[hash].ips
        )})`
      );
    }
  }

  // version stats
  console.log("");
  console.log("Version stats:");
  for (const stat of orderBy(
    Object.values(versionStats),
    ["version"],
    ["desc"]
  )) {
    console.log(
      `  - ${stat.version} on ${stat.count} nodes - ${JSON.stringify(stat.ips)}`
    );
  }

  // delay stats
  console.log("");
  console.log("Delay");
  console.log(`  Avg: ${averageDelay}ms`);
  console.log(`  Min: ${minDelay}ms`);
  console.log(`  Max: ${maxDelay}ms`);

  console.log(`${ipNodes.length} IPs:`);
  console.log("  " + JSON.stringify(ipNodes));

  console.log("------------------------------------------");
  console.log(`Finished scanning in ${new Date() - crawler.startTime}ms`);

  process.exit(0);
};

const node = { ip: undefined, port: undefined };
if (args.length === 1) {
  const url = new URL(args[0]);
  node.ip = url.hostname;
  node.port = url.port;
}

crawler
  .run(node)
  .then(report)
  .catch((err) => console.error(err));
