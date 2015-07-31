import {RegionState, Region, RegionMap} from '../reducers/region';
import {RegionVisualProperties, RegionVisualPropertiesMap} from '../reducers/regionVisualProperties'
import {matchingRegionsSelector} from '../selectors/matchingRegions';
import {IRegionActionCreator} from '../actions/regionActionCreators';

export default function regionLoader() {
  return {
    restrict: 'E',
    controllerAs: 'vm',
    controller: RegionListerController,
    template: require('./regionLister.html'),
    scope: {}
  };
}

class RegionListerController {

  regionMap: RegionMap;
  regionUIMap: RegionVisualPropertiesMap;
  regionIds: string[];

  constructor(reduxConnector, private regionActions: IRegionActionCreator) {
    reduxConnector.connect(state => state.regions.regionMap, regionMap => this.regionMap = regionMap);
    reduxConnector.connect(state => state.regionsVisualProperties.map, regionUIMap => this.regionUIMap = regionUIMap);
    reduxConnector.connect(matchingRegionsSelector, regionIds => this.regionIds = regionIds);
  }
  
  getRegion = id => this.regionMap[id];
  isExpandable = id => this.regionUIMap[id].isExpandable;
  //isVisible = id => this.regionUIMap[id].isVisible;
  getLeftMargin = id => this.regionUIMap[id].depth * 20;
  toggle = id => this.regionActions.toggleRegion(id);
  
  isVisible(id) {
    return !this.anyCollapsedParent(id);
  }
  
  anyCollapsedParent(regionId): boolean {
    let region = this.regionMap[regionId];
    if(!region.parentId) {
      return false;
    }    
    return this.regionUIMap[region.parentId].isExpanded 
    ? this.anyCollapsedParent(region.parentId) 
    : true;    
  }
}
