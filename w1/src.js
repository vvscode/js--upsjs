var sum = function sum(a) {
  a = a || 0;
  var ret = function(b) {
    b = b || 0;
    return sum(+a + +b);
  };
  ret.valueOf = function() {
    return a || 0;
  };
  return ret;
};