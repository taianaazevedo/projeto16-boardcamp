import joi from 'joi'

export const gameSchema = joi.object({
    name: string().min(3).required(),
    image: string().required(),
    stockTotal: number.required(),
    pricePerDay: number().required()
})