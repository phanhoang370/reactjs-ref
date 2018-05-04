import {
  ADD_GUIDER,
  ADD_GUIDER_SUCCESS,
  ADD_GUIDER_FAIL,
  EDIT_GUIDER,
  EDIT_GUIDER_SUCCESS,
  EDIT_GUIDER_FAIL,
  UPDATE_GUIDER,
  UPDATE_GUIDER_SUCCESS,
  UPDATE_GUIDER_FAIL,
} from '../constants/types'

const initialState = {
  data: {},
  loading: false,
  error: false
}

const guider = (state = initialState, action = {}) => {
  switch (action.type) {
    case ADD_GUIDER:
      return {
        ...state,
        loading: true
      }
    case ADD_GUIDER_SUCCESS:
      return {
        ...state,
        data: action.guider.data
      }
    case ADD_GUIDER_FAIL:
      return {
        ...state,
        error: true
      }
    case EDIT_GUIDER:
      return {
        ...state,
        loading: true,
        error: false
      }
    case EDIT_GUIDER_SUCCESS:
      return {
        ...state,
        data: action.data.data,
        loading: false,
        error: false
      }
    case EDIT_GUIDER_FAIL:
      return {
        ...state,
        loading: false,
        error: true
      }
    default: 
      return state
  }
};

export default guider;
