const { response } = require('express');
const Ong = require('../models/Ong');

module.exports = {
    
    async index(request, response) {

        try {
            const ong = await Ong.find();

            return response.status(200).json({ong});

        } catch (err) {
            console.log(err);
            response.status(500).json({message: err.message});
        }
    },

    async store(request, response){

        const {
                name_ong,
                code,
                password,
                email,
                founder } = request.body;

        const ong = new Ong({
            name_ong,
            code,
            password,
            email,
            founder });
        
          try {

              await ong.save();

              return response.status(201).send({ong});

          } catch (err) {

            return response.status(500).send({message: err.message})

          }
    
        
    }
}
