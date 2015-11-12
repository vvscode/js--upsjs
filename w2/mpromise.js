var MPromise = function(callback) {
  var status = 'pending';
  var resolve = function() {
    status = 'fulfilled';
  };

  var reject = function() {
    status = 'rejected';
  };

  if(typeof callback === 'function') {
    callback(resolve, reject);
  }

  return {
    then: function() {},
    catch: function() {},
    getState: function() {
      return status;
    }
  }
};