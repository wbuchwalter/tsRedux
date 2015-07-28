import * as types from '../constants/actionTypes'
import {createAction, createAsyncAction} from '../redux/action';
declare var require;
var redux = require('redux');

export interface INodeActionCreator {
  loadNodesAsync(): void;
  selectNode(nodeId: string): void;
}

export default function nodeActionsService(reduxStore, $q: ng.IQService): INodeActionCreator {
  let actionCreator = <INodeActionCreator>{
    loadNodesAsync() {
      return createAsyncAction(types.LOAD_NODES, fakeHttpCall($q));
    },
    selectNode(nodeId) {
      return createAction(types.SELECT_NODE, nodeId);
    }
  };
  return redux.bindActionCreators(actionCreator, reduxStore.dispatch);
}

function fakeHttpCall( $q: ng.IQService): ng.IPromise<any> {
  let deferred = $q.defer();
  setTimeout(() => {  
    deferred.resolve(require('../fakeData.json'));
  }, 100);
  return deferred.promise;
}
