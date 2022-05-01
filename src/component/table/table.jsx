import React, { Component } from 'react'
import { Fragment } from 'react/cjs/react.production.min'
import { v4 as uuidv4, v4 } from 'uuid';

class Paginador extends Component {
    constructor(p) {
        super(p)
        this.state = {
            pags: p.pags,
            pag: p.pags.number,
        }
    }

    componentDidMount() {
        
    }

    go = pag => {
        const { totalPages, first, last, numberOfElements } = this.state.pags
        let pagS = pag
        if (pag < 0) {
            pagS = 0
        }
        if (pag >= totalPages) {
            pagS = totalPages - 1
        }

        this.setState({ pag: pagS })
        this.props.go(pagS)
    }

    setInfo = info => {
        let pags = {
            totalPages: info.totalPages,
            first: info.first,
            last: info.last,
            numberOfElements: info.numberOfElements
        }
        this.setState({
            pags
        })
    }

    pintarItem = (t, a) => {
        let items = []

        for (let i = 0; i < t; i++) {
            items.push(<li key={v4()} className={"page-item ".concat(a == i ? 'active' : "")}><a onClick={this.go.bind(this, i)} className="page-link" > {i + 1}</a></li>)
        }
        return items
    }

    render() {
        const { totalPages, first, last, numberOfElements, number } = this.state.pags
        if (totalPages <= 1) return null
        const { pag } = this.state
        return (
            <nav aria-label="Paginador">
                <ul className="pagination justify-content-center">
                    <li className="page-item ">
                        <a className="page-link" aria-disabled="true" onClick={this.go.bind(this, 0)}  >&laquo;</a>
                    </li>
                    <li className="page-item ">
                        <a className="page-link" aria-disabled="true" onClick={this.go.bind(this, pag - 1)}  >&lt;</a>
                    </li>
                    {this.pintarItem(totalPages, pag)}
                    <li className="page-item">
                        <a className="page-link" onClick={this.go.bind(this, pag + 1)}>&gt;</a>
                    </li>
                    <li className="page-item">
                        <a className="page-link" onClick={this.go.bind(this, totalPages - 1)} >&raquo;</a>
                    </li>
                </ul>
            </nav>
        )
    }
}
Paginador.defaultProps = {
    pags: 0
}

class Cabecera extends Component {
    constructor(p) {
        super(p)
        this.state = {
            model: p.model,
            buttons: p.buttons
        }

    }

    render() {
        const { model, buttons } = this.state
        return (
            typeof model == 'undefined' || !Array.isArray(model) ? (<tr><th scope="col">Sin Model ...</th></tr>) : (
                <tr>
                    {this.state.model.map(i => {
                        return <th scope="col" key={v4()}> {i.label} </th>
                    })}
                    {typeof buttons != 'undefined' && Array.isArray(buttons) && buttons.length > 0 && <th>Opciones</th>}
                </tr>
            )

        )
    }
}
Cabecera.defaultProps = {
    model: [],
    buttons: undefined
}

class Cuerpo extends Component {
    constructor(p) {
        super(p)

        this.state = {
            model: p.model,
            source: p.source,
            buttons: p.buttons
        }

    }

    pintarCelda = (item) => {
        const { model, buttons } = this.state
        let celdas = []
        for (let i = 0; i < model.length; i++) {
            celdas.push(<td key={v4()}>{this.determinaValorCelda(item, model[i])}</td>)
        }
        let botones = this.determinaBotones(buttons, item)
        if (typeof botones != 'undefined') {
            celdas.push(botones)
        }
        return <tr key={v4()}>{celdas}</tr>
    }

    determinaBotones = (b, item) => {
        if (typeof b != 'undefined' && Array.isArray(b) && b.length > 0) {
            let botons = []
            for (let i = 0; i < b.length; i++) {
                botons.push(<button key={v4()} type="button"
                    onClick={b[i].click.bind(this, item)}>{b[i].label}                    
                </button>)
            }
            return <td key={v4()}>
                <div className="btn-group btn-group-sm" role="group" aria-label="Button group">
                    {botons}
                </div>
            </td>
        }
        else return undefined
    }

    determinaValorCelda = (i, m) => {
        let valor = i[m.key]
        if (typeof m.adapter == 'function') {
            valor = m.adapter(i, m)
        }
        return valor
    }

    render() {
        const { model, source } = this.state

        return (
            typeof source == 'undefined' || !Array.isArray(source) ? (<tr><td>Sin Información ...</td></tr>) : (
                source.map(this.pintarCelda)
            )

        )
    }
}
Cuerpo.defaultProps = {
    model: [],
    source: [],
    buttons: undefined
}

class Table extends Component {

    constructor(p) {
        super(p)
        this.state = {
            source: [],
            model: p.model,
            last: true,
            first: true,
            numberOfElements: 0,
            totalPages: 0,
            buscando: false,
            buttons: p.buttons,
            pags: undefined,
        }
        this._filtroOrigen = undefined
    }

    componentDidMount() {
        const { autoLoad, params } = this.props
        if (autoLoad) this.start(params)

    }

    start = (filtro = undefined) => {
        this._filtroOrigen = filtro
        this.setState({ buscando: true })
        const { load, params } = this.props
        if (typeof load == 'function') {
            let filtroEnv = {}
            if (typeof params == 'object') {
                filtroEnv = Object.assign(params, filtroEnv)
            }
            else {
                filtroEnv = params
            }
            if (typeof filtro == 'object') {
                filtroEnv = Object.assign(filtro, filtroEnv)
            }
            else if (typeof filtro != 'undefined') {
                filtroEnv = filtro
            }
            load(filtroEnv, this.callback.bind(this))
        }
    }

    callback = r => {
        const data  = r

        if (typeof data != 'undefined') {
            if (this.props.pageable) {
                let pags = {
                    first: data.first, last: data.last, numberOfElements: data.numberOfElements, totalPages: data.totalPages, number: data.number
                }
                this.setState({ source: data.content, first: data.first, last: data.last, numberOfElements: data.numberOfElements, totalPages: data.totalPages, buscando: false, pags, number: data.number })
            }
            else {
                this.setState({ source: data, buscando: false })
            }
        }
        else {
            this.setState({ source: [], buscando: false })
        }

    }

    go = pag => {
        let filtro = this._filtroOrigen
        if (typeof filtro == 'undefined') {
            filtro = {}
        }
        filtro = Object.assign(filtro, { page: pag })
        this.start(filtro)
    }

    render() {
        const { model, source, buscando, buttons, pags } = this.state

        return <Fragment>
            <table className="table table-striped" >
                <thead>
                    <Cabecera model={model} buttons={buttons} />
                </thead>
                <tbody>
                    {!buscando ? (<Cuerpo key={v4()} model={model} source={source} buttons={buttons} />) : (<tr><td colSpan={model.length + buttons.length}>Buscando datos...</td></tr>)}

                </tbody>
            </table>
            {!buscando && (
                <Paginador 
                    pags={pags}
                    go={this.go.bind(this)}
                />
            )}

        </Fragment>;
    }
}

Table.defaultProps = {
    model: [],
    attr: undefined,
    params: {},
    autoLoad: true,
    skipRow: undefined,
    pageable: true,
    buttons: []
}

export default Table;
