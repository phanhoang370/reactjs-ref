import React from "react";
import PropTypes from "prop-types";
import Validator from "validator";
import 'react-select/dist/react-select.css';
import InlineError from './../../messages/InlineError'
import Select from 'react-select';
import { FormattedMessage } from "react-intl"
import { Link } from 'react-router-dom'
import GoogleMapStandaloneSearchBox from './../../GoogleMap/StandaloneSearchBox'
import { GOOGLE_MAP_URL } from './../../../constants/google'
import HasRole from './../../../utils/entrust/HasRole'

class EditCompanyForm extends React.Component {
    state = {
        data: {
            name: '',
            homepage: '',
            address: '',
            city: '',
            country: '',
            tel: '',
            seo: '',
            parent_commission_rate: '',
            contact_persion: '',
            contact_email: '',
        },
        loading: false,
        errors: {},
        selectedOption: '',
        selectedOptionCity: '',
        selectedOptionCountry: '',
    }

    handleChangeSelect = (selectedOption) => {
        this.setState({
            selectedOption: selectedOption,
            data: {
                ...this.state.data, 
                'manager_guid_id': selectedOption.value
            }
        })
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
        })

    onSubmit = (e) => {
        e.preventDefault();
        const errors = this.validate(this.state.data);
        this.setState({errors});
        if (Object.keys(errors).length === 0) {
            this.props
                .submit(this.state.data.company_id, this.state.data)
                    .catch(error => {
                        this.setState({errors: {global: error.data}, loading: false})
                    });
        }
    }

    validate = data => {
        const errors = {};
        if (!data.name) errors.name = "Can't be blank";
        if (!data.tel) errors.tel = "Can't be blank";
        if (!data.homepage) errors.homepage = "Can't be blank";
        if (!data.parent_commission_rate) errors.parent_commission_rate = "Can't be blank";
        else if (
            data.parent_commission_rate > 100
            || data.parent_commission_rate < 0
        ) errors.parent_commission_rate = "Invalid";
        if (!data.contact_persion) errors.contact_persion = "Can't be blank";
        if (!data.contact_email) errors.contact_email = "Can't be blank";
        else if (!Validator.isEmail(data.contact_email)) errors.contact_email = "Invalid email";
        return errors;
    }

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
                'country_code': storableLocation.registered_country_iso_code,
                'city': storableLocation.city,
                'country': storableLocation.country
            }
        })
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps && nextProps.company) {
            const { company } = nextProps;
            this.setState({
                data: {
                    company_id: company.company_id ? company.company_id : '',
                    name: company.company_name ? company.company_name : '',
                    address: company.company_address ? company.company_address : '',
                    city: company.city_id ? company.city.city_name : '',
                    country: company.country_id ? company.country.country_name : '',
                    tel: company.company_tel ? company.company_tel : '',
                    seo: company.ceo_name ? company.ceo_name : '',
                    homepage: company.home_page ? company.home_page : '',
                    parent_commission_rate: company.parent_commission_rate ? company.parent_commission_rate : '',
                    contact_persion: company.contact_persion ? company.contact_persion : '',
                    contact_email: company.contact_email ? company.contact_email : '',
                }
            });
        }
    }

    render() {
        const {
            data, 
            errors, 
            selectedOption, 
            selectedOptionCity, 
            selectedOptionCountry, 
        } = this.state
        const mapAddress = `${data.address}, ${data.city}, ${data.country}`

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
                            <div className="col-md-4 plr-0-desktop plr-mb-0"><label className="title-label">- <FormattedMessage
                                id='dashboard.company.name'
                                defaultMessage='Name of travel agency'
                            /></label></div>
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
                            <div className="col-md-4 plr-0-desktop plr-mb-0"><label className="title-label">- <FormattedMessage
                                id='dashboard.company.homepage'
                                defaultMessage='Travel Agency Homepage'
                            /></label></div>
                            <div className="col-md-8 p-0">
                                <input
                                    type="text"
                                    className={!errors.homepage ? 'form-control' : 'form-control is-invalid'}
                                    id="homepage"
                                    name="homepage"
                                    value={data.homepage}
                                    onChange={this.onChange}
                                />
                                {errors.homepage && <InlineError text={errors.homepage}/>}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="form-group row name-homepage">
                    <div className="col-md-6 p-0">
                        <div className="row m-0">
                            <div className="col-md-4 plr-0-desktop plr-mb-0"><label className="title-label">- <FormattedMessage
                                id='dashboard.company.phone'
                                defaultMessage='Travel agency telephone number'
                            /> </label></div>
                            <div className="col-md-8 p-0">
                                <input
                                    type="text"
                                    className={!errors.tel ? 'form-control' : 'form-control is-invalid'}
                                    id="tel"
                                    name="tel"
                                    value={data.tel}
                                    onChange={this.onChange}
                                />
                                {errors.tel && <InlineError text={errors.tel}/>}
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 p-0 mt-mb-10">
                        <div className="row m-0">
                            <div className="col-md-4 plr-0-desktop plr-mb-0"><label className="title-label">- <FormattedMessage
                                id='dashboard.ceo'
                                defaultMessage='CEO Name'
                            /></label></div>
                            <div className="col-md-8 p-0">
                                <input
                                    type="text"
                                    className={!errors.seo ? 'form-control' : 'form-control is-invalid'}
                                    id="seo"
                                    name="seo"
                                    value={data.seo}
                                    onChange={this.onChange}
                                />
                                {errors.seo && <InlineError text={errors.seo}/>}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="form-group row name-homepage">
                    <div className="col-md-6 p-0">
                        <div className="row m-0">
                            <div className="col-md-4 plr-0-desktop plr-mb-0">
                                <label className="title-label">
                                    - <FormattedMessage
                                        id='dashboard.store.address'
                                        defaultMessage='Address'
                                    />
                                </label>
                            </div>
                            <div className="col-md-8 p-0">
                                <GoogleMapStandaloneSearchBox
                                    onPlacesChanged={this.onPlacesChanged}
                                    placeholder={"Address"}
                                    googleMapURL={GOOGLE_MAP_URL}
                                    loadingElement={<div style={{ height: `100%` }} />}
                                    containerElement={<div style={{ height: `450px` }} />}
                                    mapElement={<div style={{ height: `100%` }} />}
                                    value={data.address}
                                    disabled={false}
                                    className={!errors.address ? 'form-control' : 'form-control is-invalid'}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 p-0 mt-mb-10">
                        <div className="row m-0">
                            <div className="col-md-4 plr-0-desktop plr-mb-0">
                                <label className="title-label">
                                    - Commission % of <HasRole role={'primarynet'}> Ontrip4u</HasRole> GP && RP
                                </label>
                            </div>
                            <div className="col-md-8 p-0">
                                <input
                                    type="number"
                                    className={!errors.parent_commission_rate ? 'form-control' : 'form-control is-invalid'}
                                    id="parent_commission_rate"
                                    name="parent_commission_rate"
                                    value={data.parent_commission_rate}
                                    onChange={this.onChange}
                                />
                                {errors.parent_commission_rate && <InlineError text={errors.parent_commission_rate}/>}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="form-group row name-homepage">
                    <div className="col-md-6 p-0">
                        <div className="row m-0">
                            <div className="col-md-4 plr-0-desktop plr-mb-0">
                                <label className="title-label">
                                    - contact persion of invoice
                                </label>
                            </div>
                            <div className="col-md-8 p-0">
                                <input
                                    type="text"
                                    className={!errors.contact_persion ? 'form-control' : 'form-control is-invalid'}
                                    id="contact_persion"
                                    name="contact_persion"
                                    value={data.contact_persion}
                                    onChange={this.onChange}
                                />
                                {errors.contact_persion && <InlineError text={errors.contact_persion}/>}
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 p-0 mt-mb-10">
                        <div className="row m-0">
                            <div className="col-md-4 plr-0-desktop plr-mb-0">
                                <label className="title-label">
                                    - Email for a contact persion
                                </label>
                            </div>
                            <div className="col-md-8 p-0">
                                <input
                                    type="text"
                                    className={!errors.contact_email ? 'form-control' : 'form-control is-invalid'}
                                    id="contact_email"
                                    name="contact_email"
                                    value={data.contact_email}
                                    onChange={this.onChange}
                                />
                                {errors.contact_email && <InlineError text={errors.contact_email}/>}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="form-group row group-button">
                    <div className="col-md-12 p-0 text-align-center">

                        <Link
                            to={'/dashboard/company'}
                            type="button"
                            id="cancel_btn"
                            className="btn btn-sm btn-colorP "
                        >
                            <FormattedMessage
                                id='dashboard.cancel'
                                defaultMessage='Cancel'
                            />
                        </Link>
                        <button onClick={this.onSubmit} className="btn btn-sm btn-colorN ml-15">
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

EditCompanyForm.propTypes = {
    submit: PropTypes.func.isRequired,
};

export default EditCompanyForm;
