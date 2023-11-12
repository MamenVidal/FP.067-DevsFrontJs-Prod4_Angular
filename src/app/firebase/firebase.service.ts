import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { doc, updateDoc, deleteField } from "firebase/firestore";

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private collection = 'MiViaje';

  constructor(private firestore: AngularFirestore) {}

  eliminarViaje(id: string): void {
    
  }
}
