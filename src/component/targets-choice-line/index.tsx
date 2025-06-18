import clsx from 'clsx';
import s from './targets-choice-line.module.scss';
import '../../styles.css';
import { useEffect, useRef, useState } from 'react';
import Checkbox from '../checkbox';
import { Company } from '../../models/notification-targets/Company';
import { Department } from '../../models/notification-targets/Department';
import { Person } from '../../models/notification-targets/Person';
import { Expanding } from '../../models/notification-targets/Expanding';
import { BaseEntity } from '../../models/notification-targets/BaseEntity';

interface TargetsChoiceLineProps {
	data: Company | Department | Person;
	disabled: boolean;
	hidden?: boolean;
	onChoose: (arg1: boolean, arg2: BaseEntity) => void;
}

const TargetsChoiceLine = (props: TargetsChoiceLineProps) => {
	const [expanded, setExpanded] = useState(false);
	const [checked, setChecked] = useState(false);
	const checkboxRef = useRef(null);

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

	function handleTitleClick() {
		if (checkboxRef.current) {
			(checkboxRef.current as any).forceCheck();
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
				<Checkbox
					size={24}
					disabled={props.disabled}
					onChecked={setChecked}
					ref={checkboxRef}
				/>
				<span
					className={clsx(s['title'], props.disabled && s['disabled'])}
					onClick={handleTitleClick}
					onKeyDown={undefined}>
					{props.data.getName()}
				</span>
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
