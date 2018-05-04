import React, { Component } from "react";
import InlineError from './../messages/InlineError'

class TableGuideLevel extends Component {

  constructor(props) {
    super(props);
    const data = {}
    for (var i = props.value; i > 0; i--){
      for (var idx = 0; idx < props.value; idx++){
        let levelID = `level${i}-${idx+1}`
        if (idx < i) {
          data[levelID] = ''
        }
      }
    }
    this.state = {
      data,
      errors: {},
    }
  }

  componentDidMount() {
    if (this.props.commissionRate) {
      const data = {}
      for (var i = this.props.value; i > 0; i--){
        for (var idx = 0; idx < this.props.value; idx++){
          let levelID = `level${i}-${idx+1}`
          if (idx < i) {
            data[levelID] = this.props.commissionRate[levelID] ? this.props.commissionRate[levelID] : ''
          }
        }
      }
      this.setState({
        data
      })
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps && nextProps.commissionRate) {
      const data = {}
      for (var i = nextProps.value; i > 0; i--){
        for (var idx = 0; idx < nextProps.value; idx++){
          let levelID = `level${i}-${idx+1}`
          if (idx < i) {
            data[levelID] = nextProps.commissionRate[levelID] ? nextProps.commissionRate[levelID] : ''
          }
        }
      }
      this.setState({
        data
      })
    }
  }

  getTableData = () => {
    const errors = this.validate(this.state.data);
    this.setState({errors});
    if (Object.keys(errors).length === 0) {
      return this.state.data;
    } else {
      return false
    }
  }

  validate = data => {
    const errors = {};
    for (var i = this.props.value; i > 0; i--) {
      let count = 0;
      for (var idx = 0; idx < this.props.value; idx++) {
        let levelID = `level${i}-${idx+1}`
        if (idx < i) {
          count = count + Number(data[levelID]);
          if (!data[levelID]) {
            errors[levelID] = "Can't be blank";
          }
        }
      }
      if (count !== 100) {
        errors['level'+i] = 'Sum must be equal 100'
      }
    }
    
    return errors;
  };

  onChange = e => {
    this.setState({
      data: {...this.state.data, [e.target.name]: e.target.value}
    })
  }

  renderHeader = (value) => {
    let level = []
    level.push(
      <th key={0}>
        Hierarchy rank
      </th>
    )
    for (var idx = 0; idx < value; idx++){
      let levelID = `level${idx}`
      level.push(
        <th key={levelID} id={levelID} className="text-center">
          {idx + 1}
        </th>
      )
    }
    return level;
  }

  renderBody = (value, data) => {
    let rows = [];
    for (var i = value; i > 0; i--){
      let rowID = `row${i}`
      let level = []
      level.push(
        <td key={0}>
          Guide level {i}
          {this.state.errors['level'+i] && <InlineError text={this.state.errors['level'+i]}/>}
        </td>
      )
      for (var idx = 0; idx < value; idx++){
        let levelID = `level${i}-${idx+1}`
        level.push(
          <td key={levelID} id={levelID}>
            {
              (idx < i) ? (
                <div >
                  <div className="input-group">
                    <input 
                      type="number" 
                      className={!this.state.errors.name ? 'form-control' : 'form-control is-invalid'}
                      id={levelID}
                      name={levelID}
                      value={data[levelID]}
                      onChange={this.onChange}
                      max={100}
                    />
                    <div className="input-group-append" style={{height: 32+"px"}}>
                      <span className="input-group-text">%</span>
                    </div>
                  </div>
                  {this.state.errors[levelID] && <InlineError text={this.state.errors[levelID]}/>}
                </div>
              ) : null}
          </td>
        )
      }
      rows.push(<tr key={i} id={rowID}>{level}</tr>)
    }
    return rows;
  }

  render() {
    const { value } = this.props;
    const { data } = this.state;

    return (
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              {this.renderHeader(value)}
            </tr>
          </thead>
          <tbody>
            {this.renderBody(value, data)}
          </tbody>
        </table>
      </div>
    );
  }
}

export default TableGuideLevel;
