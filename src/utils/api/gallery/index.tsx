import { notificationImages } from '../../consts';

let data = [...notificationImages];

const get = async () => {
	// const data = await request.get('');
	return data;
};

const deleteItem = async (imageId: number) => {
	// const formData = new FormData();
	// formData.append('id', String(notificationId));
	// const data = await request.post('TodoItems', formData);
	data = data.filter((item) => item.id != imageId);
};

const post = async (name: string, url: string) => {
	// const formData = new FormData();
	// formData.append('id', String(notificationId));
	// const data = await request.post('TodoItems', formData);
	data.push({
		id: data.length + 1,
		name: name,
		url: url,
	});
};

export const imageViewList = {
	get,
	deleteItem,
	post,
};
