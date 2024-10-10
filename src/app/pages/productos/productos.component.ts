import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.scss'
})
export class ProductosComponent {

  productostemp: any =[];
  productos: any;
  loadingIndicator = true;

  constructor(private router: Router,) {
    this.fetch((data: any) => {
      this.productostemp = [...data]
      this.productos = data;
      console.log(this.productos)
      setTimeout(() => {
        this.loadingIndicator = false;
      }, 1500);
    })
  }
  
  @ViewChild(DatatableComponent) table!: DatatableComponent;
  ColumnMode = ColumnMode;

  fetch(cb: any) {
    const req = new XMLHttpRequest();
    req.open('GET', `assets/data/productos/productos.json`);
    
    req.onload = () => {
      cb(JSON.parse(req.response));
    };
    
    req.send();
  }


  updateFilter(event: any) {
    const val = event.target.value.toLowerCase();
    const temp = this.productostemp.filter(function (d: any) {
      return d.Descripcion.toLowerCase().indexOf(val) !== -1 || !val;
    });
    this.productos = temp;
    this.table.offset = 0;
  }
}
