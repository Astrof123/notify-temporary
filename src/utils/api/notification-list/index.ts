import { Notification } from '../../../types/notification';

let data: Notification[] = [
	{
		id: 1,
		name: 'Тест',
		type: 'Ежедневный',
		period: 'С 12.06.2025 21:18 По 16.06.2025 20:00 В 16:15',
		isActive: true,
	},
	{
		id: 2,
		name: 'Зарплаты не будет!',
		type: 'Разовый',
		period: 'В 16.06.2025 16:15',
		isActive: false,
	},
];

const get = async (searchQuery: string) => {
	// const data = await request.get('');
	if (searchQuery == '') {
		return data;
	} else {
		return data.filter((item) =>
			item.name.toLowerCase().includes(searchQuery.toLowerCase())
		);
	}
};

const deleteItem = async (notificationId: number) => {
	// const formData = new FormData();
	// formData.append('id', String(notificationId));
	// const data = await request.post('TodoItems', formData);
	data = data.filter((item) => item.id != notificationId);
};

const updateItem = async (notificationId: number, isActive: boolean) => {
	// const formData = new FormData();
	// formData.append('id', String(notificationId));
	// const data = await request.post('TodoItems', formData);
	const dataForActivate = data.filter((item) => item.id == notificationId)[0];
	dataForActivate.isActive = isActive;
};

export const notificationList = {
	get,
	deleteItem,
	updateItem,
};
