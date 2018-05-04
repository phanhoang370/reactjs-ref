import {
  FETCH_ROLE,
  FETCH_ROLE_SUCCESS, 
  FETCH_ROLE_FAIL,
  DELETE_ROLE,
  DELETE_ROLE_SUCCESS,
  DELETE_ROLE_FAIL,
} from '../constants/types'

const initialState = {
  data: [],
  loading: false,
  error: false
}

var findIndex = (roles, id) => {
    var result = -1;
    roles.forEach((role, index) => {
        if (role.role_id === id) {
            result = index;
        }
    });
    return result;
}

export default function roles (state = initialState, action = {}) {
  switch (action.type) {
    case FETCH_ROLE:
      return {
        ...state,
        loading: true
      }
    case FETCH_ROLE_SUCCESS:
      return {
        ...state,
        data: action.data.data
      }
    case FETCH_ROLE_FAIL:
      return {
        ...state,
        error: true
      }
    case DELETE_ROLE:
      return {
        ...state,
        loading: true
      }
    case DELETE_ROLE_SUCCESS:
      const index = findIndex(state.data, action.id);
      state.data.splice(index, 1);
      return {
        ...state
      };
    case DELETE_ROLE_FAIL:
      return {
        ...state,
        error: true
      }
      
    default:
      return state
  }
}
