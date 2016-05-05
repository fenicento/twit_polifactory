/**
 * Created by Cento on 04/05/2016.
 */
var Twit = require('twit')

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
    console.log(count);

});


var express = require('express');
var app = express();

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
