const assert = require('assert');
const colorfulPhish = require('../lib/index');
const config = require('../lib/config');
const { describe, it } = require('./helpers');

function isValidChannelValue(channelValue) {
  const intValue = parseInt(channelValue, 16);
  const isBigEnough = intValue >= config.lowestChannelValue;
  const isSmallEnough = intValue <= config.highestChannelValue;
  return isBigEnough && isSmallEnough;
}

function isValidHexColor(colorString) {
  if (!colorString.startsWith('#')) return false;
  if (colorString.length !== 7) return false;

  const redHex = colorString.substring(1, 3);
  const greenHex = colorString.substring(3, 5);
  const blueHex = colorString.substring(5, 7);
  const redIsValid = isValidChannelValue(redHex);
  const greenIsValid = isValidChannelValue(greenHex);
  const blueIsValid = isValidChannelValue(blueHex);
  return redIsValid && greenIsValid && blueIsValid;
}

describe('Colorful Phish', () => {
  describe('colorfulPhish(key)', () => {
    it('should return a valid color when given a string key', () => {
      const color = colorfulPhish('key');
      assert(isValidHexColor(color));
    });

    it('should return a valid color when given an integer key', () => {
      const color = colorfulPhish(1618);
      assert(isValidHexColor(color));
    });

    it('should return valid colors when given fuzzed keys', () => {
      for (let i = 0; i < 100; i++) {
        const color = colorfulPhish(Math.random().toString(16));
        assert(isValidHexColor(color));
      }
    });
  });

  describe('colorfulPhish(key, secret)', () => {
    it('should return a valid color when given a key and secret', () => {
      const color = colorfulPhish('key', 'secret');
      assert(isValidHexColor(color));
    });

    it('should return a different color when adding a secret', () => {
      const color1 = colorfulPhish('key');
      const color2 = colorfulPhish('key', 'secret');
      assert(isValidHexColor(color1));
      assert(isValidHexColor(color2));
      assert(color1 !== color2);
    });

    it('should return valid colors when given fuzzed keys and secrets', () => {
      for (let i = 0; i < 20; i++) {
        const secret = Math.random().toString(16);
        for (let j = 0; j < 20; j++) {
          const key = Math.random().toString(16);
          const color = colorfulPhish(key, secret);
          assert(isValidHexColor(color));
        }
      }
    });
  });

  describe('colorfulPhish(key, secret, depth)', () => {
    it('should return a valid color when given a key, secret, and depth', () => {
      const color = colorfulPhish('key', 'secret', 0);
      assert(isValidHexColor(color));
    });

    it('should return a different color when adding a depth', () => {
      const color1 = colorfulPhish('key');
      const color2 = colorfulPhish('key', 'secret');
      const color3 = colorfulPhish('key', 'secret', 0);
      assert(isValidHexColor(color1));
      assert(isValidHexColor(color2));
      assert(isValidHexColor(color3));
      assert(color1 !== color2 && color1 !== color3 && color2 !== color3);
    });

    it('should return a different color when changing the depth', () => {
      const color1 = colorfulPhish('key', 'secret', 0);
      const color2 = colorfulPhish('key', 'secret', 1);
      assert(isValidHexColor(color1));
      assert(isValidHexColor(color2));
      assert(color1 !== color2);
    });

    it('should return valid colors when given fuzzed keys, secrets, and depths', () => {
      for (let i = 0; i < 10; i++) {
        const depth = Math.floor(1e6 * Math.random());
        for (let j = 0; j < 10; j++) {
          const secret = Math.random().toString(16);
          for (let k = 0; k < 10; k++) {
            const key = Math.random().toString(16);
            const color = colorfulPhish(key, secret, depth);
            assert(isValidHexColor(color));
          }
        }
      }
    });
  });
});
