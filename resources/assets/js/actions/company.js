import api from '../api'
import {
  FETCH_COMPANY,
  FETCH_COMPANY_SUCCESS,
  FETCH_COMPANY_FAIL,
  COMPANY_CREATE,
  COMPANY_CREATE_SUCCESS,
  COMPANY_CREATE_FAIL,
  GET_ONE_COMPANY,
  GET_ONE_COMPANY_SUCCESS,
  GET_ONE_COMPANY_FAIL,
  COMPANY_EDIT,
  COMPANY_EDIT_SUCCESS,
  COMPANY_EDIT_FAIL,
  DELETE_COMPANY,
  GET_ONE_STORE,
  GET_ONE_STORE_SUCCESS,
  GET_ONE_STORE_FAIL,
  FETCH_STORE_LOCATION,
  FETCH_STORE_LOCATION_SUCCESS,
  FETCH_STORE_LOCATION_FAIL,
  FETCH_STORE_TOP,
  FETCH_STORE_TOP_SUCCESS,
  FETCH_STORE_TOP_FAIL
} from '../constants/types'

export const fetchCompany = () => ({
  type: FETCH_COMPANY
})

export const fetchCompanySuccess = companies => ({
  type: FETCH_COMPANY_SUCCESS,
  companies
})

export const fetchCompanyFail = messages => ({
  type: FETCH_COMPANY_FAIL,
  messages
})

export const companyCreate = () => ({
  type: COMPANY_CREATE
})

export const companyCreateSuccess = data => ({
  type: COMPANY_CREATE_SUCCESS,
  data
})

export const companyCreateFail = messages => ({
  type: COMPANY_CREATE_FAIL,
  messages
})

export const companyGetOne = () => ({
  type: GET_ONE_COMPANY
})

export const companyGetOneSuccess = data => ({
  type: GET_ONE_COMPANY_SUCCESS,
  data
})

export const companyGetOneFail = messages => ({
  type: GET_ONE_COMPANY_FAIL,
  messages
})

export const companyEdit = () => ({
  type: COMPANY_EDIT
})

export const companyEditSuccess = data => ({
  type: COMPANY_EDIT_SUCCESS,
  data
})

export const companyEditFail = messages => ({
  type: COMPANY_EDIT_FAIL,
  messages
})

export const actDeleteCompany = id => ({
  type: DELETE_COMPANY,
  id
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

export const fetchStoreLocation = () => ({
  type: FETCH_STORE_LOCATION,
})

export const fetchStoreLocationSuccess = data => ({
  type: FETCH_STORE_LOCATION_SUCCESS,
  data
})

export const fetchStoreLocationFail = messages => ({
  type: FETCH_STORE_LOCATION_FAIL,
  messages
})

export const fetchStoreTop = () => ({
  type: FETCH_STORE_TOP,
})

export const fetchStoreTopSuccess = data => ({
  type: FETCH_STORE_TOP_SUCCESS,
  data
})

export const fetchStoreTopFail = messages => ({
  type: FETCH_STORE_TOP_FAIL,
  messages
})

/**
 * fetch company
 */
export const fetchAllCompany = () => dispatch => {
  dispatch(fetchCompany())
  return api.company.fetchAll().then(response => {
    dispatch(fetchCompanySuccess(response.data))
    return Promise.resolve(response);
  })
  .catch(error => {
    dispatch(fetchCompanyFail(error.response))
    return Promise.reject(error.response);
  })
}

/**
 * create company
 */
export const createAction = data => dispatch => {
  dispatch(companyCreate())
  return api.company.create(data).then(response => {
    dispatch(companyCreateSuccess(response.data))
    return Promise.resolve(response);
  })
  .catch(error => {
    dispatch(companyCreateFail(error.response))
    return Promise.reject(error.response);
  })
}

/**
 * get one company
 */
export const getOneCompany = id => dispatch => {
  dispatch(companyGetOne())
  return api.company.getOne(id).then(response => {
    dispatch(companyGetOneSuccess(response.data))
    return Promise.resolve(response);
  })
  .catch(error => {
    dispatch(companyGetOneFail(error.response))
    return Promise.reject(error.response);
  })
}

/**
 * get company policy
 */
export const getPolicyAction = () => dispatch => {
  dispatch(companyGetOne())
  return api.company.getPolicy().then(response => {
    dispatch(companyGetOneSuccess(response.data))
    return Promise.resolve(response);
  })
  .catch(error => {
    dispatch(companyGetOneFail(error.response))
    return Promise.reject(error.response);
  })
}

/**
 * edit
 */
export const editCompany = (id, data) => dispatch => {
  dispatch(companyEdit())
  return api.company.edit(id, data).then(response => {
    dispatch(companyEditSuccess(response.data))
    return Promise.resolve(response);
  })
  .catch(error => {
    dispatch(companyEditFail(error.response))
    return Promise.reject(error.response);
  })
}

/**
 * edit policy
 */
export const editCompanyPolicyAction = data => dispatch => {
  dispatch(companyEdit())
  return api.company.editCompanyPolicy(data).then(response => {
    dispatch(companyEditSuccess(response.data))
    return Promise.resolve(response);
  })
  .catch(error => {
    dispatch(companyEditFail(error.response))
    return Promise.reject(error.response);
  })
}

/**
 * delete comoany
 */
export const deleteCompany = id => dispatch =>
  api.company.delete(id).then(response => {
    dispatch(actDeleteCompany(response.data.data));
  });

/**
 * get one store
 */
export const companyGetOneStoreAction = id => dispatch => {
  dispatch(storeGetOne())
  return api.company.getOneStore(id).then(response => {
    dispatch(storeGetOneSuccess(response.data))
    return Promise.resolve(response);
  })
  .catch(error => {
    dispatch(storeGetOneFail(error.response))
    return Promise.reject(error.response);
  })
}

/**
 * fetch company
 */
export const getCompanyForCreateUserAction = () => dispatch => {
  dispatch(fetchCompany())
  return api.company.getCompanyForCreateUser().then(response => {
    dispatch(fetchCompanySuccess(response.data))
    return Promise.resolve(response);
  })
  .catch(error => {
    dispatch(fetchCompanyFail(error.response))
    return Promise.reject(error.response);
  })
}

/**
 * fetch store location
 */
export const fetchStoreLocationAction = () => dispatch => {
  dispatch(fetchStoreLocation())
  return api.company.getAllStoreForMap().then(response => {
    dispatch(fetchStoreLocationSuccess(response.data))
    return Promise.resolve(response);
  })
  .catch(error => {
    dispatch(fetchStoreLocationFail(error.response))
    return Promise.reject(error.response);
  })
}

/**
 * fetch store location
 */
export const fetchStoreTopAction = () => dispatch => {
  dispatch(fetchStoreTop())
  return api.company.getStoreTop().then(response => {
    dispatch(fetchStoreTopSuccess(response.data))
    return Promise.resolve(response);
  })
  .catch(error => {
    dispatch(fetchStoreTopFail(error.response))
    return Promise.reject(error.response);
  })
}
