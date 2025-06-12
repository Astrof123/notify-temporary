import { Main } from '../pages';
import { Routes, Route, useLocation } from 'react-router-dom';

export const App = () => {
	const location = useLocation();
	const state = location.state as { backgroundLocation?: Location };

	return (
		<Routes location={state?.backgroundLocation || location}>
			<Route path='/' element={<Main />} />
		</Routes>
	);
};
