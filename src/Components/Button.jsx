import ButtonLoading from "./ButtonLoading"

const Button = ({text, type, color, loading, onClick}) => {

    if(loading) return<ButtonLoading/>

  return (
    
    <button
      onClick={onClick}
        type={type}
        className={`text-center text-white ${color} hover:${color} border-2 px-2 mb-1 col-span-2`}
    >
        {text}
    </button>
  )
}

export default Button