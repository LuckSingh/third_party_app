import React from 'react'
import ReactDOM from 'react-dom'
import GetPostStore from '../../Common/Api/GetPostStore'
import { SessionSave } from '../../Common/Public/SessionStorage'
export default class AuthentStepAuth extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            IDCompleted: false,
            nameCompleted: false,
            nameValue: '',
            intValue: ''
        }
        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleBtnClick = this.handleBtnClick.bind(this);
        this.handleChangeID = this.handleChangeID.bind(this);
        this.overSeaUser = this.overSeaUser.bind(this);
    }
    componentDidMount() {}
    handleChangeName() {
        var val = this.refs.Name.value;
        console.log(val)
        if (val != '') {
            this.setState({
                nameValue: val,
                nameCompleted: true
            })
            return;
        }
        this.setState({
            nameValue: val,
            nameCompleted: false
        })
        return;
    }

    handleChangeID() {
        var val = this.refs.IDcard.value;
        console.log(val.length)
        if ((val.length == 6 || val.length == 16) && (val.length > this.state.intValue.length)) {
            val += "  ";

        }
        //判断是否是粘贴过来的
        console.log(val.length)
        if ((val.length >= 18) && (val.indexOf('  ') == -1)) {
            val = val.split('  ').join('').slice(0, 5) + '  ' + val.split('  ').join('').slice(5, 13) + '  ' + val.split('  ').join('').slice(13)
        }
        if (val.length > 22) {
            val = val.slice(0, 22);
            return;
        } else if (val.length == 22) {

            this.setState({
                intValue: val,
                IDCompleted: true
            })
            return;
        } else {
            this.setState({
                intValue: val,
                IDCompleted: false
            })
            return;
        }
        this.setState({
            intValue: val
        })
    }
    handleBtnClick() {
        if (!(this.state.IDCompleted && this.state.nameCompleted)) return;

        let name = this.refs.Name.value;
        let IDcard = this.refs.IDcard.value.replace(/\s+/g, "");

        if (!(this.state.nameCompleted && this.state.IDCompleted)) return;

        var param = {
            name: encodeURI(name),
            idNo: IDcard
        }
        GetPostStore.auth(param, (data) => {
            switch (data.errorCode.toString()) {
            case '1014':
                alert('身份信息已被其他账号认证，您可通过拍照方式重做人工认证');
                break;
            case '1015':
                alert('身份证已被绑定');
                break;
            case '1016':
                alert('不再接入认证服务');
                break;
            case '1030':
                alert('姓名与身份证号不匹配');
                break;
            case '1001':
                alert('请重新登录');
                break;
            case '0':
                console.log(data.data);

                SessionSave('bgg_presentShow', data.data);
                location.hash = '#/complete';
                break;
            default:
                break;
            }

        })
    }
    overSeaUser() {
        alert('港澳台及海外用户请下载小蓝单车APP登录后即可认证');
    }
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
                        <input type="text" placeholder="请输入身份证号码" ref="IDcard"  onChange={this.handleChangeID} value={this.state.intValue}/>
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