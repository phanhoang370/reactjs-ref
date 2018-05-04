import {
  FETCH_QRCOE1,
  FETCH_QRCOE1_SUCCESS,
  FETCH_QRCOE1_FAIL,
  APPEND_QRCODE
} from '../constants/types'

const initialState = {
  data: [],
  loading: false,
  error: false
}


export default function qrcodes (state = initialState, action = {}) {
  switch (action.type) {
    case FETCH_QRCOE1:
      return {
        ...state,
        loading: true
      }
    case FETCH_QRCOE1_SUCCESS:
      return {
        ...state,
        data: action.data.data
      }
    case FETCH_QRCOE1_FAIL:
      return {
        ...state,
        error: true
      }
    case APPEND_QRCODE:
      return {
        ...state,
        data: [...state.data, action.qrcode]
      }
    default:
      return state
  }
}
