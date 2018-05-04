import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import EditRoleFrom from "../forms/user/EditFrom";
import {FormattedMessage} from "react-intl"

class CreateRoleComponent extends React.Component {
    submit = (id, data) =>
        this.props.submit(id, data)

    submitResetPassword = (id, data) =>
        this.props.submitResetPassword(id, data)

    render() {
        const { roles, user, resetPassword, companies, guiders, stores } = this.props;

        return (
            <div className='company-add guider-add'>
                <h2 className='title-guider-add'>
                    <i className="fa fa-plane" aria-hidden="true"></i><FormattedMessage
                    id='dashboard.user.edit'
                    defaultMessage='User Edit'
                />
                </h2>
                <div className="main-form">
                    <EditRoleFrom
                        submit={this.submit}
                        submitResetPassword={this.submitResetPassword}
                        roles={roles}
                        user={user}
                        resetPassword={resetPassword}
                        companies={companies}
                        guiders={guiders}
                        stores={stores}
                    />
                </div>
            </div>
        );
    }
}

CreateRoleComponent.propTypes = {
    submit: PropTypes.func.isRequired,
    submitResetPassword: PropTypes.func.isRequired,
    roles: PropTypes.shape({
        data: PropTypes.array.isRequired
    }).isRequired,
    user: PropTypes.shape({
        data: PropTypes.object.isRequired
    }).isRequired,
    companies: PropTypes.shape({
        data: PropTypes.array.isRequired
    }),
    guiders: PropTypes.shape({
        data: PropTypes.array.isRequired
    }),
    stores: PropTypes.shape({
        data: PropTypes.array.isRequired
    }),
};

export default CreateRoleComponent;
