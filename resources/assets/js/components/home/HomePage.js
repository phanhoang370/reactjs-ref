import React from 'react';
import PropTypes from 'prop-types';
import './Home.css'
import { GOOGLE_MAP_URL } from './../../constants/google'
import MapWithAMarkerClusterer from './../GoogleMap/MapWithAMarkerClusterer'

class HomePageCompanyComponent extends React.Component {
    constructor(props) {
        super(props)
    }
    
    render() {
        const { storesLocation, defaultCenter, defaultZoom } = this.props

        return (
            <div className='guider-add store-register'>
                <div className="main-form">
                    <h1>Home page</h1>
                </div>
            </div>
        );
    }
}

HomePageCompanyComponent.propTypes = {
}

export default HomePageCompanyComponent;
