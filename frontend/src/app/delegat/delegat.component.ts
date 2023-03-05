import { Time } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Korisnik } from '../models/korisnik';
import { Lokacija } from '../models/lokacija';
import { Takmicenje } from '../models/takmicenje';
import { SportoviService } from '../sportovi.service';

@Component({
  selector: 'app-delegat',
  templateUrl: './delegat.component.html',
  styleUrls: ['./delegat.component.css']
})
export class DelegatComponent implements OnInit {

  constructor(private sportoviServis: SportoviService, private router: Router) { }

  ngOnInit(): void {
    // Ovde treba se dohvataju samo takmicenja koja nisu zavrsena
    let delegat:Korisnik = JSON.parse(localStorage.getItem('ulogovan'))
    this.sportoviServis.dohvatiTakmicenjaDelegata(delegat.kor_ime).subscribe((dohvacena: Takmicenje[])=>{
      let temp = [];
      for (let i=0; i < dohvacena.length; i++) {
        if (dohvacena[i].status != 'zavrseno') {
          temp.push(dohvacena[i]);
        }
      }
      this.takmicenjaMoja = temp;
    })
  }


  takmicenjaMoja: Takmicenje[];

  izaberiTakmicenje(i) {
    localStorage.setItem('izabranoTakmicenje', JSON.stringify(this.takmicenjaMoja[i]));
    this.router.navigate(['delegat-takmicenje'])
  }

}
