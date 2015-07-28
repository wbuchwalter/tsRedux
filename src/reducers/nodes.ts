import {BaseReducer} from '../redux/baseReducer';
import {handleAction} from '../redux/annotations';
import {LOAD_NODES} from '../constants/actionTypes';

export interface Node {
  //actual id in the array
  id: number;
  
  //primary key backend
  uid: string
  name: string;
  childrenIds: number[];
  parentId: number;
  isActive: boolean;
}

export interface NodeState {
  tree: Node[];
  selectedNodeId: number;
}


class NodeReducer extends BaseReducer {
  private _initialState = <NodeState>{ tree: <Node[]>[], selectedNodeId: undefined };

  @handleAction(LOAD_NODES)
  private _onNodesLoaded(state: NodeState, action): NodeState {
    state.tree = this.normalizeTree(action.payload);
    state.selectedNodeId = undefined;
    return state;
  }
   
  //depth first normalization 
  normalizeTree(rawData: any): Node[] {
    let position = 0;

    let normalizer = (rawData, parentId?: number) => {
      let node: Node = {
        id: position++,
        uid: rawData.id,
        name: rawData.name,
        childrenIds: [],
        parentId: parentId,
        isActive: rawData.isActive
      };

      let nodes = [node];

      if (rawData.children) {
        for (let child of rawData.children) {
          let childNodes = normalizer(child);
          childNodes[0].parentId = node.id;
          node.childrenIds.push(childNodes[0].id)
          nodes = nodes.concat(childNodes);
        }
      }
      return nodes;
    };

    return normalizer(rawData);

  }

}

let nodeReducerInstance = new NodeReducer();
export let nodeReducer = nodeReducerInstance.handleAction.bind(nodeReducerInstance);
