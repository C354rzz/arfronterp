import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatatableComponent, ColumnMode } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-direcciones',
  templateUrl: './direcciones.component.html',
  styleUrl: './direcciones.component.scss'
})

export class DireccionesComponent implements OnInit{

  idCliente: string | null | undefined;
  direcciones: any = [];
  direccionesfilter: any = [];
  direccion: any;
  
  loadingIndicator = true;

  constructor(private route: ActivatedRoute){
    fetch('assets/data/Direcciones.json')
    .then(response => response.json())
    .then(data => {
      this.direcciones = data;
      this.direccionesfilter = [...data] 
    })
    .catch(error => console.error('Error al cargar las direcciones:', error));

  }

  ngOnInit(): void {
    this.idCliente = this.route.snapshot.paramMap.get('idCliente')  
  }

  @ViewChild(DatatableComponent) table!: DatatableComponent;
  
  ColumnMode = ColumnMode;

  updateFilter(event: any) {
    const val = event.target.value.toLowerCase();
    const temp = this.direccionesfilter.filter(function (d: any) {
      return d.Contacto.toLowerCase().indexOf(val) !== -1 || !val;
    });
    this.direcciones = temp;
    this.table.offset = 0;
  }
}
