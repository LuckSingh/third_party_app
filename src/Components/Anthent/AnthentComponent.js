import React from 'react'
import ReactDOM from 'react-dom'
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
                <AuthentStep data={this.state}/>
                {this.props.children}
            </div>
        );
    }
}