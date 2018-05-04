import {
  STORE_CREATE,
  STORE_CREATE_SUCCESS, 
  STORE_CREATE_FAIL,
  GET_ONE_STORE,
  GET_ONE_STORE_SUCCESS,
  GET_ONE_STORE_FAIL,
  STORE_EDIT,
  STORE_EDIT_SUCCESS,
  STORE_EDIT_FAIL,
  CLEAR_STORE,
} from '../constants/types'

const initialState = {
  data: {},
  loading: false,
  error: false
}

export default function store (state = initialState, action = {}) {
  switch (action.type) {
    case STORE_CREATE:
      return {
        ...state,
        loading: true
      }
    case STORE_CREATE_SUCCESS:
      return {
        ...state,
        data: action.data.data
      }
    case STORE_CREATE_FAIL:
      return {
        ...state,
        error: true
      }
    case GET_ONE_STORE:
      return {
        ...state,
        loading: true
      }
    case GET_ONE_STORE_SUCCESS:
      return {
        ...state,
        data: action.data.data,
          loading: false,
          error: false
      }
    case GET_ONE_STORE_FAIL:
      return {
        ...state,
        error: true
      }
    case STORE_EDIT:
      return {
        ...state,
        loading: true
      }
    case STORE_EDIT_SUCCESS:
      return {
        ...state,
        data: action.data
      }
    case STORE_EDIT_FAIL:
      return {
        ...state,
        error: true
      }
    case CLEAR_STORE:
      return {
        ...state,
        data: {}
      }
    default:
      return state
  }
}
