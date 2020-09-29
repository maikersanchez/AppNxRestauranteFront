import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CocineroModel } from '../model/Cocinero';
import { RespuestaModel } from '../model/Respuesta';
import { WebApiService } from './web-api.service';

@Injectable({
  providedIn: 'root'
})
export class CocineroWsService {

  urlCocinero = "api/Cocineros"
  constructor(private ws: WebApiService) { }

  obtenerCocinero(id):Observable<RespuestaModel> {
    let response = new RespuestaModel();
    return new Observable<RespuestaModel>(observer => {
    let response = new RespuestaModel();
    this.ws.wsGet(this.urlCocinero+"/"+id).subscribe(res => {
      console.log(res);
      response.respuesta = "ok";
        response.error = false;
        response.objeto = res;
        observer.next(response);
    }, err => {
      response.respuesta = "Upps, no fue posible procesar la solicitud.";
      response.error = true;
      observer.error(response);
    });
  })
  }

  autocompleteCocinero(input){
    return this.ws.wsGet(this.urlCocinero+"/Autocomplete/"+input).pipe(map(res => res as unknown as string[]));
  }



  registrarCocinero(cocinero:CocineroModel):Observable<RespuestaModel>{
    let url = this.urlCocinero;
    let response = new RespuestaModel();
    return new Observable<RespuestaModel>(observer => {
      this.ws.wsPost(url, cocinero).subscribe(res => {
        console.log(res);
        if (res["idCocinero"]) {
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
