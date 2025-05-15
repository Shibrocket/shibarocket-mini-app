const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.resetDaily = functions.pubsub.schedule('0 0 * * *')
  .timeZone('UTC')
  .onRun(async (context) => {
    try {
      const usersRef = admin.firestore().collection('users');
      const snapshot = await usersRef.get();
      const batch = admin.firestore().batch();

      snapshot.forEach((doc) => {
        batch.update(doc.ref, {
          energy: 400,
          lastReset: admin.firestore().Timestamp.now(),
        });
      });

      await batch.commit();
      console.log('Daily reset completed for all users');
      return null;
    } catch (error) {
      console.error('Error resetting energy:', error);
      return null;
    }
  });
