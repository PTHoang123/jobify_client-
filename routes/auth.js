import express from 'express'
import   { login, register, updatedUser } from '../controllers/auth.js'
import authenticateUser from '../middleware/auth.js'
const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.patch('/updateUser', authenticateUser ,updatedUser)

export default router