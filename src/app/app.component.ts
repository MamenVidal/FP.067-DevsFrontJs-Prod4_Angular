import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { ViajeService } from './viaje/viaje.service';
import { DiaViaje } from './viaje/viaje-data';
import { DetailComponent } from './detail/detail.component';
import { Firestore } from '@angular/fire/firestore';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'FP.067-DevsFrontJs-Prod2';
  viajeData: DiaViaje[] | undefined;
  viaje: DiaViaje | undefined;
  firestore: Firestore = inject(Firestore);
  private notifier: NotifierService;

  // Añadir ViewChild para obtener referencia a DetailComponent
  @ViewChild(DetailComponent)
  modal!: DetailComponent;

  constructor(private viajeService: ViajeService, notifier: NotifierService) {
    this.notifier = notifier;
  }

  ngOnInit(): void {
    this.viajeService.getViaje().subscribe((data) => {
      this.viajeData = data;
    });
  }

  openModal(componentId: String, viaje: any) {
    // Usar la referencia a DetailComponent para abrir el modal
    this.modal?.openModal(componentId, viaje);
  }
}
