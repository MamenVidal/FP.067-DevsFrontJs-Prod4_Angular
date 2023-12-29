import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { DaysComponent } from './days/days.component';
import { DetailComponent } from './detail/detail.component';
import { PlayerComponent } from './player/player.component';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

// Importamos elementos y configuración de Firebase
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { FirestoreModule , getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { getMessaging, provideMessaging, getToken, onMessage } from "@angular/fire/messaging";
import { environment } from '../environments/environment';
import { Functions, FunctionsModule, getFunctions, provideFunctions } from '@angular/fire/functions';
import { ReactiveFormsModule } from '@angular/forms';

import { NotifierModule, NotifierOptions } from 'angular-notifier';
import { connectFirestoreEmulator } from 'firebase/firestore';
import { connectStorageEmulator } from 'firebase/storage';
import { connectFunctionsEmulator } from 'firebase/functions';


const customNotifierOptions: NotifierOptions = {
  position: {
    horizontal: {
      position: 'left',
      distance: 12,
    },
    vertical: {
      position: 'bottom',
      distance: 12,
      gap: 10,
    },
  },
  theme: 'material',
  behaviour: {
    autoHide: 5000,
    onClick: 'hide',
    onMouseover: 'pauseAutoHide',
    showDismissButton: true,
    stacking: 4,
  },
  animations: {
    enabled: true,
    show: {
      preset: 'slide',
      speed: 300,
      easing: 'ease',
    },
    hide: {
      preset: 'fade',
      speed: 300,
      easing: 'ease',
      offset: 50,
    },
    shift: {
      speed: 300,
      easing: 'ease',
    },
    overlap: 150,
  },
};

@NgModule({
  declarations: [AppComponent, DaysComponent, DetailComponent, PlayerComponent],
  imports: [
    FormsModule,
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    // Creamos la aplicación de Firebase con nuestra configuración
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    //provideFirestore(() => getFirestore()),
    //provideStorage(() => getStorage()),
    //provideMessaging(() => getMessaging()),
    provideFirestore(() => {
      const firestore = getFirestore();
      if (environment.useEmulators) {
        connectFirestoreEmulator(firestore, environment.emulatorConfig.firestore.host, environment.emulatorConfig.firestore.port);
      }
      return firestore;
    }),
    provideStorage(() => {
      const storage = getStorage();
      if (environment.useEmulators) {
        connectStorageEmulator(storage, environment.emulatorConfig.storage.host, environment.emulatorConfig.storage.port);
      }
      return storage;
    }),
    provideFunctions(() => {
      const functions = getFunctions();
      if (environment.useEmulators) {
        connectFunctionsEmulator(functions, environment.emulatorConfig.functions.host, environment.emulatorConfig.functions.port);
      }
      return functions;
    }),
    provideMessaging(() => getMessaging()),
    // Agregamos notificaciones
    NotifierModule.withConfig(customNotifierOptions),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
