import React, { useState } from 'react';
import { useParams } from 'react-router';
import firebase from 'firebase';

import styles from './UnSubscribe.module.css';
type Params = {
  id?: string;
};

const UnSubscribe = () => {
  const [deleted, setDeleted] = useState<boolean>(false);
  const params: Params = useParams();

  const handleUnsubscribe = () => {
    firebase
      .firestore()
      .collection('citizen')
      .doc(params.id)
      .update({
        active: false,
      })
      .then(() => setDeleted(true));
  };

  if (!params.id) return null;
  return (
    <div className={styles.wrapper}>
      {!deleted && <button onClick={handleUnsubscribe}>Peruuta tilaus</button>}
      {deleted && <p>Tilaus peruutettu onnistuneesti!</p>}
    </div>
  );
};

export default UnSubscribe;
