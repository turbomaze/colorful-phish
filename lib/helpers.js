const { Hash } = require('crypto');
const config = require('./config');

module.exports = {
  sha512(string) {
    const hash = Hash('sha512');
    hash.update(string);
    return hash.digest();
  },

  getSafeColor(red, green, blue) {
    const safeWidth = config.highestChannelValue - config.lowestChannelValue;
    const multiplier = safeWidth / 256;
    const adjustedRed = Math.floor(multiplier * red + config.lowestChannelValue);
    const adjustedGreen = Math.floor(multiplier * green + config.lowestChannelValue);
    const adjustedBlue = Math.floor(multiplier * blue + config.lowestChannelValue);
    const redHex = adjustedRed.toString(16);
    const greenHex = adjustedGreen.toString(16);
    const blueHex = adjustedBlue.toString(16);
    return `#${redHex}${greenHex}${blueHex}`;
  },
};
