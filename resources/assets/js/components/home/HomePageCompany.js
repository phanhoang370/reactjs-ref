import React from 'react';
import PropTypes from 'prop-types';
import './Home.css'
import { GOOGLE_MAP_URL } from './../../constants/google'
import MapWithAMarkerClusterer from './../GoogleMap/MapWithAMarkerClusterer'
import { FormattedMessage } from "react-intl"

class HomePageCompanyComponent extends React.Component {
    constructor(props) {
        super(props)
    }

    renderBody = () => 
        this.props.stores.map((store, index) => (
            <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{store.store_name}</td>
                <td>{store.dc_rate} %</td>
            </tr>
        ))
    
    render() {
        const { storesLocation, defaultCenter, defaultZoom } = this.props

        return (
            <div className='guider-add store-register'>
                <div className="main-form">
                    <div className="row">
                        <div className="col-md-4 map-list-left">
                            <div className="row m-0">
                                <div className="col-md-5 item-title background-item"><span><FormattedMessage
                                    id='dashboard.store.of'
                                    defaultMessage='Of store'
                                /></span></div>
                                <div className="col-md-7 item-title background-value"><span>10</span></div>
                            </div>
                            <div className="row pb-5 pt-1 m-0">
                                <div className="col-md-5 item-title background-item"><span><FormattedMessage
                                    id='dashboard.store.total'
                                    defaultMessage='Store total sales'
                                /></span></div>
                                <div className="col-md-7 item-title background-value"><span>100 000 000 vnd</span></div>
                            </div>
                            <table className="table table-striped table-bordered">
                                <thead className="thead-dark">
                                    <tr>
                                        <th scope="col" colSpan={3} className="text-center backgournd-blue">
                                            <h3 className="title-top-store"><FormattedMessage
                                                id='dashboard.store.top'
                                                defaultMessage='Top 10 Store'
                                            /></h3>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.renderBody()}
                                </tbody>
                            </table>
                        </div>
                        <div className="col-md-8">
                            <MapWithAMarkerClusterer
                                googleMapURL={GOOGLE_MAP_URL}
                                loadingElement={<div style={{ height: `100%` }} />}
                                containerElement={<div style={{ height: `545px` }} />}
                                mapElement={<div style={{ height: `100%` }} />}
                                markers={storesLocation}
                                defaultCenter={defaultCenter}
                                gridSize={60}
                                defaultZoom={defaultZoom}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

HomePageCompanyComponent.propTypes = {
}

export default HomePageCompanyComponent;
