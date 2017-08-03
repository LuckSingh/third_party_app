import React from 'react'
import ReactDOM from 'react-dom'
import Alert from '../Common/Alert'
import GetPostStore from '../../Common/Api/GetPostStore'
import Navigate from '../../Common/Public/Navigate'
import CommonFn from '../../Common/Public/CommonFn'
import { SessionSave } from '../../Common/Public/SessionStorage'
//获取参数
var paySuccess = CommonFn.StringURLToJSON(location.search);

export default class PledgeComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            alert: false,
            alertMsg: '',
            alertType: '',
            payNum: 0,
            statePay: false //是否缴纳
        }
    }
    //强刷押金状态
    depositIsForce(isForce) {
        var da = {
            'isForce': isForce,
        };
        GetPostStore.authStatus(
            da,
            (res) => {
                //获取到的金额为分=>转换成元
                this.state.payNum = res.data.depositPayable / 100;
                //this.state.payNum = 66;
                switch (res.errorCode) {
                case 0:
                    var depositStatus = res.data.depositStatus;
                    if (depositStatus == 1) {
                        // 已交押金
                        this.setState({
                            statePay: true,
                            payNum: this.state.payNum
                        })

                    } else {
                        //未交押金
                        this.setState({
                            statePay: false
                        })
                    }
                    break;
                }
            }
        )
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
    //押金退款
    returnMoney() {
        alert('请下载小蓝单车App操作押金退款');
    }
    //缴纳押金
    pay() {
        //用来区别是按步骤缴纳押金还是首页／用户中心进来的押金
        var frontUrl = window.location.href;
        var bggConfigData = SessionSave('bgg_config');
        var da = {
            channel: bggConfigData.payChannel,
            customerItem: bggConfigData.customer_item,
            frontUrl: frontUrl
        };
        GetPostStore.deposit(da, (data) => {
            switch (data.errorCode) {
            case 0:
                //成功了
                location.href = data.data.charge;
                break;
            case 1702:
                //流水号失效 跳转到九宫格||跳转到扫码页面
                this.setState({
                    alert: true,
                    alertMsg: data.errorMsg,
                    alertType: '1702'
                })
                break;
            case 1042:
                this.setState({
                    alert: true,
                    alertMsg: data.errorMsg,
                    alertType: '1042'
                })
                break;

            case 1029:
                this.setState({
                    alert: true,
                    alertMsg: data.errorMsg,
                    alertType: '1029'
                })

                break;

            }

        })
    }
    componentDidMount() {
        var self = this;
        //获取页面参数是否是缴纳成功
        if (!!paySuccess && paySuccess.paySuccess) {
            if (paySuccess.paySuccess == 1) {
                //强刷
                var isForce = 1;
                self.depositIsForce(isForce);
            }
        } else {
            var isForce = 0;
            self.depositIsForce(isForce);
        }
    }

    render() {
        let {payNum, statePay} = this.state;
        let payLabel = SessionSave('bgg_config').payLabel;
        return <div className = 'pledge'>
            <div className = { statePay ? "pledge-content" : "hide"  }>
                <div className = "pledge-paid-tip" > 已交纳押金(元) </div>    
                <div className = "pledge-paid-num" > { payNum } </div> 
            </div>

            <div className = { this.state.statePay ? "hide" : "pledge-backgroud" }>
                <div className = "pledge-backgroud-content" >
                    <div className = "pledge-paid-num" > { payNum } </div>
                    <div className = "need-pay" > 需要交纳 
                        <span className = "need-pay-num" > { payNum } </span>元，押金可全额退</div>
                        <div className = { this.state.statePay ? "hide" : "pledge-opt" } >
                        <button className =  "pay-btn"  onClick = { this.pay } >
                            <span className = "pay-text" > {payLabel} </span> 
                        </button> 
                        <div className = "refund-tip" > 所交押金通过APP随时退款 </div> 
                    </div> 
                    <div className = "have-pledge" onClick = { this.returnMoney } >押金退款 </div> 
                </div> 
            </div>
            <Alert alert = { this.state.alert } alertMsg = { this.state.alertMsg } comfirm = { this.comfirm } /> 
        </div>;
    }
}