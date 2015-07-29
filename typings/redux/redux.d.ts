declare module Redux {
  
  interface ActionCreator extends Function {
    (...args: any[]): any;
  }

  interface ActionCreators {
    [key: string]: ActionCreator;
  }

  interface Reducer extends Function {
    (state: any, action: any): any;
  }
  
  interface Reducers {
    [key: string]: Reducer;
  }
  
  interface Dispatch extends Function {
    (action: any): any;
  }

  interface StoreMethods {
    dispatch: Dispatch;
    getState(): any;
  }
  
  interface MiddlewareArg {
    dispatch: Dispatch;
    getState: Function;
  }
  
  interface Middleware extends Function {
    (obj: MiddlewareArg): Function;
  }

  class Store {
    getReducer(): Reducer;
    replaceReducer(nextReducer: Reducer): void;
    dispatch(action: any): any;
    getState(): any;
    subscribe(listener: Function): Function;
  }

  function createStore(reducer: Reducer, initialState?: any): Store;
  function bindActionCreators<T>(actionCreators: ActionCreators, dispatch: Dispatch): T;
  function combineReducers(reducers: Reducers): Reducer;
  function applyMiddleware(...middleware: Middleware[]): Function;
}

declare module "redux" {
  export = Redux;
}