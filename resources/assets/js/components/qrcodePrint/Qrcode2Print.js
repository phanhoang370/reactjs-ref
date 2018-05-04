import React from 'react';
import './QrcodePrint.css'
import {NavLink} from 'react-router-dom'
import {FormattedMessage} from "react-intl"

let imgUrl = '/../common/images/qrcode/qrcode-back.jpg'
let sectionStyle = {
    backgroundImage: 'url(' + imgUrl + ')',
    backgroundSize: 'cover',
    width:"340px",
    height:"192px",
    margin: "auto -50%"
}

class Qrcode2Print extends React.Component {

    onSubmit = (e) => {
        e.preventDefault();
        let content = document.getElementById("qrcode2-main");
        let pri = document.getElementById("ifmcontentstoprint").contentWindow;
        pri.document.open();
        pri.document.write(content.innerHTML);
        pri.document.close();
        pri.focus();
        pri.print();
    };

    render() {
        return (
            <div className='guider-add store-register'>
                <h2 className='title-guider-add'><i className="fa fa-qrcode" aria-hidden="true"></i>QR code 2 Print</h2>
                <div className="main-form">

                    <form onSubmit={this.onSubmit}>
                        {
                            this.props.qrcode.length>0?(

                                <div className="form-group row print-qrcodes" id="qrcode2-main">
                                    <div className="main-name-qrcode2">
                                        <div className="background-qrcode image-bg-pqcode2">
                                            <div className="main-width">
                                                <div id='qrcode-main'>
                                                    <img src={'/../common/images/qrcode/qrcode-back.jpg'} />
                                                    <div className="content-qrcode2"
                                                         dangerouslySetInnerHTML={{__html: this.props.qrcode }}/>
                                                    <style dangerouslySetInnerHTML={{__html: `svg {width:80px;height:80px;}
                                                    .image-bg-pqcode2 {
                                                    margin: auto -50%;height:192px;width:340px;background-size: cover;
                                                    }
                                                    .content-qrcode2 {
                                                    text-align: center; width:80px; height:80px; overflow:hidden;position: absolute;left:38.5%;top: 105px;
                                                    }
                                                    #qrcode-main {
                                                    position:relative;
                                                    }
                                                    .main-width {
                                                    width:100%;
                                                    }
                                                    .main-name-qrcode2 {
                                                    width:100%;margin: auto 50%;
                                                    }
                                                    `}} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>



                            ):(
                                <h1>Please Generate Qrcode 2</h1>
                            )
                        }
                        <div className="form-group row">
                            <div className="col-md-12 p-0 text-align-center">
                                {/*<button type="button" id="search_btn" className="btn btn-sm btn-colorN ml-15">Cancel</button>*/}

                                <NavLink activeClassName="active"
                                         className="btn btn-sm btn-colorP "
                                         id="search_btn"
                                         to="/dashboard/qrcode/generation/qrcode2">
                                    <FormattedMessage
                                        id='dashboard.cancel'
                                        defaultMessage='Cancel'
                                    />
                                </NavLink>
                                <button type="submit" onClick={this.onSubmit} id="search_btn" className="btn btn-sm btn-colorN ml-15"><FormattedMessage
                                    id='dashboard.print'
                                    defaultMessage='Print'
                                /></button>

                            </div>

                        </div>
                    </form>
                </div>
                <iframe id="ifmcontentstoprint"></iframe>
            </div>
        );
    }
}


export default Qrcode2Print;
