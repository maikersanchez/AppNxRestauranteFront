import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CamareroModel } from 'src/app/model/Camarero';
import { CamareroWsService } from 'src/app/services/camarero-ws.service';

@Component({
  selector: 'app-registro-camarero',
  templateUrl: './registro-camarero.component.html',
  styleUrls: ['./registro-camarero.component.css']
})
export class RegistroCamareroComponent implements OnInit {
  formCamarero: FormGroup;
  submitted = false;
  titulo = "Camarero";
  subtitulo = "Registro de camareros";
  mensajeSuccess;
  mensajeStantard;
  mensajeDanger;

  constructor(private fb: FormBuilder, private camareroWs: CamareroWsService) { }

  ngOnInit() {
    this.formCamarero = this.fb.group({
      IdCamarero: ['', Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(20)])],
      VNombre: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(50)])],
      VApellido1: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(50)])],
      VApellido2: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(50)])],
    });
  }

  get f() { return this.formCamarero.controls; }

  send() {
    this.submitted = true;

    if (this.formCamarero.invalid) {
      return;
    }

    let camarero = this.formCamarero.value as CamareroModel;
    this.camareroWs.registrarCamarero(camarero).subscribe(res => {
      this.mensajeSuccess = res.respuesta
      this.formCamarero.reset();
    }, error => {
      this.mensajeDanger = error['respuesta'];
    });
  }

}
