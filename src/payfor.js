import React from 'react';
import ReactDom from 'react-dom';
import { Router, Route, hashHistory, IndexRoute, Redirect, IndexRedirect } from 'react-router';
import PayForComponent from './Components/PayFor/PayForComponent'
import PromotionList from './Components/PayFor/PromotionList'
ReactDom.render(
    <Router history={hashHistory}>
		<Route path="/" >
			<IndexRoute component={PayForComponent}/>
			<Route path="/order" component={PayForComponent}/>
			<Route path="/promotion" component={PromotionList}/>
		</Route>
	</Router>,
    document.getElementById('payforContainer')
);