const Path = require('path');

module.exports = {
  logPath: Path.join(__dirname, '../logs/poop.log'),
  heapdumpFolder: Path.join(__dirname, '../logs/'),
};
