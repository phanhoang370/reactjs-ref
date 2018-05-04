import {
  RESET_PASSWORD,
  RESET_PASSWORD_SUCCESS, 
  RESET_PASSWORD_FAIL
} from '../constants/types'

const initialState = {
  data: {},
  loading: false,
  error: false
}

export default function resetPassword (state = initialState, action = {}) {
  switch (action.type) {
    case RESET_PASSWORD:
      return {
        ...state,
        loading: true
      }
    case RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        data: action.data.data,
        success: action.data.success,
        loading: false,
        error: false
      }
    case RESET_PASSWORD_FAIL:
      return {
        ...state,
        loading: false,
        success: action.data.success,
        error: true
      }
    default:
      return state
  }
}
