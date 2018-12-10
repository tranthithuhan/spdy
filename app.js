if (process.env.VARIANT !== "system") {
    require('dotenv').config({path: `.env.${process.env.VARIANT || "local"}`});
}

const express = require('express');
const http2 = require('spdy');
const logger = require('morgan');
const fileUpload = require('express-fileupload');
const routes = require("./src/routes");
const fs = require('fs');


const PORT = 8080;

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(fileUpload());
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

    //intercepts OPTIONS method
    if ('OPTIONS' === req.method) {
        res.send(200);
    }
    else {
        next();
    }
});


app.use(routes);

var options = {
    key: fs.readFileSync('./server.key'),
    cert: fs.readFileSync('./server.crt')
};

// app.listen(PORT, "0.0.0.0", () => {
//     console.log(`Server is listening on http://localhost:${PORT}. You can open the URL in the browser.`);
// });

http2.createServer(options, app)
    .listen(PORT, () => {
    console.log(`Server is listening on http://localhost:${PORT}.`);
});
