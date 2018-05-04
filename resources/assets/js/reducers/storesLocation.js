import {
  FETCH_STORE_LOCATION,
  FETCH_STORE_LOCATION_SUCCESS, 
  FETCH_STORE_LOCATION_FAIL,
} from '../constants/types'

const initialState = {
  data: [],
  loading: false,
  error: false
}

export default function storesLocation (state = initialState, action = {}) {
  switch (action.type) {
    case FETCH_STORE_LOCATION:
      return {
        ...state,
        loading: true
      }
    case FETCH_STORE_LOCATION_SUCCESS:
      return {
        ...state,
        data: action.data.data
      }
    case FETCH_STORE_LOCATION_FAIL:
      return {
        ...state,
        error: true
      }
    default:
      return state
  }
}
