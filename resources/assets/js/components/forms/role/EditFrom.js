import React from "react";
import PropTypes from "prop-types";
import Validator from "validator";
import 'react-select/dist/react-select.css';
import InlineError from './../../messages/InlineError'
import Select from 'react-select';
import {FormattedMessage} from "react-intl"
import { Link } from 'react-router-dom'
import Checkbox from './../../Checkbox'

class EditRoleFrom extends React.Component {
    state = {
        data: {
            name: '',
            display_name: '',
            description: '',
            permissions: [],
        },
        loading: false,
        errors: {},
    };

    onChange = e =>
        this.setState({
            errors: {...this.state.error, [e.target.name]: null},
            data: {...this.state.data, [e.target.name]: e.target.value}
        });

    onSubmit = () => {
        console.log(this.state.data, "is selected.");
        const errors = this.validate(this.state.data);
        this.setState({errors});
        if (Object.keys(errors).length === 0) {
            this.setState({loading: true});

            this.props
                .submit(this.state.data.role_id, this.state.data)
                    .catch(error => {
                        console.log(error.data);
                        this.setState({errors: {global: error.data}, loading: false})
                    });
        }
    };

    validate = data => {
        const errors = {};
        if (!data.name) errors.name = "Can't be blank";
        if (!data.display_name) errors.display_name = "Can't be blank";
        if (!data.description) errors.description = "Can't be blank";
        if (!data.permissions) errors.permissions = "Can't be blank";
        return errors;
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps && nextProps.role) {
            const { role } = nextProps;
            this.setState({
                data: {
                    ...this.state.data,
                    role_id: role.data.role_id || '',
                    name: role.data.name || '',
                    display_name: role.data.display_name || '',
                    description: role.data.description || '',
                    permissions: role.data.perms ? role.data.perms.map(perm => {
                        this.selectedCheckboxes.add(perm.permission_id)
                        return perm.permission_id
                    }) : [],
                }
            });
        }
    }

    componentWillMount() {
        this.selectedCheckboxes = new Set();
    };

    toggleCheckbox = permission_id => {
        if (this.selectedCheckboxes.has(permission_id)) {
            this.selectedCheckboxes.delete(permission_id);
        } else {
            this.selectedCheckboxes.add(permission_id);
        }
        this.setState({
            data: {
                ...this.state.data,
                permissions: [...this.selectedCheckboxes]
            }
        })
    };

    isChecked = () => {
        return true
    }

    createCheckbox = permission => {
        return <Checkbox
            key={permission.permission_id}
            value={permission.permission_id}
            label={permission.display_name}
            handleCheckboxChange={this.toggleCheckbox}
            checked={this.state.data.permissions.indexOf(permission.permission_id) !== -1 ? true : false}
        />
    };

    createCheckboxes = () => this.props.permissions.data.map(this.createCheckbox);

    render() {
        const { data, errors } = this.state;
        const { permissions } = this.props;

        return (
            <form onSubmit={this.onSubmit}>
                {errors.global && (
                    Object.keys(errors.global).map((value, key) =>
                        <InlineError key={key} text={errors.global[value]}/>
                    )
                )}
                <div className="form-group row name-homepage">
                    <div className="col-md-6 p-0">
                        <div className="row m-0">
                            <div className="col-md-4 plr-0-desktop plr-mb-0">
                                <label className="title-label">
                                    - <FormattedMessage
                                    id='dashboard.role.name'
                                    defaultMessage='Role Name'
                                />
                                </label>
                            </div>
                            <div className="col-md-8 p-0">
                                <input
                                    type="text"
                                    className={!errors.name ? 'form-control' : 'form-control is-invalid'}
                                    id="name"
                                    name="name"
                                    value={data.name}
                                    onChange={this.onChange}
                                />
                                {errors.name && <InlineError text={errors.name}/>}
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 p-0 mt-mb-5">
                        <div className="row m-0">
                            <div className="col-md-4 plr-0-desktop plr-mb-0">
                                <label className="title-label">
                                    - <FormattedMessage
                                    id='dashboard.role.display.name'
                                    defaultMessage='Display name'
                                />
                                </label>
                            </div>
                            <div className="col-md-8 p-0">
                                <input
                                    type="text"
                                    className={!errors.display_name ? 'form-control' : 'form-control is-invalid'}
                                    id="display_name"
                                    name="display_name"
                                    value={data.display_name}
                                    onChange={this.onChange}
                                />
                                {errors.display_name && <InlineError text={errors.display_name}/>}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="form-group row">
                    <div className="col-md-2 p-0">
                        <label className="title-label">- <FormattedMessage
                            id='dashboard.description'
                            defaultMessage='Description'
                        /></label>
                    </div>
                    <div className="col-md-10 p-0">
                        <input
                            type="text"
                            className={!errors.description ? 'form-control' : 'form-control is-invalid'}
                            id="description"
                            name="description"
                            value={data.description}
                            onChange={this.onChange}
                        />
                        {errors.description && <InlineError text={errors.description}/>}
                    </div>
                </div>
                <div className="form-group row">
                    <div className="col-md-2 p-0">
                        <label className="title-label">- <FormattedMessage
                            id='dashboard.role.rermission'
                            defaultMessage='Permission'
                        /></label>
                    </div>
                    <div className="col-md-10 p-0 scroll-permission">
                        {this.createCheckboxes()}
                        {errors.permissions && <InlineError text={errors.permissions}/>}
                    </div>
                </div>
                <div className="form-group row group-button">
                    <div className="col-md-12 p-0 text-align-center">
                        <Link
                            to={'/dashboard/role'}
                            type="button"
                            id="cancel_btn"
                            className="btn btn-sm btn-colorP"
                        >
                            <FormattedMessage
                                id='dashboard.cancel'
                                defaultMessage='Cancel'
                            />
                        </Link>
                        <button type="button" id="search_btn" className="btn btn-sm btn-colorN ml-15" onClick={this.onSubmit}>
                            <FormattedMessage
                                id='dashboard.confirm'
                                defaultMessage='Confirm'
                            />
                        </button>
                    </div>

                </div>
            </form>
        );
    }
}

EditRoleFrom.propTypes = {
    submit: PropTypes.func.isRequired,
    permissions: PropTypes.shape({
        data: PropTypes.array.isRequired
    }).isRequired,
    role: PropTypes.shape({
        data: PropTypes.object.isRequired
    }).isRequired,
};

export default EditRoleFrom;
