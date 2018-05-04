import * as Types from './../constants/types';
import api from "../api";

export const actFetchQrcodesRequest = () => dispatch =>
    api.company.qrcode().then(response => {
        dispatch(actFetchQrcodes(response.data.data));
    });

export const actFetchQrcodes = (qrcodes) => {
    return {
        type : Types.FETCH_QRCODES,
        qrcodes
    }
}

export const create = (qrcode) => dispatch =>
    api.company.qrcode2Add(qrcode).then(response => {
        dispatch(actAddQrcode(response.data));
        return response
    });



export const actAddQrcode = (qrcode) => {
    return {
        type : Types.ADD_QRCODE,
        qrcode
    }
}

export const deleteQrcode = (id) => dispatch =>
    api.company.qrcodeDelete(id).then(response => {
        dispatch(actDeleteQrcode(id));
    });


export const actDeleteQrcode = (id) => {
    return {
        type : Types.DELETE_QRCODE,
        id
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