
exports.up = function(knex, Promise) {
    return knex.schema.createTable('books', (books)=>{
        books.increments('id').primary();
        books.text("title");
        books.text('genre');
        books.text('description');
        books.text('coverURL');
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('books');
};
