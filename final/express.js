var express = require("express");
var fs = require('fs');
var app = express();
app.use(express.static("."));
app.get("/", function (req, res) {
    res.redirect("index.html");
});
app.listen(3000, function () {
    console.log("Example is running on port 3000");
});



var Grass = require("./classes/Grass");
var GrassEater = require("./classes/GrassEater");
var Gishatich = require("./classes/Gishatich");
var Taguhi = require("./classes/Taguhi");
var Mat = require("./classes/Mat");
var Equalizer = require('./classes/Equalizer');

var side = 5;
var grassArr = []; //խոտերի զանգված
var eatArr = []; //խոտակերների զանգված
var gishatichArr = [];
var taguhiArr = [];
var matArr = [];
var eArr = [];
var matrix = [];


getRandomInt = function (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

getRandomArrayElement = function (arr) {
    let randomIndex = Math.floor(Math.random() * arr.length);
    let randomElement = arr[randomIndex];
    return randomElement;
}

function matrixGenerator(row, column) {
    for (var n = 0; n < column; n++) {
        matrix[n] = [];
        for (var e = 0; e < row; e++) {
            matrix[n][e] = getRandomInt(1, 7);
        }
    }
}

function saveStats(){
    var newStats = {
        'Grass': grassArr.length,
        'GrassEater': eatArr.length,
        'Gishatich': gishatichArr.length,
        'Taguhi': taguhiArr.length,
        'Mat': matArr.length,
        'Equalizer':  eArr.length,
        'matrix': matrix.length 
    }
    var file = "stats.json";
    fs.appendFileSync(file, newStats);
}

function start() {
    matrixGenerator(20, 20);
    objectGenerator();
}
function objectGenerator() {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 2) {
                var eatgrass = new GrassEater(x, y);
                eatArr.push(eatgrass);
            } else if (matrix[y][x] == 1) {
                var grass = new Grass(x, y);
                grassArr.push(grass);
            } else if (matrix[y][x] == 3) {
                var gish = new Gishatich(x, y);
                gishatichArr.push(gish);
            } else if (matrix[y][x] == 4) {
                var taguhi = new Taguhi(x, y);
                taguhiArr.push(taguhi);
            } else if (matrix[y][x] == 5) {
                var mat = new Mat(x, y);
                matArr.push(mat);
            } else if (matrix[y][x] == 6) {
                var equalizer = new Equalizer(x, y);
                eArr.push(equalizer);
            }
        }
    }
}

function game() {
    for (var i in grassArr) {
        grassArr[i].mul();
    }
    for (var i in eatArr) {
        eatArr[i].eat();
    }
    for (var i in gishatichArr) {
        gishatichArr[i].eat();
    }
    for (var i in taguhiArr) {
        taguhiArr[i].eat();
    }
    for (var i in matArr) {
        matArr[i].eat();
    }
    for (var i in eArr) {
        eArr[i].eat();
    }
    saveStats();
}


start();
setInterval(game, 1000);