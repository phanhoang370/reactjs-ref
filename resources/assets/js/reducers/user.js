import {
  USER_CREATE,
  USER_CREATE_SUCCESS, 
  USER_CREATE_FAIL,
  GET_ONE_USER,
  GET_ONE_USER_SUCCESS,
  GET_ONE_USER_FAIL,
  USER_EDIT,
  USER_EDIT_SUCCESS,
  USER_EDIT_FAIL
} from '../constants/types'

const initialState = {
  data: {},
  loading: false,
  error: false
}

export default function user (state = initialState, action = {}) {
  switch (action.type) {
    case USER_CREATE:
      return {
        ...state,
        loading: true
      }
    case USER_CREATE_SUCCESS:
      return {
        ...state,
        data: action.data.data
      }
    case USER_CREATE_FAIL:
      return {
        ...state,
        error: true
      }
    case GET_ONE_USER:
      return {
        ...state,
        loading: true,
        error: false
      }
    case GET_ONE_USER_SUCCESS:
      return {
        ...state,
        data: action.data.data,
        loading: false,
        error: false
      }
    case GET_ONE_USER_FAIL:
      return {
        ...state,
        loading: false,
        error: true
      }
    case USER_EDIT:
      return {
        ...state,
        loading: true
      }
    case USER_EDIT_SUCCESS:
      return {
        ...state,
        data: action.data
      }
    case USER_EDIT_FAIL:
      return {
        ...state,
        error: true
      }
    default:
      return state
  }
}
