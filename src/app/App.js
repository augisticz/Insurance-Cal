import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './App.style.css';
import Dropdown from './components/common/Dropdown/Dropdown.component';
import {
  genderList,
  planList,
  paymentPeriodList,
  calType,
  displayType,
  displayPeriod
} from './configs/configStaticValue.config';
import {connect} from 'react-redux';
import {getProductInsurance} from './redux/actions/index.actions';
import {result, noop} from 'lodash';
import moment from 'moment';

const formatter = new Intl.NumberFormat('en-US', {
  currency: 'THB'
});
class App extends Component {
  state = {
    gender: '',
    plan: '',
    period: '',
    resultInsurance: '',
    type: '',
    premiumPerYear: '',
    saPerYear: '',
    isClick: false,
    dob: ''
  };

  static getDerivedStateFromProps = (nextProps, state) => {
    if (nextProps.resultInsurance && nextProps.resultInsurance !== state.resultInsurance) {
      return {resultInsurance: nextProps.resultInsurance};
    }
    return null;
  };

  checkReq = () => {
    const {premiumPerYear, saPerYear, type, period} = this.state;
    return Boolean((parseFloat(premiumPerYear) > 0 || parseFloat(saPerYear) > 0) 
      && type
      && period);
  };

  onChangeType = (value) => {
    this.setState({resultInsurance: '', type: value});
  };

  onChangePeriod = (value) => {
    this.setState({resultInsurance: '', period: value});
  };

  renderResult = () => {
    const {resultInsurance, period, type} = this.state;
    return this.checkReq()
      ? resultInsurance.baseSumAssured ? <div className='card card-container'>
        <div className='card-body'>
          <span>{`${displayType[type]} : ${formatter.format(parseFloat(resultInsurance.baseSumAssured).toFixed(2))} บาท / ${displayPeriod[period]}`}</span> 
        </div>
      </div> : null
      : <div className='card card-container-err'>
        <div className='card-body'>
          <span>กรุณากรอกข้อมูลที่ต้องคำนวณให้ครบ</span>
        </div>
      </div>;
  };

  onClickCalculate = () => {
    const {gender, plan, premiumPerYear, period, saPerYear, type, dob} = this.state;
    const {getProduct} = this.props;

    this.setState({isClick: true});
    if (this.checkReq()) {
      const data = {
        genderCd: gender,
        dob: dob,
        planCode: plan,
        premiumPerYear: parseFloat(premiumPerYear),
        paymentFrequency: period,
        saPerYear: parseFloat(saPerYear),
        calType: type
      };

      getProduct(data);
    }
  };

  handleChangeDOB = (e) => {
    const date = e.target.value;
    const formatDate = new moment(date).format('yyyy-MM-dd HH:mm:ss');
    this.setState({
      dob: formatDate
    });
  };

  render () {
    const {type, premiumPerYear, saPerYear, isClick} = this.state;

    return (
      <div className='App'>
        <h1 className='title'>Insurance Calculate</h1>
        <div className='container container-form'>
          <div className='row mb-2'>
            <span className='col'>ชื่อ</span>
            <input className='form-control col' type='text' />
          </div>
          <div className='row mb-2'>
            <span className='col'>นามสกุล</span>
            <input className='form-control col' type='text' />
          </div>
          <div className='row mb-2'>
            <span className='col'>เพศ</span>
            <div className='select-field col'>
              <Dropdown className='dropdown-gender' listData={genderList} onChange={(value) => this.setState({gender: value})}/>
            </div>
          </div>
          <div className='row mb-2'>
            <span className='col'>วันเกิด</span>
            <input className='form-control col' type='date' onChange={this.handleChangeDOB} />
          </div>
          <div className='row mb-2'>
            <span className='col'>แบบประกัน</span>
            <div className='select-field col'>
              <Dropdown className='dropdown-plan' listData={planList} onChange={(value) => this.setState({plan: value})}/>
            </div>
          </div>
          <div className='row mb-2'>
            <span className='col'>ต้องการ</span>
            <div className='select-field col'>
              <Dropdown className='dropdown-type' listData={calType} onChange={(value) => this.onChangeType(value)}/>
            </div>
          </div>
          {type ? <div className='row mb-2'>
            <span className='col'>{displayType[type]}</span>
            <input 
              className='form-control col value-cal' 
              type='number' 
              value={type === 'calType1' ? saPerYear : premiumPerYear}
              onChange={(e) => {
                type === 'calType1' ? this.setState({saPerYear: e.target.value}) : this.setState({premiumPerYear: e.target.value}); 
              }}/>
          </div> : null}
          <div className='row mb-3'>
            <span className='col'>งวดการชำระ</span>
            <div className='select-field col'>
              <Dropdown className='dropdown-period' listData={paymentPeriodList} onChange={(value) => this.onChangePeriod(value)}/>
            </div>
          </div>
          {isClick ? this.renderResult() : null}
          <div className='row mb-2'>
            <button className='btn btn-cal' type='button' onClick={this.onClickCalculate}>คำนวณทุนประกัน</button>
          </div>
        </div>
      </div>
    );
  }
}

export const mapStateToProps = ({ansurance}) => ({
  resultInsurance: result(ansurance, 'resultInsurance', {})
});

export const mapDispatchToProps = (dispatch) => ({
  getProduct: (data) => dispatch(getProductInsurance(data))
});

App.defaultProps = {
  getProduct: noop,
  resultInsurance: {}
};

App.propTypes = {
  getProduct: PropTypes.func,
  resultInsurance: PropTypes.object
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);