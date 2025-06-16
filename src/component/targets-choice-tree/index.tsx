import clsx from 'clsx';
import s from './targets-choice-tree.module.scss';
import '../../styles.css';
import RequiredFormSymbol from '../required-form-symbol';
import Search from '../search';
import TargetsChoiceLine from '../targets-choice-line';

const TargetsChoiceTree = () => {
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
						<TargetsChoiceLine depth={0} title='Shelby Limited' />
						<TargetsChoiceLine depth={0} title='Shelby Limited' />
						<TargetsChoiceLine depth={0} title='Shelby Limited' />
						<TargetsChoiceLine depth={0} title='Shelby Limited' />
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
