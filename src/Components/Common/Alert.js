import React from 'react'
import ReactDOM from 'react-dom'
export default class Alert extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <div className = { this.props.alert ? "AlertAll" : "AlertAll hide" }>
            <div className = { this.props.alert ? "AlertContain" : "AlertContain hide" }>
                <div className = "AlertTitle" > 
                    <p>{ this.props.alertMsg }</p>
                </div>
                <div className = "AlertDesc " >
                    <span onClick = { this.props.comfirm}>知道了 </span> 
                </div> 
            </div>
            <div className = "AlertBg" ></div>                   
        </div>;
    }
}