import { useState } from "react";
import './Dropdown.css';

const Dropdown = (props) => {
    const [selectValue, setSelectValue] = useState('')
    const handleChange = (e) => {
        setSelectValue(e.target.value)
        props.onChange(e.target.value)
    }
    
    return (props.listData && props.listData.length > 0) ? <select className="form-select selection" value={selectValue} onChange={handleChange} >
            <option value="">กรุณาเลือก</option>
            {props.listData.map(({title, value}, i) => <option key={i} value={value}>{title}</option>)}
          </select> : null
}

export default Dropdown;