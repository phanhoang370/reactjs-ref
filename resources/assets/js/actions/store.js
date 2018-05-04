import api from '../api'
import {
  FETCH_STORE,
  FETCH_STORE_SUCCESS,
  FETCH_STORE_FAIL,
  STORE_CREATE,
  STORE_CREATE_SUCCESS,
  STORE_CREATE_FAIL,
  GET_ONE_STORE,
  GET_ONE_STORE_SUCCESS,
  GET_ONE_STORE_FAIL,
  STORE_EDIT,
  STORE_EDIT_SUCCESS,
  STORE_EDIT_FAIL,
  DELETE_STORE,
  DELETE_STORE_SUCCESS,
  DELETE_STORE_FAIL,
  STORE_SEARCH_BY_NAME,
  CLEAR_STORE,
} from '../constants/types'

export const fetchStore = () => ({
  type: FETCH_STORE
})

export const fetchStoreSuccess = data => ({
  type: FETCH_STORE_SUCCESS,
  data
})

export const fetchStoreFail = messages => ({
  type: FETCH_STORE_FAIL,
  messages
})

export const storeCreate = () => ({
  type: STORE_CREATE
})

export const storeCreateSuccess = data => ({
  type: STORE_CREATE_SUCCESS,
  data
})

export const storeCreateFail = messages => ({
  type: STORE_CREATE_FAIL,
  messages
})

export const storeGetOne = () => ({
  type: GET_ONE_STORE
})

export const storeGetOneSuccess = data => ({
  type: GET_ONE_STORE_SUCCESS,
  data
})

export const storeGetOneFail = messages => ({
  type: GET_ONE_STORE_FAIL,
  messages
})

export const storeEdit = () => ({
  type: STORE_EDIT
})

export const storeEditSuccess = data => ({
  type: STORE_EDIT_SUCCESS,
  data
})

export const storeEditFail = messages => ({
  type: STORE_EDIT_FAIL,
  messages
})

export const storeDelete = () => ({
  type: DELETE_STORE,
})

export const storeDeleteSuccess = id => ({
  type: DELETE_STORE_SUCCESS,
  id
})

export const storeDeleteFail = messages => ({
  type: DELETE_STORE_FAIL,
  messages
})

export const searchByName = data => ({
  type: STORE_SEARCH_BY_NAME,
  data
})

export const clearStore = () => ({
  type: CLEAR_STORE,
})

export const fetchStoreAllAction = (id = null) => dispatch => {
    dispatch(fetchStore())
    return api.store.getAllStore(id).then(response => {
        dispatch(fetchStoreSuccess(response.data))
        return Promise.resolve(response);
    })
    .catch(error => {
        dispatch(fetchStoreFail(error.response))
        return Promise.reject(error.response);
    })
}

export const getStoreForCreateUserAction = () => dispatch => {
    dispatch(fetchStore())
    return api.store.getStoreForCreateUser().then(response => {
        dispatch(fetchStoreSuccess(response.data))
        return Promise.resolve(response);
    })
    .catch(error => {
        dispatch(fetchStoreFail(error.response))
        return Promise.reject(error.response);
    })
}

/**
 * fetch store
 */
export const fetchStoreAction = () => dispatch => {
  dispatch(fetchStore())
  return api.store.getAll().then(response => {
    dispatch(fetchStoreSuccess(response.data))

    return Promise.resolve(response);
  })
  .catch(error => {
    dispatch(fetchStoreFail(error.response))
    return Promise.reject(error.response);
  })
}

/**
 * create store
 */
export const create = data => dispatch => {
  dispatch(storeCreate())
  return api.store.create(data).then(response => {
    dispatch(storeCreateSuccess(response.data))
    return Promise.resolve(response);
  })
  .catch(error => {
    dispatch(storeCreateFail(error.response))
    return Promise.reject(error.response);
  })
}

/**
 * get one store
 */
export const getOneStore = id => dispatch => {
  dispatch(storeGetOne())
  return api.store.getOne(id).then(response => {
    dispatch(storeGetOneSuccess(response.data))
    return Promise.resolve(response);
  })
  .catch(error => {
    dispatch(storeGetOneFail(error.response))
    return Promise.reject(error.response);
  })
}

/**
 * edit
 */
export const editStoreAction = (id, data) => dispatch => {
  dispatch(storeEdit())
  return api.store.edit(id, data).then(response => {
    dispatch(storeEditSuccess(response.data))
    return Promise.resolve(response);
  })
  .catch(error => {
    dispatch(storeEditFail(error.response))
    return Promise.reject(error.response);
  })
}

/**
 * delete company
 */
export const deleteStoreAction = id => dispatch => {
  dispatch(storeDelete())
  return api.store.delete(id).then(response => {
    dispatch(storeDeleteSuccess(id))
    return Promise.resolve(response);
  })
  .catch(error => {
    dispatch(storeDeleteFail(error.response))
    return Promise.reject(error.response);
  })
}

/**
 * search name
 */
export const searchByNameAction = name => dispatch => {
  return api.store.searchName(name).then(response => {
    dispatch(searchByName(response.data.data));
    return Promise.resolve(response.data);
  });
}

/**
 * clear store
 */
export const clearStoreAction = () => dispatch => {
  dispatch(clearStore());
}
