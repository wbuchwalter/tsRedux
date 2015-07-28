import {ITodoActionCreator} from '../../actions/todoActionCreators';
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
  constructor(private todoActions: ITodoActionCreator, private nodeActions) {
  }

  add() {
    this.nodeActions.loadNodesAsync();
  }

  addAsync() {
    this.todoActions.addTodoAsync('todo' + this.id++);
  }

}
