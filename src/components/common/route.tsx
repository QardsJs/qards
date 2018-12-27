import React from 'react';
import {Router} from '@reach/router';

const Route = ({component: Component, ...rest}: any) => {
	return (
		<Router>
			<Component {...rest} />
		</Router>
	);
};

export default Route;
