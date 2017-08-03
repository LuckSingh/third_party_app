import Config from './Config';
import { SessionSave } from './SessionStorage';

//获取Ua 存储
function GetSessionUa() {
    if (navigator.userAgent) {
        for (var key in Config) {
            // if (navigator.userAgent.indexOf(key) >= 0) {
            //     return SessionSave('bgg_config_init', Config[key]);
            // }
            if ('MicroMessenger'.indexOf(key) >= 0) {
                return SessionSave('bgg_config_init', Config[key]);
            }
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

module.exports = {
    GetSessionUa: GetSessionUa,
    StringURLToJSON: StringURLToJSON
}
