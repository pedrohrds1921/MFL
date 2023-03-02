const createUsers = `CREATE TABLE IF NOT EXISTS users(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR,
    email VARCHAR,
    password VARCHAR,
    avartar VARCHAR NULL,
    created_at TIMESTAMP DEFAULT (strftime('%d-%m-%Y %H:%M:%S', 'now', 'localtime')),
    updated_at TIMESTAMP DEFAULT (strftime('%d-%m-%Y %H:%M:%S', 'now', 'localtime'))
    );`


    const createMovie_notes =`CREATE TABLE IF NOT EXISTS movie_notes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        movie_Title VARCHAR,
        description VARCHAR,
        notes INTEGER CHECK(notes >= 1 AND notes <= 5),
        user_id INTEGER,
        created_at TIMESTAMP DEFAULT (strftime('%d-%m-%Y %H:%M:%S', 'now', 'localtime')),
        updated_at TIMESTAMP DEFAULT (strftime('%d-%m-%Y %H:%M:%S', 'now', 'localtime')),
        FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
        );`


    const createTags=`CREATE TABLE IF NOT EXISTS movie_tags (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        tagname VARCHAR,
        user_id INTEGER,
        notes_id INTEGER,
        FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
        FOREIGN KEY (notes_id) REFERENCES movie_notes (id) ON DELETE CASCADE
        );`


module.exports = {
    createUsers,
    createMovie_notes,
    createTags

}