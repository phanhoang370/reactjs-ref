import api from '../api'
import {
  FETCH_ROLE,
  FETCH_ROLE_SUCCESS,
  FETCH_ROLE_FAIL,
  ROLE_CREATE,
  ROLE_CREATE_SUCCESS,
  ROLE_CREATE_FAIL,
  GET_ONE_ROLE,
  GET_ONE_ROLE_SUCCESS,
  GET_ONE_ROLE_FAIL,
  ROLE_EDIT,
  ROLE_EDIT_SUCCESS,
  ROLE_EDIT_FAIL,
  DELETE_ROLE,
  DELETE_ROLE_SUCCESS,
  DELETE_ROLE_FAIL,
  CLEAR_ROLE
} from '../constants/types'

export const fetchRole = () => ({
  type: FETCH_ROLE
})

export const fetchRoleSuccess = data => ({
  type: FETCH_ROLE_SUCCESS,
  data
})

export const fetchRoleFail = messages => ({
  type: FETCH_ROLE_FAIL,
  messages
})

export const roleCreate = () => ({
  type: ROLE_CREATE
})

export const roleCreateSuccess = data => ({
  type: ROLE_CREATE_SUCCESS,
  data
})

export const roleCreateFail = messages => ({
  type: ROLE_CREATE_FAIL,
  messages
})

export const getOneRole = () => ({
  type: GET_ONE_ROLE
})

export const getOneRoleSuccess = data => ({
  type: GET_ONE_ROLE_SUCCESS,
  data
})

export const getOneRoleFail = messages => ({
  type: GET_ONE_ROLE_FAIL,
  messages
})

export const editRole = () => ({
  type: ROLE_EDIT
})

export const editRoleSuccess = data => ({
  type: ROLE_EDIT_SUCCESS,
  data
})

export const editRoleFail = messages => ({
  type: ROLE_EDIT_FAIL,
  messages
})

export const deleteRole = () => ({
  type: DELETE_ROLE,
})

export const deleteRoleSuccess = id => ({
  type: DELETE_ROLE_SUCCESS,
  id
})

export const deleteRoleFail = messages => ({
  type: DELETE_ROLE_FAIL,
  messages
})

export const searchByName = data => ({
  type: ROLE_SEARCH_BY_NAME,
  data
})

export const clearRole = () => ({
  type: CLEAR_ROLE,
})

/**
 * fetch role
 */
export const fetchRoleAction = () => dispatch => {
  dispatch(fetchRole())
  return api.role.getAll().then(response => {
    dispatch(fetchRoleSuccess(response.data))
    return Promise.resolve(response);
  })
  .catch(error => {
    dispatch(fetchRoleFail(error.response))
    return Promise.reject(error.response);
  })
}

/**
 * fetch role for create/update
 */
export const getRoleForCreateUpdateAction = () => dispatch => {
  dispatch(fetchRole())
  return api.role.getRoleForCreateUpdate().then(response => {
    dispatch(fetchRoleSuccess(response.data))
    return Promise.resolve(response);
  })
  .catch(error => {
    dispatch(fetchRoleFail(error.response))
    return Promise.reject(error.response);
  })
}

/**
 * create role
 */
export const createRoleAction = data => dispatch => {
  dispatch(roleCreate())
  return api.role.create(data).then(response => {
    dispatch(roleCreateSuccess(response.data))
    return Promise.resolve(response);
  })
  .catch(error => {
    dispatch(roleCreateFail(error.response))
    return Promise.reject(error.response);
  })
}

/**
 * get one role
 */
export const getOneRoleAction = id => dispatch => {
  dispatch(getOneRole())
  return api.role.getOne(id).then(response => {
    dispatch(getOneRoleSuccess(response.data))
    return Promise.resolve(response);
  })
  .catch(error => {
    dispatch(getOneRoleFail(error.response))
    return Promise.reject(error.response);
  })
}

/**
 * edit
 */
export const editRoleAction = (id, data) => dispatch => {
  dispatch(editRole())
  return api.role.edit(id, data).then(response => {
    dispatch(editRoleSuccess(response.data))
    return Promise.resolve(response);
  })
  .catch(error => {
    dispatch(editRoleFail(error.response))
    return Promise.reject(error.response);
  })
}

/**
 * delete role
 */
export const deleteRoleAction = id => dispatch => {
  dispatch(deleteRole())
  return api.role.delete(id).then(response => {
    dispatch(deleteRoleSuccess(id))
    return Promise.resolve(response);
  })
  .catch(error => {
    dispatch(deleteRoleFail(error.response))
    return Promise.reject(error.response);
  })
}

/**
 * clear role
 */
export const clearRoleAction = () => dispatch => {
  dispatch(clearRole())
}
