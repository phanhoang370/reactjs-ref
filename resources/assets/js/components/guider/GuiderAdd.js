import React from "react";
import PropTypes from "prop-types";
import Validator from "validator";
import 'react-select/dist/react-select.css';
import InlineError from './../messages/InlineError'
import Select from 'react-select';
import './GuiderList.css';
import {FormattedMessage} from "react-intl"


class GuiderAdd extends React.Component {
    state = {
        data: {
            guid_id: '',
            guid_name: '',
            guid_phone: '',
            manager_guid_id: 0,
            guid_status: 0,
            guid_level: 5,
            guid_resident_number: '',
            city: '',
        },
        loading: false,
        errors: {},
        selectedOption: '',
        selectedOptionCity: '',
    };

    handleChangeSelect = (selectedOption) => {
        console.log(selectedOption);
        this.setState({
            selectedOption:selectedOption,
            data: {
                ...this.state.data, 
                'manager_guid_id': selectedOption.value,
                'guid_level': selectedOption.level + 1
            }
        });
    }

    handleChangeCity = (selectedOptionCity) => {
        this.setState({
            selectedOptionCity:selectedOptionCity,
            data: {
                ...this.state.data, 
                'city': selectedOptionCity.value
            }
        });
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
        });
    onChangeStatus = e =>
        this.setState({
            errors: {
                ...this.state.error, 
                [e.target.name]: null
            },
            data: {
                ...this.state.data, 
                [e.target.name]: (this.state.data.guid_status == 1 ? 0 : 1)
            }
        });

    onSubmit = (e) => {
        e.preventDefault();
        const errors = this.validate(this.state.data);
        this.setState({errors});
        if (Object.keys(errors).length === 0) {
            this.setState({loading: true});

            this.props
                .submit(this.state.data)
                .catch((error) => {
                    if (!(Object.keys(error.response).length === 0 && error.response.constructor === Object)) {
                        this.setState({errors: {global: error.response.data}, loading: false});
                    }
                });
        }
    };

    onCancel = (e) => {
        this.props.cancel()
    }
    validate = data => {
        const errors = {};
        if (!data.guid_id) errors.guid_id = "Can't be blank";
        if (!data.guid_name) errors.guid_name = "Can't be blank";
        if (!data.guid_phone) errors.guid_phone = "Can't be blank";
        return errors;
    };

    render() {
        const { data, errors, selectedOption, selectedOptionCity } = this.state;
        const { guiders, cities } = this.props;
        const selectGuider = guiders.map(guider => ({
            value: guider.guid_id,
            label: guider.guid_name,
            level: guider.guid_level,
        }))

        const selectCities = cities.data.map(city => ({
            value: city.city_id,
            label: city.city_name,
        }))

        return (
            <div className='guider-add'>
                <h2 className='title-guider-add'>
                    <i className="fa fa-plane" aria-hidden="true"></i>
                    <FormattedMessage
                        id='dashboard.guider.title'
                        defaultMessage='Guide registration'
                    />
                </h2>
                <div className="main-form">
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
                                            id='dashboard.guider.id'
                                            defaultMessage='Guide id'
                                        />
                                        </label>
                                    </div>
                                    <div className="col-md-9 p-0">
                                        <input
                                            type="text"
                                            className={!errors.guid_id ? 'form-control' : 'form-control is-invalid'}
                                            id="guid_id"
                                            name="guid_id"
                                            value={data.guid_id}
                                            onChange={this.onChange}
                                        />
                                        {errors.guid_id && <InlineError text={errors.guid_id}/>}
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 p-0 mt-mb-5">
                                <div className="row m-0">
                                    <div className="col-md-3 plr-0-desktop plr-mb-0">
                                        <label className="title-label">
                                            - <FormattedMessage
                                            id='dashboard.guider.name'
                                            defaultMessage='Guide name'
                                        />
                                        </label>
                                    </div>
                                    <div className="col-md-9 p-0">
                                        <input
                                            type="text"
                                            className={!errors.guid_name ? 'form-control' : 'form-control is-invalid'}
                                            id="guid_name"
                                            name="guid_name"
                                            value={data.guid_name}
                                            onChange={this.onChange}
                                        />
                                        {errors.guid_name && <InlineError text={errors.guid_name}/>}
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
                                            id='dashboard.guider.phone'
                                            defaultMessage='Phone'
                                        />
                                        </label>
                                    </div>
                                    <div className="col-md-9 p-0">
                                        <input
                                            type="number"
                                            className={!errors.guid_phone ? 'form-control' : 'form-control is-invalid'}
                                            id="guid_phone"
                                            name="guid_phone"
                                            value={data.guid_phone}
                                            onChange={this.onChange}
                                        />
                                        {errors.guid_phone && <InlineError text={errors.guid_phone}/>}
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
                                            id='dashboard.guider.work.city'
                                            defaultMessage='Guide working city'
                                        />
                                        </label>
                                    </div>
                                    <div className="col-md-9 p-0">
                                        <Select
                                            name="city"
                                            value={selectedOptionCity}
                                            onChange={this.handleChangeCity}
                                            options={selectCities}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 p-0 mt-mb-5">
                                <div className="row m-0">
                                    <div className="col-md-3 plr-0-desktop plr-mb-0">
                                        <label className="title-label">
                                            - <FormattedMessage
                                            id='dashboard.guider.manager'
                                            defaultMessage='Manager'
                                        />
                                        </label>
                                    </div>
                                    <div className="col-md-9 p-0">
                                        <Select
                                            name="manager_guid_id"
                                            value={selectedOption.value}
                                            onChange={this.handleChangeSelect}
                                            options={selectGuider}
                                        />
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
                                            id='dashboard.guider.level'
                                            defaultMessage='Guide level'
                                        />
                                        </label>
                                    </div>
                                    <div className="col-md-9 p-0">

                                        <input
                                            type="text"
                                            className={!errors.guid_name ? 'form-control' : 'form-control is-invalid'}
                                            id="guid_name"
                                            name="guid_name"
                                            value={data.guid_level}
                                            onChange={this.onChange}
                                        />
                                        {errors.guid_name && <InlineError text={errors.guid_name}/>}
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 p-0 mt-mb-5">
                                <div className="row m-0">
                                    <div className="col-md-3 plr-0-desktop plr-mb-0">
                                        <label className="title-label">
                                            - <FormattedMessage
                                            id='dashboard.guider.resident.number'
                                            defaultMessage='Guide Resident Number'
                                        />
                                        </label>
                                    </div>
                                    <div className="col-md-9 p-0">
                                        <input
                                            type="text"
                                            className={!errors.guid_resident_number ? 'form-control' : 'form-control is-invalid'}
                                            id="guid_resident_number"
                                            name="guid_resident_number"
                                            value={data.guid_resident_number}
                                            onChange={this.onChange}
                                        />
                                        {errors.guid_resident_number && <InlineError text={errors.guid_resident_number}/>}
                                    </div>
                                </div>
                            </div>
                        </div>



                        <div className="form-group row group-button">
                            <div className="col-md-12 p-0 text-align-center">
                                <button type="button" id="search_btn" className="btn btn-sm btn-colorP " onClick={this.onCancel} >
                                    <FormattedMessage
                                        id='dashboard.cancel'
                                        defaultMessage='Cancel'
                                    />
                                </button>
                                <button 
                                    onClick={this.onSubmit} 
                                    id="search_btn"
                                    className="btn btn-sm btn-colorN ml-15"
                                >
                                    <FormattedMessage
                                        id='dashboard.confirm'
                                        defaultMessage='Confirm'
                                    />
                                </button>

                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

GuiderAdd.propTypes = {
    submit: PropTypes.func.isRequired,
    guiders: PropTypes.array.isRequired,
    cities: PropTypes.shape({
        data: PropTypes.array.isRequired
    }).isRequired,
};

export default GuiderAdd;
