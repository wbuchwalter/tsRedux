import {ADD_TODO, REMOVE_TODO} from '../constants/actionTypes';
declare var require;
let Immutable = require('immutable');

let initialState = Immutable.Map({ todos: [], idCounter: 0 });

export default function todoReducer(state, action) {
  if (!state) {
    state = initialState;
  }
  switch (action.type) {
    case ADD_TODO:
    case ADD_TODO:
      return state
        .update('todos',
          (todos) => {
            todos.push(Immutable.Map({
              text: action.text,
              id: state.get('idCounter')
            }));
            return todos;
          })
        .set('idCounter', state.get('idCounter') + 1);
    default:
      return state;
  }
}