import React from "react";
import PropTypes from "prop-types";
import Validator from "validator";
import 'react-select/dist/react-select.css';
import InlineError from './../../messages/InlineError'
import Select from 'react-select';
import { FormattedMessage } from "react-intl"
import { Link } from 'react-router-dom'
import TableGuideLevel from './../../table/GuideLevel'
import GoogleMapStandaloneSearchBox from './../../GoogleMap/StandaloneSearchBox'
import { GOOGLE_MAP_URL } from './../../../constants/google'

class EditCompanyForm extends React.Component {
    state = {
        data: {
            guid_fee_rate: '',
            level: '',
            commission_rate: {},
        },
        loading: false,
        errors: {},
        selectedOption: '',
        selectedOptionLevel: ''
    }

    handleChangeLevel = (selectedOptionLevel) => {
        this.setState({
            selectedOptionLevel: selectedOptionLevel,
            data: { ...this.state.data, 
                'level': selectedOptionLevel.value
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

    onSubmit = (e) => {
        e.preventDefault();
        const errors = this.validate(this.state.data);
        this.setState({errors});
        if (Object.keys(errors).length === 0) {
            const childTableData = this.refs.childTable.getTableData()
            if (childTableData) {
                this.setState({
                    loading: true,
                    data: {
                        ...this.state.data, 
                        'commission_rate': childTableData
                    }
                }, () => {
                    console.log(1);
                    this.props
                        .submit(this.state.data)
                            .catch(error => {
                                this.setState({errors: {global: error.data}, loading: false})
                            });
                });
            }
        }
    }

    validate = data => {
        const errors = {};
        if (!data.level) errors.level = "Can't be blank";
        return errors;
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps && nextProps.company) {
            const { company } = nextProps;
            this.setState({
                data: {
                    guid_fee_rate: company.guid_fee_rate ? company.guid_fee_rate : '',
                    level: company.guide_level ? company.guide_level : '',
                    commission_rate: company.commission_rate ? company.commission_rate : {},
                },
                selectedOptionLevel:{
                    value: company.guide_level,
                    label: `Level ${company.guide_level}`,
                },
            });
        }
    }

    render() {
        const {
            data, 
            errors, 
            selectedOptionLevel
        } = this.state

        return (
            <form onSubmit={this.onSubmit}>
                {errors.global && (
                    Object.keys(errors.global).map((value, key) =>
                        <InlineError key={key} text={errors.global[value]}/>
                    )
                )}
                <div className="form-group row">
                    <div className="col-md-2 p-0">
                        <label className="title-label">- <FormattedMessage
                            id='dashboard.guider.commission'
                            defaultMessage='Guide commission'
                        /></label>
                    </div>
                    <div className="col-md-10 p-0">
                        <input
                            type="number"
                            className={!errors.guid_fee_rate ? 'form-control' : 'form-control is-invalid'}
                            id="guid_fee_rate"
                            name="guid_fee_rate"
                            value={data.guid_fee_rate}
                            onChange={this.onChange}
                        />
                        {errors.guid_fee_rate && <InlineError text={errors.guid_fee_rate}/>}
                    </div>
                </div>
                <div className="form-group row">
                    <div className="col-md-2 p-0">
                        <label className="title-label">- <FormattedMessage
                            id='dashboard.guider.level'
                            defaultMessage='Guider level'
                        /></label>
                    </div>
                    <div className="col-md-10 p-0">
                        <Select
                            name="form-field-name"
                            value={selectedOptionLevel}
                            onChange={this.handleChangeLevel}
                            options={[
                                { value: '', label: 'Choose guide level' },
                                { value: '1', label: 'Level 1' },
                                { value: '2', label: 'Level 2' },
                                { value: '3', label: 'Level 3' },
                                { value: '4', label: 'Level 4' },
                                { value: '5', label: 'Level 5' },
                            ]}
                        />
                        {errors.level && <InlineError text={errors.level}/>}
                    </div>
                </div>
                {
                    (data.level) && (
                        <div className="form-group row">
                            <div className="col-md-2 p-0">
                                <label className="title-label">
                                    - <FormattedMessage
                                        id='dashboard.commission.rate'
                                        defaultMessage='Commission rate'
                                    />
                                </label>
                            </div>
                            <div className="col-md-10 p-0" id="fee-rate">
                                <TableGuideLevel value={data.level} commissionRate={data.commission_rate} ref="childTable" />
                            </div>
                        </div>
                    )
                }
                <div className="form-group row group-button">
                    <div className="col-md-12 p-0 text-align-center">

                        <Link
                            to={'/'}
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
