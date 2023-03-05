import express from 'express';
import { SportController } from '../controllers/sport.controller';

const sportRouter = express.Router();

sportRouter.route('/dodajSport').post(
    (req, res)=> new SportController().dodajSport(req, res)
)

sportRouter.route('/dodajDisciplinu').post(
    (req, res)=> new SportController().dodajDisciplinu(req, res)
)

sportRouter.route('/dodajTakmicenje').post(
    (req, res)=> new SportController().dodajTakmicenje(req, res)
)

sportRouter.route('/dodajSportistu').post(
    (req, res)=> new SportController().dodajSportistu(req, res)
)

sportRouter.route('/dodajDatumeTakmicenja').post(
    (req, res)=> new SportController().dodajDatumeTakmicenja(req, res)
)

sportRouter.route('/dohvatiDisciplinu').post(
    (req, res)=> new SportController().dohvatiDisciplinu(req, res)
)

sportRouter.route('/dohvatiSveSportove').get(
    (req, res)=> new SportController().dohvatiSveSportove(req, res)
)

sportRouter.route('/dohvatiSveDiscipline').get(
    (req, res)=> new SportController().dohvatiSveDiscpiline(req, res)
)

sportRouter.route('/dohvatiSveFormate').get(
    (req, res)=> new SportController().dohvatiSveFormate(req, res)
)

sportRouter.route('/dohvatiSveLokacije').get(
    (req, res)=> new SportController().dohvatiSveLokacije(req, res)
)

sportRouter.route('/dohvatiSveDelegate').get(
    (req, res)=> new SportController().dohvatiSveDelegate(req, res)
)

sportRouter.route('/dohvatiSvaTakmicenja').get(
    (req, res)=> new SportController().dohvatiSvaTakmicenja(req, res)
)

sportRouter.route('/dohvatiTakmicenjaDelegata').post(
    (req, res)=> new SportController().dohvatiTakmicenjaDelegata(req, res)
)

sportRouter.route('/dohvatiTakmicare').post(
    (req, res)=> new SportController().dohvatiTakmicare(req, res)
)


sportRouter.route('/formiranoTakmicenje').post(
    (req, res)=> new SportController().formiranoTakmicenje(req, res)
)

sportRouter.route('/posaljiRezultate').post(
    (req, res)=> new SportController().posaljiRezultate(req, res)
)

sportRouter.route('/dohvatiSveSportiste').get(
    (req, res)=> new SportController().dohvatiSveSportiste(req, res)
)


sportRouter.route('/dohvatiSportistuIme').post(
    (req, res)=> new SportController().dohvatiSportistuIme(req, res)
)

sportRouter.route('/dohvatiSportistuPrezime').post(
    (req, res)=> new SportController().dohvatiSportistuPrezime(req, res)
)

sportRouter.route('/dohvatiSportistuDrzava').post(
    (req, res)=> new SportController().dohvatiSportistuDrzava(req, res)
)

sportRouter.route('/dohvatiSportistuSport').post(
    (req, res)=> new SportController().dohvatiSportistuSport(req, res)
)

sportRouter.route('/zavrsiTakmicenje').post(
    (req, res)=> new SportController().zavrsiTakmicenje(req, res)
)

sportRouter.route('/postojiSport').post(
    (req, res)=> new SportController().postojiSport(req, res)
)

sportRouter.route('/postojiDisciplina').post(
    (req, res)=> new SportController().postojiDisciplina(req, res)
)

sportRouter.route('/postojiTakmicenje').post(
    (req, res)=> new SportController().postojiTakmicenje(req, res)
)

export default sportRouter;