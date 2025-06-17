import clsx from 'clsx';
import s from './required-form-symbol.module.scss';
import '../../styles.css';

const RequiredFormSymbol = () => {
	return <div className={clsx(s['required-from-symbol'])}>*</div>;
};

export default RequiredFormSymbol;
