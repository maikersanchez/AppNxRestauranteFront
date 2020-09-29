import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ReporteCamareroVentas } from 'src/app/model/ReporteCamarero';
import { ReporteCliente } from 'src/app/model/ReporteCliente';
import { RespuestaModel } from '../../../model/Respuesta';
import { ClienteWsService } from '../../../services/cliente-ws.service';

@Component({
  selector: 'cliente-reporte-compras',
  templateUrl: './reporte-compras.component.html',
  styleUrls: ['./reporte-compras.component.css']
})
export class ReporteComprasComponent implements OnInit {

  mensajeSuccess;
  mensajeStantard;
  mensajeDanger;

  constructor(private clienteWs: ClienteWsService) { }

  @Input() listClientes: ReporteCliente[];
  titulo = "Reporte Compras Clientes";
  subtitulo = "Aquí puedes visualizar las compras de los clientes";
  respuesta: RespuestaModel;
  loading = true;

  page = 14;
  pageSize = 6;
  collectionSize = 10;
  collectionRegistros: ReporteCliente[] = [];

  //mes reporte
  private _valorSend = new BehaviorSubject<number>(0);

  @Input()
  set valorSend(value:number) {
    if (value > 0) {
      this._valorSend.next(value);
    }
  }

  ngOnInit() {
    this.loading = true;
    this.valorSend = 100;

    this._valorSend.subscribe(value => {
      this.clienteWs.reporteCliente(value).subscribe(res => {
        this.mensajeSuccess = res.respuesta
        this.listClientes = [...res.objeto as ReporteCliente[]];
        this.refreshList();
      }, error => {
        this.mensajeDanger = error['respuesta'];
      });
    });

  }

  refreshList() {
    this.collectionSize = this.listClientes.length;
    this.collectionRegistros = this.listClientes.map((detalle, i) => ({id: i + 1, ...detalle}))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }


}
