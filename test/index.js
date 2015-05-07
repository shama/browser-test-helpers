var test = require('tape')

var TestHelpers = require('../index.js')

test('click', function (t) {
  t.plan(1)
  var help = new TestHelpers()
  setUp(function (fixture) {
    var button = document.createElement('button')
    fixture.appendChild(button)
    button.innerHTML = 'Click Me'
    function clicked (e) {
      var target = getTarget(e)
      t.equal(target.innerText, 'Click Me', 'The correct button was clicked')
      tearDown(t.end)
    }
    if (button.addEventListener) {
      button.addEventListener('click', clicked, false)
    } else if (button.attachEvent) {
      button.attachEvent('onclick', clicked)
    }
    help.click(button)
  })
})

test('fillIn', function (t) {
  t.plan(1)
  var help = new TestHelpers()
  setUp(function (fixture) {
    var input = document.createElement('input')
    fixture.appendChild(input)
    help.fillIn(input, 'Testing')
    t.equal(input.value, 'Testing', 'The correct text was filled in')
    tearDown(t.end)
  })
})

test('triggerEvent', function (t) {
  t.plan(1)
  var help = new TestHelpers()
  setUp(function (fixture) {
    var input = document.createElement('input')
    fixture.appendChild(input)
    input.value = 'Testing'
    function focused (e) {
      var target = getTarget(e)
      t.equal(target.value, 'Testing', 'The correct input was focused on')
      tearDown(t.end)
    }
    if (input.addEventListener) {
      input.addEventListener('focus', focused, false)
    } else if (input.attachEvent) {
      input.attachEvent('onfocus', focused)
    }
    help.triggerEvent(input, 'focus')
  })
})

test('keyEvent', function (t) {
  t.plan(2)
  var help = new TestHelpers()
  setUp(function (fixture) {
    var input = document.createElement('input')
    fixture.appendChild(input)
    function keypressed (e) {
      t.equal(e.keyCode, 13, 'Received the correct key on keypress')
      t.ok(e.shiftKey, 'shiftKey is true on keypress')
      tearDown(t.end)
    }
    if (input.addEventListener) {
      input.addEventListener('keypress', keypressed, false)
    } else if (input.attachEvent) {
      input.attachEvent('onkeypress', keypressed)
    }
    help.keyEvent(input, 'keypress', { shiftKey: true, keyCode: 13 })
  })
})

function setUp (cb) {
  var fixture = document.createElement('div')
  fixture.setAttribute('id', 'fixture')
  document.body.appendChild(fixture)
  cb(fixture)
}

function tearDown (cb) {
  var fixture = document.getElementById('fixture')
  document.body.removeChild(fixture)
  cb()
}

function getTarget (e) {
  return (e.target) ? e.target : e.srcElement
}
