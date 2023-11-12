import { Injectable } from '@angular/core';
import { Firestore, collectionData, collection, query, orderBy, deleteDoc, getFirestore, doc, where, getDocs } from '@angular/fire/firestore';
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

    // Usamos la consulta en collectionData, aplicando la ordenación por el campo deseado (por ejemplo, 'codigo')
    const resultados = collectionData(query(itemCollection, orderBy('codigo')), { idField: 'id' });

    // Mapeamos los campos de cada viaje a nuestra interfaz DiaViaje
    this.item$ = resultados.pipe(
        map(items => items.map(item => {
          const data = item as any;
          return {
            id: data.id,
            codigo: data.codigo,
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

  async eliminaViaje(viaje: DiaViaje): Promise<boolean> {
    const id = viaje.codigo;
    const viajeCollectionRef = collection(this.firestore, 'MiViaje');
  
    try {
      if (id > 10) { // TODO Eliminaremos esta comprobación al subir el proyecto a producción
        // Consulta para obtener el documento basado en el campo y valor proporcionados
        const q = query(viajeCollectionRef, where('codigo', '==', id));
        const querySnapshot = await getDocs(q);
  
        for (const document of querySnapshot.docs) {
          const viajeDocRef = doc(this.firestore, 'MiViaje', document.id);
          // Elimina el documento correspondiente al código encontrado
          await deleteDoc(viajeDocRef);
          console.log('Documento eliminado exitosamente en Firebase');
        }
  
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error('Error al eliminar el documento en Firebase: ', error);
      return false;
    }
  }

}
