import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Disciplina = new Schema(
    {
        naziv: {
            type: String
        },
        sport: {
            type: String
        },
        vrsta: {
            type: String
        }
    }
)

export default mongoose.model('Disciplina', Disciplina, 'Discipline');