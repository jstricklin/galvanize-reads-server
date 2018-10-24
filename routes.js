const express = require('express');
const router = express.Router();
const queries = require('./queries.js')

router.get('/', (req, res, next)=>{
    next("Please try a valid route")
})

router.get('/authors', (req, res, next)=>{
    queries.listAuthors()
        .then(authors => res.json(authors))
})
router.get('/authors/:name', (req, res, next)=>{
    let nameArr = req.params.name.split(" ");
    let capNameArr = [];
    nameArr.map(name => capNameArr.push(name.charAt(0).toUpperCase() + name.slice(1)))
    if (nameArr.length == 3){
        let nameA = `${capNameArr[0]} ${capNameArr[1]}`;
        let nameB = capNameArr[2];
        queries.findAuthor(nameA, nameB)
            .then(author => {
                res.json({author: author});
            })
    } else if (nameArr.length == 2){
        let nameA = capNameArr[0];
        let nameB = capNameArr[1];
        queries.findAuthor(nameA, nameB)
            .then(author => {
                res.json({author: author});
            })
    } else {
        let name = capNameArr[0];
        queries.findAuthor(name)
            .then(author => {
                res.json({author: author});
            })
    }
})

router.get('/books', (req, res, next)=>{
    queries.listBooks()
        .then(books => res.json(books));
})
router.get('/books/:title',(req, res, next)=>{
    queries.findBook(req.params.title)
        .then(book => res.json({result: book}))
})
router.get('/bookauthors/:title',(req, res, next)=>{
    queries.getBookAuthors(req.params.title)
        .then(author => res.json({result: author}))
})
router.get('/authorbooks/:name', (req, res, next) => {
    let nameArr = req.params.name.split(' ')
    if (nameArr.length === 3){
        let nameA = `${nameArr[0]} ${nameArr[1]}`
        queries.getAuthorBooks(nameA, nameArr[2])
            .then(books => res.json({result: books[0]}))
    } else if (nameArr.length == 2) {
        queries.getAuthorBooks(nameArr[0], nameArr[1])
            .then(books => res.json({result:books[0]}))
    }
})
router.get('/search/:terms', (req, res, next) => {
    let authRes = []
    let bookRes = []
    let searchArr = req.params.terms.split(' ')
    queries.listAuthors()
        .then(authors => {
            searchArr.map(term => {
                let test = new RegExp(term, 'i')
                authors.map(author => {
                    if (test.test(author.first) || test.test(author.last)){
                        if (!authRes.includes(author)) {
                            authRes.push(author)
                        }

                    }

                })
            })
        })
        queries.findBook(req.params.terms)
            .then(res => {bookRes = res; return bookRes})
        .then(books => res.json({
            authors: authRes,
            books: books,
        }))

})

module.exports = router;
