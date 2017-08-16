import React from 'react'
export default class Cost extends React.Component {
    constructor(props) {
        super(props);

    }
    render() {
        return (
            <div className="cost">
                <p className="cost_tit">需交纳押金</p>
                <div className="cost_show">
                    {this.props.data.payNum} <span className="RMB">元</span>
                </div>
            </div>
        )
    }
}