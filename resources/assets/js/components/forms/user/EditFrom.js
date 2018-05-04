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
            email: '',
            password: '',
            roles: '',
        },
        dataResetPassword: {
            password: ''
        },
        company_name: '',
        loading: false,
        errors: {},
        selectedOption: '',
        isResetPassword: false,
    }

    onChange = e =>
        this.setState({
            errors: {...this.state.error, [e.target.name]: null},
            data: {...this.state.data, [e.target.name]: e.target.value}
        })

    onChangePassword = e =>
        this.setState({
            dataResetPassword: {...this.state.dataResetPassword, [e.target.name]: e.target.value}
        })

    onSubmit = () => {
        const errors = this.validate(this.state.data);
        this.setState({errors});
        if (Object.keys(errors).length === 0) {
            this.setState({loading: true});

            this.props
                .submit(this.state.data.user_id, this.state.data)
                    .catch(error => {
                        this.setState({errors: {global: error.data}, loading: false})
                    });
        }
    }

    onSubmitReset = () => {
        const errors = this.validateResetPassword(this.state.dataResetPassword);
        this.setState({errors});
        if (Object.keys(errors).length === 0) {
            this.setState({loading: true});

            this.props
                .submitResetPassword(this.state.data.user_id, this.state.dataResetPassword)
                    .catch(error => {
                        this.setState({errors: {global: error.data}, loading: false})
                    });
        }
    }

    validate = data => {
        const errors = {};
        if (!data.name) errors.name = "Can't be blank";
        if (
            (data.roles == 2 && !data.company)
            || (data.roles == 3 && !data.guider)
            || data.roles == 4 && !data.store
        ) errors.company = "Can't be blank";
        if (!data.roles) errors.roles = "Can't be blank";
        return errors;
    }

    validateResetPassword = dataResetPassword => {
        const errors = {};
        if (!dataResetPassword.password) errors.password = "Can't be blank";
        else if (dataResetPassword.password.length < 6) errors.password = "min = 6";
        return errors;
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps && nextProps.user) {
            const { user } = nextProps;
            let selectedOption = {}
            if (user.data.store && user.data.store[0]) {
                selectedOption = {
                    value: user.data.store[0].store_id,
                    label: user.data.store[0].store_name
                }
            } else if (user.data.guider) {
                selectedOption = {
                    value: user.data.guider.guid_id,
                    label: user.data.guider.guid_name
                }
            } else if (user.data.company) {
                selectedOption = {
                    value: user.data.company.company_id,
                    label: user.data.company.company_name
                }
            }

            this.setState({
                data: {
                    ...this.state.data,
                    user_id: user.data.user_id || '',
                    name: user.data.name || '',
                    email: user.data.email || '',
                    roles: (user.data.roles && user.data.roles[0]) ? user.data.roles[0].role_id : '',
                },
                selectedOption: selectedOption,
            }, () => {
                if (user.data.store && user.data.store[0]) {
                    this.setState({
                        data: {
                            ...this.state.data,
                            store: user.data.store[0].store_id
                        },
                    });
                } else if (user.data.guider) {
                    this.setState({
                        data: {
                            ...this.state.data,
                            guider: user.data.guider.guid_id,
                        },
                    });
                } else if (user.data.company) {
                    this.setState({
                        data: {
                            ...this.state.data,
                            company: user.data.company.company_id
                        },
                    });
                }
            });
        }
    }

    onRoleChanged = e => {
        this.setState({
            data: {
                ...this.state.data,
                roles: e.currentTarget.value
            }
        })
    }

    createRadio = role => (
        <div className="form-check" key={role.role_id}>
            <label>
                <input 
                    type="radio" 
                    name="role" 
                    value={role.role_id} 
                    checked={role.role_id == this.state.data.roles}
                    onChange={this.onRoleChanged}
                />
                <span className="label-text">{role.display_name}</span>
            </label>
        </div>
    )

    createRadios = () => this.props.roles.data.map(this.createRadio)

    showResetPassword = () => {
        this.setState({
            isResetPassword: true
        })
    }

    selectOption = () => {
        const { data: { roles } } = this.state
        const { companies, stores, guiders } = this.props
        if (roles == 2) {
            return companies.data.map(company => ({
                value: company.company_id,
                label: company.company_name,
            }))
        } else if (roles == 3) {
            return guiders.data.map(guider => ({
                value: guider.guid_id,
                label: guider.guid_name,
            }))
        } else if (roles == 4) {
            return stores.data.map(store => ({
                value: store.store_id,
                label: store.store_name,
            }))
        }
    }

    handleChangeSelect = (selectedOption) => {
        const { data: { roles } } = this.state
        if (roles == 2) {
            this.setState({
                selectedOption:selectedOption,
                data: {
                    ...this.state.data, 
                    'company': selectedOption.value
                }
            })
        } else if (roles == 3) {
            this.setState({
                selectedOption:selectedOption,
                data: {
                    ...this.state.data, 
                    'guider': selectedOption.value
                }
            })
        } else if (roles == 4) {
            this.setState({
                selectedOption:selectedOption,
                data: {
                    ...this.state.data, 
                    'store': selectedOption.value
                }
            })
        }
        
    }

    render() {
        const { data, errors, company_name, isResetPassword, dataResetPassword, selectedOption } = this.state;
        const { roles, resetPassword } = this.props;


        return (
            <form>
                {errors.global && (
                    Object.keys(errors.global).map((value, key) =>
                        <InlineError key={key} text={errors.global[value]}/>
                    )
                )}


                <div className="form-group row">
                    <div className="col-md-6 p-0">
                        <div className="row m-0">
                            <div className="col-md-3 plr-0-desktop plr-mb-0">
                                <label className="title-label">
                                    - <FormattedMessage
                                    id='dashboard.name'
                                    defaultMessage='User Name'
                                />
                                </label>
                            </div>
                            <div className="col-md-9 p-0">
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
                            <div className="col-md-3 plr-0-desktop plr-mb-0">
                                <label className="title-label">
                                    - <FormattedMessage
                                    id='dashboard.store.email'
                                    defaultMessage='Email'
                                />
                                </label>
                            </div>
                            <div className="col-md-9 p-0">
                                <input
                                    type="text"
                                    className={!errors.email ? 'form-control' : 'form-control is-invalid'}
                                    id="email"
                                    name="email"
                                    value={data.email}
                                    readOnly
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="form-group row">
                    {!isResetPassword && (
                        <div className="col-md-6 p-0 mt-mb-5">
                            <div className="row m-0">
                                <div className="col-md-3 plr-0-desktop plr-mb-0">
                                    <a href="#" onClick={this.showResetPassword} className="title-label">
                                        Reset password
                                    </a>
                                </div>
                            </div>
                        </div>
                    )}
                    {isResetPassword && (
                        <React.Fragment>
                            <div className="col-md-6 p-0 mt-mb-5">
                                <div className="row m-0">
                                    <div className="col-md-3 plr-0-desktop plr-mb-0">
                                        <label className="title-label">
                                            - New password
                                        </label>
                                    </div>
                                    <div className="col-md-9 p-0">
                                        <input
                                            type="password"
                                            className={!errors.password ? 'form-control' : 'form-control is-invalid'}
                                            id="password"
                                            name="password"
                                            value={dataResetPassword.password}
                                            onChange={this.onChangePassword}
                                        />
                                        {errors.password && <InlineError text={errors.password}/>}
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 p-0 mt-mb-5">
                                <div className="row m-0">
                                    <div className="col-md-3 plr-0-desktop plr-mb-0">
                                        <button 
                                            type="button" 
                                            id="search_btn" 
                                            className="btn btn-sm btn-colorN ml-15" 
                                            onClick={this.onSubmitReset}
                                        >
                                            Reset password
                                        </button>
                                    </div>
                                    {resetPassword.success && (
                                        <div className="col-md-9 p-0">
                                            reset password success
                                        </div>
                                    )}
                                </div>
                            </div>
                        </React.Fragment>
                    )}
                </div>

                <div className="form-group row">
                    <div className="col-md-6 p-0 mt-mb-5">
                        <div className="row m-0">
                            <div className="col-md-3 plr-0-desktop plr-mb-0">
                                <label className="title-label">
                                    - <FormattedMessage
                                    id='dashboard.role'
                                    defaultMessage='Role'
                                />
                                </label>
                            </div>
                            <div className="col-md-9 p-0">
                                {this.createRadios()}
                                {errors.roles && <InlineError text={errors.roles}/>}
                            </div>
                        </div>
                    </div>
                </div>

                {(['2', '3', '4', 2, 3, 4].includes(data.roles)) && (
                    <div className="form-group row">
                        <div className="col-md-6 p-0 mt-mb-5">
                            <div className="row m-0">
                                <div className="col-md-3 plr-0-desktop plr-mb-0">
                                    <label className="title-label">
                                        - {(data.roles == 2) && (
                                            <FormattedMessage
                                                id='dashboard.company'
                                                defaultMessage='Company'
                                            />
                                        )}
                                        {(data.roles == 3) && (
                                            'Guider'
                                        )}
                                        {(data.roles == 4) && (
                                            'Store'
                                        )}
                                    </label>
                                </div>
                                <div className="col-md-9 p-0">
                                    <Select
                                        name="form-field-name"
                                        value={selectedOption}
                                        onChange={this.handleChangeSelect}
                                        options={this.selectOption()}
                                    />
                                    {errors.company && <InlineError text={errors.company}/>}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                <div className="form-group row group-button">
                    <div className="col-md-12 p-0 text-align-center">
                        <Link
                            to={'/dashboard/user'}
                            type="button"
                            id="cancel_btn"
                            className="btn btn-sm btn-colorP"
                        >
                            <FormattedMessage
                                id='dashboard.cancel'
                                defaultMessage='Cancel'
                            />
                        </Link>
                        <button 
                            type="button" 
                            id="search_btn" 
                            className="btn btn-sm btn-colorN ml-15" 
                            onClick={this.onSubmit}
                        >
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
    submitResetPassword: PropTypes.func.isRequired,
    roles: PropTypes.shape({
        data: PropTypes.array.isRequired
    }).isRequired,
    user: PropTypes.shape({
        data: PropTypes.object.isRequired
    }).isRequired,
};

export default EditRoleFrom;
