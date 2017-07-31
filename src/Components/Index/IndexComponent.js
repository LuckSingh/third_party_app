import React from 'react'
import ReactDOM from 'react-dom'
import Alert from '../Common/Alert'
export default class IndexComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            btn_value: "扫码解锁"
        }
    }

    render() {
        return <div>
        	<div className = "index-content">
	        	<div onClick={this.handleUser} className = "person" >
	            	<img src = "./static/img/person.png"alt = "" />
	            </div> 
            	<div className = "head">
            		<p onClick = { this.handleScan } className = "btn_scan" > 
            			<em></em>{this.state.btn_value}
            		</p>
            	</div>  
            	<div onClick={this.handleDeposit} className = "avtive_cur" > 我的押金 </div> 
        	</div>

        	<Alert alert = { this.state.alert } openSys = { this.openSys } alertMsg = { this.state.alertMsg } comfirm = { this.comfirm } /> 
        </div>;
    }
}