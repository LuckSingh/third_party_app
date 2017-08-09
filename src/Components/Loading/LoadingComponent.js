import React from 'react'
import ReactDOM from 'react-dom'
import Alert from '../Common/Alert'
import GetPostStore from '../../Common/Api/GetPostStore'
import Navigate from '../../Common/Public/Navigate'
import GetLocation from '../../Common/Public/GetLocation'
import { SessionSave } from '../../Common/Public/SessionStorage'
var bikeNo = SessionSave('bgg_bikeNo');
var timer;
export default class LoadingComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            // 动画效果
            spinner: true,
            alert: false,
            alertMsg: '',
            orderId: '',
            bikeNo: ''

        }
    }
    componentDidMount() {
        this.bikeState();
    }
    bikeState() {
        GetPostStore.state({}, (res) => {
            if (res.errorCode.toString() == '0') {
                if (res.data.type == 3) {
                    //获取车号
                    var no = res.data.info.bike.no;
                    return;
                } else if (res.data.type == 6) {
                    this.setState({
                        spinner: false,
                        orderId: res.data.info.orderId,
                        bikeNo: res.data.info.bikeNo
                    });
                    return;
                } else if (res.data.type == 2) {
                    self.setState({
                        spinner: false
                    });
                    return;
                } else if (res.data.type == 0 || res.data.type == 1) {
                    this.unLockBike();
                }
            }
        })
    }
    //解锁车辆
    unLockBike() {
        let self = this;
        let data;
        let latitude;
        let longitude;
        GetLocation((result) => {
            latitude = result.position.lat;
            longitude = result.position.lng;
            var no = bikeNo;
            if (
                    (Number(no.slice(3)) <= 499999) && (Number(no.slice(3)) > 0)
            ) {
                //解锁智能锁需要的参数
                let param = {
                    bikeNo: no,
                    method: 0,
                    longitude: longitude,
                    latitude: latitude,
                    considerActivity: 1
                };
                //解锁智能锁
                self.unLock(param);
            } else if (
                    (Number(no.slice(3)) > 499999) && (Number(no.slice(3)) <= 989999)
            ) {
                //解锁机械锁
                self.unLockBrief(no, data, latitude, longitude, component);
            } else {
                alert('单车不存在')
            }
        }, () => {
            alert("无法获取您的位置");
            return false;
        })
    }
    //解锁智能锁
    unLock(da) {

        let self = this;
        GetPostStore.unlockBike(da, (data) => {
            if (data.errorCode.toString() == '0') {
                //轮训解锁车辆
                self.unLockState(true);
                return;
            } else if (data.errorCode.toString() == '1003') {
                //未缴纳押金
                component.setState({
                    spinner: false,
                    alert: true,
                    alertMsg: data.errorMsg,
                    type: 'deposit'
                });
            } else if (data.errorCode.toString() == '1002') {
                //未实名认证
                component.setState({
                    spinner: false,
                    alert: true,
                    alertMsg: data.errorMsg,
                    type: 'auth'
                });
            } else if (data.errorCode.toString() == '1404') {
                //用车中
                Navigate.toUnlockUsing();
            } else if (data.errorCode.toString() == '1405') {
                //还有未完成订单
                self.state(true);
            } else {
                if (timer) {
                    clearInterval(timer)
                }
                component.setState({
                    spinner: false,
                    alert: true,
                    alertMsg: data.errorMsg,
                    type: 'default'
                });
            }
        });
    }

    //解锁机械锁
    unLockBrief() {}
    //轮训解锁车辆
    unLockState(beforeUnlocking) {
        let self = this;
        //获取到车号
        var bikeNo = SessionSave('bgg_bikeNo');
        GetPostStore.state({}, (data) => {
            if (data.errorCode.toString() == '0') {
                self.setState({
                    alert: false
                })
                var useStatusDate = data.data;
                if (useStatusDate && data.data.type.toString() == '0' || data.data.type.toString() == '1') {
                    //0闲置 1已经预约在寻车中
                    if (beforeUnlocking) {
                        var no = bikeNo;
                        return;
                    } else {
                        self.setState({
                            spinner: false,
                            alert: true,
                            alertMsg: '解锁失败，请重试',
                            type: 'default'
                        })
                    }

                } else if (useStatusDate && data.data.type.toString() == '2') {
                    //解锁中
                    timer = setTimeout(function() {
                        self.unLockState(false);
                    }, 5000)
                } else if (useStatusDate && data.data.type.toString() == '3') {
                    //用车中
                    if (beforeUnlocking) {
                        component.setState({
                            spinner: false,
                            alert: true,
                            alertMsg: data.errorMsg,
                            type: 'usingBike'
                        })
                    } else {
                        Navigate.toUnlockUsing();
                    }


                } else if (useStatusDate && data.data.type.toString() == '6') {
                    component.setState({
                        spinner: false,
                        alert: true,
                        alertMsg: data.errorMsg,
                        type: 'order'
                    })
                } else {
                    component.setState({
                        spinner: false,
                        alert: true,
                        alertMsg: data.errorMsg,
                        type: 'default'
                    })
                }
            }
        })
    }
    render() {
        return <div>
            <div className = { this.state.spinner ? "spinner" : "spinner spinnerHide" } >
                <div className = "double-bounce1" ></div> 
                <div className = "double-bounce2" ></div>
            </div>  
            <Alert alert = { this.state.alert } alertMsg = { this.state.alertMsg } comfirm = { this.comfirm }/>  
        </div>;
    }
}