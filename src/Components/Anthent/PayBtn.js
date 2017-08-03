import React from 'react';
import { render } from 'react-dom';
import { sessionSave } from '../../Store/SessionStorage';
import { store } from '../../Store/LocalStore';
import CommonAction from '../../Action/CommonAction';
//var GetPostStore = require('../../Store/GetPostStore');
import { authent } from '../../Store/AuthentStore/AuthentStore'
import AuthentAction from '../../Action/AuthentAction/AuthentAction';

import $ from '../../../static/js/plugin/zepto';
import Alert from '../Wait/Alert';
var CommonFn = require('../../Store/CommonFn.js')
var bgg_config = sessionSave('bgg_config');
var GetPostStore = require('../../Store/Api/GetPostStore');



var paySuccess = CommonFn.getQueryString(location.search);
console.log(paySuccess)
var depositStatus,
    authStatus;
function getStoreState() {
    console.log(authent.getState());
    return authent.getState();
}
console.log(getStoreState());
export default React.createClass({
    // 状态强刷
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
                            location.replace('index.html')
                        } else {
                            //未实名认证
                            location.hash = '#/02';
                            this.state.first = true;
                            this.state.second = false;
                            this.state.wait = false;
                        }
                    } else {
                        //未交押金
                        location.replace('authent.html#/01')
                    }
                    break;
                default:

                    break;
                }
            },
        )
    },

    componentDidMount: function() {
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


    },
    getInitialState: function() {
        return ({
            payNum: '0',
            alert: false,
            alertMsg: '',
            type: ""
        });
    },
    handleClick: function() {
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
    },
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
    },
    render: function() {
        let payLabel = sessionSave('bgg_config').payLabel;
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
})