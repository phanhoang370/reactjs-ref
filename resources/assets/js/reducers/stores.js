import {
  FETCH_STORE,
  FETCH_STORE_SUCCESS, 
  FETCH_STORE_FAIL,
  DELETE_STORE,
  DELETE_STORE_SUCCESS,
  DELETE_STORE_FAIL,
  FETCH_STORE_TOP,
  FETCH_STORE_TOP_SUCCESS,
  FETCH_STORE_TOP_FAIL
} from '../constants/types'

const initialState = {
  data: [],
  loading: false,
  error: false
}

var findIndex = (stores, id) => {
    var result = -1;
    stores.forEach((store, index) => {
        if (store.store_id === id) {
            result = index;
        }
    });
    return result;
}

export default function stores (state = initialState, action = {}) {
  switch (action.type) {
    case FETCH_STORE:
      return {
        ...state,
        loading: true
      }
    case FETCH_STORE_SUCCESS:
      return {
        ...state,
        data: action.data.data,

      }
    case FETCH_STORE_FAIL:
      return {
        ...state,
        error: true
      }
    case DELETE_STORE:
      return {
        ...state,
        loading: true
      }
    case DELETE_STORE_SUCCESS:
      const index = findIndex(state.data, action.id);
      state.data.splice(index, 1);
      return {
        ...state
      };
    case DELETE_STORE_FAIL:
      return {
        ...state,
        error: true
      }
    case FETCH_STORE_TOP:
      return {
        ...state,
        loading: true
      }
    case FETCH_STORE_TOP_SUCCESS:
      return {
        ...state,
        data: action.data.data
      }
    case FETCH_STORE_TOP_FAIL:
      return {
        ...state,
        error: true
      }
      
    default:
      return state
  }
}
