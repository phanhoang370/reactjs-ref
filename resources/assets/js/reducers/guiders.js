import {
  FETCH_GUIDERS,
  FETCH_GUIDERS_SUCCESS,
  FETCH_GUIDERS_FAIL,
  DELETE_GUIDER,
  DELETE_GUIDER_SUCCESS,
  DELETE_GUIDER_FAIL,
} from '../constants/types'

var findIndex = (guider, id) => {
    var result = -1;
    guider.forEach((guider, index) => {
        if (guider.id === id) {
            result = index;
        }
    });
    return result;
}

const initialState = {
  data: [],
  loading: false,
  error: false
}

export default function guiders (state = initialState, action = {}) {
  switch (action.type) {
    case FETCH_GUIDERS:
      return {
        ...state,
        loading: true,
        error: false
      }
    case FETCH_GUIDERS_SUCCESS:
      return {
        ...state,
        data: action.data.data,
        loading: false,
        error: false
      }
    case FETCH_GUIDERS_FAIL:
      return {
        ...state,
        loading: false,
        error: true
      }
    case DELETE_GUIDER:
      return {
        ...state,
        loading: true
      }
    case DELETE_GUIDER_SUCCESS:
      const index = findIndex(state.data, action.id);
      state.data.splice(index, 1);
      return {
        ...state
      };
    case DELETE_GUIDER_FAIL:
      return {
        ...state,
        error: true
      }
    default:
      return state
  }
};
