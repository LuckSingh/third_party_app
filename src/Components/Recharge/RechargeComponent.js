import React from 'react'
import ReactDOM from 'react-dom'
export default class RechargeComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {

        }
    }

    render() {
        return <div>
            <p>充值金额</p>
            <div className="recharge-param">
                <div className="recharge-money active">
                    <ul>
                        <li></li>
                        <li></li>
                    </ul>
                </div>
            </div>
            <div className="pay-btn">
                <span>银联支付</span>
            </div>
            <div className="rules">
                <p><span>点击支付即表示同意</span><span><a href="https://www.bluegogo.com/bikerule/rechangeRule.html">《充值协议》</a></span></p>
            </div>
        </div>;
    }
}