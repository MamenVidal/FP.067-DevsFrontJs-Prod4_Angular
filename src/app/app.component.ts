import { Component, OnInit } from '@angular/core';
import { ViajeService } from './viaje/viaje.service';
import { DiaViaje } from './viaje/viaje-data';
import { DetailComponent } from './detail/detail.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'FP.067-DevsFrontJs-Prod1';
  viajeData: DiaViaje[] | undefined;
  viaje: DiaViaje | undefined;
  modal: DetailComponent | undefined;
  
  constructor(private viajeService: ViajeService) {
    this.modal = new DetailComponent();
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
