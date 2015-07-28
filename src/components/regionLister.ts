import {RegionState, Region} from '../reducers/region';
import {IConnector} from '../redux/connector';
import {authorizeRegionsSelector, AuthorizedRegionsSelectorData} from '../selectors/authorizedRegions';

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
    reduxConnector.connect(authorizeRegionsSelector, this.onStateChanged.bind(this));
  }

  onStateChanged(data: AuthorizedRegionsSelectorData) {
    this.regions = data.regionList;
  }
}