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
const Aggregate_1 = __importDefault(require("../models/Aggregate"));
class TimesheetService {
    constructor() {
    }
    isValidItem(item) {
        if (!item)
            return { error: 'Cant processing nothing' };
        const validTimesheet = joi_1.default.validate(item, validation_1.default);
        if (validTimesheet.error != null)
            return { error: validTimesheet.error };
        const timesheet = new Timesheet_1.default({
            id: item.id,
            dayName: item.dayname,
            date: item.date,
            isHolyDay: item.isHolyDay,
            amStart: item.amStart,
            amEnd: item.amEnd,
            pmStart: item.pmStart,
            pmEnd: item.pmEnd
        });
        return timesheet;
    }
    createValidItems(items) {
        let list = [];
        items.forEach(item => {
            const element = this.isValidItem(item);
            list = [...list.concat(element)];
        });
        return list;
    }
    saveAggregate(aggregate) {
        return __awaiter(this, void 0, void 0, function* () {
            yield Aggregate_1.default.create(aggregate);
        });
    }
}
exports.default = TimesheetService;
