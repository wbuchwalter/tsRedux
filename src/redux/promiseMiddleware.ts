import {Action} from './action';

export interface AsyncAction extends Action {
  promise: any;
  types: string[];
}


export default function promiseMiddleware(next: Function) {
  
  return (next) => (action: AsyncAction) => {
    const { promise, types} = action;
    if (!promise) {      
      return next(action);
    }

    const [REQUEST, SUCCESS, FAILURE] = action.types;
    delete action.promise;
    delete action.types;
    action.type = REQUEST;
    next(action);
    return action.promise.then(
      (result) => {
        action.type = SUCCESS;
        next(action);
      },
      (error) => {
        action.type = FAILURE;
        next(action);
      });
  };
}