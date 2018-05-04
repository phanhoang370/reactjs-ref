import api from '../api'
import {
  FETCH_TYPE,
  FETCH_TYPE_SUCCESS,
  FETCH_TYPE_FAIL,
} from '../constants/types'

export const fetchType = () => ({
  type: FETCH_TYPE
})

export const fetchTypeSuccess = data => ({
  type: FETCH_TYPE_SUCCESS,
  data
})

export const fetchTypeFail = messages => ({
  type: FETCH_TYPE_FAIL,
  messages
})

/**
 * fetch type
 */
export const fetchTypeAction = () => dispatch => {
  dispatch(fetchType())
  return api.type.getAll().then(response => {
    dispatch(fetchTypeSuccess(response.data))
    return Promise.resolve(response);
  })
  .catch(error => {
    dispatch(fetchTypeFail(error.response))
    return Promise.reject(error.response);
  })
}


export const fetchTypeAllAction = () => dispatch => {
    dispatch(fetchType())
    return api.type.getAllType().then(response => {
        dispatch(fetchTypeSuccess(response.data))
        return Promise.resolve(response);
    })
        .catch(error => {
            dispatch(fetchTypeFail(error.response))
            return Promise.reject(error.response);
        })
}