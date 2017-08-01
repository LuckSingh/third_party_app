import React from 'react'
import ReactDOM from 'react-dom'
export default class PledgeComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            orderNum: 0,
            isRule: 0,
            alert: false,
            payNum: '0',
            statePay: true
        }
    }

    render() {
        return <div className = 'pledge'>
            <div className = { this.state.statePay ? "pledge-content" : "hide"  }>
                <div className = "pledge-paid-tip" > 已交纳押金(元) </div>    
                <div className = "pledge-paid-num" > { this.state.payNum } </div> 
            </div>

            <div className = { this.state.statePay ? "hide" : "pledge-backgroud" }>
                <div className = "pledge-backgroud-content" >
                    <div className = "pledge-paid-num" > { this.state.payNum } </div>
                    <div className = "need-pay" > 需要交纳 
                        <span className = "need-pay-num" > { this.state.payNum } </span>元，押金可全额退</div>
                        <div className = { this.state.statePay ? "hide" : "pledge-opt" } >
                        <button className =  "pay-btn"  onClick = { this.pay } >
                            <span className = "pay-text" > 银联支付 </span> 
                        </button> 
                        <div className = "refund-tip" > 所交押金通过APP随时退款 </div> 
                    </div> 
                    <div className = "have-pledge" onClick = { this.returnMoney } >押金退款 </div> 
                </div> 
            </div>
        </div>;
    }
}