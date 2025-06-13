import { Main } from '../pages';
import { Routes, Route, useLocation } from 'react-router-dom';
import NotifyPage from '../pages/notification';
import GalleryPage from '../pages/gallery';

export const App = () => {
	const location = useLocation();
	const state = location.state as { backgroundLocation?: Location };

	return (
		<Routes location={state?.backgroundLocation || location}>
			<Route path='/' element={<Main />} />
			<Route path='/add-notify' element={<NotifyPage />} />
			<Route path='/gallery' element={<GalleryPage />} />
		</Routes>
	);
};
