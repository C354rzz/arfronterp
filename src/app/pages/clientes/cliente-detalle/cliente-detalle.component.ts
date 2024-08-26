import { Component } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-cliente-detalle',
  standalone: true,
  imports: [],
  templateUrl: './cliente-detalle.component.html',
  styleUrl: './cliente-detalle.component.scss'
})
export class ClienteDetalleComponent {
  uidCliente: string | null | undefined;

  constructor(private route: ActivatedRoute){}

  ngOnInit(): void{
    this.uidCliente = this.route.snapshot.paramMap.get('uidCliente')  }

}
