import {BaseReducer} from '../redux/baseReducer';
import {handleAction} from '../redux/annotations';
import {LOAD_REGIONS, FILTER_REGIONS, TOGGLE_REGION} from '../constants/actionTypes';

export interface RegionVisualProperties {
  regionId: string;
  depth: number;
  isExpanded: boolean;
  isExpandable: boolean;
}

export interface RegionVisualPropertiesMap {
  [regionId: string]: RegionVisualProperties
}


export interface RegionVisualPropertiesState {
  map: RegionVisualPropertiesMap 
}

class RegionVisualPropertiesReducer extends BaseReducer {
  private _initialState: RegionVisualPropertiesState = { map: {}};
  
  @handleAction(LOAD_REGIONS)
  private _onRegionsLoaded(state: RegionVisualPropertiesState, action): RegionVisualPropertiesState {
    state.map = this.normalizeTree(action.payload); 
    return state;
  }
  
  @handleAction(TOGGLE_REGION)
  private _onRegionToggled(state: RegionVisualPropertiesState, action): RegionVisualPropertiesState {
    state.map[action.payload].isExpanded = !state.map[action.payload].isExpanded;
    return state;
  }
  
  //depth first normalization 
  normalizeTree(rawData: any): any {

    let regionsMap = {};

    let normalize = (rawData, depth: number) => {
      let properties: RegionVisualProperties = {
        regionId: rawData.id,
        depth: depth,
        isExpandable: false,
        isExpanded: false,
      };
      regionsMap[properties.regionId] = properties;
      if (rawData.children) {
        properties.isExpandable = true;
        _.forEach(rawData.children, (c) => {
          normalize(c, depth + 1);
        });
      }
    };
    normalize(rawData, 0)
    return regionsMap;
  }


}

let regionUIReducer = new RegionVisualPropertiesReducer();
export let regionsVisualProperties = regionUIReducer.handleActions.bind(regionUIReducer);
