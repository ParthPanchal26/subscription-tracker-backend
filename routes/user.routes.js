import { Router } from "express";
import { createUser, getUserById, getUsers } from "../controllers/user.controller.js";

const userRouter = Router()

userRouter.get('/', getUsers)

userRouter.get('/:id', getUserById)

userRouter.post('/', createUser)

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