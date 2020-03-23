import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { DocumentSnapshot } from 'firebase-functions/lib/providers/firestore';

// eslint-disable-next-line @typescript-eslint/no-var-requires,@typescript-eslint/no-require-imports
const Mailchimp = require('mailchimp-api-v3');
admin.initializeApp();

export const addToMailChimp = functions.firestore
  .document('citizen/{documentID}')
  .onCreate((onSnapshot: DocumentSnapshot) => {
    const data = onSnapshot.data();
    if (data) data.id = onSnapshot.id;

    const mailchimp = new Mailchimp('');

    mailchimp
      .post('/lists/2f1663b6b1/members', {
        // eslint-disable-next-line @typescript-eslint/camelcase
        email_address: data?.email,
        status: 'subscribed',
      })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .then((res: any) => {
        if (data) data.emailID = res.id;
        admin
          .firestore()
          .collection('citizen')
          .doc(data?.id)
          .set({ ...data })
          .then(() => console.log('RESAVESUCCESS'))
          .catch(err => console.log('RESAVEERROR', err));
      })
      .catch((error: Error) => console.log('ERROR', error));

    return new Promise(resolve => {
      resolve();
    });
  });
