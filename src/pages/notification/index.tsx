import NotificationForm from '../../component/notification-form';
import '../../styles.css';

interface NotificationPageProps {
	notificationData?: object;
}

const NotificationPage = (props: NotificationPageProps) => {
	return (
		<div>
			<NotificationForm notificationData={props.notificationData} />
		</div>
	);
};

export default NotificationPage;
