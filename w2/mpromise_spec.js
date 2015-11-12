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