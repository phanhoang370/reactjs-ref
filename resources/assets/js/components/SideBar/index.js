import React from 'react';
import PropTypes from 'prop-types';
// import {withStyles} from 'material-ui/styles';
import classNames from 'classnames';
// import Drawer from 'material-ui/Drawer';
// import IconButton from 'material-ui/IconButton';
// import ChevronLeftIcon from 'material-ui-icons/ChevronLeft';
// import ChevronRightIcon from 'material-ui-icons/ChevronRight';
import PrimarynetListItems from '../menu/PrimarynetListItems';
import CompanyListItems from '../menu/CompanyListItems';
import StoresListItems from '../menu/StoresListItems';
import GuidersListItems from '../menu/GuidersListItems';
import CityListItems from '../menu/CityListItems';
import CountryListItems from '../menu/CountryListItems';
// import Card, {CardHeader, CardMedia, CardContent, CardActions} from 'material-ui/Card';

const drawerWidth = 240;

const styles = theme => ({
    drawerPaper: {
        position: 'relative',
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
});

class SideBar extends React.Component {
    state = {
        anchor: 'left',
    };

    render() {
        const { classes, theme, handleDrawerClose, open, role } = this.props;
        const { anchor } = this.state;

        return (
            <Drawer
                variant="persistent"
                anchor={anchor}
                open={open}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerHeader}>
                    <CardMedia
                        className={classes.media}
                        image="https://picsum.photos/200/300/?random"
                        title="Contemplative Reptile"
                    />
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon/> : <ChevronLeftIcon/>}
                    </IconButton>
                </div>
                {role === 'primarynet' && <PrimarynetListItems/> }
                {role === 'company' && <CompanyListItems/> }
                {role === 'store' && <StoresListItems/> }
                {role === 'guider' && <GuidersListItems/> }
                <CityListItems/>
                <CountryListItems/>
            </Drawer>
        );
    }
}

SideBar.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
    role: PropTypes.string,
    open: PropTypes.bool.isRequired,
    handleDrawerClose: PropTypes.func.isRequired,
};

export default withStyles(styles, {withTheme: true})(SideBar);
