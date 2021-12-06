const { response } = require('express');
const Donate = require('../models/Donate');

module.exports = {
    
    async index(request, response) {

        try {
            const donates = await Donate.find(request.params.campaign_id);

            return response.status(200).json({donates});

        } catch (err) {
            console.log(err);
            response.status(500).json({message: err.message});
        }
    },

    async store(request, response){

        const {
            donater,
            is_money,
            description,
            campaign_id,
            donate_amount } = request.body;

        const donate = new Donate({
            donater,
            is_money,
            description,
            campaign_id,
            donate_amount});
        
          try {

              await donate.save();

              return response.status(201).send({donate});

          } catch (err) {

            return response.status(500).send({message: err.message})

          }
    
        
    }
}
