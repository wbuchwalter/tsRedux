
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
    return state ? state : (<any>this)._initialState, {});
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

}

