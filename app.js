// create constant for number of die sides, an array to hold the dice, and a unique id for each die
const DIE_SIDES = 6;
let dies = [];
let dieId = 1;

// outlines Die class, which creates Die object
class Die {
    constructor() {
        this.value;
        this.roll();
        this.id = dieId++;
        this.addToScreen();
        this.addListeners();
    }
    roll() {
        this.value = Math.floor(Math.random() * (DIE_SIDES) + 1);
    }
    deleteDie() {
        this.div.remove();
        dies = dies.filter(obj => obj.id !== this.id);
    }
    addToScreen() {
        this.div = $(`<div class="dice shadow">${this.value}</div>`);
        $('.die-container').append(this.div);
    }
    addListeners() {
        this.div.click(() => updateDie(this));
        this.div.dblclick(() => this.deleteDie());
    }
}

// click listener for "New Die" button
$('#generate').click(function() {
    dies.push(new Die());
});

// click listener for "Reroll" button
$('#reroll').click(function() {
    dies.forEach((val) => updateDie(val));
})

// click listener for "Sum Dice" button
$('#sum').click(sumAll);

// alerts user with sum of all dice on the screen
function sumAll() {
    let sum = [];
    let alerttxt = "The sum of the current dice is ";
    let sumAllDice = 0;
    if (dies.length > 0) {
        dies.forEach(val => {
            sum.push(val.value);
            sumAllDice = sum.reduce((acc, val) => acc + val);
        });
    }
    alert(`${alerttxt}${sumAllDice}!`);
}

// updates value of die after it is clicked on
function updateDie(obj) {
    obj.roll();
    obj.div.text(obj.value);
}

