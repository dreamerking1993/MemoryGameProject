/*
 * Create a list that holds all of your cards
 */
var cardss = ["diamond", "diamond", "bicycle", "bicycle", "bomb", "bomb", "leaf", "leaf", "cube", "cube", "anchor", "anchor", "bolt", "bolt", "paper-plane-o", "paper-plane-o"];
var aaa = [],
    bbb = [],
    ccc = [], //classes of matched cards are added here
    match = 0,
    steps = 0,
    sec = 0;
var secs, mins;
var numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15"];


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}
//the game starts

function letsBegin() {
    var cards = shuffle(cardss); //shuffles the deck
    //adding card's html to the page
    for (var i = 0; i < cards.length; i++) {
        $('.deck').append($('<li id="i' + numbers[i] + '" class="card"><i class="fa fa-' + cards[i] + '"></i></li>'));
    }
    for (var j = 0; j < 3; j++) {
        $('.stars').append($('<li><i class="fa fa-star"></i></li>'));
    }


    onclick(); //calling the event listener function
}
//the logic of the game follows
function onclick() {
    $('.card').on('click', function() {
        //changing stars as moves incease
        if (steps > 24 && steps < 27) {
            $('.stars').empty();
            for (var k = 0; k < 2; k++) {
                $('.stars').append($('<li><i class="fa fa-star"></i></li>'));
            }
        } else if (steps > 27) {
            $('.stars').empty();
            $('.stars').append($('<li><i class="fa fa-star"></i></li>'));
        }


        //assigning the clicked card to 'card' varriable  

        var card = $(this).children().attr('class');
        var numId = $(this).attr('id'); //assigning the distinct ID of the clicked card to the numId varriable

        if (!ccc.includes(card)) { //so that the following classes are not added on cards already matched
            $(this).addClass('open show'); //opens and shows the clicked card
        }
        //pushing the opened card to array bbb[]   
        bbb.push(numId);
        if (bbb.length === 1) {
            if (!ccc.includes(card)) {
                aaa.push(card);
                steps++;
            }
        } else if (bbb.length > 1) { //so that the same card cannot be clicked twice and mathced
            if (numId !== bbb[0]) { //making sure the same card is not added to the array when clicked twice
                if (!ccc.includes(card)) { //so that the matched card is not added to the aaa[] when clicked
                    aaa.push(card);
                    steps++;
                }
            }
        }

        //adding no. of moves to the page
        $('.moves').empty();
        $('.moves').append(steps);


        //if more than one cards are opened, only then can we compare
        if (aaa.length > 1) {
            if (card === aaa[0]) { //if two cards are same
                $('.deck').find('.open, .show').addClass('match'); //open both with green color
                ccc.push(card);
                $('.deck').find('.match').removeClass('open show'); //removing these classes helps with the logic of the game
                match++; //counts the number of matches in the game
            }
            //if two cards are not the same
            else {
                $('.deck').find('.open').addClass('unmatched'); //display both in red color for a sec
                setTimeout(function() {
                    $('.deck').find('.open').removeClass('open show unmatched'); //now hide both cards
                }, 600);
            }

            aaa = []; //empty the arrayes so the process can begin again
            bbb = [];
        }
        if (match === 8) { //conditions for win modal
            clearInterval(timer); //timerstops
            $('.winModal').css('display', 'flex'); //winmodal displayed
            $('.container').css('display', 'none'); //other content hidden
            $('.winMsg').append('CONGRATULATIONS!!! You have won in ' + mins + ' mins and ' + secs + ' secs.');
            $('.newGame').on('click', function() { //play again button
                location.reload(true);
            });
        }

    });
}


//reloading the game when clicked on reload symbol
function restart() {
    $('.restart').children().on('click', function() {
        location.reload(true);
    });
}

//timer starts from 00 mins and 00 secs
function pad(val) {
    return val > 9 ? val : "0" + val;
}
var timer = setInterval(function() {
    $(".seconds").empty();
    $(".minutes").empty();
    secs = pad(++sec % 60);
    mins = pad(parseInt(sec / 60, 10));
    $(".seconds").append(secs);
    $(".minutes").append(mins);
}, 1000);


letsBegin(); //the letsBegin function is called
restart(); //enables player to push the reload symbol anytime
