import express from 'express';
import { KorisnikController } from '../controllers/korisnik.controller';


const korisnikRouter = express.Router();

korisnikRouter.route('/registracija').post(
    (req, res)=> new KorisnikController().registracija(req, res)
)

korisnikRouter.route('/prijava').post(
    (req, res)=> new KorisnikController().prijava(req, res)
)

korisnikRouter.route('/dohvatiSveZahteve').get(
    (req, res)=> new KorisnikController().dohvatiSveZahteve(req, res)
)

korisnikRouter.route('/odobriKorisnika').post(
    (req, res)=> new KorisnikController().odobriKorisnika(req, res)
)

korisnikRouter.route('/odbijKorisnika').post(
    (req, res)=> new KorisnikController().odbijKorisnika(req, res)
)

korisnikRouter.route('/postojiKorisnik').post(
    (req, res)=> new KorisnikController().postojiKorisnik(req, res)
)

korisnikRouter.route('/postojiVodja').post(
    (req, res)=> new KorisnikController().postojiVodja(req, res)
)

korisnikRouter.route('/dohvatiSveDelegate').get(
    (req, res)=> new KorisnikController().dohvatiSveDelegate(req, res)
)

korisnikRouter.route('/povecajBrTakmicenja').post(
    (req, res)=> new KorisnikController().povecajBrTakmicenja(req, res)
)

export default korisnikRouter;