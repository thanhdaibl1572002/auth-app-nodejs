import { Request, Response } from 'express'
import { Document } from 'mongoose'
import { IResponse } from '@/interfaces/response'

export interface IUserModel extends Document {
    firstname: String
    lastname: String
    email: String
    phone: String
    password: String
}