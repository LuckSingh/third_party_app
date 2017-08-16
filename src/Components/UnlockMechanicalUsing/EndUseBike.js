//import UnlockAction from '../../Action/UnlockAction/UnlockAction'
import React from 'react'
import ReactDOM from 'react-dom'
import GetPostStore from '../../Common/Api/GetPostStore'
import GetLocation from '../../Common/Public/GetLocation'
import Navigate from '../../Common/Public/Navigate'
import { SessionSave } from '../../Common/Public/SessionStorage'
export default class EndUseBike extends React.Component {
    constructor(props) {
        super(props);

        this.endUse = this.endUse.bind(this);
    }

    endUse() {
        var self = this;
        //获取位置信息
        GetLocation((result) => {
            var code = {
                latitude: result.position.lat,
                longitude: result.position.lng
            }
            GetPostStore.lockBikeBrief(code, (data) => {
                if (data.errorCode.toString() == '0') {
                    if (data.data.order.status == 0) {
                        Navigate.toPayfor();
                    } else {
                        let voucherId = self.state.info.voucher ? self.state.info.voucher.voucherId : '0';
                        SessionSave('bgg_voucherId', voucherId);
                        Navigate.toPayfor();

                    }
                } else if (data.errorCode == '1011') {
                    var scdStr = data.errorMsg.split('<xml>')[1].split('</xml>')[0];
                    if (confirm(scdStr)) {
                        let param = {
                            force: 1,
                            latitude: result.position.lat,
                            longitude: result.position.lng
                        }
                        GetPostStore.lockBikeBrief(param, (scdData) => {
                            if (scdData && scdData.errorCode == '0') {

                                let voucherId = self.state.info.voucher ? self.state.info.voucher.voucherId : '0';
                                if (scdData.data.order.status == 0) {
                                    SessionSave('bgg_orderId', scdData.data.order.orderId);
                                    Navigate.toTrip();
                                } else {
                                    SessionSave('bgg_orderId', scdData.data.order.orderId);
                                    SessionSave('bgg_voucherId', voucherId);
                                    Navigate.toPayfor();
                                }
                            } else {
                                self.state.alert = false;
                                self.state.errorLockAlert = true;
                                var xmlParts = data.errorMsg.split('<xml>')
                                if (xmlParts.length >= 2) {
                                    self.state.errorLockMsg = data.errorMsg.split('<xml>')[1].split('</xml>')[0];
                                } else {
                                    self.state.errorLockMsg = data.errorMsg;
                                }
                            }
                        })
                    }
                } else {
                    var xmlParts = data.errorMsg.split('<xml>')
                    if (xmlParts.length >= 2) {
                        self.state.errorLockMsg = data.errorMsg.split('<xml>')[1].split('</xml>')[0];
                    } else {
                        self.state.errorLockMsg = data.errorMsg;
                    }
                }
            })

        }, () => {
            alert("无法获取您的位置");
            return false;
        })
    }

    render() {
        return <div className="endUseBike">
				<button onClick={this.endUse}>结束用车</button>
		</div>;

    }
}
