import React from 'react'

import Input from '../component/input/input.jsx'
import Select from '../component/select/select.jsx'

import StoreCuenta from '../store/cuenta.js'
import StoreEstado from '../store/estado.js'

class VEditarCuenta extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}

        this.ClassStoreCuenta = new StoreCuenta()
        this.ClassStoreEstado = new StoreEstado()

    }

    componentDidMount() {
        let data = {
            vigente: 1
        }     
        this.ClassStoreEstado.listar(data, this.callbackEstado.bind(this))
    }    
    
    callbackEstado = (respuesta) => {
        const{item} = this.props.cuenta
        console.log(item,respuesta)
        if(respuesta != 'undefined'){
            this._codigoEstado.start(respuesta, parseInt(item.codigoEstado))
        }
    }
    
    handleEditar = () => {
        const{item} = this.props.cuenta
        let estado = {
            codigoEstado: this._codigoEstado.getValue()
        }
        let param = {
            codigoTipoCuenta: item.codigoTipoCuenta,
            tipoCuenta: this._tipoCuenta.getValue(),
            estado: estado,
            costoCuenta: this._costoCuenta.getValue(),
            vigente: 1
        } 
        this.ClassStoreCuenta.modificar(param, this.callbackEditar.bind(this))
    }

    callbackEditar = (objeto) => {
        StoreCuenta.mensajeOK("Cuenta Editada")
        this.props.cerrar()
    }
       
    handleCerrar = () => {
        this.props.cerrar()
    }

    pintaFormulario = (objeto) => {
        return (
            <div>
                <div className='modal-header'>
                    <h5 className="modal-title">Editar Cuenta</h5> 
                </div>
                <div className='row'> 
                    <div className='col-sm-12 col-md-6'>
                        <Input ref={o => this._codigoTipoCuenta = o}
                            label={"Codigo Tipo Cuenta"}
                            disabled={true}
                            value={objeto.codigoTipoCuenta}                            
                        />
                    </div>                    
                    <div className='col-sm-12 col-md-6'>
                        <Input ref={o => this._tipoCuenta = o}
                            label={"Tipo Cuenta"}
                            value={objeto.descripcionTipoCuenta}                            
                            />
                    </div> 
                    <div className='col-sm-12 col-md-6'>
                        <Select ref={d => this._codigoEstado = d} 
                            label={"Estado"}  
                            fnLoad={this.ClassStoreEstado.listar.bind(this)}
                            autoLoad={false}
                            value= 'codigoEstado'
                            text= 'estado'
                            defaultValue={objeto.codigoEstado}
                        />
                    </div>
                    <div className='col-sm-12 col-md-6'>
                        <Input ref={o => this._costoCuenta = o}
                            label={"Costo Cuenta"}
                            value={objeto.costoCuenta}
                            />
                    </div>                    
                </div>                              
            </div>
        );        
    }

    render() {
        const objeto = this.props.cuenta.item
        return (
            <div>
                {this.pintaFormulario(objeto)}
                <div className='row'>
                    <div className='col-sm-12 col-md d-flex justify-content-end'>
                        <button type="button" onClick={this.handleEditar} className="btn btn-primary active m-1">Modificar</button>    
                        <button type="button" onClick={this.handleCerrar} className="btn btn-secondary active m-1">Cerrar</button> 
                    </div>
                </div>                
            </div>
            )
        }
    }

VEditarCuenta.defaultProps = {    
    cerrarDialogo: undefined,
}

export default VEditarCuenta