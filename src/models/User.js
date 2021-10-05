const moongose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new moongose.Schema({

    username: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    telephone: {
        type: String,
        required: true
    },

    createdAt: {
        type: Date,
        default: Date.now
    },

});

userSchema.pre('save', async function(next) {

    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;

    next();
});

module.exports = moongose.model("User", userSchema);