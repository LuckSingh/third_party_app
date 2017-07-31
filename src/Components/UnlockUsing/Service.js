import React from 'react'
import ReactDOM from 'react-dom'
export default class Service extends React.Component {
	render() {

		const str = 'No.' + (this.props.data.info.bike.no ? this.props.data.info.bike.no : '');
		return <div className="service">
				<div className="serviceContain">
					<p className="serviceCode">{str}</p>
					<a href="tel:400-800-3898"><em className="serviceIcon"></em></a>
				</div>
		</div>;
	}
}