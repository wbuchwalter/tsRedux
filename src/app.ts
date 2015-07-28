import * as reducers from './reducers/reducers';
import regionActionsService from './actions/regionActionCreators';
import permissionActionsService from './actions/permissionActionCreators';
import promiseMiddleware from './redux/promiseMiddleware';
import loggingMiddleware from './redux/loggingMiddleware';
import ngConnector from './redux/connector';
import regionLister from './components/regionLister';
import loader from './components/loader';


declare var require;
import redux = require('redux');


angular.module('app', [ngConnector.name])
  .factory('reduxStore', () => {
    let reducer = redux.combineReducers(reducers);
    return redux.applyMiddleware(promiseMiddleware, loggingMiddleware)(redux.createStore)(reducer);  
  })  
   .factory('regionActions', regionActionsService)
   .factory('permissionActions', permissionActionsService)
   .directive('tsrLoader', loader)
   .directive('tsrRegionLister', regionLister);
   
 