import express from 'express';
import cors from 'cors';


const app = express();
app.use(cors());

const key = "246b040633e745d195a125332240606";
const options = {
    method: 'GET'
}

const fetchCall = async (place, days) => {
    const url = `http://api.weatherapi.com/v1/forecast.json?q=${place}&days=${days}&key=${key}`;
    const response = await fetch(url, options);
    const data = await response.json()
    return data;
}

app.get('/:place', async (req, res) => {
    const { place } = req.params;
    const placeData = await fetchCall(place, 2);
    const condition = placeData.current.condition.text
    let weatherData = {placeData}
    // current/condition.text
    switch (true) {
      case condition.toLowerCase().includes("sunny"):
        weatherData = { ...placeData, canDo: "Cycling or Picnick" };
        break;
      case condition.toLowerCase().includes("rain"):
        weatherData = {
          ...placeData,
          canDo: "Play Indoor games like badminton",
        };
        break;
      case condition.toLowerCase().includes("cloudy"):
        weatherData = { ...placeData, canDo: "Travel your favourite places" };
    }


    console.log(weatherData)
    res.send(weatherData)
})

app.listen(5000, console.log('Server is started on 5000'))


