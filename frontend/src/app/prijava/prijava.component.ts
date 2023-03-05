import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { KorisnikService } from '../korisnik.service';
import { Korisnik } from '../models/korisnik';

@Component({
  selector: 'app-prijava',
  templateUrl: './prijava.component.html',
  styleUrls: ['./prijava.component.css']
})
export class PrijavaComponent implements OnInit {

  constructor(private korisnikServis: KorisnikService, private router: Router) { }

  ngOnInit(): void {
    this.greska = null;
  }

  kor_ime: string;
  lozinka: string;
  tip: string;

  greska: string;

  prijava() {
    this.korisnikServis.prijava(this.kor_ime, this.lozinka, this.tip).subscribe((korisnik: Korisnik)=>{
      if (korisnik) {
        localStorage.setItem('ulogovan', JSON.stringify(korisnik));
        if (korisnik.tip == 'o') this.router.navigate(['organizator'])
        if (korisnik.tip == 'd') this.router.navigate(['delegat'])
        if (korisnik.tip == 'v') this.router.navigate(['vodja'])
      } else {
        this.greska = "Niste uneli ispravne podatke!";
      }
    })
    this.greska = "Niste uneli ispravne podatke!";
  }

  neregistrovan() {
    this.router.navigate(['neregistrovan']);
  }

  registracija() {
    this.router.navigate(['reg']);
  }

}
