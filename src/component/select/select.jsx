import React, { Component } from 'react'

class Select extends Component {

    constructor(p) {
        super(p)
        this.state = {
            source: p.source,
            value: p.defaultValue,
            item: p.defaultItem,
            completo: false

        }
    }

    componentDidMount() {
        if (this.props.autoLoad) this.start(this.props.params)
    }

    start = (params = this.props.params, value = undefined) => {
        const { fnLoad } = this.props
        if (typeof value != 'undefined') this.state.value = value
        if (typeof fnLoad == 'function') {
            fnLoad(params, this.callback.bind(this))
        }
    }

    callback = r => {
        const { value, text } = this.props
        let source = []       
        r.forEach(i => {           
            source.push({
                value: i[value],
                label: i[text]
            })
        });
        this.setState({ source, completo:true })
    }

    onChange = i => {
        this.state.value = i.target.value
        if(typeof this.props.onSelect == 'function') this.props.onSelect(i.target.value)
    }

    buscarItem = valor => {
        const { source } = this.state
        let item = {}
        if (Array.isArray(source)) {
            source.forEach(i => {
                if (String(i.value) == String(valor)) {
                    item = i
                    return
                }
            })
        }        
        this.state.item = item
        return item
    }

    setSource = (source) => {
        source = this.procesarSource(source)
        this.cargarLabels(source)

        let datas = []
        source.forEach(item => {
            datas[item[this.props.itemValue]] = item
        })
        this.items = datas
        this.setState({ source: source }) 
    }

    procesarSource = source => {
        let sourceOut = []
        if (Array.isArray(source)) {
            source.forEach(item => {
                let obj = {
                    value: item.value,
                    label: item.label
                }                
                sourceOut.push(obj)
            })
        }
        return sourceOut
    }

    cargarLabels = (source = undefined) => {
        if (typeof source != 'undefined') {
            let labels = []
            source.forEach((item, idx) => {
                labels[item.value] = item.label
            })
            this.labels = labels
        }
    }

    getValue = () => {
        const { value, source } = this.state
        if (typeof value == 'undefined') {
            return source[0].value
        }
        else return value
    }

    getItem = () => {
        const { value, source } = this.state

        if (typeof value == 'undefined') {
            return source[0]
        }
        else return this.buscarItem(value)
    }

    setValue = (value) => {
        this.setState({ value })
    }

    pintarOpcion = (i, k) => {
        let selected = String(this.state.value) == String(i.value)

        return (
            <option key={k} value={i.value}>{i.label}</option>
        )
    }

    render() {
        const { source, completo } = this.state
        const { label, indice } = this.props
       
        return (
            completo ? (
            <div className="form-floating mb-1">
                <select className="form-select form-select-sm" aria-label=".form-select-sm example"
                id={"floatingSelect  mb-2" + indice} onChange={this.onChange.bind(this)} 
                defaultValue={this.state.value}>
                    {source.map(this.pintarOpcion)}
                </select>
                <label htmlFor={"floatingSelect" + indice}>{label}</label>
            </div>) : <p>'Cargando'</p>
        )
    }
}

Select.defaultProps = {
    label: '',
    indice: 0,
    params: undefined,
    fnLoad: undefined,
    value: 'value',
    text: 'label',
    source: [],
    autoLoad: true,
    defaultValue: undefined,
    item: undefined,
    onSelect: undefined
}

export default Select;