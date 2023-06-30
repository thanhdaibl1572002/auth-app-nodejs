import { Router } from 'express'
import { 
    checkExistingEmail, 
    checkExistingPhone, 
    checkExistingUser, 
    validateUser, 
    verifyPassword,
    verifyToken,
} from '@/middlewares/user'
import { signIn, signOut, signUp, viewProfile } from '@/controllers/user'

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
    signOut
)

UserRouter.get(
    '/profile',
    verifyToken,
    viewProfile
)

export default UserRouter