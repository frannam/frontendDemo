import React, { Component } from 'react'

class Input extends Component {

    constructor(p) {
        super(p)
        this.state = {
            value: p.value,
            disabled: p.disabled
        }
    }

    componentDidMount() {

    }

    getValue = () => {
        return this.state.value
    }

    setValue = value => {
        if (typeof value == 'undefined') value = ''
        this.setState({ value })
    }

    onChange = event => {
        this.setState({ value: event.target.value })
    }
        
    render() {
        const { label, indice} = this.props
        const { value, disabled } = this.state

        return (
            <div className="form-floating  mb-1">
            <input className={"form-control"} 
                id={"floatingInput" + indice} placeholder={label} value={value} 
                onChange={this.onChange.bind(this)} disabled={disabled} />
                <label htmlFor={"floatingInput" + indice}>{label}</label> 
            </div>            
        )      
    }
}

Input.defaultProps = {
    value: '',
    indice: 0,
    disabled: false
}

export default Input;