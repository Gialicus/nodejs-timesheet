"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const AggregateSchema = new mongoose_1.Schema({
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
exports.default = mongoose_1.model('time_report', AggregateSchema);
