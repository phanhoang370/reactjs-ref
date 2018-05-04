import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import classNames from 'classnames';
import Card, {CardHeader, CardMedia, CardContent, CardActions} from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';

const styles = theme => ({
    root : {

        // maxWidth: 1320,
        // alignSelf: 'center',
        // boxSizing: 'border-box',
        // marginLeft: 'auto',
        // marginRight: 'auto',
        // flexGrow: 1,
    },
});

class Footer extends React.Component {

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <div className="row">
                    <Typography gutterBottom variant="headline" component="h2">
                        Featured Venues
                    </Typography>
                    <Grid container spacing={16}>
                        <Grid item xs={12} sm={3}>
                            <Typography gutterBottom variant="headline" component="h2">
                                Lizard
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <Typography gutterBottom variant="headline" component="h2">
                                Lizard
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <Typography gutterBottom variant="headline" component="h2">
                                Lizard
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <Typography gutterBottom variant="headline" component="h2">
                                Lizard
                            </Typography>
                        </Grid>
                    </Grid>
                </div>
            </div>
        );
    }
}

Footer.propTypes = {
    classes: PropTypes.object.isRequired,

};

export default withStyles(styles, {withTheme: true})(Footer);
