import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class modalComponent implements OnInit {
  @Input() detallesViaje: any;

  constructor() {}

  ngOnInit(): void {}

  openModal() {
    console.log('Abriendo el modal'); 
    const modal = document.querySelector('.modal');
    modal?.classList.add('show');
    modal?.setAttribute('style', 'display: flex');
  }

  closeModal() {
    console.log('Cerrando el modal');
    const modal = document.querySelector('.modal');
    modal?.classList.remove('show');
    // modal?.removeAttribute('style');
    modal?.setAttribute('style', 'display: none');
  }
}
