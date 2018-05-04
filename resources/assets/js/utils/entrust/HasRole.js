import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { hasRole } from './../entrust'

class HasRole extends React.Component {

  render() {
    const { auth: { user }, role } = this.props

    if(hasRole(user, role)) {
      return (
        <React.Fragment>
          {this.props.children}
        </React.Fragment>
      )
    }

    return null
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  }
}

HasRole.propTypes = {
}

export default connect(mapStateToProps, null)(HasRole);
