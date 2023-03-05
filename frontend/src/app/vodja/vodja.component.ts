import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Disciplina } from '../models/disciplina';
import { Korisnik } from '../models/korisnik';
import { Sport } from '../models/sport';
import { SportoviService } from '../sportovi.service';

@Component({
  selector: 'app-vodja',
  templateUrl: './vodja.component.html',
  styleUrls: ['./vodja.component.css']
})
export class VodjaComponent implements OnInit {

  constructor(private sportoviServis: SportoviService, private router: Router) { }

  ngOnInit(): void {
    this.sportoviServis.dohvatiSveSportove().subscribe((dohvaceni : Sport[])=>{
      this.sportovi = dohvaceni
    });
    this.sportoviServis.dohvatiSveDiscipline().subscribe((dohvacene: Disciplina[])=>{
      this.disciplineSve = dohvacene
    })

    let vodja: Korisnik = JSON.parse(localStorage.getItem('ulogovan'))
    this.nacionalnostSportiste = vodja.zemlja;
  }

  

  sportIzabran(event) {
    let temp = [];
    for (let i=0; i < this.disciplineSve.length; i++) {
      if (this.disciplineSve[i].sport == this.sportSportiste) {
        temp.push(this.disciplineSve[i])
      }
    }
    this.discipline = temp;
  }

  sportovi: Sport[];
  disciplineSve: Disciplina[];
  discipline: Disciplina[];

  imeSportiste: string;
  prezimeSportiste: string;
  polSportiste: string;
  sportSportiste: string;
  disciplinaSportiste: string;
  nacionalnostSportiste: string;

  porukaGreske: string;
  porukaUspeha: string;

  dodajSportistu() {
    //provera da takmicenje nije formiranmo
    this.sportoviServis.formiranoTakmicenje(this.disciplinaSportiste, this.polSportiste).subscribe((formirano: boolean)=>{
      if (formirano == true) {
        this.porukaUspeha = null;
        this.porukaGreske = "Takmicenje je vec forimirano. Nije moguce dodavati nove ucesnike."
      } else {
        this.sportoviServis.dodajSportistu(this.imeSportiste, this.prezimeSportiste, this.polSportiste, this.disciplinaSportiste, this.nacionalnostSportiste, this.sportSportiste).subscribe()
        this.porukaUspeha = "Takmicar je uspesno prijavljen za takmicenje."
        this.porukaGreske = null;
      }
    })
  }

}
