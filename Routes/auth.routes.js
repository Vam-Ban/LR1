const { Router } = require('express')
const bcrypt = require('bcrypt')
const User = require('../Models/User')
const { check, validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const config = require('config')

const router = Router()
//   api/auth/register
const registerValidation = [
    check('email', 'Некоректний email').isEmail(),
    check('password', 'Довжина паролю повина бути більша 6 символів').isLength({ min: 6 })
]
router.post('/register', registerValidation, async (req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: "Не коректні дані"
            })
        }
        const { email, password } = req.body
        const candidate = await User.findOne({email})
        if (candidate) {
            return res.status(400).json({ message: "Користувач з даним email вже існує" })
        }
        const hashedpassword = await bcrypt.hash(password, 12)
        const user = new User({ email, password: hashedpassword })
        await user.save()
        res.status(201).json({ message: "Користувач створений" })
    } catch (e) {
        console.log(e.message)
        res.status(500).json({ message: "Помилка сервера... Спробуйте знов "})
    }
})

//   api/auth/login
const loginValidation = [
    check('email', 'Некоректний email').isEmail(),
    check('password', 'Введите пароль').exists()
]
router.post('/login', loginValidation, async (req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: "Не коректні дані"
            })
        }
        const { email, password } = req.body
        const user = await User.findOne({email})
        if (!user) {
            return res.status(400).json({ message: "Користувача з даним  email не існує", email })
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({ message: "Не правильний пароль" })
        }
        const token = jwt.sign(
            { userId: user.id },
            config.get('jwtSecret'),
            { expiresIn: '1h' }
        )
        res.json({
            token, userId: user.id
        })
    } catch (e) {
        res.status(500).json({ message: "Помилка сервера... Спробуйте знов" })
    }
})

module.exports = router