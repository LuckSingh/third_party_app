//import UnlockAction from '../../Action/UnlockAction/UnlockAction'
import React from 'react'
import ReactDOM from 'react-dom'

export default class EndUseBike extends React.Component {
    endUse() {
        //UnlockAction.willEndUse({ds:1})
    }
    render() {
        return <div className="endUseBike">
				<button onClick={this.endUse}>结束用车</button>
		</div>;

    }
}
