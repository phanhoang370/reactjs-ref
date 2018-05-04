import api from '../api'
import { 
  FETCH_COUNTRY, 
  FETCH_COUNTRY_SUCCESS, 
  FETCH_COUNTRY_FAIL,
  COUNTRY_CREATE,
  COUNTRY_CREATE_SUCCESS, 
  COUNTRY_CREATE_FAIL,
  COUNTRY_UPDATE,
  COUNTRY_UPDATE_SUCCESS, 
  COUNTRY_UPDATE_FAIL
} from '../constants/types'

export const acFetchCountry = () => ({
  type: FETCH_COUNTRY
})

export const acFetchCountrySuccess = data => ({
  type: FETCH_COUNTRY_SUCCESS,
  data
})

export const acFetchCountryFail = messages => ({
  type: FETCH_COUNTRY_FAIL,
  messages
})

export const acCountryCreate = () => ({
  type: COUNTRY_CREATE
})

export const acCountryCreateSuccess = data => ({
  type: COUNTRY_CREATE_SUCCESS,
  data
})

export const acCountryCreateFail = messages => ({
  type: COUNTRY_CREATE_FAIL,
  messages
})

export const acCountryUpdate = () => ({
  type: COUNTRY_UPDATE
})

export const acCountryUpdateSuccess = data => ({
  type: COUNTRY_UPDATE_SUCCESS,
  data
})

export const acCountryUpdateFail = messages => ({
  type: COUNTRY_UPDATE_FAIL,
  messages
})

export const getAllCountry = data => dispatch => {
  dispatch(acFetchCountry())
  return api.country.getAll(data).then(response => {
    dispatch(acFetchCountrySuccess(response.data))
    return Promise.resolve(response);
  })
  .catch(error => {
    dispatch(acFetchCountryFail(error.response))
    return Promise.reject(error.response);
  })
}

export const createCountry = data => dispatch => {
  dispatch(acFetchCountry())
  return api.country.create(data).then(response => {
    dispatch(acFetchCountrySuccess(response.data))
    return Promise.resolve(response);
  })
  .catch(error => {
    dispatch(acFetchCountryFail(error.response))
    return Promise.reject(error.response);
  })
}

