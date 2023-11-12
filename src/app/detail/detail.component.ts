import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
})
export class DetailComponent implements OnInit {
  @Input() componentId: any;
  @Input() viaje: any;

  constructor() {}

  ngOnInit(): void {}
  
  openModal(componentId: String, viaje: any) {
    const modal = document.querySelector('#modal-viaje-' + componentId + '-' + viaje.codigo);
    modal?.classList.add('show');
    modal?.setAttribute('style', 'display: flex');

    let videoElement: HTMLVideoElement | null = document.querySelector('#modal-viaje-'+viaje.codigo+' video');
    if (videoElement) {
      videoElement.src = viaje.video;
    }
  }

  closeModal(viaje: any) {
    const modal = document.querySelector('#modal-viaje-'+this.componentId+'-'+viaje.codigo);
    modal?.classList.remove('show');
    modal?.setAttribute('style', 'display: none');

    // Pausar el video cuando el modal se cierra
    let videoElement: HTMLVideoElement | null = document.querySelector('#modal-viaje-'+this.componentId+'-'+viaje.codigo+' video');
    if (videoElement) {
      videoElement.pause();
    }
  }
}
