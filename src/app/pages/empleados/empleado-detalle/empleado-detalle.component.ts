import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-empleado-detalle',
  standalone: true,
  imports: [],
  templateUrl: './empleado-detalle.component.html',
  styleUrl: './empleado-detalle.component.scss'
})
export class EmpleadoDetalleComponent implements OnInit{
  
  uidEmpleado: string | null | undefined;

  constructor(private route: ActivatedRoute){
  }
  
  ngOnInit(): void {
    this.uidEmpleado = this.route.snapshot.paramMap.get('uidEmpleado');
  }


}
