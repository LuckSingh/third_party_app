import React from 'react'
import ReactDOM from 'react-dom'
import { SessionSave } from '../../Common/Public/SessionStorage'
import GetPostStore from '../../Common/Api/GetPostStore'
import Navigate from '../../Common/Public/Navigate'
var bikeNo = SessionSave('bgg_bikeNo');
export default class Service extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            msg_show: true,
            bikeNo: '',
            unlockCode: ''
        }
        this.close = this.close.bind(this);
    }
    componentDidMount() {
        GetPostStore.state({}, (res) => {
            if (res.errorCode != 0) {
                alert(res.errorMsg);
            }
            //console.log(res.data.info.bike.unlockCode)
            if (res.data.type == 3) {
                this.setState({
                    bikeNo: bikeNo,
                    unlockCode: res.data.info.bike.unlockCode
                })
            } else if (res.data.type == 6) {
                let voucherId = res.data.info.voucher ? res.data.info.voucher.voucherId : '0';
                Navigate.toPayfor();

            } else if (res.data.type == 2) {
                Navigate.toLoading();
            } else if (res.data.type == 0) {
                if (!!res.data.info) {
                    Navigate.toTrip();
                }
            } else {
                Navigate.toLoading();
                return;
            }
        })
    }
    close() {
        this.setState({
            msg_show: !this.state.msg_show
        })
    }

    render() {
        let {unlockCode} = this.state;
        const str = 'No.' + (this.state.bikeNo ? this.state.bikeNo : '');
        return <div className="service">
                <div className="serviceContain">
                    <p className="serviceCode">{str}</p>
                    <p className="serviceIcon">解锁码 : {unlockCode}</p>
                </div>
                <div className={this.state.msg_show ? "serviceMsg" : "serviceMsg hide"}>
                    <div className="serviceTxt">
                            <p>
                                <span>机械锁车辆不支持落锁自动还车，操作还车请点击“结束用车”按钮</span>
                                <em className="service_closeicon" onClick={this.close}></em>
                            </p>
                    </div>
                </div>
        </div>;
    }

}
