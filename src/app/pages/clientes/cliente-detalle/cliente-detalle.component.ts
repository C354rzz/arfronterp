import { Component, OnInit, ViewChild } from '@angular/core';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';
import { ActivatedRoute} from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-cliente-detalle',
  templateUrl: './cliente-detalle.component.html',
  styleUrl: './cliente-detalle.component.scss'
})

export class ClienteDetalleComponent implements OnInit{

  uidCliente: string | null | undefined;
  topCotizaciones: any;
  topVentas: any;
  topEnvios: any;

  direccionForm: FormGroup | undefined;
  estados?: any;
  municipios?: any;
  codigosPostales?: any;
  colonias?: any;

  loadingIndicator = true;

  constructor(private route: ActivatedRoute, private http: HttpClient) {
    fetch('assets/data/ventas/cotizaciones/Cotizaciones.json')
      .then(response => response.json())
      .then(data => {
        this.topCotizaciones = data; // Asignar el resultado a la variable
      })
      .catch(error => console.error('Error al cargar las cotizaciones:', error));

    fetch('assets/data/ventas/ventas/Ventas.json')
      .then(response => response.json())
      .then(data => {
        this.topVentas = data; // Asignar el resultado a la variable
      })
      .catch(error => console.error('Error al cargar las ventas:', error));
  }

  ngOnInit(): void{
    this.uidCliente = this.route.snapshot.paramMap.get('uidCliente')  
    
    this.direccionForm = new FormGroup({
      estado: new FormControl('', Validators.required),
      municipio: new FormControl('', Validators.required),
      codigoPostal: new FormControl('', Validators.required),
      colonia: new FormControl('', Validators.required)
    });

    this.cargarEstados();
  }

  @ViewChild(DatatableComponent) table!: DatatableComponent;
  
  ColumnMode = ColumnMode;

  cargarEstados(): void {
    this.http.get('https://api.example.com/estados')
      .subscribe(response => {
        this.estados = response;
      });
  }

  cargarMunicipios(estadoId: any): void {
    this.http.get(`https://api.example.com/municipios?estado=${estadoId}`)
      .subscribe(response => {
        this.municipios = response;
      });
  }

  cargarCodigosPostales(municipioId: any): void {
    this.http.get(`https://api.example.com/codigos-postales?municipio=${municipioId}`)
      .subscribe(response => {
        this.codigosPostales = response;
      });
  }

  cargarColonias(codigoPostalId: any): void {
    this.http.get(`https://api.example.com/colonias?codigo-postal=${codigoPostalId}`)
      .subscribe(response => {
        this.colonias = response;
      });
  }
}
