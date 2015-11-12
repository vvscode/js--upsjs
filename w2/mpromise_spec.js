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

test('promise change state only once', function(assert) {
  expect(6);
  var resolver, rejecter;
  var p1 = new MPromise(function(resolve, reject) {
    resolver = resolve;
    rejecter = reject;
  });
  equal(p1.getState(), 'pending', '"pending" is default status');
  resolver();
  equal(p1.getState(), 'fulfilled', '"fulfilled" is status on resolve');
  rejecter();
  equal(p1.getState(), 'fulfilled', '"fulfilled" do not changed to "rejected" on reject');


  var p2 = new MPromise(function(resolve, reject) {
    resolver = resolve;
    rejecter = reject;
  });
  equal(p2.getState(), 'pending', '"pending" is default status');
  rejecter();
  equal(p2.getState(), 'rejected', '"rejected" is status on reject');
  resolver();
  equal(p2.getState(), 'rejected', '"rejected" do not changed to "fulfilled" on resolve');
});

test('promise call then callback on resolve/reject', function() {
  var resolver, rejecter;
  var spy1 = this.spy();
  new MPromise(function(resolve, reject){
    resolver = resolve;
  }).then(spy1);
  resolver();
  ok(spy1.calledOnce, '.then call onFullfilled callback after resolve');

  var spy2 = this.spy();
  new MPromise(function(resolve, reject){
    rejecter = reject;
  }).then(spy1, spy2);
  rejecter();
  ok(spy1.calledOnce, '.then do not call onFullfilled callback after reject');
  ok(spy2.calledOnce, '.then call onRejected callback after reject');
});


test('promise call then callbacks if promise alredy change state', function() {
  var spy1 = this.spy();
  new MPromise(function(resolve, reject){
    resolve();
  }).then(spy1);
  ok(spy1.calledOnce, '.then call onFullfilled callback after resolve');

  var spy2 = this.spy();
  new MPromise(function(resolve, reject){
    reject();
  }).then(spy1, spy2);
  ok(spy1.calledOnce, '.then do not call onFullfilled callback after reject');
  ok(spy2.calledOnce, '.then call onRejected callback after reject');
});

test('promise pass resolve data to onFullfilled callback', function() {
  var data = {};
  new MPromise(function(resolve) {
    resolve(data);
  }).then(function(resp) {
    equal(resp, data, 'promise should pass resolve data to then');
  });
});

test('promise pass reject data to onRejected callback', function() {
  var data = {};
  new MPromise(function(resolve, reject) {
    reject(data);
  }).then(null, function(resp) {
    equal(resp, data, 'promise should pass reject data to then');
  });
});

test('promise .then return new promise', function() {
  var p = new MPromise(function(resolve){
    resolve(3);
  }).then(function() {
    return 5;
  });

  equal(typeof p.then, 'function', '.then result has .then method');
  equal(typeof p.catch, 'function', '.then result has .catch method');

  p.then(function(data) {
    equal(data, 5, '.then result get new value');
  });
});

test('promise call catch callback on reject', function() {
  var data = {};
  new MPromise(function(resolve, reject){
    reject(data);
  }).catch(function(err) {
    equal(err, data, 'promise pass reject data to .catch')
  });
});

test('promise do not bubble errors from callbacks', function() {
  new MPromise(function() {
    throw 'Some error';
  });
  ok(true, 'No errors found');

  new MPromise(function(resolve){ resolve(3); }).then(function() {
    throw 'Some another error';
  });
  ok(true, 'No errors found');

  new MPromise(function(resolve, reject){ reject(3); }).then(function() {
    throw 'Some another error';
  });
  ok(true, 'No errors found');
});

test('promise then pass returned value to next promise', function() {
  expect(2);
  new MPromise(function(resolve) {
    resolve(2);
  }).then(function() {
    return 3;
  }).then(function(data){
    equal(data, 3, 'Then get presious promise result');
    return 5;
  }).then(function(data) {
    equal(data, 5, 'Then get presious promise result');
  });
});

test('on fail at then promise run catch', function() {
  expect(2);

  new MPromise(function(resolve) {
    resolve(2);
  }).then(function() {
    throw 'Some error'
  }).catch(function(data) {
    equal(true, true, 'Catch was called');
    equal(data, 'Some error', 'It pass error to catch');
  });
});

test('pass error throw promises', function() {
  new MPromise(function(resolve) {
    resolve(2);
  }).then(function() {
    return 2;
  }).then(function() {
    return 3;
  }).then(function(data){
    equal(data, 3, 'It get previous .then value');
    throw 'Some error';
  }).then(function(){
    return 4;
  }).catch(function(data) {
    equal(true, true, 'Catch was called');
    equal(data, 'Some error', 'It pass error to catch');
  });
});