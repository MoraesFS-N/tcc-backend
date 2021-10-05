const { response } = require('express');
const User = require('../models/User');

module.exports = {
    
    async index(request, response) {

        try {
            const user = await User.find();

            return response.status(200).json({user});

        } catch (err) {
            console.log(err);
            response.status(500).json({message: err.message});
        }
    },

    async store(request, response){

        const {
                username,
                password,
                email,
                telephone } = request.body;

        const user = new User({
            username,
            password,
            email,
            telephone
             });
        
          try {

              await ong.save();

              return response.status(201).send({user});

          } catch (err) {

            return response.status(500).send({message: err.message})

          }
    
        
    }
}
