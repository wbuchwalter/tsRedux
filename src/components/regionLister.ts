import {RegionState, Region} from '../reducers/region';
import {IConnector} from '../redux/connector';
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
  
  constructor(reduxConnector: IConnector<RegionState>) {
    reduxConnector.connect(state => state.regions, this.onStateChanged.bind(this));
  }

  onStateChanged(newState: RegionState) {
    this.regions = newState.regionList;
  }
}