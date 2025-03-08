import { Router } from "express";

const authRouter = Router();

authRouter.post('/sign-up', (req, res) => {
    res.send({
        message: "Sign-up!"
    })
})

authRouter.post('/sign-in', (req, res) => {
    res.send({
        message: "Sign-in!"
    })
})

authRouter.post('/sign-out', (req, res) => {
    res.send({
        message: "Sign-out!"
    })
})

authRouter.post('/forget-password/:id', (req, res) => {
    res.send({
        message: "forget password!"
    })
})

authRouter.put('/reset-password/:id', (req, res) => {
    res.send({
        message: "Reset password!"
    })
})

authRouter.delete('/delete-account/:id', (req, res) => {
    res.send({
        message: "Delete account!"
    })
})

export default authRouter;