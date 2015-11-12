module( "MPromise", {
  beforeEach: function() {

  }
});

test('“promise” is an object or function with a .then/.catch method', function() {
  expect(2);

  var p = new MPromise();
  equal(typeof p.then, 'function', 'promise has .then methos');
  equal(typeof p.catch, 'function', 'promise has .then methos');
});

test('"promise" callback get two params ( functions )', function() {
  expect(2);

  new MPromise(function(onFulfilled, onRejected) {
    equal(typeof onFulfilled, 'function', 'promise pass onFulfilled callback');
    equal(typeof onRejected, 'function', 'promise pass onRejected callback');
  });
});