import React, { Component } from "react";

class Checkbox extends Component {
  state = {
    isChecked: false
  };

  componentDidMount() {
    this.setState({
      isChecked: this.props.checked || false
    })
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps && nextProps.checked) {
      this.setState({
        isChecked: nextProps.checked
      })
    }
  }

  toggleCheckboxChange = () => {
    const { handleCheckboxChange, value } = this.props;

    this.setState(({ isChecked }) => ({
      isChecked: !isChecked
    }));

    handleCheckboxChange(value);
  };

  render() {
    const { value, label, checked } = this.props;
    const { isChecked } = this.state;

    return (
      <div className="checkbox">
        <label>
          <input
            type="checkbox"
            value={value}
            checked={isChecked}
            onChange={this.toggleCheckboxChange}
          />
            <span className="label-text">{label}</span>

        </label>
      </div>
    );
  }
}

export default Checkbox;
