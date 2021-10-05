const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.json');

const ongController = require('../controllers/OngController');
const campaignController = require('../controllers/CampaignController');
const Ong = require('../models/Ong');
// const authMiddleware = require('../middlewares/auth');


function generateTokenOng(params = {}) {
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400
    });
}

// router.use(authMiddleware);

router.get("/ongs",  ongController.index);
router.post("/ongs",  ongController.store);

router.get("/campaigns", campaignController.findAll);
router.get("/campaigns/:id", campaignController.findById);
router.post("/campaigns/create", campaignController.store);

router.post('/authenticate/ong', async (req, res) => {
    
    const {code, password} = req.body;

    const ong =  await Ong.findOne({ code }).select('+password');

    if (!ong) {
        return res.status(400).send({error: 'Ong não encontrada'});
    }

    if(!await bcrypt.compare(password, ong.password)){
        return res.status(400).send({error: 'Senha incorreta'});
    }

    ong.password = undefined;

    res.send({ong, token: generateTokenOng({ id: ong.id})});
})


module.exports = router;