import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt'
import { signinInput, signupInput } from "@100xdevs/medium-common";


export const userRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string
    }
}>();



//SignUp Route
userRouter.post('/signup', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const body = await c.req.json()
    const { success } = signupInput.safeParse(body)
    console.log(success)
    if (!success) {
        c.status(411)
        return c.json({
            msg: "invalid inputs"
        })
    }
    try {
        let createdUser = await prisma.user.create({
            data: {
                email: body.username,
                password: body.password,
                name: body.name
            }
        })
        let token = await sign({ id: createdUser.id }, c.env.JWT_SECRET)
        return c.json({
            jwt: token
        })
    } catch (e) {
        return c.json({
            msg: "something went wrong"
        })
    }
})


//SignIn Route
userRouter.post('/signin', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();
    const { success } = signinInput.safeParse(body)
    if (!success) {
        c.status(411)
        return c.json({
            msg: "invalid inputs"
        })
    }
    try {
        const user = await prisma.user.findUnique({
            where: {
                email: body.username
            }
        });

        if (!user) {
            c.status(403);
            return c.json({ error: "user not found" });
        }
        if (user.password == body.password) {
            const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
            return c.json({ jwt });
        }
        else{
            return c.json({
                msg : "password is incorrect"
            })
        }

    } catch (e) {
        console.log("error ==>",e)
        return c.json({
            msg : "something went wrong"
        })
    }


})