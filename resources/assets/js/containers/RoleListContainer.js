import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import RoleListComponent from "../components/role/List";
import { fetchRoleAction, deleteRoleAction } from './../actions/role'

function addIdToObjectArray(data) {
    return data.map(function(item, index) {
        if (!item.id) {
            item.id = index;
        }
        
        return item;
    })
}

class RoleListContainer extends React.Component {
    componentDidMount() {
        this.props.fetchAllRole();
    }

    deleteRole = id => 
        this.props.deleteRole(id);

    render() {
        const { roles, history, deleteRole } = this.props;

        const newRoles = addIdToObjectArray(roles.data);

        return (
            <RoleListComponent
                roles={newRoles}
                history={history}
                deleteRole={this.deleteRole}
            />
        );
    }
}

const mapStateToProps = (state) => {
    return {
        roles: state.roles,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchAllRole: () => dispatch(fetchRoleAction()),
        deleteRole: id => dispatch(deleteRoleAction(id)),
    }
}

RoleListContainer.propTypes = {
    fetchAllRole: PropTypes.func.isRequired,
    deleteRole: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(RoleListContainer);
