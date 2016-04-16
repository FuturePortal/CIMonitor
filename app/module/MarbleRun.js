var express = require('express');
var app = express();
var exec = require('child_process').exec;

var ballsAvailable = 10;
var oneFireTime = 390;

app.get('/', function (req, res) {
    var output = 'Fire: ';
    for (var i = 1; i <= 5; i++) {
        output += '<a href="/fire/' + i + '">' + i + '</a> - ';
    }
    output += 'go go go';
    res.send(output);
});

app.get('/fire/:amount', function (req, res) {
    var balls = Math.round(parseInt(req.params.amount));
    if (isNaN(balls) || balls < 1) {
        res.send('That\'s not an amount!<meta http-equiv="refresh" content="1;url=/">');
        console.log('Some noob tried "' + req.params.amount + '" as amount of balls');
        return;
    }

    if (balls > ballsAvailable) {
        res.send('Not enough ballzzz<meta http-equiv="refresh" content="1;url=/">');
        console.log(balls + ' balls was requested, but we only have ' + ballsAvailable + ' balls available');
        return;
    }
    res.send('Firing ' + balls + ' balls!<meta http-equiv="refresh" content="1;url=/">');

    // exec('gpio write 7 0');
    console.log('Firing ' + balls + ' balls!');
    ballsAvailable -= balls;
    console.log('Now got ' + ballsAvailable + ' balls available.');

    var fireTime = balls * oneFireTime;

    setTimeout(function() {
        // exec('gpio write 7 1');
    }, fireTime);

    for (var i = 1; i <= balls; i++) {
        setTimeout(function() {
            ballsAvailable++;
            console.log('Now got ' + ballsAvailable + ' balls available.');
        }, 13000 + ((i - 1) * oneFireTime));
    }
});

app.listen(3000, function () {
    console.log('=== Listening on 8080 ===');
    console.log('Making sure all relays are setup correctly');
    exec('gpio mode 7 out');
    exec('gpio write 7 1');
    exec('gpio mode 0 out');
    exec('gpio write 0 1');
    exec('gpio mode 2 out');
    exec('gpio write 2 1');
    exec('gpio mode 3 out');
    exec('gpio write 3 1');
    console.log('Ready for commands!');
});
