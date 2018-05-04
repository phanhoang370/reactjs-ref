import {
  FETCH_USER,
  FETCH_USER_SUCCESS, 
  FETCH_USER_FAIL,
  DELETE_USER,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL,
} from '../constants/types'

const initialState = {
  data: [],
  loading: false,
  error: false
}

var findIndex = (users, id) => {
    var result = -1;
    users.forEach((user, index) => {
        if (user.user_id === id) {
            result = index;
        }
    });
    return result;
}

export default function users (state = initialState, action = {}) {
  switch (action.type) {
    case FETCH_USER:
      return {
        ...state,
        loading: true
      }
    case FETCH_USER_SUCCESS:
      return {
        ...state,
        data: action.data.data
      }
    case FETCH_USER_FAIL:
      return {
        ...state,
        error: true
      }
    case DELETE_USER:
      return {
        ...state,
        loading: true
      }
    case DELETE_USER_SUCCESS:
      const index = findIndex(state.data, action.id);
      state.data.splice(index, 1);
      return {
        ...state
      };
    case DELETE_USER_FAIL:
      return {
        ...state,
        error: true
      }
      
    default:
      return state
  }
}
