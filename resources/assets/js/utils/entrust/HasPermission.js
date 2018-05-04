import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { hasPermission } from './../entrust'

class HasPermission extends React.Component {

  render() {
    const { auth: { user }, permission } = this.props

    if(hasPermission(user, permission)) {
      return (
        <React.Fragment>
          {this.props.children}
        </React.Fragment>
      )
    }

    return null;
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  }
}

HasPermission.propTypes = {
}

export default connect(mapStateToProps, null)(HasPermission);
