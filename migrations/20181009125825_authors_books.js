
exports.up = function(knex, Promise) {
    return knex.schema.createTable('authors_books', (authors_books)=>{
        authors_books.increments('id').primary();
        authors_books.integer('book_id').unsigned().references('books.id').onDelete('cascade');
        authors_books.integer('author_id').unsigned().references('authors.id').onDelete('cascade');
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('authors_books');
};
