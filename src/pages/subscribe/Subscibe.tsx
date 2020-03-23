import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { TextInput } from 'hds-react';
import firebase from 'firebase';

import Checkbox from '../../common/checkbox/Checkbox';
import styles from './Subscribe.module.css';

const Subscribe = () => {
  const [subscriptionData, setSubscriptionData] = useState({
    email: '',
    phone: '',
    postalCode: '',
    useEmailNotifications: false,
    useSmsNotifications: false,
    getCovidNotifications: false,
    getVolunteeringNotifications: false,
    active: true,
    terms: false,
  });

  const history = useHistory();

  // This must be set to any for now. HDS onChange event is set to ChangeEvent<Element>
  // which doesn't container event.target.value
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onChange = (event: any) => {
    event.persist();
    setSubscriptionData(prevState => ({
      ...prevState,
      [event.target.id]: event.target.value,
    }));
  };

  const handleSubscribe = () => {
    firebase
      .firestore()
      .collection('citizen')
      .add(subscriptionData)
      .then(() => history.push('/success'));
  };

  return (
    <div className={styles.wrapper}>
      <h2>
        Tilaa Helsingin laupungin viimeisimmät covid19- tilanteeseen liittyvät
        tiedotteet
      </h2>
      <p className={styles.helpText}>
        Lähetämme antamiisi yhteystietoihin tiedotteita kaupungin viimeisimmistä
        ohjeistuksista ja linjauksista
      </p>

      <div className={styles.row}>
        <TextInput
          id="email"
          value={subscriptionData.email}
          labelText="Sähköposti"
          className={styles.textInput}
          onChange={onChange}
        />

        <TextInput
          id="phone"
          value={subscriptionData.phone}
          labelText="Puhelinnumero"
          className={styles.textInput}
          onChange={onChange}
        />

        <TextInput
          id="postalCode"
          value={subscriptionData.postalCode}
          labelText="Postinumero"
          className={styles.textInput}
          onChange={onChange}
        />
      </div>

      <div className={styles.row}>
        <Checkbox
          onChange={() =>
            setSubscriptionData(prevState => ({
              ...prevState,
              useEmailNotifications: !prevState.useEmailNotifications,
            }))
          }
          name="useEmailNotifications"
          label="Haluan tiedotteet sähköpostilla"
          className={styles.checkboxRow}
        />

        <Checkbox
          onChange={() =>
            setSubscriptionData(prevState => ({
              ...prevState,
              useSmsNotifications: !prevState.useSmsNotifications,
            }))
          }
          name="useSmsNotifications"
          label="Haluan tiedotteet tekstiviestillä"
          className={styles.checkboxRow}
        />
      </div>

      <hr />

      <h3>Mitä tiedotteita haluat vastaanottaa</h3>

      <Checkbox
        onChange={() =>
          setSubscriptionData(prevState => ({
            ...prevState,
            getCovidNotifications: !prevState.getCovidNotifications,
          }))
        }
        name="getCovidNotifications"
        label="Haluan tiedotteita viimeisimmästä covid-tilanteesta"
        className={styles.checkboxColumn}
      />

      <Checkbox
        onChange={() =>
          setSubscriptionData(prevState => ({
            ...prevState,
            getVolunteeringNotifications: !prevState.getVolunteeringNotifications,
          }))
        }
        name="getVolunteeringNotifications"
        label="Olen halukas tekemään vapaaehtoistyötä liittyen kehittyvään
            tilanteeseen"
        className={styles.checkboxColumn}
      />

      <hr />

      <Checkbox
        onChange={() =>
          setSubscriptionData(prevState => ({
            ...prevState,
            terms: !prevState.terms,
          }))
        }
        name="terms"
        label="Hyväksyn palvelun tiedot ja että minun voidaan olla yhteydessä
          antamiini yhteustietoihin"
        className={styles.checkboxColumn}
      />

      <button
        disabled={!subscriptionData.terms}
        className={styles.button}
        onClick={handleSubscribe}
      >
        TILAA
      </button>
    </div>
  );
};

export default Subscribe;
