import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
})
export class DetailComponent implements OnInit {
  @Input() viaje: any;

  constructor() {}

  ngOnInit(): void {}

  closeModal(viaje: any) {
    const modal = document.querySelector('#modal-viaje-'+viaje.id);
    modal?.classList.remove('show');
    modal?.setAttribute('style', 'display: none');

    // Pausar el video cuando el modal se cierra
    let videoElement: HTMLVideoElement | null = document.querySelector('#modal-viaje-'+viaje.id+' video');
    if (videoElement) {
      videoElement.pause();
    }
  }
}
