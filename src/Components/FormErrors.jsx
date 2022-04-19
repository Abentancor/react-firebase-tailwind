
const FormErrors = ({error}) => {
  return (
    <>
        {error && <span className='text-red-600 col-span-2 text-center'>{error.message}</span>}
    </>
  )
}

export default FormErrors