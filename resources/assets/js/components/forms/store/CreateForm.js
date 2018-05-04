import React from 'react';
import PropTypes from 'prop-types';
import Validator from 'validator';
import InlineError from './../../messages/InlineError';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import GoogleMapStandaloneSearchBox from './../../GoogleMap/StandaloneSearchBox'
import Autosuggest from 'react-autosuggest';
import _ from 'lodash'
import './style.css'
import { Link } from 'react-router-dom'
import {FormattedMessage} from "react-intl"
import { GOOGLE_MAP_URL } from './../../../constants/google'
import { WAIT_INTERVAL } from './../../../constants/interval'
import { Redirect } from 'react-router-dom'

function hasWhiteSpace(s) {
    return /\s/g.test(s);
}

class CreateStoreForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: {
                id: '',
                name: '',
                address: '',
                phone: '',
                dc_rate: '',
                company_fee_rate: '',
                country_code: '',
                lat: '',
                lng: '',
                city: '',
                country: '',
                homepage: '',
                description: '',
                type: ''
            },
            loading: false,
            errors: {},
            open: false,
            places: [],
            suggestions: [],
            isLoading: false,
            isDissableInput: false,
            isSelectName: false,
            finished: false,
            selectedOptionType: '',
        }

        this.debouncedLoadSuggestions = _.debounce(this.loadSuggestions, WAIT_INTERVAL);
    }

    onChange = e =>
        this.setState({
            errors: {...this.state.error, [e.target.name]: null},
            data: {...this.state.data, [e.target.name]: e.target.value}
        })

    onChangeName = (event, { newValue }) => {

        this.setState({
            errors: {...this.state.error, name: null},
            data: {...this.state.data, name: newValue}
        });
        
    }

    getSuggestionValue = (suggestion) => {
        return suggestion.store_name;
    }

    renderSuggestion = (suggestion) => {
        return (
            <span>{suggestion.store_name}</span>
        );
    }

    loadSuggestions(value) {
        this.setState({
            isLoading: true,
            isDissableInput: false
        });

        if (this.state.isSelectName) {
            this.setState({
                data: {
                    ...this.state.data,
                    phone: '',
                },
                isSelectName: false
            });
        }

        this.props.onSearchByName(value).then(response => {
            if (value === this.state.data.name) {
                this.setState({
                    isLoading: false,
                    suggestions: response.data
                });
            } else {
                this.setState({
                    isLoading: false
                });
            }
        })
    }

    onSuggestionsFetchRequested = ({ value }) => {
        this.debouncedLoadSuggestions(value);
    }

    onSuggestionsClearRequested = () => {
        this.setState({
            suggestions: []
        });
    }

    onSuggestionSelected = (event, { suggestion }) => {
        this.props.onSelectStore(suggestion.store_id);
        this.setState({
            isSelectName: true
        });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps && nextProps.store && nextProps.store.store_name) {
            const { store } = nextProps;
            this.setState({
                data: {
                    ...this.state.data,
                    exist_id: store.store_id,
                    name: store.store_name,
                    address: store.store_address,
                    phone: store.store_phone,
                    lat: store.GPSX,
                    lng: store.GPSY,
                    homepage: store.home_page,
                    description: store.description,
                    type: store.type_id,
                    dc_rate: '',
                    company_fee_rate: '',
                },
                isDissableInput: true,
                selectedOptionType:{
                    value: store.type_id,
                    label: store.type_name
                },
            });
        }
    }

    onSubmit = () => {
        const errors = this.validate(this.state.data);
        this.setState({errors});
        if (Object.keys(errors).length === 0) {
            this.setState({loading: true});

            this.props
                .submit(this.state.data)
                    .catch(error => {
                        this.setState({errors: {global: error.data}, loading: false})
                    });
        }
    }

    onClickBack = () => {
        this.setState({ finished: true })
    }


    validate = data => {
        const errors = {};
        if (!data.homepage) errors.homepage = "Can't be blank";
        if (!data.name) errors.name = "Can't be blank";
        if (!data.address) errors.address = "Can't be blank";
        if (!data.phone) errors.phone = "Can't be blank";
        if (!data.company_fee_rate) errors.company_fee_rate = "Can't be blank";
        if (!data.dc_rate) errors.dc_rate = "Can't be blank";
        return errors;
    };

    onPlacesChanged = (places) => {
        let storableLocation = {};
        storableLocation.address = [];

        for (var ac = 0; ac < places[0].address_components.length; ac++) {
            
            var component = places[0].address_components[ac];

            if (!component.types.includes('administrative_area_level_1') && !component.types.includes('country')) {
                storableLocation.address.push(component.long_name)
            }
            if (component.types.includes('administrative_area_level_1')) {
                storableLocation.city = component.short_name;
            }
            if (component.types.includes('country')) {
                storableLocation.country = component.long_name;
                storableLocation.registered_country_iso_code = component.short_name;
            }
        };
        storableLocation.address = storableLocation.address.join(', ')

        this.setState({
            places,
            data: {
                ...this.state.data,
                'address': storableLocation.address,
                'lat': places[0].geometry.location.lat(),
                'lng': places[0].geometry.location.lng(),
                'country_code': storableLocation.registered_country_iso_code,
                'city': storableLocation.city,
                'country': storableLocation.country
            }
        });
    }

    handleChangeType = (selectedOptionType) => {
        this.setState({
            selectedOptionType:selectedOptionType,
            data: {
                ...this.state.data, 
                'type': selectedOptionType.value
            }
        });
    }

    render() {
        const { data, errors, loading, suggestions, isLoading, isDissableInput, selectedOptionType } = this.state;
        const { types } = this.props;

        const inputNameProps = {
            placeholder: "Type 'name'",
            value: data.name,
            onChange: this.onChangeName
        };
        const selectTypes = types.data.map(type => ({
            value: type.type_id,
            label: type.type_name,
        }))

        return this.state.finished ? <Redirect to="/dashboard/store" /> : (
            <form>
                {errors.global && (
                    Object.keys(errors.global).map((value, key) => 
                        <InlineError key={key} text={errors.global[value][0]}/>
                    )
                )}

                <div className="form-group row">
                    <div className="col-md-6 p-0 mt-mb-5">
                        <div className="row m-0">
                            <div className="col-md-3 plr-0-desktop plr-mb-0">
                                <label className="title-label">
                                    - <FormattedMessage
                                    id='dashboard.store.name'
                                    defaultMessage='Store Name'
                                />
                                </label>
                            </div>
                            <div className="col-md-9 p-0">
                                <Autosuggest
                                    suggestions={suggestions}
                                    onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                                    onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                                    onSuggestionSelected={this.onSuggestionSelected}
                                    getSuggestionValue={this.getSuggestionValue}
                                    renderSuggestion={this.renderSuggestion}
                                    inputProps={inputNameProps}
                                />
                                {errors.name && <InlineError text={errors.name}/>}
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
                                    id='dashboard.store.address'
                                    defaultMessage='Address'
                                />
                                </label>
                            </div>
                            <div className="col-md-9 p-0">

                                {
                                    isDissableInput ? data.address : (
                                        <GoogleMapStandaloneSearchBox
                                            onPlacesChanged={this.onPlacesChanged}
                                            placeholder={"Address"}
                                            googleMapURL={GOOGLE_MAP_URL}
                                            loadingElement={<div style={{ height: `100%` }} />}
                                            containerElement={<div style={{ height: `450px` }} />}
                                            mapElement={<div style={{ height: `100%` }} />}
                                            value={data.address}
                                            disabled={isDissableInput}
                                            className={!errors.address ? 'form-control' : 'form-control is-invalid'}
                                        />
                                    )
                                }
                                {errors.address && <InlineError text={errors.address}/>}
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 p-0 mt-mb-5">
                        <div className="row m-0">
                            <div className="col-md-3 plr-0-desktop plr-mb-0">
                                <label className="title-label">
                                    - <FormattedMessage
                                    id='dashboard.store.map.address'
                                    defaultMessage='Store map Address'
                                />
                                </label>
                            </div>
                            <div className="col-md-9 p-0">
                                <div className="row pl-3 pr-3">
                                    <div className="col-md-6 p-0">
                                        Latitude - {data.lat}
                                    </div>
                                    <div className="col-md-6 p-0">
                                        Longitude - {data.lng}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="form-group row">
                    <div className="col-md-6 p-0 mt-mb-5">
                        <div className="row m-0">
                            <div className="col-md-3 plr-0-desktop plr-mb-0">
                                <label className="title-label">
                                    - <FormattedMessage
                                    id='dashboard.homepage'
                                    defaultMessage='Store homepage'
                                />
                                </label>
                            </div>
                            <div className="col-md-9 p-0">
                                {
                                    isDissableInput ? data.homepage : <input
                                        type="text"
                                        id="homepage"
                                        name="homepage"
                                        value={data.homepage}
                                        onChange={this.onChange}
                                        className={!errors.homepage ? 'form-control' : 'form-control is-invalid'}
                                    />
                                }
                                {errors.homepage && <InlineError text={errors.homepage}/>}
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 p-0">
                        <div className="row m-0">
                            <div className="col-md-3 plr-0-desktop plr-mb-0">
                                <label className="title-label">
                                    - <FormattedMessage
                                    id='dashboard.store.phone'
                                    defaultMessage='Phone Number'
                                />
                                </label>
                            </div>
                            <div className="col-md-9 p-0">

                                {
                                    isDissableInput ? data.phone : <input
                                        type="number"
                                        id="phone"
                                        name="phone"
                                        value={data.phone}
                                        onChange={this.onChange}
                                        disabled={isDissableInput}
                                        className={!errors.phone ? 'form-control' : 'form-control is-invalid'}
                                    />
                                }
                                {errors.phone && <InlineError text={errors.phone}/>}
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
                                    id='dashboard.type'
                                    defaultMessage='Store type'
                                />
                                </label>
                            </div>
                            <div className="col-md-9 p-0">

                                <Select
                                    name="form-field-name"
                                    value={selectedOptionType}
                                    onChange={this.handleChangeType}
                                    options={selectTypes}
                                />
                                {errors.phone && <InlineError text={errors.phone}/>}
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 p-0 mt-mb-5">
                        <div className="row m-0">
                            <div className="col-md-3 plr-0-desktop plr-mb-0">
                                <label className="title-label">
                                    - <FormattedMessage
                                    id='dashboard.description.detail'
                                    defaultMessage='Store description'
                                />
                                </label>
                            </div>
                            <div className="col-md-9 p-0">
                                {
                                    isDissableInput ? data.description : <input
                                        type="text"
                                        id="description"
                                        name="description"
                                        value={data.description}
                                        onChange={this.onChange}
                                        disabled={isDissableInput}
                                        className={!errors.description ? 'form-control' : 'form-control is-invalid'}
                                    />
                                }
                                {errors.phone && <InlineError text={errors.phone}/>}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="form-group row">
                    <div className="col-md-6 p-0 mt-mb-5">
                        <div className="row m-0">
                            <div className="col-md-3 plr-0-desktop plr-mb-0">
                                <label className="title-label">
                                    - <FormattedMessage
                                    id='dashboard.store.discount.rate'
                                    defaultMessage='Customer discount rate'
                                /> %
                                </label>
                            </div>
                            <div className="col-md-9 p-0">
                                <div className="input-group">
                                    <input
                                        type="number"
                                        id="dc_rate"
                                        name="dc_rate"
                                        value={data.dc_rate}
                                        onChange={this.onChange}
                                        className={!errors.dc_rate ? 'form-control' : 'form-control is-invalid'}
                                    />
                                    <div className="input-group-append" style={{height: 32+"px"}}>
                                        <span className="input-group-text">%</span>
                                    </div>
                                </div>
                                {errors.dc_rate && <InlineError text={errors.dc_rate}/>}
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 p-0">
                        <div className="row m-0">
                            <div className="col-md-3 plr-0-desktop plr-mb-0">
                                <label className="title-label">
                                    - <FormattedMessage
                                    id='dashboard.store.agency.fee'
                                    defaultMessage='Travel agency fee'
                                /> %
                                </label>
                            </div>
                            <div className="col-md-9 p-0">

                                <div className="input-group">
                                    <input
                                        type="number"
                                        id="company_fee_rate"
                                        name="company_fee_rate"
                                        value={data.company_fee_rate}
                                        onChange={this.onChange}
                                        className={!errors.company_fee_rate ? 'form-control' : 'form-control is-invalid'}
                                    />
                                    <div className="input-group-append" style={{height: 32+"px"}}>
                                        <span className="input-group-text">%</span>
                                    </div>
                                </div>
                                {errors.company_fee_rate && <InlineError text={errors.company_fee_rate}/>}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="form-group row group-button">
                    <div className="col-md-12 p-0 text-align-center">
                        <button 
                            type="button" 
                            onClick={this.onClickBack} 
                            id="search_btn" 
                            className="btn btn-sm btn-colorP"
                        >
                            <FormattedMessage
                                id='dashboard.cancel'
                                defaultMessage='Cancel'
                            />
                        </button>
                        <button
                            type="button"
                            id="submit_btn"
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

CreateStoreForm.propTypes = {
    submit: PropTypes.func.isRequired,
};

export default CreateStoreForm;
