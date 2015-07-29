import * as types from '../constants/actionTypes'
import {createAction, createAsyncAction} from '../redux/action';
import redux = require('redux');

export interface IRegionActionCreator {
  loadRegionsAsync();
  selectRegion(regionId: string);
  filterRegions(searchTerm: string);
}

export default function regionActionsService(reduxStore, $q: ng.IQService): IRegionActionCreator {
  let actionCreator = <IRegionActionCreator>{
    loadRegionsAsync: () => {
      return createAsyncAction(types.LOAD_REGIONS, fakeHttpCall($q));
    },
    selectRegion: (regionId) => {
      return createAction(types.SELECT_REGION, regionId);
    },
    filterRegions: (searchTerm) => {
      return createAction(types.FILTER_REGIONS, searchTerm);
    }
  };
  return redux.bindActionCreators(actionCreator, reduxStore.dispatch);
}

function fakeHttpCall( $q: ng.IQService): ng.IPromise<any> {
  let deferred = $q.defer();
  setTimeout(() => {  
    deferred.resolve(require('../fakeData/regions.json'));
  }, 100);
  return deferred.promise;
}
