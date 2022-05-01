import React, { Component } from 'react'

class Row extends Component {

    constructor(p) {
        super(p)
        this.state = {

        }
    }

    componentDidMount() {

    }

    render() {
        const { clase } = this.props
        return (
            <div className={"row " + clase} >
                {this.props.children}
            </div>
        );
    }
}

Row.defaultProps = {
    clase: ''
}

export default Row;