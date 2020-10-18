const {Router} = require('express')
const link = require('../Models/Link')
const router = Router()

router.post('/generate', async (req, res) => {
    try {

    } catch (e) {
        res.status(500).json({ messsge: "Помилка сервера... Спробуйте зноу" })
    }
})
router.get('/', async (req, res) => {
    try {

    } catch (e) {
        res.status(500).json({ messsge: "Помилка сервера... Спробуйте зноу" })
    }
})
router.get('/:id', async (req, res) => {
    try {

    } catch (e) {
        res.status(500).json({ messsge: "Помилка сервера... Спробуйте зноу" })
    }
})
module.exports = router