import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { ViajeService } from './viaje/viaje.service';
import { DiaViaje } from './viaje/viaje-data';
import { DetailComponent } from './detail/detail.component';
import { Firestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'FP.067-DevsFrontJs-prod2';
  viajeData: DiaViaje[] | undefined;
  viaje: DiaViaje | undefined;
  firestore: Firestore = inject(Firestore);

  // Añadir ViewChild para obtener referencia a DetailComponent
  @ViewChild(DetailComponent)
  modal!: DetailComponent;

  constructor(private viajeService: ViajeService) {
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
