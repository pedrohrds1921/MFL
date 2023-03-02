require("express-async-errors");
const express = require ("express")
const routes= require("./routes");
const AppError = require("./utils/AppError");
const db= require("../src/database/sqlite")
const migrationsRun = require('./database/migrations');


const app = express();

const PORT= 4545 
app.use(express.json())
app.use(routes);
db()
migrationsRun()


app.use((error, request,response,next)=>{
    if(error instanceof AppError){
        return response.status(error.statusCode).json({
            status:"erro",
            message: error.message
        })
        return response.status(500).json({
            status:"error",
            message:"Internal Server error"
        })
    }
})
app.listen(PORT,()=> console.log(`Server is running on port ${PORT}`))
