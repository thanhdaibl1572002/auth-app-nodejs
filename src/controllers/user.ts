import { Request, Response } from 'express'
import { IUserModel } from '@/interfaces/user'
import { IResponse } from '@/interfaces/response'
import { UserModel } from '@/models/user'
import { hashPassword } from '@/utils/password'
import { generateAccessToken, setAccessTokenCookie } from '@/utils/token'
import { HTTP_STATUS_BAD_REQUEST, HTTP_STATUS_CREATED, HTTP_STATUS_INTERNAL_SERVER_ERROR, HTTP_STATUS_OK } from '@/errors/codes'
import { userErrorMessage, serverErrorMessage } from '@/errors/messages'

export const signUp = async (req: Request, res: Response): Promise<Response<IResponse>> => {
    try {
        const { firstname, lastname, email, phone, password } = req.body
        const passwordHash = await hashPassword(password)
        const user: IUserModel = new UserModel({ 
            firstname: firstname,
            lastname: lastname, 
            email: email,
            phone: phone, 
            password: passwordHash
        })
        await user.save()
        const accessToken = generateAccessToken(user._id)
        setAccessTokenCookie(res, accessToken)
        return res.status(HTTP_STATUS_CREATED).json({ 
            message: userErrorMessage.REGISTER_SUCCESS_MESSAGE,
            accessToken: accessToken,
        } as IResponse)
    } catch (error: unknown) {
        console.log(error)
        if (error instanceof Error)
            return res.status(HTTP_STATUS_BAD_REQUEST).json({ 
                message: error.name === 'ValidationError' 
                ? error.message 
                : userErrorMessage.REGISTER_FAILURE_MESSAGE,
                error: error 
            } as IResponse)
        else 
            return res.status(HTTP_STATUS_INTERNAL_SERVER_ERROR).json({
                message: serverErrorMessage.INTERNAL_SERVER_ERROR_MESSAGE,
                error: error
            } as IResponse)
    }
}

export const signIn = async (req: Request, res: Response): Promise<Response<IResponse>> => {
    const { email } = req.body
    try {
        const user: IUserModel = await UserModel.findOne({ email }) as IUserModel
        return res.status(HTTP_STATUS_OK).json({ 
            message: userErrorMessage.LOGIN_SUCCESS_MESSAGE,
            accessToken: generateAccessToken(user?._id),
        } as IResponse)
    } catch (error: unknown) {
        if (error instanceof Error) 
            return res.status(HTTP_STATUS_BAD_REQUEST).json({
                message: error.name === 'ValidationError' 
                ? error.message 
                : userErrorMessage.LOGIN_FAILURE_MESSAGE,
                error: error
            } as IResponse)     
        else
            return res.status(HTTP_STATUS_INTERNAL_SERVER_ERROR).json({
                message: serverErrorMessage.INTERNAL_SERVER_ERROR_MESSAGE,
                error: error
            } as IResponse)       
    }
}

export const signOut = async (req: Request, res: Response): Promise<Response<IResponse>> => {
    try {
        await new Promise<void>((resolve, reject) => {
            req.session.destroy((error: unknown) => {
                error ? reject(error) : resolve()
            })
        })
        res.clearCookie('connect.sid')
        return res.status(HTTP_STATUS_OK).json({
            message: userErrorMessage.LOGOUT_SUCCESS_MESSAGE,
        } as IResponse)
    } catch (error: unknown) {
        return res.status(HTTP_STATUS_INTERNAL_SERVER_ERROR).json({
            message: serverErrorMessage.INTERNAL_SERVER_ERROR_MESSAGE,
            error: error
        } as IResponse)
    }
}
