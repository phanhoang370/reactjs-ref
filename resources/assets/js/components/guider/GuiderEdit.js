import React from "react";
import PropTypes from "prop-types";
import Validator from "validator";
import InlineError from "../messages/InlineError";
import 'react-select/dist/react-select.css';
import Select from 'react-select';
import {FormattedMessage} from "react-intl"


class GuiderEdit extends React.Component {
    state = {
        data: {
            guid_id: '',
            guid_name: '',
            guid_phone: '',
            manager_guid_id: '',
            guid_level: 5,
            guid_resident_number: false,
            city: '',
        },
        loading: false,
        errors: {},
        selectedOption: '',
        selectedOptionCity: '',
    };

    handleChangeSelect = (selectedOption) => {
        this.setState({
            selectedOption: selectedOption,
            data: {
                ...this.state.data,
                'manager_guid_id': selectedOption.value,
                'guid_level': selectedOption.level + 1
            }
        });
    }

    handleChangeCity = (selectedOptionCity) => {
        this.setState({
            selectedOptionCity: selectedOptionCity,
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

    onCancel = () =>
        this.props.cancel()

    validate = data => {
        const errors = {};
        if (!data.guid_name) errors.guid_name = "Can't be blank";
        if (!data.guid_phone) errors.guid_phone = "Can't be blank";
        return errors;
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps && nextProps.itemEditing) {
            let {itemEditing} = nextProps;
            this.setState({
                data: {
                    guid_id: itemEditing.guid_id ? itemEditing.guid_id : '',
                    guid_phone: itemEditing.guid_phone ? itemEditing.guid_phone : '',
                    guid_level: itemEditing.guid_level ? itemEditing.guid_level : 5,
                    guid_name: itemEditing.guid_name ? itemEditing.guid_name : '',
                    guid_resident_number: itemEditing.guid_resident_number ? itemEditing.guid_resident_number : '',
                    manager_guid_id: itemEditing.manager_guid_id ? itemEditing.manager_guid_id : '',
                    city: itemEditing.city_id ? itemEditing.city_id : '',
                },
                selectedOption: {
                    value: itemEditing.manager_guid_id,
                    label: this.findGuiderMagager(itemEditing.manager_guid_id)
                },
                selectedOptionCity: {
                    value: itemEditing.city_id,
                    label: itemEditing.city ? itemEditing.city.city_name : ''
                }
            });
        }
    }

    findGuiderMagager(id) {
        this.props.guider.map(guider =>
            guider.guid_id === id ? guider.guid_name : null
        )
    }

    render() {
        const {data, errors, selectedOption, selectedOptionCity} = this.state;
        const {cities} = this.props;

        const selectGuider = this.props.guider.map(guider => ({
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
                <h2 className='title-guider-add'><i className="fa fa-plane" aria-hidden="true"></i>Guide registration
                </h2>
                <div className="main-form">
                    <form onSubmit={this.onSubmit}>
                        {errors.global && (
                            Object.keys(errors.global).map((value, key) =>
                                <InlineError key={key} text={errors.global[value][0]}/>
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
                                        {data.guid_id}
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
                                                id='dashboard.guider.name'
                                                defaultMessage='Guide Name'
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
                            <div className="col-md-6 p-0 mt-mb-5">
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
                                            name="form-field-name"
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
                                            className={!errors.guid_level ? 'form-control' : 'form-control is-invalid'}
                                            id="guid_level"
                                            name="guid_level"
                                            value={data.guid_level}
                                            onChange={this.onChange}
                                        />
                                        {errors.guid_level && <InlineError text={errors.guid_level}/>}
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 p-0 mt-mb-5">
                                <div className="row m-0">
                                    <div className="col-md-3 plr-0-desktop plr-mb-0">
                                        <label className="title-label">
                                            - <FormattedMessage
                                                id='dashboard.guider.resident.number'
                                                defaultMessage='Guide resident Number'
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

                        <div className="form-group row">
                            <div className="col-md-12 p-0 text-align-center">
                                <button 
                                    onClick={this.onCancel} 
                                    type="button" 
                                    id="search_btn"
                                    className="btn btn-sm btn-colorP"
                                >
                                    <FormattedMessage
                                        id='dashboard.cancel'
                                        defaultMessage='Cancek'
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

GuiderEdit.propTypes = {
    submit: PropTypes.func.isRequired,
};

export default GuiderEdit;
