(function(window) {
  var MPromise = function(callback) {
    var status = 'pending';

    var resolve = function() {
      if(status !== 'pending') {
        return;
      }
      status = 'fulfilled';
    };

    var reject = function() {
      if(status !== 'pending') {
        return;
      }
      status = 'rejected';
    };

    if (typeof callback === 'function') {
      callback(resolve, reject);
    }

    return {
      then: function() {
      },
      catch: function() {
      },
      getState: function() {
        return status;
      }
    }
  };

  window.MPromise = MPromise;
})(window);