var Grass = require('./Grass');
var GrassEater = require('./GrassEater');
var Gishatich = require('./Gishatich');
var Taguhi = require('./Taguhi');
var Mat = require('./Mat');
var Equalizer = require('./Equalizer');

var side = 5;
var grassArr = []; //խոտերի զանգված
var eatArr = []; //խոտակերների զանգված
var gishatichArr=[];
var taguhiArr=[];
var matArr=[];
var eArr=[];
var matrix=[];
var row=80;
var column=80;
for( var n=0; n<row; n++)
{
    matrix[n]=[];
    for( var e=0; e<column; e++)
    {
        matrix[n][e]=Math.round(Math.random()*6);
    }
}


//draw ֆունկցիան գծում է «կադրերը», վարկյանում 60 կադր արագությամբ
//եթե տրված չէ այլ կարգավորում frameRate ֆունկցիայի միջոցով
//draw ֆունկցիան ինչ որ իմաստով անվերջ կրկնություն է (цикл, loop)
function game() {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 2) {
                var eatgrass = new GrassEater(x, y);
                eatArr.push(eatgrass);
            } else if (matrix[y][x] == 1) {
                var grass = new Grass(x, y);
                grassArr.push(grass);
            } else if (matrix[y][x]==3){
                var gish=new Gishatich(x,y);
                gishatichArr.push(gish);
            } else if (matrix[y][x]==4){
                var taguhi = new Taguhi(x,y);
                taguhiArr.push(taguhi);
            } else if(matrix[y][x]==5){
                var mat=new Mat(x,y);
                matArr.push(mat);
            } else if(matrix[y][x]==6){
                var equalizer=new Equalizer(x,y);
                eArr.push(equalizer);
            }
        }
    }

    for (var i = 0; i < matrix.length; i++) {
        for (var j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j] == 1) {
                console.log('1');
            } else if (matrix[i][j] == 2) {
                console.log('2');
            } else if (matrix[i][j] == 0) {
                console.log('0');
            } else if (matrix[i][j]==3){
                console.log('3');
            } else if(matrix[i][j]==4){
                console.log('4');
            } else if(matrix[i][j]==5){
                console.log('5');
            } else if(matrix[i][j]==6){
                console.log('6');
            }
        }
    }


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
}


var express = require("express");

var app = express();

/*
app.use(express.static("."));

app.get("/", function (req, res) {

    res.redirect("index.html");

});
*/
app.listen(3000, function () {

    console.log("Example is running on port 3000");

});

setInterval(game, 1000);