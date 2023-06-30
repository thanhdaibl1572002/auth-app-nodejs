import { Request, Response, NextFunction } from 'express'
import { IUserModel } from '@/interfaces/user'
import { IResponse } from '@/interfaces/response'
import { UserModel, JoiUserSchema } from '@/models/user'
import { HTTP_STATUS_BAD_REQUEST, HTTP_STATUS_INTERNAL_SERVER_ERROR, HTTP_STATUS_NOT_FOUND, HTTP_STATUS_UNAUTHORIZED } from '@/errors/codes'
import { userErrorMessage, serverErrorMessage } from '@/errors/messages'
import { verifyAccessToken } from '@/utils/token'
import { comparePassword } from '@/utils/password'

export const checkExistingEmail = async (req: Request, res: Response, next: NextFunction): Promise<void | Response<IResponse>> => {
    const { email } = req.body
    const user: IUserModel = await UserModel.findOne({ email: email }) as IUserModel
    if (user)
        return res.status(HTTP_STATUS_NOT_FOUND).json({
            message: userErrorMessage.EMAIL_ALREADY_EXISTS_MESSAGE
        } as IResponse)
    next()
}

export const checkExistingPhone = async (req: Request, res: Response, next: NextFunction): Promise<void | Response<IResponse>> => {
    const { phone } = req.body
    const user: IUserModel = await UserModel.findOne({ phone: phone }) as IUserModel
    if (user)
        return res.status(HTTP_STATUS_NOT_FOUND).json({
            message: userErrorMessage.PHONE_ALREADY_EXISTS_MESSAGE
        } as IResponse) 
    next()
}

export const checkExistingUser = async (req: Request, res: Response, next: NextFunction): Promise<void | Response<IResponse>> => {
    const { email } = req.body
    const user: IUserModel = await UserModel.findOne({ email: email }) as IUserModel
    if (!user)
        return res.status(HTTP_STATUS_NOT_FOUND).json({
            message: userErrorMessage.INCORRECT_EMAIL_OR_PASSWORD
        } as IResponse) 
    next()
}

export const validateUser = async (req: Request, res: Response, next: NextFunction): Promise<void | Response<IResponse>> => {
    const { error } = JoiUserSchema.validate(req.body)
    if (error) {
        const errorMessage = error.details.map((detail) => detail.message)
        return res.status(HTTP_STATUS_BAD_REQUEST).json({ 
            message: errorMessage.shift()
        })
    }
    next()
}

export const verifyPassword = async (req: Request, res: Response, next: NextFunction): Promise<void | Response<IResponse>> => {
    const { email, password } = req.body
    const user: IUserModel = await UserModel.findOne({ email: email }) as IUserModel
    if (!user || !await comparePassword(password, user.password as string))
        return res.status(HTTP_STATUS_UNAUTHORIZED).json({
            message: userErrorMessage.INCORRECT_EMAIL_OR_PASSWORD
        } as IResponse) 
    next()
}

export const verifyToken = async (req: Request, res: Response, next: NextFunction): Promise<void | Response<IResponse>> => {
    const authHeader: string = req.headers.authorization as string
    if (authHeader) {
        const token: string = authHeader.split(' ')[1]
        if (!process.env.JWT_SECRET_KEY)
            return res.status(HTTP_STATUS_INTERNAL_SERVER_ERROR).json({
              message: serverErrorMessage.JWT_SECRET_KEY_NOT_DEFINED_MESSAGE
            } as IResponse)
        
        try {
            await verifyAccessToken(token, process.env.JWT_SECRET_KEY)
            next()
        } catch (error: unknown) {
            return res.status(HTTP_STATUS_UNAUTHORIZED).json({
                message: userErrorMessage.INVALID_ACCESS_TOKEN_MESSAGE
            } as IResponse)
        }
    } else {
        return res.status(HTTP_STATUS_UNAUTHORIZED).json({
            message: userErrorMessage.AUTHORIZATION_HEADER_MISSING_MESSAGE
        } as IResponse)
    }
}