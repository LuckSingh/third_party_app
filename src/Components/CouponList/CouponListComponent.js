import React from 'react'
import ReactDOM from 'react-dom'
export default class CouponListComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            list: [1, 2, 3]
        }
    }
    componentDidMount() {
        var self = this;
        var parm = {};


    }

    render() {
        let {list} = this.state;
        return <div className='box'>
            <ul>
            {
            list.map((item, index) => {
                return (
                    <li key={index}>
                  <div className = "money_left" ><span > ¥ </span> <em>{item.amount / 100}</em></div> 
                  <div className = "money_right" ><p className = "first_child" > {item.title}</p>
                  <p className = "two_child" > 有效期至: {item.invalidDate} </p></div> 
                </li>
                )
            })
            }
              </ul>
        </div>;
    }
}