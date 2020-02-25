import { Schema, model } from 'mongoose'
const AggregateSchema = new Schema({
    user_id: {
        type: String,
        required: true
    },
    token: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    timesheet: {
        total: {
            type: Number
        },
        totalExtra: {
            type: Number
        },
        dailyTotals: {
            type: Array
        },
        dailyExtras: {
            type: Array
        },
        report: [
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
                    type: String
                },
                "amEnd": {
                    type: String
                },
                "pmStart": {
                    type: String
                },
                "pmEnd": {
                    type: String
                }
            }
        ]
    }

});
export default model('time_report', AggregateSchema)