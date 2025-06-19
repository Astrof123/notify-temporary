import { ToastContainer } from 'react-toastify';
import { PropsWithChildren } from 'react';
import Header from '../header';

type LayoutProps = PropsWithChildren;

const Layout = (props: LayoutProps) => {
	return (
		<div>
			<Header />
			<main>{props.children}</main>
			<ToastContainer
				position='bottom-right'
				hideProgressBar={true}
				autoClose={false}
			/>
		</div>
	);
};

export default Layout;
