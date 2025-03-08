import { Router } from "express";

const userRouter = Router()

userRouter.get('/', (req, res) => {
    res.send({
        message: "All users"
    })
})

userRouter.get('/:id', (req, res) => {
    res.send({
        message: "Specific user"
    })
})

userRouter.post('/', (req, res) => {
    res.send({
        message: "Create user"
    })
})

userRouter.put('/:id', (req, res) => {
    res.send({
        message: "Update user"
    })
})

userRouter.delete('/:id', (req, res) => {
    res.send({
        message: "Delete user"
    })
})

export default userRouter