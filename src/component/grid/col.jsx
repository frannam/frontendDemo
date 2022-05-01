import React, { Component } from 'react'

class Col extends Component {

    constructor(p) {
        super(p)
        this.state = {
            col: p.col,
            clase: p.clase
        }
    }

    componentDidMount() {

    }

    render() {
        const { col, clase } = this.state
        let tcol = 'col-sm-12 col-md'
        if (typeof col == 'number') tcol = tcol.concat("-".concat(col))
        if (this.props.right)
        {
            tcol = 'pull-right ' + tcol
        }
        if (this.props.auto)
        {
            tcol = "col"         
        }
        if (this.props.isAuto) 
        {
            tcol += '-auto'
        }
        return (
            <div className={tcol.concat(" ").concat(clase)} >
                {this.props.children}
            </div>
        );
    }
}

Col.defaultProps = {
    col: 12,
    clase: '',
    right: false
}

export default Col;