import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import CreateCityForm from "../forms/CreateCityForm";
import {create} from "../../actions/city";
import {FormattedMessage} from "react-intl"
import {NavLink} from 'react-router-dom'


class ListStoreTraveler extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            active: false,
            id: null
        };
    }

    onTypeClick = id => {
        this.props.onTypeClick(id);
        this.setState({
            id: id
        })
    }

    render() {
        const { types, stores} = this.props
        const { id } = this.state;

        return (
            <div className="main-traveler-list-store">

                <div className="row m-0">
                    <div className="col-4 col-sm-4 text-align-center item-select">
                        <a href="#" className={id === null ? 'active' : ''} onClick={() => this.onTypeClick('')}>All</a>
                    </div>
                    {types.data.map((item, i) =>
                        (<div className="col-4 col-sm-4 text-align-center item-select" key={i}>
                            <a href="#" className={item.type_id == id ? 'active' : ''} onClick={() => this.onTypeClick(item.type_id)}>{item.type_name}</a>
                        </div>)
                    )}
                </div>
                <div className="main-scroll">
                    {stores.data.map(function (item, i) {
                        return (<div className="row main-content-card" key={i}>
                            <div className="col-md-12">
                                <div className="card">
                                    <h6 className="title-card">
                                        {
                                            item.link_company_stores.length === 0 
                                            ? '0%' 
                                            : item.link_company_stores[0].min_rate == item.link_company_stores[0].max_rate
                                            ? `${item.link_company_stores[0].min_rate}%`
                                            : `${item.link_company_stores[0].min_rate}% - ${item.link_company_stores[0].max_rate}%`
                                        } discount if you show our QR Code
                                    </h6>
                                    <div className="row border-bottom m-0">
                                        <div className="col-5 mb-2 mt-2 first-icon-circle pr-0"><span><FormattedMessage
                                            id='dashboard.store.name'
                                            defaultMessage='Home'
                                        /></span>
                                        </div>
                                        <div className="col-7 border-left mb-2 mt-2"><span>{item.store_name}</span></div>
                                    </div>
                                    <div className="row border-bottom m-0">
                                        <div className="col-5 mb-2 mt-2 first-icon-circle pr-0"><span><FormattedMessage
                                            id='dashboard.store.phone'
                                            defaultMessage='Home'
                                        /></span>
                                        </div>
                                        <div className="col-7 border-left mb-2 mt-2">{item.store_phone}</div>
                                    </div>
                                    <div className="row border-bottom m-0">
                                        <div className="col-5 mb-2 mt-2 first-icon-circle pr-0">
                                            <span><FormattedMessage
                                                id='dashboard.description'
                                                defaultMessage='Home'
                                            /></span></div>
                                        <div className="col-7 border-left mb-2 mt-2"><span>{item.description}</span></div>
                                    </div>
                                    <div className="row border-bottom m-0">
                                        <div className="col-5 mb-2 mt-2 first-icon-circle pr-0">
                                            <span><FormattedMessage
                                                id='dashboard.store.type'
                                                defaultMessage='Type'
                                            /></span></div>
                                        <div className="col-7 border-left mb-2 mt-2"><span>{item.type.type_name}</span></div>
                                    </div>
                                    <div className="row content-button">
                                        <div className="main-content-button text-align-right">
                                            <button  className="float-right"><i className="fa fa-map-marker"></i><FormattedMessage
                                                id='dashboard.go.map'
                                                defaultMessage='Go to the map'
                                            />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>)
                    })}
                </div>


            </div>
        );
    }
}


export default ListStoreTraveler;
