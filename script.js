let submitButton = document.querySelector("#submit-button");
let total = document.querySelector("#total");
let cardInput = document.querySelector("#credit-card");
let form = document.querySelector("#parking-form");

let validForm;
// let numDays = parseInt(document.querySelector("#days").value);

window.addEventListener('submit', e => {
    e.preventDefault();
})



form.addEventListener("click", e=> {

    removeTotal();
    validForm = true;

    checkCreditCard();
    
    displayTotal();
    // let daysArray = countDays(getDayOfWeek(startDate), numDays);
    // console.log(result);
    // console.log(daysArray);
})



function checkCreditCard() {
    let cardNumber = cardInput.value;
    if (!validateCreditCard(cardNumber)) {
        validForm = false;
        cardInput.setCustomValidity("Credit card number is invalid");
    } else {
        cardInput.setCustomValidity("");
    }

}


function formInvalid() {
    validForm = false;
}

function displayTotal() {

    if (validForm && form.checkValidity()) {
        let startDate = document.querySelector("#start-date").value;
        let numDays = parseInt(document.querySelector("#days").value);
        let result = getTotal(countDays(getDayOfWeek(startDate), numDays));

        total.textContent = `Your total is: $${result}`;
}
}

function removeTotal() {
    if (total.textContent !== "") {
        total.textContent = "";
    }
}


function validateCreditCard(cardNumber) {
    var regex = new RegExp("^[0-9]{16}$");
    if (!regex.test(cardNumber)) {
        return false;
    }
    return luhnCheck(cardNumber);
}


function luhnCheck(val) {
    var sum = 0;
    for (var i = 0; i < val.length; i++) {
        var intVal = parseInt(val.substr(i,1));
        if (i % 2 == 0) {
            intVal *=2;
            if (intVal > 9) {
                intVal = 1 + (intVal % 10);
            }
        }
        sum += intVal;
    }
    return (sum % 10) == 0;
}

// Calculate total for amount of parked days
// $5 per weekday; $7 per weekend
function getTotal(daysArray) {
    let totalCost = 0;

    for (let i = 0; i < daysArray.length; i++) {
        if (daysArray[i] === 0 || daysArray[i] === 6) {
            totalCost += 7;
        } else {
            totalCost += 5;
        }
    }
    
    // console.log(totalCost);

    return totalCost;

}

// puts days parked into an array
function countDays(startingDate, numOfDays) {
    
    let dayArray = [];
    for (let i = 0; i < numOfDays; i++) {
        dayArray.push(startingDate + i);
    }


    let finalDayArray = dayArray.map(x => x % 7);
    return finalDayArray;

}

// Gets the day of the week from the date in user form
// Returns a number corresponding to day
// days -> [sun, mon, tue, wed, thu, fri, sat] 0 - 6
// weekends [0] & [6]
function getDayOfWeek(startingDate) {

    // Convert to correct date format
    let actualDate = startingDate.replace(/-/g, '\/');
    let d = new Date(actualDate).getDay();

    return d;
}



