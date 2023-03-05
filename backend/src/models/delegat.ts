import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Delegat = new Schema(
    {
        ime: {
            type: String
        }
    }
)

export default mongoose.model('Delegat', Delegat, 'Delegati');