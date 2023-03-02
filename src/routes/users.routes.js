const {Router}= require(`express`)
const userRoutes= Router()
const UsersControllers = require("../controller/UserController")
const useController= new UsersControllers();

userRoutes.post("/",useController.create)
userRoutes.put("/:id",useController.update)
userRoutes.delete("/:id",useController.delete)


module.exports= userRoutes;
