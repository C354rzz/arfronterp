import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatatableComponent, ColumnMode } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrl: './empleados.component.scss'
})
export class EmpleadosComponent implements OnInit {
  idEmpleado: string | null | undefined;
  empleados: any = [];
  empleadosfilter: any = [];
  
  loadingIndicator = true;
  
  constructor(private route: ActivatedRoute){
    fetch('assets/data/Empleados.json')
    .then(response => response.json())
    .then(data => {
      this.empleados = data;
      this.empleadosfilter = [...data] 
    })
    .catch(error => console.error('Error al cargar las empleados:', error));
  }
  
  ngOnInit(): void {
  }
  
  
  @ViewChild(DatatableComponent) table!: DatatableComponent;
  
  ColumnMode = ColumnMode;
  
  updateFilter(event: any) {
    const val = event.target.value.toLowerCase();
    const temp = this.empleadosfilter.filter(function (d: any) {
      return d.Nombres.toLowerCase().indexOf(val) !== -1 || !val;
    });
    this.empleados = temp;
    this.table.offset = 0;
  }
  
  editEmpleado(_t99: any) {
    console.log(_t99);
  }

  delete(_t99: any) {
    console.log(_t99);
  }

}
