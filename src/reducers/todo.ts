import {ADD_TODO, REMOVE_TODO} from '../constants/actionTypes';
declare var require;
import Immutable = require('immutable');
import jquery = require('jquery');

export interface TodoState {
  todos: { text: string, id: number }[];
  idCounter: number;
}

let initialState: TodoState = { todos: [], idCounter: 0 };
deepFreeze(initialState);

/*decorator to swap parameters, to allow default value for state + copy and deepFreeze*/
export default function todoReducer(state: TodoState, action): TodoState {
  if (!state) {
    state = initialState;
  }
  switch (action.type) {
    case ADD_TODO:      
      let newState: TodoState = jquery.extend(true, {}, state);
      newState.todos.push({ text: action.text, id: state.idCounter });
      newState.idCounter = state.idCounter + 1;
      deepFreeze(newState)
      return newState;

    default:
      return state;
  }
}

function deepFreeze(o) {
  var prop, propKey;
  Object.freeze(o); // First freeze the object.
  for (propKey in o) {
    prop = o[propKey];
    if (!o.hasOwnProperty(propKey) || !(typeof prop === 'object') || Object.isFrozen(prop)) {
      // If the object is on the prototype, not an object, or is already frozen,
      // skip it. Note that this might leave an unfrozen reference somewhere in the
      // object if there is an already frozen object containing an unfrozen object.
      continue;
    }

    deepFreeze(prop); // Recursively call deepFreeze.
  }