import React from 'react';
import PropTypes from 'prop-types';
import './Company.css';
import {FormattedMessage} from "react-intl"

class CompanyInformationComponent extends React.Component {
    render() {
        return (
            <div className='guider-add info-company'>
                <h2 className='title-guider-add'><i className="fa fa-plane" aria-hidden="true"></i>-<FormattedMessage
                    id='dashboard.company.title.info'
                    defaultMessage='Travel agency informationt'
                /></h2>
                <div className="main-form">
                    <div className="content-form">
                        <form>
                            <div className="form-group row">
                                <div className="col-md-2 p-0">
                                    <label className="title-label">- <FormattedMessage
                                        id='dashboard.company.id'
                                        defaultMessage='Travel agent ID'
                                    /></label>
                                </div>
                                <div className="col-md-10 p-0">
                                    <input type="text" disabled value="abcdefg0005" className="form-control"/>
                                </div>
                            </div>
                            <div className="form-group row name-homepage">
                                <div className="col-md-6 p-0">
                                    <div className="row m-0">
                                        <div className="col-md-4 plr-0-desktop plr-mb-0"><label className="title-label">- <FormattedMessage
                                            id='dashboard.company.name'
                                            defaultMessage='Name of travel agency'
                                        /></label></div>
                                        <div className="col-md-8 p-0"><input type="text" className="form-control"/></div>
                                    </div>
                                </div>
                                <div className="col-md-6 p-0 mt-mb-5">
                                    <div className="row m-0">
                                        <div className="col-md-4 plr-0-desktop plr-mb-0"><label className="title-label">- <FormattedMessage
                                            id='dashboard.company.homepage'
                                            defaultMessage='Travel Agency Homepage'
                                        /></label></div>
                                        <div className="col-md-8 p-0"><input type="text" className="form-control"/></div>
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
                                        <div className="col-md-8 p-0"><input type="text" className="form-control"/></div>
                                    </div>
                                </div>
                                <div className="col-md-6 p-0 mt-mb-10">
                                    <div className="row m-0">
                                        <div className="col-md-4 plr-0-desktop plr-mb-0"><label className="title-label">- <FormattedMessage
                                            id='dashboard.company.agent'
                                            defaultMessage='Travel agent'
                                        /></label></div>
                                        <div className="col-md-8 p-0"><input type="text" className="form-control"/></div>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group row">
                                <div className="col-md-2 p-0">
                                    <label className="title-label">- <FormattedMessage
                                        id='dashboard.company.address'
                                        defaultMessage='Travel agency address'
                                    /></label>
                                </div>
                                <div className="col-md-10 p-0 content-address">
                                    <div className='main-address'>
                                        <input type="text" className="form-control"/>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group row">
                                <div className="col-md-2 p-0">
                                    <label className="title-label">- <FormattedMessage
                                        id='dashboard.guide.fee'
                                        defaultMessage='Guide fee'
                                    /></label>
                                </div>
                                <div className="col-md-10 p-0">
                                    <input type="text" className="form-control"/>
                                </div>
                            </div>
                            <div className="form-group row">
                                <div className="col-md-2 p-0">
                                    <label className="title-label">- <FormattedMessage
                                        id='dashboard.guide.fee.rate'
                                        defaultMessage='Guide fee calculation rate'
                                    /></label>
                                </div>
                                <div className="col-md-10 p-0">
                                    <input type="text" className="form-control"/>
                                </div>
                            </div>
                            <div className="form-group row group-button">
                                <div className="col-md-12 p-0 text-align-center">
                                    <button type="button" id="search_btn" className="btn btn-sm btn-colorP "><FormattedMessage
                                        id='dashboard.cancel'
                                        defaultMessage='Cancel'
                                    /></button>
                                    <button type="button" id="search_btn" className="btn btn-sm btn-colorN ml-15"><FormattedMessage
                                        id='dashboard.confirm'
                                        defaultMessage='Confirm'
                                    /></button>
                                </div>

                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}


export default CompanyInformationComponent;