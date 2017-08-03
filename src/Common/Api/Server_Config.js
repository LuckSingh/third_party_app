import { sessionSave } from '../SessionStorage';
//import {ent} from '../CommonFn';
var CommonFn = require('../CommonFn.js')
var sessionUa = CommonFn.getSessionUa();
var URL_CHANNEL = sessionUa ? sessionUa.channel : '';
var SERVER = {
    // TEST: 'http://101.200.132.205:8080/bluegogo_backend_http/h5/',
    TEST: 'https://' + URL_CHANNEL + '-api.bluegogo.com/bluegogo_backend_http/h5/'
//BUILD: 'https://api.bluegogo.com/bluegogo_backend_http/h5/'
}
module.exports = {
    SERVER_DATA: SERVER.BUILD || SERVER.TEST
}
