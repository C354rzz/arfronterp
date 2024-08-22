import { HttpClient } from '@angular/common/http';
import { Component, ViewChild, OnInit} from '@angular/core';
import { TableData } from './data';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';
import { ClienteService } from 'src/app/service/app-cliente.service';
import { Cliente } from 'src/app/models/cliente';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})

export class ClientesComponent implements OnInit {
  clientestemp: Cliente[] = [];
  clientes: any;
  code1: any;
  columns = [
    { prop: 'name' }, 
    { name: 'position' }, 
    { name: 'office' },
    { name: 'ext' },
    { name: 'startDate' }, 
    { name: 'salary' }
  ];

  constructor(private clienteService: ClienteService, private http: HttpClient) { 
    this.fetch((data:any) =>{
      this.clientestemp =[...data]
      this.clientes = data;
    })
  }
  
  ngOnInit(): void {
	}	
  	

  @ViewChild(DatatableComponent) table!: DatatableComponent;

  ColumnMode = ColumnMode;

  fetch(cb: any) {
    const req = new XMLHttpRequest();
    req.open('GET', `assets/data/clientes.json`);

    req.onload = () => {
      cb(JSON.parse(req.response));
    };

    req.send();
  }

  updateFilter(event: any) {
    const val = event.target.value.toLowerCase();

    // filtro de clientes
    const temp = this.clientestemp.filter(function (d: any) {
      return d.name.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // actualiza clientes
    this.clientes = temp;

    // siempre que el filtro cambie regresa a la pagina 0
    this.table.offset = 0;
  }
}
