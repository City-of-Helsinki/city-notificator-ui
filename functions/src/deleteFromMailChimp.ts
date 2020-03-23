import * as functions from 'firebase-functions';

// eslint-disable-next-line @typescript-eslint/no-var-requires,@typescript-eslint/no-require-imports
const Mailchimp = require('mailchimp-api-v3');

export const deleteFromMailChimp = functions.firestore
  .document('citizen/{documentID}')
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  .onUpdate((change: any) => {
    const data = change.after.data();

    const mailchimp = new Mailchimp('');
    console.log('DATA', data);
    const status = data?.active ? 'subscribed' : 'unsubscribed';
    mailchimp
      .put(`/lists/2f1663b6b1/members/${data.emailID}`, {
        // eslint-disable-next-line @typescript-eslint/camelcase
        email_address: data?.email,
        status: status,
      })
      .then(() => console.log('SUCCESS'))
      .catch((error: Error) => console.log('ERROR', error));

    return new Promise(resolve => {
      resolve();
    });
  });
