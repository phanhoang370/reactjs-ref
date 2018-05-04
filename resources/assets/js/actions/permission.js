import api from '../api'
import {
  FETCH_PERMISSION,
  FETCH_PERMISSION_SUCCESS,
  FETCH_PERMISSION_FAIL,
} from '../constants/types'

export const fetchPermission = () => ({
  type: FETCH_PERMISSION
})

export const fetchPermissionSuccess = data => ({
  type: FETCH_PERMISSION_SUCCESS,
  data
})

export const fetchPermissionFail = messages => ({
  type: FETCH_PERMISSION_FAIL,
  messages
})

/**
 * fetch permission
 */
export const fetchPermissionAction = () => dispatch => {
  dispatch(fetchPermission())
  return api.permission.getAll().then(response => {
    dispatch(fetchPermissionSuccess(response.data))
    return Promise.resolve(response);
  })
  .catch(error => {
    dispatch(fetchPermissionFail(error.response))
    return Promise.reject(error.response);
  })
}
