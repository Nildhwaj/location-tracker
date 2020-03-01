const express = require('express');
const bodyParser = require('body-parser');
const nodeGeocode = require('node-geocoder');
var options = require('./config');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
const PORT = process.env.PORT || 5020;

var geocoder = nodeGeocode(options);

app.get('/api/search', (req, res) => {
    if(req.query.address){
        geocoder.geocode(req.query.address, function (err, data) {
            if (err) {
                console.log(err);
            }
            res.json(data);
        });
    }else{
        res.json({data: null})
    }
    
  });

app.listen(PORT, (err, info) => {
    if (err) {
        console.log(err);
    } else {
        console.log(`Server is running on ${PORT}`);
    }
});