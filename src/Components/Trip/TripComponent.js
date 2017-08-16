import React from 'react'
import ReactDOM from 'react-dom'
import { SessionSave } from '../../Common/Public/SessionStorage'
import GetPostStore from '../../Common/Api/GetPostStore'
export default class TripComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            logotime_date: '',
            logotime_hour: '',
            DM_cost: '',
            newCal: '',
            useTime: '',
            calorie: '',
            carbon: ''
        }
    }


    componentDidMount() {
        let self = this;
        var da = {
            'isForce': 0,
            'orderId': SessionSave('bgg_orderId'),
        };
        GetPostStore.orderDetail(da, (data) => {
            var marker,
                marker02;
            console.log(data);
            if (data.errorMsg == 'OK') {
                //获取时间
                var atime = data.data.order.beginTime

                var aMonth = new Date(atime).getMonth() + 1;
                var aDate = new Date(atime).getDate();
                var aHour = new Date(atime).getHours()
                var aMin = new Date(atime).getMinutes()
                if (aMin < 10) {
                    aMin = '0' + aMin;
                }

                if (data.data.order.path) {
                    var lineArr = data.data.order.path.slice(0, -1).split(';').join(',').split(',');
                    var lngMax = 0;
                    var lngMin = lineArr[0];
                    var latMax = 0;
                    var latMin = lineArr[1];
                    var arr = [];
                    for (var i = 0; i < lineArr.length; i += 2) {
                        if (lngMax < lineArr[i]) {
                            lngMax = lineArr[i];

                        }
                        if (latMax < lineArr[i + 1]) {
                            latMax = lineArr[i + 1]
                        }
                        if (lngMin > lineArr[i]) {
                            lngMin = lineArr[i]
                        }
                        if (latMin > lineArr[i + 1]) {
                            latMin = lineArr[i + 1]
                        }
                        arr.push([Number(lineArr[i]), Number(lineArr[i + 1])])
                        //画地图

                        var map = new AMap.Map('map', {
                            resizeEnable: true,
                            zoom: 19,
                            center: arr[0]
                        });

                        if (arr.length == 1) {
                            marker = new AMap.Marker({
                                position: arr[0],
                                title: '',
                                map: map,
                                draggable: false,
                                content: '<div class="marker-route marker-marker-bus-from"><div class="amap-end amap-point">终</div></div>'

                            });

                        } else if (arr.length == 2) {
                            marker = new AMap.Marker({
                                position: arr[0],
                                title: '起点',
                                map: map,
                                draggable: false,
                                content: '<div class="marker-route marker-marker-bus-from"><div class="amap-start amap-point">起</div></div>'

                            });
                            marker02 = new AMap.Marker({
                                position: arr[1],
                                title: '终点',
                                map: map,
                                draggable: false,
                                content: '<div class="marker-route marker-marker-bus-from"><div class="amap-end amap-point">终</div></div>'
                            });
                            map.setFitView();

                        } else {
                            marker = new AMap.Marker({
                                position: arr[0],
                                title: '起点',
                                map: map,
                                draggable: false,
                                offset: new AMap.Pixel(-12, -12),
                                content: '<div class="marker-route marker-marker-bus-from"><div class="amap-start amap-point">起</div></div>'
                                //animation:'AMAP_ANIMATION_BOUNCE'

                            });
                            marker02 = new AMap.Marker({
                                position: arr[arr.length - 1],
                                offset: new AMap.Pixel(-12, -12),
                                title: '终点',
                                map: map,
                                draggable: false,
                                content: '<div class="marker-route marker-marker-bus-from"><div class="amap-end amap-point">终</div></div>'
                            });
                            var newCenter = map.setFitView();
                            var polyline = new AMap.Polyline({
                                path: arr, //设置线覆盖物路径
                                strokeColor: "#3366FF", //线颜色
                                strokeOpacity: 1, //线透明度
                                strokeWeight: 5, //线宽
                                strokeStyle: "solid", //线样式
                                strokeDasharray: [10, 5] //补充线样式
                            });
                            polyline.setMap(map);
                        }
                    }
                } else {
                    var lineArr = [116.38, 39.90];
                    var map = new AMap.Map('map', {
                        resizeEnable: true,
                        zoom: 18,
                        center: lineArr

                    });
                    marker = new AMap.Marker({
                        position: lineArr,
                        title: '终点',
                        map: map,
                        draggable: false,
                        content: '<div class="marker-route marker-marker-bus-from"><div class="amap-start amap-point">终</div></div>'

                    });
                }

                var mes = data.data.order;
                //下部分的时间消耗
                var useTime = Math.ceil(data.data.order.useTime / 60);
                if (useTime < 1 && useTime > 0) {
                    useTime = 1;
                }

                var calorie = data.data.order.calorie > 1000 ? Math.ceil(data.data.order.calorie / 1000) : data.data.order.calorie;
                var carbon = data.data.order.carbon;
                var usePrice = data.data.order.actualPrice / 100;
                var newCal = calorie > 1000 ? "kCal" : "Cal";

                //设置数据
                self.setState({
                    logotime_date: aMonth + '月' + aDate + '日',
                    logotime_hour: aHour + ':' + aMin,
                    DM_cost: data.data.order.rawPrice / 100,
                    calorie: calorie,
                    carbon: carbon,
                    useTime: useTime,
                    newCal: newCal
                })
            }
        })
    }

    render() {
        let {logotime_date, logotime_hour, DM_cost, useTime, calorie, newCal, carbon} = this.state;
        return <div>
           <div className="map" id="map"></div>
                <div className="logotime">
                    <div className="logotimebg"></div>
                    <div className="logotimeContent">
                        <p><span></span></p>
                        <p>
                            <span className="logotime_date">{logotime_date}</span>
                            <span className="logotime_hour">{logotime_hour}</span>
                        </p>
                    </div>
                </div>
                    <div className="detailDownload">
                        <div className="detailMain">
                            <ul className="DM_up">
                                <li>
                                    <em className="DM_up_icon01"></em>
                                    <p className="DM_price">{calorie ? calorie : '-'}</p>
                                    <p className="DM_desc">消耗({newCal})</p>
                                </li>
                                <li>
                                    <em className="DM_up_icon01 DM_up_icon02"></em>
                                    <p className="DM_price">{useTime ? useTime : '-'}</p>
                                <p className="DM_desc">时长(min)</p>
                            </li>
                            <li>
                                <em className="DM_up_icon01 DM_up_icon03"></em>
                                <p className="DM_price">{carbon ? carbon : '-'}</p>
                                <p className="DM_desc">减少碳排(g)</p>
                            </li>
                        </ul>
                        
                        <div className="DM_down"><p>联系客服：400-800-3898</p></div>
                    </div>
                
                </div>
        </div>;
    }
}