const Order = require('../models/Order');
const User = require('../models/User');
createOrder = (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            message: 'There is a mistake',
            error: 'You must provide a order',

        })
    }

    const order = new Order(body)

    if (!order) {
        return res.status(400).json({ success: false, error: err })
    }

    order
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: order._id,
                message: 'Order created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Order not created!',
            })
        })
}

updateOrder = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    Order.findOne({ _id: req.params.id }, (err, order) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Order not found!',
            })
        }
        order.orderName = body.orderName
        order.orderType = body.orderType
        order.date = body.date
        order.quota = body.quota
        order.img = body.img
        order.location = body.location
        order.description = body.description
        order
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: order._id,
                    message: 'Order updated!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'Order not updated!',
                })
            })
    })
}

deleteOrder = async (req, res) => {
    await Order.findOneAndDelete({ _id: req.params.id }, (err, order) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!order) {
            return res
                .status(404)
                .json({ success: false, error: `Order not found` })
        }

        return res.status(200).json({ success: true, data: order })
    }).catch(err => console.log(err))
}

getOrderById = async (req, res) => {
    await Order.findOne({ _id: req.params.id }, (err, order) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!order) {
            return res
                .status(404)
                .json({ success: false, error: `Order not found` })
        }
        return res.status(200).json({ success: true, data: order })
    }).catch(err => console.log(err))
}

getOrders = async (req, res) => {
    await Order.find({}, (err, orders) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!orders.length) {
            return res
                .status(404)
                .json({ success: false, error: `Order not found` })
        }
        return res.status(200).json({ success: true, data: orders })
    }).catch(err => console.log(err))
}

module.exports = {
    createOrder,
    updateOrder,
    deleteOrder,
    getOrders,
    getOrderById,
}