import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Sportista } from './models/sportista';

@Injectable({
  providedIn: 'root'
})
export class SportoviService {

  uri = 'http://localhost:4000'

  constructor(private http: HttpClient) { }

  dodajSport(sport) {
    const podaci = {
      naziv: sport
    }
    return this.http.post(`${this.uri}/sportovi/dodajSport`, podaci);
  }

  dodajDisciplinu(naziv, sport, vrsta, min, max) {
    const podaci = {
      naziv: naziv,
      sport: sport,
      vrsta: vrsta,
      br_igraca: "" + min + "/" + max
    }
    return this.http.post(`${this.uri}/sportovi/dodajDisciplinu`, podaci);
  }

  dodajTakmicenje(disciplina, tip, brojTakmicara, formatRezultata, brojKrugova, rangiranjeRezultata, delegat, sportisti: Sportista[]) {
    const podaci = {
      disciplina: disciplina,
      tip: tip,
      brojTakmicara: brojTakmicara,
      formatRezultata: formatRezultata,
      brojKrugova: brojKrugova,
      rangiranjeRezultata: rangiranjeRezultata,
      pocetak: "",
      kraj: "",
      lokacija: "",
      delegat: delegat,
      sportisti: sportisti,
      status: ""
    }
    return this.http.post(`${this.uri}/sportovi/dodajTakmicenje`, podaci);
  }

  dodajDatumeTakmicenja(disciplina, tip, datumPocetka, vremePocetka, datumKraja, vremeKraja, lokacija) {
    const podaci = {
      disciplina: disciplina,
      tip: tip,
      datumPocetka: datumPocetka,
      vremePocetka: vremePocetka,
      datumKraja: datumKraja,
      vremeKraja: vremeKraja,
      lokacija: lokacija
    }
    return this.http.post(`${this.uri}/sportovi/dodajDatumeTakmicenja`, podaci);
  }

  dodajSportistu(ime, prezime, pol, disciplina, drzava, sport) {
    const podaci = {
      ime: ime,
      prezime: prezime,
      pol: pol,
      disciplina: disciplina,
      drzava: drzava,
      sport: sport
    }
    return this.http.post(`${this.uri}/sportovi/dodajSportistu`, podaci);
  }

  dohvatiDisciplinu(naziv) {
    const podaci = {
      naziv: naziv,
    }
    return this.http.post(`${this.uri}/sportovi/dohvatiDisciplinu`, podaci);
  }

  dohvatiSveSportove() {
    return this.http.get(`${this.uri}/sportovi/dohvatiSveSportove`);
  }

  dohvatiSveDiscipline() {
    return this.http.get(`${this.uri}/sportovi/dohvatiSveDiscipline`);
  }

  dohvatiSveFormate() {
    return this.http.get(`${this.uri}/sportovi/dohvatiSveFormate`);
  }

  dohvatiSveLokacije() {
    return this.http.get(`${this.uri}/sportovi/dohvatiSveLokacije`);
  }

  dohvatiSveDelegate() {
    return this.http.get(`${this.uri}/sportovi/dohvatiSveDelegate`);
  }

  dohvatiSvaTakmicenja() {
    return this.http.get(`${this.uri}/sportovi/dohvatiSvaTakmicenja`);
  }

  dohvatiTakmicenjaDelegata(delegat) {
    const podaci = {
      delegat: delegat
    }
    return this.http.post(`${this.uri}/sportovi/dohvatiTakmicenjaDelegata`, podaci);
  }

  dohvatiTakmicare(disciplina, tip) {
    const podaci = {
      disciplina: disciplina,
      tip: tip
    }
    return this.http.post(`${this.uri}/sportovi/dohvatiTakmicare`, podaci);
  }

  formiranoTakmicenje(disciplina, pol) {
    const podaci = {
      disciplina: disciplina,
      pol: pol
    }
    return this.http.post(`${this.uri}/sportovi/formiranoTakmicenje`, podaci);
  }

  posaljiRezultate(disciplina, pol, rezultati1, rezultati2, rezultati3) {
    const podaci = {
      disciplina: disciplina,
      pol: pol,
      rezultati1: rezultati1,
      rezultati2: rezultati2,
      rezultati3: rezultati3
    }
    return this.http.post(`${this.uri}/sportovi/posaljiRezultate`, podaci);
  }

  dohvatiSveSportiste() {
    return this.http.get(`${this.uri}/sportovi/dohvatiSveSportiste`);
  }

  dohvatiSportistuIme(ime) {
    const podaci = {
      ime: ime
    }
    return this.http.post(`${this.uri}/sportovi/dohvatiSportistuIme`, podaci);
  }
  dohvatiSportistuPrezime(prezime) {
    const podaci = {
      prezime: prezime
    }
    return this.http.post(`${this.uri}/sportovi/dohvatiSportistuPrezime`, podaci);
  }
  dohvatiSportistuDrzava(drzava) {
    const podaci = {
      drzava: drzava
    }
    return this.http.post(`${this.uri}/sportovi/dohvatiSportistuDrzava`, podaci);
  }
  dohvatiSportistuSport(sport) {
    const podaci = {
      sport: sport
    }
    return this.http.post(`${this.uri}/sportovi/dohvatiSportistuSport`, podaci);
  }

  zavrsiTakmicenje(disciplina, tip) {
    const podaci = {
      disciplina: disciplina,
      tip: tip
    }
    return this.http.post(`${this.uri}/sportovi/zavrsiTakmicenje`, podaci);
  }

  postojiSport(naziv) {
    const podaci = {
      naziv: naziv
    }
    return this.http.post(`${this.uri}/sportovi/postojiSport`, podaci);
  }

  postojiDisciplina(naziv) {
    const podaci = {
      naziv: naziv
    }
    return this.http.post(`${this.uri}/sportovi/postojiDisciplina`, podaci);
  }

  postojiTakmicenje(disciplina, tip) {
    const podaci = {
      disciplina: disciplina,
      tip: tip
    }
    return this.http.post(`${this.uri}/sportovi/postojiTakmicenje`, podaci);
  }

}
