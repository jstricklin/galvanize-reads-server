
exports.up = function(knex, Promise) {
    return knex.schema.createTable('authors', (authors)=>{
        authors.increments('id').primary();
        authors.text('first');
        authors.text('last');
        authors.text('bio');
        authors.text('portraitURL');
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('authors');
};
