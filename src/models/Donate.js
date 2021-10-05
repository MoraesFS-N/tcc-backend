const moongose = require('mongoose');


const donateSchema = new moongose.Schema({
    
    id: {
        type: String,
        required: true
    },

    is_money: {
        type: Boolean,
        required: false
    },

    description: {
        type: String,
        required: true
    },

    donate_amount: {
        type: Number,
        required: true
    },

    created_at: {
        type: Date,
        default: Date.now
    },

});

module.exports = moongose.model("Donate", donateSchema);