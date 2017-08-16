import React from 'react'
import ReactDOM from 'react-dom'
import Alert from '../Common/Alert'
import GetPostStore from '../../Common/Api/GetPostStore'
import Navigate from '../../Common/Public/Navigate'
import CommonFn from '../../Common/Public/CommonFn'
import { SessionSave } from '../../Common/Public/SessionStorage'
import GetLocation from '../../Common/Public/GetLocation'
export default class IndexComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            btnValue: "扫码解锁", //扫码按钮
            alert: false, //alert提示框
            alertMsg: '', //内容
            alertType: '' //点击跳转的地址
        }
        this.comfirm = this.comfirm.bind(this);
    }
    componentDidMount() {
        var self = this;
        //获取到首页参数
        var searchStr = 'localhost:8899/index.html?serialNO=ae5f0d03-84dc-45d0-9f33-06b7273ca33d&appCode=Y03301&type=2&mobile=CMXhN7gdswsO39svSeSzqQ%3D%3D&pageStyle=JM0001&userName=w0XNFp%2BS6nJOLREJBYpY9A%3D%3D&channelNo=Q000101&secStr=lf4kAnnu%2F3PXGrOz90YooQ%3D%3D'
        //var searchStr = window.location.search;
        //customer_item 此参数为每个平台私有的参数
        var customer_item = CommonFn.StringURLToJSON(searchStr);
        var newBggConfig = SessionSave('bgg_config_init');
        newBggConfig.customer_item = customer_item;
        //需要截取放在session中
        SessionSave('bgg_config', newBggConfig);
        //获取token
        if (!SessionSave('bgg_token')) {
            GetLocation((res) => {
                console.log('获取到location');
                var adCode = '010105';
                //var adCode = res.addressComponent.adcode;
                var position = {
                    latitude: res.position.lat,
                    longitude: res.position.lng,
                    adcode: adCode
                }
                //存储下cityCode
                SessionSave('bgg_cityCode', adCode);
                //取出来需要的参数
                var bggConfigData = SessionSave('bgg_config');
                var bggCityCode = SessionSave('bgg_cityCode');
                //调用绑定接口
                GetPostStore.binding({
                    citycode: bggCityCode,
                    verifyObj: bggConfigData.customer_item
                }, (result) => {
                    if (result.code == 0) {
                        SessionSave('bgg_token', result.object.authtoken);
                        //调用state 判断状态
                        this.bikeState();
                    } else {
                        //绑定失败
                        alert('绑定失败')
                    }
                })
            }, () => {
                alert('无法获取到您的位置');
                return false;
            })
        } else {
            //已经存在token
            this.bikeState();
        }
    }
    bikeState() {
        GetPostStore.state({}, (res) => {
            if (res.errorCode.toString() == '0') {
                switch (res.data.type) {
                case 3:
                    //骑行中状态 跳转到骑行中
                    var no = res.data.info.bike.no;
                    if ((Number(no.slice(3)) <= 499999) && (Number(no.slice(3)) > 0)) {
                        this.setState({
                            alert: true,
                            alertMsg: res.errorMsg,
                            alertType: 'unlockbike'
                        });
                    } else if ((Number(no.slice(3)) > 499999) && (Number(no.slice(3)) <= 989999)) {
                        this.setState({
                            alert: true,
                            alertMsg: res.errorMsg,
                            alertType: 'unlockMechanicalbike'
                        });
                    }
                    return;
                    break;
                case 6:
                    // 有未完成订单 跳转到订单的页面
                    this.setState({
                        alert: true,
                        alertMsg: res.errorMsg,
                        alertType: 'pay'
                    });
                    //存下订单编号
                    SessionSave('bgg_orderId', res.data.info.orderId);
                    return;
                    break;
                }
            }
        })
    }
    comfirm() {
        //判断是没有支付，还是用车中
        let {alertType} = this.state;
        if (alertType == 'pay') {
            Navigate.toPayfor();
        } else if (alertType == 'unlockbike') {
            Navigate.toUnlockUsing();
        } else {
            Navigate.toUnlockMechanicalUsing();
        }
    }
    //我的押金
    handlePledge() {
        Navigate.toPledge();
    }
    //扫码用车
    handleScan() {
        //扫码成功之后 应该是一个地址
        var result = 'https://www.bluegogo.com/qrcode.html?no=755500143';
        var bikeNo = result.split("no=")[1];
        SessionSave('bgg_bikeNo', bikeNo);
        Navigate.toLoading();
    }
    //用户中心
    handleUser() {
        Navigate.toUser();
    }
    render() {
        return <div>
            <div className = "index-content">
                <div onClick={this.handleUser} className = "person" >
                    <img src = "./static/img/person.png"alt = "" />
                </div> 
                <div className = "head">
                    <p onClick = { this.handleScan } className = "btn_scan" > 
                        <em></em>{this.state.btnValue}
                    </p>
                </div>  
                <div onClick={this.handlePledge} className = "avtive_cur" > 我的押金 </div> 
            </div>
            <Alert alert = { this.state.alert } alertMsg = { this.state.alertMsg } comfirm = { this.comfirm} data = {this.state} /> 
        </div>;
    }
}