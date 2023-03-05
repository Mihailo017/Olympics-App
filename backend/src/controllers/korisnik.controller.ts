import express from 'express';
import Format from '../models/format';
import Disciplina from '../models/disciplina';
import Sport from '../models/sport';
import Lokacija from '../models/lokacija';
import Takmicenje from '../models/takmicenje';
import Delegat from '../models/delegat';
import Sportista from '../models/sportista';
import Korisnik from '../models/korisnik';

export class KorisnikController {
   

    registracija = (req: express.Request, res: express.Response)=>{
        let kor_ime = req.body.kor_ime;
        let loznika = req.body.loznika;
        let ime = req.body.ime;
        let prezime = req.body.prezime;
        let zemlja = req.body.zemlja;
        let email = req.body.email;
        let tip = req.body.tip;

       
        const korisnik = new Korisnik({kor_ime: kor_ime, lozinka: loznika, ime: ime, prezime: prezime, zemlja: zemlja, email: email, tip: tip, jeRegistrovan: 0, brTakmicenja: 0});
        korisnik.save((err)=>{
            if (err) console.log(err);
        })

        res.json("");

    }

    postojiKorisnik = (req: express.Request, res: express.Response)=>{
        let kor_ime = req.body.kor_ime;
       
        Korisnik.findOne({kor_ime: kor_ime}, (err, korisnik)=>{
            if (err) 
                console.log(err)
            else
                res.json(korisnik)
        })
    }

    postojiVodja = (req: express.Request, res: express.Response)=>{
        let zemlja = req.body.zemlja;
       
        Korisnik.findOne({zemlja: zemlja, tip: "v"}, (err, korisnik)=>{
            if (err) 
                console.log(err)
            else
                res.json(korisnik)
        })
    }

    prijava = (req: express.Request, res: express.Response)=>{
        let kor_ime = req.body.kor_ime;
        let loznika = req.body.loznika;
        let tip = req.body.tip;

        Korisnik.findOne({kor_ime: kor_ime, lozinka:loznika, tip:tip, jeRegistrovan: 1}, (err, korisnik)=>{
            if (err) 
                console.log(err)
            else
                res.json(korisnik)
        })
    }

    dohvatiSveZahteve = (req: express.Request, res: express.Response)=>{

        Korisnik.find({jeRegistrovan: 0}, (err, korisnik)=>{
            if (err) 
                console.log(err)
            else
                res.json(korisnik)
        })
    }

    odobriKorisnika = (req: express.Request, res: express.Response)=>{
        let kor_ime = req.body.kor_ime;
        Korisnik.collection.updateOne({kor_ime: kor_ime}, {$set: {'jeRegistrovan': 1}})
        res.json("");
    }

    odbijKorisnika = (req: express.Request, res: express.Response)=>{
        let kor_ime = req.body.kor_ime;
        Korisnik.collection.deleteOne({kor_ime: kor_ime});
        res.json("");
    }

    dohvatiSveDelegate = (req: express.Request, res: express.Response)=>{

        Korisnik.find({tip: "d", jeRegistrovan: 1}, (err, korisnik)=>{
            if (err) 
                console.log(err)
            else
                res.json(korisnik)
        })
    }

    povecajBrTakmicenja = (req: express.Request, res: express.Response)=>{
        let kor_ime = req.body.kor_ime;
        Korisnik.collection.updateOne({kor_ime: kor_ime}, {$inc: {brTakmicenja : 1}});
        res.json("");
    }
    
}

