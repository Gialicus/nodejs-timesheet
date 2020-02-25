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
const moment_1 = __importDefault(require("moment"));
class Service {
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
        return timesheet.toObject();
    }
    calculateDailyTotal(element) {
        const am_start = moment_1.default(element.amStart, 'HH:mm');
        const am_end = moment_1.default(element.amEnd, 'HH:mm');
        const pm_start = moment_1.default(element.pmStart, 'HH:mm');
        const pm_end = moment_1.default(element.pmEnd, 'HH:mm');
        if (am_end.isBefore(am_start) || pm_end.isBefore(pm_start))
            return 0;
        const am_dif = am_end.diff(am_start);
        const pm_dif = pm_end.diff(pm_start);
        const am_duration = moment_1.default.duration(am_dif);
        const pm_duration = moment_1.default.duration(pm_dif);
        const number_of_am_hours = am_duration.asHours();
        const number_of_pm_hours = pm_duration.asHours();
        const totalForDay = number_of_am_hours + number_of_pm_hours;
        return totalForDay;
    }
    createValidItems(items) {
        let list = [];
        let dailyTotals = [];
        let dailyExtras = [];
        let totalInMounth = 0;
        let extraInMounth = 0;
        items.forEach(item => {
            const element = this.isValidItem(item);
            let dailyTotal = 0;
            let extraTotal = 0;
            if (!element.isHolyDay) {
                dailyTotal = this.calculateDailyTotal(element);
                if (dailyTotal > 8) {
                    extraTotal = this.calculateDailyTotal(element) - 8;
                    dailyTotal = 8;
                }
            }
            else if (element.isHolyDay && (element.amStart != '00:00' || element.amEnd != '00:00' || element.pmStart != '00:00' || element.pmEnd != '00:00')) {
                extraTotal = this.calculateDailyTotal(element);
            }
            totalInMounth = totalInMounth + dailyTotal;
            extraInMounth = extraInMounth + extraTotal;
            dailyTotals = [...dailyTotals.concat(dailyTotal)];
            dailyExtras = [...dailyExtras.concat(extraTotal)];
            list = [...list.concat(element)];
        });
        const itemToCombine = {
            total: totalInMounth,
            totalExtra: extraInMounth,
            dailyTotals: dailyTotals,
            dailyExtras: dailyExtras,
            report: list
        };
        return itemToCombine;
    }
    getDTObyUser(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const dto = yield Aggregate_1.default.find({ email: email });
            return dto;
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const allItems = yield Aggregate_1.default.find();
            return allItems;
        });
    }
    saveDTO(aggregate) {
        return __awaiter(this, void 0, void 0, function* () {
            yield Aggregate_1.default.create(aggregate);
        });
    }
}
exports.default = Service;
