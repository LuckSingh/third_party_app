const scheme = 'https://baidu-api.bluegogo.com';
//const scheme ='https://amap-api-test.bluegogo.com';
//document.domain = 'bluegogo.com';




export function pay(type, id, token) {
    var client = navigator.appVersion.split(' ')[0].split('.')[0];
    let url,
        da;
    while (client.length < 5) {
        client += '0';
    }

    switch (type) {
    case 'wx':
        url = scheme + '/bluegogo_backend_http/baidu/wallet/recharge'
        da = {
            data: JSON.stringify({
                data: {
                    //code代表voucherId
                    //mobel代表orderId
                    id: id,
                    channel: 3
                },
                clientInfo: '14500,wx,2,' + client,
                openId: 'oGttUwXkPMn-XazoDdn_goNnREA4',
                token: '7f92ebc8-4686-451b-af37-9020b6c75ce1',
                version: 1
            })
        };
        break;
    case 'zfb':
        url = scheme + '/bluegogo_backend_http/baidu/wallet/recharge'
        da = {
            data: JSON.stringify({
                data: {
                    //code代表voucherId
                    //mobel代表orderId
                    id: id,
                    channel: 6
                },
                clientInfo: '14500,baidumap,2,' + client,
                token: token,
                version: 1
            })
        };
        break;

    //需要的接口
    case 'init':
        url = scheme + '/bluegogo_backend_http/baidu/wallet/rechargeInfo'
        da = {
            data: JSON.stringify({
                data: {

                },
                clientInfo: '14500,baidumap,2,' + client,
                token: token,
                version: 1
            })
        };
        break;
        //需要的接口

    //充值状态
    case 'rechargestatus':
        url = scheme + '/bluegogo_backend_http/baidu/wallet/rechargeState'
        da = {
            data: JSON.stringify({
                data: {
                    //code代表voucherId
                    //mobel代表orderId
                    orderId: id
                },
                clientInfo: '14500,baidumap,2,' + client,
                token: token,
                version: 1
            })
        };
        break;
    //充值状态
    case 'orderpay':
        url = scheme + '/bluegogo_backend_http/baidu/order/pay'
        da = {
            data: JSON.stringify({
                data: {
                    channelNo: 'amapH5',
                    channel: 7
                },
                clientInfo: '14500,baidumap,2,' + client,
                token: token,
                version: 1
            })
        };
        break;

    }
    let promise = new Promise(resolve => {
        $.ajax({
            url: url,
            type: "post",
            async: true,
            data: da,
            cache: false,
            dataType: 'text/plain',
            success: function(res) {

                if (!res) {
                    alert('网络连接失败，请稍后重试');
                    return;
                }
                resolve(JSON.parse(res))

            },
            timeout: 18000,
            error: (x, t, e) => {
                console.log(x, "\/n", t, "\/n", e)
                if (t == 'timeout') {
                    alert('网络超时')
                } else if ((x.status == 0) && t == 'abort') {
                    alert('无网络或者网络异常，请检查网络设置');
                } else {
                    alert('网络异常，请稍后重试');
                }
            }
        })
    })
    return promise;

}
