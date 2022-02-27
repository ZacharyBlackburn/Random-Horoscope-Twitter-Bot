require('dotenv').config();
const {TwitterClient} = require('twitter-api-client');
const axios = require('axios');


// Twitter client keys
const twitterClient = new TwitterClient({
  apiKey: process.env.TWITTER_API_KEY,
  apiSecret: process.env.TWITTER_API_SECRET,
  accessToken: process.env.TWITTER_ACCESS_TOKEN,
  accessTokenSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

const horoscope = [
"Aries",
"Taurus",
"Gemini",
"Cancer",
"Leo",
"Virgo",
"Libra",
"Scorpio",
"Sagittarius",
"Capricorn",
"Aquarius",
"Pisces"
];



// yusufnb Quotes API
const quotesAPI = {
  method: 'GET',
  url: 'https://yusufnb-quotes-v1.p.rapidapi.com/widget/~e.json',
  headers: {
    'x-rapidapi-key': process.env.RAPID_API_KEY,
    'x-rapidapi-host': process.env.RAPID_API_HOST
  }
};

// Said So Quotes API
const saidSoQuotesAPI = {
  method: 'get',
  url: 'https://quotes.rest/quote/random?maxlength=250',
  headers: { 
    'accept': 'application/json', 
    'X-TheySaidSo-Api-Secret': process.env.QUOTE_API_KEY
  }
};

// AdviceSlip API
const adviceSlipAPI = "https://api.adviceslip.com/advice";


let horoscopeFunction = (horoscope) => {
  let randomNumber = Math.random() * (10 - 1) + 1;
  // console.log(randomNumber)
  if (randomNumber <= 3) {
    axios.get(adviceSlipAPI).then(response => {
      const data = response.data.slip ? response.data.slip : {}
      let tweet
      if (data.advice) {
            tweet = `${horoscope}: ${data.advice.replace( /(<([^>]+)>)/ig, '')}`
      } else {
          console.log("Something's wrong brother")
      }
      twitterClient.tweets.statusesUpdate({
          status: tweet
      }).then (response => {
          console.log("Tweeted!", response)
      }).catch(err => {
          console.error(err)
      })
    }).catch (err => {
          console.error(err)
    })
  }
  else if (randomNumber <= 6) {
    axios(saidSoQuotesAPI).then(response => {
      const data = JSON.stringify(response.data.contents.quotes[0].quote)
      let tweet 
      if (data) {
        tweet = `${horoscope}: ${data.slice(1, -1).replace( /(<([^>]+)>)/ig, '')}`
      } else {
        console.log("Your tweet was not posted for this zodiac")
      }
      twitterClient.tweets.statusesUpdate({
        status: tweet,
      }).then (response => {
          console.log(response)
      }).catch(err => {
          console.error(err)
      })
    }).catch (err => {
        console.log(err)
    })
  }
  else {
    axios.request(quotesAPI).then(response => {
      const data = response.data ? response.data : {}
      let tweet 
      if (data) {
        tweet = `${horoscope}: ${data.quote.replace( /(<([^>]+)>)/ig, '')}`
      } else {
        console.log("Your tweet was not posted for this zodiac")
      }
      twitterClient.tweets.statusesUpdate({
        status: tweet,
      }).then (response => {
          console.log("Tweeted!", response)
      }).catch(err => {
          console.error(err)
      })
    }).catch (err => {
      console.log(err)
    })
  }

}

horoscopeFunction(horoscope[0]);
setTimeout(horoscopeFunction, 4000, horoscope[1]);
setTimeout(horoscopeFunction, 8000, horoscope[2]);
setTimeout(horoscopeFunction, 12000, horoscope[3]);
setTimeout(horoscopeFunction, 16000, horoscope[4]);
setTimeout(horoscopeFunction, 20000, horoscope[5]);
setTimeout(horoscopeFunction, 24000, horoscope[6]);
setTimeout(horoscopeFunction, 28000, horoscope[7]);
setTimeout(horoscopeFunction, 32000, horoscope[8]);
setTimeout(horoscopeFunction, 36000, horoscope[9]);
setTimeout(horoscopeFunction, 40000, horoscope[10]);
setTimeout(horoscopeFunction, 44000, horoscope[11]);