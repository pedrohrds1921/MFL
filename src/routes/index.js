const {Router}= require(`express`)

const userRoutes= require("./users.routes")
const movieRoutes= require("./movies.routes")

const routes= Router();

routes.use("/users",userRoutes)
routes.use("/movie",movieRoutes)


module.exports = routes
