import {RegionState, Region} from '../reducers/region';
import {matchingRegionsSelector} from '../selectors/matchingRegions';
import {regionUIDepthSelector} from '../selectors/regionsDepth';
import {IRegionActionCreator} from '../actions/regionActionCreators';

export default function regionLoader() {
  return {
    restrict: 'E',
    controllerAs: 'vm',
    controller: RegionLoaderController,
    template: require('./regionLister.html'),
    scope: {}
  };
}

class RegionLoaderController {
  regions;
  depthMap;
  expandedRegionsMap = {};

  constructor(reduxConnector, private regionActions: IRegionActionCreator) {
    reduxConnector.connect(matchingRegionsSelector, this.onStateChanged.bind(this));
    reduxConnector.connect(regionUIDepthSelector, this.onDepthChanged.bind(this));
  }

  onStateChanged(regions: any) {
    this.regions = regions;
    this.expandedRegionsMap[0] = true; //top most state is always expanded 
  }

  onDepthChanged(depthMap) {
    this.depthMap = depthMap;
  }

  getLeftMargin(region) {
    return this.depthMap[region.id] * 20;
  }

  isVisible(region) {
    return region.parentId >= 0
      ? this.expandedRegionsMap[region.parentId]
      : true;
  }
  
  isExpandable(region) {
    return region.childrenIds && region.childrenIds.length > 0;
  }

  expand(region) {
    this.expandedRegionsMap[region.id] 
    ? this.expandedRegionsMap[region.id] = false 
    : this.expandedRegionsMap[region.id] = true;
  }
}