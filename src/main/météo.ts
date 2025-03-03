import axios from "axios";
export class Meteo{
    private ville : string;
    private temperature : number;
    private humidite : number;
    private vent : number;
    private pluie : number;

    constructor(){
        this.ville = "ville";
        this.temperature = 45;
        this.humidite = 45;
        this.vent = 45;
        this.pluie = 45;
        this.getMeteo().then(() => {
            console.log("ok");
        });
    }

    getVille() : string{
        return this.ville;
    }

    getTemperature() : number{
        return this.temperature;
    }

    getHumidite() : number{
        return this.humidite;
    }

    getVent() : number{
        return this.vent;
    }

    getPluie() : number{
        return this.pluie;
    }

    private async getMeteo(){
        const response = await axios.get('http://api.openweathermap.org/data/2.5/weather?q=Paris&appid=7f3e7f8c6d1d0f4f9e3f4f4f4f4f4f4f');
        console.log(response.data);
    }


}

/*
const axios = require('axios');
(async () => {
    const rep = await axios.get('https://rpcache-aa.meteofrance.com/internet2018client/2.0/observation/gridded?lat=47.747832&lon=7.337901&id=682240',{
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36',
            'Authorization' : "Bearer eyJjbGFzcyI6ImludGVybmV0IiwiYWxnIjoiSFMyNTYiLCJ0eXAiOiJKV1QifQ.eyJqdGkiOiJkYTMxNGY4ZTJkZTY0MmM4MDU1NTBiZjBmYTNlZmQxMiIsImlhdCI6MTc0MDg0NzQ2N30.VDt9VdJ7yk-0DMK38D3lKhEiIwwBFvpT30cHLsOL2-M"
        }
    });;
    console.log(rep.data);
})();
*/