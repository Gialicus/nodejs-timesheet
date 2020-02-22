import Joi from 'joi'
const validationSchema = {
    id: Joi.number().required(),
    dayName: Joi.number().required(),
    date: Joi.date().required(),
    isHolyDay: Joi.boolean().required(),
    amStart: Joi.string().length(5).required(),
    amEnd: Joi.string().length(5).required(),
    pmStart: Joi.string().length(5).required(),
    pmEnd: Joi.string().length(5).required()
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