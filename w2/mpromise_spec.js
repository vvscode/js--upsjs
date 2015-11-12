module( "MPromise", {
  beforeEach: function() {

  }
});

test('“promise” is an object or function with a .then/.catch/.getState method', function() {
  expect(3);

  var p = new MPromise();
  equal(typeof p.then, 'function', 'promise has .then methos');
  equal(typeof p.catch, 'function', 'promise has .catch methos');
  equal(typeof p.getState, 'function', 'promise has .getState methos');
});

test('"promise" callback get two params ( functions )', function() {
  expect(2);

  new MPromise(function(resolve, reject) {
    equal(typeof resolve, 'function', 'promise pass onFulfilled callback');
    equal(typeof reject, 'function', 'promise pass onRejected callback');
  });
});