import { ChangeDetectorRef, Component, OnInit, ViewChild, inject } from '@angular/core';
import { ViajeService } from '../viaje/viaje.service';
import { DiaViaje } from '../viaje/viaje-data';
import { DetailComponent } from '../detail/detail.component';
import { NotifierService } from 'angular-notifier';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { DocumentReference } from 'firebase/firestore';
import * as uuid from 'uuid';


@Component({
  selector: 'app-days',
  templateUrl: './days.component.html',
  styleUrls: ['./days.component.css'],
})
export class DaysComponent implements OnInit {
  viajes: any[] = [];
  filtroDia: string = '';
  filtroCiudad: string = '';
  detalleViaje: any | null = null;
  viajeData: DiaViaje[] | undefined;
  formularioViaje: FormGroup;

  // Añadir ViewChild para obtener referencia a DetailComponent
  @ViewChild(DetailComponent)
  modal!: DetailComponent;

  constructor(
    private viajeService: ViajeService,
    private notifier: NotifierService,
    private formBuilder: FormBuilder,
    private cdr: ChangeDetectorRef
  ) {
    this.notifier = notifier;
    this.formularioViaje = this.formBuilder.group({
      codigo: '',
      dia: '',
      nombre: '',
      ciudad: '',
      alojamiento: '',
      actividades: '',
      descripcion: '',
      video: '',
      imagen: '',
    });
  }

  ngOnInit(): void {
    this.viajeService.getViaje().subscribe((data) => {
      this.viajes = data;
    });
  }

  refresh() {
    this.cdr.detectChanges();
  }

  filtrarViajes() {
    return this.viajes.filter((v) => {
      return (
        this.normalizeStr(v.dia).includes(this.normalizeStr(this.filtroDia)) &&
        this.normalizeStr(v.ciudad).includes(
          this.normalizeStr(this.filtroCiudad)
        )
      );
    });
  }

  normalizeStr(data: string | null | undefined): string {
    if (data == null || data === undefined) {
      return '';
    }
    return data
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase();
  }

  openModal(componentId: String, viaje: any) {
    this.modal?.openModal(componentId, viaje);
  }

  mostrarNotificacion(tipo: string, mensaje: string): void {
    this.notifier.notify(tipo, mensaje);
  }

  eliminarViaje(viaje: any) {
    const index = this.viajes.indexOf(viaje);
    if (index !== -1) {
      const id = viaje.codigo;
      // Eliminar en Firebase
      this.viajeService
        .eliminaViaje(viaje)
        .then((resultado: boolean) => {
          if (resultado) {
            // Eliminar localmente
            this.mostrarNotificacion(
              'success',
              'Elemento eliminado correctamente'
            );
            //this.viajes.splice(index, 1);
          } else {
            if (viaje.codigo > 10) {
              // TODO Eliminaremos esta comprobación al subir el proyecto a producción
              this.mostrarNotificacion(
                'error',
                'Error al eliminar el elemento'
              );
            } else {
              this.mostrarNotificacion(
                'error',
                'De momento no permitimos borrar elementos del 1 al 10'
              );
            }
          }
        })
        .catch((error: any) => {
          this.mostrarNotificacion(
            'error',
            'Error inesperado al eliminar el elemento'
          );
          console.error('Error inesperado: ', error);
        });
    }
    this.refresh();
  }

  getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
  }

  addViajeButton() {
    const newViaje: DiaViaje = {
      id: uuid.v4(),
      codigo: this.getRandomInt(100000),
      dia: '',
      nombre: '',
      ciudad: '',
      alojamiento: '',
      actividades: [],
      descripcion: '',
      video: '',
      imagen: ''
    };
    this.viajes.push(newViaje);
    this.detalleViaje = newViaje;
    this.refresh();
    this.openModal('daysId', newViaje);
    //

    /*
    this.viajeService
      .addViaje2(newViaje)
      .then((resultado: DocumentReference) => {
        if (resultado) {
          this.mostrarNotificacion('success', 'Elemento añadido correctamente');
          //this.viajes.push(newViaje);
          console.log(newViaje);
          const newId = resultado.id;
          //this.refresh();
          console.log(newViaje);
          this.openModal('daysId', newViaje);
        } else {
          this.mostrarNotificacion('error', 'Error al añadir el elemento');
        }
      })
      .catch((error: any) => {
        this.mostrarNotificacion(
          'error',
          'Error inesperado al añadir el elemento'
        );
        console.error('Error inesperado: ', error);
      });
      */
  }

  addViaje(nuevoViaje: DiaViaje) {
    this.viajeService
      .addViaje(nuevoViaje)
      .then((resultado: boolean) => {
        if (resultado) {
          this.mostrarNotificacion('success', 'Elemento añadido correctamente');
          this.viajes.push(nuevoViaje);
        } else {
          this.mostrarNotificacion('error', 'Error al añadir el elemento');
        }
      })
      .catch((error: any) => {
        this.mostrarNotificacion(
          'error',
          'Error inesperado al añadir el elemento'
        );
        console.error('Error inesperado: ', error);
      });
  }

  // Método para manejar la acción de envío del formulario
  onSubmit() {
    if (this.formularioViaje.valid) {
      const nuevoViaje: DiaViaje = this.formularioViaje.value;
      this.addViaje(nuevoViaje);
      // Puedes hacer otras acciones después de agregar el viaje si es necesario
    } else {
      // Manejo de errores o notificaciones si el formulario no es válido
    }
  }
}
