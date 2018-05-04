import {
  CITY_CREATE,
  CITY_CREATE_SUCCESS, 
  CITY_CREATE_FAIL,
  CITY_UPDATE,
  CITY_UPDATE_SUCCESS, 
  CITY_UPDATE_FAIL
} from '../constants/types'

const initialState = {
  data: {},
  loading: false,
  error: false
}

export default function company (state = initialState, action = {}) {
  switch (action.type) {
    case CITY_CREATE:
      return {
        ...state,
        loading: true
      }
    case CITY_CREATE_SUCCESS:
      return {
        ...state,
        data: action.data.data
      }
    case CITY_CREATE_FAIL:
      return {
        ...state,
        error: true
      }
    case CITY_UPDATE:
      return {
        ...state,
        loading: true
      }
    case CITY_UPDATE_SUCCESS:
      return {
        ...state,
        data: action.data.data
      }
    case CITY_UPDATE_FAIL:
      return {
        ...state,
        error: true
      }
    default:
      return state
  }
}
