import { Main, Gallery } from '../pages';
import { Routes, Route, useLocation } from 'react-router-dom';
import NotifyPage from '../pages/notification';

export const App = () => {
	const location = useLocation();
	const state = location.state as { backgroundLocation?: Location };

	return (
		<Routes location={state?.backgroundLocation || location}>
			<Route path='/' element={<Main />} />
			<Route path='/gallery' element={<Gallery />} />
			<Route path='/add-notify' element={<NotifyPage />} />
			<Route path='/change-notify' element={<NotifyPage />} />
		</Routes>
	);
};
