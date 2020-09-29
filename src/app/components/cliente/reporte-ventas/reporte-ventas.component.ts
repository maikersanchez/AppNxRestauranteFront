import { Component, Input, OnInit, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ReporteCamareroVentas } from 'src/app/model/ReporteCamarero';
import { CamareroWsService } from 'src/app/services/camarero-ws.service';
import { RespuestaModel } from '../../../model/Respuesta';

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
  subtitulo = "Aqupi puedes visualizar las ventas por mes";
  respuesta: RespuestaModel;
  loading = true;

  //mes reporte
  private _mesReporte = new BehaviorSubject<number>(0);

  @Input()
  mesReporte(value) {
    if (value > 0) {
      this._mesReporte.next(value);
    }
  }

  ngOnInit() {
    this.loading = true;
    this.mesReporte = new Date().getMonth;

    this._mesReporte.subscribe(value => {
      this.camareoWs.obtenerReporteVentas(value).subscribe(res => {
        this.mensajeSuccess = res.respuesta
        this.listCamareros = [...res.objeto as ReporteCamareroVentas[]];
      }, error => {
        this.mensajeDanger = error['respuesta'];
      });
    });

  }

}
