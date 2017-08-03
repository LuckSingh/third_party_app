import React from 'react'
import ReactDOM from 'react-dom'
import GetPostStore from '../../Common/Api/GetPostStore'
import Navigate from '../../Common/Public/Navigate'
export default class UserComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            nickname: '100****0000',
            authStatus: 0,
            avatarImg: ''
        }
    }
    componentDidMount() {
        let {nickname, authStatus, avatarImg} = this.state;
        GetPostStore.userInfo({}, (res) => {
            if (res.data.nick) {
                this.setState({
                    nickname: res.data.nick
                })
            } else {
                this.setState({
                    nickname: res.data.mobile
                })
            }
            if (res.data.avatarImg) {
                this.setState({
                    avatarImg: res.data.avatarImg
                })
            }
            if (res.data.authStatus == 1) {
                this.setState({
                    authStatus: 1
                })
            } else {
                this.setState({
                    authStatus: 0
                })
            }
        })
    }
    handleWallet() {
        Navigate.toWallet();
    }
    render() {
        let {nickname, authStatus, avatarImg} = this.state;
        return <div>
                <div className="userName">
                        <img src= {avatarImg != '' ? avatarImg : "./static/img/person.png"} className="imgs" />
                        <p className="nickName">{nickname}</p>
                 </div>
                <div className="regList">
                    <ul className="mapWrap">
                        <li onClick={this.handleWallet}>钱包<span><em></em></span></li>
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