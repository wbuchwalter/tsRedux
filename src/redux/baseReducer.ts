
declare var require;
import jquery = require('jquery');

export class BaseReducer {

  _actionHandlersMap: Object = {};

  constructor() {
    this._actionHandlersMap = this.getActionHandlersMap();
  }
  
  handleAction(state, action) {
    _.forOwn(this._actionHandlersMap, (handledActionTypes: string[], handlerKey: string) => {
      if (this.actionTypeMatchMetadata(action.type, handledActionTypes)) {
        //pass the state as mutable and returns it as immutable
       // return this.deepFreeze(this[handlerKey](jquery.extend(true, {}, state), action));
       return this[handlerKey](state, action);
      }
    });
    
    //needs to throw compile time error if _initialState is not defined in the derived class.
    //returns the state as immutable.
    //return state ? this.deepFreeze(state) : this.deepFreeze((<any>this)._initialState);
    return state ? state : (<any>this)._initialState;
  }

  getActionHandlersMap(): any {
    let handlers = {};
    _.forIn(this, (value, key) => {
      let metadataValue = Reflect.getMetadata('handleAction', this, key);
      if (metadataValue) {
        handlers[key] = metadataValue;
      }
    });
    return handlers;
  }

  actionTypeMatchMetadata(actionType: string, handledActionTypes: string[]): boolean {
    return handledActionTypes.length === 0 || _.any(handledActionTypes, (handledActionType) => {
      return handledActionType === actionType;
    });
  }

 /* deepFreeze<T>(obj: T): T {
    var prop, propKey;
    Object.freeze(obj); // First freeze the object.
    for (propKey in obj) {
      prop = obj[propKey];
      if (!obj.hasOwnProperty(propKey) || !(typeof prop === 'object') || Object.isFrozen(prop)) {
        // If the object is on the prototype, not an object, or is already frozen,
        // skip it. Note that this might leave an unfrozen reference somewhere in the
        // object if there is an already frozen object containing an unfrozen object.
        continue;
      }

      this.deepFreeze<T>(prop); // Recursively call deepFreeze.
    }
    return obj;
  }*/


}

