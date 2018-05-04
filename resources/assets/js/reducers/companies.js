import {
  FETCH_COMPANY,
  FETCH_COMPANY_SUCCESS, 
  FETCH_COMPANY_FAIL,
  DELETE_COMPANY
} from '../constants/types'

const initialState = {
  data: [],
  loading: false,
  error: false
}

var findIndex = (companies, id) => {
    var result = -1;
    companies.forEach((company, index) => {
        if (company.company_id === id) {
            result = index;
        }
    });
    return result;
}

export default function companies (state = initialState, action = {}) {
  switch (action.type) {
    case FETCH_COMPANY:
      return {
        ...state,
        loading: true
      }
    case FETCH_COMPANY_SUCCESS:
      return {
        ...state,
        data: action.companies.data
      }
    case FETCH_COMPANY_FAIL:
      return {
        ...state,
        error: true
      }
    case DELETE_COMPANY:
      const index = findIndex(state.data, action.id);
      state.data.splice(index, 1);
      return {
        ...state
      };
    default:
      return state
  }
}
