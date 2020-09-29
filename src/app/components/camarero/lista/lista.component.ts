import { Component, Input, OnInit, Output } from '@angular/core';
import { ClienteModel } from '../../../model/Cliente';
import { RespuestaModel } from '../../../model/Respuesta';
import { ClienteWsService } from '../../../services/cliente-ws.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit {

  constructor(private wsCliente: ClienteWsService) { }

  @Input() listClientes : ClienteModel[];
  @Output() selectCliente: ClienteModel;
  titulo = "Clientes";
  subtitulo = "Listado de clientes";
  respuesta:RespuestaModel;
  loading = true;

  ngOnInit() {
    // this.listClientes = [];
    // this.respuesta = this.wsCliente.obtenerTodos();
    // this.listClientes = this.respuesta.objeto as ClienteModel[];
    this.loading = true;
    this.wsCliente.obtenerTodos2().subscribe( res => { 
      this.listClientes = res as ClienteModel[];
      this.loading = false;
    });
   
    // console.log(this.respuesta.objeto);
  }

  eliminarCliente(cliente:ClienteModel){
    this.selectCliente = cliente;
    alert(JSON.stringify(cliente));
  }

}
