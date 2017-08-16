//首页
function toIndex() {
    location.replace('./index.html');
}
//解锁页面
function toLoading() {
    location.replace('./loading.html');
}
//行车中(智能)
function toUnlockUsing() {
    location.replace('./unlockUsing.html');
}
//行车中(机械)
function toUnlockMechanicalUsing() {
    location.replace('./unlockMechanicalUsing.html');
}
//订单支付
function toPayfor() {
    location.replace('./payfor.html');
}

//行程
function toTrip() {
    location.replace('./trip.html');
}
//押金
function toPledge() {
    location.replace('./pledge.html');
}
//充值
function toRecharge() {
    location.replace('./recharge.html');
}
//钱包
function toWallet() {
    location.replace('./wallet.html');
}
//用户中心
function toUser() {
    location.replace('./user.html');
}
//链接的押金
function toDeposit() {
    location.replace('./authent.html#/pledge');
}
//链接的实名认证
function toAuth() {
    location.replace('./authent.html#/auth');
}

module.exports = {
    toIndex: toIndex,
    toLoading: toLoading,
    toUnlockUsing: toUnlockUsing,
    toUnlockMechanicalUsing: toUnlockMechanicalUsing,
    toTrip: toTrip,
    toPayfor: toPayfor,
    toPledge: toPledge,
    toRecharge: toRecharge,
    toWallet: toWallet,
    toUser: toUser,
    toDeposit: toDeposit,
    toAuth: toAuth
}