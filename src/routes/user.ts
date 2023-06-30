import { Router } from 'express'
import { 
    checkExistingEmail, 
    checkExistingPhone, 
    checkExistingSession, 
    checkExistingUser, 
    validateUser, 
    verifyPassword 
} from '@/middlewares/user'
import { signIn, signOut, signUp } from '@/controllers/user'

const UserRouter = Router()

UserRouter.post(
    '/signup',
    checkExistingEmail,
    checkExistingPhone,
    validateUser,
    signUp
)

UserRouter.post(
    '/signin', 
    checkExistingUser,
    verifyPassword,
    signIn
)

UserRouter.post(
    '/signout',
    checkExistingSession,
    signOut 
)

export default UserRouter