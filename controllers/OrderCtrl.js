const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
const User = require('../models/User');
const Order = require('../models/Order');
const nodemailer = require('nodemailer');
const smtpTransporter=require('nodemailer-smtp-transport');
const crypto = require('crypto');
const validateOrderInput = require('../validation/order');

const smtpTransport = nodemailer.createTransport(smtpTransporter({
    service: 'Gmail',
    host:'smtp.gmail.com',
    auth: {
        user: keys.email,
        pass: keys.password
    },
    tls: {
        rejectUnauthorized: false
    }
}));

createOrder = (req, res) => {
    const {errors, isValid} = validateOrderInput(req.body);
    console.log(errors);
    if(!isValid){
        console.log('girdik');
        return res.status(400).json(errors);
    }
    const body = req.body;
    body.ordered = req.user.id;
    body.orderMadeBy = req.user.name;
    var today = new Date();
    if (!body) {    

        return res.status(400).json({
            success: false,
           
            error: 'You must provide an order'
        });
    }
    const order = new Order(body);

    if (!order) {

        return res.status(400).json({ success: false, error: "Order not created!" });
    }
    
    order.requestDay = today;

    order
        .save()
        .then(() => {
            var mailOpt = {
                from: keys.email,
                to: 'alisoyunjov@gmail.com',
                subject: 'A new order has been made',
                html : '<h2>The order details are following:</h2><br><h4>Order made by:   ' + order.orderMadeBy + '</h4>' +
                '<h4>Vendors are:   ' + order.vendor1 + ' and ' + order.vendor2 + '</h4>' + 
                '<h4> Category:   ' + order.category + '</h4>' + 
                '<h4>Catalogs are:   ' + order.catalog1 + ' and ' + order.catalog2 + '</h4>' + 
                '<h4> Item Description:   ' + order.description + '</h4>' + 
                '<h4> Requested Date:   ' + order.requestDay + '</h4>' + 
                '<h4> Needed Date:   ' + order.date.toString().substring(4,15) + '</h4>' 
            };
            smtpTransport.sendMail(mailOpt, (err, res) => {
                if (err) {
                    throw err;
                } 
                smtpTransport.close();
            });
            
            return res.status(200).json({
                success: true,
                id: order._id,
                message: 'Order created!',
            });
        })
        .catch(err => {
            return res.status(400).json({    
                error: err,
                message: 'Order not created!'
            });
        });
}

updateOrder = async (req, res) => {
    console.log('function icindeyiz')
    const body = req.body
    if (!body) {
        console.log('body check')
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        });
    }

    Order.findOne({ _id: req.params.id }, (err, order) => {
        console.log('found one')
        if (err) {
            return res.status(404).json({
                error: err,
                message: 'Order not found!',
            });
        }
        console.log('no error')
        if (body.price1) order.price1 = body.price1;
        if (body.orderStatus) order.orderStatus = body.orderStatus;
        if (body.price2) order.price2 = body.price2;
        if (body.submission) order.submission = body.submission;
        if (body.receivedDate) order.receivedDate = body.receivedDate;
        if (body.notes) order.notes = body.notes;
        
        order
            .save()
            .then(() => {
                console.log('finished')
                return res.status(200).json({
                    success: true,
                    id: order._id,
                    message: 'Order updated!',
                })
            })
            .catch(err => {
                console.log('error barow')
                return res.status(404).json({
                    error: err,
                    message: 'Order not updated!',
                })
            })
    })
}

deleteOrder = async (req, res) => {
    console.log('girdikwefn')
    await Order.findOne({ _id: req.params.id }, (err, order) => {
        console.log('girdik')
        if (err) {
            console.log('1')
            return res.status(400).json({ success: false, error: err })
        }


        if (!order) {
            console.log('3')
            return res
                .status(404)
                .json({ success: false, error: 'Order not found' })
        }
        order.remove().then(() => {
            console.log('4')
            return res.status(200).json({ success: true })
        });
    }).catch(err => console.log('err barowww'));
}

getOrderById = async (req, res) => {
    await Order.findById(req.params.id , (err, order) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!order) {
            return res
                .status(404)
                .json({ success: false, error: 'Order not found' })
        }
        return res.status(200).json({ success: true, data: order })
    }).catch(err => console.log(err));
}

getOrdersbyPerson = async (req, res) => {
    await Order.find(req.query.orderMadeBy ? {orderMadeBy: req.query.orderMadeBy} : {}).sort('-createdAt').then(orders => {
        if (!orders) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!orders.length) {
            return res
                .status(404)
                .json({ success: false, error: 'Order not found' });
        }
        return res.status(200).json({ success: true, data: orders })
    }).catch(err => console.log("erre geldiklay"));
}
getAllOrders = async (req, res) => {
    await Order.find({}).sort('-createdAt').then(orders => {
        if (!orders) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!orders.length) {
            return res
                .status(404)
                .json({ success: false, error: 'Order not found' });
        }
        return res.status(200).json({ success: true, data: orders })
    }).catch(err => console.log(err));
}
getSubmissions = async (req, res) => {
    await Order.find(req.query.submission ? {submission: req.query.submission} : {}).sort('-createdAt').then(orders => {
        if (!orders) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!orders.length) {
            return res
                .status(404)
                .json({ success: false, error: 'Order not found' });
        }
        return res.status(200).json({ success: true, data: orders })
    }).catch(err => console.log(err));
}
getFinishedOrders = async (req, res) => {
    await Order.find(req.query.orderStatus ? {orderStatus: req.query.orderStatus} : {}).sort('-createdAt').then(orders => {
        if (!orders) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!orders.length) {
            return res
                .status(404)
                .json({ success: false, error: 'Order not found' });
        }
        return res.status(200).json({ success: true, data: orders })
    }).catch(err => console.log(err));
}


module.exports = {
    createOrder,
    updateOrder,
    deleteOrder,
    getOrdersbyPerson,
    getOrderById,
    getAllOrders,
    getSubmissions,
    getFinishedOrders
}