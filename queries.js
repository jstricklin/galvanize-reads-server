const db = require('./database-connection');

module.exports = {

    listAuthors(){
        return db('authors')
            .then(authors => authors)
    },
    listBooks(){
        return db('books')
            .then(books => books)
    },
    searchAuthors(...names) {
        let nameArr = []
        let auth = names.map(name => {
                db('authors')
                .where('first', name)
                .orWhere('last', name)
                .select()
       })
    },
    findAuthor(...name){
        if (name.length > 1) {
            return db('authors')
                .where("first", name[0])
                .orWhere("last", name[0])
                .andWhere("first", name[1])
                .orWhere("last", name[1])
                .select()
        }
        else {
            return db('authors')
                .where("first", name[0])
                .orWhere("last", name[0])
                .select()
        }
    },
    findBook(title){
        return db('books')
            .then(books => {
                return books.filter(book => {
                    let testExp = new RegExp(title, "i")
                    return testExp.test(book.title)
                })
            })
    },
    getBookAuthors(title){
        let bookID = db('books')
            .where('title', title)
            .select('id')
        let authorIDs = db('authors_books')
            .where('book_id', bookID)
            .select('author_id')
        return authorIDs.map(authorID => db('authors').where('id', authorID.author_id).select().then(res => res[0]))
    },
    getAuthorBooks(...name){
        let authorID = db('authors')
            .where('first', name[0])
            .orWhere('last', name[0])
            .andWhere('first', name[1])
            .orWhere('last', name[1])
            .select('id')
        let bookIDs = db('authors_books')
            .where('author_id', authorID)
            .select('book_id')
        return bookIDs.map(bookID => db('books').where('id', bookID.book_id).select().then(res => res))
    }
}
