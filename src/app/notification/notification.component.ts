import { Component, OnInit } from '@angular/core';
import { messaging } from '../../firebase.config';
import { environment } from '../../environments/environment';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [],
  template: `<div class="container"><div class="row text-center h3"><p>¡Notificaciones funcionando!</p></div></div>`,
  styleUrls:['./notification.component.css'],
})
export class NotificationComponent implements OnInit {

  
  private notifier: NotifierService;
  constructor(notifier: NotifierService) {
    this.notifier = notifier;
  }


  ngOnInit(): void {
    this.requestPermission();
    this.listen();
  }

  requestPermission() {
    messaging.getToken({vapidKey: environment.firebase.vapidKey})
      .then((currentToken) => {
        if (currentToken) {
          console.log(currentToken);
        } else {
          console.log('No registration token available. Request permission to generate one.');
        }
      }).catch((err) => {
        console.log(err);
      });
  }
  

  listen() {
    messaging.onMessage((incomingMessage) => {
      console.log(incomingMessage);
      this.notifier.notify('success',  incomingMessage.notification?.title || 'Notification Title');
    })
  }
}
