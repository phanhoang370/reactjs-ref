import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import RegisterStoreComponent from "../components/store/StoreRegister";
import { create, searchByNameAction, getOneStore, clearStoreAction } from "../actions/store";
import { getAllCity } from "../actions/city";
import { getAllCountry } from "../actions/country";
import { fetchTypeAction } from "../actions/type";

class CreateStoreContainer extends React.Component {
  componentDidMount() {
    this.props.getAllType();
  }

  componentWillUnmount() {
    this.props.clearStore();
  }

  submit = data =>
    this.props.create(data).then(() => this.props.history.push("/dashboard/store"));

  onSearchByName = data =>
    this.props.searchByName(data);

  onSelectStore = id => 
    this.props.getOneStore(id);

  render() {
    const { store, types } = this.props;

    return (
      <RegisterStoreComponent 
        submit={this.submit}
        onSearchByName={this.onSearchByName}
        onSelectStore={this.onSelectStore}
        store={store.data}
        types={types}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    store: state.store,
    types: state.types
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    create: data => dispatch(create(data)),
    searchByName: name => dispatch(searchByNameAction(name)),
    getOneStore: id => dispatch(getOneStore(id)),
    clearStore: () => dispatch(clearStoreAction()),
    getAllType: () => dispatch(fetchTypeAction())
  }
}

CreateStoreContainer.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  store: PropTypes.shape({
    data: PropTypes.object.isRequired
  }),
  types: PropTypes.shape({
    data: PropTypes.array.isRequired
  }),
  create: PropTypes.func.isRequired,
  getAllType: PropTypes.func.isRequired,
  searchByName: PropTypes.func.isRequired,
  getOneStore: PropTypes.func.isRequired,
  clearStore: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateStoreContainer);
