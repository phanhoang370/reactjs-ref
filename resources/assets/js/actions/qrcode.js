import * as Types from './../constants/types';
import {
  FETCH_QRCOE1,
  FETCH_QRCOE1_SUCCESS,
  FETCH_QRCOE1_FAIL,
  PRINT_QRCODE,
  PRINT_QRCODE_SUCCESS,
  PRINT_QRCODE_FAIL,
  GET_QRCODE_1,
  GET_QRCODE_1_SUCCESS,
  GET_QRCODE_1_FAIL,
  APPEND_QRCODE
} from '../constants/types'
import api from "../api"

export const create = (qrcode) => dispatch =>
    api.company.qrcodeAdd(qrcode).then(response => {
        dispatch(actAddQrcode(response.data));
        return response
    });

export const actAddQrcode = (qrcode) => {
    return {
        type : Types.ADD_QRCODE,
        qrcode
    }
}

export const getQrcodeById = (id) => dispatch =>
    api.company.getQrcodeId(id).then(response => {
        dispatch(actGetQrcode(response.data.data));
    });

export const actGetQrcode = (qrcode) => {
    return {
        type : Types.EDIT_QRCODE,
        qrcode
    }
}

export const edit = (qrcode,id) => dispatch =>
    api.company.qrcodeEdit(qrcode,id).then(response => {
        dispatch(actUpdateQrcode(response.data.data));
        return response
    })

export const actUpdateQrcode = (qrcode) => {
    return {
        type : Types.UPDATE_QRCODE,
        qrcode
    }
}

export const fetchQrCode1 = () => ({
  type: FETCH_QRCOE1
})

export const fetchQrCode1Success = data => ({
  type: FETCH_QRCOE1_SUCCESS,
  data
})

export const fetchQrCode1Fail = messages => ({
  type: FETCH_QRCOE1_FAIL,
  messages
})

export const printQrCode = () => ({
  type: PRINT_QRCODE
})

export const printQrCodeSuccess = data => ({
  type: PRINT_QRCODE_SUCCESS,
  data
})

export const printQrCodeFail = messages => ({
  type: PRINT_QRCODE_FAIL,
  messages
})

export const getQrcode1 = () => ({
  type: GET_QRCODE_1
})

export const getQrcode1Success = data => ({
  type: GET_QRCODE_1_SUCCESS,
  data
})

export const getQrcode1Fail = () => ({
  type: GET_QRCODE_1_FAIL,
})

export const appendQrcode = qrcode => ({
  type: APPEND_QRCODE,
  qrcode
})

/**
 * fetch store
 */
export const fetchQrCode1Action = () => dispatch => {
  dispatch(fetchQrCode1())
  return api.company.fetchQrCode1().then(response => {
    dispatch(fetchQrCode1Success(response.data))
    return Promise.resolve(response);
  })
  .catch(error => {
    dispatch(fetchQrCode1Fail(error.response))
    return Promise.reject(error.response);
  })
}

/**
 * fetch store
 */
export const printQrCodeAction = serial => dispatch => {
  dispatch(printQrCode())
  return api.company.printQrCode(serial).then(response => {
    dispatch(printQrCodeSuccess(response.data))
    return Promise.resolve(response);
  })
  .catch(error => {
    dispatch(printQrCodeFail(error.response))
    return Promise.reject(error.response);
  })
}

/**
 * fetch store
 */
export const getQrcode1Action = () => dispatch => {
  dispatch(getQrcode1())
  return api.company.getQrcode1().then(response => {
    dispatch(getQrcode1Success(response.data))
    return Promise.resolve(response.data);
  })
  .catch(error => {
    dispatch(getQrcode1Fail(error.response))
    return Promise.reject(error.response);
  })
}

/**
 * fetch store
 */
export const updateQrcode1Action = (id, data) => dispatch => {
  return api.company.updateQrcode1(id, data).then(response => {
    return Promise.resolve(response.data);
  })
  .catch(error => {
    return Promise.reject(error.response);
  })
}

/**
 * fetch store
 */
export const storeQrCode1Acion = data => dispatch => {
  return api.company.storeQrCode1(data).then(response => {
    dispatch(appendQrcode(response.data.data))
    return Promise.resolve(response.data);
  })
  .catch(error => {
    return Promise.reject(error.response);
  })
}
