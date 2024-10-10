import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DatatableComponent, ColumnMode } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-paquetes',
  templateUrl: './paquetes.component.html',
  styleUrl: './paquetes.component.scss'
})
export class PaquetesComponent {

  paquetestemp: any = [];
  paquetes: any;
  loadingIndicator = true;

  constructor(private router: Router,) {
    this.fetch((data: any) => {
      this.paquetestemp = [...data]
      this.paquetes = data;
      console.log(this.paquetes)
      setTimeout(() => {
        this.loadingIndicator = false;
      }, 1500);
    })
  }

  
  @ViewChild(DatatableComponent) table!: DatatableComponent;
  
  ColumnMode = ColumnMode;
  
  fetch(cb: any) {
    const req = new XMLHttpRequest();
    req.open('GET', `assets/data/productos/paquetes.json`);
    
    req.onload = () => {
      cb(JSON.parse(req.response));
    };
    
    req.send();
  }


  updateFilter(event: any) {
    const val = event.target.value.toLowerCase();
    const temp = this.paquetestemp.filter(function (d: any) {
      return d.name.toLowerCase().indexOf(val) !== -1 || !val;
    });
    this.paquetes = temp;
    this.table.offset = 0;
  }

}
