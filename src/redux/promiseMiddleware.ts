import {Action} from './action';

export interface AsyncAction {
  promise: ng.IPromise<any>;
  types: string[];
}


export default function promiseMiddleware(next: Function) {

  return (next) => (asyncAction: AsyncAction) => {
    const { promise, types} = asyncAction;
    if (!promise) {
      return next(asyncAction);
    }   

    const [REQUEST, SUCCESS, FAILURE] = asyncAction.types;
    let action = <Action>{ type: REQUEST, payload: undefined };
    next(action);
    return asyncAction.promise.then(
      (result) => {
        action.type = SUCCESS;
        action.payload = result;
        next(action);
      },
      (error) => {
        action.type = FAILURE;
        action.payload = error;
        next(action);
      });
  };
}