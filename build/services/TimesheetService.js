"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validation_1 = __importDefault(require("../models/validation"));
const joi_1 = __importDefault(require("joi"));
const Timesheet_1 = __importDefault(require("../models/Timesheet"));
class TimesheetService {
    constructor() {
    }
    processTimesheet(item) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!item)
                return;
            const validTimesheet = joi_1.default.validate(item, validation_1.default);
            if (validTimesheet.error != null)
                return null;
            const timesheet = new Timesheet_1.default({
                id: item.id,
                dayname: item.dayname,
                date: item.date,
                isHolyDay: item.isHolyDay,
                amStart: item.amStart,
                amEnd: item.amEnd,
                pmStart: item.pmStart,
                pmEnd: item.pmEnd
            });
            yield Timesheet_1.default.create(timesheet);
            return timesheet;
        });
    }
}
exports.TimesheetService = TimesheetService;
