

export default angular.module('ngReduxConnector', [])
  .factory('reduxConnector', function() {
    return {
      connect: function(redux, reducerName, callback) {
        var currentState = angular.merge({}, redux.getState()[reducerName]);
        redux.subscribe(function() {
          var nextState = redux.getState()[reducerName];
            console.log('checking new state');
         
          if (!shallowEqual(currentState, nextState)) {
            console.log('state changed');
            callback(nextState);
            currentState = angular.merge({}, nextState);
          }
        });
      }
    }
  });

function shallowEqual(objA, objB) {
  if (objA === objB) {
    return true;
  }

  var keysA = Object.keys(objA);
  var keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) {
    return false;
  }

  // Test for A's keys different from B.
  var hasOwn = Object.prototype.hasOwnProperty;
  for (let i = 0; i < keysA.length; i++) {
    if (!hasOwn.call(objB, keysA[i]) ||
      objA[keysA[i]] !== objB[keysA[i]]) {
      return false;
    }
  }

  return true;
}
