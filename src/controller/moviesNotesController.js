const AppError = require("../utils/AppError");
const sqliteConnection= require("../database/sqlite");



class MoviesNotesController{

async create (req,res){
    const {movie_Title,description,notes,tags}=req.body
    const{user_id}=req.params;
    const database = await sqliteConnection();
    const validUsersID= await database.get("SELECT * FROM users WHERE id=(?)",[user_id])
    if(validUsersID){
        const idnotes =await database.run(
            "INSERT INTO movie_notes (movie_Title,description,notes,user_id) VALUES(?,?,?,?)",[movie_Title,description,notes,user_id]
        )
        const notes_id= idnotes.lastID
    
        const TagsInsert = tags.map(tagname=>{
            return{
                tagname,
                user_id,
                notes_id
            }
        })
    
         TagsInsert.forEach(async tag => {
            await database.run("INSERT INTO movie_tags (tagname, user_id, notes_id) VALUES (?, ?, ?)", [tag.tagname, tag.user_id, tag.notes_id]);
          });
    

    }else{
        throw new AppError("usuario nao encontrado")
    }
    return res.send("Filme/Serie criada")

}

async index (req,res){
const {user_id,movie_Title,tags}=req.query
let notes;
const database = await sqliteConnection();

if(movie_Title){
    const querytitle=`SELECT *
    FROM movie_notes
    WHERE user_id = ${user_id} 
    AND movie_Title LIKE '%${movie_Title}%'
    ORDER BY movie_Title;`
    
    notes= await database.all(querytitle)
}
else{
    const queryID=`SELECT *
    FROM movie_notes
    WHERE user_id = ${user_id} 
    ORDER BY movie_Title;`
    notes= await database.all(queryID)
}

if(tags){

    const query = `
    SELECT movie_notes.*
    FROM movie_notes
    INNER JOIN movie_tags ON movie_notes.id = movie_tags.notes_id
    WHERE movie_tags.tagname LIKE ?
  `;
  notes= await database.all(query,[`%${tags}%`])


}



res.json(notes)



}

async delete(req,res){
    const{id}=req.params
    const db = await sqliteConnection()
    await db.run('PRAGMA foreign_keys = ON;')
    await db.run(`DELETE FROM movie_notes WHERE id=?`,[id])
    res.send("Usuario deletado")
}

}


module.exports=MoviesNotesController