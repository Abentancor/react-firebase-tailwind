import { forwardRef } from "react"

const FormInput = forwardRef(({type, placeholder, onChange, onBlur, name, label}, ref,) => {

  return (
    <>
         <label className='text-cyan-500'>{label}</label>
        <input 
            className="bg-cyan-400 font-semibold px-2 "
            type={type} 
            placeholder={placeholder} 
            ref={ref} 
            onChange={onChange} 
            onBlur={onBlur} 
            name={name}
        />
    </>
  )
})

export default FormInput