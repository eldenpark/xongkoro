const { logger } = require('jege/server');

const log = logger('[monorepo-xongkoro]');

exports.requireNonNull = (obj, message) => {
  if (obj === undefined || obj === null) {
    log(message);
    process.exit(0);
  }
};
