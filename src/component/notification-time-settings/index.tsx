import clsx from 'clsx';
import s from './notification-time-settings.module.scss';
import '../../styles.css';
import FormSectionTitle from '../form-section-title';
import { useState } from 'react';
import { Periodicity } from '../../models/notification-time/Periodicity';
import PeriodicitySelector from '../periodicity-selector';
import NumberSlider from '../number-slider';

const NotificationTimeSettings = () => {
	const periodicities = [
		{ title: 'Разовое', value: Periodicity.ONETIME },
		{ title: 'Ежедневное', value: Periodicity.DAILY },
		{ title: 'Еженедельное', value: Periodicity.WEEKLY },
		{ title: 'Ежемесячное', value: Periodicity.MONTHLY },
		{ title: 'Квартальное', value: Periodicity.QUARTERLY },
		{ title: 'Ежегодное', value: Periodicity.ANNUAL },
	];
	const [periodicity, setPeriodicity] = useState(Periodicity.ONETIME);

	return (
		<div
			className={clsx(
				'form-section',
				s['notification-time-settings-container']
			)}>
			<div className={clsx('content')}>
				<FormSectionTitle
					title={'Периодичность появления уведомления'}
					required={true}
				/>
				<div className={clsx(s['periodicities-box'])}>
					{periodicities.map((period, index) => (
						<PeriodicitySelector
							key={index}
							title={period.title}
							value={period.value}
							isFirst={index === 0}
							current={periodicity}
							onSelected={setPeriodicity}
						/>
					))}
				</div>
			</div>
			<div className={clsx('content')}>
				<FormSectionTitle
					title={'Период активности уведомления'}
					required={true}
				/>
			</div>
			<div className={clsx('content')}>
				<FormSectionTitle
					title={'Время отображения уведомления (в секундах)'}
					required={true}
				/>
				<NumberSlider fillWidth={true} minValue={0} maxValue={100} />
			</div>
		</div>
	);
};

export default NotificationTimeSettings;
