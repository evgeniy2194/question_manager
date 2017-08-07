var express = require('express');
var app = express();

app.use(express.static('static'));

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});

//Routing
app.get('/', function (req, res) {
    res.sendFile('./static/index.html');
});

app.get('/categories', function (req, res) {
    var categories = [
        {name: 'category1'},
        {name: 'category2'}
    ];

    res.send(categories);
});