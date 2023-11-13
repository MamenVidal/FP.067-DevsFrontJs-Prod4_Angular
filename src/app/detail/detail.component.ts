import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ViajeService } from '../viaje/viaje.service';

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

  constructor(private viajeService: ViajeService) {
    this.editForm = new FormGroup({
      nombre: new FormControl(''),
      ciudad: new FormControl(''),
      alojamiento: new FormControl(''),
      dia: new FormControl(''),
      //actividades: new FormControl(this.viaje.actividades),
      descripcion: new FormControl(''),
      //video: new FormControl(this.viaje.video),
      //imagen: new FormControl(this.viaje.imagen),
    });
  }

  ngOnInit(): void {
    if(this.viaje) {
      this.editForm = new FormGroup({
        nombre: new FormControl(this.viaje.nombre),
        ciudad: new FormControl(this.viaje.ciudad),
        alojamiento: new FormControl(this.viaje.alojamiento),
        dia: new FormControl(this.viaje.dia),
        //actividades: new FormControl(this.viaje.actividades),
        descripcion: new FormControl(this.viaje.descripcion),
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
      console.log('Viaje actualizado con éxito');
    } catch (error) {
      console.error('Error al actualizar el viaje: ', error);
    }
  }
  
}
