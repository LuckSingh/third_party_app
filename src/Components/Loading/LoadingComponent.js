import React from 'react'
import ReactDOM from 'react-dom'
import Alert from '../Common/Alert'
export default class LoadingComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            // 动画效果
            spinner: true,
            alert: false,
            alertMsg: ''
        }
    }

    render() {
        return <div>
            <div className = { this.state.spinner ? "spinner" : "spinner spinnerHide" } >
                <div className = "double-bounce1" ></div> 
                <div className = "double-bounce2" ></div>
            </div>  
            <Alert alert = { this.state.alert } alertMsg = { this.state.alertMsg } comfirm = { this.comfirm }/>  
        </div>;
    }
}