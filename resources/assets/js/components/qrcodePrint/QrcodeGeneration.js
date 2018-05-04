import React from 'react';
import './QrcodeGeneration.css';
import Validator from "validator";
import InlineError from "../messages/InlineError";
import 'react-select/dist/react-select.css';
import Select from 'react-select';
import { FormattedMessage } from "react-intl"
import { NavLink } from 'react-router-dom'


let imgUrl = '../../common/images/qrcode/qrcode-front1.jpg'
let sectionStyle = {
    backgroundImage: 'url(' + imgUrl + ')',
    backgroundSize: 'cover',
    width:"340px",
    height:"192px",
    margin: "auto -50%"
}

class QrcodeGenerationComponent extends React.Component {

    state = {
        data: {
            serial: '',
            guid_id: '',
            guid_name: '',
        },
        loading: false,
        errors: {},
        selectedOption: '',
        qrcode: '',
        guide: ''
    }

    handleChangeSelect = (selectedOption) => {
        this.setState({
            selectedOption:selectedOption,
            data: {
                ...this.state.data, 
                'guid_name': selectedOption.guid_name,
                'guid_id': selectedOption.guid_id
            },
        });
    }

    onChange = e =>
        this.setState({
            data: {
                ...this.state.data, 
                [e.target.name]: e.target.value
            }
        })

    validateSerial = data => {
        const errors = {};
        if (!data.serial) errors.serial = "Can't blank";
        return errors;
    }

    onGenerateQRCode1 = (e) => {
        e.preventDefault();
        const errors = this.validateSerial(this.state.data);
        this.setState({errors});
        if (Object.keys(errors).length === 0) {
            this.setState({loading: true});
            this.props
                .submit(this.state.data)
                .catch((error) => {
                    if (!(Object.keys(error.response).length === 0 && error.response.constructor === Object)) {
                        this.setState({
                            errors: {
                                global: error.response.data
                            }, 
                            loading: false
                        });
                    }
                });
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps && nextProps.qrcode) {
            this.setState({
                qrcode: nextProps.qrcode.qrcode,
                guide: nextProps.qrcode.linkQrCompany ? nextProps.qrcode.linkQrCompany.guider.guid_name : ''
            })
        }
        if (nextProps && nextProps.qrcode1Number) {
            this.setState({
                ...this.state.data,
                data: {
                    serial: nextProps.qrcode1Number
                }
            })
        }
    }

    render() {
        const { data, errors, selectedOption, qrcode, guide } = this.state;
        const { guider } = this.props;
        const value = selectedOption && selectedOption.value;
        const selectGuider = guider.map(guider => ({
            value: guider.guid_id,
            label: guider.guid_name,
            guid_name: guider.guid_name,
            guid_id: guider.guid_id
        }))

        console.log(selectGuider);

        return (
            <div className='guider-add store-register'>
                <h2 className='title-guider-add'>
                    <i className="fa fa-qrcode" aria-hidden="true"></i>
                    <FormattedMessage
                        id='dashboard.qrcode1'
                        defaultMessage='QR code1 generation and output'
                    />
                </h2>
                <div className="main-form">
                    <form>
                        <div className="form-group row">
                            <div className="col-md-2 p-0">
                                <label className="title-label">
                                    - <FormattedMessage
                                    id='dashboard.qrcode.code1'
                                    defaultMessage=' QRcode 1 serial'
                                />
                                </label>
                            </div>
                            <div className="col-md-10 p-0">
                                <input
                                    type="text"
                                    className='form-control'
                                    id="serial"
                                    name="serial"
                                    value={data.serial}
                                    readOnly
                                />
                                {errors.serial && <InlineError text={errors.serial}/>}
                            </div>
                        </div>
                        <div className="form-group row">
                            <div className="col-md-12 p-0 pt-10-mb text-align-center">
                                <button type="button" onClick={this.onGenerateQRCode1} id="search_btn" className="btn btn-sm btn-colorN">
                                    <FormattedMessage
                                        id='dashboard.qrcode.make1'
                                        defaultMessage=' QRcode 1 serial'
                                    />
                                </button>
                            </div>
                        </div>
                        { qrcode && (
                            <div className="form-group row print-qrcodes">
                                <div style={{width:'100%', margin: "auto 50%"}}>
                                    <div className="background-qrcode" style={sectionStyle}>
                                        <div style={{textAlign:'right',width:'100%'}}>
                                            <div className="main-qrcode"  dangerouslySetInnerHTML={{__html: qrcode}} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        { (guide !== '') && (
                            <div className="form-group row">
                                <div className="col-md-2 p-0">
                                    <label className="title-label">
                                        - Linked guides
                                    </label>
                                </div>
                                <div className="col-md-10 p-0">
                                    <p>{guide}</p>
                                </div>
                            </div>
                        )}
                        <div className="form-group row">
                            <div className="col-md-2 p-0">
                                <label className="title-label">
                                    - <FormattedMessage
                                    id='dashboard.guider.list'
                                    defaultMessage=' Guide List'
                                />
                                </label>
                            </div>
                            <div className="col-md-10 p-0">
                                <Select
                                    name="guid_name"
                                    value={selectedOption.value}
                                    onChange={this.handleChangeSelect}
                                    options={selectGuider}
                                />
                                {errors.guid_name && <InlineError text={errors.guid_name}/>}
                            </div>
                        </div>
                        <div className="form-group row">
                            <div className="col-md-12 p-0 pt-10-mb text-align-center">
                                <NavLink
                                    activeClassName="active"
                                    className="btn btn-sm btn-colorP "
                                    id="search_btn"
                                    to="/dashboard/qrcode"
                                >
                                    <FormattedMessage
                                        id='dashboard.cancel'
                                        defaultMessage='Cancel'
                                    />
                                </NavLink>

                                <button type="button" onClick={this.onGenerateQRCode1} id="search_btn" className="btn btn-sm btn-colorN ml-15">
                                    <FormattedMessage
                                        id='dashboard.qrcode.make1'
                                        defaultMessage=' QRcode 1 serial'
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


export default QrcodeGenerationComponent;
