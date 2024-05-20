const express = require("express")

const testRouter = express.Router()

const httpGetTestRoute = (req, res) => {
  return res.send("test route for nutri-sight-api")
}

testRouter.get("/testroute", httpGetTestRoute)

module.exports = {
  testRouter
}