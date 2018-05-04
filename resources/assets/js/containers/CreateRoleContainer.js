import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import CreateRoleComponent from '../components/role/Create'
import { createRoleAction } from '../actions/role'
import { fetchPermissionAction } from '../actions/permission'

class CreateRoleContainer extends React.Component {
  componentDidMount() {
    this.props.getAllPermission();
  }

  submit = data =>
    this.props.create(data).then(() => this.props.history.push("/dashboard/role"));

  render() {
    const { permissions } = this.props;

    return (
      <CreateRoleComponent 
        submit={this.submit}
        permissions={permissions}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    permissions: state.permissions
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getAllPermission: () => dispatch(fetchPermissionAction()),
    create: data => dispatch(createRoleAction(data))
  }
}

CreateRoleContainer.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  create: PropTypes.func.isRequired,
  getAllPermission: PropTypes.func.isRequired,
  permissions: PropTypes.shape({
    data: PropTypes.array.isRequired
  }).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateRoleContainer);
