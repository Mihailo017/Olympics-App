import express from 'express';
import { ZemljaController } from '../controllers/zemlja.controller';

const zemljaRouter = express.Router();

zemljaRouter.route('/dohvatiSveZemlje').get(
    (req, res)=> new ZemljaController().dohvatiSveZemlje(req, res)
)

zemljaRouter.route('/osvojenoZlato').post(
    (req, res)=> new ZemljaController().osvojenoZlato(req, res)
)

zemljaRouter.route('/osvojenoSrebro').post(
    (req, res)=> new ZemljaController().osvojenoSrebro(req, res)
)

zemljaRouter.route('/osvojenaBronza').post(
    (req, res)=> new ZemljaController().osvojenaBronza(req, res)
)

export default zemljaRouter;