import React from 'react'
import ReactDOM from 'react-dom'
export default class UseDesc extends React.Component {
    render() {
        return (
            <div className="useDesc">
				<div className="useDescContain">
					<div className="useDescContain_item left">
						<p>已经使用</p>
						<div className="mark">
							<span className="markTxt01">{parseInt(this.props.data.useTime / 60) - (-1)}</span>
							<span>分钟</span>
						</div>
					</div>
					<div className="useDescContain_item right">
						<p>当前花费</p>
						<div className="mark">
							<span className="markTxt02">{(this.props.data.cost) / 100}</span>
							<span>  元</span>
						</div>
					</div>
				</div>
			</div>
        );
    }
}