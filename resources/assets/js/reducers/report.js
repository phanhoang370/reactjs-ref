import {
    FETCH_REPORT_SUCCESS,
    FETCH_REPORT,
    FETCH_REPORT_FAIL,
    CLEAR_REPORT
} from '../constants/types'



export default function report (state = [], action = {}) {
  switch (action.type) {

      case FETCH_REPORT_SUCCESS:
              state = action.data
              return [...state];

      case FETCH_REPORT_FAIL:
          return {
              ...state,
              error: true
          }
      case CLEAR_REPORT:
          return []
    default:
      return state
  }
}
