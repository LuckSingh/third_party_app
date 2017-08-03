//配置不同的ua keyua 的名字
var globalData = {
    asdasda: { //测试用
        channel: 'Moz',
        payChannel: 14,
        payLabel: '未知支付',
        scanUrl: 'Mozilla://platformapi/startapp?appId=10000007'
    },
    MicroMessenger: {
        channel: 'unionpay',
        payLabel: '银联支付',
        payChannel: 12,
        scanUrl: 'unionpay://cn.cupdata.unionpay'
    }
}

module.exports = globalData;