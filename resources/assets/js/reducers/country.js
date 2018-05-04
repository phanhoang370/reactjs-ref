import {
  COUNTRY_CREATE,
  COUNTRY_CREATE_SUCCESS, 
  COUNTRY_CREATE_FAIL,
  COUNTRY_UPDATE,
  COUNTRY_UPDATE_SUCCESS, 
  COUNTRY_UPDATE_FAIL
} from '../constants/types'

const initialState = {
  data: [],
  loading: false,
  error: false
}

export default function company (state = initialState, action = {}) {
  switch (action.type) {
    case COUNTRY_CREATE:
      return {
        ...state,
        loading: true
      }
    case COUNTRY_CREATE_SUCCESS:
      return {
        ...state,
        data: action.data.data
      }
    case COUNTRY_CREATE_FAIL:
      return {
        ...state,
        error: true
      }
    case COUNTRY_UPDATE:
      return {
        ...state,
        loading: true
      }
    case COUNTRY_UPDATE_SUCCESS:
      return {
        ...state,
        data: action.data.data
      }
    case COUNTRY_UPDATE_FAIL:
      return {
        ...state,
        error: true
      }
    default:
      return state
  }
}
