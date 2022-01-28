import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './Dropdown.style.css';
import noop from 'lodash/noop';

class Dropdown extends Component {
  state = {
    selectValue: ''
  };

  handleChange = (e) => {
    this.setState({selectValue: e.target.value});
    this.props.onChange(e.target.value);
  };
    
  render () {
    return (this.props.listData && this.props.listData.length > 0) ? <select className='form-select selection' value={this.state.selectValue} onChange={this.handleChange} >
      <option value=''>กรุณาเลือก</option>
      {this.props.listData.map(({title, value}, i) => <option key={i} value={value}>{title}</option>)}
    </select> : null;
  }
}

Dropdown.defaultProps = {
  listData: [],
  onChange: noop
};
  
Dropdown.propTypes = {
  listData: PropTypes.array,
  onChange: PropTypes.func
};

export default Dropdown;