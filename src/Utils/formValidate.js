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
        patternURL:{
            value:  /^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/,
            message: 'Formato de url incorrecto'
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
        validateEquals(value) {
            return{
                equals: (v) => v === value ||  'Las contraseñas no coinciden',
                }
        },
    }
}