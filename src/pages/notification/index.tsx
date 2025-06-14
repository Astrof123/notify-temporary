import Header from '../../component/header';
import NotificationForm from '../../component/notification-form';
import '../../styles.css';

interface NotificationPageProps {
	notificationData?: object;
}

const NotificationPage = (props: NotificationPageProps) => {
	return (
		<div>
			<Header />
			<NotificationForm notificationData={props.notificationData} />
		</div>
	);
};

export default NotificationPage;
