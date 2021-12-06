const { response, request } = require('express');
const User = require('../models/User');

module.exports = {
    
    async index(request, response) {

        try {
            const users = await User.find();

            return response.status(200).json({users});

        } catch (err) {
            console.log(err);
            response.status(500).json({message: err.message});
        }
    },

    async findById(request, response) {

        try {

            const user = await User.findById(request.headers.user_id);

            return response.status(200).json({user});

        } catch (error) {

            response.status(500).json({message: error.message});
        }

    },

    async store(request, response){

        const {
                username,
                password,
                email,
                telephone,
                is_admin } = request.body;

        const user = new User({
            username,
            password,
            email,
            telephone,
            is_admin
        });
        
          try {

              await user.save();

              return response.status(201).send({user});
          } catch (err) {

            return response.status(500).send({message: err.message})
          }
    }
}
