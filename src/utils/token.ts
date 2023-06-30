import { Response } from 'express'
import jwt from 'jsonwebtoken'

const maxAge = 604800000
const expiresIn = maxAge / 1000

export const generateAccessToken = (userId: string): string => {
    return jwt.sign({ userId: userId }, process.env.JWT_SECRET_KEY!, { expiresIn: expiresIn })
}

export const verifyAccessToken = (token: string, secretKey: string): Promise<boolean> => {
    return new Promise<boolean>((resolve, reject) => {
        jwt.verify(token, secretKey, err => {
            err ? reject(err) : resolve(true)
        })
    })
}

export const setAccessTokenCookie = (res: Response, token: string): void => {
    const encodedToken = encodeURIComponent(token)
    res.cookie('accessToken', encodedToken, { maxAge: maxAge, httpOnly: true })
}

export const deleteAccessTokenCookie = (res: Response): void => {
    res.clearCookie('accessToken')
}

export const getUserIdFromAccessToken = (accessToken: string): string => {
    const decodedToken = jwt.verify(accessToken, process.env.JWT_SECRET_KEY!) as { userId: string }
    return decodedToken.userId
}