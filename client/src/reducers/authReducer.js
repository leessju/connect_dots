import { CURRENT_USER } from '../actions/types';
import isEmpty from '../utils/isEmpty';

const initialState = {
  isAuthenticated: false,
  user: {}
};

export default function(state = initialState, action) {
  switch(action.type) { 
    // case REGISTER: 
    //   return {
    //     ...state,
    //     user: action.payload
    //   }
    case CURRENT_USER: 
      return {
        ...state,
        isAuthenticated: !(isEmpty(action.payload))? true:false,
        user: action.payload
      }
    default:
      return state;
  }
}