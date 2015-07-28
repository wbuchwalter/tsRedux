import {BaseReducer} from '../redux/baseReducer';
import {handleAction} from '../redux/annotations';
import {LOAD_PERMISSIONS} from '../constants/actionTypes';

export interface PermissionState {
  authorizedRegionUids: string[];
}


class PermissionReducer extends BaseReducer {
  private _initialState = <PermissionState>{}

  @handleAction(LOAD_PERMISSIONS)
  onPermissionsLoaded(state: PermissionState, action): PermissionState {
    state.authorizedRegionUids = this.extractAuthorizedRegionsUids(action.payload)
    return state;
  }

  extractAuthorizedRegionsUids(rawData): string[] {
   return _.map(rawData.permissions, (p) => {
      return p.split('/')[0];
    });
  }
}