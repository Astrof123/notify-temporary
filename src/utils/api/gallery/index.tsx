import { ImageView } from '../../../types/image-view';

let data: ImageView[] = [
	{
		id: 1,
		name: 'sky.png',
		url: 'https://storage.needpix.com/thumbs/landscape-1972370_1280.jpg',
	},
	{
		id: 2,
		name: 'sea.png',
		url: 'https://storage.needpix.com/thumbs/sunset-1032608_1280.jpg',
	},
	{
		id: 3,
		name: 'aurora.png',
		url: 'https://cdn.troubleflight.com/destinations/airports/AES.jpg?w=500&h=200&resize=false&type=webp',
	},
];

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
