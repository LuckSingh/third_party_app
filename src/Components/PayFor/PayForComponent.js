import React from 'react'
import ReactDOM from 'react-dom'
export default class PayForComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            totalCnt: 0,
            privilegeDiscount: 0,
            activityPriceP: 0,
            amount: 0,
            timeStr: 0,
            usePrice: 0,
            payLabel: '银联支付'
        }
    }

    render() {
        let {totalCnt, privilegeDiscount, activityPriceP, amount, timeStr, usePrice, payLabel} = this.state;
        // var payLabel = sessionSave('bgg_config_init').payLabel;
        // var useTime = this.state.useTime,
        //     usePrice = this.state.rawPrice;
        // if (this.state.activityOrder) {
        //     useTime = this.state.activityNormalTime;
        //     usePrice = this.state.activityNormalPrice;
        // }
        // let useMinute = Math.ceil(useTime / 60);
        // let useHours = parseInt(useMinute / 60);
        // let timeStr = useHours > 0 ?
        //     (useHours + '小时' + Math.ceil(useMinute % 60) + '分钟') : (Math.ceil(useMinute) + '分钟');

        // let amount = this.state.voucher ? this.state.voucherAmount ? this.state.voucherAmount : (this.state.voucher.amount / 100) : '0';
        // let privilegeDiscount = this.state.isPrivilege ? (this.state.privilegeDiscount / 100).toFixed(2) : 0;
        // let activityPriceP = this.state.activityOrder ? this.state.activityBenefit / 100 : 0;

        // var totalCnt = (this.state.voucher ? this.state.actualPrice - amount * 100 <= 0 ? 0 : (this.state.actualPrice - amount * 100) / 100 : this.state.actualPrice / 100).toFixed(2);
        // if (totalCnt + '' == 'NaN') {
        //     totalCnt = '0.00';
        // }

        return (
            <div className = "detail" >
                <div className = "detail_money">
                    <p>
                        <span></span> 
                        <span> { totalCnt } </span> 
                        <span> 元 </span> 
                    </p> 
                    <div className = {(this.state.activityOrder || this.state.voucher || this.state.isPrivilege) ? "detail_promotion_tag " : "detail_promotion_tag detail_promotion_tagHide"}>已优惠 {-(-privilegeDiscount - activityPriceP - amount) }  元 </div> 
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
                <div className = "promotionList" onClick = { this.bundleClick } >
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
            </div>
        );
    }
}