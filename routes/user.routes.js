import { Router } from "express";
import { createUser, getUserById, getUsers } from "../controllers/user.controller.js";
import authorize from "../middlewares/auth.middleware.js";

const userRouter = Router()

userRouter.get('/', getUsers)

userRouter.get('/:id', authorize, getUserById)

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