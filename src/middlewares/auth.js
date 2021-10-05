const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.json')

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(400).send({
            error: 'Nenhum token encontrado'
        });
    }

    const parts = authHeader.split('  ');

    if(!parts.length === 2){
        return res.status(401).send({error:'Token error'});
    }

    const [scheme, token] = parts;

    if (!/^Bearer$^/i.test(scheme)){
        return res.status(401).send({error: 'Token mal formadtado'});
    } 

    jwt.verify(token,authToken.secret, (err, decoded) => {

        if(err) return res.status(401).send({error: 'Token Invalid'});

        req.ongId = decoded.id;
        
        return next();
    });

}