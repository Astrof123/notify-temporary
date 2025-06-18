import clsx from 'clsx';
import s from './notification-time-settings.module.scss';
import '../../styles.css';
import FormSectionTitle from '../form-section-title';
import { useState } from 'react';
import { Periodicity } from '../../models/notification-time/Periodicity';
import PeriodicitySelector from '../periodicity-selector';
import NumberSlider from '../number-slider';
import CheckboxWithLabel from '../checkbox-with-label';
import DatetimePicker from '../datetime-picker';

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
	const [timeDisplay, setTimeDisplay] = useState(0);
	const [withoutTimeDisplay, setWithoutTimeDisplay] = useState(false);

	console.log(timeDisplay);

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
			<div className={clsx('content', 'no-overflow')}>
				<FormSectionTitle
					title={'Период активности уведомления'}
					required={true}
				/>
				<DatetimePicker />
			</div>
			<div className={clsx('content')}>
				<FormSectionTitle
					title={'Время отображения уведомления (в секундах)'}
					required={true}
				/>
				{!withoutTimeDisplay && (
					<NumberSlider
						fillWidth={false}
						width={300}
						startValue={20}
						minValue={0}
						maxValue={999}
						step={1}
						onChange={setTimeDisplay}
					/>
				)}
				<CheckboxWithLabel
					size={24}
					label={'Отображать до тех пор, пока не закроет пользователь'}
					disabled={false}
					onChecked={setWithoutTimeDisplay}
				/>
			</div>
		</div>
	);
};

export default NotificationTimeSettings;
