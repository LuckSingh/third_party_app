import React from 'react'
import ReactDOM from 'react-dom'

export default class AuthentStepAuth extends React.Component {
    constructor(props) {
        super(props);

        this.state = {}
    }
    componentDidMount() {}

    render() {
        return (
            <div>
				<div className="AS2_01">
					<div className="AS2_ipt">
						<p>姓名</p>
						<input type="text" placeholder="请输入真实姓名" onChange={this.handleChangeName} ref="Name" value={this.state.nameValue}/>
					</div>
				</div>
				<div className="AS2_01">
					<div className="AS2_ipt">
						<p>身份证号</p>
						<input type="text" placeholder="请输入身份证号码" ref="IDcard" onKeyPress={this.handlePress} onChange={this.handleChangeID} value={this.state.intValue}/>
					</div>
				</div>
				 <div className="authentNow">
					<button className={(this.state.IDCompleted && this.state.nameCompleted) ? "authentNowBtn authentNowBtnCompleted" : "authentNowBtn "} onClick={this.handleBtnClick}>立即认证</button>
					<p className="HATusers"  onClick={this.overSeaUser}>港澳台及海外用户?</p>	
				</div>
			</div>
        )
    }
}