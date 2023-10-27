import { Component, OnInit } from '@angular/core';
import { ViajeService } from '../viaje/viaje.service';
import { ViajeData } from '../viaje/viaje-data';
import { DetailComponent } from '../detail/detail.component';

@Component({
  selector: 'app-days',
  templateUrl: './days.component.html',
  styleUrls: ['./days.component.css']
})
export class DaysComponent implements OnInit {
  viajes: any[] = [];
  filtroDia: string = '';
  filtroCiudad: string = '';
  detalleViaje: any | null = null;

  constructor(private viajeService: ViajeService) { }
  viajeData: ViajeData | undefined;

  ngOnInit(): void {
    this.viajeService.getViaje().subscribe(data => {
      this.viajes = data.MiViaje;
    });
  }

  filtrarViajes() {
    return this.viajes.filter(v => {
      return this.normalizeStr(v.dia).includes(this.normalizeStr(this.filtroDia)) &&
             this.normalizeStr(v.ciudad).includes(this.normalizeStr(this.filtroCiudad));
    });
  }  

  normalizeStr(data: string): string {
    return data.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  }

  openModal(viaje: any) {
    const modal = document.querySelector('#modal-viaje-' + viaje.id);
    modal?.classList.add('show');
    modal?.setAttribute('style', 'display: flex');

    let videoElement: HTMLVideoElement | null = document.querySelector('#modal-viaje-'+viaje.id+' video');
    if (videoElement) {
      videoElement.src = viaje.video;
    }
  }
}