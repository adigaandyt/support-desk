//Schema for the user input

const { Timestamp } = require('bson')
const mongoose = require('mongoose')

//set up the schema with type and names
const userSchema = mongoose.Schema({
    name:{
        type: String,
        required: [true,"Please enter a name"]
    },
    email:{
        type: String,
        required: [true,"Please enter an email"],
        unique: true
    },
    password:{
        type: String,
        required: [true,"Please enter a password"]
    },
    isAdmin:{// ppl arent admins by default but the field is required
        type: Boolean,
        required: true,
        default: false
    },
},
{//automaticlly adds a timestamp for creation and edition 
    timestamps: true,
}
)

//Pass the model name and it's schema
module.exports = mongoose.model('User',userSchema)
