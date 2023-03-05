import { Component, OnInit } from '@angular/core';
import { KorisnikService } from '../korisnik.service';
import { Delegat } from '../models/delegat';
import { Disciplina } from '../models/disciplina';
import { Format } from '../models/format';
import { Korisnik } from '../models/korisnik';
import { Lokacija } from '../models/lokacija';
import { Sport } from '../models/sport';
import { Sportista } from '../models/sportista';
import { Takmicenje } from '../models/takmicenje';
import { SportoviService } from '../sportovi.service';

@Component({
  selector: 'app-organizator',
  templateUrl: './organizator.component.html',
  styleUrls: ['./organizator.component.css']
})
export class OrganizatorComponent implements OnInit {

  constructor(private sportoviServis: SportoviService, private korisnikServis: KorisnikService) { }

  ngOnInit(): void {
    this.tenis = false;
    this.sportoviServis.dohvatiSveSportove().subscribe((dohvaceni : Sport[])=>{
      this.sportovi = dohvaceni
    });
    this.sportoviServis.dohvatiSveDiscipline().subscribe((dohvacene: Disciplina[])=>{
      this.discipline = dohvacene
    })
    this.sportoviServis.dohvatiSveFormate().subscribe((dohvaceni: Format[])=>{
      this.formati = dohvaceni
    })
    this.korisnikServis.dohvatiSveDelegate().subscribe((dohvaceni: Korisnik[])=>{
      this.delegati = dohvaceni
      for (let i=0; i < this.delegati.length; i++) {
        if (this.delegati[i].brTakmicenja >= 3) this.delegati.splice(i ,1);
      }
    })
    this.korisnikServis.dohvatiSveZahteve().subscribe((dohvaceni: Korisnik[])=>{
      if (dohvaceni.length > 0)
        this.zahtevi = dohvaceni;
      else
        this.zahtevi = null;
    })
  }

  sportovi: Sport[];
  discipline: Disciplina[];
  formati: Format[];
  delegati: Korisnik[];

  noviSport: string;

  novaDisciplina: string;
  sportDisciplina: string;
  vrstaDisciplina: string;
  minDisciplina: number;
  maxDisciplina: number;

  disciplinaTakmicenja: string;
  tipTakmicenja: string;
  formatTakmicenja: string;
  formatTakmicenjaInit: string;
  brojTakmicara: string;
  formatRezultata: string;
  brojKrugova: number;
  rangiranjeRezultata: number;
  delegatTakmicenja: string;

  porukaSport: string;
  porukaDisciplina: string;
  porukaTakmicenje: string;

  brisiPoruke() {
    this.porukaSport = null;
    this.porukaDisciplina = null;
    this.porukaTakmicenje = null;
    this.porukaGreske = null;
  }


  takmicari: Sportista[];

  formatIzabran() {
    this.formatTakmicenja = this.formatTakmicenjaInit;
  }


  dodajSport() {
    this.brisiPoruke();

    this.sportoviServis.postojiSport(this.noviSport).subscribe((sport: string)=>{
      if (!sport) {
        this.sportoviServis.dodajSport(this.noviSport).subscribe((sport: string)=>{

        });
        this.porukaSport = "Sport je uspesno dodat.";
        let sport: Sport = {
          naziv: this.noviSport
        }
        this.sportovi.push(sport);
      } else {
        this.porukaGreske = "Sport je vec unet."
      }
    })

    
  }

  dodajDisciplinu() {
    this.brisiPoruke();

    this.sportoviServis.postojiDisciplina(this.novaDisciplina).subscribe((disciplina : Disciplina)=>{
      if (!disciplina) {
        this.sportoviServis.dodajDisciplinu(this.novaDisciplina, this.sportDisciplina, this.vrstaDisciplina, this.minDisciplina, this.maxDisciplina).subscribe((disciplina: string)=>{

        });
        this.porukaDisciplina = "Disciplina je uspesno dodata."
        let disciplina: Disciplina = {
          naziv: this.novaDisciplina,
          sport: this.sportDisciplina,
          vrsta: this.vrstaDisciplina,
        }
        this.discipline.push(disciplina);
      } else {
        this.porukaGreske = "Disciplina je vec uneta.";
      }
    })
  }

  porukaGreske: string;

  dodajTakmicenje() {
    this.brisiPoruke();
    
    this.sportoviServis.postojiTakmicenje(this.disciplinaTakmicenja, this.tipTakmicenja).subscribe((takmicenje : Takmicenje)=>{
      if (!takmicenje) {
        if (this.brojTakmicara == "=8") {
          if (this.takmicari.length > 8) {
            this.porukaGreske = "Prijavljeno je vise od 8 takmicara."
            return;
          }
        } else {
          let brTak = parseInt(this.brojTakmicara);
          if (brTak != this.takmicari.length) {
            this.porukaGreske = "Prijavljeno je samo " + this.takmicari.length + " a dozvoljeno je " + brTak + "takmicara.";
            return;
          }
        }
        
        this.sportoviServis.dodajTakmicenje(this.disciplinaTakmicenja, this.tipTakmicenja, this.brojTakmicara, this.formatRezultata, this.brojKrugova, this.rangiranjeRezultata, this.delegatTakmicenja, this.takmicari).subscribe((takmicenje: string)=>{
    
        });
    
        this.korisnikServis.povecajBrTakmicenja(this.delegatTakmicenja).subscribe();
        this.porukaTakmicenje = "Takmicenje je uspesno dodato."
      } else {
        this.porukaGreske = "Takmicenje je vec uneto.";
      }
    })
  }

  tenis: boolean;

  dohvatiTakmicare() {
    if (this.disciplinaTakmicenja && this.tipTakmicenja) {
      this.sportoviServis.dohvatiTakmicare(this.disciplinaTakmicenja, this.tipTakmicenja).subscribe((takmicari: Sportista[])=>{
        this.takmicari = takmicari;
        
      })
    }
    if (this.disciplinaTakmicenja) this.tenis = this.disciplinaTakmicenja == "Singl";
    if (this.tenis) this.brojTakmicara = "4";
  }

  zahtevi: Korisnik[];

  odobri(zahtev: Korisnik) {
    this.korisnikServis.odobriKorisnika(zahtev.kor_ime).subscribe();
    this.zahtevi.splice(this.zahtevi.indexOf(zahtev), 1);
    if (zahtev.tip == "d") this.delegati.push(zahtev);
  }

  odbij(zahtev: Korisnik) {
    this.korisnikServis.odbijKorisnika(zahtev.kor_ime).subscribe();
    this.zahtevi.splice(this.zahtevi.indexOf(zahtev), 1);
  }

}
