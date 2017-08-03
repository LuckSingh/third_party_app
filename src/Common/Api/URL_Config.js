//主地址
var config = require('./Server_Config.js');
const url = config.SERVER_DATA;

//钱包余额
const walletUrl = 'account/wallet'

function getWallet() {
    return url + walletUrl;
}
//充值
const rechargeUrl = 'external/wallet/recharge'

function getRecharge() {
    return url + rechargeUrl;
}
//充值列表
const rechargeInfoUrl = 'external/wallet/rechargeInfo'

function getRechargeInfo() {
    return url + rechargeInfoUrl;
}

//充值状态
const rechargeStateUrl = 'external/wallet/rechargeState'

function getRechargeState() {
    return url + rechargeStateUrl;
}

//问题反馈2
const feedbackWithMultipartUrl = 'account/feedbackWithMultipart'

function getFeedbackWithMultipart() {
    return url + feedbackWithMultipartUrl;
}
//问题反馈
const feedbackDetailUrl = 'account/feedbackDetail'

function getFeedbackDetail() {
    return url + feedbackDetailUrl;
}
//优惠券列表
const voucherListUrl = 'account/voucherList'

function getVoucherList() {
    return url + voucherListUrl;
}

//绑定银联
const bindingUrl = 'external/binding';

function getBinding() {
    return url + bindingUrl;
}
//获取userId
const gainOpenIdUrl = 'account/gainOpenId';

function getGainOpenIdUrl() {
    return url + gainOpenIdUrl;
}
//获取用户信息
const userInfoUrl = 'account/userInfo';

function getUserInfo() {
    return url + userInfoUrl;
}
//获取用户信息alipay
const alipayUserInfoUrl = 'account/alipayUserInfo';

function getAlipayUserInfo() {
    return url + alipayUserInfoUrl;
}
//核实手机号
const checkMobileUrl = 'account/checkMobile';

function getCheckMobile() {
    return url + checkMobileUrl;
}
//发送验证码，参数不同flag=0,找回密码发送验证码和发送验证码一个接口flag=2 
const sendVerifyCodeUrl = 'account/sendVerifyCode';

function getSendVerifyCode() {
    return url + sendVerifyCodeUrl;
}
//校建验证码
const checkVerifyCodeUrl = 'account/checkVerifyCode';

function getCheckVerifyCode() {
    return url + checkVerifyCodeUrl;
}
//找回密码发送验证码和发送验证码一个接口 参数不同flag=2
// const forgetCodeUrl = 'account/sendVerifyCode';

// function getForgetCode() {
//     return url + forgetCodeUrl;
// }
//登录
const loginUrl = 'account/login';

function getLogin() {
    return url + loginUrl;
}
//重置密码
const resetPassUrl = 'account/resetPass';

function getResetPass() {
    return url + resetPassUrl;
}
//注册
const registerUrl = 'account/register';

function getRegister() {
    return url + registerUrl;
}
//交押金 
const depositUrl = 'account/deposit';

function getDeposit() {
    return url + depositUrl;
}
//实名认证
const authUrl = 'account/auth';

function getAuth() {
    return url + authUrl;
}
//获取押金认证状态
const authStatusUrl = 'account/authStatus';

function getAuthStatus() {
    return url + authStatusUrl;
}
//获取订单详情
const orderDetailUrl = 'account/orderDetail';

function getOrderDetail() {
    return url + orderDetailUrl;
}
//车辆状态，订单状态
const stateUrl = 'useBike/state';

function getState() {
    return url + stateUrl;
}
//解锁智能锁

const unlockBikeUrl = 'useBike/unlock';

function getUnlockBike() {
    return url + unlockBikeUrl;
}
//解锁机械锁
const unlockBikeBriefUrl = 'useBike/unlockBikeBrief';

function getUnlockBikeBrief() {
    return url + unlockBikeBriefUrl;
}
//机械锁结束用车
const lockBikeBriefUrl = 'useBike/lockBikeBrief';

function getLockBikeBrief() {
    return url + lockBikeBriefUrl;
}
//支付 channel不同
const payUrl = 'order/pay';

function getPay() {
    return url + payUrl;
}
//支付宝获取授权地址
// const authUrl = 'alipay/authUrl';

// function getAuthUrl() {
//     return url + authUrl;
// }
//芝麻信用免押金
const zmxyDepositUrl = '/alipay/zmxyDeposit';

function getZmxyDeposit() {
    return url + zmxyDepositUrl;
}


module.exports = {
    getWallet: getWallet,
    getRecharge: getRecharge,
    getRechargeInfo: getRechargeInfo,
    getRechargeState: getRechargeState,
    getFeedbackWithMultipart: getFeedbackWithMultipart,
    getFeedbackDetail: getFeedbackDetail,
    getBinding: getBinding,
    getGainOpenIdUrl: getGainOpenIdUrl,
    getUserInfo: getUserInfo,
    getAlipayUserInfo: getAlipayUserInfo,
    getCheckMobile: getCheckMobile,
    getSendVerifyCode: getSendVerifyCode,
    getCheckVerifyCode: getCheckVerifyCode,
    //getForgetCode:getForgetCode,
    getLogin: getLogin,
    getResetPass: getResetPass,
    getRegister: getRegister,
    getDeposit: getDeposit,
    getAuth: getAuth,
    getAuthStatus: getAuthStatus,
    getOrderDetail: getOrderDetail,
    getState: getState,
    getUnlockBike: getUnlockBike,
    getUnlockBikeBrief: getUnlockBikeBrief,
    getLockBikeBrief: getLockBikeBrief,
    getPay: getPay,
    getVoucherList: getVoucherList,
    getZmxyDeposit: getZmxyDeposit
}
