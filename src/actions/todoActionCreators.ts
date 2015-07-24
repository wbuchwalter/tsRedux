import * as types from '../constants/actionTypes'
declare var require;
var redux = require('redux');

export interface ITodoActionCreator {
  addTodo(text: string): void;
  removeTodo(id: number): void;
}

let actionCreator = <ITodoActionCreator>{
  addTodo(text: string) {
    return {
      type: types.ADD_TODO,
      payload: text
    };
  },
  removeTodo(id) {
    return {
      type: types.REMOVE_TODO
    };
  }
};

export default function todoActionsService(reduxStore): ITodoActionCreator {
  return redux.bindActionCreators(actionCreator, reduxStore.dispatch);
}