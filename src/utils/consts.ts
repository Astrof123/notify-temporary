import { ImageView } from '../types/image-view';
import { Company } from '../models/notification-recipients/Company';
import { Department } from '../models/notification-recipients/Department';
import { Account } from '../models/notification-recipients/Account';
import { EScheduleType } from '../models/notification-time/EScheduleType';

export const months = [
	'Январь',
	'Февраль',
	'Март',
	'Апрель',
	'Май',
	'Июнь',
	'Июль',
	'Август',
	'Сентябрь',
	'Октябрь',
	'Ноябрь',
	'Декабрь',
];

export const weekDays = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'];

export const notificationImages: ImageView[] = [
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
	{
		id: 4,
		name: 'sky.png',
		url: 'https://storage.needpix.com/thumbs/landscape-1972370_1280.jpg',
	},
	{
		id: 5,
		name: 'sea.png',
		url: 'https://storage.needpix.com/thumbs/sunset-1032608_1280.jpg',
	},
	{
		id: 6,
		name: 'aurora.png',
		url: 'https://cdn.troubleflight.com/destinations/airports/AES.jpg?w=500&h=200&resize=false&type=webp',
	},
	{
		id: 7,
		name: 'sky.png',
		url: 'https://storage.needpix.com/thumbs/landscape-1972370_1280.jpg',
	},
	{
		id: 8,
		name: 'sea.png',
		url: 'https://storage.needpix.com/thumbs/sunset-1032608_1280.jpg',
	},
	{
		id: 9,
		name: 'aurora.png',
		url: 'https://cdn.troubleflight.com/destinations/airports/AES.jpg?w=500&h=200&resize=false&type=webp',
	},
];

export const companies = [
	new Company(
		'1',
		'Danny Dot Com',
		[
			new Department(
				'2',
				'Главная страница',
				[],
				[new Account('3', 'Василиса', 'Леонидовна', 'Байрачная')]
			),
			new Department('4', 'О проекте'),
		],
		[new Account('5', 'Иван', 'Иваныч', 'Васькин')]
	),
	new Company('6', 'Рога и копыта'),
	new Company(
		'7',
		'Shelby Limited',
		[
			new Department(
				'8',
				'Главный офис',
				[],
				[
					new Account('9', 'Томас', 'Томасович', 'Шелби'),
					new Account('10', 'Джонибой', 'Томасович', 'Шелби'),
					new Account('11', 'Артур', 'Томасович', 'Шелби'),
					new Account('12', 'Дэни', 'Томасович', 'Шелби'),
				]
			),
			new Department(
				'13',
				'Склад',
				[new Department('14', 'Хранилище')],
				[new Account('15', 'Зинаида', 'Дмитриевна', 'Бах')]
			),
			new Department(
				'16',
				'Двор',
				[],
				[new Account('17', 'Захар', 'Петрович', 'пЕтров')]
			),
		],
		[
			new Account('18', 'Басотёнок', 'С', 'Улицы'),
			new Account('19', 'Брат басотёнка', 'С', 'Улицы'),
			new Account('20', 'Кузен басотёнка', 'С', 'Улицы'),
		]
	),
];

export const scheduleTypes = [
	{ title: 'Разовое', value: EScheduleType.ONCE },
	{ title: 'Ежедневное', value: EScheduleType.DAILY },
	{ title: 'Еженедельное', value: EScheduleType.WEEKLY },
	{ title: 'Ежемесячное', value: EScheduleType.MONTHLY },
	{ title: 'Квартальное', value: EScheduleType.QUARTERLY },
	{ title: 'Ежегодное', value: EScheduleType.YEARLY },
];

export const daysOfMonth = Array.from({ length: 31 }, (_, i) => i + 1);
