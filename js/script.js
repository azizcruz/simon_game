const _RED = "RED";
const _GREEN = "GREEN";
const _YELLOW = "YELLOW";
const _BLUE = "BLUE";
var audio1 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3');
var audio2 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3');
var audio3 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3');
var audio4 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3');
var _count = 0;
var _limit = 0;
var _currentColor = "";
var _rounds = 0;
var _strict = 0;
var _winRounds = 0;


// Simon object to store all the methods, variables, arrays.
var simon = {
    initColor: function (color) {

        if (!simon.sequence.length) {
            // Start game.
            simon.nextSequence();
        } else {
            if (_rounds === 20) {

                $(".win").fadeIn(700);
                setTimeout(function () {
                    $(".win").fadeIn(700);
                    simon.resetGame();
                }, 700)

            }
            if (color === simon.sequence[simon.step]) {
                // Go next step.
                if (simon.step === simon.sequence.length - 1) {
                    console.log("Sequence is completed !!");
                    _rounds++;
                    $("#rounds").text(_rounds);
                    simon.step = 0;
                    simon.nextSequence();
                    simon.sounds();
                } else {
                    simon.step++;
                }
            } else {
                _rounds = 0;
                $("#rounds").text(_rounds);
                $("#error").fadeIn(400);
                setTimeout(function () {
                    $("#error").fadeOut(400);
                }, 700)

            }
        }

        console.log("The sequence : " + simon.sequence);
    },

    colors: ["RED", "GREEN", "YELLOW", "BLUE"],

    sequence: [],

    step: 0,

    nextSequence: function () {
        var nextColor = simon.colors[(Math.random() * (simon.colors.length - 1)).toFixed()];
        simon.sequence.push(nextColor);
    },

    sounds: function () {
        var _timer = setInterval(function () {
            if (simon.sequence.length) {
                _limit = simon.sequence.length;
                _currentColor = simon.sequence[_count];
                if (_currentColor === _RED) {
                    audio1.play();
                    $("#red").addClass("red-active");
                    setTimeout(function () {
                        $("#red").removeClass("red-active");
                    }, 1000)
                    _count++;
                } else if (_currentColor === _GREEN) {
                    audio2.play();
                    $("#green").addClass("green-active");

                    setTimeout(function () {
                        $("#green").removeClass("green-active");
                    }, 1000)
                    _count++;
                } else if (_currentColor === _YELLOW) {
                    audio3.play();
                    $("#yellow").addClass("yellow-active");

                    setTimeout(function () {
                        $("#yellow").removeClass("yellow-active");
                    }, 1000)

                    _count++;
                } else if (_currentColor === _BLUE) {
                    audio4.play();
                    $("#blue").addClass("blue-active");
                    setTimeout(function () {
                        $("#blue").removeClass("blue-active");
                    }, 1000)
                    _count++;
                }



                if (_count >= _limit) {
                    clearInterval(_timer);
                    _count = 0;
                    _limit = 0;
                    _currentColor = "";

                }
            }

        }, 1200);
    },

    resetGame: function () {
        simon.sequence = [];
        simon.step = 0;
        _rounds = 0;
        $("#rounds").text(_rounds);
    }


}

$(document).ready(function () {

    // Game sounds.
    simon.sounds();

    // start game
    $("#start").on("click", function () {
        simon.initColor();
    })







    // Reset click.
    $("#reset").on("click", function () {
        simon.resetGame();
        simon.sounds();
    });

    // When you click each color.
    $("#red").on("click", function () {
        simon.initColor(_RED);
    });

    $("#green").on("click", function () {
        simon.initColor(_GREEN);
    });

    $("#yellow").on("click", function () {
        simon.initColor(_YELLOW);
    });

    $("#blue").on("click", function () {
        simon.initColor(_BLUE);
    });



});
