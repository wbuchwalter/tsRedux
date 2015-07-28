import {RegionState, Region} from '../reducers/region';
import {IConnector} from '../redux/connector';
import {matchingRegionsSelector} from '../selectors/matchingRegions';

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
    reduxConnector.connect(matchingRegionsSelector, this.onStateChanged.bind(this));
  }

  onStateChanged(regions: Region[]) {
    this.regions = regions;
  }
}