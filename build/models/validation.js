"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const validationSchema = {
    id: joi_1.default.number().required(),
    dayname: joi_1.default.number().required(),
    date: joi_1.default.date().required(),
    isHolyDay: joi_1.default.boolean().required(),
    amStart: joi_1.default.string().required(),
    amEnd: joi_1.default.string().required(),
    pmStart: joi_1.default.string().required(),
    pmEnd: joi_1.default.string().required()
};
exports.default = validationSchema;
// id: i,
// dayName: dayOfWeek,
// date: new_date.format('YYYY-MM-DD'),
// isHolyDay: dayFlag,
// amStart: '09:00',
// amEnd: '13:00',
// pmStart: '14:00',
// pmEnd: '18:00' 
