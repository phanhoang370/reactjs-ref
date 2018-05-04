import React from 'react';
import './header.css';
import {NavLink} from 'react-router-dom'
import PropTypes from 'prop-types';
import { FormattedMessage } from "react-intl"
import HasPermission from './../../utils/entrust/HasPermission'
import HasRole from './../../utils/entrust/HasRole'

class Header extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            visible: false
        };

        this.toggleMenu = this.toggleMenu.bind(this);
    }

    toggleMenu() {
        this.setState({visible: !this.state.visible})
    }

    handleLoginLink = () => {
        this.context.history.push("/login");
    };

    handleLogout = () => {
        this.props.logout();
    };


    onSetLocale = event => {
        this.props.setLocale(event.target.value);
    };
    checklang = () => {
        if (this.props.lang === 'vi') {
            return 'flag-icon flag-icon-vn';
        } else if (this.props.lang === 'ko') {
            return 'flag-icon flag-icon-kr';
        } else {
            return 'flag-icon flag-icon-us';
        }
    }

    render() {
        const { isAuthenticated, auth: {user}, lang } = this.props

        return (
            <div className="header">
                <header>

                    <nav className="navbar-expand-xl navbar-light">
                        <button
                            className="navbar-toggler"
                            type="button"
                            data-toggle="collapse"
                            data-target="#navbarSupportedContent"
                            aria-controls="navbarSupportedContent"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                            onClick={this.toggleMenu}
                        >
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div
                            className={this.state.visible ? "collapse navbar-collapse display-block" : "collapse navbar-collapse display-nones"}
                            id="navbarSupportedContent">
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item qrcode-menu">
                                    <NavLink  exact activeClassName="active"  to="/">
                                        <i className="fa fa-home" aria-hidden="true"></i>
                                        <FormattedMessage
                                            id='dashboard.home'
                                            defaultMessage='Home'
                                        />
                                    </NavLink>
                                </li>
                                <HasPermission permission={['company-view', 'company-create']}>
                                    <li className="nav-item qrcode-menu">
                                        <NavLink activeClassName="active" to="/dashboard/company">
                                            <i className="fa fa-plane" aria-hidden="true"></i>
                                            <FormattedMessage
                                                id='dashboard.company'
                                                defaultMessage='Travel agency'
                                            />
                                        </NavLink>
                                        <ul className="submenu">
                                            <HasPermission permission={'company-view'}>
                                                <li>
                                                    <NavLink
                                                        exact
                                                        to="/dashboard/company">
                                                        <FormattedMessage
                                                            id='dashboard.company.list'
                                                            defaultMessage='List company'
                                                        />
                                                    </NavLink>
                                                </li>
                                            </HasPermission>
                                            <HasPermission permission={'company-create'}>
                                                <li>
                                                    <NavLink
                                                        exact
                                                        to="/dashboard/company/create">
                                                        <FormattedMessage
                                                            id='dashboard.company.title.info'
                                                            defaultMessage='Create company'
                                                        />
                                                    </NavLink>
                                                </li>
                                            </HasPermission>
                                        </ul>
                                    </li>
                                </HasPermission>
                                <HasRole role={'company'}>
                                    <HasPermission permission={['store-view', 'store-create']}>
                                        <li className="nav-item qrcode-menu">
                                            <NavLink to="/dashboard/store">
                                                <i className="fa fa-cart-arrow-down" aria-hidden="true"></i>
                                                <FormattedMessage id='dashboard.store' defaultMessage='Stores'/>
                                            </NavLink>
                                            <ul className="submenu">
                                                <HasPermission permission={'store-view'}>
                                                    <li>
                                                        <NavLink
                                                            exact
                                                            to="/dashboard/store/">
                                                            <FormattedMessage
                                                                id='dashboard.store.list'
                                                                defaultMessage='List Store'
                                                            />
                                                        </NavLink>
                                                    </li>
                                                </HasPermission>
                                                <HasPermission permission={'store-create'}>
                                                    <li>
                                                        <NavLink
                                                            exact
                                                            to="/dashboard/store/register">
                                                            <FormattedMessage
                                                                id='dashboard.store.registration'
                                                                defaultMessage='Store registration'
                                                            />
                                                        </NavLink>
                                                    </li>
                                                </HasPermission>
                                            </ul>
                                        </li>
                                    </HasPermission>
                                </HasRole>
                                <HasRole role={'company'}>
                                    <HasPermission permission={['guider-view', 'guider-create']}>
                                        <li className="nav-item qrcode-menu">
                                            <NavLink activeClassName="active" to="/dashboard/guider">
                                                <i className="fa fa-address-card" aria-hidden="true"></i>
                                                <FormattedMessage
                                                    id='dashboard.guider'
                                                    defaultMessage='Guide'
                                                />
                                            </NavLink>
                                            <ul className="submenu">
                                                <HasPermission permission={'guider-view'}>
                                                    <li>
                                                        <NavLink
                                                            exact
                                                            to="/dashboard/guider">
                                                            <FormattedMessage
                                                                id='dashboard.guider.list'
                                                                defaultMessage='List guider'
                                                            />
                                                        </NavLink>
                                                    </li>
                                                </HasPermission>
                                                <HasPermission permission={'guider-create'}>
                                                    <li>
                                                        <NavLink
                                                            exact
                                                            to="/dashboard/guider/create">
                                                            <FormattedMessage
                                                                id='dashboard.guider.register'
                                                                defaultMessage='Guider registration'
                                                            />
                                                        </NavLink>
                                                    </li>
                                                </HasPermission>
                                            </ul>
                                        </li>
                                    </HasPermission>
                                </HasRole>
                                <HasRole role={'company'}>
                                    <li className="nav-item qrcode-menu">
                                        <NavLink activeClassName="active" to="/dashboard/qrcode">
                                            <i
                                                className="fa fa-qrcode"
                                                aria-hidden="true"
                                            ></i>
                                            <FormattedMessage
                                                id='dashboard.qrcode'
                                                defaultMessage='QR code generation and output'
                                            />
                                        </NavLink>
                                        <ul className="submenu">
                                            <li>
                                                <NavLink
                                                    exact
                                                    to="/dashboard/qrcode">
                                                    <FormattedMessage
                                                        id='dashboard.qrcode.list'
                                                        defaultMessage='QR code List'
                                                    />
                                                </NavLink>
                                            </li>
                                            <li>
                                                <NavLink
                                                    exact
                                                    to="/dashboard/qrcode/generation">
                                                    <FormattedMessage
                                                        id='dashboard.qrcode1'
                                                        defaultMessage='QR code 1 generation and output'
                                                    />
                                                </NavLink>
                                            </li>
                                            {/*<li>*/}
                                                {/*<NavLink*/}
                                                    {/*exact*/}
                                                    {/*to="/dashboard/qrcode/generation/qrcode2">*/}
                                                    {/*<FormattedMessage*/}
                                                        {/*id='dashboard.qrcode2'*/}
                                                        {/*defaultMessage='QR code 2 generation and output'*/}
                                                    {/*/>*/}
                                                {/*</NavLink>*/}
                                            {/*</li>*/}
                                        </ul>
                                    </li>
                                </HasRole>
                                <HasRole role={'company'}>
                                    <li className="nav-item qrcode-menu">
                                        <NavLink activeClassName="active" to="/dashboard/report">
                                            <i className="fa fa-pie-chart" aria-hidden="true"></i>
                                            <FormattedMessage id='dashboard.report' defaultMessage='Report'/>
                                        </NavLink>
                                        <ul className="submenu">
                                            <li>
                                                <NavLink
                                                    exact
                                                    to="/dashboard/report/company-store"
                                                >
                                                    <FormattedMessage
                                                        id='dashboard.report.store'
                                                        defaultMessage='Report Store'
                                                    />
                                                </NavLink>
                                            </li>
                                            <li>
                                                <NavLink
                                                    exact
                                                    to="/dashboard/report/company-guide"
                                                >
                                                    <FormattedMessage
                                                        id='dashboard.report.time'
                                                        defaultMessage='Report by Mouth, Year'
                                                    />
                                                </NavLink>
                                            </li>
                                        </ul>
                                    </li>
                                    <li className="nav-item qrcode-menu">
                                        <NavLink activeClassName="active" to="/dashboard/company">
                                            <i className="fa fa-pie-chart" aria-hidden="true"></i>
                                            <FormattedMessage id='dashboard.company' defaultMessage='Company'/>
                                        </NavLink>
                                        <ul className="submenu">
                                            <li>
                                                <NavLink activeClassName="active" to="/dashboard/company/policy">
                                                    <FormattedMessage
                                                        id='dashboard.company.policy'
                                                        defaultMessage='Company policy'
                                                    />
                                                </NavLink>
                                            </li>
                                            <li>
                                                <NavLink
                                                    exact
                                                    to="/dashboard/company">
                                                    <FormattedMessage
                                                        id='dashboard.company.list'
                                                        defaultMessage='List company'
                                                    />
                                                </NavLink>
                                            </li>
                                            <li>
                                                <NavLink
                                                    exact
                                                    to="/dashboard/company/create">
                                                    <FormattedMessage
                                                        id='dashboard.company.title.info'
                                                        defaultMessage='Create company'
                                                    />
                                                </NavLink>
                                            </li>
                                        </ul>
                                    </li>
                                </HasRole>
                                {isAuthenticated && (
                                    <li className="nav-item qrcode-menu">
                                        <NavLink
                                            activeClassName="active"
                                            to="/dashboard/user"
                                        >
                                            <i
                                                className="fa fa-user"
                                                aria-hidden="true"
                                            >
                                            </i>
                                            <FormattedMessage
                                                id='dashboard.user'
                                                defaultMessage='User'
                                            />
                                        </NavLink>

                                        <ul className="submenu">
                                            <li>
                                                <NavLink
                                                    exact
                                                    to="/dashboard/user"
                                                >
                                                    <FormattedMessage
                                                        id='dashboard.user.list'
                                                        defaultMessage='User List'
                                                    />
                                                </NavLink>

                                            </li>
                                            <li>
                                                <NavLink
                                                    exact
                                                    to="/dashboard/user/create"
                                                >
                                                    <FormattedMessage
                                                        id='dashboard.user.create'
                                                        defaultMessage='User create'
                                                    />
                                                </NavLink>
                                            </li>
                                        </ul>
                                    </li>
                                )}
                                {/*<HasRole role={'primarynet'}>*/}
                                    {/*<li className="nav-item qrcode-menu">*/}
                                        {/*<NavLink activeClassName="active" to="/dashboard/role">*/}
                                            {/*<i*/}
                                                {/*className="fa fa-users"*/}
                                                {/*aria-hidden="true"*/}
                                            {/*></i>*/}
                                            {/*<FormattedMessage*/}
                                                {/*id='dashboard.role'*/}
                                                {/*defaultMessage='Role'*/}
                                            {/*/>*/}
                                        {/*</NavLink>*/}
                                        {/*<ul className="submenu">*/}
                                            {/*<li>*/}
                                                {/*<NavLink*/}
                                                    {/*exact*/}
                                                    {/*to="/dashboard/role"*/}
                                                {/*>*/}
                                                    {/*<FormattedMessage*/}
                                                        {/*id='dashboard.role.list'*/}
                                                        {/*defaultMessage='Role List'*/}
                                                    {/*/>*/}
                                                {/*</NavLink>*/}

                                            {/*</li>*/}
                                            {/*<li>*/}
                                                {/*<NavLink*/}
                                                    {/*exact*/}
                                                    {/*to="/dashboard/role/create"*/}
                                                {/*>*/}
                                                    {/*<FormattedMessage*/}
                                                        {/*id='dashboard.role.create'*/}
                                                        {/*defaultMessage='Role create'*/}
                                                    {/*/>*/}
                                                {/*</NavLink>*/}
                                            {/*</li>*/}
                                        {/*</ul>*/}
                                    {/*</li>*/}
                                {/*</HasRole>*/}
                                <HasRole role={'primarynet'}>
                                    <li>
                                        <NavLink activeClassName="active" to="/dashboard/admin/report">
                                            <i
                                                className="fa fa-pie-chart"
                                                aria-hidden="true"
                                            >
                                            </i>
                                            <FormattedMessage
                                                id='dashboard.report'
                                                defaultMessage='Report'
                                            />
                                        </NavLink>
                                    </li>
                                </HasRole>
                                <HasRole role={'company'}>
                                    <li>
                                        <NavLink activeClassName="active" to="/traveller/list-store">
                                            <FormattedMessage
                                                id='dashboard.store.traveler.list'
                                                defaultMessage='List store for traveler'
                                            />
                                        </NavLink>
                                    </li>
                                </HasRole>
                                <HasRole role={'guider'}>
                                    <li>
                                        <NavLink activeClassName="active" to="/dashboard/send-qrcode">
                                            <i
                                                className="fa fa-plane"
                                                aria-hidden="true"
                                            >
                                            </i>
                                            여행사정보
                                        </NavLink>
                                    </li>
                                </HasRole>
                                <HasRole role={'store'}>
                                    <li>
                                        <NavLink activeClassName="active" to="/dashboard/store/register-payment">
                                            <i className="fa fa-plane" aria-hidden="true"></i>
                                            <FormattedMessage
                                                id='dashboard.agency.info'
                                                defaultMessage='Travel agency information'
                                            />
                                        </NavLink>
                                    </li>
                                </HasRole>
                                <HasRole role={'store'}>
                                    <li>
                                        <NavLink activeClassName="active" to="/dashboard/store/report">
                                            <i className="fa fa-pie-chart" aria-hidden="true"></i>
                                            <FormattedMessage
                                                id='dashboard.report'
                                                defaultMessage='Report'
                                            />
                                        </NavLink>
                                    </li>
                                </HasRole>
                            </ul>

                            <form className="form-inline my-lg-0 main-language">
                                <span className={this.checklang()}></span>
                                <select
                                    className="selectpicker select-language form-control"
                                    value={lang}
                                    onChange={this.onSetLocale}
                                >
                                    <option key={1} value='vi' name='vi'> Viet nam</option>
                                    <option key={2} value='ko' name='ko'> Korea</option>
                                    <option key={3} value='en' name='en'> English</option>
                                </select>
                                {
                                    !isAuthenticated ? (
                                        <div className="login" id="login-action">
                                            <NavLink activeClassName="active" to="/login">
                                                <i className="fa fa-sign-in"></i>
                                            </NavLink>
                                        </div>
                                    ) : (
                                        <div className="login" onClick={this.handleLogout}>
                                            <i className="fa fa-power-off"></i>
                                        </div>
                                    )
                                }
                            </form>
                        </div>
                    </nav>
                </header>
            </div>
        )
    }
}

Header.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    setLocale: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object,
};

export default Header
