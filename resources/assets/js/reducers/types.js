import {
  FETCH_TYPE,
  FETCH_TYPE_SUCCESS, 
  FETCH_TYPE_FAIL,
} from '../constants/types'

const initialState = {
  data: [],
  loading: false,
  error: false
}

export default function stores (state = initialState, action = {}) {
  switch (action.type) {
    case FETCH_TYPE:
      return {
        ...state,
        loading: true
      }
    case FETCH_TYPE_SUCCESS:
      return {
        ...state,
        data: action.data.data
      }
    case FETCH_TYPE_FAIL:
      return {
        ...state,
        error: true
      }
    default:
      return state
  }
}
