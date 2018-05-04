import api from "../api";
import {
  FETCH_GUIDERS,
  FETCH_GUIDERS_SUCCESS,
  FETCH_GUIDERS_FAIL,
  ADD_GUIDER,
  ADD_GUIDER_SUCCESS,
  ADD_GUIDER_FAIL,
  EDIT_GUIDER,
  EDIT_GUIDER_SUCCESS,
  EDIT_GUIDER_FAIL,
  UPDATE_GUIDER,
  UPDATE_GUIDER_SUCCESS,
  UPDATE_GUIDER_FAIL,
  DELETE_GUIDER,
  DELETE_GUIDER_SUCCESS,
  DELETE_GUIDER_FAIL,
} from '../constants/types'

export const actFetchGuiders = () => {
    return {
        type : FETCH_GUIDERS,
    }
}

export const actFetchGuidersSuccess = data => {
    return {
        type : FETCH_GUIDERS_SUCCESS,
        data
    }
}

export const actFetchGuidersFail = () => {
    return {
        type : FETCH_GUIDERS_FAIL,
    }
}

export const actFetchGuidersRequest = () => dispatch => {
    dispatch(actFetchGuiders())
    return api.company.guider().then(response => {
        dispatch(actFetchGuidersSuccess(response.data));
    }).catch(error => {
        dispatch(actFetchGuidersFail());
    });
}

export const getGuiderForCreateUserAction = () => dispatch => {
    dispatch(actFetchGuiders())
    return api.guider.getGuiderForCreateUser().then(response => {
        dispatch(actFetchGuidersSuccess(response.data));
    }).catch(error => {
        dispatch(actFetchGuidersFail());
    });
}

export const getGuiderManagerAction = () => dispatch => {
    dispatch(actFetchGuiders())
    return api.guider.getManager().then(response => {
        dispatch(actFetchGuidersSuccess(response.data));
    }).catch(error => {
        dispatch(actFetchGuidersFail());
    });
}

export const actAddGuider = () => {
    return {
        type : ADD_GUIDER,
    }
}

export const actAddGuiderSuccess = guider => {
    return {
        type : ADD_GUIDER_SUCCESS,
        guider
    }
}

export const actAddGuiderFail = () => {
    return {
        type : ADD_GUIDER_FAIL,
    }
}

export const create = (guider) => dispatch => {
    dispatch(actAddGuider())
    return api.company.guiderAdd(guider).then(response => {
        dispatch(actAddGuiderSuccess(response.data))
        return Promise.resolve(response.data);
    })
    .catch(error => {
        dispatch(actAddGuiderFail())
        return Promise.reject(error.response);
    })
}

export const actDeleteGuider = () => {
    return {
        type : DELETE_GUIDER,
    }
}

export const actDeleteGuiderSuccess = (id) => {
    return {
        type : DELETE_GUIDER_SUCCESS,
        id
    }
}

export const actDeleteGuiderFail = () => {
    return {
        type : DELETE_GUIDER_FAIL,
    }
}

export const deleteGuider = (id) => dispatch => {
    dispatch(actDeleteGuider())
    api.company.guiderDelete(id).then(response => {
        dispatch(actDeleteGuiderSuccess(id));
    }).catch(error => {
        dispatch(actDeleteGuiderFail(id));
    })
}

export const actGetGuider = () => {
    return {
        type : EDIT_GUIDER,
    }
}

export const actGetGuiderSuccess = data => {
    return {
        type : EDIT_GUIDER_SUCCESS,
        data
    }
}

export const actGetGuiderFail = () => {
    return {
        type : EDIT_GUIDER_FAIL,
    }
}

export const getGuiderById = id => dispatch => {
    dispatch(actGetGuider())
    api.company.getGuiderId(id).then(response => {
        dispatch(actGetGuiderSuccess(response.data));
    }).catch(error => {
        dispatch(actGetGuiderFail())
    })
}

export const edit = (guider,id) => dispatch =>
    api.company.guiderEdit(guider,id).then(response => {
        dispatch(actUpdateGuider(response.data.data));
        return response
    })

export const actUpdateGuider = (guider) => {
    return {
        type : UPDATE_GUIDER,
        guider
    }
}

export const getCompanyGuiderAction = () => dispatch =>
    api.company.getGuiderQrcode1().then(response => {
        dispatch(actFetchGuidersSuccess(response.data));
    });
