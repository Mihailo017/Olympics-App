import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Zemlja = new Schema(
    {
        naziv: {
            type: String
        },
        sportisti: {
            type: Number
        },
        zlato: {
            type: Number
        },
        srebro: {
            type: Number
        },
        bronza: {
            type: Number
        },
        ukupno: {
            type: Number
        }
    }
)

export default mongoose.model('Zemlja', Zemlja, 'Zemlje');