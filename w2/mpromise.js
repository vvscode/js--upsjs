(function(window) {
  var MPromise = function(callback) {
    var value;
    var error;
    var onResolvedHandlers = [];
    var onRejectedHandlers = [];
    var status = 'pending';

    var resolve = function(data) {
      if (status !== 'pending') {
        return;
      }
      value = data;
      status = 'fulfilled';
      onResolvedHandlers.forEach(function(onResolved) {
        try {
          onResolved.call(null, value);
        } catch (e) {
          console.error(e);
        }
      });
    };

    var reject = function(data) {
      if (status !== 'pending') {
        return;
      }
      error = data;
      status = 'rejected';
      onRejectedHandlers.forEach(function(onRejected) {
        try {
          onRejected.call(null, error);
        } catch (e) {
          console.error(e);
        }
      });
    };

    if (typeof callback === 'function') {
      try {
        callback(resolve, reject);
      } catch (e) {
        error = e;
        reject(e);
      }
    }

    return {
      then: function(onResolved, onRejected) {
        if (typeof onResolved === 'function') {
          if (status === 'fulfilled') {
            try {
              onResolved.call(null, value);
            } catch (e) {
              console.error(e);
            }
          } else if (status === 'pending') {
            onResolvedHandlers.push(onResolved);
          }
        }
        if (typeof onRejected === 'function') {
          if (status === 'rejected') {
            try {
              onRejected.call(null, error);
            } catch (e) {
              console.error(e);
            }
          } else if (status === 'pending') {
            onRejectedHandlers.push(onRejected);
          }
        }

        var that = this;
        var status = this.getState();
        return new MPromise(function(resolve, reject) {
          if(status === 'fulfilled') {
            resolve(typeof onResolved === 'function'? onResolved(value): undefined);
          } else if (status === 'rejected') {
            reject(typeof onRejected === 'function'? onRejected(error): error);
          } else {
            onRejectedHandlers.push(function(data) {
              reject(typeof onRejected === 'function'? onRejected(error): error);
            });
            onResolvedHandlers.push(function(data) {
              resolve(typeof onResolved === 'function'? onResolved(value): undefined);
            });
          }
        });
      },
      catch: function(onRejected) {
        return this.then(null, onRejected);
      },
      getState: function() {
        return status;
      }
    }
  };

  window.MPromise = MPromise;
})(window);