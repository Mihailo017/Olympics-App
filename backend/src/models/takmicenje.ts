import mongoose from 'mongoose';
import { Sportista } from '../temp/sportista';

const Schema = mongoose.Schema;

let Takmicenje = new Schema(
    {
        disciplina: {
            type: String
        },
        tip: {
            type: String
        },
        brojTakmicara: {
            type: String
        },
        formatRezultata: {
            type: String
        },
        brojKrugova: {
            type: Number
        },
        rangiranjeRezultata: {
            type: String
        },
        pocetak: {
            type: String
        },
        kraj: {
            type: String
        },
        lokacija: {
            type: String
        },
        delegat: {
            type: String
        },
        sportisti: {
            type: Array
        },
        rezultati1: {
            type: Array
        },
        rezultati2: {
            type: Array
        },
        rezultati3: {
            type: Array
        },
        status : {
            type: String
        }
    }
)

export default mongoose.model('Takmicenje', Takmicenje, 'Takmicenja');