import React from 'react'
import ReactDOM from 'react-dom'
import { SessionSave } from '../../Common/Public/SessionStorage'
var bikeNo = SessionSave('bgg_bikeNo');
export default class Service extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            bikeNo: ''
        }
    }

    componentDidMount() {
        this.setState({
            bikeNo: bikeNo
        })
    }
    render() {

        const str = 'No.' + (this.state.bikeNo ? this.state.bikeNo : '');
        return <div className="service">
				<div className="serviceContain">
					<p className="serviceCode">{str}</p>
					<a href="tel:400-800-3898"><em className="serviceIcon"></em></a>
				</div>
		</div>;
    }
}