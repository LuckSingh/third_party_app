import React from 'react';
import ReactDom from 'react-dom';
import UserComponent from './Components/User/UserComponent'
ReactDom.render(
    <UserComponent/>,
    document.getElementById('userContainer')
);