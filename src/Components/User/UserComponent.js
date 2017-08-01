import React from 'react'
import ReactDOM from 'react-dom'
export default class UserComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            nickname: '186****6243',
            authStatus: 0
        }
    }

    render() {
        let {nickname, authStatus} = this.state;
        return <div>
                <div className="userName">
                        <img src="./static/img/person.png" alt="" className="imgs" />
                        <p className="nickName">{nickname}</p>
                 </div>
                <div className="regList">
                    <ul className="mapWrap">
                        <li>钱包<span><em></em></span></li>
                        <li>实名认证<span><i className="Certification">{authStatus == 0 ? '未认证' : '已认证'}</i><em></em></span></li>
                        <li>行程记录<span><em></em></span></li>
                    </ul>
                    <ul className="mapWrap">
                        <li>用户指南<span><em></em></span></li>
                        <li>用车指引<span><em></em></span></li>
                        <li>联系我们<span><em></em></span></li>
                    </ul>
                </div>
        </div>;
    }
}