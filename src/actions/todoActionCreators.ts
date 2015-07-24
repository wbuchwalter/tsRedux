import * as types from '../constants/actionTypes'
import {createAction, createAsyncAction} from '../redux/action';

declare var require;
var redux = require('redux');

export interface ITodoActionCreator {
  addTodoAsync(text: string): void;
  addTodo(text: string): void;
  removeTodo(id: number): void;
}

export default function todoActionsService(reduxStore, $q: ng.IQService): ITodoActionCreator {
  let actionCreator = <ITodoActionCreator>{
    addTodoAsync(text: string) {
      return createAsyncAction(types.ADD_TODO, someAsyncLogic(text, $q));
    },
    addTodo(text) {
      return createAction(types.ADD_TODO, text);
    },
    removeTodo(id) {
      return createAction(types.REMOVE_TODO, id);
    }
  };
  return redux.bindActionCreators(actionCreator, reduxStore.dispatch);
}

function someAsyncLogic(text, $q: ng.IQService): ng.IPromise<any> {
  let deferred = $q.defer();
  setTimeout(() => {  
    deferred.resolve(text);
  }, 1000);
  return deferred.promise;
}