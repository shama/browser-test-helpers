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
    return el.dispatchEvent(ev)
  } else if (typeof document.createEvent !== 'undefined') {
    ev = document.createEvent('Event')
    ev.initMouseEvent('click', opts.bubbles, opts.cancelable, opts.view)
    return el.dispatchEvent(ev)
  } else if (typeof document.createEventObject !== 'undefined') {
    ev = document.createEventObject()
    if (opts.bubbles === false) ev.cancelBubble = true
    el.fireEvent('onclick', ev)
  } else {
    throw new Error('Unable to simulate click, browser not supported.')
  }
}

BrowserTestHelpers.prototype.fillIn = function (el, val) {
  el.value = el.defaultValue = val
  return el
}

BrowserTestHelpers.prototype.triggerEvent = function (el, type, opts) {
  var ev
  opts = xtend({
    bubbles: true,
    cancelable: true
  }, opts)
  if (typeof window.CustomEvent !== 'undefined') {
    ev = new window.CustomEvent(type, opts || {})
  } else if (typeof document.createEvent !== 'undefined') {
    ev = document.createEvent('Event')
    ev.initEvent(type, opts.bubbles, opts.cancelable)
  } else {
    throw new Error('Unable to trigger event, browser not supported.')
  }
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
