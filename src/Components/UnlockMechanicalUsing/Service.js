import React from 'react'
import ReactDOM from 'react-dom'

export default class Service extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            msg_show: true
        }
    }

    close() {
        this.setState({
            msg_show: !this.state.msg_show
        })
    }

    render() {
        const str = 'No.' + (this.props.data.state.info.bike.no ? this.props.data.state.info.bike.no : '');
        return <div className="service">
				<div className="serviceContain">
					<p className="serviceCode">{str}</p>
					<p className="serviceIcon">解锁码 : {this.props.data.state.info.bike.unlockCode}</p>
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
