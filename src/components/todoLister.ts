import * as actionCreators from '../actions/todoActions';
declare var require;
var redux = require('redux');

export default function todoAdder() {
  return {
    restrict: 'E',
    controllerAs: 'vm',
    controller: TodoListerController,
    template: "<div ng-repeat='todo in vm.todos'>{{todo.get('text')}}</div>",
    scope: {}
  };
}


class TodoListerController {
  todos;
  constructor(private reduxStore) {
    reduxStore.subscribe(this.onStoreChanged.bind(this));
  }

  onStoreChanged() {
    console.log(this.reduxStore.getState());
    this.todos = this.reduxStore.getState().todoReducer.get('todos');
  }
}