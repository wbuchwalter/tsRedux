import {nodeReducer, NodeState, Node} from '../../reducers/nodes';

declare var require;
import redux = require('redux');
import jquery = require('jquery');

export default function uiTree() {
  return {
    restrict: 'E',
    controllerAs: 'vm',
    controller: uiTreeController,
    template: "<div ng-repeat='node in vm.tree'>{{node.name}}</div>",
    scope: {}
  };
}


class uiTreeController {
  
  tree: Node[];
  
  constructor(private reduxStore: redux.Store, reduxConnector) {
    reduxConnector.connect(reduxStore, 'nodeReducer', this.onStateChanged.bind(this));
  }

  onStateChanged(newState: NodeState) {
    this.tree = newState.tree;
  }
}