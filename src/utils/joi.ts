import mongoose from 'mongoose'
import Joi, { ObjectSchema } from 'joi'

const joigoose = require('joigoose')(mongoose)

export { Joi }

export const convertJoiSchemaToMongoose = (joiSchema: ObjectSchema): mongoose.Schema => {
    return new mongoose.Schema(joigoose.convert(joiSchema))
}