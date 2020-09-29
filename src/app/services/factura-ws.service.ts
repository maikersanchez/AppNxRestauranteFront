import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FacturaModel } from '../model/Factura';
import { RespuestaModel } from '../model/Respuesta';
import { WebApiService } from './web-api.service';

@Injectable()
export class FacturaWsService {

  urlFactura= "api/Facturas";

  constructor(private ws: WebApiService) { }

  buscarFactura(idfactura):Observable<RespuestaModel>{
    let url = this.urlFactura + "/"+ idfactura;
    let response = new RespuestaModel();
    return new Observable<RespuestaModel>(observer => {
      this.ws.wsGet(url).pipe(map(res => res as object as FacturaModel[])).subscribe(res => {
        
        response.respuesta = "ok";
        response.error = false;
        response.objeto = res;
        observer.next(response);
      }, err => {
        response.respuesta = "Upps, no fue posible procesar el registro.";
        response.error = true;
        observer.next(response);
      });
    });

  }

  obtenerFactueras():Observable<RespuestaModel>{
    let response = new RespuestaModel();
    return new Observable<RespuestaModel>(observer => {
      this.ws.wsGet(this.urlFactura).pipe(map(res => res as object as FacturaModel[])).subscribe(res => {
        
        response.respuesta = "ok";
        response.error = false;
        response.objeto = res;
        observer.next(response);
      }, err => {
        response.respuesta = "Upps, no fue posible procesar el registro.";
        response.error = true;
        observer.next(response);
      });
    });
  }

  registrarFactura(factura:FacturaModel):Observable<RespuestaModel>{
    let url = this.urlFactura;
    let response = new RespuestaModel();
    return new Observable<RespuestaModel>(observer => {
      this.ws.wsPost(url, factura).subscribe(res => {
        console.log(res);
        if (res["idFactura"]) {
          response.respuesta = "Se creo la factura correctamente";
          response.error = false;
          observer.next(response);
        }
        else{
          response.respuesta = "No fue posible procesar factura.";
          response.error = true;
          observer.error(response);
        }
        

      }, err => {
        response.respuesta = "Upps, no fue posible procesar el registro.";
        response.error = true;
        observer.error(response);
      });

    });
  }

}
