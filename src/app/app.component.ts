import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { ViajeService } from './viaje/viaje.service';
import { DiaViaje } from './viaje/viaje-data';
import { DetailComponent } from './detail/detail.component';
import { Firestore } from '@angular/fire/firestore';
import { NotifierService } from 'angular-notifier';

import { environment } from '../environments/environment'
import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";
import { onMessage } from 'firebase/messaging';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'FP.067-DevsFrontJs-prod2';
  viajeData: DiaViaje[] | undefined;
  viaje: DiaViaje | undefined;
  firestore: Firestore = inject(Firestore);
  private notifier: NotifierService;

  // Añadir ViewChild para obtener referencia a DetailComponent
  @ViewChild(DetailComponent)
  modal!: DetailComponent;

  constructor(private viajeService: ViajeService, notifier: NotifierService) {
    this.notifier = notifier;

      const firebaseApp = initializeApp(environment.firebase);
      const messaging = getMessaging(firebaseApp);
      onMessage(messaging, (payload) => {
        console.log('[firebase-messaging-sw.js] Received background message ', payload);
        // Muestra la notificación aquí
        const notificationTitle = payload.notification?.title || 'Notification Title';
        this.notifier.notify('success', notificationTitle);
      });

      getToken(messaging, { vapidKey: 'BDo-bkvV-RNFApJjou_nrRyEjFGJrURUykrRmhx52BtKOWZEiVV8pkIOGhAjlcb1xH0YGJBKpVZoonGOE20i5Dc' })
        .then((currentToken) => {
          if (currentToken) {
            console.log('Token del dispositivo:', currentToken);
            // Guarda este token en tu base de datos si es necesario
          } else {
            console.log('No registration token available. Request permission to generate one.');
          }
        }).catch((err) => {
          console.log('An error occurred while retrieving token. ', err);
        });

  }

  ngOnInit(): void {
    this.viajeService.getViaje().subscribe((data) => {
      this.viajeData = data;
    });
  }
   // Método para solicitar permisos de notificaciones
   solicitarPermisoNotificaciones() {
    Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        console.log('Notification permission granted.');
      } else {
        console.log('Notification permission not granted.');
      }
    }).catch((err) => {
      console.log('Unable to get permission to notify.', err);
    });
  }

  openModal(componentId: String, viaje: any) {
    // Usar la referencia a DetailComponent para abrir el modal
    this.modal?.openModal(componentId, viaje);
  }
}
