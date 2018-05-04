import {
  FETCH_COUNTRY,
  FETCH_COUNTRY_SUCCESS, 
  FETCH_COUNTRY_FAIL
} from '../constants/types'

const initialState = {
  data: [],
  loading: false,
  error: false
}

export default function company (state = initialState, action = {}) {
  switch (action.type) {
    case FETCH_COUNTRY:
      return {
        ...state,
        loading: true
      }
    case FETCH_COUNTRY_SUCCESS:
      return {
        ...state,
        data: action.data.data
      }
    case FETCH_COUNTRY_FAIL:
      return {
        ...state,
        error: true
      }
    default:
      return state
  }
}
