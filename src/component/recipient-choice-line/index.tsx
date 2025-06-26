import clsx from 'clsx';
import s from './recipients-choice-line.module.scss';
import '../../styles.css';
import { useEffect, useState } from 'react';
import { Company } from '../../models/notification-recipients/Company';
import { Department } from '../../models/notification-recipients/Department';
import { Account } from '../../models/notification-recipients/Account';
import { Expanding } from '../../models/notification-recipients/Expanding';
import { BaseEntity } from '../../models/notification-recipients/BaseEntity';
import CheckboxWithLabel from '../checkbox-with-label';

interface RecipientsChoiceLineProps {
	data: Company | Department | Account;
	disabled: boolean;
	hidden?: boolean;
	onChoose: (arg1: boolean, arg2: BaseEntity) => void;
}

const RecipientsChoiceLine = (props: RecipientsChoiceLineProps) => {
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
			className={clsx(
				s['recipient-line-container'],
				props.hidden && s['hidden']
			)}>
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
									<RecipientsChoiceLine
										key={index}
										data={department}
										disabled={checked || props.disabled}
										onChoose={props.onChoose}
									/>
								)
							)}
							{(props.data as Expanding).accounts.map((person, index) => (
								<RecipientsChoiceLine
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

export default RecipientsChoiceLine;
