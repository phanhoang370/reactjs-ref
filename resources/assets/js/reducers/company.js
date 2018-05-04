import {
  COMPANY_CREATE,
  COMPANY_CREATE_SUCCESS, 
  COMPANY_CREATE_FAIL,
  GET_ONE_COMPANY,
  GET_ONE_COMPANY_SUCCESS,
  GET_ONE_COMPANY_FAIL,
  COMPANY_EDIT,
  COMPANY_EDIT_SUCCESS,
  COMPANY_EDIT_FAIL
} from '../constants/types'

const initialState = {
  data: {},
  loading: false,
  error: false
}

export default function company (state = initialState, action = {}) {
  switch (action.type) {
    case COMPANY_CREATE:
      return {
        ...state,
        loading: true
      }
    case COMPANY_CREATE_SUCCESS:
      return {
        ...state,
        data: action.data,
          loading: false,
          error: false
      }
    case COMPANY_CREATE_FAIL:
      return {
        ...state,
          loading: false,
        error: true
      }
    case GET_ONE_COMPANY:
      return {
        ...state,
        loading: true
      }
    case GET_ONE_COMPANY_SUCCESS:
      return {
        ...state,
        data: action.data.data,
          loading: false,
          error: false
      }
    case GET_ONE_COMPANY_FAIL:
      return {
        ...state,
        error: true
      }
    case COMPANY_EDIT:
      return {
        ...state,
        loading: true
      }
    case COMPANY_EDIT_SUCCESS:
      return {
        ...state,
        data: action.data
      }
    case COMPANY_EDIT_FAIL:
      return {
        ...state,
        error: true
      }
    default:
      return state
  }
}
