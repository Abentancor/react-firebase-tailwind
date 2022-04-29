import ButtonLoading from "./ButtonLoading"

const Button = ({text, type, color, loading, onClick}) => {

    if(loading) return<ButtonLoading/>

  return (
    
    <button
      onClick={onClick}
        type={type}
        className={`text-center text-white ${color} hover:bg-${color}-700 border-2 px-2 mb-1 mr-2`}
    >
        {text}
    </button>
  )
}

export default Button