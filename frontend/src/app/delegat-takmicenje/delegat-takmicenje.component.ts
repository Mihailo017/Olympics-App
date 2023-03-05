import { Time } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Disciplina } from '../models/disciplina';
import { Lokacija } from '../models/lokacija';
import { RezTenis } from '../models/rezTenis';
import { Rezultat } from '../models/rezultat';
import { Sportista } from '../models/sportista';
import { Takmicenje } from '../models/takmicenje';
import { SportoviService } from '../sportovi.service';
import { ZemljaService } from '../zemlja.service';

@Component({
  selector: 'app-delegat-takmicenje',
  templateUrl: './delegat-takmicenje.component.html',
  styleUrls: ['./delegat-takmicenje.component.css']
})
export class DelegatTakmicenjeComponent implements OnInit {

  constructor(private sportoviServis: SportoviService, private router: Router, private zemljaServis: ZemljaService) { }

  ngOnInit(): void {
    this.izabranoTakmicenje = JSON.parse(localStorage.getItem('izabranoTakmicenje'))
    this.started = (this.izabranoTakmicenje.pocetak != null) && (this.izabranoTakmicenje.kraj != null) && (this.izabranoTakmicenje.lokacija != null)
    && (this.izabranoTakmicenje.lokacija != "");

    this.takmicari = [];
    for (let i=0; i < this.izabranoTakmicenje.sportisti.length; i++) {
      this.takmicari[i] = {takmicar: this.izabranoTakmicenje.sportisti[i], rezultati: [], konacanRezultat: 0}
    }
    this.index = 0;
    this.krug = 0;
    this.sledeci = true;
    this.zadnji = false;
    this.finished = false;
    this.ispisKonacnogRezultata = this.izabranoTakmicenje.formatRezultata == "NN";
    this.porukaGreske = null;
    this.konacniRezultati = [];
    this.rezultati = [];
    this.tenisRez = [{teniser1:null, teniser2:null, setovi1:0,setovi2:0}, {teniser1:null, teniser2:null, setovi1:0,setovi2:0}, {teniser1:null, teniser2:null, setovi1:0,setovi2:0}, {teniser1:null, teniser2:null, setovi1:0,setovi2:0}];
    for (let i=0; i < this.izabranoTakmicenje.brojKrugova; i++) this.rezultati[i] = [];
    this.sportoviServis.dohvatiDisciplinu(this.izabranoTakmicenje.disciplina).subscribe((discplina: Disciplina)=>{
      this.discilipnaTakmicenja = discplina;
      this.ind = this.discilipnaTakmicenja.vrsta == "ind";
      this.tenis = this.discilipnaTakmicenja.sport == "Tenis";
      if (this.tenis) {
        this.tenisRez[0] = {
          teniser1: this.izabranoTakmicenje.sportisti[0],
          teniser2: this.izabranoTakmicenje.sportisti[3],
          setovi1: 0,
          setovi2: 0
        }
        this.tenisRez[1] = {
          teniser1: this.izabranoTakmicenje.sportisti[1],
          teniser2: this.izabranoTakmicenje.sportisti[2],
          setovi1: 0,
          setovi2: 0
        }
      }
    })
    this.sportoviServis.dohvatiSveLokacije().subscribe((dohvacene: Lokacija[])=>{
      this.lokacije = dohvacene
    })
    this.sportoviServis.dohvatiSvaTakmicenja().subscribe((dohvacena: Takmicenje[])=>{
      this.takmicenjaSva = dohvacena
    })
  }

  izabranoTakmicenje: Takmicenje;
  discilipnaTakmicenja: Disciplina;
  ind: boolean;
  started: boolean;
  finished: boolean;
  index: number;
  sledeci: boolean;
  zadnji: boolean;
  krug: number;
  tenis: boolean;

  takmicenjaSva: Takmicenje[];
  lokacije: Lokacija[];
  takmicari: Rezultat[];
  tenisRez: RezTenis[];
  rezultati: string[][];
  konacniRezultati: string[];
  rezultat: string;

  datumPocetka: Date;
  vremePocetka: Time;
  datumKraja: Date;
  vremeKraja: Time;
  lokacija: string;

  tenisFaza: string[] = ["Polufinale 1", "Polufinale 2", "Trece mesto", "Finale"];

  // unetRezultat(t: Rezultat) {
  //   if (!this.rezultat || this.rezultat == "") {
  //     // greska
  //   }
  //   t.rezultati[this.krug] = this.rezultat;
  // }

  ispisKonacnogRezultata: boolean;

  unesi() {
    for (let i = 0; i < this.takmicenjaSva.length; i++) {
      if (this.takmicenjaSva[i] != this.izabranoTakmicenje && this.takmicenjaSva[i].lokacija == this.lokacija &&
        this.takmicenjaSva[i].pocetak == this.datumPocetka) {
          this.porukaGreske = 'Greska - pocinju u isto vreme';
          return;
      }
    }
    let dKraj = this.datumPocetka;
    if (this.tenis) dKraj = this.datumKraja
    this.sportoviServis.dodajDatumeTakmicenja(this.izabranoTakmicenje.disciplina, this.izabranoTakmicenje.tip, this.datumPocetka, this.vremePocetka, dKraj, this.vremeKraja, this.lokacija).subscribe((s: string)=>{

    })
    this.started = true;
  }

  porukaGreske: string;

  dalje() {
    if (this.rezultat == "" || !this.rezultat) {
      this.porukaGreske = "Greska - niste uneli rezultat";
      return;
    }
    this.takmicari[this.index++].rezultati[this.krug] = this.rezultat;

    if (this.index == this.takmicari.length - 1 && this.krug == this.izabranoTakmicenje.brojKrugova - 1) {
      this.sledeci = false;
      this.zadnji = true;
    }
    if (this.index == this.takmicari.length) {
      this.krug++;
      this.index = 0;
    }
    this.porukaGreske = null;
    this.router.navigate(['delegat-takmicenje'])
  }

  rezultat2: string;

  nadjiPobednika(r1: RezTenis) {
    return (r1.setovi1 > r1.setovi2) ? r1.teniser1 : r1.teniser2;
  }
  nadjiGubitnika(r1: RezTenis) {
    return (r1.setovi1 > r1.setovi2) ? r1.teniser2 : r1.teniser1;
  }

  daljeTenis() {
    if (this.rezultat == "" || !this.rezultat) {
      this.porukaGreske = "Greska - niste uneli rezultat";
      return;
    }

    if (this.rezultat2 == "" || !this.rezultat2) {
      this.porukaGreske = "Greska - niste uneli rezultat";
      return;
    }
    this.tenisRez[this.index].setovi1 = parseInt(this.rezultat);
    this.tenisRez[this.index++].setovi2 = parseInt(this.rezultat2);

    // Drugo polufinale, pripremi za bronzu i finale
    if (this.index == 1) {
      this.tenisRez[2] = {teniser1: this.nadjiGubitnika(this.tenisRez[0]), teniser2: this.nadjiGubitnika(this.tenisRez[1]), setovi1:0, setovi2:0}
      this.tenisRez[3] = {teniser1: this.nadjiPobednika(this.tenisRez[0]), teniser2: this.nadjiPobednika(this.tenisRez[1]), setovi1:0, setovi2:0}
    }

    if (this.index == 3) {
      this.sledeci = false;
      this.zadnji = true;
    }
    this.porukaGreske = null;
    this.router.navigate(['delegat-takmicenje'])
  }

  zlato: Sportista;
  srebro: Sportista;
  bronza: Sportista;

  zlato1: Rezultat;
  srebro1: Rezultat;
  bronza1: Rezultat;

  zavrsi() {
    this.takmicari[this.index++].rezultati[this.krug] = this.rezultat;
    for (let i=0; i < this.takmicari.length; i++) {
      if (this.izabranoTakmicenje.formatRezultata != "NN") {
        let m = this.uporediRezultate2(this.takmicari[i].rezultati[0], this.takmicari[i].rezultati[1]);
        m = this.uporediRezultate2(m, this.takmicari[i].rezultati[2]);
        this.takmicari[i].rezultati[0] = m;
        this.takmicari[i].konacanRezultat = this.parseRezultat(m);
      } else {
        this.takmicari[i].konacanRezultat = 0;
        for (let j=0; j < 6; j++)
          this.takmicari[i].konacanRezultat += this.parseRezultat(this.takmicari[i].rezultati[j]); 
      }
    }

    this.takmicari.sort(this.uporediRezultate);
    if (this.izabranoTakmicenje.rangiranjeRezultata == "max") this.takmicari.reverse();

    if (this.takmicari[0].konacanRezultat == this.takmicari[1].konacanRezultat) {
      // Naknadna runda
      let i=0;
      let temp = [];
      for (i=0; i < this.takmicari.length-1; i++) {
        temp.push(this.takmicari[i])
        if (this.takmicari[i].konacanRezultat != this.takmicari[i+1].konacanRezultat) break;
      }
      // samo prva dva imaju isti rez, bronza ostaje
      if (i==1) {
        this.bronza = this.takmicari[2].takmicar;
        this.bronza1 = this.takmicari[2];
        this.zemljaServis.osvojenaBronza(this.bronza.drzava).subscribe();
      }
      this.takmicari = temp;
      this.index = 0;
      this.krug = 0;
      this.sledeci = true;
      this.zadnji = false;
      this.finished = false;
      this.ispisKonacnogRezultata = this.izabranoTakmicenje.formatRezultata == "NN";
      this.porukaGreske = null;
      this.konacniRezultati = [];
      this.rezultati = [];
      this.router.navigate(['delegat-takmicenje']);
      return;
    } else {
      this.zlato = this.takmicari[0].takmicar;
      this.srebro = this.takmicari[1].takmicar;
      if (!this.bronza) this.bronza = this.takmicari[2].takmicar;

      this.zlato1 = this.takmicari[0];
      this.srebro1 = this.takmicari[1];
      if (!this.bronza1) this.bronza1 = this.takmicari[2];

      this.zemljaServis.osvojenoZlato(this.zlato.drzava).subscribe();
      this.zemljaServis.osvojenoSrebro(this.srebro.drzava).subscribe();
      this.zemljaServis.osvojenaBronza(this.bronza.drzava).subscribe();
    }
    // Izbrisi takmicenje
    this.finished = true;
    // postavi da je status = zavrsen

    this.sportoviServis.zavrsiTakmicenje(this.izabranoTakmicenje.disciplina, this.izabranoTakmicenje.tip).subscribe();
  }

  zavrsiTenis() {
    this.tenisRez[this.index].setovi1 = parseInt(this.rezultat);
    this.tenisRez[this.index++].setovi2 = parseInt(this.rezultat2);
    
    this.zlato = this.nadjiPobednika(this.tenisRez[3]);
    this.srebro = this.nadjiGubitnika(this.tenisRez[3]);
    this.bronza = this.nadjiPobednika(this.tenisRez[2]);

    this.zemljaServis.osvojenoZlato(this.zlato.drzava).subscribe();
    this.zemljaServis.osvojenoSrebro(this.srebro.drzava).subscribe();
    this.zemljaServis.osvojenaBronza(this.bronza.drzava).subscribe();

    // Izbrisi takmicenje
    this.finished = true;
    // postavi da je status = zavrsen

    this.sportoviServis.zavrsiTakmicenje(this.izabranoTakmicenje.disciplina, this.izabranoTakmicenje.tip).subscribe();
  }

  uporediRezultate(a: Rezultat, b: Rezultat) {
    return a.konacanRezultat-b.konacanRezultat;
  }

  uporediRezultate2(a: string, b: string) {
    if (!a) return b;
    if (!b) return a;
    if (this.izabranoTakmicenje.formatRezultata == "CC,TT") {
      let aValue = parseInt(a.split(",")[0]) + parseInt(a.split(",")[1]);
      let bValue = parseInt(b.split(",")[0]) + parseInt(b.split(",")[1]);
      if (this.izabranoTakmicenje.rangiranjeRezultata == "min")
        return (aValue < bValue)? a : b;
      else 
        return (aValue > bValue)? a : b;
    }

    if (this.izabranoTakmicenje.formatRezultata == "M,CM" || this.izabranoTakmicenje.formatRezultata == "MM,CM") {
      let aValue = parseInt(a.split(",")[0]) + parseInt(a.split(",")[1]);
      let bValue = parseInt(b.split(",")[0]) + parseInt(b.split(",")[1]);
      if (this.izabranoTakmicenje.rangiranjeRezultata == "min")
        return (aValue < bValue)? a : b;
      else 
        return (aValue > bValue)? a : b;
    }

    if (this.izabranoTakmicenje.formatRezultata == "CC:MM:CC") {
      let aValue = parseInt(a.split(":")[0]) + parseInt(a.split(":")[1]) + parseInt(a.split(":")[2]);
      let bValue = parseInt(b.split(":")[0]) + parseInt(b.split(":")[1]) + parseInt(b.split(":")[2]);
      if (this.izabranoTakmicenje.rangiranjeRezultata == "min")
        return (aValue < bValue)? a : b;
      else 
        return (aValue > bValue)? a : b;
    }

    if (this.izabranoTakmicenje.formatRezultata == "NN") {
      let aValue = parseInt(a);
      let bValue = parseInt(b);
      if (this.izabranoTakmicenje.rangiranjeRezultata == "min")
        return (aValue < bValue)? a : b;
      else 
        return (aValue > bValue)? a : b;
    }
  }

  parseRezultat(a: string) {
    if (this.izabranoTakmicenje.formatRezultata == "CC,TT") {
        let aa = a.split(',')
        let aValue = parseInt(aa[0]) * 100 + parseInt(aa[1]);
        return aValue;
      }
  
      if (this.izabranoTakmicenje.formatRezultata == "M,CM" || this.izabranoTakmicenje.formatRezultata == "MM,CM") {
        let aValue = parseInt(a.split(",")[0]) * 100 + parseInt(a.split(",")[1]);
        return aValue;
      }
  
      if (this.izabranoTakmicenje.formatRezultata == "CC:MM:CC") {
        let aValue = parseInt(a.split(":")[0]) * 3600 + parseInt(a.split(":")[1]) * 60 + parseInt(a.split(":")[2]);
        return aValue;
      }
  
      if (this.izabranoTakmicenje.formatRezultata == "NN") {
        let aValue = parseInt(a);
        return aValue;
      }
  }     

  nazad() {
    this.router.navigate(['delegat']);
  }

}
