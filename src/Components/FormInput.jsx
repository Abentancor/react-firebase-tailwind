import { forwardRef } from "react"

const FormInput = forwardRef(({type, placeholder, onChange, onBlur, name, label,clase, children }, ref,) => {

  return (
    <>
         <label className='text-cyan-500'>{label}</label>
        <input 
            className={`${clase} bg-cyan-400 font-semibold  px-2 `}
            type={type} 
            placeholder={placeholder} 
            ref={ref} 
            onChange={onChange} 
            onBlur={onBlur} 
            name={name}
        />
        {children}
    </>
  )
})

export default FormInput