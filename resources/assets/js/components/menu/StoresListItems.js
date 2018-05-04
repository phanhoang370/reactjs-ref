import React from 'react'
import PropTypes from 'prop-types';
// import {withStyles} from 'material-ui/styles';
// import List, {ListItem, ListItemIcon, ListItemText} from 'material-ui/List'
// import AssessmentIcon from 'material-ui-icons/Assessment'
// import SettingsIcon from 'material-ui-icons/Settings'
// import AddToQueueIcon from 'material-ui-icons/AddToQueue'
// import Divider from 'material-ui/Divider';
import {connect} from 'react-redux'
import {FormattedMessage} from "react-intl"

class StoresListItems extends React.Component {

    render() {
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

                    <ListItem button>
                        <ListItemIcon>
                            <AddToQueueIcon/>
                        </ListItemIcon>
                        <ListItemText primary={
                            <FormattedMessage
                                id='dashboard.store.regiser'
                                defaultMessage='Regiser Payment'
                            />
                        }/>
                    </ListItem>

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

StoresListItems.propTypes = {
}

export default StoresListItems;
