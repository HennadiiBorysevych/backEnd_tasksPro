const NodeCache = require("node-cache");

const cache = new NodeCache({
  stdTTL: 3600,
  checkperiod: 120,
  deleteOnExpire: true,
});

module.exports = { cache };
