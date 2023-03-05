import express from 'express';
import Zemlja from '../models/zemlja';

export class ZemljaController {
    dohvatiSveZemlje = (req: express.Request, res: express.Response)=>{

        Zemlja.find({}, (err, zemlje)=>{
            if (err)
                console.log(err);
            else
                res.json(zemlje);
        })
    }

    osvojenoZlato = (req: express.Request, res: express.Response)=>{

        let zemlja = req.body.zemlja;
        Zemlja.collection.updateOne({naziv: zemlja}, {$inc: {zlato: 1, ukupno: 1}}, (err, zemlje)=>{
            if (err)
                console.log(err);
            else
                res.json(zemlje);
        })
    }

    osvojenoSrebro = (req: express.Request, res: express.Response)=>{

        let zemlja = req.body.zemlja;
        Zemlja.collection.updateOne({naziv: zemlja}, {$inc: {srebro: 1, ukupno: 1}}, (err, zemlje)=>{
            if (err)
                console.log(err);
            else
                res.json(zemlje);
        })
    }

    osvojenaBronza = (req: express.Request, res: express.Response)=>{

        let zemlja = req.body.zemlja;
        Zemlja.collection.updateOne({naziv: zemlja}, {$inc: {bronza: 1, ukupno: 1}}, (err, zemlje)=>{
            if (err)
                console.log(err);
            else
                res.json(zemlje);
        })
    }

    
}