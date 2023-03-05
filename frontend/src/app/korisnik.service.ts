import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class KorisnikService {

  uri = 'http://localhost:4000'

  constructor(private http: HttpClient) { }

  registracija(kor_ime, loznika, ime, prezime, zemlja, email, tip) {
    const podaci = {
      kor_ime: kor_ime,
      loznika: loznika,
      ime: ime,
      prezime: prezime,
      zemlja: zemlja,
      email: email,
      tip: tip
    }
    return this.http.post(`${this.uri}/korisnici/registracija`, podaci);
  }

  prijava(kor_ime, loznika, tip) {
    const podaci = {
      kor_ime: kor_ime,
      loznika: loznika,
      tip: tip
    }
    return this.http.post(`${this.uri}/korisnici/prijava`, podaci);
  }

  dohvatiSveZahteve() {
    return this.http.get(`${this.uri}/korisnici/dohvatiSveZahteve`);
  }

  odobriKorisnika(kor_ime) {
    const podaci = {
      kor_ime: kor_ime
    }
    return this.http.post(`${this.uri}/korisnici/odobriKorisnika`, podaci);
  }

  odbijKorisnika(kor_ime) {
    const podaci = {
      kor_ime: kor_ime
    }
    return this.http.post(`${this.uri}/korisnici/odbijKorisnika`, podaci);
  }

  postojiKorisnik(kor_ime) {
    const podaci = {
      kor_ime: kor_ime
    }
    return this.http.post(`${this.uri}/korisnici/postojiKorisnik`, podaci);
  }

  postojiVodja(zemlja) {
    const podaci = {
      zemlja: zemlja
    }
    return this.http.post(`${this.uri}/korisnici/postojiVodja`, podaci);
  }

  dohvatiSveDelegate() {
    return this.http.get(`${this.uri}/korisnici/dohvatiSveDelegate`);
  }

  povecajBrTakmicenja(kor_ime) {
    const podaci = {
      kor_ime: kor_ime
    }
    return this.http.post(`${this.uri}/korisnici/povecajBrTakmicenja`, podaci);
  }
  
  
}
