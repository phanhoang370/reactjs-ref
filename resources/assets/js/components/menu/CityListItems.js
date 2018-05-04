import React from 'react'
import PropTypes from 'prop-types';
// import {withStyles} from 'material-ui/styles';
// import List, {ListItem, ListItemIcon, ListItemText} from 'material-ui/List'
// import Collapse from 'material-ui/transitions/Collapse';
// import SendIcon from 'material-ui-icons/Send'
// import AssessmentIcon from 'material-ui-icons/Assessment'
// import SettingsIcon from 'material-ui-icons/Settings'
// import AddCircleOutlineIcon from 'material-ui-icons/AddCircleOutline'
// import ViewListIcon from 'material-ui-icons/ViewList'
// import Divider from 'material-ui/Divider';
// import ExpandLess from 'material-ui-icons/ExpandLess';
// import ExpandMore from 'material-ui-icons/ExpandMore';
// import StarBorder from 'material-ui-icons/StarBorder';
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'


import {FormattedMessage} from "react-intl"

const styles = theme => ({
    nested: {
        paddingLeft: theme.spacing.unit * 4,
    },
});

class CityListItems extends React.Component {

    state = {open: false};

    handleClick = () => {
        this.setState({open: !this.state.open});
    };

    render() {
        const { classes } = this.props;
        return (
            <div>
                <List>
                    <Divider/>
                    <ListItem button onClick={this.handleClick}>
                        <ListItemIcon>
                            <SendIcon/>
                        </ListItemIcon>
                        <ListItemText primary={
                            <FormattedMessage
                                id='dashboard.city'
                                defaultMessage='City'
                            />
                        }/>
                        {this.state.open ? <ExpandLess/> : <ExpandMore/>}
                    </ListItem>
                    <Collapse in={this.state.open} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <NavLink to="/dashboard/city">
                                <ListItem button className={classes.nested}>
                                    <ListItemIcon>
                                        <ViewListIcon/>
                                    </ListItemIcon>
                                    <ListItemText inset primary={<FormattedMessage
                                        id='dashboard.city.list'
                                        defaultMessage='List City'
                                    />}/>
                                </ListItem>
                            </NavLink>
                        </List>
                        <List component="div" disablePadding>
                            <NavLink to="/dashboard/city/create">
                                <ListItem button className={classes.nested}>
                                    <ListItemIcon>
                                        <AddCircleOutlineIcon/>
                                    </ListItemIcon>
                                    <ListItemText inset primary={
                                        <FormattedMessage
                                            id='dashboard.city.add'
                                            defaultMessage='Add City'
                                        />
                                    }/>
                                </ListItem>
                            </NavLink>
                        </List>
                    </Collapse>
                </List>
            </div>
        );
    }
}

CityListItems.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(CityListItems);
