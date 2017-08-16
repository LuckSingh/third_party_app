import React from 'react'
import ReactDOM from 'react-dom'
import AuthentStep from './AuthentStep'
export default class AnthentComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {

        }
    }
    componentDidMount() {}

    render() {
        return (
            <div>
                <AuthentStep/>
                {this.props.children}
            </div>
        );
    }
}