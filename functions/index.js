// The Cloud Functions for Firebase SDK to create Cloud Functions and triggers.
const {logger} = require("firebase-functions");
const {onRequest} = require("firebase-functions/v2/https");
const {onDocumentCreated} = require("firebase-functions/v2/firestore");

// The Firebase Admin SDK to access Firestore.
const {initializeApp} = require("firebase-admin/app");
const {getFirestore} = require("firebase-admin/firestore");
const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

// Take the text parameter passed to this HTTP endpoint and insert it into
// Firestore under the path /messages/:documentId/original
exports.addmessage = onRequest(async (req, res) => {
  const original = req.query.text;
  const writeResult = await getFirestore()
      .collection("messages")
      .add({original: original});

  res.json({result: `Message with ID: ${writeResult.id} added.`});
});
// Listens for new messages added to /messages/:documentId/original
// and saves an uppercased version of the message
// to /messages/:documentId/uppercase
exports.makeuppercase = onDocumentCreated("/messages/{documentId}", (event) => {
  const original = event.data.data().original;
  logger.log("Uppercasing", event.params.documentId, original);
  const uppercase = original.toUpperCase();
  return event.data.ref.set({uppercase}, {merge: true});
});

exports.onDocumentWrite = functions.firestore
  .document('MiViaje/{docId}')
  .onWrite((change, context) => {
    const document = change.after.exists ? change.after.data() : null;
    const message = {
      notification: {
        title: 'Documento Cambiado onDocumentWrite',
        body: 'Datos finales: '+JSON.stringify(document)
      },
      topic: 'viajes' 
    };

    // Enviar notificación
    return admin.messaging().send(message)
      .then(response => {
        console.log('Notificación enviada exitosamente:', response, message);
        return response;
      })
      .catch(error => {
        console.error('Error enviando la notificación:', error, message);
      });
  });

exports.onDocumentUpdated = functions.firestore
  .document('MiViaje/{docId}')
  .onUpdate((change, context) => {
    // Tu lógica para cuando un documento se actualiza
    const newValue = change.after.data();
    const message = {
      notification: {
        title: 'Documento actualizado onDocumentUpdated',
        body: 'Datos finales: '+JSON.stringify(newValue)
      },
      topic: 'viajes' // Reemplaza con el topic al cual los usuarios se suscriben
    };

    // Enviar notificación
    return admin.messaging().send(message)
      .then(response => {
          console.log('Notificación enviada exitosamente:', response, message);
          return response;
      })
      .catch(error => {
          console.error('Error enviando la notificación:', error, message);
      });
});
