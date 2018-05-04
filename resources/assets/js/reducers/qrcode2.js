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
            return action.qrcode.data;
        case Types.UPDATE_QRCODE:
            index = findIndex(state, qrcode.id);
            state[index] = qrcode
            return [...state];
        default: return [...state];
    }
};

export default qrcode;