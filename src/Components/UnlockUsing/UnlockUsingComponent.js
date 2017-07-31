import React from 'react'
import ReactDOM from 'react-dom'
import Service from './Service'
import UseDesc from './UseDesc'
import Swiper from './Swiper'
export default class UnlockUsingComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {

        }
    }

    render() {
        return <div>
            <Service data = { this.state } /> 
            <UseDesc data = { this.state } />
            <Swiper data = { this.state.state.swiper }/> 
        </div>;
    }
}