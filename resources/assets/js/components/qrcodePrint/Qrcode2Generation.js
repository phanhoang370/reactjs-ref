import React from 'react';
import './QrcodeGeneration.css';
import {FormattedMessage} from "react-intl"
import InlineError from "../messages/InlineError";
import 'react-select/dist/react-select.css';
import Select from 'react-select';
import {NavLink} from 'react-router-dom'


class Qrcode2GenerationComponent extends React.Component {

    state = {
        data: {
            store_id: '',
            store_email: '',
            store_name: '',
            store_phone: '',
            store_address: '',
        },
        loading: false,
        errors: {},
        selectedOption: '',
    };

    handleChangeSelect = (selectedOption) => {
        this.setState({
            selectedOption:selectedOption,
            data: {...this.state.data,
                'store_id': selectedOption.value,
                'store_email': selectedOption.store_email,
                'store_name': selectedOption.store_name,
                'store_phone': selectedOption.store_phone,
                'store_address': selectedOption.store_address
            },
        });
    }

    validate = data => {
        const errors = {};
        if (!data.store_id) errors.store_id = "Invalid ID store";
        return errors;
    };

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

    render() {
        const {data, errors, selectedOption} = this.state;
        const value = selectedOption && selectedOption.value;
        const selectStore = this.props.store.map(store => ({
            value: store.store_id,
            label: store.store_id,
            store_email: store.store_email,
            store_name: store.store_name,
            store_phone: store.store_phone,
            store_address: store.store_address
        }))
        return (
            <div className='guider-add store-register'>
                <h2 className='title-guider-add'><i className="fa fa-qrcode" aria-hidden="true"></i>
                    <FormattedMessage
                        id='dashboard.qrcode2'
                        defaultMessage='QR code 2 generation and output'
                    />
                </h2>
                <div className="main-form">
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group row">
                            <div className="col-md-6 p-0">
                                <div className="row m-0">
                                    <div  className="col-md-3 plr-0-desktop plr-mb-0">
                                        <label className="title-label">- <FormattedMessage
                                            id='dashboard.store.id'
                                            defaultMessage='Store ID'
                                        /></label>
                                    </div>
                                    <div className="col-md-9 p-0">
                                        <Select
                                            name="guid_email"
                                            value={selectedOption.value}
                                            onChange={this.handleChangeSelect}
                                            options={selectStore}
                                        />
                                        {errors.store_id && <InlineError text={errors.store_id}/>}
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 p-0 mt-mb-5">
                                <div className="row m-0">
                                    <div  className="col-md-3 plr-0-desktop plr-mb-0">
                                        <label className="title-label">- <FormattedMessage
                                            id='dashboard.store.email'
                                            defaultMessage='Store Email'
                                        /></label>
                                    </div>
                                    <div className="col-md-9 p-0">
                                        <input
                                            type="text"
                                            className='form-control'
                                            id="store_email"
                                            name="store_email"
                                            value={data.store_email}
                                            onChange={this.onChange}
                                            disabled={1}
                                        />
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="form-group row">


                            <div className="col-md-6 p-0">
                                <div className="row m-0">
                                    <div  className="col-md-3 plr-0-desktop plr-mb-0">
                                        <label className="title-label">- <FormattedMessage
                                            id='dashboard.store.name'
                                            defaultMessage='Store Name'
                                        /></label>
                                    </div>
                                    <div className="col-md-9 p-0">
                                        <input
                                            type="text"
                                            className='form-control'
                                            id="store_name"
                                            name="store_name"
                                            value={data.store_name}
                                            onChange={this.onChange}
                                            disabled={1}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 p-0 mt-mb-5">
                                <div className="row m-0">
                                    <div  className="col-md-3 plr-0-desktop plr-mb-0">
                                        <label className="title-label">- <FormattedMessage
                                            id='dashboard.store.phone'
                                            defaultMessage='Store phone'
                                        /></label>
                                    </div>
                                    <div className="col-md-9 p-0">
                                        <input
                                            type="text"
                                            className='form-control'
                                            id="store_phone"
                                            name="store_phone"
                                            value={data.store_phone}
                                            onChange={this.onChange}
                                            disabled={1}
                                        />
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="form-group row">


                            <div className="col-md-6 p-0">
                                <div className="row m-0">
                                    <div  className="col-md-3 plr-0-desktop plr-mb-0">
                                        <label className="title-label">- <FormattedMessage
                                            id='dashboard.store.address'
                                            defaultMessage='Store Address'
                                        /></label>
                                    </div>
                                    <div className="col-md-9 p-0">
                                        <input
                                            type="text"
                                            className='form-control'
                                            id="store_address"
                                            name="store_address"
                                            value={data.store_address}
                                            onChange={this.onChange}
                                            disabled={1}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 p-0 mt-mb-5">
                                <div className="row m-0"></div>
                            </div>

                        </div>
                        <div className="form-group row">
                            <div className="col-md-12 p-0 pt-10-mb text-align-center">

                                {/*<button type="button" id="search_btn" className="btn btn-sm btn-colorN ml-15">Cancel</button>*/}
                                <NavLink activeClassName="active"
                                         className="btn btn-sm btn-colorP"
                                         id="search_btn"
                                         to="/dashboard/qrcode/generation">
                                    <FormattedMessage
                                        id='dashboard.cancel'
                                        defaultMessage='Cancel'
                                    />
                                </NavLink>

                                <button type="submit" onClick={this.onSubmit} id="search_btn" className="btn btn-sm btn-colorN ml-15"><FormattedMessage
                                    id='dashboard.confirm'
                                    defaultMessage='Confirm'
                                /></button>
                            </div>

                        </div>
                    </form>
                </div>
            </div>
        );
    }
}


export default Qrcode2GenerationComponent;