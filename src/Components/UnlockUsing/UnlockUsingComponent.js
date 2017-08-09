import React from 'react'
import ReactDOM from 'react-dom'
import Service from './Service'
import UseDesc from './UseDesc'
import SwiperWapper from './Swiper'
import Navigate from '../../Common/Public/Navigate'
import { SessionSave } from '../../Common/Public/SessionStorage'
export default class UnlockUsingComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
        }
    }
    componentDidMount() {}

    render() {
        console.log(this.state);
        return <div >
            <Service/>  
            <UseDesc/> 
            <SwiperWapper/>  
        </div>;
    }
}