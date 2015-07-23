import * as actionCreators from '../actions/todoActionCreators';
declare var require;
var redux = require('redux');

export default function todoActionsService(reduxStore) {
   return redux.bindActionCreators(actionCreators, reduxStore.dispatch);
}