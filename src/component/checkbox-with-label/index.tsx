import clsx from 'clsx';
import s from './checkbox-with-label.module.scss';
import '../../styles.css';
import Checkbox from '../checkbox';
import { useRef } from 'react';

interface CheckboxWithLabelProps {
    size: number;
    label: string;
	disabled: boolean;
	onChecked?: (arg: boolean) => void;
}

const CheckboxWithLabel = (props: CheckboxWithLabelProps) => {
    const checkboxRef = useRef(null);

    function handleTitleClick() {
        if (checkboxRef.current) {
            (checkboxRef.current as any).forceCheck();
        }
    }

    return (
        <div className={clsx(s['checkbox-with-label'], props.disabled && s['disabled'])}>
            <Checkbox
                size={24}
                disabled={props.disabled}
                onChecked={props.onChecked}
                ref={checkboxRef}
            />
            <span
                className={clsx(s['label'])}
                onClick={handleTitleClick}
                onKeyDown={undefined}
            >
                {props.label}
            </span>
        </div>
    );
}

export default CheckboxWithLabel;