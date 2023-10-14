import { Component, OnInit } from '@angular/core';
import { ViajeService } from '../viaje/viaje.service';
import { ViajeData } from '../viaje/viaje-data';

@Component({
  selector: 'app-tabla-viaje',
  templateUrl: './tabla-viaje.component.html',
  styleUrls: ['./tabla-viaje.component.css']
})
export class TablaViajeComponent implements OnInit {

  viajes: any[] = [];
  filtroDia: string = '';
  filtroCiudad: string = '';

  constructor(private viajeService: ViajeService) { }
  viajeData: ViajeData | undefined;

  ngOnInit(): void {
    this.viajeService.getViaje().subscribe(data => {
      this.viajes = data.MiViaje;
    });
  }

  filtrarViajes() {
    return this.viajes.filter(v => {
      return v.dia.toLowerCase().includes(this.filtroDia.toLowerCase()) &&
             v.ciudad.toLowerCase().includes(this.filtroCiudad.toLowerCase());
    });
  }
}
