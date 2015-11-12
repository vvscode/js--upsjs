(function(window) {
  var MPromise = function(callback) {
    var value;
    var error;
    var onResolvedHandlers = [];
    var onRejectedHandlers = [];
    var status = 'pending';

    var resolve = function(data) {
      if(status !== 'pending') {
        return;
      }
      value = data;
      status = 'fulfilled';
      onResolvedHandlers.forEach(function(onResolved) {
        onResolved.call(null, value);
      });
    };

    var reject = function(data) {
      if(status !== 'pending') {
        return;
      }
      error = data;
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
          if(status === 'fulfilled') {
            onResolved.call(null, value);
          } else if(status === 'pending') {
            onResolvedHandlers.push(onResolved);
          }
        }
        if(typeof onRejected === 'function') {
          if(status === 'rejected') {
            onRejected.call(null, error);
          } else if(status === 'pending') {
            onRejectedHandlers.push(onRejected);
          }
        }

        return new MPromise(function(resolve, reject) {
          onResolvedHandlers.push(resolve);
          onRejectedHandlers.push(reject);
        });
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