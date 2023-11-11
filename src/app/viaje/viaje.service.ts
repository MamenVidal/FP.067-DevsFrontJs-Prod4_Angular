import { Injectable } from '@angular/core';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DiaViaje } from './viaje-data';

@Injectable({
  providedIn: 'root'
})
export class ViajeService {
  
  item$: Observable<DiaViaje[]>;
  items: DiaViaje[] = [];
  
  constructor(
    public firestore: Firestore
  ) {
    // obtenemos nuestra colección de viajes desde firebase
    const itemCollection = collection(this.firestore, 'MiViaje');
    // mapeamos los campos de cada viaje a nuestra interfaz DiaViaje
    this.item$ = collectionData(itemCollection, { idField: 'id' })
      .pipe(
        map(items => items.map(item => {
          const data = item as any; // Cast to any temporarily
          return {
            id: data.id,
            dia: data.dia,
            nombre: data.nombre,
            ciudad: data.ciudad,
            alojamiento: data.alojamiento,
            actividades: data.actividades,
            descripcion: data.descripcion,
            video: data.video,
            imagen: data.imagen
          } as DiaViaje;
        }))
      );
  }

  /*
  * modificamos getViaje para que sea Observable de DiaViaje[]
  * ViajeData deprecado, es reemplazado por DiaViaje[] en todos los componentes
  * !TODO eliminar archivo assets/database/db.json
  */
  getViaje(): Observable<DiaViaje[]> {
    return this.item$;
  }

}
