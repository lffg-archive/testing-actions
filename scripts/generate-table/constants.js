const { join } = require('path');

const root = join.bind(undefined, __dirname, '..', '..');
const meta = join.bind(undefined, __dirname, 'meta');

module.exports = {
  root,
  meta
};
