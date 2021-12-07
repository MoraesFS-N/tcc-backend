const moongose = require('mongoose');


const donateSchema = new moongose.Schema({

    donater: {
        type: String,
        require: true
    },

    is_money: {
        type: Boolean,
        required: false
    },

    description: {
        type: String,
        required: true
    },

    campaign_id: {
        type: moongose.Schema.Types.ObjectId,
        ref: 'Campaign',
    },

    donate_amount: {
        type: String,
        required: false
    },

    created_at: {
        type: Date,
        default: Date.now
    },

});

module.exports = moongose.model("Donate", donateSchema);