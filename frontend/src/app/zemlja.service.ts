import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ZemljaService {

  uri = 'http://localhost:4000'

  constructor(private http: HttpClient) { }

  dohvatiSveZemlje() {
    return this.http.get(`${this.uri}/zemlje/dohvatiSveZemlje`);
  }

  osvojenoZlato(zemlja) {
    const podaci = {
      zemlja: zemlja
    }
    return this.http.post(`${this.uri}/zemlje/osvojenoZlato`, podaci);
  }

  osvojenoSrebro(zemlja) {
    const podaci = {
      zemlja: zemlja
    }
    return this.http.post(`${this.uri}/zemlje/osvojenoSrebro`, podaci);
  }

  osvojenaBronza(zemlja) {
    const podaci = {
      zemlja: zemlja
    }
    return this.http.post(`${this.uri}/zemlje/osvojenaBronza`, podaci);
  }
}
