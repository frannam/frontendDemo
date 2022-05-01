"use strict"

class FuncionesAjax {
    constructor() {
        this.fnError = undefined
        this.state = {
            fnError: undefined
        }
    }

    set = (react) => {
        this.react = react,
            this.end = false            
    }

    get = (url, params, callbackOK, callbackNOOK = undefined, headers = { 'Accept': 'application/json', 'Content-Type': 'application/json', }, executionId = undefined) => {
        var serialParams;
        if (params != undefined) {
            serialParams = Object.keys(params)
                .map(k =>
                    (typeof params[k] != 'undefined' && params[k] != null) ? encodeURIComponent(k) + '=' + encodeURIComponent(params[k]) + "&" : ""
                ).join("");

            serialParams = (serialParams.length > 0) ? serialParams.substring(0, serialParams.length - 1) : "";
            url = (url + (url.substring(url.length - 1, url.length) == "?" ? "" : "?")) + serialParams;
        }
        headers = {};

        fetch(url, {
            method: 'GET',
            headers: headers
        })
            .then((response) => {                              
                return response.json()
            })
            .then((objeto) => {
                this.ejecutaSuccess(objeto, callbackOK, executionId)
            })
            .catch((error) => {
                this.mostrarError(error)
            })
    }

    put = (url, body, callbackOK, callbackNOOK = undefined, headers = { 'Accept': 'application/json', 'Content-Type': 'application/json', }) => {
        var serialParams = JSON.stringify(body);
        fetch(url, {
            method: 'PUT',
            headers: headers,
            body: serialParams
        })
            .then((response) => {  
                return response
            })
            .then((objeto) => {
                this.ejecutaSuccess(objeto, callbackOK)
            })
            .catch((error) => {
                this.mostrarError(error)
            })
    }
    
    post = (url, body, callbackOK, callbackNOOK = undefined, headers = { 'Accept': 'application/json', 'Content-Type': 'application/json', }) => {
        var serialParams = JSON.stringify(body);
        fetch(url, {
            method: 'POST',
            headers: headers,
            body: serialParams
        })
            .then((response) => {                               
                return response.json()
            })
            .then((objeto) => {
                this.ejecutaSuccess(objeto, callbackOK)
            })
            .catch((error) => {
                this.mostrarError(error)
            })
    }

    delete = (url, callbackOK, callbackNOOK = undefined, headers = { 'Accept': 'application/json', 'Content-Type': 'application/json', }) => {
        fetch(url, {
            method: 'DELETE',
            headers: headers
        })
            .then((response) => {                              
                return response.json()
            })
            .then((objeto) => {
                this.ejecutaSuccess(objeto, callbackOK)
            })
            .catch((error) => {                
                this.mostrarError(error)
            })
    }
    
    ejecutaSuccess = (objeto, callbackOK, executionId) => {
        callbackOK(objeto, executionId)       
    }
    
    mostrarError = (error) => {
        alert("Ha ocurrido un error: "+error)
    }
       
    static mensajeOK = (mensaje, callback = undefined) => {
        alert(mensaje)        
    }

    static mensajeWarning = (mensaje, callback = undefined) => {
       alert(mensaje)
    }

    static mensaje = (mensaje, tipo = 'S', callback = undefined) => {       
        alert(mensaje)
    }

    static mensajeError = (mensaje, callback = undefined) => {
       alert(mensaje)
    }

}

export default FuncionesAjax