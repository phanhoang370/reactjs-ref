import React from "react";
import PropTypes from "prop-types";
import Validator from "validator";
import InlineError from "../messages/InlineError";
import Card, {CardActions, CardContent} from 'material-ui/Card'
import Button from 'material-ui/Button'
import TextField from 'material-ui/TextField'

class CreateCountryForm extends React.Component {
    state = {
        data: {
            name: '',
        },
        loading: false,
        errors: {}
    };

    onChange = e =>
        this.setState({
            data: {...this.state.data, [e.target.name]: e.target.value}
        });

    onSubmit = () => {
        const errors = this.validate(this.state.data);
        this.setState({errors});
        if (Object.keys(errors).length === 0) {
            this.setState({loading: true});

            this.props
                .submit(this.state.data)
                    .catch(error => {
                        console.log(error.data);
                        this.setState({errors: {global: error.data.error}, loading: false})
                    });
        }
    };

    validate = data => {
        const errors = {};
        if (!data.name) errors.name = "Can't be blank";
        return errors;
    };

    render() {
        const {data, errors, loading} = this.state;

        return (
            <form>
                {errors.global && (<InlineError text={errors.global}/>)}
                <CardContent>
                    <TextField
                        error={!!errors.name}
                        fullWidth
                        id="name"
                        name="name"
                        label="name"
                        value={data.name}
                        type="text"
                        onChange={this.onChange}
                        autoComplete="off"
                    />
                    {errors.name && <InlineError text={errors.name}/>}
                </CardContent>
                <CardActions>
                    <Button color="primary" onClick={this.onSubmit}>Create</Button>
                </CardActions>
            </form>
        );
    }
}

CreateCountryForm.propTypes = {
    submit: PropTypes.func.isRequired
};

export default CreateCountryForm;
