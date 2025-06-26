import clsx from 'clsx';
import s from './recipients-choice-tree.module.scss';
import '../../styles.css';
import Search from '../search';
import RecipientsChoiceLine from '../recipient-choice-line';
import { BaseEntity } from '../../models/notification-recipients/BaseEntity';
import { useCallback, useState } from 'react';
import FormSectionTitle from '../form-section-title';
import { companies } from '../../utils/consts';

interface Recipients {
	[key: number]: BaseEntity;
}

const RecipientsChoiceTree = () => {
	const [recipients, setRecipients] = useState<Recipients>({});
	const [searchFilter, setSearchFilter] = useState('');

	function handleSearchUpdate(value: string) {
		setSearchFilter(value.trim().toLowerCase());
	}

	const handleRecipientChoose = useCallback(
		(isChosen: boolean, recipient: BaseEntity) => {
			recipient.chosen = isChosen;
			setRecipients((prev) => ({
				...prev,
				[recipient.getId()]: recipient,
			}));
		},
		[setRecipients]
	);

	return (
		<div className={clsx(s['tree-section'])}>
			<div className={clsx(s['tree-container'])}>
				<FormSectionTitle
					title={'Выберите компании, департаменты, отделы или сотрудников'}
					required={true}
				/>
				<div className={clsx('form-section', s['list-box'])}>
					<Search
						placeholder={'Название компании'}
						isRealTime={true}
						onValueChanged={handleSearchUpdate}
					/>
					<div className={clsx('content')}>
						{companies.map((company, index) => (
							<>
								<RecipientsChoiceLine
									key={index}
									data={company}
									disabled={false}
									hidden={
										!company.getName().toLowerCase().includes(searchFilter)
									}
									onChoose={handleRecipientChoose}
								/>
							</>
						))}
					</div>
				</div>
			</div>
			<div className={clsx(s['recipients-container'])}>
				<FormSectionTitle title={'Выбранные объекты'} />
				<div className={clsx('form-section', s['list-box'])}>
					<div className={clsx('content')}>
						{Object.entries(recipients).map(([id, recipient]) => (
							<>
								{recipient.chosen && <div key={id}>{recipient.getName()}</div>}
							</>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default RecipientsChoiceTree;
