import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Sport = new Schema(
    {
        naziv: {
            type: String
        }
    }
)

export default mongoose.model('Sport', Sport, 'Sportovi');