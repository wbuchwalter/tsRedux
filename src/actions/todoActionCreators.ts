import * as types from '../constants/actionTypes'
import {AsyncAction} from '../redux/promiseMiddleware';
import {Action} from '../redux/action';

declare var require;
var redux = require('redux');

export interface ITodoActionCreator {
  addTodo(text: string): void;
  removeTodo(id: number): void;
}

export default function todoActionsService(reduxStore, $q: ng.IQService): ITodoActionCreator {
  let actionCreator = <ITodoActionCreator>{
    addTodo(text: string) {
      let deferred = $q.defer();

      setTimeout(() => {
          console.log('resolved');
          deferred.resolve(text);
      }, 1000);

      return <AsyncAction>{
        types: types.ADD_TODO_ASYNC_TYPES,   
        promise: deferred.promise        
      };
    },
    removeTodo(id) {
      return <Action>{
        type: types.REMOVE_TODO
      };
    }
  };
  return redux.bindActionCreators(actionCreator, reduxStore.dispatch);
}