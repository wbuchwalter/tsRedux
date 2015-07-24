import {ITodoActionCreator} from '../actions/todoActionCreators';
import redux = require('redux');

export default function todoAdder() {
  return {
    restrict: 'E',
    controllerAs: 'vm',
    controller: TodoAdderController,
    template: "<a ng-click='vm.add()'> Add todo </a> ---- <a ng-click='vm.addAsync()'> Add todo async </a>",
    scope: {}
  };
}

class TodoAdderController {
  id = 0;
  constructor(private todoActions: ITodoActionCreator) {
  }
  
  add() {
    this.todoActions.addTodo('test' + this.id++);  
  }  
  
  addAsync() {
    this.todoActions.addTodoAsync('test' + this.id++);  
  }
}
