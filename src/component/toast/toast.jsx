import React, { Component } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class Toast extends Component {

    constructor(p) {
        super(p)
        this.state = {

        }
    }

    componentDidMount() {
        
    }

    show = message => {
        toast(message)
    }

    render() {
        return (
            <ToastContainer

                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        );
    }
}

export default Toast;