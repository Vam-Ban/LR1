const {Router} = require('express')
const config = require('config')
const Link = require('../Models/Link')
const shortid = require('shortid')
const auth = require('../middleware/auth.middleware')
const router = Router()

router.post('/generate', auth,  async (req, res) => {
    try {
        const baseUrl = config.get('baseUrl')
        const {from} = req.body
        const code = shortid.generate()
        const exists = await Link.findOne({from})
        if(exists){
            return res.json({link: exists})
        }
        const to = baseUrl + '/t/' + code
        const link = new Link({
            code, to, from, owner: req.user.userId
        })

        await link.save()
        res.status(201).json({link})
    } catch (e) { 
        res.status(500).json({ message: "Помилка сервера... Спробуйте знов" })
    }
})
router.get('/', auth, async (req, res) => {
    try {
        const links = await Link.find({owner: req.user.userId})
        res.json(links)
    } catch (e) {
        res.status(500).json({ message: "Помилка сервера... Спробуйте знов" })
    }
})
router.get('/:id', auth,  async (req, res) => {
    try {
        const link = await Link.findById(req.params.id)
        res.json(link)
    } catch (e) {
        res.status(500).json({ message: "Помилка сервера... Спробуйте знов" })
    }
})
module.exports = router