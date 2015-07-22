import {ADD_TODO, REMOVE_TODO} from '../constants/actionTypes';

export default function todoReducer(state, action) {
  switch(action.type) {
    case ADD_TODO:
     alert('ADD TODO RECEIVED BY STORE');
     break;
  }  
}