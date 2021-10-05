const moongose = require('mongoose');
const bcrypt = require('bcrypt');

const ongSchema = new moongose.Schema({

    name_ong: {
        type: String,
        required: true
    },

    code:{
        type: String,
        required: true,
    },

    password: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    founder: {
        type: String,
        required: true
    },

    is_hability: {
        type: Boolean,
        default: true
    },

    createdAt: {
        type: Date,
        default: Date.now
    },

    campaign: [{
        type: moongose.Schema.Types.ObjectId,
        ref: 'Campaign',
        default: [{}]
    }]
});

ongSchema.pre('save', async function(next) {

    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;

    next();
});

module.exports = moongose.model("Ong", ongSchema);