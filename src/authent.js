import React from 'react';
import ReactDom from 'react-dom';
import { Router, Route, hashHistory, IndexRoute, Redirect, IndexRedirect } from 'react-router';
import AnthentComponent from './Components/Anthent/AnthentComponent'
//import AnthentComponent from './Components/Anthent/Anthent'
import AuthentStepPledge from './Components/Anthent/AuthentStepPledge'
import AuthentStepAuth from './Components/Anthent/AuthentStepAuth'
import AuthentStepComplete from './Components/Anthent/AuthentStepComplete'
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