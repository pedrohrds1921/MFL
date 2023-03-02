const sqliteConnection =require ('../sqlite')

const {createUsers,createMovie_notes,createTags} =require('./createrTables')

async function migrationsRun(){
    const schemes = [createUsers,createMovie_notes,createTags].join('')
 

    sqliteConnection().then(db=> db.exec(schemes)).catch(erro=>console.error(erro))


}

module.exports=migrationsRun