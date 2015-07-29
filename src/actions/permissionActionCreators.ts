import * as types from '../constants/actionTypes';
import {createAsyncAction} from '../redux/action';
import redux = require('redux');

export interface IPermissionActionCreator {
  loadPermissionsAsync();
}


export default function permissionActionsService(reduxStore, $q: ng.IQService): IPermissionActionCreator {
  let actionCreator = <IPermissionActionCreator>{
    loadPermissionsAsync: () => {
      return createAsyncAction(types.LOAD_PERMISSIONS, fakeHttpCall($q));
    }
  };
  return redux.bindActionCreators(actionCreator, reduxStore.dispatch);
}


function fakeHttpCall( $q: ng.IQService): ng.IPromise<any> {
  let deferred = $q.defer();
  setTimeout(() => {  
    deferred.resolve(require('../fakeData/permissions.json'));
  }, 100);
  return deferred.promise;
}
