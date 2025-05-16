import express, { Request, Response, Router } from "express"

const testRouter: Router = express.Router()

const httpGetTestRoute = async (req: Request, res: Response): Promise<void> => {
  res.send("test route for nutri-sight-api")
}

testRouter.get("/testroute", httpGetTestRoute)

export { testRouter }