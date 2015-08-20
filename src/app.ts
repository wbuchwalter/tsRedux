import * as reducers from './reducers/reducers';
import regionActionsService from './actions/regionActionCreators';
import permissionActionsService from './actions/permissionActionCreators';
import promiseMiddleware from './redux/promiseMiddleware';
import loggingMiddleware from './redux/loggingMiddleware';
import regionLister from './components/regionLister';
import loader from './components/loader';
import regionFilter from './components/regionFilter';
import redux = require('redux');
require('ng-redux');

angular.module('app', ['ngRedux'])
  .config(($ngReduxProvider) => {
    let reducer = redux.combineReducers(reducers);
    $ngReduxProvider.createStoreWith(reducer, ['promiseMiddleware', loggingMiddleware]);
  })
   .factory('regionActions', regionActionsService)
   .factory('permissionActions', permissionActionsService)
   .factory('promiseMiddleware', ($http) => {
      console.log($http);
      return promiseMiddleware;
    })
   .directive('tsrLoader', loader)
   .directive('tsrRegionLister', regionLister)
   .directive('tsrRegionFilter', regionFilter);
