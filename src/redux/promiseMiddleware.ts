import {Action, AsyncAction} from './action';



export default function promiseMiddleware() {

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