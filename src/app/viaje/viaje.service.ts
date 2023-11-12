import { Injectable } from '@angular/core';
import { Firestore, collectionData, collection, query, orderBy } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DiaViaje } from './viaje-data';


@Injectable({
  providedIn: 'root'
})
export class ViajeService {
  
  item$: Observable<DiaViaje[]>;
  items: DiaViaje[] = [];
  
  constructor( public firestore: Firestore ) {
    // Obtenemos nuestra colección de viajes desde firebase
    const itemCollection = collection(this.firestore, 'MiViaje');

    // Usamos la consulta en collectionData, aplicando la ordenación por el campo deseado (por ejemplo, 'id')
    const resultados = collectionData(query(itemCollection, orderBy('id')), { idField: 'id' });

    // Mapeamos los campos de cada viaje a nuestra interfaz DiaViaje
    this.item$ = resultados.pipe(
        map(items => items.map(item => {
          const data = item as any;
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
