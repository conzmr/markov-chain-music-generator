var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope, $interval) {
    $scope.currentState = "";
    var context;
    $scope.song = "";
    $scope.player = null;
 
    $scope.startPlayer = function (initialNote) {
        stopPlayer();
        context = new AudioContext();
        $scope.currentState = initialNote;
        $scope.song=initialNote;
        playNote(notes[initialNote]);
        $scope.player = $interval(function () {
            nextState();
        }, 1000);
    };

    var stopPlayer = function () {
        if (angular.isDefined($scope.player)) {
            $interval.cancel($scope.player);
        }
    };

    const notes = {
            "do": 130.8127,
            "reb": 138.5913,
            "re": 146.8323,
            "mib": 155.5634,
            "mi": 164.8137,
            "fa":174.6141,
            "solb": 184.9972,
            "sol": 195.9977,
            "lab": 207.6523,
            "la": 220.0000,
            "sib": 233.0818,
            "si": 246.9416
    }
    const transitionMatrix = {
            "do": {
            "do": 0.0,
            "reb": 0.1,
            "re": 0.5,
            "mib": 0.3,
            "mi": 0.0,
            "fa": 0.0,
            "solb": 0.0,
            "sol": 0.0,
            "lab": 0.0,
            "la": 0.0,
            "sib": 0.1,
            "si": 0.0
        },
        "reb": {
            "do": 0.0,
            "reb": 0.0,
            "re": 0.0,
            "mib": 0.1,
            "mi": 0.0,
            "fa": 0.1,
            "solb": 0.3,
            "sol": 0.2,
            "lab": 0.1,
            "la": 0.2,
            "sib": 0.0,
            "si": 0.0
        },
        "re": {
            "do": 0.2,
            "reb": 0.0,
            "re": 0.0,
            "mib": 0.2,
            "mi": 0.0,
            "fa": 0.3,
            "solb": 0.0,
            "sol": 0.1,
            "lab": 0.0,
            "la": 0.1,
            "sib": 0.0,
            "si": 0.1
        },
        "mib": {
            "do": 0.1,
            "reb": 0.0,
            "re": 0.3,
            "mib": 0.0,
            "mi": 0.0,
            "fa": 0.2,
            "solb": 0.1,
            "sol": 0.2,
            "lab": 0.0,
            "la": 0.1,
            "sib": 0.0,
            "si": 0.0
        },
        "mi": {
            "do": 0.1,
            "reb": 0.1,
            "re": 0.1,
            "mib": 0.1,
            "mi": 0.1,
            "fa": 0.1,
            "solb": 0.1,
            "sol": 0.1,
            "lab": 0.0,
            "la": 0.1,
            "sib": 0.0,
            "si": 0.1
        },
        "fa": {
            "do": 0.0,
            "reb": 0.1,
            "re": 0.0,
            "mib": 0.1,
            "mi": 0.1,
            "fa": 0.0,
            "solb": 0.1,
            "sol": 0.2,
            "lab": 0.1,
            "la": 0.1,
            "sib": 0.1,
            "si": 0.1
        },
        "solb": {
            "do": 0.1,
            "reb": 0.2,
            "re": 0.3,
            "mib": 0.0,
            "mi": 0.0,
            "fa": 0.1,
            "solb": 0.0,
            "sol": 0.0,
            "lab": 0.0,
            "la": 0.1,
            "sib": 0.1,
            "si": 0.1
        },
        "sol": {
            "do": 0.1,
            "reb": 0.0,
            "re": 0.0,
            "mib": 0.0,
            "mi": 0.0,
            "fa": 0.4,
            "solb": 0.1,
            "sol": 0.0,
            "lab": 0.0,
            "la": 0.1,
            "sib": 0.0,
            "si": 0.3
        },
        "lab": {
            "do": 0.0,
            "reb": 0.0,
            "re": 0.0,
            "mib": 0.5,
            "mi": 0.0,
            "fa": 0.0,
            "solb": 0.2,
            "sol": 0.0,
            "lab": 0.2,
            "la": 0.0,
            "sib": 0.1,
            "si": 0.0
        },
        "la": {
            "do": 0.0,
            "reb": 0.0,
            "re": 0.4,
            "mib": 0.0,
            "mi": 0.0,
            "fa": 0.1,
            "solb": 0.3,
            "sol": 0.0,
            "lab": 0.1,
            "la": 0.0,
            "sib": 0.1,
            "si": 0.0
        },
        "sib": {
            "do": 0.0,
            "reb": 0.0,
            "re": 0.0,
            "mib": 0.0,
            "mi": 0.0,
            "fa": 0.0,
            "solb": 0.0,
            "sol": 0.0,
            "lab": 0.5,
            "la": 0.0,
            "sib": 0.5,
            "si": 0.0
        },
        "si": {
            "do": 0.0,
            "reb": 0.2,
            "re": 0.0,
            "mib": 0.1,
            "mi": 0.0,
            "fa": 0.1,
            "solb": 0.3,
            "sol": 0.0,
            "lab": 0.1,
            "la": 0.2,
            "sib": 0.0,
            "si": 0.0
        }
    }
    function playNote(frecuencia){
        var o= context.createOscillator();
        g=context.createGain();
        o.connect(g);
        o.type="sawtooth";
        o.frequency.value=frecuencia;
        g.connect(context.destination);
        o.start(0);
        g.gain.exponentialRampToValueAtTime(0.00001,context.currentTime +1.5);
    }

    function nextState(){ 
        let random = Math.random();
        let states = transitionMatrix[$scope.currentState]
        let cumulativeProb = 0;
        for (const note in states) {
            cumulativeProb+=states[note] 
            if(random< cumulativeProb){
            $scope.currentState = note
            $scope.song += ` ${note}`
            console.log( `${note} `)
            playNote(notes[note])
            return states[note]
            }
        }
    }
    
});