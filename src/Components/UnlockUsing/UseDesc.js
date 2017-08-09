import React from 'react'
import ReactDOM from 'react-dom'
import GetPostStore from '../../Common/Api/GetPostStore'
import Navigate from '../../Common/Public/Navigate'
var timer;
export default class UseDesc extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            useTime: '0',
            cost: '0'
        }
    }

    componentDidMount() {
        this.bikeState()
    }
    bikeState() {
        let self = this;
        //调用state
        GetPostStore.state({}, (data) => {
            if (data.data.type == 3) {
                self.setState({
                    useTime: data.data.info.useTime,
                    cost: data.data.info.cost
                })

                SessionSave('bgg_orderId', data.data.info.orderId);
                SessionSave('bgg_bikeNo', data.data.info.bike.no);

                timer = setTimeout(() => {
                    self.bikeState();
                }, 10000)

            } else if (data.data.type == 6) {
                let voucherId = data.data.info.voucher ? data.data.info.voucher.voucherId : '0'
                clearTimeout(timer);
                SessionSave('bgg_orderId', data.data.info.orderId);
                SessionSave('bgg_bikeNo', data.data.info.bikeNo);
                SessionSave('bgg_voucherId', voucherId);
                Navigate.toPayfor();

            } else if ((data.data.type == 0) || (data.data.type == 2)) {

                location.replace('./loading.html');
            } else {
                clearTimeout(timer);
                return;
            }
        })

    }

    render() {
        return (
            <div className="useDesc">
                <div className="useDescContain">
                    <div className="useDescContain_item left">
                        <p>已经使用</p>
                        <div className="mark">
                            <span className="markTxt01">{parseInt(this.state.useTime / 60) - (-1)}</span>
                            <span>分钟</span>
                        </div>
                    </div>
                    <div className="useDescContain_item right">
                        <p>当前花费</p>
                        <div className="mark">
                            <span className="markTxt02">{(this.state.cost) / 100}</span>
                            <span>  元</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}