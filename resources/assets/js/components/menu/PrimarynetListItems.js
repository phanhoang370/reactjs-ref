import React from 'react'
import PropTypes from 'prop-types';
// import {withStyles} from 'material-ui/styles';
// import List, {ListItem, ListItemIcon, ListItemText} from 'material-ui/List'
// import Collapse from 'material-ui/transitions/Collapse';
// import SendIcon from 'material-ui-icons/Send'
// import AssessmentIcon from 'material-ui-icons/Assessment'
// import SettingsIcon from 'material-ui-icons/Settings'
// import StoreIcon from 'material-ui-icons/Store'
// import AddCircleOutlineIcon from 'material-ui-icons/AddCircleOutline'
// import ViewListIcon from 'material-ui-icons/ViewList'
// import Divider from 'material-ui/Divider';
// import ExpandLess from 'material-ui-icons/ExpandLess';
// import ExpandMore from 'material-ui-icons/ExpandMore';
// import StarBorder from 'material-ui-icons/StarBorder';
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'


import {FormattedMessage} from "react-intl"

const styles = theme => ({
        nested: {
            paddingLeft: theme.spacing.unit * 4,
        },
        textDecoration:
            {
                textDecoration: 'none'
            }
    })
;

class PrimarynetListItems extends React.Component {

    state = {open: false};

    handleClick = () => {
        this.setState({open: !this.state.open});
    };

    render() {
        const {classes} = this.props;
        return (
            <div>
                <Divider/>
                <List>
                    <NavLink to="/dashboard/report" className={classes.textDecoration}>
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
                    </NavLink>

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
                            <ListItem button className={classes.nested}>
                                <ListItemIcon>
                                    <ViewListIcon/>
                                </ListItemIcon>
                                <ListItemText inset primary={
                                    <FormattedMessage
                                        id='dashboard.store.list'
                                        defaultMessage='List Stores'
                                    />
                                }/>
                            </ListItem>
                        </List>
                        <List component="div" disablePadding>
                            <NavLink to="/dashboard/company/create">
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
                            </NavLink>
                        </List>

                        {/*=======*/}

                        {/*<ListItem button onClick={this.handleClick}>*/}
                        {/*<ListItemIcon>*/}
                        {/*<SendIcon/>*/}
                        {/*</ListItemIcon>*/}
                        {/*<ListItemText primary={*/}
                        {/*<FormattedMessage*/}
                        {/*id='dashboard.company'*/}
                        {/*defaultMessage='Company'*/}
                        {/*/>*/}
                        {/*}/>*/}
                        {/*{this.state.open ? <ExpandLess/> : <ExpandMore/>}*/}
                        {/*</ListItem>*/}
                        {/*<Collapse in={this.state.open} timeout="auto" unmountOnExit>*/}
                        {/*<List component="div" disablePadding>*/}
                        {/*<NavLink to="/dashboard/company">*/}
                        {/*<ListItem button className={classes.nested}>*/}
                        {/*<ListItemIcon>*/}
                        {/*<ViewListIcon/>*/}
                        {/*</ListItemIcon>*/}
                        {/*<ListItemText inset primary={*/}
                        {/*<FormattedMessage*/}
                        {/*id='dashboard.store.list'*/}
                        {/*defaultMessage='List Stores'*/}
                        {/*/>*/}
                        {/*}/>*/}
                        {/*</ListItem>*/}
                        {/*</NavLink>*/}
                        {/*</List>*/}
                        {/*<List component="div" disablePadding>*/}
                        {/*<NavLink to="/company/create">*/}
                        {/*<ListItem button className={classes.nested}>*/}
                        {/*<ListItemIcon>*/}
                        {/*<AddCircleOutlineIcon/>*/}
                        {/*</ListItemIcon>*/}
                        {/*<ListItemText inset primary={*/}
                        {/*<FormattedMessage*/}
                        {/*id='dashboard.add'*/}
                        {/*defaultMessage='Add Company'*/}
                        {/*/>*/}
                        {/*}/>*/}
                        {/*</ListItem>*/}
                        {/*</NavLink>*/}
                        {/*</List>*/}

                        {/*>>>>>>> e16ede62a9579b9a68d13dcb0e76ccb274c35728*/}
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
                    <List component="div">
                        <NavLink to="/dashboard/list-store" className={classes.textDecoration}>
                            <ListItem button>
                                <ListItemIcon>
                                    <StoreIcon/>
                                </ListItemIcon>
                                <ListItemText inset primary={
                                    <FormattedMessage
                                        id='dashboard.list-store'
                                        defaultMessage='List Store'
                                    />
                                }/>
                            </ListItem>
                        </NavLink>
                    </List>


                </List>
            </div>
        );
    }
}

PrimarynetListItems.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(PrimarynetListItems);
