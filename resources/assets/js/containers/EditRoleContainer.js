import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import EditRoleComponent from '../components/role/Edit'
import { editRoleAction, getOneRoleAction, clearRoleAction } from '../actions/role'
import { fetchPermissionAction } from '../actions/permission'
import PageNotFound from './../components/Errors/PageNotFound'

class EditRoleContainer extends React.Component {
  componentWillMount() {
    this.props.getAllPermission();
    this.props.getOneRole(this.props.match.params.id);
  }

  submit = (id, data) => 
    this.props.editRole(id, data).then(() => this.props.history.push("/dashboard/role"));

    componentWillUnmount() {
      this.props.clearRole()
    }

  render() {
    const { role, permissions } = this.props;

    if (role.error) {
      return <PageNotFound />
    }

    return (
      <EditRoleComponent
        submit={this.submit}
        permissions={permissions}
        role={role}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    role: state.role,
    permissions: state.permissions
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getOneRole: id => dispatch(getOneRoleAction(id)),
    getAllPermission: () => dispatch(fetchPermissionAction()),
    editRole: (id, data) => dispatch(editRoleAction(id, data)),
    clearRole: () => dispatch(clearRoleAction()),
  }
}

EditRoleContainer.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  getOneRole: PropTypes.func.isRequired,
  editRole: PropTypes.func.isRequired,
  getAllPermission: PropTypes.func.isRequired,
  clearRole: PropTypes.func.isRequired,
  permissions: PropTypes.shape({
    data: PropTypes.array.isRequired
  }).isRequired,
  role: PropTypes.shape({
    data: PropTypes.object.isRequired
  }).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditRoleContainer);
