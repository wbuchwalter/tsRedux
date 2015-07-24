export interface Action {
  type: string;
  payload: any;
}

export interface AsyncAction {
  promise: ng.IPromise<any>;
  types: string[];
}

export function createAction(type: string, payload: any): Action{
  return {type: type, payload: payload};
}

export function createAsyncAction(type: string, promise: ng.IPromise<any>): AsyncAction {
  return {types: [type + '_STARTED', type, type + '_FAILURE'], promise: promise};
}