const express = require('express');
const app = express()
const cors = require("cors");
const request = require('request');
app.use(express.json());
app.use(cors());

//get fav
app.get('/checkFavourite/:id', async (req, res) => {
    let id = req.params.id;
    var options = {
        'method': 'GET',
        'url': `https://jsonbase.com/BookshopApp/${id}`,
        'headers': {
        }
    };
    request(options, function (error, response) {
        if (response?.statusCode == 200) {
            let data = JSON.parse(response.body)
            res.json(data)
        }
        else {
            res.json({ "favorite": false })
        }
    });
})


//mark unmark favourite
app.post('/markFavourite/:id', async (req, res) => {

    try {
        let id = req.params.id;
        let fav = req.body.favorite;
        const options = {
            'method': 'PUT',
            'url': `https://jsonbase.com/BookshopApp/${id}`,
            'headers': {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "favorite": fav
            })

        };
        request(options, function (error, response) {
            if (response?.statusCode === 200) {
                let data = JSON.parse(response.body)
                res.json(data)
            }
            if (error) {
                throw new Error(error);
            }

        });
    } catch (err) {
        console.error(err.name, err.message);
    }
});


app.listen(4000, () => {
    console.log('listening on port 4000')
})










