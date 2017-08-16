import React from 'react'
import ReactDOM from 'react-dom'
import { SessionSave } from '../../Common/Public/SessionStorage'
import GetPostStore from '../../Common/Api/GetPostStore'
import Navigate from '../../Common/Public/Navigate'
import CommonFn from '../../Common/Public/CommonFn'
import Alert from '../Common/Alert'
var paySuccess = CommonFn.StringURLToJSON(location.search);
var orderId = SessionSave('bgg_orderId')
export default class PayForComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            actualPrice: 0,
            activityOrder: 0,
            activityBenefit: 0,
            rawPrice: 0,
            useTime: 0,
            activityNormalPrice: 0,
            privilegeDiscount: 0,
            isPrivilege: 0,
            activityNormalTime: 0,
            usePrice: 0,
            voucherAmount: '',
            voucher: {
                amount: 0
            },
            alert: false,
            alertMsg: ''
        }

        this.bundlePromo = this.bundlePromo.bind(this);
        this.handlePay = this.handlePay.bind(this);
        this.comfirm = this.comfirm.bind(this);
    }

    componentDidMount() {
        let self = this;
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
    //支付
    handlePay() {
        var self = this;
        let amount = this.state.voucher ? this.state.voucherAmount ? this.state.voucherAmount : (this.state.voucher.amount /
        100) : '0';
        let voucherId = this.state.voucher ? ((this.state.voucherId == '0')) ? this.state.voucher.voucherId : this.state
            .voucherId : 0;

        // 优雅的三元判断
        let price = this.state.activityOrder ? this.state.voucher ? ((this.state.activityNormalPrice + this.state.activityPrice) -
        amount * 100 <= 0 ? 0 : this.state.rawPrice - amount * 100) / 100 : (this.state.activityNormalPrice + this.state
            .activityPrice) / 100 : this.state.voucher ? (this.state.rawPrice - amount * 100 <= 0 ? 0 : this.state.rawPrice -
        amount * 100) / 100 : this.state.rawPrice / 100

        //获取默认voucherId
        var data = null;
        var bgg_config = SessionSave('bgg_config');
        var realCnt = $('.detail_money').find('p').find('span').eq(1).html();
        if (realCnt == 0) {
            payType = 2;
        }

        //参数还是没有确定
        var h = {
            voucherId: voucherId,
            orderId: SessionSave('bgg_orderId'),
            customerItem: SessionSave('bgg_config').customer_item,
            channel: SessionSave('bgg_config').payChannel
        }

        GetPostStore.pay(h, (data) => {
            console.log(data);
            switch (data.errorCode) {
            case 0:
                //成功了
                location.href = data.data.charge;
                break;
            case 1029:
                location.replace('./trip.html');
                break;
            case 1702:
                //流水号失效 跳转到九宫格||跳转到扫码页面
                this.setState({
                    alert: true,
                    alertMsg: data.errorMsg,
                    type: '1702'
                })
                break;
            case 1042:
                //支付失败
                //alert('支付失败');
                break;
            case 1032:
                this.setState({
                    alert: true,
                    alertMsg: data.errorMsg,
                    type: '1032'
                })
                break;
            default:
                this.setState({
                    alert: true,
                    alertMsg: data.errorMsg,
                    type: 'index'
                })
                break;
            }
        });
    }

    comfirm() {
        this.setState({
            alert: false
        })

        switch (this.state.type) {

        case '1042':

            break;
        case '1032':
            location.replace('./trip.html');
            break;
        case '1702':
            location.href = 'unionpay://cn.cupdata.unionpay?method=finish';
            break;
        default:
            location.replace('./index.html');
            break;
        }
    }


    isForce(isForce) {
        var param = {
            orderId: orderId,
            isForce: isForce
        }
        GetPostStore.orderDetail(param, (res) => {
            if (res.errorCode.toString() == '9999') {
                return;
            } else if (res.data.order.status.toString() == '0') {
                Navigate.toTrip();
            }
            //负值请求的数据
            this.setState(res.data.order);
        })
    }
    bundlePromo() {
        if (!this.state.voucher) return;
        //只有初始加载的时候voucherId才等于‘’
        //
        if (this.state.voucherId == '0') {
            this.setState({
                voucherId: this.state.voucher.voucherId,
                voucherTitle: this.state.voucher.title,
                voucherAmount: this.state.voucher.amount / 100
            })
        }

        location.hash = "/promotion"
    }
    render() {
        let {activityOrder, usePrice, activityNormalTime, activityNormalPrice, useTime, rawPrice, voucher, activityBenefit, isPrivilege, voucherAmount, actualPrice} = this.state;
        var payLabel = SessionSave('bgg_config_init').payLabel;


        if (activityOrder) {
            useTime = activityNormalTime;
            usePrice = activityNormalPrice;
        }
        let useMinute = Math.ceil(useTime / 60);
        let useHours = parseInt(useMinute / 60);
        let timeStr = useHours > 0 ?
            (useHours + '小时' + Math.ceil(useMinute % 60) + '分钟') : (Math.ceil(useMinute) + '分钟');

        let amount = voucher ? voucherAmount ? voucherAmount : (voucher.amount / 100) : '0';
        let privilegeDiscount = isPrivilege ? privilegeDiscount ? (privilegeDiscount / 100).toFixed(2) : 0 : 0;
        let activityPriceP = activityOrder ? activityBenefit / 100 : 0;

        var totalCnt = (voucher ? actualPrice - amount * 100 <= 0 ? 0 : (actualPrice - amount * 100) / 100 : actualPrice / 100).toFixed(2);
        if (totalCnt + '' == 'NaN') {
            totalCnt = '0.00';
        }
        return (
            <div className = "detail" >
                <div className = "detail_money">
                    <p>
                        <span></span> 
                        <span> { totalCnt } </span> 
                        <span> 元 </span> 
                    </p> 
                    <div className = {(activityOrder || voucher || isPrivilege) ? "detail_promotion_tag " : "detail_promotion_tag detail_promotion_tagHide"}>已优惠 {-(-privilegeDiscount - activityPriceP - amount) }  元 </div> 
                </div> 
                <div className = "detail_tit">
                    <div className = "detail_txt" > 费用详情 </div> 
                </div> { /*正常计价*/ } 
                <div className = "detail_cost" >
                    <div className = "dc_left">
                        <ul className = "dc_left_list" >
                            <li> 标准时长计费 </li> 
                            <li > { timeStr }＊ { this.state.priceRules } </li> 
                        </ul> 
                    </div> 
                    <div className = "dc_right" > {(usePrice / 100).toFixed(2)}元 </div>
                </div>
                <div className = { this.state.activityOrder ? "detail_cost activity" : "detail_cost activity hide" } >
                    <div className = "dc_left" >
                        <ul className = "dc_left_list" >
                            <li> 活动时长计费 </li> 
                            <li> { this.state.activityOrder ? parseInt(this.state.activityTime / 3600) > 0 ? (parseInt(this.state.activityTime / 3600) + '小时' + parseInt(this.state.activityTime % 3600 / 60) + '分钟') : (Math.ceil(this.state.activityTime / 60) + '分钟') : 0}＊ { this.state.activityOrder ? this.state.activityPriceRules : 0 } </li> 
                        </ul> 
                    </div> 
                    <div className = "dc_right" > {(this.state.activityPrice / 100).toFixed(2)}元 </div> 
                </div>
                <div className = { this.state.isPrivilege ? "detail_cost" : "detail_cost hide" } >
                    <div className = "dc_left">
                        <ul className = "dc_left_list">
                            <li> 特权卡扣减 </li> 
                            <li> <span> { this.state.isPrivilege ? this.state.privilegeCardName : '' } </span> </li> 
                        </ul> 
                    </div>
                    <div className = "dc_right" > 
                        <span> -{ this.state.isPrivilege ? (this.state.privilegeDiscount / 100).toFixed(2) : 0}元 </span> 
                    </div> 
                </div>                 
                <div className = { this.state.voucher ? "promotionId" : "promotionId promotionIdHide" } > 
                     <p className = "left" > 优惠券 </p> 
                     <p className = "right" > －{this.state.voucher ? this.state.voucherAmount ? this.state.voucherAmount : this.state.voucher.amount / 100 : '0'}.00 元 </p>
                </div> 
                <div className = "promotionList" onClick = { this.bundlePromo } >
                    <p className = "left" > 优惠券 </p>  
                    <p className = "right" > 
                        <span> { this.state.voucher ? !this.state.voucherTitle ? this.state.voucher.title : this.state.voucherTitle : '无可用优惠券' } </span> 
                        <em className = "pro_icon" > </em> 
                    </p> 
                </div>
                <div className = "costBtn" > 
                    <button className = "pay-btn" onClick = { this.handlePay }>
                        <span className = "pay-text" > {payLabel} </span> 
                    </button> 
                </div> 
                <Alert alert = { this.state.alert } alertMsg = { this.state.alertMsg } comfirm = { this.comfirm} data = {this.state} /> 
            </div>
        );
    }
}