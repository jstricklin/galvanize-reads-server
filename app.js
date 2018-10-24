express = require('express');
app = express();
port = process.env.PORT || 3000;
morgan = require('morgan');
Papa = require('papaparse');
cors = require('cors');
bodyParser = require('body-parser');
routes = require('./routes');
app.use(cors());
app.use(morgan('combined'));

app.use(bodyParser.json())
routes = require('./routes.js');
app.use('/', routes);

app.use((req, res, next)=>{
    const err = new Error("Not Found");
    err.status = 404;
    next(err);
})

app.use((err, req, res)=>{
    res.status(err.status || 500)
        .json({
            message: err.message,
        })
})


app.listen(port, ()=>{ console.log(`Literary party on port: ${port}`) });

