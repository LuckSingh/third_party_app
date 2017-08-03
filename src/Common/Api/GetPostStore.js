var url = require('./URL_Config.js');
import { SessionSave } from '../Public/SessionStorage';

let client = navigator.appVersion.split(' ')[0].split('.')[0];
while (client.length < 5) {
    client += '0';
}

//ajax 公用方法
function GetPostStore(urlStr, da, suc, err) {

    var channel = SessionSave('bgg_config') ? SessionSave('bgg_config')["channel"] : '';
    var clientInfo = '14100,' + channel + ',2,' + client;
    var token = SessionSave('bgg_token') || '';
    $.ajax({
        url: urlStr,
        type: 'post',
        async: false,
        cache: false,
        timeout: 30000,
        headers: {
            Accept: "*/*"
        },
        dataType: 'json',
        contentType: "application/x-www-form-urlencoded;charset=UTF-8",
        data: {
            'data': JSON.stringify({
                'clientInfo': clientInfo,
                'version': '1',
                'token': token,
                'data': da
            })
        },
        success: function(res) {
            console.log(res.errorCode)
            if (res.errorCode == '1001') {

                if (urlStr != url.getBinding()) {
                    //访问除binding之外的任何业务接口，如果返回1001，即token失效，
                    //则记录下来当前请求的上下文，并静默发起重新绑定
                    var tempRequestObj = {
                        urlStr: urlStr,
                        da: da,
                        suc: suc,
                        err: err
                    };
                    //var bgg_config_data = sessionSave('bgg_config');
                    SessionSave('bgg_temp_requestObj', tempRequestObj);
                    //TODO: 在入口存储手机号和城市
                    binding({
                        citycode: SessionSave('bgg_cityCode'),
                        verifyObj: SessionSave('bgg_config').customer_item
                    }, function(res) {
                        if (res.code == 0) {
                            //静默重新绑定token成功后，记录新tokenm,并且再此发起之前上下文中的请求
                            SessionSave('bgg_token', res.object.authtoken);

                            tempRequestObj = SessionSave('bgg_temp_requestObj');
                            let {urlStr, da, suc, err} = tempRequestObj;
                            GetPostStore(urlStr, da, suc, err);
                        } else {
                            alert("服务器异常，请重试");
                        }
                    });
                }
            } else {
                suc && suc(res);
            }
        },
        error: function(msg) {
            alert("网络错误，请重试");
        }
    })
}


//钱包
function wallet(da, suc, err) {
    GetPostStore(url.getWallet(), da, suc, err);
}
//充值
function recharge(da, suc, err) {
    GetPostStore(url.getRecharge(), da, suc, err);
}
//充值列表
function rechargeInfo(da, suc, err) {
    GetPostStore(url.getRechargeInfo(), da, suc, err);
}
//充值状态
function rechargeState(da, suc, err) {
    GetPostStore(url.getRechargeState(), da, suc, err);
}
//问题反馈2
function feedbackWithMultipart(da, suc, err) {
    GetPostStore(url.getFeedbackWithMultipart(), da, suc, err);
}
//问题反馈
function feedbackDetail(da, suc, err) {
    GetPostStore(url.getFeedbackDetail(), da, suc, err);
}
//优惠券列表
function voucherList(da, suc, err) {
    GetPostStore(url.getVoucherList(), da, suc, err);
}
//绑定银联
function binding(da, suc, err) {
    GetPostStore(url.getBinding(), da, suc, err);
}

//获取userId
function gainOpenId(da, suc, err) {
    GetPostStore(url.getGainOpenId(), da, suc, err);
}
//获取用户信息
function userInfo(da, suc, err) {
    GetPostStore(url.getUserInfo(), da, suc, err);
}
//获取用户信息alipay
function alipayUserInfo(da, suc, err) {
    GetPostStore(url.getAlipayUserInfo(), da, suc, err);
}
//核实手机号
function checkMobile(da, suc, err) {
    GetPostStore(url.getCheckMobile(), da, suc, err);
}
//发送验证码，参数不同flag=0
function sendVerifyCode(da, suc, err) {
    GetPostStore(url.getSendVerifyCode(), da, suc, err);
}
//校建验证码
function checkVerifyCode(da, suc, err) {
    GetPostStore(url.getCheckVerifyCode(), da, suc, err);
}
//登录
function login(da, suc, err) {
    GetPostStore(url.getLogin(), da, suc, err);
}
//重置密码
function resetPass(da, suc, err) {
    GetPostStore(url.getResetPass(), da, suc, err);
}
//注册
function register(da, suc, err) {
    GetPostStore(url.getRegister(), da, suc, err);
}
//交押金 
function deposit(da, suc, err) {
    GetPostStore(url.getDeposit(), da, suc, err);
}
//实名认证
function auth(da, suc, err) {
    GetPostStore(url.getAuth(), da, suc, err);
}
//获取押金认证状态
function authStatus(da, suc, err) {
    GetPostStore(url.getAuthStatus(), da, suc, err);
}
//获取订单详情
function orderDetail(da, suc, err) {
    GetPostStore(url.getOrderDetail(), da, suc, err);
}
//车辆状态，订单状态
function state(da, suc, err) {
    GetPostStore(url.getState(), da, suc, err);
}
//解锁智能锁
function unlockBike(da, suc, err) {
    GetPostStore(url.getUnlockBike(), da, suc, err);
}
//解锁机械锁
function unlockBikeBrief(da, suc, err) {
    GetPostStore(url.getUnlockBikeBrief(), da, suc, err);
}
//机械锁结束用车
function lockBikeBrief(da, suc, err) {
    GetPostStore(url.getLockBikeBrief(), da, suc, err);
}
//支付 channel不同
function pay(da, suc, err) {
    GetPostStore(url.getPay(), da, suc, err);
}

//芝麻信用免押金
function zmxyDeposit(da, suc, err) {
    GetPostStore(url.getZmxyDeposit(), da, suc, err);
}
module.exports = {
    wallet: wallet,
    recharge: recharge,
    rechargeInfo: rechargeInfo,
    rechargeState: rechargeState,
    feedbackWithMultipart: feedbackWithMultipart,
    feedbackDetail: feedbackDetail,
    binding: binding,
    gainOpenId: gainOpenId,
    userInfo: userInfo,
    alipayUserInfo: alipayUserInfo,
    checkMobile: checkMobile,
    sendVerifyCode: sendVerifyCode,
    checkVerifyCode: checkVerifyCode,
    login: login,
    resetPass: resetPass,
    register: register,
    deposit: deposit,
    auth: auth,
    authStatus: authStatus,
    orderDetail: orderDetail,
    state: state,
    unlockBike: unlockBike,
    unlockBikeBrief: unlockBikeBrief,
    lockBikeBrief: lockBikeBrief,
    pay: pay,
    voucherList: voucherList,
    zmxyDeposit: zmxyDeposit
};