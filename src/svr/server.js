const express = require('express');
const bodyParser = require('body-parser');
const path = require("path");
const app = express();
const cors = require("cors")
const triggerCrawlingOperations = require('./triggerCrawlingOperations')
const ComparisonProgress = require('../crawler/functions/comparisonProgress');
const port = process.env.PORT || 3000;
const jsonParser = bodyParser.json()

async function startServer() {
    let comparisonProgressObj; //hmmmmmmmmmmmmmmmmmmmmm

    app.use(express.static(path.join(__dirname, '../', 'build')));
    
    app.use(cors());
    
    app.get('/', function (req, res) {
        res.sendFile(path.join(__dirname, '../', 'build', 'index.html'));
    }); 

    app.post('/players', jsonParser, async (req, res) => {
        try {
            comparisonProgressObj = new ComparisonProgress();
            const results = await triggerCrawlingOperations({playerIds: req.body.playerIds}, comparisonProgressObj);
            res.json(results);
        } catch (err) {
            console.log(err);
        }
    })

    /**
     * just to stop azure loadbalancer messing with me
     * 
     * maybe move to async model 
     */
    app.get('/progress', async (req, res) => {
        try {
            res.json(comparisonProgressObj.progressValue)
        } catch (err) {
            console.log("Progress error: " + err);
        }
    });
    
    app.listen(port, () => {
        console.log(`app listening on port ${port}`)
      })
}

module.exports = startServer;