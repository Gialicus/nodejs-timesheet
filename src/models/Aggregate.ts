import { Schema, model } from 'mongoose'
const AggregateSchema = new Schema({
    user_id: {
        type: String,
        required: true
    },
    user_email: {
        type: String,
        required: true
    },
    timesheet: [
        {
            "id": {
                type: Number
            },
            "dayName": {
                type: Number
            },
            "date": {
                type: Date
            },
            "isHolyDay": {
                type: Boolean
            },
            "amStart": {
                type: String,
            },
            "amEnd": {
                type: String,
            },
            "pmStart": {
                type: String,
            },
            "pmEnd": {
                type: String,
            }
        }
    ]
});
export default model('aggregate-ts', AggregateSchema)