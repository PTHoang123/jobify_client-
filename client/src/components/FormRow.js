import React from 'react'

function FormRow({name, handleChange, value, type, labelText}) {
  return (
    <div className="form-row">
       <label htmlFor={name} className='form-label'>
        {labelText || name }
        <input  type={type} value={value} name={name} onChange={handleChange} className='form-input'/>
       </label>
    </div>
  )
}

export default FormRow