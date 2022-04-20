export const formValidate = () => {
    return {
        required: {
            value:true,
            message:'Campo Obligatorio'
        },                       
        patternEmail:{
            value: /[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})/,
            message: 'Formato de email incorrecto'
        },
        minLength: {
            value: 6, 
            message: 'el minimo es de 6 caracteres'
        },
        validateTrim:{
            trim: (v) => {
                if (!v.trim()){ 
                    return 'Escribe algo' 
                }
                return true;
            }    
        },
        validateEquals(getValues) {
            return{
                equals: (v) => 
                    v === getValues('password') || 
                    'Las contraseñas no coinciden',
                }
        },
    }
}