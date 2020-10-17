const {Router} = require('express')
const router = Router()
const bcrypt = require('bcrypt')
const User = require('../Models/User')
const {check, validationResult} = require('express-validator')
const jwt = require('jsonwebtoken')
const config = require('config')

//   api/auth/register
router.post('/register', 
[
    check('email', 'Некоректний email').isEmail(),
    check('password', 'Довжина паролю повина бути більша 6 символів').isLength({min: 6})
]
, async (req, res) => {
    try{
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({
                errors: errors.array(),
                message: "Не коректні дані"
            })
        }
        const {email, password, login} = req.body
        const candidate = await User.findOne(email)
        if(condidate){
            return res.status(400).json({message: "Користувач з наним email вже існує"})
        }
        const hashedpassword = await bcrypt.hash(password, 12)
        const user = new User({email, login, hasedpassword}) 
        await user.save()
        res.json({massage: "Користувач створений"})
    }catch(e){
        res.status(500).json({messsge: "Помилка сервера... Спробуйте зноу"})
    }
})

//   api/auth/login
router.post('/login', 
[
    check('email', 'Некоректний email').isEmail()
]
, async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({
            errors: errors.array(),
            message: "Не коректні дані"
        })
    }
    const {email, password} = req.body
    const user = await User.findOne(email)
    if(!user){
        return res.status(400).json({message: "Користувача з даним  email не існує"})
    }

    const isMatch = await bcrypt.compare(user.password, bcrypt.hash(password, 12))
    if(!isMatch){
        return res.status(400).json({message: "Не правильний пароль"})
    }
    const token = jwt.sign(
        {userId: user.id},
        config.get('jwtSecret'),
        {expiresIn: '1h' }
    )
    res.json({
        token, userId: user.id
    })

})

module.exports = router