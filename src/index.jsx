import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './components/App';
import './sass/style';

const Main = () => (
	<Router basename="/">
		<App />
	</Router>
);

ReactDOM.render(
	<Main />,
	document.getElementById('app')
);