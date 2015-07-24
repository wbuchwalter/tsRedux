declare module "redux" {
    interface ActionCreator {
        (...args: Array<any>): Object;
    }

    interface ActionCreators {
        [key: string]: ActionCreator
    }

    interface Reducer {
        (state: any, action: Object): any;
    }

    interface StoreMethods {
        dispatch(action: Object): Object;
        getState(): Object;

    }
    class Store {
        getReducer(): Function;
        replaceReducer(nextReducer: Reducer): void;
        dispatch(action: Object): Object;
        getState(): any;
        subscribe(listener: Function): Function;
    }

    function createStore(
        reducer: Reducer | Object,
        initialState?: any
    ): Store;      

    function bindActionCreators<T>(
        actionCreators: ActionCreator | ActionCreators,
        dispatch: Function
    ): T;

    function composeMiddleware(...middlewares: Array<Function>): Function;
    function combineReducers(reducers: Object): Reducer;
    function applyMiddleware(...middleware: Function[]): 

}