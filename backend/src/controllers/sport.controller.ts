import express from 'express';
import Format from '../models/format';
import Disciplina from '../models/disciplina';
import Sport from '../models/sport';
import Lokacija from '../models/lokacija';
import Takmicenje from '../models/takmicenje';
import Delegat from '../models/delegat';
import Sportista from '../models/sportista';
import Zemlja from '../models/zemlja';

export class SportController {
    dodajSport = (req: express.Request, res: express.Response)=>{
        let nazivSporta = req.body.naziv;
        const sport = new Sport({naziv: nazivSporta});

        sport.save((err)=>{
            if (err) console.log(err);
        })
    }

    dodajDisciplinu = (req: express.Request, res: express.Response)=>{
        let naziv = req.body.naziv;
        let sport = req.body.sport;
        let vrsta = req.body.vrsta;
        let br_igraca = req.body.br_igraca;
        const disciplina = new Disciplina({naziv: naziv, sport: sport, vrsta: vrsta, br_igraca: br_igraca});

        disciplina.save((err)=>{
            if (err) console.log(err);
        })
    }

    dohvatiDisciplinu = (req: express.Request, res: express.Response)=>{
        let naziv = req.body.naziv;
        const disciplina = new Disciplina({naziv: naziv});

        Disciplina.findOne({naziv: naziv}, (err, disciplina)=>{
            if (err)
                console.log(err);
            else
                res.json(disciplina);
        })
    }

    dodajTakmicenje = (req: express.Request, res: express.Response)=>{
        let disciplina = req.body.disciplina;
        let tip = req.body.tip;
        let brojTakmicara =  req.body.brojTakmicara;
        let formatRezultata = req.body.formatRezultata;
        let brojKrugova = req.body.brojKrugova;
        let rangiranjeRezultata = req.body.rangiranjeRezultata;
        let pocetak = req.body.pocetak;
        let kraj = req.body.kraj;
        let lokacija = req.body.lokacija;
        let format = req.body.format;
        let delegat = req.body.delegat;
        let sportisti = req.body.sportisti;
        // let rezultati1: any[] = [];
        // let rezultati2: any[] = [];
        // let rezultati3: any[] = [];

        const takmicenje = new Takmicenje({disciplina: disciplina, tip: tip, brojTakmicara: brojTakmicara,
            formatRezultata: formatRezultata, brojKrugova: brojKrugova, rangiranjeRezultata: rangiranjeRezultata,
             pocetak: pocetak, kraj: kraj, lokacija: lokacija, delegat: delegat, sportisti: sportisti, status: ""});

        takmicenje.save((err)=>{
            if (err) console.log(err);
        })

        for (let i=0; i < sportisti.length; i++) {
            Takmicenje.collection.updateOne({disciplina: disciplina, tip: tip}, {$push: {'sportisti': sportisti[i]}})
        }


        

        // Format.findOne({naziv: nazivFormata}, (err, f)=>{
        //     if (err)
        //         console.log(err);
        //     else
        //         if (!f) {
        //             const ff = new Format({naziv: nazivFormata, format: format})
        //             ff.save((err)=>{
        //             if (err) console.log(err);
        //             })
        //         }
        // })
    }

    dodajSportistu = (req: express.Request, res: express.Response)=>{
        let ime = req.body.ime;
        let prezime = req.body.prezime;
        let pol = req.body.pol;
        let disciplina = req.body.disciplina;
        let drzava = req.body.drzava;
        let sport = req.body.sport;
        const sportista = new Sportista({ime: ime, prezime: prezime, pol: pol, disciplina: disciplina, drzava: drzava, sport: sport});

        sportista.save((err)=>{
            if (err) console.log(err);
        })

        Zemlja.collection.updateOne({naziv: drzava}, {$inc: {sportisti : 1}});
    }

    dodajDatumeTakmicenja = (req: express.Request, res: express.Response)=>{
        let disciplina = req.body.disciplina;
        let tip = req.body.tip;
        let pocetak = req.body.datumPocetka;
        let kraj = req.body.datumKraja;
        let lokacija = req.body.lokacija;

        Takmicenje.updateOne({disciplina: disciplina, tip: tip}, {$set: {pocetak: pocetak, kraj: kraj, lokacija: lokacija}}, (err, a)=>{
            if (err)
                console.log(err);
            else
                res.json(a);
        })
    }

    dohvatiSveSportove = (req: express.Request, res: express.Response)=>{

        Sport.find({}, (err, sportovi)=>{
            if (err)
                console.log(err);
            else
                res.json(sportovi);
        })
    }

    dohvatiSveDiscpiline= (req: express.Request, res: express.Response)=>{

        Disciplina.find({}, (err, discipline)=>{
            if (err)
                console.log(err);
            else
                res.json(discipline);
        })
    }

    dohvatiSveFormate= (req: express.Request, res: express.Response)=>{

        Format.find({}, (err, formati)=>{
            if (err)
                console.log(err);
            else
                res.json(formati);
        })
    }

    dohvatiSveLokacije= (req: express.Request, res: express.Response)=>{

        Lokacija.find({}, (err, lokacije)=>{
            if (err)
                console.log(err);
            else
                res.json(lokacije);
        })
    }

    dohvatiSveDelegate= (req: express.Request, res: express.Response)=>{

        Delegat.find({}, (err, delegati)=>{
            if (err)
                console.log(err);
            else
                res.json(delegati);
        })
    }

    dohvatiSvaTakmicenja= (req: express.Request, res: express.Response)=>{

        Takmicenje.find({}, (err, takmicenja)=>{
            if (err)
                console.log(err);
            else
                res.json(takmicenja);
        })
    }

    dohvatiTakmicenjaDelegata= (req: express.Request, res: express.Response)=>{
        let delegat = req.body.delegat;
        Takmicenje.find({delegat: delegat}, (err, takmicenja)=>{
            if (err)
                console.log(err);
            else
                res.json(takmicenja);
        })
    }

    dohvatiTakmicare= (req: express.Request, res: express.Response)=>{
        let disciplina = req.body.disciplina;
        let pol = req.body.tip;
        Sportista.find({disciplina: disciplina, pol: pol}, (err, sportisti)=>{
            if (err)
                console.log(err);
            else
                res.json(sportisti);
        })
    }

    formiranoTakmicenje= (req: express.Request, res: express.Response)=>{
        let disciplina = req.body.disciplina;
        let pol = req.body.pol;
        Takmicenje.findOne({disciplina: disciplina, tip: pol}, (err, takmicenje)=>{
            if (err)
                console.log(err);
            else
                if (takmicenje)
                    res.json(true);
                else
                    res.json(false);
        })
    }

    posaljiRezultate= (req: express.Request, res: express.Response)=>{
        let disciplina = req.body.disciplina;
        let pol = req.body.pol;
        let rezultati1 = req.body.rezultati1;
        let rezultati2 = req.body.rezultati2;
        let rezultati3 = req.body.rezultati3;

        let r2: any[] = [];
        Takmicenje.updateOne({disciplina: disciplina, tip: pol}, {$set: {'rezultati2': r2}})

        for (let i=0; i < rezultati1.length; i++) {
            Takmicenje.collection.updateOne({disciplina: disciplina, tip: pol}, {$push: {'rezultati1': rezultati1[i]}}, (err, a)=>{
                if (err) console.log(err);
            })
        }

        for (let i=0; i < rezultati2.length; i++) {
            Takmicenje.collection.updateOne({disciplina: disciplina, tip: pol}, {$push: {'rezultati2': rezultati2[i]}}, (err, a)=>{
                if (err) console.log(err);
            })
        }

        for (let i=0; i < rezultati3.length; i++) {
            Takmicenje.collection.updateOne({disciplina: disciplina, tip: pol}, {$push: {'rezultati3': rezultati3[i]}}, (err, a)=>{
                if (err) console.log(err);
            })
        }
    }

    dohvatiSveSportiste= (req: express.Request, res: express.Response)=>{
        Sportista.find({}, (err, sportisti)=>{
            if (err)
                console.log(err);
            else
                res.json(sportisti);
        })
    }

    dohvatiSportistuIme= (req: express.Request, res: express.Response)=>{
        let ime = req.body.ime;
        
        Sportista.find({ime: ime}, (err, sportisti)=>{
            if (err)
                console.log(err);
            else
                res.json(sportisti);
        })
    }

    dohvatiSportistuPrezime= (req: express.Request, res: express.Response)=>{
        let prezime = req.body.prezime;
        
        Sportista.find({prezime: prezime}, (err, sportisti)=>{
            if (err)
                console.log(err);
            else
                res.json(sportisti);
        })
    }
    dohvatiSportistuDrzava= (req: express.Request, res: express.Response)=>{
        let drzava = req.body.drzava;
        
        Sportista.find({drzava: drzava}, (err, sportisti)=>{
            if (err)
                console.log(err);
            else
                res.json(sportisti);
        })
    }
    dohvatiSportistuSport= (req: express.Request, res: express.Response)=>{
        let sport = req.body.sport;
        
        Sportista.find({sport: sport}, (err, sportisti)=>{
            if (err)
                console.log(err);
            else
                res.json(sportisti);
        })
    }

    zavrsiTakmicenje= (req: express.Request, res: express.Response)=>{
        let disciplina = req.body.disciplina;
        let tip = req.body.tip;

        Takmicenje.collection.updateOne({disciplina: disciplina, tip: tip}, {$set: {'status': "zavrseno"}})
    
        res.json("");
    }

    postojiSport= (req: express.Request, res: express.Response)=>{
        let naziv = req.body.naziv;
        Sport.findOne({naziv: naziv}, (err, sport)=>{
            if (err)
                console.log(err);
            else
                res.json(sport);
        })
    }

    postojiDisciplina= (req: express.Request, res: express.Response)=>{
        let naziv = req.body.naziv;
        Disciplina.findOne({naziv: naziv}, (err, disciplina)=>{
            if (err)
                console.log(err);
            else
                res.json(disciplina);
        })
    }

    postojiTakmicenje= (req: express.Request, res: express.Response)=>{
        let disciplina = req.body.disciplina;
        let tip = req.body.tip;
        Takmicenje.findOne({disciplina: disciplina, tip: tip}, (err, takmicenje)=>{
            if (err)
                console.log(err);
            else
                res.json(takmicenje);
        })
    }
    
    
}