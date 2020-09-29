import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

const URL_BASE = "https://localhost:44353/";

@Injectable()
export class WebApiService {
  baseUrl: string

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  constructor(private http: HttpClient) {
    this.baseUrl = URL_BASE;
  }

  wsGet(urlComplemento: string) {
    return this.http.get(this.baseUrl + urlComplemento).pipe(map(this.extract));
  }

  wsPost(urlComplemento: string, body) {
    return this.http.post(this.baseUrl + urlComplemento, body, this.httpOptions).pipe(map(this.extract));
  }

  wsDelete(urlComplemento: string) {
    return this.http.delete(this.baseUrl + urlComplemento).pipe(map(this.extract));
  }

  wsPut(urlComplemento: string, body) {
    return this.http.put(this.baseUrl + urlComplemento, body, this.httpOptions).pipe(map(this.extract));
  }

  private extract(res: Response) {
    if (res.status >= 200 && res.status <= 500) {
        return res.json();
    }
    else return res;
}

private handleError(error: Response | any) {
    if (error instanceof Response) {
        console.log(error);
        return Observable.throw(error);
    }
}
}
