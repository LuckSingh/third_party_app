import React from 'react'
import ReactDOM from 'react-dom'
import Service from './Service'
import UseDesc from './UseDesc'
import Swiper from './Swiper'
export default class UnlockUsingComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            info: {
                bike: {
                    no: 'bikeNo',
                    unlockCode: '****',
                    codeShow: 'bikeNo'
                },
                useTime: 0,
                cost: 0,
                orderId: 0,
                city: "000"
            },
            swiper: [{
                "sws_tit": "在运营范围内骑行",
                "img": "../static/img/mech_areaItBJ.png",
                "listCir": ["目前北京的运营范围见上图，请务必将车停在运营范围内，否则会被扣除5小蓝车信用分"]
            }, {
                "sws_tit": "规范停车",
                "img": "../static/img/mech_parkrule.png",
                "listCir": [
                    "允许停在路边单车车辆集中区域",
                    "不能停在小区内、停车场、室内等不易找到的区域及影响交通区域"
                ]
            }, {
                "sws_tit": "手动上锁",
                "img": "../static/img/lockIt.png",
                "listCir": [
                    "手动将锁锁上，自动结束计费",
                    "行程订单支付后即可再次用车"
                ]
            }],
            alert: false,
            alertMsg: '确认已手动落锁并已操作复位密码？',
            lockWait: false,
            errorLockAlert: false,
            errorLockMsg: '',
            alertDownLoad: false
        }
    }

    render() {
        console.log(this.state);
        return <div >
            <Service data = { this.state }/>  
            <UseDesc data = { this.state }/> 
            <Swiper data = { this.state.swiper }/>  
        </div>;
    }
}