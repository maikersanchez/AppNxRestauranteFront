import { CurrencyPipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbCalendar, NgbDate, NgbDateAdapter, NgbDateStruct, NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of, Subject } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs/operators';
import { DetalleFacturaModel } from 'src/app/model/DetalleFactura';
import { CamareroWsService } from 'src/app/services/camarero-ws.service';
import { ClienteWsService } from 'src/app/services/cliente-ws.service';
import { CocineroWsService } from 'src/app/services/cocinero-ws.service';
import { MesaWsService } from 'src/app/services/mesa-ws.service';
import { FacturaModel } from '../../../model/Factura';
import { FacturaWsService } from '../../../services/factura-ws.service';

@Component({
  selector: 'app-registrar-factura',
  templateUrl: './registrar-factura.component.html',
  styleUrls: ['./registrar-factura.component.css']
})
export class RegistrarFacturaComponent implements OnInit {
  @ViewChild('instance', { static: true }) instance: NgbTypeahead;

  formFactura: FormGroup;
  formDetalleFactura: FormGroup;
  submitted = false;
  submittedDetalle = false;
  titulo = "Factura";
  subtitulo = "Aquí puedes registrar tus facturas";

  mensajeSuccess;
  mensajeStantard;
  mensajeDanger;


  //cliente
  modelCliente: any;
  modelNombreCliente = "";
  searchingCliente = false;
  searchFailedCliente = false;
  seleccionoCliente: string;
  clickCliente$ = new Subject<string>();
  focusCliente$ = new Subject<string>();

  //camarero
  modelCamarero: any;
  modelNombreCamarero: string;
  searchingCamarero = false;
  searchFailedCamarero = false;
  seleccionoCamarero: string;
  clickCamarero$ = new Subject<string>();
  focusCamarero$ = new Subject<string>();

  //Mesa
  modelMesa: any;
  searchingMesa = false;
  searchFailedMesa = false;
  seleccionoMesa: string;

  //cocinero
  modelCocinero: any;
  modelNombreCocinero: string;
  searchingCocinero = false;
  searchFailedCocinero = false;
  seleccionoCocinero: string;
  clickCocinero$ = new Subject<string>();
  focusCocinero$ = new Subject<string>();

  listDetalleFactura: DetalleFacturaModel[] = [];
  isEditDetalleFactura = false;
  DetalleFacturaIndex;

  page = 1;
  pageSize = 4;
  collectionSize = 10;
  collectionDetalleFactura: DetalleFacturaModel[] = [];

  //fecha de la factura
  modelFFactura;
  disabledFFactura = true;
  placement = 'bottom';

  constructor(private fb: FormBuilder, private fbD: FormBuilder, private facturaWs: FacturaWsService,
   private clienteWs: ClienteWsService, private cocineroWs: CocineroWsService, private camareroWs: CamareroWsService, 
   private mesaWs: MesaWsService, private currencyPipe: CurrencyPipe, private ngbCalendar: NgbCalendar, private dateAdapter: NgbDateAdapter<string>) { }



  ngOnInit() {
    this.listDetalleFactura = [];
    this.formFactura = this.fb.group({
      IdCliente: ['', Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(20)])],
      IdMesa: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(50)])],
      IdCamarero: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(50)])],
      //FFactura: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(50)])],
      FFactura: ['', Validators.compose([Validators.nullValidator])],
      vClienteNombre: ['', Validators.compose([Validators.nullValidator])],
      vCamareroNombre: ['', Validators.compose([Validators.nullValidator])]
    });

    this.formDetalleFactura = this.fbD.group({
      IdCocinero: ['', Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(20)])],
      DImporte: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(50)])],
      VPlato: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(20)])],
      vNombreCocinero: ['', Validators.compose([Validators.nullValidator])],
    });

    this.focusCliente$.subscribe(dato => {
      if (dato == undefined || dato == "")
        return;

      this.clienteWs.obtenerCliente(dato).subscribe(res => {
        console.log(res.objeto);
        if (res.objeto != undefined) {
          this.modelNombreCliente = res.objeto['vNombre'] + " " + res.objeto['vApellido1'] + " " + res.objeto['vApellido2'];
          console.log(this.modelNombreCliente);
        }

      }, error => {

      })
    });

    this.focusCamarero$.subscribe(dato => {
      if (dato == undefined || dato == "")
        return;

      this.camareroWs.obtenerCamarero(dato).subscribe(res => {
        console.log(res.objeto);
        if (res.objeto != undefined) {
          this.modelNombreCamarero = res.objeto['vNombre'] + " " + res.objeto['vApellido1'] + " " + res.objeto['vApellido2'];
          console.log(this.modelNombreCamarero);
        }

      }, error => {

      })
    });

    this.focusCocinero$.subscribe(dato => {
      if (dato == undefined || dato == "")
        return;

      this.cocineroWs.obtenerCocinero(dato).subscribe(res => {
        console.log(res.objeto);
        if (res.objeto != undefined) {
          this.modelNombreCocinero = res.objeto['vNombre'] + " " + res.objeto['vApellido1'] + " " + res.objeto['vApellido2'];
          console.log(this.modelNombreCocinero);
        }

      }, error => {

      })
    });

    this.modelFFactura = this.dataFecha();
  }

  get f() { return this.formFactura.controls; }

  get fd() { return this.formDetalleFactura.controls; }

  send() {
    this.submitted = true;

    if (this.formFactura.invalid) {
      return;
    }
    if(this.listDetalleFactura.length > 0){
      let factura = this.formFactura.value as FacturaModel;
      factura.TDetalleFactura = [...this.listDetalleFactura];
      factura.FFactura = new Date(); 
      this.facturaWs.registrarFactura(factura).subscribe(res => {
        this.mensajeSuccess = res.respuesta
        this.formFactura.reset();
        this.listDetalleFactura = [];
        this.refreshList()
      }, error => {
        this.mensajeDanger = error['respuesta'];
      });;
    }
    else{
      this.mensajeDanger = "Debes ingresar platos";
    }
    
    
  }

  guardarDetalleFactura() {
    let detalleFactura = this.formDetalleFactura.value as DetalleFacturaModel;
    if (!this.isEditDetalleFactura) {
      console.log(detalleFactura);
      this.listDetalleFactura.push(detalleFactura);
    }
    else {
      this.listDetalleFactura = this.actualizarListDetalle(detalleFactura);
      this.DetalleFacturaIndex = undefined;
      this.isEditDetalleFactura = false;
    }

    this.formDetalleFactura.reset();
    this.refreshList();
  }

  editDetalleFactura(detalle: DetalleFacturaModel, index) {

    this.isEditDetalleFactura = true;
    this.DetalleFacturaIndex = index;
    this.formDetalleFactura.controls.DImporte.setValue(detalle.DImporte);
    this.formDetalleFactura.controls.vNombreCocinero.setValue(detalle["vNombreCocinero"]);
    this.formDetalleFactura.controls.IdCocinero.setValue(detalle.IdCocinero);
    this.formDetalleFactura.controls.VPlato.setValue(detalle.VPlato);
  }

  cancelarDetalleFactura() {
    this.DetalleFacturaIndex = undefined;
    this.isEditDetalleFactura = false;
    this.formDetalleFactura.reset();
  }

  actualizarListDetalle(detalleFacttura) {
    return [...this.listDetalleFactura.slice(0, this.DetalleFacturaIndex), { ...detalleFacttura }]
  }

  borrarListDetalle(index) {
    this.listDetalleFactura.splice(index, 1);
    this.refreshList();
  }

  buscarCliente = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(() => this.searchingCliente = true),
      switchMap(term =>
        this.clienteWs.autocompleteCliente(term)
          .pipe(
            tap(() => {
              return this.searchingCliente = false;
            }),
            catchError(() => {
              this.searchingCliente = true;
              return of([]);
            }))
      ),
      tap(() => this.searchingCliente = false)
    );

  buscarCamarero = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(() => this.searchingCamarero = true),
      switchMap(term =>
        this.camareroWs.autocompleteCamarero(term)
          .pipe(
            tap(() => {
              return this.searchingCamarero = false;
            }),
            catchError(() => {
              this.searchingCamarero = true;
              return of([]);
            }))
      ),
      tap(() => this.searchingCamarero = false)
    );


    buscarMesa = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(() => this.searchingCocinero = true),
      switchMap(term =>
        this.mesaWs.autocompleteMesa(term)
          .pipe(
            tap(() => {
              return this.searchingCocinero = false;
            }),
            catchError(() => {
              this.searchingCocinero = true;
              return of([]);
            }))
      ),
      tap(() => this.searchingCocinero = false)
    );

  buscarCocinero = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(() => this.searchingCocinero = true),
      switchMap(term =>
        this.cocineroWs.autocompleteCocinero(term)
          .pipe(
            tap(() => {
              return this.searchingCocinero = false;
            }),
            catchError(() => {
              this.searchingCocinero = true;
              return of([]);
            }))
      ),
      tap(() => this.searchingCocinero = false)
    );

  formatMoney(value: any) {
    const temp = `${value}`.replace(/\,/g, "");
    return this.currencyPipe.transform(temp).replace("$", "");
  }

  transformTotal() {
    const value = this.formDetalleFactura.get('DImporte').value;
    this.formDetalleFactura.controls.DImporte.setValue(
      this.formatMoney(value),
      { emitEvent: false }
    );
  }

  soloNumerosInput(event) {
    let charCode = (event.which) ? event.which : event.keyCode;
    if (charCode != 46 && charCode > 31
      && (charCode < 48 || charCode > 57))
      return false;
    return true;
  }

  refreshList() {
    this.collectionSize = this.listDetalleFactura.length;
    this.collectionDetalleFactura = this.listDetalleFactura.map((detalle, i) => ({id: i + 1, ...detalle}))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

  dataFecha(){
    return this.dateAdapter.toModel(this.ngbCalendar.getToday());
  }

}