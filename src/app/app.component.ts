import { Component, OnInit, inject } from '@angular/core';
import { ViajeService } from './viaje/viaje.service';
import { DiaViaje } from './viaje/viaje-data';
import { DetailComponent } from './detail/detail.component';
import { Firestore } from '@angular/fire/firestore';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'FP.067-DevsFrontJs-Prod2';
  viajeData: DiaViaje[] | undefined;
  viaje: DiaViaje | undefined;
  modal: DetailComponent | undefined;
  firestore: Firestore = inject(Firestore);
  private notifier: NotifierService;
  
  constructor(private viajeService: ViajeService, notifier: NotifierService) {
    this.modal = new DetailComponent();
    this.notifier = notifier;
  }

  ngOnInit(): void {
    this.viajeService.getViaje().subscribe(data => {
      this.viajeData = data;
    });
  }

  openModal(componentId: String, viaje: any) {
    this.modal?.openModal(componentId,viaje)
  }

}
