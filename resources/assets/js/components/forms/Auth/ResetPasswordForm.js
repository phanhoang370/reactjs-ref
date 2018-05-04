import React from "react";
import PropTypes from "prop-types";
import Validator from "validator";
import 'react-select/dist/react-select.css';
import InlineError from './../../messages/InlineError'
import Select from 'react-select';
import {FormattedMessage} from "react-intl"
import { Link } from 'react-router-dom'
import Checkbox from './../../Checkbox'

class ResetPasswordForm extends React.Component {
    state = {
        data: {
            password: '',
            password_confirmation: '',
        },
        status: false,
        errors: {},
    };

    onChange = e =>
        this.setState({
            errors: {...this.state.error, [e.target.name]: null},
            data: {...this.state.data, [e.target.name]: e.target.value}
        });

    onSubmit = e => {
        e.preventDefault()
        const errors = this.validate(this.state.data);
        this.setState({errors});
        if (Object.keys(errors).length === 0) {
            this.props
                .submit(this.state.data)
                    .then(response => {
                        this.setState({
                            status: true
                        })
                    })
                    .catch(error => {
                        if (!error.data.success) {
                            this.setState({
                                errors: {
                                    global: error.data.error
                                }, 
                                status: false
                            })
                        } else {
                            this.setState({
                                errors: {
                                    global: error.data
                                }, 
                                status: false
                            })
                        }
                    });
        }
    };

    validate = data => {
        const errors = {};
        if (!data.password) errors.password = "Can't be blank";
        if (!data.password_confirmation) errors.password_confirmation = "Can't be blank";
        return errors;
    };

    onClickToLogin = () => {
        this.props.onClickToLogin()
    }

    render() {
        const { data, errors, status } = this.state;
        
        return (
            <form onSubmit={this.onSubmit}>
                {errors.global && (
                    Object.keys(errors.global).map((value, key) =>
                        <InlineError key={key} text={errors.global[value][0]}/>
                    )
                )}
                <div className="form-group">
                    <label>
                        Password
                    </label>
                    <input
                        type="password"
                        className={!errors.password ? 'form-control' : 'form-control is-invalid'}
                        id="password"
                        name="password"
                        value={data.password}
                        onChange={this.onChange}
                    />
                    {errors.password && <InlineError text={errors.password}/>}
                </div>
                <div className="form-group">
                    <label>
                        Confirm password
                    </label>
                    <input
                        type="password"
                        className={!errors.password_confirmation ? 'form-control' : 'form-control is-invalid'}
                        id="password_confirmation"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        onChange={this.onChange}
                    />
                    {errors.password_confirmation && <InlineError text={errors.password_confirmation}/>}
                </div>
                <div className="form-group row group-button">
                    <div className="col-md-12 p-0 text-align-center">
                        <button type="submit" id="search_btn" className="btn btn-sm btn-colorN ml-15" onClick={this.onSubmit}>
                            Change password
                        </button>
                    </div>

                </div>
            </form>
        );
    }
}

ResetPasswordForm.propTypes = {
    submit: PropTypes.func.isRequired,
};

export default ResetPasswordForm;
