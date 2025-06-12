import { createRoot } from 'react-dom/client';
import { App } from './app';
import './styles.css';
import { BrowserRouter } from 'react-router-dom';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);
root.render(
	<BrowserRouter>
		<App />
	</BrowserRouter>
);
