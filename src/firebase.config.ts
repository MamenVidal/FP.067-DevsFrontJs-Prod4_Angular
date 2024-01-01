import firebase from 'firebase/compat/app';
import { environment } from './environments/environment'
import 'firebase/compat/messaging';

firebase.initializeApp(environment.firebase);
export const messaging = firebase.messaging();