import Ajax from '../utils/funcionesAjax.js'
class StoreCuenta extends Ajax {

    obtener = (filtro, fn) => {
        let url = 'demo/api/obtener/'+ filtro.codigoTipoCuenta
        this.get(url, null, fn)
    }

    crear = (filtro, fn) => {
        let url = 'demo/api/crear'
        this.post(url, filtro, fn)
    }

    modificar = (filtro, fn) => {
        let url = 'demo/api/modificar'
        this.put(url, filtro, fn)
    }

    buscar = (filtro, fn) => {
        let url = 'demo/api/buscar'
        this.get(url, filtro, fn)
    }

    eliminar = (filtro, fn) => {
        let url = 'demo/api/eliminar/'+filtro.codigoTipoCuenta
        this.delete(url, filtro, fn)
    }
}


export default StoreCuenta;