import api from '../api'
import {
  FETCH_CITY, 
  FETCH_CITY_SUCCESS, 
  FETCH_CITY_FAIL,
  CITY_CREATE,
  CITY_CREATE_SUCCESS, 
  CITY_CREATE_FAIL,
  CITY_UPDATE,
  CITY_UPDATE_SUCCESS, 
  CITY_UPDATE_FAIL 
} from '../constants/types'

export const acFetchCity = () => ({
  type: FETCH_CITY
})

export const acFetchCitySuccess = data => ({
  type: FETCH_CITY_SUCCESS,
  data
})

export const acFetchCityFail = messages => ({
  type: FETCH_CITY_FAIL,
  messages
})

export const acCityCreate = () => ({
  type: CITY_CREATE
})

export const acCityCreateSuccess = data => ({
  type: CITY_CREATE_SUCCESS,
  data
})

export const acCityCreateFail = messages => ({
  type: CITY_CREATE_FAIL,
  messages
})

export const acCityUpdate = () => ({
  type: CITY_UPDATE
})

export const acCityUpdateSuccess = data => ({
  type: CITY_UPDATE_SUCCESS,
  data
})

export const acCityUpdateFail = messages => ({
  type: CITY_UPDATE_FAIL,
  messages
})

export const getAllCity = data => dispatch => {
  dispatch(acFetchCity())
  return api.city.getAll(data).then(response => {
    dispatch(acFetchCitySuccess(response.data))
    return Promise.resolve(response);
  })
  .catch(error => {
    dispatch(acFetchCityFail(error.response))
    return Promise.reject(error.response);
  })
}

export const createCity = data => dispatch => {
  dispatch(acFetchCity())
  return api.city.create(data).then(response => {
    dispatch(acFetchCitySuccess(response.data))
    return Promise.resolve(response);
  })
  .catch(error => {
    dispatch(acFetchCityFail(error.response))
    return Promise.reject(error.response);
  })
}
