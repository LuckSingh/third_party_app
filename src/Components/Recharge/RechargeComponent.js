import React from 'react'
import ReactDOM from 'react-dom'
import Alert from '../Common/Alert'
import { SessionSave } from '../../Common/Public/SessionStorage'
import GetPostStore from '../../Common/Api/GetPostStore'
export default class RechargeComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            rechargeList: [],
            alert: false,
            alertMsg: '',
            alertType: ''
        }
    }
    componentDidMount() {
        GetPostStore.rechargeInfo({}, (res) => {
            if (res.errorCode == 0) {
                this.setState({
                    rechargeList: res.data.list
                })
            }
        })
    }
    //支付
    chargePay() {
        let self = this;
        let listid = $('.reactive').attr('data-id');
        var customer_item = SessionSave('bgg_config').customer_item;
        var h = {
            id: listid,
            customerItem: customer_item,
            channel: SessionSave('bgg_config').payChannel
        }
        GetPostStore.recharge(h, (data) => {
            switch (data.errorCode) {
            case 0:
                //成功了
                location.href = data.data.charge;
                break;
            case 1702:
                //流水号失效 跳转到九宫格||跳转到扫码页面
                self.setState({
                    alert: true,
                    alertMsg: data.errorMsg,
                    alertType: '1702'
                })
                break;
            case 1042:
                self.setState({
                    alert: true,
                    alertMsg: data.errorMsg,
                    alertType: '1042'
                })
                break;
            case 1029:
                self.setState({
                    alert: true,
                    alertMsg: data.errorMsg,
                    alertType: '1029'
                })
                break;
            }
        })
    }
    //选择金额
    chooseNum(e) {
        let {active} = this.state;
        //获取到点击对象的id
        let listid = e.target.getAttribute('data-id');
        $(e.target).addClass("reactive").siblings().removeClass("reactive")
    }
    comfirm() {
        let {alertType} = this.state;
        this.setState({
            alert: false
        })
        switch (alertType) {

        case '1702':
            //流水号失效 暂时去首页
            Navigate.toIndex();
            break;
        case '1029':
            //缴纳成功了
            this.setState({
                statePay: true,
                payNum: this.state.payNum
            })
            break;
        case '1042':
            Navigate.toIndex();
            break;
        }
    }
    render() {
        let payLabel = SessionSave('bgg_config').payLabel;
        let {rechargeList, active} = this.state;
        return <div>
            <p>充值金额</p>


            <div className="recharge-param">
                {
            rechargeList.map((item, index) => {
                return (
                    <div onClick={this.chooseNum.bind(this)}  key={index} data-id={item.id} className= 'recharge-money' >
                        充{item.amount / 100}元
                    </div>
                )
            })
            }
            </div>
            <div className="pay-container">
                <button onClick={this.chargePay.bind(this)} className =  "pay-btn">
                    <span className = "pay-text" > {payLabel} </span> 
                </button> 
            </div>
            <div className="rules">
                <p><span>点击支付即表示同意</span><span><a href="https://www.bluegogo.com/bikerule/rechangeRule.html">《充值协议》</a></span></p>
            </div>
            <Alert alert = { this.state.alert } alertMsg = { this.state.alertMsg } comfirm = { this.comfirm } /> 
        </div>;
    }
}