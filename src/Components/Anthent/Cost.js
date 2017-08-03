import React from 'react'
export default React.createClass({
    render() {
        return (
            <div className="cost">
				<p className="cost_tit">需交纳押金</p>
				<div className="cost_show">
					{this.props.payNum / 100} <span className="RMB">元</span>
				</div>
			</div>
        )
    }
})