import * as reducers from './reducers/reducers';
import todoAdder from './components/todoAdder';
import todoLister from './components/todoLister';
import todoActionsService from './actions/todoActionCreators';
import promiseMiddleware from './redux/promiseMiddleware';

declare var require;
import redux = require('redux');


angular.module('app', [])
  .factory('reduxStore', () => {
    let reducer = redux.combineReducers(reducers);
    return redux.applyMiddleware(promiseMiddleware)(redux.createStore)(reducer);
    //return redux.createStore(reducer);
  
  })
   .factory('todoActions', todoActionsService)
   .directive('todoAdder', todoAdder)
   .directive('todoLister', todoLister);
 