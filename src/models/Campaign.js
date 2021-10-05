const moongose = require('mongoose');


const campaignSchema = new moongose.Schema({
    
    title_campaign: {
        type: String,
        required: true
    },

    key_pix: {
        type: String,
        required: true
    },

    goal_campaign: {
        type: Number,
        default: 0
    },

    description: {
        type: String,
        required: true
    },

    progress: {
        type: Number,
        default: 0
    },

    assignedTo: {
        type: moongose.Schema.Types.ObjectId,
        ref:'Ong',
        required: true
    },

    created_at: {
        type: Date,
        default: Date.now
    },

    donates: [{
        type: moongose.ObjectId,
        ref: 'Donate',
        default: []
    }]
});

module.exports = moongose.model("Campaign", campaignSchema);