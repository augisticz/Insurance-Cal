const path = require('path');

module.exports = {
  process (src, filename) {
    return `module.exports = {testUri: "../../../app/assets/${path.basename(filename)}"};`;
  }
};