import React, { useEffect, useState } from 'react';
import CsvDownloader from 'react-csv-downloader';
import firebase from 'firebase';

import styles from './List.module.css';

type Data = {
  email: string;
  id: string;
};

const List = () => {
  const [datas, setDatas] = useState<Data[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    firebase
      .firestore()
      .collection('citizen')
      .onSnapshot(querySnap => {
        const cvsData: Data[] = [];
        querySnap.forEach(doc => {
          const data = doc.data();
          const newCVS = {
            email: data.email,
            id: doc.id,
          };
          cvsData.push(newCVS);
        });
        setDatas(cvsData);
        setLoading(false);
      });
  }, []);

  return (
    <div className={styles.wrapper}>
      {loading && <p>Loading...</p>}
      {!loading && (
        <CsvDownloader
          datas={datas}
          text="Lataa .csv tiedosto"
          filename="emails"
        />
      )}
    </div>
  );
};

export default List;
