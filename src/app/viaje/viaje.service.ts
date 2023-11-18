import { Injectable } from '@angular/core';
import {
  Firestore,
  collectionData,
  collection,
  query,
  orderBy,
  deleteDoc,
  getFirestore,
  doc,
  where,
  getDocs,
  addDoc,
  setDoc,
  DocumentReference,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DiaViaje } from './viaje-data';
import { Storage, UploadTask, ref, uploadBytesResumable, uploadBytes, getDownloadURL, getStorage } from '@angular/fire/storage';


@Injectable({
  providedIn: 'root',
})
export class ViajeService {
  item$: Observable<DiaViaje[]>;
  items: DiaViaje[] = [];
  storage: Storage;
  basepath = '/uploads';

  constructor(public firestore: Firestore, storage: Storage) {
    // Obtenemos nuestra colección de viajes desde firebase
    const itemCollection = collection(this.firestore, 'MiViaje');
    this.storage = storage;

    // Usamos la consulta en collectionData, aplicando la ordenación por el campo deseado (por ejemplo, 'codigo')
    const resultados = collectionData(
      query(itemCollection, orderBy('codigo')),
      { idField: 'id' }
    );

    // Mapeamos los campos de cada viaje a nuestra interfaz DiaViaje
    this.item$ = resultados.pipe(
      map((items) =>
        items.map((item) => {
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
            imagen: data.imagen,
          } as DiaViaje;
        })
      )
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
      if (id > 10) {
        // TODO Eliminaremos esta comprobación al subir el proyecto a producción
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

  async addViaje(nuevoViaje: DiaViaje): Promise<boolean> {
    const viajeCollectionRef = collection(this.firestore, 'MiViaje');
    try {
      const viajeCollectionRef = collection(this.firestore, 'MiViaje');

      const nuevoViajeDocRef = await addDoc(viajeCollectionRef, {
        // El id se genera solo
        codigo: nuevoViaje.codigo,
        dia: nuevoViaje.dia,
        nombre: nuevoViaje.nombre,
        ciudad: nuevoViaje.ciudad,
        alojamiento: nuevoViaje.alojamiento,
        actividades: nuevoViaje.actividades,
        descripcion: nuevoViaje.descripcion,
        video: nuevoViaje.video,
        imagen: nuevoViaje.imagen,
      });
      console.log(
        'Nuevo viaje agregado exitosamente en Firebase con ID:',
        nuevoViajeDocRef.id
      );
      return true;
    } catch (error) {
      console.error('Error al agregar el nuevo viaje en Firebase: ', error);
      return false;
    }
  }

  async addViaje2(nuevoViaje: DiaViaje): Promise<DocumentReference> {
    const viajeCollectionRef = collection(this.firestore, 'MiViaje');
    const nuevoViajeDocRef = await addDoc(viajeCollectionRef, {
      // El id se genera solo
      codigo: nuevoViaje.codigo,
      dia: nuevoViaje.dia,
      nombre: nuevoViaje.nombre,
      ciudad: nuevoViaje.ciudad,
      alojamiento: nuevoViaje.alojamiento,
      actividades: nuevoViaje.actividades,
      descripcion: nuevoViaje.descripcion,
      video: nuevoViaje.video,
      imagen: nuevoViaje.imagen,
    });
    console.log(
      'Nuevo viaje agregado exitosamente en Firebase con ID:',
      nuevoViajeDocRef.id
    );
    return nuevoViajeDocRef;

  }

  actualizaViaje(id: string, data: DiaViaje) {
    const viajeDocRef = doc(this.firestore, 'MiViaje', id);
    setDoc(viajeDocRef, data, { merge: true });
  }

  onFileChange(event: any): Promise<string> {
    return new Promise((resolve, reject) => {
      if (event.target.files.length > 0) {
        const file = event.target.files[0];
        const filePath = `uploads/${file.name}`;
  
        if (file.size > 52428800) { // 50MB
          reject('File is too large!');
        } else {
          try {
            const storageRef = ref(this.storage, filePath);
            const uploadTask = uploadBytes(storageRef, file);
  
            uploadTask.then((snapshot) => {
              getDownloadURL(snapshot.ref).then((url) => {
                console.log(`Download URL: ${url}`);
                resolve(url);
              }).catch((error) => {
                reject(`Error getting download URL: ${error}`);
              });
            }).catch((error) => {
              reject(`Error uploading file: ${error}`);
            });
          } catch (e) {
            reject(`Error: ${e}`);
          }
        }
      } else {
        reject('No file selected');
      }
    });
  }
  

}
