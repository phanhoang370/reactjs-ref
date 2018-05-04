import React from "react";
import PropTypes from "prop-types";
import Validator from "validator";
import 'react-select/dist/react-select.css';
import InlineError from './../../messages/InlineError'
import Select from 'react-select';
import { FormattedMessage } from "react-intl"
import { Link } from 'react-router-dom'
import Checkbox from './../../Checkbox'

class CreateUserFrom extends React.Component {
    state = {
        data: {
            name: '',
            email: '',
            password: '',
            roles: '',
        },
        loading: false,
        errors: {},
        selectedOption: '',
    }

    onChange = e =>
        this.setState({
            errors: {
                ...this.state.error, 
                [e.target.name]: null
            },
            data: {
                ...this.state.data, 
                [e.target.name]: e.target.value
            }
        })

    onSubmit = () => {
        const errors = this.validate(this.state.data);

        this.setState({errors});
        if (Object.keys(errors).length === 0) {
            this.setState({loading: true});

            this.props
                .submit(this.state.data)
                    .catch(error => {
                        this.setState({
                            errors: {
                                global: error.data
                            }, 
                            loading: false
                        })
                    });
        }
    }

    validate = data => {
        const errors = {};
        if (!data.name) errors.name = "Can't be blank";
        if (!data.email) errors.email = "Can't be blank";
        else if (!Validator.isEmail(data.email)) errors.email = "Invalid email";
        if (!data.password) errors.password = "Can't be blank";
        if (
            (data.roles == 2 && !data.company)
            || (data.roles == 3 && !data.guider)
            || data.roles == 4 && !data.store
        ) errors.company = "Can't be blank";
        if (!data.roles) errors.roles = "Can't be blank";
        return errors;
    }

    componentWillMount() {
        this.selectedCheckboxes = new Set();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps && nextProps.guider && Object.keys(nextProps.guider).length > 0) {
            this.setState({
                data: {
                    ...this.state.data,
                    roles: '3',
                    guider: nextProps.guider.guid_id
                },
                selectedOption : {
                    value: nextProps.guider.guid_id,
                    label: nextProps.guider.guid_name
                }
            })
        }
    }

    toggleCheckbox = role_id => {
        if (this.selectedCheckboxes.has(role_id)) {
            this.selectedCheckboxes.delete(role_id);
        } else {
            this.selectedCheckboxes.add(role_id);
        }
        this.setState({
            data: {
                ...this.state.data,
                roles: [...this.selectedCheckboxes]
            }
        })
    }

    handleChangeSelect = (selectedOption) => {
        const { data: { roles } } = this.state
        if (roles === '2') {
            this.setState({
                selectedOption:selectedOption,
                data: {
                    ...this.state.data, 
                    'company': selectedOption.value
                }
            })
        } else if (roles === '3') {
            this.setState({
                selectedOption:selectedOption,
                data: {
                    ...this.state.data, 
                    'guider': selectedOption.value
                }
            })
        } else if (roles === '4') {
            this.setState({
                selectedOption:selectedOption,
                data: {
                    ...this.state.data, 
                    'store': selectedOption.value
                }
            })
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

    selectOption = () => {
        const { data: { roles } } = this.state
        const { companies, stores, guiders } = this.props
        if (roles === '2') {
            return companies.data.map(company => ({
                value: company.company_id,
                label: company.company_name,
            }))
        } else if (roles === '3') {
            return guiders.data.map(guider => ({
                value: guider.guid_id,
                label: guider.guid_name,
            }))
        } else if (roles === '4') {
            return stores.data.map(store => ({
                value: store.store_id,
                label: store.store_name,
            }))
        }
    }

    render() {
        const { data, errors, selectedOption } = this.state;
        const { roles } = this.props;

        return (
            <form onSubmit={this.onSubmit}>
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
                                    id='dashboard.user.name'
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
                                    autoComplete="off"
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
                                    type="email"
                                    className={!errors.email ? 'form-control' : 'form-control is-invalid'}
                                    id="email"
                                    name="email"
                                    value={data.email}
                                    onChange={this.onChange}
                                    autoComplete="off"
                                />
                                {errors.email && <InlineError text={errors.email}/>}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="form-group row">
                    <div className="col-md-6 p-0">
                        <div className="row m-0">
                            <div className="col-md-3 plr-0-desktop plr-mb-0">
                                <label className="title-label">
                                    - <FormattedMessage
                                    id='dashboard.password'
                                    defaultMessage='Password'
                                />
                                </label>
                            </div>
                            <div className="col-md-9 p-0">
                                <input
                                    type="password"
                                    className={!errors.password ? 'form-control' : 'form-control is-invalid'}
                                    id="password"
                                    name="password"
                                    value={data.password}
                                    onChange={this.onChange}
                                    autoComplete="off"
                                />
                                {errors.password && <InlineError text={errors.password}/>}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="form-group row">
                    <div className="col-md-6 p-0 mt-mb-5">
                        <div className="row m-0">
                            <div className="col-md-3 p-0">
                                <label className="title-label">
                                    - <FormattedMessage
                                        id='dashboard.role'
                                        defaultMessage='Role'
                                    />
                                </label>
                            </div>
                            <div className="col-md-9 p-0 user-permission">
                                {this.createRadios()}
                                {errors.roles && <InlineError text={errors.roles}/>}
                            </div>
                        </div>
                    </div>
                </div>

                {(['2', '3', '4'].includes(data.roles)) && (
                    <div className="form-group row">
                        <div className="col-md-6 p-0 mt-mb-5">
                            <div className="row m-0">
                                <div className="col-md-3 plr-0-desktop plr-mb-0">
                                    <label className="title-label">
                                        - {(data.roles === '2') && (
                                            <FormattedMessage
                                                id='dashboard.company'
                                                defaultMessage='Company'
                                            />
                                        )}
                                        {(data.roles === '3') && (
                                            'Guider'
                                        )}
                                        {(data.roles === '4') && (
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

CreateUserFrom.propTypes = {
    submit: PropTypes.func.isRequired,
};

export default CreateUserFrom;
