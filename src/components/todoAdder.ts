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
  constructor(private todoActions, private reduxStore) {
  }
  
  click() {
    this.todoActions.addTodo('test' + this.id++);
   // this.reduxStore.getState().todoReducer.todos.push('FROM CONTROLLER' + this.id++);
  }  
}