// firebase-messaging-sw.js
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyAVUxS20D4ilBqqK94VPNBjKjxC0UUms1I",
  authDomain: "misviajes-d61aa.firebaseapp.com",
  databaseURL: 'https://misviajes-d61aa.firebaseapp.com',
  projectId: "misviajes-d61aa",
  storageBucket: "misviajes-d61aa.appspot.com",
  messagingSenderId: "398595674992",
  appId: "1:398595674992:web:1b573fde23396d497735b5",
  measurementId: "G-YZZECZZEPY",
  vapidKey: "BDo-bkvV-RNFApJjou_nrRyEjFGJrURUykrRmhx52BtKOWZEiVV8pkIOGhAjlcb1xH0YGJBKpVZoonGOE20i5Dc"
});

const messaging = firebase.messaging();

// Añadir el controlador de mensajes
messaging.onBackgroundMessage(function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  
  // Personaliza aquí tu notificación:
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.icon || '/icon.png' // Puedes cambiar la ruta al ícono
  };

  return self.registration.showNotification(notificationTitle, notificationOptions);
});
