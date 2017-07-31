import React from 'react'
import ReactDOM from 'react-dom'
//需要优化的点
//可以把每个slider写入store
//初始加载的时候，分别去调取不同的图片
//抽离组件的数据
export default class Swiper extends React.Component {
    componentDidMount() {
        var mySwiper = new Swiper('.swiper-container', {
            loop: true,
            // 如果需要分页器
            pagination: '.swiper-pagination',
            paginationClickable: true
        })
    }
    handleEndLock() {
        location.replace('./lockerrorDetail.html');
    }
    render() {
        let swiper = this.props.data.map(function(ele, index) {
            let listCir = ele.listCir.map((el, index) => {
                return (<p key={index}><em className="listCir"></em>{el}</p>)
            })
            return (

                <div className="swiper-slide swiper-slide01" key={index}>
                    <div className="swsContain">
                        <ul>
                            <li><img src={ele.img} alt="小蓝单车" /></li>
                            <li><p className="sws_tit">{ele.sws_tit}</p></li>
                            <li>
                                {listCir}
                            </li>
                        </ul>
                    </div>
                </div>
            )
        })
        return (
            <div className="swiper-container swiper-container01">
                <div className="swiper-wrapper swiper-wrapper01">{swiper}</div>
                <div className="swiper-pagination"></div>
                <div className="swiper-connetUs"><p><a onClick={this.handleEndLock} href="javascript:;">{ /*联系222人工客服*/ }落锁不结费用?</a></p></div>
            </div>
        )
    }
}
