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
  filtroFecha: string = '';
  filtroDia: string = '';
  filtroCiudad: string = '';
  detalleViaje: any | null = null;
  viajeData: DiaViaje[] | undefined;
  formularioViaje: FormGroup;
  ordenDias: string[] = [];

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
      fecha: '',
    });
  }

  ngOnInit(): void {
    this.viajeService.getViaje().subscribe((data) => {
      this.viajes = data.map((viaje) => ({
        ...viaje,
        fechaFormateada: this.formatFecha(viaje.fecha),
      }));
    });
  }

  refresh() {
    this.cdr.detectChanges();
  }

//   getIdDia(dia: string) {
//     if (dia === 'lunes') {  return '1'; }
//     if (dia === 'martes') {  return '2'; }
//     if (dia === 'miercoles') {  return '3'; }
//     if (dia === 'jueves') {  return '4'; }
//     if (dia === 'viernes') {  return '5'; }
//     if (dia === 'sabado') {  return '6'; }
//     if (dia === 'domingo') {  return '7'; } 
//     return '8'; 
// }

  filtrarViajes() {
    // Primero filtramos los viajes
    const viajesFiltrados = this.viajes.filter(v => {
        return this.normalizeStr(v.fecha).includes(this.normalizeStr(this.filtroFecha)) &&
               this.normalizeStr(v.dia).includes(this.normalizeStr(this.filtroDia)) &&
               this.normalizeStr(v.ciudad).includes(this.normalizeStr(this.filtroCiudad));
    });

    // Albert: Comento el orden siguiente para mantener el que viene por el collection
    // Luego, ordenamos los viajes filtrados
    // viajesFiltrados.sort((a, b) => {
    //     // Comparar días utilizando el mapeo
    //     const ordenDiaA = this.getIdDia(a.dia.toLowerCase());
    //     const ordenDiaB = this.getIdDia(b.dia.toLowerCase());
    //     if (ordenDiaA < ordenDiaB) return -1;
    //     if (ordenDiaA > ordenDiaB) return 1;

    //     // Si los días son iguales, ordenar por 'nombre' alfabéticamente
    //     return a.nombre.localeCompare(b.nombre);
    // });

    return viajesFiltrados;
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
            this.mostrarNotificacion('success', 'Elemento eliminado correctamente');
            //this.viajes.splice(index, 1);
          } else {
            if (viaje.codigo > 10) {
              // TODO Eliminaremos esta comprobación al subir el proyecto a producción
              this.mostrarNotificacion('error', 'Error al eliminar el elemento');
            } else {
              this.mostrarNotificacion('error', 'No permitimos borrar elementos del 1 al 10 ya que son los elementos iniciales de la aplicación');
            }
          }
        })
        .catch((error: any) => {
          this.mostrarNotificacion('error','Error inesperado al eliminar el elemento');
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
      imagen: '',
      fecha: ''
    };
    this.viajes.push(newViaje);
    this.detalleViaje = newViaje;
    this.refresh();
    this.openModal('daysId', newViaje);
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
    } else {
      // Manejo de errores o notificaciones si el formulario no es válido
    }
  }

  formatFecha(fechaStr: string): string {
    const fecha = new Date(fechaStr);
    return fecha.toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });
  }
}
