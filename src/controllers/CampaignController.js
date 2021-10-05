const{ response } = require('express');
const Campaign = require('../models/Campaign');

module.exports = {
    
    async findAll(request, response) {

        try {

            const campaigns = await Campaign.find();
            return response.status(200).json({campaigns});
        
        } catch (err) {

            return response.status(500).json({message:err.message});
        }
    },

    async findById(request, response) {

        try {
            const campaign = await Campaign.findById();

            return response.status(200).json({campaign});
        } catch (err) {

            return response.status(500).json({message: err.message});
        }
    },

    async store(request, response){

        const { 
            assignedTo,
            title_campaign, 
            key_pix, 
            goal_campaign, 
            description } = request.body;

        const campaign = new Campaign({
            assignedTo,
            title_campaign,
            key_pix,
            goal_campaign,
            description
        });

        try {
            await campaign.save();

            return response.status(201).send(campaign);
        } catch (error) {
            
            return response.status(500).send({message: error.message});
        }
        
    }
}