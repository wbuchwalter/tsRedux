import {ADD_TODO, REMOVE_TODO} from '../constants/actionTypes';
import {BaseReducer} from '../redux/baseReducer';
import {handleAction} from '../redux/annotations';


interface Todo {
  text: string;
  id: number;
}

export interface TodoState {
  todos: Todo[];
  idCounter: number;
}


class TodoReducer extends BaseReducer {
  private _initialState: TodoState = <TodoState>{ todos: [], idCounter: 0 };

  @handleAction(ADD_TODO)
  onAddTodo(state, action) {
    state.todos.push(<Todo>{ text: action.payload, id: state.idCounter });
    state.idCounter = state.idCounter + 1;
    return state;
  }

  @handleAction(REMOVE_TODO)
  onRemoveTodo(state, action) { return state; };
}


let todoReducerInstance = new TodoReducer();
export let todoReducer = todoReducerInstance.handleAction.bind(todoReducerInstance);
