import React from 'react'
import ReactDOM from 'react-dom'

export default class UnlockMechanicalUsingComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            useTime: 0,
            cost: 0,
            bike: {
                priceDesc: 1
            }
        }
    }

    render() {
        return <div className="useDesc">
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
                <div className={this.state.bike.priceDesc ? "useActive" : "useActive hide"}>
                        <p>{this.state.bike.priceDesc ? this.state.bike.priceDesc : ''}</p>
                </div>
        </div>;
    }
}