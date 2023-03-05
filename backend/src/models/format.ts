import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Format = new Schema(
    {
        naziv: {
            type: String
        },
        format: {
            type: String
        }
    }
)

export default mongoose.model('Format', Format, 'Formati');