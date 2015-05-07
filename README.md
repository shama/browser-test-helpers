# browser-test-helpers

A small set of generic test helpers for browser interaction tests.

[![build status](https://secure.travis-ci.org/shama/browser-test-helpers.svg)](https://travis-ci.org/shama/browser-test-helpers)
[![NPM version](https://badge.fury.io/js/browser-test-helpers.svg)](https://badge.fury.io/js/browser-test-helpers)
[![experimental](http://hughsk.github.io/stability-badges/dist/experimental.svg)](http://github.com/hughsk/stability-badges)

[![Sauce Test Status](https://saucelabs.com/browser-matrix/shama.svg)](https://saucelabs.com/u/shama)

## api

### `var help = new BrowserTestHelpers()`

#### `help.click(element[, options])`
Simulates a click event on the given `element`.

```js
var button = document.querySelector('button')
help.click(button, { bubbles: false })
```

#### `help.fillIn(element, value)`
Fills in an field with the given `value`.

```js
var input = document.querySelector('input')
help.fillIn(input, 'Testing')
```

#### `help.triggerEvent(element, type[, options])`
Triggers the `type` of event on the given `element`.

```js
var input = document.querySelector('input')
help.triggerEvent(input, 'focus')
```

#### `help.keyEvent(element, type[, options])`
Triggers a `KeyboardEvent` on the given `element`.

```js
var el = document.getElementById('bear')
help.keyEvent(el, 'keypress', { keyCode: 13, shiftKey: true })
```

# license
(c) 2015 Kyle Robinson Young. MIT License
