import {combineReducers} from 'redux';

import user from './reducers/user';
import users from './reducers/users';
import locale from './reducers/locale';
import guiders from './reducers/guiders';
import guider from './reducers/guider';
import cities from './reducers/cities';
import countries from './reducers/countries';
import city from './reducers/city';
import country from './reducers/country';
import companies from './reducers/companies';
import company from './reducers/company';
import stores from './reducers/stores';
import store from './reducers/store';
import storesName from './reducers/storesName';
import report from './reducers/report'
import qrcode from './reducers/qrcode'
import qrcode2 from './reducers/qrcode2'
import roles from './reducers/roles'
import role from './reducers/role'
import permissions from './reducers/permissions'
import auth from './reducers/auth'
import types from './reducers/types'
import qrcodes from './reducers/qrcodes'
import storesLocation from './reducers/storesLocation'
import resetPassword from './reducers/resetPassword'
import qrcode1Number from './reducers/qrcode1Number'

export default combineReducers({
    user,
    users,
    locale,
    guiders,
    guider,
    cities,
    countries,
    city,
    country,
    companies,
    company,
    stores,
    store,
    storesName,
    report,
    qrcode,
    qrcode2,
    roles,
    role,
    permissions,
    auth,
    types,
    qrcodes,
    storesLocation,
    resetPassword,
    qrcode1Number,
});
