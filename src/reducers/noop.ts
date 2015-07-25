

var initialState = { noop: true };
export function noopReducer(state, action) {
  switch (action.type) {
    case 'ADD_TODO':
      return state;
    default:
      return initialState;
  }
}