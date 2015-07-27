import * as reducers from './reducers/reducers';
import todoAdder from './components/todo/todoAdder';
import todoLister from './components/todo/todoLister';
import todoActionsService from './actions/todoActionCreators';
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
   .directive('todoAdder', todoAdder)
   .directive('todoLister', todoLister);
 