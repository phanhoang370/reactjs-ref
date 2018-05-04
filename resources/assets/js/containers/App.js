import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { setLocale } from "../actions/locale";
import { logout } from "../actions/auth";
import Header from './../components/Header'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'
import './App.css'

const drawerWidth = 240;

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    appFrame: {
        height: '100%',
        zIndex: 1,
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        width: '100%',
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing.unit * 3,
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    'content-left': {
        marginLeft: -drawerWidth,
    },
    'content-right': {
        marginRight: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    'contentShift-left': {
        marginLeft: 0,
    },
    'contentShift-right': {
        marginRight: 0,
    },
});

class App extends React.Component {
    state = {
        anchor: 'left',
        open: false,
    };

    handleLogout = () => {
        this.props.logout();
    };

    handleSetLocale = locale => {
        this.props.setLocale(locale);
        // this.context.history.push("/login");
    };

    render() {
        const { isAuthenticated, auth, lang } = this.props;

        return (
            <div>
                {this.props.location.pathname !== '/login' ? (
                    <div id='wrap' className='container-fluid'>
                        <div className='row'>
                            <div className='hidden-md-up col-sm-12 col-md-12 col-lg-2 p-0'>
                                <aside className="content-root-left">
                                        <Link to={"/"}>
                                    <h1>
                                            <img src="/common/images/trip_logo.png" width="150" height="39" alt=""/>
                                    </h1>
                                        </Link>
                                    <div className="ontrip-img">
                                        <p>Travel agency
                                            settlement systems
                                            and discount cards</p>
                                        <div><img src="/common/images/left_img.png" width="244" height="246" alt=""/>
                                        </div>
                                    </div>
                                </aside>
                            </div>
                            <div className='main-container col-sm-12 col-md-12 col-lg-10 p-0'>
                                <Header
                                    isAuthenticated={isAuthenticated}
                                    setLocale={this.handleSetLocale}
                                    logout={this.handleLogout}
                                    auth={auth}
                                    lang={lang}
                                />
                                {this.props.children}
                            </div>
                        </div>
                    </div>
                ) : null}
            </div>
        );
    }
}

App.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    setLocale: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
    lang: PropTypes.string.isRequired,
};

function mapStateToProps(state) {
    return {
        isAuthenticated: !!state.auth.token,
        lang: state.locale.lang,
        auth: state.auth
    };
}

export default withRouter(connect(mapStateToProps, {setLocale, logout})(App));
