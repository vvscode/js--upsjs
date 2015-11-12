(function(window) {
  var MPromise = function(callback) {
    var value;
    var error;
    var onResolvedHandlers = [];
    var onRejectedHandlers = [];
    var status = 'pending';

    var resolve = function() {
      if(status !== 'pending') {
        return;
      }
      status = 'fulfilled';
      onResolvedHandlers.forEach(function(onResolved) {
        onResolved.call(null, value);
      });
    };

    var reject = function() {
      if(status !== 'pending') {
        return;
      }
      status = 'rejected';
      onRejectedHandlers.forEach(function(onRejected) {
        onRejected.call(null, error);
      });
    };

    if (typeof callback === 'function') {
      callback(resolve, reject);
    }

    return {
      then: function(onResolved, onRejected) {
        if(typeof onResolved === 'function') {
          onResolvedHandlers.push(onResolved);
        }
        if(typeof onRejected === 'function') {
          onRejectedHandlers.push(onRejected);
        }
      },
      catch: function(onRejected) {

      },
      getState: function() {
        return status;
      }
    }
  };

  window.MPromise = MPromise;
})(window);