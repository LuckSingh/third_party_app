import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter as Router, Route, hashHistory, Link } from 'react-router-dom'
import PayForComponent from './Components/PayFor/PayForComponent'
import PromotionList from './Components/PayFor/PromotionList'
ReactDom.render(

    <Router history = {hashHistory}>
	    <div>
	    <Route pathname={location.pathname} exact path="/" component={PromotionList}/>
	    <Route pathname={location.pathname} path="/list" component={PayForComponent}/>
	    </div>
	  </Router>,
    document.getElementById('payforContainer')
);