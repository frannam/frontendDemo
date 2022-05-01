import React from 'react'

import Input from '../component/input/input.jsx'
import StoreCuenta from '../store/cuenta.js'

class VNuevaCuenta extends React.Component {

    constructor(props) {
        super(props)
        this.state = {}

        this.ClassStoreCuenta = new StoreCuenta()
    }

    componentDidMount() {       
    }      
    
    handleCrear = () => {
        let param = {
            tipoCuenta: this._tipoCuenta.getValue(),
            vigencia: 1,
            costoCuenta: this._costoCuenta.getValue()
        } 
        this.ClassStoreCuenta.crear(param, this.callbackCrear.bind(this))
    }

    callbackCrear = (objeto) => {
        StoreCuenta.mensajeOK("Cuenta creada")
        this.props.cerrar()
    }
    
    handleCerrar = () => {
        this.props.cerrar()
    }
   
    pintaFormulario = () => {
        return (
            <div>
                <div className='modal-header'>
                    <h5 className="modal-title">Crear Cuenta</h5> 
                </div>
                <div className='row'>                                       
                    <div className='col-sm-12 col-md-6'>
                        <Input ref={o => this._tipoCuenta = o}
                            label={"Tipo Cuenta"}                                                                        
                        />
                    </div>                       
                    <div className='col-sm-12 col-md-6'>
                        <Input ref={o => this._costoCuenta = o}
                            label={"Costo Cuenta"}                            
                        />
                    </div>                    
                </div>                              
            </div>
        );        
    }

    render() {
        return (
            <div>
                {this.pintaFormulario()}
                <div className='row'>
                    <div className='col-sm-12 col-md d-flex justify-content-end'>
                        <button type="button" onClick={this.handleCrear} className="btn btn-primary active m-1">Guardar</button>  
                        <button type="button" onClick={this.handleCerrar} className="btn btn-secondary active m-1">Cerrar</button>                      
                    </div>
                </div>                
            </div>
            )
        }
    }

VNuevaCuenta.defaultProps = {    
}

export default VNuevaCuenta