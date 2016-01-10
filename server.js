var path = require('path')
var moment = require('moment')
var express = require('express')

var app = express()

app.listen(process.env.PORT || 3000)

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'index.html'))
})

app.get('/:date', function(req, res) {
    var date = req.params.date;
    
    if (/^(\d+)$/.test(date)) {
        date = moment(date, "X");
    } else {
        date = moment(date, "MMMM D, YYYY")
    }
    
    var result = {
        "unix" : null, "natural" : null
    }
    if (date.isValid()) {  
        result.unix = Number(date.format("X"));
        result.natural = date.format("MMMM D, YYYY")
    }
    res.json(result)
});