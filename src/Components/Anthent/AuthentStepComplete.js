import React from 'react';
import ReactDOM from 'react-dom'
import { SessionSave } from '../../Common/Public/SessionStorage'
import Alert from '../Common/Alert'
export default class AnthentStepComplete extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            presentShow: {
                title: '',
                invalidDate: '',
                desc: '',
                amount: ''
            }
        }

        this.handleClick = this.handleClick.bind(this);
    }
    componentDidMount() {

        this.setState({
            presentShow: SessionSave('bgg_presentShow')
        })
    }

    handleClick() {
        //调用扫一扫
        alert('扫一扫');
    }

    render() {
        let invalidDate = this.state.presentShow.invalidDate
        let year = new Date(invalidDate * 1000).getFullYear();
        let month = new Date(invalidDate * 1000).getMonth() + 1;
        let day = new Date(invalidDate * 1000).getDate();
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
               
                 <Alert alert = { this.state.alert } alertMsg = { this.state.alertMsg } comfirm = { this.comfirm} data = {this.state} /> 
            </div>
        );
    }
}