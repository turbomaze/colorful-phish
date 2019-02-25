const assert = require('assert');
const colorfulPhish = require('../lib/index');
const { describe, it } = require('./helpers');

describe('colorfulPhish()', () => {
  it('should call the right function when given 3 arguments', () => {
    const result = colorfulPhish('key', 'secret', 0);
    assert(result === 2, 'bad return code');
  });

  it('should call the right function when given 2 arguments', () => {
    const result = colorfulPhish('key', 'secret');
    assert(result === 1, 'bad return code');
  });

  it('should call the right function when given 1 argument', () => {
    const result = colorfulPhish('key');
    assert(result === 0, 'bad return code');
  });
});
