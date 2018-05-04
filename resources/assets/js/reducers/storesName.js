import {
  STORE_SEARCH_BY_NAME
} from '../constants/types'
import { findIndex } from './../utils/helper'

const initialState = {
  data: [],
  loading: false,
  error: false
}

export default function storesName (state = initialState, action = {}) {
  switch (action.type) {
    case STORE_SEARCH_BY_NAME:
      return {
        ...state,
        data: action.data
      }
    default:
      return state
  }
}
