import { model } from 'mongoose'
import { IUserModel } from '@/interfaces/user'
import { userErrorMessage } from '@/errors/messages'
import { FIRST_NAME_REGEX, LAST_NAME_REGEX, PHONE_REGEX, PASSWORD_REGEX } from '@/utils/regexes'
import { Joi, convertJoiSchemaToMongoose } from '@/utils/joi'

export const JoiUserSchema = Joi.object({
    firstname: Joi.string().trim()
        .pattern(FIRST_NAME_REGEX)
        .required()
        .empty()
        .messages({
            'string.base': userErrorMessage.INVALID_FIRST_NAME_MESSAGE,
            'string.pattern.base': userErrorMessage.INVALID_FIRST_NAME_MESSAGE,
            'string.empty': userErrorMessage.INVALID_FIRST_NAME_MESSAGE,
            'any.required': userErrorMessage.INVALID_FIRST_NAME_MESSAGE,
        }),
  
    lastname: Joi.string().trim()
        .pattern(LAST_NAME_REGEX)
        .required()
        .empty()
        .messages({
            'string.base': userErrorMessage.INVALID_LAST_NAME_MESSAGE,
            'string.pattern.base': userErrorMessage.INVALID_LAST_NAME_MESSAGE,
            'string.empty': userErrorMessage.INVALID_LAST_NAME_MESSAGE,
            'any.required': userErrorMessage.INVALID_LAST_NAME_MESSAGE,
        }),
  
    email: Joi.string().trim()
        .email()
        .required()
        .empty()
        .messages({
            'string.base': userErrorMessage.INVALID_EMAIL_MESSAGE,
            'string.email': userErrorMessage.INVALID_EMAIL_MESSAGE,
            'string.empty': userErrorMessage.INVALID_EMAIL_MESSAGE,
            'any.required': userErrorMessage.INVALID_EMAIL_MESSAGE,
        }),
  
    phone: Joi.string().trim()
        .pattern(PHONE_REGEX)
        .required()
        .empty()
        .messages({
            'string.base': userErrorMessage.INVALID_PHONE_MESSAGE,
            'string.pattern.base': userErrorMessage.INVALID_PHONE_MESSAGE,
            'string.empty': userErrorMessage.INVALID_PHONE_MESSAGE,
            'any.required': userErrorMessage.INVALID_PHONE_MESSAGE,
        }),
  
    password: Joi.string().trim()
        .pattern(PASSWORD_REGEX)
        .required()
        .empty()
        .messages({
            'string.base': userErrorMessage.INVALID_PASSWORD_MESSAGE,
            'string.pattern.base': userErrorMessage.INVALID_PASSWORD_MESSAGE,
            'string.empty': userErrorMessage.INVALID_PASSWORD_MESSAGE,
            'any.required': userErrorMessage.INVALID_PASSWORD_MESSAGE,
        }),
})

const UserSchema = convertJoiSchemaToMongoose(JoiUserSchema)

export const UserModel = model<IUserModel>('user',UserSchema)