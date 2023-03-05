import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { Sport } from '../models/sport';
import { Sportista } from '../models/sportista';
import { Zemlja } from '../models/zemlja';
import { SportoviService } from '../sportovi.service';
import { ZemljaService } from '../zemlja.service';

@Component({
  selector: 'app-neregistrovan',
  templateUrl: './neregistrovan.component.html',
  styleUrls: ['./neregistrovan.component.css']
})
export class NeregistrovanComponent implements OnInit {

  constructor(private zemljaServis: ZemljaService, private sportoviServis: SportoviService, private router: Router) { }

  ngOnInit(): void {
    this.zemljaServis.dohvatiSveZemlje().subscribe((dohvacene: Zemlja[])=>{
      this.sveZemlje = dohvacene;
      this.brojDrzava = this.sveZemlje.length;
      this.trenStranica = 0;
      this.trenStranica1 = 0;
      this.drzaveNaStranici = 10;
      let temp = [];
      let temp1 = [];
      for (let i=0; (i < this.sveZemlje.length && i < this.drzaveNaStranici); i++) {
        temp.push(this.sveZemlje[i]);
        temp1.push(this.sveZemlje[i]);
      }
      this.zemlje = temp;
      this.zemlje1 = temp1;
      this.zemlje.sort((a,b)=> b.ukupno - a.ukupno);
      this.zemlje1.sort((a,b)=> b.ukupno - a.ukupno);
      this.imePretraga = '';
      this.prezimePretraga = '';
      this.zemljaPretraga = '';
      this.sportPretraga = '';
    })
    this.sportoviServis.dohvatiSveSportove().subscribe((dohvaceni: Sport[])=>{
      this.sportovi = dohvaceni;
    })
  }

  sveZemlje: Zemlja[];
  zemlje: Zemlja[];
  zemlje1: Zemlja[];
  sportovi: Sport[];

  imePretraga: string;
  prezimePretraga: string;
  zemljaPretraga: string;
  sportPretraga: string;

  pretrazeni: Sportista[];

  pretraga() {
    if (this.imePretraga != '') {
      this.sportoviServis.dohvatiSportistuIme(this.imePretraga).subscribe((dohvaceni: Sportista[])=>{
        this.pretrazeni = dohvaceni;
        this.srediPretrazene();
      })
    } else if (this.prezimePretraga != '') {
      this.sportoviServis.dohvatiSportistuPrezime(this.prezimePretraga).subscribe((dohvaceni: Sportista[])=>{
        this.pretrazeni = dohvaceni;
        this.srediPretrazene();
      })
    } else if (this.zemljaPretraga != '') {
      this.sportoviServis.dohvatiSportistuDrzava(this.zemljaPretraga).subscribe((dohvaceni: Sportista[])=>{
        this.pretrazeni = dohvaceni;
        this.srediPretrazene();
      })
    } else if (this.sportPretraga != '') {
      this.sportoviServis.dohvatiSportistuSport(this.sportPretraga).subscribe((dohvaceni: Sportista[])=>{
        this.pretrazeni = dohvaceni;
        this.srediPretrazene();
      })
    } else {
      this.sportoviServis.dohvatiSveSportiste().subscribe((dohvaceni: Sportista[])=>{
        this.pretrazeni = dohvaceni;
        this.srediPretrazene();
      })
    }
  }

  srediPretrazene() {
    let temp = [];
    for (let i=0; i < this.pretrazeni.length; i++) {
      let flag1 = false;
      let flag2 = false;
      let flag3 = false;
      let flag4 = false;
      if (this.imePretraga) {
        if (this.imePretraga != "" && this.pretrazeni[i].ime == this.imePretraga) {
          flag1 = true;
        }
      } else flag1 = true;
      if (this.prezimePretraga) {
        if (this.prezimePretraga != "" && this.pretrazeni[i].prezime == this.prezimePretraga) {
          flag2 = true;
        }
      } else flag2 = true;
      if (this.zemljaPretraga) {
        if (this.zemljaPretraga != "" && this.pretrazeni[i].drzava == this.zemljaPretraga) {
          flag3 = true;
        }
      } else flag3 = true;
      if (this.sportPretraga) {
        if (this.sportPretraga != "" && this.pretrazeni[i].sport == this.sportPretraga) {
          flag4 = true;
        }
      } else flag4 = true;
      if (flag1 && flag2 && flag3 && flag4) temp.push(this.pretrazeni[i]);
    }

    this.pretrazeni = temp;
    
    this.router.navigate(['neregistrovan']);
  }

  brojDrzava: number;
  trenStranica: number;
  drzaveNaStranici: number;
  velicineStranica : number[] = [10,20,50,100];

  sledecaStrana(pageData: PageEvent) {
    this.trenStranica = pageData.pageIndex;
    this.drzaveNaStranici = pageData.pageSize;

    let preostale = this.brojDrzava - (this.trenStranica * this.drzaveNaStranici);
    let temp = [];
    for (let i=0; i < this.drzaveNaStranici && i < preostale; i++) {
      temp.push(this.sveZemlje[(this.trenStranica * this.drzaveNaStranici) + i]);
    }
    this.zemlje = temp;
  }

  trenStranica1: number = 0;

  sledecaStrana1(pageData: PageEvent) {
    this.trenStranica1 = pageData.pageIndex;
    this.drzaveNaStranici = pageData.pageSize;

    let preostale = this.brojDrzava - (this.trenStranica1 * this.drzaveNaStranici);
    let temp = [];
    for (let i=0; i < this.drzaveNaStranici && i < preostale; i++) {
      temp.push(this.sveZemlje[(this.trenStranica1 * this.drzaveNaStranici) + i]);
    }
    this.zemlje1 = temp;
  }

}
