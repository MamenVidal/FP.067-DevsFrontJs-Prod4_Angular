import { Component, OnInit } from '@angular/core';
import { ViajeService } from './viaje/viaje.service';
import { ViajeData } from './viaje/viaje-data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'FP.067-DevsFrontJs-Prod1';
  
  constructor(private viajeService: ViajeService) {}
  viajeData: ViajeData | undefined;

  ngOnInit(): void {
    this.viajeService.getViaje().subscribe(data => {
      this.viajeData = data;
    });
  }
}
