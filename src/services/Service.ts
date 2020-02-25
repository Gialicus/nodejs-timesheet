import validationSchema from '../models/validation'
import Joi from 'joi';
import Timesheet from '../models/Timesheet';
import Aggregate from '../models/Aggregate'
import moment from 'moment'



export default class Service {
    constructor() {
    }

    private isValidItem(item: any) {
        if (!item) return { error: 'Cant processing nothing' }
        const validTimesheet = Joi.validate(item, validationSchema)
        if (validTimesheet.error != null) return { error: validTimesheet.error }
        const timesheet = new Timesheet({
            id: item.id,
            dayName: item.dayname,
            date: item.date,
            isHolyDay: item.isHolyDay,
            amStart: item.amStart,
            amEnd: item.amEnd,
            pmStart: item.pmStart,
            pmEnd: item.pmEnd
        })
        return timesheet.toObject()
    }
    private calculateDailyTotal(element: any) {
        const am_start = moment(element.amStart, 'HH:mm')
        const am_end = moment(element.amEnd, 'HH:mm')
        const pm_start = moment(element.pmStart, 'HH:mm')
        const pm_end = moment(element.pmEnd, 'HH:mm')
        if (am_end.isBefore(am_start) || pm_end.isBefore(pm_start)) return 0
        const am_dif = am_end.diff(am_start)
        const pm_dif = pm_end.diff(pm_start)
        const am_duration = moment.duration(am_dif)
        const pm_duration = moment.duration(pm_dif)
        const number_of_am_hours = am_duration.asHours()
        const number_of_pm_hours = pm_duration.asHours()
        const totalForDay = number_of_am_hours + number_of_pm_hours
        return totalForDay;
    }
    createValidItems(items: any[]) {
        let list: any[] = []
        let dailyTotals: any[] = []
        let dailyExtras: any[] = []
        let totalInMounth: number = 0
        let extraInMounth: number = 0
        items.forEach(item => {
            const element = this.isValidItem(item)
            let dailyTotal = 0
            let extraTotal = 0
            if (!element.isHolyDay) {
                dailyTotal = this.calculateDailyTotal(element)
                if (dailyTotal > 8) {
                    extraTotal = this.calculateDailyTotal(element) - 8
                    dailyTotal = 8
                }
            }
            else if (element.isHolyDay && (element.amStart != '00:00' || element.amEnd != '00:00' || element.pmStart != '00:00' || element.pmEnd != '00:00')) {
                extraTotal = this.calculateDailyTotal(element)
            }
            totalInMounth = totalInMounth + dailyTotal
            extraInMounth = extraInMounth + extraTotal
            dailyTotals = [...dailyTotals.concat(dailyTotal)]
            dailyExtras = [...dailyExtras.concat(extraTotal)]
            list = [...list.concat(element)]
        })
        const itemToCombine = {
            total: totalInMounth,
            totalExtra: extraInMounth,
            dailyTotals: dailyTotals,
            dailyExtras: dailyExtras,
            report: list
        }
        return itemToCombine
    }
    async getDTObyUser(email: string) {
        const dto = await Aggregate.find({email: email})
        return dto
    }
    async getAll() {
        const allItems = await Aggregate.find()
        return allItems
    }

    async saveDTO(aggregate: any) {
        await Aggregate.create(aggregate);
    }
}