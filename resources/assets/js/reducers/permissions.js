import {
  FETCH_PERMISSION,
  FETCH_PERMISSION_SUCCESS, 
  FETCH_PERMISSION_FAIL,
} from '../constants/types'

const initialState = {
  data: [],
  loading: false,
  error: false
}

export default function permissions (state = initialState, action = {}) {
  switch (action.type) {
    case FETCH_PERMISSION:
      return {
        ...state,
        loading: true
      }
    case FETCH_PERMISSION_SUCCESS:
      return {
        ...state,
        data: action.data.data
      }
    case FETCH_PERMISSION_FAIL:
      return {
        ...state,
        error: true
      }
    default:
      return state
  }
}
