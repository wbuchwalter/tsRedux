import * as actions from '../actions/todoActions';
let bindActionCreators = require('redux').bindActionCreators;


function todoItem(): ng.IDirective {
  return {
    restrict: 'E',
    controllerAs: 'vm',
    controller: CounterController,
    template: '<p> Counter </p>',
    scope: {}
  };
}


class CounterController {
  constructor(redux) {
    var actions = bindActionCreators(actions, redux.dispatch);
  }  
}

angular
  .module('app')
  .directive('todoItem', todoItem);
