colorful-phish: prevent your users from falling for phishing emails
==

![colorful-phish](https://raw.githubusercontent.com/turbomaze/colorful-phish/master/logo.png)

Colorful-phish gives each of your users a unique color that adversaries can't guess. Just include this color whenever you email your users, and now they will never get phished 🎣.

![example-email](https://raw.githubusercontent.com/turbomaze/colorful-phish/master/demo.png)

## Usage

```js
const colorfulPhish = require('colorful-phish');
const user = { id: 10, uuid: '...' };

// basic usage
const color = colorfulPhish(user.uuid); // or user.id, but ints are guessable!

// safer usage
const secret = ...;
const color = colorfulPhish(user.uuid, secret);

// get multiple colors
const color1 = colorfulPhish(user.uuid, secret, 0);
const color2 = colorfulPhish(user.uuid, secret, 1);
```

## API

### colorfulPhish(key: number | string)

Returns a hex color string like `#8ab511`. Note: while integer keys are accepted, do not use integer keys unless you're also providing a secret. Integer keys are easy for adversaries to guess.

### colorfulPhish(key: number | string, secret: string)

Returns a hex color string like `#8ab511`. If you're providing a (strong) secret, then you don't need to worry about the guessability of the key.

### colorfulPhish(key: number | string, secret: string, depth: number)

Returns a hex color string like `#8ab511`. The depth parameter lets you generate many colors for a single user. If you'd like to provide your users with extra peace of mind, you can show them multiple colors per email, or show them different colors for different communication mediums, etc.

## Tests

To run tests, you can use `npm run test`.

## License

MIT License: https://igliu.mit-license.org
