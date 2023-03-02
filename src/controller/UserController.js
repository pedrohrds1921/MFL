const AppError = require("../utils/AppError");
const sqliteConnection= require("../database/sqlite");
const {hash,compare} = require("bcryptjs");


class UserController {

    async create (req,res){
        const {name,email,password}=req.body;
        const database = await sqliteConnection();
        const checkUserExists= await database.get("SELECT * FROM users WHERE email=(?)",[email])
        if(checkUserExists){
            throw new AppError("email existe")
        }

        const hashedPassword=  await hash(password,8)

        await database.run(
            "INSERT INTO users (name,email,password) VALUES(?,?,?)",[name,email,hashedPassword]
        )
        return res.status(201).send("usuario criado")
    }

    async update(request,response){
        const {name,email,password,old_password}=request.body
        const{id}=request.params
        const db =await sqliteConnection();

        const user= await db.get("SELECT * FROM users WHERE id=?",[id]);
        if (!user){
            throw new AppError('Usuario não encontrato ')
        }
        const userWithUpdateEmail=await db.get("SELECT * FROM users WHERE email=?",[email])

        if(userWithUpdateEmail && userWithUpdateEmail.id !== user.id){
            throw new AppError ('Esse email ja esta em uso.');
        }

       
        
        user.name = name ?? user.name
        user.email= email ?? user.email
        if(password && !old_password){
            response.send("Gentileza Informa senha antiga")
        }
        if(password && old_password){
            const checkOldPassword= await compare(old_password,user.password)
            if(!checkOldPassword){
                response.send("Senha Antiga não confere")
        }
        }
        if(password ==old_password){

            response.send("A nova senha não pode ser igual a anterior")
        }
        user.password= await hash(password,8)
        await db.run(`UPDATE users SET
        name= ?,
        email=?,
        updated_at= DATETIME('now', 'localtime'),
        password=?
        WHERE id= ?`,
        [user.name,user.email,user.password,id])

        return response.send('Atualização realizada')
    }


     
    async delete(req,res){

        const{id}=req.params
        const db = await sqliteConnection()
        await db.run('PRAGMA foreign_keys = ON;')
        await db.run(`DELETE FROM users WHERE id=?`,[id])
        res.send("Usuario deletado")
    }

}


module.exports= UserController