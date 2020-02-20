import { Schema, model } from 'mongoose'
const TimesheetSchema = new Schema({
    "id": {
        type: Number,
        required: true
    },
    "dayName": {
        type: Number,
        required: true
    },
    "date": {
        type: Date,
        required: true
    },
    "isHolyDay": {
        type: Boolean,
        required: true
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
});
export default model('Timesheet', TimesheetSchema)
// id: i,
// dayName: dayOfWeek,
// date: new_date.format('YYYY-MM-DD'),
// isHolyDay: dayFlag,
// amStart: '09:00',
// amEnd: '13:00',
// pmStart: '14:00',
// pmEnd: '18:00' 