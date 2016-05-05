/**
 * Created by Cento on 04/05/2016.
 */
var Twit = require('twit');
var request = require("request");
var csv = require('express-csv')


var T = new Twit({
    consumer_key:         'fYC8BHQFLfs8l4d5MHGA',
    consumer_secret:      '65IeofnbybLC4AUlJeKEnhV8eOF6HS8w2aAaGKl9iw',
    access_token:         '491418325-rczKRNvE3Ocd2bZiMh2uLmjSxt9aKMNTARCMvTQY',
    access_token_secret:  'YzRBGTLXfqLwNVGdFrLToZeTbh3Q7eDilClivJ6P0',
    timeout_ms:           60*1000  // optional HTTP request timeout to apply to all requests.
})


var dn = [
    "alcatraz","oldfashion", "theclub","hollywood","byblos","loolapaloosa","climate"
];

var count = {
    alcatraz :0,
    oldfashion:0,
    theclub:0,
    hollywood:0,
    byblos:0,
    loolapaloosa:0,
    climate:0

}

var discos = {
alcatraz :["#alcatrazmilano", "#alcatraz", "@AlcatrazMilano"],
oldfashion:["#oldfashionmilano", "#oldfashion", "@oldfashionclub"],
theclub:["#theclubmilano", "#theclub", "@theclubmilano"],
hollywood:["#hollywoodmilano", "#hollywoodry", "@HollywoodMilano"],
byblos:["#byblos", "#byblosmilano", "@byblosmilano"],
loolapaloosa:["#loolapaloosa", "#loolapaloosamilano", "@LOOLAPALOOSAMI"],
climate:["climate","climatechange"]
}

var str = "#alcatrazmilano,#alcatraz,@AlcatrazMilano,#oldfashionmilano,#oldfashion,@oldfashionclub,#theclubmilano,#theclub,@theclubmilano,#hollywoodmilano,#hollywoodry,@HollywoodMilano,#byblos,#byblosmilano,@byblosmilano,#loolapaloosa,#loolapaloosamilano,@LOOLAPALOOSAMI,climate,climatechange";

console.log(str);
//var alcatraz = T.stream('statuses/filter', { track: '@AlcatrazMilano,#alcatrazmilano' })
//var oldFashion = T.stream('statuses/filter', { track: '@oldfashionclub,#theclubmilano' })
//var loolapalooza = T.stream('statuses/filter', { track: '@LOOLAPALOOSAMI,#loolapaloosamilano' })
//var club = T.stream('statuses/filter', { track: '@theclubmilano, #theclubmilano' })
//var holliwood = T.stream('statuses/filter', { track: '@HollywoodMilano,#hollywoodmilano' })

//var byblos = T.stream('statuses/filter', { track: '@byblosmilano,#byblosmilano' })

var nytimes = T.stream('statuses/filter', { track: str })


nytimes.on('tweet', function (tweet) {

    for (var d in discos) {
        for(var k in discos[d]) {
            if(tweet.text.indexOf(discos[d][k])>-1) {
                count[d]++;
                break;
            }
        }
    }
   // console.log(count);
});


var express = require('express');
var app = express();

var url1= "https://api.import.io/store/connector/e39e8693-8dae-402f-b46d-779c8a0164e9/_query?input=webpage/url:http%3A%2F%2Fmagicseaweed.com%2FBells-Beach-Surf-Report%2F524%2F&&_apikey=b107e5e7a10f49b7b7ed7882c07d4cdc5eb962dcfdbef4cebbf574c96d7fe2234330362971bdb13a1e8856d1cce9b3377c1bd2d4b0d78f3bde66bb8dde104f0a71c933d48ba3d0148366a08e28dccdbb";
var url2= "https://api.import.io/store/connector/d4427531-40ad-4bb9-9d5f-1f23c4657079/_query?input=webpage/url:http%3A%2F%2Fmagicseaweed.com%2FSupertubos-Surf-Report%2F196%2F&&_apikey=b107e5e7a10f49b7b7ed7882c07d4cdc5eb962dcfdbef4cebbf574c96d7fe2234330362971bdb13a1e8856d1cce9b3377c1bd2d4b0d78f3bde66bb8dde104f0a71c933d48ba3d0148366a08e28dccdbb";
var url3 = "https://api.import.io/store/connector/13a26a89-971c-4925-a7ae-ac04cc9a0663/_query?input=webpage/url:http%3A%2F%2Fmagicseaweed.com%2FPeahi-Jaws-Surf-Report%2F617%2F&&_apikey=b107e5e7a10f49b7b7ed7882c07d4cdc5eb962dcfdbef4cebbf574c96d7fe2234330362971bdb13a1e8856d1cce9b3377c1bd2d4b0d78f3bde66bb8dde104f0a71c933d48ba3d0148366a08e28dccdbb";


app.get('/loc1', function(req, res) {

    request(url1, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var obj = JSON.parse(body).results[0];
            var fin = {}
            fin.swell_period = parseFloat(obj.swell_period)
            fin.swell_height = parseFloat(obj.swell_height)
            fin.wind_speed = parseFloat(obj.wind_speed)
            fin.wind_direction = parseFloat(obj.wind_direction.match(/[0-9]+/)[0]);
            console.log(fin); // Show the HTML for the Google homepage.
            res.json(fin);
        }
    })


    //res.type('text/plain');
    //res.json(count);
});

app.get('/loc2', function(req, res) {

    request(url2, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var obj = JSON.parse(body).results[0];


            obj.wind_direction = parseFloat(obj.wind_direction.match(/[0-9]+/)[0]);
            console.log(obj); // Show the HTML for the Google homepage.
            res.json(obj);
        }
    })


    //res.type('text/plain');
    //res.json(count);
});


app.get('/loc3', function(req, res) {

    request(url3, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var obj = JSON.parse(body).results[0];


            obj.wind_direction = parseFloat(obj.wind_direction.match(/[0-9]+/)[0]);
            console.log(obj); // Show the HTML for the Google homepage.
            res.json(obj);
        }
    })


    //res.type('text/plain');
    //res.json(count);
});



app.get('/loc1csv', function(req, res) {

    request(url1, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var obj = JSON.parse(body).results[0];


            obj.wind_direction = parseFloat(obj.wind_direction.match(/[0-9]+/)[0]);
            console.log(obj); // Show the HTML for the Google homepage.
            res.csv([obj]);
        }
    })
})
    app.get('/loc2csv', function(req, res) {

        request(url2, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                var obj = JSON.parse(body).results[0];


                obj.wind_direction = parseFloat(obj.wind_direction.match(/[0-9]+/)[0]);
                console.log(obj); // Show the HTML for the Google homepage.
                res.csv([obj]);
            }
        })
    })
        app.get('/loc3csv', function(req, res) {

            request(url3, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    var obj = JSON.parse(body).results[0];


                    obj.wind_direction = obj.wind_direction.match(/[0-9]+/)[0];
                    console.log(obj); // Show the HTML for the Google homepage.
                    res.csv([obj]);
                }
            })

    //res.type('text/plain');
    //res.json(count);
});



app.get('/', function(req, res) {
    //res.type('text/plain');
    res.json(count);
});

app.listen(process.env.PORT || 8080);
/*
alcatraz.on('tweet', function (tweet) {
    console.log(tweet.text)
});
oldFashion.on('tweet', function (tweet) {
    console.log(tweet.text)
});
loolapalooza.on('tweet', function (tweet) {
    console.log(tweet.text)
});
club.on('tweet', function (tweet) {
    console.log(tweet.text)
});
*/
//holliwood.on('tweet', function (tweet) {
//    console.log(tweet.text)
//});

//byblos.on('tweet', function (tweet) {
//    console.log(tweet.text)
//});



