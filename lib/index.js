const { sha512, getSafeColor } = require('./helpers');

function getColorFromHash(hash) {
  const byte0 = hash.readUInt8(0);
  const byte1 = hash.readUInt8(1);
  const byte2 = hash.readUInt8(2);
  return getSafeColor(byte0, byte1, byte2);
}

function getColorFromKey(key) {
  const hash = sha512(key);
  return getColorFromHash(hash);
}

function getColorFromKeyAndSecret(key, secret) {
  const hash = sha512(key + '-' + secret);
  return getColorFromHash(hash);
}

function getColorFromKeySecretAndDepth(key, secret, depth) {
  const hash = sha512(key + '-' + secret + '-' + depth.toString());
  return getColorFromHash(hash);
}

module.exports = function() {
  if (arguments.length === 3) {
    return getColorFromKeySecretAndDepth(...arguments);
  } else if (arguments.length === 2) {
    return getColorFromKeyAndSecret(...arguments);
  } else if (arguments.length === 1) {
    return getColorFromKey(...arguments);
  } else {
    throw new Error('Unexpected function arity. You can provide 1, 2, or 3 arguments.');
  }
};
