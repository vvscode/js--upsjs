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

test('promise has default state (pending) and change it on resolve(fulfilled)/reject(rejected)', function(assert) {
  expect(4);
  var done1 = assert.async();
  var done2 = assert.async();
  var p1 = new MPromise(function(resolve) {
    setTimeout(resolve, 0);
  });
  equal(p1.getState(), 'pending', '"pending" is default status');
  setTimeout(function() {
    assert.equal(p1.getState(), 'fulfilled', 'set "fulfilled" state on resolve');
    done1();
  }, 0);
  var p2 = new MPromise(function(resolve, reject) {
    setTimeout(reject, 0);
  });
  equal(p2.getState(), 'pending', '"pending" is default status');
  setTimeout(function() {
    assert.equal(p2.getState(), 'rejected', 'set "rejected" state on reject');
    done2();
  }, 0);
});