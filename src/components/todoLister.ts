import {TodoState} from '../reducers/todo';
declare var require;
import redux = require('redux');
import jquery = require('jquery');

export default function todoAdder() {
  return {
    restrict: 'E',
    controllerAs: 'vm',
    controller: TodoListerController,
    template: "<div ng-repeat='todo in vm.todos'>{{todo.text}}</div>",
    scope: {}
  };
}


class TodoListerController {
  
  todos;
  
  constructor(private reduxStore: redux.Store, reduxConnector) {
    reduxConnector.connect(reduxStore, 'todoReducer', this.onStoreChanged.bind(this));
  }

 //decorator to inject mutable state
 //this.reduxStore.getState().todoReducer needs to be directly injected
 
  onStoreChanged(newState: TodoState) {
    this.todos = newState.todos;
  }
}