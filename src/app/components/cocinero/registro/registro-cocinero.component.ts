import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CocineroModel } from 'src/app/model/Cocinero';
import { CocineroWsService } from 'src/app/services/cocinero-ws.service';

@Component({
  selector: 'app-registro-cocinero',
  templateUrl: './registro-cocinero.component.html',
  styleUrls: ['./registro-cocinero.component.css']
})
export class RegistroCocineroComponent implements OnInit {
  formCocinero: FormGroup;
  submitted = false;
  titulo = "Cocinero";
  subtitulo = "Registro de cocinero";
  mensajeSuccess;
  mensajeStantard;
  mensajeDanger;

  constructor(private fb: FormBuilder, private cocinerooWs: CocineroWsService) { }

  ngOnInit() {
    this.formCocinero = this.fb.group({
      IdCocinero: ['', Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(20)])],
      VNombre: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(50)])],
      VApellido1: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(50)])],
      VApellido2: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(50)])],
    });
  }

  get f() { return this.formCocinero.controls; }

  send() {
    this.submitted = true;

    if (this.formCocinero.invalid) {
      return;
    }

    let cocinero = this.formCocinero.value as CocineroModel;
    this.cocinerooWs.registrarCocinero(cocinero).subscribe(res => {
      this.mensajeSuccess = res.respuesta
      this.formCocinero.reset();
    }, error => {
      this.mensajeDanger = error['respuesta'];
    });
  }

}
