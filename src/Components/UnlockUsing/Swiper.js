import React from 'react'
import ReactDOM from 'react-dom'
import $ from '../../../static/js/plugin/zepto';
import Swiper from '../../../static/js/plugin/swiper';
import { SessionSave } from '../../Common/Public/SessionStorage'
//需要优化的点
//可以把每个slider写入store
//初始加载的时候，分别去调取不同的图片
//抽离组件的数据
var cityCode = SessionSave('bgg_cityCode');
export default class SwiperWapper extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
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
            }]
        }

    }
    componentDidMount() {
        switch (cityCode.substring(0, 3)) {
        //北京
        case '000':
        case '010':
            this.setState({
                swiper: [{
                    "sws_tit": "在运营范围内骑行",
                    "img": "../static/img/mech_areaItSZ.png",
                    "listCir": ["目前深圳的运营范围见上图，请务必将车停在运营范围内，否则会被扣除5小蓝车信用分"]
                }, {
                    "sws_tit": "规范停车",
                    "img": "../static/img/parkIt.png",
                    "listCir": ["允许停在路边单车车辆集中区域",
                        "不能停在小区内、停车场、室内等不易找到的区域及影响交通区域"
                    ]
                }, {
                    "sws_tit": "手动上锁",
                    "img": "../static/img/lockIt.png",
                    "listCir": [
                        "手动将锁锁上，自动结束计费",
                        "行程订单支付后即可再次用车"
                    ]
                }]
            })
            break;
        //深圳
        case '755':
            this.setState({
                swiper: [{
                    "sws_tit": "在运营范围内骑行",
                    "img": "../static/img/mech_areaItSZ.png",
                    "listCir": ["目前深圳的运营范围见上图，请务必将车停在运营范围内，否则会被扣除5小蓝车信用分"]
                }, {
                    "sws_tit": "规范停车",
                    "img": "../static/img/parkIt.png",
                    "listCir": ["允许停在路边单车车辆集中区域",
                        "不能停在小区内、停车场、室内等不易找到的区域及影响交通区域"
                    ]
                }, {
                    "sws_tit": "手动上锁",
                    "img": "../static/img/lockIt.png",
                    "listCir": [
                        "手动将锁锁上，自动结束计费",
                        "行程订单支付后即可再次用车"
                    ]
                }]
            })
            break;
        //广州
        case '020':
            this.setState({
                swiper: [{
                    "sws_tit": "在运营范围内骑行",
                    "img": "../static/img/mech_areaItGZ.png",
                    "listCir": ["目前广州的运营范围见上图，请务必将车停在运营范围内，否则会被扣除5小蓝车信用分"]
                }, {
                    "sws_tit": "规范停车",
                    "img": "../static/img/parkIt.png",
                    "listCir": ["允许停在路边单车车辆集中区域",
                        "不能停在小区内、停车场、室内等不易找到的区域及影响交通区域"
                    ]
                }, {
                    "sws_tit": "手动上锁",
                    "img": "../static/img/lockIt.png",
                    "listCir": [
                        "手动将锁锁上，自动结束计费",
                        "行程订单支付后即可再次用车"
                    ]
                }]
            })
            break;
        //成都
        case '028':
            this.setState({
                swiper: [{
                    "sws_tit": "在运营范围内骑行",
                    "img": "../static/img/mech_areaItCD.png",
                    "listCir": ["目前成都的运营范围见上图，请务必将车停在运营范围内，否则会被扣除5小蓝车信用分"]
                }, {
                    "sws_tit": "规范停车",
                    "img": "../static/img/parkIt.png",
                    "listCir": ["允许停在路边单车车辆集中区域",
                        "不能停在小区内、停车场、室内等不易找到的区域及影响交通区域"
                    ]
                }, {
                    "sws_tit": "手动上锁",
                    "img": "../static/img/lockIt.png",
                    "listCir": [
                        "手动将锁锁上，自动结束计费",
                        "行程订单支付后即可再次用车"
                    ]
                }]
            })
            break;
        }


        var mySwiper = new Swiper('.swiper-container', {
            autoplay: 5000,
            loop: true,
            // 如果需要分页器
            pagination: '.swiper-pagination',
            paginationClickable: true
        })

    }
    handleEndLock() {
        location.replace('./lockerrorDetail.html');
    }
    render() {


        let SwiperList = this.state.swiper.map(function(ele, index) {
            let listCir = ele.listCir.map((el, index) => {
                return (<p key={index}><em className="listCir"></em>{el}</p>)
            })
            return (

                <div className="swiper-slide swiper-slide01" key={index}>
                    <div className="swsContain">
                        <ul>
                            <li><img src={ele.img} alt="小蓝单车" /></li>
                            <li><p className="sws_tit">{ele.sws_tit}</p></li>
                            <li>
                                {listCir}
                            </li>
                        </ul>
                    </div>
                </div>
            )
        })

        return (
            <div className="swiper-container swiper-container01">
                <div className="swiper-wrapper swiper-wrapper01">{SwiperList}</div>
                <div className="swiper-pagination"></div>
                <div className="swiper-connetUs"><p><a onClick={this.handleEndLock} href="javascript:;">{ /*联系222人工客服*/ }落锁不结费用?</a></p></div>
            </div>
        )
    }
}
