import {
  ROLE_CREATE,
  ROLE_CREATE_SUCCESS, 
  ROLE_CREATE_FAIL,
  GET_ONE_ROLE,
  GET_ONE_ROLE_SUCCESS,
  GET_ONE_ROLE_FAIL,
  ROLE_EDIT,
  ROLE_EDIT_SUCCESS,
  ROLE_EDIT_FAIL,
  CLEAR_ROLE
} from '../constants/types'

const initialState = {
  data: {},
  loading: false,
  error: false
}

export default function role (state = initialState, action = {}) {
  switch (action.type) {
    case ROLE_CREATE:
      return {
        ...state,
        loading: true
      }
    case ROLE_CREATE_SUCCESS:
      return {
        ...state,
        data: action.data.data
      }
    case ROLE_CREATE_FAIL:
      return {
        ...state,
        error: true
      }
    case GET_ONE_ROLE:
      return {
        ...state,
        loading: true,
        error: false
      }
    case GET_ONE_ROLE_SUCCESS:
      return {
        ...state,
        data: action.data.data,
        loading: false,
        error: false
      }
    case GET_ONE_ROLE_FAIL:
      return {
        ...state,
        loading: false,
        error: true
      }
    case ROLE_EDIT:
      return {
        ...state,
        loading: true
      }
    case ROLE_EDIT_SUCCESS:
      return {
        ...state,
        data: action.data,
        loading: false
      }
    case ROLE_EDIT_FAIL:
      return {
        ...state,
        loading: false,
        error: true
      }
    case CLEAR_ROLE:
      return {
        ...state,
        data: {},
        loading: false,
        error: false
      }
    default:
      return state
  }
}
