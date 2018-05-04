import api from '../api'
import {
    FETCH_REPORT,
    FETCH_REPORT_SUCCESS,
    FETCH_REPORT_FAIL,
    CLEAR_REPORT
} from '../constants/types'

export const acFetchReportSuccess = data => ({
  type: FETCH_REPORT_SUCCESS,
  data
})
export const acReportCreateFail = messages => ({
    type: FETCH_REPORT_FAIL,
    messages
})

export const clearReport = () => ({
    type: CLEAR_REPORT
})

export const getAllReport = data => dispatch => {
  return api.report.getAll(data).then(response => {
    dispatch(acFetchReportSuccess(response.data.data))
    return Promise.resolve(response);
  })
  .catch(error => {
    dispatch(acReportCreateFail(error.response))
    return Promise.reject(error.response);
  })
}

export const getReportGuiderStoreAction = data => dispatch => {
  return api.report.getReportGuiderStore(data).then(response => {
    dispatch(acFetchReportSuccess(response.data.data))
    return Promise.resolve(response);
  })
  .catch(error => {
    dispatch(acReportCreateFail(error.response))
    return Promise.reject(error.response);
  })
}

export const getReportCompanyStoreAction = data => dispatch => {
  return api.report.getReportCompanyStore(data).then(response => {
    dispatch(acFetchReportSuccess(response.data.data))
    return Promise.resolve(response);
  })
  .catch(error => {
    dispatch(acReportCreateFail(error.response))
    return Promise.reject(error.response);
  })
}

export const getReportCompanyGuiderAction = data => dispatch => {
  return api.report.getReportCompanyGuider(data).then(response => {
    dispatch(acFetchReportSuccess(response.data.data))
    return Promise.resolve(response);
  })
  .catch(error => {
    dispatch(acReportCreateFail(error.response))
    return Promise.reject(error.response);
  })
}

export const clearReportAction = () => dispatch => {
    dispatch(clearReport())
}
