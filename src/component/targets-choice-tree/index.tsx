import clsx from 'clsx';
import s from './targets-choice-tree.module.scss';
import '../../styles.css';
import RequiredFormSymbol from '../required-form-symbol';
import Search from '../search';
import TargetsChoiceLine from '../targets-choice-line';
import { Company } from '../../models/Company';
import { Department } from '../../models/Department';
import { Person } from '../../models/Person';
import { BaseEntity } from '../../models/BaseEntity';
import { useCallback, useState } from 'react';

interface Targets {
	[key: number]: BaseEntity;
}

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
					[new Person(3, 'Василиса', 'Леонидовна', 'Байрачная')]
				),
				new Department(4, 'О проекте'),
			],
			[new Person(5, 'Иван', 'Иваныч', 'Васькин')]
		),
		new Company(6, 'Рога и копыта'),
		new Company(
			7,
			'Shelby Limited',
			[
				new Department(
					8,
					'Главный офис',
					[],
					[
						new Person(9, 'Томас', 'Томасович', 'Шелби'),
						new Person(10, 'Джонибой', 'Томасович', 'Шелби'),
						new Person(11, 'Артур', 'Томасович', 'Шелби'),
						new Person(12, 'Дэни', 'Томасович', 'Шелби'),
					]
				),
				new Department(
					13,
					'Склад',
					[new Department(14, 'Хранилище')],
					[new Person(15, 'Зинаида', 'Дмитриевна', 'Бах')]
				),
				new Department(
					16,
					'Двор',
					[],
					[new Person(17, 'Захар', 'Петрович', 'пЕтров')]
				),
			],
			[
				new Person(18, 'Басотёнок', 'С', 'Улицы'),
				new Person(19, 'Брат басотёнка', 'С', 'Улицы'),
				new Person(20, 'Кузен басотёнка', 'С', 'Улицы'),
			]
		),
	];

	const [targets, setTargets] = useState<Targets>({});
	const [searchFilter, setSearchFilter] = useState('');

	const handleTargetChoose = useCallback(
		(isChosen: boolean, target: BaseEntity) => {
			target.chosen = isChosen;
			setTargets((prev) => ({
				...prev,
				[target.getId()]: target,
			}));
		},
		[setTargets]
	);

	return (
		<div className={clsx(s['tree-section'])}>
			<div className={clsx(s['tree-container'])}>
				<div className={clsx(s['title'])}>
					<span>Выберите компании, департаменты, отделы или сотрудника</span>
					<RequiredFormSymbol />
				</div>
				<div className={clsx(s['list-box'])}>
					<Search
						placeholder={'Название компании'}
						isRealTime={true}
						onValueChanged={setSearchFilter}
					/>
					<div className={clsx(s['content'])}>
						{companies.map((company, index) => (
							<>
								{company.getName().includes(searchFilter) && (
									<TargetsChoiceLine
										key={index}
										data={company}
										disabled={false}
										onChoose={handleTargetChoose}
									/>
								)}
							</>
						))}
					</div>
				</div>
			</div>
			<div className={clsx(s['targets-container'])}>
				<span>Выбранные объекты</span>
				<div className={clsx(s['list-box'])}>
					<div className={clsx(s['content'])}>
						{Object.entries(targets).map(([id, target]) => (
							<>{target.chosen && <div key={id}>{target.getName()}</div>}</>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default TargetsChoiceTree;
