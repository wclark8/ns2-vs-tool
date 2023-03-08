const express = require('express');
const bodyParser = require('body-parser');
const path = require("path");
const app = express();
const cors = require("cors")
const triggerCrawlingOperations = require('./triggerCrawlingOperations')
const ComparisonProgress = require('../crawler/functions/comparisonProgress');
const port = process.env.PORT || 3000;
const jsonParser = bodyParser.json();
const { v4: uuidv4 } = require('uuid');
const store = require('../crawler/utilities/store');

async function startServer() {
    let comparisonProgressObj;

    app.use(express.static(path.join(__dirname, '../', 'build')));
    
    app.use(cors());
    
    app.get('/', function (req, res) {
        res.sendFile(path.join(__dirname, '../', 'build', 'index.html'));
    }); 

    app.post('/compare', jsonParser, (req, res) => {
        try {
            comparisonProgressObj = new ComparisonProgress();
            comparisonProgressObj.comparisonID = uuidv4();
            triggerCrawlingOperations({playerIds: req.body.playerIds}, comparisonProgressObj);
            res.json(comparisonProgressObj.comparisonID);
        } catch (err) {
            console.log(err);
            res.json(err)
        }
    })

    app.get('/results', async (req, res) => {
        try {
            const id = req.query.id;
            if (store.store.has(id)) {
                res.json(store.store.get(id));
                store.store.delete(id)
            } else {
                res.json('No results found for this id');
                console.log('No results found for ID ' + id);
            }
        } catch (err) {
            res.json('No results found for this id');
            console.log(err);
        }
    });

    /*
    * Not used in frontend
    */
    app.post('/players', jsonParser, async (req, res) => {
        try {
            comparisonProgressObj = new ComparisonProgress();
            const results = await triggerCrawlingOperations({playerIds: req.body.playerIds}, comparisonProgressObj);
            res.json(results);
        } catch (err) {
            console.log(err);
            res.json(err)
        }
    })

    app.get('/progress', async (req, res) => {
        try {
            res.json({progressValue: comparisonProgressObj.progressValue, comparisonComplete: comparisonProgressObj.comparisonComplete})
        } catch (err) {
            console.log("Progress error: " + err);
        }
    });
    
    app.listen(port, () => {
        console.log(`app listening on port ${port}`)
      })
}

module.exports = startServer;