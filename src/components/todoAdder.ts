import {ITodoActionCreators} from '../actions/ITodoActionCreators';
import redux = require('redux');

export default function todoAdder() {
  return {
    restrict: 'E',
    controllerAs: 'vm',
    controller: TodoAdderController,
    template: "<a ng-click='vm.click()'> Click me </a>",
    scope: {}
  };
}


class TodoAdderController {
  id = 0;
  constructor(private todoActions: ITodoActionCreators) {
  }
  
  click() {
    this.todoActions.addTodo('test' + this.id++);  
  }  
}