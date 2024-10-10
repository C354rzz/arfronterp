import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatatableComponent, ColumnMode } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrl: './ventas.component.scss'
})
export class VentasComponent implements OnInit {
 
  ventas: any = [];
  ventasfilter: any = [];

  loadingIndicator = true;

  constructor (private _route: ActivatedRoute) {
    fetch('assets/data/ventas/ventas/Ventas.json')
    .then(response => response.json())
    .then(data => {
      this.ventas = data;
      this.ventasfilter = [...data]
    })
    .catch(error => console.error('Error al cargar las Ventas:', error));
   }

  ngOnInit(): void {
  }

  @ViewChild(DatatableComponent) table!: DatatableComponent;
  
  ColumnMode = ColumnMode;

  updateFilter(event: any) {
    const val = event.target.value.toLowerCase();
    const temp = this.ventasfilter.filter(function (d: any) {
      return d.Contacto.toLowerCase().indexOf(val) !== -1 || !val;
    });
    this.ventas = temp;
    this.table.offset = 0;
  }

}
