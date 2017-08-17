import React from 'react'
import ReactDOM from 'react-dom'
import AuthentStep from './AuthentStep'
import GetPostStore from '../../Common/Api/GetPostStore'
export default class AnthentComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            first: false,
            second: false,
            third: false
        }
    }

    componentDidMount() {




        this.refresh();
    }
    componentWillReceiveProps() {
        this.refresh();
    }
    refresh() {
        GetPostStore.authStatus(
            {
                isForce: 0
            },
            (res) => {
                console.log(res);
                let depositStatus = res.data.depositStatus;
                let authStatus = res.data.authStatus;
                if (res.errorCode == 0) {
                    if (depositStatus == 1 && authStatus == 1) {
                        //实名认证了 也缴纳押金了
                        this.setState({
                            first: true,
                            second: true,
                            third: true
                        })

                    } else if (depositStatus == 1 && authStatus == 0) {
                        //缴纳押金了
                        this.setState({
                            first: true,
                            second: false,
                            third: false
                        })
                    } else if (depositStatus == 0 && authStatus == 1) {
                        //已经实名认证
                        this.setState({
                            first: false,
                            second: true,
                            third: false
                        })
                    } else {
                        //没有缴纳押金 并且没有实名认证
                        this.setState({
                            first: false,
                            second: false,
                            third: false
                        })
                    }
                }
            },
        )



    }

    render() {

        return (
            <div>
                <AuthentStep data={this.state}/>
                {this.props.children}
            </div>
        );
    }

}