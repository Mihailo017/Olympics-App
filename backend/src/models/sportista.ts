import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Sportista = new Schema(
    {
        ime: {
            type: String
        },
        prezime: {
            type: String
        },
        pol: {
            type: String
        },
        disciplina: {
            type: String
        },
        drzava: {
            type: String
        },
        sport: {
            type: String
        }
    }
)

export default mongoose.model('Sportista', Sportista, 'Sportisti');