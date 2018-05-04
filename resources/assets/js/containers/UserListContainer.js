import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import UserListComponent from "../components/user/List";
import { fetchUserAction, deleteUserAction } from './../actions/user'

function addIdToObjectArray(data) {
    return data.map(function(item, index) {
        if (!item.id) {
            item.id = index;
        }
        
        return item;
    })
}

class UserListContainer extends React.Component {
    componentDidMount() {
        this.props.fetchAllUser();
    }

    deleteUser = id => 
        this.props.deleteUser(id);

    render() {
        const { users, history, deleteUser } = this.props;

        const newUsers = addIdToObjectArray(users.data);

        return (
            <UserListComponent
                users={newUsers}
                history={history}
                deleteUser={this.deleteUser}
            />
        );
    }
}

const mapStateToProps = (state) => {
    return {
        users: state.users,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchAllUser: () => dispatch(fetchUserAction()),
        deleteUser: id => dispatch(deleteUserAction(id)),
    }
}

UserListContainer.propTypes = {
    fetchAllUser: PropTypes.func.isRequired,
    deleteUser: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserListContainer);
