import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'
import PageNotFound from './../components/Errors/PageNotFound'
import { hasRole, hasPermission } from './../utils/entrust'

const UserRoute = ({ isAuthenticated, auth, component: Component, ...rest }) => {

  if (!isAuthenticated) {
    return <Route
      {...rest}
      render={props => <Redirect to="/login" />}
    />
  }

  const role = !rest.role || (rest.role && hasRole(auth.user, rest.role))
  const permission = !rest.permission || (rest.permission && hasPermission(auth.user, rest.permission))

  if (!role || !permission) {
    return (
      <Route
        {...rest}
        render={props => <PageNotFound {...props} />}
      />
    )
  }

  return (
    <Route
      {...rest}
      render={props => <Component {...props} />}
    />
  )
}

UserRoute.propTypes = {
  component: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
}

const mapStateToProps = state => {
  return {
    isAuthenticated: !!state.auth.token,
    auth: state.auth
  }
}

export default connect(mapStateToProps)(UserRoute);
