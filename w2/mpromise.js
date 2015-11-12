var MPromise = function(callback) {
  var resolve = function() {

  };

  var reject = function() {

  };

  if(typeof callback === 'function') {
    callback(resolve, reject);
  }

  return {
    then: function() {},
    catch: function() {}
  }
};