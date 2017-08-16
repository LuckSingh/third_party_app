import React from 'react'
import ReactDOM from 'react-dom'
import Service from './Service'
import UseDesc from './UseDesc'
import EndUseBike from './EndUseBike'
import SwiperWapper from './Swiper'
import Navigate from '../../Common/Public/Navigate'
import { SessionSave } from '../../Common/Public/SessionStorage'

export default class UnlockMechanicalUsingComponent extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return <div>
            <Service/>  
           <UseDesc/>
            <SwiperWapper/> 
            <EndUseBike/> 
        </div>;
    }
}