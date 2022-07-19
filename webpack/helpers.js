const path = require('path');

const getPath = (pathString) => path.resolve(__dirname, `../${pathString}`);

const OUTPUT_DIR = getPath('dist');

module.exports = {
  getPath,
  OUTPUT_DIR,
};
