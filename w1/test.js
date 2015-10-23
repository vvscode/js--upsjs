module( "summator", {
  setup: function() {
    // prepare something for all following tests
  },
  teardown: function() {
    // clean up after each test
  }
});

test('sum defined', function() {
  expect(1);
  equal(typeof sum, 'function', 'summ should be defined');
});

test('sum result be equal 0 on init', function() {
  expect(1);
  equal(sum(), 0, 'should be equal 0 on start');
});

test('sum result is a function', function() {
  expect(1);
  equal(typeof sum(), 'function', 'should return function');
});

test('sum increase return on call with param', function() {
  expect(1);
  equal(sum(2), 2, 'should return function');
});

test('sum increase return on new call', function() {
  expect(1);
  equal(sum(2)(3), 5, 'should return function');
});

test('sum return function on each next call', function() {
  expect(10);
  var a;
  for(var i = 1; i<=10; i++){
    a = (a || sum)(i);
    equal(typeof a, 'function', 'should return function');
  }
});

test('sum increase result on each next call', function() {
  expect(5);
  var a;
  var s = 0;
  for(var i = 1; i<=10; i= i+2){
    a = (a || sum)(i);
    s = s + i;
    equal(a, s, 'should increase output');
  }
});

test('it save result on calling with no param', function() {
  expect(2);
  equal(+sum(5)(6)(), +sum(5)(6), 'should keep result');
  equal(+sum(5)(6)()()(), +sum(5)(6), 'should keep result');
});

test('initial tests', function() {
  expect(4);
  var s = sum();
  equal(s, 0, ' alert(s); // 0');
  equal(s(1), 1, ' alert(s(1)); // 1');
  equal(s(1)(2), 3, 'alert(s(1)(2)); //3');
  equal(s(3)(4)(5), 12, ' alert(s(3)(4)(5)); // 12');
});