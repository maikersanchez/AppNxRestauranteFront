import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MesaModel } from '../model/Mesa';
import { RespuestaModel } from '../model/Respuesta';
import { WebApiService } from './web-api.service';

@Injectable()
export class MesaWsService {

  urlMesa = "api/Mesas";
  constructor(private ws: WebApiService) { }

  autocompleteMesa(input){
    return this.ws.wsGet(this.urlMesa+"/Autocomplete/"+input).pipe(map(res => res as unknown as string[]));
  }



  registrarMesa(mesa:MesaModel):Observable<RespuestaModel>{
    let url = this.urlMesa;
    let response = new RespuestaModel();
    return new Observable<RespuestaModel>(observer => {
      this.ws.wsPost(url, mesa).subscribe(res => {
        console.log(res);
        if (res["idMesa"]) {
          response.respuesta = "Se creo la factura correctamente";
          response.error = false;
          observer.next(response);
        }
        else{
          response.respuesta = "No fue posible procesar factura.";
          response.error = true;
          observer.next(response);
        }
        

      }, err => {
        response.respuesta = "Upps, no fue posible procesar el registro.";
        response.error = true;
        observer.next(response);
      });
    });
  }

}
