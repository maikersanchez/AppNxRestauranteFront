import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClienteModel } from '../../../model/Cliente';
import { ClienteWsService } from '../../../services/cliente-ws.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  formCliente: FormGroup;
  submitted = false;
  titulo = "Clientes";
  subtitulo = "Registro de clientes";
  mensajeSuccess;
  mensajeStantard;
  mensajeDanger;

  constructor(private fb: FormBuilder, private clienteWs: ClienteWsService) { }

  ngOnInit() {
    this.formCliente = this.fb.group({
      IdCliente: ['', Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(20)])],
      VNombre: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(50)])],
      VApellido1: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(50)])],
      VApellido2: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(50)])],
      VObservacion: ['', Validators.compose([Validators.nullValidator])]
    });
  }

  get f() { return this.formCliente.controls; }

  send() {
    this.submitted = true;

    if (this.formCliente.invalid) {
      return;
    }

    let cliente = this.formCliente.value as ClienteModel;
    this.clienteWs.registrarCliente(cliente).subscribe(res => {
      this.mensajeSuccess = res.respuesta
      this.formCliente.reset();
    }, error => {
      this.mensajeDanger = error['respuesta'];
    });
  }

}
