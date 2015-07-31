import {BaseReducer} from '../redux/baseReducer';
import {handleAction} from '../redux/annotations';
import {LOAD_REGIONS, FILTER_REGIONS} from '../constants/actionTypes';

export interface Region {  
  //primary key 
  id: string
  name: string;
  depth: number; //depth in the tree, calculated in the reducer for performance and conveniance
  childrenIds: number[];
  parentId: string;
  isActive: boolean;
}

export interface RegionMap {
  [regionId: string]: Region
}

export interface RegionState {
  regionIds: string[];
  regionMap: RegionMap;
  selectedRegionId: number;
  filter: string;
}

class RegionReducer extends BaseReducer {
  private _initialState = <RegionState>{ regionIds: [], regionMap: {}, selectedRegionId: undefined, filter: undefined };
 
  @handleAction(LOAD_REGIONS)
  private _onRegionsLoaded(state: RegionState, action): RegionState {
    state.regionMap = this.normalizeTree(action.payload);  
    state.regionIds = [];
    _.forIn(state.regionMap, r => state.regionIds.push(r.id));
    state.selectedRegionId = undefined;
    return state;
  }

  @handleAction(FILTER_REGIONS)
  private _onFilterRegions(state: RegionState, action): RegionState {
    state.filter = action.payload;
    return state;
  }
   
  //depth first normalization 
  normalizeTree(rawData: any): any {
   
    let regionsMap = {};
    
    let normalize = (rawData, depth: number, parentId?: string) => {
      let region: Region = {       
        id: rawData.id,       
        name: rawData.name,
        childrenIds: [],
        parentId: parentId,
        depth: depth,
        isActive: rawData.isActive
      };

      regionsMap[region.id] = region;
      if (parentId) {
        regionsMap[parentId].childrenIds.push(region.id);
      }

      if (rawData.children) {
        _.forEach(rawData.children, (c) => {
          normalize(c, depth + 1, region.id);
        });
      }
    };
    normalize(rawData, 0)
    return regionsMap;
  }

}

let regionReducer = new RegionReducer();
export let regions = regionReducer.handleActions.bind(regionReducer);
