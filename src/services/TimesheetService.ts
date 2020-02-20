import validationSchema from '../models/validation'
import Joi from 'joi';
import Timesheet from '../models/Timesheet';


export class TimesheetService {
    constructor() { 
    }
    
    async processTimesheet(item: any) {
        if (!item) return
        const validTimesheet = Joi.validate(item, validationSchema)
        if ( validTimesheet.error != null) return null
        const timesheet = new Timesheet({
            id: item.id,
            dayname: item.dayname,
            date: item.date,
            isHolyDay: item.isHolyDay,
            amStart: item.amStart,
            amEnd: item.amEnd,
            pmStart: item.pmStart,
            pmEnd: item.pmEnd
        })
        return validTimesheet
    }
}