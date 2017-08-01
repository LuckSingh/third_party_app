import React from 'react'
import ReactDOM from 'react-dom'
export default class WalletComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            balance: '345',
            couponNum: 0,
            depositStatus: 0
        }
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
            <li><a href="./couponList.html">优惠券<span><i className="coupon_num">{couponNum}张</i><em></em></span></a></li>
            <li><a href="./pledge.html">押金<span><i className="deposit_status">{depositStatus == 0 ? '未交纳' : '已交纳'}</i><em></em></span></a></li>
        </ul>
        <div className="walletBtn">
            <div className="wallet_btn">
                余额充值
            </div>
        </div>
        </div>;
    }
}