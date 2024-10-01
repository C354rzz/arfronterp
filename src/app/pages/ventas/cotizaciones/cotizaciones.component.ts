import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatatableComponent, ColumnMode } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-cotizaciones',
  templateUrl: './cotizaciones.component.html',
  styleUrl: './cotizaciones.component.scss'
})
export class CotizacionesComponent implements OnInit {

  
  cotizaciones: any = [];
  cotizacionesfilter: any = [];

  loadingIndicator = true;

  constructor (private _route: ActivatedRoute) {
    fetch('assets/data/ventas/cotizaciones/Cotizaciones.json')
    .then(response => response.json())
    .then(data => {
      this.cotizaciones = data;
      this.cotizacionesfilter = [...data]
    })
    .catch(error => console.error('Error al cargar las cotizaciones:', error));
   }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  @ViewChild(DatatableComponent) table!: DatatableComponent;
  
  ColumnMode = ColumnMode;

  updateFilter(event: any) {
    const val = event.target.value.toLowerCase();
    const temp = this.cotizacionesfilter.filter(function (d: any) {
      return d.Contacto.toLowerCase().indexOf(val) !== -1 || !val;
    });
    this.cotizaciones = temp;
    this.table.offset = 0;
  }

}
