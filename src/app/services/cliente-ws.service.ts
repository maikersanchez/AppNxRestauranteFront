import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ClienteModel } from '../model/Cliente';
import { RespuestaModel } from '../model/Respuesta';
import { WebApiService } from './web-api.service';

@Injectable()
export class ClienteWsService {
  urlCliente = "api/Clientes"
  constructor(private ws: WebApiService) { }

  obtenerCliente(id):Observable<RespuestaModel> {
    let response = new RespuestaModel();
    return new Observable<RespuestaModel>(observer => {
    let response = new RespuestaModel();
    this.ws.wsGet(this.urlCliente+"/"+id).subscribe(res => {
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

  reporteCliente(valor):Observable<RespuestaModel> {
    let response = new RespuestaModel();
    let urlComplemento =  this.urlCliente +"/Reporte-Mes/"+valor;
    return new Observable<RespuestaModel>(observer => {
    let response = new RespuestaModel();
    this.ws.wsGet(urlComplemento).subscribe(res => {
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

  obtenerTodos(): RespuestaModel {
    let response = new RespuestaModel();

    this.ws.wsGet(this.urlCliente).pipe(map(res => res as object as ClienteModel[])).subscribe(res => {
      response.respuesta = "ok";
      response.error = false;
      response.objeto = res;
    }, err => {
      response.respuesta = "Upps, no fue posible procesar el registro.";
      response.error = true;

    });
    return response;
  }

  obtenerTodos2(){
    return this.ws.wsGet(this.urlCliente).pipe(map(res => res as object as ClienteModel[]));
  }

  autocompleteCliente(input){
    return this.ws.wsGet(this.urlCliente+"/Autocomplete/"+input).pipe(map(res => res as unknown as string[]));
  }


  registrarCliente(cliente: ClienteModel): Observable<RespuestaModel> {
    let url = this.urlCliente;
    let response = new RespuestaModel();

    return new Observable<RespuestaModel>(observer => {
      this.ws.wsPost(url, cliente).subscribe(res => {
      console.log(res);
      if (res["idCliente"]) {
        response.respuesta = "Se creo el usuario exitosamente";
        response.error = false;
        observer.next(response);
      }
    }, err => {
      response.respuesta = "Upps, no fue posible procesar el registro.";
      response.error = true;
      response.error = false;
      observer.error(response);

    })
  });
  }

}
