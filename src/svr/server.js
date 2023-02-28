const express = require('express');
const bodyParser = require('body-parser');
const path = require("path");
const app = express();
const cors = require("cors")
const triggerCrawlingOperations = require('./triggerCrawlingOperations')
const port = process.env.PORT || 3000;
const jsonParser = bodyParser.json()

async function startServer() {
    
    app.use(express.static(path.join(__dirname, '../', 'build')));
    
    app.use(cors());
    
    app.get('/', function (req, res) {
        res.sendFile(path.join(__dirname, '../', 'build', 'index.html'));
    }); 

    app.post('/players', jsonParser, async (req, res) => {
        try {
            const results = await triggerCrawlingOperations({playerIds: req.body.playerIds});
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