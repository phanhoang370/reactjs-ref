import * as Types from "../constants/types";

var findIndex = (qrcode, id) => {
    var result = -1;
    qrcode.forEach((qrcode, index) => {
        if (qrcode.id === id) {
            result = index;
        }
    });
    return result;
}

const qrcode = (state = {}, action = {}) => {
    var index = -1;
    var { id, qrcode } = action;
    switch (action.type) {
        case Types.FETCH_QRCODES:
            state = action.qrcodes;
            return state;
        case Types.DELETE_QRCODE:
            index = findIndex(state, id);
            state.splice(index, 1);
            return [...state];
        case Types.ADD_QRCODE:
            return action.qrcode;
        case Types.UPDATE_QRCODE:
            index = findIndex(state, qrcode.id);
            state[index] = qrcode
            return [...state];
        case Types.PRINT_QRCODE:
            return {
                ...state,
                loading: true,
                error: false
            }
        case Types.PRINT_QRCODE_SUCCESS:
            return {
                ...state,
                data: action.data.data,
                loading: false,
                error: false
            }
        case Types.PRINT_QRCODE_FAIL:
            return {
                ...state,
                loading: false,
                error: true
            }
        default: return [...state];
    }
};

export default qrcode;
