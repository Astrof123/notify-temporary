import clsx from 'clsx';
import s from './notification-time-settings.module.scss';
import '../../styles.css';
import FormSectionTitle from '../form-section-title';
import { useState } from 'react';
import { EScheduleType } from '../../models/notification-time/EScheduleType';
import ScheduleTypeSelector from '../schedule-type-selector';
import NumberSlider from '../number-slider';
import DatePeriodPicker from '../date-period-picker';
import TimePicker from '../time-picker';
import DatePicker from '../date-picker';
import { scheduleTypes, weekDays, daysOfMonth } from '../../utils/consts';
import MultipleChoiceSelector from '../multiple-choice-selector';
import DaysOfQuarterChoice from '../days-of-quarter-choice';

const NotificationTimeSettings = () => {
	const [scheduleType, setScheduleType] = useState(EScheduleType.QUARTERLY);
	const [scheduleDaysOfWeek, setScheduleDaysOfWeek] = useState<string[]>([]);
	const [scheduleDaysOfMonth, setScheduleDaysOfMonth] = useState<number[]>([]);
	// const [timeDisplay, setTimeDisplay] = useState(0);
	// const [withoutTimeDisplay, setWithoutTimeDisplay] = useState(false);

	return (
		<div
			className={clsx(
				'form-section',
				s['notification-time-settings-container']
			)}>
			<FormSectionTitle
				title={'Настройки периодичности уведомления'}
				required={true}
			/>
			<div className={clsx('content', 'no-overflow')}>
				<div className={clsx(s['schedule-types-container'])}>
					<div className={clsx(s['schedule-types-list'])}>
						{scheduleTypes.map((type, index) => (
							<ScheduleTypeSelector
								key={index}
								title={type.title}
								value={type.value}
								isFirst={index === 1}
								current={scheduleType}
								onSelected={setScheduleType}
							/>
						))}
					</div>
					<div className={clsx(s['settings-content'])}>
						<div className={clsx(s['row'])}>
							{scheduleType === EScheduleType.ONCE ? (
								<DatePicker />
							) : (
								<DatePeriodPicker />
							)}
							<TimePicker />
						</div>
						{scheduleType !== EScheduleType.ONCE && (
							<div className={clsx(s['row'])}>
								{scheduleType === EScheduleType.DAILY && (
									<NumberSlider
										fillWidth={false}
										width={300}
										startValue={1}
										minValue={1}
										maxValue={6}
									/>
								)}
								{scheduleType === EScheduleType.WEEKLY && (
									<MultipleChoiceSelector
										dataArray={weekDays}
										chosen={scheduleDaysOfWeek}
										onChange={setScheduleDaysOfWeek}
									/>
								)}
								{scheduleType === EScheduleType.MONTHLY && (
									<div className={clsx(s['days-of-month-box'])}>
										<MultipleChoiceSelector
											dataArray={daysOfMonth}
											chosen={scheduleDaysOfMonth}
											rowAmount={7}
											onChange={setScheduleDaysOfMonth}
										/>
									</div>
								)}
								{scheduleType === EScheduleType.QUARTERLY && (
									<DaysOfQuarterChoice />
								)}
								{scheduleType === EScheduleType.YEARLY && <></>}
							</div>
						)}
					</div>
				</div>
			</div>

			{/* <div className={clsx('content')}>
				<FormSectionTitle
					title={'Периодичность появления уведомления'}
					required={true}
				/>
				<div className={clsx(s['schedule-types-box'])}>
					{scheduleTypes.map((period, index) => (
						<ScheduleTypeSelector
							key={index}
							title={period.title}
							value={period.value}
							isFirst={index === 0}
							current={scheduleType}
							onSelected={setScheduleType}
						/>
					))}
				</div>
			</div>
			<div className={clsx('content', 'no-overflow')}>
				<FormSectionTitle
					title={'Период активности уведомления'}
					required={true}
				/>
				<div className={clsx(s['datetime-pickers'])}>
					{scheduleType === EScheduleType.ONCE ? (
						<DatetimePicker />
					) : (
						<DatetimePeriodPicker />
					)}
					<TimePicker />
				</div>
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
			</div> */}
		</div>
	);
};

export default NotificationTimeSettings;
