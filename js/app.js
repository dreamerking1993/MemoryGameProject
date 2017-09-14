var aaa = []; //array of the cards that are open
var bbb = []; //array of the cards that are matched with the open card
var move = 0;
function one() {
$('.deck .card').on('click', function() {    //when clicked
    move = move+1;
    //card should perform horizontal flip before opening, the interactivity will be added at last
    $(this).addClass('match'); //the card opens
    aaa.push($(this).children().attr('class')); //opened card is pushed to array aaa
});
two(); //call function two
};

function two() {
$('.deck .card').on('click', function() { //when clicked
    move = move+1;
    bbb.push($(this).children().attr('class')); //card to be matched is pushed to array bbb
    //matching the cards
    if (aaa[aaa.length-1]===bbb[bbb.length-1]) { //if the cards match
        //both cards should be flipped before opening the hidden card, the interactivity will be added at last
            $(this).addClass('match'); //the card opens
            one(); //then function one gets called
    }
    else { //if the cards do not match
        //reveal both cards for 3 secs while both have red background color
        //then hide both cards
        one(); //then call function one so that the user can click a card again
    }


});
};

one(); //the program opens with function one being called

//two functionalities left to be added (1) the array is resuffled at the beginning, and everytime user presses replay button all opened cards close and the deck is resuffled
//(2) when all cards are matched "YOU WIN" is displayed