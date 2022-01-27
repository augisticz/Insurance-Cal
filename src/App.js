import { useEffect, useState } from 'react';
import './App.css';
import Dropdown from './components/common/Dropdown/Dropdown'
import {
  genderList,
  planList,
  paymentPeriodList,
  calType,
  displayType,
  displayPeriod
} from './configStaticValue'
import {connect} from 'react-redux';
import {getProductInsurance} from './redux/actions/index.actions'
import {result} from 'lodash'

const App = (props) => {
  const [gender, setGender] = useState('')
  const [plan, setPlan] = useState('')
  const [period, setPeriod] = useState('')
  const [result, setResult] = useState('')
  const [type, setType] = useState('')
  const [premiumPerYear, setPremiumPerYear] = useState('')
  const [saPerYear, setSaPerYear] = useState('')
  const [isClick, setIsClick] = useState(false)

  const onClickCalculate = async () => {
    setIsClick(true)
    if (checkReq(true)) {
      const data = {
        genderCd: gender,
        dob: '',
        planCode: plan,
        premiumPerYear: parseFloat(premiumPerYear),
        paymentFrequency: period,
        saPerYear: parseFloat(saPerYear),
        calType: type
      }
  
      props.getProduct(data)
    }
  }

  const checkReq = () => Boolean((parseFloat(premiumPerYear) > 0 || parseFloat(saPerYear) > 0) 
      && type
      && period)

  const formatter = new Intl.NumberFormat('en-US', {
    currency: 'THB',
  });

  const renderResult = () => checkReq()
    ? result.baseSumAssured ? <div className="card card-container">
        <div className="card-body">
          <span>{`${displayType[type]} : ${formatter.format(parseFloat(result.baseSumAssured).toFixed(2))} บาท / ${displayPeriod[period]}`}</span> 
        </div>
      </div> : null
    : <div className="card card-container-err">
        <div className="card-body">
          <span>กรุณากรอกข้อมูลที่ต้องคำนวณให้ครบ</span>
        </div>
      </div>

  const onChangeType = (value) => {
    setResult('')
    setType(value)
  }

  const onChangePeriod = (value) => {
    setResult('')
    setPeriod(value)
  }

  useEffect(() => {
    setResult(props.resultInsurance)
  },[props.resultInsurance]);

  return (
    <div className="App">
      <h1 className="title">Insurance Calculate</h1>
      <div className="container container-form">
        <div className="row mb-2">
          <span className="col">ชื่อ</span>
          <input className="form-control col" type="text" />
        </div>
        <div className="row mb-2">
          <span className="col">นามสกุล</span>
          <input className="form-control col" type="text" />
        </div>
        <div className="row mb-2">
          <span className="col">เพศ</span>
          <div className="select-field col">
            <Dropdown listData={genderList} onChange={(value) => setGender(value)}/>
          </div>
        </div>
        <div className="row mb-2">
          <span className="col">วันเกิด</span>
          <input className="form-control col" type="text" />
        </div>
        <div className="row mb-2">
          <span className="col">แบบประกัน</span>
          <div className="select-field col">
            <Dropdown listData={planList} onChange={(value) => setPlan(value)}/>
          </div>
        </div>
        <div className="row mb-2">
          <span className="col">ต้องการ</span>
          <div className="select-field col">
            <Dropdown listData={calType} onChange={(value) => onChangeType(value)}/>
          </div>
        </div>
        {type ? <div className="row mb-2">
          <span className="col">{displayType[type]}</span>
          <input 
          className="form-control col" 
          type="text" 
          value={type === 'calType1' ? saPerYear : premiumPerYear}
          onChange={(e) => {type === 'calType1' ? setSaPerYear(e.target.value) : setPremiumPerYear(e.target.value)}}/>
        </div>: null}
        <div className="row mb-3">
          <span className="col">งวดการชำระ</span>
          <div className="select-field col">
            <Dropdown listData={paymentPeriodList} onChange={(value) => onChangePeriod(value)}/>
          </div>
        </div>
        {isClick ? renderResult() : null}
        <div className="row mb-2">
          <button className="btn btn-cal" type="button" onClick={onClickCalculate}>คำนวณทุนประกัน</button>
        </div>
      </div>
    </div>
  );
}

export const mapStateToProps = ({ansurance}) => ({
  resultInsurance: result(ansurance, 'resultInsurance', {}),
});

export const mapDispatchToProps = (dispatch) => ({
  getProduct: (data) => dispatch(getProductInsurance(data)),
});

App.defaultProps = {
  
};
App.propTypes = {
 
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);