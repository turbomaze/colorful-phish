const { Hash } = require('crypto');
const config = require('./config');

function getChannelFromByte(channelValue) {
  const { highestChannelValue, lowestChannelValue } = config;
  const safeWidth = highestChannelValue - lowestChannelValue;
  const multiplier = safeWidth / 256;
  const adjustedValue = Math.floor(multiplier * channelValue + lowestChannelValue);
  const hexValue = adjustedValue.toString(16);
  const paddedValue = hexValue.length === 1 ? '0' + hexValue : hexValue;
  return paddedValue;
}

module.exports = {
  sha512(string) {
    const hash = Hash('sha512');
    hash.update(string);
    return hash.digest();
  },

  getSafeColor(red, green, blue) {
    const safeRed = getChannelFromByte(red);
    const safeGreen = getChannelFromByte(green);
    const safeBlue = getChannelFromByte(blue);
    return `#${safeRed}${safeGreen}${safeBlue}`;
  },
};
