import { Component, ViewChild, OnInit } from '@angular/core';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';
import { Cliente } from 'src/app/models/cliente';
import { Router } from '@angular/router';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})

export class ClientesComponent implements OnInit {

  clientestemp: Cliente[] = [];
  clientes: any;
  code1: any;
  
  loadingIndicator = true;
  
  constructor(private router: Router,) {
    this.fetch((data: any) => {
      this.clientestemp = [...data]
      this.clientes = data;
      
      setTimeout(() => {
        this.loadingIndicator = false;
      }, 1500);
    })
  }
  
  ngOnInit(): void {
  }
  
  viewDetailcliente(arg0: any) {
    this.router.navigate(['/clientes/clientedetalle'+ arg0])
    console.log(arg0);
  }
  
  @ViewChild(DatatableComponent) table!: DatatableComponent;
  
  ColumnMode = ColumnMode;
  
  fetch(cb: any) {
    const req = new XMLHttpRequest();
    req.open('GET', `assets/data/clientes01.json`);
    
    req.onload = () => {
      cb(JSON.parse(req.response));
    };
    
    req.send();
  }

  updateFilter(event: any) {
    const val = event.target.value.toLowerCase();
    const temp = this.clientestemp.filter(function (d: any) {
      return d.name.toLowerCase().indexOf(val) !== -1 || !val;
    });
    this.clientes = temp;
    this.table.offset = 0;
  }


}
