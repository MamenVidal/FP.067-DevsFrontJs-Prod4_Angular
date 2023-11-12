import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { DaysComponent } from './days/days.component';
import { DetailComponent } from './detail/detail.component';
import { PlayerComponent } from './player/player.component';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

// Importamos elementos y configuración de Firebase
import { provideFirebaseApp, getApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { environment } from '../environments/environment';

@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
    DaysComponent,
    DetailComponent,
    PlayerComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    // Creamos la aplicacióncde Firebase con nuestra configuración
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
  ],
})

export class AppModule { }
