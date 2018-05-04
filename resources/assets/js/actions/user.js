import api from '../api'
import {
  FETCH_USER,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAIL,
  USER_CREATE,
  USER_CREATE_SUCCESS,
  USER_CREATE_FAIL,
  GET_ONE_USER,
  GET_ONE_USER_SUCCESS,
  GET_ONE_USER_FAIL,
  USER_EDIT,
  USER_EDIT_SUCCESS,
  USER_EDIT_FAIL,
  DELETE_USER,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL,
  RESET_PASSWORD,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAIL
} from '../constants/types'

export const fetchUser = () => ({
  type: FETCH_USER
})

export const fetchUserSuccess = data => ({
  type: FETCH_USER_SUCCESS,
  data
})

export const fetchUserFail = messages => ({
  type: FETCH_USER_FAIL,
  messages
})

export const userCreate = () => ({
  type: USER_CREATE
})

export const userCreateSuccess = data => ({
  type: USER_CREATE_SUCCESS,
  data
})

export const userCreateFail = messages => ({
  type: USER_CREATE_FAIL,
  messages
})

export const getOneUser = () => ({
  type: GET_ONE_USER
})

export const getOneUserSuccess = data => ({
  type: GET_ONE_USER_SUCCESS,
  data
})

export const getOneUserFail = messages => ({
  type: GET_ONE_USER_FAIL,
  messages
})

export const editUser = () => ({
  type: USER_EDIT
})

export const editUserSuccess = data => ({
  type: USER_EDIT_SUCCESS,
  data
})

export const editUserFail = messages => ({
  type: USER_EDIT_FAIL,
  messages
})

export const deleteUser = () => ({
  type: DELETE_USER,
})

export const deleteUserSuccess = id => ({
  type: DELETE_USER_SUCCESS,
  id
})

export const deleteUserFail = messages => ({
  type: DELETE_USER_FAIL,
  messages
})

export const resetPassword = () => ({
  type: RESET_PASSWORD,
})

export const resetPasswordSuccess = data => ({
  type: RESET_PASSWORD_SUCCESS,
  data
})

export const resetPasswordFail = () => ({
  type: RESET_PASSWORD_FAIL,
})

/**
 * fetch user
 */
export const fetchUserAction = () => dispatch => {
  dispatch(fetchUser())
  return api.user.getAll().then(response => {
    dispatch(fetchUserSuccess(response.data))
    return Promise.resolve(response);
  })
  .catch(error => {
    dispatch(fetchUserFail(error.response))
    return Promise.reject(error.response);
  })
}

/**
 * create user
 */
export const createUserAction = data => dispatch => {
  dispatch(userCreate())
  return api.user.create(data).then(response => {
    dispatch(userCreateSuccess(response.data))
    return Promise.resolve(response);
  })
  .catch(error => {
    dispatch(userCreateFail(error.response))
    return Promise.reject(error.response);
  })
}

/**
 * get one user
 */
export const getOneUserAction = id => dispatch => {
  dispatch(getOneUser())
  return api.user.getOne(id).then(response => {
    dispatch(getOneUserSuccess(response.data))
    return Promise.resolve(response);
  })
  .catch(error => {
    dispatch(getOneUserFail(error.response))
    return Promise.reject(error.response);
  })
}

/**
 * edit
 */
export const editUserAction = (id, data) => dispatch => {
  dispatch(editUser())
  return api.user.edit(id, data).then(response => {
    dispatch(editUserSuccess(response.data))
    return Promise.resolve(response);
  })
  .catch(error => {
    dispatch(editUserFail(error.response))
    return Promise.reject(error.response);
  })
}

/**
 * delete company
 */
export const deleteUserAction = id => dispatch => {
  dispatch(deleteUser())
  return api.user.delete(id).then(response => {
    dispatch(deleteUserSuccess(id))
    return Promise.resolve(response);
  })
  .catch(error => {
    dispatch(deleteUserFail(error.response))
    return Promise.reject(error.response);
  })
}

/**
 * delete company
 */
export const resetPasswordAction = (id, data) => dispatch => {
  dispatch(resetPassword())
  return api.user.resetPasswordByUser(id, data).then(response => {
    console.log(1);
    dispatch(resetPasswordSuccess(response.data))
    return Promise.resolve(response);
  })
  .catch(error => {
    console.log(2);
    dispatch(resetPasswordFail(error.response))
    return Promise.reject(error.response);
  })
}
