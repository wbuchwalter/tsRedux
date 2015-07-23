import {ADD_TODO, REMOVE_TODO} from '../constants/actionTypes';
declare var require;
import Immutable = require('immutable');
import jquery = require('jquery');


export interface IAction {
  type: string;
  payload: any;
}

export interface TodoState {
  todos: { text: string, id: number }[];
  idCounter: number;
}

let initialState: TodoState = deepFreeze({ todos: [], idCounter: 0 });

/*decorator to swap parameters, to allow default value for state + copy and deepFreeze*/

export default function todoReducer(state: TodoState, action: IAction): TodoState {
  if (!state) {
    state = initialState;
  }
  switch (action.type) {
    case ADD_TODO:      
      let newState: TodoState = jquery.extend(true, {}, state);
      newState.todos.push({ text: action.payload, id: state.idCounter });
      newState.idCounter = state.idCounter + 1;
      deepFreeze(newState)
      return newState;

    default:
      return state;
  }
}

function deepFreeze(obj) {
  var prop, propKey;
  Object.freeze(obj); // First freeze the object.
  for (propKey in obj) {
    prop = obj[propKey];
    if (!obj.hasOwnProperty(propKey) || !(typeof prop === 'object') || Object.isFrozen(prop)) {
      // If the object is on the prototype, not an object, or is already frozen,
      // skip it. Note that this might leave an unfrozen reference somewhere in the
      // object if there is an already frozen object containing an unfrozen object.
      continue;
    }

    deepFreeze(prop); // Recursively call deepFreeze.
  }
  return obj;
}