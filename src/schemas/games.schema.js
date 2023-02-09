import joi from 'joi'

export const gameSchema = joi.object({
    name: joi.string().min(3).required(),
    image: joi.string().required(),
    stockTotal: joi.number().min(1).required(),
    pricePerDay: joi.number().min(1).required()
})