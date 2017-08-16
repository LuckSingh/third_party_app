import React from 'react'
import { SessionSave } from '../../Common/Public/SessionStorage'
import Alert from '../Common/Alert'
import CommonFn from '../../Common/Public/CommonFn'
import $ from '../../../static/js/plugin/zepto';
import GetPostStore from '../../Common/Api/GetPostStore'
import Navigate from '../../Common/Public/Navigate'
var bgg_config = SessionSave('bgg_config');
var paySuccess = CommonFn.StringURLToJSON(location.search);
var depositStatus,
    authStatus;
export default class PayBtn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            payNum: 0,
            alert: false,
            alertMsg: '',
            type: ""
        }

        this.comfirm = this.comfirm.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }
    componentDidMount() {
        var self = this;

        //先获取应该缴纳押金的金额\
        if (!!paySuccess && paySuccess.paySuccess) {
            if (paySuccess.paySuccess == 1) {
                //强刷
                var isForce = 1;
                self.isForce(isForce);
            }
        } else {
            var isForce = 0;
            self.isForce(isForce);
        }


    }
    isForce(isForce) {
        var that = this;
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
                    depositStatus = res.data.depositStatus;
                    authStatus = res.data.authStatus;
                    if (depositStatus == 1) {
                        this.state.first = true;
                        // 已交押金
                        if (authStatus == 1) {
                            //已实名认证
                            Navigate.toIndex();
                        } else {
                            //未实名认证
                            Navigate.toAuth();
                        }
                    } else {
                        //未交押金
                        Navigate.toDeposit();
                    }
                    break;
                default:

                    break;
                }
            },
        )
    }
    handleClick() {
        var frontUrl = window.location.href;
        var da = {
            channel: bgg_config.payChannel,
            customerItem: bgg_config.customer_item,
            frontUrl: frontUrl
        };
        GetPostStore.deposit(da, (data) => {
            console.log(data);
            switch (data.errorCode) {
            case 0:
                //成功了
                location.href = data.data.charge;
                break;
            case 1702:
                this.setState({
                    alert: true,
                    alertMsg: data.errorMsg,
                    type: '1702'
                })
                break;
            case 1042:
                this.setState({
                    alert: true,
                    alertMsg: data.errorMsg,
                    type: '1042'
                })
                break;
            case 1029:
                //支付成功
                this.setState({
                    alert: true,
                    alertMsg: data.errorMsg,
                    type: '1029'
                })
                break;

            }
        })
    }
    comfirm() {
        this.setState({
            alert: false
        })
        switch (this.state.type) {

        case '1702':
            //流水号失效
            location.replace('./index.html');
            break;
        case '1029':
            this.setState({
                statePay: true,
                payNum: this.state.payNum
            })
            break;
        case '1042':
            location.replace('./index.html');
            break;
        default:
            break;
        }
    }
    render() {
        let payLabel = SessionSave('bgg_config').payLabel;
        return (
            <div className="costBtn">
                <button className="costBtnC zfb-pay" onClick={this.handleClick}>
                    <span className="zfb-text">{payLabel}</span>
                </button>
                <p className="costBtnTit">所交押金通过App随时退款</p>
                <Alert alert = { this.state.alert } alertMsg = { this.state.alertMsg } comfirm = { this.comfirm }
            />
            </div>
        )
    }
}