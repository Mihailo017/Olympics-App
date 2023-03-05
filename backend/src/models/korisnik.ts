import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Korisnik = new Schema(
    {
        kor_ime: {
            type: String
        },
        lozinka: {
            type: String
        },
        ime: {
            type: String
        },
        prezime: {
            type: String
        },
        zemlja: {
            type: String
        },
        email: {
            type: String
        },
        tip: {
            type: String
        },
        jeRegistrovan: {
            type: Number
        },
        brTakmicenja: {
            type: Number
        }
    }
)

export default mongoose.model('Korisnik', Korisnik, 'Korisnici');