import React, { Component, Fragment } from 'react'
import Table from '../component/table/table.jsx'
import Input from '../component/input/input.jsx'
import Select from '../component/select/select.jsx'

import StoreCuenta from '../store/cuenta.js'
import StoreEstado from '../store/estado.js'
import VNuevaCuenta from './vNuevaCuenta.jsx'
import VEdicionCuenta from './vEditarCuenta.jsx'
import Modal from 'react-modal';

const modalStyles = {
    content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)"
    }
};

class Cuenta extends Component {
    constructor(p) {
        super(p)
        this.state = {
            abrirModalEdicion:false,
            abrirModalNueva:false,
            item: undefined
        }
        this.ClassStoreCuenta = new StoreCuenta()
        this.ClassStoreEstado = new StoreEstado()

    }

    componentDidMount() {
    }
   
    buscar = () => {
        let data={
            descripcionTipoCuenta:this._filtroTipoCuenta.getValue(),
            codigoEstado:this._filtroEstado.getValue()            
        }
        this._listadoCuentas.start(data)
    }

    nuevaCuenta = () => {        
        this.setState({abrirModalNueva:true})
    }

    cerrarDialogoCrear = () => {
        this.setState({abrirModalNueva:false})
        this.buscar()
    }

    editarCuenta = (i) => {
        console.log('i edicion',i)
        this.setState({abrirModalEdicion:true, item:i})
    }

    cerrarDialogoEditar = () => {
        this.buscar()

        this.setState({abrirModalEdicion:false})
    }
         
    pintarTablaResultado = () => {
        return (
            <Table ref={d => this._listadoCuentas = d} 
                load={this.ClassStoreCuenta.buscar.bind(this)}
                autoLoad
                buttons={[                
                {
                    label: "Editar",
                    click: this.editarCuenta.bind(this),
                    icon: 'edit'
                }]
                }
                model={[
                    {
                        label: "Id Cuenta",
                        key: 'codigoTipoCuenta'
                    },
                    {
                        label: "Tipo Cuenta",
                        key: 'descripcionTipoCuenta'
                    },
                    {
                        label: "Estado",
                        key: 'descripcionEstado'
                    },
                    {
                        label: "Costo",
                        key: 'costoCuenta'
                    }  
                ]}
            />
        )
    }

    renderFiltros = () => {  
        return (
            <Fragment>
                <div className='col-sm-12 col-md'>
                    <label className='titulo'>{'Filtro de búsqueda'}</label>
                </div>
                
                <div className='row mb-4'>
                    <div className='col-sm-12 col-md-4'>
                        <Select ref={d => this._filtroEstado = d} 
                            label={"Estado"} floating 
                            fnLoad={this.ClassStoreEstado.listar.bind(this)}
                            autoLoad={true}
                            params={{vigente:1}}
                            value= 'codigoEstado'
                            text= 'estado'
                            defaultValue={''}
                        />
                    </div>
                    <div className="col-sm-12 col-md-4">
                        <Input ref={d => this._filtroTipoCuenta = d} label={"Tipo Cuenta"} floating />
                    </div>    
                    <div className="col-sm-12 col-md-4 d-flex justify-content-end">
                        <button type="button" onClick={this.nuevaCuenta.bind(this)} className="btn btn-secondary active m-1">Nueva</button>
                        <button type="button" onClick={this.buscar.bind(this)} className="btn btn-primary active m-1">Buscar</button> 
                    </div>
                </div>
            </Fragment>
        )
    }

    render() {
        return (
            <Fragment>               
                <div className='row'>
                    <div className="col-sm-12 col-md">
                        {this.renderFiltros()}
                        {this.pintarTablaResultado()}
                    </div>
                </div>
                <Modal ref={o => this._dialogoEdicionCuenta = o}
                    contentLabel={'CrearCuenta'}
                    ariaHideApp={false}
                    isOpen={this.state.abrirModalNueva}
                >
                     <VNuevaCuenta
                        cerrar = {this.cerrarDialogoCrear.bind(this)}
                    />
                </Modal>             
                 <Modal ref={o => this._dialogoEdicionCuenta = o}
                    contentLabel={'EdicionCuenta'}
                    ariaHideApp={false}
                    isOpen={this.state.abrirModalEdicion}
                    style={modalStyles}
                >
                    <VEdicionCuenta
                        cuenta = {this.state}
                        cerrar = {this.cerrarDialogoEditar.bind(this)}
                    />
                 </Modal>
            </Fragment>
        );
    }
}

export default Cuenta;