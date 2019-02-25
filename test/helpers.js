const greenCheck = '\x1b[32m✓\x1b[0m';
const redX = '\x1b[31m×\x1b[0m';

function describe(message, callback) {
  const isMaster = !this.isChild;
  if (isMaster) {
    this.isChild = true;
    this.successes = 0;
    this.failures = 0;
  }

  // figure out how nested we are
  const depth = this.depth || 0;
  const indentation = '  '.repeat(depth);

  // log the message
  console.log(`${indentation}${message}`);

  // adjust the depth for the recursive calls
  this.depth = depth + 1;
  callback.call(this);
  console.log();

  // readjust the depth once those calls have completed
  this.depth = depth;

  // log out the final success/failure state
  if (isMaster) {
    const total = this.successes + this.failures;
    console.log(`${this.successes}/${total} tests passed.\n`);

    if (this.failures !== 0) process.exit(1);
  }
}

function it(message, callback) {
  const indentation = '  '.repeat(this.depth);
  try {
    callback();
    console.log(`${indentation}${greenCheck} ${message}`);
    this.successes++;
  } catch (e) {
    console.log(`${indentation}${redX} ${message}`);
    this.failures++;
  }
}

module.exports = { describe, it };
