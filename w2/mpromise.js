var MPromise = function(callback) {
  var onRejected = function() {

  };

  var onFulfilled = function() {

  };

  if(typeof callback === 'function') {
    callback(onFulfilled, onRejected);
  }

  return {
    then: function() {},
    catch: function() {}
  }
};