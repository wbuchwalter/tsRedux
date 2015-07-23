import * as actionCreators from '../actions/todoActionCreators';
import {ITodoActionCreators} from './ITodoActionCreators';
declare var require;
var redux = require('redux');

export default function todoActionsService(reduxStore): ITodoActionCreators {
   return redux.bindActionCreators(actionCreators, reduxStore.dispatch);
}