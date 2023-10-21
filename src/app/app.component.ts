import { Component, OnInit } from '@angular/core';
import { ViajeService } from './viaje/viaje.service';
import { ViajeData } from './viaje/viaje-data';
import { modalComponent } from './modal/modal.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'FP.067-DevsFrontJs-Prod1';
  
  constructor(private viajeService: ViajeService) {}
  viajeData: ViajeData | undefined;

  ngOnInit(): void {
    this.viajeService.getViaje().subscribe(data => {
      this.viajeData = data;
    });
  }

  openModal(viaje: any) {
    const modal = document.querySelector('#modal-dia-'+viaje.id);
    modal?.classList.add('show');

    // al abrir el modal seteo el video del viaje como src de todos los reproductores de video
    let videoElement: HTMLVideoElement | null = document.querySelector('#modal-dia-'+viaje.id+' video');
    if (videoElement) {
      videoElement.src = viaje.video;
    }
  }

  closeModal(viaje: any) {
    const modal = document.querySelector('#modal-dia-'+viaje.id);
    modal?.classList.remove('show');
    // Pausar el video cuando el modal se cierra
    let videoElement: HTMLVideoElement | null = document.querySelector('#modal-dia-'+viaje.id+' video');
    if (videoElement) {
      videoElement.pause();
    }
  }

}
