//Interface of the API (directive's returned object), not of the Connector class
export interface IConnector<T> {
  connect(select, callback: (state: T) => void): void;
}

class Connector {
  private _sliceState;
  constructor(private reduxStore, private select, private callback) {
    this._sliceState = angular.copy(this.select(this.reduxStore.getState()));
    reduxStore.subscribe(this.onStoreChanged.bind(this));
  }

  onStoreChanged() {
    var nextState = this.select(this.reduxStore.getState());
    if (!this.isSliceEqual(this._sliceState, nextState)) {
      this.callback(nextState);
      this._sliceState = angular.copy(nextState);
    }
  }

  isSliceEqual(slice, nextSlice) {
    const isRefEqual = slice === nextSlice;
    if (isRefEqual || typeof slice !== 'object' || typeof nextSlice !== 'object') {
      return isRefEqual;
    }
    return this.shallowEqual(slice, nextSlice);
  }

  shallowEqual(objA, objB) {
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
}


export default angular.module('ngRedux', [])
  .factory('reduxConnector', function(reduxStore) {
    return {
      connect: function(select, callback): void {
        let connector = new Connector(reduxStore, select, callback);
        //TODO: unsubscribe etc.
      }
    }
  });
