import * as Types from './../constants/types';

var initialState = {};

const itemEditing = (state = initialState, action) => {
    switch(action.type){
        case Types.EDIT_GUIDER:
            return action.guider;
        default:
            return state;
    }
}

export default itemEditing;