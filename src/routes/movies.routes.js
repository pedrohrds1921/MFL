const {Router}= require(`express`)
const movieRoutes= Router()
const MoviesNotesController = require("../controller/moviesNotesController")
const movieController= new MoviesNotesController()

movieRoutes.post("/:user_id",movieController.create)
movieRoutes.get("/",movieController.index)



module.exports= movieRoutes;
