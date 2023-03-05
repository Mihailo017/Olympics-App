import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import zemljaRouter from './routes/zemlja.routes';
import sportRouter from './routes/sport.routes';
import korisnikRouter from './routes/korisnik.routes';

const app = express();

app.use(cors());
app.use(bodyParser.json())

mongoose.connect('mongodb://localhost:27017/projekat_baza');
const connection = mongoose.connection;
connection.once('open', ()=>{
    console.log('mongo ok')
})

const router = express.Router();

router.use('/zemlje', zemljaRouter);
router.use('/sportovi', sportRouter);
router.use('/korisnici', korisnikRouter);



app.use('/', router);
app.listen(4000, () => console.log(`Express server running on port 4000`));