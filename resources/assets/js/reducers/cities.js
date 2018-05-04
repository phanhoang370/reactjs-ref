import {
  FETCH_CITY,
  FETCH_CITY_SUCCESS, 
  FETCH_CITY_FAIL
} from '../constants/types'

const initialState = {
  data: [],
  loading: false,
  error: false
}

export default function company (state = initialState, action = {}) {
  switch (action.type) {
    case FETCH_CITY:
      return {
        ...state,
        loading: true
      }
    case FETCH_CITY_SUCCESS:
      return {
        ...state,
        data: action.data.data
      }
    case FETCH_CITY_FAIL:
      return {
        ...state,
        error: true
      }
    default:
      return state
  }
}
