const{ response } = require('express');
const Campaign = require('../models/Campaign');

module.exports = {
    
    async findAll(request, response) {

        try {
            
            const campaigns = await Campaign.find({}).sort('created_at');
            
            console.log(campaigns);
            
            return response.status(200).json(campaigns);
  
            
        } catch (err) {

            return response.status(500).json({message:err.message});
        }
    },

    async findByOngId(request, response) {

        console.log(request.headers._id);

        try {
            const campaigns = await Campaign.find().where('assignedTo', request.headers._id);

            return response.status(200).json(campaigns);

        } catch (err) {

            return response.status(500).json({message: 'Nenhuma Campanha cadastrada para essa ong'});
        }
    },

    async store(request, response){

        console.log(request.body);

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
        
    },

    async closedCampaign(request, response){

    
        const _id = request.params.id;

        console.log( _id)
        
        try {

            await Campaign.findOneAndUpdate( _id, { $set: request.body });

        } catch ( err ){

            return response.status(500).send({message: err.message})
        }
    },

    async findCampaignById(request, response){

        const _id = request.headers._id;

        try {
            
            const campaign = await Campaign.findById(_id).populate('assignedTo', 'name_ong');

            return response.status(200).send(campaign);

        } catch (err) {
            return response.status(500).send({message: err.message})

        }
    },

    async findOnlyCampaignById(request, response){

        const _id = request.headers._id;

        try {
            
            const campaign = await Campaign.findById(_id);

            return response.status(200).send(campaign);

        } catch (err) {
            return response.status(500).send({message: err.message})

        }
    }

}