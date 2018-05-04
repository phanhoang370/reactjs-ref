import React from 'react';
import './QrcodePrint.css'
import {FormattedMessage} from "react-intl"
import {NavLink} from 'react-router-dom'

class QrcodePrint extends React.Component {

    onSubmit = (e) => {
        e.preventDefault();

        window.print();
    };


    render() {
        const { qrcode1, qrcode2 } = this.props
        
        return (
            <div className='guider-add store-register' >
                <div className="main-form" >
                    <div className="form-group example-print" id="qrcode-main">
                        <div className="row">
                            <div className="col-md-12 p-0 text-align-center">
                                <div className="qrcode-1">
                                    <div>
                                        <img src={window.location.origin + '/common/images/qrcode/coupon_front1.png'} />
                                    </div>
                                    <div className="main-qrcode-1"  dangerouslySetInnerHTML={{__html: qrcode1}} />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12 p-0 text-align-center">
                                <div className="qrcode-2">
                                    <div>
                                        <img src={window.location.origin + '/common/images/qrcode/coupon_back1.png'} />
                                    </div>
                                    <div className="main-qrcode-2"  dangerouslySetInnerHTML={{__html: qrcode2}} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="form-group row">
                        <div className="col-md-12 p-0 text-align-center">
                            <NavLink activeClassName="active"
                                     className="btn btn-sm btn-colorP "
                                     id="search_btn"
                                     to="/dashboard/qrcode/generation">
                                <FormattedMessage
                                    id='dashboard.cancel'
                                    defaultMessage='Cancel'
                                />
                            </NavLink>
                            <button type="submit" onClick={this.onSubmit} id="search_btn" className="btn btn-sm btn-colorN ml-15"><FormattedMessage
                                id='dashboard.print'
                                defaultMessage='Print'
                            /></button>
                            {/*<button type="button" id="search_btn" className="btn btn-sm btn-colorN ml-15">Cancel</button>*/}

                        </div>
                    </div>
                </div>
                <iframe id="ifmcontentstoprint"></iframe>
            </div>
        );
    }
}


export default QrcodePrint;
