function getColorFromKey(key) {
  return 0;
}

function getColorFromKeyAndSecret(key, secret) {
  return 1;
}

function getColorFromKeySecretAndDepth(key, secret, depth) {
  return 2;
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
