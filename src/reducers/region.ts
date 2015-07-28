import {BaseReducer} from '../redux/baseReducer';
import {handleAction} from '../redux/annotations';
import {LOAD_REGIONS} from '../constants/actionTypes';

export interface Region {
  //actual id in the array
  id: number;
  
  //primary key backend
  uid: string
  name: string;
  childrenIds: number[];
  parentId: number;
  isActive: boolean;
}

export interface RegionState {
  regions: Region[];
  selectedRegionId: number;
}


class RegionReducer extends BaseReducer {
  private _initialState = <RegionState>{ regions: [], selectedRegionId: undefined };

  @handleAction(LOAD_REGIONS)
  private _onRegionsLoaded(state: RegionState, action): RegionState {
    state.regions = this.normalizeTree(action.payload);
    state.selectedRegionId = undefined;
    return state;
  }
   
  //depth first normalization 
  normalizeTree(rawData: any): Region[] {
    let position = 0;

    let normalizer = (rawData, parentId?: number) => {
      let region: Region = {
        id: position++,
        uid: rawData.id,
        name: rawData.name,
        childrenIds: [],
        parentId: parentId,
        isActive: rawData.isActive
      };

      let regions = [region];

      if (rawData.children) {
        for (let child of rawData.children) {
          let childNodes = normalizer(child);
          childNodes[0].parentId = region.id;
          region.childrenIds.push(childNodes[0].id)
          regions = regions.concat(childNodes);
        }
      }
      return regions;
    };

    return normalizer(rawData);

  }

}

let regionReducerInstance = new RegionReducer();
export let regionReducer = regionReducerInstance.handleAction.bind(regionReducerInstance);
