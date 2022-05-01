import { toast } from 'react-toastify';

class Mensajes {
    notificacion = (mensaje, tipo = 'S', callback = undefined) => {
        this.notificacionSnackBar(mensaje, tipo, callback)
    }

    notificacionError = (mensaje, tipo = 'E', callback = undefined) => {
        this.notificacionSnackBar(mensaje, tipo, callback)
    }

    notificacionSnackBar = (mensaje = '', tipo = 'S', callback = undefined) => {        
        let mensajeTmp = ""
        if(!Array.isArray(mensaje) ){
            mensajeTmp = mensaje
        }
        else mensajeTmp = mensaje[0] 

        if(tipo == 'E')toast.error(mensajeTmp)
        else if(tipo == 'S')toast.success(mensajeTmp)
        else if(tipo == 'I')toast.info(mensajeTmp)
        else toast.warn(mensajeTmp)

    }

    static mensaje = (mensaje = '') => {        
        toast(mensaje)
    }

    static dialogoError = (codigo = 'C001') => {
        toast.error(codigo)
    }
}

export default Mensajes