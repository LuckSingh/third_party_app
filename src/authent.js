import React from 'react';
import ReactDom from 'react-dom';
import { Router, Route, hashHistory, IndexRoute, Redirect, IndexRedirect } from 'react-router';
import AnthentComponent from './Components/Anthent/AnthentComponent'
//import AnthentComponent from './Components/Anthent/Anthent'
import AuthentStep01 from './Components/Anthent/AuthentStep01'
import AuthentStep02 from './Components/Anthent/AuthentStep02'
import AuthentStep03 from './Components/Anthent/AuthentStep03'
ReactDom.render(
    <Router history={hashHistory}>
		<Route path="/" component={AnthentComponent}>
			<IndexRoute component={AuthentStepPledge}/>
			<Route path="/pledge" component={AuthentStepPledge}/>
			<Route path="/auth" component={AuthentStepAuth}/>
			<Route path="/complete" component={AuthentStepComplete}/>
		</Route>
	</Router>,
    document.getElementById('anthentContainer')
);