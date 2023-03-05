import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { KorisnikService } from '../korisnik.service';
import { Korisnik } from '../models/korisnik';
import { Zemlja } from '../models/zemlja';
import { ZemljaService } from '../zemlja.service';

@Component({
  selector: 'app-registracija',
  templateUrl: './registracija.component.html',
  styleUrls: ['./registracija.component.css']
})
export class RegistracijaComponent implements OnInit {

  constructor(private zemljaServis: ZemljaService, private korisnikServis: KorisnikService, private router: Router) { }

  ngOnInit(): void {
    this.greska = false;
    this.zavrseno = false;
    this.porukaGreske = null;
    this.zemljaServis.dohvatiSveZemlje().subscribe((dohvacene: Zemlja[])=>{
      this.zemlje = dohvacene;
    })
  }

  kor_ime: string;
  lozinka: string;
  potvrda: string;
  ime: string;
  prezime: string;
  zemlja: string;
  email: string;
  tip: string;

  zemlje: Zemlja[];

  greska: boolean;
  zavrseno: boolean;

  porukaGreske: string;

  reg(form: NgForm) {
    this.porukaGreske = null;
    // if(form.invalid) {
    //   this.porukaGreske = "Lozinka treba da ima najmanje 8 karaktera, a najviše 12 karaktera. Minimalan broj velikih slova je 1, minimalan broj malih slova je 3, minimalan broj numerika je 2 i minimalan broj specijalnih karaktera je takođe 2. Početni karakter mora biti slovo malo ili veliko. Maksimalan broj uzastopnih karaktera je tri."
    //   return;
    // }
    //provera sifre
    if (this.lozinka != this.potvrda) {
      this.porukaGreske = "Lozinka i potvrda se moraju poklapati.";
      return;
    }

    if (!this.kor_ime || !this.lozinka || !this.ime || !this.prezime || !this.zemlja || !this.email || !this.tip) {
      this.porukaGreske = "Sva polja su obavezna";
      return;
    }
    this.korisnikServis.postojiKorisnik(this.kor_ime).subscribe((korisnik: Korisnik)=>{
      if (!korisnik) {
        if (this.tip == "v") {
          this.korisnikServis.postojiVodja(this.zemlja).subscribe((korisnik: Korisnik)=>{
            if (!korisnik) {
              this.korisnikServis.registracija(this.kor_ime, this.lozinka, this.ime, this.prezime, this.zemlja, this.email, this.tip).subscribe();
              this.zavrseno = true;
            } 
            else {
              this.porukaGreske = "Vec postoji vodja delegacije za izabranu drzavu."
            }
          })
        } else {
          this.korisnikServis.registracija(this.kor_ime, this.lozinka, this.ime, this.prezime, this.zemlja, this.email, this.tip).subscribe();
          this.zavrseno = true;
        }
      } else {
        this.porukaGreske = "Vec postoji korisnik sa tim korisnickim imenom."
      }
    });
  }

  pocetna() {
    this.router.navigate(['neregistrovan'])
  }

  prijava() {
    this.router.navigate(['prijava'])
  }
}
