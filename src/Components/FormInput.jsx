import { forwardRef } from "react"

const FormInput = forwardRef(({type, placeholder, onChange, onBlur, name}, ref,) => {

  return (
    <>
        <input 
            className="bg-cyan-400 font-semibold px-2"
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