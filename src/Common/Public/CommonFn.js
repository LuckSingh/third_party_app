import Config from '../Config';
import { sessionSave } from './SessionStorage';
//获取Ua 存储
function getSessionUa() {
    if (navigator.userAgent) {
        for (var key in Config) {
            //var str = 'Mozilla/5.0 MicroMessenger (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1'
            //console.log(navigator.userAgent);
            if (navigator.userAgent.indexOf(key) >= 0) {
                return sessionSave('bgg_config_init', Config[key]);
            }
        // if ('unionpay'.indexOf(key) >= 0) {
        //     return sessionSave('bgg_config_init', Config[key]);
        // }
        }
    }
}
function StringURLToJSON(name) {
    let index = name.indexOf('?')
    let str = name.substring(index + 1);
    let arr = str.split('&');
    let result = {};
    arr.forEach((item) => {
        let a = item.split('=');
        result[a[0]] = a[1];
    })
    return result;
}
export { getSessionUa, StringURLToJSON };
