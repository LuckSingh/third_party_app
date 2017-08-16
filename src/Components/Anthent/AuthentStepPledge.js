import React from 'react'
import ReactDOM from 'react-dom'
import Cost from './Cost'
import PayBtn from './PayBtn'
import GetPostStore from '../../Common/Api/GetPostStore'
export default class AuthentStepPledge extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            payNum: ''
        }
    }
    componentDidMount() {
        GetPostStore.authStatus(
            {
                isForce: 0
            },
            (res) => {
                //this.state.payNum = 66;
                switch (res.errorCode) {
                case 0:
                    //获取到的金额为分=>转换成元
                    this.setState({
                        payNum: res.data.depositPayable / 100
                    })
                    break;
                default:

                    break;
                }
            },
        )
    }

    render() {
        return (
            <div className = "authent-content" >
                <Cost data={this.state}/> 
                <PayBtn/>
            </div>
        );
    }
}

