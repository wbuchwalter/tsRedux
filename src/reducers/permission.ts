import {BaseReducer} from '../redux/baseReducer';
import {handleAction} from '../redux/annotations';
import {LOAD_PERMISSIONS} from '../constants/actionTypes';

export interface PermissionState {
  authorizedRegionIds: string[];
}


class PermissionReducer extends BaseReducer {
  private _initialState = <PermissionState>{}

  @handleAction(LOAD_PERMISSIONS)
  onPermissionsLoaded(state: PermissionState, action): PermissionState {
    state.authorizedRegionIds = this.extractAuthorizedRegionsIds(action.payload)
    return state;
  }

  extractAuthorizedRegionsIds(rawData): string[] {
   return _.map(rawData.permissions, (p) => {
      return p.split('/')[0];
    });
  }
}

let permissionReducer = new PermissionReducer();
export let permissions = permissionReducer.handleActions.bind(permissionReducer);