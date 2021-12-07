const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.json');

const ongController = require('../controllers/OngController');
const campaignController = require('../controllers/CampaignController');
const Ong = require('../models/Ong');
const userController = require('../controllers/UserController');
const donateController = require('../controllers/DonateController');
const User = require('../models/User');

const authMiddleware = require('../middlewares/auth');
router.use(authMiddleware);

function generateTokenOng(params = {}) {
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400
    });
}

/* ONG routes*/ 
router.get("/ongs",  ongController.index);
router.post("/ongs",  ongController.store);
router.get("/ongs/detail", ongController.findOngById);

/* CAMPAIGN routes */ 
router.get("/campaigns", campaignController.findAll);
router.get("/campaigns/ong", campaignController.findByOngId);
router.get("/campaign/detail", campaignController.findCampaignById);
router.get("/campaign/detail/only", campaignController.findOnlyCampaignById);
router.post("/campaigns/create", campaignController.store);
router.post("/campaigns/closed/:id", campaignController.closedCampaign)

/* USER routes */ 
router.post("/user", userController.store);
router.get("/user", userController.index);
router.get("/user/detail", userController.findById);

/* DONATE routes */
router.get("/donates/:id", donateController.index);
router.post("/donate", donateController.store);

/* AUTH routes */
router.post('/authenticate/auth/ong', async (req, res) => {

    
    console.log(req.body);

    const {email, password } = req.body;
    
        const ong = await Ong.findOne({email: email}).select('+password');

        if (!ong) {
            return res.status(400).send({error: 'Usuário não encontrado'});
        }
        
        if(!await bcrypt.compare(password, ong.password)){
            return res.status(400).send({error: 'Senha incorreta'});
        }
    
        ong.password = undefined;
    
        return res.status(200).send({ong});

});
router.post('/authenticate/auth/user', async (req, res) => {

    
    console.log(req.body);

    const {email, password } = req.body;
    
        const user = await User.findOne({email: email}).select('+password');

        if (!user) {
            return res.status(400).send({error: 'Usuário não encontrado'});
        }
        
        if(!await bcrypt.compare(password, user.password)){
            return res.status(400).send({error: 'Senha incorreta'});
        }
    
        user.password = undefined;
    
        return res.status(200).send({user});

});
router.post('/autheticate/user/admin', async (req, res) => {
    
    console.log(req.body);

    const {email, password } = req.body;
    
        const user = await User.findOne({email: email}).select('+password');


        if (!user) {
            return res.status(400).send({error: 'Usuário não encontrado'});
        }

        if (user.is_admin) {
            return res.status(400).send({error: 'Usuário não possui permissão para logar.'});
        }


        if(!await bcrypt.compare(password, user.password)){
            return res.status(400).send({error: 'Senha incorreta'});
        }
    
        user.password = undefined;
    
        return res.status(200).send({user});
})

module.exports = router;