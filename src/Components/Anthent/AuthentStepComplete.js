import React from 'react';
import ReactDOM from 'react-dom'
export default class AnthentStepComplete extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    }
    componentDidMount() {}

    render() {
        // let invalidDate = this.state.presentShow.invalidDate
        // let year = new Date(invalidDate * 1000).getFullYear();
        // let month = new Date(invalidDate * 1000).getMonth() + 1;
        // let day = new Date(invalidDate * 1000).getDate();
        return (
            <div>
                <div className="lg_tag">
                    <div className="lg_tag_left">
                            <p className="lg_tit">{this.state.presentShow.title}</p>
                            <dl>
                                <dt className="lg_time">有效期至{year}.{month}.{day}</dt>
                                <dd className="lg_desc01">{this.state.presentShow.desc}</dd>
                                
                            </dl>
                    </div>
                    <div className="lg_tag_right">
                        <p>
                            <span className="lg_price">{this.state.presentShow.amount / 100}</span>
                            <span>元</span>
                        </p>
                    </div>
                </div> 
                <div className="authentSuccess">
                    <div className="AS_left"></div>
                    <div className="AS_right">认证成功，送您一张优惠券</div>
                </div>
                <div className="authentUse">
                    <button className="authentNowBtn authentNowBtnCompleted" onClick={this.handleClick}>立即扫码用车</button>
                </div>              
                <UnlockWait unlocking={this.state.unlocking}/>
                <Alert alert={this.state.alert} alertMsg={this.state.alertMsg} openSys={this.openSys} cancel={this.cancel}/>
            </div>
        );
    }
}