import {RegionState, Region} from '../reducers/region';

declare var require;
import redux = require('redux');
import jquery = require('jquery');

export default function regionLoader() {
  return {
    restrict: 'E',
    controllerAs: 'vm',
    controller: RegionLoaderController,
    template: "<div ng-repeat='region in vm.regions'>{{region.name}}</div>",
    scope: {}
  };
}


class RegionLoaderController {  
  
  regions: Region[];
  
  constructor(private reduxStore: redux.Store, reduxConnector) {
    reduxConnector.connect(reduxStore, 'regionReducer', this.onStateChanged.bind(this));
  }

  onStateChanged(newState: RegionState) {
    this.regions = newState.regions;
  }
}