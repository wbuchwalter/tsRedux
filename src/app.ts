import * as reducers from './reducers/reducers';
import todoAdder from './components/todo/todoAdder';
import todoLister from './components/todo/todoLister';
import uiTree from './components/tree/uiTree';
import todoActionsService from './actions/todoActionCreators';
import nodeActionsService from './actions/nodeActionCreators';
import promiseMiddleware from './redux/promiseMiddleware';
import loggingMiddleware from './redux/loggingMiddleware';
import ngConnector from './redux/connectorFactory';

declare var require;
import redux = require('redux');


angular.module('app', [ngConnector.name])
  .factory('reduxStore', () => {
    let reducer = redux.combineReducers(reducers);
    return redux.applyMiddleware(promiseMiddleware, loggingMiddleware)(redux.createStore)(reducer);  
  })
   .factory('todoActions', todoActionsService)
   .factory('nodeActions', nodeActionsService)
   .directive('todoAdder', todoAdder)
   .directive('todoLister', todoLister)
   .directive('uiTree', uiTree);
   
 