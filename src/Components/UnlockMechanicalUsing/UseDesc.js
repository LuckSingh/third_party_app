import React from 'react'
import ReactDOM from 'react-dom'
import GetPostStore from '../../Common/Api/GetPostStore'
import Navigate from '../../Common/Public/Navigate'
export default class UseDesc extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            useTime: '',
            cost: '',
            priceDesc: ''
        }
    }
    componentDidMount() {
        GetPostStore.state({}, (res) => {
            if (res.errorCode != 0) {
                alert(res.errorMsg);
            }
            //console.log(res.data.info.bike.unlockCode)
            if (res.data.type == 3) {
                this.setState({
                    useTime: res.data.info.useTime,
                    cost: res.data.info.cost,
                    priceDesc: res.data.info.priceDesc
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

    render() {
        let {useTime, cost, priceDesc} = this.state;

        return <div className="useDesc">
				<div className="useDescContain">
					<div className="useDescContain_item left">
						<p>已经使用</p>
						<div className="mark">
							<span className="markTxt01">{parseInt(useTime / 60) - (-1)}</span>
							<span>分钟</span>
						</div>
					</div>
					<div className="useDescContain_item right">
						<p>当前花费</p>
						<div className="mark">
							<span className="markTxt02">{cost / 100}</span>
							<span>  元</span>
						</div>
					</div>
				</div>
				<div className={priceDesc ? "useActive" : "useActive hide"}>
						<p>{priceDesc ? priceDesc : ''}</p>
				</div>
		</div>;
    }
}
