import React from 'react'
import ReactDOM from 'react-dom'
export default class AuthentStep extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            first: false,
            second: false
        }
    }

    render() {
        let {first, second} = this.state;
        return <div className="authentStep">
					<div className="aStepMain">
							<div className="aStep">
								<div className={first ? "aStepicon active" : "aStepicon"} >
											<ul className={first ? "dotted bgf" : "dotted"}>
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
								<div className={second ? "aStepicon active" : "aStepicon"}>
											<ul className={second ? "dotted bgf" : "dotted"}>
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
								<div className={second ? "aStepicon active" : "aStepicon"}></div>
								<div className="aSteptit">完成</div>			
							</div>
					</div>
			</div>;
    }
}