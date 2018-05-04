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
import {connect} from 'react-redux'


import {FormattedMessage} from "react-intl"

const styles = theme => ({
    nested: {
        paddingLeft: theme.spacing.unit * 4,
    },
});

class GuidersListItems extends React.Component {

    state = {open: false};

    handleClick = () => {
        this.setState({open: !this.state.open});
    };

    render() {
        const { classes } = this.props;
        return (
            <div>
                <Divider/>
                <List>
                    <ListItem button>
                        <ListItemText primary='Primarynet'/>
                    </ListItem>
                    <Divider/>
                    <ListItem button>
                        <ListItemIcon>
                            <AssessmentIcon/>
                        </ListItemIcon>
                        <ListItemText primary={
                            <FormattedMessage
                                id='dashboard.report'
                                defaultMessage='Report'
                            />
                        }/>
                    </ListItem>

                    <ListItem button onClick={this.handleClick}>
                        <ListItemIcon>
                            <SendIcon/>
                        </ListItemIcon>
                        <ListItemText primary={
                            <FormattedMessage
                                id='dashboard.company'
                                defaultMessage='Company'
                            />
                        }/>
                        {this.state.open ? <ExpandLess/> : <ExpandMore/>}
                    </ListItem>
                    <Collapse in={this.state.open} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <List component="div" disablePadding>
                                <ListItem button className={classes.nested}>
                                    <ListItemIcon>
                                        <ViewListIcon/>
                                    </ListItemIcon>
                                    <ListItemText inset primary={<FormattedMessage
                                        id='dashboard.list'
                                        defaultMessage='List Company'
                                    />}/>
                                </ListItem>
                            </List>
                            <ListItem button className={classes.nested}>
                                <ListItemIcon>
                                    <AddCircleOutlineIcon/>
                                </ListItemIcon>
                                <ListItemText inset primary={
                                    <FormattedMessage
                                        id='dashboard.add'
                                        defaultMessage='Add Company'
                                    />
                                }/>
                            </ListItem>
                        </List>

                        <List component="div" disablePadding>
                            <ListItem button className={classes.nested}>
                                <ListItemIcon>
                                    <StarBorder/>
                                </ListItemIcon>
                                <ListItemText inset primary="Starred"/>
                            </ListItem>
                        </List>
                    </Collapse>
                    <ListItem button>
                        <ListItemIcon>
                            <SettingsIcon/>
                        </ListItemIcon>
                        <ListItemText primary={
                            <FormattedMessage
                                id='dashboard.setting'
                                defaultMessage='Setting'
                            />
                        }/>
                    </ListItem>
                </List>
            </div>
        );
    }
}

GuidersListItems.PropTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(GuidersListItems);
