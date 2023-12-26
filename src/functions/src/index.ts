/**
 * Copyright 2023 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
"use strict";

import {onRequest} from "firebase-functions/v2/https";
import {onDocumentCreated} from "firebase-functions/v2/firestore";
import {initializeApp} from "firebase-admin/app";
import {getFirestore} from "firebase-admin/firestore";


initializeApp();
// [END import]

// [START addmessage]
// Take the text parameter passed to this HTTP endpoint and insert it into
// Firestore under the path /messages/:documentId/original
// [START addmessageTrigger]
exports.addmessage = onRequest(async (req, res) => {
  // [END addmessageTrigger]
  // Grab the text parameter.
  const original = req.query.text;
  // [START adminSdkAdd]
  // Push the new message into Firestore using the Firebase Admin SDK.
  const writeResult = await getFirestore()
    .collection("messages")
    .add({original: original});
  // Send back a message that we've successfully written the message
  res.json({result: `Message with ID: ${writeResult.id} added.`});
  // [END adminSdkAdd]
});
// [END addmessage]

// Utilizando comprobación de existencia
exports.makeuppercase = onDocumentCreated("/messages/{documentId}", (event) => {
  if (!event.data) {
    console.log("No data found in event");
    return null; // Salir de la función si no hay datos
  }

  const original = event.data.data().original;
  const uppercase = original.toUpperCase();

  return event.data.ref.set({uppercase}, {merge: true});
});
