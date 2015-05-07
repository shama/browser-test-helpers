module.exports = BrowserTestHelpers

var window = require('global/window')
var document = require('global/document')
var xtend = require('xtend')

function BrowserTestHelpers () {
  if (!(this instanceof BrowserTestHelpers)) return new BrowserTestHelpers()
}

BrowserTestHelpers.prototype.click = function (el, opts) {
  var ev
  opts = xtend({
    bubbles: true,
    cancelable: true,
    view: window
  }, opts)
  if (typeof window.MouseEvent !== 'undefined') {
    ev = new window.MouseEvent('click', opts)
  } else if (typeof document.createEvent !== 'undefined') {
    ev = document.createEvent('Event')
    ev.initMouseEvent('click', opts.bubbles, opts.cancelable, opts.view)
  } else {
    throw new Error('Unable to simulate click, browser not supported.')
  }
  return el.dispatchEvent(ev)
}

BrowserTestHelpers.prototype.fillIn = function (el, val) {
  el.value = el.defaultValue = val
  return el
}

BrowserTestHelpers.prototype.triggerEvent = function (el, type, opts) {
  var ev = new window.CustomEvent(type, opts || {})
  return el.dispatchEvent(ev)
}

BrowserTestHelpers.prototype.keyEvent = function (el, type, opts) {
  opts = xtend({
    key: '',
    char: '',
    code: '',
    location: 0,
    ctrlKey: false,
    shiftKey: false,
    altKey: false,
    metaKey: false,
    repeat: false,
    isComposing: false,
    charCode: 0,
    keyCode: 0,
    view: window
  }, opts)
  if (!opts.which) opts.which = opts.keyCode
  // Doing this the old fashioned way as its more reliable for now
  var ev = document.createEvent('KeyboardEvents')
  ev.initKeyboardEvent(type, opts.bubbles, opts.cancelable, opts.view)
  var keys = Object.keys(opts)
  for (var i = 0; i < keys.length; i++) {
    var k = keys[i]
    if (opts.hasOwnProperty(k)) {
      Object.defineProperty(ev, k, {
        get: function () { return opts[k] }
      })
    }
  }
  return el.dispatchEvent(ev)
}
