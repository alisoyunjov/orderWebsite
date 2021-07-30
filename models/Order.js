const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Order = new Schema(
    {
        ordered: {
            type: Schema.Types.ObjectId,
            ref: 'users'
        },
        orderMadeBy: {
            type: String,
            required: [true, "Please enter who orders"]
        },
        price1: {
            type: String,
            required: false,
            default: ""
        },
        orderStatus: {
            type: String,
            required: false,
            default: ""
        },

        price2: {
            type: String,
            required: false,
            default: ""
        },
        submission: {
            type: String,
            required: false,
            default: ""
        },
        vendor1: { 
            type: String, 
            required: true 
        },
        vendor2: { 
            type: String, 
            required: true 
        },
        date: {
            type: Date,
            required: true
        },
        category: { 
            type: String, 
            required: true 
        },
        catalog1: { 
            type: String,
            required: true
        },
        catalog2: {
            type: String, 
            required: true 
        },
        description: { 
            type: String, 
            required: true 
        },
        msdFile: {
            type: Boolean,
            required: false
        },
        notes: {
            type: String,
            required: false
        },

        requestDay: {
            type: Date,
            required: true,
        },

        receivedDate :{
            type: Date,
            required: false
        },

        daysSinceRequest: {
            type: Number,
            required: false,
        },

        completionDays: {
            type: Number,
            required: false,
        }
        

    },
    { timestamps: true }
)

module.exports = mongoose.model('orders', Order);
