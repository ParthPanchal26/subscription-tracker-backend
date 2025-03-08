import { Router } from "express";

const subscriptionRouter = Router()

subscriptionRouter.get('/', (req, res) => {
    res.send({
        message: "Get all subscriptions"
    })
})

subscriptionRouter.get('/:id', (req, res) => {
    res.send({
        message: "Get specific subscriptions"
    })
})

subscriptionRouter.get('/user/:id', (req, res) => {
    res.send({
        message: "Get all user's subscriptions"
    })
})

subscriptionRouter.post('/', (req, res) => {
    res.send({
        message: "Create subscriptions"
    })
})

subscriptionRouter.put('/:id', (req, res) => {
    res.send({
        message: "Update subscriptions"
    })
})

subscriptionRouter.put('/:id/cancel', (req, res) => {
    res.send({
        message: "Cancel subscriptions"
    })
})

subscriptionRouter.delete('/:id', (req, res) => {
    res.send({
        message: "Delete subscriptions"
    })
})

subscriptionRouter.get('/upcoming-renewals', (req, res) => {
    res.send({
        message: "Get upcoming subscriptions"
    })
})

export default subscriptionRouter