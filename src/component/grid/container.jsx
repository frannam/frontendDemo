import React, {Component} from 'react'

class Container extends Component {

    constructor(p) {
        super(p)
        this.state = {

        }
    }

    componentDidMount() {

    }

    render() {
        return (
            <div className="container" >
                {this.props.children}
            </div>
        );
    }
}

export default Container;