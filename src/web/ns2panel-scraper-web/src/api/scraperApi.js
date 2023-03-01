import axios from 'axios';

export default class ScraperApi {

    constructor(url, timeout, headers) {
        this._instance = axios.create({
            baseURL: url,
            headers: headers
        })
        
    }

    get instance(){
        return this._instance;
    }

    comparePlayersVs = async (player1, player2) => {
        const playerIdArray = [player1, player2];
        try{
            const response = await this._instance.post('/players', { playerIds: playerIdArray} );
            return response.data;
        } catch (err) {
            console.log(err)
        }
      
        }
    
        /*
        * add id reference later
        */
    getVsProgress = async () => {
        try {
            const response = await this._instance.get('/progress');
            return response.data;
        } catch (err) {
            console.log(err);
        }
    }
}