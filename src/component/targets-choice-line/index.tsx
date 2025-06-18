import clsx from 'clsx';
import s from './targets-choice-line.module.scss';
import '../../styles.css';
import { useEffect, useState } from 'react';
import { Company } from '../../models/notification-targets/Company';
import { Department } from '../../models/notification-targets/Department';
import { Person } from '../../models/notification-targets/Person';
import { Expanding } from '../../models/notification-targets/Expanding';
import { BaseEntity } from '../../models/notification-targets/BaseEntity';
import CheckboxWithLabel from '../checkbox-with-label';

interface TargetsChoiceLineProps {
	data: Company | Department | Person;
	disabled: boolean;
	hidden?: boolean;
	onChoose: (arg1: boolean, arg2: BaseEntity) => void;
}

const TargetsChoiceLine = (props: TargetsChoiceLineProps) => {
	const [expanded, setExpanded] = useState(false);
	const [checked, setChecked] = useState(false);

	useEffect(() => {
		props.onChoose(checked, props.data);
	}, [checked]);

	function handleMarkerOnClick() {
		if (props.data.canBeExpanded) {
			setExpanded(!expanded);
		}
	}

	function handleMarkerKeyDown(event: React.KeyboardEvent) {
		if (event.key === 'Enter') {
			handleMarkerOnClick();
		}
	}

	return (
		<div
			className={clsx(s['target-line-container'], props.hidden && s['hidden'])}>
			<div className={clsx(s['parent-box'])}>
				{!props.data.isPerson() && (
					<div
						className={clsx(s['marker'])}
						tabIndex={0}
						role='button'
						onKeyDown={handleMarkerKeyDown}
						onClick={handleMarkerOnClick}>
						<span>{expanded ? '-' : '+'}</span>
					</div>
				)}
				<CheckboxWithLabel
					size={24}
					label={props.data.getName()}
					disabled={props.disabled}
					onChecked={setChecked}
				/>
			</div>
			{props.data.canBeExpanded && (
				<div className={clsx(s['children-box'], !expanded && s['hidden'])}>
					{props.data.hasChildren() ? (
						<>
							{(props.data as Expanding).departments.map(
								(department, index) => (
									<TargetsChoiceLine
										key={index}
										data={department}
										disabled={checked || props.disabled}
										onChoose={props.onChoose}
									/>
								)
							)}
							{(props.data as Expanding).persons.map((person, index) => (
								<TargetsChoiceLine
									key={index}
									data={person}
									disabled={checked || props.disabled}
									onChoose={props.onChoose}
								/>
							))}
						</>
					) : (
						<span className={clsx(s['label'])}>
							Нет отделов или сотрудников
						</span>
					)}
				</div>
			)}
		</div>
	);
};

export default TargetsChoiceLine;
