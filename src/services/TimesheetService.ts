import validationSchema from '../models/validation'
import Joi from 'joi';
import Timesheet from '../models/Timesheet';
import Aggregate from '../models/Aggregate'
import moment from 'moment'
import User from '../models/User';


export default class TimesheetService {
    constructor() { 
    }
    
    private isValidItem(item: any) {
        if (!item) return {error: 'Cant processing nothing'}
        const validTimesheet = Joi.validate(item, validationSchema)
        if ( validTimesheet.error != null) return {error: validTimesheet.error}
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
        return timesheet
    }
    createValidItems(items: any[]) {
        let list: any[] = []
        items.forEach( item => {
            const element = this.isValidItem(item)
            list = [...list.concat(element)] 
        })
        return list
    }
    
    async saveAggregate(aggregate: any) {
        await Aggregate.create(aggregate);
    }
}