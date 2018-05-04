import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import EditStoreComponent from "../components/store/StoreEdit";
import { editStoreAction, getOneStore, clearStoreAction } from "../actions/store";
import { companyGetOneStoreAction } from "../actions/company";
import { getAllCity } from "../actions/city";
import { getAllCountry } from "../actions/country";
import { fetchTypeAction } from "../actions/type";
import PageNotFound from './../components/Errors/PageNotFound'

class EditStoreContainer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            store: {},
            error: false
        }
    }
  submit = (id, data) =>
    this.props.edit(id, data)
      .then(() => this.props.history.push("/dashboard/store"))

  componentDidMount(){
    this.props.getOneStore(this.props.match.params.id)
    this.props.getAllType()
  }

  componentWillUnmount() {
    this.props.clearStore()
  }
    componentWillReceiveProps(nextProps) {
        if (nextProps && nextProps.store) {
            this.setState({
                store: nextProps.store.data,
                error: nextProps.store.error
            })
        }
    }

  render() {
    const { types } = this.props;
      const { store, error } = this.state

    if (error) {
      return <PageNotFound />
    }

    return (
      <EditStoreComponent 
        submit={this.submit}
        store={store}
        types={types}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    store: state.store,
    types: state.types
  }
}

function mapDispatchToProps(dispatch) {
  return {
    edit: (id, data) => dispatch(editStoreAction(id, data)),
    getOneStore: id => dispatch(companyGetOneStoreAction(id)),
    getAllType: () => dispatch(fetchTypeAction()),
    clearStore: () => dispatch(clearStoreAction()),
  }
}

EditStoreContainer.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  store: PropTypes.shape({
    data: PropTypes.object.isRequired
  }),
  types: PropTypes.shape({
    data: PropTypes.array.isRequired
  }),
  edit: PropTypes.func.isRequired,
  getOneStore: PropTypes.func.isRequired,
  clearStore: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditStoreContainer);
