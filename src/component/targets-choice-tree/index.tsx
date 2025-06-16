import clsx from 'clsx';
import s from './targets-choice-tree.module.scss';
import '../../styles.css';
import RequiredFormSymbol from '../required-form-symbol';
import Search from '../search';
import TargetsChoiceLine from '../targets-choice-line';
import { Company } from '../../models/Company';
import { Department } from '../../models/Department';
import { Person } from '../../models/Person';

const TargetsChoiceTree = () => {
	const companies = [
		new Company(
			1,
			'Danny Dot Com',
			[
				new Department(
					2,
					'Главная страница',
					[],
					[new Person(1, 'Василиса', 'Леонидовна', 'Байрачная')]
				),
				new Department(2, 'О проекте'),
			],
			[new Person(1, 'Иван', 'Иваныч', 'Васькин')]
		),
		new Company(1, 'Рога и копыта'),
		new Company(
			1,
			'Shelby Limited',
			[
				new Department(
					1,
					'Главный офис',
					[],
					[
						new Person(1, 'Томас', 'Томасович', 'Шелби'),
						new Person(1, 'Джонибой', 'Томасович', 'Шелби'),
						new Person(1, 'Артур', 'Томасович', 'Шелби'),
						new Person(1, 'Дэни', 'Томасович', 'Шелби'),
					]
				),
				new Department(
					1,
					'Склад',
					[new Department(1, 'Хранилище')],
					[new Person(1, 'Зинаида', 'Дмитриевна', 'Бах')]
				),
				new Department(
					1,
					'Двор',
					[],
					[new Person(1, 'Захар', 'Петрович', 'пЕтров')]
				),
			],
			[
				new Person(1, 'Басотёнок', 'С', 'Улицы'),
				new Person(1, 'Брат басотёнка', 'С', 'Улицы'),
				new Person(1, 'Кузен басотёнка', 'С', 'Улицы'),
			]
		),
	];

	return (
		<div className={clsx(s['tree-section'])}>
			<div className={clsx(s['tree-container'])}>
				<div className={clsx(s['title'])}>
					<span>Выберите компании, департаменты, отделы или сотрудника</span>
					<RequiredFormSymbol />
				</div>
				<div className={clsx(s['list-box'])}>
					<Search placeholder={'Название компании'} />
					<div className={clsx(s['__content'])}>
						{companies.map((company, index) => (
							<TargetsChoiceLine
                                key={index}
                                data={company}
                            />
						))}
					</div>
				</div>
			</div>
			<div className={clsx(s['targets-container'])}>
				<span>Выбранные объекты</span>
				<div className={clsx(s['list-box'])}>
					<div className={clsx(s['__content'])}></div>
				</div>
			</div>
		</div>
	);
};

export default TargetsChoiceTree;
