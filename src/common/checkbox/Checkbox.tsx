import React from 'react';
import classNames from 'classnames';

import styles from './Checkbox.module.css';

type Props = {
  label?: string;
  onChange: () => void;
  className?: string;
  name: string;
};

const Checkbox = (props: Props) => {
  return (
    <div className={classNames(styles.wrapper, props.className)}>
      <input
        type="checkbox"
        onChange={props.onChange}
        className={styles.checkbox}
      />
      <label htmlFor={props.label}>{props.label}</label>
    </div>
  );
};

export default Checkbox;
