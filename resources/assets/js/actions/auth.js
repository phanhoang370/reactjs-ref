import {USER_LOGGED_IN, USER_LOGGED_OUT} from "../constants/types";
import api from "../api";
import setAuthorizationHeader from "../utils/setAuthorizationHeader";

export const userLoggedIn = user => ({
    type: USER_LOGGED_IN,
    user
});

export const userLoggedOut = () => ({
    type: USER_LOGGED_OUT
});

export const login = credentials => dispatch =>
    api.user.login(credentials).then(response => {
        localStorage.setItem('tk', response.data.data.token);
        // localStorage.setItem('user', JSON.stringify(response.data.data.user));
        setAuthorizationHeader(response.data.data.token);
        dispatch(userLoggedIn(response.data.data));
        return response;
    });

export const logout = () => dispatch => {
    api.user.logout().then(response => {
        localStorage.removeItem('tk');
        setAuthorizationHeader();
        dispatch(userLoggedOut());
    }).catch(error => {
        localStorage.removeItem('tk');
        setAuthorizationHeader();
        dispatch(userLoggedOut());
    });
};

export const confirm = token => dispatch =>
    api.user.confirm(token).then(user => {
        localStorage.tk = user.token;
        dispatch(userLoggedIn(user));
    });

export const resetPasswordRequest = ({email}) => () =>
    api.user.resetPasswordRequest(email);

export const validateToken = token => () => api.user.validateToken(token);

export const resetPasswordLinkAction = data => () => 
    api.user.resetPasswordLink(data)
    .then(response => response.data)
    .catch(error => Promise.reject(error.response))

export const resetPasswordAction = data => () => 
    api.user.resetPassword(data)
    .then(response => response.data)
    .catch(error => Promise.reject(error.response))

export const getUserResetPasswordAction = token => () => 
    api.user.getUserResetPassword(token)
    .then(response => Promise.resolve(response.data))
    .catch(error => Promise.reject(error.response))
