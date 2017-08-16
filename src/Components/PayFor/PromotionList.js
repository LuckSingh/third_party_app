import React from 'react'
import ReactDOM from 'react-dom'
export default class PromotionList extends React.Component {

    constructor(props) {
        super(props);
        console.log(props)
        this.state = {
            voucherList: [],
            promotion: true,

        }
    }

    render() {

        let item = this.state.voucherList.map((ele, index) => {
            let year = new Date(ele.invalidDate * 1000).getFullYear();
            let month = new Date(ele.invalidDate * 1000).getMonth() + 1;
            let day = new Date(ele.invalidDate * 1000).getDate();

            return (
                <div className="promotion" key={index} data-voucherid={ele.voucherId} data-vouchertitle={ele.title} data-voucheramount={(ele.amount / 100).toString()}>
                    <div className="protext">
                        <div className="proleft">
                            <p>{ele.title}</p>
                            <ul>
                                <li>有效期至{year}.{month}.{day}</li>
                                <li>{ele.desc}</li>
                                <li>{ele.title}</li>
                            </ul>                  
                        </div >
                        <div className="proright">
                            <p>
                                <span>{(ele.amount / 100).toString()[1] ? (ele.amount / 100).toString() : (ele.amount / 100).toString() + ' '}</span>
                                <span>元</span>
                            </p>
                        </div>
                    </div>
                    <em className={(this.state.voucherId == ele.voucherId) ? 'checked_icon' : 'checked_icon check_icon_disabled'} onClick={this.handleCheck}></em> 
                </div>
            )
        });

        return (
            <div className="allCon">
                <div className="contain">
                    <div className="noUse" data-voucherid='0.0' data-vouchertitle='不使用优惠券' data-voucheramount='0'>
                        <div className="contain_main">
                            <p className="contain_main_tit">不使用优惠券</p>
                        </div>
                        <em className={this.state.no_promotion ? "check_icon" : "check_icon check_icon_disabled"} onClick={this.handleNoCheck}></em>
                    </div>
                    {item}
                </div>
            </div>
        );
    }
}