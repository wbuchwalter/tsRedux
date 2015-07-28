import {IRegionActionCreator} from '../actions/regionActionCreators';

export default function regionFilter() {
  return {
    restrict: 'E',
    controllerAs: 'vm',
    controller: RegionFilterController,
    template: " <input type='text' ng-model='searchTerm' ng-change='vm.filter(searchTerm)'>",
    scope: {}
  };
}

class RegionFilterController {  

  constructor(private regionActions: IRegionActionCreator) {
  }

  filter(searchTerm: string) {
    this.regionActions.filterRegions(searchTerm);    
  }
}