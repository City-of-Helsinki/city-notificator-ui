import React from 'react';

import styles from './Header.module.css';
const Header = () => {
  return (
    <div className={styles.headerWrapper}>
      <div className={styles.headerCenterContainer}>
        <p className={styles.languageItem}>Suomi</p>
        <p className={styles.languageItem}>Englanti</p>
        <p className={styles.languageItem}>Ruotsi</p>
      </div>
    </div>
  );
};

export default Header;
