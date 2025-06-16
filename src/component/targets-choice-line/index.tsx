import clsx from 'clsx';
import s from './targets-choice-line.module.scss';
import '../../styles.css';
import { useState } from 'react';
import Checkbox from '../checkbox';
import { Company } from '../../models/Company';
import { Department } from '../../models/Department';
import { Person } from '../../models/Person';

interface TargetsChoiceLineProps {
	data: Company | Department | Person;
	depth?: number;
}

const TargetsChoiceLine = (props: TargetsChoiceLineProps) => {
	const [expanded, setExpanded] = useState(false);

	function handleMarkerOnClick() {
		if (!props.data.isPerson()) {
			setExpanded(!expanded);
		}
	}

	function handleMarkerKeyDown(event: React.KeyboardEvent) {
		if (event.key === 'Enter') {
			handleMarkerOnClick();
		}
	}

	return (
		<div className={clsx(s['target-line-container'])}>
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
				<Checkbox size={20} />
				<span className={clsx(s['title'])}>{props.data.getName()}</span>
			</div>
			{expanded && !props.data.isPerson() && (
				<div className={clsx(s['children-box'])}>
					{(props.data.isCompany() || props.data.isDepartment()) && (
						<>
							{(props.data as Company).departments.map((department, index) => (
								<TargetsChoiceLine
                                    key={index}
                                    data={department}
                                />
							))}
							{(props.data as Company).persons.map((person, index) => (
								<TargetsChoiceLine
                                    key={index}
                                    data={person}
                                />
							))}
						</>
					)}
				</div>
			)}
		</div>
	);
};

export default TargetsChoiceLine;
