import Ajax from '../utils/funcionesAjax.js'
class StoreEstado extends Ajax {

    listar = (filtro, fn) => {
        let url = 'demo/estado/listar'
        this.get(url, filtro, fn)
    }
}


export default StoreEstado;