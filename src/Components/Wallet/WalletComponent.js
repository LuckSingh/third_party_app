import React from 'react'
import ReactDOM from 'react-dom'
import GetPostStore from '../../Common/Api/GetPostStore'
import Navigate from '../../Common/Public/Navigate'
import CommonFn from '../../Common/Public/CommonFn'
import { SessionSave } from '../../Common/Public/SessionStorage'
//获取参数
var paySuccess = CommonFn.StringURLToJSON(location.search);
export default class WalletComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            balance: 0,
            couponNum: 0,
            depositStatus: 0
        }
    }
    componentDidMount() {
        let self = this;
        let {balance, couponNum, depositStatus} = this.state;
        //userInfo
        GetPostStore.userInfo({}, (res) => {
            if (res.data.depositStatus == 1) {
                this.setState({
                    depositStatus: 1
                })
            } else {
                this.setState({
                    depositStatus: 0
                })
            }
        });
        //获取优惠券
        GetPostStore.voucherList({}, (result) => {
            var resultData = result.data;
            switch (result.errorCode) {
            case 0:
                var num = resultData.voucherList ? resultData.voucherList.length : 0;
                this.setState({
                    couponNum: num
                })
                break;
            }
        })
        //充值
        if (!!paySuccess && paySuccess.paySuccess) {
            if (paySuccess.paySuccess == 1) {
                //强刷
                var h = {
                    orderId: SessionSave('bgg_orderId')
                }
                GetPostStore.rechargeState(h, (data) => {
                    //获取余额
                    GetPostStore.wallet({
                        isForce: 0
                    }, (data) => {
                        if (data.errorCode == 0) {
                            var balance = data.data.balance / 100;
                            self.setState({
                                balance: balance
                            })
                        }
                    })
                })
            }
        } else {
            //获取余额
            GetPostStore.wallet({
                isForce: 0
            }, (data) => {
                if (data.errorCode == 0) {
                    var balance = data.data.balance / 100;
                    self.setState({
                        balance: balance
                    })
                }
            })
        }
    }
    handleRecharge() {
        Navigate.toRecharge();
    }
    render() {
        let {balance, couponNum, depositStatus} = this.state;
        return <div className='wallet'> 
            <ul className="walletWrap detail">
            <li><a href="">总余额</a>
                <div><b>{balance}</b>元</div>
            </li>
        </ul>
        <ul className="walletWrap">
            <li><a href="javasctipt:;">优惠券<span><i className="coupon_num">{couponNum}张</i><em></em></span></a></li>
            <li><a href="javasctipt:;">押金<span><i className="deposit_status">{depositStatus == 0 ? '未交纳' : '已交纳'}</i><em></em></span></a></li>
        </ul>
        <div className="walletBtn">
            <div className="wallet_btn" onClick={this.handleRecharge}>
                余额充值
            </div>
        </div>
        </div>;
    }
}