import {BaseReducer} from '../redux/baseReducer';
import {handleAction} from '../redux/annotations';

interface Node {
  id: string;
  name: string;
  childrenIds: string[];
  parentId: string;
}


class NodeReducer extends BaseReducer {
   private _initialState = {tree: <Node[]>[], selectedNodeId: undefined };
   
   
  
}