import {
  GET_QRCODE_1,
  GET_QRCODE_1_SUCCESS,
  GET_QRCODE_1_FAIL,
} from '../constants/types'

const initialState = {
  data: {},
  loading: false,
  error: false
}


export default function qrcode1Number (state = initialState, action = {}) {
  switch (action.type) {
    case GET_QRCODE_1:
      return {
        ...state,
        loading: true
      }
    case GET_QRCODE_1_SUCCESS:
      return {
        ...state,
        data: action.data.data
      }
    case GET_QRCODE_1_FAIL:
      return {
        ...state,
        error: true
      }
    default:
      return state
  }
}
