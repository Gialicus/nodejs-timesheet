import Joi from 'joi'
const validationSchema = {
    id: Joi.number().required(),
    dayname: Joi.number().required(),
    date: Joi.date().required(),
    isHolyDay: Joi.boolean().required(),
    amStart: Joi.string().required(),
    amEnd: Joi.string().required(),
    pmStart: Joi.string().required(),
    pmEnd: Joi.string().required()
}
export default validationSchema
// id: i,
// dayName: dayOfWeek,
// date: new_date.format('YYYY-MM-DD'),
// isHolyDay: dayFlag,
// amStart: '09:00',
// amEnd: '13:00',
// pmStart: '14:00',
// pmEnd: '18:00' 