import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ViajeService } from '../viaje/viaje.service';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
})
export class DetailComponent implements OnInit {
  @Input() componentId: any;
  @Input() viaje: any;
  @Output() closeModalEvent = new EventEmitter<void>();

  editForm: FormGroup;

  constructor(
    private notifier: NotifierService,
    private viajeService: ViajeService
  ) {
    this.notifier = notifier;
    this.editForm = new FormGroup({
      nombre: new FormControl('', Validators.required),
      ciudad: new FormControl('', Validators.required),
      dia: new FormControl('', Validators.required),
      alojamiento: new FormControl(''),
      descripcion: new FormControl(''),
      //actividades: new FormControl(this.viaje.actividades),
      //video: new FormControl(this.viaje.video),
      //imagen: new FormControl(this.viaje.imagen),
    });
  }

  ngOnInit(): void {
    if(this.viaje) {
      this.editForm = new FormGroup({
        nombre: new FormControl(this.viaje.nombre, Validators.required),
        ciudad: new FormControl(this.viaje.ciudad, Validators.required),
        dia: new FormControl(this.viaje.dia, Validators.required),
        alojamiento: new FormControl(this.viaje.alojamiento),
        descripcion: new FormControl(this.viaje.descripcion),
        //actividades: new FormControl(this.viaje.actividades),
        //video: new FormControl(this.viaje.video),
        //imagen: new FormControl(this.viaje.imagen),
      });
    }
  }
  
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
    this.closeModalEvent.emit();
  }

  async updateViaje() {
    const updatedData = this.editForm.value;
    try {
      await this.viajeService.actualizaViaje(this.viaje.id, updatedData);
      console.log('Día actualizado con éxito');
      this.mostrarNotificacion('success', 'Día actualizado con éxito');
    } catch (error) {
      console.error('Error al actualizar el día: ', error);
      this.mostrarNotificacion('error', 'Día actualizado con éxito');
    }
  }

  mostrarNotificacion(tipo: string, mensaje: string): void {
    this.notifier.notify(tipo, mensaje);
  }
  
}
