import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MesaModel } from 'src/app/model/Mesa';
import { MesaWsService } from 'src/app/services/mesa-ws.service';

@Component({
  selector: 'app-registrar-mesa',
  templateUrl: './registrar-mesa.component.html',
  styleUrls: ['./registrar-mesa.component.css']
})
export class RegistrarMesaComponent implements OnInit {
  formMesa: FormGroup;
  submitted = false;
  titulo = "Mesa";
  subtitulo = "Registro de mesas";
  mensajeSuccess;
  mensajeStantard;
  mensajeDanger;

  constructor(private fb: FormBuilder, private mesaWs:MesaWsService) { }

  ngOnInit() {
    this.formMesa = this.fb.group({
      IdMesa: ['', Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(20)])],
      NMaxComensales: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(50)])],
      VUbicacion: ['', Validators.compose([Validators.nullValidator])],
    });

  }

  get f() { return this.formMesa.controls; }

  send() {
    this.submitted = true;

    if (this.formMesa.invalid) {
      return;
    }
    let mesa = this.formMesa.value as MesaModel;
    this.mesaWs.registrarMesa(mesa).subscribe(res => {
      this.mensajeSuccess = res.respuesta
      this.formMesa.reset();
    }, error => {
      this.mensajeDanger = error['respuesta'];
    });
  }

}
