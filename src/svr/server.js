const express = require('express');
var bodyParser = require('body-parser')
const app = express();
const cors = require("cors")
const triggerCrawlingOperations = require('./triggerCrawlingOperations')
const port = process.env.PORT || 3000;

const jsonParser = bodyParser.json()
const urlencodedParser = bodyParser.urlencoded({ extended: false })

// allow all cors during dev

async function startServer() {
    app.use(cors());
    app.post('/players', jsonParser, async (req, res) => {
        try {
            const results = await triggerCrawlingOperations({playerIds: req.body.playerIds});
            // lets craft results into json model payload
            res.json(results);
        } catch (err) {
            console.log(err);
        }
    })
    
    app.listen(port, () => {
        console.log(`app listening on port ${port}`)
      })
}

module.exports = startServer;