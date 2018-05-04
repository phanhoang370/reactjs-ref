/**
 * First we will load all of this project's JavaScript dependencies which
 * includes React and other helpers. It's a great starting point while
 * building robust, powerful web applications using React + Laravel.
 */



require('./bootstrap');

/**
 * Next, we will create a fresh React component instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */
import React from 'react'
import {render} from 'react-dom'
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {Provider} from 'react-redux'
import App from './containers/App'
import ConfigureStore from './store'
import en from "react-intl/locale-data/en";
import ko from "react-intl/locale-data/ko";
import vi from "react-intl/locale-data/vi";
import setAuthorizationHeader from './utils/setAuthorizationHeader'
import ConnectedIntlProvider from './ConnectedIntlProvider'
import {userLoggedIn} from './actions/auth'
import {addLocaleData} from "react-intl";
import {setLocale} from "./actions/locale";
import UserRoute from "./routes/UserRoute";
import GuestRoute from "./routes/GuestRoute";
import LoginPage from './containers/LoginPage'
import HomePageContainer from './containers/HomePageContainer'
import Qrcode1ListContainer from './containers/Qrcode1ListContainer'
import QrcodeGenerationContainer from './containers/QrcodeGenerationContainer'
import Qrcode2GenerationContainer from './containers/Qrcode2GenerationContainer'
import CompanyInformationContainer from './containers/CompanyInformationContainer'
import CreateStoreContainer from './containers/CreateStoreContainer'
import StoreListContainer from './containers/StoreListContainer'
import EditStoreContainer from './containers/EditStoreContainer'
import Dashboard from './components/dashboard/Dashboard'
import CompanyListContainer from './containers/CompanyListContainer'
import CreateCompanyContainer from './containers/CreateCompanyContainer'
import EditCompanyContainer from './containers/EditCompanyContainer'
import AddGuiderContainer from './containers/AddGuiderContainer'
import GuiderListContainer from './containers/GuiderListContainer'
import QrcodePrintContainer from './containers/QrcodePrintContainer'
import Qrcode2PrintContainer from './containers/Qrcode2PrintContainer'
import EditGuiderContainer from "./containers/EditGuiderContainer";
import ReportCompanyContainer from "./containers/ReportCompanyContainer";
import RoleListContainer from "./containers/RoleListContainer";
import CreateRoleContainer from "./containers/CreateRoleContainer";
import EditRoleContainer from "./containers/EditRoleContainer";
import UserListContainer from "./containers/UserListContainer";
import CreateUserContainer from "./containers/CreateUserContainer";
import EditUserContainer from "./containers/EditUserContainer";
import PageNotFound from './components/Errors/PageNotFound'
import TravelerStoreListContainer from './containers/TravelerListStoreContainer'
import ReportGuiderStoreContainer from './containers/ReportGuiderStoreContainer'
import ReportCompanyStoreContainer from './containers/ReportCompanyStoreContainer'
import ReportCompanyGuiderContainer from './containers/ReportCompanyGuiderContainer'
import PasswordResetLinkContainer from './containers/PasswordResetLinkContainer'
import PasswordResetContainer from './containers/PasswordResetContainer'
import PolicyCompanyContainer from './containers/PolicyCompanyContainer'
import api from "./api";

addLocaleData([...en, ...ko, ...vi])

const store = ConfigureStore();

function getData(){
   const res = api.user.getPermission()
   return res;
}

if (localStorage.lang) {
    store.dispatch(setLocale(localStorage.lang));
} else {
    store.dispatch(setLocale('en'));
}

const lang = localStorage.lang

if (localStorage.tk) {
    setAuthorizationHeader(localStorage.tk);

    getData().then(response => {
        const data = {
            token: localStorage.tk,
            user: response.data.data.user,
        }
        store.dispatch(userLoggedIn(data));
        renderApp();
    })
    .catch(() => {
        localStorage.removeItem('tk');
        setAuthorizationHeader();
        renderApp();
    })
} else {
    renderApp();
}

function renderApp() {
    return render(
        <Provider store={store}>
            <ConnectedIntlProvider>
                <BrowserRouter>
                    <div>
                        <Route path="/login" exact component={LoginPage}/>
                        <App lang={lang}>
                            <Switch>
                                <Route path="/password/reset" exact component={PasswordResetLinkContainer}/>
                                <Route path="/password/reset/:token" exact component={PasswordResetContainer}/>
                                <UserRoute location={location} path="/" exact component={HomePageContainer}/>
                                <Route location={location} path="/traveller/list-store" exact component={TravelerStoreListContainer}/>
                                <UserRoute location={location} path="/dashboard/qrcode" exact component={Qrcode1ListContainer} role={'company'}/>
                                <UserRoute location={location} path="/dashboard/qrcode/generation" exact component={QrcodeGenerationContainer} role={'company'}/>
                                <UserRoute location={location} path="/dashboard/qrcode/:serial/print" exact component={QrcodePrintContainer} role={'company'}/>
                                <UserRoute location={location} path="/dashboard/qrcode/generation/qrcode2" exact component={Qrcode2GenerationContainer} role={'company'}/>
                                <UserRoute location={location} path="/dashboard/qrcode/print/qrcode2" exact component={Qrcode2PrintContainer} role={'company'}/>

                                <UserRoute location={location} path="/dashboard/guider" exact component={GuiderListContainer} role={'company'} permission={'guider-view'}/>
                                <UserRoute location={location} path="/dashboard/guider/create" exact component={AddGuiderContainer} role={'company'} permission={'guider-create'}/>
                                <UserRoute location={location} path="/dashboard/guider/edit/:id" exact component={EditGuiderContainer} role={'company'} permission={'guider-edit'}/>

                                <UserRoute location={location} path="/dashboard/company" exact component={CompanyListContainer} role={['primarynet', 'company']}/>
                                <UserRoute location={location} path="/dashboard/company/create" exact component={CreateCompanyContainer} role={['primarynet', 'company']}/>
                                <UserRoute location={location} path="/dashboard/company/edit/:id" exact component={EditCompanyContainer} role={['primarynet', 'company']}/>
                                <UserRoute location={location} path="/dashboard/company/policy" exact component={PolicyCompanyContainer} role={'company'}/>

                                {/*<UserRoute location={location} path="/dashboard/list-store" exact component={ListStoreContainer}/>*/}
                                {/*<UserRoute path="/dashboard/city" exact component={CityListContainer}/>*/}
                                {/*<UserRoute path="/dashboard/city/create" exact component={CreateCityContainer}/>*/}
                                {/*<UserRoute path="/dashboard/country" exact component={CountryListContainer}/>*/}
                                {/*<UserRoute path="/dashboard/country/create" exact component={CreateCountryContainer}/>*/}
                                <UserRoute path="/dashboard/report/company-store" exact component={ReportCompanyStoreContainer} role={'company'}/>
                                <UserRoute path="/dashboard/report/company-guide" exact component={ReportCompanyGuiderContainer} role={'company'}/>
                                <UserRoute path="/dashboard/report" exact component={ReportGuiderStoreContainer} role={'company'}/>

                                <UserRoute location={location} path="/dashboard/store/register" exact component={CreateStoreContainer} role={'company'} permission={'store-create'}/>
                                <UserRoute location={location} path="/dashboard/store" exact component={StoreListContainer} role={'company'} permission={'store-view'}/>
                                <UserRoute location={location} path="/dashboard/store/edit/:id" exact component={EditStoreContainer} role={'company'} permission={'store-edit'}/>

                                <UserRoute location={location} path="/dashboard/role" exact component={RoleListContainer} role={'primarynet'} permission={'role-view'}/>
                                <UserRoute location={location} path="/dashboard/role/create" exact component={CreateRoleContainer} role={'primarynet'} permission={'role-create'}/>
                                <UserRoute location={location} path="/dashboard/role/edit/:id" exact component={EditRoleContainer} role={'primarynet'} permission={'role-edit'}/>

                                <UserRoute location={location} path="/dashboard/user" exact component={UserListContainer} permission={'user-view'}/>
                                <UserRoute location={location} path="/dashboard/user/create" exact component={CreateUserContainer} permission={'user-create'}/>
                                <UserRoute location={location} path="/dashboard/user/edit/:id" exact component={EditUserContainer} permission={'user-edit'}/>

                                <Route location={location} exact component={PageNotFound}/>

                            </Switch>
                        </App>
                    </div>
                </BrowserRouter>
            </ConnectedIntlProvider>
        </Provider>,
        document.getElementById('root')
    )    
}
