import React from 'react'
import ReactDOM from 'react-dom'
export default class AuthentStep extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    }
    componentDidUpdate() {
        //console.log(this.props.data)
    }
    render() {
        let state = this.props.data;
        return (
            <div className="authentStep">
			<div className="aStepMain">
				<div className="aStep">
					<div className={state.first ? "aStepicon active" : "aStepicon"} >
								<ul className={state.first ? "dotted bgf" : "dotted"}>
									<li></li>
									<li></li>
									<li></li>
									<li></li>
									<li></li>
									<li></li>
									<li></li>
									<li></li>
									<li></li>
									<li></li>
									<li></li>
									<li></li>
									<li></li>
								</ul>
					 </div>
					<div className="aSteptit">交纳押金</div>
					
				</div>
				<div className="aStep">
					<div className={state.second ? "aStepicon active" : "aStepicon"}>
								<ul className={state.second ? "dotted bgf" : "dotted"}>
									<li></li>
									<li></li>
									<li></li>
									<li></li>
									<li></li>
									<li></li>
									<li></li>
									<li></li>
									<li></li>
									<li></li>
									<li></li>
									<li></li>
									<li></li>
								</ul>
					 </div>
					<div className="aSteptit">实名认证</div>			
				</div>
				<div className="aStep">
					<div className={state.second ? "aStepicon active" : "aStepicon"}></div>
					<div className="aSteptit">完成</div>			
				</div>
			</div>

		</div>
        );
    }
}