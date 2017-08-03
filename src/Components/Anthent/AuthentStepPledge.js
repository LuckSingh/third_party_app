import React from 'react'
import ReactDOM from 'react-dom'

export default class AuthentStepPledge extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    }
    componentDidMount() {}

    render() {
        return (
            <div className = "authent-content" >
                <Cost payNum = { this.state.getPayNum.payNum }/> 
                <PayBtn/>
            </div>
        );
    }
}

