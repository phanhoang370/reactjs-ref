import React from "react";
import PropTypes from "prop-types";
import Validator from "validator";
import 'react-select/dist/react-select.css';
import InlineError from './../../messages/InlineError'
import Select from 'react-select';
import {FormattedMessage} from "react-intl"
import { Link } from 'react-router-dom'
import Checkbox from './../../Checkbox'

class ResetPasswordLinkForm extends React.Component {
    state = {
        data: {
            email: '',
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
        if (!data.email) errors.email = "Can't be blank";
        return errors;
    };

    onClickToLogin = () => {
        this.props.onClickToLogin()
    }

    render() {
        const { data, errors, status } = this.state;

        if (status) {
            return (
                <div>
                    <div className="form-group">
                        <label>
                            Check your email for a link to reset your password. If it doesn’t appear within a few minutes, check your spam folder.
                        </label>
                    </div>
                    <div className="form-group row group-button">
                        <div className="col-md-12 p-0 text-align-center">
                            <button type="button" id="search_btn" className="btn btn-sm btn-colorP ml-15" onClick={this.onClickToLogin}>
                                Return to sign in
                            </button>
                        </div>

                    </div>
                </div>
            );
        }
        
        return (
            <form onSubmit={this.onSubmit}>
                {errors.global && (
                    Object.keys(errors.global).map((value, key) =>
                        <InlineError key={key} text={errors.global[value][0]}/>
                    )
                )}
                <div className="form-group">
                    <label>
                        Enter your email address and we will send you a link to reset your password.
                    </label>
                    <input
                        type="text"
                        className={!errors.email ? 'form-control' : 'form-control is-invalid'}
                        id="email"
                        name="email"
                        value={data.email}
                        onChange={this.onChange}
                    />
                    {errors.email && <InlineError text={errors.email}/>}
                </div>
                <div className="form-group row group-button">
                    <div className="col-md-12 p-0 text-align-center">
                        <button type="submit" id="search_btn" className="btn btn-sm btn-colorN ml-15" onClick={this.onSubmit}>
                            Send password reset email
                        </button>
                    </div>

                </div>
            </form>
        );
    }
}

ResetPasswordLinkForm.propTypes = {
    submit: PropTypes.func.isRequired,
};

export default ResetPasswordLinkForm;
