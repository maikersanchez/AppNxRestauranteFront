import { Component, Input, OnInit, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ReporteCamareroVentas } from 'src/app/model/ReporteCamarero';
import { CamareroWsService } from 'src/app/services/camarero-ws.service';
import { ClienteModel } from '../../../model/Cliente';
import { RespuestaModel } from '../../../model/Respuesta';
import { ClienteWsService } from '../../../services/cliente-ws.service';

@Component({
  selector: 'app-reporte-ventas',
  templateUrl: './reporte-ventas.component.html',
  styleUrls: ['./reporte-ventas.component.css']
})
export class ReporteVentasComponent implements OnInit {

  mensajeSuccess;
  mensajeStantard;
  mensajeDanger;

  constructor(private camareoWs: CamareroWsService) { }

  @Input() listCamareros: ReporteCamareroVentas[];
  titulo = "Reporte Ventas Camareros";
  subtitulo = "Aquí puedes visualizar las ventas por mes";
  respuesta: RespuestaModel;
  loading = true;

  //mes reporte
  private _mesReporte = new BehaviorSubject<number>(0);

  @Input()
  set mesReporte(value) {
    if (value > 0) {
      this._mesReporte.next(value);
    }
  }

  page = 1;
  pageSize = 0;
  collectionSize = 10;
  collectionRegistros: ReporteCamareroVentas[] = [];

  ngOnInit() {
    this.loading = true;
    this.mesReporte = new Date().getMonth()+1;

    this._mesReporte.subscribe(value => {
      this.camareoWs.obtenerReporteVentas(value).subscribe(res => {
        this.mensajeSuccess = res.respuesta
        this.listCamareros = [...res.objeto as ReporteCamareroVentas[]];
        this.refreshList();
      }, error => {
        this.mensajeDanger = error['respuesta'];
      });
    });

  }

  
  refreshList() {
    this.collectionSize = this.listCamareros.length;
    this.collectionRegistros = this.listCamareros.map((detalle, i) => ({id: i + 1, ...detalle}))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

}
